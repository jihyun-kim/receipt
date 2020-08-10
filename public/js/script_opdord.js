/* 
     script.js 
*/

$( document ).ready(function() {
	// 처방화면 가리기
	$("#tblOrds").hide(); 
	
	//등록번호 확인
	$("#idno").focus(function(event){
		$("#idno").css("background-color", "yellow");
		$("#indate").css("background-color", "yellow");
	});
	$("#indate").blur(function(event){
		ajaxGetIdnoIndate();
	});

	/// 동적으로생성된 테그에 이벤트를 작동하기위해서 
	$(document).on("change", "#depts", function() {
		var val = $("#depts").val();
		console.log(val);
		$("#tblOrds").show();
	});

	$("input[type='checkbox']").on("click", function() {
		var str = $("#target").serialize();
		console.log(str);
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
// DO GET
function ajaxGetIdnoIndate(){
	$.ajax({
		type : "GET",
		url : "/opdords/api/opdord/" + $('#idno').val() + "&" + $("#indate").val(),  
			success: function(result){
			//console.log(result);
			var status = result.status;
			var depts = result.depts;
			//console.log(depts, status, status[0], typeof(status));
			$('div.deptss').append("<select name='depts' id='depts' size="+ depts.length + ">");
			depts.forEach( function (dept, index, array) {
				//console.log(dept, index);
				if (status[index] == "1") {
					$('#depts').append("<option value=" + index + " disabled>" + dept + "</option>");
				}  else {
					$('#depts').append("<option value=" + index + ">" + dept + "</option>");
				}
			});
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});	
}

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
