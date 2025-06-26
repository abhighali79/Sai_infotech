# SAI INFOTECH - Deployment Guide

## Render Deployment Instructions

### Prerequisites
1. GitHub account with this repository
2. Render account (free tier available)
3. PostgreSQL database credentials
4. Cloudinary account (for image hosting)

### Step 1: Database Setup
1. Create a PostgreSQL database on Render or external provider
2. Note down the DATABASE_URL connection string
3. The application will automatically run migrations on startup

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Recommended)
1. Push this repository to GitHub
2. Connect your GitHub account to Render
3. Create a new "Web Service" and select this repository
4. Render will automatically detect the `render.yaml` configuration
5. Set the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A secure random string (32+ characters)
   - `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset
   - `NODE_ENV`: `production`

#### Option B: Manual Setup
1. Create a new "Web Service" on Render
2. Connect your GitHub repository
3. Configure build and start commands:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Set environment variables (same as Option A)

### Step 3: Environment Variables
Set these in your Render dashboard:

```
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secure-session-secret-here
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NODE_ENV=production
```

### Step 4: Domain Configuration
1. Your app will be available at `https://your-app-name.onrender.com`
2. Optionally configure a custom domain in Render settings

### Step 5: Admin Setup
1. Visit your deployed application
2. Go to `/auth` and login with:
   - Username: `admin`
   - Password: `admin123`
3. **Important**: Change the admin password immediately after first login

### Performance Optimizations Included
- ✅ Image optimization with Cloudinary
- ✅ Production security headers
- ✅ Minified JavaScript bundles
- ✅ Gzip compression
- ✅ Database connection pooling
- ✅ Health check endpoint (`/api/health`)
- ✅ SEO meta tags and structured data
- ✅ Mobile-responsive design

### Health Monitoring
- Health check available at: `https://your-app.onrender.com/api/health`
- Monitor server logs in Render dashboard
- Database performance metrics in your PostgreSQL provider

### Troubleshooting
1. **Build fails**: Check Node.js version compatibility
2. **Database connection**: Verify DATABASE_URL format
3. **Images not loading**: Check Cloudinary configuration
4. **Session issues**: Ensure SESSION_SECRET is set

### Post-Deployment Checklist
- [ ] Application loads successfully
- [ ] Admin login works
- [ ] Product images display correctly
- [ ] WhatsApp integration functions
- [ ] Search and filtering work
- [ ] Mobile responsiveness verified
- [ ] SEO tags appear in page source

### Support
For deployment issues, check:
1. Render build logs
2. Application logs in Render dashboard
3. Database connection status
4. Environment variable configuration

The application is optimized for production with automatic scaling, security headers, and performance monitoring ready for a professional e-commerce deployment.