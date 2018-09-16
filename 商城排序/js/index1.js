/*
* @Author: 黎明
* @Date:   2018-09-10 15:59:10
* @Last Modified by:   黎明
* @Last Modified time: 2018-09-10 22:14:53
*/
~function(){
	// 1 获取数据
var result = null;
var xhr = new XMLHttpRequest();
xhr.open("get","json/data.json",false);
xhr.onreadystatechange = function  (argument) {
	if(xhr.readyState === 4 && xhr.status == 200){
		result = utils.toArr(xhr.responseText);
		//result = xhr.responseText 获取的是字符串
	}
}
xhr.send(null);
console.log(result)

// 2.数据绑定
var uls = document.getElementById("uls");
var str = "";
result.forEach(function (item,index) {
	str += `<li data-price="${item.price}" data-hot="${item.hot}" data-time="${item.time}">
		<div class="img">
			<img src="${item.picImg}">
		</div>
		<div class="title">${item.title}</div>
		<div class="price">价格<span>￥${item.price}</span></div>
		<div class="hot">评价：<span>${item.hot}</span></div>
		<div class="time">上架时间：<span>${item.time}</span></div>
	</li>`
})
uls.innerHTML = str;
}();


// 3.排序
// sort 原理  每次拿出数组的当前项与后一项，每次这拉的操作才会让传递的
// 匿名函数执行一次，不仅执行，而且还给这个匿名函数传递了两个实参
// a当前项  b后一项
// a>b返回一个大于0的数
// a<=b 返回一个小于等于0的数

// 价格升序排序
~function(){
	var uls = document.getElementById("uls");
	var listbox = uls.getElementsByTagName("li");
	listArr = utils.arrTo(listbox);
	var btn = document.getElementById("btn"); // 按钮盒子
	var dd = btn.getElementsByTagName("dd"); // 每一个按钮

	// 3.7 遍历所有的按钮
	for(var i=0; i<dd.length; i++){
		// 3.8记录当前项的索引
		dd[i].index = i;
		// 3.5添加一个自定义属性，实现升序还是降序
		dd[i].method = -1; 
		dd[i].onclick = function (argument) {
		this.method *= -1;
			// 3.6 改变changelist()的this指向
			changelist.call(this);

		}

	}
	

	// 3.4 放到一函数里，好调用 
	function changelist(){
		// 3.10 点击当前A，我们需要把其它的A的method回归初始值,这样保证
		// 下一次在点击其它的A标签还是从升序开始的
		for(var k=0; k<dd.length; k++){
			if(k !== this.index){
				dd[k].method = -1;
			}
			
		}
		// 3.9 利用自定义属性存储当前的属性值
		var index = this.index;
		var attr = "";
		switch(index){
			case 0:
			attr = "data-price";
			break;

			case 1:
			attr = "data-hot";
			break;

			case 2:
			attr = "data-time";
			break;
		}
		// 3.1给元素添加一个自定义属性，后续的某些操作中如果需要用到这些值 ，
		// 直接的从自定义属性中获取即可
		listArr.sort((a,b)=>{
			

			var cur = a.getAttribute(attr);
			var next = b.getAttribute(attr);
			// 时间需要去除中间的 - 才可以
			if(index == 2){
				cur = cur.replace(/-/g,"");
				next = next.replace(/-/g,"");
			}
			return (cur - next)*this.method;
		})

		// 3.3创建一个文档碎片（一个临时存储dom元素的容器）
		var frg = document.createDocumentFragment(); 
		// 3.2 
		listArr.forEach((item)=>{
		// 由于dom的映射机制，我们在jd中把某一个li元素对象（与页面中的Li标签一一映射
		// )追加到容器的末尾，相当于把页面中的映射的标签挪到容器的末尾，所以不是新增而
		// 是位置的改变
			frg.appendChild(item);
		// 循环完成之后，把当前文档碎片中的内容统一一次性添加到页面中（只触发一次dom回流）
		
		})

		uls.appendChild(frg);
		frg = null;

	}
	
	
}()
