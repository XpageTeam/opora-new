class Video{
	constructor(el){
		this.Video = el;

		$(this.Video).attr("src", $(this.Video).attr("data-src"));
		

		this.onLoad();

		this.onPlay();

		this.onUpdate();

		this.onEnd();
	}
	set Video(el){
		this.el = el;
	}
	get Video(){
		return this.el;
	}
	set Duration(time){
		this.duration = time;
	}
	get Duration(){
		return this.duration;
	}
	onPlay(){
		// this.Video.addEventListener()

		if (!$("html").hasClass("bx-ie")){
			let VideoPromise = this.Video.play();

			VideoPromise.then(e => {
				this.Duration = this.Video.duration;
				this.showFirstScreen();
			}).catch(error => {
				console.log(error);
			});
		}else
			this.Video.addEventListener("play", () => {
				while(!this.Video.duration)
					this.Duration = this.Video.duration;
				
				this.showFirstScreen();
			});
	}
	onLoad(){
		this.Video.addEventListener("loadedmetadata", () =>{
			this.onPlay();

			this.onUpdate();

			this.onEnd();

			this.Video.play();
		});
	}
	onUpdate(){
		this.Video.addEventListener("timeupdate", () => {

		})
	}
	onEnd(){
		this.Video.addEventListener("ended", (e) => {
			$(".video-text__btn").addClass("visible");
		})
	}
	showFirstScreen(){
		$(".video-projects__count").countTo({
			speed: parseInt(this.Duration*950) || 9500
		});

		$(".video-text").addClass("js__animated");
	}
}

$(e =>{
	new Video($(".main-video video")[0])
});