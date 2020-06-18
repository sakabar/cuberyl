// const {Algorithm} = require('cuberyl');
const {Algorithm} = require('../dist/src/index');

const alg = new Algorithm("U R D R' U' R D' R'");
const isValidThreeStyle = alg.isValidThreeStyleCorner(3, 'UBL', 'UBR', 'RBD');

if (isValidThreeStyle) {
    console.log('OK');
}
