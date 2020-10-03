import React, { Component } from "react";
import * as d3 from 'd3'

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData:{},
            diseaseName:''
        }
      }

      componentDidUpdate(){

        this.makeGraph(this.props.jsonData, this.props.diseaseName, this.props.proteins, this.props.drugs);

      }


    render() {
        d3.selectAll("svg > *").remove();

        console.log(`data: ${this.props.proteins}`)

        return (
            <svg
            ref='canvas'
            width='1980'
            height='1080'
          />
       
        );}


    makeGraph(data, diseaseName, prots,drugs) {
        console.log('disease :' + diseaseName + ' prots: ' + prots)
                if(data.hasOwnProperty(diseaseName)) { 
                    console.log('starting to paint graph...')
                    let nodes = []
                    let links = []
                    let i = 1
                    //var diseaseJSON = JSON.parse(data)
                    nodes.push({id:diseaseName, name:diseaseName, type:"disease"})
                    
                    /*var proteins = diseaseJSON[diseaseName]
                    for(var protein in proteins) {
                        nodes.push({id:proteins[protein], type:"protein"})
                        links.push({target:proteins[protein], source:diseaseName})
                    }*/
                    for(var protein in prots) {
                        nodes.push({id:prots[protein],name:prots[protein], type:"protein"})
                        links.push({target:prots[protein], source:diseaseName})
                        //console.log('protein: ' + prots[protein] + ' drugs: ' + drugs[prots[protein]])
                        for(var drug in drugs[prots[protein]]){
                            let drugName = drugs[prots[protein]][drug]
                            nodes.push({id:`${drugName}${i}`, name:drugName, type:'drug'})
                            links.push({target: `${drugName}${i}`, source: prots[protein]})
                            i++

                        }
                    }
                var width = 1080 //window.innerWidth
                var height = 720//window.innerHeight


                var svg = d3.select(this.refs.canvas)
                svg.attr('width', width).attr('height', height)

                var linkForce = d3
                .forceLink()
                .id(function (link) { return link.id })

                // simulation setup with all forces
                var simulation = d3
                .forceSimulation()
                .force('charge', d3.forceManyBody().strength(-600))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('link',linkForce)

                var linkElements = svg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(links)
                    .enter().append("line")
                    .attr("stroke-dasharray", 3)
                        .attr("stroke", "rgba(50, 50, 50, 0.2)")

                function getNodeColor(node) {
                return node.type === 'disease' ? 'red' :
                node.type === 'protein' ? 'blue' : 'green'
                }

                function getProteins(nodesList) {
                    return nodesList.filter((n) => n.type === 'protein');
                }
                function getDiseases(nodesList) {
                        return nodesList.filter((n) => n.type === 'disease');
                }
                function getDrugs(nodesList) {
                    return nodesList.filter((n) => n.type === 'drug');
                }
                var nodeElementsProteins = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(getProteins(nodes))
                .enter().append("circle")
                    .attr("r", 10)
                    .attr("fill", getNodeColor)

                var nodeElementsDiseases = svg.append("g")
                    .attr("class", "nodes")
                    .selectAll("rect")
                    .data(getDiseases(nodes))
                    .enter().append("rect")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("fill", getNodeColor)

                var nodeElementsDrugs = svg.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(getDrugs(nodes))
                    .enter().append("circle")
                        .attr("r", 5)
                        .attr("fill", getNodeColor)
                    

                var textElements = svg.append("g")
                .attr("class", "texts")
                .selectAll("text")
                .data(nodes)
                .enter().append("text")
                    .text(function (node) { return  node.name })
                    .attr("font-size", 15)
                    .attr("dx", 15)
                    .attr("dy", 4)

                simulation.nodes(nodes).on('tick', () => {
                    nodeElementsProteins
                    .attr('cx', function (node) { return node.x })
                    .attr('cy', function (node) { return node.y })
                nodeElementsDiseases
                    .attr('x', function (node) { return node.x })
                    .attr('y', function (node) { return node.y })

                    nodeElementsDrugs
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
                else{
                    console.log(` disease ${diseaseName} not found` )
                }
            }
        }
    

export default Graph;
