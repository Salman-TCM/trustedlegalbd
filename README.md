# TrustedLegal BD - Legal Consultancy Website

A comprehensive legal consultancy website with React frontend and Django REST API backend.

## 🚀 Features

### Frontend (React)
- ⚡ Modern React with functional components and hooks
- 🎨 Tailwind CSS for responsive design
- 🌐 Multi-language support (English/Bengali)
- 📱 Mobile-responsive design
- 🔄 Real-time data fetching with React Query
- 📋 Service inquiry forms
- ⭐ Client testimonials
- 🎯 Interactive service grid

### Backend (Django REST API)
- 🛡️ JWT-based authentication
- 📊 Dynamic service management
- 💼 Service categories and inquiries
- ⭐ Testimonials system
- 👥 User management
- 📖 Auto-generated API documentation
- 🔐 Role-based permissions
- 🌐 CORS enabled for frontend integration

## 🏗️ Architecture

```
trustedlegalbd/
├── src/                    # React Frontend
│   ├── components/         # React components
│   ├── contexts/          # React contexts (Auth, Language)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   └── config/            # Configuration files
├── backend/               # Django Backend
│   ├── legal_backend/     # Django project settings
│   ├── services/          # Services app
│   ├── authentication/    # Authentication app
│   └── requirements.txt   # Python dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- yarn or npm

### Frontend Setup
```bash
# Install dependencies
yarn install

# Start development server
yarn start
# Runs on http://localhost:3000
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver 8001
# Runs on http://localhost:8001
```

## 📡 API Endpoints

### Services
- `GET /api/services/` - List all services
- `GET /api/services/featured/` - Featured services
- `GET /api/services/{slug}/` - Service details
- `GET /api/categories/` - Service categories

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/profile/` - User profile
- `POST /api/auth/refresh/` - Refresh token

### Inquiries
- `POST /api/inquiries/` - Submit inquiry (public)
- `GET /api/inquiries/` - List inquiries (authenticated)

### Testimonials
- `GET /api/testimonials/` - List testimonials
- `GET /api/testimonials/featured/` - Featured testimonials

## 🔧 Configuration

### Environment Variables

Create `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

### Frontend API Configuration
Update `src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://localhost:8001/api';
```

## 🎯 Key Features Implemented

### Dynamic Service Management
- Services are fetched from Django backend
- Real-time pricing and features
- Category-based organization
- Admin panel for management

### Service Inquiries
- Contact form integration
- Automatic status tracking
- Admin notification system
- Client follow-up management

### Authentication System
- JWT token-based auth
- User registration/login
- Protected routes
- Profile management

### Testimonials
- Client feedback system
- Rating system (1-5 stars)
- Featured testimonials
- Admin moderation

## 🛠️ Development Tools

### Backend
- Django Admin: `http://localhost:8001/admin/`
- API Documentation: `http://localhost:8001/api/docs/`
- ReDoc: `http://localhost:8001/api/redoc/`

### Frontend
- React Query Devtools (development)
- ESLint for code quality
- Tailwind CSS for styling

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔒 Security Features

- JWT authentication with auto-refresh
- CORS protection
- Input validation and sanitization
- Role-based access control
- Protected API endpoints

## 🚀 Deployment Ready

The application is configured for easy deployment:
- Environment-based configuration
- Static file serving
- Database migrations
- Production settings

## 📞 Contact Information

- Website: TrustedLegal BD
- Email: info@trustedlegal.bd
- Phone: +880 1913-210664
- Emergency: 24/7 Legal Support

---

Built with ❤️ using React and Django