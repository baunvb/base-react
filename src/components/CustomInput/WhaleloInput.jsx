import React from 'react';
import 'components/CustomInput/whaleloinput.css';
import iconSelect from 'assets/img/wlicon/icon_select.png';
import mobiscroll from '@mobiscroll/react';
import DateInput from 'components/CustomInput/DateInput.jsx';
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}
class WhaleloInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  setItemCount = (event, inst) => {
    console.log("setItemCount", event, inst)
  }

  showInvalid = (str) => {
    this.setState({
      invalidText: str
    })
  }

  hideInvalid = () => {
    this.setState({
      invalidText: undefined
    })
  }


  render() {
    const { name, label, selectAble, type, value } = this.props;
    const {invalidText} = this.state;
    console.log("Rerender" + name)

    return (
      <div className="wrap-whalelo-input">
        <span className="lable-input">{label}</span>
        <div className="wrap-input">
          <input
            disabled={type !== "text"}
            value={type != "text" ? "" : value}
            type="text"
            className="input-login"
            name={name}
            onChange={(e) => this.props.onChange(e)}
          >
          </input>
          {
            selectAble && <img className="icon-select" src={iconSelect} />
          }
          {
            type === "date" && <mobiscroll.Date name={name} value={value} className="mobiscroll" lang="vi" onSet={(event, inst) => this.props.onSet(event, inst, name)} />
          }

          {
            type === "time" && <mobiscroll.Time name={name} value={value} className="mobiscroll" lang="vi" onSet={(event, inst) => this.props.onSet(event, inst, name)} />
          }

          {
            type === "select" && <mobiscroll.Select className="select" display="bubble" value={value} data={this.props.items} className="mobiscroll" lang="vi" onSet={(event, inst) => this.props.onSet(event, inst, name)}>
              <mobiscroll.Input inputStyle="box"></mobiscroll.Input>
            </mobiscroll.Select>
          }

        </div>
        { 
          invalidText &&
          <span className="text-invalid">{invalidText}</span>
        }
      </div>
    )
  }

}

WhaleloInput.defaultProps = {
  selectAble: false,
  type: "text"
}

export default WhaleloInput