import sourceData from '../data/ife31data.js';

let domRegionRadioWrap = document.getElementById('region-radio-wrapper');
let domProductRadioWrap = document.getElementById('product-radio-wrapper');
let domTableWrap = document.getElementById('table-wrapper');
let domTableHeadFirst = document.getElementById('table-head-first');
let domTableHeadSecond = document.getElementById('table-head-second');
let domTableBody = document.getElementById('table-body');


bindCheckBox(domRegionRadioWrap);
bindCheckBox(domProductRadioWrap);

changeTable();

function bindCheckBox(wrap) {
	 wrap.addEventListener('click', function(event) {
	 	let domTarget = event.target;
	 	
	 	let isCheckbox = domTarget.tagName.toLowerCase() === 'input';
	 	//当点击的是checkbox
	 	if(isCheckbox){
	 		let domCheckboxs = wrap.querySelectorAll('input');
	 		let domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');

	 		if(isCheckAllBox(domTarget)){//点击全选框时
	 			if(domCheckAllBox.checked){
	 				for(let ele of domCheckboxs){
		 				ele.checked = true;
		 			}
	 			}else{
	 				domCheckAllBox.checked = true;
	 			}
	 		}else{//点击单个框时
	 			let checkedTotal = getCheckedTotal(wrap);
	 			//限制至少有一个勾选
	 			if(checkedTotal === 0){
	 				domTarget.checked = true;
	 			}
	 			//判断是否需要勾选全选
	 			if(checkedTotal === domCheckboxs.length - 1){
	 				domCheckAllBox.checked = true;
	 			}else{
	 				domCheckAllBox.checked = false;
	 			}
	 		}

	 		changeTable();
	 	}
	 }, false)
}

//判断是否是全选框
function isCheckAllBox (ele) {
	return ele.dataset.checkType === 'all';
}

function getCheckedTotal(wrap) {
	let domCheckboxs = wrap.querySelectorAll('input');
	let checkedBoxs = [];
	for(let ele of domCheckboxs){
		if(isCheckAllBox(ele)){
			continue;
		}
		ele.checked && checkedBoxs.push(ele);
	}
	return checkedBoxs.length;
}

//获取过滤条件
function getFilter(wrap) {
	let domCheckboxs = wrap.querySelectorAll('input');
	let domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');
	let values = [];
	for(let ele of domCheckboxs){
		if(isCheckAllBox(ele)){
			continue;
		}
		ele.checked && values.push(ele.value);
	}
	return values;
}

//改变table显示
function changeTable() {
	let filter = {
		"region":getFilter(domRegionRadioWrap),
		"product":getFilter(domProductRadioWrap)
	}
	let data = getFilterData(filter);
	renderTable(data);
}

//获取过滤后的数据
function getFilterData(filter) {
	return sourceData.filter((item) => {
		let isMatch = true;
		for(let key in filter){
			isMatch = filter[key].includes(item[key]);
			if(!isMatch){
				break;
			}
		}
		return isMatch;
	});
}

function sortData(key, data) {
	data.sort((a,b)=>{
		if(a[key] > b[key]){
			return 1;
		}else if(a[key] < b[key]){
			return -1;
		}else{
			return 0;
		}
	});
	return data;
}

//渲染表格
function renderTable(data) {
	let html = ``;
	let regionCheckedTotal = getCheckedTotal(domRegionRadioWrap);
	let productCheckedTotal = getCheckedTotal(domProductRadioWrap);
	let status = 1;//商品和地区都只选择一个
	if(regionCheckedTotal === 1 && productCheckedTotal > 1){
		status = 2;//当地区选择了一个，商品选择了多个的时候
	}else if(productCheckedTotal === 1 && regionCheckedTotal > 1){
		status = 3;//当商品选择了一个，地区选择了多个的时候
	}else{
		status = 4;//当商品和地区都选择了多于一个的情况下
	}
	
	if(status === 2){
		sortData('region', data);
		domTableHeadFirst.innerText = '地区';
		domTableHeadSecond.innerText = '商品';
	}else{
		sortData('product', data);
		domTableHeadFirst.innerText = '商品';
		domTableHeadSecond.innerText = '地区';
	}

	html = data.reduce((html, current, index) => {
			html += `<tr>
		 				<td>${status === 2 ? current.region : current.product}</td>
		 				<td>${status === 2 ? current.product : current.region}</td>
		 				<td>${current.sale[0]}</td>
		 				<td>${current.sale[1]}</td>
		 				<td>${current.sale[2]}</td>
		 				<td>${current.sale[3]}</td>
		 				<td>${current.sale[4]}</td>
		 				<td>${current.sale[5]}</td>
		 				<td>${current.sale[6]}</td>
		 				<td>${current.sale[7]}</td>
		 				<td>${current.sale[8]}</td>
		 				<td>${current.sale[9]}</td>
		 				<td>${current.sale[10]}</td>
		 				<td>${current.sale[11]}</td>
	 				</tr>`;
			return html;
	}, html);
	domTableBody.innerHTML = html;
}