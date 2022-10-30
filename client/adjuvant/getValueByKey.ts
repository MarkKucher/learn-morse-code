export const getValueByKey = (key: string, objects: Object[]) => {
    let  result = false;
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