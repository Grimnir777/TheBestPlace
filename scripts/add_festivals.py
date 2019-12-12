import pandas
from pandas.io.json import json_normalize
from pymongo import MongoClient
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

# on save le fichier json dans df
df = pandas.read_json('/home/valentin/Documents/Projet_XML/TheBestPlace/scripts/panorama-des-festivals.json')
# on parse pour accéder aux colomnes contenues dans fields
df2=json_normalize(df.fields)

#nombre de ligne
total_rows=len(df.axes[0])

#print(df['fields','commune_principale'].value_counts())
#print(df[0]["commune_principale"])
#print(df['fields']["commune_principale"])

nb_festival_par_ville=df2['code_insee'].value_counts()

valeur_moyenne = nb_festival_par_ville.sum()

db.insert_many(nb_festival_par_ville)