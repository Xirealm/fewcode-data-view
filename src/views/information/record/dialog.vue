<template>
  <div class="system-inspectionRecord-dialog-container">
    <el-dialog
      :title="state.dialog.title"
      v-model="state.dialog.isShowDialog"
      width="60%"
    >
      <el-form
        ref="inspectionRecordDialogFormRef"
        :model="state.ruleForm"
        :rules="state.rules"
        size="default"
        label-width="90px"
      >
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="打卡人" prop="userName">
              <el-input
                v-model="state.ruleForm.userName"
                placeholder="请输入打卡人"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="巡检设备数" prop="facilityCount">
              <el-input
                v-model="state.ruleForm.facilityCount"
                placeholder="请输入巡检设备数"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="设备异常数" prop="facilityAbnormalCount">
              <el-input
                v-model="state.ruleForm.facilityAbnormalCount"
                placeholder="请输入设备异常数"
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
import { useInspectionRecordApi } from "@/api/fire/record";
import { ElMessage } from "element-plus";

// 定义子组件向父组件传值/事件
const emit = defineEmits(["refresh"]);

// 定义变量内容
const useInspectionRecord = useInspectionRecordApi();
const inspectionRecordDialogFormRef = ref();
const state = reactive({
  ruleForm: {
    userName: "",
    facilityCount: "",
    facilityAbnormalCount: "",
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
    useInspectionRecord.getInspectionRecordById(row.id).then((res) => {
      state.ruleForm = res;
      state.dialog.title = "修改【请填写功能名称】";
      state.dialog.submitTxt = "修 改";
    });
  } else {
    state.dialog.title = "新增【请填写功能名称】";
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
  Promise.all([currentValidate(inspectionRecordDialogFormRef)]).then((res) => {
    const validateResult = res.every((item) => !!item);
    if (validateResult) {
      if (state.dialog.type == "add") {
        useInspectionRecord.createInspectionRecord(state.ruleForm).then(() => {
          ElMessage.success("创建成功");
          closeDialog();
          emit("refresh");
        });
      } else {
        useInspectionRecord.updateInspectionRecord(state.ruleForm).then(() => {
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
    userName: "",
    facilityCount: "",
    facilityAbnormalCount: "",
    remark: "",
  };
};
// 暴露变量
defineExpose({
  openDialog,
});
</script>

