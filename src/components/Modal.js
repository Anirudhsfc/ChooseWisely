import React, { Component } from 'react'
import { Card, Icon, Avatar, Modal, Button } from 'antd';
import image1 from '../images/messi.jpg'
import { Redirect } from 'react-router-dom'
import "antd/dist/antd.css";
import { thisExpression } from '@babel/types';


class Modals extends Component {


    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            data: this.props.data,
            course: this.props.course,
            gradeArr: [],
            numberArr: [],
            flag: true
        }

    }




    showModal = () => {
        console.log(this.state.data.length)
        console.log("course is =" + this.state.course)
        // console.log(this.state.data.Course)
        var ap = 0
        var a = 0
        var am = 0
        var bp = 0
        var b = 0
        var bm = 0
        var cp = 0
        var c = 0
        var cm = 0
        var dp = 0
        var d = 0
        var dm = 0
        var flag = this.state.flag
        this.state.data.map(item => {
         
            if (item.Course == this.state.course) {
                console.log("item.Course="+item.Course)
                console.log("item.Course="+item.Grade)
                if (item.Grade == 12)
                    ap = ap + 1
                else if (item.Grade == 11)
                    a = a + 1
                else if (item.Grade == 10)
                    am = am + 1
                else if (item.Grade == 9)
                    bp = bp + 1
                else if (item.Grade == 8)
                    b = b + 1
                else if (item.Grade == 7)
                    bm = bm + 1
                else if (item.Grade == 6)
                    cp = cp + 1
                else if (item.Grade == 5)
                    c = c + 1
                else if (item.Grade == 4)
                    cm = cm + 1
                else if (item.Grade == 3)
                    dp = dp + 1
                else if (item.Grade ==2)
                    d = d + 1
                else if (item.Grade == 1)
                    dm = dm + 1
                else
                    flag = false




            }
        })
        if (ap != 0) {
            this.state.numberArr.push(ap)
            this.state.gradeArr.push('A+')
        }
        if (a != 0) {
            this.state.numberArr.push(a)
            this.state.gradeArr.push('A')
        }
        if (am != 0) {
            this.state.numberArr.push(am)
            this.state.gradeArr.push('A-')
        }
        if (bp != 0) {
            this.state.numberArr.push(bp)
            this.state.gradeArr.push('B+')
        }
        if (b != 0) {
            this.state.numberArr.push(b)
            this.state.gradeArr.push('B')
        }
        if (bm != 0) {
            this.state.numberArr.push(bm)
            this.state.gradeArr.push('B-')
        }
        if (cp != 0) {
            this.state.numberArr.push(cp)
            this.state.gradeArr.push('C+')
        }
        if (c != 0) {
            this.state.numberArr.push(c)
            this.state.gradeArr.push('C')
        }
        if (cm != 0) {
            this.state.numberArr.push(cm)
            this.state.gradeArr.push('C-')
        }
        if (dp != 0) {
            this.state.numberArr.push(dp)
            this.state.gradeArr.push('D+')
        }
        if (d != 0) {
            this.state.numberArr.push(d)
            this.state.gradeArr.push('D')
        }
        if (dm != 0) {
            this.state.numberArr.push(dm)
            this.state.gradeArr.push('D-')
        }


        // this.state.data.forEach(element => {

        //     console.log(element.Course)
        // });
        this.setState({
            visible: true,
            numberArr: this.state.numberArr
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            gradeArr:[],
            numberArr:[]
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{marginTop:"20px"}}>
                    Grade Distribution
            </Button>
                <Modal
                    title="Grade Distribution"
                    visible={this.state.visible}
                    onOk={this.handleOk}

                >
                    {this.state.numberArr.map((item,index) =>
                   
                        <div>
                            {(item) ?
                                (<p >{item+` student/s scored: `+this.state.gradeArr[index]}</p>)
                                :
                                (<p >Error</p>)
                            }

                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}

export default Modals