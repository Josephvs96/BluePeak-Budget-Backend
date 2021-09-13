# BluePeak-Budget-Backend

## Motivation

The idea behind this API is to provide a place holder API to make requests agains while the groups haven't made their own APIs for the projects.

This API offers very limited functionality as to what it can do as of now, i will add some more features in the future but for now it's a good way to practice API calls and manage diffrent request states like (Loading, Errors and Data)

## Endpoints

- /signup

  - POST : Creats a new user in the database.
     
     _make sure to include the following json object in the request body:_

    ```javascript
    {
      "firstName":"YOUR_FIRST_NAME",
      "lastName":"YOUR_LAST_NAME",
      "email":"YOUR_EMAIL",
      "password":"YOUR_PASSWORD",
      "address":"YOUR_ADDRESS"
    }
    ```

    _Note that the address field is optional while the others are required_

    **The password on the backend is not hashed and it's saved in plain text, _DO NOT_ use a password that you usually use**
    
    Returns a object with:

    - error field if there is an error in the request
    - message field with the a success message

- /login
  - POST : Sends a login request to check if the user exists and if the provided cridentials are correct.
     
     _make sure to include the following json object in request body:_
    ```javascript
    {
     "email":"YOUR_EMAIL",
     "password":"YOUR_PASSWORD",
    }
    ```
    Returns a object with:
    - error field if there is an error in the request
    - the user object from the database
- /incomes
  - GET : Returns a json array with all the incomes in the database
  - POST : Creats a new income and saves it to the database.
     
     _make sure to include the following json object in request body:_
    ```javascript
    {
     "amount": AMOUNT_IN_NUMBERS,
     "description":"DESCRIPTION_ABOUT_THE_INCOME",
    }
    ```
    Returns a object with:
    - error field if there is an error in the request
    - message field with the a success message
  - Delete : Deletes an income document from the database. 
     
     _make sure to include the following json object in request body:_
    ```javascript
    {
     "_id": ID_NUMBER_OF_THE_INCOME_TO_BE_DELETED,
    }
    ```
    Returns a object with:
    - error field if there is an error in the request
    - message field with the a success message
- /outcomes
  - GET : Returns a json array with all the outcomes in the database
  - POST : Creats a new outcome and adds it to the database.
    
    _make sure to include the following json object in request body:_
    ```javascript
    {
     "amount": AMOUNT_IN_NUMBERS,
     "description":"DESCRIPTION_ABOUT_THE_OUTCOME",
    }
    ```
    Returns a object with:
    - error field if there is an error in the request
    - message field with the a success message
  - Delete : Deletes a outcome document from the database.
    
    _make sure to include the following json object in request body:_
    ```javascript
    {
     "_id": ID_NUMBER_OF_THE_OUTCOME_TO_BE_DELETED,
    }
    ```
    Returns a object with:
    - error field if there is an error in the request
    - message field with the a success message

## TODO

- Add an update feature to the incomes/outcomes
- Add an update profile feature to the user
- Link the incomes and outcomes with a specific user

## How to use
- You can use the like provided to post with deploying locally.

## How to run locally 
- Clone the repo
- Run npm install
- Create .env file and add DATABASE_URL with the link to your local mongoDB server or mongoDB Atlas
