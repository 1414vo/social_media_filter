var myWords = Array.prototype.slice.call(document.getElementsByClassName("tweet")).map(x => x.textContent);
myWords = myWords.map(x => x.split(/[^A-Za-z]/)).flat().filter(x => x.length > 3);
myWords = myWords.map(function(d) {
    return {text: d, size: 10 + Math.random() * 30};
});

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var fill = d3.scale.category20();

var svg = d3.select("#wordcloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords)
    .padding(3)
    .fontSize(x => x.size)
    .spiral("archimedean")
    .on("end", draw);
layout.start();

function draw(words) {
    svg
    .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill",(d,i) => fill(i))
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}