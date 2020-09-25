
function plotGraph() {

var nodes = [
   {id: "Shay", gender: 'male', level: 0,group:'a'},
   {id: "Sara", gender: 'female', level: 0,group:'a'},

   {id: "Ozer", gender: 'male', level: 0,group:'b'},
   {id: "Henia", gender: 'female', level: 0, group:'b'},

  { id: "Amnon", gender: 'male', level: 1 ,group:'c'},
  { id: "Amalya"   , gender: 'female', level: 1, group:'c' },

  { id: "Niv"   , gender: 'male', level: 2,group:'d' },
  { id: "Ido"   , gender: 'male', level: 2 ,group:'d'},
  { id: "Shir"   , gender: 'female', level: 2 ,group:'d'},

]

var links = [
{ target: "Amnon", source: "Shay"  },
{ target: "Amnon", source: "Sara"  },
{ target: "Amalya", source: "Ozer"  },
{ target: "Amalya", source: "Henia"  },
    { target: "Niv", source: "Amnon"  },
    { target: "Niv", source: "Amalya"  },
    { target: "Ido", source: "Amnon"  },
    { target: "Ido", source: "Amalya"  },
    { target: "Shir", source: "Amnon"  },
    { target: "Shir", source: "Amalya"  },
]
var width = window.innerWidth
var height = window.innerHeight

var svg = d3.select('svg')
svg.attr('width', width).attr('height', height)

var force = d3.layout.force()
    .nodes(data.nodes)
    .links(data.links)
    .distance(100)
    .charge(-1000)
    .size([w, h])
    .start();

var linkForce = d3
  .forceLink()
  .id(function (link) { return link.id })

// simulation setup with all forces
var simulation = d3
  .forceSimulation()
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('link',linkForce)

var linkElements = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 1)
        .attr("stroke", "rgba(50, 50, 50, 0.2)")

function getNodeColor(node) {
  return node.gender === 'female' ? 'red' : 'blue'
}

var nodeElements =  svg.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("class", function (d) {
        if (d.gender === "male") {
        return "rect node";
        } else {
        return "circle node";
        }
    })
    .call(force.drag)

d3.selectAll(".male").append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("class", function (d) {
    return "node type" + d.type
});

d3.selectAll(".female").append("circle")
    .attr("class", function (d) {
    return "node type" + d.type
})
    .attr("r", function (d) {
    return radius(d.value) || 10
})
.call(force.drag);


/*
var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("moshe")
  .data(nodes)
  .append("rect")
  .attr("width", 20)
  .attr("height", 20)
    .attr("fill", getNodeColor)
*/
var textElements = svg.append("g")
  .attr("class", "texts")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
    .text(function (node) { return  node.id })
	  .attr("font-size", 15)
	  .attr("dx", 15)
    .attr("dy", 4)

  simulation.nodes(nodes).on('tick', () => {
    nodeElements
      .attr('cx', function (node) { return node.x })
      .attr('cy', function (node) { return node.y })
    textElements
      .attr('x', function (node) { return node.x })
      .attr('y', function (node) { return node.y })
    linkElements
        .attr('x1', function (link) { return link.source.x })
        .attr('y1', function (link) { return link.source.y })
        .attr('x2', function (link) { return link.target.x })
        .attr('y2', function (link) { return link.target.y })
  })

simulation.force('link').links(links);
}