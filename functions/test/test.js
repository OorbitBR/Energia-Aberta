// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {

  const url = 'https://dadosabertos.ccee.org.br/api/3/action/datastore_search?resource_id=ae00cc29-5c12-4da5-970f-ec1f5a251fe0';

  const response = await fetch(url);

  console.log(response);

  try {
    return {
      statusCode: 201,
      body: JSON.stringify({ message: response }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
