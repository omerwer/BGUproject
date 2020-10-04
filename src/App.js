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
      <body style = {{backgroundImage: 'url(https://media.gettyimages.com/illustrations/protein-molecules-artwork-illustration-id513090381)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
    <Container style = {{height: '1920px', width: '1080' }}>
       <Row style={{display: 'flex', justifyContent: 'center', fontFamily: 'Arial Black',
           textShadow: '3px 6px 2px rgba(0, 0, 0, .3)', color: 'white'}}>
       <h1>Disease - Protein - Drug Visualization</h1>
        
        </Row>

          <Row>
            <Col xs={2} style={{ height: 'auto' }}>
              <img src = "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Ben-Gurion_University_of_the_Negev.svg/1200px-Ben-Gurion_University_of_the_Negev.svg.png" class="img-fluid"/>
            </Col>
            <Col xs={6}>
               <Row style={{}}>
                   <h2 style={{color: '#842DCE'}}><br></br></h2>
               </Row>
                <Row style={{height:'auto'}}>

                  <Form>
                    <Form.Group controlId="formBasicRange">
                      <Form.Control type="text" placeholder="Enter Disease Name" 
                      value={diseaseName}
                      onChange={(e) => this.onInput(e)}
                      />
                      <Button variant="primary"
                        className="button"
                        onClick={(e) => this.onEnter(e)}> SUBMIT <br/>
                      </Button>
                    </Form.Group>
                    </Form>
                </Row>
                <Row  style={{color: 'green'}}>
.
                </Row>
{/*
              <Row style={{backgroundColor: 'Teal'}}>

                <RangeSlider   />
              </Row>
*/}

            </Col>
          


          </Row>
        <Col xs={4}>
            <Row style={{height: 'auto' , color: 'white', fontSize:'19px',}}>
                <p>

                    <span class="r-cl" ><span></span></span><b>Disease<br></br></b>

                    <span class="c-p-cl"><span></span></span><b>Protein<br></br></b>

                    <span class="c-d-cl"><span></span></span><b>Drug</b></p>
            </Row>
        </Col>
          <Row style={{position: 'relative', height: '1080px', width: '1920px' }}>
            
              { 
                this.state.view ? <Graph  jsonData = {this.state.jsonData} diseaseName ={this.state.disease} proteins = {this.state.proteins} drugs={this.state.drugs}/> :
                null 
              }

          
          </Row>
    </Container>
      </body>
  )

}
}

export default App;
