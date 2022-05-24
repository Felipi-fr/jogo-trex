var trex, trex_correndo, solo;
var soloimg
var soloInvisivel
var nuvemImg
var obs1, obs2, obs3, obs4, obs5, obs6
var pontos=0
var grupo_cacto
var grupo_nuvem
var JOGAR=1
var FIM=0
var estado=JOGAR
var trexMorreu
var gameOver,gameOverimg
var reiniciar,reiniciarimg
var somPulo,somMorte,somPontos

function preload() {
  soloimg = loadImage("solo2.png")
  //fazer animação do T-Rex correndo
  trex_correndo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  nuvemImg = loadImage("nuvem.png")
  obs1 = loadImage("obstaculo1.png");
  obs2 = loadImage("obstaculo2.png");
  obs3 = loadImage("obstaculo3.png");
  obs4 = loadImage("obstaculo4.png");
  obs5 = loadImage("obstaculo5.png");
  obs6 = loadImage("obstaculo6.png");
  trexMorreu=loadAnimation("trex_colidiu.png")
  gameOverimg=loadImage("fimDoJogo.png")
  reiniciarimg=loadImage("reiniciar.png")
  somMorte=loadSound("morte.mp3")
  somPulo=loadSound("pulo.mp3")
  somPontos=loadSound("checkPoint.mp3")
}

function setup() {

  //cria a tela
  createCanvas(600, 200);

  //cria sprite do T-Rex
  trex = createSprite(50, 60, 20, 50);
  trex.scale = 0.5;
  trex.x = 50;
  trex.setCollider("circle",0,0,43)
  //adiciona a animação de T-Rex correndo ao sprite
  trex.addAnimation('correndo', trex_correndo);
  trex.addAnimation('morreu', trexMorreu);
  //cria solo
  solo = createSprite(300, 190, 1200, 20);
  solo.addImage("solo", soloimg)
  //aprendendo sobre console.log
  //escreve o nome do jogo no terminal
  console.log("T-Rex corredor");
  soloInvisivel = createSprite(300, 205, 1200, 20);
  soloInvisivel.visible = false
  grupo_cacto=new Group()
  grupo_nuvem=new Group()
  gameOver=createSprite(300,80)
  gameOver.addImage(gameOverimg)
  gameOver.scale=0.5
  reiniciar=createSprite(300,120)
  reiniciar.addImage(reiniciarimg)
  reiniciar.scale=0.5
  gameOver.visible=false
  reiniciar.visible=false
}


function draw() {

  //fundo branco
  background("white");
  text("pontos: "+pontos,500,20)
  //desenha os sprites
  drawSprites();

  if (estado==JOGAR) {
    solo.velocityX = -(6+pontos*3/100)
    if (keyDown('space') && trex.y > 170) {
      trex.velocityY = -11;
      somPulo.play()
    }
    pontos = Math.round(pontos+frameRate()/60);
    if (pontos % 100 == 0 && pontos>0) {
      somPontos.play()
    }
    if (solo.x < 0) {
      solo.x = solo.width / 2
    }
    trex.velocityY = trex.velocityY + 0.8;
    trex.collide(soloInvisivel);
    
    gerarNuvem()
    gerarcacto()
     if(trex.isTouching(grupo_cacto)){
      estado=FIM
      somMorte.play()
      //trex.velocityY = -11;
      //somPulo.play()
    }
  } else if(estado==FIM) {
   solo.velocityX=0
   grupo_cacto.setVelocityXEach(0)
   grupo_nuvem.setVelocityXEach(0)
   trex.velocityY=0
   trex.changeAnimation("morreu")
   grupo_cacto.setLifetimeEach(-1)
   grupo_nuvem.setLifetimeEach(-1)
   gameOver.visible=true
   reiniciar.visible=true
   if(mousePressedOver(reiniciar)){
     reset()
   }

  }
}

function gerarNuvem() {
  if (frameCount % 60 == 0) {
    var nuvem = createSprite(630, 100)
    nuvem.addImage("nuvem", nuvemImg)
    nuvem.scale = 0.7
    nuvem.velocityX = -3
    nuvem.y = Math.round(random(40, 120))
    nuvem.depth = trex.depth
    trex.depth += 1
    nuvem.lifetime = 220
    grupo_nuvem.add(nuvem)
  }
}

function gerarcacto() {
  if (frameCount % 60 == 0) {
    var cacto = createSprite(630, 175)
    cacto.velocityX = -(6+pontos*3/100)
    var num = Math.round(random(1, 6))
    switch (num) {
      case 1:
        cacto.addImage(obs1)
        break;
      case 2:
        cacto.addImage(obs2)
        break;
      case 3:
        cacto.addImage(obs3)
        break;
      case 4:
        cacto.addImage(obs4)
        break;
      case 5:
        cacto.addImage(obs5)
        break;
      case 6:
        cacto.addImage(obs6)
        break;

      default:
        break;
    }
    cacto.scale = 0.5
    grupo_cacto.add(cacto)
    cacto.lifetime = 110
  }

}
function reset(){
  estado = JOGAR
  grupo_cacto.destroyEach()
  grupo_nuvem.destroyEach()
  reiniciar.visible = false
  gameOver.visible = false
  trex.changeAnimation("correndo")
  pontos = 0
}