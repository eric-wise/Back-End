# FoodieFun Back End Docs

Hello and welcome! Please enjoy this beautiful documentation and please let me know if there are any areas lacking clarity!

## Base Url

Use this to prefix the beginning of all requests. Moving forward, all endpoints in this documentation will assume the base url has already been input before the endpoint being addressed.

```
https://bw-foodiefun.herokuapp.com/api
```

## Users Route

### Register

Endpoint

```
/users/register
```

Method

```
post
```

Expects

```
Body
{
    username: // string, unique, mandatory
    password: // string, mandatory
    location: // string, mandatory
    email: // string, mandatory
}
```

Returns

```
{
    id: // auto incremented
    username: //
    location: //
    email: //
}
```

### Login

Endpoint

```
/users/login
```

Method

```
post
```

Expects

```
Body
{
    username: //
    password: //
}
```

Returns

```
{
    id: // save this somewhere, required to pass as "user_id" header for protected routes
    username: //
    location: //
    email: //
    token: // save this somewhere, it needs passed as an "authorization" header for protected routes
}
```

## Restaurants Route

Note that all restaurant endpoints are auth required

### Get All

Endpoint

```
/restaurants/
```

Method

```
get
```

Expects authorization and user_id headers

Returns (for now, less detail than checking individually. Will work on bringing them to the same level of detail)

```
[
    {
    id: //
    name: //
    cuisine: //
    location: //
    hour_open: //
    hour_closed: //
    days_open: //
    user_id: //
    photo_url: //
},
{
    id: //
    name: //
    cuisine: //
    location: //
    hour_open: //
    hour_closed: //
    days_open: //
    user_id: //
    photo_url: //
},
...
]
```

### Get By Id

Endpoint

```
/restaurants/:id
```

Method

```
get
```

Expects an ID passed in the url, authorization and user_id headers

Returns

```
{
    id: //
    name: //
    cuisine: //
    location: //
    hour_open: //
    hour_closed: //
    days_open: //
    user_id: //
    photo_url: //
    reviews: [
        {...},
        {...}
    ]
    rating: //
}
```

### Add A Restaurant

Endpoint

```
/restaurants/
```

Method

```
post
```

Expects authorization header

```
Body
{
    name: // string, unique, required
    cuisine: // string, required
    location: // string, required
    hour_open: // integer, positive, required
    hour_closed: // integer, positive, required
    days_open: // string, required
    user_id: // integer, positive, required
    photo_url: // string
}
```

Returns

```
{
    id: //
    name: //
    cuisine: //
    location: //
    hour_open: //
    hour_closed: //
    days_open: //
    user_id: //
    photo_url: //
}
```

### Update Restaurant

Endpoint

```
/restaurants/:id
```

Method

```
put
```

Expects an id passed in the url, authorization and user_id headers

```
Body
{
    name: // string, unique, required
    cuisine: // string, required
    location: // string, required
    hour_open: // integer, positive, required
    hour_closed: // integer, positive, required
    days_open: // string, required
    user_id: // integer, positive, required
    photo_url: // string
}
```

Returns

```
{
    name: //
    cuisine: //
    location: //
    hour_open: //
    hour_closed: //
    days_open: //
    user_id: //
    photo_url: //
}
```

### Delete Restaurant

Endpoint

```
/restaurants/:id
```

Method

```
delete
```

Expects an id passed in the url, authorization and user_id headers

Returns status 204 if successful

### View Reviews of Restaurant

Endpoint

```
/restaurants/:id/items
```

Method

```
get
```

Expects an ID passed in url, authorization and user_id headers

Returns

```
[
{
    "id": //
    "restaurant_id": //
    "cuisine": //
    "name": //
    "photo_url": //
    "rating": //
    "review": //
    "user_id": //
},
{
    "id": //
    "restaurant_id": //
    "cuisine": //
    "name": //
    "photo_url": //
    "rating": //
    "review": //
    "user_id": //
},
...
]
```

## Items Route

Note that all items route are auth required

### Get By Id

Endpoint

```
/items/:id
```

Method

```
get
```

Expects an ID passed in the URL, authorization and user_id headers

Returns

```
{
  "id": //
  "restaurant_id": //
  "cuisine": //
  "name": //
  "photo_url": //
  "rating": //
  "review": //,
  "user_id": //
}
```

### Add A Review

Endpoint

```
/items/
```

Method

```
post
```

Expects authorization and user_id headers

```
Body
{
    "restaurant_id": // integer, required
    "cuisine": // string, required
    "name": // string, required
    "photo_url": // string
    "rating": // integer, required
    "review": // string, required
    "user_id": // integer, required
}
```

Returns

```
{
    "id": // auto increments
    "restaurant_id": //
    "cuisine": //
    "name": //
    "photo_url": //
    "rating": //
    "review": //
    "user_id": //
}
```

### Update A Review

Endpoint

```
/items/:id
```

Method

```
put
```

Expects authorization and user_id headers

```
Body
{
    "restaurant_id": // integer, required
    "cuisine": // string, required
    "name": // string, required
    "photo_url": // string
    "rating": // integer, required
    "review": // string, required
    "user_id": // integer, required
}
```

Returns

```
{
    "id": //
    "restaurant_id": //
    "cuisine": //
    "name": //
    "photo_url": //
    "rating": //
    "review": //
    "user_id": //
}
```

### Delete A Review

Endpoint

```
/items/:id
```

Method

```
delete
```

Expects an id passed in the url, authorization and user_id headers

Returns status 204 if successful
