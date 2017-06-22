# Graph Panel
## JSON配置数据
```json
{
  grid: {
    backgroundColor: null,
    color: null,
    margin: 0,
    labelMargin: 10,
    borderColor: 'white',
    borderWidth: 0, // 指定边框宽度color或者borderColor不能为null
    clickable: true,
    hoverable: false,
    autoHighlight: true,
    mouseActiveRadius: 10, // 鼠标触发事件的半径范围
    markings: [
      {yaxis: {from: 0.5}, color: 'rgba(48,135,86, 0.4)'}, // ok
      {yaxis: {from: 0.5, to: 0.5}, color: 'rgba(48,135,86, 1)'}, // ok
      {yaxis: {from: 0.8}, color: 'rgba(247,149,32, 0.4)'}, // warn
      {yaxis: {from: 0.8, to: 0.8}, color: 'rgba(247,149,32, 1)'}, // warn
      {yaxis: {from: 0.9}, color: 'rgba(237,46,24, 0.4)'}, // critical
      {yaxis: {from: 0.9, to: 0.9}, color: 'rgba(237,46,24, 1)'}, // critical
    ]
  },
  series: {
    lines: {
      show: true,
      lineWidth: 2,
      fill: true,
      fillColor: 'rgba(255, 255, 0, 0.2)',
      steps: false,
    },
    points: {
      show: false,
      lineWidth: 1,
      radius: 10,
      fillColor: '#ff0',
      // symbol: function cross (ctx, x, y, radius, shadow) {
      //   const size = radius
      //   ctx.moveTo(x - size, y - size)
      //   ctx.lineTo(x + size, y + size)
      //   ctx.moveTo(x - size, y + size)
      //   ctx.lineTo(x + size, y - size)
      // },
    },
    bars: {
      show: true,
      lineWidth: 20,
      align: 'left',
      horizontal: false,
    }
  },
  colors: ['rgba(255, 0, 0, 0.7)'],
  xaxes: [{
    show: true,
    mode: 'time',
    timeformat: '%H:%M:%S',
    color: 'red',
    minTickSize: [10, 'second'],
    tickDecimals: 2,
    tickColor: 'green',
    // tickFormatter: function (val, axis) {
    //   return val.toFixed(axis.tickDecimals)
    // },
    autoscaleMargin: 0.02,
  }],
  yaxes: [{
    color: '#D8D9DA',
    tickColor: 'gray',
  }]
}
```

## 说明
### grid
属性|类型|默认值|说明
---|---|---|---
backgroundColor |string| |背景颜色
color|string| |除了背景颜色以外，其他grid元素不指定，将使用此处设置的全局颜色
margin|number|0|grid外部margin
labelMargin|number|0|x,y轴与grid的间距
borderColor|string| |边框颜色，不指定将使用color属性
borderWidth|number|0|边框宽度
clickable|boolean|false|在plot绑定的元素上触发'plotclick'事件
hoverable|boolean|false|在plot绑定的元素上触发'plothover'事件
autoHighlight|boolean|false|不理解
mouseActiveRadius|number| |鼠标事件触发的半径大小，多个元素在此触发范围内会选择最近的元素
markings|array| |辅助线 [xaxis: [], yaxis: []]
axis.from|number| |轴坐标大于此数值
axis.to|number| |轴坐标小于于此数值
axis.color|sring| |指定颜色


### series
#### series公有属性
属性|类型|默认值|说明
---|---|---|---
[type].show|boolean|false|是否显示折线图
[type].lineWidth|number|1|折线图宽度
[type].fill|0~1|0|填充折线图与x轴内的区域的透明度
[type].fillColor|string| |填充折线图与x轴内的区域的颜色rgba,此参数将覆盖fill属性

#### type => lines
属性|类型|默认值|说明
---|---|---|---
lines|object| |折线图
lines.steps|boolean|false|折线图是否阶梯式显示

#### type => points
属性|类型|默认值|说明
---|---|---|---
points|object| |点图
points.raidus|number|2|点图半径
points.symbol|sting,func|'circle'|指定点图的形状，默认为圆圈

#### type => bars
属性|类型|默认值|说明
---|---|---|---
bars|object| |柱状图
bars.align|string|'left'|暂不理解
bars.horizontal|boolean|false|水平显示柱状图

### colors配置颜色
属性|类型|默认值|说明
---|---|---|---
colors|array| |指定不同series的颜色

### xaxis, yaxis轴配置
属性|类型|默认值|说明
---|---|---|---
show|boolean|true|显示坐标
mode|string|null|'time'时序轴，需要jquery.flot.time.js plugin
timeformat|string| |时序模式label格式话.如：%H:%M:%S
color|string| |标签文字颜色
minTkckSize|array| |时序模式，指定最小的轴坐标时间间隔[10, 'second'] 可以有:10, 30, 60
tickDecimals|number| |指定小数位保留位数
tickColor|string| |轴线颜色
tickFormatter|func| |格式化label文字，会覆盖timeformat.参数 val: 轴数据, axis: 当前轴配置信息
autoscaleMargin|number|0.02|收缩轴显示，确保grid两边有空隙

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
bars|object| |柱状图
bars.show|boolean|true|显示柱状图
lines|object| |折线图
lines.show|boolean|false|显示折线图
lines.width|number| |折线粗细,像素
lines.fill|number| |折线填充透明度0~10, 10为完全不透明
points|object| |点图
points.show|boolean|false|显示点图
points.radius|number|5|点图半径
xaxis|object| |x轴坐标
xaxis.show|boolean|true|显示x轴坐标
yaxis|object| |y轴坐标
yaxis.show|boolean|true|显示y轴坐标
yaxis.prefix|string| |y轴标签前缀
yaxis.postfix|string| |y轴标签后缀
thresholds|array| |轴坐标标记
thresholds.gt|number| |轴坐标大于多少开始标记
thresholds.lt|number| |轴坐标小于多少开始标记
thresholds.color|string|'ok'|可选参数: 'ok', 'warn', 'critical'
thresholds.fill|boolean|true|填充区间颜色
thresholds.line|boolean|true|标记线
