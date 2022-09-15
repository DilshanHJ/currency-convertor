//defininf elements
const exchangeratedisplay =document.querySelector('.local-data');
let exrate;
let currencylist;
let localcurrency;
const fromselect = document.querySelector('#fromselector');
const toselect =document.querySelector('#toselector');
const frominput=document.querySelector("#from-amount");
const toinput = document.querySelector("#to-amount");
const button = document.querySelector("#button");



// APIS
const ipdata ={
     key:'806909421a3d33ec00cf8d8aa3c4749bcc46bca9037592a9bca931bc',
     baseurl:"https://api.ipdata.co",
     currency:function(){
          return `${this.baseurl}/currency?api-key=${this.key}`
     }
}

//Taking Local Currency Of user.
async function getlocalCurrency(){
     const res = await fetch(ipdata.currency());
     localcurrency =await res.json();
     return localcurrency.code;

}
//Get currency list
async function getCurrencyList(){
     const res = await fetch('https://api.exchangerate.host/symbols');
     currencylist = await res.json();
     return currencylist;
}
//convert currency
async function convert(baseval,convertval){
     const res = await fetch(`https://api.exchangerate.host/convert?from=${baseval}&to=${convertval}`);
     exrate=await res.json();
     return exrate.result;
}

//Display local ratres
async function DisplayLocalRates(){
     const localunit =await getlocalCurrency();
     
     const rateeur = await convert('EUR',localunit);
     const rateusd = await convert('USD',localunit);
     exchangeratedisplay.innerHTML= `<h1>1 USD = ${rateusd} ${localunit} </h1><h1>1 EUR = ${rateeur} ${localunit} </h1>`;
     frominput.value=1;
     toinput.value=rateusd;
}

DisplayLocalRates();

//filling and initiating selectors
async function FillSelectors(){
     const data = await getCurrencyList();
     for(code in data.symbols){
          fromselect.innerHTML +=`<option value='${code}'>${code} - ${data.symbols[code].description}</option>`
          toselect.innerHTML +=`<option value='${code}'>${code} - ${data.symbols[code].description}</option>`
     }
     fromselect.value='USD';
     toselect.value='LKR';
}
FillSelectors();

//covertor button function
button.addEventListener("click",buttonfunc);
async function buttonfunc(){
     const rate = await convert(fromselect.value,toselect.value);
     toinput.value= await rate * frominput.value;
}







