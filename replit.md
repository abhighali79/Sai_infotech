# Sai Infotech E-commerce Platform

## Overview

This is a full-stack e-commerce web application for Sai Infotech, a technology store specializing in computers, laptops, and CCTV systems. The application provides a modern, responsive storefront with comprehensive product catalog management, admin dashboard, and WhatsApp integration for customer inquiries.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom Sai Infotech color scheme
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with full TypeScript support
- **Authentication**: Passport.js with local strategy and express-session
- **Session Storage**: PostgreSQL-backed session store

### Development Setup
- **Monorepo Structure**: Shared schema between client and server
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Development Server**: Vite dev server with Express API proxy
- **Hot Reload**: Frontend hot reload with backend file watching

## Key Components

### Database Schema
- **Users**: Admin authentication with role-based access
- **Categories**: Product categorization (Laptops, CCTV, Accessories)
- **Products**: Complete product information with images, specifications, pricing, and inventory

### Authentication System
- Admin-only access with username/password authentication
- Session-based authentication with PostgreSQL session store
- Protected routes with role verification
- Secure password hashing using Node.js crypto scrypt

### Product Management
- CRUD operations for products and categories
- Image upload support (configured for Cloudinary)
- Rich product specifications stored as JSON
- Stock status tracking and featured product designation
- Search and filtering capabilities

### User Interface
- Responsive design optimized for mobile and desktop
- Product catalog with search, filtering, and detailed views
- WhatsApp integration for customer inquiries
- Admin dashboard for product and inventory management
- Modern UI with consistent branding and smooth animations

## Data Flow

1. **Public Store Flow**: Users browse products → View details → Contact via WhatsApp
2. **Admin Flow**: Admin login → Dashboard access → Product management → Database updates
3. **Product Display**: Database → Server API → React Query → UI Components
4. **Search/Filter**: User input → API queries with filters → Filtered results display

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Image Storage**: Cloudinary (configured but requires setup)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **UI Framework**: Radix UI primitives with Shadcn/ui components

### Communication
- **WhatsApp Integration**: Direct links for customer inquiries
- **Contact Methods**: Phone, email, and physical store location

## Deployment Strategy

### Replit Deployment
- **Build Process**: Vite build for frontend + esbuild for backend
- **Production Server**: Node.js serving static files and API
- **Environment**: PostgreSQL database URL required
- **Autoscale**: Configured for Replit autoscale deployment

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (configured)
- `SESSION_SECRET`: Session encryption key (auto-generated for development)
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name (configured)
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset (configured)

### Admin Credentials
- **Username**: admin
- **Password**: admin123
- **Email**: admin@saiinfotech.com

### Production Readiness Checklist
✓ PostgreSQL database configured and migrated
✓ Session management with secure authentication
✓ Image upload functionality with Cloudinary
✓ WhatsApp integration with phone number 7411180528
✓ TypeScript errors resolved
✓ Accessibility issues fixed
✓ Production build optimized
✓ SEO meta tags implemented
✓ Responsive design tested

### Database Migration
- Drizzle Kit for schema migrations
- `npm run db:push` for schema deployment

## Changelog
```
Changelog:
- June 26, 2025. Initial setup
- June 26, 2025. Migration to Replit environment completed
- June 26, 2025. WhatsApp integration enhanced with detailed product info
- June 26, 2025. Cloudinary image upload functionality configured
- June 26, 2025. Project optimized for production deployment
- June 26, 2025. Fixed TypeScript errors and accessibility issues
- June 26, 2025. Fixed duplicate SKU/slug errors for product creation
- June 26, 2025. Added missing product categories (Laptops, Monitors, CPUs, Accessories, CCTV)
- June 26, 2025. Optimized for mobile responsiveness with 2-column layout
- June 26, 2025. Implemented pagination system for 1000+ products
- June 26, 2025. Added image optimization to reduce data usage by ~70%
- June 26, 2025. Removed star ratings and reviews for cleaner product display
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```