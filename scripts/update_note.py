# coding: utf8

from pymongo import MongoClient
import pymongo
import json
import pandas
import math

# LOGGER
def logMsg(type,msg) :
	print("["+type+"] ~ "+msg)


# connect to the database
client = MongoClient('localhost:27017')
villes=client.TheBestPlace.villes
criteres=client.TheBestPlace.criteres

criteresMax = {}

EXCLUSION = ["presence_MDPH"]

logMsg("INFO","Récupération des valeurs maximales de chaques critères.")
#Calcul est enregistrement en mémoire des maxs
for key in villes.find_one({})['criteres']:
	city_with_max_val = villes.find().sort("criteres." + key + ".valeur", pymongo.DESCENDING).limit(1)[0]
	max_val = city_with_max_val['criteres'][key]['valeur']
	criteresMax[key] = max_val


logMsg("INFO","Calcul des notes en cours. Veuillez patienter quelques instants.")
# Pour chaque élément de la base et pour chaque critère
for el in villes.find({}) :
	cod = el['code_commune']

	for cr in el['criteres'] :

		if cr.encode('utf-8') not in EXCLUSION :
			# Calcul de note
			c_val = el['criteres'][cr]['valeur']
			note = 10 *  math.log(c_val if c_val > 0 else 1)  /  math.log1p(criteresMax[cr] if criteresMax[cr] > 0 else 1)

			# Enregistrement de la note
			updateToDo = "{"
			updateToDo = updateToDo + '"criteres.' + cr.encode('utf-8') + '.note":' + str(note) + "}"

			villes.find_one_and_update({'code_commune':cod}, {"$set": json.loads(updateToDo)})

logMsg("INFO","Mise à jour des notes terminée avec succès.")
