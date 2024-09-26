// This function goes to whatever URL you put in parentheses 
function goToPage(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    //List of items in the list slider
    let items = document.querySelectorAll('.slider .list .item');
    //Next button + prev button
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    //list of thumbnail images
    let thumbnails = document.querySelectorAll('.thumbnail .item');

    //count number of items in the slider
    let countItem = items.length;
    let itemActive = 0;


    //when clicking the next button, make the next item the active one
    next.onclick = function() {
        itemActive = itemActive + 1;
        if(itemActive >= countItem){
            itemActive = 0;
        }
        showSlider();
    }

    prev.onclick = function() {
        itemActive = itemActive - 1;
        if(itemActive < 0){
            itemActive = countItem -1;
        }
        showSlider();
    }

    // //make the slider run automatically (Only if you want to)
    // let refreshInterval = setInterval (() => {
    //     next.click();
    // }, 3000) //The 3000 means 3 seconds


    function showSlider(){
        let itemActiveOld = document.querySelector('.slider .list .item.active');
        let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
        itemActiveOld.classList.remove('active');
        thumbnailActiveOld.classList.remove('active');

        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');

        // //each time a slider appears, clear refreshInterval
        // clearInterval(refreshInterval);
        // refreshInterval = setInterval(() => {
        //     next.click();
        // }, 3000)
    }

    //click on thumbnail -> shows that image on big screen / selects that thumbnail
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        })
    })
});

// GSAP 
 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = document.querySelectorAll(".pSection");
    
    sections.forEach(section => {

      gsap.to(section.querySelector(".pContent"), {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top bottom", // Adjust this if you want to
          end: "bottom top",
        }
      });
  
      gsap.to(section.querySelector(".pImage"), {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top bottom", // Adjust this
          end: "bottom top",
        }
      });
    });
  });

  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

//lenis
// const lenis = new Lenis()
// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)
// lenis.on('scroll', ScrollTrigger.update)
// gsap.ticker.add((time)=>{
//   lenis.raf(time * 1000)
// })
// gsap.ticker.lagSmoothing(0)
//lenis END


function chapterAnim() {

		const gsapChapter = gsap.utils.toArray('.chap-anim');
		gsapChapter.forEach((gsCh) => {
      
			const chapterAbove = $(gsCh).find('.chapter__above');
			const chapterTitle = $(gsCh).find('.chapter__title');
      const chapterChapter = $(gsCh).find('.chapter');
      let sectionWrapp = $(gsCh).find('.section__wrapp');
      let winH = $(window).height();
      
      let goToSection = ScrollTrigger.create({
            trigger: sectionWrapp,
            start: "top bottom",
            refreshPriority: 1
          });
      
			let tl = gsap.timeline({
        scrollTrigger: {
          trigger: gsCh,
          start: "top 80%",
          markers: true,
          pin: false,
          refreshPriority: 1,
          once: true,
          onEnter: () => {
              gsap.to(window, {duration: 1, scrollTo: goToSection.start + winH, overwrite: "auto"});
              lenis.stop();
          }
        }
      });
      tl.to(chapterChapter, 0.2, { opacity: 1, ease: "none" })
			  .to(chapterAbove, 1, { opacity: 1, ease: "none" })
				.to(chapterTitle, 1, { opacity: 1, ease: "none" }, "-=.5")
      .to(chapterChapter, 1, { opacity: 0, ease: "none",
          onComplete: () => {
						lenis.start();
					}
           }, "-=.5")
		});

	}
	// chapterAnim();

const
 treshold=100,
 $win = $(window),
 scrEl=$(document.scrollingElement),
 sections=$('.section').fadeTo(0, 0);

let lastTop= $win.scrollTop();

function onScroll() {
  let top, bottom, height;
  const dTop = $win.scrollTop()-lastTop;
  const current = sections.filter((i, el)=>{
    ({top, bottom, height} = el.getBoundingClientRect());
    if (el.style.opacity==0 && !scrEl.is(':animated'))
    return top < innerHeight - treshold && bottom > treshold;
  })
  //console.log(current[0], current[0].style.opacity, current.hasClass('chap-anim'))
  if (current[0]?.style.opacity==0) {
    $('.chapter', current).fadeTo(0, 1).delay(700).fadeOut(700);
    sections.not(current[0]).stop().fadeTo(600, 0);
    current.stop().fadeTo(601, 1, ()=>{
      if (current.hasClass('chap-anim')) {
        let scrTop=current.offset().top;
        if (dTop<0) scrTop += innerHeight - height;
        $win.scrollTop(scrTop);
        
       } //else scrEl.animate({scrollTop: 0})     Maybe this was the cause of the scrolling issue 
    });
  }
}
$win.scroll(onScroll).scroll()

function titleAnim() {
		const gsapTitle = gsap.utils.toArray('.section__wrapp');
		gsapTitle.forEach((gsTl) => {
      let titleAnim = $(gsTl).find('h2');
			let tl = gsap.timeline({
        scrollTrigger: {
          trigger: gsTl,
          start: "top center",
          // end: "+=1500",
          // markers: true,
          scrub: 0.5,
          pin: false,//chnages this to false
          refreshPriority: 1
        }
      });
      tl.to(titleAnim, 0.2, { x: 50, ease: "none" })
		});
	}
	titleAnim();
  
 
//Mute and unmuting
function playAudio() {
  const audio = document.getElementById("myAudio");
  audio.play().catch(error => {
      console.log("Error playing audio:", error);
  });
}

function pauseAudio() {
  const audio = document.getElementById("myAudio");
  audio.pause();
}

  document.getElementById("playBtn").onclick = function() {
      playAudio();
  }

  document.getElementById("pauseBtn").onclick = function() {
      pauseAudio();
  }

