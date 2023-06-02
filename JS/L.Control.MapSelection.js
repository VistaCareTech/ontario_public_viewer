L.Control.MapSelection = L.Control.extend({

    options: {
		minZoom: 3,
		maxZoom: 23
	},

    initialize: function(overlays, options) {
        L.setOptions(this, options);
        this._layers = [];
        for (const i in overlays) {
            this._addLayer(overlays[i], i, true);
        }
    },
    onAdd: function(map) {
        var container = leaflet.DomUtil.create('div', 'leaflet-bar');
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

        var grid = this._layers[0].layer

        grid.on('click', function(e){
            if (e.layer.feature.properties.selected === true) {
                grid.resetFeatureStyle(e.layer.feature.id);
                e.layer.feature.properties.selected = false
            }
            else{
                e.layer.feature.properties.selected = true
                e.layer.bringToFront();
                grid.setFeatureStyle(e.layer.feature.id, {
                    color: '#1DDADA',
                    weight: 3,
                    opacity: 1
                });
            }
          })

        map.on('mousemove', this._onMouseMove, this)

        L.DomEvent.on( btn, 'click', this._sendIds, this);
        // L.DomEvent.on( btn2, 'click', this._sendIds, this);

        return container;
    },
    _sendIds: function () {
        this._layers[0].layer.eachFeature(function(lyr) {
            if (lyr.feature.properties.selected){
                console.log(lyr.feature.id);
            }
        })
    },
    _getLayer: function () {
        for (let i = 0; i < this._layers.length; i++) {
            if (this._layers[i] && L.Util.stamp(this._layers[i].layer) === id) {
                return this._layers[i];
            }
        }
    },
    _addLayer: function (layer, name, overlay) {
        this._layers.push({
            layer: layer,
            name: name,
            overlay: overlay,
        });
    },
    _onMouseMove: function(e){
        var latlng = e.latlng;
    }
});

L.control.MapSelection = function(layer, options) {
    return new L.Control.MapSelection(layer, options);
}