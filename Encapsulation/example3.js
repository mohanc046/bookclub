class CarModule {
    constructor() {
      let milesDriven = 0;
      let speed = 0;
  
      this.accelerate = (amount) => {
        speed += amount;
        milesDriven += speed;
      }
  
      this.getMilesDriven = () => milesDriven;
    }
  }
  
  const testCarModule = new CarModule();
  testCarModule.accelerate(5);
  testCarModule.accelerate(4);
  console.log(testCarModule.getMilesDriven());
  console.log(testCarModule.speed);