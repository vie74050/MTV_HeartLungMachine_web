import $ from "jquery";
import { Header } from './UI/HeaderUI';
import { SystemPanelInit } from './UI/SystemPanel';
import { LoadUnity } from './utils/UnityLoaderSetup';
import './scss/styles.scss';
require('../node_modules/jquery-ui-dist/jquery-ui.min.js');
require('../node_modules/jquery-ui-dist/jquery-ui.min.css');

declare const __BUILD_DATE__: string;

console.log("Build date:", __BUILD_DATE__);

/** Create UI */
$(function(){
	LoadUnity(); 
	
	Header();
	SystemPanelInit();

	// add build date bottom right
	$('body').append(`<div style="position: fixed; bottom: 5px; right: 5px; font-size: 10px; color: #888;">Build date: ${__BUILD_DATE__}</div>`);
});