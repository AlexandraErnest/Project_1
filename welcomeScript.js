// This function goes to whatever URL you put in parentheses 
function goToPage(url) {
    window.location.href = url;
}

gsap.registerPlugin(ScrollTrigger);

const contents = gsap.utils.toArray("#horizontal .content");

gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    scrollTrigger:{
        trigger: "#horizontal",
        pin: true,
        scrub: 1, //if you scroll down or up, it will control the animation
    },
});

document.getElementById("buttonEnter").addEventListener("click", function() {
    var audio = document.getElementById("clickAudio");
    
    audio.play().then(function() {
        console.log("Audio is playing");
    }).catch(function(error) {
        console.log("Audio failed to play:", error);
    });
    
    audio.onended = function() {
        window.location.href = "allCountries.html";
    };
});

//Mute and unmuting
document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("bg_music");
    var muteButton = document.getElementById("muteButton");

    // Update images
    function updateMuteButton() {
        if (audio.muted) {
            muteButton.src = "white_mute.png";  
        } else {
            muteButton.src = "white_unmute.png";  
        }
    }
    updateMuteButton();

    muteButton.addEventListener("click", function() {
        audio.muted = !audio.muted;
        updateMuteButton();
    });
});




