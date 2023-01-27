export const findIndexInBitLikeArray = (bitLikeArray: string[], index: number): number => {
    let result = 0;
    for (let i = 0; i < index; i++) {
        result += bitLikeArray[i].length;
        i !== 0 && bitLikeArray[i] !== ' ' && result++
    }
    return result;
}