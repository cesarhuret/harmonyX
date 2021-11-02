import React, {Component} from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import ReactDOM from 'react-dom';

export default class Home extends Component {

  async componentDidMount () {

    document.getElementById('messageinput').addEventListener("keyup", async (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13 && event.target.value !== "") {
          // Cancel the default action, if needed
            const message = await fetch('https://chat.kesarx.repl.co/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: 'anonymous',
                    content: event.target.value 
                })
            }).then((res) => res.json());
            this.renderMessages()
            document.getElementById('messageinput').value = ''
        }
      });

    this.renderMessages()
  }

  async renderMessages() {
    let messageList;
    try {
        const messages = await fetch('https://chat.kesarx.repl.co/')
        messageList = await messages.json();
    } catch (e) {
            console.log(e)
    }

        let itemsList = [];
        for (let i = 0; i < messageList.length; i++) {
            const date = new Date(messageList[i].updatedAt)
                itemsList.push(
                    <div key={messageList[i]._id}>
                        <Col style={{paddingBottom: 30}}>
                            <Card bg='dark' text='white'>
                                <Card.Header>
                                    <Row>
                                        <Col xs={{span: 'auto'}}>{messageList[i].sender}</Col>
                                        <Col xs={{span: 'auto'}} text='muted' className='ml-auto'>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Col>
                                        <img src='delete.png' onClick={async () => {
                                            await fetch(`https://chat.kesarx.repl.co/delete/${messageList[i]._id}`, {
                                                method: 'DELETE',
                                            })
                                            this.renderMessages()
                                        }}/>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>{messageList[i].content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                )
        }
      ReactDOM.render(itemsList, document.getElementById('chat'))
  }

  render() {
        return ( 
        <div className="App">
            <Container>
                    <Container className='rounded' style={{textAlign: "left", paddingTop: '5%', paddingBottom: '5%'}}>
                        <div className='p-4' id='chat' style={{border: '2px solid black',  borderRadius: '1.5rem',}}></div>
                    </Container>
                <div className='fixed-bottom'>
                    <Container className='rounded' style={{textAlign: "left", backgroundColor: 'rgba(40, 40, 40, 0.8)', padding: '20px'}}>
                        <div className="mb-3">
                                <input id='messageinput' className="form-control form-control-user inputfocus" type="text" placeholder="Message"/>
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
        )
    }
}