<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <span>入群申请</span>
      </template>
    </van-nav-bar>
    <div class="body">
          <div class="list">
            <div class="list-item" v-for="(item,index) in groupRequestList" :key="index">
              <p class="title">请求加入群聊:{{item.group_name}}</p>
              <div class="center">
                <button
                  class="btn btn-refuse"
                  @click="refuseGroupRequest(item.group_id,item.user_id)"
                >拒绝</button>
                <div class="user-info">
                  <img class="avatar" :src="item.avatar" alt="头像" />
                  <div>
                    <p class="user-name">{{item.nick_name}}</p>
                    <p class="time">{{getTime(item.time)}}</p>
                  </div>
                </div>
                <button
                  class="btn btn-agree"
                  @click="agreeGroupRequest(item.group_id,item.user_id)"
                >同意</button>
              </div>
              <div class="message">留言：{{item.apply_message}}</div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import {
  getGroupRequestList,
  refuseGroupRequest,
  agreeGroupRequest
} from "@/api/group";
import { getTime } from "@/utils/getTime";
import { Toast } from "vant";
export default {
  name: "Friendrequest",
  data() {
    return {
      active: 0,
      groupRequestList: []
    };
  },
  methods: {
    getTime(time) {
      return getTime(time);
    },
    //加载数据
    load() {
      getGroupRequestList().then(res => {
        console.log(res);
        this.groupRequestList = res.data.groupRequestList;
      });
    },
    //拒绝进群请求
    refuseGroupRequest(group_id, user_id) {
      refuseGroupRequest(group_id, user_id).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        this.load();
      });
    },
    //同意进群请求
    agreeGroupRequest(group_id, user_id) {
      agreeGroupRequest(group_id, user_id).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        this.load();
      });
    }
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