// npm install request
const request = require('request');

let options = {
    url: "https://junglehistory.cryptolions.io/v2/history/get_actions",
    qs: {
        account: "eoseunjutst3"
    }
}

async function get_history () {
    request(options, (error, response, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result, null,2);
        }
    });
}

get_history()