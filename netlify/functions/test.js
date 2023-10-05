
/*exports.handler = async function (event, context) {
    const url = 'https://dadosabertos.ccee.org.br/api/3/action/datastore_search?resource_id=ae00cc29-5c12-4da5-970f-ec1f5a251fe0';

    const response = await fetch(url);

    const text = await response.text();

    console.log(text);
    return text
    // your server-side functionality
};*/

exports.handler = async function (event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
};