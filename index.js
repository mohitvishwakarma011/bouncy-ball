const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


function randomColors() {
    let hexString = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexString[Math.floor(Math.random() * 15)];
    }
    return color;
  }


let ballsArray = [];
window.addEventListener('click',function(e){
    let x = e.x;
    let y = e.y;
    let radius = 30;
    let dx = (Math.random()-0.5)*4;
    let dy = (Math.random()-0.5)*4;
    let color = randomColors();

    ballsArray.push(new Ball(x,y,dx,dy,radius,color));

    console.log(ballsArray);
})

function Ball(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw=function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.update = function(){

        this.draw();
        if(this.x + this.radius>window.innerWidth || this.x-this.radius<0)
        {
            this.dx=-this.dx;
        }
        if(this.y + this.radius >window.innerHeight || this.y- this.radius<0)
        {
            this.dy=-this.dy;
        }

        this.x+=this.dx;
        this.y+=this.dy;
    }
}




function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    for(let i=0;i<ballsArray.length;i++)
    {
        ballsArray[i].update();
    }
}

animate();