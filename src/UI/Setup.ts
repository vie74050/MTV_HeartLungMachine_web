import $ from "jquery";
import {UnityResetScene} from "../utils/UnityComm";


export function Header() {
    // Create the header HTML with instructions and controls
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
    
    $( document ).tooltip();
   
}

