import React, { Component } from 'react'
import { Button, Input, PageHeader, Select,  Spin, Rate, Row, Col, Statistic } from 'antd'
import "antd/dist/antd.css";
// import Card from '../components/Card'
import { Redirect } from 'react-router-dom'
import hkuCourses2019 from '../hkuCourses2019'
import Tabletop from 'tabletop'
import CourseCard from '../components/CourseCard'
import Modal from '../components/Modal'

const { Search } = Input;
const { Option } = Select
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1BU_2zwmcmP7YZEjolxXWc9ZvCwa7Nc5TS5jeSdQNEn4/edit?usp=sharing';
const sortedKeys = Object.keys(hkuCourses2019).sort();

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            course: '',
            selectedDepartment: '',
            flagFromCard: false,
            difficulty: 0,
            prof: 0,
            grade: 0,
            rating: 0,
            recom: -1,
            loading: false,
            courseArr: [],
            showAll: false,
            courseFromCard: this.props.location.course,
            departmentFromCard: '',
            redirectToShowAll: false,
            numberOfReviewes: 0,
            data: []


        }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.changeCourse = this.changeCourse.bind(this)
        this.changeSelectedDepartment = this.changeSelectedDepartment.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.init = this.init.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.refreshPage = this.refreshPage.bind(this)

    }
    changeGrade = value => {
        // console.log("grade is=" + value)
        this.setState({
            grade: value
        })
    }
    changeProf = value => {
        // console.log("prof  is=" + value)
        this.setState({
            prof: value
        })
    }
    changeDifficulty = value => {
        // console.log("difficulty is=" + value)
        this.setState({
            difficulty: value
        })
    }


    refreshPage() {
        //to be called when user clicks on the title of Choose Wisely

        // console.log("Refeshing")
        this.changeSelectedDepartment('')

        this.changeCourse("");
        this.changeRating(0);
        this.changeLoading(false);
        this.changeDifficulty(0);
        this.changeProf(0);
        this.changeGrade("")
        this.changeSelectedDepartment("")

    }
    componentDidMount() {

        //THIS IS CALLED WHEN THE USER COMES FROM THE SHOW ALL PAGE
        // console.log("mounted")
        // console.log("course fromCard =" + this.state.courseFromCard)



        // this.state.departmentFromCard=this.state.courseFromCard.substring(0,5)
        // console.log("course clicked is =" + this.state.departmentFromCard)
        if (this.state.courseFromCard) {
            this.state.flagFromCard = true
            this.changeCourse(this.state.courseFromCard)
            // this.state.changeSelectedDepartment(this.state.departmentFromCard)
            this.handleSearch()
        }
    }

    setRedirect() {
        this.setState({
            redirect: true
        })
    }

    setRedirectToShowAll() {
        this.setState({
            redirectToShowAll: true
        })
    }


    renderRedirect() {

        if (this.state.redirect == true) {
            return <Redirect to='/reviewPage'></Redirect>
        }
    }

    renderRedirectToShowAll() {

        if (this.state.redirectToShowAll == true) {
            return <Redirect to={{
                pathname: '/showAllPage',
                department: this.state.selectedDepartment
            }}></Redirect>
        }
    }

    changeRating = value => {
        this.setState({
            rating: value
        })
    }
    changeCourse = value => {
        // console.log("value of course is=" + value)
        this.setState({
            course: value
        })
    }
    changeSelectedDepartment = value => {
        // console.log("value of department  is=" + value)
        this.setState(
            {
                selectedDepartment: value
            }
        )
    }
    changeLoading = event => {
        // console.log("value ofloading  is=" + event)

        this.setState({
            loading: event
        })
    }

    handleSearch() {
        this.changeLoading(true);
        // console.log("Searching" + this.state.course)
        // console.log("departmewnt is=" + this.state.selectedDepartment)
        if (this.state.course || this.state.selectedDepartment || this.state.flagFromCard) {
            this.init()

        } else {
            this.changeLoading(false)
            alert("Please fill the course or the department you need to search for")
        }

    }

    init() {
        // console.log("inside init")
        Tabletop.init({
            key: publicSpreadsheetUrl,
            callback: this.showInfo,
            simpleSheet: true,
            postProcess: this.process
        })
    }
    showInfo(data, tabletop) {
        if (this.state.course) {
            //TO BE CALLED WHEN USER HAS SELECTED A PARTICULAR COURSE
            var tempDiff = 0
            var tempProf = 0
            var tempGrade = 0
            var tempRating = 0
            var tempRecom = 0
            var counter = 0
            var subtractGrade = 0
            var counterDiff = 0
            var counterProf = 0
            var counterRecom = 0
            var counterRating = 0
            // console.log("successful")

            // alert('Successfully processed!')
            // console.log(data);
            // console.log(this.state.items)
            // this.setState({items:data})
            // console.log(this.state.items)
            this.state.data = data
            data.forEach(element => {

                if (element.Course === this.state.course) {
                    // console.log(element.Timestamp)
                    counter = counter + 1

                    if (element.Grade == 'A+')
                        element.Grade = 12
                    else if (element.Grade == 'A')
                        element.Grade = 11
                    else if (element.Grade == 'A-')
                        element.Grade = 10
                    else if (element.Grade == 'B+')
                        element.Grade = 9
                    else if (element.Grade == 'B')
                        element.Grade = 8
                    else if (element.Grade == 'B')
                        element.Grade = 7
                    else if (element.Grade == 'C+')
                        element.Grade = 6
                    else if (element.Grade == 'C')
                        element.Grade = 5
                    else if (element.Grade == 'C-')
                        element.Grade = 4
                    else if (element.Grade == 'D+')
                        element.Grade = 3

                    else if (element.Grade == 'D')
                        element.Grade = 2
                    else if (element.Grade == 'D-')
                        element.Grade = 1
                    else {
                        element.Grade = 0
                        subtractGrade = subtractGrade + 1
                    }

                    tempGrade = tempGrade + parseInt(element.Grade)
                    if (element.CourseDifficulty) {
                        tempDiff = tempDiff + parseInt(element.CourseDifficulty)
                        counterDiff = counterDiff + 1
                    }
                    if (element.ProfAndTeachingStyle) {
                        tempProf = tempProf + parseInt(element.ProfAndTeachingStyle)
                        counterProf = counterProf + 1
                    }

                    if (element.Rating) {
                        tempRating = tempRating + parseInt(element.Rating)
                        counterRating = counterRating + 1
                    }
                    if (element.Recom) {
                        tempRecom = tempRecom + parseInt(element.Recom)
                        counterRecom = counterRecom + 1
                    }


                }


            });
            this.changeLoading(false)

            // console.log("tempGrade=" + (tempGrade / (counter - subtractGrade)).toFixed(2))
            // console.log("tempProf=" + (tempProf / counterProf).toFixed(2))
            // console.log("tempdifficulty=" + (tempDiff / counterDiff).toFixed(2))
            // console.log("tempRating=" + tempRating / counterRating)
            // console.log("tempRecom=" + tempRecom / counterRecom)
            // console.log("counter without subtract enmpty=" + counter+subtractEmpty)
            // console.log("counter " + counter)

            if (tempRecom >= Math.round(counterRecom / 2)) {
                tempRecom = 1
            }
            else
                tempRecom = 0


            tempGrade = Math.round(tempGrade / (counter - subtractGrade))
            if (tempGrade == 12)
                tempGrade = 'A+'
            else if (tempGrade == 11)
                tempGrade = 'A'
            else if (tempGrade == 10)
                tempGrade = 'A-'
            else if (tempGrade == 9)
                tempGrade = 'B'
            else if (tempGrade == 8)
                tempGrade = 'B+'
            else if (tempGrade == 7)
                tempGrade = 'B'
            else if (tempGrade == 6)
                tempGrade = 'C+'

            else if (tempGrade == 5)
                tempGrade = 'C'
            else if (tempGrade == 4)
                tempGrade = 'C-'
            else if (tempGrade == 3)
                tempGrade = 'D'
            else if (tempGrade == 2)
                tempGrade = 'D+'
            else if (tempGrade == 1)
                tempGrade = 'D-'
            else
                tempGrade = 'F'

            // console.log("tempgrade=" + tempGrade)
            // console.log("tempRecom is =" + tempRecom)
            this.setState({

                difficulty: (tempDiff / counterDiff).toFixed(2),
                prof: (tempProf / counterProf).toFixed(2),
                grade: tempGrade,
                rating: (tempRating / counterRating).toFixed(2),
                recom: tempRecom,
                numberOfReviewes: counter,
                selectedDepartment: ''


            })
        } else {
            this.changeLoading(false)

            this.setRedirectToShowAll()
            //To LIST OUT ALL THE COURSES
            // console.log(this.state.selectedDepartment)
            // data.forEach(element => {
            //     if (element.Course.substring(0, 4) == this.state.selectedDepartment) {

            //         this.state.courseArr.push(element)

            //     }

            // })



            this.setState({
                showAll: true
            })

            // this.setState({
            //     courseArr: this.state.courseArr,
            //     showAll: true
            // })
            // // console.log("arr is"+this.state.courseArr)
            // this.state.courseArr.forEach(element => {
            //     console.log("element is =" + element)
            // })
        }

    }


    render() {

        if (this.state.showAll == false) {
            return (
                <div>
                    {this.renderRedirect()}
                    <div style={{ padding: "20px", display: "flex", flexDirection: "row" }}>


                        <div style={{ flexGrow: 6, }} onClick={this.refreshPage}>  
                        <PageHeader  title="Welcome to Choose Wisely" subTitle="Choose smart, Choose Wise" />
                        </div>

                        <Button type="primary" size="large" style={{ flexGrow: 2, maxWidth: 200 }} onClick={this.setRedirect}>
                            Submit Reviews
                    </Button>


                    </div>

                    <Select
                        size="large"
                        allowClear
                        showSearch
                        style={{ width: 250, margin: 5 }}
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
                    {
                        this.state.loading && (
                            <Spin
                                size="large"
                                style={{ display: "flex", justifyContent: "center", margin: 5 }}
                            />
                        )
                    }

                    {this.state.loading == false && (
                        <div >
                            <Row >
                                <Col span={12}>
                                    <CourseCard title={this.state.course} grade={(this.state.numberOfReviewes!=0)?this.state.grade:"Not Available"} extra={this.state.numberOfReviewes} />
                                </Col>
                                <Col span={12}>
                                    <Modal data={this.state.data} course={this.state.course} />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12} >
                                    <Statistic style={{ margin: "10px" }} title="Course Difficulty" value={(this.state.numberOfReviewes!=0)?this.state.difficulty:"NA"} precision={2} />

                                </Col>
                                <Col span={12}>
                                    <Rate disabled default value={Math.round(this.state.difficulty)}></Rate>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Statistic style={{ margin: "10px" }} title="Professor and Teaching Style" value={(this.state.numberOfReviewes!=0)?this.state.prof:"NA"} precision={2} />

                                </Col>
                                <Col span={12}>
                                    <Rate disabled default value={Math.round(this.state.prof)}></Rate>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Statistic style={{ margin: "10px" }} title="Average Rating" value={(this.state.numberOfReviewes!=0)?this.state.rating:"NA"} precision={2} />

                                </Col>
                                <Col span={12}>
                                    <Rate disabled default value={Math.round(this.state.rating)}></Rate>
                                </Col>

                            </Row>

                            {/* <p style={{ fontWeight: "bold", fontSize: "large", marginLeft: "10px" }}>Average Course difficulty:
                       
                            </p>
                            <p style={{ fontWeight: "bold", fontSize: "large", marginLeft: "10px" }}>Average Professor and Teaching Style Rating:
                       <Rate disabled default value={this.state.prof}></Rate>
                            </p>
                            <p style={{ fontWeight: "bold", fontSize: "large", marginLeft: "10px" }}>Average Rating:
                       <Rate disabled default value={this.state.rating}></Rate>
                            </p> */}

                            <p style={{ fontWeight: "bold", fontSize: "large", marginLeft: "10px" }}>Is this course recommended by majority? : {(this.state.numberOfReviewes!=0)?(this.state.recom == 1 ? 'Yes' : 'No'):"NA"}</p>
                        </div>
                    )}


                </div>
            )
        } else {
            return (
                <div>
                    {this.renderRedirectToShowAll()}
                </div>
            )

        }


    }
}

export default MainPage