from flask_restful import Resource


class PetAPI(Resource):
    def get(self):
        return {
            'test': 'yay it works!'
        }