from pymongo import MongoClient
import pymongo
import json

# connect to the database
client = MongoClient('localhost:27017')
villes=client.TheBestPlace.villes
criteres=client.TheBestPlace.criteres

for key in villes.find_one({})['criteres']:
    city_with_max_val = villes.find().sort("criteres." + key + ".valeur", pymongo.DESCENDING).limit(1)[0]
    max_val = city_with_max_val['criteres'][key]['valeur']
    to_insert = {
        "name" : key,
        "val_max": max_val
    }
    print('clé : ', key) 
    print('Valeur max', max_val)
    criteres.find_one_and_update({'name': key},{"$set": to_insert},upsert=True)

# criteres = [
#     {
#         "name":"presence_MDPH",
#         "real_name": "Présence d'une MDPH",
#         "type":"checkbox",
#         "note_max":"1"
#     },
#     {
#         "name":"nb_festival",
#         "real_name": "Nombre de festivals",
#         "type":"checkbox",
#         "note_max":"188"
#     }
# ]

