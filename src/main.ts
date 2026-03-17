import $ from "jquery";
import { Header } from './UI/HeaderUI';
import { SystemPanelInit } from './UI/SystemPanel';
import { LoadUnity } from './utils/UnityLoaderSetup';
import './scss/styles.scss';
require('../node_modules/jquery-ui-dist/jquery-ui.min.js');
require('../node_modules/jquery-ui-dist/jquery-ui.min.css');

/** Create UI */
$(function(){
	LoadUnity(); 
	
	Header();
	SystemPanelInit();
});