//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

//0,8,16,24,32

// forecast 3 horas
    //"https://api.openweathermap.org/data/2.5/forecast?q=Lisboa&units=metric&lang=pt&cnt=9&appid=" +

// function colocaMaiuscula(str) { //Põe a primeira letra da frase em maiúscula
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function diaAtual() { //Dá a data do dia atual
//     var hoje = new Date();
//     var data;
//     const options = { weekday:"long", day:"numeric", month:"short", year:"numeric" };
//     data = hoje.toLocaleDateString('pt-pt', options);
//     return data;
// }

// dataHora.innerHTML = colocaMaiuscula(diaAtual());

const dataHora = document.querySelector("#data_hora");

//--------------------------- Data e hora atual ------------------------//
var hoje = new Date();
const nomeMeses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var data = hoje.toLocaleString('pt-pt', { hour: 'numeric', minute: 'numeric'}) + " " + (nomeMeses[hoje.getMonth()] + ' ' + hoje.getDate());

dataHora.innerHTML = data;
//---------------------------------//------------------------------------//

//--------------------------- Função que dá a direção do vento ------------------------//
function getPontoCardial(angulo) {
    const direcoes = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
    return direcoes[Math.round(angulo / 45) % 8];//Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
  }
//---------------------------------//------------------------------------//

let weatherForecast = {
    fetchWeather: function () {
      fetch(
       "https://api.openweathermap.org/data/2.5/forecast?q=Lisboa&units=metric&lang=pt&cnt=9&appid=" + 
          apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        var posicaoHoras = [0,1,2,3,4,5,6,7,8,9]; //Posição das horas do array
        for(var i=0;i<10;i++){
            var posicao = posicaoHoras[i];

            const { icon } = data.list[posicao].weather[0];
            const { temp } = data.list[posicao].main;
            const { humidity } = data.list[posicao].main;
            const { deg } = data.list[posicao].wind;
            const { country, name} = data.city;

            console.log(data);
            document.querySelector("#cidade").innerHTML = name + ", " + country;
            document.querySelector("#imagem"+(i+1)).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector("#temp"+(i+1)).innerHTML = temp + "º";
            document.querySelector("#direcaoVento"+(i+1)).innerHTML = getPontoCardial(deg);
            document.querySelector("#humidade"+(i+1)).innerHTML = humidity + "%";        
        }
    },
};

weatherForecast.fetchWeather();