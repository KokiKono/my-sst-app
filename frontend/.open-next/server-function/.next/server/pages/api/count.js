"use strict";
(() => {
var exports = {};
exports.id = 650;
exports.ids = [650];
exports.modules = {

/***/ 1490:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "aws-sdk"
const external_aws_sdk_namespaceObject = require("aws-sdk");
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/count.ts

const dynamoDb = new (external_aws_sdk_default()).DynamoDB.DocumentClient({
    region: process.env.REGION
});
async function handler(req, res) {
    const getParams = {
        // Get the table name from the environment variable
        TableName: process.env.TABLE_NAME,
        // Get the row where the counter is called "hits"
        Key: {
            counter: "hits"
        }
    };
    const results = await dynamoDb.get(getParams).promise();
    // If there is a row, then get the value of the
    // column called "tally"
    let count = results.Item ? results.Item.tally : 0;
    const putParams = {
        TableName: process.env.TABLE_NAME,
        Key: {
            counter: "hits"
        },
        // Update the "tally" column
        UpdateExpression: "SET tally = :count",
        ExpressionAttributeValues: {
            // Increase the count
            ":count": ++count
        }
    };
    await dynamoDb.update(putParams).promise();
    res.status(200).send(count);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1490));
module.exports = __webpack_exports__;

})();