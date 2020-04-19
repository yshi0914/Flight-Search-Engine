import React from 'react';
import {Row, Col, Card, Button, Image} from 'react-bootstrap';
import 'react-input-range/lib/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../assets/JQ.png';

class Flight extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            fromFlight: null,
            toFlight:null,
            noOfPassenger: 0,
            hasReturn:false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get('../flight.json')
        .then(result => 
            this.setState({
                flights: result.data,
                isLoading: false
            })
        )
        .catch(error => 
            this.setState({
                error,
                isLoading: false
            })
        );
    }
        
    render() {
        let flightList = this.state.flights.map((originFlight) => {
                            let isSameOrigin = originFlight.origin.toLowerCase() === this.props.formData.from.toLowerCase();
                            let isSameDest = originFlight.destination.toLowerCase() === this.props.formData.to.toLowerCase();
                            let isPriceInRange = (originFlight.price >= this.props.formData.price.min) && (originFlight.price <= this.props.formData.price.max) ;
                            let isDateMatch = originFlight.departure_date === this.props.formData.departureDate;
                            let findRightFlights = isSameOrigin && isSameDest && isDateMatch &&isPriceInRange;
                            
                            if (findRightFlights){
                                if (!this.props.formData.returnTrip) {
                                    return (renderFlight(originFlight, null, this.props.formData.noOfPass));
                                }else{
                                    return (
                                        this.state.flights.map((returnFlight) => {
                                                    let isDestMatch = returnFlight.destination.toLowerCase() === this.props.formData.from.toLowerCase();
                                                    let isOrigMatch = returnFlight.origin.toLowerCase() === this.props.formData.to.toLowerCase();
                                                    let isDateMatch = returnFlight.departure_date === this.props.formData.returnDate;  
                                                    let isPriceWithinRange = ((returnFlight.price + originFlight.price) >= this.props.formData.price.min )&& ((returnFlight.price + originFlight.price) <= this.props.formData.price.max);
                                                    let isReturnAllMatch = isDestMatch && isOrigMatch && isDateMatch && isPriceWithinRange;                               
                                                    if (isReturnAllMatch){
                                                        return (renderFlight(originFlight, returnFlight, this.props.formData.noOfPass))
                                                    }
                                        }))  
                                }
                            }
                            return (null); 
                            });


      if (this.props.formData.returnDate === ''){
            return (
                <React.Fragment>
                <Row className="border">
                    <Col >
                        <h4>{this.props.formData.from} > {this.props.formData.to}</h4>
                    </Col>
                    <Col>
                        <b>Depart Date: {this.props.formData.departureDate}</b>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        {flightList}    
                    </Col>
                </Row>
            </React.Fragment>)
      }

      return (
            <React.Fragment>
                <Row className="border">
                    <Col>
                        <h5>{this.props.formData.from} > {this.props.formData.to} > {this.props.formData.from}</h5>
                    </Col>
                    <Col>
                        <Row><Col>Depart Date: {this.props.formData.departureDate}</Col></Row>
                        <Row><Col>Return Date: {this.props.formData.returnDate}</Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        {flightList}    
                    </Col>
                </Row>
            </React.Fragment>

        )       
    }
}
function renderFlight(originFlight, returnFlight, numOfPass) {
    if (returnFlight === null){
        return (
            <React.Fragment key={originFlight.flightId}>
                <Card className="mx-2">
                    <Card.Header>
                        NZD. {originFlight.price * numOfPass} 
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col><Card.Text>Flight Number: {originFlight.flightId}</Card.Text></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>                   
                        <Row>
                            <Col>{originFlight.origCode} > {originFlight.destCode}</Col>
                            <Col><Image src={logo} rounded style={{ width: 100 }} /></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col>Depart: {originFlight.departure_time}</Col>
                            <Col><Button variant="primary">Book Flight</Button></Col>
                            <Col></Col>
                        </Row> 
                         <Row>
                            <Col>Arrive: {originFlight.arrival_time}</Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>                                            
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment key={returnFlight.flightId}>
            <Card className="mx-2">
                <Card.Header>
                    NZD. {(originFlight.price + returnFlight.price) * numOfPass} 
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Text>
                                <b>{originFlight.flightId}</b>
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                <b>{returnFlight.flightId}</b>
                            </Card.Text>
                        </Col>
                        <Col><Image src={logo}  rounded style={{ width: 100 }} /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text>
                                {originFlight.origCode} > {originFlight.destCode}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                {returnFlight.origCode} > {returnFlight.destCode}

                            </Card.Text>
                        </Col>
                        <Col><Button variant="primary">Book Flight</Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text>
                                Depart: {originFlight.departure_time}
                            </Card.Text> 
                        </Col>
                        <Col>
                            <Card.Text>
                                Depart: {returnFlight.departure_time}
                            </Card.Text>   
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            Arrive: {originFlight.arrival_time}
                        </Col>
                        <Col>
                            Arrive: {returnFlight.arrival_time}
                        </Col>
                        <Col></Col>
                    </Row>

                </Card.Body>
            </Card>
        </React.Fragment> 
    )
}
export default Flight;
