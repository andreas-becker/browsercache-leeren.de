jQuery(document).ready(function($) {
  $('body').addClass($.browser.platform);
  /* Setzen der Browser-ID im Body-Tag */  
  if ($.browser.chrome) {
    // Chrome
    $('.content-box-chrome').show();
  } else if ($.browser.mozilla) {
    // Firefox
    $('.content-box-firefox').show();
  } else if ($.browser.msie) {
    // IE
    $('.content-box-msie').show();
  } else if($.browser.safari && !$.browser.android) {
    // Safari
    $('.content-box-safari').show();
  } else if($.browser.opera) {
    // Opera
    if(parseInt($.browser.versionNumber) > 35) {
      $('.content-box-opera-2').show();
    } else {
      $('.content-box-opera-1').show();
    }
  } else if($.browser.webkit) {
    // Webkit
    $('.content-box-webkit').show();
  } else {
    // Keiner der oben genannten
    $('.content-box-misc').show();
  }
  $('#feedbackBtn').click(function() {
    $('#feedbackform').toggle();
  });
});
