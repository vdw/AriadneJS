var AriadnesThread  = [];
var AriadnesBrowser = navigator.appVersion;

(function() {

  this.AriadneJS = function() {

    var defaults = {
      delay: 600
    }

    this.options = extendDefaults(defaults, arguments[0]);

  }

  AriadneJS.prototype.init = function() {

    var eventDoc, doc, body, pageX, pageY;
    var cX = document.documentElement.clientWidth;
    var cY = document.documentElement.clientHeight;

    // Mouse move
    document.onmousemove = handleMouseMove;

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

    // Mouse click
    document.onmousedown = handleMouseDown;

    function handleMouseDown(event) {
      AriadnesThread.push(serializer(pageX, pageY));
      logger( '/api/ariadnes_threads', { browser: AriadnesBrowser, window: serializer(cX, cY), thread: AriadnesThread, event: event.type, element: event.toElement.nodeName });
    }

    var i = setInterval(function() {
      track = serializer(cX, cY, pageX, pageY);
      if ( AriadnesThread[AriadnesThread.length - 1] != track ) {
        AriadnesThread.push(track);
      }
    }, this.options.delay);

    // Window status
    window.onbeforeunload = handleBeforeUnload;

    function handleBeforeUnload(event) { clearInterval(i); }

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function serializer(X, Y) {
    return ( X + ':' + Y );
  }

  function logger(url, params) {
    xhr = new XMLHttpRequest();
    xhr.open('POST', encodeURI(url), true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
  }

  log = new AriadneJS();

  log.init();

}());