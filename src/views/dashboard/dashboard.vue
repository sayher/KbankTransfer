<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-home"></i> Home
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>基本表单</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="hover">
           <div >
          <div class="user-info">
            <img src="@/assets/img/user.png" alt class="user-avatar" />
            <div class="user-info-cont" >
              <div class="user-info-name" v-for=" (user, i) in GET_USERINFO" :key="i">{{user.fullname}}</div>
            </div>
          </div>
          <div class="user-info-list">
            ID:
            <span>{{UserInput.username}}</span>
          </div>
          <!-- <div class="user-info-list">
            BRANCH:
            <span>{{user.BRANCH_CODE}}</span>
          </div>
          <div class="user-info-list">
            USER TYPE:
            <span>{{user.USER_TYPE}}</span>
          </div>-->
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="container" >
          <el-row :gutter="30" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="9" class="card-panel-col">
              <div class="card-panel" @click="newListRoute('/transfer')">
                <div class="card-panel-icon-wrapper icon-people">
                  <img class="card-panel-icon" src="@/assets/img/Untitled-1-07-512.png" width="50" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">Transfer</div>
                  <div class="card-panel-text">K Bank</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="9" class="card-panel-col">
              <div class="card-panel" @click="newListRoute('/statement')">
                <div class="card-panel-icon-wrapper icon-message">
                  <i class="el-icon-document card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">Statement</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="9" class="card-panel-col">
              <div class="card-panel" @click="newListRoute('/reverttransection')">
                <div class="card-panel-icon-wrapper icon-money">
                  <i class="el-icon-sold-out card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">Revert</div>
                  <div class="card-panel-text">Transection</div>
                </div>
              </div>
            </el-col>
            <!-- <el-col :xs="12" :sm="12" :lg="9" class="card-panel-col">
              <div class="card-panel" @click="logout">
                <div class="card-panel-icon-wrapper icon-shopping">
                  <i class="el-icon-d-arrow-right card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">ອອກຈາກລະບົບ</div>
                </div>
              </div>
            </el-col> -->
          </el-row>
        </div>
      </el-col>
    </el-row>
    <modal v-if="isIdle" />
  </div>
</template>

<script>
/* eslint-disable */
import modal from "_c/modal/modal";
import { mapActions, mapGetters,mapState } from "vuex";
export default {
  name:'dashboard',
  components: {
    modal
  },
  computed: {
    ...mapGetters('user',['GET_USERINFO']),
    ...mapState("user", ["UserInput"]),
    isIdle() {
      return this.$store.state.idleVue.isIdle;
      // return this.isAppIdle ? "aaaaaaaa" : 'Hello'
    }

  },
  methods: {
    ...mapActions(["LOGOUT"]),
    newListRoute(path) {
      this.$router.push(path);
    },
    logout() {
      this.LOGOUT().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #e2e2e2;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 20px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.user-info-cont div:first-child {
  font-size: 14px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 30px;
}
</style>