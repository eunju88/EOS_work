// 자원 임대하기 실습

// account : eosio
// name : delegatebw

/*
data : {
    from : ,
    receiber : ,
    stakenet : ,        // EOS
    stakecpu : ,        // EOS
}
*/


const { eos } = require('./setting');


// 비동기방식으로 함수 실행할 것.
async function staking () {
    const result = await eos.transact({
        actions: [{
            // buyram, sellram, net bandwidth, cpu bandwidth 등은 account 가 eosio
            account: 'eosio',
            // epsio 의 함수명
            name: 'delegatebw',
            // 액션 날릴 액션 명
            authorization: [{
              actor: 'eoseunjutst2', // 토큰 전송 계정
              // owner 권한, active 권한
              permission: 'active',
            }],
            data: {
                from : 'eoseunjutst2',           // 자원 살  계정
                receiver : 'eoseunjutst2',       // 자원 받는 계정
                stake_net_quantity : '1.0000 EOS',          // ※ 소수점 4자리 필수, 소수점 4자리 필수.            
                stake_cpu_quantity : '1.0000 EOS',          // stake_net_quantity, stake_cpu_quantity 구매 안할 경우 항목은 필수로 입력 하고 값을 '0.0000 EOS' 입력
                transfer : false
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })
    console.log(result)
}
// 위에 비동기 함수 호출
staking ();