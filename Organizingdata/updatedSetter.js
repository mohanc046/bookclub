var discountCalculator = {
    discount: 50,
    baseValue: 100,

    set discounted(aNumber) {
        this.baseValue = this.discount;
        this.discount = aNumber;
    },

    get discountedValue() {
        return this.baseValue - this.discount
    },

}


console.log(discountCalculator.discountedValue);

discountCalculator.discounted = 40

console.log(discountCalculator.discountedValue);

