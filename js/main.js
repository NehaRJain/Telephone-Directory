function validate()
{
	var name=$('#name').val();
	if (name == "") 
	{
		alert("Name must be filled out");
		$( "#insert" ).prop( "disabled", true );
	}
	else{
		$( "#number" ).prop( "disabled", false );
		$( "#insert" ).prop( "disabled", false );
	}
}
function sortTable() {
	var table=$('#display');
	var tbody =$('#results');

	tbody.find('tr').sort(function(a, b) {
		return $('td:eq(1)', a).text().localeCompare($('td:eq(1)', b).text());
	}).appendTo(tbody);
}

function validateNumber(){
	var number=$('#number').val();
	var phoneno = /^\d{10}$/;
	if(!number.match(phoneno)){
		alert("Please Enter 10 digit number");
		$( "#insert" ).prop( "disabled", true );
	}
	else{
		
		$( "#insert" ).prop( "disabled", false );
	}

}

function color(id){

	$('#'+id).css("background-color", "#F4A460");
	setTimeout(function(){
		$('#'+id).css("background-color", "#ffffcc");
		$('#insertSuccess').hide();
		$('#insertUnsuccess').hide();
	},2000);

}

function deleteItem(id){
	$.ajax({
		url : 'db_operations.php',
		type : 'Post',
		dataType : 'json',
		data : {
			action : "delete",
			id : id
		},
		success : function(data) {
			$.each(data,function(index, value) {
				var data=value.data;
				if (data == 1) {
					var selector = "#" + id;
					$(selector).remove();
				}
			});
		}
	});
}

function hideAll() {
	$('#insertForm').hide();
	$('#searchForm').hide();
	$('#display').hide();
	$('#insertSuccess').hide();
	$('#insertUnsuccess').hide();
}

function editOperation(id) 
{
	$('#dialog-form').hide();
	$('#errorName').hide();
	$('#errorNumber').hide();
	var name = $('#editName').val();
	var number = $('#editNumber').val();
	var phoneNumber = /^\d{10}$/;
	if (name == "") {
		$('#errorName').show();
		edit(id, name, number);
	} 
	else if (!number.match(phoneNumber)) {
		$('#errorNumber').show();
		edit(id, name, number);
	} 
	else {
		$.ajax({
			url : 'db_operations.php',
			type : 'Post',
			dataType : 'json',
			data : {
				action : "update",
				id : id,
				name : name,
				number : number
			},
			success : function(data) {
				$.each(data,function(index, value) {
					var data=value.data;
					if (data == 1) {
						var selector = "#" + id;
						var parameter = id + ",\"" + name + "\",\""
						+ number + "\"";
						var html = '<tr id="'+id+'"><td>'
						+ id
						+ "</td><td>"
						+ name
						+ "</td><td>"
						+ number
						+ "</td><td><button onclick='edit("
						+ parameter
						+ ")'>Edit </button></td><td><button onclick='deleteItem("
						+ id + ")'>Delete</button></td></tr>";

						$(selector).replaceWith(html);
						color(id);
						sortTable();
					}
					else{
						$('#editUnsuccess').show();
						edit(id, name, number);
					}
				});

			}

		});
	}
}
function edit(id, oldName, oldNumber) 
{
	$('#editName').val(oldName);
	$('#editNumber').val(oldNumber);
	$('#dialog-form').show();
	$('#btn').click(function(){
		editOperation(id)
	});
}
$(document).ready(function() {

	var selector = '.nav li';

	$(selector).on('click', function(){
		$(selector).removeClass('active');
		$(this).addClass('active');
	});

	view();
	home();
	$('#insertNew').click(function() {
		hideAll();
		$('#insertForm').show();
		$( "#number" ).prop( "disabled", true );
		$( "#insert" ).prop( "disabled", true );
		$('#number').val("");
		$('#name').val("");
	});

	$('#insert').click(function() {
		var name = $('#name').val();
		var number = $('#number').val();
		$.ajax({
			url : 'db_operations.php',
			type : 'Post',
			data : {
				action:"create",
				name: name,
				number: number

			},
			dataType : 'json',
			success : function(data) {
				$.each(data,function(index, value) {
					var id=value.id;
					var selector = "#" + id;

					var parameter = id + ",\"" + name + "\",\""
					+ number + "\"";
					if(id>0){
						var html = '<tr  id="'+id+'"><td>'
						+ id
						+ "</td><td>"
						+ name
						+ "</td><td>"
						+ number
						+ "</td><td><button onclick='edit("
						+ parameter
						+ ")'>Edit</button></td>"
						+"<td><button onclick='deleteItem("
						+ id + ")'>Delete</button></td></tr>";
						$(html).appendTo("#results");
						$('#insertForm').hide();
						$("#display").show();
						$('#insertUnsuccess').hide();
						$('#insertSuccess').show();
						color(id);
						sortTable();
					}
					else{
						$('#insertUnsuccess').show();
					}
				});
			}
		});	
	});
	
	$('#searchCorrect').click(function(){
		$('#insertForm').hide();
		$('#display').show();
		$('#searchForm').show();
	});
});

function home() {
	hideAll();
}

function find() {
	$("#searchName").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#display tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
}

function view() {
	hideAll();
	$('#display').show();
	$.ajax({
		url : 'db_operations.php',
		type : 'Post',
		data : {
			action : "list"
		},
		dataType : 'json',
		success : function(data) {
			$.each(data,function(index, value) {
				var selector = "#" + value.id;
				$(selector).remove();
				var parameter = value.id + ",\""
				+ value.name + "\",\""
				+ value.number + "\"";
				var html = '<tr id="'+value.id+'"><td>'
				+ value.id
				+ "</td><td>"
				+ value.name
				+ "</td><td>"
				+ value.number
				+ "</td><td><button onclick='edit("
				+ parameter
				+ ")'>Edit </button></td><td><button onclick='deleteItem("
				+ value.id
				+ ")'>Delete</button></td></tr>";

				$(html).appendTo("#results");
				sortTable();

			});
		}
	});
}
