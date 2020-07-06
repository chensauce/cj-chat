<template>
  <div>
    <div class="navbar">
      <div class="nav-item left">
        <router-link class="nav-item right" tag="div" :to="{path:'/mycenter'}">
          <img class="my-avatar" :src="$store.getters.userInfo.avatar||null" alt="头像" />
        </router-link>
      </div>
      <div class="nav-item center">
        <img class="logo" src="@/assets/logo.png" alt="图标" />
      </div>
      <div class="nav-item right">
        <router-link tag="div" :to="{path:'/search'}">
          <van-icon name="search" size="25" />
        </router-link>
        <router-link tag="div" :to="{path:'/creategroup'}">
          <van-icon name="add-o" size="25" />
        </router-link>
      </div>
    </div>
    <div class="van-hairline--bottom"></div>
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="好友">
          <div class="message-list">
            <router-link
              :to="{path:'/friendrequest'}"
              tag="div"
            >
              <div class="list-item">
                <div class="avatar-view">
                  <img class="avatar" src="@/assets/add_friend.png" alt="头像" />
                  <!-- <span class="badge">99+</span> -->
                </div>
                <div class="message-view">
                  <div class="title-view">
                    <div class="title">好友请求</div>
                    <!-- <div class="time">上午 7:45</div> -->
                  </div>
                  <!-- <div class="message">xxbb请求添加您为好友</div> -->
                </div>
              </div>
            </router-link>
            <router-link
              tag="div"
              :to="{name:'Friendmessage',params: {friend_id:item.friend_id,avatar:item.avatar,nick_name:item.nick_name}}"
              class="list-item"
              v-for="(item,index) in friendList"
              :key="index"
            >
              <div class="avatar-view">
                <img class="avatar" :src="item.avatar" alt="头像" />
                <!-- <span class="badge">99+</span> -->
              </div>
              <div class="message-view">
                <div class="title-view">
                  <div class="title">{{item.nick_name}}</div>
                  <!-- <div class="time">上午 7:45</div> -->
                </div>
                <div class="message">{{item.signature}}</div>
              </div>
            </router-link>
          </div>
        </van-tab>
        <van-tab title="群聊">
          <div class="message-list">
            <router-link :to="{path:'/grouprequest'}" tag="div">
              <div class="list-item">
                <div class="avatar-view">
                  <img class="avatar" src="@/assets/add_group.png" alt="头像" />
                  <!-- <span class="badge">99+</span> -->
                </div>
                <div class="message-view">
                  <div class="title-view">
                    <div class="title">入群申请</div>
                    <!-- <div class="time">上午 7:45</div> -->
                  </div>
                  <!-- <div class="message">xxbb请求添加您为好友</div> -->
                </div>
              </div>
            </router-link>
            <router-link
              tag="div"
              :to="{name:'Groupmessage',params: {group_id:item.group_id,group_name:item.group_name}}"
              class="list-item"
              v-for="(item,index) in groupList"
              :key="index"
            >
              <div class="avatar-view">
                <img class="avatar" :src="item.avatar" alt="头像" />
                <!-- <span class="badge">99+</span> -->
              </div>
              <div class="message-view">
                <div class="title-view">
                  <div class="title">{{item.group_name}}</div>
                  <!-- <div class="time">上午 7:45</div> -->
                </div>
                <!-- <div class="message">好友的签名</div> -->
              </div>
            </router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getFriendList } from "@/api/friend";
import { getgroupList } from "@/api/group";
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      friendList: [],
      groupList: []
    };
  },
  methods: {},
  mounted() {
    getFriendList().then(res => {
      console.log(res);
      this.friendList = res.data.friendList;
    });
    getgroupList().then(res => {
      console.log(res);
      this.groupList = res.data.groupList;
    });
  }
};
</script>

<style lang="scss" scoped>
.body {
  padding: 0 20px;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  .nav-item {
    .my-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .logo {
      width: 90px;
      height: 30px;
    }
    &.right {
      display: flex;
      justify-content: center;
      align-items: center;
      & > div:first-child {
        margin-right: 15px;
      }
    }
  }
}
.list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  .avatar-view {
    position: relative;
    margin-right: 20px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    .badge {
      display: block;
      box-sizing: border-box;
      min-width: 17px;
      padding: 0 5px;
      height: 17px;
      line-height: 17px;
      text-align: center;
      border-radius: 17px;
      position: absolute;
      font-size: 12px;
      top: 0;
      right: 0;
      transform: translate3d(30%, -30%, 0);
      color: #fff;
      background: rgba(255, 93, 91, 1);
    }
  }
  .message-view {
    min-width: 0;
    flex: 1;
    height: 50px;
    font-family: "PingFangSC";
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 17px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }
      .time {
        font-size: 12px;
        color: rgba(39, 40, 50, 0.4);
        margin-left: 5px;
      }
    }
    .message {
      font-size: 14px;
      color: rgba(39, 40, 50, 0.6);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 5px;
    }
  }
}
</style>