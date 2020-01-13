import pandas
from pandas.io.json import json_normalize
from pymongo import MongoClient

# connect to the database
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

# read data
df = pandas.read_json('/home/valentin/Documents/Projet_XML/TheBestPlace/scripts/mdph.json')

# get insee code
ville_avec_mdph = pandas.DataFrame(df['commune_cog'].copy())

# add column
ville_avec_mdph['PresenceMDPH']="1"

# rename code insee
ville_avec_mdph.columns=['code_insee','presence_MDPH']

print(ville_avec_mdph)

# post
db.insert_many(ville_avec_mdph.to_dict('records'))