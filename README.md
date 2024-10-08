## 一、项目描述

- 这里一个基于 Vue3、TypeScript、DataV、ECharts 框架的 " **数据大屏项目** "，使用 '.vue' 和 '.tsx' 文件实现界面，采用新版动态屏幕适配方案，支持数据动态刷新渲染、内部DataV、ECharts图表都支持自由替换。组件详情请点击下方 ECharts 和 DataV 文档。
- 项目按照 1920*1080 比例设计，支持任何尺寸的同比例缩放。
- 项目封装的 ECharts 区域使用了全部引入的方式，增加了打包体积，在实际运用中请使用 **按需引入**。
- DataV更换为支持vue3的社区版本

友情链接：

1.  [Vue3 官方文档](https://composition-api.vuejs.org/zh/api.html#setup)
2.  [DataV 官方文档](http://datav.jiaminghi.com/guide/)
3.  [DataV 社区版本：vue3版本](https://datav-vue3.netlify.app/Guide/Guide.html#%E5%B1%80%E9%83%A8%E5%BC%95%E5%85%A5)
4.  [echarts 实例](https://echarts.apache.org/examples/zh/index.html)，[echarts API 文档](https://echarts.apache.org/zh/api.html#echarts)

## 二、主要文件介绍

| 文件                | 作用/功能                                                              |
| ------------------- | --------------------------------------------------------------------- |
| main.ts           | 主目录文件，引入注册 自定义组件、DataV 、样式等数据              |
| views/*       | 界面各个区域组件按照位置来命名，index 是项目主结构                   |
| constant/* | 静态数据项，所有的标题和图标都配置在这里                                |
| utils/* | 全局公共函数（包含屏幕适配函数）                                          |
| assets/*           | 静态资源目录，放置图片与全局样式以及element主题配置 |
| components/echart   | 封装的全局图表渲染函数                                       |
| components/componentInstall | 全局组件注册位置                                    |
| common/* | 通用数据配置项（放置 echart 样式与地图数据）                             |
| router/* | 路由配置区域                                                           |
| stores/* | Pinia相关区域                                       |
| src/ *.d.ts | 全局类型声明文件                                                     |

## 三、使用介绍

### 启动项目

使用yarn包管理工具
1.安装依赖：yarn install
2.启动项目：yarn serve
3.打包项目：yarn build

### 封装组件渲染图表

所有的 ECharts 图表渲染都是基于 `components/echart/index.tsx` 封装组件创建的，动态修改数据需要手动触发初始化函数 `initChart`，参考 `centerLeft1` 里的图表写法即可。如果遇到动态赋值图表无法监听到的时候，也可以调用这个函数进行手动更新。

封装的渲染图表组件支持传入以下参数，可根据业务需求自行添加/删除。

|参数名称              | 类型      | 作用/功能                      |
| -------------------| --------- | ------------------------------|
| id                 | String    | 唯一 id（非必填，项目使用 ref 指定节点） |
| className          | String    | class样式名称（非必填）                    |
| options            | Object    | ECharts 配置（非必填），可通过初始化参数打入 |
| height             | String    | 图表高度（必填）                    |
| width              | String    | 图表宽度（必填）                    |

### TSX与封装组件的使用

项目引入了 `babel-plugin-jsx` 依赖，可以直接使用 tsx 编写代码。 `src/views/chart` 下的文件使用了此方式编码，这里的文件专门处理数据内容，不涉及到任何的样式，并且返回的结构较为简单。

项目全局注册了 `echart` 组件，使用的时候大体方式如下：

```javascript
setup(props) {
    // ....此处省略n行代码
    return () => {
        const height = "xxx"
        const width = "xxx"
        return <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
    }
}
```

### 复用图表组件

复用图表组件案例为中间部分的 `任务通过率与任务达标率` 模块，两个图表类似，区别在于颜色和主要渲染数据。只需要传入对应样式，然后在复用的组件 `views/center/chart/draw.tsx` 里进行接收并在对应位置赋值即可。

如：在调用处 `views/center.vue` 里去定义好数据并传入组件

```js
//组件调用
<span>今日任务通过率</span>
<chart :tips="rate[0].tips" :colorObj="rate[0].colorData" />

<span>今日任务达标率</span>
<chart :tips="rate[1].tips" :colorObj="rate[1].colorData" />

...
import Chart from '../center/chart/draw'
components: {
  Chart
}
setup() {
    // ...
    const rate = reactive([ 
        {
            id: "centerRate1",
            tips: 60,
            ...
        },
            {
            id: "centerRate2",
            tips: 40,
            colorData: {
            ...
        }
        }
    ])
    return {rate, ....}
}
```

### 更换边框和图表

边框是使用了 DataV 自带的组件，只需要去 views 目录下去寻找对应的位置去查找并替换就可以，具体的种类请去 DavaV 官网查看
如：

```html
<dv-border-box-1></dv-border-box-1>
<dv-border-box-2></dv-border-box-2>
<dv-border-box-3></dv-border-box-3>
```

图表的话可以去各个 `src/views/*/chart/draw.tsx` 修改 `ECharts` 的配置文件即可，如果觉得官网的案例不够好看可以去社区逛：[ECharts 社区地址](https://www.isqqw.com/homepage#/homepage)。

### 屏幕适配

屏幕适配方案放弃了rem 方案，使用更通用的 `css3：scale` 缩放方案，项目的基准尺寸是 `1920px*1080px`，所以支持用比例屏幕 100% 填充，如果非同比例则会自动计算比例居中填充，不足的部分则留白。实现代码在 `src/utils/userDraw.ts` 中，通过 `ref` 指向 `views/index` ，如果觉得适配方案不能试图您的场景，则可以自行修改方案。
