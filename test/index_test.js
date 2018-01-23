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

var testobj2 = {
  range: {
    start: 1,
    end: 5,
    type: {
      absolute: true
    }
  },
  visible: true,
  focus: null
};

// JsonUtils.create(testObj, "masters.passout","2009");

// let old = JsonUtils.prop(testObj, "masters.passout","2008");

// console.log(testObj);
// console.log(JsonUtils.propGet(testObj, "masters.passout"));

let ref = State.create(testobj2);

let printer = (old, newval) => {
    JsonUtils.plog(old);
    JsonUtils.plog(newval);
}

ref.on('range.type.absolute', printer);

ref.on('range.type', printer);

ref.on('range',printer);

ref.prop('range.type.absolute','false'); 



