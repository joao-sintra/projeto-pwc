const icons = document.getElementsByClassName("icon-favorito-forecast");

$(".icon-favorito-forecast").on('click', (event) => {
  const cidadeName = event.target.getAttribute("data-cidade");
  if (gravarFavoritos(cidadeName)) {
    event.target.src = "img/favorito_vermelho.png";
  }
  else {
    event.target.src = "img/favorito_preto.png";
  }
});

