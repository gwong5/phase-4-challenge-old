console.log('hello from the browser JavaScript')

$(document).ready(function() {
  if ($('.splash')) $('.splash').fadeOut(3000)
  // $(function() {
  //   var COOKIE_NAME = 'splash-page-cookie';
  //   $go = $.cookie(COOKIE_NAME);
  //   if ($go == null) {
  //     $.cookie(COOKIE_NAME, 'test', { path: '/', expires: 6 });
  //     window.location = "/splash.php"
  //   }
  // })
  


}) 
