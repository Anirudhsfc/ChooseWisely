import React, { Component } from 'react'
import { PageHeader, Input, Card } from 'antd'
import { Statistic, Row, Col, Button,Dropdown,Icon,Menu ,message} from 'antd';
import CourseCard from '../components/CourseCard'
import YourOpinionCard from '../components/YourOpinionCard'
//NOT USED
const { Search } = Input
const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        A+
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        A
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        A-
      </Menu.Item>
      <Menu.Item key="4">
        <Icon type="user" />
        B+
      </Menu.Item>
      <Menu.Item key="5">
        <Icon type="user" />
        B
      </Menu.Item>
      <Menu.Item key="6">
        <Icon type="user" />
        B-
      </Menu.Item>
      <Menu.Item key="7">
        <Icon type="user" />
        C+
      </Menu.Item>
      <Menu.Item key="8">
        <Icon type="user" />
        C
      </Menu.Item>
      <Menu.Item key="9">
        <Icon type="user" />
        C-
      </Menu.Item>
      <Menu.Item key="10">
        <Icon type="user" />
        D+
      </Menu.Item>
      <Menu.Item key="11">
        <Icon type="user" />
        D
      </Menu.Item>
      <Menu.Item key="12">
        <Icon type="user" />
        D-
      </Menu.Item>


    </Menu>
  );
  function handleMenuClick(e) {
    message.info('Your grade is'+e.key);
    console.log('click', e);
  }
//   function handleButtonClick(e) {
//     message.info('Click on left button.');
//     console.log('click left button', e);
//   }
  
class Page1 extends Component {


    constructor(props){
        super(props)

        // this.handleMenuClick=this.handleMenuClick.bind(this)
        // this.handleButtonClick=this.handleButtonClick.bind(this)
    }
   

     
    render() {
        return (

            <div>

                <PageHeader onBack={() => null} title="Welcome to Choosing your Courses wisely" subTitle="Choose smart, Choose Wise" />,
                <Search
                    placeholder="Enter course code or course name"
                    onSearch={value => console.log(value)}
                    style={{ width: 1000, height: 50, paddingLeft: "100px" }}

                />
                <br />
                <br />


                <div style={{ display: "flex", flexDirection: "row" }}>


                    <CourseCard title="COMP2121" desc="Introduction to data structure and Algorithms" grade="A-" />


                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: "large" }}>Choose your grade</p>
                        <Dropdown overlay={menu}>
                            <Button>
                                What was your grade? <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </div>
                </div>

            </div>
        )
    }
}

export default Page1