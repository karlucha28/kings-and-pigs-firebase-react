    //collusion detection for platforms
 export   function isOnTOpOfPlayform({object,platform}){
    return  (
            object.position.y + object.height <= platform.position.y 
        && object.position.y + object.height + object.velocity.y >= platform.position.y
        && object.position.x + object.width >= platform.position.x
        && object.position.x <= platform.position.x + platform.width
    )
    }

//collusion detection on top of second object
export  function collisionTOp({object1,object2}){
    return  (
            object1.position.y + object1.height <= object2.position.y 
        && object1.position.y + object1.height + object1.velocity.y >= object2.position.y
        && object1.position.x + object1.width >= object2.position.x
        && object1.position.x <= object2.position.x + object2.width
    )
}

 //collusion detection  of Circles
 export  function isOnTOpOfPlatformCircle({object,platform}){
    return  (
            object.position.y + object.radius <= platform.position.y 
        && object.position.y + object.radius + object.velocity.y >= platform.position.y
        && object.position.x + object.radius >= platform.position.x
        && object.position.x <= platform.position.x + platform.width
    )
}


  //~~~~~~~~~~~~~~~~~~~image for objects~~~~~~~~~~~~~~~~~~
export function createImage(imageSrc){
        const image = new Image()
        image.src = imageSrc
    return image
    }
//~~~~~~~~~~~~~~~~~~~~~~~~~create~~~~~~images~~~~~~~~where~we~need~async~~~~~~~~~~~
export  function createImageAsync(imageSrc){
    return new Promise((resolve) => {
        const image = new Image()
        image.onload = () => {
            resolve(image)
        }
        image.src = imageSrc
        // return image
    })
    
}   
//collusion for bottom of the block platform
export function hitBottomOfPlatform({object, platform}){
    return object.position.y <= platform.position.y + platform.height 
        && object.position.y - object.velocity.y>= platform.position.y + platform.height
        && object.position.x + object.width >= platform.position.x
        && object.position.x <= platform.position.x + platform.width
    }

export function hitSideOfPlatform({object, platform}){
    return object.position.x + object.width + object.velocity.x - platform.velocity.x  >= platform.position.x
        && object.position.x + object.velocity.x <= platform.position.x + platform.width
        && platform.position.x && object.position.y <= platform.position.y + platform.height
        && object.position.y + object.height >= platform.position.y
    }

//two object collusion check if two objects are touching
export function objectsTouch({object1,object2}){
    return (
        object1.position.x + object2.width >= object2.position.x 
        && object1.position.x <= object2.position.x + object2.width
        && object1.position.y + object1.height >= object2.position.y
        && object1.position.y <= object2.position.y + object2.height
    )
    }






