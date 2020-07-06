<template>
  <div>
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #title>
        <span>创建群聊</span>
      </template>
    </van-nav-bar>
    <div class="body">
      <van-uploader :after-read="afterRead" :before-read="beforeRead">
        <img class="group-avatar" :src="avatar" alt="
          头像" />
        <div class="img-overlay" v-if="imgOverlayShow">
          <van-loading type="spinner" size="24px" />
        </div>
      </van-uploader>
      <input type="text" maxlength="10" class="group-name" v-model="groupName" placeholder="群名称" />
      <h2>好友</h2>
      <van-checkbox-group @change="con" v-model="result">
        <van-checkbox
          v-for="(item,index) in friendList"
          :key="index"
          :name="item.user_id"
          icon-size="24px"
          checked-color="#FFE431"
        >
          <div class="user-view">
            <img
              class="user-avatar"
              :src="item.avatar"
              alt="头像"
            />
            <div class="user-name">{{item.nick_name}}</div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
      <div class="footer-fill"></div>
    </div>
    <div class="footer">
      <div class="van-hairline--top"></div>
      <button class="create-btn" @click="createGroup">创建({{result.length}})</button>
    </div>
  </div>
</template>
<script>
import { createGroup } from "@/api/group";
import { getAllFriend } from "@/api/friend";
import { Toast } from "vant";
export default {
  name: "Creategroup",
  data() {
    return {
      imgOverlayShow: false,
      groupName: "",
      result: [],
      file: null,
      avatar: require("@/assets/group.png"),
      friendList: []
    };
  },
  methods: {
    con() {
      console.log(this.result);
    },
    //读取文件前校验
    beforeRead(file) {
      if (file.size > 5 * 1024 * 1024) {
        Toast("图片不能大于 5M");
        return false;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("请上传 jpg png 格式图片");
        return false;
      }
      return true;
    },
    //读取文件完成
    afterRead(file) {
      console.log(file);
      this.file = file;
      this.avatar = file.content;
    },
    createGroup() {
      if (this.groupName.length == 0) {
        Toast.fail("群名称不能为空");
        return;
      }
      if (!this.file) {
        Toast.fail("请上传一张群头像");
        return;
      }
      this.imgOverlayShow = true;
      let data = new FormData();
      data.append("files", this.file.file);
      data.append("group_name", this.groupName);
      data.append('inviteList',this.result)
      createGroup(data).then(res => {
        console.log(res);
        Toast.success(res.data.message);
        this.imgOverlayShow = false;
      });
    }
  },
  mounted() {
    getAllFriend().then(res => {
      console.log(res);
      this.friendList = res.data.friendList;
    });
  }
};
</script>

<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  padding: 0 20px;
}
::v-deep .van-uploader {
  display: flex;
  justify-content: center;
  margin: 40px auto;
}
.group-avatar {
  display: block;
  width: 100px;
  height: 90px;
  border-radius: 5px;
  box-shadow: 0pt 8px 20px 0 rgba(39, 40, 50, 0.1);
}
.img-overlay {
  width: 100px;
  height: 90px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.group-name {
  width: 100%;
  border: none;
  outline: none;
  background: rgba(243, 244, 246, 1);
  color: #000;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  text-align: center;
}
.user-view {
  display: flex;
  justify-items: center;
  align-items: center;
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin: 0 10px;
  }
  .user-name {
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
::v-deep .van-checkbox {
  margin: 15px 0;
}
::v-deep .van-checkbox__label {
  flex: 1;
  min-width: 0;
}
.footer-fill {
  height: 70px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  background: #fff;
  .create-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #ffe431;
    border: none;
    outline: none;
    margin: 10px 0 20px 0;
    border-radius: 5px;
  }
}
</style>