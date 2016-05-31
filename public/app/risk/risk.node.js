function nodeLink(scope, elem) {


        var data = scope.data;
        var rawSvg = d3.select(elem[0]); 
        var width = 600;
        var height = 400;
        var center ={x:width/2, y:height/2};
        var layoutGravity = -0.01;
        var damper = 0.1;
        var nodes= [];
        var force= null;
        var circles=null;
        var fillColor=d3.scale.ordinal().domain([1,2,3,4,5]).range(["#009933","#ccff33","#ffb31a","#ff5050","#cc3300"]);

        var max_amount=d3.max(data,function(d){
                return parseInt(d.cla);
            });

        var radius_scale=d3.scale.pow().exponent(0.5).domain([0,max_amount]).range([2,60]);
        
        var charge = function(d){
            return -Math.pow(d.radius,2.0)/8;
        };
        
       
        function create_nodes(){
            data.forEach((function(d){
                var node;
                node ={
                        id:d.id,
                        radius:radius_scale(parseInt(d.cla)),
                        value:d.cla,
                        name:d.industry,
                        weather:d.weather,
                        strategyName:d.strategyName,
                        x:Math.random()*500,
                        y:Math.random()*500
                    };
                nodes.push(node); 
            }));
            return nodes.sort(function(a,b){
                return a.value - b.value;
            });
        }
        
        nodes = create_nodes();
        
        var svg = rawSvg.append("svg")
                  .attr("width",width)
                  .attr("height",height)
                  .attr("id",'svgnode');
                  
        
        
        circles = svg.selectAll("circle")
                     .data(nodes,function(d){
                         return d.id;
                     });
  
      
        circles.enter().append("circle")
                      .attr("r",0)
                      .attr("fill",function(d) {return fillColor(d.weather);})
                      .attr("stroke-width",2)
                      .attr("stroke",function(d){return d3.rgb(fillColor(d.weather)).darker()})
                      .attr("id",function(d){return d.id})
                      .attr("text","T")
                      .on("mouseover", function(d,i){
                          d3.select(this).attr("stroke","black");
                          var content  = d.name;
                          //tooltip.showTooltip(content,d3.event);
                      })
                      .on("mouseout", function(){
                          d3.select(this).attr("stroke",function(d){return d3.rgb(fillColor(d.weather)).darker()});
                          //tooltip.hideTooltip();
                      })
                      .on('click',function(d){
                    	  console.log(' what is in data ' + JSON.stringify(data));
                          //if(d.strategyName == 'No'){
                   		    scope.nodeCtrlFn({arg1: d});
                          //}
//                   		  console.log('clicke!!!!!!');
                      })
                      .transition().duration(2000).attr("r",function(d){return d.radius})
                      ;
       circles.append("text").text(function(d){
           return 
       });
       circles.append("svg:title")
              .text(function(d){return "Industry: "+d.name+"\nMarket Size(€): " + d3.format(",")(d3.round(d.value)) + "\nRisk level " + getRiskLevel(d.weather) + "\n" + getStrategyText(d.strategyName)});
      
        force = d3.layout.force()
                .nodes(nodes)
                .size([width,height])
                .gravity(layoutGravity)
                .charge(charge)
                .friction(0.9)
                .on("tick", function(e){
                        return circles.each(move_towards_center(e.alpha))
                                            .attr("cx",function(d){
                                                return d.x;
                                            })
                                            .attr("cy",function(d){
                                                return d.y;
                                            });
                    }
                ).start();

            
        function move_towards_center(alpha){
            return function(d){
                d.x = d.x+(center.x - d.x)*(damper +0.02) * alpha;
                return d.y = d.y +(center.y - d.y)*(damper +0.02) * alpha;
            } 
        }
        
        function getRiskLevel(riskNumber) {
        	if (riskNumber == 1) {
        		return ': Very Low';
        	} else if (riskNumber == 2) {
        		return ': Low';
        	}else if (riskNumber == 3) {
        		return ': Medium';
        	}else if (riskNumber == 4) {
        		return ': High';
        	}else if (riskNumber == 5) {
        		return ': Very High';
        	}
        }
        
        function show_details(d){
            console.log(d);
            d3.select(d).attr("stroke", "black");
        }
        
        function getStrategyText(strategyName){
            if(strategyName=='No'){
                return 'No Risk Strategy defined';
            }else{
                return 'Risk Strategy '+strategyName+' is defined for the industry.';
            }
        }

 }