import React from 'react';
import 'components/CustomInput/whaleloinput.css';
import iconSelect from 'assets/img/wlicon/icon_select.png';
import mobiscroll from '@mobiscroll/react';
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}
class WhaleloInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { name, label, selectAble, type } = this.props;
    return (
      <div className="wrap-whalelo-input">
        <span className="lable-input">{label}</span>
        <div className="wrap-input">
          <input
            type="text"
            className="input-login"
            name={name}
            onChange={(e) => this.props.onChange(e)}
          >
          </input>
          {
            type === "date" && <mobiscroll.Date name={name} className="mobiscroll" lang="en"  onSet={(event, inst) => this.props.onSet(event, inst, name)} />
          }

          {
            type === "time" && <mobiscroll.Time className="mobiscroll" lang="en" onSet={this.props.onSet} />
          }

          {
            selectAble && <img className="icon-select" src={iconSelect} onClick={e => alert("select")} />
          }
        </div>

      </div>
    )
  }

}

WhaleloInput.defaultProps = {
  selectAble: false,
  type: "text"
}

export default WhaleloInput