import { on } from "events";
import express from "express";
import cors from 'cors';
import * as validate from "./backendActions/validation.js"
import * as standardise from "./backendActions/standardiseData.js"
import * as filter from "./backendActions/filterConditions.js"
const app = express();

const port = 3000;

app.use(cors({
    origin: '*'
}))

app.get('/',(req,res)=>{
    const data = req.query;
    const getValidConditions = validate.validateData(data);
    const formattedConditions = standardise.lowerCaseConditions(getValidConditions);
    const formattedSightingsExceptDateTime = standardise.lowerCaseData(formattedConditions);
    const formattedSightingsIncludingDateTime = standardise.extractDateFromDateTime(formattedSightingsExceptDateTime);
    const filteredData = filter.goThroughConditions(formattedConditions,formattedSightingsIncludingDateTime); 
    // console.log(filteredData)
    // const something = filter.compareAndFilter(formattedSightings,formattedConditions);
    // console.log("FORMATTED CONDITIONS: ",formattedConditions);
    // console.log("FORMATTED DATA: ",formattedData);
    res.send(filteredData);
})

app.listen(port,()=>{
    console.log("listening to port 3000....")
})
