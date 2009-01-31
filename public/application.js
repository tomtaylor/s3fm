soundManager.url = '/soundmanager/';
soundManager.flashVersion = 9;
soundManager.consoleOnly = true;

soundManager.onload = function() {
  
  var currentSound = 0;
  var soundsCount = 0;
  
  $('#playpause-button').click(function() {
    if ($(this).hasClass("playing")) {
      soundManager.pauseAll();
      $(this).children('img').attr('src', '/images/player_play.png');
    } else {
      soundManager.resumeAll();
      $(this).children('img').attr('src', '/images/player_pause.png');
    }
    $(this).toggleClass("playing");
    return false;
  });
  
  $('#next-button').click(function() {
    soundManager.stopAll();
    playNext();
    return false;
  });
  
  
  
  // ensures it loops if this sound is the last one
  function playNext(i) {
    if ((currentSound + 1) == soundsCount) {
      soundManager.play('0');
    } else {
      soundManager.play((currentSound + 1).toString());
    }
  }
  
  $.getJSON('/' + station + '?format=json', function(data) {
  
    soundsCount = data.length;
  
    $.each(data, function(i, item) {
      var sound = soundManager.createSound({
        id: i.toString(),
        url: item,
        onplay: function() {
          currentSound = i;
        },
        onfinish: function() {
          playNext();
        },
        onload: function() {
          // if there's a load failure, unload and play the next one
          if (this.readyState == 2) {
            this.unload();
            playNext();
          }
        }
      });
    });
      
    $('#playpause-button').children('img').attr('src', '/images/player_pause.png');
    $('#playpause-button').addClass('playing');
    soundManager.play('0');
  });
};

