/* ************************************************************************************ */
/* VEToolkit jQuery v6.2.040809.1624 - http://codeplex.com/VEToolkit                    */
/* Copyright (C) 2009 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
/* So far this is just a prototype of a jQuery plugin for the Virtual Earth Toolkit, use at your own risk. */
(function($) {
    $.fn.veMap = function(options) {
        /// <summary>Creates a Virtual Earth Map (VEMap) within this element.</summary>
    };

    $.fn.veMapExec = function(funcToExecute) {
        /// <summary>Allows you to easily Execute a specific Function, and passes that function a single parameter that is the VEMap object instance of the Map to Execute Manipulations for. If the VEMap has not been initialized/created yet, then the Function is not called.</summary>
        /// <param name="funcToExecute" type="Function">The function to call and send the following parameters: (VEMap map)</param>
    };

    $.fn.veMapAttachEvent = function(eventName, functionEventHandler) {
        /// <summary>Attaches a Map Control event to a specified function.</summary>
        /// <param name="eventName" type="string">The name of the Map Control event that generates the call.</param>
        /// <param name="functionEventHandler" type="Function">The function to run when the event fires. It can be either the name of a function or the function itself.</param>
    };

    $.fn.veMapDetachEvent = function(eventName, functionEventHandler) {
        /// <summary>Detaches the specified map control event so that it no longer calls the specified function.</summary>
        /// <param name="eventName" type="string">The name of the map control event that generates the call.</param>
        /// <param name="functionEventHandler" type="Function">The function that was specified to run when the event fired.</param>
    };

    $.fn.veMap.defaults = {
        latlong: null,
        zoom: null,
        style: null,
        fixed: null,
        mode: null,
        showSwitch: null,
        tileBuffer: null,
        mapOptions: null
    };
})(jQuery);