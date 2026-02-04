import { UnityInstance } from "./UnityLoaderSetup";
import { UpdateTooltipText } from "../UI/UnityTooltip";

declare global {
  interface Window { 
    FromUnity_Hover: Function,
    FromUnity_Select: Function, 
    FromUnity_ApplicationStarted: Function, 
    FromUnity_SetListItems: Function,
    FromUnity_EndGame : Function,
    createUnityInstance: Function
  }
}

// Handles communication coming from Unity Object to page
export function InitFromUnity() {  
  // These should correspond to Unity SendMessage calls in the/JSLibs of the unity porject

  /** Scene Start handler: called from Unity 
   * @param {string} str scene name, names of interactible objects
  */
  window.FromUnity_ApplicationStarted = function( str: string) {
    
    // log str -- the interactibles in scene as a comma-separated list
    // console.log("Application Started: " + str);
    const interactibleNames = str;

    // store in global variable
    (window as any).interactibleNames = interactibleNames.split(",");

    // Initialize tooltip text with empty
    UpdateTooltipText("");

  }
  
  /** Unity SelectableObject broadcasts string `transform_name` on Select */ 
  window.FromUnity_Select = function(transform_name) {
    console.log("Selected: " + transform_name);
    /*
    var $dialog = $("#hs_popup");
    
    $dialog.dialog("close");
    
    var key = transform_name.trim();
    if (key in data){
      $dialog.html(data[key])
        .dialog( "option", {
          "title": transform_name
        } )
        .dialog( "open" );
    }
    */
    
  }

  window.FromUnity_Hover = function(transform_name) {
    //console.log("Hovered: " + transform_name);
    UpdateTooltipText(transform_name);
  }

}

// SendMessage Methods: calls to Unity 
// must be after UnityInstance is created and handled in the Unity code
export function UnityResetScene() {
  // reloads active scene
  UnityInstance.SendMessage('Main', 'ResetScene');
}

export function UnityLoadNextScene() {
  UnityInstance.SendMessage('Main', 'LoadNextScene');
}

export function UnityLoadScene(n) {
  UnityInstance.SendMessage('Main', 'LoadScene', n);
}