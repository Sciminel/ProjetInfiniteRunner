
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d")
const scoreTotal = document.querySelector('.score');
const paragraphe = document.querySelector('.para');

canvas.width = '500';
canvas.height = '300';

// SetInterval pour une periode moyenne actuelle pour instancier un nouvel ennemi
let presetTime = 1000;
//Augmente la vitesse des ennemies a chaque intervall de 10 pts
let ennemiSpeed = 5;

//Lance ou arrete le jeu lorqu'il y a collision
let game = true;
let score = 0;

//fonction qui genere un nombre random
function getRandomNumbers(pMin,pMax){
    return Math.floor(Math.random() * (pMax - pMin + 1)) + pMin ;
}

function randomNumberInterval(timeInterval){
    let returnTime = timeInterval;
    if(Math.random() < .5){
        returnTime += getRandomNumbers(presetTime / 3, presetTime * 1.5);

    }else {
        returnTime += getRandomNumbers(presetTime / 5, presetTime / 2)
    }
    return returnTime;
}

class Perso{
    constructor(pX,pY,pSize,pColor = 'black'){
        this.x = pX;
        this.y = pY;
        this.size = pSize;
        this.color = pColor;
        // 3 parametres pour configurer le saut (Changer les valeur pour voir comment ca se déroule) voir la methode jump()
        this.jumpHeight = 15;
        this.shouldJump = false;
        this.countJump = 0;
    }

    draw(){
        this.jump()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }

    jump(){
        if(this.shouldJump){
            this.countJump++;
            if(this.countJump < 15){
                //Lance le jump
                this.y -= this.jumpHeight;
            }else if(this.countJump > 14 && this.countJump < 19){
                // Le stabilise
                this.y += 0;
            }else if(this.countJump < 33){
                // le fait redescendre
                this.y += this.jumpHeight;
            }

            // Fin du saut
            if(this.countJump >= 32){
                this.shouldJump = false;
            }
        
        }
    }

}


class Ennemi{
    constructor(pSize, pSpeed){
        this.x = canvas.width + pSize;
        this.y = 300 - pSize;
        this.size = pSize;
        this.speed = pSpeed;
        this.color = 'red'
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    slide(){
        //On appelle a chaque fois pour dessiner l'ennemi a chacun de ses déplacements
        this.draw();
        this.x -= this.speed;
    }
}

let perso = new Perso(50,canvas.height - 50,50);


let tabEnnemis = [];
// Auto generation d'ennemi dans un tableau 
function generateEnnemi(){
    let timeDelay = randomNumberInterval(presetTime);
    tabEnnemis.push(new Ennemi(50, ennemiSpeed));

    setTimeout(generateEnnemi, timeDelay)
}

function detectionCollision(pX1, pY1, pX2, pY2){
    if((pX1 + perso.size > pX2 && pY1 + perso.size > pY2) && (pX1 < pX2 + perso.size && pY1 + perso.size > pY2)){
        return game = false;
    }else {
        return true;
    }
}


function animate() {

    if(game){
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,canvas.width, canvas.height);
    
        //Dessine le perso
        perso.draw();
        tabEnnemis.forEach((element, index) => {
            element.slide();
            // Supprimer les element quand ils ont dépassés le coté gauche
            if((element.x + element.size) <= 0){
                setTimeout(() => {
                    tabEnnemis.splice(index, 1)
                }, 0)
                score++;

            }
            
            detectionCollision(perso.x, perso.y, element.x, element.y);
        })
        
        scoreTotal.innerText = ` Score : ${score}`;
        
    }
    if(!game){

        if(score < 10){
            scoreTotal.innerHTML = ` Dommage.. <br> Tu as fait un score de ${score}`;

        }else if(score > 9 && score < 30){
            scoreTotal.innerHTML = ` Bien joué.. mais peut mieux faire ;)  <br> Tu as fait un score de ${score}`;

        }else {
            scoreTotal.innerHTML = ` Trop fort pour moi... <br> Tu as fait un score de ${score}`;

        }
        paragraphe.innerHTML = `Pour refaire une partie appuyer sur Entrée`;
    }


}
animate();
setTimeout(() => {
    generateEnnemi();
}, randomNumberInterval(presetTime));



//A l'ecoute de l'event de la touche jump
addEventListener('keydown', e => {
    if(e.code === "Space"){
        if(!perso.shouldJump){
            perso.countJump = 0;
            perso.shouldJump = true;
        }
    }

    if(e.code === "Enter"){
        score = 0;
        game = true;
        document.location.reload();
        
    }
})