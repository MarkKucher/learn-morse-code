import {singleChar} from "../store/slices/translator";

export const switchIsHighlighted = (array: singleChar[], index: number): singleChar[] => {
    return array.map((obj, i) => {
        let iterationObj = {...obj}
        if(i === index) {
            iterationObj.isHighlighted = !obj.isHighlighted
        }
        return iterationObj;
    })
}