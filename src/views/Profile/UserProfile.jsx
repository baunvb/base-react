import React from 'react';
import 'views/Profile/profile.css';
import { sessionService } from 'redux-react-session';
import { COOKIE_KEY } from 'config/Constant.js'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

    }

    logout = async () => {
        sessionService.deleteSession();
        document.cookie = `${COOKIE_KEY.TOKEN}=`;
        this.props.history.push('/login')
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProp, prevState) {

    }


    render() {
        return (
            <div className="profile-edit" onClick={(e) => this.logout()}>
                <span className="logout">Logout</span>
            </div>
        )
    }

}

export default UserProfile