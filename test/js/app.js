ko.bindingHandlers.key = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        element.innerHTML = valueAccessor();
        
        element.addEventListener('mousedown', function () {
          var toneId = DTMF.play(viewModel);
          
          if (toneId) {
            element.classList.add('pressed');
            element.dataset.tone = toneId;
          } else {
            element.classList.add('error');
          }
        }, false);
        
        element.addEventListener('mouseup', function () {
          var toneId = element.dataset.tone;
          
          if (toneId) {
            DTMF.stop(toneId);
            element.removeAttribute('data-tone');
            element.classList.remove('pressed');
          } else {
            element.classList.remove('error');
          }
        }, false);
    }
};

var KeypadModel = function () {
  var self = this;
  
  self.keys = ko.observableArray(DTMF.keys());
};

ko.applyBindings(new KeypadModel());
