// 订阅发布函数
var Events = {
	clientList: [], // 事件列表
	// 添加事件方法
	listen: function (key, fn) {
		if (!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},
	// 触发事件
	trigger: function () {
		// 获取第一个参数
		var key = Array.prototype.shift.call(arguments);
		// 获取对应key的事件列表
		var fns = this.clientList[key];
		// 如果没有订阅的事件返false
		if (!fns || fns.length === 0) {
			return false;
		}
		// 循环调用订阅的事件
		for (let i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	}
}
// 给对象动态添加发布订阅功能
var installEvemt = function (obj) {
	for (var i in Events) {
		obj[i] = Events[i];
	}
}

// 测试， 给对象添加发布订阅功能

var salesOffices = {};
installEvemt(salesOffices);

// 添加订阅事件 A
salesOffices.listen('squareMeter88', fn1 = function (price) {
	console.log('价格=', price);
})
// 添加订阅事件 B
salesOffices.listen('squareMeter100', fn2 = function (price) {
	console.log('价格=', price);
})

salesOffices.trigger('squareMeter88', 88888);
salesOffices.trigger('squareMeter100', 100000);

Events.remove = function (key, fn) {
	// 获取到订阅的事件
	var fns = this.clientList[key];
	if (!fns) {
		return false;
	}
	// 如果没有传入具体的回调函数，表示取消key对应的所有订阅事件
	if (!fn) {
		fns && (fns.length = 0);
	} else {
		// 遍历事件列表删除指定的订阅事件
		for (var l = fns.length - 1; l > 0; l--) {
			if (fn === fns[l]) {
				fns.splice(l, 1); // 删除指定的订阅函数
			}
		}
	}
}