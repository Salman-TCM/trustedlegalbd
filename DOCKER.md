# Docker Deployment Guide

This guide explains how to deploy TrustedLegal BD using Docker containers.

## 🚀 Quick Start

### Prerequisites
- Docker 20.0+ installed
- Docker Compose 2.0+ installed
- 4GB+ RAM available
- 10GB+ disk space

### Development Deployment
```bash
# Clone the repository
git clone <repository-url>
cd trustedlegalbd

# Deploy development environment
./deploy.sh dev

# Or manually:
docker-compose up --build -d
```

### Production Deployment
```bash
# Set environment variables
export SECRET_KEY="your-super-secure-secret-key"
export POSTGRES_PASSWORD="your-strong-database-password"
export ALLOWED_HOSTS="yourdomain.com,www.yourdomain.com"
export CORS_ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"

# Deploy production environment
./deploy.sh prod

# Or manually:
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📁 Container Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │────│   (Django)      │────│   (PostgreSQL)  │
│   Port: 80      │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                               │
                    ┌─────────────────┐
                    │   Nginx         │
                    │   (Production)  │
                    │   Port: 80/443  │
                    └─────────────────┘
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@db:5432/dbname
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

#### Frontend
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

### Docker Compose Files

#### Development (`docker-compose.yml`)
- Uses SQLite database (for simplicity)
- Debug mode enabled
- Hot reload for development
- Ports exposed for direct access

#### Production (`docker-compose.prod.yml`)
- PostgreSQL database
- Production optimizations
- Nginx reverse proxy
- SSL/TLS ready
- Health checks enabled

## 📊 Services

### Frontend Container
- **Image**: nginx:alpine (production) / node:18-alpine (development)
- **Port**: 80
- **Volume**: Built React app served by Nginx
- **Health Check**: HTTP GET /

### Backend Container
- **Image**: python:3.11-slim
- **Port**: 8000
- **Framework**: Django + Gunicorn
- **Database**: PostgreSQL (production) / SQLite (development)
- **Health Check**: HTTP GET /api/health/

### Database Container
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: Persistent data storage
- **Health Check**: pg_isready

## 🚀 Deployment Commands

### Using Deploy Script
```bash
# Development
./deploy.sh dev

# Production
./deploy.sh prod

# View logs
./deploy.sh logs

# Health check
./deploy.sh health

# Backup database
./deploy.sh backup

# Stop services
./deploy.sh stop

# Complete cleanup
./deploy.sh cleanup
```

### Manual Docker Commands
```bash
# Build and start services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Execute commands in containers
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser

# Stop services
docker-compose down

# Remove everything (including volumes)
docker-compose down -v --rmi all
```

## 🔒 Security & Production

### SSL/TLS Setup
1. Obtain SSL certificates
2. Place certificates in `nginx/ssl/`
3. Update nginx configuration
4. Use HTTPS URLs in environment variables

### Database Security
- Use strong passwords
- Regular backups
- Limit network access
- Enable encryption at rest

### Application Security
- Set strong SECRET_KEY
- Disable DEBUG in production
- Configure ALLOWED_HOSTS
- Set up proper CORS origins
- Regular security updates

## 📈 Monitoring & Maintenance

### Health Checks
```bash
# Check all services
./deploy.sh health

# Individual service checks
curl http://localhost/health
curl http://localhost:8000/api/health/
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Backups
```bash
# Automated backup
./deploy.sh backup

# Manual database backup
docker-compose exec db pg_dump -U trustedlegal_user trustedlegal_db > backup.sql

# Restore from backup
docker-compose exec -T db psql -U trustedlegal_user trustedlegal_db < backup.sql
```

## 🔧 Troubleshooting

### Common Issues

#### Container won't start
```bash
# Check logs
docker-compose logs [service-name]

# Check container status
docker-compose ps

# Restart specific service
docker-compose restart [service-name]
```

#### Database connection issues
```bash
# Check database is running
docker-compose exec db pg_isready -U trustedlegal_user

# Check database logs
docker-compose logs db

# Reset database (CAUTION: destroys data)
docker-compose down -v
docker-compose up -d
```

#### Frontend not loading
```bash
# Check if nginx is running
docker-compose ps frontend

# Check nginx logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build frontend
```

#### Permission issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Fix container permissions
docker-compose exec backend chown -R appuser:appuser /app
```

### Performance Optimization

#### Database
- Regular VACUUM and ANALYZE
- Proper indexing
- Connection pooling
- Query optimization

#### Frontend
- Enable Gzip compression
- Browser caching
- CDN for static assets
- Image optimization

#### Backend
- Increase Gunicorn workers
- Database connection pooling
- Redis caching
- Static file serving via Nginx

## 📱 Development Workflow

### Local Development with Docker
```bash
# Start development environment
./deploy.sh dev

# Make changes to code (auto-reload enabled)
# View logs
./deploy.sh logs

# Run tests
docker-compose exec backend python manage.py test

# Access Django shell
docker-compose exec backend python manage.py shell

# Create migrations
docker-compose exec backend python manage.py makemigrations

# Apply migrations
docker-compose exec backend python manage.py migrate
```

### Database Management
```bash
# Access PostgreSQL shell
docker-compose exec db psql -U trustedlegal_user trustedlegal_db

# Import data
docker-compose exec -T db psql -U trustedlegal_user trustedlegal_db < data.sql

# Export data
docker-compose exec db pg_dump -U trustedlegal_user trustedlegal_db > data.sql
```

## 🌐 Production Deployment Checklist

- [ ] Set strong SECRET_KEY
- [ ] Configure ALLOWED_HOSTS
- [ ] Set up SSL certificates
- [ ] Configure domain name
- [ ] Set strong database password
- [ ] Configure email settings
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test health endpoints
- [ ] Configure log rotation
- [ ] Set up firewall rules
- [ ] Configure reverse proxy
- [ ] Test disaster recovery

## 📞 Support

For deployment issues or questions:
- Check logs: `./deploy.sh logs`
- Health check: `./deploy.sh health`
- Create GitHub issue with logs and configuration
- Email: tech@trustedlegal.bd

---

**TrustedLegal BD** - Professional Legal Services Platform
Built with ❤️ using React, Django, and Docker