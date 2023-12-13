import axios from "axios";
const urls = [
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

const keys = { true: 0, false: 0 };

async function checkUrl(url) {
  await new Promise((resolve) => {
    http.get(url, (res) => {
      res.on("data", (data) => {
        const response = JSON.parse(data);
        const value = getValue(response, undefined);
        resolve(value);
        console.log(url, value);
      });
    });
  });
}

(async function () {
  for (let url of urls.url) {
    const check = await isUrlFound(url);
    if (check) {
      await checkUrl(url);
    } else {
      console.log(`${url} Connection failed`);
    }
  }
  console.log(`Значений True: ${keys.true}`);
  console.log(`Значений False: ${keys.false}`);
})();

function getValue(obj, result) {
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      result ||= getValue(obj[key]);
    }
    if (key === "isDone") {
      if (obj[key]) {
        keys.true += 1;
      } else {
        keys.false += 1;
      }
      return `${key} - ${obj[key]}`;
    }
  }
  return result;
}

async function isUrlFound(url, tries = 3) {
  const statusCode = await new Promise((resolve) => {
    http
      .request(url, (res) => {
        res.on("readable", () => res.read());
        resolve(res.statusCode);
      })
      .on("error", (_err) => resolve())
      .end();
  });

  if (statusCode !== undefined && statusCode >= 300 && statusCode < 400) {
    return isUrlFound();
  } else if (tries > 0 && statusCode > 400) {
    return isUrlFound(url, (tries -= 1));
  }
  return statusCode === 200;
}
