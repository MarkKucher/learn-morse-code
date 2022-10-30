export const useCheckAffiliation = (element: string | number, objects: Object[], type?: string) => {
    let isFound = false;
    switch (type) {
        case 'byValue':
            objects.map((obj) => {
                for (const objKey in obj) {
                    if(obj[objKey] === element) {
                        isFound = true;
                    }
                }
            })
            return isFound;
        default:
            objects.map((obj) => {
                for (const objKey in obj) {
                    if(objKey === element) {
                        isFound = true;
                    }
                }
            })
            return isFound;
    }
}