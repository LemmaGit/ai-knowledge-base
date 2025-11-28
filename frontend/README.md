# AI Knowledge Base Frontend

A modern, responsive frontend for the AI Knowledge Base Platform built with React, TypeScript, TailwindCSS, and DaisyUI.

## Features

### Authentication
- ✅ Login page with form validation
- ✅ Signup page with password confirmation
- ✅ Email verification page
- ✅ Forgot password page
- ✅ Reset password page
- ✅ JWT token management (localStorage)

### Dashboard
- ✅ Sidebar navigation (responsive)
- ✅ User information display
- ✅ Email verification status
- ✅ Resend verification email
- ✅ Quick stats and actions

### Articles
- ✅ Article list page with search
- ✅ Article detail page with AI summary
- ✅ Create article page
- ✅ Edit article page
- ✅ Delete article with confirmation modal
- ✅ Keyword highlighting in search results
- ✅ Tags support

### AI Features
- ✅ AI chat widget (floating bubble)
- ✅ Conversation history
- ✅ Loading indicators and typing animations
- ✅ Article-specific context

### Components
- ✅ Navbar with user menu
- ✅ Footer
- ✅ Sidebar navigation
- ✅ Theme switcher (light/dark)
- ✅ Protected route wrapper
- ✅ Delete confirmation modal
- ✅ Toast notifications (react-hot-toast)

### Technical Stack
- React 19
- TypeScript
- React Router DOM
- React Query (@tanstack/react-query)
- React Hook Form
- Zod validation
- Axios for API calls
- DaisyUI + TailwindCSS
- Lucide React icons

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
VITE_API_URL=http://localhost:3000
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable components
├── contexts/         # React contexts (Auth, Theme)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and types
├── pages/            # Page components
└── App.tsx           # Main app with routing
```

## API Integration

The frontend integrates with the following backend endpoints:

- `POST /login` - User login
- `POST /signup` - User registration
- `GET /verify-email` - Email verification
- `GET /articles` - Get all articles
- `GET /articles/:id` - Get article by ID
- `POST /articles` - Create article
- `PUT /articles/:id` - Update article
- `DELETE /articles/:id` - Delete article

## Notes

- Authentication tokens are stored in localStorage
- Protected routes require authentication
- Theme preference is persisted in localStorage
- All forms use React Hook Form with Zod validation
- API calls are managed with React Query

