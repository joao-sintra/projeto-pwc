//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

const input_box = document.getElementById("textbox");
const autocom_box = document.querySelector(".autocom-box");
const item1 = document.querySelector("#item1");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getLongitude);
  navigator.geolocation.getCurrentPosition(getLatitude);
}
let latitude;
let longitude
function getLongitude(position){
   longitude = position.coords.longitude;
}
function getLatitude(position){
   latitude =position.coords.latitude;

}




let procuraCidadeLocalizacao = {
  /*-------Mostrar os dados das cidades em [Array] à escolha do utilizador (Autocomplete-Box)-----*/
  fetchCities: function (latitude, longitude) {
   
    fetch(
      "http://api.openweathermap.org/geo/1.0/reverse?lat="+latitude+"&lon="+longitude+"&limit=3&lang=pt&appid=" +
      apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displaycities(data));
  },
  displaycities: function (data) {

    console.log(data);
    let cidade_localizacao = "";
    let pais = "";
    
      
    document.querySelector("#localizacao-atual").innerHTML="<a href='detalhes.html?cidade=" + data[0].name + "," + data[0].country + "'><li>Localização Atual</li></a>";

    //console.log(cidades);
    //return cidade_localizacao;
  },
};

let procuraCidade = {
  /*-------Mostrar os dados das cidades em [Array] à escolha do utilizador (Autocomplete-Box)-----*/
  fetchCities: function (cidade) {
   
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q="+cidade+"&limit=3&lang=pt&appid=" +
      apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displaycities(data));
  },
  displaycities: function (data) {

    console.log(data);
    let cidades = "";
    let pais = "";
    for (let i = 0; i < data.length; i++) {
      //cidades= procuraCidadeLocalizacao.fetchCities(latitude, longitude);
      if (data[i].name) {
        document.querySelector("#item"+(i+1)).innerHTML ="<a href='detalhes.html?cidade=" + data[i].name + "," + data[i].country + "'><li>" + data[i].name + " " + "(" + data[i].country + ")" + "</li></a>";
        

      }
    }

   
    //console.log(cidades);
  },
};
$("#textbox").keyup(function (event) {
  //Cada vez que o utilizador der release na tecla, ao escrever, é efetuada a pesquisa na API.

  $(".autocom-box").show();
  if (event.target.value.trim() == "") {
    $(".autocom-box").hide();
  }
  
  
 procuraCidadeLocalizacao.fetchCities(latitude, longitude);
 procuraCidade.fetchCities(input_box.value);
});

/*-------Quando o utilzador clica fora da (Autocom-box) ela fecha.-----*/
document.addEventListener("click", function ClickOutsideBox(event) {
  const box = document.querySelector("autocom-box");
  if (event.target.value !== box) {
    $(".autocom-box").hide();
  }
});
