var porchs = [
	{ number: 1, first_flat: 1, last_flat: 20 },
	{ number: 2, first_flat: 21, last_flat: 64 },
	{ number:3, first_flat: 65, last_flat: 80 },
];

var users = [
	{ login: 'ivan', password: '333', name: 'Ivan' },
	{ login: 'ssss', password: '666', name: 'Petr' },
	{ login: 'gibs', password: '0000', name: 'Petya' }
];

var array = [];

$(document).ready(function(){
	$("#form__years").submit(function(){

		var b_year = $(this).find("input[name='b_year']").val().trim();

		if(b_year == ""){
			alert("Введите год рождения");
			return false;
		}

		b_year = parseInt(b_year);

		if(!b_year){
			alert("Вы ввели год рождения в не корректном формате");
			return false;
		}

		var valid_result = validate__b_year(b_year);
		
		if(valid_result.result == false){
			alert(valid_result.message);
			return false;
		}

		b_year = valid_result.validate_val;
		current_date = new Date();

		var tmp_text = $(this).find("input[name='years_count']").val().split(" ");

		$(this).find("input[name='years_count']").val(tmp_text[0] + " " + (current_date.getFullYear() - b_year) + " лет");

		return false;

	});

	$("#form__nums").submit(function(){

		var form = $(this);
		var first_num = form.find("input[name='first_num']").val().trim();
		var second_num = form.find("input[name='second_num']").val().trim();

		if(first_num == "" || second_num == ""){
			alert("Числа введены не верно");
			return false;
		}

		first_num = parseInt(first_num);
		second_num = parseInt(second_num);

		if(!first_num || !second_num){
			alert("Не вереные входные данные");
			return false;
		}

		var max = (first_num == second_num) ? false : ((first_num > second_num) ? first_num : second_num);

		if(!max)
			form.find("input[name='max_num']").val('Числа равны');
		else
			form.find("input[name='max_num']").val('Максимальное: ' + max);

		return false;

	});

	$("#form__flat").submit(function(){

		var form = $(this);
		var porch_string = "Подъезда с такой квартирой нет"

		var flat_number = form.find("input[type='text']").val().trim();
		flat_number = parseInt(flat_number);

		if(!flat_number){
			alert("Номер квартиры введён не верно!");
			return false;
		}

		porchs.forEach(function(item, index){
			if(flat_number >= item.first_flat && flat_number <= item.last_flat)
				porch_string = "Подъезд: " + item.number;
		});

		$(form).find("input[name='porch_number']").val(porch_string);

		return false;

	});

	$("#form__login").submit(function(){

		var form = $(this);
		var login = form.find("input[name='login']").val().trim();
		var password = form.find("input[name='password']").val().trim();
		var user_string = "Логин или пароль введены не верно!";
		if(login == "" || password == ""){
			alert("Логин или пароль не введён");
			return false;
		}

		users.forEach(function(user, index){
			if(user.login == login && user.password == password)
				user_string = "Добро пожаловать, " + user.name;
		});

		alert(user_string);

		return false;

	});

	$("#form__nums-2").submit(function(){

		var form = $(this);
		var first_num = form.find("input[name='first_num']").val().trim();
		var second_num = form.find("input[name='second_num']").val().trim();
		var third_num = form.find("input[name='third_num']").val().trim();

		if(first_num == "" || second_num == "" || third_num == ""){
			alert("Числа введены не верно");
			return false;
		}

		first_num = parseInt(first_num);
		second_num = parseInt(second_num);
		third_num = parseInt(third_num);

		if(!first_num || !second_num || !third_num){
			alert("Не вереные входные данные");
			return false;
		}

		var max = (first_num > second_num) ? (( first_num > third_num) ? first_num : third_num) : ((second_num > third_num) ? second_num : third_num);

		if(!max)
			form.find("input[name='max_num']").val('Числа равны');
		else
			form.find("input[name='max_num']").val('Максимальное: ' + max);

		return false;

	});

	$("#form__degree").submit(function(){
		var num = $(this).find("input[name='first_num']").val().trim();
		var degree = $(this).find("input[name='second_num']").val().trim();

		if(num == "" || degree == ""){
			alert("Числа введены не верно");
			return false;
		}

		num = parseInt(num);
		degree = parseInt(degree);
		num_in_degree = num;
		if(!num || !degree){
			alert("Не вереные входные данные");
			return false;
		}

		for (var i = 1; i < degree; i++) {
			num_in_degree *= +num;
		}

		alert("Степень: " + num_in_degree);

		return false;

	});

	even_nums();
	reverse();
	sum();
	mull_table();
	mull();
	symbols();


	$("#new_element").submit(function(){

		var form = $(this);
		var index = form.find("input[name='index']").val().trim();
		var value = form.find("input[name='value']").val().trim();

		if(index == "" || value == ""){
			alert("Не верные входные данные!");
			return false;
		}

		index = parseInt(index);


		if(isNaN(index) || isNaN(value)){
			alert("Не вереные входные данные");
			return false;
		}

		array[index] = value;

		console.log(array);

		show_array($("#new"), array);

		return false;
	});

	$("#array_pop").click(function(){
		array.pop();

		show_array($("#new"), array);
		return false;
	});

	$("#array_shift").click(function(){
		array.shift();

		show_array($("#new"), array);
		return false;
	});

	$("#array_push").click(function(){

		var value = $("#for_push").val().trim();

		if(value == ""){
			alert("Значение не введено");
			return false;
		}

		array.push(value);

		show_array($("#new"), array);
		return false;
	});

});


function validate__b_year(b_year){

	if(String(b_year).length == 3 || String(b_year). length > 4)
		return { 'result': false, 'message': "Не верный формат даты!" };

	if(String(b_year).length >= 1 && String(b_year).length <= 2)
		b_year = 2000 + b_year;

	var current_date = new Date();

	if(b_year - current_date.getFullYear() >= 0)
		return { 'result': false, 'message': "Дата не может быть больше либо равна текущей!" };

	return { 'result': true, 'validate_val': b_year };
}


function even_nums(){
	for (var i = 0; i <= 101; i++) {
		if(i % 2 == 0)
			$(".even").append(i + " ");
	}
}

function reverse(){
	for (var i = 200; i >= 0; i--) {
		$(".reverse").append(i + " ");
	}
}

function sum() {
	var sum = 0;
	for (var i = 0; i <= 100; i++) {
		sum += +i;
	}

	$(".sum").append("Сумма: " + sum);
}

function mull_table(){
	var num = 7;
	for (var i = 1; i <= 9; i++) {
		$(".mull-table").append('<span class="line">' + i + ' * ' + num +' = ' + i*num + '</span><br>')
	}
}

function mull() {
	var mull = 1;
	for (var i = 1; i <= 50; i++) {
		mull = mull * i;
	}

	$(".mull").append("Произведение: " + mull);
}

function symbols(){
	for (var i = 1000; i <= 2000; i++) {
		$(".symbols").append("&#" + i + "; ");
	}
}


function show_array(selector, array){
	selector.html("");

	array.forEach(function(item, index){
		selector.append("index - " + index + " item - " + item + "<br><br>");
	});
}