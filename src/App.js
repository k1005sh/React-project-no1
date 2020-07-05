import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";

class App extends Component {
  //초기화 시켜주고 싶은 것들을 cons안에 코딩한다
  //state를 사용하면서 정보를 은닉함
  constructor(props){
    super(props);
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
  // handleClick = (e) =>{
  //   e.preventDefault();
  //   this.setState({
  //     mode:'welcome'
  //   });
  // }
  render(){
    let _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      let i = 0;
      while(i < this.state.contents.length){
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
    }
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
        {/* <header>
          <h1><a href="/" onClick={this.handleClick}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <TOC
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
          });
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
