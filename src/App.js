import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from './components/Control';
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  //초기화 시켜주고 싶은 것들을 cons안에 코딩한다
  //state를 사용하면서 정보를 은닉함
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"welcome",
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent(){
    let i = 0;
    while(i < this.state.contents.length){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i++;
    }
  }

  getContent(){
    let _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id++;
        let _contents = this.state.contents.concat({
          id:this.max_content_id,
          title:_title,
          desc:_desc
        })
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          let _contents = Array.from(this.state.contents);
          for(let i = 0; i < _contents.length; i++){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
          }          
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render(){
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage = {function(){
            this.setState({mode:"welcome"});
          }.bind(this)}
        >
        </Subject>
        <TOC
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
          });
          }.bind(this)}
          data={this.state.contents}
        >
        </TOC>
        <Control
          onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                let _contents = Array.from(this.state.contents);
                for(let i = 0; i < _contents.length; i++){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i, 1);
                    break;
                  }
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents
                })
              }
            }else{
              this.setState({
                mode:_mode
              });
            }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
