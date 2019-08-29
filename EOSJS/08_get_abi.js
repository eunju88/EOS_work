const { eos } = require('./setting');


async function get_abi (contract) {
    const result = await eos.rpc.get_abi(contract);
    console.log(JSON.stringify(result, null, 2));
}

get_abi('eoseunjutst2')