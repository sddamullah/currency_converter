const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".formbtn");
// for (const code in countryList) {
//   console.log(code, countryList[code]);
// }
const fromcurr = document.querySelector(".from");
const tocurr = document.querySelector(".to");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    select.append(newoption);
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "PKR") {
      newoption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let currcode = element.value;

  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(" input");
  let amval = amount.value;
  if (amval === "" || amval < 1) {
    amval = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()];
  //   console.log(rate);
  let finalAmount = amval * rate;
  //   console.log(finalAmount);

  msg.innerText = `${amval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
});
