export const transformToBitLikeLook = (arr: string[]): string[] => {
    let result: string[] = [];
    let singleBit: string = '';
    arr.forEach((s, i) => {
        if(s === ' ') {
            if(arr[i - 1] === ' ') {
                result.push(' ')
            } else {
                result.push(singleBit)
                singleBit = ''
            }
        } else {
            singleBit += s
        }
    })
    if(singleBit) result.push(singleBit)
    return result;
}