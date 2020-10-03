import React, { Component } from 'react';
import './App.css';
import Graph from './Graph.js'
import Navbar from './Navbar.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import RangeSlider from 'react-bootstrap-range-slider'
import { Button, Container, Form, Card, } from 'react-bootstrap';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {

  constructor(props) {
    super(props)
    var input = ''
    this.state = {
      userName: 'Barak',
      value: '',
      disease:'',
      jsonData: {},
      jsonDrugs: {},
      drugs: [],
      view: false
    }
  }
  
 componentDidMount(){
  console.log('mounting APP')
  let url = 'https://api.jsonbin.io/b/5f74bd117243cd7e824742f6'
  const response = fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "secret-key": "$2b$10$ySWzEs3S9JUHfDfnYERQc.EsFmQlIYLt5Jab9bvVm3zU6g1dvMJ8m"
      },
    })
      .then(res => res.json() )
      .then(data => {
         this.setState(prevState => ( {jsonData:data})
          
         )
      }
      )

      url = 'https://api.jsonbin.io/b/5f762e2c7243cd7e82484f0c'
      const response2 = fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "secret-key": "$2b$10$ySWzEs3S9JUHfDfnYERQc.EsFmQlIYLt5Jab9bvVm3zU6g1dvMJ8m"
      },
    })
      .then(res => res.json() )
      .then(data => {
         this.setState(prevState => ( {jsonDrugs:data})
          
         )
      }
      )
    
 }


 onInput(e) {
  e.preventDefault()

  this.setState({
    value: e.target.value,
    view: false
  })
}


getData(){
            let proteins = this.state.jsonData[this.state.value]
            var drugs = {}
            for(var prot in proteins){
              drugs[proteins[prot]] = this.state.jsonDrugs[proteins[prot]]
            }
            this.setState(prevState => ( {
              proteins: this.state.jsonData[this.state.value],
              disease: this.state.value,
              drugs:drugs
              }))
            }
      
              

onEnter(e) {
  e.preventDefault()
  this.setState(prevState => ( {
    view: true
    }))
  this.getData()  
}


  render() {
    let diseaseName = this.state.value

    return (
      <Container className="App">
          <h1 className="header">Disease-Protein-Drug Visualization</h1>
          <Card>
          <Form>
            <Form.Group controlId="formBasicRange">
             <Form.Control type="email" placeholder="Enter Disease Name" 
             value={diseaseName}
             onChange={(e) => this.onInput(e)}
             />
              <Form.Label>Zoom</Form.Label>
              <RangeSlider

              />
           </Form.Group>
          </Form>
         <Button variant="outline-primary"
            className="button"
            onClick={(e) => this.onEnter(e)}> SUMBIT
          </Button>
        { this.state.view ?  <Graph jsonData = {this.state.jsonData} diseaseName ={this.state.disease} proteins = {this.state.proteins} drugs={this.state.drugs}/>
          : null
         }
        </Card>
      </Container>
     /* {
      <Container className="App">
          <Form className="form">
          <input
            className="enter"
            value={diseaseName}
            onChange={(e) => this.onInput(e)}
            placeholder="Enter disease name here..."
          />
         <button
            className="button"
            onClick={(e) => this.onEnter(e)}> SUMBIT
          </button>
        </Form>
        { this.state.view ?   <Graph jsonData = {this.state.jsonData} diseaseName ={this.state.disease} proteins = {this.state.proteins} drugs={this.state.drugs}/>
         : null }
        {// 
        }
      </Container>
      }*/
      
    );
  }
}

export default App;
