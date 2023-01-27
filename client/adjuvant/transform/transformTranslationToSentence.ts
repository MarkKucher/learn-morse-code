import {singleChar} from "../../store/slices/translator";

export const transformTranslationToSentence = (translation: singleChar[]): singleChar[] => {
    let sentence = [] as singleChar[];
    translation.forEach((obj, index) => {
        if(obj.value === ' ') {
            sentence.push({value: ' '}, {value: ' '})
        } else {
            for (let i = 0; i < obj.value.length; i++) {
                sentence.push({value: obj.value[i], isHighlighted: obj.isHighlighted})
                index !== translation.length - 1 && i === obj.value.length - 1 && translation[index + 1]?.value !== ' ' && sentence.push({value: ' '})
            }
        }
    })
    sentence.push({value: '|'})
    return sentence;
}