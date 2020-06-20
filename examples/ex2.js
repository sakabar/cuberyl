const {Algorithm} = require('cuberyl');

const alg = new Algorithm(3, "U R D R' U' R D' R'");
const isValidThreeStyle = alg.isValidThreeStyleCorner('UBL', 'UBR', 'RBD');

if (isValidThreeStyle) {
    console.log('OK');
}
