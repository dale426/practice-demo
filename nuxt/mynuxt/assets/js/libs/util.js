import util from 'jan-util';
/**
 * 判断是否为正数 包括0
 * @param {number} num 
 * @return {boolean}
 */
util.isPositiveNum = function (num) {
	var type = (/^\d+(?=\.{0,1}\d+$|$)/).test(num);
	return type ? num <= 100000000 : type;
}

util.deepAssign = function (object, arr, val) {
	var _deepAssign = function (field, obj) {
		if (!field) return val;
		if(util.isPositiveNum(field)) {
			if(util.objType(obj) != 'array') obj = [];
		}else if(util.objType(obj) != 'object'){
			obj = {};
		}
		obj[field] = _deepAssign(arr.shift(), obj[field]);
		return obj;
	};
	return _deepAssign(arr.shift(), object);
}

/**
 * 
 * @param {*} date 
 * @param {Number} num 
 */
util.relDate = function(date, num) {
	var day = date.getDate();
	day +=num;
	date.setDate(day);
	return date;
};

/**
 * 截取数值
 * @param {number} decimal 截取的数值
 * @param {number} digit  截取的小数点后的位数，默认为2
 * @param {boolean} isReserve 在不是数值不够的digit情况下是否补充0, 默认为false
 */
util.subdecimal = function (decimal, digit, isReserve) {
	if (!decimal) return decimal;
	digit = digit || 2;
	var arr = (decimal + '').split('.'), str = arr[1];
	if (!str && isReserve) {
		str = new Array(digit).map(val => '0');
	} else if (str && isReserve && digit > str.length) {
		str = str + new Array(digit).map(val => '0');
	}
	if (!str) return arr[0] * 1;
	return (arr[0] + '.' + str.substr(0, digit)) * 1;
};

/**
 * 设置html的标题
 * @param {String} title 
 */
util.title = function (title) {
	title = title || '桔瓣云仓-项目管理';
	window.document.title = title;
};


util.inOf = function (arr, targetArr) {
	let res = true;
	arr.map(item => {
		if (targetArr.indexOf(item) < 0) {
			res = false;
		}
	});
	return res;
};

util.oneOf = function (ele, targetArr) {
	if (targetArr.indexOf(ele) >= 0) {
		return true;
	} else {
		return false;
	}
};

util.showThisRoute = function (itAccess, currentAccess) {
	if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
		return util.oneOf(currentAccess, itAccess);
	} else {
		return itAccess === currentAccess;
	}
};

util.getRouterObjByName = function (routers, name) {
	if (!name || !routers || !routers.length) {
		return null;
	}
	let routerObj = null;
	for (let item of routers) {
		if (item.name === name) {
			return item;
		}
		routerObj = util.getRouterObjByName(item.children, name);
		if (routerObj) {
			return routerObj;
		}
	}
	return null;
};

util.handleTitle = function (vm, item) {
	if (typeof item.title === 'object') {
		return vm.$t(item.title.i18n);
	} else {
		return item.title;
	}
};

util.setCurrentPath = function (vm, name) {
	let title = '';
	let isOtherRouter = false;
	vm.$store.state.app.routers.forEach(item => {
		if (item.children.length === 1) {
			if (item.children[0].name === name) {
				title = util.handleTitle(vm, item);
				if (item.name === 'otherRouter') {
					isOtherRouter = true;
				}
			}
		} else {
			item.children.forEach(child => {
				if (child.name === name) {
					title = util.handleTitle(vm, child);
					if (item.name === 'otherRouter') {
						isOtherRouter = true;
					}
				}
			});
		}
	});
	let currentPathArr = [];
	if (name === 'home_index') {
		currentPathArr = [
			{
				title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
				path: '',
				name: 'home_index'
			}
		];
	} else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
		currentPathArr = [
			{
				title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
				path: '/home',
				name: 'home_index'
			},
			{
				title: title,
				path: '',
				name: name
			}
		];
	} else {
		let currentPathObj = vm.$store.state.app.routers.filter(item => {
			if (item.children.length <= 1) {
				return item.children[0].name === name;
			} else {
				let i = 0;
				let childArr = item.children;
				let len = childArr.length;
				while (i < len) {
					if (childArr[i].name === name) {
						return true;
					}
					i++;
				}
				return false;
			}
		})[0];
		if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
			currentPathArr = [
				{
					title: '首页',
					path: '',
					name: 'home_index'
				}
			];
		} else if (currentPathObj.children.length <= 1 && currentPathObj.children[0].name === 'index' && currentPathObj.name !== 'home') {
			currentPathArr = [
				{
					title: '首页',
					path: '/home',
					name: 'home_index'
				},
				{
					title: currentPathObj.title,
					path: '',
					name: name
				}
			];
		} else {
			let childObj = currentPathObj.children.filter((child) => {
				return child.name === name;
			})[0];
			currentPathArr = [
				{
					title: '首页',
					path: '/home',
					name: 'home_index'
				},
				{
					title: currentPathObj.title,
					path: '',
					name: currentPathObj.name
				},
				{
					title: childObj.title,
					path: currentPathObj.path + '/' + childObj.path,
					name: name
				}
			];
		}
	}
	vm.$store.commit('setCurrentPath', currentPathArr);

	return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
	let pageOpenedList = vm.$store.state.app.pageOpenedList;
	let openedPageLen = pageOpenedList.length;
	let i = 0;
	let tagHasOpened = false;
	while (i < openedPageLen) {
		if (name === pageOpenedList[i].name) {  // 页面已经打开
			vm.$store.commit('pageOpenedList', {
				index: i,
				argu: argu,
				query: query
			});
			tagHasOpened = true;
			break;
		}
		i++;
	}
	if (!tagHasOpened) {
		let tag = vm.$store.state.app.tagsList.filter((item) => {
			if (item.children) {
				return name === item.children[0].name;
			} else {
				return name === item.name;
			}
		});
		tag = tag[0];
		if (tag) {
			tag = tag.children ? tag.children[0] : tag;
			if (argu) {
				tag.argu = argu;
			}
			if (query) {
				tag.query = query;
			}
			vm.$store.commit('increateTag', tag);
		}
	}
	vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
	let len = routers.length;
	let i = 0;
	let notHandle = true;
	while (i < len) {
		if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
			route.replace({
				name: routers[i].children[0].name
			});
			notHandle = false;
			next();
			break;
		}
		i++;
	}
	if (notHandle) {
		next();
	}
};

util.fullscreenEvent = function (vm) {
	vm.$store.commit('initCachepage');
	// 权限菜单过滤相关
	vm.$store.commit('updateMenulist');
	// 全屏相关
};

util.sysUrl = (function () {
	var sysUrl = 'http://sso.kfjuban.com';
	if (process.env.NODE_ENV == 'production') sysUrl = 'http://sso.juban.com';
	return sysUrl
})();
util.layout = function () {
	var url = this.sysUrl;
	window.location.href = url + '/logout?redirectURL=' + window.location.href.split('/#')[0]
}

util.getActBtn = function (vm,key) {
	return vm.$store.state.app.actBtnList.indexOf(key) != -1;
};
export default util;
