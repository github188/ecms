<template>
  <div id="oaIndex">
    <vHeader />
    <div class="content">
      <div class="content-side">
        <personShow />
        <entryMenu />
      </div>
      <div class="index-content">
        <div class="content-l">
          <personInfo />
          <fastEntry />
        </div>
        <div class="content-r">
          <newsList />
          <workOrderList />
        </div>
        <excellent />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#oaIndex {
  max-width: 1440px;
  min-width: 1150px;
  margin: 0 auto;
  padding-left: 0;

  .content {
    margin-top: 96px;
    margin-bottom: 24px;
    overflow: hidden;
    padding: 0 24px;
    min-width: 1100px;
  }

  .content-side {
    width: 300px;
    float: right;
  }

  .index-content {
    margin-right: 324px;
  }

  .content-l {
    height: 400px;
    float: left;
  }

  .content-l .box {
    background: #fff;
    width: 280px;
    margin-bottom: 24px;
  }

  .weather {
    height: 100px;
    padding: 24px 0 24px 30px;
  }

  .weather ul {
    padding-left: 0;
  }

  .weather ul li {
    list-style: none;
    font-size: 16px;
    color: #3e3e3e;
    position: relative;
    height: 30px;
    line-height: 30px;
  }

  .weather ul li span {
    padding-left: 38px;
  }

  .weather ul li .icon {
    position: absolute;
    height: 16px;
    width: 18px;
    background-image: url('./img/icon.png');
    top: 7px;
  }

  .weather ul li .icon-calendar {
    background-position: -24px -136px;
  }

  .weather ul li .icon-address {
    background-position: -66px -136px;
  }

  .person-info {
    height: 196px;
    padding-top: 30px;
    text-align: center;
  }

  .person-info img {
    height: 72px;
    width: 72px;
    border-radius: 100%;
    margin: 0 auto;
    display: block;
    margin-bottom: 18px;
  }

  .person-name {
    font-size: 16px;
    color: #3e3e3e;
    margin-bottom: 16px;
  }

  .person-pos {
    text-align: center;
    color: #979797;
    font-size: 14px;
  }

  .person-pos span {
    padding-left: 15px;
  }

  .content-r {
    margin-left: 304px;
  }
  .slide-toggle {
    text-align: center;
  }

  .slide-toggle a {
    display: inline-block;
    height: 6px;
    width: 6px;
    background: #b9b9b9;
    border-radius: 100%;
    margin: 0 2px;
    cursor: pointer;
  }

  .slide-toggle a.active {
    width: 20px;
    background: #01cd78;
    border-radius: 5px;
  }
  .list-tag {
    position: relative;
  }

  .list-tag span {
    padding-left: 12px;
    font-size: 16px;
    color: #8e8e90;
  }

  .list-tag:before {
    position: absolute;
    top: 3px;
    content: '';
    height: 16px;
    width: 4px;
    background: #01cd78;
    border-radius: 3px;
    display: inline-block;
  }

  .list-tag a {
    color: #868f94;
    font-size: 14px;
    float: right;
  }
  .list-tag {
    position: relative;
  }

  .list-tag span {
    padding-left: 12px;
    font-size: 16px;
    color: #8e8e90;
  }

  .list-tag:before {
    position: absolute;
    top: 3px;
    content: '';
    height: 16px;
    width: 4px;
    background: #01cd78;
    border-radius: 3px;
    display: inline-block;
  }

  .list-tag a {
    color: #868f94;
    font-size: 14px;
    float: right;
  }
  .el-carousel__button {
    background-color: #01cd78;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: #b9b9b9;
    opacity: 1;
  }

  .el-carousel__indicator.is-active button {
    width: 20px;
    background: #01cd78;
    border-radius: 5px;
  }

  .el-carousel__arrow:hover,
  .el-carousel__arrow {
    background: rgba(0, 0, 0, 0);
  }

  .el-carousel__arrow i {
    font-size: 25px;
    color: #efefef;
    font-weight: bold;
  }

  .el-carousel__arrow:hover i {
    color: #01cd78;
  }

  .person-new .el-carousel__indicators {
    bottom: 20px;
  }

  .header-box {
    max-width: 1440px;
    padding: 0 24px;
  }
}
</style>

<script>
import vHeader from '../index/header'
import fastEntry from './components/fastEntry'
import workOrderList from './components/workOrder'
import excellent from './components/excellent'
import entryMenu from './components/entryMenu'
import personShow from './components/personShow'
import newsList from './components/newsList'
import personInfo from './components/personInfo'
export default {
  name: 'index',
  components: {
    vHeader,
    workOrderList,
    excellent,
    entryMenu,
    fastEntry,
    personShow,
    newsList,
    personInfo
  }
}
</script>
