import backgroundLv2 from './ImagesGame/level2/background.png';

import lgPlatformLv2 from './ImagesGame/level2/lgPlatform.png';
import mountainLv2 from './ImagesGame/level2/mountain.png';
import mountainsLv2 from './ImagesGame/level2/mountains.png';
import sunLv2 from './ImagesGame/level2/sun.png';
import mdPlatformLv2 from './ImagesGame/level2/mdPlatform.png';




import spriteFireFlowerShootLeft from './ImagesGame/player/spriteFireFlowerShootLeft.png';
import spriteFireFlowerShootRight from './ImagesGame/player/spriteFireFlowerShootRight.png';



export const images = {
    player: {
        shoot: {
            fireFlower: {
                right:spriteFireFlowerShootRight,
                left:spriteFireFlowerShootLeft
            }
        }
    },
    levels: {
        1: {
            background: ''
        },
        2: {
            background: backgroundLv2,
            mountains: mountainsLv2,
            lgPlatform: lgPlatformLv2,
            mdPlatform: mdPlatformLv2
        }
    }
}