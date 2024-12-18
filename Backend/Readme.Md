# Uber Clone in MERN Stack


# User Registration Endpoint

## Endpoint
`POST /users/register`

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
| `firstName`  | string   | No       | The user's first name.               |
| `lastName`   | string   | No       | The user's last name.                |

### Example Request

{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}


### Response 

## Success Response

# Status Code: 201 Created

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

### Error Responses

# Status Code: 400 Bad Request

### Response Body:

{
  "error": "Validation error. Please check your input."
}

# Status Code: 409 Conflict

### Response Body:

{
  "error": "Username or email already exists."
}

# Status Code: 500 Internal Server Error

### Response Body:

{
  "error": "An unexpected error occurred. Please try again later."
}