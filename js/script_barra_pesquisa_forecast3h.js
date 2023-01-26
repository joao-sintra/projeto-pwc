//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

const input_box = document.getElementById("textbox");
const autocom_box = document.querySelector(".autocom-box");

let procuraCidade = {
  /*-------Mostrar os dados das cidades em [Array] à escolha do utilizador (Autocomplete-Box)-----*/
  fetchCities: function (cidade) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cidade +
      "&limit=3&lang=pt&appid=" +
      apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displaycities(data));
  },
  displaycities: function (data) {

    console.log(data);
    let cidades = "";
    let pais = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].name) {
        cidades = cidades + "<a href='forecast3h.html?cidade=" + data[i].name + "," + data[i].country + "'><li>" + data[i].name + " " + "(" + data[i].country + ")" + "</li></a>";

      }
    }

    autocom_box.innerHTML = "<ul id='lista-cidades'>" + cidades + "</ul>";
    
  },
};

$("#textbox").keyup(function (event) {
  //Cada vez que o utilizador der release na tecla, ao escrever, é efetuada a pesquisa na API.

  $(".autocom-box").show();
  if (event.target.value.trim() == "") {
    $(".autocom-box").hide();
  }

  procuraCidade.fetchCities(input_box.value);

});

/*-------Quando o utilzador clica fora da (Autocom-box) ela fecha.-----*/
document.addEventListener("click", function ClickOutsideBox(event) {
  const box = document.querySelector("autocom-box");
  if (event.target.value !== box) {
    $(".autocom-box").hide();
  }
});
