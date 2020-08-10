$( document ).ready(function() {
	// onload
	var today = new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
	$('#today').val(today);
	$('#indate').val(today);

	var params = $("#today").val();
	ajaxGet2();

	// GET REQUEST
	$("#in-idno").click(function(event){
		event.preventDefault();
		ajaxGet();
		ajaxGetopdrpt();
		$('#indate.form-control').val(today);

	});
	
	// GET REQUEST
	$("#new-idno").click(function(event){
		event.preventDefault();
		ajaxGetNewidno();
		chknew = true;
	});
	
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
	function ajaxGet2(){
		$.ajax({
			type : "GET",
			url : "/receipts/api/users/all/" + params,
			success: function(result){
				$('#getResultDiv ul').empty();
				$.each(result, function(i, user){
					$('#getResultDiv .list-group').append(user.idno + ":" + user.depts  +  "<br>");
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
	function ajaxGetopdrpt(){
		$.ajax({
			type : "GET",
			url : "/receipts/api/opdrpt/idno/" + $('#idno').val(),
			success: function(result){
				$('#getResultDiv ul').empty();
				$.each(result, function(i, opdrpt){
					$('#getResultDiv2 .list-group').append(opdrpt.indate + ":" + opdrpt.depts + ":" + opdrpt.gubuns  +  "<br>");
				});
				//console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv2").html("<strong>Error!!!</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}

	// DO GET
	function ajaxGetNewidno(){
		$.ajax({
			type : "GET",
			url : "/receipts/api/newidno/",
			success: function(result){
				$("#idno").empty();
				$.each(result, function(i, newidno){
					$('#idno').val(newidno.newidno);
					alert(newidno.newidno);
				});
				//if(confirm("정말 등록하시겠습니까 ?") == true){
				//	alert("등록되었습니다");
				//}
				//else{
				//	return ;
				//}
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error!!!</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})