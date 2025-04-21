# AI Blog Generator Backend

This is the backend for the AI Blog Generator application, built with FastAPI and SQLAlchemy.

## Features
- REST API for generating and managing blog posts using AI
- SQLite database for storage
- Environment variable support via `.env` files

## Requirements
- Python 3.9+

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI Blog Generator/backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv env
   env\Scripts\activate  # On Windows
   # Or
   source env/bin/activate  # On Mac/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Edit the `.env` file to set your API keys and database URL. Example:
     ```env
     TAVILY_API_KEY=your_tavily_api_key
     GROQ_API_KEY=your_groq_api_key
     DATABASE_URL=sqlite:///./blog_generator.db
     DEBUG=True
     ```

5. **Run the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```
   - The server will start at `http://127.0.0.1:8000`
   - API docs available at `http://127.0.0.1:8000/docs`

## Notes
- For production, set `DEBUG=False` in your `.env` file and use a production-ready server setup.
- Do **not** commit real API keys or sensitive data to public repositories.

## License
MIT
