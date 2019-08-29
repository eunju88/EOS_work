const chainConfig = {
    mainnet: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'http://bp.cryptolions.io:9876',
    },
    testnet: {
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        httpEndpoint: 'http://13.209.95.232:8880'
        // httpEndpoint: 'http://jungle.cryptolions.io:18888'
    }
};

const config = {
    chainId: chainConfig.testnet.chainId,
    keyProvider: ['5KdYMpUHN36Rednstkidd1qPgLTgtMrRhPAisbjg4ymjsWbQLKY'],
    httpEndpoint: chainConfig.testnet.httpEndpoint,
    broadcast: true,
    verbose: false,
    sign: true
};

exports.getConfig = function(){
    return config;
};