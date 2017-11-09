/**
 * round - intended for rounding a number in Javascript
 * to control the number of decimal places.
 * @param {*Number} value 
 * @param {*Number int} decimals 
 */
const round = function(value, decimals){
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export default round;