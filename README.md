# vehicleselector-lib
  个人前端组件库---一款基于react环境的前端组件库
## 安装

```bash
npm install vehicleselector-lib
```
## 使用说明

```jsx
import { CJSelect } from 'vehicleselector-lib';
ReactDOM.render(<CJSelect />, mountNode);
```

### 1、CJSelect使用说明
```js
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {CJSelect} from 'vehicleselector-lib';

//数据源
let options=[
      {
        "A":[
          {
            "brand":"奥迪",
            "brandPicName":"AUDI",
            "brandPicUrl":"http://brand-logo.oss-cn-shanghai.aliyuncs.com/AUDI.png"
          },
          {.....},
          {.....}
        ]
      },
      {.......}
    ]
    
//默认值  
let value = [
  {
    label:'奥迪',
    value:'AUDI'
  },
  {
    label:'别克',
    value:'BUICK'
  },
  {
    label:'比亚迪',
    value:'BYD'
  }
]

export default class App extends Component{
  constructor(props){
        super(props);
        this.cJSelectChange = this.cjSelectChange.bind(this);
  }
  
  cjSelectChange(info){
        console.log("value===",info)
        value = info;
  }
  
  render(){
    return(
      <CJSelect options={options} multiple={true} value={value} defaultValue={value} onChange={this.cjSelectChange} style={{marginTop:50,marginLeft:30}}/>
    )
  }
}
```
属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 数据源 | [] | 无
| multiple | 是否多选，true-多选，false-单选 |  boolean | 无
| value | 指定默认选中的条目 | [] | 无
| defaultValue | 指定默认选中的条目 | [] | 无 |
| onChange | 选中 子项，或 选择框 的 value 变化时，调用此函数 | function | 无 |
| style | 组件的全局样式 | object | 无 |
