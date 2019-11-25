# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.6.9

WORKDIR /usr/src/app

# Installation
COPY python/api.py .
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Setup the Flask API
CMD [ "export", "FLASK_APP=api.py" ]
CMD [ "flask", "run" ]
