import {State} from "../dist/State";
import {JsonUtils} from "../dist/JsonUtils";

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



//let loc = JsonUtils.find(testObj, "bachelors.name");
//console.log(loc);

JsonUtils.create(testObj, "masters.passout","2009");
// console.log(testObj);
let old = JsonUtils.prop(testObj, "masters.passout","2008");

console.log(testObj);
console.log(JsonUtils.propGet(testObj, "masters.passout"));


// let obs = State.create(testObj);
// // console.dir(obs);
// obs.create("degrees",{"highschool":{
//     name: "10th",
//     "percentage":"85"
// }});

// console.log(obs.prop('masters.cgpa'));
//obs.prop('degrees.bachelors.cgpa','9.2');

//console.log(obs.getState());
