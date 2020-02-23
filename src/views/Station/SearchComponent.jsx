import React from 'react';
import 'views/Station/search.css';
import iconSearch from 'assets/img/wlicon/icon_search.png';

class SearchComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowIconSearch: true,
      searchStr: ''
    }

  }

  componentDidMount(){

  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    const {isShowIconSearch, searchStr} = this.state;
    
    return (
      <div className="wrap-search">
          <input className="input-search"
            name='searchStr'
            onFocus={e => {
              this.setState({
                isShowIconSearch: false
              })
            }}
            onBlur={e => {
              if(searchStr.length === 0){
                this.setState({
                  isShowIconSearch: true
                })
              }
             
            }}

            onChange={(e) => this.onChange(e)}

          >
          </input>

          {
            isShowIconSearch ?<img className="icon-serch" src={iconSearch} />
            : null
          }

      </div>
    )
  }

}

export default SearchComponent