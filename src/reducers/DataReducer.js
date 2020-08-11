import { GET_DATA, SUBMIT_DATA, SELECTED_DATA } from "../actions/Types";

const initState = {
    dataList: [],
    selectedDataList:[]
};
export default function (state = initState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                dataList: action.payload,
            };
        case SUBMIT_DATA:
            return {
                ...state,
                dataList: [...state.dataList, action.payload]
            };
            case SELECTED_DATA:
            return {
                ...state,
                selectedDataList: action.payload
            };
        default:
            return state;
    }
}