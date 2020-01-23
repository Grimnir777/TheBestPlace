import sys
import pandas
import json
import os
from pymongo import MongoClient

#CONFIG DB
client = MongoClient('localhost:27017')
db=client.TheBestPlace.villes

# CONFIG SCRIPT
basePath = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/")
IN_FILE_PATH = basePath + "/MDB-INSEE-V2.csv"
SELECT_CHAMP = ["Population", "Taux etudiants","Nb Etudiants","Nb Log Vacants","Nb Logement"]


# créé de la données pour toutes les villes avec des valeurs nulles
for champ in SELECT_CHAMP:
    valeur = "criteres." + champ.replace(' ','_').lower() + ".valeur"
    note = "criteres." + champ.replace(' ','_').lower() + ".note"
    db.update_many({},{"$set": {valeur:0,note:0}} )

print('initialisation des champs  ok')


search_els = ['CODGEO'] + SELECT_CHAMP
df =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = search_els, low_memory = False )

for index, row in df.iterrows():
    objectJson = json.loads(df.loc[index].to_json())
    cod = objectJson['CODGEO']
    del objectJson['CODGEO']
    updateToDo = "{"
    for obj in objectJson:
        updateToDo = updateToDo + '"criteres.' + obj.replace(' ','_').lower() + '.valeur":' + str(objectJson[obj]) + ','
    updateToDo = updateToDo[ : -1] + "}"
    db.find_one_and_update({'code_commune':cod}, {"$set": json.loads(updateToDo)} )
print('import réussi')