import {
	bindCheckBox,
	getCheckedTotal,
	isCheckAllBox
} from '../js/checkbox.js';
import {
	changeTable
} from '../js/table.js';

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