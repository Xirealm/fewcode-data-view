<template>
  <ReturnIndex />
  <div class="system-enterpriseInfo-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="system-enterpriseInfo-search">
        <el-form
          :inline="true"
          ref="enterpriseInfoSearchRef"
          :model="state.tableData.param.query"
          size="default"
        >
          <el-row>
            <el-form-item label="企业名称" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.enterpriseName"
                placeholder="请输入企业名称"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业地址" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.enterpriseAddress"
                placeholder="请输入企业地址"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业类别" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.enterpriseCategory"
                placeholder="请输入企业类别"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="面积" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.area"
                placeholder="请输入面积"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="法人代表" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.legal"
                placeholder="请输入法人代表"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="成立时间"
              class="ml20"
              prop="establishmentTime"
            >
              <el-date-picker
                clearable
                v-model="state.tableData.param.query.establishmentTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择成立时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="消防安全负责人" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.fireSatefyPerson"
                placeholder="请输入消防安全负责人"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.phone"
                placeholder="请输入联系电话"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属行业" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.industry"
                placeholder="请输入所属行业"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="N期" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.stage"
                placeholder="请输入N期"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="安全评分" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.score"
                placeholder="请输入安全评分"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-button
              size="default"
              type="primary"
              class="ml20"
              @click="getTableData"
            >
              <el-icon><Search /></el-icon> 查询
            </el-button>
            <el-button size="default" class="ml20" @click="resetQuery">
              <el-icon><Refresh /></el-icon> 重置
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="35">
        <el-button
          size="default"
          type="success"
          plain
          class="ml30"
          @click="onOpenAdd('add')"
        >
          <el-icon><FolderAdd /></el-icon> 新增
        </el-button>
      </el-row>
      <el-table
        :data="state.tableData.records"
        v-loading="state.tableData.loading"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="企业id" prop="id" show-overflow-tooltip />
        <el-table-column
          label="企业名称"
          prop="enterpriseName"
          show-overflow-tooltip
        />
        <el-table-column
          label="企业地址"
          prop="enterpriseAddress"
          show-overflow-tooltip
        />
        <el-table-column
          label="企业类别"
          prop="enterpriseCategory"
          show-overflow-tooltip
        />
        <el-table-column label="面积" prop="area" show-overflow-tooltip />
        <el-table-column label="法人代表" prop="legal" show-overflow-tooltip />
        <el-table-column
          label="成立时间"
          prop="establishmentTime"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.establishmentTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业形象" prop="image" show-overflow-tooltip />
        <el-table-column
          label="消防安全负责人"
          prop="fireSatefyPerson"
          show-overflow-tooltip
        />
        <el-table-column label="联系电话" prop="phone" show-overflow-tooltip />
        <el-table-column
          label="所属行业"
          prop="industry"
          show-overflow-tooltip
        />
        <el-table-column label="N期" prop="stage" show-overflow-tooltip />
        <el-table-column label="安全评分" prop="score" show-overflow-tooltip />
        <el-table-column label="备注" prop="remark" show-overflow-tooltip />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button
              size="small"
              text
              type="primary"
              @click="onOpenEdit('edit', scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              text
              type="primary"
              @click="onRowDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
        class="mt15"
        :pager-count="5"
        :page-sizes="[10, 20, 30]"
        v-model:current-page="state.tableData.param.page.current"
        background
        v-model:page-size="state.tableData.param.page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.tableData.total"
      >
      </el-pagination>
    </el-card>
    <EnterpriseInfoDialog
      ref="enterpriseInfoDialogRef"
      @refresh="getTableData()"
    />
  </div>
</template>

<script setup lang="ts" name="enterpriseInfo">
import ReturnIndex from "@/components/ReturnIndex.vue";
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  ref,
  nextTick,
  getCurrentInstance,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useEnterpriseInfoApi } from "@/api/fire/info";
import { parseDateTime } from "@/utils/formatTime";

// 引入组件
const EnterpriseInfoDialog = defineAsyncComponent(() => import("./dialog.vue"));

// 定义变量内容
const enterpriseInfoDialogRef = ref();
const enterpriseInfoSearchRef = ref();
const useEnterpriseInfo = useEnterpriseInfoApi();
const state = reactive({
  tableData: {
    records: [],
    total: 0,
    loading: false,
    param: {
      page: {
        current: 1,
        size: 10,
      },
      query: {
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
      },
    },
  },
});

// 初始化表格数据
const getTableData = () => {
  state.tableData.loading = true;
  useEnterpriseInfo.getPageList(state.tableData.param).then((res) => {
    state.tableData.records = res.records;
    state.tableData.total = res.total;
  });
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
// 打开新增企业信息弹窗
const onOpenAdd = (type: string) => {
  enterpriseInfoDialogRef.value.openDialog(type);
};
// 打开修改企业信息弹窗
const onOpenEdit = (type: string, row) => {
  enterpriseInfoDialogRef.value.openDialog(type, row);
};
// 删除企业信息
const onRowDel = (row) => {
  ElMessageBox.confirm("此操作将永久删除数据，是否继续?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      useEnterpriseInfo.deleteEnterpriseInfo(row.id).then(() => {
        getTableData();
        ElMessage.success("删除成功");
      });
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};
// 重置搜索框
const resetQuery = () => {
  nextTick(() => {
    enterpriseInfoSearchRef.value.resetFields();
  });
};
// 分页改变
const onHandleSizeChange = (val: number) => {
  state.tableData.param.page.size = val;
  getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
  state.tableData.param.page.current = val;
  getTableData();
};
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.system-enterpriseInfo-container {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    .el-table {
      flex: 1;
    }
  }
}
</style>
