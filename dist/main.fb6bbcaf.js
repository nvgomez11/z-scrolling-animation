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
  console.log("AFTER READY");
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
  }); //TRIGGER HEIGHT DINAMICALLY

  var startingTriggerTop = 100;
  $('.trigger').each(function (i) {
    if (i == 0) {
      $(this).css('top', '0vh');
    } else {
      $(this).css('top', startingTriggerTop * i + 'vh');
    }
  }); //SET TRIGGER ID DINAMICALLY

  $('.trigger').each(function (i) {
    $(this).attr('id', 'trigger' + i.toString());
  }); //SET INDICATOR HREF DINAMICALLY

  $('.indicator').each(function (i) {
    $(this).attr('href', '#trigger' + i.toString());
  });
}); //SET TRIGGER-PIN HEIGHT

var sections = document.querySelectorAll('.section');
var sectionsLength = (sections.length * 100 - 80).toString() + 'vh';
console.log("sections length", sectionsLength);
$(".trigger-pin").height(sectionsLength); //SET PERSPECTIVE AND Z VALUE OF EACH SECTION

console.log("GOOGOGOGOGOG"); //animation

var frames = document.querySelectorAll('.section');
var framesLength = frames.length;
var arrayFrames = Array.prototype.slice.call(frames);
console.log("array frames", arrayFrames); //Fill Triggers 

var triggers = document.querySelectorAll(".trigger");
console.log("Triggers are", triggers); //Fill Z Values

var originalZValues = [];

for (var j = 0; j < framesLength; j++) {
  if (j == 0) {
    originalZValues.push(0);
  } else {
    originalZValues.push(500 * -j);
  }
}

console.log("Z values are", originalZValues);
var opacityValues = [0, 1];
console.log("opacity values are", opacityValues);
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
    scrollTrigger: {
      trigger: currentTrigger,
      start: 'top 10px',
      end: 'bottom 0px',
      scrub: 2,
      // onEnter onLeave onEnterBack onLeaveBack
      toggleActions: "play none reverse none",
      markers: {
        fontSize: '2rem'
      }
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
      //immediateRender: false,
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

  console.log(tl.progress());
  console.log("NEXT TRIGGER ---------------");
} //Frame container height dinamically set depending on the amount of frames
// var framesContainerHeight = (100 * framesLength).toString() + 'vh';
// $('.frame').height(framesContainerHeight);


var st = ScrollTrigger.create({
  trigger: ".trigger-pin",
  pin: ".frame",
  start: "top 5%",
  end: "bottom 1%",
  markers: {
    startColor: "orange",
    endColor: "orange",
    fontSize: "16px"
  }
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57660" + '/');

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