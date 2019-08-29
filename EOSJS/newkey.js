// ecc : Ellipict curve cryptography
// 타원 곡선 암호화 -> 개인 키, 공개 키

const ecc = require('eosjs-ecc');

async function createkey(){
    const res = ecc.randomKey().then(privatekey =>{
        console.log('Private key : \t', privatekey) // wif
        console.log('Public key : \t', ecc.privateToPublic(privatekey))
    })
}

createkey();