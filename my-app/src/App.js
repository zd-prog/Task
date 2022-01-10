import './App.css';
import {LogIn} from './LogIn'
import {Home} from './Home'
import {User} from './User'

import {BrowserRouter, Route, Routes, NavLink, Link} from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min';

export class App extends Component {

  constructor(props)
  {
    super(props)

    this.state = {
    LoggedUser: new User
  }

  }
  
  updateData = (value) => {
   this.setState({LoggedUser: new User(value.Id, value.Name, value.Password, value.Email, value.Role)})
  }

  
  render()
  {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" exact exact element={<LogIn updateData={this.updateData}/>}/>
        <Route path="/home" exact element={<Home LoggedUser={this.state.LoggedUser} />}/>
    </Routes>
     </BrowserRouter>
  );
  }
  
}

export default App;
