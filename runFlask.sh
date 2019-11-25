#!/bin/bash
source venv/bin/activate
cd platy-api
export FLASK_APP=main.py
flask run
