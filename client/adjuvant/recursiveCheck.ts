export const recursiveCheck = (length: number, arrayOfNums: number[]): number[] => {
    let outputArray = null;
    for (let i = 0; i < arrayOfNums.length; i++) {
        if(length <= arrayOfNums[i]) {
            outputArray = arrayOfNums.filter(num => num !== arrayOfNums[i])
            break;
        }
    }
    if(!outputArray) {
        return arrayOfNums
    } else {
        return recursiveCheck(length, outputArray)
    }
}