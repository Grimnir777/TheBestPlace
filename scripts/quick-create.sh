#!/bin/sh

python createDB.py
python add_mdph.py
python add_festivals.py
python add_from_INSEE.py
python update-note.py
