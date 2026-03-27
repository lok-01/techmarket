# Tech Market – E-commerce Web Application

A modern e-commerce frontend application built using React and Vite. The project demonstrates client-side routing, responsive UI design, and deployment on Vercel.

---

## Live Demo

https://techmarket-bice.vercel.app

---

## Features

* Home page with structured layout
* Product listing interface
* About page
* Contact form
* Authentication UI (Login and Signup)
* Wishlist and cart interface
* Fast performance using Vite
* Client-side routing with React Router

---

## Tech Stack

* Frontend: React.js
* Build Tool: Vite
* Routing: React Router DOM
* Styling: CSS
* Deployment: Vercel

---

## Project Structure

```
techmarket/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/techmarket.git
cd techmarket
```

### 2. Install dependencies

```
npm install
```

### 3. Run locally

```
npm run dev
```

Application will run at:
http://localhost:5173

---

## Build for Production

```
npm run build
```

---

## Deployment (Vercel)

This project is deployed on Vercel.

### SPA Routing Configuration

To prevent 404 errors when refreshing routes such as `/contact`, the following configuration is required:

File: `vercel.json`

```
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Known Issue and Fix

Problem:
Refreshing routes like `/contact` results in a 404 error.

Reason:
Vercel attempts to find a server-side route instead of using client-side routing.

Solution:
Use a rewrite rule to redirect all routes to `index.html`, allowing React Router to handle navigation.

---

## Future Improvements

* Backend integration (Node.js or Spring Boot)
* Payment gateway integration
* Search and filtering functionality
* Full cart implementation
* Authentication with JWT

---

## Author

Lokesh
Aspiring Full Stack Developer focused on React and backend development

---

## Contact

For collaboration or queries:
[lokesh06.dev@gmail.com](mailto:your-email@example.com)
