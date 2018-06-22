import {
	isCheckAllBox
} from '../js/checkbox.js';
import sourceData from '../data/ife31data.js';

//获取过滤条件
function getFilter(wrap) {
	let domCheckboxs = wrap.querySelectorAll('input');
	let domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');
	let values = [];
	for (let ele of domCheckboxs) {
		if (isCheckAllBox(ele)) {
			continue;
		}
		ele.checked && values.push(ele.value);
	}
	return values;
}

//获取过滤后的数据
function getFilterData(filter) {
	return sourceData.filter((item) => {
		let isMatch = true;
		for (let key in filter) {
			isMatch = filter[key].includes(item[key]);
			if (!isMatch) {
				break;
			}
		}
		return isMatch;
	});
}

//按key对data排序
function sortData(key, data) {
	data.sort((a, b) => {
		if (a[key] > b[key]) {
			return 1;
		} else if (a[key] < b[key]) {
			return -1;
		} else {
			return 0;
		}
	});
	return data;
}

export {
	getFilter,
	getFilterData,
	sortData
}