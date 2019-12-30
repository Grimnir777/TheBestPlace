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
SELECT_CHAMP = "Population"
STR_SEP = "= = = = = = = = = = = = = = = = = = = = "
ACTIVE_IMPORT_DB = False #True pour importer les données dans la base
SHOW_RESULT_IN_TERMINAL = False #False pour désactiver les données à importer

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

# Mode custom -> File + champ
if len_args == 3 :
	logMsg("INFO","Mode par défaut désactivé.")
	IN_FILE_PATH = sys.argv[1]
	SELECT_CHAMP = sys.argv[2]

# Mode custom -> champ
if len_args == 2 :
	logMsg("INFO","Mode par défaut désactivé.")
	SELECT_CHAMP = sys.argv[1]

# Mod default
elif len_args == 1 :
	logMsg("INFO","Mode par défaut activé.")

# Mod invalid
else :
	logMsg("ERROR","Nombre de paramètres incohérents. Les formats valides sont les suivants : ")
	print("\t * python add_custom_from_MDB-INSEE.py")
	print("\t * python add_custom_from_MDB-INSEE.py <SELECT_CHAMP>")
	print("\t * python add_custom_from_MDB-INSEE.py <PATH_TO_INPUT_FILE> <SELECT_CHAMP>")
	exit(1)

print(STR_SEP)
logMsg("INFO","Paramètres : ")
print("\t * Fichier : "+IN_FILE_PATH)
print("\t * Champ : "+SELECT_CHAMP)
print(STR_SEP)

#On tente de charger les données
try :
	datas =  pandas.read_csv(IN_FILE_PATH, sep=';',header=0,usecols = ['LIBGEO',SELECT_CHAMP], low_memory = False )
except :
	logMsg("ERROR","Fichier introuvable ou champ incohérent.")
	exit(1)

#On tente d'enregistrer les données
try :
	dataJSON = datas.to_dict(orient='records')
	#Voir dans la console le résultat de l'extraction
	if SHOW_RESULT_IN_TERMINAL == True :
		print(dataJSON)

	# Enregistrement dans la mongoDB
	if ACTIVE_IMPORT_DB == True :
		db.insert_many(dataJSON)
except :
	logMsg("ERROR","Une erreur est survenue lors de l'engistrement des données.")
	exit(1)


logMsg("INFO","Import réussi. Fin du script avec succés.")
exit(0)

# str_name = re.sub('[^a-zA-Z0-9]','',str_name)
