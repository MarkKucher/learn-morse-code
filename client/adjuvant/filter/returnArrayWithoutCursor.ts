import {singleChar} from "../../store/slices/translator";

export const returnArrayWithoutCursor = (array: singleChar[]): singleChar[] => {
    let newArray = [] as singleChar[];

    array.forEach((obj) => {
        let newObj;
        if(obj.value !== '|') {
            newObj = obj;
            if(obj.value.includes('|')) {
                newObj = {...obj, value: obj.value.split('').filter(s => s !== '|').join('')}
            }
            newArray.push(newObj)
        }
    })

    return newArray;
}