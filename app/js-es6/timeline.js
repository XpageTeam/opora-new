let c = document.getElementById('timeline'),
    ctx = c.getContext('2d'),
    cw = c.width = 1903,
    ch = c.height = 250,
    points = [],
    tick = 0,
    opt = {
      count: 23,
      range: {
        x: 10,
        y: 70
      },
      duration: {
        min: 130,
        max: 150
      },
      thickness: 3,
      strokeColor: 'rgba(69, 35, 97, 1)',
      level: .35,
      curved: true
    },
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    },
    ease = function (t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    holdAnimation = false,
    step = 3;

    if ($(window).width() < 1280 && $(window).width() > 1099){
			opt.count = 20;
			step = 2;
		}else if ($(window).width() < 1100){
			opt.count = 19;
			step = 2;
		}

const posPoints = (points) =>{
	let blokedPoints = points[0].filter(point => point.blocking);

	// console.log(blokedPoints);
	let direction = "center",
			counters = {
				left: step,
				right: step,
			}

	for (let i = 0; i < count; i++){
		let point = {};

		switch (direction){
			case "right":
				point = points[0][centerPoint + counters.right];
				counters.right += step;
				direction = "left";
			break;
			case "left":
				point = point = points[0][centerPoint - counters.left];
				counters.left += step;
				direction = "right";
			break;
			default:
				point = point = points[0][centerPoint];
				direction = "right";
		}

		let $el = $(".timeline__el:eq("+i+")"),
				$counter = $el.find(".counter");

		$el.css({
			bottom: point.y+"px",
			left: point.x+"px",
		});

		$counter.css({
			background: "linear-gradient(to right, "+$counter.data("color1")+", "+$counter.data("color2")+")"
		}).countTo()
	}
}

ctx.transform(1, 0, 0, -1, 0, c.height);

ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
ctx.strokeStyle = opt.strokeColor;

let count = $(".timeline__el").length,
		centerPoint = Math.round(opt.count / 2);

class Point{
	constructor(config){
		this.anchorX = config.x;
		this.anchorY = config.y;
		this.x = config.x;
		this.y = config.y;
		this.setTarget();  
	}
	setTarget(){
		this.initialX = this.x;
		this.initialY = this.y;
		this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
		this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
		this.tick = 0;
		this.duration = rand(opt.duration.min, opt.duration.max);
	}
	update(){
		var dx = this.targetX - this.x;
		var dy = this.targetY - this.y;
		var dist = Math.sqrt(dx * dx + dy * dy);

		if(Math.abs(dist) <= 0){
			this.setTarget();
		} else {       
			var t = this.tick;
			var b = this.initialY;
			var c = this.targetY - this.initialY;
			var d = this.duration;
			this.y = ease(t, b, c, d);

			b = this.initialX;
			c = this.targetX - this.initialX;
			d = this.duration;
			this.x = ease(t, b, c, d);

			this.tick++;
		}
	}
	render(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		ctx.fillStyle = '#fff';
		ctx.fill();
	}
}

let updatePoints = (number = 0, needUpdate = false) =>{
  let i = points[number].length;
  while(i--){
  	if (points[number][i].blocking && !needUpdate)
  		continue
    points[number][i].update();
  }
},
renderPoints = (number = 0) =>{
  let i = points[number].length;
  while(i--){
    points[number][i].render();
  }
};

let renderShape = (color = "rgba(69, 35, 97, 1)", number = 0) =>{
	ctx.strokeStyle = color;
  ctx.beginPath();
  var pointCount = points[number].length;
  ctx.moveTo(points[number][0].x, points[number][0].y);

  var i;
  for (i = 0; i < pointCount - 1; i++) {
    var c = (points[number][i].x + points[number][i + 1].x) / 2;
    var d = (points[number][i].y + points[number][i + 1].y) / 2;
    ctx.quadraticCurveTo(points[number][i].x, points[number][i].y, c, d);
  }
  ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
  ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
  ctx.closePath();
  ctx.stroke();
};

var clear = function(){
  ctx.clearRect(0, 0, cw, ch);
};

var loop = function(){
	if (!holdAnimation)
  	tick = window.requestAnimationFrame(loop, c);
  clear();
  updatePoints();
  renderShape();
  // renderPoints();

	updatePoints(1);
	renderShape("rgba(69, 35, 97, .4)", 1);

	updatePoints(2);
	renderShape("rgba(69, 35, 97, .4)", 2);
};

var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);


for (var j = 0; j < 3; j++){
	points[j] = [];
	var i = opt.count + 2;
	while(i--){
	  points[j].push(new Point({
	    x: (spacing * (i - 1)) - opt.range.x,
	    y: ch - (ch * opt.level + rand(0, opt.range.y)),
	    blocking: false,
	  }));
	}
}

for (let i = 0; i < count; i++){
	for (let j = 0; j < 3; j++){
		points[j][centerPoint + i * step].blocking = true;
		points[j][centerPoint - i * step].blocking = true;
	}
}

posPoints(points);

loop();


let resizeTimeout;
// const prevComparison = performance.now();
$(window).on("resize1", () => {
	// const now = performance.now();

	clearTimeout(resizeTimeout);
	holdAnimation = true;

	resizeTimeout = setTimeout(() => {
		clear();
		tick = 0;

		let step = 3;
		opt.count = 23;

		// if ($(window).width() > 1601){
		// 	opt.count = 23;
		// 	step = 3;
		// }else if ($(window).width() < 1601 && $(window).width() > 1500){
		// 	opt.count = 20;
		// 	step = 3;
		// }else if ($(window).width() < 1500 && $(window).width() >= 1600){
		// 	opt.count = 18;
		// 	step = 3;
		// }

		ctx.transform(1, 0, 0, -1, 0, c.height);

		// if (now - prevComparison >= 100){
			// cw = c.width = $("#page-wr").width(),
			points = [];
			var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);

			for (var j = 0; j < 3; j++){
				points[j] = [];
				var i = opt.count + 2;
				while(i--){
				  points[j].push(new Point({
				    x: (spacing * (i - 1)) - opt.range.x,
				    y: ch - (ch * opt.level + rand(0, opt.range.y)),
				    blocking: false,
				  }));
				}
			}

			for (let i = 0; i < count; i++){
				for (let j = 0; j < 3; j++){
					points[j][centerPoint + i * step].blocking = true;
					// points[j][centerPoint + i * 3].y += 20;
					points[j][centerPoint - i * step].blocking = true;
					// points[j][centerPoint - i * 3].y += 20;
				}

				// updatePoints(i, true);
			}

			posPoints(points)
		// }

		holdAnimation = false;

		loop();

	}, 150);
});