const canvas = document.querySelector('.paint-board');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls__color');

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
canvas.width = 400;
canvas.height = 700;


let paint = false;
// let x = 0;
// let y = 0; 초기값 설정해주는 이유?

function draw (){
    if(canvas.getContext) {

        function doPainting(event) {
            const x = event.offsetX;
            const y = event.offsetY;

            if(paint === true) {
                ctx.lineTo(x, y);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(x, y); // 새로운 경로를 만들고 펜을 지정된(x,y) 좌표로 옮긴다 
            }
        }
        
        function startPainting() {
            paint = true;
        }

        function stopPainting() {
            paint = false;
        }

        colors.forEach((color) => {
            let currentColor = color.style.backgroundColor;
            color.addEventListener('click', () => {
                ctx.strokeStyle = currentColor;
            })
        })

        canvas.addEventListener("mousemove", doPainting);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseleave", stopPainting)
        canvas.addEventListener("mouseup", stopPainting);
    } else {
        console.log("canvas-unsupported code here.")
    }
}

draw();