/** The HLM System panel UI */

import $ from "jquery";

export function SystemPanelInit() {

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


        // listen for selection events from model to open/close dialog
        window.addEventListener('UnityObjectSelected', function(e: any) {
            var transform_name = e.detail.name;
            if (transform_name.trim() === "System Panel") {
                $dialog.dialog("open");
            }
            if (transform_name.trim() === "Machine OFF Button") {
                $dialog.dialog("close");
            }
        });

        // if #system_panel .btn does not have onclick, set to disabled
        const buttons = document.querySelectorAll('#system_panel .btn');
        buttons.forEach(function(btn) {
            if (!btn.getAttribute('onclick')) {
                btn.classList.add('disabled');
            }
        });

}
