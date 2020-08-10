/* 
     script.js 
*/

$( document ).ready(function() {
	$('#query').click(function(e) {
		var year = $('#year').val();
		var month = $('#month').val();
		console.log('year-month', year, month);
		ajaxGetStatistics(year, month);
	});
	var tableToExcel=new TableToExcel();
	$('#button1').click(function(e) {
		tableToExcel.render("table");
	});
})

//////////////////////////////////////////////////////
// DO GET
function ajaxGetStatistics(year, month){
	$.ajax({
		type : "GET",
		url : "/statistics/api/search/" + year + "&" + month,  
			success: function(results){
				$('#table tbody').remove();
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
					$('#table').append("<tr>" + "<td align='center'>" + (index + 1)  + "<td>" + result.deptnm + "</td>"  +  StrTd +  "</tr>"); 
				});
				var StrTd = setTd(TotalCnts);
				//console.log('---Total StrTd---', StrTd);
				$('#table').append("<tr style='font-weight:bold'>" + "<td>" + ' ' + "<td>" + '합   계' + "</td>" + StrTd +  "</tr>"); 

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

