$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
	for (var i = 0; i <= response.results.length; i++) {
    	document.getElementById('images').innerHTML +=
      "<div id='img'>"+
        "<img src='"+
        response.results[i].imageSource+
        "' data-tags='"+
        response.results[i].eventHallName+
        "'><h2>"+
        response.results[i].eventDateName+
        "</h2>"+
      "<div class='venue' id='venue'>"+
      response.results[i].eventHallName+
      "</div><div class='dateVenue'>| "+
      moment.utc(response.results[i].dateOfShow).format('LLL');
      moment.locale('is');
      +"</div></div>"
    }

(function() { // runnar á sama tíma og $.ajax og virkar því ekki, meiri upplýsingar neðar

  var $imgs = $('#images div img');
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
  });

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
  }).appendTo($buttons);

  $.each(tagged, function(tagName) {
    $('<button/>', {
      text: tagName + ' (' + tagged[tagName].length + ')',
      click: function() {
        $(this)
          .addClass('active')
          .siblings()                 // Þetta á að velja öll element sem eru siblings af img
          .removeClass('active');     // Þetta á að remova .active klasann frá siblingunum, þetta virkar ekki, removar bara img fallinu.
        $imgs
          .hide()
          .filter(tagged[tagName])
          .show();
      }
    }).appendTo($buttons);
  });

}());

  }

});// end $.ajax