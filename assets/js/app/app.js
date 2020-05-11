import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.js'
import Results from './Results.js'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Remy'
    }
  }
  render () {
    return (
      <div className='home'>
         <div className ="container">
            <header>
              <div className ="logo">
             Prypto Profits
             </div>
             <nav className="menu">
               <a href="#" className="main-btn">Register</a>
             </nav>

            </header>

            <Results />
        </div>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
