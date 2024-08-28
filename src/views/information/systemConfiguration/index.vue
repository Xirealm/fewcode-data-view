<template>
  <div class="system-boxSystemConfiguration-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="system-boxSystemConfiguration-search">
        <el-form
          :inline="true"
          ref="boxSystemConfigurationSearchRef"
          :model="state.tableData.param.query"
          size="default"
        >
          <el-row>
            <el-form-item label="算法名称：" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.algorithmName"
                placeholder="请输入算法名称："
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="灵敏度" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.sensitivity"
                placeholder="请输入灵敏度"
                clearable
                style="max-width: 180px"
              ></el-input>
            </el-form-item>
            <el-form-item label="灵敏度" class="ml20" size="default">
              <el-input
                v-model="state.tableData.param.query.reportFrequency"
                placeholder="请输入灵敏度"
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
              <el-icon><ele-Search /></el-icon> 查询
            </el-button>
            <el-button size="default" class="ml20" @click="resetQuery">
              <el-icon><ele-Refresh /></el-icon> 重置
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
          <el-icon><ele-FolderAdd /></el-icon> 新增
        </el-button>
      </el-row>
      <el-table
        :data="state.tableData.records"
        v-loading="state.tableData.loading"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="唯一标识" prop="id" show-overflow-tooltip />
        <el-table-column
          label="算法名称："
          prop="algorithmName"
          show-overflow-tooltip
        />
        <el-table-column
          label="开关状态：0=开 1=关"
          prop="status"
          show-overflow-tooltip
        />
        <el-table-column
          label="灵敏度"
          prop="sensitivity"
          show-overflow-tooltip
        />
        <el-table-column
          label="灵敏度"
          prop="reportFrequency"
          show-overflow-tooltip
        />
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
    <BoxSystemConfigurationDialog
      ref="boxSystemConfigurationDialogRef"
      @refresh="getTableData()"
    />
  </div>
</template>

<script setup lang="ts" name="boxSystemConfiguration">
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  ref,
  nextTick,
  getCurrentInstance,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useBoxSystemConfigurationApi } from "@/api/fire/systemConfiguration";
import { parseDateTime } from "@/utils/formatTime";

// 引入组件
const BoxSystemConfigurationDialog = defineAsyncComponent(
  () => import("./dialog.vue")
);

// 定义变量内容
const boxSystemConfigurationDialogRef = ref();
const boxSystemConfigurationSearchRef = ref();
const useBoxSystemConfiguration = useBoxSystemConfigurationApi();
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
        algorithmName: "",
        status: "",
        sensitivity: "",
        reportFrequency: "",
      },
    },
  },
});

// 初始化表格数据
const getTableData = () => {
  state.tableData.loading = true;
  useBoxSystemConfiguration.getPageList(state.tableData.param).then((res) => {
    state.tableData.records = res.records;
    state.tableData.total = res.total;
  });
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
// 打开新增盒子系统配置弹窗
const onOpenAdd = (type: string) => {
  boxSystemConfigurationDialogRef.value.openDialog(type);
};
// 打开修改盒子系统配置弹窗
const onOpenEdit = (type: string, row) => {
  boxSystemConfigurationDialogRef.value.openDialog(type, row);
};
// 删除盒子系统配置
const onRowDel = (row) => {
  ElMessageBox.confirm("此操作将永久删除数据，是否继续?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      useBoxSystemConfiguration
        .deleteBoxSystemConfiguration(row.id)
        .then(() => {
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
    boxSystemConfigurationSearchRef.value.resetFields();
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
.system-boxSystemConfiguration-container {
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
