import React, {Component} from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import ReactDOM from 'react-dom';

export default class Home extends Component {

    constructor () {
        super()
        this.socket = new WebSocket('wss://chat.kesarx.repl.co')
        this.waitForConnection = this.waitForConnection.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.itemsList = [];
    }

    async componentDidMount () {

        this.socket.addEventListener('open', function(event) {
            console.log('connected to ws')
        })

        this.socket.addEventListener('message', event => {
            this.itemsList.push(`${event.data}`)
            this.renderChat()
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
                {this.itemsList.map((item) => (
                    <div>
                        <Col style={{paddingBottom: 30}}>
                            <Card bg='dark' text='white'>
                                <Card.Body>
                                    <Card.Text>{item}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>                        
                ))}
            </div>
        )
        ReactDOM.render(messages, document.getElementById('chat'))
    }

    render() {
        return ( 
        <div className="App">
            <Container>
                    <Container className='rounded' style={{textAlign: "left", paddingTop: '5%', paddingBottom: '5%'}}>
                        <div className='p-4' id='chat' style={{border: '2px solid black',  borderRadius: '1.5rem',}}>
                        
                        </div>
                    </Container>
                <div className='fixed-bottom'>
                    <Container className='rounded' style={{textAlign: "left", backgroundColor: 'rgba(40, 40, 40, 0.8)', padding: '20px'}}>
                        <div className="mb-3">
                                <input id='messageinput' className="form-control form-control-user inputfocus" type="text" placeholder="Message"/>                        </div>
                    </Container>
                </div>
            </Container>
        </div>
        )
    }
}