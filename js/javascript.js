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
  "apiKey": "3b465f1655e28cd3f0c1d9d517a22955",
  fetchWeather: function (cidade) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&units=metric&lang=pt&appid=" + this.apiKey
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
    document.querySelector("#imagem" + name).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#clima" + name).innerHTML = colocaMaiuscula(description);
  },
  /*-------Mostrar os dados das cidades em [Array] à escolha do utilizador (Autocomplete-Box)-----*/
  fetchCities: function (cidade) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" + cidade + "&limit=5&appid=" + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displaycities(data));
  },
  displaycities: function (data) {
    let cidades = ""
    let pais = ""
    for (let i = 0; i < data.length; i++) {
      if (data[i].name) {
        cidades = cidades + data[i].name + " " + "(" + data[i].country + ")" + "<br>"
      }
    }
    document.querySelector(".autocom-box").innerHTML = cidades;
  }
};
weatherC.fetchWeather("Lisboa");
weatherC.fetchWeather("Faro");
weatherC.fetchWeather("Sagres");
weatherC.fetchWeather("Lagos");
weatherC.fetchWeather("Porto");
weatherC.fetchWeather("Leiria");


/*-------pesquisa das cidades à escolha do utilizador, conforme o que é escrito na (#textbox)-----*/

$("#search-addon").click(function (e) {
  e.preventDefault();

});

$("#textbox").keyup(function (event) {
  $(".autocom-box").show();
  if (event.target.value === "") {
    $(".autocom-box").hide();
  }

  weatherC.fetchCities(document.querySelector("#textbox").value)//Pesquisar todos os id's "#textbox", pegando no que o utilizador escreve, pra depois procurar na API

});


/*-------Quando o utilzador clica fora da (Autocom-box) ela fecha.-----*/
document.addEventListener("click", function ClickOutsideBox(event) {
  const box = document.getElementById("autocom-box");
  if (event.target.value !== box) {
    $(".autocom-box").hide();
  }
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