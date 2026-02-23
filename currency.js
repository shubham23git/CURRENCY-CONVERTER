const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdown = document.querySelectorAll(".select-container select")

const bton = document.querySelector(".btn")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")




for (let select of dropdown){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if (select.name === "to" && currCode === "IND"){
            newOption.selected = "selected"}
        select.append(newOption)
    }
 select.addEventListener("change", (evt) => {
updateFlag(evt.target)
 })
}

const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
};
bton.addEventListener("click", (evt) => {
    evt.preventDefault();
   updateExchangeRate();
})


 const updateExchangeRate = async () =>{
     let amount = document.querySelector(".amount input");
    let amountval = amount.value
    if(amountval === "" || amountval < 1) {
        amountval = 1
        amount.value ="1"
    }
// console.log(fromCurr.value,toCurr.value)
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    const data = await response.json();

const from = fromCurr.value.toLowerCase();
const to = toCurr.value.toLowerCase();

const rate = data[from][to];
// console.log(rate);


let finalAmount = amountval * rate
msg.innerText= `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
 }

 window.addEventListener("load" ,() =>{
    updateExchangeRate();
})