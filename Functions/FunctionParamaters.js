const WINNER_POINTS = 10;

const RUNNER_POINTS = 5;

const C5 = 3;

/**
 * If Several Function Use Similar Parameters, Put the Similar Parameters in a Consistent Order
 * 
 */

const calcVolumeOfRectangle = (length, width, height) => {

    return length * width * height

}


const calcAreaOfRectangle = (width, length) => {

    return width * length

}

/**
 * If we have multiple functions that have similar parameters, 
 * then we should put them in the same order in each function.
 */

const calcVolumeOfRectangle = (length, width, height) => {

    return length * width * height

}

const calcAreaOfRectangle = (length, width) => {

    return width * length

}

// calcAreaOfRectangle(1)

// calcAreaOfRectangle(5,)



/**
 * @description Function that returns rank for tournament.
 * @returns {Number}
 */
const calculateTournamentRank = (wins, losses) => wins + WINNER_POINTS / (wins + losses + C5);


/**
 * @description Function that returns rank for normal match between two teams.
 * @returns {Number}
 */
const calculateNormalRank = (wins, losses) => (wins + WINNER_POINTS) / (losses + RUNNER_POINTS);







/**
 * 
 * 
 * https://medium.com/swlh/javascript-best-practices-function-length-and-parameters-ffd2e38d72c3
 * 
 */













/**
 * 
 *  * @description Function that calculate volume of rectangle
 * @name calcVolumeOfRectangle
 * @param {Number} length 
 * @param {Number} width 
 * @param {Number} height 
 * @returns {Number}
 * 
 * 
 * @description Function that calculate area of rectangle
 * @name calcAreaOfRectangle
 * @param {Number} width 
 * @param {Number} length 
 * @returns {Number}

 */