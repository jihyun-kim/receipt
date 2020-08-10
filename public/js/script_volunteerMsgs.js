/* 
     script.js 
*/

$( document ).ready(function() {
	$('tr:first').css('background', '#8A2BE2').css('color', '#FFFFFF'); //blueViolet
	
    // 1) 자원봉사코드 읽어오기
    ajaxGetVolunteers();

	$('#target').submit(function() { 
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

// SUMMIT Validation Cehck
function ajaxGetVolunteers(url){
	$.ajax({
		type : "GET",
		url : "/volunteerMsgs/api/search1/" , 
		success: function(results){
			//console.log('--results---', results);
			$('#table tbody').remove();
			results.forEach( function ( result, index, array) {
				//console.log('---result---', result);
				var StrTd = setTd(result);
				//console.log('---StrTd---', StrTd);
				$('#table').append("<tr>" +  StrTd +  "</tr>"); 
			});
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});	
}

function setTd(result){
    var retStr = '';
    
	retStr = retStr + '<td>' + result.vcode  + '</td>';
	retStr = retStr + '<td>' + result.gubun  + '</td>';
    retStr = retStr + '<td>' + result.detail  + '</td>';
    retStr = retStr + '<td>  <input type="number" name="'  + result.vcode + '" size="10" style="width:100%;" value="0">  </td>';
	
	return retStr;
}
