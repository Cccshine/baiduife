let domSVG = document.getElementById('svg-bar');
function drawBarGraph(data){
	let graphWidth = 600,
		graphHeight = 600,
		axisX = 480,
		axisY = 480,
		barWidth = 30,
		gutter = 10,
		barColor = '#44d5ec',
		axisColor = '#000';
	domSVG.setAttribute('width',graphWidth);
	domSVG.setAttribute('height',graphHeight);
	data.sort((a,b)=>{return b-a});
	let max = data[0];
	let ratio = axisY/max;
	let svgStr = `<line x1="0" y1=${graphHeight} x2="0" y2=${graphHeight - axisY - 10} style="stroke:${axisColor};stroke-width:2"/>
				  <line x1="0" y1=${graphHeight} x2=${axisX + 10} y2=${graphHeight} style="stroke:${axisColor};stroke-width:2"/>`;
	for(let i = 0, len = data.length; i < len; i++){
		let height = ratio*data[i];
		svgStr += `<rect x=${(i + 1) * gutter + i * barWidth } y="${graphHeight - height}" width=${barWidth} height=${height} style="fill:${barColor}"/>`
	}
	domSVG.innerHTML = svgStr;
}

export {drawBarGraph}