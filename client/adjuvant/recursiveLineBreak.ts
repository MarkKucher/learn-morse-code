// @ts-ignore
export const recursiveLineBreak = (lastLine: string[], limit: number, outputArray = [lastLine]) => {
    let secondLine: string[] = []
    while (lastLine.length > limit) {
        // @ts-ignore
        secondLine.push(lastLine.pop())
    }
    if(secondLine.length !== 0) {
        let newOutputArray = [...outputArray, secondLine]
        if(secondLine.length > limit) {
            return recursiveLineBreak(secondLine, limit, newOutputArray)
        }
        return newOutputArray;
    }
    return outputArray;
}

// ts can't understand that if  array.length > 0 array.pop() can't be undefined, so I added ts ignore