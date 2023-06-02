L.Control.MapMeasure = L.Control.extend({
    _className: 'leaflet-control-measure',
    options: {
		minZoom: 3,
		maxZoom: 23
	},

    initialize: function(options) {
        L.setOptions(this, options);
        this._layers = [];
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar');
        // var container2 = leaflet.DomUtil.create('div', 'leaflet-bar');
        // var container3 = leaflet.DomUtil.create('div', 'leaflet-bar');
        var className = 'pgts-mapselection';
        var btn = leaflet.DomUtil.create('button', className, container);
        // var btn2 = leaflet.DomUtil.create('button', className, container2);
        // var btn3 = leaflet.DomUtil.create('button', className, container3);

        // container.appendChild(container2);
        // container.appendChild(container3);

        btn.innerHTML = "Confirm Map Selection";
        // btn2.innerHTML = "Button1";
        // btn3.innerHTML = "Button2";

        // L.DomEvent.on( btn, 'click', this._sendIds, this);
        // L.DomEvent.on( btn2, 'click', this._sendIds, this);

        return container;
    },
    initLayout: function(){
        const className = this._className;
        const container = L.DomUtil.create('div', `${className} leaflet-bar`);
        var template = L.Util.template('<div id="leaf"> Hello {a}, {b} </dvi>', {a: 'foo', b: 'bar'})
    }
});

L.control.MapMeasure = function(options) {
    return new L.Control.MapMeasure(options);
}