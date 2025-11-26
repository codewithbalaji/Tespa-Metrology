# Project Structure

## Monorepo Layout

```
/
├── frontend/          # Customer-facing React app
├── admin/            # Admin dashboard React app
├── backend/          # Express API server
└── start.bat         # Windows script to start all services
```

## Frontend Structure

```
frontend/src/
├── components/       # Reusable UI components
│   ├── auth/        # Authentication modals
│   ├── home/        # Home page sections
│   ├── layout/      # Layout components (header, footer, etc.)
│   ├── products/    # Product-related components
│   └── ui/          # Shadcn UI components
├── context/         # React Context providers (ShopContext, LanguageContext)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions (utils.ts)
├── pages/           # Route pages
├── types/           # TypeScript type definitions
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## Admin Structure

```
admin/src/
├── components/
│   ├── forms/       # Form components (ProductForm with subcomponents)
│   ├── ui/          # Shadcn UI components
│   ├── Login.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── lib/             # Constants and utilities
├── pages/           # Admin pages (Add, List, Edit, Orders, etc.)
├── types/           # TypeScript types (api.ts)
└── App.tsx          # Main app with auth + routing
```

## Backend Structure

```
backend/
├── config/          # Configuration files
│   ├── cloudinary.js
│   ├── emailTemplates.js
│   ├── mongodb.js
│   └── nodemailer.js
├── controllers/     # Request handlers (business logic)
├── middleware/      # Auth, multer, etc.
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── utils/           # Helper functions (error handling, chat data)
└── server.js        # Entry point
```

## Key Patterns

### Backend API Structure
- Routes defined in `/routes` folder
- Controllers handle business logic in `/controllers`
- Models define MongoDB schemas in `/models`
- Middleware for auth (`auth.js`, `adminAuth.js`) and file uploads (`multer.js`)
- All routes prefixed with `/api/*` except sitemap

### Frontend Data Flow
- Context API for global state (ShopContext)
- TanStack Query for server state
- Axios for HTTP requests to backend
- Token stored in localStorage for authentication

### Component Organization
- UI components from Shadcn in `components/ui/`
- Feature-specific components in subdirectories
- Pages in `pages/` directory map to routes
- Shared utilities in `lib/`

### Product Data Model
Products have flexible sections:
- `specifications`: Array of spec objects
- `features`: Array of feature objects
- Images stored in Cloudinary, URLs in MongoDB
- Slug-based URLs generated from product name
