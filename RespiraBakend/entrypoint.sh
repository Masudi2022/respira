#!/bin/bash
# entrypoint.sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting entrypoint script..."

# Wait for database to be ready
# Adjust DB_HOST and DB_PORT according to your environment
if [ -n "$DATABASE_URL" ]; then
    echo "Waiting for database to be ready..."
    until python - <<END
import sys, os, psycopg2
from urllib.parse import urlparse

try:
    result = urlparse(os.environ['DATABASE_URL'])
    conn = psycopg2.connect(
        dbname=result.path[1:],
        user=result.username,
        password=result.password,
        host=result.hostname,
        port=result.port
    )
    conn.close()
except Exception as e:
    sys.exit(1)
END
    do
        echo "Database not ready yet... sleeping 2 seconds"
        sleep 2
    done
    echo "Database is ready!"
else
    echo "DATABASE_URL not set, skipping database wait."
fi

# Apply database migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Optionally create a superuser if environment variables are set
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser --noinput || echo "Superuser already exists"
fi

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level info
