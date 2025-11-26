# Tech Stack

## Frontend & Admin

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Routing**: React Router DOM v6+
- **State Management**: React Context API + TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Toastify, Sonner

## Backend

- **Runtime**: Node.js with ES modules (`"type": "module"`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe, Razorpay
- **AI**: Google Generative AI
- **Email**: Nodemailer (configured in `backend/config/nodemailer.js`)

## Common Commands

### Development
```bash
# Start all services (Windows)
start.bat

# Individual services
cd frontend && npm run dev    # Frontend dev server
cd admin && npm run dev       # Admin dev server
cd backend && npm run dev     # Backend with nodemon
```

### Build & Deploy
```bash
# Frontend
cd frontend && npm run build          # Production build
cd frontend && npm run build:dev      # Development build

# Admin
cd admin && npm run build             # TypeScript check + build
```

### Other
```bash
# Linting
npm run lint

# Generate sitemap (frontend)
cd frontend && npm run generate-sitemap
```

## Environment Variables

Each application requires a `.env` file (see `.env.example` files):

- **Frontend**: `VITE_BACKEND_URL`, `VITE_API_URL`
- **Admin**: `VITE_BACKEND_URL`
- **Backend**: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `STRIPE_SECRET_KEY`, `RAZORPAY_*`, `FRONTEND_URL`, `ADMIN_URL`, email config, etc.
