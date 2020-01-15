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
	json_o = df.loc[index].to_json()
	json_test = json.loads(json_o)

	json_to_merge = db.find_one({'CODGEO':row['CODGEO']})
	del json_to_merge["_id"]

	json_finish = {key: value for (key, value) in (json_to_merge.items() + json_test.items())}

	db.find_one_and_replace({'CODGEO':row['CODGEO']}, json_finish  )

print('done')
