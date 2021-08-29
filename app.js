const canvas = document.querySelector('.paint-board');
const ctx = canvas.getContext('2d');

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
                ctx.moveTo(x, y);
            }
        }
        
        function startPainting() {
            paint = true;
        }

        function stopPainting() {
            paint = false;
        }


        canvas.addEventListener("mousemove", doPainting);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseleave", stopPainting)
        canvas.addEventListener("mouseup", stopPainting);
    } else {
        console.log("canvas-unsupported code here.")
    }
}

draw();