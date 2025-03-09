class Player {
    constructor({ collisionBlocks = [] }) {
        this.x = 200,
        this.y = 200,
        this.width = 30,
        this.height = 30,
        this.bottom = this.y + this.height,
        this.velocity = {
            x: 0,
            y: 0
        },
        this.gravity = 0.5,
        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
    }

    init() {
        context.fillStyle = 'black'
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.velocity.x
        this.checkHorizontalCollisions()
        this.applyGravity()
        this.checkVerticalCollisions()
        this.checkDoorCollision()
    }

    checkHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i]
            if (this.x <= block.position.x + block.width &&
                this.x + this.width >= block.position.x &&
                this.y <= block.position.y + block.height &&
                this.y + this.height >= block.position.y
            ) {
                if(this.velocity.x < 0) {
                    this.x = block.position.x + block.width + 0.1
                    break
                } else if(this.velocity.x > 0) {
                    this.x = block.position.x - this.width - 0.1
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.y += this.velocity.y
    }

    checkVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i]
            if (this.x <= block.position.x + block.width &&
                this.x + this.width >= block.position.x &&
                this.y <= block.position.y + block.height &&
                this.y + this.height >= block.position.y
            ) {
                if(this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.y = block.position.y + block.height + 0.1
                    break
                } else if(this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.y = block.position.y - this.height - 0.1
                    break
                }
            }
        }
    }

    checkDoorCollision() {
        for(let i = 0; i < doors.length; i++) {
            const door = doors[i]
            if (this.x <= door.position.x + door.width &&
                this.x + this.width >= door.position.x &&
                this.y <= door.position.y + door.height &&
                this.y + this.height >= door.position.y
            ) {
                door.play()
            } else door.currentFrame = 0
        }
    }
}
