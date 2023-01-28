import {MorseCodeType} from "../utils/morse-code-language";


export const getValueByKey = <ObjT>(key: string, objects: ObjT[], reverse: boolean): ObjT[keyof ObjT] | string => {
    key = key.split('').filter(l => l !== '|').join('')
    let result = '';
    if(reverse) {
        if(key === ' ') return key;
        objects.map((obj) => {
            if(!result) {
                for (const objKey in obj) {
                    if(obj[objKey as keyof MorseCodeType] === key) {
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
                    result = obj[objKey as keyof MorseCodeType];
                    break;
                }
            }
        }
    })
    return result;
}