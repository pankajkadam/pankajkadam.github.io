function View(){
}
View.prototype={
	showItem:function(data)
	{
		var template = Handlebars.compile($("#template").html());
		var templateHtml = template(data);
		$("#lists").prepend(templateHtml);
	}
};
