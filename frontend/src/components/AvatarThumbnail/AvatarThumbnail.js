import React from 'react';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import {apiURL} from "../../constants";

const styles = {
    width: '30px',
    height: '30px',
    marginRight: '5px'
};

const AvatarThumbnail = props => {
    let image = imageNotAvailable;

    if (props.avatar) {
        image = apiURL + '/uploads/' + props.avatar;
    }
    if (props.user.facebookId){
        image = props.user.avatar;
    }

    return <img src={image} style={styles} className="img-avatar" alt="Avatar" />;
};

export default AvatarThumbnail;