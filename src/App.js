import React from 'react';
import logo from './logo.svg';
import './App.css';



class RadialWipeTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstBoxPosition: 0,
      secondBoxPosition: 90,
      radialWipeDone: false
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
      this.setState({
        secondBoxPosition: 0,
        radialWipeDone: true
      });
    } else {
      this.setState({
        secondBoxPosition: secondBoxScroll,
        radialWipeDone: false
      });
    }



  }

  render() {
    return (
      <div>
        <div className="nav-links text-outline">
          <nav>
            <ul>
              <li><a href="#">{'{ABOUT}'}</a></li>
              <li><a href="#">SKILLS</a></li>
              <li><a href="#">PROJECTS</a></li>
              <li><a href="#">CONTACT</a></li>
            </ul>
          </nav>
        </div>
        <div className="blue-nav-background" style={{display: `${this.state.radialWipeDone ? 'block' : 'none'}`}} />
        <div className="reveal">
          <div className="reveal--half">
            <div className="dotted-box-top">
              <div className="large-letters text-outline">My name is Stephen. I like to design user interfaces.</div>
            </div>
          </div>
          <div className="reveal--half">
            <div className="dotted-box-bottom">
              <div className="large-letters">And I love to design the software behind them!</div>
            </div>
          </div>
        </div>
        <div className="" style={{display: "" }} />
        <div className="first-box" style={{transform: `rotate(${this.state.firstBoxPosition}deg)`}} />
        <div className="second-box" style={{transform: `rotate(${this.state.secondBoxPosition}deg)`, position: `${this.state.radialWipeDone ? 'relative' : 'fixed'}`, top: `${this.state.radialWipeDone ? '970px' : '70px'}`}}>
          <div className="info-section">
            Skills are listed here
          </div>
        </div>
      </div>
    );
  }
}

function Content() {
  return (<div className="content-span" />)
}



function App() {
  return (
    <div className="App">
      <RadialWipeTop />
      <Content />
      
    </div>
  );
}

export default App;
