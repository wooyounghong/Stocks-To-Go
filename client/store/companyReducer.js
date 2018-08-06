import axios from 'axios';

// action type:
const GET_DATA = 'GET_DATA';
const STORE_TIME = 'STORE_TIME';
const STORE_QUERYSTR = 'STORE_QUERYSTR';
const STORE_INFO = 'STORE_INFO';
// action creator
export const loadData = data => ({
	type: GET_DATA,
	data
});

export const storeCurrentTime = item => {
	return {
		type: STORE_TIME,
		item
	};
};
export const storeQueryStr = queryStr => {
	return {
		type: STORE_QUERYSTR,
		queryStr
	};
};
export const storeCompanyInfo = info => ({
	type: STORE_INFO,
	info
});

// thunk creator:

export const fetchData = (symbol, time) => async dispatch => {
	try {
		const { data } = await axios.get(`/api/stock/${symbol}/${time}`);
		dispatch(loadData(data));
	} catch (error) {
		console.log(error);
	}
};

export const fetchInfo = queryStr => async dispatch => {
	try {
		const { data } = await axios.get(`api/stock/${queryStr}`);
		console.log('data', data);
		dispatch(storeCompanyInfo(data));
	} catch (error) {
		console.log(error);
	}
};

const companyReducer = (
	state = { company: [], current: { time: '1D' }, queryStr: '', info: {} },
	action
) => {
	switch (action.type) {
		case STORE_TIME:
			return { ...state, current: { time: action.item } };
		case GET_DATA:
			return { ...state, company: action.data };
		case STORE_QUERYSTR:
			return { ...state, queryStr: action.queryStr };
		case STORE_INFO:
			return { ...state, info: action.info };
		default:
			return state;
	}
};

export default companyReducer;
