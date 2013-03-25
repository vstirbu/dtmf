describe("Library test", function () {
  
  describe("Keypad length", function () {
    it('contains 12 keys', function () {
      expect(DTMF.keys().length).toBe(12);
    });
  });
  
  describe("Test pressing each key, one at a time", function() {
    DTMF.keys().forEach(function (value) {
    
      it("Key " + value + " pressed", function() {
        var flag, tone_id;
        
        runs(function () {
          flag = false;
          tone_id = DTMF.play(value);
          expect(tone_id).not.toBe(undefined);
          
          setTimeout(function () {
            flag = true;
          }, 200);
        });
        
        waitsFor(function () {
          return flag;
        }, "lapse time", 500);
        
        runs(function () {
          DTMF.stop(tone_id);
        });
      });
      
    });  
  });
  
  describe("Test pressing multiple keys at a time", function () {
    var flag, tone_id1, tone_id2;
    
    it("press first key", function () {
      runs(function () {
        flag = false;
        tone_id1 = DTMF.play(DTMF.keys()[0])
        expect(tone_id1).not.toBe(undefined);
        
        setTimeout(function() {
          flag=true;
        }, 200);
      });
      
      waitsFor(function () {
        return flag;
      }, 'lapse time', 500);
    });
    
    it("press second key", function () {
      runs(function () {
        flag = false;
        tone_id2 = DTMF.play(DTMF.keys()[DTMF.keys().length - 1])
        expect(tone_id2).not.toBe(undefined);
        
        setTimeout(function() {
          flag=true;
        }, 400);
      });
      
      waitsFor(function () {
        return flag;
      }, 'lapse time', 500);
    });
    
    it("release second key", function () {
      runs(function () {
        flag = false;
        DTMF.stop(tone_id2);
        
        setTimeout(function() {
          flag=true;
        }, 400);
      });
      
      waitsFor(function () {
        return flag;
      }, 'lapse time', 500);
    });
    
    it("release first key", function () {
      DTMF.stop(tone_id1);
    });
    
  });
  
  describe("Test unsupported key", function () {
    it("Key 'a' pressed", function () {
      expect(DTMF.play('a')).toBe(undefined);
    });
  });
});
