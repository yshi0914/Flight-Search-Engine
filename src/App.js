import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Search from './Search/Search';
import {Col, Row, Container} from 'react-bootstrap';
import Header from './header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; 

class App extends React.Component{
  render(){
    return (
      <Container className="px-md-5" >
        <Row md={{ span: 12}} className="border">
          <Col className="py-5">
            <Header/>
          </Col>
        </Row>
        <Row className="border">
          <Search/>
        </Row>
      </Container>
    );
  }

}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));