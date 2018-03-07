import Vue from 'vue'
import Panel from './Panel'
import Area from './GetArea'
import Market from './GetMarket'
import TabChoose from './TabChoose'
import GetPerson from './GetPerson'
import GetCode from './getCode'
import GetAffairsType from './GetAffairsType'
import GetDepartment from './GetDepartment'
import projectAdd from './projectAdd'
import FileUploads from './FileUpload'
import TimeLength from './TimeLength'

Vue.component('v-panel', Panel) //基础面板
Vue.component('c-upload', FileUploads) //上传附件
Vue.component('c-calcTime', TimeLength) //计算时长
Vue.component('v-area', Area) //全国区域选择
Vue.component('v-code', GetCode) //根据code获取数据
Vue.component('v-market', Market) //市场营销片区
Vue.component('v-choose', TabChoose) //用于查询面板上的选择
Vue.component('v-person', GetPerson) //组织结构人员查询与选择
Vue.component('v-affairs', GetAffairsType) //获取请假类型
Vue.component('v-department', GetDepartment) //获取组织架构
Vue.component('projectAdd', projectAdd) //创建项目
