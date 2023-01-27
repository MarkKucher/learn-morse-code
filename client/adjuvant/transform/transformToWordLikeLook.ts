export const transformToWordLikeLook = (arr: string[]): string[][] => {
    let result = [] as string[][];
    let word = [] as string[];
    arr.forEach((s, i) => {
        if(s === ' ') {
            word.length && result.push(word)
            result.push([' '])
            word = []
        } else {
            word.push(s)
        }
        if(i === arr.length - 1 && word.length) {
            result.push(word)
            word = []
        }
    })
    return result;
}