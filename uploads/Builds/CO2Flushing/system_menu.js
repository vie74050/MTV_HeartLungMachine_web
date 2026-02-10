/** Custom scripts for CO2 Flushing system menu navigation */
window.addEventListener('load', function() {
    // if #system_panel .btn does not have onclick, set to disabled
    const buttons = document.querySelectorAll('#system_panel .btn');
    buttons.forEach(function(btn) {
        if (!btn.getAttribute('onclick')) {
            btn.classList.add('disabled');
        }
    });
    console.log("loaded");
});

function showPanel(panelId) {
    // Hide all panels
    const panels = document.querySelectorAll('.panel_page');
    panels.forEach(panel => panel.classList.add('inactive'));
    // Show the selected panel
    const panelToShow = document.getElementById(panelId);
    if (panelToShow) {
        panelToShow.classList.remove('inactive');
    }

    // check status of level1_function and bubble1_threshold and update status text
    const level1FunctionStatus = document.getElementById('level1_function_status').value;
    document.querySelector('#level1_menu .panel_box:nth-child(3) .status_text').textContent = level1FunctionStatus;
    
    const bubble1ThresholdStatus = document.getElementById('bubble1_threshold_status').value;
    document.querySelector('#bubble1_menu .panel_box:nth-child(2) .status_text').textContent = bubble1ThresholdStatus;

    // if level1functionStatus set the #level1_btn class to active, else remove active
    const level1Btn = document.querySelector('#level1_btn');
    if (level1FunctionStatus === 'On') {
        level1Btn.classList.add('active');
    } else {
        level1Btn.classList.remove('active');
    }

    // if bubble1ThresholdStatus is not Off, set the #bubble1_btn class to active, else remove active
    const bubble1Btn = document.querySelector('#bubble1_btn');
    if (bubble1ThresholdStatus !== 'Off') {
        bubble1Btn.classList.add('active');
    } else {
        bubble1Btn.classList.remove('active');
    }
}