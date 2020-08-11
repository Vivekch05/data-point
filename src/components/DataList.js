import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData, getSeletedData } from '../actions/DataAction';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import EditData from './EditData';
class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    componentDidMount() {
        this.props.getData();
    }
    handleClick = (e) => {
        // const currentData = this.props.getDataList.filter((item) => { item.id === e.target.id });
        this.props.getSeletedData(this.props.getDataList, e);
        //  console.log(this.props.getDataList,e.target.id);
        console.log(e.target.id,e.target.name);

        this.setState({ show: true });

    }
    handleClose = () => {
        this.setState({ show: false });
    }
    render() {
        return (
            <div className="container jumbotron">
                <div style={{ position: "sticky", top: "0", zIndex: "1", paddingTop: "50px", textAlign: "center", width: "100%", height: "150px", backgroundColor: "blue", color: "white" }}>
                    <h1>All data List</h1></div>
                {
                    this.props.getDataList.map((item) => {
                        return (
                            <div >
                                <ListGroup.Item action variant="light" class="list-item">
                                    <p style={{ fontWeight: "bold", fontSize: "15px", color: "black" }}>User Id:  <span>{item.userId}</span></p>
                                    <div style={{ padding: "0 0 0 15px" }}>
                                        <p style={{ fontWeight: "bold", fontSize: "15px", color: "black" }}>Id:  <span>{item.id}</span><span style={{ float: "right" }}>
                                            <span style={{ fontSize: "16px" }}>Title: </span>{item.title}</span></p>
                                        <p><span style={{ fontWeight: "bold", fontSize: "15px", color: "black" }}>Body:</span> {item.body}</p>
                                    </div>
                                    <div style={{ float: "right" }}><Button variant="success" size="sm" id={item.userId} name={item.id} onClick={this.handleClick}>Edit Data</Button></div>
                                </ListGroup.Item>
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit data Form</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {
                                            this.props.getSeletcedDataList.length !== 0 ?
                                                <>{
                                                    this.props.getSeletcedDataList.map((currentDataItem) => {
                                                        return (
                                                            <EditData userId={currentDataItem.userId} id={currentDataItem.id} title={currentDataItem.title} body={currentDataItem.body} />

                                                        )
                                                    })
                                                }</> : <EditData />
                                        }
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )
                    })

                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    getDataList: state.dataItem.dataList,
    getSeletcedDataList: state.dataItem.selectedDataList


});
export default connect(mapStateToProps, { getData, getSeletedData })(DataList);
