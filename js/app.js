function tituloBlanco(elemento){
	$(elemento).animate({top: "400px"},
        {step: function(now, fx){
          $(this).css("color","white")
        },duration: 500,
        complete: function() {
          tituloAmarillo(elemento)
        }
      }
    )
} 

function tituloAmarillo(elemento){
    $(elemento).animate({
        top: "400px"},
        {step: function(now, fx){
          $(this).css("color","yellow")
        },duration: 1000,
        complete: function() {
          tituloBlanco(elemento)
        }
      }
    )
} 

$(document).ready(function() {
    tituloAmarillo($("#titulo"));  
    tablero=generarAleatorios();
    iniciarTablero(tablero);

    var cfilas=0;
    for (i=0;i<7;i++) {
        for (j=0;j<7;j++) {
            if(tablero[i][j]==1){
                cfilas++;
                if(cfilas>=3){
                    
                }
            }
        }
    }
});

function numeroAleatorio() {
  return Math.round(Math.random() * (4 - 1) + 1);
}

function generarAleatorios(){
    var iMax = 7;
    var jMax = 7;
    var tablero = new Array();

    for (i=0;i<iMax;i++) {
        tablero[i]=new Array();
        for (j=0;j<jMax;j++) {
            tablero[i][j]=numeroAleatorio();
        }
    }
    return tablero;
}

function iniciarTablero(tablero){
    var cont=0;
    for (i=0;i<7;i++) {
        for (j=0;j<7;j++) {
            cont++;
            $("#d"+cont).attr("src","image/"+tablero[i][j]+".png");
            $("#d"+cont).attr("width","80%");
        }
    }
}
