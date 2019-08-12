import React from 'react';
import './App.css';


function NavLink(props) {
  return (
    <li><a href={`#${props.name}`}>{`${props.linkActive ? '{' : ''}` + props.name + `${props.linkActive ? '}' : ''}`}</a></li>
  );
}

class RadialWipeTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstBoxPosition: 0,
      secondBoxPosition: 90,
      radialWipeDone: false,
      activeLink: ''
    };
    this.handleScroll = this.handleScroll.bind(this);

    this.updateNavBar = this.updateNavBar.bind(this);
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

  updateNavBar(name) {
    this.setState({activeLink: name});
  }

  render() {
    return (
      <div className="desktop">

       

        <div className="blue-nav-background" style={{display: `${this.state.radialWipeDone ? 'block' : 'none'}`}} />
        <div className="reveal">
          <div className="reveal--half">
            <div className="dotted-box-top">
              <div className="large-letters text-outline">Hi, I'm Stephen! I like to build responsive, modern UIs</div>
            </div>
          </div>
          <div className="reveal--half">
            <div className="dotted-box-bottom">
              <div className="large-letters">and I <em>love</em> to write the software behind them.</div>
            </div>
          </div>
        </div>

        <div className="background-box" />

        <div className="first-box" style={{transform: `rotate(${this.state.firstBoxPosition}deg)`}} />

        <div className="second-box" style={{transform: `rotate(${this.state.secondBoxPosition}deg)`}}>
          <Blocks linkable={false} sectionObjects={this.props.sectionObjects} radialWipeDone={this.state.radialWipeDone} liftState={function() {return}} />
        </div>

        <div className="scroll-spacer" />
        <div className="nav-spacer" />
        
          <NavBar sectionObjects={this.props.sectionObjects} radialWipeDone={this.state.radialWipeDone} activeLink={this.state.activeLink} />
          
          <Blocks linkable={true} sectionObjects={this.props.sectionObjects} radialWipeDone={this.state.radialWipeDone} liftState={this.updateNavBar} />

        
      </div>
    );
  }
}




class Block extends React.Component {
   constructor(props) {
    super(props);
    this.selector = React.createRef();

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const rect = this.selector.current.getBoundingClientRect();
    if (rect.top < 5) {
      this.props.liftState(this.props.name);
    }
  }

  render() {
    return (
      
        <div ref={this.selector} id={this.props.linkable ? this.props.name : ''}>
          <div className="content-span" style={{zIndex: `${this.props.radialWipeDone ? 4 : -1}`}}>
            {this.props.content}
          </div>
        </div>
      
    );
  }
}



class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      buttonVisible: true
    };
  }


  render() {
    const sectionObjects = this.props.sectionObjects;
    const navReturn = sectionObjects.map((object) =>
      <NavLink key={object.link} name={object.link} linkActive={(this.props.activeLink === object.link && this.props.radialWipeDone) ? true : false } />
    );
    return (
      <div className="nav-links text-outline">
        <nav>
          <ul>
            {navReturn}
          </ul>
        </nav>
      </div>
    );
  }
  
}


function Blocks(props) {
  const sectionObjects = props.sectionObjects;
  const blockReturn = sectionObjects.map((object) =>
    <Block key={object.link} linkable={props.linkable} name={object.link} content={object.content} radialWipeDone={props.radialWipeDone} liftState={props.liftState} />
  );
  return (
    <div>
      <div style={{height: '5px'}} />
      {blockReturn}
    </div>
  );
}


function SeeWhosHomeProject(props) {
  return (
    <div className="project-window">
      <div className="project-description">
        <div>
          <h2>Vendor Status Tracker for Pop-Up Marketplaces</h2>
          <p>
            <em>June 2019</em>
          </p>
          <p>
            <strong>React, Bootstrap, Firebase, JavaScript, HTML, CSS</strong>
          </p>
          <p>
            I built this full-stack, responsive, single-page app over the course of two weeks using this <a href="https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658">
            guide for creating a React app from scratch</a>. The front end is built with React and Bootstrap, and the back end
            is built with Firebase's Realtime Database and authentication service. It allows users to sign up with a Google account, create new marketplaces, create new
            vendors and assign them to a marketplace created by another user, and indicate if the vendors they manage are currently open.
            Visitors to the site who aren't signed in can view the vendors for different marketplaces and see which vendors are currently open in real time. The
            site is deployed using Firebase hosting. Testing is set up with Enzyme and Jest and builds are integrated with Travis CI, so development of additional features in the future can be
            fully test-driven.
          </p>
          <p>
            <a href="https://see-whos-home.firebaseapp.com/"><strong>Link to app</strong></a>
          </p>
          <p>
            <a href="https://github.com/stephenobaker/see-whos-home"><strong>View code on GitHub</strong></a>
          </p>
        </div>
      </div>
      <div className="project-image">
        <img alt="who's at the market 1" src="images/see-whos-home-1.png" />
        <img alt="who's at the market 2" src="images/see-whos-home-2.png" />
        <img alt="who's at the market 3" src="images/see-whos-home-3.png" />
      </div>
    </div>
  );
}

function ChordBolderProject(props) {
  return (
    <div className="project-window">
      <div className="project-description">
        <div>
          <h2>"Ring the Bold Lyrics" Handbell Sheet Creator</h2>
          <p>
            <em>December 2017</em>
          </p>
          <p>
            <strong>JavaScript, jQuery, HTML, CSS</strong>
          </p>
          <p>
            I built this client-side app over the course of a couple days to automate the creation of "ring the bold lyrics" handouts. These handouts, which allow members of a handbell choir to accompany
            singing without reading music, allowed me to vastly increase music activity participation opportunities for children, congregation members, and nursing home residents in my previous role as a
            church music director. A July 2019 update which took less than a day to complete resulted in a single-page, responsive UI and a few bug fixes.
          </p>
          <p>
            <a href="https://stephenobaker.github.io/chord-bolder/"><strong>Link to app</strong></a>
          </p>
          <p>
            <a href="https://github.com/stephenobaker/chord-bolder"><strong>View code on GitHub</strong></a>
          </p>
        </div>
      </div>
      <div className="project-image">
        <img alt="chord bolder 1" src="images/chord-bolder-1.png" />
        <img alt="chord bolder 3" src="images/chord-bolder-3.png" />
        <img alt="chord bolder 4" src="images/chord-bolder-4.png" />
      </div>
    </div>
  );
}

function ReadingsParserProject(props) {
  return (
    <div className="project-window">
      <div className="project-description">
        <div>
          <h2>Lectionary Text Parser</h2>
          <p>
            <em>August 2017</em>
          </p>
          <p>
            <strong>JavaScript, HTML, CSS</strong>
          </p>
          <p>
            I built this client-side app in under a day, with vanilla JavaScript and some regex, to help the secretary at my church format lectionary readings for bulletin inserts and PowerPoint presentations.
            I updated it in July 2019 by wrapping it in a single-page, responsive UI, which also took me less than a day to complete.
          </p>
          <p>
            <a href="https://stephenobaker.github.io/reading-parser/"><strong>Link to app</strong></a>
          </p>
          <p>
            <a href="https://github.com/stephenobaker/reading-parser"><strong>View code on GitHub</strong></a>
          </p>
        </div>
      </div>
      <div className="project-image">
        <img alt="readings parser 1" src="images/readings-parser-1.png" />
        <img alt="readings parser 3" src="images/readings-parser-3.png" />
      </div>
    </div>
  );
}

function App() {
  const aboutContent = (
      <div className="info-section">
        <h1>About Me</h1>
        I'm a professional musician and front end developer.
        For the last 6 years, I led a music program at a church in northwest Iowa, where I 
        built applications to automate the arrangement of new music 
        and the creation of teaching materials.
        I love solving problems and creating value for organizations.
      </div>

    );
    const skillsContent = (
      <div className="info-section">
        <h1>Skills</h1>
        <strong>Languages:</strong> JavaScript, HTML, CSS<br />
        <strong>Libraries/Frameworks:</strong> React, Bootstrap, jQuery<br />
        <strong>Database/Backend:</strong> Firebase (NoSQL)<br />
        <strong>Testing:</strong> Enzyme, Jest, Jasmine<br />
        <strong>Version Control:</strong> Git/GitHub<br />
      </div>

    );
    const projectsContent = (
      <div>
        <div className="info-section">
          <h1>Projects</h1>
        </div>
        <div className="projects-wrapper">
          
          <SeeWhosHomeProject />
          <ChordBolderProject />
          <ReadingsParserProject />
        </div>
      </div>
    );
    const contactContent = (
      <div>
        
        <div className="info-section text-center">
          <h1>Let's get in touch!</h1>
          I'm currently available for new opportunities. I'd love to help you with your project!
        
        

          <div style={{display: "flex"}}>
            <div className="contact-link-wrapper">

              <a href="mailto:stephen.gilchrist.baker@gmail.com">
                <div className="contact-logo">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail icon</title><path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/></svg>
                </div>
                
              </a>
              <div className="contact-text">stephen.gilchrist.baker@gmail.com</div>
              

              <a href="https://github.com/stephenobaker">
                <div className="contact-logo">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </div>
                
              </a>
              <div className="contact-text">github.com/stephenobaker</div>
              

              <a href="https://www.linkedin.com/in/stephengbaker/">
                <div className="contact-logo">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                
              </a>
              <div className="contact-text">linkedin.com/in/stephengbaker</div>
            </div>
          </div>

        </div>
      </div>
    );
    const sectionObjects = [
      {link: "About", content: aboutContent},
      {link: "Skills", content: skillsContent},
      {link: "Projects", content: projectsContent},
      {link: "Contact", content: contactContent}
    ];

  return (
    
    <div className="App">
      <RadialWipeTop sectionObjects={sectionObjects} />
      <div className="mobile">
       
        <div className="mobile-banner">
          <h1>Hi, I'm Stephen! I build responsive, modern websites on top of the latest technologies.</h1>
        </div>
          
        <Blocks linkable={true} sectionObjects={sectionObjects} radialWipeDone={true} liftState={function() {return;}} />

      </div>
      <div className="bottom-banner" />
      
    </div>
  );
}

export default App;
