<template>
  <div class="login_box">
    <router-link to="/input">
      <div class="login_close"></div>
    </router-link>
    <div class="qrcode">
      <img class="img" v-bind:src="imgURL" alt="登录码" v-show="state === 1||state === 3"/>
      <div class="empty" v-show="state === 0"></div>
      <div class="refresh" v-show="state === 3">
        <i class="refresh_mask"></i>
        <i class="refresh_icon" v-on:click="getToken"></i>
      </div>
      <div class="result" v-show="state === 2">
        <img class="u_avatar" v-bind:src="userAvatar" alt="用户头像"/>
        <p class="u_name">{{userName}}</p>
      </div>
      <div>
        <p class="sub_title">{{tip}}</p>
        <p class="sub_desc">扫码登录，更易、更快、更安全</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  data () {
    return {
      state: 0,
      count: 30,
      tip: '正在获取登录码，请稍等',
      imgURL: '',
      authToken: '',
      userId: '',
      userAvatar: '',
      userName: '',
      tokenApi: 'http://localhost/auth/token',
      tokenImgApi: 'http://localhost/auth/img/',
      tokenInfoApi: 'http://localhost/auth/info/',
      userInfoApi: 'http://localhost/login/getUser'
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    getToken () {
      console.log('开始获取')
      this.state = 0
      this.tip = '正在获取登录码，请稍等'
      this.count = 30
      clearInterval(this.timeCount)
      this.$ajax({
        method: 'post',
        url: this.tokenApi
      }).then((response) => {
        this.authToken = response.data.data
        this.state = 1
        this.tip = '请使用手机口令扫码登录'
        this.imgURL = this.tokenImgApi + response.data.data
        this.timeCount = setInterval(this.getTokenInfo, 1000)
      }).catch((error) => {
        console.log(error)
        this.getToken()
      })
    },
    getTokenInfo () {
      this.count--
      if (this.count === 0) {
        this.state = 3
        this.tip = '二维码已过期，请刷新'
      }
      if (this.count < -1000) {
        this.count = -1
      }
      this.$ajax({
        method: 'post',
        url: this.tokenInfoApi + this.authToken
      }).then((response) => {
        let auth = response.data.data
        if (auth.authState === 1) {
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          clearInterval(this.timeCount)
        } else if (auth.authState === 2) {
          this.userId = auth.userId
          this.getUserInfo()
          this.state = 2
          this.tip = '扫码成功，请在手机上确认'
        } else if (auth.authState === 3) {
          this.state = 3
          this.tip = '二维码已过期，请刷新'
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getUserInfo () {
      this.$ajax({
        method: 'post',
        url: this.userInfoApi,
        data: this.qs.stringify({
          userId: this.userId
        })
      }).then((response) => {
        this.userName = response.data.data.userName
        this.userAvatar = response.data.data.userAvatar
        console.log(response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  /*登录框*/
  .login_box {
    z-index: 99;
    position: absolute;
    width: 380px;
    height: 540px;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px #999;
  }

  .login_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 64px;
    height: 64px;
    background: url(../assets/img/pcinput.png) no-repeat right top;
    background-size: 100% 100%;
    border-top-right-radius: 5px;
    cursor: pointer;
    z-index: 99;
  }
  /*二维码*/
  .qrcode {
    position: relative;
    text-align: center;
  }

  /* 二维码获取 */
  .qrcode .img {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
  }

  .qrcode .sub_title {
    text-align: center;
    font-size: 19px;
    color: #353535;
    margin-bottom: 23px;
  }

  .qrcode .sub_desc {
    text-align: center;
    color: #a3a3a3;
    font-size: 14px;
    padding: 0 40px;
    line-height: 1.8;
  }

  /* 二维码为空 */
  .qrcode .empty {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
    background: #d7e8fc;
  }

  /* 二维码刷新 */
  .qrcode .refresh {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 240px;
  }

  .qrcode .refresh .refresh_mask {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -120px;
    margin-top: -120px;
    width: 240px;
    height: 240px;
    background: #ffffffe0;
  }

  .qrcode .refresh .refresh_icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -48px;
    margin-top: -48px;
    height: 96px;
    width: 96px;
    cursor: pointer;
    background: url(../assets/img/refresh.png) no-repeat;
  }

  .qrcode .refresh .refresh_icon:hover {
    animation: refresh 1s linear infinite;
  }

  @keyframes refresh {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  /* 二维码结果 */
  .qrcode .result {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
  }

  .qrcode .result .u_avatar {
    height: 150px;
    width: 150px;
    margin-top: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
  }

  .qrcode .result .u_name {
    text-align: center;
    font-size: 19px;
    color: #353535;
    margin-top: 20px;
  }
</style>
