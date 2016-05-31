
function maplink(scope, element, attrs) {
    scope.$watch('data', function(newValue,oldValue) {
    if(newValue !== oldValue){
    d3.select("#globeSVG").remove();
    var width = 800, height = width/2,
        projection, path,
        svg, features, //graticule,
        mapJson = 'app/risk/finalCountries.json',
        countries, countrySet, zoom,
        scale0 = (width - 1) / 2 / Math.PI;;
    
        
    projection = d3.geo.mercator()
                .scale((width + 1) / 2 / Math.PI)
                .translate([width / 2, height / 2])
                .precision(.1);
    
    path = d3.geo.path().projection(projection);
    
    svg = d3.select(element[0]).select('.globe')
        .append('svg')
        .attr('id','globeSVG')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0, -50, ' + width + ', ' + height);
    
    features = svg.append('g');
    
    features.append('path')
        .datum({ type: 'Sphere' })
        .attr('class', 'mapbackground')
        .attr('d', path);
    
/*    graticule = d3.geo.graticule();

    features.append('path')
        .datum(graticule)
        .attr('class', 'graticule')
        .attr('fill', 'none')
        .attr('d', path);*/


    function zoomed() {
             projection.translate(zoom.translate())
                       .scale(zoom.scale());

            svg.selectAll("path").attr("d", path);
    }
    
    zoom = d3.behavior.zoom()
                .translate([width / 2, height / 2])
                .scale(scale0)
                .scaleExtent([scale0, 8 * scale0])
                .on("zoom", zoomed);
                
    svg.call(zoom)
    .call(zoom.event);
    
    d3.json(mapJson, function (error, world) {
        countries = topojson.feature(world, world.objects.countries).features;
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
            .attr('stroke', 'grey')
            .attr('style', function (d) {
            	var ret = scope.data[d.id];
            	var revenue = typeof(ret) == 'undefined' ? 0 : ret.revenue;
            	var offerExists = typeof(ret) == 'undefined' ? false : ret.offerExists;
            //	console.log('return value for iso code -- ' +JSON.stringify(d.id) + ' = is = ' +	 JSON.stringify(revenue));
                if (offerExists) {
                	return  'fill:  green; fill-opacity: ' + (revenue / 10);	
                } else {
                	return  'fill:  #e6e600; fill-opacity: ' + (revenue / 10);
                } 
            	
            })
            .on('click', function (d) {
            	d3.selectAll('path').attr("stroke","grey");
            	var val = (scope.data[d.id]) ? scope.data[d.id] : 0;
                scope.mapCtrlFn({arg1: d.id});
                //rotateToFocusOn(d);
            });
        
        return set;
    }
    }
    }, true);
}