<template>
  <div>
    <el-select v-model="area.province" clearable class="select-area" @change="getCity" placeholder="请选择">
      <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.province" :value="item.provinceId+'|'+item.province">
      </el-option>
    </el-select>

    <el-select v-model="area.city" clearable class="select-area" @change="getArea" placeholder="请选择">
      <el-option v-for="item in cityList" :key="item.cityId" :label="item.city" :value="item.cityId + '|' + item.city">
      </el-option>
    </el-select>

    <el-select v-model="area.area" clearable class="select-area" @change="returnAll" placeholder="请选择">
      <el-option v-for="item in countyList" :key="item.areaId" :label="item.area" :value="item.areaId+'|'+item.area">
      </el-option>
    </el-select>
  </div>
</template>
<style scoped>
.select-area {
  width: 160px;
  margin-right: 15px;
}
</style>
<script>
/**
 *  获取全国省市县数据
 */
export default {
  name: 'areaChoose',
  created() {
    this.ajax({
      url: '/region/province',
      success(data, $this) {
        if (data.code == 'success') {
          $this.provinceList = data.content;
        }
      }
    });
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      countyList: [],
      area: {
        province: '',
        city: '',
        area: ''
      }
    };
  },
  methods: {
    getCity(value) {
      if (value) {
        const id = this.splitStr(value).value;
        this.ajax({
          url: '/region/' + id + '/city',
          success(data, $this) {
            if (data.code == 'success') {
              $this.cityList = data.content;
            }
          }
        });
      }
      this.area.city = "";
      this.area.area = "";
      this.$emit('change', this.splitArea(this.area));
    },
    getArea(value) {
      if (value) {
        const id = this.splitStr(value).value;
        this.ajax({
          url: '/region/' + id + '/area',
          success(data, $this) {
            if (data.code == 'success') {
              $this.countyList = data.content;
            }
          }
        });
      };
      this.area.area = "";
      this.$emit('change', this.splitArea(this.area));
    },
    returnAll(value) {
      if (value) {
        this.splitStr(value);
      };
      this.$emit('change', this.splitArea(this.area));
    },
    splitStr(value) {
      let _value = value.split('|');
      return {
        name: _value[1],
        value: _value[0]
      };
    },
    splitArea(obj) {
      let result = {
        province: '',
        city: '',
        area: ''
      };
      if (obj.province != '') {
        result.province = this.splitStr(obj.province);
      }
      if (obj.city != '') {
        result.city = this.splitStr(obj.city);
      }
      if (obj.area != '') {
        result.area = this.splitStr(obj.area);
      }
      return result;
    },
    props: ['change']
  }
};
</script>
