
export const getValueByKey = (key: string, objects: Object[], reverse: boolean) => {
    key = key.split('').filter(l => l !== '|').join('')
    let result = '';
    if(reverse) {
        if(key === ' ') return key;
        objects.map((obj) => {
            if(!result) {
                for (const objKey in obj) {
                    if(obj[objKey] === key) {
                        result = objKey;
                        break;
                    }
                }
            }
        })
        return result;
    }
    objects.map((obj) => {
        if(!result) {
            for (const objKey in obj) {
                if(key === objKey) {
                    result = obj[objKey];
                    break;
                }
            }
        }
    })
    return result;
}