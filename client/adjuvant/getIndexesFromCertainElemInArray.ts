export const getIndexesFromCertainElemInArray = (array: string[], elem: string | string[]): number[] => {
    let result = [] as number[];
    array.forEach((e, index) => {
        if(Array.isArray(elem)) {
            elem.forEach(str => {
                str === e && result.push(index)
                return;
            })
        } else {
            e === elem && result.push(index)
        }
    })
    return result;
}