<template>
  <div class="system-enterpriseInfo-dialog-container">
    <el-dialog
      :title="state.dialog.title"
      v-model="state.dialog.isShowDialog"
      width="60%"
    >
      <el-form
        ref="enterpriseInfoDialogFormRef"
        :model="state.ruleForm"
        :rules="state.rules"
        size="default"
        label-width="90px"
      >
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input
                v-model="state.ruleForm.enterpriseName"
                placeholder="请输入企业名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="企业地址" prop="enterpriseAddress">
              <el-input
                v-model="state.ruleForm.enterpriseAddress"
                placeholder="请输入企业地址"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="企业类别" prop="enterpriseCategory">
              <el-input
                v-model="state.ruleForm.enterpriseCategory"
                placeholder="请输入企业类别"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="面积" prop="area">
              <el-input
                v-model="state.ruleForm.area"
                placeholder="请输入面积"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="法人代表" prop="legal">
              <el-input
                v-model="state.ruleForm.legal"
                placeholder="请输入法人代表"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="成立时间" prop="establishmentTime">
              <el-date-picker
                clearable
                v-model="state.ruleForm.establishmentTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择成立时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="消防安全负责人" prop="fireSatefyPerson">
              <el-input
                v-model="state.ruleForm.fireSatefyPerson"
                placeholder="请输入消防安全负责人"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="state.ruleForm.phone"
                placeholder="请输入联系电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="所属行业" prop="industry">
              <el-input
                v-model="state.ruleForm.industry"
                placeholder="请输入所属行业"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="N期" prop="stage">
              <el-input
                v-model="state.ruleForm.stage"
                placeholder="请输入N期"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="安全评分" prop="score">
              <el-input
                v-model="state.ruleForm.score"
                placeholder="请输入安全评分"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :rows="3"
                v-model="state.ruleForm.remark"
                placeholder="请输入备注"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="default">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="default">{{
            state.dialog.submitTxt
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="dictDialog">
import {
  defineAsyncComponent,
  nextTick,
  reactive,
  ref,
  getCurrentInstance,
  defineProps,
  defineEmits,
} from "vue";
import { useEnterpriseInfoApi } from "@/api/fire/info";
import { ElMessage } from "element-plus";

// 定义子组件向父组件传值/事件
const emit = defineEmits(["refresh"]);

// 定义变量内容
const useEnterpriseInfo = useEnterpriseInfoApi();
const enterpriseInfoDialogFormRef = ref();
const state = reactive({
  ruleForm: {
    enterpriseName: "",
    enterpriseAddress: "",
    enterpriseCategory: "",
    area: "",
    legal: "",
    establishmentTime: "",
    image: "",
    fireSatefyPerson: "",
    phone: "",
    industry: "",
    stage: "",
    score: "",
    remark: "",
  },
  dialog: {
    isShowDialog: false,
    type: "",
    title: "",
    submitTxt: "",
  },
  rules: {},
});

// 打开弹窗
const openDialog = (type: string, row) => {
  resetForm();
  if (type === "edit") {
    useEnterpriseInfo.getEnterpriseInfoById(row.id).then((res) => {
      state.ruleForm = res;
      state.dialog.title = "修改企业信息";
      state.dialog.submitTxt = "修 改";
    });
  } else {
    state.dialog.title = "新增企业信息";
    state.dialog.submitTxt = "新 增";
  }
  state.dialog.type = type;
  state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};

// 提交
const onSubmit = () => {
  // 验证表单
  Promise.all([currentValidate(enterpriseInfoDialogFormRef)]).then((res) => {
    const validateResult = res.every((item) => !!item);
    if (validateResult) {
      if (state.dialog.type == "add") {
        useEnterpriseInfo.createEnterpriseInfo(state.ruleForm).then(() => {
          ElMessage.success("创建成功");
          closeDialog();
          emit("refresh");
        });
      } else {
        useEnterpriseInfo.updateEnterpriseInfo(state.ruleForm).then(() => {
          ElMessage.success("修改成功");
          closeDialog();
          emit("refresh");
        });
      }
    } else {
      ElMessage.error("表单校验未通过，请重新检查提交内容");
    }
  });
};

// 主表-表单组件验证
const currentValidate = (pageRef) => {
  return new Promise((resolve) => {
    pageRef.value.validate((valid: boolean) => {
      if (valid) resolve(valid);
    });
  });
};

const resetForm = () => {
  state.ruleForm = {
    enterpriseName: "",
    enterpriseAddress: "",
    enterpriseCategory: "",
    area: "",
    legal: "",
    establishmentTime: "",
    image: "",
    fireSatefyPerson: "",
    phone: "",
    industry: "",
    stage: "",
    score: "",
    remark: "",
  };
};
// 暴露变量
defineExpose({
  openDialog,
});
</script>

