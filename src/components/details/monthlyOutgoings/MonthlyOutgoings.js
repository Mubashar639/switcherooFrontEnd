import React, { Component } from "react";
import { Row, Col, Select, Button, Icon } from "antd";
import "./MonthlyOutgoings.css";
import { connect } from "react-redux";
import Api from "../../../redux/api/detailsApi";
import { baseurl } from "../../../redux/api";

class MonthlyOutgoing extends Component {
    state = {
        childMining: 5000,
        spousalMaintenance: 3000,
        schoolFee: "",
        clubSubcriptions: "",
        isDisabledChild: "true",
        isDisabledMaintainance: "true",

    }

    handleInputChange = ( e ) => {
        const name = e.target.name
        this.setState( {
            [name]: e.target.validity.valid ? e.target.value : this.state[name]
        } )
    }
    handleChildEdit = ( e ) => {
        this.setState( {
            isDisabledChild: false,
        } )
    }
    handleMaintanceEdit = ( e ) => {
        this.setState( {
            isDisabledMaintainance: false,
        } )
    }
    handleRoute = route => {
        console.log( "props===>", this.props );
        this.props.changeProfRout( 6 );
        // this.props.state.history.push( route );
    };
    handleSubmit = () => {
        let { childMining, spousalMaintenance, schoolFee, clubSubcriptions } = this.state
        let data = {
            childMining: parseInt( childMining ),
            spousalMaintenance: parseInt( spousalMaintenance ),
            schoolFee: parseInt( schoolFee ),
            clubSubcriptions: parseInt( clubSubcriptions ),
        }
        this.props.setMonthlyDetails( {
            userId: this.props.userId,
            monthlyOutgoings: {
                ...data
            }
        } )
        console.log( "loading=============>", this.props.loading )
        if ( !this.props.loading ) {
            this.props.changeProfRout( 6 );
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
                console.log( "response=====>", res );
                res.json().then( res => {
                    console.log( "res===>", res )
                    if ( res.monthlyOutgoings ) {
                        const { childMining,
                            spousalMaintenance,
                            schoolFee,
                            clubSubcriptions } = res.monthlyOutgoings
                        this.setState( {
                            childMining,
                            spousalMaintenance,
                            schoolFee,
                            clubSubcriptions,

                        } )
                    }

                } );
            } )
            .catch( err => {
                console.log( err );
                alert( err.msg );
            } );
    }
    render() {
        console.log( "state====>", this.props.userId );
        const { childMining,
            spousalMaintenance,
            schoolFee,
            clubSubcriptions,
            isDisabledMaintainance,
            isDisabledChild,
        } = this.state
        return (
            <div className="monthly-outgoings">
                <Row className="d-row-s1">
                    <Col lg={24}>
                        <h1 className="heading1">
                            Details of your finicial wellbeing
                        </h1>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Do you have monthly childMinding costs?
                        </h6>
                    </Col>
                    <Col className="inputWithEdit" lg={24}>
                        <div
                            className={
                                !isDisabledChild ? this.state.childMining !== "" ? "input maltaback" : "input" : "input"
                            }

                        >
                            <span className="pre">€</span>
                            <input type="text"
                                name="childMining"
                                placeholder="#######"
                                value={childMining}
                                pattern="[0-9]*"
                                disabled={isDisabledChild}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="edit_C" onClick={this.handleChildEdit}>
                            <Icon type="form" /> <span>edit</span>
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Do you have monthly spousal/maintenance costs?
                        </h6>
                    </Col>
                    <Col className="inputWithEdit" lg={24}>
                        <div className={
                            !isDisabledMaintainance ? this.state.spousalMaintenance !== "" ? "input maltaback" : "input" : "input"
                        }>
                            <span className="pre">€</span>
                            <input type="text"
                                name="spousalMaintenance"
                                placeholder="#######"
                                pattern="[0-9]*"
                                value={spousalMaintenance}
                                disabled={isDisabledMaintainance}
                                onChange={this.handleInputChange}

                            />
                        </div>
                        <div className="edit_C"
                            onClick={this.handleMaintanceEdit}>
                            <Icon type="form" /> <span>edit</span>
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Do you have private school fees? (annual)
                     </h6>
                    </Col>
                    <Col className="inputWithEdit" lg={24}>
                        <div className={
                            this.state.schoolFee !== "" && this.state.schoolFee !== null ? "input maltaback" : "input"
                        }>
                            <span className="pre">€</span>
                            <input type="text"
                                name="schoolFee"
                                value={schoolFee}
                                placeholder="#######"
                                pattern="[0-9]*"
                                onChange={this.handleInputChange}
                            />
                        </div>

                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Do you have social/sporting club subscriptions? (annual)
                        </h6>
                    </Col>
                    <Col className="inputWithEdit" lg={24}>
                        <div className={
                            this.state.clubSubcriptions !== "" && this.state.clubSubcriptions !== null ? "input maltaback" : "input"
                        }>
                            <span className="pre">€</span>
                            <input
                                type="text"
                                name="clubSubcriptions"
                                pattern="[0-9]*"
                                value={clubSubcriptions}
                                placeholder="#######"
                                onChange={this.handleInputChange}
                            />
                        </div>

                    </Col>
                    <Col lg={10} offset={0}>
                        <div className="btn-div">
                            <Button
                                style={{ height: "40px" }}
                                onClick={() => window.history.back()}
                                className="btn1"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => this.handleSubmit()}
                                loading={this.props.loading}
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
        newProps: state.detailsReducer.monthlyOutgoings,
        loading: state.detailsReducer.loading,
        error: state.detailsReducer.error,
    }
}


const mapDispatchToProps = dispacth => ( {
    setMonthlyDetails: ( props, callback ) =>
        dispacth( Api.detailsDataPost( props, callback ) )
} );
export default connect( mapStateToProps, mapDispatchToProps )( MonthlyOutgoing );
