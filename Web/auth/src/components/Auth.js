import React, { Component } from 'react';
export default class Auth extends Component {
  constructor (props) {
    super(props);
    this.state = {
      state: 0,
      count: 30,
      tip: '正在获取登录码，请稍等',
      imgURL: '',
      authToken: '',
      userId: '',
      userAvatar: '',
      userName: '',
      tokenApi: 'http:localhost/auth/token',
      tokenImgApi: 'http:localhost/auth/img/',
      tokenInfoApi: 'http:localhost/auth/info/',
      userInfoApi: 'http:localhost/login/getUser'
    };
  }
  componentWillMount () {
    this.getToken();
  }
  getToken () {
    console.log('开始获取');
    this.setState({
      state: 0 
    });
    this.setState({
      tip: '正在获取登录码，请稍等' 
    });
    this.setState({
      count: 30 
    });
    clearInterval(this.props.timeCount);
    this.props
      .$ajax({
        method: 'post',
        url: this.state.tokenApi
      })
      .then(response => {
        this.setState({
          authToken: response.data.data 
        });
        this.setState({
          state: 1 
        });
        this.setState({
          tip: '请使用手机口令扫码登录' 
        });
        this.setState({
          imgURL: this.state.tokenImgApi + response.data.data 
        });
        this.setState({
          timeCount: setInterval(this.props.getTokenInfo, 1000)
        });
      })
      .catch(error => {
        console.log(error);
        this.props.props.getToken();
      });
    this.setState({
      authToken: response.data.data 
    });
    this.setState({
      state: 1 
    });
    this.setState({
      tip: '请使用手机口令扫码登录' 
    });
    this.setState({
      imgURL: this.state.tokenImgApi + response.data.data 
    });
    this.setState({
      timeCount: setInterval(this.props.getTokenInfo, 1000) 
    });
    console.log(error);
    this.props.props.getToken();
  }
  getTokenInfo () {
    this.count--;
    this.setState({
      state: 3 
    });
    this.setState({
      tip: '二维码已过期，请刷新' 
    });
    this.setState({
      count: -1 
    });
    this.props
      .$ajax({
        method: 'post',
        url: this.state.tokenInfoApi + this.state.authToken
      })
      .then(response => {
        let auth = this.props.data;
        if (auth.authState === 1) {
          this.props.props.$message({
            message: '登录成功！',
            type: 'success'
          });
          clearInterval(this.props.props.timeCount);
        } else if (auth.authState === 2) {
          this.setState({
            userId: auth.userId 
          });
          this.props.props.getUserInfo();
          this.setState({
            state: 2 
          });
          this.setState({
            tip: '扫码成功，请在手机上确认' 
          });
        } else if (auth.authState === 3) {
          this.setState({
            state: 3 
          });
          this.setState({
            tip: '二维码已过期，请刷新' 
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    let auth = this.props.data;
    this.props.props.$message({
      message: '登录成功！',
      type: 'success' 
    });
    clearInterval(this.props.props.timeCount);
    this.setState({
      userId: auth.userId 
    });
    this.props.props.getUserInfo();
    this.setState({
      state: 2 
    });
    this.setState({
      tip: '扫码成功，请在手机上确认' 
    });
    this.setState({
      state: 3 
    });
    this.setState({
      tip: '二维码已过期，请刷新' 
    });
    console.log(error);
  }
  getUserInfo () {
    this.props
      .$ajax({
        method: 'post',
        url: this.state.userInfoApi,
        data: this.props.qs.stringify({
          userId: this.state.userId
        })
      })
      .then(response => {
        this.setState({
          userName: response.data.data.userName 
        });
        this.setState({
          userAvatar: response.data.data.userAvatar 
        });
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      userName: response.data.data.userName 
    });
    this.setState({
      userAvatar: response.data.data.userAvatar 
    });
    console.log(response.data.data);
    console.log(error);
  }
  render () {
    return (
      <div className="login_box">
        <router-link to="/input">
          <div className="login_close"></div>
        </router-link>
        <div className="qrcode">
          <img
            className="img"
            src={this.state.imgURL}
            alt="\u767B\u5F55\u7801"
            style={{
              display: this.props.state === 1 || state === 3 ? 'block' : 'none'
            }}
          />
          <div
            className="empty"
            style={{
              display: this.props.state === 0 ? 'block' : 'none' 
            }}
          ></div>
          <div
            className="refresh"
            style={{
              display: this.props.state === 3 ? 'block' : 'none' 
            }}
          >
            <i className="refresh_mask"></i>
            <i className="refresh_icon" onClick={this.getToken}></i>
          </div>
          <div
            className="result"
            style={{
              display: this.props.state === 2 ? 'block' : 'none' 
            }}
          >
            <img
              className="u_avatar"
              src={this.state.userAvatar}
              alt="\u7528\u6237\u5934\u50CF"
            />
            <p className="u_name">{this.state.userName}</p>
          </div>
          <div>
            <p className="sub_title">{this.state.tip}</p>
            <p className="sub_desc">扫码登录，更易、更快、更安全</p>
          </div>
        </div>
      </div>
    );
  }
}
