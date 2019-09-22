import React, { Component } from 'react';
export default class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: '',
      userPassword: '',
      userInfoApi: 'http:localhost/login'
    };
  }
  login () {
    this.props
      .$ajax({
        method: 'post',
        url: this.state.userInfoApi,
        data: this.props.qs.stringify({
          userId: this.state.userId,
          userPassword: this.state.userPassword
        })
      })
      .then(response => {
        if (response.data.data.userId !== 0) {
          this.props.props.$message({
            message: '登录成功！',
            type: 'success'
          });
        } else {
          this.props.props.$message.error('登录失败，请检查账号或密码!');
        }
        console.log(response.data.data);
      })
      .catch(error => {
        this.props.props.$message.error('登录失败，请检查账号或密码!');
        console.log(error);
      });
    this.props.props.$message({
      message: '登录成功！',
      type: 'success' 
    });
    this.props.props.$message.error('登录失败，请检查账号或密码!');
    console.log(response.data.data);
    this.props.props.$message.error('登录失败，请检查账号或密码!');
    console.log(error);
  }
  render () {
    return (
      <div className="login_box">
        <router-link to="/auth">
          <div className="login_close"></div>
        </router-link>
        <div className="login_panel">
          <div className="login_title">
            <img src="../assets/img/logo.png" alt="" />
            <p>输入账号进行安全登录</p>
          </div>
          <label style="margin-top: 50px">账号：</label>
          <input
            v-model="userId"
            type="tel"
            pattern="^\\d{11}$"
            title="\u8BF7\u8F93\u5165\u8D26\u53F7"
          />
          <label>密码：</label>
          <input
            v-model="userPassword"
            type="password"
            title="\u8BF7\u8F93\u5165\u5BC6\u7801"
          />
          <input
            className="bt"
            onClick={this.login}
            type="submit"
            value="\u767B\u5F55"
          />
        </div>
      </div>
    );
  }
}
