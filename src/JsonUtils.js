export class JsonUtils {

    static find (jsonObject, keyArray, parent) {
        
        let pointer = jsonObject;
        if(parent) {
            keyArray = keyArray.slice(0, keyArray.length-1);
            console.log(keyArray);
            
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

    static create (jsonObject, key, value) {
        let keys = key.split('.');
        let newValueKey = keys.slice(keys.length-1);
        let parentRef = keys.slice(0, keys.length-1);
        let loc = JsonUtils.find(jsonObject, parentRef);

        loc[newValueKey] = value; 
    }

    static createOnRoot (jsonObject, value) {
        Object.assign(jsonObject, value);
    }

    static prop (jsonObject, prop, value) {
        let prop_path = prop.split('.');
        let loc = JsonUtils.find(jsonObject, prop_path, true); 
        let prop_name = prop_path[prop_path.length-1];
        let prev = loc[prop_name];
        loc[prop_name] = value;
        return prev;

    }

    static propGet(jsonObject, prop) {
        return JsonUtils.find(jsonObject, prop.split('.'));
    }

}

