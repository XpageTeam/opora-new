"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var time = performance.now();

var Xpage = function () {
  function Xpage() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Xpage);

    this.params = {
      consts: {
        IS_DEVELOPMENT: false
      },
      scrollBtn: {
        visible: true,
        template: "<button class='x-toTop'>Наверх</button>"
      },
      scripts: []
    };

    this.params = this.mergeObjects(this.params, params);

    this.IS_DEVELOPMENT = this.params.consts.IS_DEVELOPMENT;

    this.makeConst();

    this.init();

    this.ready(function () {
      _this.width = window.innerWidth;
      _this.height = window.innerHeight;

      if (window.location.hash && $(window.location.hash.split("--")[0]).length) {
        // window.scrollTo(0, 0);

        setTimeout(function (e) {
          $("html, body").stop().animate({
            scrollTop: $(window.location.hash.split("--")[0]).offset().top - 50
          }, 500);
        }, 1000);
      }
    });

    if (this.params.loading) {
      this.ready(function (e) {
        _this.setLoading();
      });
    }
  }

  _createClass(Xpage, [{
    key: "init",
    value: function init() {
      this.optimizeLoadScripts(this.params.scripts);
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var self = this;
      $(".fancybox").fancybox({
        width: "100%",
        height: "100%",
        beforeShow: function beforeShow() {
          $("body").addClass("fancy-active");
        },
        afterClose: function afterClose() {
          $("body").removeClass("fancy-active");
        }
      });

      $("body").on("change", ".forms__input--file", function (e) {
        var name = e.currentTarget.files[0].name;

        $(e.currentTarget).nextAll(".forms__input--file-support").val(name);
      });
    }
  }, {
    key: "ready",
    value: function ready(func) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: "document" };

      if (window.frameCacheVars !== undefined && params.type == "composit") BX.addCustomEvent("onFrameDataReceived", function (json) {
        func();
      });else if (typeof BX != "undefined" && params.type == "bx" || params.type == "composit") BX.ready(function () {
        func();
      });else if (params.type == "document") $(function (e) {
        func();
      });
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      var prevComparison = performance.now();

      window.onload = function (e) {
        func(e, window.pageYOffset || 0);
      };
      window.onscroll = function (e) {
        var now = performance.now();

        if (now - prevComparison >= 100 || window.pageYOffset == 0) {
          func(e, window.pageYOffset || 0);

          prevComparison = now;;
        }
      };

      document.body.addEventListener("touchmove", function (e) {
        var now = performance.now();

        if (now - prevComparison >= 100 || window.pageYOffset == 0) {
          func(e, window.pageYOffset || 0);

          prevComparison = now;;
        }
      });
    }
  }, {
    key: "mergeObjects",
    value: function mergeObjects() {
      var obj1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var obj2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var index in obj2) {
        if (_typeof(obj2[index]) == "object") {
          obj1[index] = this.mergeObjects(obj1[index], obj2[index]);
        } else {
          obj1[index] = obj2[index];
        }
      }

      return obj1;
    }
  }, {
    key: "optimizeLoadScripts",
    value: function optimizeLoadScripts() {
      var scr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var self = this;

      !function (t, n, r) {
        var c = function c(t) {

          if ("[object Array]" !== Object.prototype.toString.call(t)) return !1;

          for (var r = 0; r < t.length; r++) {
            var script = t[r];

            if (script.condition) if (!script.condition(self)) continue;

            var tag = document.createElement("script"),
                e = t[r];

            if (script.onLoad && self.IS_DEVELOPMENT) {
              tag.onload = script.onLoad(self);
            }

            if (self.IS_DEVELOPMENT) {
              (function () {
                var log = "Загружен: " + (script.name || script.src);
                tag.onload = function () {
                  console.log(log);
                };
              })();
            }

            tag.src = self.DEFAULT_TEMPLATE_PATH + "/" + e.src + "?v=" + self.JS_VERSION;
            tag.async = e.async;
            document.body.appendChild(tag);
          }

          return !0;
        };

        self.ready(function () {
          c(r);
        });
      }(window, document, scr);
    }
  }, {
    key: "makeConst",
    value: function makeConst() {
      this.JS_VERSION = this.IS_DEVELOPMENT ? Math.random() : 6;

      console.log($("body").hasClass("main"));

      this.IS_MAIN = $("body").hasClass("main");

      console.log(this.IS_MAIN);

      this.IS_INNER = $("body").hasClass("inner");
      this.DEFAULT_TEMPLATE_PATH = Cookies.get("SITE_TEMPLATE_PATH") || "";
      this.USER_DEVICE = Cookies.get("USER_DEVICE") || "desktop";

      this.IS_DESKTOP = Cookies.get("USER_DEVICE") ? Cookies.get("USER_DEVICE") == "desktop" : true;
      this.IS_TABLET = Cookies.get("USER_DEVICE") == "tablet";
      this.IS_MOBILE = Cookies.get("USER_DEVICE") == "mobile";
    }
  }, {
    key: "tablet",
    value: function tablet(func) {
      if (this.IS_TABLET) func();
    }
  }, {
    key: "mobile",
    value: function mobile(func) {
      if (this.IS_MOBILE) func();
    }
  }, {
    key: "desktop",
    value: function desktop(func) {
      if (this.IS_DESKTOP) func();
    }
  }, {
    key: "inner",
    value: function inner(func) {
      if (this.IS_INNER) func();
    }
  }, {
    key: "main",
    value: function main(func) {
      if (this.IS_MAIN) func();
    }
  }, {
    key: "setBodyClass",
    value: function setBodyClass() {
      $("body").addClass(this.USER_DEVICE);
    }
  }, {
    key: "setLoading",
    value: function setLoading() {

      // Cookies.set("loaderShowed", 1);

      setTimeout(function (e) {
        $("body").removeClass("loading").addClass("loading-2");
      }, 1000);

      setTimeout(function (e) {
        $("body").removeClass("loading-2").addClass("loaded");
      }, 2500);
    }
  }, {
    key: "numberToParts",
    value: function numberToParts(number) {
      return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    }
  }]);

  return Xpage;
}();

window.X = new Xpage({
  consts: {
    IS_DEVELOPMENT: false
  },
  loading: true,
  scripts: [
  // {
  //   src: "js/countTo.js",
  //   async: false,
  //   name: "counter",
  //   condition: () => $("[data-from][data-to]").length,
  //   onLoad(){
  //   }
  // },
  // {
  //   src: "js/video.js",
  //   async: false,
  //   name: "video",
  //   condition: X => $(".main-video video").length && X.IS_DESKTOP,
  //   onLoad(){
  //   }
  // },
  {
    src: "js/TweenMax.min.js",
    async: false,
    name: "TweenMax",
    condition: function condition(X) {
      return $(".promo__cont").length && X.IS_DESKTOP;
    }
  }, {
    src: "js/selectize.min.js",
    async: false,
    name: "selectize",
    condition: function condition(X) {
      return $("select.selectize").length && X.IS_DESKTOP;
    },
    onLoad: function onLoad() {}
  }, {
    src: "js/timeline.js",
    async: false,
    name: "timeline",
    condition: function condition(X) {
      return $("#timeline").length;
    },
    onLoad: function onLoad() {}
  }, {
    src: "js/common.js",
    async: false
  }]
});
//# sourceMappingURL=xpage.js.map
