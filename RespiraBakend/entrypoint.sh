#!/bin/bash
set -e

echo "🚀 Starting entrypoint..."

# Wait for PostgreSQL
wait_for_postgres() {
    echo "⏳ Waiting for PostgreSQL..."
    until python - <<END
import os, sys
import psycopg2
from urllib.parse import urlparse

try:
    url = urlparse(os.environ["DATABASE_URL"])
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port,
    )
    conn.close()
except Exception:
    sys.exit(1)
END
    do
        echo "❌ Database not ready... retrying in 2s"
        sleep 2
    done
    echo "✅ PostgreSQL is ready!"
}

if [ -n "$DATABASE_URL" ]; then
    wait_for_postgres
else
    echo "🟢 No DATABASE_URL found → using SQLite"
fi

echo "📦 Running migrations..."
python manage.py migrate --noinput

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser safely (idempotent)
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && \
   [ -n "$DJANGO_SUPERUSER_EMAIL" ] && \
   [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then

    echo "👤 Ensuring superuser exists..."

    python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()

username = "$DJANGO_SUPERUSER_USERNAME"
email = "$DJANGO_SUPERUSER_EMAIL"
password = "$DJANGO_SUPERUSER_PASSWORD"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    print("✅ Superuser created")
else:
    print("ℹ️ Superuser already exists")
END
fi

echo "🔥 Starting Gunicorn..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level info
