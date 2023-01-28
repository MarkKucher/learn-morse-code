import {MorseCodeType} from "../utils/morse-code-language";

type Translation = MorseCodeType[keyof MorseCodeType];

type StringUnionToKV<S extends string> = { [K in S]: K };

type Condition = StringUnionToKV<Translation>;

const getKeyValue = <T extends Condition, K extends keyof T>(obj: T, key: K) => obj[key];


export const getObjectValuesTypeFriendly = (translationRelationships: MorseCodeType): Translation[] => {
    const result = [] as Translation[];

    for (const key in translationRelationships) {
        result.push(getKeyValue(translationRelationships, key as keyof MorseCodeType));
    }

    return result;
};
