/* 
This function is stringified so everything is uses has to be defined inside the function
*/
const callBackendFunc = (funcName) => (...params) => {
  console.log("funcName", funcName);
  console.log("params", params);
};

module.exports = callBackendFunc;
