/* 
   script.js 
*/
$( document ).ready(function() {
	//등록번호 확인
	$("#idno").focus(function(event){
		$("#idno").css("background-color", "yellow");
	});

	$("#idno").blur(function(event){
		ajaxGetIdno();
		ajaxGetOpdrpt();
	});

	// enter event
	$('#idno').keydown(function(e) {
    	if (e.keyCode == 13) {
			//$('.fa-search').click()
			//$('#target tbody').remove();
			e.preventDefault();			
			ajaxGetIdno();
			ajaxGetOpdrpt();
			}
	});

	// 진료과 등록
	$("#deptcd").change( function() {
		var dept = $('#deptcd').val();
		var kname = $('#deptcd option:selected').text();
		console.log(kname);
		$('#deptcd2').append("<option  value=" + dept + ">" + kname +  "</options>");
		$('div.depts').append("<input id='depts' type='hidden' name='depts[]' value=" + dept + "><br>");
		$('div.ords').append("<input id='ords' type='hidden' name='ords[]' >");
		$('div.status').append("<input id='status' type='hidden' name='status[]' value='0'>");
	});
	  
	// 진료과 등록
	$("#deptcd2").change( function() {
		var dept = $('#deptcd2').val();
		console.log(dept);
		$('#deptcd2 option').remove();
		$('div.depts').empty();
		$('div.ords').empty();
		$('div.status').empty();
	});
	  
	$('#target').submit(function() { 
		if (!ajaxValidCheck() ) {
			alert('필수 입력 항목을 확인해주세요!!!');
			return false; 
		}
	});
})

//////////////////////////////////////////////////////
// DO GET
function ajaxGetIdno(){
	$.ajax({
		type : "GET",
		url : "/opdrpts/api/opdrpt2/" + $('#idno').val() + "&" + $('#indate').val(),  
		success: function(result){
			$('#name').val(result.name);
			$('#juminA').val(result.juminA);
			$('#juminB').val(result.juminB);
			$('#nationcd').val(result.nationcd);
			$('#address').val(result.address);
			$('#telno').val(result.telno);
			console.log("Success: ", result);
			ajaxGetJumin(result.juminA, result.juminB);
			ajaxGetGubun(result.indate);
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});	
}

// DO GET
function ajaxGetOpdrpt(){
	$.ajax({
		type : "GET",
		url : "/opdrpts/api/opdrpt3/" + $('#idno').val() ,  
		success: function(result){
			$('#table td').remove();
			//console.log("Success: ", result);
			for (var i in result) {
				re = result[i];
				console.log('re', re);
				$('#table tr:last').after("<tr> <td>" + re.indate + "</td> <td>" + re.deptnm + "</td></tr>" );
				console.log
				if($('#indate').val() ==  re.indate ){
					$('#msg').text('당일접수 환자입니다, 확인하여 주십시요');
				}
			}
		},
		error : function(e) {
			//$("#getResultDiv").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}

// DO GET
function ajaxGetJumin(juminA, juminB){
	console.log("Age function", juminA, juminB);
	var birth = juminA;
	var checkJ = juminB;
	cehckJ = checkJ.trim();
	checkG = cehckJ.slice(0,1);  // 성별구분 or 세기 구분
	console.log('birth',birth);
	console.log('checkJ',checkJ);
	console.log('checkG',checkG);

	if (checkG == 1 || checkG == 2 || checkG == 5 || checkG == 6 ) {
		var chdate = "19" + birth.slice(0, 2) + '-' + birth.slice(2, 4) + '-' + birth.slice(4, 6);
		console.log('chdate', chdate);
		var btDate = new Date(chdate);
	} else if (checkG == 3 || checkG == 4 || checkG == 7 || checkG == 8 ) {
		var chdate = "20" + birth.slice(0, 2) + '-' + birth.slice(2, 4) + '-' + birth.slice(4, 6);
		console.log('chdate', chdate);
		var btDate = new Date(chdate);
	}

	/// clear
	var age = getAge(btDate);
	console.log('Age', age);
	$('#age').val(age);

	if (age < 0 ) {
		return 3;
	}

	var gender = getGender(checkG);
	//console.log('gender', gender);
	$('#gender').val(gender);

	return false;
}

function getAge(birthday) {
    var today = new Date();
    var thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - thisYear;
    return age;
}

function getGender(gender) {
	if (gender == 1 || gender == 3 || gender == 5 || gender == 7) {
		return '남';
	} else {
		return '여';
	}
}

// DO GET
function ajaxGetGubun(indate){
	var opdate = $('#indate').val();
	if (opdate == indate) {
		$('#gubun').val('0');
	} else {
		$('#gubun').val('1');
	}
}

// SUMMIT Validation Cehck
function ajaxValidCheck(){
	// return 0 오류 발생
	var idno = $('#idno').val();
	var depts = $('#depts').val();

	console.log("check", depts);

	if (!idno || !depts ) {
		return false;
	} else {
		return true;
	}
}
