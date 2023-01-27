import {setReversedArray, setTranslation, singleChar} from "../store/slices/translator";
import {findObjectByValue} from "./searching/findObjectByValue";
import {getValueByKey} from "./getValueByKey";
import {noMorse} from "../utils/morse-code-no";
import {specialSymbolsMorse} from "../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../utils/morse-code-special-characters";

export const translate = (
    reversedArray: singleChar[], isReversed: boolean, translationRelationships: object, dispatch: Function,
    sentence: singleChar[]
) => {
    let translationArray = [] as singleChar[];
    let index = findObjectByValue(reversedArray, '|')
    let iterationArray;
    if(index === reversedArray.length - 1 && index === 0) {
        iterationArray = reversedArray.filter(obj => obj.value !== '|')
    } else {
        iterationArray = reversedArray.map(obj => obj.value === '|' ? {value: ' ', isHighlighted: obj.isHighlighted} : obj.value.includes('|')
            ? {...obj, value: obj.value.substring(0, obj.value.indexOf('|')) + obj.value.substring(obj.value.indexOf('|') + 1)} : obj)
    }
    if(isReversed) {
        iterationArray.map((obj, index) => {
            let translation = getValueByKey(obj.value, [noMorse, translationRelationships, specialSymbolsMorse, specialCharactersMorse, {' ': ' '}], isReversed)
            if(translation === '') {
                dispatch(setReversedArray(reversedArray.map((o, i) => i === index ? {...o, isTranslated: false} : {...o, isTranslated: true})))
            } else {
                translationArray.push({
                    value: translation,
                    isHighlighted: obj.isHighlighted
                })
            }
        })
    } else {
        let arrayOfLetters = sentence.filter(obj => obj.value !== '|')
        arrayOfLetters.map((obj) => {
            translationArray.push({
                value: getValueByKey(obj.value.toLowerCase(), [noMorse, translationRelationships, specialSymbolsMorse, specialCharactersMorse, {' ': ' '}], isReversed),
                isHighlighted: obj.isHighlighted
            })
        })
    }
    dispatch(setTranslation(translationArray))
}
