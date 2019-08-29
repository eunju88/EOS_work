/**
 * 02_transfer.js 예제에서 위에 모두 선언된 내용을 ./setting.js 파일에 모두 선언을 해두었다.
 */
const { eos } = require('./setting');


// 비동기방식으로 함수 실행할 것.
async function buyram () {
    const result = await eos.transact({
        actions: [{
            // buyram, sellram, net bandwidth, cpu bandwidth 등은 account 가 eosio
            account: 'eosio',
            // epsio의 함수명
            name: 'buyram',              // byte로 살 경우 name: 'buyrambytes',
            // 액션 날릴 액션 명
            authorization: [{
              actor: 'eoseunjutst2', // 토큰 전송 계정
              // owner 권한, active 권한
              permission: 'active',
            }],
            data: {
                payer : 'eoseunjutst2',           // ram 살  계정
                receiver : 'eoseunjutst2',        // ram 받는 계정
                quant : '1.0000 EOS'  // ※ 소수점 4자리 필수            // buyrambytes로 할 경우 -> bytes : 200, // 구매할 ram 양
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })
    console.log(result)
}
// 위에 비동기 함수 호출
buyram ();