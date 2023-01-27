import {singleChar} from "../../store/slices/translator";

export const findObjectByValue = (array: singleChar[], elem: string) => {
    let result = -1;
    array.forEach((obj, index) => {
        if(obj.value === elem) {
            result = index;
            return;
        }
    })
    return result;
}