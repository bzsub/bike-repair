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
