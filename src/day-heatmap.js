/**
 *  day-heatmap. (https://github.com/CorentinTh/day-heatmap)
 *  Created by Corentin THOMASSET (https://github.com/CorentinTh)
 *  Licensed under MIT.
 */
 
var DayHeatmap = function (element, options) {
    this._map = function (n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };

    this._isObject = function (obj) {
        return (!!obj) && (obj.constructor === Object);
    };

    this._isArray = function (obj) {
        return (!!obj) && (obj.constructor === Array);
    };


    if(options && !this._isObject(options)){
        console.error("Second parameter 'options' must be an object.");
        return;
    }

    this._colors = [
        "#7ae0cc",
        "#3fc5ab",
        "#379e8a",
        "#28675b",
        "#294C58"
    ];

    if(options && options.colors){
        if(options.colors.length != 5){
            console.error("Colors must be a 5 elements array.");
            return;
        }

        this._colors = options.colors;
    }

    if(document.getElementById(element) == undefined){
        console.error("First parameter 'element' doesn't exist.");
        return;
    }

    this._options = options;
    this._element = (element.charAt(0) == '#' ? '' : '#') + element;

    console.log(this.element);

    var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];


    $(this._element).addClass("day-heatmap-container");
    $(this._element).append("<div class='day'><div class='day-label'></div><div class='hours'></div></div>");

    for (var i = 1; i < 8; ++i) {
        var notShowDay = (this._options && this._options.halfDays && i%2==0);
        $(this._element).append("<div class='day' data-day='" + (i == 7 ? 0 : i) + "'><div class='day-label'>" + (notShowDay ? '' : days[i - 1])+ "</div><div class='hours'></div></div>");
    }

    var that = this;
    $(this._element + " .day .hours").each(function (index) {

        for (var i = 0; i < 24; ++i) {
            if (index == 0) {
                var notShowHour = (that._options && that._options.halfHours && i%2==1);

                $(this).append("<div class='hour-label'>" + (notShowHour ? '' : i + 'h') + "</div>");
            } else {
                $(this).append("<div class='hour' data-hour='" + i + "' data-value='0'></div>");
            }
        }
    });


    this.data = function(data){
        if(!this._isArray(data)){
            console.error("Data must be an array");
            return;
        }

        this._data = data;
        return this;
    };

    this.draw = function() {
        var data = [];

        for (var i = 0; i < this._data.length; ++i) {
            var obj = this._data[i];

            var day = new Date(obj.timestamp * 1000).getDay();
            var hour = new Date(obj.timestamp * 1000).getHours();

            var e = $($("#day-heatmap").find("[data-day='" + day + "']")[0]).find("[data-hour='" + hour + "']")[0];

            var val = parseInt($(e).attr("data-value"), 10) + obj.value;
            $(e).attr("data-value", val);
            data.push({value: val, element: e});
        }

        var that = this;
        var max = Math.max.apply(Math,data.map(function(o){return o.value;}));
        console.log(max);
        data.forEach(function (data) {
            //$(data.element).addClass("color" + Math.floor(this._map(data.value, 0, data[0].value, 0, 4)));
            if(data.value == 0) return;
            $(data.element).css("background-color", that._colors[Math.floor(that._map(data.value, 0,max, 0, 4))]);
        });
    };



    return this;
};