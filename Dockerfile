# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.6.9

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY python/api.py .

CMD [ "python", "./api.py" ]
