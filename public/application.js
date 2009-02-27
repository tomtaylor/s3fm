soundManager.url = '/soundmanager/';
soundManager.flashVersion = 9;
// soundManager.consoleOnly = true;
soundManager.debugMode = false;

soundManager.onload = function() {
  
  var currentSound = 0;
  var soundsCount = 0;
  
  $('#playpause-button').click(function() {
    if ($(this).hasClass("playing")) {
      soundManager.pauseAll();
    } else {
      soundManager.resumeAll();
    }
    $(this).toggleClass("playing");
    return false;
  });
  
  $('#fastforward-button').click(function() {
    soundManager.stopAll();
    playNext();
    if (!$('#playpause-button').hasClass("playing")) {
      $('#playpause-button').addClass("playing");
    }
    
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
  
  $.getJSON('/' + station + '?format=json&order=shuffle', function(data) {
    $("#spinner img").show();
    soundsCount = data.length;
  
    $.each(data, function(i, item) {
      var sound = soundManager.createSound({
        id: i.toString(),
        url: item,
        onplay: function() {
          $("#spinner img").hide();
          currentSound = i;
        },
        onfinish: function() {
          this.unload();
          playNext();
        },
        onload: function() {
          $("#spinner img").show();
          // if there's a load failure, unload and play the next one
          if (this.readyState == 2) {
            this.unload();
            playNext();
          }
        },
        onbufferchange: function() {
          if (this.isBuffering == true) {
            $("#spinner img").show();
          } else {
            $("#spinner img").hide();
          }
        }
      });
    });
      
    $('#playpause-button').addClass('playing');
    soundManager.play('0');
  });
};

