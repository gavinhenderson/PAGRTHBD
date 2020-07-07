/* 
This function is stringified so everything is uses has to be defined inside the function
*/
(funcName, basePath) => async (...params) => {
  console.log("funcName", funcName);
  console.log("basePath", basePath);
  console.log("params", params);
  return 20;
};
