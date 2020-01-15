from pymongo import MongoClient
import pandas
import json
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

IN_FILE_PATH = "./scripts/MDB-INSEE-V2.csv"
search_els = ['CODGEO','REG']
df =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = search_els, low_memory = False )

print('Updating DB')

for index, row in df.iterrows():
    db.find_one_and_replace({'CODGEO':row['CODGEO']}, json.loads(df.loc[index].to_json()))

print('done')