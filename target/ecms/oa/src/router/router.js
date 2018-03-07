import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/'
import common from '@/utils/common'
const config = require('static/js/config')
import {
  Login,
  Index,
  Trends,
  TrendsNews,
  TrendsAnalyse,
  NewPerson,
  ExcellentPerson,
  PersonInfo,
  ModulePage,
  Project,
  myWorkspace,
  myProject,
  projectRelate,
  NewsIndex,
  NewsList,
  NewsDetail,
  PdfView,
  WorkIndex,
  WorkList,
  WorkDetail,
  Attendance,
  AttendanceReport,
  AttendanceApprove,
  AttendanceSetting,
  AttendancePunch,
  Affairs,
  AffairsContact,
  AffairsAttendance,
  Organize,
  OrganizePerson,
  OrganizeRole,
  OrganizeMenu,
  OrganizeSetting,
  Contract,
  ContractManage,
  ContractSetting,
  Conference,
  Article,
  ArticleWrite,
  ArticleEdit,
  ArticlePreview,
  Integral,
  IntegralManage,
  IntegralSetting,
  Finance,
  FinanceProject,
  FinanceProjectSetting,
  Organization,
  OrganizationCompany,
  OrganizationDepartment,
  OrganizationPersonnel,
  Projects,
  Workplace,
  DemandDetail,
  ProjectList,
  ProjectDetail,
  DemandList
} from './index'

Vue.use(Router)

// 项目管理平台
let projectManager = [
  {
    path: "workplace",
    name: "workplace",
    component: Workplace,
    meta: { title: "工作台" },
  },
  {
    path: "demanddetail",
    name: "demandDetail",
    component: DemandDetail,
    meta: { title: "需求详情" },
  },
  {
    path: "myproject",
    name: "ProjectList",
    component: ProjectList,
    meta: { title: "我的项目" },
  },
  {
    path: "projectdetail",
    name: "projectDetail",
    component: ProjectDetail,
    meta: { title: "项目详情" },
  },
  {
    path: "demand",
    name: "demandList",
    component: DemandList,
    meta: { title: "需求列表" },
  },
];
let contractManage = [
  //合同管理模块
  {
    path: 'manage',
    name: 'contractManage',
    component: ContractManage,
    meta: {title: '合同列表'},
  },
  {
    path: 'setting',
    name: 'contractSetting',
    component: ContractSetting,
    meta: {title: '合同设置'},
  },
]

let attendanceManage = [
  //考勤管理模块
  {
    path: 'report',
    name: 'attendanceReport',
    component: AttendanceReport,
    meta: {title: '考勤统计'},
  },
  {
    path: 'setting',
    name: 'setting',
    component: AttendanceSetting,
    meta: {title: '考勤设置'},
  },
  {
    path: 'approve',
    name: 'approve',
    component: AttendanceApprove,
    meta: {title: '考勤审批单'},
  },
  {
    path: 'punch',
    name: 'punch',
    component: AttendancePunch,
    meta: {title: '打卡统计'},
  },
]

let organizeManage = [
  //组织架构管理模块
  {
    path: 'personManage',
    name: 'personManage',
    component: OrganizePerson,
    meta: {title: '组织架构管理'},
  },
  {
    path: 'rolesManage',
    name: 'rolesManage',
    component: OrganizeRole,
    meta: {title: '角色管理'},
  },
  {
    path: 'menuManage',
    name: 'menuManage',
    component: OrganizeMenu,
    meta: {title: '菜单管理'},
  },
  {
    path: 'setting',
    name: 'setting',
    component: OrganizeSetting,
    meta: {title: '背景设置'},
  },
]

let organizationManage = [
  //新组织架构管理模块
  {
    path: 'company',
    name: 'company',
    component: OrganizationCompany,
    meta: {title: '公司管理'},
  },
  {
    path: 'personnel',
    name: 'personnel',
    component: OrganizationPersonnel,
    meta: {title: '人员管理'},
  },
  {
    path: 'department',
    name: 'department',
    component: OrganizationDepartment,
    meta: {title: '部门管理'},
  }
]

let affairsManage = [
  //人事管理模块
  {
    path: 'contacts',
    name: 'affairsContact',
    component: AffairsContact,
    meta: {title: '通讯录'},
  },
  {
    path: 'attendance',
    name: 'affairsAttendance',
    component: AffairsAttendance,
    meta: {title: '我的考勤'},
  },
]

let proDemManage = [
  //从OA首页入口进来之后会采用以下配置的第一项去显示，于是第一个配置对象的name属性要匹配resource接口的url字段
  {
    path: 'myWorkspaceManage',
    name: 'projectManage',
    component: myWorkspace,
    meta: {title: '工作台'},
  },
  {
    path: 'myProjectManage',
    name: 'myProjectManage',
    component: myProject,
    meta: {title: '我的项目'},
  },
  {
    path: 'projectRelate',
    name: 'projectRelate',
    component: projectRelate,
    meta: {title: '项目相关'},
  },
]

let newsPublish = [
  //新闻公告
  {
    path: 'list',
    name: 'newsList',
    component: NewsList,
    meta: {title: '新闻列表'},
  },
  {
    path: 'detail',
    name: 'newsDetail',
    component: NewsDetail,
    meta: {title: '新闻详情'},
  },
]

let newsManage = [
  //OA首页管理
  {
    //新闻公告管理
    path: 'newsManage',
    name: 'newsManage',
    component: TrendsNews,
    meta: {title: '企业动态管理'},
    children: [
      {
        path: 'analyse',
        name: 'analyse',
        component: TrendsAnalyse,
        meta: {title: '数据查看'},
      },
    ],
  },
  {
    path: 'newPerson',
    name: 'newPerson',
    component: NewPerson,
    meta: {title: '新员工'},
  },
  {
    path: 'excellent',
    name: 'excellent',
    component: ExcellentPerson,
    meta: {title: '优秀员工'},
  },
]

let workOrder = [
  //工单中心
  {
    path: 'list',
    name: 'workList',
    component: WorkList,
    meta: {title: '工单中心列表'},
  },
  {
    path: 'detail',
    name: 'workDetail',
    component: WorkDetail,
    meta: {title: '工单中心详情'},
  },
]

let article = [
  //文章相关
  {
    path: 'write',
    name: 'write',
    component: ArticleWrite,
    meta: {title: '发表文章'},
  },
  {
    path: 'edit',
    name: 'edit',
    component: ArticleEdit,
    meta: {title: '修改文章'},
  },
  {
    path: 'preview',
    name: 'preview',
    component: ArticlePreview,
    meta: {title: '预览文章'},
  },
]

let personIntegral = [
  //积分相关
  {
    path: 'manage',
    name: 'integralManage',
    component: IntegralManage,
    meta: {title: '积分管理'},
  },
  {
    path: 'setting',
    name: 'integralSetting',
    component: IntegralSetting,
    meta: {title: '积分设置'},
  },
]
let financeManage = [
  //财务相关
  {
    path: 'projectList',
    name: 'projectList',
    component: FinanceProject,
    meta: {title: '项目列表'},
  },
  {
    path: 'projectSetting',
    name: 'projectSetting',
    component: FinanceProjectSetting,
    meta: {title: '项目设置'},
  },
]
const router = new Router({
  mode: 'history',
  base: config.appRoot + '/',
  routes: [
    {
      path: '*',
      component: Index,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {title: '首页'},
    },
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {title: '登录'},
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: PdfView,
      meta: {title: 'pdf预览'},
    },
    {
      path: '/news',
      name: 'news',
      component: NewsIndex,
      meta: {title: '企业动态'},
      children: newsPublish,
    },
    {
      path: '/work',
      name: 'work',
      component: WorkIndex,
      meta: {title: '我的工作台'},
      children: workOrder,
    },
    {
      path: '/person/:id',
      name: 'person',
      component: PersonInfo,
      meta: {title: '个人信息'},
    },
    {
      path: '/conference',
      name: 'conference',
      component: Conference,
      meta: {title: '会议室预约'},
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      children: article,
    },
    {
      path: '/modulePage',
      name: 'modulePage',
      component: ModulePage,
      children: [
        {
          path: '/trends',
          name: 'trends',
          component: Trends,
          children: newsManage,
        },
        {
          path: '/attendance',
          name: 'attendance',
          component: Attendance,
          children: attendanceManage,
        },
        {
          path: '/affairs',
          name: 'affairs',
          component: Affairs,
          children: affairsManage,
        },
        {
          path: '/integral',
          name: 'integral',
          component: Integral,
          children: personIntegral,
        },
        {
          path: '/organize',
          name: 'organize',
          component: Organize,
          children: organizeManage,
        },
        {
          path: '/organization',
          name: 'organization',
          component: Organization,
          children: organizationManage
        },
        {
          path: '/contract',
          name: 'contract',
          component: Contract,
          children: contractManage,
        },
        {
          path: '/finance',
          name: 'finance',
          component: Finance,
          children: financeManage,
        },
      ],
    },
    {
      path: '/project',
      name: 'theProject',
      component: Project,
      children: proDemManage,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
      children: projectManager,
    },
  ],
})

router.beforeEach(({meta, path, fullPath}, from, next) => {
  if (path !== '/' && !store.state.authorization) {
    Utils.setValue('nextUrl', fullPath)
    // console.log('没有权限...')
    return next({path: '/'})
  }
  if (path === '/' && store.state.authorization) {
    return next({path: '/index'})
  }
  let nextUrl = Utils.getValue('nextUrl')
  if (nextUrl && store.state.authorization) {
    Utils.removeValue('nextUrl')
    return next({path: unescape(nextUrl)})
  }
  document.title = `${meta.title ? meta.title : ''} - 亿车科技EAP`
  next()
})

export default router
