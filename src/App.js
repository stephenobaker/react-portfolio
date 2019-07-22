import React from 'react';
import logo from './logo.svg';
import './App.css';



class RadialWipeTop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstBoxPosition: 0,
      secondBoxPosition: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let firstBoxScroll = window.pageYOffset * -0.2;
    let secondBoxScroll = 90 - (window.pageYOffset - (89.99/0.2)) * 0.2;
    if (firstBoxScroll < -90) {
      this.setState({firstBoxPosition: -90});
    } else {
      this.setState({firstBoxPosition: firstBoxScroll});

    }
    if (secondBoxScroll < 0) {
      this.setState({secondBoxPosition: 0})
    } else {
      this.setState({secondBoxPosition: secondBoxScroll})
    }



  }

  render() {
    return (
      <div>
        <div className="first-box" style={{transform: `rotate(${this.state.firstBoxPosition}deg)`}} />
        <div className="second-box" style={{transform: `rotate(${this.state.secondBoxPosition}deg)`}} />
      </div>
    );
  }
}




function App() {
  return (
    <div className="App">
      <RadialWipeTop />
      
    </div>
  );
}

export default App;
