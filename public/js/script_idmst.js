/* script.js 
---------------------------------------------------------------- */
/* ////////////////////////////////////////////
	jQuery Code
//////////////////////////////////////////// */
$( document ).ready(function() {
    $("#maxidno").click(function(event){
        event.preventDefault();
        ajaxGetMaxIdmst('0');
	});
    $("#maxidno9").click(function(event){
        event.preventDefault();
        ajaxGetMaxIdmst('9');
	});
	//주민번호 처리
	$("#juminA").focus(function(event){
		$("#juminA").css("background-color", "yellow");
		$("#juminB").css("background-color", "yellow");
	});
	$("#juminB").blur(function(event){
		if (!ajaxCheckJumin()) {
			//alert("RETURN 0 정상");
		} else if (ajaxCheckJumin() == 1) {
			alert("RETURN 1 해당항목을 확인하여 주십시요!");
		} else if (ajaxCheckJumin() == 2) {
			alert("RETURN 2 연령을 확인하여 주십시요!");
		} else if (ajaxCheckJumin() == 3) {
		alert("RETURN 3 성별을 확인하여 주십시요!");
		}
	
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
function ajaxGetMaxIdmst(idnogubun){
	$.ajax({
		type : "GET",
		url : "/idmsts/api/maxidmst/" + idnogubun,
		success: function(result){
            var max = result[0].max;
            max++;
			$('#idno').val(max.toString());
			$('#idnogubun').val(idnogubun);
			console.log("Success: ", result, max);
		},
		error : function(e) {
			$("#getResultDiv").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}

// DO GET
function ajaxCheckJumin(){
	// return 0 정상 , 1 해당항목이 없음, return 2 연령계산오류, 3 성별계산 오류
	var birth = $('#juminA').val();
	var checkJ = $('#juminB').val();
	cehckJ = checkJ.trim();
	checkG = cehckJ.slice(0,1);  // 성별구분 or 세기 구분
	///console.log('birth',birth);
	//console.log('checkJ',checkJ);
	//console.log('checkG',checkG);

	// chekc 1
	if (!birth || !checkJ) {
		return 1; 	
	}	
	if ( birth.length == 6 && checkJ.length > 0 ) {
	} else {
		return 1;
	}

	if (checkG == 1 || checkG == 2 || checkG == 5 || checkG == 6 ) {
		var chdate = "19" + birth.slice(0, 2) + '-' + birth.slice(2, 4) + '-' + birth.slice(4, 6);
		//console.log('chdate', chdate);
		var btDate = new Date(chdate);
		if (isNaN(btDate)) {
			 return 2;
		}
	} else if (checkG == 3 || checkG == 4 || checkG == 7 || checkG == 8 ) {
		var chdate = "20" + birth.slice(0, 2) + '-' + birth.slice(2, 4) + '-' + birth.slice(4, 6);
		//console.log('chdate', chdate);
		var btDate = new Date(chdate);
		if (isNaN(btDate)) {
			 return 2;
		}
	} else {
		return 3;
	}

	/// clear
	var age = getAge(btDate);
	//console.log('Age', age);
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


// SUMMIT Validation Cehck
function ajaxValidCheck(){
	// return 0 오류 발생
	var idno = $('#idno').val();
	var name = $('#name').val();
	var juminA = $('#juminA').val();
	var juminB = $('#juminB').val();
	var nationcd = $('#nationcd').val();

	if (!idno || !name || !juminA || !juminB || !nationcd) {
		return false;
	} else {
		return true;
	}

}
