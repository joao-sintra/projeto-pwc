//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

function colocaMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); //Põe a primeira letra da frase em maiúscula
}

let weather6Cidades = {
  
  fetchWeather: function (cidade, unidades) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cidade +
      ",pt&units="+unidades+"&lang=pt&appid=" +
      apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    const { country } = data.sys;

    let simboloUnidadesTemperatura=" ºC";
    let simboloUnidadesVelocidade=" Km/H";
    if(unidades=="imperial"){
      simboloUnidadesTemperatura=" ºF"
      simboloUnidadesVelocidade=" Mph";
    }
    document.querySelector("#cidade" + name).innerHTML = name;
    document.querySelector("#temp" + name).innerHTML = temp + simboloUnidadesTemperatura;
    document.querySelector("#imagem" + name).src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#clima" + name).innerHTML =
      colocaMaiuscula(description);
    console.log(name, temp);

    let favoritos = carregarFavoritos();

    document.querySelector("#icon" + name).setAttribute("data-cidade", name + ", " + country);
    if (favoritos.indexOf(name + ", " + country) === -1) {
      document.querySelector("#icon" + name).src = "img/favorito_preto.png"
    }
    else {
      document.querySelector("#icon" + name).src = "img/favorito_vermelho.png";
    }
  },
};
weather6Cidades.fetchWeather("Lisboa", unidades);
weather6Cidades.fetchWeather("Faro", unidades);
weather6Cidades.fetchWeather("Sagres", unidades);
weather6Cidades.fetchWeather("Lagos", unidades);
weather6Cidades.fetchWeather("Porto", unidades);
weather6Cidades.fetchWeather("Leiria", unidades);

//Funções para redirecionar para a página de detalhes da cidade
$("#porto").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Porto, PT';
  
});

$("#leiria").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Leiria, PT';
  
});

$("#lisboa").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Lisboa, PT';
  
});

$("#faro").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Faro, PT';
  
});

$("#sagres").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Sagres, PT';
  
});

$("#lagos").click(function (e) {
  e.preventDefault();
  location.href='detalhes.html?cidade=Lagos, PT';
  
});