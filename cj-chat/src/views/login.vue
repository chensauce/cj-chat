<template>
  <div class="body">
    <div class="navbar">
      <div class="nav-item left"></div>
      <div class="nav-item center"></div>
      <router-link class="nav-item right" tag="div" :to="{path:'/register'}">注册</router-link>
    </div>
    <img class="logo" src="@/assets/logo.png" alt />
    <div class="h1">登录</div>
    <div class="h4">您好，欢迎来到球球!</div>
    <div class="input-view">
      <input
        class="input"
        v-model="userId"
        @blur="handleCheckout(checkout.userId)"
        type="text"
        placeholder="账号"
      />
      <div class="icon">
        <van-icon v-if="userId.length>0" @click="userId=''" name="close" color="#bbb" />
      </div>
      <span :class="checkout.userId.showTip?'show':'hidden'" color>{{checkout.userId.tip}}</span>
    </div>
    <div class="input-view">
      <input
        class="input"
        v-model="password"
        :type=" psasswordIsShow?'text':'password'"
        placeholder="密码"
        @blur="handleCheckout(checkout.password)"
      />
      <div class="icon">
        <div v-if="password.length>0">
          <van-icon
            name="closed-eye"
            v-if="!psasswordIsShow"
            @click="psasswordIsShow=!psasswordIsShow"
            color="#bbb"
          />
          <van-icon name="eye" v-else @click="psasswordIsShow=!psasswordIsShow" color="#bbb" />
        </div>
      </div>
      <span :class="checkout.password.showTip?'show':'hidden'">{{checkout.password.tip}}</span>
    </div>
    <button class="login-btn" @click="login">登录</button>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
      psasswordIsShow: false,
      checkout: {
        //输入校验
        userId: {
          rule: this.accountRule,
          tip: "请输入正确的球球号！", //错误提示
          showTip: false //显示错误提示
        },
        password: {
          rule: this.passwordRule,
          tip: "密码不能少于6位！", //错误提示
          showTip: false //显示错误提示
        }
      }
    };
  },
  methods: {
    //账号校验规则
    accountRule() {
      if (this.userId.length < 6) {
        return false;
      }
      return true;
    },
    //密码校验规则
    passwordRule() {
      if (this.password.length < 6) {
        return false;
      }
      return true;
    },
    handleCheckout(obj) {
      if (!obj.rule()) {
        obj.showTip = true;
        return false;
      } else {
        obj.showTip = false;
        return true;
      }
    },
    login() {
      var checkAccount = this.handleCheckout(this.checkout.userId);
      var checkPassword = this.handleCheckout(this.checkout.password);
      if (checkAccount && checkPassword) {
        console.log("验证通过");
        this.$store.dispatch('login',{
          userId:this.userId,
          password:this.password
          }).then(res=>{
            this.$router.push('/')
          })
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  padding: 0 30px;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.logo {
  width: 150px;
  height: 50px;
  display: block;
  margin: 20px auto;
}
.h1 {
  font-size: 30px;
  font-weight: 600;
  font-family: "PingFangSC";
}
.h4 {
  font-size: 20px;
  font-family: "PingFangSC";
  color: rgba(39, 40, 50, 0.5);
  margin: 20px 0;
}
.input-view {
  margin: 10px 0;
  height: 56px;
  position: relative;
  .input {
    box-sizing: border-box;
    padding-right: 30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(39, 40, 50, 0.08);
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    &::placeholder {
      font-size: 13px;
    }
  }
  .icon {
    position: absolute;
    right: 5px;
    top: 15px;
  }
  span {
    font-size: 12px;
    color: rgba(255, 93, 91, 1);
    display: block;
    margin: 5px 0;
    transition: all 0.3s;
    overflow: hidden;
    &.show {
      height: 16px;
    }
    &.hidden {
      height: 0;
    }
  }
}
.login-btn {
  display: block;
  width: 250px;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  border: none;
  outline: none;
  margin: 40px auto;
  background: rgba(255, 228, 49, 1);
  font-weight: 600;
  box-shadow: 0 25px 16px -18px rgba(255, 228, 49, 0.4);
  font-family: "PingFangSC";
  &:active {
    background: darken(rgba(255, 228, 49, 1), 10);
  }
}
</style>