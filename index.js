/**@type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let numOfParticles = canvas.width * 0.5;
let pointer = {
  x: undefined,
  y: undefined,
  radius: 50,
  pressed: false,
};
let grad = ctx.createLinearGradient(0,0,canvas.width, canvas.height)
grad.addColorStop(0, 'pink')
grad.addColorStop(0.5, 'red')
grad.addColorStop(1, 'magenta')

class Particle {
  constructor() {
    this.radius = Math.random() * .5 + .5;
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 50;
    this.x =
      Math.random() * (canvas.width - this.radius * 2) -
      this.radius * 2 +
      this.radius * 2;
    this.y =
      Math.random() * (canvas.height - this.radius * 2) -
      this.radius * 2 +
      this.radius * 2;
    this.vx = Math.floor(Math.random() * 0.2 - 0.1);
    this.vy = Math.floor(Math.random() * 0.2 - 0.1);
  }
  draw() {
    ctx.fillStyle = grad
    ctx.beginPath();
    ctx.strokeRect = "black";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.arc(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.3,
      this.radius * 0.6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    //edges
    if (this.x + this.radius > canvas.width || this.x < this.radius) {
      this.vx = this.vx * -1;
    }
    if (this.y + this.radius > canvas.height || this.y < this.radius) {
      this.vy = this.vy * -1;
    }
    //inflate
    if (pointer.pressed) {
      let dx = this.x - pointer.x;
      let dy = this.y - pointer.y;
      let distance = Math.hypot(dx, dy);
      if (distance < pointer.radius && this.radius < this.maxRadius) {
        this.radius +=3;
      }
    }
    if(this.radius > this.minRadius){
      this.radius -= 0.3
    }
  }
}

function initParticles() {
  for (let i = 0; i < numOfParticles; i++) {
    particleArray.push(new Particle());
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("pointerdown", (e) => {
  pointer.pressed = true;
});
window.addEventListener("pointermove", (e) => {
  pointer.x = e.x;
  pointer.y = e.y;
});

window.addEventListener("pointerup", (e) => {
  pointer.pressed = false;
});
window.addEventListener("resize", (e) => {
  location.reload();
});
