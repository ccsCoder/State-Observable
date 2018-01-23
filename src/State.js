import { JsonUtils } from "./JsonUtils";

export class State {
    
    constructor(dataObject) {
        this.obj = dataObject;
        this.handlers = {};
    }

    static create (obj) {
        this._stateObj = new State(obj);
        return this._stateObj;
    }

    getState() {
        return this.obj;
    }

    create (key, value) {
        if(key && value) {
            JsonUtils.create(this.obj, key, value);
        } else if(!value) {
            JsonUtils.createOnRoot(this.obj, key);
        } else {
            console.log('Invalid Argument.');
        }
    }

    prop(key, value) {
        if((key && value) || (key && value===false)) {
            let snapshot = JsonUtils.clone(this.obj);
            
            JsonUtils.prop(this.obj, key, value);
           
            if(this.locked) {
                this.eventsCache["update"] = { type: "update", path: key, old_val: this.temp_obj, new_val: this.obj };
            } else {
                this.publish({
                    type: "update",
                    path: key,
                    old_val: snapshot,
                    new_val: this.obj
                })
            }
            return this;

        } else if (!value) {
            return JsonUtils.propGet(this.obj, key);
        } else {
            console.log('Invalid Arguments');
        }
        
    }

    on (key, fn) {
        if(!this.handlers[key]) {
            this.handlers[key] = [];
        }
        this.handlers[key].push(fn);

        return function () {
            this.handlers[key] = this.handlers[key].filter((item) => {
                ''+item !== ''+fn;
            });
        }.bind(this);
    }

    lock () {
        this.eventsCache = {};
        this.temp_obj = JsonUtils.clone(this.obj);
        this.locked = true;
        return this;

    }

    unlock () {
        this.locked = false;
        Object.keys(this.eventsCache).forEach((key) => {
            this.publish(this.eventsCache[key]);
        });
        this.eventsCache = {};
        delete this.temp_obj; 
        return this;
    }

    publish(evtData) {
        console.log('Inside publish');
        
        let eventPath = evtData.path;    //range.type.absolute
        let obj = this.obj;
        do {

            if (this.handlers [eventPath] && this.handlers[eventPath].length > 0) {
                this.handlers[eventPath].forEach( (handlerFn)=> {
                    handlerFn(
                        JsonUtils.find(evtData.old_val, eventPath.split('.')), 
                        JsonUtils.find(obj, eventPath.split('.'))
                    );
                });
            }
            
            eventPath = eventPath.substring(0, eventPath.lastIndexOf('.'));
            
        } while(eventPath!="");
    }
    toString() {
        return "State";
    }
}
