import {
	bindCheckBox,
	getCheckedTotal,
	isCheckAllBox
} from '../js/checkbox.js';
import {
	changeTable
} from '../js/table.js';
import {
	drawBarGraph
} from '../js/bar.js';
import {
	drawLineGraph
} from '../js/line.js';

let domRegionRadioWrap = document.getElementById('region-radio-wrapper');
let domProductRadioWrap = document.getElementById('product-radio-wrapper');


bindCheckBox(domRegionRadioWrap, () => {
	changeTable({
		"region": domRegionRadioWrap,
		"product": domProductRadioWrap,
	});
});
bindCheckBox(domProductRadioWrap, () => {
	changeTable({
		"region": domRegionRadioWrap,
		"product": domProductRadioWrap,
	});
});
changeTable({
	"region": domRegionRadioWrap,
	"product": domProductRadioWrap,
});

drawBarGraph([120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270])
drawLineGraph([120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270])