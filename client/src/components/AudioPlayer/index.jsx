import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less';
import 'react-h5-audio-player/src/styles.scss';
import style from './index.module.scss';

const Player = (props) => (
    <AudioPlayer
      {...props}
      onPlay={e => console.log("onPlay")}
    />
);

export default Player;