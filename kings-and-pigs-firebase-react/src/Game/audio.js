

//audio  library
import {Howl} from 'howler';

// Audio for the game 
import audioFireFlowerShot from './audio/audioFireFlowerShot.mp3';
import audioCompleteLevel from './audio/audioCompleteLevel.mp3';
import audioDescend from './audio/audioDescend.mp3';
import audioDie from './audio/audioDie.mp3';
import audioFireworkBurst from './audio/audioFireworkBurst.mp3';
import audioFireworkWhistle from './audio/audioFireworkWhistle.mp3';
import audioGameOver from './audio/audioGameOver.mp3';
import audioJump from './audio/audioJump.mp3';
import audioLosePowerUp from './audio/audioLosePowerUp.mp3';
import audioMusicLevel1 from './audio/audioMusicLevel1.mp3';
import audioObtainPowerUp from './audio/audioWinLevel.mp3';
import goombaSquash from './audio/goombaSquash.mp3';






// export const audioFireFlowerShotAudio = new Audio(audioFireFlowerShot)

export const audio = {
         completeLevel: new Howl(
        {
           src: [audioCompleteLevel],
           volume: 0.2
        }),
        fireFlowerShot: new Howl(
        {
           src: [audioFireFlowerShot],
           volume: 0.2
        }),
        descend: new Howl(
        {
           src: [audioDescend],
           volume: 0.2
        }),
        die: new Howl(
        {
           src: [audioDie],
           volume: 0.2
        }),
        fireworkBurst: new Howl(
        {
           src: [audioFireworkBurst],
           volume: 0.2
        }),
        fireworkWhistle: new Howl(
        {
           src: [audioFireworkWhistle],
           volume: 0.2
        }),
        gameOver: new Howl(
        {
           src: [audioGameOver],
           volume: 0.2
        }),
        jump: new Howl(
        {
           src: [audioJump],
           volume: 0.2
        }),
        losePowerUp: new Howl(
        {
           src: [audioLosePowerUp],
           volume: 0.2
        }),
        musicLevel1: new Howl(
        {
            //music of the game
           src: [audioMusicLevel1],
           volume: 0.2,
           loop: true,
           autoplay: true
        }),
        obtainPowerUp: new Howl(
        {
           src: [audioObtainPowerUp],
           volume: 0.2
        }),
        goombaSquash: new Howl(
        {
           src: [goombaSquash],
           volume: 0.2
        })
}