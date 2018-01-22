import {State} from "../dist/State";


var testObj = {
    name: "neo",
    age: "32",
    
    masters: {
        name: "mca",
        cgpa : "9.7"
    },
    bachelors: {
        name:"bca",
        cgpa:"8"    
    }
};

let obs = State.create(testObj);
// console.dir(obs);
obs.create("degrees",{"highschool":{
    name: "10th",
    "percentage":"85"
}});

console.log(obs.prop('masters.cgpa'));
//obs.prop('degrees.bachelors.cgpa','9.2');

//console.log(obs.getState());
