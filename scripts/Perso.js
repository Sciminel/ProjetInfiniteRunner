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

    draw(pCtx){
        this.jump()
        pCtx.fillStyle = this.color;
        pCtx.fillRect(this.x,this.y,this.size,this.size);
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

export default Perso;