var contexto = document.getElementById("lienzoJuego");
var ctx = contexto.getContext("2d");

var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;

contexto.width = WIDTH;
contexto.height = HEIGHT;

var score = 0;
var FPS = 60;
var gravedad = 1.5;

//Posición inicial, Initial position
var personaje = {
    x: 50,
    y: 150,
    w: 50,
    h: 50
}

//Audio
var punto = new Audio();
punto.src = "audios/punto.mp3";

//Iniciar obstaculos, Init obstacles
var tuberias = new Array();
tuberias[0] = {
    x: ctx.canvas.width,
    y: 0
}

//Imagenes, Images
var bird = new Image();
bird.src = "imagenes/bird.png";

var backgroudImg = new Image();
backgroudImg.src = "imagenes/background.png";

var suelo = new Image();
suelo.src = "imagenes/suelo.png";

var tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

var tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";


//Control Saltar, Control Jump
function presionar() {
    personaje.y -= 35;
}

resize();

function resize() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height =`${CANVAS_HEIGHT}px`;
}



setInterval(loop, 1000 / FPS);
function loop() {
    ctx.clearRect(0, 0, 300, 530);
    //Fondo, Background
    ctx.drawImage(backgroudImg, 0, 0);

    //Suelo, ground
    ctx.drawImage(suelo, 0, ctx.canvas.height - suelo.height);

    //Dibujando Personaje, Drawing Bird

    ctx.drawImage(bird, personaje.x, personaje.y)

    //Obstaculos, Obstacle
    for (var i = 0; i < tuberias.length; i++) {
        var constante = tuberiaNorte.height + 80;
        ctx.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y);
        ctx.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante);
        tuberias[i].x--;

        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0;
        }
        if (tuberias[i].x === 30) {
            tuberias.push({
                x: ctx.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            });
        }

        //Colisión , collusion

        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= ctx.canvas.height - suelo.height){
            location.reload()
        }


        if(tuberias[i].x === personaje.x){
            score++;
            punto.play();
        }
    }
    
    personaje.y += gravedad;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.font = "25px Arial";
    ctx.fillText(`Score : ${score}`,10,ctx.canvas.height-40);
}

//Events
window.addEventListener("resize",resize)
window.addEventListener("keydown", presionar);
