(function() {
  function SongPlayer() {
    /**
    * @desc SongPlayer
    * @type {Object}
    */
    var SongPlayer = {};
    /**
    * @desc currentSong
    * @type {Object}
    */
    var currentSong = null;
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
    * @function playSong
    * @desc plays audio file as currentBuzzObject
    * @param {Object} song
    */
    var playSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    };

      /**
      * @function SongPlayer.play
      * @desc if currently playing song is not song user clicks on, stops currently playing, sets new audio file as currentBuzzObject, and plays song; if currently playing song is song user clicks on and song paused, plays audio file as currentBuzzObject
      * @param {Object} song
      */
      SongPlayer.play = function(song) {
        if (currentSong !== song){
          setSong(song);
          playSong(song);
        } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
      };

      /**
      * @function SongPlayer.pause
      * @desc pauses audio file set as currentBuzzObject
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
      };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
