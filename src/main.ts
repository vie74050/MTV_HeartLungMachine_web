import { SetupUI } from './UI/Setup';
import './scss/styles.scss'; 
import $ from "jquery";
import { LoadUnity } from './utils/UnityLoaderSetup';

require('../node_modules/jquery-ui-dist/jquery-ui.min.js');
require('../node_modules/jquery-ui-dist/jquery-ui.min.css');

/** Create UI */
$(function(){
	LoadUnity(); 
	
	SetupUI();
});