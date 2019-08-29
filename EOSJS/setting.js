/**
 트랜젝션 날릴때 마다 고정적으로 사용 해야 하기 떄문에 매번 입력하기 귀찮다.
-> 마지막에 eos를 호출 하기 위해서 필요한 것들.

고정적으로 사용하는 것들만 모아서 파일로 빼면 편하다.

이 파일은 03_buy_ram.js 파일에서 호출한다.
 */

const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextDecoder, TextEncoder } = require('util');

const privateKeys = [ '5JeqGuVt79ZUeQh1rekay7zGoutW7pzoCQR8Awr4fvuQ8oykv3D', '5HqSNzVf1b8ntR6dWb6i9ip2sMrBMZYLRFLQFc1Xs2wyXJLXAUY', '5JGnrMX6XGqYAfjTeQ93ECXvTbRt6P7JzL7TUqtXh12cJv33Ehk' ];

const signatureProvider = new JsSignatureProvider(privateKeys);

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

const eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

// 위에 세팅한 것 중에 아래 선언 된 것만 불러 올 수 있다.
module.exports = {
    eos
}