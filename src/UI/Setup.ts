import $ from "jquery";
import {UnityResetScene} from "../utils/UnityLoaderSetup";
import { QuizUISetUp } from "./QuizSetUp";


export function SetupUI() {
    const header = `<div id="header" class="mmd instructions">
        <button id="reset-scene-button">Reset Scene</button>&nbsp;&nbsp;
        <b>Select</b> <span class="icon mouse_lf" title="Left-click objects to interact."></span>
        <b>Pan</b> <span class="icon mouse_lf" title="Left-click and drag background or use arrow keys."></span> or ⬅️➡️⬆️⬇️
        <b>Rotate</b> <span class="icon mouse_rt" title="Right-click and drag or use A/D keys to rotate camera."></span> or A/D
        <b>Zoom</b> <span class="icon mouse_wheel" title="Scroll wheel or W/S keys to zoom."></span>or W/S
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

