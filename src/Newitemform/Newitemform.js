import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import styles from './Newitemform.module.css';
import './Newitemform.module.css';
import axios from 'axios'; 


 class Newitemform extends Component {
    state = {
        userId:'',
        body:'',
        title:'',
        ifredirect: 1,
        id:'',
        posts:[],
        idclasses:'',
        titleclasses:'',
        bodyclasses:''
    };
    handleSubmit = this.handleSubmit.bind(this);
    handleInputChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
        if(this.state.userId.length>0 && this.state.userId.charAt(0)!='-'){
            this.setState({
                idclasses:''
            })}
            if((this.state.title.replace(/(^\s*)|(\s*$)/g, '')).length!=0){
            this.setState({
                titleclasses:''
            })}
        if((this.state.body.replace(/(^\s*)|(\s*$)/g, '')).length!=0){
            this.setState({
                bodyclasses:''
            })}
      }

      handleSubmit(event) {
        this.setState({
            ifredirect:2
        })
        if(this.state.userId =='' || this.state.userId.charAt(0)=='-'){
            this.setState({
                idclasses:styles.red
                
            })
            this.setState({
                ifredirect:1
            })
        }
        if((this.state.title.replace(/(^\s*)|(\s*$)/g, '')).length==0 ){
            this.setState({
                titleclasses:styles.red
            })
            this.setState({
                ifredirect:1
            })
        }
       if((this.state.body.replace(/(^\s*)|(\s*$)/g, '')).length==0
        ){
            this.setState({
                bodyclasses:styles.red
            })
            this.setState({
                ifredirect:1
            })
            console.log(this.state.ifredirect)
        }
         axios.post( 'https://jsonplaceholder.typicode.com/posts' , {
            userId:  this.state.userId,
            title : this.state.title,
            body : this.state.body,
          })
          .then( res => { 
            console.log(res);
            let newPost = res.data;
            newPost.id =this.state.id;
            let newData = [...this.state.posts, newPost];
            this .setState({
              posts : newData,
              id: this.state.id +1
            });
            
            if(this.state.ifredirect==2){
                alert("new record added:"+  "    "+res.data.userId+  "    "+ res.data.title+" "+  "    "+res.data.body)
                this.setState({ifredirect:3})
            }
          }
          ) 
          .catch( err => console .log(err));
        event.preventDefault();
      }
    
      renderredirect(){
        if(this.state.ifredirect==3){       
        return <Redirect to='/' />
      }
      }

    render(){
        return(
            <div>
            {this.renderredirect()} 
                <h3>Add a Post</h3><br/>
                <form onSubmit={this.handleSubmit}>
                <label>USER ID         
                    <input
                    className = {this.state.idclasses}
                    name="userId"
                    type="number"
                    onChange= {(evt) =>this.handleInputChange(evt)}
                    />
                </label>
                <br />
                <label>TITLE
                    <input
                    className = {this.state.titleclasses}
                        name="title"
                        type="text"
                        onChange= {(evt) =>this.handleInputChange(evt)}
                    />
                </label><br/>
                <label>BODY
                    <input
                    className = {this.state.bodyclasses}
                        name="body"
                        type="text"
                        onChange= {(evt) =>this.handleInputChange(evt)}
                    />
                </label><br/>
                <input type="submit" value="submit" />
                </form>
            </div>
            )
    }
}
export default Newitemform;
