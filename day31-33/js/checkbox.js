import sourceData from '../data/ife31data.js';

let domRegionRadioWrap = document.getElementById('region-radio-wrapper');
let domProductRadioWrap = document.getElementById('product-radio-wrapper');

//绑定勾选框事件
function bindCheckBox(wrap, callback) {
	wrap.addEventListener('click', function(event) {
		let domTarget = event.target;

		let isCheckbox = domTarget.tagName.toLowerCase() === 'input';
		//当点击的是checkbox
		if (isCheckbox) {
			let domCheckboxs = wrap.querySelectorAll('input');
			let domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');

			if (isCheckAllBox(domTarget)) { //点击全选框时
				if (domCheckAllBox.checked) {
					for (let ele of domCheckboxs) {
						ele.checked = true;
					}
				} else {
					domCheckAllBox.checked = true;
				}
			} else { //点击单个框时
				let checkedTotal = getCheckedTotal(wrap);
				//限制至少有一个勾选
				if (checkedTotal === 0) {
					domTarget.checked = true;
				}
				//判断是否需要勾选全选
				if (checkedTotal === domCheckboxs.length - 1) {
					domCheckAllBox.checked = true;
				} else {
					domCheckAllBox.checked = false;
				}
			}
			isFunction(callback) && callback();
			// changeTable();
		}
	}, false)
}

//判断是否是全选框
function isCheckAllBox(ele) {
	return ele.dataset.checkType === 'all';
}

//获取勾选数量
function getCheckedTotal(wrap) {
	let domCheckboxs = wrap.querySelectorAll('input');
	let checkedBoxs = [];
	for (let ele of domCheckboxs) {
		if (isCheckAllBox(ele)) {
			continue;
		}
		ele.checked && checkedBoxs.push(ele);
	}
	return checkedBoxs.length;
}

//获取勾选情况
function getCheckStatus() {
	let regionCheckedTotal = getCheckedTotal(domRegionRadioWrap);
	let productCheckedTotal = getCheckedTotal(domProductRadioWrap);
	let status = 1; //商品和地区都只选择一个
	if (regionCheckedTotal === 1 && productCheckedTotal > 1) {
		status = 2; //当地区选择了一个，商品选择了多个的时候
	} else if (productCheckedTotal === 1 && regionCheckedTotal > 1) {
		status = 3; //当商品选择了一个，地区选择了多个的时候
	} else {
		status = 4; //当商品和地区都选择了多于一个的情况下
	}
	return {
		status:status,
		regionCheckedTotal:regionCheckedTotal,
		productCheckedTotal:productCheckedTotal
	};
}

function isFunction(func) {
	return Object.prototype.toString.call(func) === "[object Function]";
}

export {
	bindCheckBox,
	isCheckAllBox,
	getCheckedTotal,
	getCheckStatus
}