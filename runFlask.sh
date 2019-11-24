#!/bin/bash
source venv/bin/activate
cd python
export FLASK_APP=api.py
flask run
