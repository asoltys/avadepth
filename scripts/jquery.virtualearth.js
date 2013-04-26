/// <reference path="jquery-1.3.2.js" />
/* ************************************************************************************ */
/* VEToolkit jQuery v6.2.040809.1624 - http://codeplex.com/VEToolkit                    */
/* Copyright (C) 2009 Chris Pietschmann (http://pietschsoft.com). All Rights Reserved.  */
/* This project is licensed under the Microsoft Public License (Ms-PL)                  */
/* This license can be found here: http://www.codeplex.com/VEToolkit/license            */
/* ************************************************************************************ */
/* So far this is just a prototype of a jQuery plugin for the Virtual Earth Toolkit, use at your own risk. */
(function($) {
    $.fn.veMap = function(options) {
        var opts = $.extend({}, $.fn.veMap.defaults, options);

        //var map = new VEMap(this[0].id);
        var map = new VEMap(this.attr('id'));
        map.SetDashboardSize(opts.dashboard);
        map.LoadMap(opts.latlong, opts.zoom, opts.style, opts.fixed, opts.mode, opts.showSwitch, opts.tileBuffer, opts.mapOptions);
        this.data("VEMap", map);

        return this;
    };
    $.fn.veMapGet = function() {
        return this.data("VEMap");
    },

    $.fn.veMapExec = function(funcToExecute) {
        var map = this.veMapGet();
        if (map) {
            funcToExecute(map);
        }
        return this;
    },

    $.fn.veMapAttachEvent = function(eventName, functionEventHandler) {
        this.veMapExec(function(map) {
            map.AttachEvent(eventName, functionEventHandler);
        });
    },

    $.fn.veMapDetachEvent = function(eventName, functionEventHandler) {
        this.veMapExec(function(map) {
            map.DetachEvent(eventName, functionEventHandler);
        });
    },

    $.fn.Resize = function(w, h) { var map = this.veMapGet(); map.Resize(w, h); },

    $.fn.createVELayer = function(title) { var obj = new VEShapeLayer(); obj.SetTitle(title); this.veMapGet().AddShapeLayer(obj); return obj },

    $.fn.veMap.defaults = {
        latlong: null,
        zoom: null,
        style: null,
        fixed: null,
        mode: null,
        showSwitch: null,
        tileBuffer: null,
        mapOptions: null,
        dashboard: VEDashboardSize.Small
    };

})(jQuery);