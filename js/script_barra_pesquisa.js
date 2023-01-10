//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";


let procuraCidade = {
    /*-------Mostrar os dados das cidades em [Array] à escolha do utilizador (Autocomplete-Box)-----*/
    fetchCities: function (cidade) {
      fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          cidade +
          "&limit=3&appid=" +
          apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displaycities(data));
    },
    displaycities: function (data) {
      let cidades = ""
      let pais = ""
      for (let i = 0; i < data.length; i++) {
        
        if (data[i].name) {
          cidades = cidades +"<li>" +data[i].name + " " + "(" + data[i].country + ")" + "</li>"
        }
      }
     
      document.querySelector(".autocom-box").innerHTML = "<ul>"+cidades+"</ul>";
      //console.log(cidades);
    }
  
  };

$("#textbox").keyup(function (event) {//Cada vez que o utilizador der release na tecla, ao escrever, é efetuada a pesquisa na API.
    $(".autocom-box").show();
    if (event.target.value.trim() == "" ) {
      $(".autocom-box").hide();
    }
   
        procuraCidade.fetchCities(document.querySelector("#textbox").value);//Pesquisar todos os id's "#textbox", pegando no que o utilizador escreve, pra depois procurar na API
    
  
   
  
  });
  
  
  /*-------Quando o utilzador clica fora da (Autocom-box) ela fecha.-----*/
  document.addEventListener("click", function ClickOutsideBox(event) {
    const box = document.getElementById("autocom-box");
    if (event.target.value !== box) {
      $(".autocom-box").hide();
    }
  });