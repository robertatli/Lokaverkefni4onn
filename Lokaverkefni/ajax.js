$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
    
    
	for (var i = 0; i <= response.results.length-1; i++) {
    	document.getElementById('images').innerHTML +=
      "<a id='img' data-tags='"+
        response.results[i].eventHallName+"'>"+
        "<img src='"+
        response.results[i].imageSource+
        "'><h2>"+
        response.results[i].eventDateName+
        "</h2>"+
      "<div class='venue' id='venue'>"+
      response.results[i].eventHallName+
      "</div><div class='dateVenue'>"+
      moment.utc(response.results[i].dateOfShow).format('LLL');
      moment.locale('is');
      +"</div></a>";
    } //  end for loop
console.log(response);
  var $imgs = $('#images a');
  var $buttons = $('#buttons');
  var tagged = {};

  $imgs.each(function() {
    var img = this;
    var tags = $(this).data('tags');

    if (tags) {
      tags.split(',').forEach(function(tagName) {
        if (tagged[tagName] == null) {
          tagged[tagName] = [];
        }
        tagged[tagName].push(img);
      });
    }
  });// end $imgs.each function

  $('<button/>', {
    text: 'Show All',
    class: 'active',
    click: function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $imgs.show();
    }
  }).appendTo($buttons);// end show all button

  $.each(tagged, function(tagName) {
    $('<button/>', {
      text: tagName + ' (' + tagged[tagName].length + ')',
      click: function() {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
        $imgs
          .hide()
          .filter(tagged[tagName])
          .show();
      }
    }).appendTo($buttons);
  }); //  end $.each tagged function

  }// end success response

});// end $.ajax