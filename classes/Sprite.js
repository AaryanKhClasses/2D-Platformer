class Sprite {
    constructor({ position, src, frameRate = 1, animations, frameBuffer = 2, loop = 2, autoplay = true, onComplete = null }) {
        this.position = position
        this.image = new Image()
        this.image.src = src
        this.loaded = false
        this.animations = animations
        this.frameRate = frameRate
        this.frameBuffer = frameBuffer
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.loop = loop
        this.autoplay = autoplay
        this.onComplete = onComplete
        this.completed = false
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }

        if(this.animations) {
            for(let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].src
                this.animations[key].image = image
            }
        }
    }

    draw() {
        if (!this.loaded) return

        const cropBox = {
            position: { x: this.width * this.currentFrame, y: 0 },
            width: this.width,
            height: this.height
        }
        context.drawImage(this.image, cropBox.position.x, cropBox.position.y, cropBox.width, cropBox.height, this.position.x, this.position.y, cropBox.width, cropBox.height)
        this.updateFrames()
    }

    play() {
        this.autoplay = true
    }

    updateFrames() {
        if(!this.autoplay) return
        this.elapsedFrames++
        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++
            else if(this.loop) this.currentFrame = 0
        }

        if(this.onComplete && this.currentFrame === this.frameRate - 1 && !this.completed) {
            const result = this.onComplete()
            this.completed = true
            if (result !== undefined) {
                return result
            }
        }
    }
}
