//To determine if the webpage (document) is "ready" or fully loaded
//then will execute the functions
$(document).ready(function(){

	//add log
	//jQuery will detect if button with ID "addBut" is clicked, then execute the function
	$('#addBut').click(function(){

		//empty is to remove the content at the div choosen
		//in this case it will clear all the errors notification
		$('#errAct').empty();
		$('#errTime').empty();
		$('#errDate').empty();
		$('#status').empty();

		var add = "option=add&"+$('#addForm').serialize();

		if(($('#actbox').val() != "") && ($('#datebox').val() != "") && ($('#timebox').val() != "")) //check if not empty
		{
			//jQuery POST function. will send data from input form to PHP using POST just like $_POST
			$.post("process.php" , add , function(data){

					var stattext = "<b><font color='lime' size='4'>Success</font></b>"
					$('#status').append(stattext).hide().fadeIn('slow'); //append is to add success status to the page
					//empty all input
					$('#actbox').val("");
					$('#datebox').val("");
					$('#timebox').val("");

			});
		}
		else
		{
			//form error handling. return error if the fields are empty
			var stattext = "<b><font color='red' size='4'>Error. Please complete all fields.</font></b>"
			var errBox = "<font color='red' size='1'>Required</font>";
			//append is to add error status to the page
			$('#errAct').append(errBox).hide().fadeIn('slow');
			$('#errTime').append(errBox).hide().fadeIn('slow');
			$('#errDate').append(errBox).hide().fadeIn('slow');
			$('#status').append(stattext).hide().fadeIn('slow');
		}


	});

	//count text and display current char count, show warning and disable submit when reached limit
	$('#actbox').keyup(function () {
	  var max = 250;
	  var len = $(this).val().length;

	  if (len >= (max-10) && len <= max) {
		 var char = max - len;
		$('#charNum').html("<font color='red'>"+char + " characters left</font>");
		$('#addBut').prop('disabled', false);
	  }
	  else if (len >= max) {
		 var char = max - len;
		$('#charNum').html("<font color='red'>"+char + " you have reached the limit</font>");
		$('#addBut').prop('disabled', true);
	  }
	  else {
		var char = max - len;
		$('#charNum').text(char + ' characters left');
		$('#addBut').prop('disabled', false);
	  }

	});

	//view log
	//jQuery will detect if the input Date value is change, it will execute function
	//there is no need to press submit button anymore
	$('input').on("change",function(){

		$('#showLog').empty();

		var view = "option=view&"+$('#viewLog').serialize();
		 //jQuery POST function send request to PHP
		$.post("process.php" , view , function(data){

				//append the data received from the PHP to the webpage. will add to the <div id="showLog"></div> in view.php
				$('#showLog').append(data).hide().fadeIn('slow');

		});

	});

	//hide reponsive table div element when print, so that the content will fit to A4 when print
	$(document).on("click","#printBut",function(){
		//remove responsive class attribute
		$('#responsivetablediv').removeAttr("class");

		//open print window
		window.print();

		//after open print window, add back the responsive class
		$("#responsivetablediv").addClass('box-body table-responsive');
	});

	//mobile view
	if (($('#desktopTest').is(':hidden')) && ($('.navbar-toggle').attr('data-toggle') != "collapse")) {
		// device is == eXtra Small
	} else {
		// device is >= SMaller
		for(var i=0;i<2;i++)
		{
			$('.navbar-toggle').click();
		}
	}


});
