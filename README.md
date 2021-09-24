# BluePeak-Budget-Backend

## Motivation

The idea behind this API is to provide a place holder API to make requests agains while the groups haven't made their own APIs for the projects.

This API offers very limited functionality as to what it can do as of now, i will add some more features in the future but for now it's a good way to practice API calls and manage different request states like (Loading, Errors and Data)

This is a great opportunity to try and read documentation of other devs and try to use them in your project.

# Changelog

- ## Renamed the "outcomes" endpoint to "expenses"

- ## Added the ability to have diffrent users, incomes and expenses to diffrent groups:

  **Use your group number before the endpoints**

  Example:

  ```
  https://apidomain.com/1/signup
  https://apidomain.com/2/incomes
  https://apidomain.com/3/expenses/6148d0e681a2f807fab38926
  ```

- ## You could send what data format you need in your requests and they will be saved to the database

## Endpoints

- /signup

  - POST : Creates a new user in the database.

    _make sure to include the following json object in the request body:_

    ```javascript
    {
      "firstname":"YOUR_FIRST_NAME",
      "lastname":"YOUR_LAST_NAME",
      "email":"YOUR_EMAIL",
      "password":"YOUR_PASSWORD",
      "address":"YOUR_ADDRESS"
    }
    ```

    **The email and password fields in this object are required. This is because the only way to login is via email and password**

    **The password on the backend is not hashed and it's saved in plain text, _DO NOT_ use a password that you usually use**

    Returns an object with:

    - error field if there is an error in the request
      - email address is already in use
      - if one of the required fields is not provided then you will get en error message about what is missing.
    - message field with the success message

- /login

  - POST : Sends a login request to check if the user exists and if the provided credentials are correct.

    _make sure to include the following json object in request body:_

    ```javascript
    {
     "email":"YOUR_EMAIL",
     "password":"YOUR_PASSWORD"
    }
    ```

    Returns an object with:

    - error field if there is an error in the request
      - there is no account with the provided email address in the database
      - if the password is not correct.
    - the user object from the database

- /incomes

  - GET : Returns a json array with all the incomes in the database

    Always returns an array with the incomes or an empty array if there is no incomes in the database.

  - POST : Creates a new income and saves it to the database.

    _make sure to include the following json object in request body:_

    ```javascript
    {
     "amount": AMOUNT_IN_NUMBERS,
     "description":"DESCRIPTION_ABOUT_THE_INCOME"
    }
    ```

    Returns an object with:

    - error field if there is an error in the request
      - if one of the required fields is not provided then you will get en error message about what is missing.
    - message field with the a success message

- /incomes/:id (The id of the income)

  - GET : Returns a specific income document
    Returns an error if
    - The provided id not a valid id.
    - If there is no income with the provided if id in the database.
  - PATCH : Updates a specific income document

    _make sure to include the following json object in request body:_

    ```javascript
    {
     "amount": UPDATED_AMOUNT_IN_NUMBERS,
     "description":"UPDATED_DESCRIPTION_ABOUT_THE_INCOME"
    }
    ```

    Returns an object with:

    - error field if there is an error in the request
      - The provided id not a valid id.
      - If there is no income with the provided if id in the database.
    - message field with the a success message

  - DELETE : Deletes a specific document from the database
    Returns a object with:
    - error field if there is an error in the request
      - The provided id not a valid id.
      - If there is no income with the provided if id in the database.
    - message field with the a success message

- /expenses
- GET : Returns a json array with all the expenses in the database.
- POST : Creates a new expense and saves it to the database.

  _make sure to include the following json object in request body:_

  ```javascript
  {
    "amount": AMOUNT_IN_NUMBERS,
    "description":"DESCRIPTION_ABOUT_THE_EXPENSE"
  }
  ```

  Returns an object with:

  - error field if there is an error in the request
  - message field with the a success message

- /expenses/:id (The id of the expense)

  - GET : Returns a specific expense document.
    Returns an error if
    - The provided id not a valid id.
    - If there is no expense with the provided if id in the database.
  - PATCH : Updates a specific expense document.

    _make sure to include the following json object in request body:_

    ```javascript
    {
     "amount": UPDATED_AMOUNT_IN_NUMBERS,
     "description":"UPDATED_DESCRIPTION_ABOUT_THE_EXPENSE"
    }
    ```

    Returns an object with:

    - error field if there is an error in the request.
      - The provided id not a valid id.
      - If there is no expense with the provided if id in the database.
    - message field with the a success message.

  - DELETE : Deletes a specific document from the database.

    Returns an object with:

    - error field if there is an error in the request
      - The provided id not a valid id.
      - If there is no expense with the provided if id in the database.
    - message field with the a success message

## TODO

- Add an update profile feature to the user
- Link the incomes and expenses with a specific user

## How to use

- You can send requests to the provided Heroku link using Postman or via javascript.

## How to run locally

- Clone the repo
- Run npm install
- Create .env file and add DATABASE_URL with the link to your local mongoDB server or mongoDB Atlas
