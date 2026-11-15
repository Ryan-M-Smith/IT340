# Homework 12 - Dog Database

## Full-stack Web Application

**Frontend:** React + Vite \
**Backend:** Express.js \
**Database:** MongoDB

## Architecture

The application uses two request flows:

```text
React client
    ↓ fetch("/api/dogs")
Express API
    ↓ Mongoose
MongoDB (DogDatabase)
```

MongoDB results return through the same layers:

```text
MongoDB -> Express API -> React dog catalog
```

The API supports retrieving, creating, updating, and deleting dogs at
`/api/dogs`.

## Running the App

1. First, install all dependencies:

    ```sh
    npm install --prefix client server
    ```

2. Approve any scripts if necessary:

    ```sh
    npm install-scripts approve -a
    ```

3. Seed the database:

    ```sh
    npm run --prefix server db:seed
    ```

4. Start the client and server in different windows:

    ```sh
    npm run dev --prefix server # Terminal 1
    npm run dev --prefix client # Terminal 2
    ```
