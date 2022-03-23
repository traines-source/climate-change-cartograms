#!/bin/bash
set -e

pybabel compile --directory=locale
#pybabel init -l en -i locale/CCC.pot -d locale 
#pybabel extract --mapping babel.cfg --output-file=locale/messages.pot .
pybabel update --input-file=locale/messages.pot --output-dir=locale
python3 render.py
