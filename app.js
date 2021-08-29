const canvas = document.querySelector('.paint-board');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls__color');
const rangeControler = document.querySelector('.range');
const mode = document.querySelector('.fillAndPaintMode');
const saveBtn = document.querySelector('.saveBtn');

canvas.width = 400;
canvas.height = 700;

ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.fillStyle="red";
ctx.lineWidth = 2.5;

let paint = false;
let filling = false;
let x = 0;
let y = 0;

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

        mode.addEventListener('click', () => {
            if(filling === true) {
                filling = false;
                mode.value = "fill";
                console.log(filling);
            } else {
                filling = true;
                mode.value = "paint";
            }
        })

        function chageColor(event) {
            let currentColor = event.target.style.backgroundColor;
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
        }


        rangeControler.addEventListener('input', () => {
            let currentRange = rangeControler.value;
            ctx.lineWidth = currentRange;
        })

        colors.forEach((color) => {
            color.addEventListener('click', chageColor);
        })

        function handleFillColor() {
            if(filling){
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }

        function handleSave() {
            const image = canvas.toDataURL("image/jpeg");
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = "PaintJS(💜)"
            link.click(); // 클릭을 거짓으로 만든다?
        }

        canvas.addEventListener("mousemove", doPainting);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("click", handleFillColor);
        saveBtn.addEventListener("click", handleSave);
    } else {
        console.log("canvas-unsupported code here.")
    }
}

draw();