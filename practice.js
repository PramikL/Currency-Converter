const URL = "https://meowfacts.herokuapp.com/";
const factspara = document.querySelector("#facts");
const button = document.querySelector("#btn");

const getdata = async() =>{
    console.log("Getting data....");
    let response  = await fetch(URL);
    console.log(response);
    let data =await response.json();
    factspara.innerText = data.data[0];
}

button.addEventListener("click",getdata);