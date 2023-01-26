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
const queryString = window.location.search; // pega na string do url
const urlParams = new URLSearchParams(queryString); // separa os parametros da string
const cidade = urlParams.get("cidade"); // retira apenas a cidade do get
console.log(cidade);
nomeCidadeForecast3h.innerHTML = cidade;

//--------------------------- Data e hora atual ------------------------//
var hoje = new Date();
const nomeMeses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var data = hoje.toLocaleString('pt-pt', { hour: 'numeric', minute: 'numeric'}) + " " + (nomeMeses[hoje.getMonth()] + ' ' + hoje.getDate());

dataHora.innerHTML = data;
//---------------------------------//------------------------------------//

//--------------------------- Função que dá a direção do vento ------------------------//
function getPontoCardial(angulo) {
    const direcoes = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
    return direcoes[Math.round(angulo / 45) % 8]; //Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
}
//---------------------------------//------------------------------------//

let weatherForecast3h = {
    fetchWeather: function (cidade) {
      fetch(
       "https://api.openweathermap.org/data/2.5/forecast?q=" + 
        cidade +
        "&units=metric&lang=pt&cnt=9&appid=" + 
        apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        var posicaoHoras = [0,1,2,3,4,5,6,7,8,9]; //Posição das horas do array
        for(var i=0;i<9;i++){
            var posicao = posicaoHoras[i];

            const { icon } = data.list[posicao].weather[0];
            const { temp } = data.list[posicao].main;
            const { humidity } = data.list[posicao].main;
            const { deg } = data.list[posicao].wind;
            const { country, name} = data.city;

            var temp_atualizado = parseFloat(Math.round(temp)); //Apanha e atualiza a temperatura atual. (Por exemplo: 18.6 -> 19) 

            console.log(data);
            document.querySelector("#cidade-forecast3h").innerHTML =  name + ", " + "<img src='https://flagsapi.com/" + country + "/flat/48.png'>";
            document.querySelector("#imagem"+(i+1)).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector("#temp"+(i+1)).innerHTML = temp_atualizado + "º";
            document.querySelector("#direcaoVento"+(i+1)).innerHTML = getPontoCardial(deg);
            document.querySelector("#humidade"+(i+1)).innerHTML = humidity + "%";   
            
            //----------- Caso a local storage esteja vazia, o icon do coração fica preto, else (viceversa) -------------//
            let favoritos = carregarFavoritos();
            descIcon.setAttribute("data-cidade", name + ", " + country);
        
            if (favoritos.indexOf(name + ", " + country) === -1) {
              descIcon.src = "img/favorito_preto.png"
        
            }
            else {
              descIcon.src = "img/favorito_vermelho.png";
            }
        }
    },
};

if(cidade != null) {
    weatherForecast3h.fetchWeather(cidade);
}
else{
    weatherForecast3h.fetchWeather("Lisboa");
}

/*------- Pesquisa das cidades à escolha do utilizador, conforme o que é escrito na (#textbox) -----*/
$("#search-addon").click(function (e) {
  e.preventDefault();
  var valorPesquisa = document.querySelector("#textbox").value;
  console.log(valorPesquisa);
});
