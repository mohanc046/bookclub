/**
 *    NAMING CONVENTIONS 
 * 
 *    VARIABLE & METHOD NAME - camelCase
 * 
 *    CLASS COMPONENT & FUNCTION COMPONENT - PascalCase
 * 
 *    CONSTANT VALUES / FIX VALUE / ENUMS
 */


/**
 *   NAMING CONVENTIONS
 * 
 * 
 *   Naming conventions are must important one.
 * 
 *   * Too many people can work on same project.
 *   * Lead to predictability and discoverable.
 *   * A common naming convention, coupled with a consistent project structure, makes it easier to find files in a project
 * 
 *    `Code should explain itself`
 *  
 *    With proper naming and conventions - no need for adding more comments.
 */



/**
 *  Some common naming conventions used in programming.
 * 
 *  1. Camel Case (used in JS)
 *      
 *    camelCase, the first letter of the first word in the identifier is lower case,
 *    while the first letter of every subsequent word is uppercase
 * 
 *    Example : firstName, lastName
 *     
 *     
 *  2. Pascal Case (used in JS)
 * 
 *     The first letter of every word in the identifier is upper case.
 * 
 *     Example : UserProfile
 * 
 *  3. Snake Case
 * 
 *     Example : first_name, error_message
 * 
 * 
 *  4. Kebab Case :
 * 
 *     Example : first-name, main-section
 * 
 * 
 */


/**
 * Compare readability
 * 
 *  LongFunctionName ------> longfunctionname
 */

/**
 *  JavaScript variable -- a string, boolean or number, but also an object, array 
 *  function -- is declared with a camelCase variable name
 */




/** Variable -- Boolean */

// bad
var visible = true;
 
// good
var isVisible = true;


/** Methods - utils */

// bad
function name(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

// good
function getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}


/** Class Component*/

class SoftwareDeveloper {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

var me = new SoftwareDeveloper('Robin', 'Wieruch');


/** Method - React Component */

// bad
function userProfile(user) {
    return (
        <div>
            <span>First Name: {user.firstName}</span>
            <span>Last Name: {user.lastName}</span>
        </div>
    );
}

// good
function UserProfile(user) {
    return (
        <div>
            <span>First Name: {user.firstName}</span>
            <span>Last Name: {user.lastName}</span>
        </div>
    );
}


/**
 *  CONSTANT VARIABLE - FIXED VALUE SETS
 */

const PAN_TYPE = {
    INDIVIDUAL: "P",
    COMPANY: "C",
    HINDU_UNDIVIDED_FAMILY: "H",
    FIRM_LIMITED_LIABILITY_PARTNERSHIP: "F",
    ASSOCIATION_OF_PERSON: "A"
}