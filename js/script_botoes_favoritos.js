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

const criar_evento_favorito = () => { }
$(".icon-favorito").on('click', (event) => {
  const cidadeName = $(event.target).siblings("h2").text()
  atualizarFavoritos(cidadeName);
});