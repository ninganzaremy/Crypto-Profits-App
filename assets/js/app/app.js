import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.js'
import Results from './Results.js'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'


class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Remy',
      location: 'home',
      date: moment(),
      data:''
    }
    this.routingSystem=this.routingSystem.bind(this)
    this.handleDateChange=this.handleDateChange.bind(this)
    this.apicall=this.apicall.bind(this)

  }
  routingSystem(){
    switch(this.state.location) {
  case 'home':
      return <Home handleDateChange={this.handleDateChange} globalState ={this.state} />
    break;

  case 'results':
       return <Results />
    break;

  default:
      return <Home />

}

  }

  handleDateChange(date) {
 this.setState({
   date: date
 }, () => console.log(this.state.date.unix()));
};

apicall(){
  //https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=15131285669&extraParams=crypto_profits_cp
  var self = this;
  axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=15131285669&extraParams=crypto_profits_cp')
  .then(function (response) {
 self.setState({
    data: response.data.BTC
  }, () => {
    console.log(self.state);
  })

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
  render () {
    return (<div className='home'>
         <div className ="container">
            <header>
              <div className ="logo" onClick={this.apicall}>
             Prypto Profits
             </div>
             <nav className="menu">
               <a href="#" className="main-btn">Register</a>
             </nav>

            </header>
             {this.routingSystem()}
        </div>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
