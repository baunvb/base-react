import React from 'react'
import './q-academy-club.css'
import SectionInner from '../../../component/Container/SectionInner'
import {SunQClubData} from '../../../assets/data/SunQClub'

export default class QAcademyClub extends React.Component {
    render() {
        return (
            <div className="q-academy-club-main">
                <SectionInner>
                    <div className="q-academy-wrap-title">
                        <span className="q-academy-club-title">Câu lạc bộ SUNDAYQ</span>
                    </div>
                    <div className="q-academy-club-grid-item">
                        {
                            SunQClubData.map((club, key) => {
                                return (
                                    <div className="q-academy-club-item">
                                        <span className="q-academy-club-item-title">{club.title}</span>
                                <span className="q-academy-club-item-excerpt" dangerouslySetInnerHTML={{__html:club.content}}></span>
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                </SectionInner>
            </div>
        )
    }
}