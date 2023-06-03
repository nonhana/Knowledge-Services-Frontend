<!-- eslint-disable prettier/prettier -->
<template>
  <div name="loginWindow" class="loginWindow-wrap">
    <div v-if="status">
      <div class="title">
        <font>登录</font>
      </div>
      <div class="form">
        <div style="margin: 40px 0 0 0">
          <div>
            <font>账号</font>
            <input
              type="text"
              placeholder="请输入您的账号"
              v-model="loginForm.account"
            />
          </div>
          <div style="margin: 20px 0 0 0">
            <font>密码</font>
            <input
              type="password"
              placeholder="请输入您的密码"
              v-model="loginForm.password"
            />
          </div>
        </div>
      </div>
      <div class="register" @click="status = !status">
        <font>还未注册？点击此处注册！</font>
      </div>
      <div class="submit" @click="login()">
        <div>
          <font>登录</font>
        </div>
      </div>
    </div>

    <div v-if="!status">
      <div class="title">
        <font>注册</font>
      </div>
      <div class="form">
        <div style="margin: 40px 0 0 0">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <font>用户名</font>
            <input
              type="text"
              placeholder="请填写您的用户名"
              v-model="registerForm.username"
            />
          </div>
          <div
            style="
              margin: 20px 0 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <font>账号</font>
            <input
              type="text"
              placeholder="请填写您的账号"
              v-model="registerForm.account"
            />
          </div>
          <div
            style="
              margin: 20px 0 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <font>邮箱</font>
            <input
              type="text"
              placeholder="请填写您的邮箱地址"
              v-model="registerForm.email"
            />
          </div>
          <div
            style="
              margin: 20px 0 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <font>密码</font>
            <input
              type="password"
              placeholder="请输入您的密码"
              v-model="registerForm.password"
            />
          </div>
        </div>
      </div>
      <div class="register" @click="status = !status">
        <font>返回</font>
      </div>
      <div class="submit" @click="register()">
        <div>
          <font>注册</font>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { ref,defineEmits } from "vue";
import { userLoginAPI, userRegisterAPI } from "../../api/user";
import { ElNotification } from 'element-plus'
import router from "../../router";

// 定义子传父的事件
const emits = defineEmits(["loginSuccess"]);

const loginForm = ref({
  account: "",
  password: "",
});

const registerForm = ref({
  username: "",
  account: "",
  email: "",
  password: "",
});

const status = ref(true);

const login = () => {
  if (!loginForm.value.account || !loginForm.value.password) {
    ElNotification({
      title: '登录失败！',
      message: '账号/密码未填好！',
      type: 'error'
    })
  } else {
    userLoginAPI({ ...loginForm.value }).then((res) => {
      if (res.data.result_code === 1) {
        if (res.data.user_info === null) {
          ElNotification({
            title: '登录失败！',
            message: '该账号还没有注册哦，请先注册！',
            type: 'error'
          })
        } else {
          ElNotification({
            title: '登录失败！',
            message: res.data.result_msg,
            type: 'error'
          })
        }
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_info", JSON.stringify(res.data.user_info));
        ElNotification({
          title: '登录成功！',
          message: `${res.data.user_info.user_name}，欢迎回来！`,
          type: 'success'
        })
        emits("loginSuccess", true);
        router.push({ name: "home" });
      }
    });
  }
};

const register = () => {
  if (
    registerForm.value.username &&
    registerForm.value.account &&
    registerForm.value.email &&
    registerForm.value.password
  ) {
    userRegisterAPI(registerForm.value).then((res) => {
      if (res.data.result_code === 1) {
        ElNotification({
          title: '注册失败！',
          message: res.data.result_msg,
          type: 'error'
        })
      } else {
        status.value = !status.value;
        ElNotification({
          title: '注册成功！',
          message: '快快去登录吧~',
          type: 'success'
        })
      }
    });
  } else {
    ElNotification({
      title: '注册失败！',
      message: '请将注册信息填写完整！',
      type: 'error'
    })
  }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped lang="less">
.loginWindow-wrap {
  position: relative;
  padding: 30px;
  margin: 200px auto;
  width: 320px;
  background-color: #fff;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.loginWindow-wrap:hover {
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.32);
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.title font {
  font-family: SourceHanSansCN-Medium;
  font-size: 24px;
  font-weight: 500;
  color: #3d3d3d;
}

.form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form font {
  font-family: SourceHanSansCN-Medium;
  font-size: 18px;
  font-weight: 500;
  line-height: 17px;
  color: #3d3d3d;
}

.form input {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 0.5px #ff8200 solid;
  background-color: #f5f5f5;
  margin: 0 0 0 20px;
}

.submit {
  width: 100%;
  margin: 30px 0 0 0;
  display: flex;
  justify-content: center;
}

.submit div {
  width: 70px;
  height: 40px;
  background-color: #ff820088;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit div:hover {
  background-color: #ff8200;
}

.submit div font {
  font-family: SourceHanSansCN-Medium;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.register {
  width: 100%;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.register font {
  font-family: SourceHanSansCN-Medium;
  font-size: 10px;
  font-weight: 500;
  line-height: 17px;
  color: #3d3d3d;
  transition: all 0.2s;
}

.register:hover font {
  color: #ff8200;
}
</style>
