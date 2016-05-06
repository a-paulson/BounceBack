
  <div className="bb-splash">
    <Modal isOpen={this.state.modal}>
      <SignUpForm />
    </Modal>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">BounceBack</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">

            <a className="mdl-navigation__link" onClick={this.goToSignUp} href="">Sign Up</a>
            <a className="mdl-navigation__link" href="">Recruiters</a>

            <a className="mdl-navigation__link" href="">Contact</a>
          </nav>
        </div>
      </header>
      <div className="mdl-layout__content signin-bg">
        <div className="page-content signin-content">
            {errors}


            {this.getForm}


            </div>
          </div>
          <footer className="mdl-mini-footer">
            <div className="mdl-mini-footer__left-section">
              <div className="mdl-logo">Title</div>
              <ul className="mdl-mini-footer__link-list">
                <li><a href="#">Help</a></li>
                <li><a href="#">Privacy & Terms</a></li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
