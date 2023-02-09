import {uaMorse} from "./morse-code-ua";
import {ruMorse} from "./morse-code-ru";
import {enMorse} from "./morse-code-en";
import {noMorse} from "./morse-code-no";
import {specialCharactersMorse} from "./morse-code-special-characters";
import {specialSymbolsMorse} from "./morse-code-special-symbols";

export type MorseCodeType = typeof uaMorse | typeof ruMorse | typeof enMorse | typeof noMorse | typeof specialCharactersMorse | typeof specialSymbolsMorse;

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