import React, { Component } from 'react'
import { Card, Icon, Avatar } from 'antd';
import image1 from '../images/messi.jpg'
import { Redirect } from 'react-router-dom'
import "antd/dist/antd.css";

const { Meta } = Card
class Cards extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.title)

    // this.handleCardClick=this.handleCardClick.bind(this)
    this.setRedirect = this.setRedirect.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.state = {
      redirect: false,
        course: this.props.title,
        
      

    }
  }

  componentDidMount() {

   
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  renderRedirect() {
    if (this.state.redirect == true) {
      return <Redirect to={{
        pathname: '/',
        course: this.state.course
      }}></Redirect>
    }
  }

  // handleCardClick(){
  //     // alert("hi")
  //     return <Redirect to='/target'></Redirect>
  // }
  render() {
    return (
      <div>
        <div>
          {this.renderRedirect()}
        </div>
        <Card
          onClick={this.setRedirect}
          size="default"
          style={{ height: 100, width: "auto" }}

        // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={this.props.title}
            description={this.props.desc}
          />
        </Card>
      </div>
    )
  }
}

export default Cards;