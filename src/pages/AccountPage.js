import React, { Component } from 'react'
import { version, Button, Input, PageHeader, Timeline } from 'antd'
import "antd/dist/antd.css";
import { Redirect } from 'react-router-dom'
import Card from '../components/Card'
// import config from '../config';
import Tabletop from 'tabletop'
// import load from '../spreadsheet';
// const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet4&majorDimension=ROWS&key=${config.apiKey}`;
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1hpvyH-a7TLNuAsHThBGew5xbUFF5FcJzCZfLCXX0fek/edit?usp=sharing';

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
            simpleSheet: true
        })
    }
    showInfo(data, tabletop) {
        console.log("successful")
        // alert('Successfully processed!')
        console.log(data);
        // console.log(this.state.items)
        this.setState({items:data})
        console.log(this.state.items)
        data.forEach(element => {
            // console.log("okay")
            console.log(element.CourseCode);

        });
    }


    render() {
        return (
            <div>
                {this.state.items.map(item =>

                    <Card title={item.CourseCode}></Card>

                )}
            </div>
        )
    }


}

export default AccountPage