
const track = document.getElementById("image-track");

const handleOnDown = e => {
	track.dataset.mouseDownAt = e.clientX;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "-20") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

const handleOnUp = () => {
	track.dataset.mouseDownAt = "-20";
	track.dataset.prevPercentage = track.dataset.percentage;
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const enhance = id => {
	const element = document.getElementById(id),
		text = element.innerText.split("");
		
	element.innerText = "";
	
	text.forEach((value, index) => {
		
	const outer = document.createElement("span");	
	outer.className = "outer";	
	const inner = document.createElement("span");	
	inner.className = "inner";	
	inner.style.animationDelay = `${rand(-5000, 0)}ms`;	
	const letter = document.createElement("span");	
	letter.className = "letter";	
	letter.innerText = value;	
	letter.style.animationDelay = `${index * 1000 }ms`;	
	inner.appendChild(letter);    	
	outer.appendChild(inner);    	
	element.appendChild(outer);
  });
}



window.onmousedown = e => handleOnDown(e);
window.onmouseup = e => handleOnUp(e);
window.onmousemove = e => handleOnMove(e);

/*- Touch Controls */
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.ontouchmove = e => handleOnMove(e.touches[0]);

enhance("channel-link");