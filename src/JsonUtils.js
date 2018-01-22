export class JsonUtils {

    static find (jsonObject, keyArray) {
        console.log(keyArray);
        
        let pointer = jsonObject;
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
        console.log("some");
        Object.assign(jsonObject, value);
    }

    static prop (jsonObject, prop, value) {
        let loc = JsonUtils.find(jsonObject, prop.split('.')); 
        // console.log(loc);
        let prev = loc;
        loc = value;
        return prev;

    }

}

