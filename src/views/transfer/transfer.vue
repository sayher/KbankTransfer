<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/transfer'}">
          <i class="el-icon-refresh"></i> Transfer
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="confirmTransferInfo">Confirm Transfer</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <modal v-if="isIdle" />

    <div class="container">
      <div v-if="!confirmTransferInfo">
        <el-form :model="transfer" ref="transfer" :rules="rules" id="transfer" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Bank" prop="receivingBankCode">
                <el-select
                  value-key="id"
                  v-model="transfer.receivingBankCode"
                  filterable
                  clearable
                  placeholder="ເລືອກທະນາຄານປາຍທາງ"
                  @change="onchange"
                >
                  <el-option
                    v-for="item in GET_BANKLIST"
                    :key="item.ID"
                    :label="item.BANK_NAME"
                    :value="item.BANK_CODE"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="ACC NO." prop="receivingAcctId">
                <el-input v-model.trim="transfer.receivingAcctId" placeholder="ປ້ອນເລກບັນຊີປາຍທາງ"></el-input>
              </el-form-item>
              <el-form-item label="Amount(THB)" prop="txnAmount">
                <VueNumeric
                  class="form-control"
                  separator=","
                  v-bind:precision="2"
                  v-model.trim="transfer.txnAmount"
                ></VueNumeric>
              </el-form-item>

              <el-form-item label="Receiving Name" prop="receivingCustName">
                <el-input
                  v-model="transfer.receivingCustName"
                  clearable
                  placeholder="ຊື່ ນາມສະກຸນເຈົ້າຂອງບັນຊີປາຍທາງ ຫຼຶ ຜູ້ຮັບປາຍທາງ"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ValidateTransfer">Validate Transfer</el-button>
                <el-button type="warning" @click="Cancel">Cancel</el-button>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Account Type" prop="receivingAcctType">
                <el-select
                  v-model="transfer.receivingAcctType"
                  filterable
                  clearable
                  placeholder=" Receiving account Type"
                  @change="onchangeAccType"
                >
                  <el-option
                    v-for="item in GET_ACC_TYPE"
                    :key="item.ID"
                    :label="item.DESCRIPTION"
                    :value="item.RECEIVE_ACCOUNT_TYPE_ID"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Ordering By" prop="orderingCustName">
                <el-input
                  v-model="transfer.orderingCustName"
                  clearable
                  placeholder="ຊື່ ນາມສະກູນ ຜູ້ໂອນ(ຕົ້ນທາງ)"
                />
              </el-form-item>
              <el-form-item label="Ordering address">
                <el-input
                  v-model="transfer.orderingAddress"
                  clearable
                  placeholder="ທີ່ຢູ່ຜູ້ໂອນ(ຕົ້ນທາງ)"
                />
              </el-form-item>
              <el-alert
                v-if="this.successStatus"
                title="Transfer Successfully"
                type="success"
                :description=" 'RefNo : '+ this.orderingRefNo +' | '+ this.messageAlert "
                show-icon
              ></el-alert>
              <el-alert
                v-if="this.errStatus"
                :title="this.errorDesc"
                type="error"
                :description=" this.orderingRefNo +' | '+ this.errorCode +' | '+this.messageAlert"
                show-icon
              ></el-alert>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="confirmTransferInfo">
        <!-- <confirmTransfer v-on:childToParent="cancelValidateInfo" /> -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <el-divider content-position="left">(From)</el-divider>

              <div class="text item">
                <strong>Customer Name :</strong>
                {{validateInfo.orderingCustName}}
              </div>
              <div class="text item">
                <strong>Address:</strong>
                {{validateInfo.orderingAddress}}
              </div>
              <div class="text item">
                <strong>Nationality:</strong>
                {{validateInfo.orderingCustNationality}}
              </div>

              <el-divider content-position="left">(To)</el-divider>
              <div class="text item">
                <strong>Bank:</strong>
                {{bankName}}
              </div>

              <div class="text item">
                <strong>Account No:</strong>
                {{validateInfo.receivingAcctId}}
              </div>
              <div class="text item">
                <strong>Account Type:</strong>
                {{accountTypeName}}
              </div>
              <div class="text item">
                <strong>Receiving By:</strong>
                {{validateInfo.receivingCustName}}
              </div>
              <div class="text item">
                <strong>Amount:</strong>
                {{validateInfo.txnAmount | numFormat('0,000.00')}} THB
              </div>
              <div class="text item">
                <strong>Fee:</strong>
                {{feeAmount | numFormat('0,000.00') }} THB
              </div>
            </el-card>
          </el-col>
          <!-- Form input to confirm transfer -->
          <el-col :span="12">
            <el-form
              :model="confirmTransfer"
              ref="confirmTransfer"
              :rules="rulesConfirm"
              label-width="120px"
            >
              <!-- <el-divider></el-divider> -->
              <el-form-item label="Purpose" prop="purposeCode">
                <el-select
                  v-model="confirmTransfer.purposeCode"
                  filterable
                  clearable
                  placeholder="Purpose list"
                >
                  <el-option
                    v-for="item in GET_PURPOSELIST"
                    :key="item.ID"
                    :label="item.PURPOSE_DESCRIPTION"
                    :value="item.PURPOSE_CODE"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Ordering Type" prop="orderingCustIdType">
                <el-select
                  v-model="confirmTransfer.orderingCustIdType"
                  clearable
                  placeholder="National ID or Passport"
                >
                  <el-option
                    v-for="item in orderingCustIdTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="ID" prop="orderingCustId">
                <el-input
                  v-model.trim="confirmTransfer.orderingCustId"
                  clearable
                  placeholder="ປ້ອນເລກ National ID or Passport ID"
                ></el-input>
              </el-form-item>
              <el-form-item label="Customer Type" prop="orderingCustType">
                <el-select
                  v-model="confirmTransfer.orderingCustType"
                  placeholder="ເລືອກປະເພດລຸກຄ້າ"
                  clearable
                >
                  <el-option
                    v-for="item in CustType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Branch Code" prop="branchCode">
                <el-input
                  v-model.trim="confirmTransfer.branchCode"
                  placeholder="ປ້ອນລະຫັດໜ່ອຍຂອງທ່ານ"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input type="textarea" v-model="confirmTransfer.otherInfo" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ConfirmTransferBalance">Confirm Transfer</el-button>
                <el-button type="warning" @click="cancelConfirmtransfer">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import modal from "_c/modal/modal";
import { mapActions, mapGetters, mapState } from "vuex";
import loading from "vue-loading-overlay";
//import confirmTransfer from "./confirmTransfer";
import VueNumeric from "vue-numeric";
export default {
  name: "transfer",

  data() {
    return {
      successStatus: false,
      errStatus: false,
      errorDesc: null,
      descriptionAlert: null,
      errorStatus: null,
      errorCode: null,
      transactionStatus: null,
      messageAlert: null,
      orderingRefNo: null,
      transfer: {
        orderingAddress: null,
        txnAmount: 0,
        txnCurrencyCode: "THB",
        orderingCustName: null,
        receivingBankCode: null,
        orderingCntyOfResidence: "LA",
        receivingAcctType: null,
        receivingAcctId: null,
        receivingCustName: null,
        orderingCustNationality: "Laos",
        receivingCntyCode: "764"
      },
      user: null,
      confirmTransferInfo: false,
      isLoading: false,
      // GET_BANKLIST:[],
      //===============
      confirmTransfer: {
        orderingCustIdType: null,
        orderingCustId: null,
        purposeCode: null,
        orderingCustType: null,
        branchCode: null,
        otherInfo: ""
      },

      orderingCustIdTypeOptions: [
        {
          value: "1",
          label: "National ID"
        },
        {
          value: "2",
          label: "Passport"
        }
      ],
      CustType: [
        {
          value: "IND",
          label: "Individal"
        },
        {
          value: "COR",
          label: "Corporation"
        }
      ],
      rules: {
        receivingBankCode: [
          {
            required: true,
            message: "Please select receiving bank",
            trigger: "blur"
          }
        ],
        receivingAcctId: [
          {
            required: true,
            message: "Please enter receiving ACC No.",
            trigger: "blur"
          }
        ],
        receivingAcctType: [
          {
            required: true,
            message: "Please select receiving ACC type",
            trigger: "blur"
          }
        ],
        txnAmount: [
          {
            required: true,
            message: "Please enter amount",
            trigger: "blur"
          }
        ],
        receivingCustName: [
          {
            required: true,
            message: "Please enter receiving Customer name",
            trigger: "blur"
          }
        ],
        orderingCustName: [
          {
            required: true,
            message: "Please enter ordering customer name",
            trigger: "blur"
          }
        ]
      },
      rulesConfirm: {
        purposeCode: [
          {
            required: true,
            message: "Please select purpose",
            trigger: "blur"
          }
        ],
        orderingCustType: [
          {
            required: true,
            message: "Please select customer type",
            trigger: "blur"
          }
        ],
        branchCode: [
          {
            required: true,
            message: "Please enter your brach code",
            trigger: "blur"
          }
        ],
        orderingCustIdType: [
          {
            required: true,
            message: "Please slected national id or passport id",
            trigger: "blur"
          }
        ],
        orderingCustId: [
          {
            required: true,
            message: "Please enter national id or passport id",
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {
    modal,
    //confirmTransfer,
    loading,
    VueNumeric
  },
  computed: {
    ...mapGetters("transfer", [
      "GET_BANKLIST",
      "GET_ACC_TYPE",
      "GET_PURPOSELIST"
    ]),
    ...mapState("transfer", [
      "validateInfo",
      "feeAmount",
      "bankName",
      "accountTypeName"
    ]),
    ...mapState("user", ["UserInput"]),
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
    getUserID() {
      return this.UserInput.username;
    }
  },
  mounted() {
    this.getBankList();
  },
  created() {
    this.getBankList(), this.getAccTypeList(), this.getPurposeList();
  },
  methods: {
    ...mapActions("transfer", [
      "BANKLIST",
      "ACC_TYPE",
      "PURPOSE_LIST",
      "VALIDATE_TRANSFER",
      "SET_BANKLIST_VALUE",
      "SET_ACCTYPENAME_VALUE",
      "RESET_SOMESTATES",
      "CONFIRM_TRANSFER"
    ]),

    ValidateTransfer() {
      // console.log(this.getUserID);

      this.$refs.transfer.validate(valid => {
        if (valid) {
          this.errStatus = false;
          this.successStatus = false;
          this.isLoading = true;
          // console.log(this.transfer);
          this.VALIDATE_TRANSFER(this.transfer)
            .then(result => {
              // console.log(result);
              if (result.success == true) {
                this.confirmTransferInfo = true;
                this.isLoading = false;
                this.$message({
                  type: "success",
                  message: result.message
                });
              } else {
                this.confirmTransferInfo = false;
                this.isLoading = false;
                this.$message({
                  type: "error",
                  message: result.message
                });
                this.$notify.error({
                  title: "Error",
                  message: result.message + " " + result.data.errorDesc,
                  offset: 100
                });
                // this.resetState();
              }
            })
            .catch(err => {
              //console.log(err);
              //this.resetState();
              this.isLoading = false;
              this.confirmTransferInfo = false;
              this.$message({
                type: "error",
                message: "Validate Error"
              });
            });
        } else {
          this.$message.error("Please enter valid values");
          return false;
        }
      });
    },

    ConfirmTransferBalance() {
      this.$refs.confirmTransfer.validate(valid => {
        if (valid) {
          this.$confirm("Confirm transfer this...?", "CONFIRM", {
            confirmButtonText: "YES",
            cancelButtonText: "NO",
            type: "warning"
          })
            .then(() => {
              this.isLoading = true;
              this.errStatus = false;
              this.successStatus = false;
              let CONFIRM_TRANSFERs = {
                transferInfo: {
                  orderingCustName: this.transfer.orderingCustName,
                  orderingCustNationality: this.transfer
                    .orderingCustNationality,
                  orderingCustIdType: this.confirmTransfer.orderingCustIdType,
                  orderingCustId: this.confirmTransfer.orderingCustId,
                  orderingAddress: this.transfer.orderingAddress,
                  orderingCntyOfResidence: this.transfer
                    .orderingCntyOfResidence,
                  receivingCustName: this.transfer.receivingCustName,
                  receivingBankCode: this.transfer.receivingBankCode,
                  receivingCntyCode: this.transfer.receivingCntyCode,
                  txnAmount: this.transfer.txnAmount,
                  txnCurrencyCode: this.transfer.txnCurrencyCode,
                  receivingAcctType: this.transfer.receivingAcctType,
                  receivingAcctId: this.transfer.receivingAcctId,
                  purposeCode: this.confirmTransfer.purposeCode,
                  otherInfo: this.confirmTransfer.otherInfo,
                  orderingCntySourceOfFund: "LA",
                  orderingCustType: this.confirmTransfer.orderingCustType
                },
                userID: this.getUserID,
                branchCode: this.confirmTransfer.branchCode,
                ac_no: "238880005",
                CHGAMT: this.feeAmount
              };
              //   console.log(JSON.stringify(CONFIRM_TRANSFERs));

              this.CONFIRM_TRANSFER(CONFIRM_TRANSFERs)
                .then(result => {
                  //  console.log(result);
                  if (result.success == true) {
                    this.messageAlert = result.message;
                    this.statusCode = result.data.statusCode;
                    this.errorCode = result.data.errorCode;
                    this.errorDesc = result.data.errorDesc;
                    this.transactionStatus = result.data.transferStatus;
                    this.orderingRefNo = result.data.orderingRefNo;
                    this.isLoading = false;

                    this.$notify.success({
                      title: "Transfer Success",
                      message: this.messageAlert + "|" + this.transactionStatus,
                      offset: 100
                    });
                    this.$message({
                      type: "success",
                      message: "Transfer Successfully"
                    });
                    this.successStatus = true;
                  } else {
                    this.messageAlert = result.message;
                    this.statusCode = result.data.transfer_info.statusCode;
                    this.errorCode = result.data.transfer_info.errorCode;
                    this.errorDesc = result.data.transfer_info.errorDesc;
                    this.transactionStatus =
                      result.data.transfer_info.transferStatus;
                    this.orderingRefNo =
                      result.data.transfer_info.orderingRefNo;

                    this.isLoading = false;
                    this.errStatus = true;
                    this.$message({
                      type: "error",
                      message: this.messageAlert
                    });
                    this.$notify.error({
                      title: this.errorDesc,
                      message: this.messageAlert,
                      offset: 100
                    });
                  }
                  // this.resetState();
                  this.confirmTransferInfo = false;
                  //  this.Cancel();
                  this.cancelConfirmtransfer();
                })
                .catch(err => {
                  this.isLoading = false;
                  this.$notify.error({
                    title: "Error",
                    message: "Transfer Error Please try again...! ",
                    offset: 100
                  });
                });
            })
            .catch(() => {});
        } else {
          this.$message.error("Please enter valid values");
          return false;
        }
      });
    },

    onchange() {
      var bName = event.target.innerText;
      this.SET_BANKLIST_VALUE(bName);
    },
    onchangeAccType() {
      var accTypeName = event.target.innerText;
      // console.log(accTypeName);

      this.SET_ACCTYPENAME_VALUE(accTypeName);
    },
    getBankList() {
      this.BANKLIST()
        .then(() => {
          //console.log(result);
          // this.GET_BANKLIST = result;
        })
        .catch(err => {
          //console.log(err);
        });
    },

    getAccTypeList() {
      this.ACC_TYPE()
        .then(() => {
          // console.log(acc_result);
        })
        .catch(err => {
          // console.log(err);
        });
    },
    getPurposeList() {
      this.PURPOSE_LIST()
        .then(() => {
          // console.log(purposeResult);
        })
        .catch(err => {
          // console.log(err);
        });
    },

    resetState() {
      this.RESET_SOMESTATES().then(() => {});
    },
    cancelConfirmtransfer() {
      //console.log(value);
      // this.isLoading = false;
      this.confirmTransferInfo = false;
      this.confirmTransfer = {
        orderingCustIdType: null,
        orderingCustId: null,
        purposeCode: null,
        orderingCustType: null,
        branchCode: null,
        otherInfo: null
      };
      this.Cancel();
    },
    Cancel() {
      this.transfer = {
        orderingAddress: null,
        txnAmount: 0,
        txnCurrencyCode: "THB",
        orderingCustName: null,
        receivingBankCode: null,
        orderingCntyOfResidence: "LA",
        receivingAcctType: null,
        receivingAcctId: null,
        receivingCustName: null,
        orderingCustNationality: "Laos",
        receivingCntyCode: "764"
      };

      //this.errStatus = false;
      // this.successStatus=false
      this.resetState();
    }
  }
};
</script>

<style lang="css" scoped>
.text {
  font-size: 14px;
}

.item {
  margin: 10px;
  padding-left: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.image {
  width: 50%;
  display: block;
}
.form-control {
  width: 100%;
  border: 1px solid #aaaa;
  border-radius: 4px;
  margin: 0px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}
.form-control:focus {
  border-color: dodgerBlue;
  box-shadow: 0 0 1px 0 dodgerBlue;
}
.el-button--warning {
  font-family: "Noto Serif Lao" !important;
}
.el-button--primary {
  font-family: "Noto Serif Lao" !important;
}
</style>