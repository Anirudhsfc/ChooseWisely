import React, { Component } from 'react';
import {Card} from 'antd'
import AddComment from './Comment'
class CourseCard extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (

            <div style={{padding:"20px"}}>
                <Card title={this.props.title} extra={`Reviewed By: `+this.props.extra+` people`} style={{ width: "auto", height: 200,maxWidth: 600 }}>
                    {/* <p style={{fontSize:"large"}}>COMP2121</p> */}
                    <p style={{ fontSize: "medium" }}>{this.props.desc}</p>
                    <p style={{ fontWeight: "bold", fontSize: "large" }}>Average Grade: {this.props.grade}</p>
                </Card>
                <br/>
                <br/>


            {/* <AddComment/> */}


            </div>
        )
    }
}

export default CourseCard