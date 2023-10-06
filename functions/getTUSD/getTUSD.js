const https = require('https');

function getRequest(url) {
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
const handler = async (event) => {
  const dist = event.queryStringParameters.dist || false

  let url = 'https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=fcf2906c-7c32-4b9b-a637-054e7a5234f4';
  if (dist) url += '&q='+dist+'&limit=500'

  try {
    const result = await getRequest(url);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {statusCode: 400, body: error.message};
  }
}

module.exports = { handler }
