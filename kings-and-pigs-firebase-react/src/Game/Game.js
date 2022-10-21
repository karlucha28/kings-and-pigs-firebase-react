import { React, useRef, useEffect} from 'react';
//~~~~~~~~~~~~~~~~~~~~~~IMAGES~~~~~~~~~~~~~~~~~~~~~
import platform from './ImagesGame/platform.png';
import background from './ImagesGame/background.png';
import hills from './ImagesGame/hills.png';
import platformSmallTall from './ImagesGame/platformSmallTall.png';
import spriteRunLeft from './ImagesGame/spriteRunLeft.png';
import spriteRunRight from './ImagesGame/spriteRunRight.png';
import spriteStandLeft from './ImagesGame/spriteStandLeft.png';
import spriteStandRight from './ImagesGame/spriteStandRight.png';

// console.log(platform)






function Game() {
    
    const ref = useRef(null);

    useEffect(() => {
         // 👇️ use a ref (best)
    const canvas = ref.current;
    

    const c = canvas.getContext('2d')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~RESOLUTION~~OF~~~THE~~GAME~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    canvas.height = 576
    // window.innerHeight
    canvas.width = 1024
    //  window.innerWidth;

    // console.log(c);

      //------------or this ---------------//
     // const canvas = document.querySelector('canvas')

    // const c = canvas.getContext('2d')

    // console.log(c)
    
    //gravity of player
    const gravity = 1

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLAYER~~~~CLASS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    class Player {
        constructor() {
            this.speed = 5
            this.position = {
                x: 100,
                y: 100
            }
            this.velocity = {
                x: 0,
                y: 0
            }
            this.width = 66
            this.height = 150

            //image of my character
            this.image = createImage(spriteStandRight)
            this.frames = 0


            this.sprites = {
                stand: {
                    right: createImage(spriteStandRight),
                    left: createImage(spriteStandLeft),
                    cropWidth: 177,
                    width: 66
                },
                run: {
                    right: createImage(spriteRunRight),
                    left: createImage(spriteRunLeft),
                    cropWidth: 341,
                    width: 127.875
                } 
            }
            this.currentSprite = this.sprites.stand.right
            this.currentCropWidth = 177

        }


        draw() {
            // c.fillStyle = 'red'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
            c.drawImage(
                this.currentSprite,
                this.currentCropWidth * this.frames,
                0,
                this.currentCropWidth,
                400,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )
        }


        update() {
            //number of frames 
            this.frames++
            if (this.frames >59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) this.frames = 0
            else if (this.frames >29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left))  this.frames = 0
            this.draw()
            //updaty y coordinate
            this.position.y += this.velocity.y
            //updaty x coordinate
            this.position.x += this.velocity.x

            //velocity of gravity
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
            // if we want player to keep falling (Death Pits)
            // else this.velocity.y = 0  
            
            
        }


    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLATFORMS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    class Platform {
        constructor({x, y, image}) {
            this.position = {
                x: x,
                y: y
            }
           

            this.image = image



            this.width = image.width
            this.height = image.height


            
        }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GENERIC~~OBJECT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     class GenericObject {
        constructor({x, y, image}) {
            this.position = {
                x: x,
                y: y
            }
           

            this.image = image



            this.width = image.width
            this.height = image.height


            
        }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY~~GOOMBA!!!!!!!!!~~~~~~~~~~~~
    class Goomba {         //enemy
        constructor({position, velocity}){
            this.position = {
                x: position.x,
                y: position.y,
            }


            this.velocity = {
                x: velocity.x,
                y: velocity.y,
            }

            this.width = 50
            this.height = 50
        }


        draw(){
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }

        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y






             //velocity of gravity
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        }
    }




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~image for objects~~~~~~~~~~~~~~~~~~
    function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
    }
//~~~~~~~~~~~~~~~~~~~~~~~~~create~~~~~~images~~~~~~~~where~we~need~async~~~~~~~~~~~
    function createImageAsync(imageSrc){
        return new Promise((resolve) => {
            const image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.src = imageSrc
            // return image
        })
        
        }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START~~~~~~~~VALUES~~~~~~~~~~~~~~~~~
    let player = new Player()
    //~~~~~~~~~~~~~~~~~~~~~ARRAY OF ALL PLATFORMS~~
    let platformImage   //= createImage(platform) //I am doing asunc
    let platformSmallTallImage   //= createImage(platformSmallTall) //I am doing asunc
    let platforms = []

    //~~~~~~~~~~~~~~~~~~~~~~~~GENERIC~~~OBJECTS~~~
    let genericObjects = []
    // enemys goombas
    let goombas = []

    let lastKey 

    let scrollOffset = 0


    //collusion detection for platforms
        function isOnTOpOfPlayform({object,platform}){
            return  (
                object.position.y + object.height <= platform.position.y 
            && object.position.y + object.height + object.velocity.y >= platform.position.y
            && object.position.x + object.width >= platform.position.x
            && object.position.x <= platform.position.x + platform.width
            )
        }

    //collusion detection on top of second object
    function collisionTOp({object1,object2}){
        return  (
            object1.position.y + object1.height <= object2.position.y 
        && object1.position.y + object1.height + object1.velocity.y >= object2.position.y
        && object1.position.x + object1.width >= object2.position.x
        && object1.position.x <= object2.position.x + object2.width
        )
    }
   

  
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INIT~~~FUNCTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    async function init() {
     
    //~~~~~~~~~~~~~~~~~~~~~ARRAY OF ALL PLATFORMS~~~~~~~~~~~~REEEEEENDERING~~~~~~~~~~~~~~~~~
    //async images rendering
     platformImage = await createImageAsync(platform)
     platformSmallTallImage = await createImageAsync(platformSmallTall)
     console.log(platformImage.width)

    //  createImageAsync(platform).then((platformImage) => {     })  //cleaner 

        //create players
    player = new Player()
        //create goombas
        goombas = [new Goomba({
            position: {
            x: 800,
            y: 100
        },
        velocity: {
            x: -0.3,
            y: 0,
        }
    })]

    



     platforms = [new Platform({
        x: 0,
         y:470,
         image: platformImage
    }),
    new Platform({
        x: platformImage.width -2,
         y:470,
          image: platformImage }),
         new Platform({
        x: platformImage.width*2 +100,
         y:470,
          image: platformImage }),
          new Platform({
         x: platformImage.width*3 +300,
          y:470,
           image: platformImage }),
           new Platform({
          x: platformImage.width*4 +400,
           y:370,
            image: platformSmallTallImage }),
            new Platform({
             x: platformImage.width*5 +200,
             y:270,
            image: platformImage }),
            new Platform({
           x: platformImage.width*6 +400,
            y:270,
             image: platformSmallTallImage }),
            new Platform({
           x: platformImage.width*6 +300,
            y:470,
             image: platformImage })]

    //~~~~~~~~~~~~~~~~~~~~~~~~GENERIC~~~OBJECTS~~~~~~~~~~~~REEEEEEEENDERIN~~~~~~~~~~~~~~~~~~~~~~~~
     genericObjects = [
        new GenericObject({
            x: 0,
            y: 0,
            image: createImage(background)
        }),
        new GenericObject({
            x: 0,
            y: 0,
            image: createImage(hills)
        })
    ]

    scrollOffset = 0
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INIT~~~FUNCTION~~~~~END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    //checks if the keys are prssed
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }

    }
    

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ANIMATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    init() //give init values 
    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)
        //clearRect if I want to see background images

        genericObjects.forEach(genericObject => {
            genericObject.draw()
        })
       
        //~~~~~~~~draw all platforms~~~~~~~
        platforms.forEach(platform => {
            platform.draw()
        })


        goombas.forEach((goomba, index) => {
            goomba.update()

            if (collisionTOp({
                object1: player,
                object2: goomba
            })) {
                //height of jump after kiling a goomba
                player.velocity.y -= 40
                //deleting of a goomba from the array of goombas
                setTimeout(()=> {
                    goombas.splice(index, 1)
                }, 0)
               
            } else if (
                player.position.x + player.width >= goomba.position.x
                && player.position.y + player.height >= goomba.position.y
                && player.position.x  <= goomba.position.x + goomba.width
            ) init()
        })

        player.update()
        
        
        
        //~~~~~~~~~~~~~~~horizontal velocity~~~~~~~~~~~~~~~~~~~
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = player.speed
        } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x >0)) {
            player.velocity.x = -player.speed
        } else {
            player.velocity.x = 0
            

            //~~~~~~~~~~~~~platform scroling on back plus PARALAX EFFECT~~~~~~~~~~~
            if (keys.right.pressed) {
                //win scenario calculation
                scrollOffset += player.speed
                //~speed of platforms Objects~~to~the~~right~Button~
                platforms.forEach(platform => {
                    platform.position.x -= player.speed
                })
                //~speed of feneric Objects~~to~the~~right~Button~
                genericObjects.forEach(genericObject  => {
                    genericObject.position.x -= player.speed*.6
                })

                 //~speed of GOOOMBA Objects~~to~the~~right~Button~
                 goombas.forEach(goomba => {
                    goomba.position.x -= player.speed
                })
                
            } else if (keys.left.pressed && scrollOffset > 0)  {
                //win scenario calculation
                scrollOffset -= player.speed
                //~speed of platforms Objects~~to~the~~left~Button~
                platforms.forEach(platform => {
                    platform.position.x += player.speed
                })
                //~speed of feneric Objects~to~the~left~Button~
                genericObjects.forEach(genericObject  => {
                    genericObject.position.x += player.speed*.6
                })

                 //~speed of GOOOMBA Objects~~to~the~~left~Button~
                 goombas.forEach(goomba => {
                    goomba.position.x += player.speed
                })
                
            }
        
        }

        // console.log(scrollOffset)


        //~~~~~~~~~~~~~~~~~~~~platform~~colusion~~detection~~~~~~~~~~~~~~~~~~~~~~~~~
        platforms.forEach(platform => {

            //player collusions
        if (
            //collusion on top of platform
            isOnTOpOfPlayform({
                object: player,
                platform: platform
            })
        ) {
            player.velocity.y = 0
        }

        goombas.forEach(goomba => {
            if (isOnTOpOfPlayform({
                object: goomba,
                platform: platform
            })
            )
            goomba.velocity.y = 0
        })


        })

       //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONDITIONS~~~FOR~~~RUNNUNGS~~AND~~~STANDINGS~~~~~~~~~~~~~~~~~~~
        //sprite switching condition
        if (keys.right.pressed &&
            lastKey === "right" && player.currentSprite !== player.sprites.run.right) {
            player.frames = 1
            player.currentSprite = player.sprites.run.right
                    player.currentCropWidth = player.sprites.run.cropWidth
                    player.width = player.sprites.run.width
        } else if (keys.left.pressed &&
            lastKey === 'left' && player.currentSprite !== player.sprites.run.left){
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        } 
        else if (!keys.left.pressed &&
            lastKey === 'left' && player.currentSprite !== player.sprites.stand.left){
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        } else if (!keys.right.pressed &&
            lastKey === 'right' && player.currentSprite !== player.sprites.stand.right){
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        }
        //win condition
        if (platformImage && scrollOffset > platformImage.width*6 +600) {
            console.log("you win")
        }

        //lose condition
        if (player.position.y > canvas.height){
            console.log("you lose")
            init() //to get start values
        }
    }




    animate()
    window.addEventListener('keyup', (event) => {
       
        switch (event.keyCode){
                 case 65:
                    //  console.log("left")
                     keys.left.pressed = false
                     player.currentSprite = player.sprites.stand.left
                     player.currentCropWidth = player.sprites.stand.cropWidth
                     player.width = player.sprites.stand.width
                     break

                case 83:
                    // console.log("down")
                    break
    
                case 68:
                    // console.log("right")
                    keys.right.pressed = false
                    player.currentSprite = player.sprites.stand.right
                    player.currentCropWidth = player.sprites.stand.cropWidth
                    player.width = player.sprites.stand.width
                    // player.velocity.x = 0
                    break
                    
                case 87:
                    // console.log("up")
                    break
        }
       console.log(keys.right.pressed)
    })

    window.addEventListener('keydown', (event) => {
       
        switch (event.keyCode){
                 case 65:
                    //  console.log("left")
                     keys.left.pressed = true
                    lastKey = 'left'
                     break

                case 83:
                    // console.log("down")
                    break
    
                case 68:
                    // console.log("right")
                    keys.right.pressed = true
                    lastKey = 'right'
                    // player.velocity.x += 7
                    break
                    
                case 87:
                    // console.log("up")
                    player.velocity.y -= 20
                    break
        }
    
       
    })

    }, []);





 
    return (
        <>
        <canvas ref={ref} id="game_canvas"></canvas>

        </>
)
}


export default Game;