import React, {Component} from "react";
import {variables} from './Variables.js'
import {Home} from './Home'
import {BrowserRouter, Route, Routes, NavLink, Link} from 'react-router-dom'
import {User} from './User'

export class LogIn extends Component{
  
  
  constructor(props)
  {
    super(props);

    this.state={
        users:[],
        modalTitle:"",
        Id: 0,
        Name: "",
        Password: "",
        Email: "",
        Role: "",
        LoggedUser:"",
        User: new User
      }
  }

    changeName=(e)=>{
      this.setState({Name:e.target.value})
    }
    changeEmail=(e)=>{
      this.setState({Email:e.target.value})
    }
    changePassword = (e)=>{
      this.setState({Password:e.target.value});
    }

    signUpClick()
    {
        this.setState({
        modalTitle:"Sign up",
        Name: "",
        Password: "",
        Email: ""
      });
    }

    signInClick()
    {
      fetch(variables.API_URL+'signIn', {
        method:'POST', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:this.state.Email,
          Password:this.state.Password
        })
      }).then(res=>res.json()).then((result)=>{
        if (result == "No such user!")
        {
          alert(result)
        }
        else
        {
          this.users=result
          console.log(result)
        this.User = new User(this.users[0].Id, this.users[0].Name, this.users[0].Password, this.users[0].Email, this.users[0].Role)
        document.location.assign("/home")
        this.props.updateData(this.User)
        }
        
      }, error=>{
        alert('Failed')
      })
    }

    createClick()
    {
      fetch(variables.API_URL+'user', {
        method:'POST', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Name:this.state.Name,
          Email:this.state.Email,
          Password:this.state.Password
        })
      }).then(res=>res.json()).then((result)=>{
        alert(result);
        this.LoggedUser = this.state.Email
        document.location.assign("/home")
      }, error=>{
        alert('Failed')
      })
    }

  render()
  {
    const {
       users, 
       modalTitle,
        Id,
        Name,
        Password,
        Email,
        Role,
        LoggedUser,
        User
    }=this.state

    return(

      <div>
        <h3>Log in system</h3>

            <div className="modal-body">

                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input type="text" className="form-control" value={Email} onChange={this.changeEmail}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Password</span>
                  <input type="text" className="form-control" value={Password} onChange={this.changePassword}/>
                </div>

                {0==0?
                <button type="button" className="btn btn-primary float-start" onClick={()=>this.signInClick()}>Sign In</button>:null}
                {0==0?
                 <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.signUpClick()}>Sign Up</button>:null}

              </div>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              
              <div className="modal-body">

                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input type="text" className="form-control" value={Email} onChange={this.changeEmail}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Nickname</span>
                  <input type="text" className="form-control" value={Name} onChange={this.changeName}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Password</span>
                  <input type="text" className="form-control" value={Password} onChange={this.changePassword}/>
                </div>

                {Id==0?
                <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>:null}


              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    )
  }
}