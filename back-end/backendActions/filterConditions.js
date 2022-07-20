export function filterBasedOnOneNormalCondition(sightings,Condition){
    const key = Object.keys(Condition)[0];
    const value = Condition[key];
    console.log(key,value)
    let filtered = [];
    sightings.forEach(sighting=>{
        if(sighting[key] === value){
            filtered.push(sighting);
        }
    }) 
    return filtered;
}
// Is test date more or less than condition date?
function dateMorOrLess(condition,test){
    let conditionDate = condition.split("/");
    let testDate = test.split("/");
    //Convert condition date's year to the last two digit
    const seperateYearStringIntoIndividualDigits = conditionDate[2].split("");
    const lastIndex = seperateYearStringIntoIndividualDigits.length-1;
    const extractLastTwoDigits = seperateYearStringIntoIndividualDigits[lastIndex-1]+seperateYearStringIntoIndividualDigits[lastIndex];
    conditionDate[2] = extractLastTwoDigits;
    console.log("checking both: condition->",conditionDate," testDate->",testDate)
    //convert to number format
    for (let i = 0;i<3;i++){
        conditionDate[i] = parseInt(conditionDate[i]);
        testDate[i] = parseInt(testDate[i]);
    }
    console.log("Converting to integer: Condition date->",conditionDate," testDate->",testDate)
    // Compare the difference (yer, month, day)
    if(conditionDate[2] > testDate[2]){
        return "less than condition date";
    }
    if(conditionDate[2]<testDate[2]){
        return "more than condition date";
    }
    console.log
    if(conditionDate[2] === testDate[2]){
        console.log("Same for year!!!")
        if(conditionDate[0] > testDate[0]){
            return "less than condition date";
        }
        if(conditionDate[0] < testDate[0]){
            return "more than condition date";
        }
        if(conditionDate[0] === testDate[0]){
            console.log("Same for month!!!")
            if(conditionDate[1] > testDate[1]){
                return "less than condition date";
            }
            if(conditionDate[1] < testDate[1]){
                return "more than condition date";
            }
            if(conditionDate[1] === testDate[1]){
                console.log("Same for day!!!")
                return "same as condition date";
            }
        }
    }
    return "same"
}
console.log(dateMorOrLess('1/1/2019','1/1/2018'))
// Create a list of data that is filtered using From date and To date
export function dateFilter(data,condition){
    console.log("date filter: ",condition);
    const filteredByDate = [];
    const key = Object.keys(condition)[0];
    console.log(key)
    const dateCondition = condition[key];
    console.log("dateCondition: ", dateCondition);
    data.forEach((element,index)=>{
        const testDate = element.date;
        const lowerOrHigherThanDateCondition = dateMorOrLess(dateCondition, testDate);
        console.log(key,": ",lowerOrHigherThanDateCondition," -> condition: ",dateCondition," -> test: ",testDate);
        // If key is from, and testdate is not less than condition date, add it to the list.
        if(key === "from"){
            if(lowerOrHigherThanDateCondition !== "less than condition date"){
                filteredByDate.push(element);
            }
        }
        if(key === "to"){
            console.log("checking: ",lowerOrHigherThanDateCondition)
            if(lowerOrHigherThanDateCondition !== "more than condition date"){
                filteredByDate.push(element);
            }
        }
    })
    return filteredByDate;
}

export function goThroughConditions(conditions,sightings){
    const conditionLength = Object.keys(conditions).length;
    for(const condition in conditions){
        const currentCondition = {};
        currentCondition[condition] = conditions[condition];
        if(condition !== "from" && condition !== "to"){
            sightings = filterBasedOnOneNormalCondition(sightings,currentCondition);
        }
        if(condition === "from" || condition === "to"){
            sightings = dateFilter(sightings,currentCondition);
        }
    }
    return sightings;
}

export function filterCondition(conditions,sighting){
    const numberOfConditionsLeft = Object.keys(conditions).length;
    if(numberOfConditionsLeft === 0){
        return false;
    }
    const firstKeyInObject = Object.keys(conditions)[0];
    const condition = conditions[firstKeyInObject]
    const metaData = sighting[firstKeyInObject]
    if(condition === metaData){
        delete conditions[firstKeyInObject];
        filterCondition(conditions,sighting);
    }
    if(condition !== metaData){
        return true;
    }
}

export function compareAndFilter(sightings, conditions){
    let filteredSightings = [];
    sightings.forEach(sighting=>{
        const doesNotMeetCondition = filterCondition(conditions,sighting);
        if(doesNotMeetCondition === false){
            filteredSightings.push(sighting);
        }
    }) 
}

