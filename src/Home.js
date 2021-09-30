import React, {Component} from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
const Discord = require('discord.js')
const { RichEmbed } = require("discord.js")
const client = new Discord.Client();

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        message: '',
    };
    this.sendMessage = this.sendMessage.bind(this);

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setPresence({
            status: "online", 
        });
    });
    
    client.login('ODkzMTQ5NjkxNjQ5MzU5OTIz.YVXQeA.cm-Y3lTATnCrf4za4DU_Ez7LFUg');
  }

  async sendMessage(event) {
    
  }

  render() {
    client.on('message', async msg => {

    });
        return ( 
        <div className="App">
            <Container>
                <Row className='justify-content-center'>
                    <Col md={9} lg={8} xl={8}>
                        <Card className='round my-5 colored'>
                            <Card.Body>
                                <div className='p-4'>
                                    <span>the chat</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className='fixed-bottom'>
                    <Container fluid className='rounded'>
                        <div className="mb-3">
                                <input className="form-control form-control-user inputfocus" type="text" placeholder="Message" onChange={ (e) => {this.setState({message: e.target.value})}}/>
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
        )
    }
}