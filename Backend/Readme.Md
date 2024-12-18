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