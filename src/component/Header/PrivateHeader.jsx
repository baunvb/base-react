import React from 'react'
import Hidden from '@material-ui/core/Hidden';
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Hidden mdUp>
          <MobileHeader {...this.props}/>
        </Hidden>

        <Hidden mdDown>
          <DesktopHeader {...this.props}/>
        </Hidden>
      </div>
    )
  }
}

export default Header