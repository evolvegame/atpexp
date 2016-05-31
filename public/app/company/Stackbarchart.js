var StackbarChart = function(datajson,yaxisName,yaxisPos,element){

// var dataJsonLength = datajson.length;
// var profitData = datajson.slice().splice(-1,1);
// console.log(JSON.stringify(profitData));
// var modifiedJSON = datajson.pop();
// console.log("modifiedJSON-->"+JSON.stringify(modifiedJSON));
d3.select("#stackSVG").remove();
   var h = 600;
var w = 900;
var margin = 100;
//var dataProfit=[[{"size":3000}],[{"size":3000}]];

var color = d3.scale.category10();
var colorData = [];

var x = d3.scale.ordinal()
	.domain(['Round 1',  'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7', 'Round 8'])
	.rangeRoundBands([ margin, w - margin ], .1)
    

var y = d3.scale.linear()
	.range([h-margin,0+margin]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickSize(6, 0);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
    .tickFormat(function(d) { return "€" + Math.abs(d) });

barStack(datajson);
y.domain(datajson.extent);

var svg = d3.select(element)
	.append("svg")
    .attr('id','stackSVG')
	.attr("height", h)
	.attr("width", w)

svg.selectAll(".series")
	.data(datajson)
	.enter()
	.append("g")
	.classed("series", true)
	.style("fill", function(d,i) {
        if(i==0){
            colorData.push(d3.rgb("#008000"));
            return d3.rgb("#008000");
        }
        if(i==1){
            colorData.push(d3.rgb("#1aff1a"));
            return d3.rgb("#1aff1a");
        }        
        if(i==2){
            colorData.push(d3.rgb("#ff0000"));
            return d3.rgb("#ff0000") ;
        }
        if(i==3){
            colorData.push(d3.rgb("#fe642e"));
            return d3.rgb("#fe642e") ;
        }
        if(i==4){
            colorData.push(d3.rgb("#996300"));
            return d3.rgb("#996300")  ;
        }
        if(i==5){
            colorData.push(d3.rgb("#fcd04a"));
            return d3.rgb("#fcd04a") ;
        }
        })
	.style("opacity", 0.8)
		.selectAll("rect")
		.data(Object)
		.enter()
		.append("rect")
			.attr("x", function(d, i) { return x(x.domain()[i]) })
			.attr("y", function(d) { return y(d.y0) })
			.attr("height", function(d) { return y(0) - y(d.size) })
			.attr("width", x.rangeBand())
			.on("mouseover", function() { tooltip.style("display", null); })
  		.on("mouseout", function() { tooltip.style("display", "none"); })
  		.on("mousemove", function(d) {
    		var xPosition = d3.mouse(this)[0] - 35;
    		var yPosition = d3.mouse(this)[1] - 5;
    		tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    		tooltip.select("text").text(d.y);
  		});



svg.append("g")
	.attr("class", "axis x")
	.attr("transform", "translate(0 " + y(0) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis y")
	.attr("transform", "translate(" + margin + " 0)")
	.call(yAxis);

// var dataSum = d3.sum(datajson, function(d) {return d.size; }); 
   
// var line = d3.svg.line()
//     .x(function(d, i) {
//          return x(x.domain()[i]) 
//      })
//     .y(function(d, i) {
//         if(i==0){
//             return y(10000);
//         }
//         if(i==1){
//             return y(20000);
//         }
//       }); 
    
//     svg.append("path")
//       .datum(datajson)
//       .attr("class", "line")
//       .attr("d", line);

/* Here we add tooltips */

// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
    
              var legend = svg.selectAll(".legend")
                  .data(colorData)
                .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

              legend.append("rect")
                  .attr("x", w - 18)
                  .attr("width", 18)
                  .attr("height", 18)
                  .style("fill", function(d,i) {
                    if(i==0){
                        return d3.rgb("#008000");
                    }
                    if(i==1){
                        return d3.rgb("#1aff1a") ;
                    }
                    if(i==2){
                        return d3.rgb("#ff0000") ;
                    }                    
                    if(i==3){
                        return d3.rgb("#fe642e") ;
                    }
                    if(i==4){
                         return d3.rgb("#996300")  ;
                    }
                    if(i==5){
                        return d3.rgb("#fcd04a") ;
                    }
                 } );
                
            legend.append("text")
                 .attr("x", w - 24)
                 .attr("y", 9)
                 .attr("dy", ".35em")
                 .style("text-anchor", "end")
                 .text(function(d,i) { 
                    if(i==0){
                        return "Premium";
                    }
                    else if(i==1){
                        return "Bonus";
                    }                    
                    else if(i==2){
                        return "Claims";
                    }
                    else if(i==3){
                        return "Operating Expenses";
                    }
                    else if(i==4){
                        return "Investments";
                    }else if(i==5){
                        return "Taxes";
                    }
                  }); 		    
            
  }
function barStack(seriesData) {
	var l = seriesData[0].length
	while (l--) {
		var posBase = 0; // positive base
		var negBase = 0; // negative base

		seriesData.forEach(function(d) {
			d = d[l]
			d.size = Math.abs(d.y)
			if (d.y < 0) {
				d.y0 = negBase
				negBase -= d.size
			} else
			{
				d.y0 = posBase = posBase + d.size
			}
		})
	}
	seriesData.extent = d3.extent(
		d3.merge(
			d3.merge(
				seriesData.map(function(e) { 
					return e.map(function(f) { return [f.y0,f.y0-f.size] }) 
				})
			)
		)
	)
}
