import axios from "axios";
const endPoints = [
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

let count = null;
async function getOllData() {
  try {
    const arrIsDone = await getArrIsDone(endPoints);
    const { isTrue, isFalse } = filterIsDone(arrIsDone);
    console.log("значений True: ", isTrue);
    console.log("значений False: ", isFalse);
  } catch (error) {
    if (count < 3) {
      console.log(count);
      getOllData();
      count++;
    } else {
      console.log(error);
    }
  }
}

const getArrIsDone = async (type) => {
  return await Promise.all(
    type.map(async (el) => {
      return await axios.get(el).then((resp) => {
        if (resp.data.isDone != undefined) {
          return resp.data.isDone;
        } else if (resp.data.location.isDone != undefined) {
          return resp.data.location.isDone;
        } else if (resp.data.higherEducation.isDone != undefined) {
          return resp.data.higherEducation.isDone;
        }
      });
    })
  );
};

const filterIsDone = (data) => {
  let isTrue = null;
  let isFalse = null;
  data.map((el) => {
    if (el) {
      isTrue++;
    } else {
      isFalse++;
    }
  });
  return { isTrue, isFalse };
};

getOllData();
