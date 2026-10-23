# Homework 9

## API Used

For my assignment, I used the [DummyJSON API](https://dummyjson.com), which is a free, open-source REST API that returns various types of fake data you can quickly display on a website.

Their documentation offers lots of different data generation endpoints, and I chose their [random quotes](https://dummyjson.com/docs/quotes#quotes-random) route, which returns a random quote along with the author on each API call.

## Response Body

Every GET request to `/quotes/random` returns a JSON response that looks similar to this:

```json
{
  "id": 62,
  "quote": "If you want to lift yourself up, lift up someone else.",
  "author": "Booker T. Washington"
}
```
