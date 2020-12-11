import React, { Component, Fragment } from 'react';

class Input extends Component {
  
  render() {
    return (
      <Fragment>
        <label
          htmlFor={this.props.id ? this.props.id : null}
          children={this.props.label}
        />
        <input
          id={this.props.id ? this.props.id : null}
          type={this.props.type ? this.props.type : 'text'}
          onChange={e => this.props.onChange(e.target.value)}
          value={this.props.value ? this.props.value : ''}
        />
      </Fragment>
    )
  }
}

export default Input