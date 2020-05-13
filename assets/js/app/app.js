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
      data:'',
      cryptoAmount: 1,
      status: '',
      totalStatus:''
    }
    this.routingSystem=this.routingSystem.bind(this)
    this.handleDateChange=this.handleDateChange.bind(this)
    this.checkProfits=this.checkProfits.bind(this)
    this.onInputChange= this.onInputChange.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  //react life-cycle
  componentWillMount(){
     var self=this;
    axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=${moment().unix()}&extraParams=crypto_profits_cp`)
    .then(function (response) {
   self.setState({
      btcToday:response.data.BTC
    }, () => {
      console.log(self.state);
    })

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  }



  routingSystem(){
    switch(this.state.location) {
        case 'home':
            return <Home handleDateChange={this.handleDateChange} globalState ={this.state}  onInputChange={this.onInputChange} checkProfits={this.checkProfits}/>
          break;

        case 'results':
             return <Results globalState={this.state} goBack={this.goBack}/>
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


  //handle user_input
  onInputChange(event){
    this.setState({
      cryptoAmount: event.target.value
    })
  }


// calling the api
checkProfits(){
  //https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=15131285669&extraParams=crypto_profits_cp
  var self = this;
  axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=BTC,USD,EUR&ts=${self.state.date.unix()}&extraParams=crypto_profits_cp`)
  .then(function (response) {
    self.setState({
        data:response.data.BTC
      }, () => {
        console.log(self.state);
        const CP =self.state.data.USD;
        var newCP = (self.state.cryptoAmount * 100);
        newCP = (newCP * CP) /100;
        const SP = self.state.btcToday.USD;
        var newSP =(self.state.cryptoAmount * 100)
        newSP = (newCP *SP)/100
        if (newCP < newSP){
          var gain = newSP - newCP
          var gainPercent = (gain/ newCP) * 100
          gainPercent = gainPercent.toFixed(2)
          console.log(`${self.state.cryptoAmount} bitcoin newSP: ${newSP}, SP: ${SP}, newCP: ${newCP}, CP:${CP}`)
          console.log(`profit percent is ${gainPercent}`)


          //set state with totals and change location
          self.setState({
            location: 'results',
            status:'gain',
            totalStatus:{
              newCP : newCP.toFixed(2),
              CP: CP,
              newSP: newSP.toFixed(2),
              SP: SP,
              percent: gainPercent
            }
          }, ()=> console.log(self.state))


        }else{
          var loss = newCP-newSP
          var lossPercent = (loss / newCP)* 100
          lossPercent =lossPercent.toFixed(2)
          console.log(`loss percent is ${lossPercent}`)


          //set state with totals and change location
          self.setState({
            location: 'results',
            status:'loss',
            totalStatus:{
              newCP : newCP.toFixed(2),
              CP: CP,
              newSP: newSP.toFixed(2),
              SP: SP,
              percent: lossPercent
            }
          }, ()=> console.log(self.state))

        }
    self.setState({
      location: 'results'
    })
  })

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

goBack(){
  this.setState({
    location: 'home',
    date: moment(),
    data:'',
    cryptoAmount: 1,
    status: '',
    totalStatus:''
  })
}

  render () {
    return (<div className='home'>
         <div className ="container">
            <header>
              <div className ="logo" onClick={this.checkProfits}>
              CRYPTO PROFITS
             </div>
             <nav className="menu">
               <a href="#" className="main-btn">Register</a>
             </nav>

            </header>
             {this.routingSystem()}

             <footer >
                  <div className="copyright-area">
                     <p >
                      REMY © Developer
                     </p>
                   </div>
                   <div className="footer-social-icons">
                       <div  className="tooltip">
                         <a href="https://www.linkedin.com/in/remy-ninganza/" rel="noopener" target="_blank"><img src="img/linkedin.webP" alt="Linkedin"/></a>
                         <span className="tooltiptext">My_Linkedin</span>
                       </div>
                       <div  className="tooltip">
                         <a href="https://github.com/ninganzaremy" rel="noopener" target="_blank"><img src="/img/github.webP" alt="Github"/></a>
                         <span className="tooltiptext">My_Github</span>
                       </div>
                       <div  className="tooltip">
                         <a href="https://sourcerer.io/ninganzaremy" rel="noopener" target="_blank"><img src="/img/codepen.webP" alt="Pinterest"/></a>
                         <span className="tooltiptext"> My_Sourcer</span>
                       </div>
                       <div  className="tooltip">
                         <a href="https://twitter.com/RemyNinganza" rel="noopener" target="_blank"><img src="/img/twitter.webP" alt="Instagram"/></a>
                         <span className="tooltiptext">My_Twitter</span>
                       </div>
                   </div>
             </footer>
        </div>

      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
