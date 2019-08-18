import React from "react";
import axios from "axios";
import { Table, Spin, Select, TreeSelect, PageHeader, Rate, Button, Menu, Dropdown, Icon, Divider, Radio, Popover, Alert, Row, Col } from "antd";
import hkuCourses2019 from "../hkuCourses2019";
import {Redirect } from 'react-router-dom'
import Rater from '../components/Rater'
import { Review } from "./Review";
import '../styles.css'
import Media from 'react-media'
import MediaQuery from 'react-responsive'
import Comment from '../components/Comment'

const { Option } = Select;
const { TreeNode } = TreeSelect;

const GOOGLE_FORM_COURSE_ID = "entry.513433922";
const GOOGLE_FORM_DIFFICULTY_ID = "entry.735150427";
const GOOGLE_FORM_PROF_AND_TEACHING_STYLE_ID = "entry.673465336";
const GOOGLE_FORM_GRADE_ID = "entry.1616532046";
const GOOGLE_FORM_RATING_ID = "entry.1058459762";
const GOOGLE_FORM_RECOM_ID = "entry.647093475"; //Recommendation yes or no ID

const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfgI9Xlc_kBUGEB5ryLFb-L0b0XDvVS6QhTVCiEINZgGaKLkA/formResponse";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const sortedKeys = Object.keys(hkuCourses2019).sort();
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const descDifficulty = ['very easy', 'easy', 'normal', 'hard', 'challenging'];

const content = (
    <div>
        <p>Review cannot be changed after submission</p>

    </div>
);

class ReviewPage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            reviewed: [],
            selectedDepartment: "",
            course: "",
            rating: 3,
            error: "",
            loading: false,
            grade: '',
            prof: 3,
            difficulty: 3,
            recom: 1,
            msgRecom: 'Yes',
            showOrNot: false,
            redirect:false
           
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeCourse = this.changeCourse.bind(this)
        this.changeError = this.changeError.bind(this)
        this.changeLoading = this.changeLoading.bind(this)
        this.changeRating = this.changeRating.bind(this)
        this.changeReviewed = this.changeReviewed.bind(this)
        this.changeSelectedDepartment = this.changeSelectedDepartment.bind(this)
        this.changeGrade = this.changeGrade.bind(this)
        this.changeProf = this.changeProf.bind(this)
        this.changeDifficulty = this.changeDifficulty.bind(this)
        this.changeRecommendation = this.changeRecommendation.bind(this)
        this.onClickInfo = this.onClickInfo.bind(this)
        this.goBack=this.goBack.bind(this)
        this.setRedirect=this.setRedirect.bind(this)
        this.renderRedirect=this.renderRedirect.bind(this)
    }
    setRedirect() {
        this.setState({
            redirect: true
        })
    }
    renderRedirect() {

        if (this.state.redirect == true) {
            return <Redirect to='/mainPage'></Redirect>
        }
    }

    goBack(){
        console.log("back button clicked")
        this.props.history.goBack()
    }
    onClickInfo() {
        alert("You cannot change your review after submission")
    }

    changeCourse = value => {

        console.log("value of course is=" + value)
        this.setState({
            course: value
        })
    }
    changeError = event => {
        console.log("value of error is=" + event)
        this.setState({
            error: event
        })
    }
    changeLoading = event => {
        console.log("value ofloading  is=" + event)

        this.setState({
            loading: event
        })
    }
    changeRating = value => {
        console.log("value of rating  is=" + value)

        this.setState({
            rating: value
        })
    }
    changeReviewed = value => {
        console.log("value of reveiwed is=" + value)

        this.setState({ reviewed: value })
    }
    changeSelectedDepartment = value => {
        console.log("value of department  is=" + value)
        this.setState(
            {
                selectedDepartment: value
            }
        )
    }
    changeGrade = value => {
        console.log("grade is=" + value)
        this.setState({
            grade: value
        })
    }
    changeProf = value => {
        console.log("prof  is=" + value)
        this.setState({
            prof: value
        })
    }
    changeDifficulty = value => {
        console.log("difficulty is=" + value)
        this.setState({
            difficulty: value
        })
    }
    changeRecommendation = e => {
        console.log("recommendation is=" + e.target.value)
        this.setState({
            recom: e.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault()

        this.changeLoading(true);
        const course = this.state.course
        const rating = this.state.rating
        const error = this.state.error
        const loading = this.state.loading
        const reviewed = this.state.reviewed
        const difficulty = this.state.difficulty
        const prof = this.state.prof
        const grade = this.state.grade
        const recom = this.state.recom
        var msgRecom = this.state.msgRecom
        console.log("RECOM IS=" + recom)
        if (recom == 0)
            msgRecom = 'No'
        else
            msgRecom = 'Yes' //Assuming that if the user does not select an option he or she is recommending it
        // console.log("rating is" + rating)
        // console.log("course is" + course)
        // console.log("error is" + error)
        // console.log("loading is" + loading)
        // console.log("reviewed is" + reviewed)
        // console.log("rating is" + rating)
        // console.log("recom is" + recom)
        // // event.preventDefault();
        if(course){
        this.changeError("");
        const formData = new FormData();
        formData.append(GOOGLE_FORM_COURSE_ID, course);
        formData.append(GOOGLE_FORM_DIFFICULTY_ID, difficulty);
        formData.append(GOOGLE_FORM_PROF_AND_TEACHING_STYLE_ID, prof);
        formData.append(GOOGLE_FORM_GRADE_ID, grade);
        formData.append(GOOGLE_FORM_RECOM_ID, recom);
        formData.append(GOOGLE_FORM_RATING_ID, rating);


        axios
            .post(CORS_PROXY + GOOGLE_FORM_ACTION_URL, formData)
            .then(() => {

                this.changeReviewed([...reviewed, { course, difficulty, prof, grade, msgRecom, rating }]);
                this.changeCourse("");
                this.changeRating(3);
                this.changeLoading(false);
                this.changeDifficulty(3);
                this.changeProf(3);
                this.changeGrade("")
                this.changeSelectedDepartment("")
            })
            .catch(() => {
                this.changeError(error);
                this.changeLoading(false);
            });
        }else{
            alert("Please select a course")
            this.changeLoading(false)
        }
    };

    render() {
        return (


            <div >
                     {/* <Button onClick={this.goBack}>Back</Button> */}
                {this.renderRedirect()}
                <MediaQuery query='(max-device-width: 767px)'>
                <div style={{fontSize:"30px"}}>
                    <Row>
                        <Col>
                       
                        <div style={{ padding: "20px", display: "flex", flexDirection: "row" }}>

                        <div style={{ flexGrow: 6, }} onClick={this.refreshPage}>
                            <PageHeader title="Welcome to Choose Wisely" subTitle="Choose smart, Choose Wise" />
                        </div>

                        <Button type="primary" size="large" style={{ flexGrow: 2, maxWidth: 200 }} onClick={this.setRedirect}>
                             Search Courses
                        </Button>
                        </div>                        
                    </Col>
                    </Row>
                    <Row>

                        <form
                            onSubmit={this.handleSubmit}
                            style={{
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center"
                                marginLeft: "20px"
                            }}
                        >


                            <Row>

                                <Col xs={{ span: 24 }} sm={24} md={24} lg={10} xl={10}>
                                    <Select
                                        size="large"
                                        showSearch
                                        style={{ width: 200, margin: 5}}
                                        placeholder="Select a department"
                                        optionFilterProp="children"
                                        onChange={value => this.changeSelectedDepartment(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >


                                        {sortedKeys.map(department => (
                                            <Option style={{height:"40px",fontSize:"20px"}}value={department}>{department}</Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col xs={{ span: 12 }} sm={12} md={12} lg={14} xl={14}>
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
                                                <Option style={{height:"40px",fontSize:"20px"}} value={`${code} ${title}`}>{`${code} ${title}`}</Option>
                                            ))}
                                        </Select>


                                    )}
                                </Col>



                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={{ span: 24 }} sm={24} md={24} lg={8} xl={8}>
                                    <Rate allowClear={false}  tooltips={descDifficulty} onChange={this.changeDifficulty} value={this.state.difficulty} style={styles.star} />
                                    Course Difficulty
                                </Col>

                                <Col xs={{ span: 24 }} sm={24} md={24} lg={10} xl={8}>
                                    <Rate allowClear={false} tooltips={desc} onChange={this.changeProf} value={this.state.prof} style={styles.star}  />
                                    Professor and Teaching style
    
    
                                </Col>
                                <Col xs={{ span: 12 }} sm={12} md={12} lg={6} xl={8}>

                                    <Select
                                        size="large"
                                        style={{marginTop:"20px"}}
                                        placeholder="Your Grade"
                                        optionFilterProp="children"
                                        onChange={value => this.changeGrade(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >


                                        <Option style={{height:"40px",fontSize:"20px"}}value="A+">A+</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="A">A</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="A-">A-</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="B+">B+</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="B">B</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="B-">B-</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="C+">C+</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="C">C</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="C-">C-</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="D+">D+</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="D">D</Option>
                                        <Option style={{height:"40px",fontSize:"20px"}}value="D-">D-</Option>


                                    </Select>
                                </Col>

                            </Row>
                            <Row style={{ marginTop: "30px", marginBottom: "20px" }}>
                                <Col xs={{ span: 24 }} sm={24} md={24} lg={12} xl={12}>
                                    <Radio.Group buttonStyle="solid"size="large" name="radiogroup" defaultValue={1} onChange={this.changeRecommendation} value={this.state.recom} style={{ marginBottom: "20px"}}>
                                        <Radio  style={{fontSize:"20px"}} value={1}>Yes</Radio>
                                        <Radio style={{fontSize:"20px"}} value={0}>No</Radio>

                                    </Radio.Group>
                                    Would you recommend this course?
                                </Col>
                                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Rate allowClear={false} tooltips={desc} onChange={this.changeRating} value={this.state.rating} style={styles.star} />
                                    Overall Rating
                                </Col>
                            </Row>
                            <Row>
                                <Popover content={content}  >
                                    <Button type="primary" htmlType="submit" className="login-form-button" size="large" style={{minWidth:"150px",minHeight:"30px"}}>SUBMIT</Button>
                                </Popover>
                            </Row>

                        </form>
                    </Row>

                    <h2 style={{ textAlign: "center", marginTop: "20px",fontSize:"30px" }}>Successfully Submitted Reviews</h2>
                    <Row>
                        <Col>
                            <Table
                                
                                style={{ marginTop: "20px", height: "100%",fontSize:"30px" }}
                                columns={[
                                    {
                                        title: "Course",
                                        dataIndex: "course",
                                        key: "course"
                                    },
                                    {
                                        title: "Difficulty",
                                        dataIndex: "difficulty",
                                        key: "difficulty"
                                    },
                                    {
                                        title: "Professor",
                                        dataIndex: "prof",
                                        key: "prof"
                                    },
                                    {
                                        title: "Grade",
                                        dataIndex: "grade",
                                        key: "grade"
                                    },

                                    {
                                        title: "Recommendation",
                                        dataIndex: "msgRecom",
                                        key: "msgRecom"
                                    },
                                    {
                                        title: "Rating",
                                        dataIndex: "rating",
                                        key: "rating"
                                    },

                                ]}
                                dataSource={this.state.reviewed}
                            />
                        </Col>
                    </Row>

                    {this.state.error && <div>Error: {this.state.error}</div>}
                    {
                        this.state.loading && (
                            <Spin
                                size="large"
                                style={{ display: "flex", justifyContent: "center", margin: 5 }}
                            />
                        )
                    }

                   
</div>
                    </MediaQuery>

                    <MediaQuery query='(min-device-width: 767px)'>
                    <div>
                    {this.renderRedirect()}
                    <Row>
                        <Col>
                        <div style={{ padding: "20px", display: "flex", flexDirection: "row" }}>

<div style={{ flexGrow: 6, }} onClick={this.refreshPage}>
    <PageHeader title="Welcome to Choose Wisely" subTitle="Choose smart, Choose Wise" />
</div>

<Button type="primary" size="large" style={{ flexGrow: 2, maxWidth: 200 }} onClick={this.setRedirect}>
     Search Courses
</Button>
</div>       
                    </Col>
                    </Row>
                    <Row>

                        <form
                            onSubmit={this.handleSubmit}
                            style={{
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center"
                                marginLeft: "20px"
                            }}
                        >


                            <Row>

                                <Col xs={{ span: 24 }} sm={24} md={24} lg={10} xl={10}>
                                    <Select
                                     
                                        showSearch
                                        style={{ width: 200, margin: 5}}
                                        placeholder="Select a department"
                                        optionFilterProp="children"
                                        onChange={value => this.changeSelectedDepartment(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >


                                        {sortedKeys.map(department => (
                                            <Option value={department}>{department}</Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col xs={{ span: 12 }} sm={12} md={12} lg={14} xl={14}>
                                    {this.state.selectedDepartment && (
                                        <Select
                                          
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
                                                <Option  value={`${code} ${title}`}>{`${code} ${title}`}</Option>
                                            ))}
                                        </Select>


                                    )}
                                </Col>



                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={{ span: 24 }} sm={24} md={24} lg={8} xl={8}>
                                    <Rate tooltips={descDifficulty} onChange={this.changeDifficulty} value={this.state.difficulty} style={{}} />
                                    Course Difficulty
                                </Col>

                                <Col xs={{ span: 24 }} sm={24} md={24} lg={10} xl={8}>
                                    <Rate tooltips={desc} onChange={this.changeProf} value={this.state.prof} style={{}} />
                                    Professor and Teaching style
    
    
                                </Col>
                                <Col xs={{ span: 12 }} sm={12} md={12} lg={6} xl={8}>

                                    <Select
                                    
                                                style={{maxWidth:"200px"}}
                                        placeholder="Your Grade"
                                        optionFilterProp="children"
                                        onChange={value => this.changeGrade(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >


                                        <Option value="A+">A+</Option>
                                        <Option value="A">A</Option>
                                        <Option value="A-">A-</Option>
                                        <Option value="B+">B+</Option>
                                        <Option value="B">B</Option>
                                        <Option value="B-">B-</Option>
                                        <Option value="C+">C+</Option>
                                        <Option value="C">C</Option>
                                        <Option value="C-">C-</Option>
                                        <Option value="D+">D+</Option>
                                        <Option value="D">D</Option>
                                        <Option value="D-">D-</Option>


                                    </Select>
                                </Col>

                            </Row>
                            <Row style={{ marginTop: "30px", marginBottom: "20px" }}>
                                <Col xs={{ span: 24 }} sm={24} md={24} lg={12} xl={12}>
                                    <Radio.Group  name="radiogroup" defaultValue={1} onChange={this.changeRecommendation} value={this.state.recom} style={{ marginBottom: "20px"}}>
                                        <Radio   value={1}>Yes</Radio>
                                        <Radio  value={0}>No</Radio>

                                    </Radio.Group>
                                    Would you recommend this course?
                                </Col>
                                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                    <Rate tooltips={desc} onChange={this.changeRating} value={this.state.rating} style={{}} />
                                    Overall Rating
                                </Col>
                            </Row>
                            <Row>
                                <Popover content={content}  >
                                    <Button type="primary" htmlType="submit" className="login-form-button"  >SUBMIT</Button>
                                </Popover>
                            </Row>

                        </form>
                    </Row>

                    <h2 style={{ textAlign: "center", marginTop: "20px" }}>Successfully Submitted Reviews</h2>
                    <Row>
                        <Col>
                            <Table

                                style={{ marginTop: "20px", height: "100%" }}
                                columns={[
                                    {
                                        title: "Course",
                                        dataIndex: "course",
                                        key: "course"
                                    },
                                    {
                                        title: "Difficulty",
                                        dataIndex: "difficulty",
                                        key: "difficulty"
                                    },
                                    {
                                        title: "Professor",
                                        dataIndex: "prof",
                                        key: "prof"
                                    },
                                    {
                                        title: "Grade",
                                        dataIndex: "grade",
                                        key: "grade"
                                    },

                                    {
                                        title: "Recommendation",
                                        dataIndex: "msgRecom",
                                        key: "msgRecom"
                                    },
                                    {
                                        title: "Rating",
                                        dataIndex: "rating",
                                        key: "rating"
                                    },

                                ]}
                                dataSource={this.state.reviewed}
                            />
                        </Col>
                    </Row>

                    {this.state.error && <div>Error: {this.state.error}</div>}
                    {
                        this.state.loading && (
                            <Spin
                                size="large"
                                style={{ display: "flex", justifyContent: "center", margin: 5 }}
                            />
                        )
                    }

                 

</div>
                    </MediaQuery>
                    {/* <MediaQuery query='(orientation: portrait)'>
                    <div>You are portrait</div>
                </MediaQuery> */}
                    {/* <MediaQuery query='(orientation: landscape)'>
                    <div>You are landscape</div>
                </MediaQuery>
                <MediaQuery query='(min-resolution: 2dppx)'>
                    <div>You are retina</div>
                </MediaQuery> */}

                    {/* <Row>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                        Col
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        Col
                     </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                        Col
                    </Col>
                </Row>, */}

            </div>
                );
        
            }
        
        
        
        }
        
const styles={

                    header: {
                    backgroundColor: "red"
            },
    star:{
                    fontSize: "38px",
                marginBottom:"10px"
            }
        }
        
export default ReviewPage