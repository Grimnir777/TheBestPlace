from pymongo import MongoClient
import pandas
client = MongoClient('mongodb://localhost')
db=client.TheBestPlace.villes

villes = pandas.read_csv('/home/valentin/Documents/Projet_XML/TheBestPlace/scripts/villes_france.csv', sep=',',header=0,names=['file_id','dep', 'slug','nom','nom_simple','nom_reel','nom_soundex','nom_metaphone','code_postal',
'commune','code_commune','arrondissement', 'canton', 'amdi' ,'population_2010','population_1999','population_2012','densite_2010','surface','longitude_deg','latitude_deg','longitude_grd','latitude_grd'
,'longitude_dms','latitude_dms','zmin','zmax']
,usecols=['dep', 'slug', 'nom_simple', 'nom_reel','code_postal','code_commune', 'longitude_deg', 'latitude_deg'])

records = villes.to_dict(orient='records')
db.insert_many(records)