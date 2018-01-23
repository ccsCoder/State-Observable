export class JsonUtils {

    static find (obj, keyArray, parent) {
        
        let pointer = obj;
        if(parent) {
            keyArray = keyArray.slice(0, keyArray.length-1);
        }
        keyArray.forEach((key_val) => {
            if(pointer[key_val]) {
                pointer = pointer[key_val];
            } else {
                pointer = undefined;
            }
        });
        return pointer;
    }

    static create (obj, key, value) {
        let keys = key.split('.');
        let newValueKey = keys.slice(keys.length-1);
        let parentRef = keys.slice(0, keys.length-1);
        let loc = JsonUtils.find(obj, parentRef);

        loc[newValueKey] = value; 
    }

    static createOnRoot (obj, value) {
        Object.assign(obj, value);
    }

    static prop (obj, prop, value) {
        let snapshot = JsonUtils.clone(obj);
        let prop_path = prop.split('.');
        let loc = JsonUtils.find(obj, prop_path, true); 
        let prop_name = prop_path[prop_path.length-1];
        loc[prop_name] = value;
        // JsonUtils.plog(snapshot);
        return snapshot;

    }

    static clone (obj)  {
        return JSON.parse(JSON.stringify(obj));
    }

    static propGet(obj, prop) {
        return JsonUtils.find(obj, prop.split('.'));
    }

    static plog(obj) {
        console.log(JSON.stringify(obj, null, 2));
        
    }

}

