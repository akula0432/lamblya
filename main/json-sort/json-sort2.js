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

const start = () => {
  try {
    endpoints.map((el) => {
      axios.get(el).then((req, res) => {
        const isDone = countIsDoneKeys(res.data);
        console.log(isDone);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const calculateIsDone = () => {};

const countIsDoneKeys = (obj) => {
  let count = 0;

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      let key = "";
      count += countIsDoneKeys(obj[key]); // Рекурсивный вызов для вложенных объектов
    } else if (key === "isDone") {
      return key[];
    }
  }

  return count;
};

start();
