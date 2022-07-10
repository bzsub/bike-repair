# BIKE REPAIR APP

This is a simple site, where you can sign up as a biker or as a repair shop. Then as a biker you can browse shops, book repairs and leave a review. The project was a final exam for the bootcamp at CodeCool. Currently still in development. 


## Technologies Used

- MongoDB
- Express.js
- React
- Node.js

- Both the front- and back-end contains a Dockerfile

## Frontend

The frontend was made by React. To run it locally run these commands in the frontend directory:

- npm i
- npm start

## Backend

### System requirements:

- nodejs
- npm

### Environment variables

The backend directory contains the API code, using Express.js. Make a **.env** file in the backend directory with these values:

- PORT={port}
- APP_URL={url-of-frontend}
- CONNECTION_STRING={mongo-connection-string}
- SECRET_KEY={secret}

For errorHandling I used Logflare :

- LOGFLARE_SOURCE_ID={source-id}
- LOGFLARE_API_KEY={api-key}

For the goole openid:

- GOOGLE_CLIENT_ID={client-id}
- GOOGLE_CLIENT_SECRET={client-secret}
- GOOGLE_REDIRECT_URI={url-of-frontend}/callback

### Starting the app

After properly setting up the **.env** file, the app can be run by using these commands:

- npm i
- npm start
