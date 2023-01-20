const carregarFavoritos = () => {
  let favoritos = localStorage.getItem('Favoritos');

  if (favoritos === null) {
    favoritos = []
  }

  else {
    favoritos = JSON.parse(favoritos)
  }
  return favoritos;

}

const gravarFavoritos = (cidadeName) => {
  let favoritos = carregarFavoritos();
  let adicionouFavorito;
  const index = favoritos.indexOf(cidadeName)
  if (index === -1) {
    favoritos.push(cidadeName)

    adicionouFavorito = true;
  }
  else {

    favoritos.splice(index, 1)
    adicionouFavorito = false;
  }

  localStorage.setItem('Favoritos', JSON.stringify(favoritos));

  return adicionouFavorito;
}