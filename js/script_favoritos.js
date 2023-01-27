/*-------Funcionalidade favoritos das paginas (Home).-----*/
let favoritos = carregarFavoritos();
for (let i = 0; i < favoritos.length; i++) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    favoritos[i] +
    "&units="+unidades+"&lang=pt&appid=" +
    apiKey
  )
    .then((response) => response.json())

    .then((data) => {

      const { humidity, temp } = data.main;
      const { name } = data;
      const { icon, description } = data.weather[0];

      const nome_adaptado = favoritos[i].replace(",", "").replace(" ", "")
      let simboloUnidadesTemperatura=" ºC";
      let simboloUnidadesVelocidade=" Km/H";
      if(unidades=="imperial"){
        simboloUnidadesTemperatura=" ºF"
        simboloUnidadesVelocidade=" Mph";
      }

      $("#tabela-favoritos").append(`<tr class="align-items-center">
    <td class="favorito-nome"><a href='detalhes.html?cidade=${favoritos[i]}'>${favoritos[i]}</a></td>
    <td><img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="d-inline">${description}</td>
    <td>${temp}`+simboloUnidadesTemperatura+`</td>
    <td>${humidity}%</td>
    <td> <img src="img/favorito_vermelho.png" id="imagem${nome_adaptado}" class="icon-favorito"></td>
    </tr>`)

      /*-------O utilizador quando clica remove os favoritos na pág (favoritos)-----*/
      $(`#imagem${nome_adaptado}`).off()
      $(`#imagem${nome_adaptado}`).on('click', (event) => {
        gravarFavoritos(favoritos[i]);
        $(event.target).parent().parent().remove();
        confimar_favorito();
      });

    });
}
/*-------Confirmar a remoção do favorito-----*/
function confimar_favorito() {
  let text;
  if (confirm("Pretende remover?") == true) {
    text = "removido com sucesso!";
  }
}
