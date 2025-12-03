
export const isEmpty = (obj : object) : boolean => {

    let result : boolean
    const attributs : number = Object.keys(obj).length

    attributs ? result = false : result = true

    return result

}


export const merge = (objOne : object, objTwo : object) :  object => {

    const result = {...objOne, ...objTwo}

    return result

}


export const isIntegerString = (input: string) : boolean => {
    
    if (!input) {
        return false;
    }
    
    const integerRegex = /^-?\d+$/; 
    
    return integerRegex.test(input.trim());

}
