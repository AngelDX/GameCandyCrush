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
    repetidosx=iniciarRepetidosX();
    repetidosy=iniciarRepetidosY();
    verificarFilas(repetidosx);
    verificarColumnas(repetidosy);

    var origenid;
    var origensrc;
    $("img[id^='d']").draggable({
        revert: "invalid",
        drag: function (event, ui) {
            origenid=$(this).attr("id");
            origensrc=$(this).attr("src");
            
        },
        stop: function (event, ui) {
           $("#col-"+origenid).html("<img src='"+destinosrc+"' id='"+origenid+"'>");
           $("#"+origenid).attr("width","70%");

            tablero=cargarTablero();
            repetidosx=iniciarRepetidosX();
            repetidosy=iniciarRepetidosY();
            verificarFilas(repetidosx);
            verificarColumnas(repetidosy);

        }
    });

    var destinoid;
    var destinosrc;
    $("img[id^='d']").droppable({
      drop: function( event, ui ) {
        //$(this).addClass( "ui-state-highlight");
        destinoid=$(this).attr("id");
        destinosrc=$(this).attr("src");
        //console.log("Origen: "+origenid);
        //console.log("Destino: "+destinoid);
        //console.log("div: "+origendiv);
        $(this).attr("src",origensrc);
      }
    });

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
            if(j>0){
                if(tablero[i][j]==tablero[i][j-1]){
                    tablero[i][j]=numeroAleatorio();
                }
            }
            if(i>0){
                if(tablero[i][j]==tablero[i-1][j]){
                    tablero[i][j]=numeroAleatorio();
                }
            }
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
            $("#d"+cont).attr("width","70%");
            //$("#d"+cont).html(tablero[i][j]);
            //$("#d"+cont).css("font-size","40px");
        }
    }
}

function iniciarRepetidosX(){
    var iMax = 7;
    var jMax = 7;
    var repetidosx = new Array();

    for (i=0;i<iMax;i++) {
        repetidosx[i]=new Array();
        for (j=0;j<jMax;j++) {
            repetidosx[i][j]=1;
        }
    }
    return repetidosx;
}

function iniciarRepetidosY(){
    var iMax = 7;
    var jMax = 7;
    var repetidosy = new Array();

    for (i=0;i<iMax;i++) {
        repetidosy[i]=new Array();
        for (j=0;j<jMax;j++) {
            repetidosy[i][j]=1;
        }
    }
    return repetidosy;
}

function imprimirRepetidosX(repetidos){
    var cont=0;
    for (i=0;i<7;i++) {
        for (j=0;j<7;j++) {
            cont++;
            if(repetidos[i][j]==0){
                //$("#d"+(cont)).css("opacity","0.2");
                parpadear($("#d"+(cont)));
            }
        }
    }
}

function imprimirRepetidosY(repetidos){
    var cont=0;
    for (i=0;i<7;i++) {
        for (j=0;j<7;j++) {
            cont++;
            if(repetidos[j][i]==0){
                //$("#d"+(cont)).css("opacity","0.2");
                parpadear($("#d"+(cont)));
            }
        }
    }
}

function parpadear(elemento){ 
    $(elemento).fadeIn(500).delay(250).fadeOut(500, parpadear) 
}


function verificarFilas(repetidosx){
    //Verifica las filas
    for(f=1;f<=4;f++){
        var u=0;
        for (j=0;j<7;j++) {
            u=0;
            for (i=0;i<7;i++) {
                if(tablero[j][i]==f){
                    u++; 
                    if(i==6){
                        if(u>=3){
                            for(x=i;x>(i-u);x--)
                            repetidosx[j][x]=0;
                        }
                        u=0;
                    }
                }else{
                    if(u>=3){
                            for(x=i-1;x>=(i-u);x--)
                            repetidosx[j][x]=0;
                    }
                    u=0;
                }
            }
        }  
    }
    imprimirRepetidosX(repetidosx);
}

function verificarColumnas(repetidosy){
    //Verifica las columnas
    for(f=1;f<=4;f++){
        var u=0;
        for (j=0;j<7;j++) {
            u=0;
            for (i=0;i<7;i++) {
                if(tablero[i][j]==f){
                    u++; 
                    if(i==6){
                        if(u>=3){
                            for(x=i;x>(i-u);x--)
                            repetidosy[j][x]=0;
                        }
                    }
                }else{
                    if(u>=3){
                           for(x=(i-1);x>=(i-u);x--)
                           repetidosy[j][x]=0;
                    }
                    u=0;
                }
                
            }
            
        }
    }
    imprimirRepetidosY(repetidosy);
}

function cargarTablero(){
    var iMax = 7;
    var jMax = 7;
    var tcargado = new Array();
    var x=0;
    for (i=0;i<iMax;i++) {
        tcargado[i]=new Array();
        for (j=0;j<jMax;j++) {
            x++;
            tcargado[i][j]=$("#d"+x).attr("src").substring(6,7);
        }
    }
    return tcargado;
}