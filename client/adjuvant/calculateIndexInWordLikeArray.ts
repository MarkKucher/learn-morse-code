export const calculateIndexInWordLikeArray = (arr: string[][], index: number): number => {
    let result = 0;
    for (let i = 0; i < index; i++) {
        result += arr[i].length
    }
    return result;
}