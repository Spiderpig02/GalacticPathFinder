FROM python:3.12-slim

# Set environment variables to prevent Python from buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY . .

# Install the application dependencies.
RUN uv sync --frozen --no-cache

# Expose the application port
EXPOSE 8000

# Run the application (use Uvicorn instead of FastAPI directly)
CMD ["uv", "run", "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--proxy-headers"]