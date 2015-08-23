(function() {

  this.AriadneJS = function() {

    var defaults = {
      live:  false,
      delay: 600
    }

    this.options = extendDefaults(defaults, arguments[0]);

  }

  // Public Methods
  AriadneJS.prototype.init = function() {

    document.onmousemove = handleMouseMove;
    var eventDoc, doc, body, pageX, pageY;

    function handleMouseMove(event) {

      event = event || window.event; // IE

      // Calculate pageX/Y if missing and clientX/Y available
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc      = eventDoc.documentElement;
        body     = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }
      pageX = event.pageX
      pageY = event.pageY

    }

    setInterval(function() { console.log({cX: document.documentElement.clientWidth, cY: document.documentElement.clientHeight, X: pageX, Y: pageY}) }, this.options.delay);
  }

  // Private Methods
  function extendDefaults(source, properties) {

    var property;

    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }

    return source;

  }

}());
