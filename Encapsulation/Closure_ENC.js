var Person = () => {

    var fullName = "Mohan";
    var reg = new RegExp(/\d+/);
    var password = "******";

    return {
        setFullName: function (newValue) {
            if (reg.test(newValue)) {
                alert("invalid name");
            }
            else {
                fullName = newValue; // Legal! The object has access to "fullName"
            }
        },
        getFullName: function () {
            return fullName; // Legal! The object has access to "fullName"
        }
    }
}

const instance1 = Person();

console.log(instance1.getFullName());
console.log(instance1.fullName);



// initializing
// var functionVariable = "Welcome";

// function scopeTest() {
//     // var functionVariable = "Hello!";
//     console.log(functionVariable) // "Hello!";
// }

// console.log(functionVariable) // "Welcome";
// scopeTest() // "Hello!";
// console.log(functionVariable) // "Hello!";
















///  1  //  2 // 3 //


