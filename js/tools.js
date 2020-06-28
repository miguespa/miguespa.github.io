var dataset = [
   // Proficiency+Usability+Popularity
   //Python
    [ 85,   80,   18 , 'Python' , 'Analytics'],
    // R
    [ 85,   20,   14 , 'R' , 'Analytics'],
    // Tableau
    [ 60,   70,   10 , 'Tableau' , 'Visualization'],
    // PowerBI
    [ 70,   75,   14 , 'PowerBI' , 'Visualization'],
    // Dataiku
    [ 40,   40,   6 , 'Dataiku' , 'AutoML'],
    // SAS
    [ 40,   90,   6 , 'SAS' , 'Analytics' ],
    // d3v5
    [ 80,   30,   10 , 'D3' , 'Visualization'],
    // HTML
    [ 75,   40,   10 , 'HTML' , 'Web_development'],
    // CSS
    [ 75,   25,   10 , 'CSS' , 'Web_development'],
    // Fortran
    [ 40,   15,   2 , 'Fortran' , 'Analytics'],
    // Tensor Flow
    [ 70,   60,   12 , 'Tensor Flow' , 'Deep_Learning'],
];

var maxX = d3v5.max(dataset, function(row) {
    return row[0];
});
var maxY = d3v5.max(dataset, function(row) {
    return row[1];
});
var maxRadius = d3v5.max(dataset, function(row) {
    return row[2];
});

var width = 600,
    height = 500,
    marginLeft = 50,
    marginTop = 20,
    marginBottom = 50,
    marginRight = 100,
    chartHeight = height - marginTop - marginBottom,
    chartWidth = width - marginLeft - marginRight;

// Create SVG element
var svg = d3v5.select("#d3tool")
    .append("svg")
    .attr("width", width+marginBottom)
    .attr("height", height+marginLeft);

var chart = svg.append("g")
            .attr("transform", "translate(" + marginLeft + ", " + marginTop + ")")

// ---------------------------//
//       HIGHLIGHT GROUP      //
// ---------------------------//

// What to do when one group is hovered
var highlight = function(d){
// reduce opacity of all groups
d3v5.selectAll(".bubbles").style("opacity", .05)
// expect the one that is hovered
d3v5.selectAll("."+d).style("opacity", 1)
}

// And when it is not hovered anymore
var noHighlight = function(d){
d3v5.selectAll(".bubbles").style("opacity", 1)
}


// ---------------------------//
//       AXIS  AND SCALE      //
// ---------------------------//

// We need a scale to set the values in X. In this case is 1:1
var xScale = d3v5.scaleLinear()
               .domain([0, 100])
               .range([0, chartWidth]);

// We need a scale again for Y. But reversed!
var yScale = d3v5.scaleLinear()
               .domain([0, 100])
               .range([chartHeight, 0]);


// Add a scale for bubble color
var colorScale = d3v5.scaleOrdinal()
 .domain(["Analytics", "Visualization", "AutoML", 'Web_development','Deep_Learning'])
 .range(d3v5.schemeSet1);


// SCATTERPLOT GOES HERE
// add circles!
chart.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
        .classed("scatter", true)
        .attr("class", function(d,i) { return "bubbles " + d[4] })
        .attr("cx", function(d, i) {
            return xScale(d[0]);
        })
        .attr("cy", function(d, i) {
            return yScale(d[1]);
        })
        .attr("r", function(d, i) {
            return d[2];
        })
        .attr("fill", function(d, i) {
            return colorScale(d[4]);
        })


    // TEXT
      chart.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
              .classed("labels", true)
              .attr("x", function(d, i) {
                  return xScale(d[0]) + d[2]- 10 ;
              })
              .attr("y", function(d, i) {
                  return yScale(d[1]) + d[2]+ 10 ;
              })
              .text(function(d) {
                  return d[3];
              })
              .attr("text-anchor", "middle")
              .style("font-size", "12px")


// x Axis
var xAxis = d3v5.axisBottom().scale(xScale);
// add the axis, but at the bottom
chart.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + chartHeight + ")")
     .call(xAxis);

// y axis
var yAxis = d3v5.axisLeft().scale(yScale);
// we don't need to transform this one, unless we want it on the right
chart.append("g")
     .attr("class", "y axis")
     .call(yAxis);
//Add x-axis tittle
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 2)
    .text("Usability (completeness of the framework)");

//Add y-axis tittle
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Proficiency (% of framework knowledge)");

// ---------------------------//
//       LEGEND              //
// ---------------------------//

// Add legend: circles
var valuesToShow = [5, 15, 30]
var xCircle = width-70
var xLabel = 570
svg
.selectAll("legend")
.data(valuesToShow)
.enter()
.append("circle")
.attr("cx", xCircle)
.attr("cy", function(d){ return height - 300 - d } )
.attr("r", function(d){ return d })
.style("fill", "none")
.attr("stroke", "black")

// Add legend: segments
svg
  .selectAll("legend")
  .data(valuesToShow)
  .enter()
  .append("line")
    .attr('x1', function(d){ return xCircle + d } )
    .attr('x2', xLabel)
    .attr('y1', function(d){ return height - 300 - d } )
    .attr('y2', function(d){ return height - 300 - d } )
    .attr('stroke', 'black')
    .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 300 - d } )
        .text( function(d){ return d } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

// Legend title
svg.append("text")
.attr('x', xCircle)
.attr("y", height - 300 +30)
.text("Popularity")
.attr("text-anchor", "middle")

// Add one dot in the legend for each name.
var size = 20
var allgroups = ["Analytics", "Visualization", "AutoML", "Web_development",'Deep_Learning']
svg.selectAll("myrect")
  .data(allgroups)
  .enter()
  .append("circle")
    .attr("cx", 500)
    .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return colorScale(d)})
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 500 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return colorScale(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
