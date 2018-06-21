(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

exports.default = sourceData;

},{}],2:[function(require,module,exports){
'use strict';

var _ife31data = require('../data/ife31data.js');

var _ife31data2 = _interopRequireDefault(_ife31data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domRegionRadioWrap = document.getElementById('region-radio-wrapper');
var domProductRadioWrap = document.getElementById('product-radio-wrapper');
var domTableWrap = document.getElementById('table-wrapper');
var domTableHeadFirst = document.getElementById('table-head-first');
var domTableHeadSecond = document.getElementById('table-head-second');
var domTableBody = document.getElementById('table-body');

bindCheckBox(domRegionRadioWrap);
bindCheckBox(domProductRadioWrap);

changeTable();

function bindCheckBox(wrap) {
	wrap.addEventListener('click', function (event) {
		var domTarget = event.target;

		var isCheckbox = domTarget.tagName.toLowerCase() === 'input';
		//当点击的是checkbox
		if (isCheckbox) {
			var domCheckboxs = wrap.querySelectorAll('input');
			var domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');

			if (isCheckAllBox(domTarget)) {
				//点击全选框时
				if (domCheckAllBox.checked) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = domCheckboxs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var ele = _step.value;

							ele.checked = true;
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} else {
					domCheckAllBox.checked = true;
				}
			} else {
				//点击单个框时
				var checkedTotal = getCheckedTotal(wrap);
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

			changeTable();
		}
	}, false);
}

//判断是否是全选框
function isCheckAllBox(ele) {
	return ele.dataset.checkType === 'all';
}

function getCheckedTotal(wrap) {
	var domCheckboxs = wrap.querySelectorAll('input');
	var checkedBoxs = [];
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = domCheckboxs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var ele = _step2.value;

			if (isCheckAllBox(ele)) {
				continue;
			}
			ele.checked && checkedBoxs.push(ele);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return checkedBoxs.length;
}

//获取过滤条件
function getFilter(wrap) {
	var domCheckboxs = wrap.querySelectorAll('input');
	var domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');
	var values = [];
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = domCheckboxs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var ele = _step3.value;

			if (isCheckAllBox(ele)) {
				continue;
			}
			ele.checked && values.push(ele.value);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return values;
}

//改变table显示
function changeTable() {
	var filter = {
		"region": getFilter(domRegionRadioWrap),
		"product": getFilter(domProductRadioWrap)
	};
	var data = getFilterData(filter);
	renderTable(data);
}

//获取过滤后的数据
function getFilterData(filter) {
	return _ife31data2.default.filter(function (item) {
		var isMatch = true;
		for (var key in filter) {
			isMatch = filter[key].includes(item[key]);
			if (!isMatch) {
				break;
			}
		}
		return isMatch;
	});
}

function sortData(key, data) {
	data.sort(function (a, b) {
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

//渲染表格
function renderTable(data) {
	var html = '';
	var regionCheckedTotal = getCheckedTotal(domRegionRadioWrap);
	var productCheckedTotal = getCheckedTotal(domProductRadioWrap);
	var status = 1; //商品和地区都只选择一个
	if (regionCheckedTotal === 1 && productCheckedTotal > 1) {
		status = 2; //当地区选择了一个，商品选择了多个的时候
	} else if (productCheckedTotal === 1 && regionCheckedTotal > 1) {
		status = 3; //当商品选择了一个，地区选择了多个的时候
	} else {
		status = 4; //当商品和地区都选择了多于一个的情况下
	}

	if (status === 2) {
		sortData('region', data);
		domTableHeadFirst.innerText = '地区';
		domTableHeadSecond.innerText = '商品';
	} else {
		sortData('product', data);
		domTableHeadFirst.innerText = '商品';
		domTableHeadSecond.innerText = '地区';
	}

	html = data.reduce(function (html, current, index) {
		html += '<tr>\n\t\t \t\t\t\t<td>' + (status === 2 ? current.region : current.product) + '</td>\n\t\t \t\t\t\t<td>' + (status === 2 ? current.product : current.region) + '</td>\n\t\t \t\t\t\t<td>' + current.sale[0] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[1] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[2] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[3] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[4] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[5] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[6] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[7] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[8] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[9] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[10] + '</td>\n\t\t \t\t\t\t<td>' + current.sale[11] + '</td>\n\t \t\t\t\t</tr>';
		return html;
	}, html);
	domTableBody.innerHTML = html;
}

},{"../data/ife31data.js":1}]},{},[2]);
