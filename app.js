document.addEventListener('DOMContentLoaded', () => {
    //dom loaded
    const desert = document.querySelector('#desert')
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.querySelector('#alert')
    const scoreLabel = document.querySelector('#score')

    let gravity = 0.9
    let isJumping = false
    let isGameOver = false
    let score = 0
    let misstyped = 0

    function control(e) {
        if (e.code == "Space") {
            if (!isJumping) {
                jump()
            }
            if (isGameOver) {
                if (misstyped === 0)
                    {
                        misstyped++
                    }
                    else {
                        restart()
                    }
                
            }
        }
    }
    document.addEventListener('keydown', control)

    let position = 0
    function jump() {
        isJumping = true
        let count = 0
        let timerId = setInterval( () => {

            //move down
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval( () => {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity 
                    dino.style.bottom = position + 'px'
                }, 20)
            }

            //move up
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles() {
        if (!isGameOver) {
            let randomTime = Math.floor((Math.random() * 4000) + 250);
            let obstaclePos = 1000
            const obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePos + 'px'
    
            let timerId = setInterval( () => {
                if (obstaclePos > 0 && obstaclePos < 60 && position < 60) {
                    clearInterval(timerId)
                    gameOver()
                }
                obstaclePos -= 10
                obstacle.style.left = obstaclePos + 'px'
            }, 20)
            setTimeout(generateObstacles, randomTime)
        }
        
    }

    function incrementScore() {
        let scoreTimerId = setInterval( () => {
            if (isGameOver) {
                clearInterval(scoreTimerId)
            }
            score +=1
            scoreLabel.innerHTML = "Score: " + score
        }, 1)
    }

    function gameOver() {
        alert.innerHTML = 'Game Over'
        isGameOver = true
        // remove all children
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
        }
        desert.style.animation = ""
    }

    function restart() {
        window.location.reload()

    }

    
    generateObstacles()
    incrementScore()

    
})