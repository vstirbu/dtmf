var DTMF = (function (undefined) {
  var context,
      lows = [697, 770, 852, 941],
      highs = [1209, 1336, 1477],
      keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      toneIndex = 0, // tone counter, incremented with each tone played
      _dtmfs = [], // array of active AudioNodes
      _tones = []; // array of active tone indices
  
  try {
    context = new webkitAudioContext();
  }
  catch (e) {
    console.log("Browser does not support Web Audio API");
    return;
  }
  
  /**
   * Maps a key symbol to the corresponding frequencies.
   * 
   * @private
   * @param {string} key - the key symbol
   * @return {object} the high and low frequencies
   */
  function mapKey(key) {
    var index = keys.indexOf(key);
    
    if (index != -1) {
      return {
        high: highs[index % highs.length],
        low: lows[Math.floor(index / highs.length)]
      };
    }
  }
  
  /**
   * Wave generator
   * 
   * @private
   * @param {number} frequency - the wave frequency
   * @return {OscillatorNode} the oscilator node for the given frequency
   */
  function wave(frequency) {
    var source = context.createOscillator();
    
    source.connect(context.destination);
    source.frequency.value = frequency;
    source.start(context.currentTime);
    return source;
  }
  
  /**
   * Plays the sound corresponding to the provided key symbol.
   * 
   * @param {string} key - the key symbol
   * @returns {string} the tone id that is used to cancel the sound.
   */
  function play(key) {
    var freq = mapKey(key);
    
    if (freq) {
      toneIndex++;
      _dtmfs.push({
        high: wave(freq.high),
        low: wave(freq.low)
      });
      _tones.push(toneIndex.toString());
      return toneIndex;
    }
  }
  
  /**
   * Stops a sound
   * 
   * @param {string} id - the tone id to stop.
   */
  function stop(id) {
    var index = _tones.indexOf(id);
    
    if (index != -1) {
      _dtmfs[index].high.stop(0);
      _dtmfs[index].low.stop(0);
      _dtmfs.splice(index, 1);
      _tones.splice(index, 1);
    }
  }
  
  return {
    keys: function () {
      return keys;
    },
    play: play,
    stop: stop
  };
})();
