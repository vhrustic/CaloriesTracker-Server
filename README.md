# Calories Tracker

This app is the back-end for the Calories Tracker.

## Database Prerequisites
Application connects to PostgreSQL database. Make sure you have PostgreSQL 13 server up and running before you run the app. You should also create schema in database before you start he app. In this example, schema is named `calories` (defined in `.env` file).


## Running the app locally

After running `npm install`, you can run the app using `npm start`. By default, this will run with the local environment, and environment variables will be read from `.env`file.

Example of `.env` file contents:
```
PORT=8000
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=calories
DATABASE_PASSWORD=calories
DATABASE_SCHEMA=calories
JWT_EXPIRATION_TIME=3600000
JWT_SECRET_KEY="Set Meal Mill Ice Hollow Rapid Dark Bus Lose 5"
NUTRITIONIX_APP_ID=2d2ffe53
NUTRITIONIX_APP_KEY=6ce9524651d41ac6cb1f4d3b0785d3b4
NUTRITIONIX_BASE_URL=https://trackapi.nutritionix.com
```

See package.json for full list of available commands.