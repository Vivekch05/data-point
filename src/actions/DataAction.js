import { GET_DATA, SUBMIT_DATA,SELECTED_DATA } from './Types';
import axios from 'axios';

export const getData = () => (dispatch) => {
    axios.get("http://localhost:3000/posts")
        .then((response) => {
            console.log(response.data);
            dispatch({ type: GET_DATA, payload: response.data });
        })
};

export const editData = (state, id) => (dispatch) => {
    // console.log(id);
    const editDataField = {
        userId: state.userId,
        id: state.id,
        title: state.title,
        body: state.body
    };
    console.log(editDataField);
    axios.put(`http://localhost:3000/posts/${id}`, editDataField)
        .then((response) => {
            console.log(response.data);
            axios.get("http://localhost:3000/posts")
                .then((response) => {
                    dispatch({ type: GET_DATA, payload: response.data });
                })
        })
}

export const submitData = (state) => (dispatch) => {
    const submitDataField = {
        userId: state.userId,
        id: state.id,
        title: state.title,
        body: state.body
    };
    console.log(submitDataField);
    axios.post(`http://localhost:3000/posts`, submitDataField)
        .then((response) => {
            console.log(response);
            dispatch({ type: SUBMIT_DATA, payload: response.data });
        }, (error) => {
            console.log(error);
        });
}

export const getSeletedData = (allData, e) => (dispatch) => {
    console.log(allData, e.target);
    const selectedData = allData.filter((item => ((item.userId === parseInt(e.target.id))&& (item.id === parseInt(e.target.name))) ))
    console.log(selectedData);
     dispatch({ type: SELECTED_DATA, payload: selectedData });
}
