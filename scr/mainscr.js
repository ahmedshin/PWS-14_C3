// получаем наш город и записываем его в куки
function getMycity() {
	let city = document.getElementById("my_city").value;
	if (city!==""){

	let date = new Date(Date.now() + 86400e3);
	date = date.toUTCString();
	document.cookie =encodeURIComponent('city')+'='+encodeURIComponent(city)+'; expires='+date+'; path=/';

	// console.log(document.cookie)
	
    }
}
// очищаем куки

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;' +
            'expires=Thu, 01-Jan-1970 00:00:01 GMT;' +
            'path=' + '/;' +
            'domain=' + window.location.host + ';' +
            'secure=;';
    }
}

function clearCity() {
	
	window.location.reload()
	// console.log(document.getElementById("my_city").value)
	document.getElementById("my_city").value = '';
	document.querySelector('#input_city').style.display = '';
	document.querySelector('#greeting').style.display = 'none';
	document.querySelector('#save').style.display = '';
	// var cookies = document.cookie.split(";");
	// for (var i = 0; i < cookies.length; i++) {
	// 	var cookie = cookies[i];
	// 	var eqPos = cookie.indexOf("=");
	// 	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	// 	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
	// 	document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	// }
	deleteAllCookies ();
	
}
// сохраняем знчения чекбоксов
function saveOptions(){
	for (let i=0; i<checkbx.length; i++) {
	let element = checkbx[i];
	element.disabled="True"
	}
}

// функция получения  куки 
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		'(?:^|\s)' + name.replace(/([.$?*+\\\/{}|()\[\]^])/g, '\\$1') + '=(.*?)(?:;|$)'));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// получаем значение куки по ключу city и если это значени существует

let nameCity = getCookie('city')
if (nameCity!==undefined){
	document.querySelector('#input_city').style.display = 'none';
	document.querySelector('#greeting').style.display = '';
	document.querySelector('#greeting_text').innerText="Ваш город: "+nameCity;
	document.querySelector('#save').style.display = 'none';
	document.querySelector('#my_city').style.display = 'none';
}

// создаем пустой массив и обходим все элементы формы с тегом input и типом чекбокс
// нажатой галке назначаем 1, а если галки нет, то 0. Далее строим массив из запомненных положений
// также проверяем, нажата ли хоть одна галка. если не нажата, то ничего не делаем
// а если хоть одна галка нажата, то записываем массив в localStorage в виде JSON

let checkbx = document.querySelectorAll("input[type='checkbox']")
console.log(checkbx);

function recChkb(){
const arr = [];
for (let i=0; i<checkbx.length; i++) {
	let element = checkbx[i];
	if (element.checked == true) {
		arr.push(1)
	}
	else {
		arr.push(0)
	}
}
console.log(arr)

// здесь передаем в локальное хранилище именно JSON, чтобы потом не работать со строкой
localStorage.setItem("chk", JSON.stringify(arr))
}

// заводим в переменную значение из локалсторидж по ключу chk, затем проверяем
// если в хранилище по этому ключу есть что-то, то получаем массив
let chk = JSON.parse(localStorage.getItem('chk'))
console.log(chk)
if (chk!==null && chk.indexOf(1)!==-1) {
	freeze_Chk()
	for (let i=0; i<chk.length;i++) {
		elements[i].checked=chk[i]
	}
}



