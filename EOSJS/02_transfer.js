const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextDecoder, TextEncoder } = require('util');

const privateKeys = [ '5JeqGuVt79ZUeQh1rekay7zGoutW7pzoCQR8Awr4fvuQ8oykv3D' ];

const signatureProvider = new JsSignatureProvider(privateKeys);

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

const eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


// 비동기방식으로 함수 실행할 것.
async function transfer () {
    const result = await eos.transact({
        actions: [{
            // 토큰 발행사
            account: 'eosio.token',
            // epsio.token의 함수명
            name: 'transfer',
            // 액션 날릴 액션 명
            authorization: [{
              actor: 'eoseunjutst2', // 토큰 전송 계정
              // owner 권한, active 권한
              permission: 'active',
            }],
            data: {
                from : 'eoseunjutst2', // 토큰 전송 계정
                to : 'getredpengio', // 토큰 전송 받는 계정
                quantity : '1.0000 EOS', // 토큰 보내는 양
                memo : 'send trasfer'// memo
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })
    console.log(result)
}
// 위에 비동기 함수 호출
transfer ();