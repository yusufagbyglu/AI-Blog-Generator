# AI Blog Generator

An end-to-end application that uses AI to generate, manage, and display blog posts. The project consists of a Python FastAPI backend and a modern JavaScript frontend.

## Project Structure

```
AI Blog Generator/
├── backend/   # FastAPI backend (API, DB, AI logic)
├── frontend/  # Frontend (React/Vite or similar)
└── README.md  # (This file)
```

## Features
- Generate blog posts using AI APIs
- Manage and store blog posts (CRUD)
- Modern, responsive frontend UI
- Environment variable support (.env files)

---

## Backend (FastAPI)
- **Location:** `backend/`
- **Tech:** FastAPI, SQLAlchemy, SQLite, python-dotenv

### Setup & Run
1. **Install Python 3.9+**
2. **Create virtual environment:**
   ```bash
   python -m venv env
   env\Scripts\activate  # On Windows
   # Or
   source env/bin/activate  # On Mac/Linux
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment variables:**
   - Edit `backend/.env` with your API keys and DB URL.
   - TAVILY_API_KEY= ''
   - GROQ_API_KEY = ''
   - DATABASE_URL=s"sqlite:///./blog_generator.db"
   - DEBUG=True
5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```
   - API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Frontend
- **Location:** `frontend/`
- **Tech:** Likely React (Vite), Tailwind CSS, etc.

### Setup & Run
1. **Install Node.js (v16+)**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   - App runs at [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Environment Variables
- **Backend:** `backend/.env` (API keys, DB URL)
- **Frontend:** `frontend/.env` (if needed, e.g., for API base URLs)

**Note:** `.env` files may be visible in this repo for demonstration, but do not commit real API keys to public repositories.

---

## Development & Contribution
- Fork and clone the repo
- Use separate virtual environments for backend and frontend
- PRs and issues welcome!

---

## License
MIT
