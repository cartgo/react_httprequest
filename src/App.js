import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import MyTable from './Table/MyTable';
import axios from 'axios'; 
// import {Switch, hashHistory} from 'react-router';
// import Newitemform from './Newitemform/Newitemform'

class App extends Component {

  state = {
     posts:[],
    postId: null,
    pointer : null,
    linepicker:null,
    id :'',
    createitem : false
 };

 delete(postsIndex){

  const posts = [...this.state.posts];
  posts.splice(postsIndex, 1);
  this.setState({posts:posts})
 }


create(){
  this.setState({createitem:true})

axios.post( 'https://jsonplaceholder.typicode.com/posts' , {
        userId: 'new user id',
        title : 'new title',
        body : 'new body'
      })
      .then( res => {
        // console .log(res);
        let newPost = res.data;
        newPost.id =this.state.id;
        let newData = [...this.state.posts, newPost];
        this .setState({
          posts : newData,
          id: this.state.id +1
        });
      })
      .catch( err => console .log(err));
      
}

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      const posts = res.data;

      this.setState({ posts:posts,
      id: posts[posts.length - 1].id+1 
     });
     console.log("now id ="+this.state.id)

    })  }
 
 


  keydown = (event,index) =>{
    if(event.key === 'Enter'){
      this.setState({
        pointer:null,linepicker:null
    });
    
    }
  }


// click(index){
//   this.setState({pointer:index})
// }

click(index,name){
  this.setState({pointer:name,
  linepicker:index})
}
 
handleChange(event,index,name){
 console.log(event.target.value)
 const posts = [...this.state.posts];
 const post = posts[index];
 if(name === 'userId' ){
  console.log('userId')
  if(event.target.value >0){
  post.userId = Math.round(event.target.value)}
 }else if(name ==='title'&&(event.target.value.replace(/(^\s*)|(\s*$)/g, '')).length!==0){
   console.log('title')
 post.title = event.target.value;}
 else if(name ==='body'&&(event.target.value.replace(/(^\s*)|(\s*$)/g, '')).length!==0){
   console.log('body')
 post.body = event.target.value;
 }
 }



  render() {     

    let postinfo = null;
 
 
postinfo = 
<ul>
<table>
    <thead>

            <tr>
              <th>ID</th>
              <th>USER ID</th>
              <th>TITLE</th>
              <th>BODY</th>
              <th>OPERATION</th>
            </tr>
    </thead>
    <tbody>
  { this.state.posts.map((post,index) => {
    if(this.state.linepicker!==index){
      return       <tr key={post.id}> 
    <td className = 'idCo'>{post.id}</td>
    <td className = 'userIdCo' onClick = {()=>this.click(index,'userId')}>{post.userId}&nbsp;</td>
    <td className = 'titleCo' onClick = {()=>this.click(index,'title')}>{post.title}&nbsp;</td>
    <td className = 'bodyCo'  onClick = {()=>this.click(index,'body')}>{post.body}&nbsp;</td>
    <td className = 'buttonCo'> <button onClick =  {()=>this.delete(index)}>Delete</button></td>
    </tr>}
    else{
    switch(this.state.pointer){
      case 'userId':
          return <tr key={post.id}> 
                  <td className = 'idCo'>{post.id}</td>
                  <td><label>userId:
                      <input type="number" name="userId" 
                      onChange={(event,name)=>this.handleChange(event,index,name = 'userId')}
                      onKeyDown = {(event) => {this.keydown(event,index )}}/>
                  </label></td>
                  <td className = 'titleCo' onClick = {()=>this.click(index,'title')}>{post.title}&nbsp;</td>
                  <td className = 'bodyCo'  onClick = {()=>this.click(index,'body')}>{post.body}&nbsp;</td>
                  <td className = 'buttonCo'> <button onClick =  {()=>this.delete(index)}>Delete</button></td>
                  </tr>
       case 'title':
        return <tr key={post.id}>  
                  <td className = 'idCo'>{post.id}</td>
                  <td className = 'userIdCo' onClick = {()=>this.click(index,'userId')}>{post.userId}&nbsp;</td>
                  <td><label>title:
                      <input type="text" name="title" 
                      onChange={(event,name)=>this.handleChange(event,index,name = 'title')}
                      onKeyDown = {(event) => {this.keydown(event,index )}}/>
                  </label></td>
                  <td className = 'bodyCo'  onClick = {()=>this.click(index,'body')}>{post.body}&nbsp;</td>
                  <td className = 'buttonCo'> <button onClick =  {()=>this.delete(index)}>Delete</button></td>
                  </tr>
         default:
            return <tr key={post.id}>  
                  <td className = 'idCo'>{post.id}</td>
                  <td className = 'userIdCo' onClick = {()=>this.click(index,'userId')}>{post.userId}&nbsp;</td>
                  <td className = 'titleCo' onClick = {()=>this.click(index,'title')}>{post.title}&nbsp;</td>
                  <td><label>body:
                        <input type="text" name="body" 
                        // value={this.state.posts[index].userId} 
                        onChange={(event,name)=>this.handleChange(event,index,name = 'body')}
                        onKeyDown = {(event) => {this.keydown(event,index )}}/>
                  </label></td>
                  <td className = 'buttonCo'> <button onClick =  {()=>this.delete(index)}>Delete</button></td>
                  </tr>
    }}    
  }  
    )
    }
  {/* <br/><br/> */}
  </tbody>

  </table>
</ul>
 
 

     return (
      <div className = 'App-header'>

    
        {postinfo}
      {/* <button onClick = {()=>this.create()}>add item</button> */}
      
  
    


      </div>
    )
 
   


}
}
export default App;
