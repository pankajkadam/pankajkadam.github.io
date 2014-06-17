$("button").bind('click', function(event) {
           var $this=$(this);
           var parentWrapperId = $this.parent().attr("id");
           var floatValue = $this.text();

           if (parentWrapperId == "darkblueBoxControls") {
             $('#darkblue').css('float', floatValue);
             $('#darkblue h4').html("float :"+floatValue);
           }
           if (parentWrapperId == "darkpinkBoxControls") {
             $('#darkpink').css('float', floatValue);
              $('#darkpink h4').html("float :"+floatValue);
           }

       });