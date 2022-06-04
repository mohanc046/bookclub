class Student {

    constructor() {
        var name;
        var marks;
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }

    getMarks() {
        return this.marks;
    }
    setMarks(marks) {
        this.marks = marks;
    }

}
var stud = new Student();

// directly accessing
stud.name = "Mohan";
stud.marks = 80;

// with of function
stud.setName("John");
stud.setMarks(80); 


// console.log(stud.getName());
// console.log(stud.getMarks());

console.log(stud.name);