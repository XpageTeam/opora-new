'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var playSpeed = 4000;

new WOW({
	boxClass: 'animation', // default
	animateClass: 'animated', // default
	offset: 50, // default
	mobile: true, // default
	live: false // default
}).init();

if ($(window).width() < 700) {

	$(".works__list").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		slide: ".works__item",
		infinite: false,
		dots: true
	});

	$(".advantages .advantages__list").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		slide: ".advantages__item",
		infinite: false
	});

	$(".advantages-2 .advantages__list").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		slide: ".advantages__item",
		infinite: false,
		dots: true
	});

	$(".statistics__list").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		slide: ".statistics__item",
		infinite: false,
		dots: true
	});

	$(".brands__list").slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		slide: ".brands__item",
		infinite: false,
		dots: true
	});
}

$('.seo-text-more .btn').click(function () {
	$(this).closest('.seo-text-cont').find('.seo-text__elements').slideToggle();
});

$(".project-icons__one-img").width(Math.max.apply(null, $(".project-icons__one-img").map(function () {
	return $(this).width();
})));

$(".scroll").click(function () {
	var $this = $(this),
	    id = $this.attr("href");

	$(".scroll").removeClass("active");

	$("html, body").animate({
		scrollTop: $(id).offset().top - 30 - $(".head").height()
	});

	$this.addClass("active");

	return false;
});

if ($("body").hasClass("main")) $(window).on("scroll touchmove load", function (e) {
	$(".main > div[id]").each(function (i, el) {
		var $this = $(el),
		    fix = 0;

		if (!$("a.scroll[href='#" + $this.attr("id") + "']").length || $("a.scroll[href='#" + $this.attr("id") + "']").hasClass("active")) return;

		if ($("a.scroll[href='#" + $this.attr("id") + "']").closest("li").is($("a.scroll[href='#" + $this.attr("id") + "']").closest("ul").find("li:last-child"))) fix = parseInt($this.css("margin-top"));

		if ($this.offset().top - fix - 40 - $(".head").height() < $(window).scrollTop()) {
			$("a.scroll.active").removeClass("active");
			$("a.scroll[href='#" + $this.attr("id") + "']").addClass("active");
		}

		// console.log($this.attr("id"), $this.offset().top - fix - 40 - $(".head").height() < $(window).scrollTop());
	});
});

if ($(".clients-counter__number").length) $(".clients-counter__number").countTo();

if ($(".projects-counter__number").length) $(".projects-counter__number").countTo();

$(".burger").click(function () {
	var $this = $(this);

	$this.toggleClass("active");

	$("body").toggleClass("js__mobile-menu-opened");
});

$(".head-phone").each(function (i, el) {
	var $this = $(el);

	$(".head__menu").append($this.clone().addClass("js__moved"));
});

$(".have-sub").each(function (i, el) {
	var $this = $(el),
	    $submenu = $this.find(".submenu"),
	    $link = $this.children(".menu__link");

	$submenu.prepend("<li class='submenu__el js__moved'><a href='" + $link.attr("href") + "' class='submenu__link'>" + $link.text() + "</a></li>");
});

$(".have-sub > a").click(function () {
	if ($(window).width() > 1000) return;

	var $this = $(this);

	$this.closest("li").toggleClass("js__opened");

	$(".submenu__cont").slideToggle(300);

	return false;
});

if (X.IS_MAIN) {

	$(".promo__cont").mousemove(function (e) {
		if (!$(".promo__cont").length) return false;

		var x = (e.pageX - $(window).width() / 2) * -1 / 20,
		    y = (e.pageY - $(".promo__cont").height() / 2) * -1 / 20;

		TweenMax.to($(".promo__cont")[0], 1, { css: {
				backgroundPosition: x + "px " + y + "px"
			}
		});
	});

	// if (X.IS_DESKTOP){
	// 	$("#map").mousedown(function(){
	// 		$(this).addClass("js__visible");
	// 		$(".main-contacts").addClass("js__visible").removeClass("js__hidden");
	// 	});

	// 	$("#map").mouseup(function(){
	// 		$(this).removeClass("js__visible");
	// 		$(".main-contacts").removeClass("js__visible").addClass("js__hidden");
	// 	});
	// }
}

if (!X.IS_DESKTOP && $(".video-projects__count").length) {
	$(".video-projects__count").countTo({
		speed: parseInt(7000)
	});
}

$(window).on('scroll load', function () {});

X.onScroll(function (e, offset) {
	if (offset > 0) $(".head").addClass("js__scrolled");else $(".head").removeClass("js__scrolled");

	if ($(".promo-counter__number").length) if ($(".promo-counter__number").offset().top + 50 <= $(window).scrollTop() + $(window).height()) {
		$(".promo-counter__number:not(.countered)").each(function (i, el) {
			var $this = $(el),
			    speed = 0;

			switch (i) {
				case 0:
					speed = 4000;
					break;
				case 1:
					speed = 2000;
					break;

				default:
					speed = 3000;
			}

			$this.countTo({
				speed: speed
			});

			$this.addClass("countered");
		});
	}

	if ($(".statistics__item-num").length) if ($(".statistics__item-num").offset().top + 50 <= $(window).scrollTop() + window.innerHeight) {
		$(".statistics__item-num:not(.countered)").each(function (i, el) {
			var $this = $(el),
			    speed = 0;

			switch (i) {
				case 0:
					speed = 4000;
					break;
				case 1:
					speed = 2000;
					break;

				default:
					speed = 3000;
			}

			$this.countTo({
				speed: speed
			});

			$this.addClass("countered");
		});
	}
});

console.log($(window).innerHeight());

$(".directions__slider").each(function (i, el) {
	var $slider = $(el).find(".directions__slider-slider");

	$slider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows: $(el).find(".directions__slider-arrows"),
		slide: ".directions__slider-slide",
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 660,
			settings: {
				slidesToShow: 1,
				appendArrows: $slider
			}
		}]
	});

	$slider.on("beforeChange", function (e, slick, curSlide, nextSlide) {
		$(".directions-menu__link").removeClass("active");

		$(".directions-menu").find("li:eq(" + nextSlide + ")").find(".directions-menu__link").addClass("active");
	});
});

$("body").on("click", ".directions-menu__link", function () {
	var $this = $(this),
	    index = $this.closest("li").index();

	$(".directions__slider-slider").slick("slickGoTo", index);
});

if ($("select.selectize").length && X.IS_DESKTOP) $("select.selectize").selectize();

$(".text-page table").wrap("<div class='table-wrap'></div>");

X.inner(function () {

	$(".project__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: false,
		slide: ".project__slider-slide"
	});

	if ($(".number__number").length) $(".number__number").countTo();

	$(".head__menu").append($(".footer__soc .soc").clone().addClass("js__soc-moved"));

	$(".project-slider").slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		slide: ".project-slider__slide"
	});

	$(".creat-slider__slider").slick({
		slide: ".creat-slider__slider-slide",
		slidesToScroll: 1,
		slidesToShow: 1
	});

	$(".creating-slider__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".creating-slider__slider-slide"
	});

	var $slider = $(".creating__slider-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slides: ".creating-slider",
		fade: true,
		arrows: false,
		swipe: false,
		touchMove: false
	});

	$(".creating-nav__el").click(function () {
		var $this = $(this),
		    index = $this.index();

		if (!$(".creating-nav").hasClass("js__opened") && $(window).width() <= 660) {
			$(".creating-nav").addClass("js__opened");
			return;
		} else if ($this.hasClass("active")) {
			$(".creating-nav").removeClass("js__opened");
			return;
		}

		$(".creating-nav__el.active").removeClass("active");

		$(".creating-nav__el:eq(" + index + ")").addClass("active");

		$slider.slick("slickGoTo", index);

		$(".creating-nav").removeClass("js__opened");

		if ($(window).width() < 1000) $("html, body").animate({
			scrollTop: $($(".creating-slider__text")[0]).offset().top - 20
		});
	});

	$(".team__slider").each(function (i, el) {
		var $this = $(el),
		    $slider = $this.find(".team-slider");

		$slider.slick({
			slidesToScroll: 1,
			slidesToShow: 3,
			appendArrows: $this.find(".team-slider__arrows"),
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 660,
				settings: {
					slidesToShow: 1,
					appendArrows: $slider
				}
			}]
		});
	});

	$(".accordion__one-title").click(function () {
		var $this = $(this),
		    $parent = $this.closest(".accordion__one");

		$parent.find(".accordion__one-text").slideToggle(300);

		// $(".accordion__one.js__opened").removeClass("js__opened");

		$parent.toggleClass("js__opened");
	});

	if (!X.IS_DESKTOP && $(".timeline__number").length) $(".timeline__number").countTo();
});

if (X.IS_DESKTOP) $(".text-page a:not([class]), .footer-mail a:not([class]),\
	 .head-phone__links a:not([class]), .direction__links a,\
	  .direction__title a").each(function (i, el) {
	var $this = $(el);

	if ($this.find("*").length) return;

	$this.html("<span>" + $this.text() + "</span>");

	$this.addClass("js__bg");
});

/** спасибо сафари за этот скрипт **/
var startY = 0,
    menuStart = 0;
document.addEventListener("touchstart", function (e) {
	startY = e.touches[0].screenY;

	menuStart = $(".head__menu").scrollTop();
});

document.addEventListener("touchmove", function (e) {
	if ($("body").hasClass("js__mobile-menu-opened") && $(window).width() <= 1000) {
		e.preventDefault();

		var amountMovedY = e.touches[0].screenY - startY;

		amountMovedY *= -1;

		$(".head__menu").scrollTop(menuStart + amountMovedY);
		return false;
	}
});

/************/

var setImgHeight = function setImgHeight(e) {
	$(".direction__img").height("auto");

	$(".direction__img").height(Math.max.apply(Math, _toConsumableArray($(".direction__img").map(function () {
		return $(this).height();
	}))));
};

$(function () {

	if ($(window).width() <= 1000) {
		var cert = $('.head .head__certificate').clone();

		$('.head__menu').append(cert);
	}

	setImgHeight();
});

$(window).on("resize", function (e) {
	setImgHeight();
});
//# sourceMappingURL=common.js.map
