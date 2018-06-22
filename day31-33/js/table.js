import {
	isCheckAllBox,
	getCheckedTotal,
	getCheckStatus
} from '../js/checkbox.js';
import {
	getFilter,
	getFilterData,
	sortData
} from '../js/resolveData.js';


let domTableWrap = document.getElementById('table-wrapper');
let domTableHeadFirst = document.getElementById('table-head-first');
let domTableHeadSecond = document.getElementById('table-head-second');
let domTableBody = document.getElementById('table-body');


//改变table显示
function changeTable(wrapObj) {
	let filter = {};
	for (let key in wrapObj) {
		filter[key] = getFilter(wrapObj[key]);
	}

	let data = getFilterData(filter);
	renderTable(data);
}

//渲染表格
function renderTable(data) {
	let html = ``;
	let status = getCheckStatus();

	if (status === 2) {
		sortData('region', data);
		domTableHeadFirst.innerText = '地区';
		domTableHeadSecond.innerText = '商品';
	} else {
		sortData('product', data);
		domTableHeadFirst.innerText = '商品';
		domTableHeadSecond.innerText = '地区';
	}

	html = data.reduce((html, current, index) => {
		html += `<tr>
						${addRowSpan(status, current, index)}
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

function addRowSpan(status, current, index) {
	let firstTdHtml = ``;
	if ((status === 2 || status === 3) && index === 0) {
		firstTdHtml += `<td rowspan="3">${status === 2 ? current.region : current.product}</td>`;
	} else if (status !== 2 && status !== 3) {
		firstTdHtml += `<td>${current.product}</td>`;
	}
	return firstTdHtml;
}

export {
	changeTable
}