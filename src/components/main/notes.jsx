/*CALLBACKS - METHOD 1*/
  Constructor:  this.handleClick = this.handleClick.bind(this);
  Callback:     handleClick(▒▒▒▒) {...}
  Call:         <Component key={▒▒▒▒} onClick={() => this.handleClick(▒▒▒▒)}>


{/*CALLBACKS - METHOD 2*/}

  Constructor:  this.handleClick = this.handleClick.bind(this);
  Callback:     handleClick(e) { ...e.target.dataset.▒▒▒▒ }
  Call:         <Component key={▒▒▒▒} data-▒▒▒▒={▒▒▒▒} onClick={this.handleClick}>


{/*TRANSFERRING PROPS:*/}
  <Component {...this.props} more='values' />


{/*CHANGING STATE:*/}
  this.setState({
    isHidden: !this.state.isHidden
  })

  this.setState((state, props) => ({
    title: newTitle
  }));

  this.setState((state) => state.title = newTitle);

  this.setState((state) => {
    return state.title = newTitle
  });


{/*INVALID STATE CHANGE (B/C NO RETURN STATEMENT):*/}
  this.setState((state) => {
    state.title = newTitle
  });

