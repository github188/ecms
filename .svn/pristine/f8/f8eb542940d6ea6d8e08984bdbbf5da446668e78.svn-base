<template>
  <div class="honour">
    <p class="honour-title">亿车荣誉榜</p>
    <el-carousel trigger="click" :interval="8000" :autoplay="true" indicator-position="none" arrow="always" height="240px">
      <el-carousel-item v-for="(item, index) in honour" :key="index">
        <ul id="honourBox">
          <li v-for="(list, listIndex) in item" :key="listIndex">
            <div class="honour-auto">
             <router-link :to="'/person/'+list.userId">
                <img :alt="list.name" :src="getUploadUrl('user', 'UserFine', 'downloadImg', list.photo)">
              </router-link>
              <p class="honour-name">{{list.name}}</p>
              <p class="margin-b-10">{{list.depName.split('-')[0]}}&nbsp;&nbsp;&nbsp;{{list.title}}</p>
              <p>{{list.depName.split('-')[1]}}</p>
              <div class="honour-synopsis">
                <p>
                  <label>部门:</label> {{list.depName.split('-')[0]}}
                </p>
                <p>
                  <label>岗位:</label> {{list.depName.split('-')[1]}}
                </p>
                <p> {{list.reason}} </p>
              </div>
            </div>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style lang="scss">
.honour {
  height: 300px;
  background: #fff;
  text-align: center;
}

.honour-title {
  text-align: center;
  padding: 20px 0;
  font-size: 16px;
  margin-bottom: 0;
}

.honour ul {
  padding-left: 0;
  overflow: hidden;
  margin: 0 40px;
}

.honour ul li {
  list-style: none;
  float: left;
  height: 210px;
  width: 20%;
  position: relative;
  cursor: pointer;
}

.honour-auto {
  width: 162px;
  height: 210px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  position: relative;
}

.honour-auto:hover::before {
  opacity: 1;
  transition: opacity 0.5s;
}

.honour-auto::before {
  content: "";
  height: 8px;
  width: 16px;
  z-index: 99999;
  background: url("./../img/coll-icon.png");
  position: absolute;
  transform: rotate(-90deg);
  top: 100px;
  right: -5px;
  opacity: 0;
  transition: opacity 0.3s;
}

.honour ul li .honour-synopsis {
  position: absolute;
  width: 218px;
  height: 210px;
  top: -1px;
  left: 160px;
  background-color: #fff;
  display: none;
  z-index: 100;
  border: 1px solid #e5e5e5;
  padding: 10px;
  text-align: left;
  overflow: auto;
  box-shadow: 3px 0 15px 0 #e6e6e6;
}

.honour ul li .honour-synopsis p {
  margin-bottom: 8px;
  line-height: 18px;
  color: #666;
  word-wrap: break-word;
}

.honour ul li:nth-child(5) .honour-synopsis {
  left: -200px;
  box-shadow: 3px 0 15px 0 #ffffff;
}

.honour ul li:nth-child(5) .honour-auto:before {
  transform: rotate(-270deg);
  left: -5px;
}

.honour ul li .honour-synopsis label {
  color: #999;
  font-weight: normal;
}

.honour ul li img {
  height: 100px;
  width: 100px;
  background: #fff;
}

.honour-name {
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
  color: #3e3e3e;
  margin: 0 10px;
  margin-bottom: 9px;
}

.honour ul li a {
  display: block;
  color: #979797;
  font-size: 12px;
}
</style>

<script>
export default {
  name: "excellent",
  created() {
    this.command("user", "UserFine", "listUserFine", { ispage: 0, status: 1 })
      .then(({ data }) => {
        let cut = 5;
        let page = Math.ceil(data.length / cut);
        let arr = [];
        for (let i = 0; i < page; i++) {
          arr.push(data.slice(i * cut, cut * (i + 1)));
        }
        this.honour = arr;
      })
      .catch(error => {
        // this.errorTips('优秀员工获取失败!')
      });
  },
  data() {
    return {
      honour: {} //荣誉榜
    };
  },
  updated() {
    this.$nextTick(() => {
      let hbw = $("#honourBox").width() / 5;
      let haw = $(".honour-auto").width();
      let margin = hbw - haw;
      $("#honourBox li")
        .on("mouseover", function() {
          $(".honour-synopsis")
            .stop()
            .fadeOut(100)
            .css({
              width: haw + margin,
              left: hbw - margin
            });
          if ($(this).index() == 4) {
            $(this)
              .find(".honour-synopsis")
              .css({
                right: hbw - margin,
                left: "auto"
              });
          }
          $(this)
            .find(".honour-synopsis")
            .stop()
            .fadeIn();
          $(this)
            .find(".person-honour-dpart")
            .css("color", "#01cd78");
        })
        .on("mouseout", function() {
          $(".honour-synopsis")
            .stop()
            .fadeOut(100);
          $(this)
            .find(".person-honour-dpart")
            .css("color", "rgba(1, 1, 1, .8)");
        });
      $(".honour-synopsis").niceScroll({
        cursorcolor: "rgba(0, 0, 0, 0.2)",
        cursorwidth: "5px",
        cursorborderradius: 5
      });
    });
  }
};
</script>

