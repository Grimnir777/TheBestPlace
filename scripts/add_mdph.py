import pandas
from pandas.io.json import json_normalize
from pymongo import MongoClient
import os
import json

basePath = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/")

# connect to the database
client = MongoClient('localhost:27017')
db=client.TheBestPlace.villes

toInsert = '{ "criteres" : { "presence_MDPH" : {"valeur":0, "note":0 } } }'
jsonToInsert = json.loads(toInsert)

db.update_many({},{"$set": {"criteres.presence_MDPH.valeur":0,"criteres.presence_MDPH.note":0}} )
# read data
df = pandas.read_json( basePath + '/mdph.json')

# get insee code
ville_avec_mdph = pandas.DataFrame(df['commune_cog'].copy())

# add column
ville_avec_mdph['PresenceMDPH']=1

# rename code insee
ville_avec_mdph.columns=['code_insee','presence_MDPH']

print(ville_avec_mdph)

for index, row in ville_avec_mdph.iterrows():
    jsonObject = json.loads(ville_avec_mdph.loc[index].to_json())
    criteres = jsonToInsert
    criteres['criteres']['presence_MDPH']['valeur'] = jsonObject['presence_MDPH']
    db.find_one_and_update({'code_commune':row['code_insee']}, {"$set": {"criteres.presence_MDPH.valeur":jsonObject['presence_MDPH']}})
