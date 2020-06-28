import React from "react";
import QAcademyClub from "./QAcademyClub"
import QAcademyPricing from "./QAcademyPricing"
import SliderImage from "./SliderImage"
class QAcademyScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
        <SliderImage/>
        <QAcademyPricing/>
        <QAcademyClub/>
      </div>
    )
  }

}

export default QAcademyScreen;