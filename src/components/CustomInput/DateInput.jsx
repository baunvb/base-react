import React from 'react';

import mobiscroll from '@mobiscroll/react';
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}

class DateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {
    const {name, value} = this.props;
    return (
      <mobiscroll.Time name={name} value={value} className="mobiscroll" lang="vi" onSet={(event, inst) => this.props.onSet(event, inst, name)} />
    )
  }

}

export default DateInput