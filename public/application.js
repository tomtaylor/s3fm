soundManager.url = '/soundmanager/';
soundManager.flashVersion = 9;
soundManager.consoleOnly = true;

soundManager.onload = function() {

  $.getJSON('/radiotom?format=json', function(data) {
    
    // ensures it loops if this sound is the last one
    function playNext(i) {
      if ((i+1) == data.length) {
        soundManager.play('0');
      } else {
        soundManager.play((i+1).toString());
      }
    }
    
    $.each(data, function(i, item) {
      var sound = soundManager.createSound({
        id: i.toString(),
        url: item,
        onfinish: function() {
          playNext(i);
        },
        onload: function() {
          // if there's a load failure, unload and play the next one
          if (this.readyState == 2) {
            this.unload();
            playNext(i);
          }
        }
      });
    });
    
    soundManager.play('0');
  });
  
};

