const { eos } = require('./setting')

async function invoke() {
    const result = await eos.transact({
        actions: [{
            account: 'eoseunjutst2',      // target contract ( account Name )
            name: 'add',         // action name
            authorization: [{
                actor: 'eoseunjutst3',     // action 실행 계정 명
                permission: 'active', 
            }],
            data: { // action parameter
                user : 'eoseunjutst3',
                a : 3,
                b : 5
            },        
        }],
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    })
    console.log(JSON.stringify(result, null, 2))
}

invoke()