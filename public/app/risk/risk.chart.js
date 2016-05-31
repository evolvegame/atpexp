function chartLink(scope, element, attrs) {   
var dataToPlot=scope[attrs.chartData];
console.log('in chart link-->'+JSON.stringify(dataToPlot));
var xScale, yScale, xAxisGen, yAxisGen, lineFun,area;
var width = 540;
var height = 360;


var margins = {
        top: 30,
        right: 20,
        bottom: 20,
        left: 50
    };
    


var rawSvg = d3.select("#linechart");    
console.log("Value is ==>");
console.log(rawSvg);
var svg = rawSvg;


console.log(svg);
function setChartParameters(){
  xScale = d3.scale.linear()
             .domain([dataToPlot[0].term, dataToPlot[dataToPlot.length - 1].term])
             .range([margins.left, width - margins.right]);

  yScale = d3.scale.linear()
             .domain([0, d3.max(dataToPlot, function (d) {
                  return d.meanEL;
              })])
             .range([height - margins.top, margins.bottom]);

  xAxisGen = d3.svg.axis()
               .scale(xScale);

  yAxisGen = d3.svg.axis()
               .scale(yScale)
               .orient("left");
  
  area = d3.svg.area()
           .x(function (d) {
                return xScale(d.term);
            })
           .y0(height - margins.top)
           .y1(function (d) {
                return yScale(d.meanEL);
            })
            .interpolate("basis");

  lineFun = d3.svg.line()
              .x(function (d) {
                return xScale(d.term);
              })
              .y(function (d) {
                return yScale(d.meanEL);
              })
              .interpolate("basis");
}

         
function drawLineChart() {

  setChartParameters();

  svg.append("svg:g")
     .attr("class","axis")
     .attr("transform", "translate(0," + (height - margins.bottom) + ")")
     .call(xAxisGen);

   svg.append("svg:g")
      .attr("class","axis")
      .attr("transform", "translate(" + (margins.left) + ",0)")
      .call(yAxisGen);
      
  svg.append("svg:path")
      .attr('class','area')
      .attr('d',area(dataToPlot));

   svg.append("svg:path")
      .attr('d', lineFun(dataToPlot))
      .attr('stroke', 'orange')
      .attr('stroke-width', 1)
      .attr('fill', 'none');
      
      
      
    //    svg.append('text')
    //    .attr('text-anchor', 'middle')
    //    .attr('dominant-baseline','central')
    //    .attr('font-family', 'FontAwesome')
    //    .attr('font-family', '50px')
    //    .text('\f0cb');
     
//    svg.append("svg:image")
//      .attr('x', width-300)
//      .attr('y', height - 200)
//      .attr('width', 50)
//      .attr('height', 50)
//      .attr('xlink:href', "assets/img/uploads/evolve-avatar.png");
}

drawLineChart();

}