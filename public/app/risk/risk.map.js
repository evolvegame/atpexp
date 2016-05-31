
function link(scope, element, attrs) {
    scope.$watch('data', function(newValue,oldValue) {
    if(newValue !== oldValue){
    d3.select("#globeSVG").remove();
    d3.select(element[0]).select('.info').html('Click on a country!');
    var width = 500, height = width,
        projection, path,
        svg, features, graticule,
        mapJson = 'app/risk/finalCountries.json',
        countries, countrySet, zoom;
    
    projection = d3.geo.orthographic()
        .translate([width / 2, height / 2])
        .scale(250)
        .clipAngle(90)
        .precision(0.1)
        .rotate([0, -30]);
        
    // projection = d3.geo.equirectangular()
    // .scale(153)
    // .translate([width / 2, height / 2])
    // .precision(.1);
    
    path = d3.geo.path()
        .projection(projection);
    svg = d3.select(element[0]).select('.globe')
        .append('svg')
        .attr('id','globeSVG')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0, 0, ' + width + ', ' + height);
    svg
    features = svg.append('g');
    
    features.append('path')
        .datum({ type: 'Sphere' })
        .attr('class', 'spherebackground')
        .attr('d', path);
    
    graticule = d3.geo.graticule();

    features.append('path')
        .datum(graticule)
        .attr('class', 'graticule')
        .attr('fill', 'none')
        .attr('d', path);

    zoom = d3.geo.zoom()
        .projection(projection)
        .scaleExtent([projection.scale() * 0.7, projection.scale() * 8])
        .on('zoom.redraw', function () {
            d3.event.sourceEvent.preventDefault();
            svg.selectAll('path').attr('d', path);
        });
    
    d3.json(mapJson, function (error, world) {
        //states = topojson.feature(world, world.objects.states).features;
        countries = topojson.feature(world, world.objects.countries).features;
        
        // var text = d3.select(element[0]).select('.info').text();
        // if(text!=null && text.length>0){
        //     var res = text.split(":");
        //     for(var i=0; i<countries.length;i++){
        //         var countryData = countries[i];
        //         if(countryData.properties.name == res[0]){
        //             var val = (scope.data[countryData.id]) ? scope.data[countryData.id] : 0;
        //             d3.select(element[0]).select('.info').html(res[0] + ':' + val);
        //             rotateToFocusOn(countryData);
        //             break;
        //         }else{
        //             d3.select(element[0]).select('.info').html('Click on a country');
        //         }
        //     }
        // } else{
        //     d3.select(element[0]).select('.info').html('Click on a country');
        // }
        //stateSet = drawFeatureSet('state', states);
        countrySet = drawFeatureSet('country', countries);
        
        
        
        d3.selectAll('path').call(zoom);
    });
    
    
    
    function drawFeatureSet(className, featureSet) {
        var set = features.selectAll('.' + className)
            .data(featureSet)
            .enter()
            .append('g')
            .attr('class', className)
            .attr('data-name', function (d) {
                return d.properties.name;
            })
            .attr('data-id', function (d) {
                return d.id;
            });
            
        set.append('path')
            .attr('class', 'land')
            .attr('d', path);

        set.append('path')
            .attr('class', 'overlay')
            .attr('d', path)
            .attr('stroke', 'black')

            .attr('style', function (d) {
                if (scope.data[d.id]>=5) {
                    return  'fill: #cc3300; fill-opacity: ' + (scope.data[d.id] / 5);
                } else if (scope.data[d.id]>=4){
                    return  'fill: #ff5050; fill-opacity: ' + (scope.data[d.id] / 4);
                } else if (scope.data[d.id]>= 3){
                    return  'fill: #ffb31a; fill-opacity: ' + (scope.data[d.id] / 3);
                } else if (scope.data[d.id]>=2){
                    return  'fill: #ccff33; fill-opacity: ' + (scope.data[d.id] / 2);
                } else {
                    return  'fill: #009933; fill-opacity: ' + (scope.data[d.id] / 1);
                }
                
                 
            })

/*           .attr('style', function (d) {
                if (scope.data[d.id]>2.5) {
                    return 'fill: #cc3300; fill-opacity: ' + (scope.data[d.id] / 5);
                }else{
                    return  'fill: #6e9353; fill-opacity: ' + (scope.data[d.id] / 5);
                }
                 
            })*/
            .on('click', function (d) {
                var val = (scope.data[d.id]) ? scope.data[d.id] : 0;
                d3.select(element[0]).select('.info').html(d.properties.name);
                scope.bubbleCtrlFn({arg1: d.id});
                rotateToFocusOn(d);
            });
        
        return set;
    }

    function rotateToFocusOn(x) {
        var coords = d3.geo.centroid(x);
        coords[0] = -coords[0];
        coords[1] = -coords[1];

        d3.transition()
            .duration(1250)
            .tween('rotate', function () {
                var r = d3.interpolate(projection.rotate(), coords);
                return function (t) {
                    projection.rotate(r(t));
                    svg.selectAll('path').attr('d', path);
                };
            })
            .transition();
    }
    }
    }, true);
}