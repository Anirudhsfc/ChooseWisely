import React, { Component } from 'react'
import { version, Button, Input, PageHeader, Timeline, Select, Icon, Spin, Rate } from 'antd'
import "antd/dist/antd.css";
import Card from '../components/Card'
import { Redirect } from 'react-router-dom'
import hkuCourses2019 from '../hkuCourses2019'
import Tabletop from 'tabletop'
import CourseCard from '../components/CourseCard'

const { Search } = Input;
const { Option } = Select
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1BU_2zwmcmP7YZEjolxXWc9ZvCwa7Nc5TS5jeSdQNEn4/edit?usp=sharing';
const sortedKeys = Object.keys(hkuCourses2019).sort();

class ShowAllPage extends Component {


    constructor(props) {
        super(props)

        this.state = {
            courseArr: [],
            department: this.props.location.department,
            redirect: false,
            selectedDepartment: '',
            course: ''

        }


        this.changeCourse = this.changeCourse.bind(this)
        this.changeSelectedDepartment = this.changeSelectedDepartment.bind(this)
    }

    // componentDidMount(){
    //     console.log("department is ="+this.state.department)
    // }

    changeCourse = value => {
        console.log("value of course is=" + value)
        this.setState({
            course: value
        })
    }
    changeSelectedDepartment = value => {
        console.log("value of department  is=" + value)
        this.setState(
            {
                selectedDepartment: value
            }
        )
    }

    setRedirect() {
        this.setState({
            redirect: true
        })
    }
    renderRedirect() {

        if (this.state.redirect == true) {
            return <Redirect to='/reviewPage'></Redirect>
        }
    }
    componentDidMount() {
        console.log("inside component did mount")
        console.log(this.state.department)

        hkuCourses2019[this.state.department].map(({ code, title }) => (

            this.state.courseArr.push(code + " " + title)

        ))


        this.setState({
            courseArr: this.state.courseArr,

        })
    }
    render() {
        return (
            <div>

                {this.renderRedirect()}
                <div style={{ padding: "20px", display: "flex", flexDirection: "row" }}>

                    <div style={{ flexGrow: 6, }} onClick={this.refreshPage}>
                        <PageHeader title="Welcome to Choose Wisely" subTitle="Choose smart, Choose Wise" />
                    </div>

                    <Button type="primary" size="large" style={{ flexGrow: 2, maxWidth: 200 }} onClick={this.setRedirect}>
                        Submit Reviews
                    </Button>
                </div>
                <Select
                    size="large"
                    allowClear
                    showSearch
                    style={{ width: 200, margin: 5 }}
                    placeholder="Select a department"
                    optionFilterProp="children"
                    onChange={value => this.changeSelectedDepartment(value)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    }
                >


                    {sortedKeys.map(department => (
                        <Option style={{ height: "40px", fontSize: "20px" }} value={department}>{department}</Option>
                    ))}
                </Select>
                {this.state.selectedDepartment && (
                    <Select
                        size="large"
                        showSearch
                        style={{ width: 500, margin: 5 }}
                        placeholder="Select a course"
                        optionFilterProp="children"
                        onChange={value => this.changeCourse(value)}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {hkuCourses2019[this.state.selectedDepartment].map(({ code, title }) => (
                            <Option style={{ height: "40px", fontSize: "20px" }} value={`${code} ${title}`}>{`${code} ${title}`}</Option>
                        ))}
                    </Select>


                )}
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                    Search
             </Button>
                <br />
                <div>
                    {this.state.courseArr.map(element =>
                        <div>
                            {
                                (element) ? <Card title={element}></Card> : <div></div>


                            }
                        </div>
                    )}

                </div>


            </div>
        )
    }


}

export default ShowAllPage