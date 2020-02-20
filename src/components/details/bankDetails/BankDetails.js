import React, { Component } from "react";
import { Row, Col, Select, Button, Icon } from "antd";
import "./BankDetails.css";
import BankCollapse from "./BankCollasp";
import Api from "../../../redux/api/detailsApi";
import { connect } from "react-redux";
import { baseurl } from "../../../redux/api";

const { Option } = Select;
const purposeArray = [
  "Car Loan",
  "Holiday",
  "Wedding",
  "Lifestyle",
  "Home Improvement",
  "Furniture",
  "Education Fees",
  "Other"
];
const lenderArray = [
  "Aib",
  "An Post",
  "Bank of Ireland",
  "KBC",
  "PTSB",
  "Ulster bank",
  "Credit Union",
  "Other"
];
const AddAcount = props => {
  return (
    <Col lg={6} className="add-bank-column">
      <div className="add-account" onClick={props.handleAddAccount}>
        <Icon type="plus" className="add-text" />
        <span className="add-text2">{props.name}</span>
      </div>
    </Col>
  );
};
class BankDetails extends Component {
  state = {
    loanOrOverdraftCosts: [],
    monthlyOutgoings: {},
    creditCommitments: {},
    q4: false,
    questions: {
      q: ""
    }

  };

  clickRadio = e => {
    var label = e.target.childNodes[1];
    if ( label ) {
      label.click();
    }
  };
  // Create new Acount 
  generateAcount = ( type ) => {

    let newAcount = {
      accType: type,
      accPurpose: "",
      comments: "",
      lenderName: "",
      creditUnionName: "",
      creditUnionLoc: "",
      accNumber: "",
      outstandingBal: "",
      monthlyRepayments: "",
      arrears: "",
      finalPayDate: "",
      clearing: "",
      isActive: true,
    }
    for ( let i = 0; i < this.state.loanOrOverdraftCosts.length; i++ ) {
      this.state.loanOrOverdraftCosts[i].isActive = false;
    }
    this.setState( {
      loanOrOverdraftCosts: [...this.state.loanOrOverdraftCosts, { ...newAcount }]
    } );
  }
  handleClick = ( index ) => {
    for ( let i = 0; i < this.state.loanOrOverdraftCosts.length; i++ ) {
      if ( i !== index ) {
        this.state.loanOrOverdraftCosts[i].isActive = false;
      }
    }
    this.setState( ( { loanOrOverdraftCosts, questions } ) => ( {
      questions: { ...questions, q3: "" },
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          isActive: !this.state.loanOrOverdraftCosts[index].isActive,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]

    } ) );
  }
  //handle purpose select 
  handlePurposeChange = ( value, index ) => {
    this.setState( ( { loanOrOverdraftCosts } ) => ( {
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          accPurpose: value,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]
    } ) );
  };
  handleLenderChange = ( value, index ) => {
    this.setState( ( { loanOrOverdraftCosts } ) => ( {
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          lenderName: value,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]
    } ) );
  }
  handleInputChange = ( event, index ) => {
    const { name, value, validity } = event.target;
    if ( name === "creditUnionLoc" || name === "creditUnionName" ) {
      this.setState( ( { loanOrOverdraftCosts } ) => ( {
        loanOrOverdraftCosts: [
          ...loanOrOverdraftCosts.slice( 0, index ),
          {
            ...loanOrOverdraftCosts[index],
            [name]: value,
          },
          ...loanOrOverdraftCosts.slice( index + 1 )
        ]
      } ) );
    } else {
      this.setState( ( { loanOrOverdraftCosts } ) => ( {
        loanOrOverdraftCosts: [
          ...loanOrOverdraftCosts.slice( 0, index ),
          {
            ...loanOrOverdraftCosts[index],
            [name]: validity.valid ? value : loanOrOverdraftCosts[index][name],
          },
          ...loanOrOverdraftCosts.slice( index + 1 )
        ]
      } ) );
    }
  }
  handleSubmit = () => {
    let { loanOrOverdraftCosts } = this.state

    this.props.bankDetailsPost( {
      userId: this.props.userId,
      monthlyOutgoings: {
        ...this.state.monthlyOutgoings
      },
      creditCommitments: {
        ...this.state.creditCommitments,
        loanOrOverdraftCosts: [...loanOrOverdraftCosts]
      }
    } )
    // console.log( this.props.loading );
    // if ( !this.props.loading ) {
    //   this.props.changeProfRout( 7 );
    // }

  }
  componentDidMount = () => {
    const options = {
      method: "GET",
      headers: new Headers( {
        Authorization: "Bearer " + localStorage.getItem( "tokenas" ),
        "Content-Type": "application/json"
      } )
    };
    let url = `${ baseurl }/detailsYouNeed/getDetails/${ this.props.userId }`
    fetch( url, options )
      .then( res => {
        console.log( res );
        res.json().then( res => {
          console.log( "responsed====>", res );
          if ( res.creditCommitments.loanOrOverdraftCosts ) {
            this.setState( {
              creditCommitments: res.creditCommitments,
              monthlyOutgoings: res.monthlyOutgoings,
              loanOrOverdraftCosts: [...res.creditCommitments.loanOrOverdraftCosts]
            } )
          } else {
            this.setState( {
              creditCommitments: res.creditCommitments,
              monthlyOutgoings: res.monthlyOutgoings,
            } )
          }

        } );
      } )
      .catch( err => {
        console.log( err );
        alert( err.msg );
      } );
  }
  handleCommentsChange = ( evt, index ) => {
    const { value } = evt.target;
    console.log( "index", index )
    this.setState( ( { loanOrOverdraftCosts } ) => ( {
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          comments: value.length < 256 ? value : loanOrOverdraftCosts[index].comments,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]
    } ) );
  }
  onDateChange = ( date, dateString, index ) => {
    this.setState( ( { loanOrOverdraftCosts } ) => ( {
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          finalPayDate: dateString,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]
    } ) );
  }

  //loan acount methods
  handleQ = e => {
    const { questions } = this.state;
    var radioContainers = e.target.parentNode.parentNode.childNodes;
    console.log( "readio =====>", radioContainers );
    var qs = questions;
    qs[e.target.name] = e.target.value;
    console.log( qs );
    this.setState( {
      q4: !this.state.q4
    } );
  };
  handleRadioButton = ( e, index ) => {
    const value = e
    console.log( "value     ==>", value );
    // console.log("value=====>",e.target.value)
    this.setState( ( { loanOrOverdraftCosts } ) => ( {
      loanOrOverdraftCosts: [
        ...loanOrOverdraftCosts.slice( 0, index ),
        {
          ...loanOrOverdraftCosts[index],
          clearing: value,
        },
        ...loanOrOverdraftCosts.slice( index + 1 )
      ]
    } ) );
  }

  renderAcount = () => {
    return (
      <React.Fragment>
        <AddAcount name="Loan Account" handleAddAccount={() => this.generateAcount( "loan" )} />
        <AddAcount
          name="Overdraft Account"
          handleAddAccount={() => this.generateAcount( "overdraft" )}
        />
        <AddAcount
          name="Credit Card Account"
          handleAddAccount={() => this.generateAcount( "credit" )}
        />
      </React.Fragment>
    );
  };
  componentWillMount() {
    this.setState( {
      loanOrOverdraftCosts: this.props.loanOrOverdraftCosts ? this.props.loanOrOverdraftCosts : []
    } )
  }

  render() {
    const { questions, loanOrOverdraftCosts } = this.state
    console.log( "Accounts details =====>", this.state );
    return (
      <div className="credit-commitments">
        <Row className="d-row-s1">
          <Col lg={24}>
            <h1 className="heading1">Let's get some details of your account</h1>
          </Col>
          {loanOrOverdraftCosts.map( ( rec, index ) => {

            return (

              <Col lg={19}>
                <BankCollapse
                  accType={rec.accType}
                  isActive={rec.isActive}
                  index={index}
                  accPurpose={rec.accPurpose}
                  lenderName={rec.lenderName}
                  purposeArray={purposeArray}
                  lenderArray={lenderArray}
                  accNumber={rec.accNumber}
                  arrears={rec.arrears}
                  monthlyRepayments={rec.monthlyRepayments}
                  finalPayDate={rec.finalPayDate}
                  comments={rec.comments}
                  creditUnionName={rec.creditUnionName}
                  creditUnionLoc={rec.creditUnionLoc}
                  outstandingBal={rec.outstandingBal}
                  clearing={rec.clearing}
                  handleClick={() => this.handleClick( index )}
                  handlePurposeChange={this.handlePurposeChange}
                  handleLenderChange={this.handleLenderChange}
                  handleInputChange={this.handleInputChange}
                  onDateChange={this.onDateChange}
                  handleCommentsChange={this.handleCommentsChange}
                  handleRadioButton={this.handleRadioButton}

                />
              </Col> )
          }

          )}

          <Col lg={24}>
            <h6 className="h61">
              Do you have any monthly loan/overdraft/credit card costs?
            </h6>
          </Col>

          <Col lg={24} className="q1 q3 my_costuma colomn_8">
            <div
              onClick={this.clickRadio}
              className={
                questions.q3 === "a"
                  ? "radio-container container_malta"
                  : "radio-container unchecked"
              }
            >
              <input
                onChange={this.handleQ}
                type="radio"
                name="q3"
                id="q31"
                className=""
                checked={questions.q3 === "a"}
                value="a"
              />
              <label for="q31">Yes</label>
            </div>
            <div
              onClick={this.clickRadio}
              className={
                questions.q3 === "b" ? " radio-container container_malta" : "radio-container"
              }
            >
              <input
                onChange={this.handleQ}
                type="radio"
                name="q3"
                id="q32"
                checked={questions.q3 === "b"}
                className=""
                value="b"
              />
              <label for="q32">No</label>
            </div>
          </Col>
          {questions.q3 == "a" && this.renderAcount()}

          <Col style={{ marginTop: "50px" }} lg={24}>
            <h6 className="heading1">
              OK, lets get these acount details from you
            </h6>
          </Col>

          <Col lg={10} offset={0}>
            <div className="btn-div">
              <Button
                style={{ height: "40px" }}
                onClick={() => this.props.changeProfRout( 6 )}
                className="btn1"
              >
                Back
              </Button>
              <Button
                onClick={() => this.handleSubmit()}
                className="btn2"
              >
                Save & Continue
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    userId: state.userReducer.user._id,
    newProps: state.detailsReducer,
    loading: state.detailsReducer.loading,
    error: state.detailsReducer.error,
    loanOrOverdraftCosts: state.detailsReducer.loanOrOverdraftCosts
  }
}


const mapDispatchToProps = dispacth => ( {
  bankDetailsPost: ( props, callback ) =>
    dispacth( Api.bankDetailsPost( props, callback ) )
} );
export default connect( mapStateToProps, mapDispatchToProps )( BankDetails );