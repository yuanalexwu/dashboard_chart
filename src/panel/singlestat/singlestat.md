# SignleStat Panel
## JSON配置数据
```javascript
{
  series: {
    gauges: {
      show: true,
      label: {
        show: false,
        margin: null,
        color: null,
        formatter: function (label, value) { return `${label}-${value}` }
      },
      threshold: {
        show: false,
        width: 5,
        label: {
          show: true,
          margin: 0,
          background: {
            color: null,
            opacity: 0,
          },
          font: {
            size: 16
          },
          color: '',
          formatter: function (value) { return `${value}` }
        },
        values: [
          {value: 50, color: '#01aa32'},
          {value: 80, color: '#df762b'},
          {value: 100, color: '#eb3035'},
        ],
      },
      gauge: {
        width: 50,
        min: 0,
        max: 100,
        border: {
          width: 0,
          color: null
        },
        background: {
          color: '#262626',
        },
      },
      value: {
        show: false,
        margin: 0,
        background: {
          color: null,
          opacity: 0,
        },
        font: {
          size: 30
        },
        formatter: function (label, value) { return `当前信息:${value}km/h` }
      },
      frame: {show: false},
      cell: {
        background: {
          color: '',
        },
        border: {
          show: true,
          color: 'red',
          width: 0,
        }
      },
    }
  }
}
```

## 说明
属性|类型|默认值|说明
---|---|---|---
show|boolean|true|显示图表
label|object| |标题
label.show|boolean|true|显示标题
label.margin|number,string|'auto'|标题上下边距
label.color|string| |标题颜色
label.formatter|func| |标题内容生成函数。参数 label: 数据中的label内容, value: 数据中的值
threshold|object| |图表分段信息
threshold.show|boolean|false|显示图表分段条,分段标签只要配置就会显示,与此设置无关
threshold.width|number,string|'auto'|图表分段宽度
threshold.label|object| |图表分段标题
threshold.label.show|boolean|false|显示图表分段标题
threshold.label.margin|number, string|'auto'|显示图表分段标题外边距
threshold.label.background|object| |显示图表分段标题背景
threshold.label.background.color|string| |显示图表分段标题背景颜色
threshold.label.background.opacity|number|1|显示图表分段标题透明度
threshold.label.font|object| |显示图表分段标题字体
threshold.label.size|number| |显示图表分段标题字体大小
threshold.label.color|string| |显示图表分段标题字体颜色
threshold.label.formatter|func| |显示图表分段标题内容，参数 value: 当前的数据，可以与标签组合显示
threshold.values|array| |显示图表分段区间
threshold.values.value|number| |显示图表分段区间数值(小于等于)
threshold.values.color|string| |显示图表分段区间颜色(当前数值在次范围内图表bar内的显示颜色)
gauge|object| |显示图表外边框
gauge.width|number,string|'auto'|显示图表bar宽度
gauge.min|number|0|显示图表bar最小值
gauge.max|number|100|显示图表bar最大值
gauge.background|string| |显示图表bar背景色
gauge.border|object| |显示图表bar边框
gauge.border.color|string| |显示图表bar边框颜色
gauge.border.width|number|0|显示图表bar边框宽度
gauge.background|object| |显示图表bar背景
gauge.background.color|string| |显示图表bar背景颜色
value|object| |数据值显示
value.show|boolean|true|显示数据值
value.background|object| |数据值背景
value.background.color|string|null|数据值背景颜色
value.background.opacity|number|0|数据值背景透明度
value.font|object| |数据值文字格式
value.font.size|number| |数据值文字大小
value.font.familly|string| |数据值文字字体
value.formatter|func| |数据值文字内容处理函数,参数 label: 当前数据标题, value: 当前数据值
frame|boolean|true|显示框架外边框
cell|object| |单元 包含一个图表
cell.border|object| |单元边框
cell.border.show|boolean| |显示单元边框
cell.border.color|string| |单元边框颜色

## Panel可配置信息
### 格式
```javascript
const panel = {
    height: 300,
    width: '100%'
    // ...
}
```
### 详细
信息|类型|默认值|说明
---|---|---|---
height|number|300|panel高度单位为像素
width|number,string|100%|panel宽度像素或者百分比
title|string| |标题
value|object| |数值显示
value.prefix|string| |数值显示前缀
value.postfix|string| |数值显示后缀
value.decimals|number| |数据保留小数位数
color|object| |颜色配置
color.thresholds|string|'50,80'|显示图表分段临界值2个数据以逗号分隔,*必须是2个数据
color.colors|string|'#01aa32,#df762b,#eb3035'|显示图表三个分段颜色数据以逗号分隔,*必须是3个数据
gauge|object| |状态条配置
gauge.width|number|50|状态条宽度
gauge.min|number|0|状态条最小值
gauge.max|number|100|状态条最大值
gauge.showThresholdLabel|boolean|false|显示图表分段标签
gauge.showThresholdMarker|boolean|false|显示图表分段色块

