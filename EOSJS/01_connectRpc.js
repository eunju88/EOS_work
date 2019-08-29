const { JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

// read eos blockchanin info
// rpc.get_info().then(console.log);

// 2번째 블록 정보
//rpc.get_block(2).then(console.log);

// => https://jungle.bloks.io/account/eoseunjutst2 에서 같은지 확인이 가능하다
// rpc.get_account('eoseunjutst3').then(console.log);

// 잔액정보
// 발급사, 검색하고픈 계정, 심볼
//rpc.get_currency_balance('eosio.token', 'eoseunjutst2', 'EOS').then(console.log);
//rpc.get_currency_balance('eosio.token', 'eoseunjutst2', 'JUNGLE').then(console.log);
//rpc.get_currency_balance('eosio.token', 'getredpengio', 'EOS').then(console.log);


//rpc.get_currency_balance('eoseunjutst2', 'eoseunjutst2', 'EUX').then(console.log);
//rpc.get_currency_balance('eoseunjutst2', 'getredpengio', 'EUX').then(console.log);
//rpc.get_currency_balance('getredpengio', 'eoseunjutst2', 'FOD').then(console.log);
//rpc.get_currency_balance('eoseunjutst2', 'sem121sem121', 'EUX').then(console.log);

rpc.get_account('eoseunjutst2').then(console.log);