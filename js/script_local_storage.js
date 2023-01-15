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

const atualizarFavoritos = (cidadeName) => {
  let favoritos = carregarFavoritos();

  const index = favoritos.indexOf(cidadeName)
  if (index === -1) {
    favoritos.push(cidadeName)

  }
  else {

    favoritos.splice(index, 1)

  }
  localStorage.setItem('Favoritos', JSON.stringify(favoritos));
}