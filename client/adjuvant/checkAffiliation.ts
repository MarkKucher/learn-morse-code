export const checkAffiliation = (element: string | number, objects: Object[], byValue: boolean = false) => {
    let isFound = false;
    if(byValue) {
        objects.map((obj) => {
            for (const objKey in obj) {
                if(obj[objKey] === element) {
                    isFound = true;
                }
            }
        })
        return isFound;
    }
    objects.map((obj) => {
        for (const objKey in obj) {
            if(objKey === element) {
                isFound = true;
            }
        }
    })
    return isFound;
}