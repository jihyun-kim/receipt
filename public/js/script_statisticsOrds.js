/* 
     script.js 
*/

$( document ).ready(function() {
	$('#query').click(function(e) {
		var year = $('#year').val();
		var month = $('#month').val();
		//console.log('year-month', year, month);
		$('#table tbody').remove();

		// 1) 진료건수
		var url = "/statistics/api/search3/" + year + "&" + month;
		ajaxGetStatistics(url);
		// 2) 환자 남여
		var url = "/statistics/api/search4/" + year + "&" + month;
		ajaxGetStatistics(url);
		// 3) 초재진 
		var url = "/statistics/api/search5/" + year + "&" + month;
		ajaxGetStatistics(url);
		// 4) 처방별 
		var url = "/statistics/api/search6/" + year + "&" + month;
		ajaxGetStatistics(url);
		// 5) 자원봉사 
		var url = "/statistics/api/search7/" + year + "&" + month;
		ajaxGetStatistics(url);
	});
	var tableToExcel=new TableToExcel();
	$('#button1').click(function(e) {
		tableToExcel.render("table");
	});
})

//////////////////////////////////////////////////////
// DO GET
function ajaxGetStatistics(url){
	$.ajax({
		type : "GET",
		//url : "/statistics/api/search3/" + year + "&" + month,  
		url : url , 
			success: function(results){
				//console.log('--results---', results);
				var TotalCnts = new Array(32);
				for(var i=0; i < TotalCnts.length; i++) {
					TotalCnts[i] = 0;
				}
				results.forEach( function ( result, index, array) {
					//console.log('---result---', result);
					var arrayCnts = new Array(result.daysInMonth+1);
					
					for(var i=0; i < arrayCnts.length; i++) {
						arrayCnts[i] = 0;
					}
					result.dayCnts.forEach(function( dayCnt, index, array){
						//console.log('---dayCnt---', dayCnt);
						arrayCnts[dayCnt.day] = dayCnt.cnt;		
						arrayCnts[0] = arrayCnts[0] + dayCnt.cnt;
						TotalCnts[dayCnt.day] = TotalCnts[dayCnt.day] + dayCnt.cnt;		
						TotalCnts[0] = TotalCnts[0] + dayCnt.cnt;		
					});
					//console.log('---arrayCnts---', arrayCnts);
					var StrTd = setTd(arrayCnts);
					//console.log('---StrTd---', StrTd);
					$('#table').append("<tr>" + "<td>" + result.codenm + "</td>"  +  StrTd +  "</tr>"); 
				});
				var StrTd = setTd(TotalCnts);
				//console.log('---Total StrTd---', StrTd);
				$('#table').append("<tr style='font-weight:bold'>" + "<td>" + '합   계' + "</td>" + StrTd +  "</tr>"); 

			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
	});	
}

function setTd(arrayCnts){
	var retStr = '';
	for(var i=0; i< arrayCnts.length; i++) {
		var cnt = arrayCnts[i];
		retStr = retStr + '<td>' + cnt  + '</td>';
	}
	//console.log(retStr);
	return retStr;
}

