var dispatchEvent = function (target, eventName) {
  var event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, true, true);
  document.getElementById(target).dispatchEvent(event);
};

describe("Test app", function () {
  DTMF.keys().forEach(function (value) {
    
    it("Key " + value + " pressed", function() {
      var flag;
      
      runs(function () {
        flag = false;
        dispatchEvent(value, "mousedown");
        expect(document.getElementById(value).classList.contains('pressed')).toBe(true);
        
        setTimeout(function () {
          flag = true;
        }, 200);
      });
      
      waitsFor(function () {
        return flag;
      }, "lapse time", 500);
      
      runs(function () {
        dispatchEvent(value, "mouseup");
        expect(document.getElementById(value).classList.contains('pressed')).not.toBe(true);
      });
    });
    
  });
  
  it("invalide key pressed", function () {
      var flag;
      
      runs(function () {
        flag = false;
        dispatchEvent('a', "mousedown");
        expect(document.getElementById('a').classList.contains('error')).toBe(true);
        
        setTimeout(function () {
          flag = true;
        }, 200);
      });
      
      waitsFor(function () {
        return flag;
      }, "lapse time", 500);
      
      runs(function () {
        dispatchEvent('a', "mouseup");
        expect(document.getElementById('a').classList.contains('error')).not.toBe(true);
      });
  });
  
  describe("two keys pressed at a time", function () {
    var flag, key1, key2;
    
    key1 = DTMF.keys()[0];
    key2 = DTMF.keys()[DTMF.keys().length - 1];
    
    it("press first key", function () {
      runs(function () {
        flag = false;
        dispatchEvent(key1, "mousedown");
        
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
        dispatchEvent(key2, "mousedown");
        
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
        dispatchEvent(key2, "mouseup");
        
        setTimeout(function() {
          flag=true;
        }, 400);
      });
      
      waitsFor(function () {
        return flag;
      }, 'lapse time', 500);
    });
    
    it("release first key", function () {
      dispatchEvent(key1, "mouseup");
    });
  });
  
});
