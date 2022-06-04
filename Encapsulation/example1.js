const CarModule = () => {
    let milesDriven = 0;
    let speed = 0;
  
    const accelerate = (amount) => {
      speed += amount;
      milesDriven += speed;
    }
  
    const getMilesDriven = () => milesDriven;
  
    // Using the "return" keyword, you can control what gets
    // exposed and what gets hidden. In this case, we expose
    // only the accelerate() and getMilesDriven() function.
    return {
      accelerate,
      getMilesDriven
    }
  };
  
  const testCarModule = CarModule();
  testCarModule.accelerate(5);
  testCarModule.accelerate(4);
  console.log(testCarModule.getMilesDriven());
  