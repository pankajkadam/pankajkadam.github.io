$("button").bind('click', function(event) {
           var $this=$(this);
           var parentWrapperId = $this.parent().attr("id");
           var floatValue = $this.text();

           if (parentWrapperId == "purpleBoxControls") {
             $('#purple').css('float', floatValue);
             $('#purple h4').html("float :"+floatValue);
           }
           if (parentWrapperId == "redBoxControls") {
             $('#red').css('float', floatValue);
              $('#red h4').html("float :"+floatValue);
           }

       });