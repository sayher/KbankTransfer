<template>
  <div class="login-wrap">
    <div class="login-header">
      <p>JDB - K Bank Found Transfer</p>
    </div>
    <div class="ms-login">
      <div class="ms-title">Login</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="User ID">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="Password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-edit"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm()"
            :loading="loading"
            :disabled="!param.username || !param.password"
          >
            Login
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      param: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "ກາລຸນາປ້ອນ ລະຫັດພະນັກງານ",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "ກາລຸນາປ້ອນ ລະຫັດຜ່ານ", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("user", ["LOGIN"]),
    submitForm() {
      // console.log(this.param);

      this.$refs.login.validate(valid => {
        if (valid) {
          this.loading = true;
          this.LOGIN(this.param)
            .then(result => {
              //console.log(result.success);
              if (result.success == true) {
                this.loading = false;
                this.$router.push("/");
                this.$message.success("ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ ລະບົບ");
              } else {
                 this.loading = false;
                 this.$message.error(result.message);
              }
            })
            .catch(error => {
              // console.log(error);
              this.loading = false;
              this.$message.error(error);
            });
        } else {
          this.$message.error("ກາລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ...!");
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-image: url(../../assets/img/unnamed.png);
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
   -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover; */
  background: #dadee473;
  font-family: "Noto Serif Lao";
}
.login-header {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  color: #1d5aca;
  font-family: "Noto Serif Lao";
  padding-top: 50px;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #1d5aca;
  border-bottom: 1px solid #1663d2;
  font-family: "Noto Serif Lao";
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 255);
  overflow: hidden;
  font-family: "Noto Serif Lao";
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
  font-family: "Noto Serif Lao";
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  font-family: "Noto Serif Lao";
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
