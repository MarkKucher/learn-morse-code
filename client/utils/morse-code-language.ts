import {uaMorse} from "./morse-code-ua";
import {ruMorse} from "./morse-code-ru";
import {enMorse} from "./morse-code-en";

export type MorseCodeType = typeof uaMorse | typeof ruMorse | typeof enMorse;

export interface MorseCodeLanguageType {
    'ua': typeof uaMorse,
    'ru': typeof ruMorse,
    'en': typeof enMorse
}

export const MorseCodeLanguage = {
    'ua': uaMorse,
    'ru': ruMorse,
    'en': enMorse
}