var nParticle = 200;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);


function distanceParticle(obj1, obj2) {
  let x = obj1.x - obj2.x;
  let y = obj1.x - obj2.y;
  return Math.sqrt(x * x + y * y);
}

var fondo = document.getElementById("fondo");
fondo.style.background = "#000";
fondo.width = window.innerWidth * 1;
fondo.height = window.innerHeight;
var c = fondo.getContext("2d");

class particle {
  constructor(x, y, radio, color) {
    this.color = color || "#fff";
    this.x = x;
    this.y = y;
    this.radio = radio || 1;
    this.dx = Math.random() - 3.5;
    this.dy = Math.random() - 3.5;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radio, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  reload(array = []) {
    for (let i = 0; i < array.length; i++) {
      let d = distanceParticle(this, array[i]);
      if (d < 100) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(array[i].x, array[i].y);
        c.lineWidth = .3;
        c.strokeStyle = "#fff";
        c.stroke();
        c.closePath();
      }
    }

    if (this.y + this.radio > fondo.height || this.y - this.radio < 0) {
      this.dy = -this.dy;
    }
    if (this.x + this.radio > fondo.width || this.x - this.radio < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

var particles = [];
for (let i = 0; i < nParticle; i++) {
  let radio = 1;
  //let x = Math.random() * fondo.width * radio * 2;
  let x = randomInt(radio * 2, fondo.width - radio * 2);
  //let y = Math.random() * fondo.height * radio * 2;
  let y = randomInt(radio * 2, fondo.height - radio * 2);
  particles.push(new particle(x, y, radio));
}
console.log(particles);

function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, fondo.width, fondo.height);

  particles.forEach(particle => particle.reload(particles));
}
animation();
