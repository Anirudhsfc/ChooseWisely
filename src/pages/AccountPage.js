import React, { Component } from 'react'
import { version, Button, Input, PageHeader, Timeline } from 'antd'
import "antd/dist/antd.css";
import { Redirect } from 'react-router-dom'
import Card from '../components/Card'
import hkuCourses2019 from '../hkuCourses2019'

import Tabletop from 'tabletop'

// const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1hpvyH-a7TLNuAsHThBGew5xbUFF5FcJzCZfLCXX0fek/edit?usp=sharing';
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1BU_2zwmcmP7YZEjolxXWc9ZvCwa7Nc5TS5jeSdQNEn4/edit?usp=sharing';

class AccountPage extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };

        this.init=this.init.bind(this)
        this.showInfo=this.showInfo.bind(this)
       
    }
    componentDidMount() {
        this.init();
    }
    // // console.log("inside component did mount")
    // fetch(url).then(response => response.json()).then(data => {
    //     let batchRowValues = data.valueRanges[0].values;
    //     // console.log("batchRowValues=" + batchRowValues);
    //     const rows = [];
    //     // console.log("rows arr=" + rows);
    //     for (let i = 1; i < batchRowValues.length; i++) {
    //         let rowObject = {};
    //         // console.log("rowObj=" + rowObject);
    //         for (let j = 0; j < batchRowValues[i].length; j++) {
    //             rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    //         }
    //         rows.push(rowObject);
    //     }
    //     for (let i = 0; i < rows.length; i++) {
    //         // console.log(rows[i])
    //     }
    //     this.setState({ items: rows });

    // });
    init() {
        console.log("inside init")
        Tabletop.init({
            key: publicSpreadsheetUrl,
            callback: this.showInfo,
            simpleSheet: true,
            postProcess:this.process
        })
    }

    process(element){
        console.log("INSIDE PRIOCESS")
        // console.log(element.coursecode)
        if(element.coursecode=="AAAA"){
            console.log(element.coursecode)
            
        }
        // element["timestamp"]=Date.parse(element["displaydate"]);
    }
    showInfo(data, tabletop) {
        console.log("successful")
        // alert('Successfully processed!')
        // console.log(data);
        // console.log(this.state.items)
        this.setState({items:data})
        // console.log(this.state.items)
        data.forEach(element => {
            console.log(element.Timestamp)
            console.log(element.Course)
            // console.log("okay")
            // console.log(element.CourseCode);

        });
    }


    render() {
        return (
            <div style={{display:"flex",flexDirection:"row"}}>
                {this.state.items.map(item =>
    <div>
                    {(item.Course=="ACCT1101 Introduction to financial accounting")?
                        (<Card title={item.Course}></Card>)
                        :
                        (<Card title="error"></Card>)
                    }
               
</div>
                )}
            </div>
        )
    }


}

export default AccountPage