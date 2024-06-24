/* 
     script.js 
*/
// 우클릭 '다시 읽어오기'
$(document).on('mousedown', function() {
	if ((event.button == 2) || (event.which == 3)) {
		console.log('right click');
		location.reload();
	  }
});
$(document).on('contextmenu', function() {
	return false;
});

$( document ).ready(function() {
	// 처방화면 가리기
	//$("#tblOrds").hide(); 
	$('tr:odd').css('background', '#00CED1');  //DarkTurquoise 
	$('tr:even').css('background', '#8FBC8F'); //DarkSeaGreen 
	$('tr:first').css('background', '#8A2BE2').css('color', '#FFFFFF'); //blueViolet
	addSerialNumber();
	
	$('#table1 tr').click(function(){
		orderClear();
		//alert($(this).text());
		$(this).toggleClass("highlight");
		var str = "";
		var tdArr = new Array();
		var tr = $(this);
		var td = tr.children();
		// tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
		console.log("클릭한 Row의 모든 데이터 : "+tr.text());
		// 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
		td.each(function(i){
			tdArr.push(td.eq(i).text());
		});
		console.log("배열에 담긴 값 : "+tdArr)
		// td.eq(index)를 통해 값을 가져올 수도 있다.
		var idno = td.eq(1).text();
		var indate = td.eq(2).text();
		var deptcd = td.eq(3).text();
		var dept_ix = td.eq(4).text();
		var ords = td.eq(5).text();
		var status = td.eq(6).text();
		var name = td.eq(7).text();
		var deptnm = td.eq(8).text();
		console.log(idno, indate, deptcd, dept_ix, ords, status, name, deptnm);
		$('#idno').val(idno);
		$('#name').val(name);
		$('#indate').val(indate);
		//$('#deptcd').val(deptcd);
		$('#deptcd').val(deptnm);
		$('#depts').val(dept_ix);
		$('#ords').val(ords);
		$('#status').val(status)
		orderUpdate(ords);
		//$('#drug-order').val('2')
	});

	//$("input[type='checkbox']").on("click", function() {
	//	var str = $("#tblOrds").serialize();
	//	//console.log('seialize---', str);
	//	//alert('seialize---', str);
	//});

	$('#openForm').click(function(){
		document.getElementById("myForm").style.display = "block";
		ajaxGetConditions();
	});
	$('#closeForm').click(function(){
		document.getElementById("myForm").style.display = "none";
		console.log('--check sortKey--', $('#sortKey').val());
		ajaxPostConditions();
	});

	$('#target').submit(function() { 
		//alert($(this).serialize());

		if (!ajaxValidCheck() ) {
			alert('필수 입력 항목을 확인해주세요!!!');
			return false; 
		}
	});
})

//////////////////////////////////////////////////////

// SUMMIT Validation Cehck
function ajaxValidCheck(){
	// return 0 오류 발생
	var idno = $('#idno').val();
	var indate = $('#indate').val();

	if (!idno || !indate ) {
		return false;
	} else {
		return true;
	}

}

function orderUpdate(ords){
	var Obj = JSON.parse(ords)
	console.log(Obj);	

	for (var property in Obj) {
		if (property == 'drug-order') {
			$('#drug-order').val(Obj[property]);
		}
		if (property == 'drug-pastille') {
			$('#drug-pastille').val(Obj[property]);
		}
		if (property == 'nurse-treatment') {
			$('#nurse-treatment').val(Obj[property]);
		}
		if (property == 'nurse-injection') {
			$('#nurse-injection').val(Obj[property]);
		}
		if (property == 'nurse-operation') {
			$('#nurse-operation').val(Obj[property]);
		}
		if (property == 'dentist-xray') {
			$('#dentist-xray').val(Obj[property]);
		}
		if (property == 'dentist-procedure') {
			$('#dentist-procedure').val(Obj[property]);
		}
		if (property == 'dentist-scaling') {
			$('#dentist-scaling').val(Obj[property]);
		}
		if (property == 'dentist-extraction') {
			$('#dentist-extraction').val(Obj[property]);
		}
		if (property == 'rediation-reading') {
			$('#rediation-reading').val(Obj[property]);
		}
		if (property == 'rediation-shooting') {
			$('#rediation-shooting').val(Obj[property]);
		}
		if (property == 'ultrasonic-stomach') {
			$('#ultrasonic-stomach').val(Obj[property]);
		}
		if (property == 'ultrasonic-gynecologist') {
			$('#ultrasonic-gynecologist').val(Obj[property]);
		}
		if (property == 'ultrasonic-tyroid') {
			$('#ultrasonic-tyroid').val(Obj[property]);
		}
		if (property == 'ultrasonic-heart') {
			$('#ultrasonic-heart').val(Obj[property]);
		}
		if (property == 'ultrasonic-other') {
			$('#ultrasonic-other').val(Obj[property]);
		}
		if (property == 'pathology-itself') {
			$('#pathology-itself').val(Obj[property]);
		}
		if (property == 'pathology-ekg') {
			$('#pathology-ekg').val(Obj[property]);
		}
		if (property == 'pathology-other') {
			$('#pathology-other').val(Obj[property]);
		}
		if (property == 'pathology-request') {
			$('#pathology-request').val(Obj[property]);
		}
		if (property == 'pathology-other2') {
			$('#pathology-other2').val(Obj[property]);
		}
	}
}

function orderClear(){
	$('#drug-order').val(0);
	$('#drug-pastille').val(0);
	$('#nurse-treatment').val(0);
	$('#nurse-injection').val(0);
	$('#nurse-operation').val(0);
	$('#dentist-scaling').val(0);
	$('#dentist-extraction').val(0);
	$('#rediation-reading').val(0);
	$('#rediation-shooting').val(0);
	$('#ultrasonic-stomach').val(0);
	$('#ultrasonic-gynecologist').val(0);
	$('#ultrasonic-tyroid').val(0);
	$('#ultrasonic-heart').val(0);
	$('#ultrasonic-other').val(0);
	$('#pathology-itself').val(0);
	$('#pathology-ekg').val(0);
	$('#pathology-other').val(0);
	$('#pathology-request').val(0);
	$('#pathology-other2').val(0);
}

var addSerialNumber = function () {
    //var i = 1;
    $('#table1 tr').each(function(index) {
        $(this).find('td:nth-child(1)').html(index);
    });
};


// DO GET
function ajaxGetConditions(){
	var uid = $('#uid').val();
	console.log('---uid--', uid)
	$.ajax({
		type : "GET",
		url :  "/conditions/api/edit/" + "AA001" + "&" + uid , 
			success: function(results){
				console.log('--results---', results, results.rules);
				var ruleObj = JSON.stringify(results.rules);
				$('#rules').val(ruleObj);
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
	});	
}

// DO POST
function ajaxPostConditions(){
	var seleDate = $('#seleDate').val();
	var dispKey = $('#dispKey').val();
	var sortKey = $('#sortKey').val();
	console.log('--setup--', seleDate, dispKey, sortKey);
	var strObj = '{ "indate":"' + seleDate + '", "dispKey":"' + dispKey + '", "sortKey":"' + sortKey +'"}';
	console.log('strObj', strObj);
	$('#rules').val(strObj);
	var ruleObj = $('#rules').val();
	var ObjData = JSON.parse(ruleObj);
	var uid = $('#uid').val();
	console.log('---uid--', uid)
	console.log('ruleObj', ruleObj, 'ObjData', ObjData);
	$.ajax({
		type : "POST",
		url :  "/conditions/api/edit/" + "AA001" + "&" + uid , 
		dataType : 'json',
		data : ObjData,
			success: function(data){
				console.log('--data---', data);
				//var ruleObj = JSON.stringify(results.rules);
				//$('#rules').val(ruleObj);
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
	});	
}