var dataset = [
    [ 110,   420,   8 , "TensorFlow"  ],
    [ 400,   395,   23 , "SAS" ],
    [ 260,   155,   5 , "Dash"  ],
    [ 110,   223,   2  , "Tableau" ],
    [ 320,   185,   18 , "PowerBI"],
    [ 400,   318,   20 , "Python" ],
    [ 465,   134,   8 , "SQL" ],
    [ 50,    361,   21 , "ScikitLearn" ],
    [ 45,    80,    5 ,  "CARTO" ],
    [ 230,   381,   13 , "D3"]
];

var maxX = d3.max(dataset, function(row) {
    return row[0];
});
var maxY = d3.max(dataset, function(row) {
    return row[1];
});
var maxRadius = d3.max(dataset, function(row) {
    return row[2];
});

var width = 500,
    height = 500,
    marginLeft = 100,
    marginTop = 20,
    marginBottom = 20,
    marginRight = 20,
    chartHeight = height - marginTop - marginBottom,
    chartWidth = width - marginLeft - marginRight;

// Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var chart = svg.append("g")
            .attr("transform", "translate(" + marginLeft + ", " + marginTop + ")")

// We need a scale to set the values in X. In this case is 1:1
var xScale = d3.scaleLinear()
               .domain([0, maxX])
               .range([0, chartWidth]);
// We need a scale again for Y. But reversed!
var yScale = d3.scaleLinear()
               .domain([0, maxY])
               .range([chartHeight, 0]);


var colorScale = d3.scaleLinear()
                   .domain([0, maxRadius])
                   .range(['white', 'blue']);
// SCATTERPLOT GOES HERE
// add circles!
chart.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
        .classed("scatter", true)
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
            return colorScale(d[2]);
        })


    // TEXT
      chart.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
              .classed("labels", true)
              .attr("x", function(d, i) {
                  return xScale(d[0]) + d[2]+ 10 ;
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
var xAxis = d3.axisBottom().scale(xScale);
// add the axis, but at the bottom
chart.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + chartHeight + ")")
     .call(xAxis);

// y axis
var yAxis = d3.axisLeft().scale(yScale);
// we don't need to transform this one, unless we want it on the right
chart.append("g")
     .attr("class", "y axis")
     .call(yAxis);
