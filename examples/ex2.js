const {Algorithm333} = require('cuberyl');

const alg = new Algorithm333("U R D R' U' R D' R'");
const isValidThreeStyle = alg.isValidThreeStyleCorner('UBL', 'UBR', 'RBD');

if (isValidThreeStyle) {
    console.log('OK');
}
