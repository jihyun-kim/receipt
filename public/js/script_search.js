/* 
     script.js 
*/

$( document ).ready(function() {
	$("#query").blur(function(event){
		ajaxGetSearchIdmsts();
	});

	// enter event
	$('#query').keydown(function(e) {
    	if (e.keyCode == 13) {
			//$('.fa-search').click()
			//$('#target tbody').remove();
			e.preventDefault();			
			ajaxGetSearchIdmsts();
		}
	});

	$('.fa-search').click(function(e) {
		ajaxGetSearchIdmsts();
	});

	//$('#target').submit(function() { 
	//	console.log("submit");
	//	//alert($(this).serialize());
	//	if (!ajaxValidCheck() ) {
	//		alert('필수 입력 항목을 확인해주세요!!!');
	//		return false; 
	//	} 
	//});
})

//////////////////////////////////////////////////////
// DO GET
function ajaxGetSearchIdmsts(){
	$.ajax({
		type : "GET",
		url : "/searchs/api/search/" + $('#select').val() + "&" + $("#query").val(),  
			success: function(result){
				$('#target tbody').remove();
				console.log(result);
				result.forEach( function ( idmst, index, array) {
					//console.log(idmst);
					$('#table').append("<tr'>" + 
									"<td>" + idmst.idno + "</td>" + "<td>" + idmst.indate + "</td>" + 
									"<td>" + idmst.name + "</td>" + "<td>" + idmst.juminA + "</td>" + 
									"<td>" + idmst.juminB + "</td>" + "<td>" + idmst.nationcd + "</td>" + 
									"<td>" + idmst.address + "</td>" + "<td>" + idmst.telno + "</td>" + 
									"<td>" + idmst.memo + "</td>" + 
								  "<tr>");
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
	var sleect = $('#select').val();
	var query = $('#query').val();

	if (!select || !query ) {
		return false;
	} else {
		return true;
	}

}
