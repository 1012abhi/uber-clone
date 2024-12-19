# Uber Clone Backend

# User Registration Endpoint
## Http Method
### POST
## Endpoint
`POST /api/users/register`

## Description
This endpoint allows new users to register by providing their details. Upon successful registration, the user will receive a confirmation response.

## Request

### Headers
- `Content-Type: application/json`

### Body
The request body must be a JSON object containing the following fields:

| Field        | Type     | Required | Description                          |
|--------------|----------|----------|--------------------------------------|
| `username`   | string   | Yes      | The desired username for the account. Must be unique. |
| `email`      | string   | Yes      | The user's email address. Must be a valid email format. |
| `password`   | string   | Yes      | The password for the account. Must be at least 8 characters long. |
| `firstName`  | string   | Yes       | The user's first name.               |
| `lastName`   | string   | Yes       | The user's last name.                |

### Example Request
```json
{
  "username": {"firstName": "John",
  "lastName": "Doe"},
  "email": "john.doe@example.com",
  "password": "securePassword",
  
}
```

# Response 

### Success Response

### Status Code: 201 Created

### Response Body:
```json
{
  "message": "User  registered successfully.",
  "user": {
    "id": "12345",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```
# Error Responses

### Status Code: 400 Bad Request

### Response Body:
```json
{
  "error": "Validation error. Please check your input."
}
```
## Status Code: 409 Conflict

### Response Body:
```json
{
  "error": "Username or email already exists."
}
```
## Status Code: 500 Internal Server Error

### Response Body:
```json
{
  "error": "An unexpected error occurred. Please try again later."
}
```
# User Login Endpoint
## Http Method
### POST
## Endpoint
`POST /api/users/login`

## Description
This endpoint allows users to log in by providing their email and password. Upon successful login, the user will receive a token for authentication.

## Request

### Headers
- `Content-Type: application/json`

### Body
The request body must be a JSON object containing the following fields:

| Field     | Type     | Required | Description                          |
|-----------|----------|----------|--------------------------------------|
| `email`   | string   | Yes      | The user's email address. Must be a valid email format. |
| `password`| string   | Yes      | The password for the account. Must be at least 6 characters long. |

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```
# Success Response
### Status Code: 200 OK
## Response Body:
```json
{
  "token": "your_auth_token",
  "user": {
    "id": "12345",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```
# Error Responses
### Status Code: 400 Bad Request
## Response Body:
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```
### Status Code: 401 Unauthorized
## Response Body:
```json
{
  "message": "Invalid email or password"
}
```
## User Profile Endpoint
### Http Method
#### GET
### Endpoint
`GET /api/users/profile`

### Description
This endpoint allows authenticated users to retrieve their profile information. The user must be logged in and provide a valid authentication token.

### Request

#### Headers
- `Authorization: Bearer <token>` (The token should be included in the Authorization header)

### Success Response
#### Status Code: 200 OK
##### Response Body:
```json
{
  "id": "12345",
  "username": "john_doe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```
# User Logout Endpoint
## Http Method
### GET
## Endpoint
### GET /api/users/logout

## Description
This endpoint allows users to log out of their account. It clears the authentication token from the user's cookies and adds the token to a blacklist to prevent further use.

### Request
### Headers
### Authorization: 
Bearer <token> (The token should be included in the Authorization header)

## Success Response
### Status Code: 200 OK
## Response Body:

```json
{
  "message": "Logged out"
}
```
## Error Responses
### Status Code: 401 Unauthorized
### Response Body:
```json
{
  "message": "Unauthorized"
}
```


## Captain Registration Endpoint

**Endpoint:** `/api/captains/register`  
**HTTP Method:** `POST`  
**Content-Type:** `application/json`

### Description
This endpoint allows a new captain to register by providing their personal and vehicle information. It validates the input data and creates a new captain record in the database.

### Request Body
The request body must be a JSON object containing the following fields:

```json
{
    "fullname": {
        "firstname": "string (required, min length: 3)",
        "lastname": "string (optional, min length: 3)"
    },
    "email": "string (required, must be a valid email)",
    "password": "string (required, min length: 3)",
    "vehicle": {
        "color": "string (required, min length: 3)",
        "plate": "string (required, min length: 3)",
        "capacity": "integer (required, minimum: 1)",
        "vehicleType": "string (required, must be one of: 'car', 'motorcycle', 'auto')"
    }
}
```

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword",
    "vehicle": {
        "color": "red",
        "plate": "XYZ 1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Responses
**201 Created:** Returns a JSON object containing the generated authentication token and the captain's details.
```json
{
    "token": "string",
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "integer",
            "vehicleType": "string"
        },
        "status": "string"
    }
}
```
**400 Bad Request:** If validation fails or if a captain with the provided email already exists.
```json
{
    "errors": [
        {
            "msg": "string",
            "param": "string",
            "location": "string"
        }
    ]
}
```

## Captain Login Endpoint

**Endpoint:** `/api/captains/login`  
**HTTP Method:** `POST`  
**Content-Type:** `application/json`

### Description
This endpoint allows captains to log in by providing their email and password. Upon successful login, the captain will receive a token for authentication.

### Request Body
The request body must be a JSON object containing the following fields:

```json
{
    "email": "string (required, must be a valid email)",
    "password": "string (required, min length: 6)"
}
```

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword"
}
```

### Responses
**200 OK:** Returns a JSON object containing the generated authentication token and the captain's details.
```json
{
    "token": "string",
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "integer",
            "vehicleType": "string"
        },
        "status": "string"
    }
}
```
**400 Bad Request:** If validation fails.
```json
{
    "errors": [
        {
            "msg": "string",
            "param": "string",
            "location": "string"
        }
    ]
}
```
**401 Unauthorized:** If the email or password is incorrect.
```json
{
    "message": "Invalid email or password"
}
```

## Captain Profile Endpoint

**Endpoint:** `/api/captains/profile`  
**HTTP Method:** `GET`  
**Content-Type:** `application/json`

### Description
This endpoint allows authenticated captains to retrieve their profile information. The captain must be logged in and provide a valid authentication token.

### Request Headers
- `Authorization: Bearer <token>` (The token should be included in the Authorization header)

### Responses
**200 OK:** Returns a JSON object containing the captain's profile details.
```json
{
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "integer",
            "vehicleType": "string"
        },
        "status": "string"
    }
}
```
**401 Unauthorized:** If the token is missing or invalid.
```json
{
    "message": "Unauthorized"
}
```

## Captain Logout Endpoint

**Endpoint:** `/api/captains/logout`  
**HTTP Method:** `GET`  
**Content-Type:** `application/json`

### Description
This endpoint allows captains to log out of their account. It clears the authentication token from the captain's cookies and adds the token to a blacklist to prevent further use.

### Request Headers
- `Authorization: Bearer <token>` (The token should be included in the Authorization header)

### Responses
**200 OK:** Returns a JSON object confirming the logout.
```json
{
    "message": "Logout successfully"
}
```
**401 Unauthorized:** If the token is missing or invalid.
```json
{
    "message": "Unauthorized"
}
```