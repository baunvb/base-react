import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './circledataloading.css'
import { createGenerateClassName } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
const generateClassName = createGenerateClassName({
    productionPrefix: 'loaddata_progress',
});
class CircleDataLoading extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    updateState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        let { loading } = this.state;
        let { content } = this.props;
        return (
            <span>
                {
                    loading ?
                        <span className="price-esti">
                            <JssProvider generateClassName={generateClassName}>
                                <CircularProgress
                                    classes={{ root: "small" }}
                                />
                            </JssProvider>
                        </span> :
                        content
                }

            </span>
        )
    }
}

export default CircleDataLoading