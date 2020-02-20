import React, { Component } from 'react'
import './BankDetails.css'
import { Icon, Col, Row, Select, DatePicker } from 'antd'
import moment from 'moment';
const { Option } = Select

function BankCollapse( props ) {
    const {
        isActive,
        handleClick,
        accType,
        index,
        comments,
        accPurpose,
        lenderName,
        accNumber,
        creditUnionLoc,
        creditUnionName,
        outstandingBal,
        monthlyRepayments,
        arrears,
        finalPayDate,
        clearing,
        purposeArray,
        lenderArray,
        handlePurposeChange,
        handleLenderChange,
        handleInputChange,
        onDateChange,
        handleRadioButton,

    } = props;
    console.log( "inside coolasp=====>", index );
    const dateFormat = 'YYYY-MM-DD';
    const idGeneratorOne = () => {
        return "clearingMortage" + index
    }
    const idGeneratorTwo = () => {
        return "clearingMortage1" + index
    }
    const renderCommentsBox = () => {
        if ( accPurpose === "Other" ) {
            return <>
                <Col lg={24}>
                    <h6 className="h61">
                        If other please describe
                    </h6>
                </Col>

                <Col lg={24}>
                    <div className={props.comments ? "textarea-input maltaback" : "textarea-input"}>
                        <textarea
                            placeholder="comments"
                            value={comments}
                            onChange={( evt ) => props.handleCommentsChange( evt, index )}
                        />
                    </div>
                </Col>
            </>
        }
    }
    const lendrConditional = () => {
        if ( lenderName === "Credit Union" ) {
            return <React.Fragment><Col lg={24}>
                <h6 className="h61">Please provide location/name</h6>
            </Col>
                <Col className="colomn_8" lg={16}>
                    <div className={
                        creditUnionLoc !== "" ? "input maltaback" : "input"
                    }>
                        <input type="text"
                            name="creditUnionLoc"
                            placeholder="creditUnionLoc"
                            value={creditUnionLoc}
                            onChange={( event ) => handleInputChange( event, index )}
                        />
                    </div>
                </Col></React.Fragment>
        } else if ( lenderName === "Other" ) {
            return <React.Fragment><Col lg={24}>
                <h6 className="h61">Please provide institution's name</h6>
            </Col>
                <Col className="colomn_8" lg={16}>
                    <div className={
                        creditUnionName !== "" ? "input maltaback" : "input"
                    }>
                        <input
                            type="text"
                            name="creditUnionName"
                            placeholder="name"
                            value={creditUnionName}
                            onChange={( event ) => handleInputChange( event, index )}
                        />
                    </div>
                </Col></React.Fragment>
        }
    }

    const renderAcoundName = () => {
        console.log( "acount type", accType )
        if ( accType === "loan" ) {
            return ( <span className="account-text">Loan Account{index}
            </span>
            )
        } else if ( accType === "overdraft" ) {
            return ( <span className="account-text">Overdraft Account{index}
            </span>
            )
        } else if ( accType === "credit" ) {
            return (
                <span className="account-text">Credit Card Account{index}
                </span>

            )
        }
    }
    const balanceRender = () => {
        if ( accType === "loan" ) {
            return (
                <Col lg={24}>
                    <h6 className="h61">
                        What is the outstanding balance?
                        </h6>
                </Col>
            )
        } else if ( accType === "overdraft" ) {
            return (
                <Col lg={24}>
                    <h6 className="h61">
                        What is the maximum outstanding balance over the last 6 months?
                        </h6>
                </Col>
            )
        } else if ( accType === "credit" ) {
            return (
                <Col lg={24}>
                    <h6 className="h61">
                        What is the credit card limit?
                        </h6>
                </Col>
            )
        }
    }

    return (
        <React.Fragment><div className={isActive ? "collapse" : "collapse-inactive"}>
            {renderAcoundName()}
            {isActive ? <Icon
                type="down"
                className="right-arrow"
                onClick={() => handleClick()}
            /> : <Icon
                    type="right"
                    className="right-arrow"
                    onClick={() => handleClick()}
                />}
        </div>
            <div className={isActive ? "bank-frame" : "bank-frame-inactive"}>
                <Row className="d-row-s1">
                    <Col lg={24}>
                        <h6 className="h61">What is the purpose of the account?</h6>
                    </Col>
                    <Col lg={10} >
                        <div >
                            <Select
                                className={accPurpose !== "" ? "select-option1 maltaback" : "select-option1"}
                                defaultValue={accPurpose === "" ? "Select from options" : accPurpose}
                                onChange={( e ) => handlePurposeChange( e, index )}
                            >

                                {purposeArray.map( ( value, index ) => {
                                    return <Option key={index} value={value}>{value}</Option>
                                } )}

                            </Select>
                        </div>
                    </Col>
                    {renderCommentsBox()}
                    <Col lg={24}>
                        <h6 className="h61">What is the name of the lender?</h6>
                    </Col>
                    <Col lg={10} >
                        <div >
                            <Select
                                className={lenderName !== "" ? "select-option1 maltaback" : "select-option1"}
                                defaultValue={lenderName === "" ? "Select from options" : lenderName}
                                onChange={( e ) => handleLenderChange( e, index )}

                            >
                                {lenderArray.map( ( value, index ) => {
                                    return <Option key={index} value={value}>{value}</Option>
                                } )}

                            </Select>
                        </div>
                    </Col>
                    {lendrConditional()}
                    <Col lg={24}>
                        <h6 className="h61">Whats is the account number?</h6>
                    </Col>
                    <Col lg={16}>
                        <div className={
                            accNumber !== "" ? "input maltaback" : "input"
                        }>
                            <input
                                type="text"
                                placeholder="########"
                                name="accNumber"
                                pattern="[0-9]*"
                                value={accNumber}
                                onChange={( event ) => handleInputChange( event, index )}
                            />
                        </div>
                    </Col>
                    {balanceRender()}
                    <Col lg={16}>
                        <div className={
                            outstandingBal !== "" ? "input input2 maltaback" : "input input2"
                        }>
                            <span className="pre">€</span>
                            <input
                                type="text"
                                placeholder="########"
                                pattern="[0-9]*"
                                name="outstandingBal"
                                value={outstandingBal}
                                onChange={( event ) => handleInputChange( event, index )}
                            />
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Whats are the monthly repayments/charges?
                        </h6>
                    </Col>
                    <Col lg={16}>
                        <div className={
                            monthlyRepayments !== "" ? "input input2 maltaback" : "input input2"
                        }>
                            <span className="pre">€</span>
                            <input
                                type="text"
                                placeholder="########"
                                name="monthlyRepayments"
                                value={monthlyRepayments}
                                pattern="[0-9]*"
                                onChange={( event ) => handleInputChange( event, index )}
                            />
                        </div>
                    </Col>
                    <Col lg={24}>
                        <h6 className="h61">
                            Any arrears? How much?
                        </h6>
                    </Col>
                    <Col lg={16}>
                        <div className={
                            arrears !== "" ? "input input2 maltaback" : "input input2"
                        }>
                            <span className="pre">€</span>
                            <input type="text"
                                placeholder="########"
                                value={arrears}
                                name="arrears"
                                pattern="[0-9]*"
                                onChange={( event ) => handleInputChange( event, props.index )}

                            />
                        </div>
                    </Col>
                    {accType === "loan" && <Col lg={24}>
                        <h6 className="h61">
                            Date of final payment?
                        </h6>
                    </Col>}
                    {accType === "loan" && <Col lg={20}>
                        <div className="input datepic"
                            className={
                                finalPayDate !== "" ? "input datepic maltaback" : "input datepic"
                            }
                        >

                            <DatePicker defaultValue={finalPayDate !== "" && finalPayDate !== null ? moment( finalPayDate, dateFormat ) : moment( '2015-06-06', dateFormat )} onChange={( date, dateString ) => onDateChange( date, dateString, index )} />
                        </div>
                    </Col>}
                    <Col lg={24}>
                        <h6 className="h61">Are you clearing this as part of your mortgage?</h6>
                    </Col>

                    <Col lg={24} className="q1 q3 my_costuma colomn_8">
                        <div
                            onClick={( e ) => handleRadioButton( 'yes', index )}
                            className={
                                clearing === "yes"
                                    ? "radio-container container_malta"
                                    : "radio-container"
                            }
                        >
                            <input

                                type="radio"
                                name={idGeneratorOne()}
                                id={idGeneratorOne()}
                                className=""
                                checked={clearing === "yes" ? true : false}
                                value="yes"
                            />
                            <label for={idGeneratorOne()}>Yes</label>
                        </div>
                        <div
                            className={
                                clearing === "no"
                                    ? "radio-container container_malta"
                                    : "radio-container"
                            }
                        >
                            <input
                                onClick={() => handleRadioButton( 'no', index )}
                                type="radio"
                                name={idGeneratorTwo()}
                                id={idGeneratorTwo()}
                                checked={clearing === "no" ? true : false}
                                className=""
                                value="no"
                            />
                            <label for={idGeneratorTwo()}>No</label>
                        </div>
                    </Col>

                </Row>
            </div>
        </React.Fragment>
    )
}

export default BankCollapse