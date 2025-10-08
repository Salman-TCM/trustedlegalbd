# Multi-stage build for TrustedLegal BD
# This Dockerfile can build either frontend or backend based on TARGET build arg

ARG TARGET=frontend

# Frontend build stage
FROM node:18-alpine as frontend-build
WORKDIR /app

# Accept build arguments for environment variables
ARG REACT_APP_API_URL=http://localhost:8000
ARG REACT_APP_API_TIMEOUT=30000
ARG REACT_APP_ENVIRONMENT=production

# Set environment variables for build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_TIMEOUT=$REACT_APP_API_TIMEOUT
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT

# Copy package files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Frontend production stage
FROM nginx:alpine as frontend
COPY --from=frontend-build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Backend build stage
FROM python:3.11-slim as backend
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Create user and set permissions
RUN adduser --disabled-password --gecos '' appuser \
    && chown -R appuser:appuser /app

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run migrations and start server
CMD ["sh", "-c", "python manage.py migrate && gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 legal_backend.wsgi:application"]

# Final stage - choose based on TARGET
FROM ${TARGET} as final