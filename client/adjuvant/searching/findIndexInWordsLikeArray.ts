export const findIndexInWordsLikeArray = (wordsLikeArr: string[][], globalIndex: number, localIndex: number): number => {
    let result = 0;
    for (let i = 0; i < globalIndex; i++) {
        result += wordsLikeArr[i].length
    }
    result += localIndex;
    return result;
}