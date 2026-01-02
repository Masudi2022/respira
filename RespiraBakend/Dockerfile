FROM python:3.11-slim

# Prevent Python from writing .pyc files + unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies (for psycopg2/postgres)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better caching)
COPY RespiraBakend/requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the entire project (now only backend since context is RespiraBakend/)
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrations (important for production)
RUN python manage.py migrate --noinput

# Run with Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]