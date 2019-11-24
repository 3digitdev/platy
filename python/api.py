import pymongo
import json

from bson.objectid import ObjectId
from flask import Flask, request
from flask_cors import CORS

app = Flask("platy")
# TODO: REMOVE THIS
CORS(app)

def connect_db(db, collection):
    client = pymongo.MongoClient(
        # TODO:  STORE CREDENTIALS SECURELY, AND NEVER COMMIT THEM
        "mongodb+srv://<NICE-TRY>:<HAHA-NOPE>@platy-store-rh5wf.gcp.mongodb.net/test?retryWrites=true&w=majority"
    )
    return client[db][collection]

def to_dict(platytude):
    return {
        "id": str(platytude["_id"]),
        "sender": platytude["sender"],
        "plat_text": platytude["plat_text"],
        "score": platytude["score"],
        "xforms": platytude["xforms"]
    }

def to_json(platytude):
    return json.dumps(to_dict(platytude))

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
        { '_id': ObjectId(id) }, { "$set": modification }, upsert=False
    ).acknowledged

def add_new_platytude(platytude):
    return json.dumps({ "id": str(connect_db("platy", "platytudes").insert_one(platytude).inserted_id) })

@app.route("/platytudes", methods=['GET'])
def all_platytudes():
    if request.method == 'GET':
        return get_all_platytudes()

@app.route("/platytude", methods=['POST'])
def single_platytude():
    if request.method == 'POST':
        data = request.get_json()
        data["score"] = 0
        data["xforms"] = []
        return add_new_platytude(data)

@app.route("/platytude/<plat_id>", methods=['GET', 'PUT'])
def platytude_by_id(plat_id):
    if request.method == 'GET':
        return get_by_id(plat_id)
    elif request.method == 'PUT':
        if (update_platytude(plat_id, request.get_json())):
            return get_by_id(plat_id)
