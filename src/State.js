export class State {
    
    constructor(dataObject) {
        this.obj = dataObject;
    }

    static create (obj) {
        if (this._stateObj) {
          return this._stateObj;
        }
        this._stateObj = new State(obj);
        return this._stateObj;
    }

    getState() {
        return this.obj;
    }

    create (key, value ) {
        let prev = undefined;
        let path = "";

        if (key && value) {
            prev = this.obj[key] ;
            if(Array.isArray(this.obj[key])) {
                this.obj[key].push(value);
            } else {
                this.obj[key] = value;
            }
            path = key;

        } else if(!value) {
            //in this case, we have the object in Key
            Object.assign(this.obj, key);
        } else {
            console.error("You must provide at-least one argument");
        }
        //publish event
        State.publish("MUTATION", {
            type: "create",
            path : path,
            old_val : prev,
            new_val : value || key

        });

        return this;
    }

    prop(key, value) {
        let prev = undefined;
        if(key && value) {
            prev = this.obj[key];
            this.obj[key] = value;
            State.publish("MUTATION", {
                type: "update",
                path: key,
                old_val: prev,
                new_val: value
            });
            return this;
        } else if(!value) {
            console.log(key);
            return this.obj[key];
        }
    }

    static publish(data) {
        // console.log('published '+data.type);
    }
}
