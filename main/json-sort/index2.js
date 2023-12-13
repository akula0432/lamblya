import axios from "axios";
const endpoints = [
  "https://jsonbase.com/lambdajson_type1/793",
  "https://jsonbase.com/lambdajson_type1/955",
  "https://jsonbase.com/lambdajson_type1/231",
  "https://jsonbase.com/lambdajson_type1/931",
  "https://jsonbase.com/lambdajson_type1/93",
  "https://jsonbase.com/lambdajson_type2/342",
  "https://jsonbase.com/lambdajson_type2/770",
  "https://jsonbase.com/lambdajson_type2/491",
  "https://jsonbase.com/lambdajson_type2/281",
  "https://jsonbase.com/lambdajson_type2/718",
  "https://jsonbase.com/lambdajson_type3/310",
  "https://jsonbase.com/lambdajson_type3/806",
  "https://jsonbase.com/lambdajson_type3/469",
  "https://jsonbase.com/lambdajson_type3/258",
  "https://jsonbase.com/lambdajson_type3/516",
  "https://jsonbase.com/lambdajson_type4/79",
  "https://jsonbase.com/lambdajson_type4/706",
  "https://jsonbase.com/lambdajson_type4/521",
  "https://jsonbase.com/lambdajson_type4/350",
  "https://jsonbase.com/lambdajson_type4/64",
];

let isDoneTrue = 0;
let isDoneFalse = 0;

const start = () => {
  endpoints.map((value) => {
    axios.get(value).then((res) => {
      const isDone = searchIsDone(res.data);
      calculateIsDone(isDone);
      console.log(`${value}: isDone - ${isDone}`);
    });
  });
};

const searchIsDone = (data) => {
  if (typeof data.isDone === "boolean") {
    return data.isDone;
  } else if (typeof data.location.isDone === "boolean") {
    return data.location.isDone;
  } else if (typeof data.higherEducation.isDone === "boolean") {
    return data.higherEducation.isDone;
  }
};

const calculateIsDone = (isDone) => {
  if (isDone) {
    isDoneTrue++;
  } else {
    isDoneFalse++;
  }
};

const promises = start();
Promise.all(promises).then(() => {
  console.log(`Значений True: ${isDoneTrue}`);
  console.log(`Значений False: ${isDoneFalse}`);
});
