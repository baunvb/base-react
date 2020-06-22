import React from 'react'
import "./section-inner.css"
class SectionInner extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="section-inner-wrap">
                {children}
            </div>
        )
    }
}

export default SectionInner;