// 1.获取json数据

var data = null  // 存取json字符
var xhr = new XMLHttpRequest()
xhr.open("get","./json/data.json",false)
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status){
		// 这样写有兼容问题
		//data = JSON.parse(xhr.responseText)
		data = utils.toArr(xhr.responseText)
	}
}
xhr.send()
console.log(data)


// 2.把获取的数据添加到页面中
var uls = document.getElementById("uls")

function myappend(data){
	var str = ""
	for(let i=0; i<data.length; i++){
		str += `<li price="${data[i].price}" hot="${data[i].hot}" time="${data[i].time.toString().replace(/-/g,"")}">
			<div class="img"><img src="${data[i].picImg}"></div>
			<div class="title">${data[i].title}</div>
			<div class="price">价格<span>￥${data[i].price}</span></div>
			<div class="hot">评价：<span>${data[i].hot}</span></div>
			<div class="time">上架时间：<span>${data[i].time}</span></div>
			</li>`
		uls.innerHTML = str
	}
}
myappend(data)

// 3.排序

// 通过dom元素操作，把从页面中获取的Li类数组转换为数组。再给li添加自定义属性。通过sort方法然后排序。
var btn = document.querySelectorAll("dd")// 获取点击元素

var lis = uls.children // 获取所有li标签
var liArr = utils.arrTo(lis) // 把获取的li转成数组
//console.log(liArr)
//  存取li属性
var getliattr = ["price","hot","time"]
var flag = true

for(let i=0; i<btn.length; i++){
	btn[i].onclick = function(){
		var frag = document.createDocumentFragment()
		if(flag){
			liArr.sort((a,b) => {
			return	a.getAttribute(getliattr[i]) - b.getAttribute(getliattr[i])
			})
			flag = false
		
		}else{
			liArr.sort((a,b) => {
			return	b.getAttribute(getliattr[i]) - a.getAttribute(getliattr[i])
			})
			flag = true
		}
		liArr.forEach((item) =>{
			frag.appendChild(item)
		})
		uls.appendChild(frag)
		frag = null
	}
	
}







