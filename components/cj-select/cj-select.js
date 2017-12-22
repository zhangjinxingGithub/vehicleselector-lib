import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './style/cj-select.css';
import $ from 'jquery';

export default class CJSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            words:[],
            selectOpt:[],
            value:[],
            defaultValue:[],
            showMenu:false,
            options:this.props.options,
            offsetTop:35,
        }
        this.itemDetailClick = this.itemDetailClick.bind(this);
        this.clearSelectItem = this.clearSelectItem.bind(this);
        this.selectInputClick = this.selectInputClick.bind(this);
        this.btnWordClick = this.btnWordClick.bind(this);
        this.selectBlur = this.selectBlur.bind(this);
    }

    componentDidMount(){
        //默认值
        let values=this.props.value == this.props.defaultValue
        if(this.props.value){
            values =Object.assign([],this.props.value);
            this.setState({
                selectOpt:values
            }) 
        }

        //字母序列
        let options = this.state.options;
        let words=[];
        options.map((item)=>{
            let word = Object.keys(item)[0];
            words.push({label:word,selected:false});
            item[word].map((info)=>{
                let index = values.findIndex((data)=>{
                    return data.label == info.brand
                });
                if(index > -1){
                    info.selected = true
                }else{
                    info.selected = false;
                }
            })
        });
        words.push({label:"卡",selected:false});

        //单选默认样式切换
        if(!this.props.multiple){
            $(".cj-select-input").removeClass().addClass("cj-select-input-new dropdown-toggle");
        }
        
       
        this.setState({
            words:words,
            options:options,
        })
    }

    //字母检索
    btnWordClick(e,info){
        this.setState({
            showMenu:true
        },()=>{
            this.state.words.map((item)=>{
                if(info== item.label){
                    item.selected = true;
                }else{
                    item.selected = false;
                }
            })
            this.setState({
                words:this.state.words
            })
            if(document.getElementById(info)){
                document.getElementById(info).scrollIntoView();
            }
        })
    }

    /**
     * 失去焦点
     */
    selectBlur(e){
        if(!this.props.multiple){
            $(".cj-select-input-new-focus").removeClass().addClass("cj-select-input-new dropdown-toggle");
        }else{
            $(".cj-select-input-focus").removeClass().addClass("cj-select-input");
        }
        if(e.currentTarget.className == "cj-select"){
            this.setState({
                showMenu:false
            })
        }
    }

    /**
     * 开始选择
     */
    selectInputClick(e){
        if(!this.props.multiple){
            $(".cj-select-input").removeClass().addClass("cj-select-input-new-focus dropdown-toggle");
        }else{
            $(".cj-select-input").removeClass().addClass("cj-select-input-focus");
        }
        if(!this.state.showMenu){
            this.setState({
                showMenu:true
            })
        }
        this.refs.cjSelect.focus();
    }

    /**
     * 删除选择项
     */
    clearSelectItem(e){
        let info = e.currentTarget.title;
        let className = e.target.className;
        if(this.state.showMenu){
            this.deleteSelected(className,info);
        }else{
            this.setState({
                showMenu:true
            },()=>{
                this.deleteSelected(className,info);
            })
        }
    }

    /**
     * 删除方法
     * @param {*要删除项的类名} className 
     * @param {*要删除项的名称} info 
     */
    deleteSelected(className,info){
        if(className == "btnClose"){
            let node=null;
            if(document.getElementsByClassName("cj-select-input")[0]){
                node = document.getElementsByClassName("cj-select-input")[0];
            }
            if(document.getElementsByClassName("cj-select-input-focus")[0]){
                node = document.getElementsByClassName("cj-select-input-focus")[0];
            }
            let height=null;
            if(this.props.multiple){
                height = node.offsetHeight;
            }
            let arr = this.state.selectOpt;
            let index = arr.findIndex((item)=>{
                return item.label == info
            });
            if(index > -1){
                arr.splice(index,1);
                this.state.options.map((item)=>{
                    item[Object.keys(item)[0]].map((data)=>{
                        if(data.brand == info){
                            data.selected = false;
                        }
                    })
                })
                this.setState({
                    selectOpt:arr,
                    options:this.state.options
                },()=>{
                    if(this.props.multiple){
                        let newHeight = node.offsetHeight;
                        let newTop = this.state.offsetTop + newHeight - height;
                        this.setState({
                            offsetTop:newTop
                        },()=>{
                             this.props.onChange(this.state.selectOpt);
                        })
                    }
                })
            }
            this.refs.cjSelect.focus();
        }
    }

    /**
     * 子项单击选择/删除
     * @param {*事件对象} e 
     * @param {*单击的对象} info 
     */
    itemDetailClick(e,info){
        let arr = this.state.selectOpt;
        //如果已选择，当点击时，从选择框里清除,否则新增
        let index = arr.findIndex((item)=>{
            return item.label == info.brand
        });
        let list = this.state.options;
        let node=null;
        if(document.getElementsByClassName("cj-select-input")[0]){
            node = document.getElementsByClassName("cj-select-input")[0];
        }
        if(document.getElementsByClassName("cj-select-input-focus")[0]){
            node = document.getElementsByClassName("cj-select-input-focus")[0];
        }
        let height = null;
        if(this.props.multiple){
            height = node.offsetHeight;
        }
        if(index > -1){
            arr.splice(index,1);
            this.setState({
                showMenu:true
            })
           
            list.map((item)=>{
                item[Object.keys(item)[0]].map((label)=>{
                    if(label.brand == info.brand){
                        label.selected = false;
                    }
                })
            })
        }else{
            if(this.props.multiple){//多选
                arr.push({label:info.brand,value:info.brandPicName});
                this.setState({
                  showMenu:true  
                })
                list.map((item)=>{
                    item[Object.keys(item)[0]].map((label)=>{
                        if(label.brand == info.brand){
                            label.selected = true;
                        }
                    })
                })
            }else{//单选
                arr = [];
                arr.push({label:info.brand,value:info.brandPicName});
                list.map((item)=>{
                    item[Object.keys(item)[0]].map((label)=>{
                        if(label.brand == info.brand){
                            label.selected = true;
                        }else{
                            label.selected = false;
                        }
                    })
                })
            }
        }
        this.setState({
            selectOpt:arr,
            options:list
        },()=>{
            if(this.props.multiple){
                
                let newHeight = node.offsetHeight;
                let newTop = this.state.offsetTop + newHeight - height;
                this.setState({
                    offsetTop:newTop
                },()=>{
                    this.props.onChange(this.state.selectOpt);
                })
            }
        })
    }

    render(){
        const wordDiv = (
            <ul className="word-list" contentEditable="false" suppressContentEditableWarning="disabled">
            {
                this.state.words.map((item,index)=>{
                    return(
                        <li className="word-item" key={"item-"+index}  onClick={(e)=>{this.btnWordClick(e,item.label)}}>
                        {
                            item.selected ?  <div className="btn-word-select" >{item.label}</div>:
                            <div className="btn-word">{item.label}</div>
                        }
                        </li>
                    ) 
                })
            }
        </ul>
        )
        const userSelect = (
            <ul className="select-list">
                {
                    this.state.selectOpt.map((item,index)=>{
                        return(
                            <li className="select-item" key={"sel-"+index}  title={item.label} contentEditable="true" 
                                suppressContentEditableWarning="disabled" onClick={this.clearSelectItem}>
                                <div className="select-item-con" contentEditable="false" suppressContentEditableWarning="disabled">
                                    <div className="txt-con" contentEditable="false" suppressContentEditableWarning="disabled">
                                        <span className="select-txt" contentEditable="false" suppressContentEditableWarning="disabled">{item.label}</span>
                                    </div>
                                    <span aria-hidden="true" contentEditable="false" suppressContentEditableWarning="disabled" className="btnClose">&times;</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );

        return(
            <div className="cj-select"  contentEditable="true" suppressContentEditableWarning="disabled" ref="cjSelect" onBlur={(e)=>{this.selectBlur(e)}} style={this.props.style}>
                <div  className="cj-select-input" contentEditable="true" suppressContentEditableWarning="disabled" onClick={this.selectInputClick}>{userSelect}</div>
               {
                   this.state.showMenu ? <div className="cj-select-dropdown" style={{marginTop:this.state.offsetTop}}>
                   {wordDiv}
                   <div className="line"></div>
                   <div className="modal-list" contentEditable="false" suppressContentEditableWarning="disabled">
                       {
                          this.state.options.map((item,index)=>{
                               return(
                                   <div className="modal-item-con" key={"item-con-"+index}>
                                       <div className="modal-item-title" id={Object.keys(item)[0]}>{Object.keys(item)[0]}</div>
                                       <ul className="modal-item-con-list">
                                           {
                                               item[Object.keys(item)[0]].map((info,index)=>{
                                                   return(
                                                       <li className="modal-item-con-detail" key={"info-"+index}
                                                           onClick={(e)=>{this.itemDetailClick(e,info)}} contentEditable="false" suppressContentEditableWarning="disabled">
                                                           <div>
                                                               <div className="item-img">
                                                                   <img className="brand-img" src={info.brandPicUrl}/>
                                                               </div>
                                                           </div>
                                                           <div className="item-name">
                                                               {
                                                                   info.selected ? <span className="item-name-span-select">{info.brand}</span>:
                                                                   <span className="item-name-span">{info.brand}</span>
                                                               }
                                                               
                                                           </div>
                                                       </li>
                                                   )
                                               })
                                           }
                                       </ul>
                                   </div>
                               )
                           })
                       }
                   </div>
               </div>:null
               }
          </div>
        )
    }
}

CJSelect.propTypes={
    options:PropTypes.array.isRequired,
    multiple:PropTypes.bool.isRequired,
    value:PropTypes.array,
    defaultValue:PropTypes.array,
    onChange:PropTypes.func,
    style:PropTypes.object,
}