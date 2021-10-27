// set vars for background
let landingPage = document.querySelector(".landing-page");
const spansEl = document.querySelectorAll(".random-backgrounds span");
let imgsArray = ["01.jpg", "02.jpg" , "03.jpg" , "04.jpg" , "05.jpg" ];
let backgroundoption = true;
let backgroundInterval;
let localBg  = localStorage.getItem("bg-option");
const navBullets = document.querySelectorAll(".navigation-bullets .bullets");

if(localBg !== null){
	if(localBg == "true"){
		backgourndoption = true;
	}else{
		backgroundoption = false;
	}
	spansEl.forEach((element)=>{
		element.classList.remove("active");
	});

	if(localBg === "true"){
		let spanYes = document.querySelector(".random-backgrounds .yes");
			spanYes.classList.add("active");
	}else{
		let spanNo = document.querySelector(".random-backgrounds .no");
		spanNo.classList.add("active");

	}

}


function randomizeImgs(){

	if(backgroundoption === true){
		backgroundInterval = setInterval(function(){
			let randomNumeber = Math.floor(Math.random() * imgsArray.length);
			landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumeber]}")`;
		}, 15000);		
	}
};
randomizeImgs();

// control random background

spansEl.forEach(function(span){
	span.addEventListener("click",function(e){
		e.target.parentElement.querySelectorAll(".active").forEach(function(element){
			// remove active class
			element.classList.remove("active");
		});
		// add active class
		e.target.classList.add("active");
		if(e.target.dataset.background === "true"){
			
			backgroundoption = true;
			randomizeImgs();
			localStorage.setItem("bg-option",true);
		}else if(e.target.dataset.background === "false"){
			backgroundoption = false;
			clearInterval(backgroundInterval);
			localStorage.setItem("bg-option",false);
		}
	});
});


//  toggle class
let settingBox = document.querySelector(".setting-box");
let icon = document.querySelector(".icon");

function toggleClass(){
	settingBox.classList.toggle("open");
	
};

icon.addEventListener("click", toggleClass);


// switch main color

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(function(li){
	li.addEventListener("click",function(e){
		let targetColor = e.target.dataset.color;
		// set color on root 
		document.documentElement.style.setProperty('--maincolor',targetColor);

		localStorage.setItem("color-option", targetColor);

		e.target.parentElement.querySelectorAll(".active").forEach(function(ele){
			ele.classList.remove("active");
		});
		e.target.classList.add("active");
		
	});
});

// save maincolor on localstorage

let maincolor = localStorage.getItem("color-option");
// check if thers color option on local storage
if(maincolor !== null ){
	document.documentElement.style.setProperty("--maincolor", maincolor);
	
// check for active class
	document.querySelectorAll(".colors-list li").forEach(function(li){
			li.classList.remove("active");
			// check if dataset == maincolor
			if(li.dataset.color == maincolor){

				li.classList.add("active");
			}

		});	
};

const navOption = document.querySelectorAll('.nav-option span');
let navigationBullets = document.querySelector('.navigation-bullets');
let bulletsLocalItem = localStorage.getItem('bullets-option');
let activeClass = localStorage.getItem('active-class');


// check if localstorage is null or not
if(bulletsLocalItem !== null){
	navigationBullets.style.display = bulletsLocalItem;
};
if(bulletsLocalItem === 'block'){
		// document.querySelector('.block').classList.add(activeClass);
		navOption.forEach(function(ele){
			ele.classList.remove('active');
		});
		document.querySelector('.block').classList.add(activeClass);
	}else if(bulletsLocalItem === 'none'){
		navOption.forEach(function(ele){
			ele.classList.remove('active');
		});
		document.querySelector('.none').classList.add(activeClass);
	}

// reset sitting box options


// control navigation bullets

navOption.forEach(function(span){
	span.addEventListener('click', function(e){
		e.target.parentElement.querySelectorAll('.active').forEach(function(element){
				element.classList.remove('active');
			});
			e.target.classList.add('active');

			if(e.target.classList.contains("block")){
				localStorage.setItem('active-class','active');
				localStorage.setItem('bullets-option','block');
				navigationBullets.style.display = 'block';
			}else{
				navigationBullets.style.display = 'none';
				localStorage.setItem('bullets-option','none');
				localStorage.setItem('active-class','active');
			}
		
	});
});




// animate skills when reaching the section
// setup vars
let Ourskills = document.querySelector(".skills .container");

window.onscroll = function(){
	let OurskillsOffsetTop = Ourskills.offsetTop;
	let OurskillsOuterHieght = Ourskills.offsetHeight;
	let windowHeight = window.innerHeight;
	let windowScrollTop = window.pageYOffset;

	if(windowScrollTop > (OurskillsOffsetTop + OurskillsOuterHieght - windowHeight)){
		let allSkills = document.querySelectorAll(".skills-box .skill-progress span");
		allSkills.forEach(function(skill){
			skill.style.width = skill.dataset.progress;
			
		});
	}

}

// gallery
const gallery = document.querySelector(".gallery");
let galleryBox = document.querySelectorAll(".images-box img");
// loop on imgs
galleryBox.forEach(function(img){
	img.addEventListener("click",function(e){
		
		let imgSrc = e.target.src;
		// create overlay element
		let galleryOverlay = document.createElement("div");
		// set className on galleryOverlay
		galleryOverlay.className = "gallery-overlay";
		// append galleryOvelay on body
		document.body.appendChild(galleryOverlay);
		// create popUp
		let popUp = document.createElement("div");
		// set className on popUp
		popUp.className = "popUp";

		// check
		if(img.alt !== null){
			// create h4
			let heading = document.createElement("h4");
			// set className to h4
			heading.className = 'popup-heading';
			// create textNode
			let headingNode = document.createTextNode(img.alt);
			// append headingNode to heading Element
			heading.appendChild(headingNode);
			// append heading to the popup
			popUp.appendChild(heading);
		};

		// create image element
		let imag = document.createElement("img");
		// set className on imag element
		imag.className = "big-image";
		// set src on imag element
		imag.src = imgSrc;
		// append img element on popUp
		popUp.appendChild(imag);
		// append popUp on gallery section
		gallery.appendChild(popUp);
		// creat close element
		let closeElement = document.createElement("span");
		// create textNode
		let closeElementTextNode = document.createTextNode("x");
		// set className to closElement
		closeElement.className = 'close';
		// append closeElementTextNode to closeElement
		closeElement.appendChild(closeElementTextNode);
		// append closeElement to popup
		popUp.appendChild(closeElement);
		
	});
});

// click on close btn
document.addEventListener("click", function(e){
	if(e.target.className  == 'close'){
		document.querySelector(".popUp").remove();
		document.querySelector(".gallery-overlay").remove();
	};
});


// navifation bullets

	navBullets.forEach(function(bullet){
		bullet.addEventListener("click", function(e){
			document.querySelectorAll('.active').forEach(function(ele){
				ele.classList.remove('active');
			});
			e.target.classList.add('active');
			// scroll to section
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});	

// click on links navbar
const anchors = document.querySelectorAll('.header-area .links li a');
	anchors.forEach(function(a){
		a.addEventListener("click", function(e){
			e.preventDefault();
			document.querySelectorAll('.active').forEach(function(ele){
				ele.classList.remove('active');
			});
			// add active class on current element
			e.target.classList.add('active');
			// scroll to section
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth'
			});
			navBullets.forEach(function(bullet){
				if(e.target.dataset.section === bullet.dataset.section){
					document.querySelectorAll('.active').forEach(function(ele){
						ele.classList.remove('active');
					});
					bullet.classList.add('active');
				}
			})
		});
	});
	

// click on reset option
document.querySelector('.reset-option .reset').onclick = function(){
	localStorage.clear();
	window.location.reload();
};


// toggle menu
const links = document.querySelector(".links-container .links");
let span = document.getElementById("triongel");
const menuIcon = document.getElementById("menu");

menuIcon.onclick = function(){
	links.classList.toggle("open");
	if(links.classList.contains("open")){
		span.style.display = 'block';
		document.querySelector(".menu i").style.color = 'var(--maincolor)';
	}else{
		span.style.display = 'none';
		document.querySelector(".menu i").style.color = 'white';
	}
	
};



