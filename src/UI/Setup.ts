import $ from "jquery";
import { QuizUISetUp } from "./QuizSetUp";


export function SetupUI() {
    const header = `<div id="header" class="mmd instructions">
        <b>Select </b> <span class="icon mouse_lf" title="Left mouse click on objects to select them."></span>
        <b>Pan </b> <span class="icon mouse_lf" title="Left mouse click & drag to pan camera."></span> or arrow keys 
        <b>Rotate </b> <span class="icon mouse_rt" title="Right mouse click & drag to orbit scene."></span> or A,D 
        <b>Zoom </b> <span class="icon mouse_wheel" title="Use scroll wheel to zoom."></span> or W,S
        </div>`;
      
    $("body").prepend($(header));    

    // Check for ?quiz=false in the URL, if false, skip quiz setup (for 3D model viewer only mode)
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    const isQuizEnabled = quizParam === null || quizParam !== 'false';
    if (isQuizEnabled)    
        QuizUISetUp("#header");
    
    $( document ).tooltip();
   
}