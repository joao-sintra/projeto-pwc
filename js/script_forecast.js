const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

//0,8,16,24,32

// forecast 5 dias
    //"https://api.openweathermap.org/data/2.5/forecast?lat=38.7167&lon=-9.1333&units=metric&cnt=40&appid="+


//--------------------------- Função que põe a primeira letra da frase em maiúscula ------------------------//
function colocaMaiuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}
//---------------------------------//------------------------------------//

//--------------------------- Função que dá a direção do vento ------------------------//
function getPontoCardial(angulo) {
    const direcoes = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return direcoes[Math.round(angulo / 45) % 8]; //Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
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
    fetchWeather: function () {
      fetch(
       "https://api.openweathermap.org/data/2.5/forecast?q=Lisboa&units=metric&lang=pt&cnt=40&appid=" + 
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

            console.log(data);
            document.querySelector("#cidade").innerHTML = name + ", " + country;
            document.querySelector("#dia"+(i+1)).innerHTML = colocaMaiuscula(diaSemana(dt_txt)) + ", " + formataData(dt_txt);
            document.querySelector("#imagem"+(i+1)).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector("#tempMin"+(i+1)).innerHTML = temp_min + "º";
            document.querySelector("#tempMax"+(i+1)).innerHTML = temp_max + "º";
            document.querySelector("#direcaoVento"+(i+1)).innerHTML = getPontoCardial(deg);
            document.querySelector("#humidade"+(i+1)).innerHTML = humidity + "%";        
        }
    },
};

weatherForecast.fetchWeather();