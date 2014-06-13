$(document).ready(function($) {
(function(){
	var sessionFile=window.sessionStorage;
	intialize(sessionFile);
    $('body').on('keypress','input',function(event){ 
         var e=window.event ||e;
         var keyunicode=e.charCode || e.keyCode;
         if(keyunicode===13)
      {
        var pattExpwithSpace=/\s[a-z]/i;
        var pattExpwithOutSpace=/[a-z]/i;
        var value=this.value;
        var withSpace=pattExpwithSpace.test(value);
        var withoutSpace=pattExpwithOutSpace.test(value);
        if(withSpace || withoutSpace)
        {
            var dbObj = new DbManager(sessionFile);
	          var count = dbObj.keycount();
	          var value = $("#newItem").val();
            var data =
	          {
               key:count,
               value:value,
               class:"incomplete",
               status:"undone"
	           }
	          var dataItemObj = new DataItem(data,sessionFile);
 	          var dataValues = dataItemObj.getData();
	          var viewObj = new View();
            viewObj.showItem(dataValues);
         }
         this.value="";   
      }
     })
    $('body').delegate('button.destroy','click',function(e){
    	 var task = $(this).parents()[0];
       var key = $(this).parent()[0].id;
    	 task.remove();
    	 var dbObj=new DbManager(sessionFile);
    	 dbObj.removeItemFromDb(key);
    })
    $('.toggleAll').click(function(){
    	$('#itemContainer').toggle();
    })
    $('body').delegate('div.show','click',function(e){
      var mark = $(this).siblings()[0];
      var task = $(this).parents()[0];
      var key = $(this).parent()[0].id; 
      var dbObj = new DbManager(sessionFile);
      if(mark.className==='incomplete')
      {
        $(mark).attr('class','complete');
        dbObj.changeDbitemstatus(key,'complete');
      }
      else
       {
        $(mark).attr( 'class','incomplete');
        dbObj.changeDbitemstatus(key,'incomplete');
       }
       if (task.className==='undone') 
       {
         $(task).attr('class','done');
         dbObj.changeDbitemstatuss(key,'done');
       }
       else
       {
        $(task).attr('class','undone');
        dbObj.changeDbitemstatuss(key,'undone');
       }
     })
    $('body').delegate('button#all','click',function(){
        $('li').show();
    })
    $('body').delegate('button#active', 'click', function(event) {
      $('li').hide();
      $('li.undone').show();
    })
    $('body').delegate('button#showComplete','click',function(event){
        $('li').hide();
        $('li.done').show();
     })
    $('body').delegate('button#clearCompleted','click',function(event){
     var clearCompleted = $(this).parents().find('li');
      var length = clearCompleted.length;

      var key=$(this).parents().find('li');
      var dbObj = new DbManager(sessionFile);
      for(i=0;i<length;i++)
      {
        if(clearCompleted[i].className==="done")
        {
         $(clearCompleted[i]).remove();
         dbObj.removeItemFromDb(key[i].id);
        }
        else{
          $(clearCompleted[i]).show();
        }
      }
    })

})();
function intialize(sessionFile){
  for(var i in sessionFile)
  {
  	      var dataString = sessionFile[i];
  	      var dataObj = JSON.parse(dataString);
  	      var viewObj = new View();
  	      viewObj.showItem(dataObj);
  }
}
  
});