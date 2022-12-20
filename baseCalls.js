const rp = require("request-promise");
const aws = require("aws-sdk");
const lambda = new aws.Lambda();

function findUser(user, botType) {
  return new Promise(async function (resolve, reject) {
    let resp = await lambda
      .invoke({
        FunctionName: "chatbotUserUpdate-" + process.env.ENV,
        Payload: JSON.stringify({
          idToProcess: user ? user : "+UNKNOWN",
          botType: botType ? botType : "sunny",
          canUseExisiting: true,
        }),
      })
      .promise();

    let result = JSON.parse(resp.Payload);
    resolve(result);
  });
}

function psoftConnector(payload) {
  return new Promise(async function (resolve, reject) {
    var sendInfo = {
      FunctionName: "peoplesoftConnector",
      Payload: JSON.stringify(payload),
    };

    let resp = await lambda.invoke(sendInfo).promise();
    resolve(JSON.parse(resp.Payload));
  });
}

function findUserIsearch(user) {
  return new Promise(async function (resolve, reject) {
    let link = "https://app.m.asu.edu/user-details?asurite=" + user;

    const options = {
      uri: link,
      json: true,
    };

    const result = await rp(options);
    resolve(result);
  });
}

module.exports = {
  findUser: findUser,
  psoftConnector: psoftConnector,
  findUserIsearch: findUserIsearch,
};
