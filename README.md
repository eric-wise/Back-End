# FoodieFun Back End Docs

Hello and welcome! Please enjoy this beautiful documentation and please let me know if there are any areas lacking clarity!

## Base Url

Use this to prefix the beginning of all requests. Moving forward, all endpoints in this documentation will assume the base url has already been input before the endpoint being addressed.

```
https://bw-foodiefun.herokuapp.com/api/
```

## Users Route

### Register

Endpoint

```
users/register
```

Method

```
post
```

Expects

```
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
    password: // hashed
    location: //
    email: //
}
```

### Login

Endpoint

```
users/login
```

Method

```
post
```

Expects

```
{
    username: //
    password: //
}
```

Returns

```
{
    id: // auto incremented
    username: //
    password: // hashed
    location: //
    email: //
    token: // save this somewhere, it needs passed as an "authorization" header for protected routes
}
```

### Get User By ID ( auth required )

Endpoint

```
users/:id
```

Method

```
get
```

Expects a parameter

Returns

```
{
    id: // auto incremented
    username: //
    password: // hashed
    location: //
    email: //
}
```

## Restaurants Route

Note that all restaurant endpoints are auth required

### Get All

Endpoint

```
restaurants/
```

Method

```
get
```

Returns

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
    reviews: [
        {...},
        {...}
    ]
    rating: //
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
    reviews: [
        {...},
        {...}
    ]
    rating: //
},
...
]
```

### Get By Id

Endpoint

```
restaurants/:id
```

Method

```
get
```

Expects a parameter

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
/
```

Method

```
post
```

Expects

```
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
/restaurant/:id
```

Method

```
put
```

Expects a parameter

```
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
/:id
```

Method

```
delete
```

Expects a parameter

Returns status 204 if successful
