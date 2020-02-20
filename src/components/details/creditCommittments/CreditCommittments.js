import React, { useState, Component } from "react";
import { Row, Col, Select, Button, Icon } from "antd";
import "./CreditCommittments.css";
import InputMask from 'react-input-mask'
import { connect } from "react-redux";
import Api from "../../../redux/api/detailsApi";
import { baseurl } from "../../../redux/api";
import * as actions from "../../../redux/actions/details/detailsAction";
import { configConsumerProps } from "antd/lib/config-provider";

const { Option } = Select;
const banks = [
    "Aib",
    "An Post",
    "currentAccIns of Ireland",
    "KBC",
    "PTSB",
    "Ulster currentAccIns",
    "Credit Union",
    "Other"
];

const counties = [
    "Carlow",
    "Cavan",
    "Clare",
    "Cork branchCity",
    "Cork County",
    "Denegal",
    "Dublin 1",
    "Dublin 2",
    "Dublin 3",
    "Dublin 4",
    "Dublin 5",
    "Dublin 6",
    "Dublin 6w",
    "Dublin 7",
    "Dublin 8",
    "Dublin 9",
    "Dublin 10",
    "Dublin 11",
    "Dublin 12",
    "Dublin 13",
    "Dublin 14",
    "Dublin 15",
    "Dublin 16",
    "Dublin 17",
    "Dublin 18",
    "Dublin 20",
    "Dublin 22",
    "Dublin 24",
    "Dublin Country(North)",
    "Dublin Country(South)",
    "Dublin Country(West)",
    "Galway branchCity",
    "Galway Country",
    "Kerry",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Leitrim branchCity",
    "Limerick Country",
    "Longford",
    "Louth",
    "Mayo",
    "Meath",
    "Monaghan",
    "Offaly",
    "Roscommon",
    "Sligo",
    "Tipperary",
    "Waterford branchCity",
    "Waterford Country",
    "Westmeath",
    "Wexford",
    "Wicklow"
];

const years = [1, 2, 3, 4, 5, "5+"]
class CreditCommittments extends Component {
    state = {
        questions: {
            q1: ""
        },
        q4: false,
        currentAccIns: "",
        sortCode: "",
        counter: 0,
        InputMask: "",
        credUnionLoc: "",
        institutionName: "",
        branchAddress: "",
        branchCity: "",
        branchCounty: "",
        accDuration: "",
        eirCode: "",
        accNum: "",
        comments: "",
        firstPaymentAcc: "",

    }
    handleDurChange = ( value ) => {
        this.setState( {
            accDuration: value
        } )
    }

    clickRadio = ( e ) => {
        var label = e.target.childNodes[1];
        if ( label ) {
            label.click();
        }
    }
    handleInputChange = ( e ) => {
        const name = e.target.name;
        this.setState( {
            [name]: e.target.value
        } )
    }
    handleComments = ( e ) => {
        this.setState( {
            comments: e.target.value
        } )
    }

    handleSortChange = ( e ) => {
        this.setState( {
            sortCode: e.target.value
        } )
    }
    handleQ = e => {
        const { questions } = this.state
        var radioContainers = e.target.parentNode.parentNode.childNodes;
        var qs = questions;
        qs[e.target.name] = e.target.value;
        console.log( qs );
        this.setState( {
            firstPaymentAcc: e.target.value,
            q4: !this.state.q4
        } )
        // validateRadio(e.target.name, e.target.value);
        for ( var i = 0; i < radioContainers.length; i++ ) {
            var input = radioContainers[i].childNodes[0];
            console.log( "input status===>", input.checked );
            if ( input.checked ) {
                input.parentNode.style.background = "#fb9500";
                input.parentNode.style.border = "2px solid #fb9500";
            } else {
                input.parentNode.style.background = "lightgray";
                input.parentNode.style.border = "2px solid gray";
            }
        }
    };
    handleChange = ( value ) => {
        this.setState( {
            currentAccIns: value
        } )
    }
    handlebranchCounty = ( value ) => {
        this.setState( {
            branchCounty: value
        } )
    }

    handleRoute = route => {
        console.log()
        this.props.changeProfRout( 7 );
    };
    handleSubmit = () => {
        let { currentAccIns,
            sortCode,
            credUnionLoc,
            institutionName,
            branchAddress,
            branchCity,
            branchCounty,
            accDuration,
            eirCode,
            accNum,
            comments,
            firstPaymentAcc
        } = this.state
        let data = {
            currentAccIns,
            sortCode,
            credUnionLoc,
            institutionName,
            branchAddress,
            branchCity,
            branchCounty,
            accDuration,
            eirCode,
            accNum,
            comments,
            firstPaymentAcc
        }
        this.props.setCreditCommentments( {
            userId: this.props.userId,
            monthlyOutgoings: {
                ...this.props.newProps,
            },
            creditCommitments: {
                ...data
            }
        } )
        console.log( this.props.loading );
        if ( !this.props.loading ) {
            this.props.changeProfRout( 7 );
        }

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
                    console.log( "credic commentments===>", res );
                    console.log( "responsed====>", res.creditCommitments );
                    if(res.creditCommitments.loanOrOverdraftCosts && res.creditCommitments.loanOrOverdraftCosts.length>0){
                        console.log("inside condition===>",res.creditCommitments.loanOrOverdraftCosts)
                        this.props.setBanks(res.creditCommitments.loanOrOverdraftCosts);
                    }
                    if ( res.creditCommitments ) {
                        const { currentAccIns,
                            sortCode,
                            credUnionLoc,
                            institutionName,
                            branchAddress,
                            branchCity,
                            branchCounty,
                            accDuration,
                            eirCode,
                            accNum,
                            comments,
                            firstPaymentAcc } = res.creditCommitments
                        this.setState( {
                            currentAccIns,
                            sortCode,
                            credUnionLoc,
                            institutionName,
                            branchAddress,
                            branchCity,
                            branchCounty,
                            accDuration,
                            eirCode,
                            accNum,
                            comments,
                            firstPaymentAcc

                        } )
                    }

                } );
            } )
            .catch( err => {
                console.log( err );
                alert( err.msg );
            } );
    }
    renderCommentsBox = ( q ) => {
        const { comments } = this.state
        if ( q == "b" ) {
            return <>
                <Col lg={24}>
                    <h6 className="h61">
                        If not please explain which account will be used for your first mortgage payments
                    </h6>
                </Col>

                <Col lg={24}>
                    <div className={comments ? "textarea-input maltaback" : "textarea-input"}>
                        <textarea
                            placeholder="comments"
                            value={comments}
                            onChange={this.handleComments}
                        />
                    </div>
                </Col>
            </>
        }
    }
    currentAccInsConditional = () => {
        const { currentAccIns, credUnionLoc, institutionName } = this.state;
        if ( currentAccIns === "Credit Union" ) {
            return <React.Fragment><Col lg={24}>
                <h6 className="h61">please provide Location</h6>
            </Col>
                <Col className="colomn_8" lg={10}>
                    <div className={
                        credUnionLoc !== "" ? "input maltaback" : "input"
                    }>
                        <input type="text"
                            name="credUnionLoc"
                            placeholder="Location"
                            value={credUnionLoc}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </Col></React.Fragment>
        } else if ( currentAccIns === "Other" ) {
            return <React.Fragment><Col lg={24}>
                <h6 className="h61">please provide name</h6>
            </Col>
                <Col className="colomn_8" lg={10}>
                    <div className={
                        institutionName !== "" ? "input maltaback" : "input"
                    }>
                        <input
                            type="text"
                            name="institutionName"
                            placeholder="institutionName"
                            value={institutionName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </Col></React.Fragment>
        }
    }
    render() {
        const {
            questions,
            sortCode,
            branchAddress,
            branchCity,
            branchCounty,
            eirCode,
            accNum,
            firstPaymentAcc,
            currentAccIns } = this.state
        return (
            <div className="credit-commitments" >
                <Row className="d-row-s1">
                    <Col lg={24}>
                        <h1 className="heading1">
                            Details of your credit commitments
                        </h1>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">What institution do you have your main current account with?</h6>
                    </Col>
                    <Col className="colomn_8" lg={6}>
                        <div >
                            <Select
                                className={currentAccIns !== "" ? "select-option1 maltaback" : "select-option1"}
                                value={currentAccIns == "" ? "Select from options" : currentAccIns}

                                onChange={this.handleChange}
                            >
                                {banks.map( ( rec, key ) => <Option key={key} value={rec}>{rec}</Option> )}
                            </Select>
                        </div>
                    </Col>
                    {this.currentAccInsConditional()}
                    <Col lg={24}>
                        <h6 className="h61">Address of branch</h6>
                    </Col>
                    <Col lg={24}>
                        <div className={
                            branchAddress !== "" ? "input maltaback" : "input"
                        }>
                            <input type="text"
                                name="branchAddress"
                                value={branchAddress}
                                onChange={this.handleInputChange}
                                placeholder="Address Line 1" />
                        </div>
                    </Col>
                    <Col lg={24}>
                        <div className={branchCity !== "" ? "input maltaback" : "input"}>
                            <input type="text"
                                name="branchCity"
                                value={branchCity}
                                onChange={this.handleInputChange}
                                placeholder="branchCity" />
                        </div>
                    </Col>
                    <Col className="colomn_8" lg={15}>
                        <Select
                            className={branchCounty !== "" ? "select-option1 maltaback" : "select-option1"}
                            value={branchCounty == "" ? "Select from options" : branchCounty}
                            onChange={this.handlebranchCounty}

                        >
                            {counties.map( ( rec, key ) => <Option key={key} value={rec}>{rec}</Option> )}
                        </Select>
                    </Col>
                    <Col lg={24}>
                        <div className={eirCode !== "" ? "input maltaback" : "input"}>
                            <input
                                type="text"
                                name="eirCode"
                                value={eirCode}
                                onChange={this.handleInputChange}
                                placeholder="EirCode" />
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">Account Number</h6>
                    </Col>
                    <Col className="colomn_8" lg={10}>
                        <div className={accNum !== "" ? "input maltaback" : "input"}>
                            <input type="text"
                                name="accNum"
                                placeholder="Acount Number"
                                value={accNum}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">Sort Code</h6>
                    </Col>
                    <Col className="colomn_8" lg={10}>
                        <div className={sortCode !== "" ? "input maltaback" : "input"}>
                            <InputMask
                                {...this.props}
                                mask="99-99-99"
                                alwaysShowMask="true"
                                maskChar="X"
                                value={sortCode}
                                onChange={this.handleSortChange} />

                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">How long have you had this account?</h6>
                    </Col>
                    <Col className="colomn_8" lg={6} style={{ width: "27%" }}>
                        <div>
                            <Select
                                className={this.state.accDuration !== "" ? "select-option1 maltaback" : "select-option1"}
                                value={this.state.accDuration == "" ? "Select from options" : this.state.accDuration}
                                onChange={this.handleDurChange}
                            >
                                {years.map( ( rec, key ) => <Option key={key} value={rec}>{rec}</Option> )}
                            </Select>
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Please confirm this is the account that you will be making your first mortgage payment from
                        </h6>
                    </Col>
                    <Col lg={24} className="q1 q3 my_costuma colomn_8">
                        <div
                            onClick={this.clickRadio}
                            className={
                                firstPaymentAcc === "a"
                                    ? "radio-container container_malta"
                                    : "radio-container"
                            }
                        >
                            <input
                                onChange={this.handleQ}
                                type="radio"
                                name="firstPaymentAcc"
                                id="q31"
                                className=""
                                checked={firstPaymentAcc === "a"}
                                value="a"
                            />
                            <label for="q31">Yes</label>
                        </div>
                        <div
                            onClick={this.clickRadio}
                            className={
                                firstPaymentAcc === "b"
                                    ? "radio-container container_malta"
                                    : "radio-container"
                            }
                        >
                            <input
                                onChange={this.handleQ}
                                type="radio"
                                name="firstPaymentAcc"
                                id="q32"
                                checked={firstPaymentAcc === "b"}
                                className=""
                                value="b"
                            />
                            <label for="q32">No</label>
                        </div>
                    </Col>
                    {questions.firstPaymentAcc && this.renderCommentsBox( questions.firstPaymentAcc )}
                    <Col lg={24}>
                        <h6 className="heading1">
                            OK, lets add loan/overdraft/credit card details
                    </h6>
                    </Col>
                    <Col lg={10} offset={0}>
                        <div className="btn-div">
                            <Button
                                style={{ height: "40px" }}
                                onClick={() => this.props.changeProfRout( 5 )}
                                className="btn1"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => this.handleSubmit()}
                                className="btn2"
                                loading={this.props.loading}

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
        newProps: state.detailsReducer.monthlyOutgoings,
        loading: state.detailsReducer.loading,
        error: state.detailsReducer.error,
    }
}


const mapDispatchToProps = dispatch => ( {
    setCreditCommentments: ( props, callback ) =>
        dispatch( Api.detailsCreditDataPost( props, callback ) ),
    setBanks: ( data ) => dispatch( actions.setBanks( data ) ),
} );
export default connect( mapStateToProps, mapDispatchToProps )( CreditCommittments );