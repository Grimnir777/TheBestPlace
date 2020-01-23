import pandas
from pandas.io.json import json_normalize
from pymongo import MongoClient
import json
import os

basePath = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/")
arrParis = ["75101","75102","75103","75104","75105","75106","75107","75108","75109","75110","75111","75112","75113","75114","75115","75116","75116","75117","75118","75119","75120"]

# connect to the database
client = MongoClient('localhost:27017')
db=client.TheBestPlace.villes

toInsert = '{ "criteres" : { "nb_festival" : {"valeur":0, "note":0 } } }'
jsonToInsert = json.loads(toInsert)
print(jsonToInsert)

db.update_many({},{"$set": {"criteres.nb_festival.valeur":0,"criteres.nb_festival.note":0}})

# get json in a dataframe
df = pandas.read_json(basePath + '/panorama-des-festivals.json', orient='records')

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


for index, row in festival_par_ville.iterrows():
    jsonObject = json.loads(festival_par_ville.loc[index].to_json())
    
    jsonFestival = jsonToInsert
    jsonFestival['criteres']['nb_festival']['valeur'] = jsonObject['nb_festival']
    if index in arrParis:
        db.find_one_and_update({'code_commune':"75056"}, {"$set": {"criteres.nb_festival.valeur":jsonObject['nb_festival']}})
    else:
        db.find_one_and_update({'code_commune':index}, {"$set": {"criteres.nb_festival.valeur":jsonObject['nb_festival']}})
