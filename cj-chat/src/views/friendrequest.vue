<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <span>好友请求</span>
      </template>
    </van-nav-bar>
    <div class="body">
      <div class="list">
        <div class="list-item" v-for="(item,index) in friendRequestList" :key="index">
          <p class="title">请求添加您为好友</p>
          <div class="center">
            <button class="btn btn-refuse" @click="refuseFriendRequest(item.user_id)">拒绝</button>
            <div class="user-info">
              <img class="avatar" :src="item.avatar" alt="头像" />
              <div>
                <p class="user-name">{{item.nick_name}}</p>
                <p class="time">{{getTime(item.time)}}</p>
              </div>
            </div>
            <button class="btn btn-agree" @click="agreeFriendRequest(item.user_id)">同意</button>
          </div>
          <div class="message">留言：{{item.apply_message}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFriendRequestList,
  refuseFriendRequest,
  agreeFriendRequest
} from "@/api/friend";
import { getTime } from "@/utils/getTime";
import { Toast } from "vant";
export default {
  name: "Friendrequest",
  data() {
    return {
      active: 0,
      friendRequestList: []
    };
  },
  methods: {
    getTime(time) {
      return getTime(time);
    },
    //加载数据
    load() {
      getFriendRequestList().then(res => {
        console.log(res);
        this.friendRequestList = res.data.friendRequestList;
      });
    },
    //拒绝好友请求
    refuseFriendRequest(user_id) {
      refuseFriendRequest(user_id).then(res => {
        console.log(res);
        Toast.fail(res.data.message);
        this.load();
      });
    },
    //同意好友请求
    agreeFriendRequest(user_id) {
      agreeFriendRequest(user_id).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        this.load();
      });
    },
  },
  mounted() {
    this.load();
  }
};
</script>

<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  padding: 0 20px;
}
.list-item {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0pt 12px 32px -4px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  .title {
    font-size: 14px;
    color: #aaa;
    text-align: center;
    margin: 5px 0;
  }
  .center {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn {
      width: 80px;
      height: 30px;
      border-radius: 30px;
      line-height: 30px;
      border: none;
      outline: none;
      &.btn-refuse {
        background: rgba(255, 93, 91, 0.1);
        color: rgba(255, 93, 91, 1);
      }
      &.btn-agree {
        background: rgba(255, 228, 49, 1);
      }
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        text-align: center;
        margin: 0;
      }
      .user-name {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0 0 0;
      }
      .time {
        font-size: 12px;
        color: rgba(39, 40, 50, 0.4);
        margin: 5px 0 20px 0;
      }
    }
  }
}
.message {
  box-sizing: border-box;
  width: 100%;
  background: rgba(243, 244, 246, 1);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>