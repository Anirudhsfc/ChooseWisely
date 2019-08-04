import React, { Component } from 'react'
import { version, Button, Input, PageHeader, Timeline } from 'antd'
import "antd/dist/antd.css";
import { Redirect } from 'react-router-dom'
import Card from '../components/Card'
import config from '../config';
// import load from '../spreadsheet';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class AccountPage extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        console.log("inside component did mount")
        fetch(url).then(response => response.json()).then(data => {
            let batchRowValues = data.valueRanges[0].values;
            // console.log("batchRowValues=" + batchRowValues);
            const rows = [];
            // console.log("rows arr=" + rows);
            for (let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {};
                // console.log("rowObj=" + rowObject);
                for (let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                }
                rows.push(rowObject);
            }
            for (let i = 0; i < rows.length; i++) {
                // console.log(rows[i])
            }
            this.setState({ items: rows });

        });
    }


    render() {
        return(
            <div>
           {this.state.items.map(item =>
            
            <Card title={item.Name}></Card>
             
           )} 
       </div>
        )
    }


}

export default AccountPage