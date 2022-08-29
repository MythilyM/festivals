var request = require("request")

// GET method with params url and headers
function GET(_url, _headers) {
    var options = {

        method: 'GET',
        url: _url,
        headers: _headers,
        json: true
    };
    return REQUEST(options);
}

function REQUEST(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
                resolve(response);
            }
        });
    });
}

module.exports = { GET }