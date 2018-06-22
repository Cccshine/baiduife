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

var _checkbox = require('../js/checkbox.js');

var _table = require('../js/table.js');

var domRegionRadioWrap = document.getElementById('region-radio-wrapper');
var domProductRadioWrap = document.getElementById('product-radio-wrapper');

(0, _checkbox.bindCheckBox)(domRegionRadioWrap, function () {
	(0, _table.changeTable)({
		"region": domRegionRadioWrap,
		"product": domProductRadioWrap
	});
});
(0, _checkbox.bindCheckBox)(domProductRadioWrap, function () {
	(0, _table.changeTable)({
		"region": domRegionRadioWrap,
		"product": domProductRadioWrap
	});
});
(0, _table.changeTable)({
	"region": domRegionRadioWrap,
	"product": domProductRadioWrap
});

},{"../js/checkbox.js":3,"../js/table.js":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getCheckStatus = exports.getCheckedTotal = exports.isCheckAllBox = exports.bindCheckBox = undefined;

var _ife31data = require('../data/ife31data.js');

var _ife31data2 = _interopRequireDefault(_ife31data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domRegionRadioWrap = document.getElementById('region-radio-wrapper');
var domProductRadioWrap = document.getElementById('product-radio-wrapper');

//绑定勾选框事件
function bindCheckBox(wrap, callback) {
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
			isFunction(callback) && callback();
			// changeTable();
		}
	}, false);
}

//判断是否是全选框
function isCheckAllBox(ele) {
	return ele.dataset.checkType === 'all';
}

//获取勾选数量
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

//获取勾选情况
function getCheckStatus() {
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
	return {
		status: status,
		regionCheckedTotal: regionCheckedTotal,
		productCheckedTotal: productCheckedTotal
	};
}

function isFunction(func) {
	return Object.prototype.toString.call(func) === "[object Function]";
}

exports.bindCheckBox = bindCheckBox;
exports.isCheckAllBox = isCheckAllBox;
exports.getCheckedTotal = getCheckedTotal;
exports.getCheckStatus = getCheckStatus;

},{"../data/ife31data.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sortData = exports.getFilterData = exports.getFilter = undefined;

var _checkbox = require('../js/checkbox.js');

var _ife31data = require('../data/ife31data.js');

var _ife31data2 = _interopRequireDefault(_ife31data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//获取过滤条件
function getFilter(wrap) {
	var domCheckboxs = wrap.querySelectorAll('input');
	var domCheckAllBox = wrap.querySelector('input[data-check-type="all"]');
	var values = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = domCheckboxs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var ele = _step.value;

			if ((0, _checkbox.isCheckAllBox)(ele)) {
				continue;
			}
			ele.checked && values.push(ele.value);
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

	return values;
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

//按key对data排序
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

exports.getFilter = getFilter;
exports.getFilterData = getFilterData;
exports.sortData = sortData;

},{"../data/ife31data.js":1,"../js/checkbox.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.changeTable = undefined;

var _checkbox = require('../js/checkbox.js');

var _resolveData = require('../js/resolveData.js');

var domTableWrap = document.getElementById('table-wrapper');
var domTableHeadFirst = document.getElementById('table-head-first');
var domTableHeadSecond = document.getElementById('table-head-second');
var domTableBody = document.getElementById('table-body');

//改变table显示
function changeTable(wrapObj) {
	var filter = {};
	for (var key in wrapObj) {
		filter[key] = (0, _resolveData.getFilter)(wrapObj[key]);
	}

	var data = (0, _resolveData.getFilterData)(filter);
	renderTable(data);
}

//渲染表格
function renderTable(data) {
	var html = '';
	var statusObj = (0, _checkbox.getCheckStatus)();

	if (statusObj.status === 2) {
		data = (0, _resolveData.sortData)('region', data);
		domTableHeadFirst.innerText = '地区';
		domTableHeadSecond.innerText = '商品';
	} else {
		data = (0, _resolveData.sortData)('product', data);
		domTableHeadFirst.innerText = '商品';
		domTableHeadSecond.innerText = '地区';
	}

	html = data.reduce(function (html, current, index) {
		html += '<tr>\n\t\t\t\t\t' + addRowSpan(statusObj, current, index) + '\n\t \t\t\t\t<td>' + (statusObj.status === 2 ? current.product : current.region) + '</td>\n\t \t\t\t\t<td>' + current.sale[0] + '</td>\n\t \t\t\t\t<td>' + current.sale[1] + '</td>\n\t \t\t\t\t<td>' + current.sale[2] + '</td>\n\t \t\t\t\t<td>' + current.sale[3] + '</td>\n\t \t\t\t\t<td>' + current.sale[4] + '</td>\n\t \t\t\t\t<td>' + current.sale[5] + '</td>\n\t \t\t\t\t<td>' + current.sale[6] + '</td>\n\t \t\t\t\t<td>' + current.sale[7] + '</td>\n\t \t\t\t\t<td>' + current.sale[8] + '</td>\n\t \t\t\t\t<td>' + current.sale[9] + '</td>\n\t \t\t\t\t<td>' + current.sale[10] + '</td>\n\t \t\t\t\t<td>' + current.sale[11] + '</td>\n \t\t\t\t</tr>';
		return html;
	}, html);
	domTableBody.innerHTML = html;
}

function addRowSpan(statusObj, current, index) {
	var firstTdHtml = '';
	var status = statusObj.status,
	    regionCheckedTotal = statusObj.regionCheckedTotal,
	    productCheckedTotal = statusObj.productCheckedTotal;

	if (status === 2 && index === 0) {
		firstTdHtml += '<td rowspan=' + productCheckedTotal + '>' + current.region + '</td>';
	} else if (status === 3 && index === 0 || status === 4 && index % regionCheckedTotal === 0) {
		firstTdHtml += '<td rowspan=' + regionCheckedTotal + '>' + current.product + '</td>';
	} else if (status === 1) {
		firstTdHtml += '<td>' + current.product + '</td>';
	}
	return firstTdHtml;
}

exports.changeTable = changeTable;

},{"../js/checkbox.js":3,"../js/resolveData.js":4}]},{},[2]);
