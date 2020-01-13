from pymongo import MongoClient
import pandas
client = MongoClient('mongodb://localhost')

'''
Donc en gros là pour chaque critère, on pondère de 0 à 10.
Quand l'utilisateur mettra ses valeurs, le back end pondèrera de la même manière.
Si un critère n'est pas spécifié, on attribue -1 pour ignorer.

Par exemple :
nb_festival_par_ville
max : 188
min : 0

on pondère, donc 188 -> 10, donc pondération de 18.8
si l'utilisateur met 5, ca correspond à des valeurs entre 4 et 6 exclus.
4 correspond à 75 festivals, 6 à 112 festivals
Donc les villes doivent avoir X festivals, avec 75<X<112.


Autre exemple :
presence MDPH
max : 1
min : 0

Bon là c'est clair, on/off.
'''