import React, { Component } from 'react'
import { version, Button, Input, PageHeader, Timeline } from 'antd'
import "antd/dist/antd.css";
import Card from '../components/Card'
import {Redirect} from 'react-router-dom'

const { Search } = Input;

class MainPage extends Component {

    constructor(props){
        super(props)
        this.state={
            redirect:false
        }
        this.setRedirect=this.setRedirect.bind(this)
        this.renderRedirect=this.renderRedirect.bind(this)
    }

    setRedirect(){
        this.setState({
            redirect:true
        })
    }

    renderRedirect(){
        if(this.state.redirect==true){
            return <Redirect to='/account'></Redirect>
        }
    }


    render() {
        return (
            <div>
                 {this.renderRedirect()}
                <div style={{padding:"20px", display: "flex", flexDirection: "row" }}>

                    <PageHeader style={{flexGrow:"6"}}onBack={() => null} title="Welcome to Choosing your Courses wisely" subTitle="Choose smart, Choose Wise" />,
                <Button type="primary" size="large" style={{flexGrow:"2"}} onClick={this.setRedirect}>
                       Your Account
                </Button>
                </div>

                <Search
                    placeholder="Enter course code or course name"
                    onSearch={value => console.log(value)}
                    style={{ width: 1000, height: 50, paddingLeft: "100px" }}

                />
                <br />
                <br />
                <Timeline style={{ padding: "20px" }}>
                    <Timeline.Item style={{ fontSize: "18px" }}>Search for your course </Timeline.Item>
                    <Timeline.Item style={{ fontSize: "18px" }}>Find the Average grade and the comments by other students </Timeline.Item>
                    <Timeline.Item style={{ fontSize: "18px" }}>Add your grade and your comments so that other students can benefit as well </Timeline.Item>

                </Timeline>
                <br />
                <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
                    <Card title="COMP2121" desc="Intorduction to Data Structure and Algorithms- Click kisi bhi course par karo aaoge toh tum issi course par" />
                    <Card title="COMP2123" desc="Programming Tech and Tools" />
                    <Card title="COMP3322" desc="Modern technologies and World Wide web" />
                    <Card title="COMP2119" desc="Discrete Mathematics- Haan Isne  bhi tumhe ..." />
                    <Card title="COMP2123" desc="Computer Organization- I know this is boring but feedback toh interesting kar sakte hain" />
                </div>
                <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
                    <Card title="CCST9017" desc="Hidden Orden in Daily life- A mathematical perspective- Even I do not know why we have common cores" />
                    <Card title="CCGL9031" desc="Entrepreneurship: Tum apni company bhi bana lo tumhe number nhi milenge" />
                    <Card title="ACCT1101" desc="Introduction to Computer Science- The course that makes you feel like you are in the best college" />
                    <Card title="PHYS1050" desc="Physics for Engineering Students- My favourite" />
                    <Card title="COMP2123" desc="Programming Tech and Tools" />
                </div>






                {/* <Button type="primary">Click me</Button> */}

            </div>
        )
    }
}

export default MainPage