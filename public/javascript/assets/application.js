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

api_response = {};

$("#submit-bk-example").on('click', function(e) {
  e.preventDefault(); // preventing it from going to the top of the page

  // If 'Start Trolling!' has already been pressed.
  if ($('#loading-contents').hasClass('none')) {
    $.when( $('.bk-container').slideUp() ).then(function() {
      $('#loading-contents').removeClass('none');
      $('#bk-contents').addClass('none');
      $('.bk-container').slideDown();
      $('html, body').animate({
        scrollTop: $("#loading-contents").offset().top
      }, 1000);
    });
  }
  // If this is the first time 'Start Trolling!' was pressed.
  else if (!$(this).hasClass('disabled')) {
    $('.bk-container').slideDown();
    $('html, body').animate({
      scrollTop: $("#loading-contents").offset().top
    }, 1000);
  }

  var api_request = 'https://gwet5nyzt5.execute-api.us-east-1.amazonaws.com/alpha/restaurants/burger-king/full-menu?returnBoth=true&constraints=';

  // adding the form data 
  $(".button-restrictions > input").each(function() {
    if ($(this)[0].checked ) {
      var restriction = $(this).prev().text().toLowerCase();
      api_request += restriction + ",";
    }
  });

  // remove the trailing comma (if applicable)
  if (api_request[api_request.length - 1] === ',') {
    api_request = api_request.substring(0, api_request.length - 1);
  }

  if ($("#additionalRestrictions").val() !== "") {
    var specialConstraints = $("#additionalRestrictions").val().replace(/ /g,'');
    api_request += "&specialConstraints=" + specialConstraints;
  } 

  if ($("#allowIngredients").val() !== "") {
    var allow = $("#allowIngredients").val().replace(/ /g,'');
    api_request += "&allow=" + allow;
  }

  console.log(api_request);

  $.get( api_request, function( data ) {
    console.log(data);
    api_response = data;
    displayData(data);
  });

});

function displayData(results) {

  // making sure the div is empty, so we don't add to previous suggestions for 'trolls'.
  $('#edible > ul').empty();
  $('#not-edible > ul').empty();

  // fill in the card information from the API

  // display results
  console.log(results);
  // $('#bk-paste').append(JSON.stringify(results, 0, 2));
  console.log('edible items legnth is: ' + results);

  for (var i = 0; i < results.edible.items.length; ++i) {
    $('#edible > ul').append('<li onclick="daddyTime(this.firstElementChild.innerHTML)"><a>' + results.edible.items[i].name + '</a><span>More Info</span><br>');
    // if (results.edible.items[i].hasOwnProperty('ingredients')) {
    //   for (var j = 0; j < results.edible.items[i].ingredients.length; j++) {
    //     $('#edible > ul > li').last().append(results.edible.items[i].ingredients[j] + ', ');
    //   }
    // } 
    // if (results.edible.items[i].hasOwnProperty('components')) {
    //   for (var j = 0; j < results.edible.items[i].components.length; j++) { 
    //     $('#edible > ul > li').last().append(results.edible.items[i].components[j] + ', ');
    //   }
    // }
    $('#edible > ul').append('</li>'); 
  }
  $('#edible > ul').append('<h3 class="artist-title">Components</h3>');
  for (var i = 0; i < results.edible.components.length; ++i) {
    $('#edible > ul').append('<li onclick="daddyTime(this.firstElementChild.innerHTML)"><a>' + results.edible.components[i].name + '</a><span>More Info</span><br>');
    // for (var j = 0; j < results.edible.components[i].ingredients.length; j++) {
    //   $('#edible > ul > li').last().append(results.edible.components[i].ingredients[j] + ', ');
    // }
    $('#edible > ul').append('</li>');
  }
  for (var i = 0; i < results['not-edible'].items.length; ++i) {
    $('#not-edible > ul').append('<li onclick="daddyTime(this.firstElementChild.innerHTML)"><a>' + results['not-edible'].items[i].name + '</a><span>More Info</span><br>');
    // if (results['not-edible'].items[i].hasOwnProperty('ingredients') && results['not-edible'].items[i].ingredients.length > 0) {
    //   for (var j = 0; j < results['not-edible'].items[i].ingredients.length; j++) {
    //     $('#not-edible > ul > li').last().append(results['not-edible'].items[i].ingredients[j] + ', ');
    //   }
    // }
    // if (results['not-edible'].items[i].hasOwnProperty('components')) {
    //   for (var j = 0; j < results['not-edible'].items[i].components.length; j++) {
    //     $('#not-edible > ul > li').last().append(results['not-edible'].items[i].components[j] + ', ');
    //   }
    // }
    $('#not-edible > ul').append('</li>');
  }
  $('#not-edible > ul').append('<h3 class="artist-title">Components</h3>');
  for (var i = 0; i < results['not-edible'].components.length; ++i) {
    $('#not-edible > ul').append('<li onclick="daddyTime(this.firstElementChild.innerHTML)"><a>' + results['not-edible'].components[i].name + '</a><span>More Info</span><br>');
    // for (var j = 0; j < results['not-edible'].components[i].ingredients.length; j++) {
    //   $('#not-edible > ul > li').last().append(results['not-edible'].components[i].ingredients[j] + ', ');
    // }
    $('#not-edible > ul').append('</li>');
  }

  // making the slider go up and down while the content fills up.
  if (!$('#loading-contents').hasClass('none')) {
    $.when( $('.bk-container').slideUp() ).then(function() {
      $('#loading-contents').addClass('none');
      $('#bk-contents').removeClass('none');
      $('.bk-container').delay(400).slideDown(1200);
    });
  }

  // changing submit text
  if ($('#submit-bk-example').text() == "Let's eat!") {
    $('#submit-bk-example').text("Find more food!");
  }

}

// the card information (bk example; still)
$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})


// ************** Magnific Popup (for BK example) ********************

function daddyTime(food_name) { 
  var food_obj = {};
  // var ingredients = $(this).siblings()[0];

  console.log("heres the api response");
  console.log(api_response);

  for (var i = 0; i < api_response["edible"]["items"].length; ++i) {
    if (api_response["edible"]["items"][i].name === food_name) {
      food_obj = api_response["edible"]["items"][i];
    }
  }
  for (var i = 0; i < api_response["edible"]["components"].length; ++i) {
    if (api_response["edible"]["components"][i].name === food_name) {
      food_obj = api_response["edible"]["components"][i];
    }
  }
  for (var i = 0; i < api_response["not-edible"]["items"].length; ++i) {
    if (api_response["not-edible"]["items"][i].name === food_name) {
      food_obj = api_response["not-edible"]["items"][i];
    }
  }
  for (var i = 0; i < api_response["not-edible"]["components"].length; ++i) {
    if (api_response["not-edible"]["components"][i].name === food_name) {
      food_obj = api_response["not-edible"]["components"][i];
    }
  }

  console.log(food_obj);

  // populating the card w/info.
  var list = [];
  var ingredient_list = "";
  if (food_obj.hasOwnProperty('ingredients')) {
    list = food_obj['ingredients'];
  } else {
    list = food_obj['components'];
  }
  ingredient_list = list.join(", ");


  // clearing the previous text & updating w/new info
  $("#test-popup").text("");
  $("#test-popup").append('<h3 class="artist-title">' + food_obj.name + '</h3>');
  $("#test-popup").append('<p>' + toTitleCase(ingredient_list) + '</p>');

  $("#dad").click();
}

// stack overflow
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Inline popups
$('#dad').magnificPopup({
  // delegate: 'a', 
  type: 'inline',
  closeBtnInside:true,
  // alignTop:false,
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});


