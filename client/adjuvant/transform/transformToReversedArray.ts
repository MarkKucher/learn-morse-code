import {singleChar} from "../../store/slices/translator";
import {getValueByKey} from "../getValueByKey";
import {specialSymbolsMorse} from "../../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../../utils/morse-code-special-characters";
import {noMorse} from "../../utils/morse-code-no";

export const transformToReversedArray = (array: singleChar[], translationRelationships: Object): singleChar[] => {
    let sentence: singleChar[] = JSON.parse(JSON.stringify(array))
    let output = [] as singleChar[];
    let singleBit: string | null = null;
    sentence.forEach((obj, i) => {
        if(obj.value === ' ') {
            if(sentence[i - 1]?.value === ' ') {
                output.push({value: ' '})
            } else {
                singleBit && output.push({value: singleBit, isHighlighted: sentence[i - 1]?.isHighlighted})
                singleBit = null;
            }
        } else {
            if(sentence[i - 1]?.value !== ' ' && i !== 0 && sentence[i - 1].isHighlighted !== undefined) {
                obj.isHighlighted = sentence[i - 1]?.isHighlighted;
            }
            if(singleBit === null) {
                singleBit = obj.value
            } else {
                singleBit += obj.value
            }
        }
        if(i === sentence.length - 1) {
            singleBit && output.push({value: singleBit, isHighlighted: obj.isHighlighted})
        }
    })
    output = output.map((obj) => {
        let bit = obj.value === '|' ? ' ' : obj.value.includes('|') ?
            obj.value.substring(0, obj.value.indexOf('|')) + obj.value.substring(obj.value.indexOf('|') + 1) : obj.value;
        if(getValueByKey(bit, [translationRelationships, specialSymbolsMorse, specialCharactersMorse, noMorse], true) === '') {
            return {...obj, isTranslated: false}
        }
        return {...obj, isTranslated: true}
    })
    return output;
}