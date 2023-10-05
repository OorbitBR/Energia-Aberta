async function teste(){
    const url = 'https://dadosabertos.ccee.org.br/api/3/action/datastore_search?resource_id=ae00cc29-5c12-4da5-970f-ec1f5a251fe0';

    const response = await fetch(url);

    const text = await response.text();

    console.log(text);
}

const express = require("express");
const serverless = require("serverless-http");

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);