  $(document).ready(function(){
    $('ul>li').hover(function() {
      /* Stuff to do when the mouse enters the element */
      $(this).find('ul').css('display', 'block');
    }, function() {
      /* Stuff to do when the mouse leaves the element */
      $(this).find('ul').css('display','none');
    });
    
  })
