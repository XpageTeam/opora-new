"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
	function Video(el) {
		_classCallCheck(this, Video);

		this.Video = el;

		$(this.Video).attr("src", $(this.Video).attr("data-src"));

		this.onLoad();

		this.onPlay();

		this.onUpdate();

		this.onEnd();
	}

	_createClass(Video, [{
		key: "onPlay",
		value: function onPlay() {
			var _this = this;

			// this.Video.addEventListener()

			if (!$("html").hasClass("bx-ie")) {
				var VideoPromise = this.Video.play();

				VideoPromise.then(function (e) {
					_this.Duration = _this.Video.duration;
					_this.showFirstScreen();
				}).catch(function (error) {
					console.log(error);
				});
			} else this.Video.addEventListener("play", function () {
				while (!_this.Video.duration) {
					_this.Duration = _this.Video.duration;
				}_this.showFirstScreen();
			});
		}
	}, {
		key: "onLoad",
		value: function onLoad() {
			var _this2 = this;

			this.Video.addEventListener("loadedmetadata", function () {
				_this2.onPlay();

				_this2.onUpdate();

				_this2.onEnd();

				_this2.Video.play();
			});
		}
	}, {
		key: "onUpdate",
		value: function onUpdate() {
			this.Video.addEventListener("timeupdate", function () {});
		}
	}, {
		key: "onEnd",
		value: function onEnd() {
			this.Video.addEventListener("ended", function (e) {
				$(".video-text__btn").addClass("visible");
			});
		}
	}, {
		key: "showFirstScreen",
		value: function showFirstScreen() {
			$(".video-projects__count").countTo({
				speed: parseInt(this.Duration * 950) || 9500
			});

			$(".video-text").addClass("js__animated");
		}
	}, {
		key: "Video",
		set: function set(el) {
			this.el = el;
		},
		get: function get() {
			return this.el;
		}
	}, {
		key: "Duration",
		set: function set(time) {
			this.duration = time;
		},
		get: function get() {
			return this.duration;
		}
	}]);

	return Video;
}();

$(function (e) {
	new Video($(".main-video video")[0]);
});
//# sourceMappingURL=video.js.map
