import React, { Component} from 'react'
import ReactDOM from 'react-dom'
export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Remy'
    }
  }
  render () {
    return (
      <section id="home">
         <div className ="container">
           <div className="col-md-6">
              <img src="/img/bitcoin-logo.png" className="bitcoin-logo"/>
           </div>
           <div className="col-md-6">
              <h2> Enter Transaction</h2>

              <label> Crypto Amount</label>
              <input type ="text" name="price" />

              <label> Date</label>
              <input type ="text" name="date" />

              <button type="submit"> Check Profits </button>
           </div>
        </div>

      </section> )
  }
}
