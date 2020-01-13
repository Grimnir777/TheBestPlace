import pandas
from pandas.io.json import json_normalize
from pymongo import MongoClient

# connect to the database
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

# get json in a dataframe
df = pandas.read_json('/home/valentin/Documents/Projet_XML/TheBestPlace/scripts/panorama-des-festivals.json', orient='records')

# parse it to access the tab named 'fields'
df2=json_normalize(df.fields)
print(df2)

# get only the code_insee
villes_avec_festival=pandas.DataFrame(df2['code_insee'].copy())
print(villes_avec_festival)

# count the number of occurences by city
festival_par_ville = pandas.DataFrame(villes_avec_festival['code_insee'].value_counts())
festival_par_ville.columns=['nb_festival']
print(festival_par_ville)

# POST
db.insert_many(festival_par_ville.to_dict('records'))