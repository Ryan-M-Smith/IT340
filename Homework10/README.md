# Dog API Endpoint Testing

This project is an in-memory Express API for managing dogs. The server runs on
`http://localhost:3000`. You can start the server with:

```sh
npm start
```

## API tests

Every API endpoint was tested using the `curl` command line tool.

### 1. Get all dogs

```sh
curl http://localhost:3000/dogs
```

Example response:

```json
[
  {
    "id": 1,
    "name": "Buddy",
    "breed": "Golden Retriever",
    "age": 3,
    "isAdopted": true
  },

  // ...
]
```

Status code: `200 OK`

### 2. Get one dog

```sh
curl http://localhost:3000/dogs/1
```

Example response:

```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "age": 3,
  "isAdopted": true
}
```

Status code: `200 OK`

Test a missing dog:

```sh
curl http://localhost:3000/dogs/999
```

Expected response:

```json
{"error":"Dog not found"}
```

Status code: `404 Not Found`

### 3. Create a dog

```sh
curl -X POST http://localhost:3000/dogs \
  -H 'Content-Type: application/json' \
  -d '{"name":"Penny","breed":"Mixed Breed","age":2,"isAdopted":false}'
```

Example response:

```json
{
  "id": 16,
  "name": "Penny",
  "breed": "Mixed Breed",
  "age": 2,
  "isAdopted": false
}
```

Status code: `201 Created`

Test invalid input:

```sh
curl -X POST http://localhost:3000/dogs \
  -H 'Content-Type: application/json' \
  -d '{"name":"","breed":"Mixed Breed","age":2}'
```

Expected response:

```json
{"error":"Name is required"}
```

Status code: `400 Bad Request`

### 4. Update a dog

```sh
curl -X PUT http://localhost:3000/dogs/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Buddy Updated","breed":"Golden Retriever","age":4,"isAdopted":true}'
```

Example response:

```json
{
  "id": 1,
  "name": "Buddy Updated",
  "breed": "Golden Retriever",
  "age": 4,
  "isAdopted": true
}
```

Status code: `200 OK`

### 5. Delete a dog

```sh
curl -X DELETE http://localhost:3000/dogs/2
```

Example response:

```json
{
  "message": "Dog deleted successfully",
  "dog": {
    "id": 2,
    "name": "Luna",
    "breed": "Labrador Retriever",
    "age": 2,
    "isAdopted": false
  }
}
```

Status code: `200 OK`

Confirm that the dog was deleted:

```sh
curl http://localhost:3000/dogs/2
```

Status code: `404 Not Found`
