// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
$(document).ready(function () {
  console.log("AFTER READY"); //SET FARME HEIGHT

  var amountSection = $(".section").length * 100 + 'vh';
  console.log("amount of sections", amountSection);
  $(".frame").css('height', amountSection); //SET SECTIONS PERSPECTIVE AND OPACITY

  var perspective = '500px';
  var sectionDiference = 500;
  $('.section').each(function (i) {
    var sectionZvalue = (-i * sectionDiference).toString() + 'px';

    if (i == 0) {
      $(this).css('transform', 'perspective(' + perspective + ') translateZ(0px)');
      $(this).css('opacity', '1');
    } else {
      $(this).css('transform', 'perspective(' + perspective + ') translateZ(' + sectionZvalue + ')');
      $(this).css('opacity', '0');
    }
  }); //SET CLOUDS PERSPECTIVE AND OPACITY

  var cloudsPerspective = '500px';
  var cloudsDiference = 500;
  $('.clouds-container').each(function (i) {
    var cloudsZvalue = (-i * cloudsDiference + 200).toString() + 'px';

    if (i == 0) {
      $(this).css('transform', 'perspective(' + cloudsPerspective + ') translateZ(100px)');
      $(this).css('opacity', '1');
    } else {
      $(this).css('transform', 'perspective(' + cloudsPerspective + ') translateZ(' + cloudsZvalue + ')');
      $(this).css('opacity', '0');
    }
  }); //SET CONTENT PERSPECTIVE AND OPACITY

  var contentPerspective = '500px';
  var contentDiference = 500;
  $('.content').each(function (i) {
    var contentZvalue = (-i * contentDiference + 100).toString() + 'px';

    if (i == 0) {
      $(this).css('transform', 'perspective(' + contentPerspective + ') translateZ(100px)');
      $(this).css('opacity', '1');
    } else {
      $(this).css('transform', 'perspective(' + contentPerspective + ') translateZ(' + contentZvalue + ')');
      $(this).css('opacity', '0');
    }
  }); //INSERT TRIGGERS DYNAMICALLY

  $('.section').each(function (i) {
    var trigger = '<div class="trigger"></div>';
    $(".frame").append(trigger);
  }); //INSERT CLOUD TRIGGERS DYNAMICALLY

  $('.section').each(function (i) {
    var cloudTrigger = '<div class="cloud-trigger"></div>';
    $(".frame").append(cloudTrigger);
  }); //INSERT CONTENT TRIGGERS DYNAMICALLY

  $('.section').each(function (i) {
    var contentTrigger = '<div class="content-trigger"></div>';
    $(".frame").append(contentTrigger);
  }); //SET CLOUD TRIGGER POSITION DINAMICALLY

  var startingTriggerTop = 100;
  $('.cloud-trigger').each(function (i) {
    if (i == 0) {
      $(this).css('top', '10vh');
    } else {
      $(this).css('top', startingTriggerTop * i + 10 + 'vh');
    }
  }); //SET CONTENT TRIGGER POSITION DINAMICALLY

  var startingTriggerTop = 100;
  $('.content-trigger').each(function (i) {
    if (i == 0) {
      $(this).css('top', '15vh');
    } else {
      $(this).css('top', startingTriggerTop * i + 15 + 'vh');
    }
  }); //SET TRIGGER POSITION DINAMICALLY

  var startingTriggerTop = 100;
  $('.trigger').each(function (i) {
    if (i == 0) {
      $(this).css('top', '20vh');
    } else {
      $(this).css('top', startingTriggerTop * i + 20 + 'vh');
    }
  }); //SET TRIGGER ID DINAMICALLY

  $('.trigger').each(function (i) {
    $(this).attr('id', 'trigger' + i.toString());
  }); //for frame ponter proposes

  $("pin-spacer").css('margin', '1px');
  $("pin-spacer").css('padding-bottom', '0px'); //INSERT INDICATORS DYNAMICALLY

  $('.section').each(function (i) {
    var trigger = "#trigger" + i.toString();
    var indicator = '<a onclick="testing(\'' + trigger + '\')"><div></div></a>';
    console.log("INDICATOR", indicator);
    $(".indicators-container__controls").append(indicator);
  });

  if (!$(".frame").hasClass('frame--edit')) {
    //SET TRIGGER-PIN HEIGHT
    var sections = document.querySelectorAll('.section');
    var sectionsLength = (sections.length * 100 - 120).toString() + 'vh';
    console.log("sections length", sectionsLength);
    $(".trigger-pin").height(sectionsLength);
    var opacityValues = [0, 1];
    console.log("opacity values are", opacityValues); /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    ////////////////////////BRING SECTIONS///////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    //FRAMES TO MOVE

    var frames = document.querySelectorAll('.section');
    var framesLength = frames.length;
    var arrayFrames = Array.prototype.slice.call(frames);
    console.log("array frames", arrayFrames); //GET TRIGGERS 

    var triggers = document.querySelectorAll(".trigger");
    console.log("Triggers are", triggers); //FILL Z VALUES

    var originalZValues = [];

    for (var j = 0; j < framesLength; j++) {
      if (j == 0) {
        originalZValues.push(0);
      } else {
        originalZValues.push(500 * -j);
      }
    }

    console.log("Z values are", originalZValues);
    gsap.registerPlugin(ScrollTrigger);

    for (var i = 0; i < triggers.length - 1; i++) {
      var currentTrigger = triggers[i];
      var initialZvalues = [];
      var finalZvalues = []; //fill initial z values

      for (var w = 0; w < originalZValues.length; w++) {
        initialZvalues.push(originalZValues[w] + 500 * i);
      }

      console.log("initial z values", initialZvalues); //fill final z values

      for (var w = 0; w < originalZValues.length; w++) {
        finalZvalues.push(originalZValues[w] + 500 * (i + 1));
      }

      console.log("final z values", finalZvalues);
      var tl = gsap.timeline({
        onComplete: function onComplete() {
          console.log("Hola");
        },
        scrollTrigger: {
          trigger: currentTrigger,
          start: 'top 10px',
          end: 'bottom 0px',
          scrub: 2,
          // onEnter onLeave onEnterBack onLeaveBack
          toggleActions: "play none reverse none" // markers: {
          //     fontSize: '2rem'
          // }

        }
      });

      for (var j = 0; j < originalZValues.length; j++) {
        var initialValue = initialZvalues[j];
        var finalValue = finalZvalues[j];
        var initialOpacity = undefined;
        var finalOpacity = undefined;

        if (finalValue === 500) {
          initialOpacity = 1;
          finalOpacity = 0;
        }

        if (finalValue === 0) {
          initialOpacity = 0;
          finalOpacity = 1;
        }

        tl.fromTo(arrayFrames[j], {
          z: initialValue,
          immediateRender: false,
          duration: 3,
          opacity: initialOpacity
        }, {
          z: finalValue,
          immediateRender: false,
          duration: 3,
          opacity: finalOpacity
        }, 0);
        console.log("Creado asi ----");
        console.log("Frame", arrayFrames[j]);
        console.log("initial Z value", initialValue);
        console.log("final  Z value", finalValue);
        console.log("opacidad inicial", initialOpacity);
        console.log("opacidad final", finalOpacity);
        console.log("Trigger", currentTrigger);
        console.log("end -----");
      }

      console.log("NEXT TRIGGER ---------------");
    } /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    ////////////////////////BRING CLOUDS/////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    //FRAMES TO MOVE


    var cloudFrames = document.querySelectorAll('.clouds-container');
    var cloudFramesLength = cloudFrames.length;
    var arrayCloudFrames = Array.prototype.slice.call(cloudFrames);
    console.log("Array cloud frames", arrayCloudFrames); //GET TRIGGERS 

    var cloudTriggers = document.querySelectorAll(".cloud-trigger");
    console.log("Cloud triggers are", cloudTriggers); //FILL Z VALUES

    var originalZcloudsValues = [];

    for (var j = 0; j < cloudFramesLength; j++) {
      if (j == 0) {
        originalZcloudsValues.push(100);
      } else {
        originalZcloudsValues.push(400 * -j);
      }
    }

    console.log("Z values are", originalZcloudsValues);

    for (var i = 0; i < cloudTriggers.length - 1; i++) {
      var currentCloudTrigger = cloudTriggers[i];
      var initialZcloudValues = [];
      var finalZcloudValues = []; //fill initial z values

      for (var w = 0; w < originalZcloudsValues.length; w++) {
        initialZcloudValues.push(originalZcloudsValues[w] + 400 * i);
      }

      console.log("initial z cloud values", initialZvalues); //fill final z values

      for (var w = 0; w < originalZcloudsValues.length; w++) {
        finalZcloudValues.push(originalZcloudsValues[w] + 400 * (i + 1));
      }

      console.log("final z cloud values", finalZvalues);
      var tcloud = gsap.timeline({
        onComplete: function onComplete() {
          console.log("Hola");
        },
        scrollTrigger: {
          trigger: currentCloudTrigger,
          start: 'top 10px',
          end: 'bottom 0px',
          scrub: 2,
          // onEnter onLeave onEnterBack onLeaveBack
          toggleActions: "play none reverse none" // markers: {
          //     startColor: "purple", 
          //     endColor: "black",
          //     fontSize: '2.5rem'
          // }

        }
      });

      for (var j = 0; j < originalZcloudsValues.length; j++) {
        var initialValue = initialZcloudValues[j];
        var finalValue = finalZcloudValues[j];
        var initialOpacity = undefined;
        var finalOpacity = undefined;

        if (finalValue === 500) {
          initialOpacity = 1;
          finalOpacity = 0;
        }

        if (finalValue === 0) {
          initialOpacity = 0;
          finalOpacity = 1;
        }

        tcloud.fromTo(arrayCloudFrames[j], {
          z: initialValue,
          immediateRender: false,
          duration: 3,
          opacity: initialOpacity
        }, {
          z: finalValue,
          immediateRender: false,
          duration: 3,
          opacity: finalOpacity
        }, 0);
        console.log("------------CLOUDS--------------");
        console.log("Creado asi ----");
        console.log("Frame", arrayCloudFrames[j]);
        console.log("initial Z value", initialValue);
        console.log("final  Z value", finalValue);
        console.log("opacidad inicial", initialOpacity);
        console.log("opacidad final", finalOpacity);
        console.log("Trigger", currentCloudTrigger);
        console.log("end -----");
      }

      console.log("NEXT TRIGGER ---------------");
    } /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    ////////////////////////BRING CONTENT///////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////


    console.log("START CONTENT ANIMATION"); //FRAMES TO MOVE

    var contentFrames = document.querySelectorAll('.content');
    var contentFramesLength = contentFrames.length;
    var arrayContentFrames = Array.prototype.slice.call(contentFrames);
    console.log("content array frames", arrayContentFrames); //GET TRIGGERS 

    var contentTriggers = document.querySelectorAll(".content-trigger");
    console.log("Triggers are", contentTriggers); //FILL Z VALUES

    var originalZcontentValues = [];

    for (var j = 0; j < contentFramesLength; j++) {
      if (j == 0) {
        originalZcontentValues.push(100);
      } else {
        originalZcontentValues.push(400 * -j);
      }
    }

    console.log("Z values are", originalZcontentValues);

    for (var i = 0; i < contentTriggers.length - 1; i++) {
      var currentContentTrigger = contentTriggers[i];
      var initialZcontentValues = [];
      var finalZcontentValues = []; //fill initial z values

      for (var w = 0; w < originalZcontentValues.length; w++) {
        initialZcontentValues.push(originalZcontentValues[w] + 400 * i);
      }

      console.log("initial z values", initialZcontentValues); //fill final z values

      for (var w = 0; w < originalZcontentValues.length; w++) {
        finalZcontentValues.push(originalZcontentValues[w] + 400 * (i + 1));
      }

      console.log("final z values", finalZcontentValues);
      var timelineContent = gsap.timeline({
        onComplete: function onComplete() {
          console.log("Hola");
        },
        scrollTrigger: {
          trigger: currentContentTrigger,
          start: 'top 10px',
          end: 'bottom 0px',
          scrub: 2,
          // onEnter onLeave onEnterBack onLeaveBack
          toggleActions: "play none reverse none",
          markers: {
            startColor: "greenyellow",
            endColor: "greenyellow",
            fontSize: '2.5rem'
          }
        }
      });

      for (var j = 0; j < originalZcontentValues.length; j++) {
        var initialValue = initialZcontentValues[j];
        var finalValue = finalZcontentValues[j];
        var initialOpacity = undefined;
        var finalOpacity = undefined;

        if (finalValue === 500) {
          initialOpacity = 1;
          finalOpacity = 0;
        }

        if (finalValue === 0) {
          initialOpacity = 0;
          finalOpacity = 1;
        }

        timelineContent.fromTo(arrayContentFrames[j], {
          z: initialValue,
          immediateRender: false,
          duration: 3,
          opacity: initialOpacity
        }, {
          z: finalValue,
          immediateRender: false,
          duration: 3,
          opacity: finalOpacity
        }, 0);
        console.log("Creado asi ----");
        console.log("Frame", arrayContentFrames[j]);
        console.log("initial Z value", initialValue);
        console.log("final  Z value", finalValue);
        console.log("opacidad inicial", initialOpacity);
        console.log("opacidad final", finalOpacity);
        console.log("Trigger", currentContentTrigger);
        console.log("end -----");
      }

      console.log("NEXT TRIGGER ---------------");
    }

    var st = ScrollTrigger.create({
      trigger: ".trigger-pin",
      pin: ".sections-container",
      start: "top 6%",
      end: "bottom 0.5%",
      markers: {
        startColor: "orange",
        endColor: "orange",
        fontSize: "16px"
      }
    });
  }
});
document.addEventListener('scroll', function (e) {
  $(".section").each(function (i) {
    var zValue = parseFloat($(this).css('transform').split(',')[14]);

    if (zValue > 500 || zValue < -400) {
      $(this).css('visibility', 'hidden');
    } else {
      $(this).css('visibility', 'visible');
    }
  });
}); //HARDCODED WORKING
// gsap.registerPlugin(ScrollTrigger);
// var tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".trigger1",
//         start: 'top 5.5%',
//         end: 'bottom 5.5%',
//         scrub: 2,
//         // onEnter onLeave onEnterBack onLeaveBack
//         toggleActions: "play none reverse none",
//         markers: {
//             fontSize: '2rem'
//         }
//     }
// }, 0);
// tl.fromTo(".frame__1", {
//         z: 0,
//         duration: 1,
//         opacity: 1
//     }, {
//         z: 500,
//         duration: 3,
//         opacity: 0
// },0);
// tl.fromTo(".frame__2", {
//         z: -500,
//         duration: 1,
//         opacity: 0
//     }, {
//         z: 0,
//         duration: 3,
//         opacity: 1
// },0);
// tl.fromTo(".frame__3", {
//         z: -1000,
//         duration: 1,
//         opacity: undefined
//     }, {
//         z: -500,
//         duration: 1,
//         opacity: undefined
// },0);
// ///////////////////////////////////
// var tl2 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".trigger2",
//         start: 'top 5.5%',
//         end: 'bottom 5.5%',
//         scrub: 2,
//         // onEnter onLeave onEnterBack onLeaveBack
//         toggleActions: "play none reverse none",
//         markers: {
//             fontSize: '2rem'
//         }
//     }
// }, 0);
// tl2.fromTo(".frame__1", {
//         z: 500,
//         duration: 1,
//         opacity: undefined
//     }, {
//         z: 1000,
//         duration: 1,
//         opacity: undefined
// },0);
// tl2.fromTo(".frame__2", {
//         z: 0,
//         duration: 1,
//         opacity: 1
//     }, {
//         z: 500,
//         duration: 3,
//         opacity: 0
// },0);
// tl2.fromTo(".frame__3", {
//         z: -500,
//         duration: 1,
//         opacity: 0
//     }, {
//         z: 0,
//         duration: 1,
//         opacity: 1
// },0);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56336" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map