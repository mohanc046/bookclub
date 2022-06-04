

/**
 * 
 * Reference article : https://www.infoq.com/news/2017/02/dead-code/
 * 
 * Dead Code Elimination :
 * 
 *  Is an optimization that removes code which does not affect the program results.
 * 
 * 
 * 
 * 
 * Example : New York Stock Exchange opened on the morning of 1st August 2012, 
 *           Knight Capital Group’s newly updated high-speed algorithmic router incorrectly generated orders 
 *           that flooded the market with trades.
 * 
 *           About 45 minutes and 400 million  --> lost over $10 million per minute
 * 
            * They updated their servers manually and, unbeknown to them, 
            * one of the deployments failed, leaving the old version running. 
            * To take advantage of the new NYSE system, they recycled an old flag,
            * a flag that was no longer used but had now been repurposed to mean something different.
            * 
            * Panic-response messing with a live system
            * 
            * The code had been dead for years, but was awakened by a change to the flag’s value.
            * The zombie apocalypse arrived and the rest is bankruptcy.
 * What?
 * 
 * Dead code is a section in the source code of a program which is executed
 * but whose result is never used in any other computation.
 * 
 * `Dead code is not truly dead until it’s buried.`
 * 
 * 
 * Why?
 * 
 * While existing feature elimination - not removed dependant functionality
 * 
 * Not organizing code base??
 * 
 * 
 * When it is happening?
 * 
 * different user work on same functionality - not maintaining proper standards
 * 
 * 
 * Where?
 * 
 * API call, util methods, enums (fixed values, language strings)
 * 
 * 
 * How to prevent it?
 * 
 * Maintaining all utils methods, api services, enums in single roof will help us avoiding this issues.
 * 
 * 
 * Removing such code has several benefits!~
 * 
 * it shrinks program size and it allows the running program to avoid executing irrelevant operations, 
 * 
 * which reduces its running time. 
 * 
 * It can also enable further optimizations by simplifying program structure.
 * 
 */