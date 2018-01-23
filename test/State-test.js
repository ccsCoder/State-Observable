import 'babel-polyfill';

var expect = require("chai").expect;
import {State} from "../src/State";

describe ("State Observable", function () {
    let testObj = { range: { start: 1, end: 2, type: { absolute: true } } };
    describe("Creation of State from Object", function(){
        it("should return instance of State", function(){
            let stateObj = State.create(testObj);
            expect(stateObj).to.be.an.instanceof(State);
        });
    });
    describe("Get the State from StateObject", function(){
        it("should return Object state", function () {
           let stateObj = State.create(testObj);
           stateObj = stateObj.getState();
           expect(stateObj).to.be.equal(testObj); 
        });
    });
    describe("Create Properties on State", function() {
        it("Should create a new property inside given path", function() {
            let stateObj = State.create(testObj);
            stateObj.create("range.type.position","relative");
            expect(stateObj.getState().range.type.position).to.be.equal("relative");
        });
        it("Given no key, the property should be created in Root", function(){
            let stateObj = State.create(testObj);
            stateObj.create({"focus":"none"})
            expect(stateObj.getState().focus).to.be.equal("none");
        });
    });
    describe("Update and get properties in the State Object", function() {
        it("Given a key, it should return the property", function(){
            let stateObj = State.create(testObj);
            expect(stateObj.prop("range.type.absolute")).to.be.equal(true);
        });
        it("Given both key and value, it should update the value and return State Object", function(){
            let stateObj = State.create(testObj);
            expect(stateObj.prop("range.type.absolute","false").prop("range.type.absolute")).to.be.equal("false");
            expect(stateObj).to.be.instanceof(State);

        });
    });
    
});