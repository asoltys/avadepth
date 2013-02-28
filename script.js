var popUp; 

function OpenCalendar(idname, postBack)
{
	popUp = window.open('Calendar.aspx?formname=' + document.forms[0].name + 
		'&id=' + idname + '&selected=' + document.forms[0].elements[idname].value + '&postBack=' + postBack, 
		'popupcal', 
		'width=165,height=208,left=200,top=250');
}

function SetDate(formName, id, newDate, postBack)
{
	eval('var theform = document.' + formName + ';');
	popUp.close();
	theform.elements[id].value = newDate;
	if (postBack)
		__doPostBack(id,'');
}		
