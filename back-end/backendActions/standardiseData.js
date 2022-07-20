import * as sightings from "../data/sightings.js"
const data = sightings.data;

export function lowerCaseConditions(object){
    for(const condition in object){
        if(condition !== "from" && condition !== "to"){
            object[condition] = object[condition].toLowerCase();
        }
    }
    return object;
}

export function lowerCaseData(conditions){
    const data = sightings.data;
    // Root out the conditions to use and put it into an array
    let conditionToUse = [];
    for(const condition in conditions){
        conditionToUse.push(condition);
    }
    console.log(conditionToUse); 
    // lower the case for each condition specificed
    let reformattedData = [];
    data.forEach(sighting=>{
        conditionToUse.forEach(condition=>{
            if(condition !== "from" && condition !== "to"){
                sighting[condition] = sighting[condition].toLowerCase();
            }
        })
        reformattedData.push(sighting);
    })
    return reformattedData;
}

export function extractDateFromDateTime(object){
    let reformattedDateTimeToDateInData = []
    object.forEach(sighting=>{
        const splitDateAndTime = sighting.date.split(" ");
        const extractDate = splitDateAndTime[0];
        sighting.date = extractDate;
        reformattedDateTimeToDateInData.push(sighting);
    })
    return reformattedDateTimeToDateInData;
}
