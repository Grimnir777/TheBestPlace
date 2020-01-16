from pymongo import MongoClient
import pandas
import json
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

IN_FILE_PATH = "./scripts/MDB-INSEE-V2.csv"
search_els = ['CODGEO'] + ['Nb Etudiants','Nb Majeurs']
df =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = search_els, low_memory = False )


client.TheBestPlace.criteres.create_index([("CODGEO", 1)])

print('Updating DB')

for index, row in df.iterrows():
	db.find_one_and_update({'CODGEO':row['CODGEO']}, {"$set": json.loads(df.loc[index].to_json())} )

print('done')
