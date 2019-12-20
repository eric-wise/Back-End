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
users/login
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
restaurants/
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
restaurants/:id
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
/
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
/restaurant/:id
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
/:id
```

Method

```
delete
```

Expects an id passed in the url, authorization and user_id headers

Returns status 204 if successful
