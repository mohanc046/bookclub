class CarModule {
    /*
      milesDriven = 0;
      speed = 0;
    */
    constructor() {
        this._milesDriven = 0;
        this._speed = 0;
    }
    accelerate(amount) {
      this.speed += amount;
      this.milesDriven += this.speed;
    }
    getMilesDriven() {
      return this.milesDriven;
    }
  }
  
  const testCarModule = new CarModule();
  testCarModule.accelerate(5);
  testCarModule.accelerate(4);
  console.log(testCarModule.getMilesDriven());
  console.log(testCarModule._speed);