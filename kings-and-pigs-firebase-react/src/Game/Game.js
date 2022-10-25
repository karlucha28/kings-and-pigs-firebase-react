import { React, useRef, useEffect} from 'react';


import {
    isOnTOpOfPlayform,
    isOnTOpOfPlatformCircle,
    collisionTOp,
    createImage,
    createImageAsync,
    hitBottomOfPlatform,
    hitSideOfPlatform,
    objectsTouch
} from './Utils'


//~~~~~~~~~~~~~~~~~~~~~~IMAGES~~~~~~~~~~~~~~~~~~~~~
import platform from './ImagesGame/platform.png';
import background from './ImagesGame/background.png';
import hills from './ImagesGame/hills.png';
import platformSmallTall from './ImagesGame/platformSmallTall.png';
import block from './ImagesGame/block.png';
import blockTri from './ImagesGame/blockTri.png';

import spriteFireFlower from './ImagesGame/spriteFireFlower.png';

// import spriteRunLeft from './ImagesGame/spriteRunLeft.png';
// import spriteRunRight from './ImagesGame/spriteRunRight.png';
// import spriteStandLeft from './ImagesGame/spriteStandLeft.png';
// import spriteStandRight from './ImagesGame/spriteStandRight.png';
//regular Mario
import spriteMarioRunLeft from './ImagesGame/spriteMarioRunLeft.png';
import spriteMarioRunRight from './ImagesGame/spriteMarioRunRight.png';
import spriteMarioStandLeft from './ImagesGame/spriteMarioStandLeft.png';
import spriteMarioStandRight from './ImagesGame/spriteMarioStandRight.png';
import spriteMarioJumpLeft from './ImagesGame/spriteMarioJumpLeft.png';
import spriteMarioJumpRight from './ImagesGame/spriteMarioJumpRight.png';

// //Mario under flower
import spriteFireFlowerRunLeft from './ImagesGame/spriteFireFlowerRunLeft.png';
import spriteFireFlowerRunRight from './ImagesGame/spriteFireFlowerRunRight.png';
import spriteFireFlowerStandRight from './ImagesGame/spriteFireFlowerStandRight.png';
import spriteFireFlowerStandLeft from './ImagesGame/spriteFireFlowerStandLeft.png';
import spriteFireFlowerJumpRight from './ImagesGame/spriteFireFlowerJumpRight.png';
import spriteFireFlowerJumpLeft from './ImagesGame/spriteFireFlowerJumpLeft.png';

import spriteGoomba from './ImagesGame/spriteGoomba.png';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

// console.log(platform)






function Game() {
    
    const ref = useRef(null);

    useEffect(() => {
         // 👇️ use a ref (best)
    const canvas = ref.current;
    
    // console.log("hello")
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
            //scale of player
            this.scale = 0.3
            this.width = 398 * this.scale
            this.height = 353 * this.scale

            //image of my character
            this.image = createImage(spriteMarioStandRight)
            this.frames = 0


        this.sprites = {
            stand: {
                right: createImage(spriteMarioStandRight),
                left: createImage(spriteMarioStandLeft),
                fireFlower: {
                    right: createImage(spriteFireFlowerStandRight),
                    left: createImage(spriteFireFlowerStandLeft)
                },
                cropWidth: 398,
                width: 398 * this.scale
            },
            run: {
                right: createImage(spriteMarioRunRight),
                left: createImage(spriteMarioRunLeft),
                fireFlower: {
                    right: createImage(spriteFireFlowerRunRight),
                    left: createImage(spriteFireFlowerRunLeft)
                },
                cropWidth: 398,
                width: 398 * this.scale
            },
            jump: {
                right: createImage(spriteMarioJumpRight),
                left: createImage(spriteMarioJumpLeft),
                fireFlower: {
                    right: createImage(spriteFireFlowerJumpRight),
                    left: createImage(spriteFireFlowerJumpLeft)
                },
                cropWidth: 398,
                width: 398 * this.scale
            }
        }
            this.currentSprite = this.sprites.stand.right
            // this.currentCropWidth = this.sprites.stand.cropWidth
            this.currentCropWidth = 398
            this.powerUps = {
                fireFlower: false
        }
        this.invincible = false

    }


        draw() {
            
            //collusion test color
            // c.fillStyle = 'red'
            c.save()
            c.globalAlpha = this.opacity
            c.fillStyle = 'rgba(255, 0, 0, 0.2)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
            //
            c.drawImage(
                this.currentSprite,
                this.currentCropWidth * this.frames,
                0,
                this.currentCropWidth,
                353,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )
                c.restore()
        }


        update() {
            //number of frames 
            this.frames++
            //destructing 
            const {currentSprite, sprites} = this
            if (this.frames >58 && (
                   this.currentSprite === this.sprites.stand.right 
                || this.currentSprite === this.sprites.stand.left
                || this.currentSprite === this.sprites.stand.fireFlower.right 
                || this.currentSprite === this.sprites.stand.fireFlower.left
                )) this.frames = 0
            else if (this.frames >28 && (
                   currentSprite === sprites.run.right 
                || currentSprite === sprites.run.left 
                || currentSprite === sprites.run.fireFlower.right 
                || currentSprite === sprites.run.fireFlower.left
                ))  this.frames = 0
            else if (
                currentSprite === sprites.jump.right 
                || currentSprite === sprites.jump.left
                || currentSprite === sprites.jump.fireFlower.right 
                || currentSprite === sprites.jump.fireFlower.left
                ) this.frames = 0
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

                //flushing effect after hiting
            if (this.invincible){
                if (this.opacity === 1) this.opacity = 0
                    else this.opacity = 1
            } else this.opacity = 1
            
            
        }


    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLATFORMS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    class Platform {
        constructor({x, y, image, block, text}) {
            this.position = {
                x: x,
                y: y
            }

            this.velocity = {
                x: 0
            }
           

            this.image = image
            this.width = image.width
            this.height = image.height
            this.block = block
            this.text = text


            
        }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
            if(this.text){
            c.fillStyle = 'red'
            c.fillText(this.text, this.position.x, this.position.y)
            }
        }

        update() {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GENERIC~~OBJECT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     class GenericObject {
        constructor({x, y, image}) {
            this.position = {
                x: x,
                y: y
            }
           

            this.velocity = {
                x: 0
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


        update() {
            this.draw()
            this.position.x += this.velocity.x
        }
    }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY~~GOOMBA!!!!!!!!!~~~~~~~~~~~~
    class Goomba {         //enemy
        constructor({position, velocity, distance = {
            limit: 50,
            traveled: 0
        } }){
            this.position = {
                x: position.x,
                y: position.y,
            }


            this.velocity = {
                x: velocity.x,
                y: velocity.y,
            }

            this.width = 43
            this.height = 50

            this.image = createImage(spriteGoomba)
            this.frames = 0

            //distance of walkink back and fourth
            this.distance = distance
        }


        draw(){
            // c.fillStyle = 'red'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)

            c.drawImage(
                this.image,
                130 * this.frames,
                0,
                //width
                130,
                //height
                150,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )
        }

        update(){
            this.frames ++
            if (this.frames >= 58)  this.frames = 0
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y






             //velocity of gravity
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity

            // walk the goomba back and forth
            this.distance.traveled += Math.abs(this.velocity.x)

            if (this.distance.traveled > this.distance.limit) {
                this.distance.traveled = 0
                this.velocity.x = -this.velocity.x
            }
            // console.log(this.distance.traveled)
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIRE~~FLOWER!!!!!!!!!~~~~~~~~~~~~
    class FireFlower {         
        constructor({position, velocity}){
            this.position = {
                x: position.x,
                y: position.y,
            }


            this.velocity = {
                x: velocity.x,
                y: velocity.y,
            }

            this.width = 56
            this.height = 60

            this.image = createImage(spriteFireFlower)
            this.frames = 0

        
        }


        draw(){
            // c.fillStyle = 'red'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)

            c.drawImage(
                this.image,
                56 * this.frames,
                0,
                //width
                56,
                //height
                60,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )
        }

        update(){
            this.frames ++
            if (this.frames >= 75)  this.frames = 0
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y






             //velocity of gravity
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity

        }
    }


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Particle Class Explosion Of Goomba~~~~~~~~~~~~~~~~~~~~~~
    class Particle {
        constructor({
            position,
            velocity,
            radius, 
            color = 'red', 
            fireball = false
        }) {
            this.position = {
                x: position.x,
                y: position.y
            }

            this.velocity = {
                x: velocity.x,
                y: velocity.y
            }

            this.radius = radius
            this.ttl = 300
            this.color = color
            this.fireball = fireball
        }

        draw() {
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0,
                Math.PI * 2, false)
                //goomba color "#654428"
            c.fillStyle = this.color
            c.fill()
            c.closePath()


        }

        update() {
            this.ttl--
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

              //velocity of gravity
              if (this.position.y + this.radius + this.velocity.y <= canvas.height)
              this.velocity.y += gravity * 0.2
        }
    }




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS~~~~~~~~~~~~~~~~~~~~~~~~~~
  

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START~~~~~~~~VALUES~~~~~~~~~~~~~~~~~
    let player = new Player()
    //~~~~~~~~~~~~~~~~~~~~~ARRAY OF ALL PLATFORMS~~
    let platformImage   //= createImage(platform) //I am doing asunc
    let platformSmallTallImage   //= createImage(platformSmallTall) //I am doing asunc
    let blockTriImage
    let platforms = []
    let fireFlowers =[]

    //~~~~~~~~~~~~~~~~~~~~~~~~GENERIC~~~OBJECTS~~~
    let genericObjects = []
    // enemys goombas
    let goombas = []
    // create particles
    let particles = []

    let lastKey 

    let scrollOffset = 0



  
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INIT~~~FUNCTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    async function init() {
     
    //~~~~~~~~~~~~~~~~~~~~~ARRAY OF ALL PLATFORMS~~~~~~~~~~~~REEEEEENDERING~~~~~~~~~~~~~~~~~
    //async images rendering
     platformImage = await createImageAsync(platform)
     platformSmallTallImage = await createImageAsync(platformSmallTall)
     blockTriImage = await createImageAsync(blockTri)
    //  console.log(platformImage.width)

    //  createImageAsync(platform).then((platformImage) => {     })  //cleaner 
        //create fireFlowers
        fireFlowers = [
            new FireFlower({position:{
                x: 400,
                y:100
            },
                velocity:{
                    x:0,
                    y:0
                }})
        ]
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
        },
        distance: {
            limit: 300,
            traveled: 0
        }
        }),
        new Goomba({
            position: {
            x: 1400,
            y: 100
        },
        velocity: {
            x: -0.3,
            y: 0,
        },
        distance: {
            limit: 100,
            traveled: 0
        }
        })
    ]

    

    particles = []
//create platforms
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
             image: platformSmallTallImage,
             block:true }),
            new Platform({
           x: platformImage.width*6 +300,
            y:470,
             image: platformImage,
            //  text: 'here'
             }),
             new Platform({
            x: platformImage.width,
             y:270,
              image: blockTriImage,
            block:true}),
            new Platform({
           x: platformImage.width * 3 -300,
            y:170,
             image: blockTriImage,
           block:true})]

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
            genericObject.update()
            genericObject.velocity.x = 0
        })
       
        //~~~~~~~~draw all platforms~~~~~~~
        platforms.forEach(platform => {
            platform.update()
            platform.velocity.x = 0
        })

        //~~~~~~~~~~~~draw all flowers~~~~~~~~~~
        fireFlowers.forEach((fireFlower, i) => {
            if (objectsTouch({
                object1: player,
                object2: fireFlower
            })
            ) {
                player.powerUps.fireFlower = true
                setTimeout(() => {
                    fireFlowers.splice(i, 1)
                }, 0)
                
            } else fireFlower.update()
        })

        // console.log(player.powerUps.fireFlower)


        goombas.forEach((goomba, index) => {
            goomba.update()

            //remove goomba on fireball hit 
            particles.filter(particle => particle.fireball).forEach((particle, particleIndex) => {
                if (
                    particle.position.x + particle.radius >= goomba.position.x
                    && particle.position.y + particle.radius >= goomba.position.y
                    && particle.position.x - particle.radius <= goomba.position.x + goomba.width
                    && particle.position.y - particle.radius <= goomba.position.y + goomba.height
                    ) { for (let i = 0; i < 50; i++) {
                        particles.push(
                            new Particle({
                            position:{
                                x: goomba.position.x + goomba.width/2,
                                y: goomba.position.y + goomba.height/2,
                            },
                            velocity: {
                                x: (Math.random() - 0.5) * 5, 
                                y: (Math.random() - 0.5) * 15
                            },
                            radius: Math.random()*3
                            })
                        )
                        }
                   
                setTimeout(()=> {
                goombas.splice(index, 1) 
                particles.splice(particleIndex, 1)  
               }, 0)
                }
            } )

        // goomba stomp squish
            if (collisionTOp({
                object1: player,
                object2: goomba
            })) {
                //height of jump after kiling a goomba
                player.velocity.y -= 40
                //deleting of a goomba from the array of goombas
                setTimeout(()=> {
                    for (let i = 0; i < 50; i++) {
                        particles.push(
                            new Particle({
                            position:{
                                x: goomba.position.x + goomba.width/2,
                                y: goomba.position.y + goomba.height/2,
                            },
                            velocity: {
                                x: (Math.random() - 0.5) * 5, 
                                y: (Math.random() - 0.5) * 15
                            },
                            radius: Math.random()*3
                            })
                        )
                        }
                    
                    goombas.splice(index, 1)

                  
                    
                        // console.log(particles)
                }, 0)
               
            } else if (
                player.position.x + player.width >= goomba.position.x
                && player.position.y + player.height >= goomba.position.y
                && player.position.x  <= goomba.position.x + goomba.width
            ) 
            if (player.powerUps.fireFlower){
                player.invincible = true
                player.powerUps.fireFlower = false

                setTimeout(() => {
                    player.invincible = false
                }, 1000)
            }
            // player hits goomba
           else if (!player.invincible) init()
        })

//rendering of particles
        particles.forEach((particle, i) => {
            particle.update()

            if (particle.fireball 
                    && 
                (particle.position.x - particle.radius >= canvas.width || particle.position.x + particle.radius <= 0)) 
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        })

        player.update()
        
        
        
        //~~~~~~~~~~~~~~~horizontal velocity~~~~~~~~~~~~~~~~~~~
        let hitSide = false;
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = player.speed
        } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x >0)) {
            player.velocity.x = -player.speed
        } else {
            player.velocity.x = 0
            

            //~~~~~~~~~~~~~platform scroling on back plus PARALAX EFFECT~~~~~~~~~~~
            if (keys.right.pressed) {
                

                 //~speed of platforms Objects~~to~the~~right~Button~
                
                    for(let i = 0; i < platforms.length; i ++) {
                        const platform = platforms[i]
                    platform.velocity.x = -player.speed

                    if (platform.block && 
                        hitSideOfPlatform({
                            object: player,
                            platform
                        })) {
                            platforms.forEach(platform => {
                                platform.velocity.x = 0
                            })
    
                            hitSide = true
                            break
                        }
                    }
                
              
                if (!hitSide) {
               

                //win scenario calculation
                scrollOffset += player.speed
                //~speed of feneric Objects~~to~the~~right~Button~
                genericObjects.forEach(genericObject  => {
                    genericObject.velocity.x = -player.speed*.6
                })

                 //~speed of GOOOMBA Objects~~to~the~~right~Button~
                 goombas.forEach(goomba => {
                    goomba.position.x -= player.speed
                })

                
                 //~speed of FireFlowers Objects~~to~the~~right~Button~
                 fireFlowers.forEach(fireFlower => {
                    fireFlower.position.x -= player.speed
                })

                 //~speed of Particles Objects~~to~the~~right~Button~
                 particles.forEach(particle => {
                    particle.position.x -= player.speed
                })
            }
                
            } else if (keys.left.pressed && scrollOffset > 0)  {
                
                //~speed of platforms Objects~~to~the~~left~Button~
                for(let i = 0; i < platforms.length; i ++) {
                    const platform = platforms[i]
                    platform.velocity.x += player.speed

                    if (platform.block && 
                        hitSideOfPlatform({
                            object: player,
                            platform
                        })) {
                            platforms.forEach(platform => {
                                platform.velocity.x = 0
                            })
    
                            hitSide = true
                        }

                }

                if (!hitSide){

                    //win scenario calculation
                scrollOffset -= player.speed

                //~speed of feneric Objects~to~the~left~Button~
                genericObjects.forEach(genericObject  => {
                    genericObject.velocity.x += player.speed*.6
                })

                 //~speed of GOOOMBA Objects~~to~the~~left~Button~
                 goombas.forEach(goomba => {
                    goomba.position.x += player.speed
                })

                 //~speed of FireFlowers Objects~~to~the~~left~Button~
                 fireFlowers.forEach(fireFlower => {
                    fireFlower.position.x += player.speed
                })

                   //~speed of Particles Objects~~to~the~~right~Button~
                   particles.forEach(particle => {
                    particle.position.x += player.speed
                })
            }
                
            }
        
        }

        // console.log(scrollOffset)


        //~~~~~~~~~~~~~~~~~~~~platform~~collusion~~detection~~~~~~~~~~~~~~~~~~~~~~~~~
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
            //collusion of player and block platforms
        if (platform.block && hitBottomOfPlatform({
            object: player,
            platform
        })){
            player.velocity.y = -player.velocity.y
        }

        if (platform.block && 
            hitSideOfPlatform({
                object: player,
                platform
            })) {
                player.velocity.x = 0
            }
        // particles bounce 
        particles.forEach((particle, i) => {
            if (
                //collusion   particles
                isOnTOpOfPlatformCircle({
                    object: particle,
                    platform: platform
                })
            ) {
                particle.velocity.y = -particle.velocity.y * 0.9
                // removing particles after some time by making them smaller
                if (particle.radius - 0.4 < 0 || particle.ttl < 0) particles.splice( i, 1)
                particle.radius -= 0.4
            }
            //delete particles which fall under the screen
            if (particle.ttl < 0)
                 particles.splice( i, 1)
        })
        //~~~~~~~~~goomba collusion on platforms
        goombas.forEach(goomba => {
            if (isOnTOpOfPlayform({
                object: goomba,
                platform: platform
            })
            )
            goomba.velocity.y = 0
        })
        //~~~~~~fireFlowers collusions on platforms
        fireFlowers.forEach(fireFlower => {
            if (isOnTOpOfPlayform({
                object: fireFlower,
                platform: platform
            })
            )
            fireFlower.velocity.y = 0
        })

          

        })

       //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONDITIONS~~~FOR~~~RUNNUNGS~~AND~~~STANDINGS~~~~~~~~~~~~~~~~~~~

         //win condition
         if (platformImage && scrollOffset > platformImage.width*6 +600) {
            console.log("you win")
        }

        //lose condition
        if (player.position.y > canvas.height){
            console.log("you lose")
            init() //to get start values
        }
        //sprite switching condition
        if (player.velocity.y !== 0)  return

        if (keys.right.pressed &&
            lastKey === "right" && player.currentSprite !== player.sprites.run.right) {
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
        //sprite switching condition (fireFlower)
         if (!player.powerUps.fireFlower) return
        
         if (keys.right.pressed &&
            lastKey === "right" && player.currentSprite !== player.sprites.run.fireFlower.right) {
            player.currentSprite = player.sprites.run.fireFlower.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        } else if (keys.left.pressed &&
            lastKey === 'left' && player.currentSprite !== player.sprites.run.fireFlower.left){
            player.currentSprite = player.sprites.run.fireFlower.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        } 
        else if (!keys.left.pressed &&
            lastKey === 'left' && player.currentSprite !== player.sprites.stand.fireFlower.left){
            player.currentSprite = player.sprites.stand.fireFlower.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        } else if (!keys.right.pressed &&
            lastKey === 'right' && player.currentSprite !== player.sprites.stand.fireFlower.right){
            player.currentSprite = player.sprites.stand.fireFlower.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
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
    //    console.log(keys.right.pressed)
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
                    // console.log("up")d
                    if (player.velocity.y === 0)  player.velocity.y -= 20
                   

                    if(lastKey === 'right')
                    player.currentSprite = player.sprites.jump.right
                    else
                    player.currentSprite = player.sprites.jump.left

                    if (!player.powerUps.fireFlower) break

                    if(lastKey === 'right')
                    player.currentSprite = player.sprites.jump.fireFlower.right
                    else
                    player.currentSprite = player.sprites.jump.fireFlower.left

                    break

                case 32:
                    // console.log("space")
                    //fireballs
                    if(!player.powerUps.fireFlower) return
                    let velocity = 15
                    if (lastKey === 'left') velocity = -velocity
                    particles.push(
                        new Particle({
                        position: {
                          x: player.position.x + player.width / 2,
                          y: player.position.y + player.height/2
                        },

                        velocity: {
                            x: velocity,
                            y: 0
                        },
                        radius: 5,
                        color: "red",
                        fireball: true
                    }))
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