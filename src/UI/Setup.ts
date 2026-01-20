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

   
    
    // Check for ?quiz=true in the URL, enable quiz UI if present
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    const isQuizEnabled = quizParam === 'true';
    if (isQuizEnabled)    
        QuizUISetUp("#header");
    
    $( document ).tooltip();
   
}

