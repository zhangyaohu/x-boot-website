let initialState = {
  state: {

	}
}

const httpReducers = (state = initialState.state, action) => {
	debugger
  switch(action.type) {
		case 'SUCCESS': 
		return action.payload;
		case 'ERROR':
		return action.payload;
		default: 
		return state;
	}
}