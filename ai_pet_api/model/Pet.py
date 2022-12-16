import json


class Pet:
    def __init__(self, name, pet_type):
        self.__name = name
        self.__pet_type = pet_type
        self.__traits = dict()

    def get_name(self):
        return self.__name

    def get_pet_type(self):
        return self.__pet_type

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__)
