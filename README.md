# Internshala Internship Search Page Clone

A modern and responsive internship search page inspired by Internshala, built using **React + Vite + Tailwind CSS**.

---

# Live Demo

🔗 Add your deployed Vercel link here

Example:

```txt
https://internshala-clone.vercel.app
```

---

# GitHub Repository

🔗 Add your GitHub repository link here

Example:

```txt
https://github.com/your-username/internshala-clone
```

---

# Features

## Internship Listings

* Fetches internship data from Internshala API
* Displays internship cards with:

  * Internship title
  * Company name
  * Location
  * Duration
  * Stipend
  * Start date
  * Apply button

---

## Frontend Filtering

Users can filter internships by:

* Profile
* Location
* Duration
* Stipend

Filtering is handled completely on the frontend using JavaScript array methods.

---

## Responsive Design

* Desktop layout with sidebar filters
* Mobile-friendly responsive UI
* Clean and modern card design

---

## UI Improvements

* Reusable React components
* Hover effects
* Modern typography
* Company logo fallback initials
* Loading and empty states

---

# Tech Stack

* React
* Vite
* Tailwind CSS
* JavaScript

---

# API Used

```txt
https://internshala.com/hiring/search
```

---

# Important API Note

The internship data returned by the API is stored as an object instead of an array.

Example:

```js
{
  internships_meta: {
    "65532": { ... },
    "65531": { ... }
  }
}
```

To render the internships using `.map()`, the object is converted into an array using:

```js
Object.values(data.internships_meta)
```

---

# Project Structure

```txt
src/
 ├── components/
 │    ├── Filters.jsx
 │    ├── InternshipCard.jsx
 │    └── InternshipList.jsx
 │
 ├── pages/
 │    └── Home.jsx
 │
 ├── services/
 │    └── api.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/internshala-clone.git
```

---

## Navigate to Project

```bash
cd internshala-clone
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# Build for Production

```bash
npm run build
```

---

# Deployment

The project is deployed using:

* Vercel

---

# Screenshots

Add screenshots here after completing the UI.

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# Learning Outcomes

Through this project, I practiced:

* React component architecture
* State management using hooks
* API fetching using `fetch`
* Frontend filtering logic
* Responsive UI development
* Reusable component design
* Tailwind CSS styling

---

# Future Improvements

* Debounced search
* Pagination / Infinite scrolling
* URL query parameters
* Bookmark internships
* Dark mode

---

# Author

Your Name

LinkedIn: Add your LinkedIn
GitHub: Add your GitHub profile
