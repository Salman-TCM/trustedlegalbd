#!/bin/bash

# TrustedLegal BD Deployment Script
# This script helps deploy the application in different environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are installed."
}

# Development environment
deploy_development() {
    print_header "DEPLOYING DEVELOPMENT ENVIRONMENT"
    
    print_status "Building and starting development containers..."
    docker-compose up --build -d
    
    print_status "Waiting for services to be ready..."
    sleep 10
    
    print_status "Running database migrations..."
    docker-compose exec backend python manage.py migrate
    
    print_status "Creating superuser (if needed)..."
    docker-compose exec backend python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"
    
    print_status "Loading sample data..."
    docker-compose exec backend python manage.py loaddata services/fixtures/sample_data.json || true
    
    print_header "DEVELOPMENT DEPLOYMENT COMPLETE"
    echo -e "${GREEN}Frontend:${NC} http://localhost"
    echo -e "${GREEN}Backend API:${NC} http://localhost:8000"
    echo -e "${GREEN}Admin Panel:${NC} http://localhost:8000/admin"
    echo -e "${GREEN}API Docs:${NC} http://localhost:8000/api/docs"
    echo -e "${GREEN}Superuser:${NC} admin / admin123"
}

# Production environment
deploy_production() {
    print_header "DEPLOYING PRODUCTION ENVIRONMENT"
    
    # Check for required environment variables
    if [[ -z "${SECRET_KEY}" ]]; then
        print_warning "SECRET_KEY not set. Using default (change for production!)"
    fi
    
    if [[ -z "${POSTGRES_PASSWORD}" ]]; then
        print_warning "POSTGRES_PASSWORD not set. Using default (change for production!)"
    fi
    
    print_status "Building and starting production containers..."
    docker-compose -f docker-compose.prod.yml up --build -d
    
    print_status "Waiting for services to be ready..."
    sleep 20
    
    print_status "Running database migrations..."
    docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
    
    print_status "Collecting static files..."
    docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
    
    print_header "PRODUCTION DEPLOYMENT COMPLETE"
    echo -e "${GREEN}Frontend:${NC} http://localhost"
    echo -e "${GREEN}Backend API:${NC} http://localhost:8000"
    print_warning "Remember to:"
    print_warning "1. Set up SSL certificates"
    print_warning "2. Configure your domain name"
    print_warning "3. Set strong passwords"
    print_warning "4. Configure backup strategy"
}

# Backup database
backup_database() {
    print_header "BACKING UP DATABASE"
    
    backup_file="backup_$(date +%Y%m%d_%H%M%S).sql"
    
    if docker-compose ps | grep -q "db"; then
        print_status "Creating database backup: $backup_file"
        docker-compose exec db pg_dump -U trustedlegal_user trustedlegal_db > "$backup_file"
        print_status "Backup created successfully: $backup_file"
    else
        print_error "Database container is not running"
        exit 1
    fi
}

# Stop services
stop_services() {
    print_header "STOPPING SERVICES"
    docker-compose down
    docker-compose -f docker-compose.prod.yml down
    print_status "All services stopped"
}

# Clean up
cleanup() {
    print_header "CLEANING UP"
    print_warning "This will remove all containers, volumes, and images. Are you sure? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        docker-compose down -v --rmi all
        docker-compose -f docker-compose.prod.yml down -v --rmi all
        print_status "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Show logs
show_logs() {
    print_header "SHOWING LOGS"
    docker-compose logs -f
}

# Health check
health_check() {
    print_header "HEALTH CHECK"
    
    # Check frontend
    if curl -f http://localhost > /dev/null 2>&1; then
        print_status "Frontend is healthy"
    else
        print_error "Frontend is not responding"
    fi
    
    # Check backend
    if curl -f http://localhost:8000/api/health/ > /dev/null 2>&1; then
        print_status "Backend is healthy"
    else
        print_error "Backend is not responding"
    fi
    
    # Check database
    if docker-compose exec db pg_isready -U trustedlegal_user -d trustedlegal_db > /dev/null 2>&1; then
        print_status "Database is healthy"
    else
        print_error "Database is not responding"
    fi
}

# Main menu
show_usage() {
    echo "TrustedLegal BD Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev, development    Deploy development environment"
    echo "  prod, production    Deploy production environment"
    echo "  backup             Backup database"
    echo "  stop               Stop all services"
    echo "  logs               Show logs"
    echo "  health             Check service health"
    echo "  cleanup            Remove all containers and data"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev             # Deploy for development"
    echo "  $0 prod            # Deploy for production"
    echo "  $0 backup          # Backup database"
    echo "  $0 health          # Check if services are running"
    echo ""
}

# Main script
main() {
    check_docker
    
    case "${1:-}" in
        "dev"|"development")
            deploy_development
            ;;
        "prod"|"production")
            deploy_production
            ;;
        "backup")
            backup_database
            ;;
        "stop")
            stop_services
            ;;
        "logs")
            show_logs
            ;;
        "health")
            health_check
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"-h"|"--help")
            show_usage
            ;;
        *)
            print_error "Unknown command: ${1:-}"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"