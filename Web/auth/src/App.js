import React, { Component } from 'react';
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      bgURL: [
        require('./assets/img/bg1.jpg'),
        require('./assets/img/bg2.jpg'),
        require('./assets/img/bg3.jpg'),
        require('./assets/img/bg4.jpg')
      ]
    };
  }
  render () {
    return (
      <div id="app">
        <div className="login_content">
          <p>
            <span className="left-quote"></span>
            <span>Trunch·创趣</span>
          </p>
          <p>
            <span>创造点滴乐趣</span>
            <span className="right-quote"></span>
          </p>
        </div>
        <p className="power_by">© 2019 - 2019 Trunch All Rights Reserved</p>
      </div>
    );
  }
}
