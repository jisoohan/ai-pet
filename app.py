from flask import Flask, send_from_directory
from flask_restful import Api

from ai_pet_api.resource.PetAPI import PetAPI

app = Flask('ai-pet', static_url_path='', static_folder='ai_pet_frontend/build')

api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(PetAPI, '/pet')