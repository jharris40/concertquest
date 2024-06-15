document.addEventListener('DOMContentLoaded', (event) => {
    let currentLevel = 0;
    const levels = document.querySelectorAll('.level');
    
    function showLevel(level) {
        levels.forEach((lvl, idx) => {
            lvl.style.display = (idx === level) ? 'block' : 'none';
        });
    }
    
    // Show the first level
    showLevel(currentLevel);
    
    // Level 1: Find the Ticket
    document.getElementById('ticket').addEventListener('click', () => {
        currentLevel++;
        showLevel(currentLevel);
    });
    
    // Level 2: Navigate the Maze
    const maze = document.getElementById('maze');
    maze.addEventListener('click', () => {
        currentLevel++;
        showLevel(currentLevel);
    });

    // Level 3: Avoid Obstacles
    const canvas = document.getElementById('obstacleGame');
    const ctx = canvas.getContext('2d');
    let kid = { x: 50, y: 350, width: 20, height: 20 };
    let obstacles = [];
    let keys = {};

    function addObstacle() {
        obstacles.push({ x: canvas.width, y: Math.random() * canvas.height, width: 20, height: 20 });
    }

    function drawKid() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(kid.x, kid.y, kid.width, kid.height);
    }

    function drawObstacles() {
        ctx.fillStyle = 'red';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function updateObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.x -= 2;
        });
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }

    function checkCollision() {
        return obstacles.some(obstacle => {
            return kid.x < obstacle.x + obstacle.width &&
                kid.x + kid.width > obstacle.x &&
                kid.y < obstacle.y + obstacle.height &&
                kid.y + kid.height > obstacle.y;
        });
    }

    function moveKid() {
        if (keys['ArrowUp'] && kid.y > 0) kid.y -= 2;
        if (keys['ArrowDown'] && kid.y + kid.height < canvas.height) kid.y += 2;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKid();
        drawObstacles();
        updateObstacles();
        moveKid();
        if (checkCollision()) {
            alert('Game Over! Try Again.');
            kid = { x: 50, y: 350, width: 20, height: 20 };
            obstacles = [];
        }
        if (kid.x >= canvas.width - kid.width) {
            currentLevel++;
            showLevel(currentLevel);
        }
        requestAnimationFrame(gameLoop);
    }

    setInterval(addObstacle, 2000);
    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);

    showLevel(currentLevel);
    gameLoop();
});