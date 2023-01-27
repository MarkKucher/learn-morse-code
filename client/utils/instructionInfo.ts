export interface oneParagraph {
    text: string,
    ul: string[]
}

export type contentStructure = oneParagraph[]

export const uaText: contentStructure = [
    {text: 'Ритм у коді написаного азбукою Морзе:',
        ul: [
            'між крапками і рисками у слові, сама крапка або риска - 1зп(звукова поділка)',
            'між буквами - 3зп',
            'між словами - 7зп'
        ]
    },
    {text: 'Для того щоб писати азбукою Морзе на цьому сайті вам доведеться:',
        ul: [
            'не ставити пропусків між рисками і крапками у букві',
            'ставити 1 пропуск між буквами',
            'ставити 2 пропуски між словами'
        ]
    },
    {text: 'Додаткові функції сайту:',
        ul: [
            'при нажатті на символ тексту він підсвітить себе і перекладений символ',
            'ви можете написати очікуваний переклад і перевірити його з правильним'
        ]
    }
]

export const ruText = [
    {text: 'Ритм кода написаного азбукой Морзе:',
        ul: [
            'между точками и чёрточками в слове, сама точка или чёрточка - 1зд(звуковое деление)',
            'между буквами - 3зд',
            'между словами - 7зд'
        ]
    },
    {text: 'Для того что бы писать азбукой Морзе на этом сайте вам прийдется:',
        ul: [
            'не ставить пропусков между чёрточками и точками в букве',
            'ставить 1 пропуск между буквами',
            'ставить 2 пропуска между словами'
        ]
    },
    {text: 'Дополнительные функции сайта:',
        ul: [
            'при нажатие на символ текста он подсветит себя и переведенный символ',
            'вы можете написать ожидаемый перевод и проверить его с правильным'
        ]
    }
]

export const enText = [
    {text: 'The rhythm in the Morse code :',
        ul: [
            'between dots and hyphens, dots and hyphens itself - 1sd(sound division)',
            'between characters - 3sd',
            'between words - 7sd'
        ]
    },
    {text: 'To write Morse code in this site you have to:',
        ul: [
            'do not type space between dots and hyphens',
            'type 1 space between characters',
            'type 2 space between words'
        ]
    },
    {text: 'Additional site functions:',
        ul: [
            'after tapping character it will highlight itself and translated one',
            'you can type expected translation and compare it to correct one'
        ]
    }
]