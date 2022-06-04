/**
 * 
 * Magic Numbers
 * 
 * Magic: Unknown semantic
 * 
 * Symbolic Constant -> Provides both correct semantic and correct context for use
 * 
 * Semantic: The meaning or purpose of a thing.
 * 
 * 
 * 
 * "Create a constant, name it after the meaning, and replace the number with it." -- Martin Fowler
 * 
 * 
 * 
 ***** First, magic numbers are not just numbers. 
 * 
 * Any basic value can be "magic". 
 * 
 * Basic values are entities such as integers, floats, dates, strings, booleans, characters, and so on.
 * 
 * The issue is not the data type, but the "magic" aspect of the value as it appears in our code text.
 * 
 * 
 ****** What do we mean by "magic"? 
 * 
 * To be precise: By "magic", we intend to point to the semantics (meaning or purpose) of the value in the context of our code;
 * 
 * that it is unknown, unclear, or confusing.
 * 
 * 
 * 
 ***** Kind of Magic, but not
 * 
 * With this thought in mind, we can quickly see how a number like Pi (3.14159) is not a "magic number"
 *  
 * when placed in proper context (e.g. 2 x 3.14159 x radius or 2*Pi*r). 
 * 
 * Here, the number 3.14159 is mentally recognized Pi without the symbolic constant identifier.
 * 
 * 
 ***** Example :
 * 
 * "2" by itself could be anything.
 * 
 * DEFAULT_PADDING = 2
 * 
 * Only when we limit the range and domain of understanding to "my program"
 * 
 * where 2 is the DEFAULT_PADDING in the GUI UX parts of "my program",
 * 
 * do we finally make sense of "2" in its proper context. Here "2" is a "magic" number,
 * 
 * Thus, any basic value, whose meaning cannot be sufficiently then symbolic constant in the place of the basic value (e.g. magic number).
 * 
 * 
 ***** Another Example : Game
 * 
 * Range of numbers
 * 
 * full_life_force: INTEGER = 10 -- Very alive (and unhurt)
 * 
 * minimum_life_force: INTEGER = 1 -- Barely alive (very hurt)
 * 
 * dead: INTEGER = 0 -- Dead
 * 
 * undead: INTEGER = -1 -- Min undead (almost dead)
 * 
 * zombie: INTEGER = -10 -- Max undead (very undead)  
 * 
 * From the symbolic constants above, 
 * 
 * we start to get a mental picture of the aliveness, deadness, and "undeadness" 
 * 
 * Without these words (symbolic constants), we are left with just the numbers ranging from -10 .. 10.
 * 
 * Just the range without the words leaves us in a place of possibly great confusion & leads to bug
 * 
 * 
 *  PAN_CARD_TYPE
 * 
 *  INDIVIDUAL: "P"
 *  COMPANY: "C"
 *  HINDU_UNDIVIDED_FAMILY: "H"
 *  FIRM_LIMITED_LIABILITY_PARTNERSHIP: "F"
 *  ASSOCIATION_OF_PERSON: "A"
 * 
 */

