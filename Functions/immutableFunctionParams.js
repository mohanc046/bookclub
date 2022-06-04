const USER_ID = 2;

/**
 * The Problem
 * 
 * we want to get a user from our data store.
 * 
 * Update that user, and then persist the changes back to our data store.
 * 
 */

// user store
let users = [
    { id: 1, name: { firstName: 'Tuyet', lastName: 'Celestine', age: 22 } },
    { id: 2, name: { firstName: 'Keila', lastName: 'Fritsch', age: 57 } },
    { id: 3, name: { firstName: 'Sid', lastName: 'Dino', age: 76 } },
    { id: 4, name: { firstName: 'Rosalva', lastName: 'Sligh', age: 18 } },
];

/**
 * @description Function thats updated data store with updated user information
 * @name updateUserName
 * @param {Object} user 
 * @param {Object} param1 
 * @returns 
 */
function updateUserName(user, firstName, lastName) {

    const { name } = user;

    name.firstName = firstName;

    name.lastName = lastName;

    return user;

}

// Getting respective user by finding user with unique ID.
const user = users.find((user) => {
    const { id = "" } = user;
    return id === USER_ID;
})

// Output :

// { id: 2, name: { firstName: 'Keila', lastName: 'Fritsch', age: 57 } } // example store in memory address - 21434

const updatedUser = updateUserName(user, 'new first name', 'new last name');

// no need to call `saveUser` user has already been saved :( 

// Output :
// [
//     {
//         id: 1,
//         name: { firstName: 'Tuyet', lastName: 'Celestine', age: 22 }
//     },
//     {
//         id: 2,
//         name: { firstName: 'new first name', lastName: 'new last name', age: 57 }
//     },
//     { id: 3, name: { firstName: 'Sid', lastName: 'Dino', age: 76 } },
//     { id: 4, name: { firstName: 'Rosalva', lastName: 'Sligh', age: 18 } }
// ]


