const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

function colocaMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); //Põe a primeira letra da frase em maiúscula
}

let weather6Cidades = {
  fetchWeather: function (cidade) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        ",pt&units=metric&lang=pt&appid=" +
        apiKey
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
    console.log(name, temp);
  },
};
weather6Cidades.fetchWeather("Lisboa");
weather6Cidades.fetchWeather("Faro");
weather6Cidades.fetchWeather("Sagres");
weather6Cidades.fetchWeather("Lagos");
weather6Cidades.fetchWeather("Porto");
weather6Cidades.fetchWeather("Leiria");
