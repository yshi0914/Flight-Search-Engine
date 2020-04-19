import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import {Tabs, Tab, Col, Form, Button} from 'react-bootstrap';
import Flight from '../flights/Flight';
import 'bootstrap/dist/css/bootstrap.min.css'; 

class Search extends React.Component{
    constructor(props){
        super(props);    
        this.state = {
            from:'',
            to:'',
            returnTrip: true,
            departureDate: '',
            returnDate: '',
            noOfPass:1,
            tripType: 'returnTrip',
            price:{
                min: 50,
                max: 10000
            },
            key:'returnTrip',
            hitSubmit:false
        }
    }
    handleData = (e)=>{
        let field = e.target.name;
        let value = e.target.value;
        this.setState({[field]:value});
    }
    handleTrip(key) {
        let isReturnTrip = (key === 'returnTrip') ? true : false;
        if (!isReturnTrip){
            this.setState({key:'one-way'});
            this.setState({returnTrip: false});
        }else{
            this.setState({key:'returnTrip'});
            this.setState({returnTrip: true});
        }
        this.setState({tripType: isReturnTrip});
    }
    changeDepartureDate(departureDate) {
        this.setState({departureDate: departureDate}); 
    }

    changeReturnDate(returnDate) {
        this.setState({returnDate: returnDate});
    }  

    handleSubmit = (event) => {      
            event.preventDefault();
            this.setState({hitSubmit:true});
    }

    render() {
        return(
<React.Fragment>
	<Col className="border">
        <div className="md-2 my-3 border px-4 mx-4 md-4">
		<Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.handleTrip(k)}>
			<Tab eventKey="one-way" title="One-way">
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Control type="text" name="from" required placeholder="Enter Origin City" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
						<Form.Control type="text" name="to" required placeholder="Enter Destination City" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
                         <Form.Control type="date" name="departureDate" onChange={this.handleData} value={this.state.departureDate} required />
					</Form.Group>
					<Form.Group>
						<Form.Control type="text" name="noOfPass" required placeholder="Number of passengers" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
						<Button type="submit"  name="submit" variant="primary">Search</Button>
					</Form.Group>
					<Form.Group className="mx-1">
						<h4 className="py-3">Refine flight search</h4>
						<InputRange
                                                            maxValue={10000}
                                                            minValue={50}
                                                            formatLabel={price => `$ ${price}`}
                                                            value={this.state.price}
                                                            onChange={price => this.setState({price})}
                                                            onChangeComplete={price => console.log(price)} />
					</Form.Group>
				</Form>
			</Tab>
			<Tab eventKey="returnTrip" title="Return">
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Control type="text" name="from" required placeholder="Enter Origin City" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
						<Form.Control type="text" name="to" required placeholder="Enter Destination City" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
                         <Form.Control type="date" name="departureDate" onChange={this.handleData} value={this.state.departureDate} required />
					</Form.Group>
					<Form.Group>
                         <Form.Control type="date" name="returnDate" onChange={this.handleData} value={this.state.returnDate} required />
					</Form.Group>
					<Form.Group>
						<Form.Control type="text" name="noOfPass" required placeholder="Number of passengers" onChange={this.handleData} />
					</Form.Group>
					<Form.Group>
						<Button type="submit"  variant="primary">Search</Button>
					</Form.Group>
					<Form.Group className="mx-1 py-5">
						<h4 className="py-3">Refine flight search</h4>
						<InputRange
                                                            maxValue={10000}
                                                            minValue={50}
                                                            formatLabel={price => `$ ${price}`}
                                                            value={this.state.price}
                                                            onChange={price => this.setState({price})}
                                                            onChangeComplete={price => console.log(price)} />
					</Form.Group>
				</Form>
			</Tab>
		</Tabs>
        </div>
	</Col>
	<Col className="border">
		{this.state.hitSubmit ? <Flight formData={this.state} /> : <h5>Please enter the search details and hit 'Search' button</h5>}
	</Col>
</React.Fragment>
        );
    }
}



export default Search;