(function() {

  this.AriadneJS = function() {

    this.delay = null;

    var defaults = {

      delay: 600

    }

    if (arguments[0] && typeof arguments[0] === "object") {

      this.options = extendDefaults(defaults, arguments[0]);

    }

  }

  // Public Methods
  AriadneJS.prototype.init = function() {

    document.onmousemove = handleMouseMove;

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

  function handleMouseMove(event) {
    var eventDoc, doc, body, pageX, pageY;

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

    console.log({cX: document.documentElement.clientWidth, cY: document.documentElement.clientHeight, X: event.pageX, Y: event.pageY})
  }

}());
