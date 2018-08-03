import axios from 'axios';

// action type:
const GET_DATA = 'GET_DATA';
// action creator
export const loadData = data => ({
	type: GET_DATA,
	data
});

// thunk creator:

export const fetchData = symbol => async dispatch => {
	try {
		const time = '1y'; // need to change the time later!
		const { data } = await axios.get(`/api/stock/${symbol}/${time}`);
		dispatch(loadData(data));
	} catch (error) {
		console.log(error);
	}
};

const companyReducer = (state = { company: [] }, action) => {
	switch (action.type) {
		case GET_DATA:
			return { ...state, company: action.data };
		default:
			return state;
	}
};

export default companyReducer;
