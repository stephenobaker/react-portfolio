import React from 'react';
import logo from './logo.svg';
import './App.css';



class RadialWipeTop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {scrollPosition: 0};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let newScroll = window.pageYOffset * -0.2;

    this.setState({scrollPosition: newScroll});
  }

  render() {
    return (
      <div className="first-white-banner" style={{transform: `rotate(${this.state.scrollPosition}deg)`}} />
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
