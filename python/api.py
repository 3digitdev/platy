import pymongo
import json
import os

from bson.objectid import ObjectId
from flask import Flask, request
from jsonschema import Draft7Validator
from jsonschema.exceptions import ValidationError

app = Flask("platy")

MONGO_USER = os.environ['PLATY_MONGO_USER']
MONGO_PASS = os.environ['PLATY_MONGO_PASS']
PLATYTUDE_SCHEMAS = {
    "POST": { # Schema for creating Platytudes
        "$schema": "https://json-schema.org/schema#",
        "type": "object",
        "properties": {
            "sender": { "type": "string" },
            "plat_text": { "type": "string" },
            "score": { "type": "number" },
            "original_text": { "type": "string" }
        },
        "required": [ "sender", "plat_text" ]
    },
    "PUT": { # Schema for updating Platytudes
        "$schema": "https://json-schema.org/schema#",
        "type": "object",
        "properties": {
            "sender": { "type": "string" },
            "plat_text": { "type": "string" },
            "score": { "type": "number" },
            "original_text": { "type": "string" }
        }
    }
}

# --- HELPER FUNCTIONS --- #
def to_dict(platytude):
    # This is used to properly convert the id from ObjectId
    return {
        "id": str(platytude["_id"]),
        "sender": platytude["sender"],
        "plat_text": platytude["plat_text"],
        "score": platytude["score"],
        "original_text": platytude["original_text"]
    }

def to_json(platytude):
    return json.dumps(to_dict(platytude))
# ------------------------ #

# --- MongoDB FUNCTIONS --- #
def connect_db(db, collection):
    client = pymongo.MongoClient(
        f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@platy-store-rh5wf.gcp.mongodb.net/test?retryWrites=true&w=majority"
    )
    return client[db][collection]

def get_all_platytudes():
    results = [to_dict(p) for p in connect_db("platy", "platytudes").find({})]
    return json.dumps(results)

def get_by_id(id):
    return to_json(connect_db("platy", "platytudes").find_one({ "_id": ObjectId(id) }))

def get_by_sender(name):
    return to_json(connect_db("platy", "platytudes").find_one({ "sender": name }))

def update_platytude(id, modification):
    return connect_db(
        "platy", "platytudes"
    ).update_one(
        { "_id": ObjectId(id) }, { "$set": modification }, upsert=False
    ).acknowledged

def add_new_platytude(platytude):
    return json.dumps({ "id": str(connect_db("platy", "platytudes").insert_one(platytude).inserted_id) })
# ------------------------- #


# GET all Platytudes
@app.route("/platytudes", methods=["GET"])
def all_platytudes():
    if request.method == "GET":
        return get_all_platytudes()

# POST create of a new Platytude
# Requires JSON body:
# { "sender": string, "plat_text": string }
# Will override attempts to set any other fields
@app.route("/platytude", methods=["POST"])
def single_platytude():
    if request.method == "POST":
        data = request.get_json()
        validator = Draft7Validator(PLATYTUDE_SCHEMAS[request.method])
        try:
            validator.validate(data)
            data["score"] = 0
            data["original_text"] = data["plat_text"]
            return add_new_platytude(data)
        except ValidationError: # Incoming JSON body didn't match schema
            errors = [err.message for err in sorted(validator.iter_errors(data), key=str)]
            return app.make_response((errors, 400))


# GET/PUT for dealing with singular Platytudes
# PUT JSON body can be used to change the following:
#    sender, plat_text, score
@app.route("/platytude/<plat_id>", methods=["GET", "PUT"])
def platytude_by_id(plat_id):
    if request.method == "GET":
        return get_by_id(plat_id)
    elif request.method == "PUT":
        data = request.get_json()
        validator = Draft7Validator(PLATYTUDE_SCHEMAS[request.method])
        try:
            validator.validate(data)
            if (update_platytude(plat_id, data)):
                return get_by_id(plat_id)
        except ValidationError:
            errors = [err.message for err in sorted(validator.iter_errors(data), key=str)]
            return app.make_response((errors, 400))
