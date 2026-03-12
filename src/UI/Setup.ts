import $ from "jquery";
import {UnityResetScene} from "../utils/UnityComm";
import '../scss/systemPanel.scss';

export function UISetup() {
    Header();

    // Initialize System Panel dialog if exists
    if ($("#system_panel").length != 0) 
    {
        SystemPanelInit();
    }
    
}

function Header() {
    // Create the header HTML with instructions and controls
    const header = `<div id="header" class="mmd instructions">
        <button id="reset-scene-button">Reset Scene</button>&nbsp;&nbsp;
        </div>`;
      
    $("body").prepend($(header));    

    $("#reset-scene-button").on("click", function() {
        UnityResetScene();
        // Close all jQuery UI dialogs
        $(".ui-dialog-content").dialog("close");
    });
    
    $( document ).tooltip();
   
}

function SystemPanelInit() {

    // get dialog element
    if ($("#system_panel").length) {

        // initialize dialog
        var $dialog = $("#system_panel");
        $dialog.dialog({
            title: "System Panel",
            autoOpen: false,
            modal: false,
            width: 500,
            height: 400,
            resizable: false
        });


        // listen for selection events to open dialog
        window.addEventListener('UnityObjectSelected', function(e: any) {
            var transform_name = e.detail.name;
            if (transform_name.trim() === "System Panel") {
                $dialog.dialog("open");
            }
            if (transform_name.trim() === "Machine OFF Button") {
                $dialog.dialog("close");
            }
        });
    }

}

