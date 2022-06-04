


var discountCalculator = {
    _discountedTotal: 40,
    _discount: 0,

    set  discounted(aNumber) {
        const old = this._discount;//?
        this._discount = aNumber;//?
        this._discountedTotal += old - aNumber; //?
    },

    get discountedValue() {
        return this._discountedTotal
    },

}


console.log(discountCalculator.discountedValue);

discountCalculator.discounted = 50

console.log(discountCalculator.discountedValue);
// expected output: "c"

