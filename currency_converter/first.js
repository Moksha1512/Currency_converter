let base_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


let dropdowns = document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromc=document.querySelector(".from select");
let toc=document.querySelector(".to select");




let updateExchangeRate= async()=>{
    let amount=document.querySelector("input");
    let amv=amount.value;
    if(amv===""|| amv<1){
        amv=1;
        amount.value="1";
    }
    // console.log({fromc.value});
    let url=`${base_url}/${fromc.value.toLowerCase()}/${toc.value.toLowerCase()}.json`;
    let r=await fetch(url);
    let data=await r.json();
    let rate=data[toc.value.toLowerCase()];
    // console.log(rate);
    let f=amv*rate;
    let msg=document.querySelector(".msg");
    msg.innerText=`${amv} ${fromc.value}=${f}${toc.value}`;
}
for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
      updatef(evt.target);
    });
  }
  const updatef=(e)=>{
    let c=e.value;
    let coC=countryList[c];
    let news=`https://flagsapi.com/${coC}/flat/64.png`;
    let i=e.parentElement.querySelector("img");
    i.src=news;
  }

  btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
  })
  window.addEventListener("load", () => {
    updateExchangeRate();
  });