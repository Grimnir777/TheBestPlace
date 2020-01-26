TheBestPlace
============

<!--ts-->
   * [TheBestPlace](#thebestplace)
      * [Description du projet](#description-du-projet)
      * [Technologie et Pré-requis](#technologie-et-pré-requis)
      * [Installation de l'application](#installation-de-lapplication)
         * [~ Distributions Linux](#-distributions-linux)
         * [~ Distributions Windows](#-distributions-windows)

<!-- Added by: kurai, at: 2020-01-26T21:35+01:00 -->

<!--te-->


## Description du projet

TheBestPlace est une application Web guidant des utilisateurs désireux de trouver la ville de leur rêve.
Pour ce faire, six critères sont proposés par défaut :
- Présence d'une MDPH
- Nombre de festivals
- Population
- Taux étudiants
- Nombre de logements
- Nombre de logements vacants

L'utilisateur peut accèder l'IHM pour utiliser différentes features : 
- Liste des villes avec une dizaine de filtres et actualisation en temps réel.
- Exporter les données en JSON (personnalisées selon les filtres appliqués) ainsi que le schéma JSON du résultat.
- Page ville : Contient les informations basiques sur la ville, les critères et une map qui montre sa localisation.

## Technologie et Pré-requis

Selon les éléments du projet, plusieurs technologies ont été utilisées : 
* **Front ~** Angular.JS
* **Back ~** Node.JS
* **Scripts divers ~** Python & Bash

**npm** est nécessaire pour l'utilsation du projet.

Une base **MongoDB** est également nécessaire si vous voulez héberger en local la base de données.
Autrement, veuilez modifier la configuration dans les scripts.

## Installation de l'application

Afin d'installer l'application veuillez suivre les étapes suivantes :
1. Clonez/Téléchargez le projet
2. Dans le répertoir "`back`" **ET** "`front`" entrez la commande suivante : `npm install`.
3. Enjoy o/ Passez à la mise en place de la base de données.

## Mise en place de la base données

### ~ Distributions Linux

Le script **"quick-create.sh"** va créer la base de données et la remplir de données diverses. Vous pouvez l'éxécuter en utilisant la commande `bash quick-create.sh` directement dans le répertoire des scripts. Les opérations faites vont prendre quelques minutes : ce sera l'occasion de prendre votre pause café.


### ~ Distributions Windows

Plusieurs script python sont à éxécuter dans un ordre précis : 
- createDB.py
- add_mdph.py
- add_festivals.py
- add_from_INSEE.py
- update-note.py

