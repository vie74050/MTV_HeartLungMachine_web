/** Custom scripts for CO2 Flushing system menu navigation 
 * POC markup in index.html -- custom for this activity for rapid prototyping
*/

window.addEventListener('load', function() {    
    // if document has #system_panel
    if (document.getElementById('system_panel'))
        SystemPanelSetup();
    
    // if document has #scene-info
    if (document.getElementById('scene-info'))
        SceneInfoSetup();

    // listen for Unity events #scene-info checklist
    // 1. UnityObjectSelected - payload: {objectName: string} name of obj selected
    window.addEventListener('UnityObjectSelected', (event) => {
       console.log('Unity object selected:', event.detail.name);
       const objectName = event.detail.name;

        // look for list item with data-event matching objectName
        const listItem = document.querySelector(`#scene-info li[data-event="${objectName}"]`);
        
        if (listItem) {
            listItem.classList.add('_checked');
        }
    });

    // update #reset-scene-button to reset checklist
    const resetSceneButton = document.getElementById('reset-scene-button');
    if (resetSceneButton) {
        resetSceneButton.addEventListener('click', function() {
            // also reset the scene info checklist
            ResetSceneInfoChecklist();
        });
    }
    
});

/* System panel POC setup */

function SystemPanelSetup() {
    // if #system_panel .btn does not have onclick, set to disabled
    const buttons = document.querySelectorAll('#system_panel .btn');
    buttons.forEach(function(btn) {
        if (!btn.getAttribute('onclick')) {
            btn.classList.add('disabled');
        }
    });
}

// System panel menu navigation handler
function showSystemPanel(panelId) {
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

/* Scene Info POC setup - a checklist of the steps */
function SceneInfoSetup() {
    if (document.getElementById('scene-info')) {
        toggleListItems();
        // add a button the #header to toggle #scene-info visibility
        const header = document.getElementById('header');
        const toggleSceneInfoButton = document.createElement('button');
        toggleSceneInfoButton.id = 'toggle_scene_info_btn';
        toggleSceneInfoButton.className = 'right';
        toggleSceneInfoButton.innerHTML = 'Scene Info <span class="ui-button-icon ui-icon ui-icon-closethick"></span>';
        header.appendChild(toggleSceneInfoButton);
        toggleSceneInfoButton.addEventListener('click', function() {
            const sceneInfo = document.getElementById('scene-info');
            if (sceneInfo) {
                sceneInfo.classList.toggle('hidden');
                if (sceneInfo.classList.contains('hidden')) {
                    toggleSceneInfoButton.innerHTML = 'Scene Info 🗖';
                } else {
                    toggleSceneInfoButton.innerHTML = 'Scene Info <span class="ui-button-icon ui-icon ui-icon-closethick"></span>';
                }
            }
        });
    }
}

// for scene info list 
function toggleListItems() {
    // #scene-info h4 click event handler - toggles the closest .list-items-container
    const headers = document.querySelectorAll('#scene-info h4');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const listContainer = this.nextElementSibling;
            if (listContainer && listContainer.classList.contains('list-items-container')) {
                listContainer.classList.toggle('show');
            }
            header.classList.toggle('show');
        });
    });
}

function ResetSceneInfoChecklist() {
    const listItems = document.querySelectorAll('#scene-info li');
    listItems.forEach(item => item.classList.remove('_checked'));
}
