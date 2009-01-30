soundManager.url = '/soundmanager/';
soundManager.flashVersion = 9;

soundManager.onload = function() {

  $.getJSON('/radiotom?format=json', function(data) {
    $.each(data, function(i, item) {
      var sound = soundManager.createSound({
        id: i.toString(),
        url: item,
        onfinish: function() {
          // play the next id, unless it's the last one, in which case play the first
          if ((i+1) == data.length) {
            soundManager.play('0');
          } else {
            soundManager.play((i+1).toString());
          }
        }
      });
    });
    
    soundManager.play('0');
  });
  
};

