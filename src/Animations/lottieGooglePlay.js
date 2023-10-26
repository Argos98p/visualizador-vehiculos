import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../lottieFiles/animation_lo69s3ip.json'

export default class LottieGooglePlay extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {isStopped: false, isPaused: false};
    }

    render() {

        const defaultOptions = {

            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return <div className={"error-scene"}>
            <Lottie options={defaultOptions}
                    height="70%"
                    width="70%"
            />

        </div>
    }
}