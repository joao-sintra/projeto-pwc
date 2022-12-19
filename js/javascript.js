const icons = document.getElementsByClassName("icon-favorito");
for (const icon of icons) {
  icon.addEventListener("mouseover", function handleClick(event) {
    icon.src = "img/favorito_vermelho.png";
  });
}
for (const icon of icons) {
  icon.addEventListener("mouseout", function handleClick(event) {
    icon.src = "img/favorito_preto.png";
  });
}
function colocaMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*----- Funções para vizualizar a metereologia das 6 cidades da HOME page com unidade métrica (ºC) -----*/

let weatherC = {
  apiKey: "3b465f1655e28cd3f0c1d9d517a22955",
  fetchWeather: function (cidade) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&units=metric&lang=pt&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;

    document.querySelector("#cidade" + name).innerHTML = name;
    document.querySelector("#temp" + name).innerHTML = temp + " ºC";
    document.querySelector("#imagem" + name).src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#clima" + name).innerHTML =
      colocaMaiuscula(description);
  },
  fetchCities: function (cidade) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        cidade +
        "&limit=5&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
  displayCities: function (data) {
    const { name } = data;
    const { coutry } = data;
    const { state } = data;
  },
};

weatherC.fetchWeather("Lisboa");
weatherC.fetchWeather("Faro");
weatherC.fetchWeather("Sagres");
weatherC.fetchWeather("Lagos");
weatherC.fetchWeather("Porto");
weatherC.fetchWeather("Leiria");

/*-------pesquisa das cidades à escolha do utilizador (variáveis e constantes)-----*/
const searchBtn = document.querySelector("#search-addon");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  weatherC.fetchCities(document.querySelector("#textbox").value);
});

/*--------------//------//---------------*/

/*----- Funções para vizualizar a metereologia das 6 cidades da HOME page com unidade imperial (ºF) -----*/
// let weatherF = {
//   "apiKey": "3b465f1655e28cd3f0c1d9d517a22955",
//   fetchWeather: function (cidade) {
//     fetch(
//       "http://api.openweathermap.org/data/2.5/weather?q="+ cidade +"&units=imperial&lang=pt&appid=" + this.apiKey
//       )
//       .then((response) => response.json())
//       .then((data) => this.displayWeather(data));
//   },
//   displayWeather: function(data) {
//     const { name } = data;
//     const { icon, description } = data.weather[0];
//     const { temp } = data.main;

//     document.querySelector("#cidade"+name).innerHTML = name;
//     document.querySelector("#temp"+name).innerHTML = temp + " ºF";
//     document.querySelector("#imagem"+name).src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//     document.querySelector("#clima"+name).innerHTML= colocaMaiuscula(description);
//   },
// };

// weatherF.fetchWeather("Lisboa");
// weatherF.fetchWeather("Faro");
// weatherF.fetchWeather("Sagres");
// weatherF.fetchWeather("Lagos");
// weatherF.fetchWeather("Porto");
// weatherF.fetchWeather("Leiria");

/*--------------//------//---------------*/
