import $ from "jquery";
import {UnityResetScene} from "../utils/UnityLoaderSetup";
import { QuizUISetUp } from "./QuizSetUp";


export function SetupUI() {
    const header = `<div id="header" class="mmd instructions">
        <button id="reset-scene-button">Reset Scene</button>&nbsp;&nbsp;
        <b>Select </b> <span class="icon mouse_lf" title="Use mouse on objects to interact with items."></span>
        <b>Pan </b> <span class="icon mouse_lf" title="Click & drag the to pan camera."></span> or arrow keys 
        <b>Rotate </b> <span class="icon mouse_rt" title="Right mouse click & drag to orbit scene."></span> or A,D 
        <b>Zoom </b> <span class="icon mouse_wheel" title="Use scroll wheel to zoom."></span> or W,S
        </div>`;
      
    $("body").prepend($(header));    

    $("#reset-scene-button").on("click", function() {
        UnityResetScene();
    });
    // Check for ?quiz=true in the URL, enable quiz UI if present
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    const isQuizEnabled = quizParam === 'true';
    if (isQuizEnabled)    
        QuizUISetUp("#header");
    
    $( document ).tooltip();
   
}

