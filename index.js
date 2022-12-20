// crear funcion general que de getValues(resp, innerVar, baseVar);

const parse = require("./parse");

//

var resp ={ 
    "aid_years": [ { "financial_year": "2019-2020", "term_awards": [ { "term_description": "2019 Fall", "total_current_amount": 6348, "total_accepted_amount": 6348, "total_disbursed_amount": 6348, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3098, "accept_balance": 3098, "disbursed_balance": 3098, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] }, { "term_description": "2020 Spring", "total_current_amount": 6347, "total_accepted_amount": 6347, "total_disbursed_amount": 6347, "award_details": [ { "award_name": "Federal Pell Grant", "current_offer": 3097, "accept_balance": 3097, "disbursed_balance": 3097, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910101099300" }, { "award_name": "Supplemental Grant *AAC", "current_offer": 500, "accept_balance": 500, "disbursed_balance": 500, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910102099200" }, { "award_name": "Student FA Trust Grant *RAC", "current_offer": 1250, "accept_balance": 1250, "disbursed_balance": 1250, "disbursement_status": "Applied to Account", "category_description": "Grant", "aid_year": "2020", "item_type": "910303019214" }, { "award_name": "NAmU - University Award", "current_offer": 1500, "accept_balance": 1500, "disbursed_balance": 1500, "disbursement_status": "Applied to Account", "category_description": "Scholarship", "aid_year": "2020", "item_type": "920303519395" } ] } ] } ] }


const getValues = (resp , innerVar, baseVar)=>{

const result = parse.mapVars(resp, innerVar, baseVar);



    console.log(resp, innerVar, baseVar);


}

//output


//PS_FA_-totalCurrentAmount
// awardsStatus

// fun PS_FA quitar con el meth
// fun
getValues(resp, "totalCurrentAmount", "awardsStatus");