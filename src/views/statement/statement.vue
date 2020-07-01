<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-document"></i> Statement
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>基本表单</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>

    <modal v-if="isIdle" />
    <div class="container">
      <el-form :model="statements" ref="statements" :rules="rules" label-width="80px">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="Date" prop="TRN_DATE">
              <el-date-picker
                type="date"
                v-model="statements.TRN_DATE"
                value-format="dd-MMM-yyyy"
                placeholder="YYYY-MM-DD"
                size="mini"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="Status">
              <el-select
                v-model="statements.transferStatus"
                placeholder="Transfer Status"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" icon="el-icon-search" @click="onSubmit">Search</el-button>
              <!-- <el-button type="primary" icon="el-icon-download"></el-button> -->
              <export-excel
                v-if="this.dataList.length>0"
                class="myButton"
                :data="dataList"
                :fields="excelFiled"
                worksheet="Transaction"
                name="Transaction.xls"
              >Export to excel</export-excel>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="Branch">
              <el-select
                v-model="statements.BRANCH_CODE"
                filterable
                clearable
                placeholder="Branch Code"
                size="mini"
              >
                <el-option
                  v-for="item in branch"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="REF_NO">
             <el-input v-model="statements.trn_ref_no" clearable placeholder="TRAN_REF_NO"></el-input>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="this.dataList.length>0">
        <el-table
          :data="dataList"
          border
          stripe
          class="table"
          size="mini"
          id="transferTransaction"
        >

          <el-table-column fixed  label="No" type="index"></el-table-column>
          <el-table-column fixed prop="TRN_REF_NO" label="REF_NO" width="130"></el-table-column>
          <el-table-column prop="orderingCustName" label="OrderingCustomerName" width="300"></el-table-column>
          <el-table-column prop="orderingCustId" label="CustomerIDCard" width="150"></el-table-column>
          <el-table-column prop="orderingAddress" label="OrderingAddress" width="300"></el-table-column>

          <el-table-column prop="debitAcctId" label="DebitAcctId" width="100"></el-table-column>
          <el-table-column prop="orderingCustType" label="CutType" width="80"></el-table-column>

          <el-table-column prop="receivingCustName" label="ReceivingCustName" width="200"></el-table-column>
          <el-table-column prop="receivingBankCode" label="BankCode" width="90"></el-table-column>
          <el-table-column prop="purposeCode" label="PurposeCode" width="100"></el-table-column>
          <el-table-column prop="receivingAcctId" label="ReceivingAcctId" width="200"></el-table-column>
          <el-table-column prop="AC_NO" label="AC_NO" width="90"></el-table-column>
          <el-table-column prop="txnAmount" label="Amount(THB)" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.txnAmount | numFormat('0,000.00')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="FEE_AMOUNT" label="FEE" width="70">
            <template slot-scope="scope">
              <span>{{scope.row.FEE_AMOUNT | numFormat('0,00.00')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="DateTime" width="190">
            <template slot-scope="scope">
              <span>{{scope.row.txnDt }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="BRANCH_CODE" label="BRANCH" width="90"></el-table-column>
          <el-table-column prop="USER_ID" label="USERID" width="90"></el-table-column>
          <el-table-column label="Status" width="200">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.transferStatus==='BENE_CR_ERROR'?'danger' : 'success'"
              >{{scope.row.transferStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Revert Status" width="150">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.REVERT_STATUS==='REVERT_FAILED'? 'danger' :'success'"
              >{{scope.row.REVERT_STATUS}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="REVERT_USERID" label="Revert UserID" width="100"></el-table-column>
          <el-table-column prop="REVERT_DATE" label="Revert Date" width="150"></el-table-column>
          <el-table-column prop="errorDesc" label="Desc" width="150"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import loading from "vue-loading-overlay";
import modal from "_c/modal/modal";
import { mapActions } from "vuex";
//import Pagination from "_c/Pagination"; // secondary package based on el-pagination
import { parseTime } from "@/utils";
//import { ExportToExcell, tableToExcel } from "@/utils/export";
import branchData from "@/utils/branch.json";
import * as $ from "jquery";
import XLSX from "xlsx";
import excel from "vue-excel-export";
import numeral from "numeral";
import moment from "moment";
export default {
  name: "statement",
  data() {
    return {
      search: "",
      statements: {
        TRN_DATE: "",
        transferStatus: "",
        BRANCH_CODE: "",
        trn_ref_no:""
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined
      },
      dataList: {},
      isLoading: false,
      options: [
        {
          value: "",
          label: "All Transaction"
        },
        {
          value: "BENE_CR_SUCCESS",
          label: "Transaction Success"
        },
        {
          value: "WAIT_FOR_CLEARING",
          label: "Transaction Pending"
        },
        {
          value: "BENE_CR_ERROR",
          label: "Transaction Failed"
        }
      ],
      branch: branchData,

      rules: {
        TRN_DATE: [
          {
            required: true,
            message: "Input transection date",
            trigger: "blur"
          }
        ]
        // transferStatus: [
        //   {
        //     required: true,
        //     message: "Select transfer status",
        //     trigger: "blur"
        //   }
        // ]
        // BRANCH_CODE: [
        //   {
        //     required: true,
        //     message: "Enter Branch Code",
        //     trigger: "blur"
        //   }
        // ]
      },

      excelFiled: {
        REF_NO: "TRN_REF_NO",
        "Ordering customerName": "orderingCustName",
        "Customer ID Card": "orderingCustId",
        "Ordering Address": "orderingAddress",
        "Debit ACCtID": "debitAcctId",
        "Customer Type": "orderingCustType",
        "Receiving CustomerName": "receivingCustName",
        BankCode: {
          field: "receivingBankCode",
          callback: val => {
            return "'" + val;
          }
        },
        "Purpose Code": "purposeCode",
        "Receiving ACCID": "receivingAcctId",
        AC_NO: "AC_NO",
        Amount: {
          field: "txnAmount",
          callback: value => {
            return numeral(value).format("0,0.00");
          }
        },
        Fee: {
          field: "FEE_AMOUNT",
          callback: values => {
            return numeral(values).format("0,0.00");
          }
        },
        DateTime: {
          field: "txnDt",
          callback: value => {
            return moment(String(value)).format("YYYY-MM-DD H:mm");
          }
        },
        Branch: {
          field: "BRANCH_CODE",
          callback: val => {
            return "'" + val;
          }
        },
        USER_ID: "USER_ID",
        "Transfer Status": "transferStatus",
        "Revert Status": "REVERT_STATUS",
        "Revert UserID": "REVERT_USERID",
        "Revert Date": "REVERT_DATE",
        Description: "errorDesc"
      }
    };
  },
  components: {
    modal,
    loading
    // excel
    // Pagination
  },
  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    }
  },
  created() {
    // this.onSubmit()
  },
  methods: {
    ...mapActions("statement", ["STATEMENT"]),
    onSubmit() {
      this.$refs.statements.validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.STATEMENT(this.statements)
            .then(result => {
              if (result.success == true) {
                this.dataList = result.data;
                // this.total = result.data.length;
                // console.log(this.data.length);
                this.$message.success(result.message);
              } else {
                this.$message.error(result.message);
              }

              this.isLoading = false;
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("Please enter valid values");
          this.isLoading = false;
          return false;
        }
      });
    },
    excelPrint() {
      this.isLoading = true;
      // ======== export using export_json_excel=================
      const dataWS = XLSX.utils.json_to_sheet(this.dataList);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "Transaction.xlsx");
      this.isLoading = false;

      //===========Export html table===============

      // let file = new Blob([$('.table').html()], { type: "application/vnd.ms-excel" });
      // let url = URL.createObjectURL(file);
      // let a = $("<a />", {
      //   href: url,
      //   download: "Transaction.xls"
      // }).appendTo("body").get(0).click();

      // ExportToExcell('transferTransaction','transferTransaction')
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  font-size: 12px;
}
.myButton {
  background-color: #44c767;
  border-radius: 5px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 11px;
  padding: 0px 5px;
  text-decoration: none;
  margin-left: 8px;
}
.myButton:hover {
  background-color: #5cbf2a;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>