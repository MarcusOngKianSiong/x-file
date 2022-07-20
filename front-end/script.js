const inputsSection = document.querySelector(".inputs")
const inputs = inputsSection.querySelectorAll("input");
const submit = document.querySelector(".submit");
const specificOrRange = document.querySelector("#specificOrRange");
const displayData = document.querySelector(".displayData");

function convertToQuery(object){
    let query = "?";
    for(const key in object){
        query+=`${key}=${object[key]}&`;
    }
    query = query.slice(0,query.length-1);
    return query;
}

function getConditionsFromInput(){
    let conditions = {};
    inputs.forEach(input=>{
        conditions[input.id] = input.value;
    })
    return conditions;
}

function createTable(data){
    displayData.removeChild(displayData.firstChild);
    const table = document.createElement("table");
    displayData.appendChild(table)
    let headerRow = document.createElement("tr");
    table.appendChild(headerRow);
    let headerColumn = [];
    const headerNames = ["date","city","state","shape","duration","description"];
    for(let i = 0;i<6;i++){
        headerColumn.push(document.createElement("th"));
        headerColumn[i].textContent = headerNames[i];
    }
    headerColumn.forEach(column=>{
        headerRow.appendChild(column);
    })
    // populate the table with the data
    data.forEach(sighting=>{
        const sightingRow = document.createElement("tr");
        for(const metaData in sighting){
            const tableHeight = document.createElement("th");
            tableHeight.textContent = sighting[metaData];
            sightingRow.appendChild(tableHeight)
        }
        table.appendChild(sightingRow)
    })
}

submit.addEventListener("click",response=>{
    const conditions = getConditionsFromInput();
    const url = 'http://localhost:3000/'+convertToQuery(conditions)
    fetch(url)
    .then(response=>{
        return response.json()
    })
    .then(response=>{
        createTable(response)
    })
})
