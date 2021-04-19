import { Component } from 'react'
import Content from '../layout/Content'

import * as gtag from '../lib/gtag'

export default class Contact extends Component {
  state = { message: '' }

  handleInput = (e) => {
    this.setState({ message: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: this.state.message,
    })

    this.setState({ message: '' })
  }

  render() {
    return (
      <Content>
        <h1>This is the Contact page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Message:</span>
            <textarea onChange={this.handleInput} value={this.state.message} />
          </label>
          <button type="submit">submit</button>
        </form>
      </Content>
    )
  }
}
