# coding: utf8

from pymongo import MongoClient
import pandas
import os

client = MongoClient('localhost:27017')
db=client.TheBestPlace.villes

basePath = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/")

villes = pandas.read_csv(basePath + '/villes_france.csv', sep=',',header=0,names=['file_id','dep', 'slug','nom','nom_simple','nom_reel','nom_soundex','nom_metaphone','code_postal',
'commune','code_commune','arrondissement', 'canton', 'amdi' ,'population_2010','population_1999','population_2012','densite_2010','surface','longitude_deg','latitude_deg','longitude_grd','latitude_grd'
,'longitude_dms','latitude_dms','zmin','zmax']
,usecols=['dep', 'slug', 'nom_simple', 'nom_reel','code_postal','code_commune', 'longitude_deg', 'latitude_deg'], low_memory = False)

records = villes.to_dict(orient='records')
db.insert_many(records)
db.create_index([("code_commune", 1)])
print('import réussi et index créé sur code_commune')
