import React,{Component} from 'react'
import { Card, Icon, Avatar } from 'antd';
import image1 from '../images/messi.jpg'

import "antd/dist/antd.css";

const {Meta}=Card
class Cards extends Component{

    constructor(props){
        super(props)
        console.log(this.props.title)
    
    this.handleCardClick=this.handleCardClick.bind(this)
    }

    handleCardClick(){
        alert("clicked")
    }
    render(){
        return(

            <Card
            onClick={this.handleCardClick}
            size="default"
            style={{ width: 300}}
            cover={
              <img
                alt="example"
                src={image1}
               
              />
            }
            // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta
            //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={this.props.title}
              description={this.props.desc}
            />
          </Card>
        )
    }
}

export default Cards;