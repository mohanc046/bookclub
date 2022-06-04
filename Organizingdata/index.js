/**
 * 1. scenarios de-structure.
 * 2. Reusing same variable repeatedly
 * 3. Magic numbers.
 * 4. Haggis : made with sheep's heart, liver, and lungs, often mixed with minced onions, spices, and oatmeal
 */

const getPrimaryTime = (time, delay) => Math.min(time, delay)

const distanceTravelled = (scenario, time) => {
    let result;
    let acc = scenario.primaryForce / scenario.mass; // 1
    let primaryTime = getPrimaryTime(time, scenario.delay);
    result = 0.5 * acc * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = acc * scenario.delay;
        acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass; // 2
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}


const scenario = {
    primaryForce: 2000,
    mass: 50,
    delay: 2,
    secondaryForce: 17
}

const time = 15


distanceTravelled(scenario, 20)