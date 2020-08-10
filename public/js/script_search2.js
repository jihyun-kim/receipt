/* 
     script.js 
*/

$( document ).ready(function() {
	$('tr:odd').css('background', '#00CED1');  //DarkTurquoise 
	$('tr:even').css('background', '#8FBC8F'); //DarkSeaGreen 
	$('tr:first').css('background', '#8A2BE2').css('color', '#FFFFFF'); //blueViolet
	addSerialNumber();

	// Start
	c();

	$('#query').click(function(e) {
		ajaxGetSearchIdmsts();
	});

	//setInterval(ajaxGetSearchIdmsts, 5000);
	setInterval(function(){
		c();
		ajaxGetSearchIdmsts();
	}, 15000);


})

var addSerialNumber = function () {
    //var i = 1;
    $('table tr').each(function(index) {
        $(this).find('td:nth-child(1)').html(index);
    });
};

function c(){
	var n=$('.c').attr('id');
    var c=n;
	$('.c').text(c);
	setInterval(function(){
		c--;
		if(c>=0){
			$('.c').text(c);
		}
        if(c==0){
            $('.c').text(n);
        }
	},1000);
}


//////////////////////////////////////////////////////
// DO GET
function ajaxGetSearchIdmsts(){
	$.ajax({
		type : "GET",
		url : "/searchs/api/search2/" + $('#indate').val() + "&" + $("#select").val(),  
			success: function(result){
				$('#table tbody').remove();
				//console.log(result);
				result.forEach( function ( idmst, index, array) {	
					$('#table').append("<tr'>" + 
									"<td align='center'></td><td align='center'>" + idmst.idno + "</td>" + "<td align='center'>" + idmst.name + "</td>" + 
									"<td align='center'>" + idmst.deptnm + "</td>" + "<td align='center'>" + idmst.statusnm + "</td>" + 
								  "</tr>");
				});
				$('tr:odd').css('background', '#00CED1');  //DarkTurquoise 
				$('tr:even').css('background', '#8FBC8F'); //DarkSeaGreen 
				$('tr:first').css('background', '#8A2BE2').css('color', '#FFFFFF');
				addSerialNumber();
					
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
	});	
}
