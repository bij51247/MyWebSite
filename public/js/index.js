
var id;
$("a").hover(
  function(){
    $self = $(this);
    id = setInterval(function(){
      $self.fadeOut(500).fadeIn(500);
    },1000);
  },
  function(){
    clearTimeout(id);
  }
);