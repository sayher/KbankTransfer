<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-check"></i> Revert Transection
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>基本表单</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <modal v-if="isIdle" />
    <div class="container">
      <el-row>
        <el-col :span="12">
          <el-form
            :model="RevertTransetion"
            ref="RevertTransetion"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="RefNo:" prop="TRN_REF_NO">
              <el-input
                v-model.trim="RevertTransetion.TRN_REF_NO"
                placeholder="Enter Transection Reference Number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Revert</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-alert
            v-if="this.successStatus"
            title="Transfer Successfully"
            type="success"
            :description=" 'RefNo : '+ this.trn_ref +' | '+ this.messageAlert "
            show-icon
          ></el-alert>
          <el-alert
            v-if="this.errStatus"
            :title="this.messageAlert"
            type="error"
            :description=" this.trn_ref +' | '+this.messageAlert"
            show-icon
          ></el-alert>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import loading from "vue-loading-overlay";
import modal from "_c/modal/modal";
import { mapActions, mapState } from "vuex";
export default {
  name: "reverttransection",
  data() {
    return {
      RevertTransetion: {
        USERID: null,
        TRN_REF_NO: null
      },
      isLoading: false,
      successStatus: false,
      errStatus: false,
      messageAlert: null,
      trn_ref: null,
      rules: {
        TRN_REF_NO: [
          {
            required: true,
            message: "Please enter reference number",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    modal,
    loading
  },
  computed: {
    ...mapState("user", ["UserInput"]),
    getUserID() {
      return this.UserInput.username;
    },
    isIdle() {
      return this.$store.state.idleVue.isIdle;
      // return this.isAppIdle ? "aaaaaaaa" : 'Hello'
    }
  },
  methods: {
    ...mapActions("reverttransection", ["REVERT_TRANSACTION"]),
    onSubmit() {
      let Revert = {
        USERID: this.getUserID,
        TRN_REF_NO: this.RevertTransetion.TRN_REF_NO
      };
      // console.log(Revert);

      this.successStatus = false;
      this.errStatus = false;
      this.$refs.RevertTransetion.validate(valid => {
        if (valid) {
          this.$confirm("Revert this transection..?", "Confirm", {
            confirmButtonText: "YES",
            cancelButtonText: "NO",
            type: "warning"
          }).then(() => {
            this.isLoading = true;
            this.REVERT_TRANSACTION(Revert)
              .then(result => {
                //console.log(result);
                this.messageAlert = result.message;
                this.trn_ref = result.data.trn_ref_no;
                if (result.success == true) {
                  this.isLoading = false;
                  this.successStatus = true;
                  this.errStatus = false;
                  this.$message.success(this.messageAlert);
                } else {
                  this.isLoading = false;
                  this.successStatus = false;
                  this.errStatus = true;
                  this.$messageAlert.error(this.messageAlert);
                }
              })
              .catch(err => {
                this.successStatus = false;
                this.isLoading = false;
                this.errStatus = true;
                this.$message.error(this.messageAlert);
              });
          });
        } else {
          this.$message.error("Please Enter Valid Value");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>