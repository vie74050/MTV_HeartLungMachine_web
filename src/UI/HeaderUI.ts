import $ from "jquery";
import {UnityResetScene} from "../utils/UnityComm";

export function Header() {
    // Create the header HTML with instructions and controls

    let header = $("#header");
    if (header.length === 0) {
        header = $(`
            <div id="header">
                <button id="reset-scene-button">Reset Scene</button>
                <!-- Add more header content here if needed -->
            </div>
        `);
        $("body").prepend(header);
    }
      
    $("#reset-scene-button").on("click", function() {
        UnityResetScene();
        // Close all jQuery UI dialogs
        $(".ui-dialog-content").dialog("close");
    });
    
    $( document ).tooltip();
   
}

