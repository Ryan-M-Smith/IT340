# Lab 11 Plant Database

**Database:** `PlantDatabase` \
**Collection:** `plants` \
**MongoDB Version:** 8.0 \
**Plant Data:** [plants.json](./plants.json) \
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
