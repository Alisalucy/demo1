// JavaScript Document
var utils = {
	// json数据转对象
	toArr:function(str){
		obj = {}
		try{
			// 正常情况下，json数据转对象
			obj = JSON.parse(str)
		}catch(e){
			// 异常情况
			obj = eval(`(${str})`)
		}
		return obj
	},
	// 类数组转数组
	arrTo:function(agu){
		var arr = []
		try{
			// 支持以下方法，改变this指向
			arr = [].slice.call(agu)
		}catch(e){
			// 不支持的情况，用以下push方法
			for(let i=0; i<agu.length; i++){
				arr.push(arr[i])
			}
		}
		return arr
	}
}