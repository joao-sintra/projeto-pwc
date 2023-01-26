//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

//0,8,16,24,32

// forecast 5 dias
    //"https://api.openweathermap.org/data/2.5/forecast?lat=38.7167&lon=-9.1333&units=metric&cnt=40&appid="+

const dataHora = document.querySelector("#data_hora");
const queryString = window.location.search; // pega na string do url
const urlParams = new URLSearchParams(queryString); // separa os parametros da string
const cidade = urlParams.get("cidade"); // retira apenas a cidade do get
console.log(cidade);
nomeCidadeForecast.innerHTML = cidade;

//--------------------------- Data e hora atual ------------------------//
var hoje = new Date();
const nomeMeses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var dataAtual = hoje.toLocaleString('pt-pt', { hour: 'numeric', minute: 'numeric'}) + " " + (nomeMeses[hoje.getMonth()] + ' ' + hoje.getDate());

dataHora.innerHTML = dataAtual;
//---------------------------------//------------------------------------//

//--------------------------- Função que põe a primeira letra da frase em maiúscula ------------------------//
function colocaMaiuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}
//---------------------------------//------------------------------------//

//--------------------------- Função que dá a direção do vento ------------------------//
function getPontoCardial(angulo) {
    const direcoes = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
    return direcoes[Math.round(angulo / 45) % 8];//Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
  }
//---------------------------------//------------------------------------//

//--------------------------- Função que apanha a data da API e devolve só o dia ------------------------//
function formataData(date) {
    var dataCompleta = new Date(date);
    return dataCompleta.getDate(); //Devolve só o dia da data
}
//---------------------------------//------------------------------------//

//------ Função que apanha a data da API, converte e devolve só o dia da data em dia da semana ------ //
function diaSemana(data){
    const dataCompleta = new Date(data);
    const options = { weekday: 'long' };
    return dataCompleta.toLocaleDateString('pt-pt', options); //Converte o dia para dia da semana
}
//---------------------------------//------------------------------------//

let weatherForecast = {
    fetchWeather: function (cidade) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + 
        cidade + 
        "&units=metric&lang=pt&cnt=40&appid=" + 
        apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        var posicaoHoras = [0,8,16,24,32]; //Posição das horas do array
        for(var i=0;i<5;i++){
            var posicao = posicaoHoras[i];

            const { icon } = data.list[posicao].weather[0];
            const { temp_min, temp_max } = data.list[posicao].main;
            const { humidity } = data.list[posicao].main;
            const { deg } = data.list[posicao].wind;
            const { country, name} = data.city;
            const { dt_txt } = data.list[posicao];

            var temp_min_atualizado = parseFloat(Math.round(temp_min)); //Apanha e atualiza a temperatura mínima. (Por exemplo: 10.6 -> 11) 
            var temp_max_atualizado = parseFloat(Math.round(temp_max)); //Apanha e atualiza a temperatura máxima. (Por exemplo: 20.4 -> 20) 

            console.log(data);
            document.querySelector("#cidade-forecast").innerHTML = name + ", " + "<img src='https://flagsapi.com/" + country + "/flat/48.png'>";
            document.querySelector("#dia"+(i+1)).innerHTML = colocaMaiuscula(diaSemana(dt_txt)) + ", " + formataData(dt_txt);
            document.querySelector("#imagem"+(i+1)).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector("#tempMin"+(i+1)).innerHTML = temp_min_atualizado + "º<br>";
            document.querySelector("#tempMax"+(i+1)).innerHTML = temp_max_atualizado + "º";
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
    weatherForecast.fetchWeather(cidade);
}
else {
    weatherForecast.fetchWeather("Lisboa");
}

/*------- Pesquisa das cidades à escolha do utilizador, conforme o que é escrito na (#textbox) -----*/

$("#search-addon").click(function (e) {
  e.preventDefault();
  var valorPesquisa = document.querySelector("#textbox").value;
  console.log(valorPesquisa);
});

