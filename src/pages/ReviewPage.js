import React from "react";
import axios from "axios";
import { Table, Spin, Select, TreeSelect, PageHeader, Rate, Button, Menu, Dropdown, Icon, Divider, Radio, Popover,Alert } from "antd";
import hkuCourses2019 from "../hkuCourses2019";
import Rater from '../components/Rater'
import { Review } from "./Review";


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
            showOrNot:false
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
        this.onClickInfo=this.onClickInfo.bind(this)
    }

    onClickInfo(){
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
            msgRecom = 'Yes'
        // console.log("rating is" + rating)
        // console.log("course is" + course)
        // console.log("error is" + error)
        // console.log("loading is" + loading)
        // console.log("reviewed is" + reviewed)
        // console.log("rating is" + rating)
        // console.log("recom is" + recom)
        // // event.preventDefault();

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
            })
            .catch(() => {
                this.changeError(error);
                this.changeLoading(false);
            });
    };

    render() {
        return (



            <div >
                <PageHeader onBack={() => null} title="Choose Wisely Form" subTitle="Please fill the form" />,
                  <form
                    onSubmit={this.handleSubmit}
                    style={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center"
                        marginLeft: "20px"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Select
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
                                    <Option value={department}>{department}</Option>
                                ))}
                            </Select>
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
                                        <Option value={`${code} ${title}`}>{`${code} ${title}`}</Option>
                                    ))}
                                </Select>
                            )}
                            {/* <input
                      name="rating"
                      type="number"
                      value={rating}
                      min="1"
                      max="5"
                      onChange={e => changeRating(e.target.value)}
                      style={{ margin: 5 }}
                    /> */}


                            {/* {this.state.rating ? <span className="ant-rate-text">{desc[this.state.rating - 1]}</span> : ''} */}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "30px", marginTop: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                                <Rate tooltips={descDifficulty} onChange={this.changeDifficulty} value={this.state.difficulty} />
                                Course Difficulty
                        </div>

                            <Divider type="vertical"></Divider>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
                                <Rate tooltips={desc} onChange={this.changeProf} value={this.state.prof} />
                                Professor and Teaching style
                        </div>



                            <Select

                                style={{ width: 150, margin: 5 }}
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
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginRight: "10px" }}>
                                <Radio.Group name="radiogroup" defaultValue={1} onChange={this.changeRecommendation} value={this.state.recom}>
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={0}>No</Radio>

                                </Radio.Group>
                                Would you recommend this course?
                    </div>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
                                <Rate tooltips={desc} onChange={this.changeRating} value={this.state.rating} />
                                Overall Rating
                        </div>
                        </div>
                        <Popover content={content}  >
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ maxWidth: "120px" }}>SUBMIT</Button>
                        </Popover>
                    </div>
                </form>
                
                
                
                <Table
                    style={{ marginTop: "50px" }}
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
                {this.state.error && <div>Error: {this.state.error}</div>}
                {this.state.loading && (
                    <Spin
                        size="large"
                        style={{ display: "flex", justifyContent: "center", margin: 5 }}
                    />
                )}
            </div>
        );

    }



}

export default ReviewPage