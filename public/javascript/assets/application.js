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


/*---------------------------------------*/
/*  TYPED.JS ACTIONS
/*---------------------------------------*/

runningExample = false; 
 
$(document).scroll(function(){
    if($(this).scrollTop()>=$('#start-example').offset().top && runningExample === false){
        runningExample = true;
        runExample();
    }
    else if ($(this).scrollTop()<$('#start-example').offset().top && runningExample === true){
      console.log('being set to false at: ' + $(this).scrollTop());
      runningExample = false;
    }
})

function runExample() {
  console.log('running example: ' + 'runningExample is:' + runningExample);
  $("#example-input").typed({
    strings: ["apples,^1000 pepper,^1000 vegetable oil", "whey,^1000 lactose,^1000 almonds"],
    typeSpeed: 0, 
    startDelay: 200,
    backDelay: 1500,
    backSpeed: 50,
    loop: true,
    // loopCount: 2,
    contentType: 'text',
    preStringTyped: function() { 
      var label = $("#example-input-label").text();

      if (label === "Ingredients to Allow" || label === "") {
        $("#example-input-label").fadeOut(250, function() {
          $("#example-input-label").text("Additional Restrictions");
        });
      }
      else if (label === "Additional Restrictions") {
        $("#example-input-label").fadeOut(250, function() {
          $("#example-input-label").text("Ingredients to Allow");
        });
      }

      $("#example-input-label").fadeIn(250);
    }
  }); 
}

/*---------------------------------------*/
/*  API CALL - BK EXAMPLE SECTION
/*---------------------------------------*/

$("#submit-bk-example").on('click', function(e) {
  e.preventDefault(); // preventing it from going to the top of the page

  var api_request = 'https://gwet5nyzt5.execute-api.us-east-1.amazonaws.com/alpha/restaurants/burger-king/full-menu';

  $.get( api_request, function( data ) {
    console.log(data);
    alert( "Load was performed." );
  });

});

