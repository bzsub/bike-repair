const _config = {
  dev: {
    todo_api: "http://localhost:8080/api",
    google_client_id: "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
    google_base_url: "https://accounts.google.com/o/oauth2/v2/auth",
  }, // "eldobhatos", teszt google app ize
  prod: {
    todo_api: process.env.REACT_APP_TODO_API || "http://localhost:8080/api",
    google_client_id:
      process.env.REACT_APP_GOOGLE_CLIENT_ID ||
      "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
    google_base_url: process.env.REACT_APP_GOOGLE_BASE_URL || "https://accounts.google.com/o/oauth2/v2/auth",
  },
};

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod; //a build folyamat allitja be, npm start-kor

export default config;
