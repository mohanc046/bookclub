class CarModule {
    constructor() {
      this.data = new WeakMap();
      this.data.set(this, {
        milesDriven: 0,
        speed: 0
      });
    }
  
    accelerate(amount) {
      // In this version, we instead create a WeakMap and
      // use the "this" keyword as a key, which is not likely
      // to be used accidentally as a key to the WeakMap.
      const data = this.data.get(this);
      const speed = data.speed + amount;
      const milesDriven = data.milesDriven + data.speed;
      this.data.set({ speed, milesDriven });
    }
  
    getMilesDriven = () => this.data.get(this).milesDriven;
  }
  
  const testCarModule = new CarModule();
  testCarModule.accelerate(5);
  testCarModule.accelerate(4);
  console.log(testCarModule.getMilesDriven());
  console.log(testCarModule.data);