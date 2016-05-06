<div>
  {errors}
  <form onSubmit={this.signUp}>
    <label>Username
      <input type="text" onChange={this.changeUsername}
         value={this.state.username} />
    </label>
    <br />
    <br />
    <label>First Name
      <input type="text" onChange={this.changeFname}
         value={this.state.fname} />
    </label>
    <label>Last Name
      <input type="text" onChange={this.changeLname}
         value={this.state.lname} />
    </label>
    <br />
    <br />
    <label>Email
      <input type="text" onChange={this.changeEmail}
         value={this.state.email} />
    </label>
    <br />
    <br />
    <label>Password
      <input type="password" onChange={this.changePassword}
         value={this.state.password} />
    </label>
    <Select name="userType"
      value={this.state.displayedOption}
      options={this.selectOptions}
      onChange={this.changeUserType} />
    <input type="submit" value="Sign Up" />
  </form>
  <button onClick={this.props.reset}>Go Back</button>
</div>
