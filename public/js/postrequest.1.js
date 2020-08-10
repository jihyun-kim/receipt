$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#userForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
		//alert(chknew);
		//if (chknew) {
		//	ajaxPost2();
		//}
	});
       
    function ajaxPost(){
    	// PREPARE FORM DATA
    	var formData = {
    		idno : $("#idno").val(),
    		indate :  $("#indate").val(),
    		depts :  $("#depts").val(),
    		gubuns :  $("#gubuns").val()
		}
		alert(formData["idno"] + formData["indate"] + formData["depts"] + formData["gubuns"]);
		// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "/receipts/insert",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(opdrpt) {
				alert("sucess!!");
			},
			error : function(e) {
				alert("Error!" + e);
				//console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function ajaxPost2(){
    	// PREPARE FORM DATA
    	var formData2 = {
    		idno :    $("#idno").val(),
    		indate :  $("#indate").val(),
    		kname :   $("#kname").val(),
			age :  $("#age").val(),
			gubun : $("#gubun").val(),
			deptcd : $("#deptcd").val(),
			nationcd : $("#nationcd").val(),
			jumin : $("#jumin").val(),
			address : $("address").val(),
			telno : $("telno").val()
    	}
		
		// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "/receipts/insert/idno",
			data : JSON.stringify(formData2),
			dataType : 'json',
			success : function(opdrpt) {
				alert("sucess!!");
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData2();
 
	}
    function ajaxPostNewidno(){
    	// PREPARE FORM DATA
    	var formData = {
    		idno :    $("#idno").val() + 1,
    		indate :  $("#indate").val()
    	}
		
		// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "/receipts/insert/newidno",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(newidno) {
				alert("sucess!!");
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		}); 
	}
	
    function resetData(){
    	$("#idno").val("");
    	$("#indate").val("");
    	$("#depts").val("");
    	$("#gubuns").val("");
	}
	
	function resetData2(){
		$("#idno").val("");
		$("#indate").val("");
		$("#kname").val("");
		$("#age").val("");
		$("#gubun").val("");
		$("#deptcd").val("");
		$("#nationcd").val("");
		$("#jumin").val("");
		$("address").val("");
		$("telno").val("");
	}

})