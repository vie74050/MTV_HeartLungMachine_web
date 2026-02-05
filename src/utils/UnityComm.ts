import { UnityInstance } from "./UnityLoaderSetup";
import { UpdateTooltipText } from "../UI/UnityTooltip";
import $ from "jquery";
declare global {
  interface Window { 
    FromUnity_Hover: Function,
    FromUnity_Select: Function, 
    FromUnity_ApplicationStarted: Function, 
    FromUnity_SetListItems: Function,
    FromUnity_EndGame : Function,
    createUnityInstance: Function,
    interactibleNames: string[]
  }
}

// Handles communication coming from Unity Object to page
export function InitFromUnity() {  
  // These should correspond to Unity SendMessage calls in the/JSLibs of the unity porject

  /** Scene Start handler: called from Unity 
   * @param {string} str scene name, names of interactible objects
  */
  window.FromUnity_ApplicationStarted = function( str: string) {
    // store in global variable
    (window as any).interactibleNames = Array.from(
      new Set(
      str
        .split(",")
        .map(name => name.trim())
        .filter(name => name.length > 0)
      )
    ).sort();

    // Initialize tooltip text with empty
    UpdateTooltipText("");

  }
  
  /** Unity SelectableObject broadcasts string `transform_name` on Select */ 
  window.FromUnity_Select = function(transform_name) {
    console.log("Selected: " + transform_name);

    // create event
    const event = new CustomEvent('UnityObjectSelected', { detail: { name: transform_name } });
    window.dispatchEvent(event);
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