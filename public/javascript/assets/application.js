$(function() {

  /*-----------------------------------------------------------------------------------*/
  /*  Anchor Link
  /*-----------------------------------------------------------------------------------*/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
      || location.hostname == this.hostname) {

      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
        return false;
      }
    }
  });

  /*-----------------------------------------------------------------------------------*/
  /*  Tooltips
  /*-----------------------------------------------------------------------------------*/
  $('.tooltip-side-nav').tooltip();
  
});

/*---------------------------------------*/
/*  MAILCHIMP
/*---------------------------------------*/


$('.mailchimp').ajaxChimp({
    callback: mailchimpCallback,
    url: "" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
});

function mailchimpCallback(resp) {
    if (resp.result === 'success') {
        $('.mailchimp-success').fadeIn(1000);
        $('.mailchimp-error').fadeOut(500);
        $('.hide-this').toggle();
    } else if (resp.result === 'error') {
        $('.mailchimp-error').fadeIn(1000);
        $('.mailchimp-success').fadeOut(500);
    }
}
