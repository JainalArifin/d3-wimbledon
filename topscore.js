/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  var color = d3.scaleLinear()
    .domain([0,1,2,3,4,5,6,10,15,20,100])
    .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

  d3.layout.cloud().size([800, 300])
    .words(words)
    .rotate(0)
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start()

  function draw(words) {
    d3.select("body").append("svg")
      .attr("width", 900)
      .attr("height", 400)
      .attr("class", "wordcloud")
      .append("g")
      // without the transform, words words would get cutoff to the left and top, they would
      // appear outside of the SVG area
      .attr("transform", "translate(320,200)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("fill", function(d, i) { return color(i); })
      .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; })
  }
}
// console.log('iki oliih ya mas', leaderScale);
// draw()



const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (rows) => {
    let data = []
    for(let i= 0; i <= rows.length-1; i++) {
      console.log()
      data.push({text:rows[i].Name, size:rows[i].G * 5})
    }
    // redraw(rows)
    console.log('ini data baru yaa--->', data)
    draw(data)
  })
}

load()
