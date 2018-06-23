let domCanvas = document.getElementById('canvas-line');
let ctx = domCanvas.getContext("2d");

function drawLineGraph(data){
	let graphWidth = 600,
		graphHeight = 600,
		axisX = 480,
		axisY = 480,
		pointRidus = 5,
		pointColor = '#44d5ec',
		lineColor = '#ea0c63',
		gutter = 40,
		axisColor = '#000';
	domCanvas.setAttribute('width',graphWidth);
	domCanvas.setAttribute('height',graphHeight);
	data.sort((a,b)=>{return b-a});
	let max = data[0];
	let ratio = axisY/max;
	let lastPoint = [];
	ctx.beginPath();
	ctx.moveTo(0,graphHeight);
	ctx.lineTo(0,graphHeight - axisY - 10);
	ctx.stroke();
	ctx.moveTo(0,graphHeight);
	ctx.lineTo(axisX + 10, graphHeight);
	ctx.stroke();
	for(let i = 0, len = data.length; i < len; i++){
		let point = [(i + 1) * gutter, graphHeight - ratio*data[i]];
		ctx.beginPath();
		ctx.fillStyle = pointColor;
		ctx.arc(point[0],point[1],pointRidus,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();
		if(i !== 0){
			ctx.beginPath();
			ctx.moveTo(lastPoint[0],lastPoint[1]);
			ctx.lineTo(point[0],point[1]);
			ctx.strokeStyle = lineColor;
			ctx.stroke();
		}
		lastPoint = point;
	}
}

export {drawLineGraph}