/*------- Funcionalidade favoritos das paginas -----*/
let favoritos = carregarFavoritos();
for (let i = 0; i < favoritos.length; i++) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    favoritos[i] +
    "&units=metric&lang=pt&appid=" +
    apiKey
  )
    .then((response) => response.json())

    .then((data) => {

      const { humidity, temp } = data.main;
      const { name } = data;
      const { icon, description } = data.weather[0];
      const nome_adaptado = favoritos[i].replace(",", "").replace(" ", "")

      $("#tabela-favoritos").append(`<tr class="align-items-center">
    <td>${favoritos[i]}</td>
    <td><img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="d-inline">${description}</td>
    <td>${temp}ºC</td>
    <td>${humidity}%</td>
    <td> <img src="img/favorito_vermelho.png" id="imagem${nome_adaptado}" class="icon-favorito-forecast"></td>
    </tr>`)

      $(`#imagem${nome_adaptado}`).off()
      $(`#imagem${nome_adaptado}`).on('click', (event) => {
        gravarFavoritos(favoritos[i]);
        $(event.target).parent().parent().remove();
      });
    });
}