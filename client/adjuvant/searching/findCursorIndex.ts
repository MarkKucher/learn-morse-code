import {singleChar} from "../../store/slices/translator";

export const findCursorIndex = (arr: singleChar[], deep: boolean, elem?: string): number => {
    let result = -1;
    arr.forEach((obj, index) => {
        if(elem ? obj.value === elem : obj.value === '|') {
            result = index;
        }  else if(deep && obj.value.includes(elem || '|')) {
            result = index;
        }
    })
    return result;
}