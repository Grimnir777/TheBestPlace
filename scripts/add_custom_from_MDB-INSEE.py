# coding: utf8
#!/usr/bin/python

import sys
import pandas
import json
from pymongo import MongoClient

#CONFIG DB
client = MongoClient('localhost:27017')
db=client.TheBestPlace.criteres

# CONFIG SCRIPT
IN_FILE_PATH = "./scripts/MDB-INSEE-V2.csv"
SELECT_CHAMP = ["Population"]
STR_SEP = "= = = = = = = = = = = = = = = = = = = = "
SHOW_RESULT_IN_TERMINAL=False

# DELTA OR FULL OPTIONS
DEFAULT_METHOD="ERASE" #ADD or ERASE

#Autre
dataJSON = {}

# LOGGER
def logMsg(type,msg) :
	print("["+type+"] ~ "+msg)


# - - - - - - - - - - - - - - - - - #
#				MAIN 				#
# - - - - - - - - - - - - - - - - - #

# Contrôle du nombre de paramètre
len_args = len(sys.argv)
str_len = "Nombre de paramètres détecté : " + str(len_args)
logMsg("INFO",str_len)

# Mode custom -> Mode + champ
if len_args >= 3 :
	logMsg("INFO","Mode par défaut désactivé.")
	DEFAULT_METHOD = sys.argv[1]
	SELECT_CHAMP = sys.argv[2:]

# Mode custom -> champ
elif len_args == 2 :
	logMsg("INFO","Mode par défaut désactivé.")
	SELECT_CHAMP = [sys.argv[1]]

# Mod default
elif len_args == 1 :
	logMsg("INFO","Mode par défaut activé.")

# Mod invalid
else :
	logMsg("ERROR","Nombre de paramètres incohérents. Les formats valides sont les suivants : ")
	print("\t * python add_custom_from_MDB-INSEE.py")
	print("\t * python add_custom_from_MDB-INSEE.py <SELECT_CHAMP>")
	print("\t * python add_custom_from_MDB-INSEE.py <MODE> <SELECT_CHAMP_1> <SELECT_CHAMP_2> ...")
	exit(1)

print(STR_SEP)
logMsg("INFO","Paramètres : ")
print("\t * Fichier : "+IN_FILE_PATH)
print("\t * Champ : "+str(SELECT_CHAMP))
print("\t * Méthode : "+DEFAULT_METHOD)
print(STR_SEP)


try :
	# Enregistrement dans la mongoDB
	if DEFAULT_METHOD == "ERASE" :
		logMsg("INFO","Import en mode ERASE activé. Seul les nouveaux champs seront retenus.")

		#Recupération des données
		array_search = SELECT_CHAMP
		array_search.append("CODGEO")

		try :
			datas =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = array_search, low_memory = False )
			dataJSON = datas.to_dict(orient='records')
		except :
			logMsg("ERROR","Impossible d'accèder aux données du fichier spécifié.")
			exit(1)

	elif DEFAULT_METHOD == "ADD" :
		logMsg("INFO","Import en mode ADD activé. Ajout du nouveau champ à la base.")

		search_els = []
		# Récupération des champs actuellement utilisés
		try :
			scheme = db.find()
			el = scheme[0]
			scheme_keys = el.keys()
			search_els = []
			for one_el in scheme_keys :
				cp_on = one_el.encode("utf-8")

				if cp_on != "_id" :
					search_els.append(cp_on)

			# Combinaison des anciens champs et des nouveaux
			search_els = search_els + SELECT_CHAMP

		except :
			logMsg("ERROR","Impossible de créer la liste des champs à récupérer.")
			exit(1)

		# Récupération des données
		try :
			datas =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = search_els, low_memory = False )
			dataJSON = datas.to_dict(orient='records')
		except :
			logMsg("ERROR","Impossible d'accèder aux données du fichier spécifié.")
			exit(1)

	#Voir dans la console le résultat de l'extraction
	if SHOW_RESULT_IN_TERMINAL == True :
		print(dataJSON)

	# Enregistrement des données
	try :
		db.remove({})
		db.insert_many(dataJSON)
	except :
		logMsg("ERROR","Erreur lors de l'enregistrement en base")

except :
	logMsg("ERROR","Une erreur est survenue lors de l'engistrement des données.")
	exit(1)


logMsg("INFO","Import réussi. Fin du script avec succés.")
exit(0)



#
# db.update(
# 	query,
# 	alue
# )
#
# for one_data in dataJSON :
# 	#Update
# 	srt_codgeo = str(one_data["CODGEO"])
# 	query = {"CODGEO" : srt_codgeo}
# 	value = { "$set": {SELECT_CHAMP: one_data[SELECT_CHAMP]} }
# 	db.update(
# 		query,
# 		value
# 	)
