export const getAmountOfEarlierIndexes = (comparedIndex: number, indexes: number[]) => {
    let number = 0;
    indexes.forEach(num => {
        num < comparedIndex && ++number
    })
    return number;
}