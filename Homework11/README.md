# Hommework 11 Dog Database

**Database:** `DogDatabase` \
**Collection:** `dogs` \
**MongoDB Version:** 8.0 \
**Dog Data:** [dogs.json](./dogs.json) \
**`mongosh` History:** [mongosh-history.txt](./mongosh-history.txt)

## Loading the Database

Load the database snapshot:

```sh
mongod --dbpath ./plant-database --port 27018
```

Then, connect via `mongosh`:

```sh
mongosh --port 27018
```
