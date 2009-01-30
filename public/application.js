soundManager.waitForWindowLoad = true;
soundManager.url = '/soundmanager/'

soundManager.onload = function() {
  var mySound = soundManager.createSound({
      id: 'aSound',
      url: 'https://speechificationaudio.s3.amazonaws.com/BBC7_King_Cutler_17012007.mp3',
      volume: 50
    });
  mySound.play();
};