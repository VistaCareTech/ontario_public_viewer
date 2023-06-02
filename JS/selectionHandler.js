var gridstyle = [];

export function selectionEventHandler(map, grid){
    map.on('lasso.finished', event => {
        setSelectedLayers(event.layers, grid);
    });
    
    // Zoom reload
    
    grid.on('load', function (e) {
        myZoomHandler(grid);
    });
    
    map.on('zoomend', function (e) {
        saveCurrentStyle(grid);
    })
}

function saveCurrentStyle(fl) {
    gridstyle = [];
    fl.eachFeature(function(layer) {
        if (layer.feature.properties.selected){
            gridstyle.push(layer.feature.id)
        }
    });
}

function myZoomHandler(fl) {
    gridstyle.forEach(item => {
        var ft = fl.getFeature(item)

        ft.feature.properties.selected = true
        ft.bringToFront();
        fl.setFeatureStyle(item, {
            color: '#1DDADA',
            weight: 3,
            opacity: 1
        });
    });
}

function setSelectedLayers(layers, fl) {
    // resetSelectedState();

    layers.forEach(layer => {
        // layer.setStyle({ color: '#ff4620' });
        if (layer.options.url === fl.options.url) {
            if (layer.feature.properties.selected === true) {
                fl.resetFeatureStyle(layer.feature.id);
                layer.feature.properties.selected = false
            }
            else{
                layer.feature.properties.selected = true
                layer.bringToFront();
                fl.setFeatureStyle(layer.feature.id, {
                    color: '#1DDADA',
                    weight: 3,
                    opacity: 1
                });
            }
        }
    });
}

