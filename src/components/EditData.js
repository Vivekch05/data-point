import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import { Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import { submitData,editData } from '../actions/DataAction';
import { connect } from 'react-redux';
//import axios from 'axios';
class EditData extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        userid: "",
        id: "",
        title: "",
        body: "",
        check: true
    }
    componentDidMount() {

        this.setState(
            this.state.check === true ?
                {
                    userId: this.props.userId,
                    id: this.props.id,
                    title: this.props.title,
                    body: this.props.body,
                } : {
                    userId: "",
                    id: "",
                    title: "",
                    body: "",
                }
        )
    }
    handleSubmit = (e) => {
        this.setState({ check: false })
        e.preventDefault();
        console.log(this.props.getDataList)
        this.props.getDataList.forEach((item) => {
            if (item.id===this.props.id) {
                this.props.editData(this.state,this.props.id);
            }
            else {
                this.props.submitData(this.state);
            }
        })

        console.log(this.state);
    }
    dataChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e);

    }
    handleReset = () => {
        this.setState(() => this.initialState);
        console.log(this.initialState);
    }

    render() {
        const { userId, id, title, body } = this.state;
        return (
            <div className="container">
                <Card>
                    <Card.Header style={{background: "linear-gradient(to right, #ff0000 50%, #ff3399 91%)",color: "white" }}><FontAwesomeIcon icon={faPlusSquare} />&nbsp;Edit Your Data</Card.Header>
                    <Form onReset={this.handleReset} onSubmit={this.handleSubmit}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridId">
                                    <Form.Label>User Id</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="userId"
                                        value={userId}
                                        onChange={this.dataChange}
                                        placeholder="Enter Your User Id"
                                        className="bg-white text-black"
                                    />
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="id"
                                        value={id}
                                        onChange={this.dataChange}
                                        placeholder="Enter Your Id"
                                        className="bg-white text-black"
                                    />
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="title"
                                        value={title}
                                        onChange={this.dataChange}
                                        placeholder="Enter Your Title"
                                        className="bg-white text-black"
                                    />
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control as="textarea" rows="3" required autoComplete="off"
                                        type="text" name="body"
                                        value={body}
                                        onChange={this.dataChange}
                                        placeholder="Enter Your Body field"
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: "5px" }} size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />
                            &nbsp;Submit
                        </Button>
                            <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} />
                            &nbsp;Reset
                        </Button>
                        </Card.Footer>
                    </Form>

                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    getDataList: state.dataItem.dataList,
    // bookDataCollections: state.bookItem.bookCollections

});

export default connect(mapStateToProps, { submitData,editData })(EditData);

