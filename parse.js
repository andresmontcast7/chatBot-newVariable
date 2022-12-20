let mapping = {
    sdc: {
        aidyear: "aid_year",
        pkgPlanId: "pkg_plan_id"
    },
    messages: {
        term: "term",
        termDesc: "term_description",
        code: "message_code",
        desc: "description",
        comments: "comments",
        variousHolds: "fa_messages.description",
    },
    loans: {
        desc: "loan_description",
        credCk: "loan_credit_check",
        credOvrd: "loan_credit_override",
        prgm: "loan_program",
        fedId: "federal_id",
    },
    scholarships: {
        code: "scholarship_code",
        date: "offer_date",
        amt: "offer_amount"
    },
    holds: {
        cklstCode: "checklist_code",
        code: "item_code",
        desc: "item_code_description",
        status: "item_status",
        statusDesc: "item_status_description",
    },
    awards: {
        status: "award_status",
        desc: "award",
        amt: "award_amount",
        type: "award_type",
        typeDesc: "award_type_description",
    },
    sap: {
        minGpaStatus: "minimumGpa.status",
        minGpaDesc: "minimumGpa.statusDescription",
        term: "term",
        procTerm: "processTerm",
        status: "sap.status",
        desc: "sap.statusDescription",
        twoYearGpa: "twoYearGpa",
        earnedUnits: "earnedUnits.current",
        "earnedUnits%": "earnedUnits.currentPercent",
        cumulativeEarned: "cumulativeUnits.unitsEarned",
        "cumulativeEarned%": "cumulativeUnits.unitsEarnedPercent",
        maxAtmptUnits: "maxAttemptedUnits",
        atmptMaxUnits: "attemptedMaxUnits",
        paceRate: "paceRate.value"
    },
    fafsa: {
        code: "fafsa_status_code",
        desc: "fafsa_status_description",
        date: "fafsa_status_date",
        procCode: "processing_status_code",
        procDesc: "processing_status_description",
    },
    faLoad: {
        termDesc: "term_description",
        term: "term",
        acadCareer: "academic_career",
        load: "fa_load",
        loadDesc: "fa_load_description"
    },
    awardsStatus: {
        totalCurrentAmount: "total_current_amount",
        totalAcceptedAmount: "total_accepted_amount",
        declinedLoans: "award_details.accept_balance",
    }
}


function mapVars(r,v,rv) {
        
    let str = "";
    let myMap = mapping[rv];
    
    console.log("MY MAPPING: ",v,myMap)
    
    let splt = null;
    
    try {
        splt = myMap[v].split(".");
    } catch(e) {}
    
    if( rv === "faLoad" ) rv = "fa_load";
    if( rv === "holds") rv="fa_holds";
    if( rv === "awardsStatus") {
        rv="term_awards";
        if (!r['aid_years'].length) {
            return '';
        }
        r=r['aid_years'][0];
    };
    
    if(r[rv]) {
        r = r[rv];
    }
    
    if( r.length === undefined ) r = [r];
    
    try {
        for( var i = 0; i < r.length; ++i ) {
            let level = r[i][splt[0]];
            
            if( level.length === undefined ) {
                for( var j = 1; j < splt.length; ++j ) {
                    level = level[splt[j]]
                }
            } else {
                for( var k = 0; k < level.length; ++k ) {
                    for( var j = 1; j < splt.length; ++j ) {
                        level[k] = level[k][splt[j]]
                    }
                }
            }
            
            
            str+=level+"|"
        }
        str = str.substring(0, str.length - 1);
        if( str.length === 0 ) str="UNKNOWN";
        
    } catch(e) {
        console.log(e)
        str = "UNKNOWN";
    }
    
    return str
}
    
    
// function mapVars(r,v,rv) {
    
//     console.log("MAPPING",JSON.stringify(r),v,rv)
    
//     let str = "";
//     let myMap = mapping[rv];
    
//     let splt = myMap[v].split(".");
    
//     if( rv === "faLoad" ) rv = "fa_load";
    
//     if(r[rv]) {
//         r = r[rv];
//     }
    
//     try {
//         for( var i = 0; i < r.length; ++i ) {
//             let level = r[i][splt[0]]
//             for( var j = 1; j < splt.length; ++j ) {
//                 level = level[splt[j]]
//             }
//             str+=level+","
//         }
//         str = str.substring(0, str.length - 1);
//         if( str.length === 0 ) str="UNKNOWN";
        
//     } catch(e) {
//         console.log(e)
//         str = "UNKNOWN";
//     }
    
//     return str
// }

module.exports = {
    mapVars:mapVars
}

