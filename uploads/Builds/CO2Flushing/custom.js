/** Custom scripts for CO2 Flushing system menu navigation 
 * POC markup in index.html -- custom for this activity for rapid prototyping
*/

window.addEventListener('load', function() {    
       
    // if document has #scene-info
    if (document.getElementById('scene-info'))
        SceneInfoSetup();

    // TODO: Set up scene to broadcast events corresponding to checklist 
    // listen for Unity events #scene-info checklist
    // 1. UnityObjectSelected - payload: {objectName: string} name of obj selected
    window.addEventListener('UnityObjectSelected', (event) => {
       
        const objectName = event.detail.name.replace(/\s+/g, '');

        // look for list item with data-event matching objectName
        const listItem = document.querySelector(`#scene-info li[data-event="${objectName}"]`);
        
        if (listItem) {
            listItem.classList.add('_checked');
        }
        
        // if ERC Clamp OFF event, check if level1_function or bubble1_threshold are active, 
        // if so SetERCClamp(true) since they have priority
        if (objectName === 'ERCClampOFF') {
            
            const level1FunctionStatus = document.getElementById('level1_function_status').value;
            const bubble1ThresholdStatus = document.getElementById('bubble1_threshold_status').value;
            if (level1FunctionStatus !== 'Off' || bubble1ThresholdStatus !== 'Off') {
                setTimeout(() => {
                    SetERCClamp(true); 
                    console.log('ERC reclamped because system panel settings have priority');
                }, 1000);
            }
        }

    });

    // update #reset-scene-button to reset checklist
    const resetSceneButton = document.getElementById('reset-scene-button');
    if (resetSceneButton) {
        resetSceneButton.addEventListener('click', function() {
            // also reset the scene DOM elements
            ResetSceneInfoChecklist();
            ResetSystemPanel();
        });
    }
    
});

/* System panel POC setup */

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
    if (level1FunctionStatus !== 'Off') {
        level1Btn.classList.add('active');
        SetERCClamp(true);
    } else {
        level1Btn.classList.remove('active');
    }

    // if bubble1ThresholdStatus is not Off, set the #bubble1_btn class to active, else remove active
    const bubble1Btn = document.querySelector('#bubble1_btn');
    if (bubble1ThresholdStatus !== 'Off') {
        bubble1Btn.classList.add('active');
        SetERCClamp(true);
    } else {
        bubble1Btn.classList.remove('active');
    }
}
function SetERCClamp(status) {
    if (window.UnityInstance) {
        if (status) {
            window.UnityInstance.SendMessage('Main', 'SetERCClampOn');
        } else {
            window.UnityInstance.SendMessage('Main', 'SetERCClampOff');
        }
    }
}
function ResetSystemPanel() {
   // set all #system_panel .panel_page to inactive except first
    const panels = document.querySelectorAll('#system_panel .panel_page');
    panels.forEach((panel, index) => {
        if (index === 0) {
            panel.classList.remove('inactive');
        } else {
            panel.classList.add('inactive');
        }
    });

    // remove all active classes from #system_panel 
    const activeButtons = document.querySelectorAll('#system_panel .active');
    activeButtons.forEach(button => button.classList.remove('active'));
    
    // Set all select to last option (Off)
    const selects = document.querySelectorAll('#system_panel select');
    selects.forEach(select => {
        select.selectedIndex = select.options.length - 1;
    });

    // reset .status_text to Off
    const statusTexts = document.querySelectorAll('#system_panel .status_text');
    statusTexts.forEach(status => status.textContent = 'Off');
   
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
