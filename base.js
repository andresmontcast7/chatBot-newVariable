const rp = require('request-promise');
const util = require('./util');
const baseCalls = require('./baseCalls');
const parser = require('./parse');

var aidYear = 0;
var mulesoftBase = process.env.fa_mulesoft;

var groupId = "PS_FA_"


var resp ={ 
    "aid_years": [ { "financial_year": "2019-2020", "term_awards": [ { "term_description": "2019 Fall", "total_current_amount": 6348, "total_accepted_amount": 6348, "total_disbursed_amount": 6348, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3098, "accept_balance": 3098, "disbursed_balance": 3098, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] }, { "term_description": "2020 Spring", "total_current_amount": 6347, "total_accepted_amount": 6347, "total_disbursed_amount": 6347, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3097, "accept_balance": 3097, "disbursed_balance": 3097, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] } ] } ] }


var replaceVar = "awardsStatus-totalAcceptedAmountLessOffered";

var baseVar = "awardsStatus"


function replace(event,replaceVar) {
    return new Promise(async function(resolve,reject) {
        
        console.log("HITTING FINAID")
        
        replaceVar = replaceVar.split(groupId)[1];
        
        if( aidYear === 0 ) {
            aidYear = event.overrideYear ? event.overrideYear : await getAidYear(event.emplid);
        }
        
        if(!event.emplid){
            const resp = await baseCalls.psoftConnector({url: process.env.emplId+event.user});
            event.emplid = resp.empl_id;
        }
        
        if( process.env.ENV === "dev" || process.env.ENV === "test" || process.env.ENV === 'prod') {
            if(event.user === "klbarrin" || event.user === "zazaidi") {
                event.emplid = "1225767049";
                //event.emplid = "1219107110";
                aidYear = 2023;
            } else if(event.user === "kmself1") {
                event.emplid = "1225182920";
                aidYear = 2023;
            } else if( event.user === "zazaidi-ignore" || event.user === "madmello-ignore" ) {
                event.emplid = "1000106418"; //"1214948098"//"1210947501";
                aidYear = 2021;
            } else if( replaceVar.indexOf("awards-") > -1 || replaceVar.indexOf("loans-") > -1 ) {
                event.emplid = "1206380652";
                aidYear = 2020;
            } else if( replaceVar.indexOf("fafsa-") > -1 || replaceVar.indexOf("sdc-") > -1 || replaceVar.indexOf("faLoad-") > -1  ) {
                event.emplid = "1000030751";
                aidYear = 2020;
            } else if( replaceVar.indexOf("holds-") > -1 ) {
                event.emplid = "1215024577";
                aidYear = 2020;
                // event.emplid = "1000106418";
                // aidYear = 2021;
            } else if( replaceVar.indexOf("messages-") > -1 ) {
                event.emplid = "1219945610";
                aidYear = 2021;
            } else if( replaceVar.indexOf("sap-") > -1 ) {
                event.emplid = "1201936714";
                aidYear = 2021;
            } else if( replaceVar.indexOf("scholarships-") > -1 ) {
                event.emplid = "1216402486";
                aidYear = 2020;
            }
        }
        
        //awardsStatus-totalAcceptedAmountLessOffered 
        console.log("USING EMPLID",event.emplid)
        
        let info = await finAid(replaceVar,event.emplid);
        resolve(info)
        
        
    })
}

function getAidYear(emplid) {
    return new Promise(async function(resolve,reject) {
       
          let payload = {
            
            uri: util.signUrl(mulesoftBase)+emplid+"/aid-years",
            
            json: true
        }
        
        let years = await rp(payload);
        resolve(years.aid_years[0].aid_year_default)
        
    })
}

function testFinAid(emplid) {
    return new Promise(async function(resolve,reject) {

        let payload = {
            uri: util.signUrl(mulesoftBase)+emplid+"/stufinaidinfo",
            json: true
        }
        
        let years = await rp(payload);
        resolve();
        // resolve(years.aid_years[0].aid_year_default)
        
    })
}

// replaceVar, hacer un screen en la doc de cual es el baseVar en este caso es 

function finAid(replaceVar, emplid) {
    return new Promise(async function(resolve,reject) {
         // REPLACE  awardsStatus-totalAcceptedAmountLessOffered
          //
         //awardsStatus
        let url = util.signUrl(mulesoftBase)+emplid; // DEVYELVE EJEM:"https://" + 6fe587530292419da628d1eaa17bdde1+ ":" + 6f8957af008F422A9941e858a56FdCcD + "@" +esb-qa.asu.edu/api/v1/student-fin-aid/students/ + 1212054699
      
        let splt = replaceVar.split("-");  // [awardsStatus, AcceptedAmountLessOffered]
        let baseVar = splt[0]; //awardsStatus 
        let innerVar = splt[1];//AcceptedAmountLessOffered

        switch(baseVar) { //awardsStatus
            case "messages":
                url += "/fa-messages?term=" + process.env.defaultTerm;
                break;
            case "holds":
                url+="/fa-holds?aidyear="+aidYear;
                break;
            case "faLoad":
                url+="/fafsa?aidyear="+aidYear;
                break;
            case "awardsStatus":
                url += "/awards-status?aidyear=" + aidYear;
                break;
              
            default:
                url += "/"+baseVar+"?aidyear="+aidYear+"&term=" + process.env.defaultTerm;
        }
        
        console.log(url);
        
        let payload = {
            uri: url,
            json: true
        }
        
        let resp = await rp(payload); // {  { "aid_years": [ { "financial_year": "2019-2020", "term_awards": [ { "term_description": "2019 Fall", "total_current_amount": 6348, "total_accepted_amount": 6348, "total_disbursed_amount": 6348, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3098, "accept_balance": 3098, "disbursed_balance": 3098, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] }, { "term_description": "2020 Spring", "total_current_amount": 6347, "total_accepted_amount": 6347, "total_disbursed_amount": 6347, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3097, "accept_balance": 3097, "disbursed_balance": 3097, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] } ] } ] }}

        console.log("RAW API RESPONSE:", JSON.stringify(resp)); 

        if (innerVar === 'declinedLoans') { //AcceptedAmountLessOffered
        if()

         
            const response = calculateAcceptedBalance(resp, baseVar);
            resolve(response);
        } else {
            let resp2 = parser.mapVars(resp,innerVar,baseVar); 
            resp2 = uniqueVars(replaceVar,resp2);
            // resp2 = resp2.replace(/\|/g, ", ")
            console.log("HITTING RESPONSE:", resp2); 
            resolve(resp2);
        }
        
    })
}

/**
 * It takes the totalCurrentAmount and totalAcceptedAmount variables, splits them into an array,
 * subtracts the values, and returns the result as a string
 * @param resp - The response object from the API call.
 * @param baseVar - This is the variable that will be used to map the data from the response.
 * @returns The difference between the total current amount and the total accepted amount.
 */
function calculateAcceptedBalance(resp, baseVar) {
    const amounts = [];
    
   /* Checking if the response is empty. If it is, it returns an empty string. */
    if (!resp['aid_years'].length) {
        return '';
    }
    let totalCurrentAmount = parser.mapVars(resp, 'totalCurrentAmount', baseVar); // 6348|6347
    let totalAcceptedAmount = parser.mapVars(resp, 'totalAcceptedAmount', baseVar); // 


    console.log(totalAcceptedAmount);
    
       

    // UniqueVars
    /* Replacing the "|" character with ", " */
    totalCurrentAmount = totalCurrentAmount.replace(/\|/g, ", ");// 6348|6347
    totalAcceptedAmount = totalAcceptedAmount.replace(/\|/g, ", ");

    console.log(totalAcceptedAmount);
    // Format data
   /* Removing the spaces from the string and splitting the string into an array. */
    totalCurrentAmount = totalCurrentAmount.replace(' ', '').split(',');// 6348,6347
    totalAcceptedAmount = totalAcceptedAmount.replace(' ', '').split(',');

    /* The above code is calculating the difference between the total current amount and the total
    accepted amount. */
    if (totalCurrentAmount.length) {
        for (let index = 0; index < totalCurrentAmount.length; index++) {
            amounts.push(parseFloat(totalCurrentAmount[index]) - parseFloat(totalAcceptedAmount[index]));
        }
      }

      /* Return converting the amounts array into a string. */
      return amounts.toString();
}

/**
 * It takes a string, and if the string is "awards-amt", it formats the string as a currency.
 * Otherwise, it replaces all the "|" characters with ", "
 * @param replaceVar - The variable you want to replace.
 * @param resp - The response from the API
 * @returns the response from the API call.
 */
function uniqueVars(replaceVar, resp) {
    
    switch(replaceVar) {
        
        case "awards-amt":
            
            let str = "";
            let arr = resp.split("|");
            
            for( var i = 0; i < arr.length; ++i ) {
                str += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(arr[i]);
                if( i !== arr.length - 1 ) {
                    str+=", "
                }
            }
            
            return str;
        default:
            resp = resp.replace(/\|/g, ", ")
            return resp;
        
    }
    
}

function resetYear() {
    aidYear = 0;
}

module.exports = {
    replace: replace,
    resetYear: resetYear
}

calculateAAcceptedLess( resp , baseVar);