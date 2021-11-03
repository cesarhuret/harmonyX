import React, {Component} from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import ReactDOM from 'react-dom';
import './App.css'

export default class Chat extends Component {

    constructor () {
        super()
        this.socket = new WebSocket(`wss://chat.kesarx.repl.co${window.location.pathname}`)
        this.waitForConnection = this.waitForConnection.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.itemsList = [];

        this.state = {
            activeUsers: 0
        }
    }

    async componentDidMount () {

        this.socket.addEventListener('open', function(event) {
            console.log('connected to ws')
        })

        this.socket.addEventListener('message', event => {
            if(event.data.startsWith('Users:')) {
                this.setState({activeUsers: event.data})
            } else {
                this.itemsList.push(JSON.parse(event.data))
                this.renderChat()
            }
        })

        document.getElementById('messageinput').addEventListener("keyup", async (event) => {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13 && event.target.value !== "") {
                this.sendMessage(event.target.value)
                document.getElementById('messageinput').value = ''
            }
        });

    }

    sendMessage (message, callback) {
        this.waitForConnection( () => {
            this.socket.send(message)
            if (typeof callback !== 'undefined') {
              callback();
            }
        }, 1000);
    };

    waitForConnection (callback, interval) {
        if (this.socket.readyState == 1) {
            callback();
        } else {
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };

    renderChat() {
        const messages = (
            <div>
                {this.itemsList.map((item, index) => (
                    <Row id={index} key={index}>
                        <span className='ml-auto' style={{backgroundColor: `#${item.color}`, color: `#${item.color}`}}>| </span>
                        <Col>
                            <Card className='border-0' style={{backgroundColor: `transparent`, borderRadius: '0'}}>
                                    <Card.Text style={{color: 'white'}}>{item.message}</Card.Text>
                            </Card>
                        </Col>
                    </Row>                        
                ))}
            </div>
        )
        ReactDOM.render(messages, document.getElementById('chat'))
        document.getElementById(this.itemsList.length-1).scrollIntoView({behavior: 'smooth'})
    }

    render() {
        return ( 
        <div className="App">
            <div className="fixed-top">
                <Navbar bg='none' variant="dark" expand="lg" fixed='top' style={{ position: "sticky", top: 0, backgroundColor: 'transparent'}}>
                <Container className="align-items-center" fluid>
                    <Navbar.Brand href={window.location.pathname}>
                        <Col className="mb-3"><h1 style={{textDecoration: 'underline'}}>{window.location.pathname}</h1></Col>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-white">
                        <Nav.Link className='navlink2'>Rooms</Nav.Link>
                        <Nav.Link className='navlink2'>{this.state.activeUsers}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
            <Container fluid>
                    <Container className='rounded' style={{textAlign: "left", paddingTop: '5%', paddingBottom: '5%'}}>
                        <div className='p-4' id='chat'>
                        </div>
                    </Container>
                <div className='fixed-bottom'>
                    <Container className='rounded' style={{textAlign: "left", backgroundColor: 'rgba(40, 40, 40, 0.8)', padding: '20px'}}>
                            <Col className="mb-3">
                                    <input id='messageinput' className="form-control form-control-user inputfocus" type="text" placeholder="Message"/>
                            </Col>
                    </Container>
                </div>
            </Container>
        </div>
        )
    }
}