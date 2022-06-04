/**
 * 1. scenarios de-structure.
 * 2. Reusing same variable repeatedly
 * 3. Magic numbers.
 */


function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass; // 1
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay;
        let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
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