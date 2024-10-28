window.addEventListener("load", ()=> {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 720
    const BASE_SPRITE_X_OFFSET = 10
    const BASE_SPRITE_Y_OFFSET = 30
    
    class Platform {
        constructor(initialX, initialY, initialWidth, initialHeight, initialColor) {
            this.x = initialX
            this.y = initialY
            this.width = initialWidth
            this.height = initialHeight
            this.color = initialColor
        }
        
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    
    class Player {
        constructor(gameHeight, gameWidth) { 
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 90
            this.height = 120
            this.img = document.getElementById("player")
            this.x = 0
            this.y = this.gameHeight - this.height
            this.vx = 0
            this.vy = 0
            this.weight = 1
            this.frameX = 0
            this.frameY = 0
            this.sWidth = 90
            this.sHeight = 132
            this.dWidth = 102
            this.dHeight = 153
            this.myImg = document.getElementById("player")
            this.onPlatform = false // Dodane
        }

        isOnPlatform(platform) {
            return this.x + this.width > platform.x &&
                   this.x < platform.x + platform.width &&
                   this.y + this.height <= platform.y &&
                   this.y + this.height + this.vy >= platform.y
        }

        isOnGroundOrPlatform() {
            return this.isOnGround() || this.onPlatform
        }

        isOnGround() {
            return this.y === this.gameHeight - this.height 
        }

        draw(context) {
            context.drawImage(
                this.myImg,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET, 
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET, 
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight
            )
        }

        update(input, platforms) {
            if(input.keys.includes("d")) {
                this.vx = 5
                this.frameX = 0
                this.frameY = 3
            } else if(input.keys.includes("a")) {
                this.vx = -5
                this.frameX = 1
                this.frameY = 2
            } else {
                this.vx = 0
                this.frameX = 0
                this.frameY = 0
            }
            this.x += this.vx
            
            if(input.keys.includes("w") && this.isOnGroundOrPlatform()) {
                this.vy = -25    
                this.frameX = 1
                this.frameY = 0
            }

            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

           this.onPlatform = false 

            platforms.forEach(platform => {
                if (this.isOnPlatform(platform)) {
                    this.onPlatform = true
                    this.vy = 0
                    this.y = platform.y - this.height
                }
            })
            if (!this.isOnGround() && !this.onPlatform) {
                this.vy += this.weight
                this.weight = 1
            } else if (this.isOnGround() || this.onPlatform) {
                this.weight = 1
            }

            this.y += this.vy

            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height
            }
        }        
    }
    class InputHandler {
        constructor() {
            this.keys = [] 
            document.body.addEventListener("keydown", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }
            })    
            document.body.addEventListener("keyup", (e) => {
                if((e.key === "w" || e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            })
        }
    }
    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    const platforms = [
        new Platform(200, 600, 200, 20, "aqua"),
        new Platform(500, 500, 150, 20, "green"),
        new Platform(300, 400, 100, 20, "red")]

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.draw(ctx)
        player.update(input, platforms)
        platforms.forEach(platform => platform.draw(ctx))

        requestAnimationFrame(animate)
    }

    animate()
})
