class Ennemi{
    constructor(pSize, pSpeed){
        this.x = 500 + pSize;
        this.y = 300 - pSize;
        this.size = pSize;
        this.speed = pSpeed;
        this.color = 'red';
    }

    draw(pCtx){
        pCtx.fillStyle = this.color;
        pCtx.fillRect(this.x,this.y,this.size,this.size);
    }
    slide(pCtx){
        //On appelle a chaque fois pour dessiner l'ennemi a chacun de ses déplacements
        this.draw(pCtx);
        this.x -= this.speed;
    }
}

export default Ennemi;