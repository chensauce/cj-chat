<template>
  <div>
    <van-nav-bar title="个人中心" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" />
      </template>
      <template #right>
        <p style="color:rgba(255,93,91,1)" @click="logout">退出登录</p>
      </template>
    </van-nav-bar>
    <div class="body">
      <van-cell>
        <template #title>
          <span class="custom-title">头像</span>
          <van-uploader :after-read="afterRead" :before-read="beforeRead">
            <img class="avatar" :src="avatar" alt="
          头像" />
            <div class="img-overlay" v-if="imgOverlayShow">
              <van-loading type="spinner" size="24px" />
            </div>
          </van-uploader>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="custom-title">昵称</span>
          <input type="text" class="message" v-model="form.nick_name" />
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="custom-title">签名</span>
          <input type="text" class="message" v-model="form.signature" />
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <span class="custom-title">性别</span>
          <van-dropdown-menu>
            <van-dropdown-item v-model="form.sex" :options="sexOption" />
          </van-dropdown-menu>
        </template>
      </van-cell>
      <van-cell is-link @click="showDatePicker=true">
        <template #title>
          <span class="custom-title">生日</span>
          <div class="message">{{form.birthday}}</div>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="custom-title">电话</span>
          <input type="text" class="message" v-model="form.tel" />
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="custom-title">邮箱</span>
          <input type="text" class="message" v-model="form.email" />
        </template>
      </van-cell>
      <button class="save-btn" @click="save">保存信息</button>
    </div>
    <van-action-sheet v-model="showDatePicker" :round="false" :close-on-click-overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="getTime"
        @cancel="showDatePicker=false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { updateUserInfo, updateAvatar } from "@/api/user";
export default {
  name: "Mycenter",
  data() {
    return {
      imgOverlayShow: false,
      showDatePicker: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 11, 30),
      currentDate: new Date(),
      form: {
        nick_name: "",
        signature: "",
        sex: 0,
        birthday: "",
        tel: "",
        email: "",
        avatar: ""
      },
      avatar: "",
      sex: 0,
      sexOption: [
        { text: "男", value: 0 },
        { text: "女", value: 1 }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    getTime(value) {
      let time = new Date(value);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let date = time.getDate();
      date = date < 10 ? "0" + date : date;
      this.form.birthday = `${year}-${month}-${date}`;
      this.showDatePicker = false;
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
      //开始上传
      let data = new FormData();
      data.append("files", file.file);
      this.avatar = file.content;
      this.imgOverlayShow = true;
      updateAvatar(data).then(res => {
        this.imgOverlayShow = false;
        this.$store.dispatch("getUserInfo");
      });
    },
    //保存信息
    save() {
      updateUserInfo(this.form).then(res => {
        Toast.success(res.data.message);
        this.$store.dispatch("getUserInfo");
      });
    },
    logout() {
      this.$store.dispatch("logout").then(res => {
        location.reload();
      });
    }
  },
  mounted() {
    for (let key in this.$store.getters.userInfo) {
      this.form[key] = this.$store.getters.userInfo[key];
    }
    this.avatar = this.$store.getters.userInfo.avatar;
  }
};
</script>
<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  .van-cell {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .van-cell__title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 0;
    .custom-title {
      margin-right: 20px;
      font-size: 16px;
      position: relative;
    }
    .message {
      flex: 1;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(39, 40, 50, 0.6);
      border: none;
      outline: none;
    }
  }
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 10px;
  }
  .img-overlay {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .van-uploader__wrapper {
    line-height: auto;
  }
}
.save-btn {
  display: block;
  width: 250px;
  height: 30px;
  line-height: 30px;
  border-radius: 30px;
  border: none;
  outline: none;
  margin: 40px auto;
  background: rgba(255, 228, 49, 1);
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 25px 16px -18px rgba(255, 228, 49, 0.4);
  font-family: "PingFangSC";
  &:active {
    background: darken(rgba(255, 228, 49, 1), 10);
  }
}
::v-deep .van-dropdown-menu__bar {
  height: auto !important;
  background-color: transparent !important;
  box-shadow: none !important;
  .van-dropdown-menu__title {
    color: rgba(39, 40, 50, 0.6) !important;
  }
}
</style>