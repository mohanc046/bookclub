class CarModule {
    #speed = 0
    #milesDriven = 0
    
    accelerate(amount) {
      // It's virtually impossible for this data to be
      // accidentally accessed.
      this.#speed += amount;
      this.#milesDriven += speed;
    }
  
    getMilesDriven() {
      return this.#milesDriven;
    }

  }
  
  const testCarModule = new CarModule();
  testCarModule.accelerate(5);
  testCarModule.accelerate(4);
  console.log(testCarModule.getMilesDriven());
  console.log(testCarModule.speed);