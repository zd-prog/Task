import React, {Component} from "react";
import {variables} from './Variables.js'
import { User} from "./User.js";

export class Home extends Component {
  constructor(props)
    {
      super(props);

      this.state={
        tasks:[],
        modalTitle:"",
        Id: 0,
        UserId: 0,
        API: "",
        Name: "",
        Description: "",
        Period: "",
        User: new User,
        City:""
      }
    }

    refreshList()
    {
      fetch(variables.API_URL+'task/' + 2).then(response=>response.json()).then(data=>{
        this.setState({tasks:data});
      });
    }

    componentDidMount()
    {
      console.log(this.props)
      this.User = new User(this.props.LoggedUser.Id, this.props.LoggedUser.Name, this.props.LoggedUser.Password, this.props.LoggedUser.Email, this.props.LoggedUser.Role) 
      this.refreshList();
    }

    changeAPI=(e)=>{
      this.setState({API:e.target.value})
    }
    changeName = (e)=>{
      this.setState({Name:e.target.value});
    }
    changeDescription =(e)=>{
      this.setState({Description:e.target.value})
    }
    changePeriod=(e)=>{
      this.setState({Period:e.target.value})
    }
    changeCity=(e)=>{
      this.setState({City:e.target.value})
    }
    changeCountry=(e)=>{
      this.setState({Country:e.target.value})
    }
    changeAccount=(e)=>{
      this.setState({Account:e.target.value})
    }

    addClick()
    {
      this.setState({
        modalTitle:"Add task",
        Id: 0,
        UserId: 0,
        API: "Weather",
        Name: "",
        Description: "",
        Period: "1"
      });
    }

    editClick(task)
    {
      this.setState({
        modalTitle:"Edit task",
        Id: task.Id,
        UserId: task.UserId,
        API: task.API,
        Name: task.Name,
        Description: task.Description,
        Period: task.Period
      })
    }

    createClick()
    {
      fetch(variables.API_URL+'task', {
        method:'POST', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          UserId: 2,
          API:this.state.API,
          Name:this.state.Name,
          Description:this.state.Description,
          Period:this.state.Period
        })
      }).then(res=>res.json()).then((result)=>{
        alert(result);
        this.refreshList();
      }, error=>{
        alert('Failed')
      })
    }

    updateClick()
    {
      fetch(variables.API_URL+'task', {
        method:'PUT', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Id:this.state.Id,
          UserId: 2,
          API:this.state.API,
          Name:this.state.Name,
          Description:this.state.Description,
          Period:this.state.Period
        })
      }).then(res=>res.json()).then((result)=>{
        alert(result);
        this.refreshList();
      }, error=>{
        alert('Failed')
      })
    }

    deleteClick(id)
    {
      if(window.confirm("Are you sure?"))
      fetch(variables.API_URL+'task/' + id, {
        method:'DELETE', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      }).then(res=>res.json()).then((result)=>{
        alert(result);
        this.refreshList();
      }, error=>{
        alert('Failed')
      })
    }

  render()
  {

    

     const {
        tasks,
        modalTitle,
        Id,
        UserId, 
        API,
        Name,
        Description,
        Period, 
        City,
        Country,
        Account
      }=this.state;
    return(
     
      <div>
        <h3>Home page</h3>
        <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Add task</button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                Id
              </th>
              <th>
                UserId
              </th>
              <th>
                API
              </th>
              <th>
                Name
              </th>
              <th>
                Description
              </th>
              <th>
                Period
              </th>
              <th>
                LastUsed
              </th>
              <th>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t=>
              <tr key = {t.Id}>
                <td>{t.Id}</td>
                <td>{t.UserId}</td>
                <td>{t.API}</td>
                <td>{t.Name}</td>
                <td>{t.Description}</td>
                <td>{t.Period}</td>
                <td>{t.LastUsed}</td>
                <td>
                  <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(t)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                  </button>
                  <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(t.Id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              
              <div className="modal-body">

                <div className="input-group mb-3">
                  <span className="input-group-text">API</span>
                  <select className="form-select" onChange={this.changeAPI} value={API}>
                    <option>Weather</option>
                    <option>Covid-19</option>
                    <option>Instagram</option>
                  </select>
                </div>

              {API=='Weather'?
                <div className="input-group mb-3">
                  <span className="input-group-text">City</span>
                  <select className="form-select" onChange={this.changeCity} value={City}>
                    <option>London</option>
                    <option>Minsk</option>
                    <option>Moscow</option>
                    <option>Brest</option>
                    <option>New York</option>
                  </select>
                </div>:null}

              {API=='Covid-19'?
                <div className="input-group mb-3">
                  <span className="input-group-text">Country</span>
                  <select className="form-select" onChange={this.changeCountry} value={Country}>
                    <option>Belarus</option>
                    <option>Russia</option>
                    <option>USA</option>
                    <option>Italy</option>
                    <option>Canada</option>
                  </select>
                </div>:null}
                
              {API=='Instagram'?
                <div className="input-group mb-3">
                  <span className="input-group-text">Account</span>
                  <select className="form-select" onChange={this.changeAccount} value={Account}>
                    <option>arianagrande</option>
                    <option>kyliejenner</option>
                    <option>selenagomez</option>
                  </select>
                </div>:null}
            
                <div className="input-group mb-3">
                  <span className="input-group-text">Name</span>
                  <input type="text" className="form-control" value={Name} onChange={this.changeName}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Description</span>
                  <input type="text" className="form-control" value={Description} onChange={this.changeDescription}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Period (in days)</span>
                  <select className="form-select" onChange={this.changePeriod} value={Period}>
                    <option>1</option>
                    <option>7</option>
                    <option>30</option>
                  </select>
                </div>

                {Id==0?
                <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>:null}

                {Id!=0?
                <button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>Update</button>:null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}