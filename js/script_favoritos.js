const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

/*-------Funcionalidade favoritos das paginas (Home).-----*/
let favoritos = carregarFavoritos();
for (let i = 0; i < favoritos.length; i++) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    favoritos[i] +
    ",pt&units=metric&lang=pt&appid=" +
    apiKey
  )
    .then((response) => response.json())

    .then((data) => {

      const { humidity, temp } = data.main;
      const { name } = data;
      const { icon, description } = data.weather[0];

      $("#tabela-favoritos").append(`<tr class="align-items-center">
    <td>${favoritos[i]}</td>
    <td><img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="d-inline">${description}</td>
    <td>${temp}ºC</td>
    <td>${humidity}%</td>
    <td> <img src="img/favorito_vermelho.png" id="imagem${favoritos[i]}" class="icon-favorito"></td>
    </tr>`)

      $(`#imagem${favoritos[i]}`).off()
      $(`#imagem${favoritos[i]}`).on('click', (event) => {
        atualizarFavoritos(favoritos[i]);
        $(event.target).parent().parent().remove();
      });
    });

}