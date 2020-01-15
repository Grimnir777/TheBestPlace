from pymongo import MongoClient
import pandas
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

IN_FILE_PATH = "./scripts/MDB-INSEE-V2.csv"
search_els = ['CODGEO']
df =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = search_els, low_memory = False )

# for i in df.index:
#     if(i<10):
#         print(df.loc[i].to_json())

for index, row in df.iterrows():
    # db.find_one({'CODGEO':row['CODGEO']})
    db.update_one({'CODGEO':row['CODGEO']},{'$set': df.loc[index].to_json()}, upsert=False)

print('done')