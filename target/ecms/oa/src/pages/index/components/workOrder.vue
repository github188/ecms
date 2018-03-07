<template>
  <div class="my-work" id="orderList">
    <p class="list-tag">
      <span>我的工作台</span>
      <router-link to="/work/list">更多</router-link>
    </p>
    <el-tabs class="tab-content" @tab-click="getWorkList">
      <el-tab-pane>
        <span slot="label">我的待办&nbsp;
          <span style="color: #01cd78">({{count[0] || 0}})</span>
        </span>
        <ul v-if="todoHandle.length">
          <li v-for="(item, index) in todoHandle" :key="index">
            <p>
              <router-link class="work-link" :to="{name: 'workDetail', params: {id: item.processId, type: item.type}}">{{item.title}}</router-link>
              <span class="work-list-info">{{item.sponsorsName}}
                <em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
              </span>
            </p>
          </li>
          <li v-if="count[0]>6">
            <router-link style="color:#03cf7d" class="work-link" to="/work/list">查看全部待办</router-link>
          </li>
        </ul>
        <p style="margin-top: 130px; text-align:center" v-else>
          勤劳如您，一个待办都木有，点赞！
        </p>
        </ul>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label">我的待阅&nbsp;
          <span style="color: #01cd78">({{count[1] || 0}})</span>
        </span>
        <ul v-if="todoRead.length">
          <li v-for="(item, index) in todoRead" :key="index">
            <p>
              <router-link @click.native="toRead(item.id)" target="_blank" class="work-link" :to="getReadLink(item)">{{filterHtml(item.title)}}</router-link>
              <!-- <router-link class="work-link" :to="{path: '/work/detail', query: {id: item.processId, type: item.type}}">{{item.title}}</router-link> -->
              <span class="work-list-info">{{item.sponsorsName}}
                <em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
              </span>
            </p>
          </li>
          <li v-if="count[1]>6">
            <router-link style="color:#03cf7d" class="work-link" :to="{path: '/work/list', query: {name: 'read'}}">查看全部待阅</router-link>
          </li>
        </ul>
        <p style="margin-top: 130px; text-align:center" v-else>
          您没有新的待阅，此处空空如也。
        </p>
        </ul>
      </el-tab-pane>

      <!-- <el-tab-pane>
        <span slot="label">抄送给我的&nbsp;
          <span style="color: #01cd78">({{count[2] || 0}})</span>
        </span>
        <ul v-if="todoHandle.length">
          <li v-for="(item, index) in todoHandle" :key="index">
            <p>
              <router-link class="work-link" :to="{name: 'workDetail', params: {id: item.processId, type: item.type}}">{{item.title}}</router-link>
              <span class="work-list-info">{{item.sponsorsName}}
                <em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
              </span>
            </p>
          </li>
        </ul>
        <p style="margin-top: 130px; text-align:center" v-else>
          勤劳如您，一个待办都木有，点赞！
        </p>
        </ul>
      </el-tab-pane> -->

      <el-tab-pane>
        <span slot="label">我的申请&nbsp;
          <span style="color: #01cd78">({{count[2] || 0}})</span>
        </span>
        <ul v-if="todoAsk.length">
          <li v-for="(item, index) in todoAsk" :key="index">
            <router-link :to="{name: 'workDetail', params: {id: item.processId, type: item.type}}">
              <el-row>
                <el-col :span="15" class="work-link">
                  {{item.title}}
                </el-col>
                <el-col style="font-size:12px; text-align: left; color: #40474d" :span="4">
                  <span v-if="item.doingPerson.length">
                    {{item.donePerson | dealStatus(item.doingPerson)}}&nbsp;
                    <span class="deal-status">处理中</span>
                  </span>
                  <span v-else>
                    <span v-if="item.doingPerson.length == 0 && item.donePerson.length == 0">{{item.nodesName}}</span>
                    <span v-else>已完成</span>
                  </span>
                </el-col>
                <el-col :span="5">
                  <span class="work-list-info">
                    <em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
                  </span>
                </el-col>
              </el-row>
            </router-link>
          </li>
          <li v-if="count[2]>6">
            <router-link style="color:#03cf7d" class="work-link" :to="{path: '/work/list', query: {name: 'myapply'}}">查看全部申请</router-link>
          </li>
        </ul>
        <p style="margin-top: 130px; text-align:center" v-else>
          您还没有发起过任何申请，此处空空如也。
        </p>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label">我的已办&nbsp;
          <span style="color: #01cd78">({{count[3] || 0}})</span>
        </span>
        <ul v-if="todoFinish.length">
          <li v-for="(item, index) in todoFinish" :key="index">
            <p>
              <router-link class="work-link" :to="{name: 'workDetail', params: {id: item.processId, type: item.type}}">{{item.title}}</router-link>
              <span class="work-list-info">{{item.sponsorsName}}
                <em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
              </span>
            </p>
          </li>
          <li v-if="count[3]>6">
            <router-link style="color:#03cf7d" class="work-link" :to="{path: '/work/list', query: {name: 'done'}}">查看全部已办</router-link>
          </li>
        </ul>
        <p style="margin-top: 130px; text-align:center" v-else>
          您当前还没有任何已办，此处空空如也。
        </p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.my-work {
  width: 100%;
  height: 390px;
  background: #fff;
  padding: 20px 0 30px 0;
  margin-bottom: 24px;
}

.work-link {
  // width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.my-work .list-tag {
  padding: 0 30px 0 24px;
  margin-bottom: 15px;
}

#orderList {
  .el-tabs__active-bar {
    background-color: #01cd78;
    height: 2px;
  }

  .el-tabs__item.is-active {
    color: #1f2d3d;
  }

  .el-tabs__item {
    padding: 0 24px;
  }

  .tab-content ul {
    padding: 0 24px;
    margin-top: 10px;
  }

  .tab-content ul li {
    list-style: none;
    height: 38px;
    font-size: 14px;
  }

  .work-list-info {
    float: right;
    color: #40474d;
  }

  .work-list-info em {
    font-style: normal;
    font-size: 13px;
  }

  .work-list-info .work-time {
    padding-left: 35px;
    color: #8d8d8d;
  }
}
</style>

<script>
export default {
  name: 'workOrder',
  data() {
    return {
      todoHandle: [], //我的工作台待办
      todoAsk: [], //我的工作台申请
      todoRead: [],  //我的待阅
      todoSend: [], // 抄送给我的
      todoFinish: [], // 我的已办
      count: [0, 0, 0, 0], //待办条数
    }
  },
  created() {
    this.getWorkList({ index: '0' }) //获取我的待办
    this.getWorkList({ index: '1' }) //获取待阅
    this.getWorkList({ index: '2' }) //获取我的申请
    this.getWorkList({ index: '3' }) //获取我的已办
  },
  filters: {
    dealStatus(donePerson, doingPerson) {
      let str = doingPerson[0].handlerName;
      if (doingPerson.length > 1) {
        str += '等'
      }
      return str
    },
  },
  methods: {
    getWorkList(component) {
      //获取工单详情
      let flag = false
      let index = Number(component.index);

      let url = ''
      switch (index) {
        case 0:
          url = '/sys/process/todo/list'  //我的待办
          break;
        case 1:
          url = '/news/toread/list' //我的待阅
          break;
        case 2:
          url = '/sys/process/myapply/list' //我的申请
          break;
        case 3:
          url = '/sys/process/done/list' //我的已办
          break;
      }
      this.ajax({ //获取我的待办
        url: url,
        data: {
          userId: Utils.getValue('u'),
          pageNum: 1,
          pageSize: 6,
        },
        success(data, $this) {
          if (data.code == 'success') {
            let { content, totals } = data
            switch (index) {
              case 0:
                $this.todoHandle = content  //我的待办
                $this.count[0] = totals
                break;
              case 1:
                $this.todoRead = content //我的待阅
                $this.count[1] = totals
                break;
              case 2:
                $this.todoAsk = content //我的申请
                $this.count[2] = totals
                break;
              case 3:
                $this.todoFinish = content //我的已办
                $this.count[3] = totals
                break;
            }
          }
        },
      })
    },
    getReadLink(item) {
      if (item.type == 1) { //新闻
        return { path: '/news/detail', query: { id: item.refId } }
      } else if (item.type == 2) { //评论
        return { path: '/news/detail', hash: 'to' + item.newscomId, query: { id: item.refId } }
      }
    },
    filterHtml(value) {
      return Utils.unescapeHtml(value)
        .replace(/<\/?[^>]*>/g, '')
    },
    toRead(id) {
      this.ajax({
        url: '/news/toread/update',
        data: {
          id,
          status: 1
        },
        success(data, $this) {
          $this.getWorkList({ index: '1' })
        }
      })
    }
  }
}
</script>

