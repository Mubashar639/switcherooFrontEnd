import * as actions from "../actions/details/detailsAction";
import { message, } from 'antd';
import { baseurl } from "./index"

let timeoutGlobel = 10000

const token = localStorage.getItem( "tokenas" );
const detailsDataPost = ( data, callback ) => dispatch => {
  dispatch( actions.LoadingDetailsData( true ) );
  console.log( "data json=====>", data );
  const options = {
    method: "POST",
    body: JSON.stringify( { ...data } ),
    headers: new Headers( {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    } )
  };
  fetch( baseurl + "/detailsYouNeed/saveDetails", options )
    .then( res => {
      // dispatch(actions.LoadingDetailsData(false));
      console.log( "new response===>", res );
      if ( res.status === 200 || res.status === 201 )
        res.json().then( res => {

          console.log( "response data======>", res.updatedApplicants );
          dispatch( actions.setDetailsData( data.monthlyOutgoings ) );

        } );
    } )
    .catch( err => {
      console.log( err );
      dispatch( actions.LoadingDetailsData( false ) );
      alert( "Some thing going wrong! man" );
    } );
};

const detailsCreditDataPost = ( data, callback ) => dispatch => {
  dispatch( actions.LoadingDetailsData( true ) );
  console.log( "data json", data );
  const options = {
    method: "POST",
    body: JSON.stringify( { ...data } ),
    headers: new Headers( {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    } )
  };
  fetch( baseurl + "/detailsYouNeed/saveDetails", options )
    .then( res => {
      // dispatch(actions.LoadingDetailsData(false));
      console.log( "new response===>", res );
      console.log( "data=====>", data );
      if ( res.status === 200 || res.status === 201 ) {
        res.json().then( res => {
          console.log( "new response data======>", res );
          dispatch( actions.setDetailsDataCredit( data.creditCommitments ) );

        } );
      }

    } )
    .catch( err => {
      console.log( err );
      dispatch( actions.LoadingDetailsData( false ) );
      alert( "Some thing going wrong! man" );
    } );
};
const bankDetailsPost = ( data, callback ) => dispatch => {
  dispatch( actions.LoadingDetailsData( true ) );
  console.log( "data json", data );
  const options = {
    method: "POST",
    body: JSON.stringify( { ...data } ),
    headers: new Headers( {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    } )
  };
  fetch( baseurl + "/detailsYouNeed/saveDetails", options )
    .then( res => {
      // dispatch(actions.LoadingDetailsData(false));
      console.log( "new response===>", res );
      console.log( "data=====>", data );
      if ( res.status === 200 || res.status === 201 )
        res.json().then( res => {
          console.log( "new response data======>", res );
          dispatch( actions.setBankDetails( data.creditCommitments.loanOrOverdraftCosts ) );

        } );
    } )
    .catch( err => {
      console.log( err );
      dispatch( actions.LoadingDetailsData( false ) );
      alert( "Some thing going wrong! man" );
    } );
};

const Api = {
  detailsDataPost,
  detailsCreditDataPost,
  bankDetailsPost
};
export default Api;


const success = ( data ) => {
  message.success( data );
};

const error = ( data ) => {
  message.error( data );
};

const warning = ( data ) => {
  const hide = message.loading( data, 0 );
  setTimeout( hide, timeoutGlobel );
};