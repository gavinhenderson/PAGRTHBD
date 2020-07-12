export const helloWorld = (context) => (firstParam, secondParam) => {
  console.log("HELLO WORLD", context);
  return firstParam + secondParam;
};

const anotherTest = () => {};

export default anotherTest;
