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
            this.speed=0
        }
        draw(context){
            context.fillStyle = "red"
            context.fillRect(this.x,this.y,this.width,this.height)
            // context.drawImage(this.image,this.x,this.y)
            
        }
        update(input){
            if(input.keys.includes("ArrowRight")){
                this.speed = 5
            } else if (input.keys.includes("ArrowLeft")){
                this.speed = -5
            }
                else {
                this.speed=0
            }
            this.x += this.speed
            
        }
    } 
    class InputHandler  {
        constructor() {
            this.keys=[]
            document.addEventListener("keydown", e=>{
                if(e.key === "ArrowRight" ) {
                    console.log(e.key +" nasiścnięte") 
                    this.keys.push(e.key)
                    console.log(this.keys)
                }
                if(e.key=== "ArrowLeft") {
                    this.keys.push(e.key)
                }
            })

            document.addEventListener("keyup", e=>{
                if(e.key === "ArrowRight") {
                    console.log(e.key +" puszczone")
                    this.keys.splice(0,1)
                }
                if(e.key ==="ArrowLeft"){
                    this.keys.splice(0,1)
                }
            })
            
            
            
            //eventListener który doda do keys naciśnięty klawisz, i ev.Listener który usunie klawisz który puścisz.
            //"onkeydown","onkeyup"
        }
        
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