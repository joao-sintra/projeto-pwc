//Constantes



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


/*----- Funções para vizualizar a metereologia das 6 cidades da HOME page com unidade métrica (ºC) -----*/






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
//funcção para comverter o 
/*function getPontoCardial(angulo) {
  const direcoes = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
  return direcoes[Math.round(angulo / 45) % 8];//Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
}
//document.querySelector("#paragrafo").innerHTML = getCardinalDirection(100);
*/