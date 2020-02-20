import * as Action from '../../actions/details/detailsActionType'

const initialstate = {
  loading: false,
  monthlyOutgoings: {},
  creditCommitments: {},
  errors: false,
  modal: false
};

function detailsReducer( state = initialstate, action ) {
  console.log( action )
  switch ( action.type ) {
    case Action.SET_DETAILS_DATA:
      return {
        ...state,
        loading: false,
        monthlyOutgoings: action.payload.monthlyOutgoings
      };
    case Action.SET_DETAILS_DATA_CREDIT:
      return {
        ...state,
        loading: false,
        creditCommitments: action.payload,

      }
    case Action.SET_BANK_DETAILS:
      return {
        ...state,
        creditCommitments: {
          ...state.creditCommitments,
          loanOrOverdraftCosts: action.payload,
        },
        loading: false,
      }
    case Action.SET_BANKS:
      console.log("inside reducer====>",action.payload);
      return {
        ...state,
        loanOrOverdraftCosts: action.payload
      }
    case Action.DETAILS_DATA_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
export default detailsReducer
