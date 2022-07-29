FROM mongo

COPY heroes.json /heroes.json

#CMD mongoimport --host mongo-db --db heroesdb --collection heroes --drop --type json --file /heroes.json --jsonArray

CMD mongoimport --db heroesdb --collection heroes --drop --type json --file /heroes.json --jsonArray