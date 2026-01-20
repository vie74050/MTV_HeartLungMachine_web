import $ from "jquery";
import { QuizUISetUp } from "./QuizSetUp";


export function SetupUI() {
    const header = `<div id="header" class="mmd instructions">
        <b>Select </b> <span class="icon mouse_lf" title="Left mouse click on objects to select them."></span>
        <b>Rotate </b> <span class="icon mouse_rt" title="Right mouse click & drag to orbit scene."></span> or A,D 
        <b>Zoom </b> <span class="icon mouse_wheel" title="Use scroll wheel to zoom."></span> or W,S
        <b>Pan </b> <span class="icon mouse_wheel" title="Click & drag the middle button to pan camera."></span> or arrow keys 
        </div>`;
      
    $("body").prepend($(header));    

    // create tooltips like element for handling short text from Unity
    const tooltipElem = `<div id="scene-info" style="display:block; position:absolute; z-index:1000;"></div>`;
    $("body").append($(tooltipElem));
    
    // Check for ?quiz=true in the URL, enable quiz UI if present
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    const isQuizEnabled = quizParam === 'true';
    if (isQuizEnabled)    
        QuizUISetUp("#header");
    
    $( document ).tooltip();
   
}

export function UpdateTooltipText(text: string) {
    const tooltipDiv = document.getElementById("scene-info");
    if (tooltipDiv) {
        tooltipDiv.innerHTML = text;
        // position the tooltipDiv based on mouse position
        document.onmousemove = function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            tooltipDiv.style.left = (mouseX + 15) + "px";
            tooltipDiv.style.top = (mouseY + 15) + "px";
        }

        // if text is empty, hide the tooltipDiv
        if (text.trim() === "") {
            tooltipDiv.style.display = "none";
        } else {
            tooltipDiv.style.display = "block";
        }
    }
}