import React from "react"

export default class BookComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = (event) => {
    event.preventDefault()
    const { params: { index } } = this.props
    this.props.handleClickDelete(index)
  }

  render() {
    const { params: { name, author } } = this.props
    
    return (
      <div>
        <button onClick={this.handleClick}>x</button>
        <span>Author: { author }</span>
        <span> __||__ </span>
        <span>Name: { name }</span>
      </div>
    )
  }
}