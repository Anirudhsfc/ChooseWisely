import { Rate } from 'antd';
import React from 'react'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class Rater extends React.Component {
  state = {
    value: 3,
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
      console.log("rating from rate.js is="+this.state.value)
    const { value } = this.state;
    return (
      <span>
        <Rate allowClear={false}tooltips={desc} onChange={this.handleChange} value={value} temp="temptext" />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    );
  }
}

export default Rater