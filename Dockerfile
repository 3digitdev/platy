# Use the official lightweight Python image.
FROM tiangolo/meinheld-gunicorn:python3.6

WORKDIR /app

# Installation
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./platy-api/main.py .
