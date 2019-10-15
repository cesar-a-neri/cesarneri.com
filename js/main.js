function delay (URL) {
    setTimeout( function() { window.location =  URL}, 700 );
}

$( document ).ready(function() {

$('.exitClick').on("click",function(){
  $("body").addClass("bodyExit");
});

// $('.bodyExitClick').on("click",function(){
//   $("body").addClass("bodyExit");
//   console.log('bodyExiting');
// });


});
