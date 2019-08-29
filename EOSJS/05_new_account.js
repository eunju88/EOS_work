const { eos } = require('./setting')

async function createAccount () {
    const result = await eos.transact({
        actions: [{
          account: 'eosio',
          name: 'newaccount',
          authorization: [{
            actor: 'eoseunjutst2',      // 기존 어카운트
            permission: 'active',
          }],
          data: {
            creator: 'eoseunjutst2',    // 기존 어카운트
            name: 'eoseunjutst3',       // 새 어카운트 계정명
            owner: {
              threshold: 1,
              keys: [{
                key: 'EOS5rVRhsi8PAHKUufnFrouk7RADXSG3BpgnGfJBS14HPQ3Dj7qxE',
                weight: 1
              }],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [{
                key: 'EOS5WhPbr5akC8HbnmWza4gJzTG96Bw2hTuUQicw269yx4FXrqoRm',
                weight: 1
              }],
              accounts: [],
              waits: []
            },
          },
        },
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [{
            actor: 'eoseunjutst2',
            permission: 'active',
          }],
          data: {
            payer: 'eoseunjutst2',
            receiver: 'eoseunjutst3',
            bytes: 8192,
          },
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [{
            actor: 'eoseunjutst2',
            permission: 'active',
          }],
          data: {
            from: 'eoseunjutst2',
            receiver: 'eoseunjutst3',
            stake_net_quantity: '1.0000 EOS',
            stake_cpu_quantity: '1.0000 EOS',
            transfer: false,
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log('txID: ', result.transaction_id)
}

createAccount()