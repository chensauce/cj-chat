<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <div class="search-bar">
          <input type="text" v-model="input" />
          <van-icon name="search" size="20" color="#777" />
        </div>
      </template>
      <template #right>
        <button class="search-btn" @click="search">搜索</button>
      </template>
    </van-nav-bar>
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="用户">
          <div class="user">
            <h2>用户</h2>
            <div class="list">
              <div class="list-item" v-for="(item) in userList" :key="item.user_id">
                <img class="avatar" :src="item.avatar" alt="头像" />
                <div class="name" v-html="item.nick_name"></div>
                <router-link
                  tag="button"
                  class="btn btn-send"
                  v-if="item.state>1"
                  :to="{name:'Message', params: {user_id:item.user_id,type:'friend',avatar:item.avatar,nick_name:item.nick_name}}"
                >发消息</router-link>
                <button class="btn btn-add btn-disabled" disabled v-else-if="item.state==1">申请中</button>
                <router-link
                  tag="button"
                  class="btn btn-add"
                  v-else
                  :to="{name:'Addfriend', params: {user_id:item.user_id,type:'friend',avatar:item.avatar,nick_name:item.nick_name}}"
                >加好友</router-link>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="群组">
          <div class="group">
            <h2>群组</h2>
            <div class="list">
              <div class="list">
                <div class="list-item" v-for="(item) in groupList" :key="item.group_id">
                  <img class="avatar" :src="item.avatar" alt="头像" />
                  <div class="name" v-html="item.group_name"></div>
                  <router-link
                    tag="button"
                    class="btn btn-send"
                    v-if="item.state>1"
                    :to="{name:'Message', params: {group_id:item.group_id,type:'group',avatar:item.avatar,nick_name:item.group_name}}"
                  >发消息</router-link>
                  <button class="btn btn-add btn-disabled" disabled v-else-if="item.state==1">申请中</button>
                  <router-link
                    tag="button"
                    class="btn btn-add"
                    v-else
                    :to="{name:'Addfriend', params: {group_id:item.group_id,type:'group',avatar:item.avatar,nick_name:item.group_name}}"
                  >加入群聊</router-link>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { searchFriend } from "@/api/friend";
import { searchGroup } from "@/api/group";
export default {
  name: "Search",
  data() {
    return {
      active: 0,
      input: "",
      userList: [],
      groupList: []
    };
  },
  methods: {
    search() {
      if(this.input.length==0){
        return
      }
      searchFriend(this.input).then(res => {
        console.log(res);
        this.userList = res.data.userList;
      });
      searchGroup(this.input).then(res => {
        console.log(res);
        this.groupList = res.data.groupList;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
  max-width: 100%;
  margin: 0;
  margin-left: 50px;
}
.search-bar {
  width: 250px;
  background: rgba(243, 244, 246, 1);
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input {
    width: 210px;
    border: none;
    outline: none;
    background: rgba(243, 244, 246, 1);
    margin-left: 5px;
    font-size: 14px;
  }
}
.search-btn {
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
}
::v-deep em {
  font-style: normal;
  color: rgba(74, 170, 255, 1);
}
.body {
  padding: 0 20px;
}

.list-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    font-size: 17px;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 20px;
  }
  .btn {
    border: none;
    outline: none;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    border-radius: 25px;
    margin-left: 10px;
    &.btn-send {
      background: rgba(255, 228, 49, 1);
    }
    &.btn-add {
      background: rgba(74, 170, 255, 0.1);
      color: rgba(74, 170, 255, 1);
    }
    &.btn-disabled {
      background: #ccc;
      color: #777;
    }
  }
}
</style>