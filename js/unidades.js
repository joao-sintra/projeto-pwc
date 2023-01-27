const carregarUnidades = () => {
    let unidades = localStorage.getItem('unidades');
  
    if (unidades === null) {
        localStorage.setItem('unidades', "metric");
    }else if(unidades=="metric")
        document.querySelector(".caret").innerHTML="ºC, km/h, Mm"
    else
        document.querySelector(".caret").innerHTML="ºF, Mph, In"
  }


  window.onload = carregarUnidades();//Ao carregar a página caso não haja uma unidade escolhida a unidade predefinica irá ser a métrica
  
  const gravarUnidades = (unidades) => {
    if (unidades == "metric") {
        localStorage.setItem('unidades', "metric");
        console.log("metric");
    }
    else {
        localStorage.setItem('unidades', "imperial");
        console.log("imperial");
    }
    
  }


  $("#unidade-c").click(function (e) {
    e.preventDefault();
    gravarUnidades("metric");
    location.reload()
  });
  $("#unidade-f").click(function (e) {
    e.preventDefault();
    gravarUnidades("imperial");
    location.reload()
    
  });