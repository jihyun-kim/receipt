$( document ).ready(function() {
	// onload
	var today = new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
	$('#today').val(today);
	$('#indate').val(today);
	ajaxGetOnload();

	// GET REQUEST
	$("#in-idno").click(function(event){
		event.preventDefault();
		ajaxGet();
		ajaxGetopdrpt();
		$('#indate.form-control').val(today);

	});
})
//////////////////////////////
// end of onload
//////////////////////////////


// DO GET
function ajaxGetOnload(){
	$.ajax({
		type : "GET",
		url : "/receipts/api/indate/" + $("#indate").val(),
		success: function(result){
			$('#getResultDiv ul').empty();
			$.each(result, function(i, opdord){
				$('#getResultDiv').append("<option> " + opdord.idno + ":" + opdord.kname + ":" + opdord.depts  +  "</option>");
			});
			console.log("Success: ", result);
		},
		error : function(e) {
			$("#getResultDiv").html("<strong>Error!!!</strong>");
			console.log("ERROR: ", e);
		}
	});	
}

// DO GET
function ajaxGet(){
	$.ajax({
		type : "GET",
		url : "/receipts/api/idmst/idno/" + $('#idno').val(),
		success: function(result){
			$('#idno.form-control').val(result.idno);
			$('#cdate').val(result.indate);
			$('#kname').val(result.kname);
			$('#gender').val(result.gender);
			$('#age').val(result.age);
			$('#gubun').val(result.gubun);
			$('#deptcd').val(result.deptcd);
			$('#nationcd').val(result.nationcd);
			$('#jumin').val(result.jumin);
			$('#address').val(result.address);
			$('#telno').val(result.telno);
			//console.log("Success: ", result);
		},
		error : function(e) {
			$("#getResultDiv").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}

// DO GET
function ajaxGetopdrpt(){
	$.ajax({
		type : "GET",
		url : "/receipts/api/opdrpt/idno/" + $('#idno').val(),
		success: function(result){
			$('#getResultDiv ul').empty();
			$.each(result, function(i, opdrpt){
				$('#country .option').append(opdrpt.indate + ":" + opdrpt.depts + ":" + opdrpt.gubuns  +  "<br>");
			});
			//console.log("Success: ", result);
		},
		error : function(e) {
			$("#getResultDiv2").html("<strong>Error!!!</strong>");
			console.log("ERROR: ", e);
		}
	});	
}
