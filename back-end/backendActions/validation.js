function filterEmptyConditions(object){
    for (const condition in object){
        // If you want to add more conditions
        if (object[condition] === "" || object[condition] === " "){
            delete object[condition]
        }
    }
    return object;
}

function checkIfDatesAreReallyDates(object){
    const from = object.from;
    const to = object.to;
    // If there is from date and to date
    if (from !== undefined && to !== undefined){
        const checkEachDateComponentForFrom = from.split("/");
        const checkEachDateComponentForTo = to.split("/")
        // Check for length after splitting into components
        if(checkEachDateComponentForFrom.length !== 3 || checkEachDateComponentForTo.length !== 3){
            delete object.from;
            delete object.to
            return object
        }
        // Check if components are numbers for From date
        checkEachDateComponentForFrom.forEach((element,index)=>{
            const checkDateComponentIsNotNumber = parseInt(element);
            if(isNaN(checkDateComponentIsNotNumber) === true){
                delete object.from
                delete object.to
                return object;
            }
            if(isNaN(checkDateComponentIsNotNumber) === false){
                checkEachDateComponentForFrom[index] = checkDateComponentIsNotNumber;
            }
        })
        // Check if each date component is a number for to Date
        checkEachDateComponentForTo.forEach((element,index)=>{
            const checkDateComponentIsNotNumber = parseInt(element);
            if(isNaN(checkDateComponentIsNotNumber) === true){
                delete object.from
                delete object.to
                return object;
            }
            if(isNaN(checkDateComponentIsNotNumber)===false){
                checkEachDateComponentForTo[index] = checkDateComponentIsNotNumber;
            }
        })
        // Check if each date component for From date is within range
        checkEachDateComponentForFrom.forEach((element,index) => {
            if(index === 0){
                if(element>12 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 1){
                if(element>32 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 2){
                if(element<2013 || element>2020){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
        });
        // Check if each date component for To date is within range
        checkEachDateComponentForTo.forEach((element,index)=>{
            if(index === 0){
                if(element>12 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 1){
                if(element>32 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 2){
                if(element<2013 || element>2020){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
        })
    }
    if(from !== undefined && to === undefined){
        const checkEachDateComponentForFrom = from.split("/");
        if(checkEachDateComponentForFrom.length !== 3){
            delete object.from;
            delete object.to
            return object
        }
        checkEachDateComponentForFrom.forEach((element,index)=>{
            const checkDateComponentIsNotNumber = parseInt(element);
            if(isNaN(checkDateComponentIsNotNumber) === true){
                delete object.from
                delete object.to
                return object;
            }
            if(isNaN(checkDateComponentIsNotNumber) === false){
                checkEachDateComponentForFrom[index] = checkDateComponentIsNotNumber;
            }
        })
        checkEachDateComponentForFrom.forEach((element,index) => {
            if(index === 0){
                if(element>12 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 1){
                if(element>32 || element<1){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
            if(index === 2){
                if(element<2013 || element>2020){
                    delete object.from
                    delete object.to
                    return object;
                }
            }
        });
    }
    return object;
}

function filterNumberInputsInNonNumberField(object){
    for (const condition in object){
        console.log(condition,": ",condition === "from")
        if(condition !== "from" && condition !== "to"){
            console.log(condition, " passing the condition")
            const checkIfThereAreNumber = object[condition];
            const splitting = checkIfThereAreNumber.split("");
            // How to check if there is a number in the array?
            let convertEachToNumberOrNotNumber = [];
            splitting.forEach(char=>{
                convertEachToNumberOrNotNumber.push(parseInt(char));
            })
            const checkIfThereIsNoNumber = convertEachToNumberOrNotNumber.every((char)=>isNaN(char));
            if(checkIfThereIsNoNumber === false){
                delete object[condition];
                
            }
        }
    }
    return object;
}

export function validateData(object){
    const clearBlanks = filterEmptyConditions(object);
    // console.log("clearing Blanks: ",clearBlanks);
    const clearNumberFromNonNumberFields = filterNumberInputsInNonNumberField(clearBlanks);
    // console.log("Clearing number from non-number fields: ",clearNumberFromNonNumberFields)
    console.log("INPUT: ",clearNumberFromNonNumberFields)
    const checkDatesForNonDateInputs = checkIfDatesAreReallyDates(clearNumberFromNonNumberFields);
    console.log("OUTPUT:",checkDatesForNonDateInputs);
    return clearNumberFromNonNumberFields;
}

