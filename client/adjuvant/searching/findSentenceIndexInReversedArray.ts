import {singleChar} from "../../store/slices/translator";

export const findSentenceIndexInReversedArray = (reversedArray: singleChar[], index: number, doNotReturnCursor: boolean = true): number => {
    let indexInSentence: number = -1;
    if(index === 0) {
        indexInSentence = 0;
    }
    for (let i = 0; i < index; i++) {
        let obj = reversedArray[i];
        if(obj.value === ' ') {
            if(i === 0) indexInSentence += 2
            else indexInSentence++
        } else {
            indexInSentence += obj.value.length + 1
        }
        i === index - 1 && indexInSentence++
    }
    doNotReturnCursor && reversedArray[index]?.value[0] === '|' && indexInSentence++
    return indexInSentence;
}