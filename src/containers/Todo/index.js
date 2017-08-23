import React from "react"
import BookComponent from "./components/BookComponent"

export default class BookForm extends React.Component {
  state = {
    books: []
  }

  constructor(props) {
    super(props)
   
  }

  componentDidMount() {
    this.setState({ books: this.getBooks() })
  }

  handleSubmit = (event) => {
    event.preventDefault()

      if (!this.nameComponent) throw new Error("Name component is not defined!")
      if (this.nameComponent.value && this.authorComponent.value) {
        const books = this.getBooks()
        books.unshift({
          name: this.nameComponent.value,
          author: this.authorComponent.value
        })
        this.setState({ books }, () => { 
          this.setBooks(books)
          this.nameComponent.value = "",
          this.authorComponent.value = ""
        })
      }
  
  }

  setBooks(books) {
    localStorage.setItem("books", JSON.stringify(books))
    return this
  }

  getBooks() {
    const toParseData = localStorage.getItem("books")
    return toParseData && JSON.parse(toParseData) || []
  }

  handleClickDelete = (id) => {
    const { books } = this.state
    const filtered = books.filter((el, index) => index != id)
    this.setState({ books: filtered }, () => this.setBooks(filtered))
  }

  render() {
    const { books } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type={"text"}
            ref={(input) => this.authorComponent = input}
            placeholder={"Author..."}
          />
          <input 
            type={"text"}
            ref={(input) => this.nameComponent = input}
            placeholder={"Book..."}
          />
          <button type={"submit"}>Submit</button>
        </form>
        <div>
          { books.map((el, index) => (<BookComponent 
            key={index} 
            handleClickDelete={this.handleClickDelete}            
            params={{...el, index}}
          />)) }
        </div>
      </div>
    )
  }
}