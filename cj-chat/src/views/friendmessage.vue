<template>
  <div style="background: rgb(238, 238, 238);min-height:100vh">
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <span>{{$route.params.nick_name}}</span>
      </template>
      <template #right>
        <p style="color:rgba(255,93,91,1)" @click="deleteFriend">删除好友</p>
      </template>
    </van-nav-bar>
    <div class="body">
      <div class="list">
        <div
          class="list-item"
          :class="item.isMyMessage?'list-item-right':'list-item-left'"
          v-for="(item,index) in messageList"
          :key="index"
        >
          <img v-if="!item.isMyMessage" :src="$route.params.avatar" alt="头像" />
          <div
            class="message-view"
            :class="item.isMyMessage?'message-view-right':'message-view-left'"
          >
            <p class="time">{{getTime(item.time)}}</p>
            <div
              class="message"
              :class="item.isMyMessage?'message-right':'message-left'"
            >{{item.message}}</div>
          </div>
          <img v-if="item.isMyMessage" :src="$store.getters.userInfo.avatar" alt="头像" />
        </div>
      </div>
      <div style="height:50px"></div>
    </div>
    <div class="footer">
      <input type="text" v-model="message" />
      <button @click="sendMessage" :class="{'disabled':isDisabled}">发送</button>
    </div>
  </div>
</template>

<script>
import { deleteFriend } from "@/api/friend";
import { getFriendMessageList } from "@/api/friendMessage";
import { Toast } from "vant";
import { getTime } from "@/utils/getTime";
export default {
  name: "Friendmessage",
  data() {
    return {
      message: "",
      messageList: []
    };
  },
  computed: {
    isDisabled() {
      return this.message == 0;
    }
  },
  watch: {
    messageList() {
      this.$nextTick(() => {
        window.scroll({
          top: document.documentElement.scrollHeight,
          behavior: "smooth"
        });
      });
    }
  },
  methods: {
    getTime(time) {
      return getTime(time);
    },
    deleteFriend() {
      deleteFriend(this.$route.params.friend_id).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        setTimeout(() => {
          this.$router.replace("/");
        }, 2500);
      });
    },
    sendMessage() {
      if (this.message.length == 0) {
        return;
      }
      this.$socket.emit("sendFriendMessage", {
        message: this.message,
        dispatcher_id: this.$store.getters.userInfo.user_id,
        receiver_id: this.$route.params.friend_id
      });
      this.$nextTick(() => {
        this.message = "";
      });
    }
  },
  async mounted() {
    console.log(this.$route.params);
    if (Reflect.ownKeys(this.$route.params).length == 0) {
      this.$router.replace("/");
    }
    await this.$socket.open();
    this.$socket.emit("join", {
      user_id: this.$store.getters.userInfo.user_id
    });
    getFriendMessageList(this.$route.params.friend_id).then(res => {
      console.log(res);
      res.data.friendMessageList.forEach(item => {
        item.dispatcher_id == this.$store.getters.userInfo.user_id
          ? (item.isMyMessage = true)
          : (item.isMyMessage = false);
      });
      this.messageList = res.data.friendMessageList;
      this.$nextTick(() => {
        window.scroll({
          top: document.documentElement.scrollHeight,
          behavior: "smooth"
        });
      });
    });

    //接受好友发来的消息
    this.sockets.subscribe("receivedFriendMessage", data => {
      console.log("receivedFriendMessage", data);
      console.log(data);
      data.isMyMessage = false;
      this.messageList.push(data);
    });

    //接受自己发的消息
    this.sockets.subscribe("dispatchMessage", data => {
      console.log("dispatchMessage", data);
      data.isMyMessage = true;
      this.messageList.push(data);
    });
  },
  destroyed() {
    this.sockets.unsubscribe("receivedFriendMessage");
    this.sockets.unsubscribe("dispatchMessage");
    this.$socket.close();
  }
};
</script>

<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  padding: 0 20px;
}
.list {
  overflow: hidden;
}
.list-item {
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  &-left {
    justify-content: flex-start;
  }
  &-right {
    justify-content: flex-end;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .message-view {
    display: flex;
    flex-direction: column;
    position: relative;
    &-left {
      align-items: flex-start;
      margin-left: 15px;
    }
    &-right {
      align-items: flex-end;
      margin-right: 15px;
    }
    .time {
      margin: 0 0 3px 0;
      font-size: 12px;
      color: rgba(39, 40, 50, 0.3);
    }
    .message {
      flex: 1;
      padding: 10px 10px;
      font-size: 15px;
      word-break: break-all;
      word-wrap: break-word;
      &-left {
        background: #fff;
        border-radius: 0px 10px 10px 10px;
      }
      &-right {
        background: rgba(255, 228, 49, 1);
        border-radius: 10px 0 10px 10px;
      }
    }
  }
}
.footer {
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  background: rgb(244, 244, 244);
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    flex: 1;
    height: 30px;
    border: none;
    outline: none;
    margin-right: 20px;
    font-size: 15px;
    border-radius: 5px;
    padding-left: 10px;
  }
  button {
    border: none;
    outline: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(255, 228, 49, 1);
    &.disabled {
      background: #ccc;
      color: #777;
    }
  }
}
</style>