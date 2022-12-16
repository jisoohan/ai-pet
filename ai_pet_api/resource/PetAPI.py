from flask import request, Response
from flask_restful import Resource, abort

from ai_pet_api.model.PetType import PetType
from ai_pet_api.model.Pet import Pet


class PetAPI(Resource):

    def get(self):
        return {
            'test': 'yay it works!'
        }

    def post(self):
        name = request.json.get('name')
        pet_type = request.json.get('pet_type')
        self.validate_pet_create_args(name, pet_type)
        pet = Pet(name, PetType[pet_type.upper()])
        return pet.to_json()

    def validate_pet_create_args(self, name, pet_type):
        if name is None:
            abort(Response(status=404, response='Missing pet name'))
        if pet_type is None:
            abort(Response(status=404, response='Missing pet type'))
        if pet_type.upper() not in PetType.__members__:
            abort(Response(status=404, response='Invalid pet type: ' + pet_type))

