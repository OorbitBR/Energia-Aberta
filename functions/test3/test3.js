// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
/*
const handler = async (event) => {
    const url = 'https://dadosabertos.ccee.org.br/api/3/action/datastore_search?resource_id=ae00cc29-5c12-4da5-970f-ec1f5a251fe0';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true ); // false for synchronous request
    xmlHttp.send( null );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: xmlHttp.responseText }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
}

module.exports = { handler }
*/

const https = require('https');

function getRequest() {
  const url = 'https://dadosabertos.ccee.org.br/api/3/action/datastore_search?resource_id=ae00cc29-5c12-4da5-970f-ec1f5a251fe0';

  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

exports.handler = async event => {
  try {
    const result = await getRequest();
    console.log('result is: 👉️', result);

    // 👇️️ response structure assume you use proxy integration with API gateway
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log('Error is: 👉️', error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
