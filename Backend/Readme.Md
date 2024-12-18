# Uber Clone in MERN Stack


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

{
  "username": {"firstName": "John",
  "lastName": "Doe"},
  "email": "john.doe@example.com",
  "password": "securePassword",
  
}


# Response 

### Success Response

### Status Code: 201 Created

### Response Body:

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

# Error Responses

### Status Code: 400 Bad Request

### Response Body:

{
  "error": "Validation error. Please check your input."
}

## Status Code: 409 Conflict

### Response Body:

{
  "error": "Username or email already exists."
}

## Status Code: 500 Internal Server Error

### Response Body:

{
  "error": "An unexpected error occurred. Please try again later."
}

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
{
  "email": "john.doe@example.com",
  "password": "securePassword"
}

# Success Response
### Status Code: 200 OK
## Response Body:
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

# Error Responses
### Status Code: 400 Bad Request
## Response Body:
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

### Status Code: 401 Unauthorized
## Response Body:
{
  "message": "Invalid email or password"
}

### Status Code: 500 Internal Server Error
## Response Body:

{
  "error": "An unexpected error occurred. Please try again later."
}