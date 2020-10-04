import React, { Component } from 'react';
import './App.css';
import Graph from './Graph.js'
import { Header } from 'semantic-ui-react'



import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


import RangeSlider from 'react-bootstrap-range-slider'
import { Button, Container, Form, Card,Row, Col, Navbar } from 'react-bootstrap';
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


render(){
  let diseaseName = this.state.value
  return( 
    <Container fluid  >
    { /******************* Header  ********************/}

      <Row >
        <Col> 
          <Row>
            <Col>
              <h1>Disease - Protein - Drug </h1>
            </Col>
          </Row>

                <Row>
                  <Col xs={2} style={{ backgroundColor: '#F0B27A ', height: 'auto' }}>
                    <img src = 'BGU_logo.png' class="img-fluid"/>
                  </Col>

                  <Col xs={6}>

                      <h2 style={{backgroundColor: '#F0B27A '}}>Search Bar</h2>

                        <Form>
                          <Form.Group controlId="formBasicRange">
                            <Form.Control type="text" placeholder="Enter Disease Name" 
                            value={diseaseName}
                            onChange={(e) => this.onInput(e)}
                            />
                            <Button variant="primary"
                              className="button"
                              onClick={(e) => this.onEnter(e)}> SUMBIT <br/>
                            </Button>
                          </Form.Group>
                          </Form>

                  </Col>
                
                  <Col xs={2}>
                        <div style={{ backgroundColor: 'white', height: 'auto' , color: 'black', border: 'outset', fontSize:'19px'}}>
                        <p><b><u>Legend</u><br></br> </b> <br/>

                      <span class="r-cl" ><span></span></span><b>Disease<br></br></b>

                          <span class="c-p-cl"><span></span></span><b>Protein<br></br></b>

                          <span class="c-d-cl"><span></span></span><b>Drug</b></p>
                      </div>
                  </Col>

              </Row>
            </Col>
          </Row>
          { /******************* END OF Header  ********************/}


          { /*******************Graph Chart ********************/}

          <Row fluid style={{ backgroundColor: 'blue'}}> 
            <Col fluid tyle={{ backgroundColor: 'green'}}>
              { 
                this.state.view ? <Graph fluid jsonData = {this.state.jsonData} diseaseName ={this.state.disease} proteins = {this.state.proteins} drugs={this.state.drugs}/> :
                null 
              }
            </Col>
          
          </Row>

          { /*******************END OF Graph Chart ********************/}


    </Container>
  )

}
}

export default App;
