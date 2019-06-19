let time = performance.now();
class Xpage{
  constructor(params = {}){
    this.params = {
      consts:{
        IS_DEVELOPMENT: false,
      },
      scrollBtn: {
        visible: true,
        template: "<button class='x-toTop'>Наверх</button>",
      },
      scripts: [],
    };

    this.params = this.mergeObjects(this.params, params);

    this.IS_DEVELOPMENT = this.params.consts.IS_DEVELOPMENT;

    this.makeConst();

    this.init();

    this.ready(() => {
    	this.width = window.innerWidth;
    	this.height = window.innerHeight;

      if (window.location.hash && $(window.location.hash.split("--")[0]).length){
        // window.scrollTo(0, 0);

        setTimeout( e => {
          $("html, body").stop().animate({
            scrollTop: $(window.location.hash.split("--")[0]).offset().top - 50
          }, 500);
        }, 1000)
      }
    });

    if (this.params.loading){
      this.ready(e => {
        this.setLoading();
      })
    }
  }
  init(){
    this.optimizeLoadScripts(this.params.scripts);
    this.bindEvents();
  }
  bindEvents(){
  	let self = this;
  	$(".fancybox").fancybox({
      width: "100%",
      height: "100%",
			beforeShow(){
				$("body").addClass("fancy-active");
			},
			afterClose(){
				$("body").removeClass("fancy-active");
			}
		});

    $("body").on("change", ".forms__input--file", e => {
      let name = e.currentTarget.files[0].name;

      $(e.currentTarget).nextAll(".forms__input--file-support").val(name)
    });
  }
  ready(func, params = {type: "document"}){
  	if (window.frameCacheVars !== undefined 
      && params.type == "composit")
		    BX.addCustomEvent("onFrameDataReceived" , json => {
		    	func();
		    });
		else if (typeof(BX) != "undefined" 
      && params.type == "bx" 
      || params.type == "composit")
		    BX.ready(() => {
		    	func();
		    })
		else if (params.type == "document")
			$(e => {func()})
  }
  onScroll(func = () => {}){
    let prevComparison = performance.now();

		window.onload = (e) =>{
			func(e, window.pageYOffset || 0);
		};
  	window.onscroll = (e) => {
      const now = performance.now();

      if (now - prevComparison >= 100 || window.pageYOffset == 0){
  		  func(e, window.pageYOffset || 0)

        prevComparison = now;;
      }
  	};

  	document.body.addEventListener("touchmove", (e) =>{
      const now = performance.now();

      if (now - prevComparison >= 100 || window.pageYOffset == 0){
  		  func(e, window.pageYOffset || 0)

        prevComparison = now;;
      }
  	});
  }
  mergeObjects(obj1 = {}, obj2 = {}){
  	for (let index in obj2){
  		if (typeof obj2[index] == "object"){
  			obj1[index] = this.mergeObjects(obj1[index], obj2[index]);
  		}else{
  			obj1[index] = obj2[index];
  		}
  	}

  	return obj1;
  }
  optimizeLoadScripts(scr = []){
    let self = this;

    !function(t,n,r){
      let c = function(t){

        if("[object Array]"!==Object.prototype.toString.call(t))
          return!1;

        for(var r=0;r<t.length;r++){
          let script = t[r];

          if (script.condition)
            if (!script.condition(self))
              continue

          let tag = document.createElement("script"),
              e = t[r];

          if (script.onLoad && self.IS_DEVELOPMENT){
            tag.onload = script.onLoad(self);
          }

          if (self.IS_DEVELOPMENT){
            let log = "Загружен: "+(script.name || script.src);
            tag.onload = () => {
              console.log(log)
            }
          }

          tag.src = self.DEFAULT_TEMPLATE_PATH + "/" + e.src + "?v="+self.JS_VERSION;
          tag.async = e.async;
          document.body.appendChild(tag)
        }

        return!0
      };

      self.ready(() =>{
        c(r);
      });
      
    }(window,document,scr);
  }

  makeConst(){
    this.JS_VERSION = (this.IS_DEVELOPMENT ? Math.random() : 6);

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



  tablet(func){
    if (this.IS_TABLET) func()
  }
  mobile(func){
    if (this.IS_MOBILE) func()
  }
  desktop(func){
    if (this.IS_DESKTOP) func()
  }


  inner(func){
    if (this.IS_INNER) func()
  }
  main(func){
    if (this.IS_MAIN) func()
  }

  setBodyClass(){
    $("body").addClass(this.USER_DEVICE)
  }

  setLoading(){

    // Cookies.set("loaderShowed", 1);

    setTimeout( e => {
      $("body").removeClass("loading").addClass("loading-2");
    }, 1000);

    setTimeout(e => {
      $("body").removeClass("loading-2").addClass("loaded");
    }, 2500)
  }




  numberToParts(number){
    return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
}

window.X = new Xpage({
  consts: {
    IS_DEVELOPMENT: false,
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
      condition: X => $(".promo__cont").length && X.IS_DESKTOP,
    },
    {
      src: "js/selectize.min.js",
      async: false,
      name: "selectize",
      condition: X => $("select.selectize").length && X.IS_DESKTOP,
      onLoad(){
      }
    },
    {
      src: "js/timeline.js",
      async: false,
      name: "timeline",
      condition: X => $("#timeline").length,
      onLoad(){
      }
    },
		{
			src : "js/common.js",
			async : false,
		},
	]
});