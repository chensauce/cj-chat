<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <span v-if="$route.params.type=='friend'">添加好友</span>
        <span v-else>加入群聊</span>
      </template>
    </van-nav-bar>
    <div class="body">
      <div class="wrapper">
        <img :src="$route.params.avatar" alt="头像" />
      </div>
      <div class="content">
        <img :src="$route.params.avatar" alt="头像" />
        <div class="user-name" v-html="$route.params.nick_name"></div>
        <textarea class="message" rows="5" maxlength="75" v-model="message" placeholder="说点什么吧"></textarea>
        <div class="add-btn" v-if="$route.params.type=='friend'" @click="addFriend">加为好友</div>
        <div class="add-btn" v-else @click="addGroup">加入群聊</div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFriend } from "@/api/friend";
import { addGroup } from "@/api/group";
import { Toast } from "vant";
export default {
  name: "Addfriend",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    addFriend() {
      let message = this.$xss(this.message);
      console.log(message);
      addFriend(this.$route.params.user_id, message).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        setTimeout(() => {
          this.$router.go(-1);
        }, 2500);
      });
    },
    addGroup() {
      let message = this.$xss(this.message);
      console.log(message);
      addGroup(this.$route.params.group_id, message).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        setTimeout(() => {
          this.$router.go(-1);
        }, 2500);
      });
    }
  },
  mounted() {
    console.log(this.$route.params);
    if (Reflect.ownKeys(this.$route.params).length == 0) {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  .wrapper {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 46px);
    overflow: hidden;
    img {
      filter: blur(3px);
      width: 100%;
      height: calc(100vh - 46px);
    }
  }
  .content {
    width: 100%;
    height: calc(100vh - 46px);
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    img {
      width: 180px;
      height: 180px;
      border: 3px solid #fff;
      border-radius: 10px;
      margin: 50px 0 30px 0;
    }
    .user-name {
      font-size: 23px;
      margin-bottom: 20px;
    }
    .message {
      width: 80%;
      padding: 15px 20px;
      box-sizing: border-box;
      background: rgba(243, 244, 246, 1);
      border-radius: 5px;
      height: 150px;
      border: none;
      outline: none;
      box-shadow: 0pt 6px 32px rgba(0, 0, 0, 0.1);
    }
    .add-btn {
      width: 85%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      text-align: center;
      margin-top: 20px;
      background: rgba(255, 228, 49, 1);
    }
  }
}
::v-deep em {
  font-style: normal;
}
</style>