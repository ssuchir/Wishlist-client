import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Items from '../routes/Items.js'
import Item from '../routes/Item.js'
import ItemCreate from '../routes/ItemCreate.js'
import ItemEdit from '../routes/ItemEdit.js'
// import Nav from '../shared/Nav.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items' render={(props) => (
            <Items {...props} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id' render={(props) => (
            <Item {...props} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-item' render={(props) => (
            <ItemCreate {...props} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id/edit' render={(props) => (
            <ItemEdit {...props} alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}
// took out <Nav/> after </main>
export default App
