# Use the official lightweight Python image.
# https://hub.docker.com/_/python
# FROM python:3.6.9
FROM tiangolo/meinheld-gunicorn:python3.6

WORKDIR /app

# Installation
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./platy-api/main.py .
