
function distanceTravelled (scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
      let primaryVelocity = primaryAcceleration * scenario.delay;
      const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
      result += primaryVelocity * secondaryTime +
        0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
    }
    return result;
  }


const scenario = {
    primaryForce: 2000,
    mass: 50,
    delay: 2,
    secondaryForce: 10
}

const time = 15


console.log(distanceTravelled(scenario, 15));