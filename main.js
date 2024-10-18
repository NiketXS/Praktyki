window.addEventListener("load",()=>{
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 720

    class Player {
        constructor(gameHeight,gameWidth){
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 200
            this.height = 200
            this.x = 100
            this.y = this.gameHeight - this.width
            this.image = document.getElementById("player")
            this.xSpeed=0
            this.ySpeed=0
            this.weight=1
        }
        isOnGround(){
            return this.y >= this.gameHeight - this.height
             
        }

        draw(context){
            context.fillStyle = "red"
            context.fillRect(this.x,this.y,this.width,this.height)
            // context.drawImage(this.image,this.x,this.y)
            
        }
        update(input){
            if(input.keys.includes("d")){
                this.xSpeed = 5
            } else if (input.keys.includes("a")){
                this.xSpeed = -5
            } else {
                this.xSpeed=0
            }
            this.x += this.xSpeed
           
            if (input.keys.includes("w")){
                this.ySpeed = -32 
            }else{
                this.ySpeed = 0
            }
            if(this.x<0) {        // Border start
                this.x = 0
            }else if(this.x>this.gameWidth - this.width){
                this.x = this.gameWidth - this.width
            }                     // Border end
            if(!this.isOnGround()){
                this.ySpeed = this.ySpeed + this.weight
                this.weight++ 
            } else if(this.isOnGround()) {
                this.weight = 1
            }
            this.y += this.ySpeed

        }      
    } 
    class InputHandler {
        constructor() {
            this.keys = [] 
            document.body.addEventListener("keydown", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) === -1 ) {
                    this.keys.push(e.key)
                    console.log(this.keys)
                }
            
         
            })    
            document.body.addEventListener("keyup", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key),1)
                    console.log(this.keys)
                }
            })
            
        }
        // Eventlistener który doda do keys naciśnięty klawisz 
        // Eventlistener który usunie klawisz który puścisz
        // "onkeydown" "onkeyup" 
    }
    const input = new InputHandler()
    const player = new Player(canvas.height,canvas.width)
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        player.draw(ctx)
        player.update(input)
        requestAnimationFrame(animate)
    }
    animate()
})