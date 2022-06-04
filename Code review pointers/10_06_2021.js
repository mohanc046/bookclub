/**
 * 
 * Nested Ternary operators 
 * 
 ***** Ternary operators are popular
 * 
 * render() {
 * 
 * const isLoggedIn = this.state.isLoggedIn;
 * 
 *  return (<h> The user is {isLoggedIn ? 'currently' : 'not'} logged in.</h>);
 * 
 * }
 * 
 * 
 * 
 ***** when you nest the ternary operators over and over, they can become ugly and hard to read.
 * 
 */

// positive, negative & neutral

const getNumberSign = (number) => {

    return number > 0 ? "POSITIVE" : number < 0 ? 'NEGATIVE' : 'NEUTRAL'

}

getNumberSign(0) // NEUTRAL
getNumberSign(1) // POSITIVE
getNumberSign(-5) // NEGATIVE


/**
 * 
 * 
 * InLine styles ---> External css
 * 
 * Inline styles :
 * 
 * <img src={(imagePath)} height="200x" />
 * 
 * 
 * Move to external css file :
 * 
 * <img src={(imagePath)} className='captchaImage' />
 * 
 * 
 */



/**
 * 
 * In Britannia Onboarding:
 * 
 * Inline styles have to be moved
 * 
 * - src
 *   - components
 *      - autoCompleteInput
 *      - errorBoundary
 *   - screens
 *      - Dashboard
 *      - Infrastructure
 *      - MSMEOnboarding
 *         - Components
 *             - BusinessForm
 *             - GSTRReturnsForm
 *      - ROICalculator
 * 
 *   Eliminated 
 *    - screens
 *       - ITR
 *       - GSTR
 *       - 
 * 
 * 
 * 
 * - Magic numbers also found
 * 
 * - screens
 *   - ROICalculator
 *   - Infrastructure
 * 
 */