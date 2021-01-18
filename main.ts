controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (EMP > 0) {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            value.destroy(effects.disintegrate, 200)
            info.changeScoreBy(1)
        }
        music.powerDown.play()
        scene.cameraShake(4, 500)
        EMP += -1
        textSprite.setText("x" + EMP)
        if (EMP == 0) {
            textSprite.setFlag(SpriteFlag.Invisible, true)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        7 . . . . 7 
        7 . . . . 7 
        7 . . . . 7 
        `, mySprite, 0, -100)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.fire, 200)
    info.changeScoreBy(1)
    music.playTone(262, music.beat(BeatFraction.Half))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeLifeBy(-1)
    music.playTone(131, music.beat(BeatFraction.Half))
    scene.cameraShake(4, 500)
})
let projectile2: Sprite = null
let projectile: Sprite = null
let textSprite: TextSprite = null
let EMP = 0
let mySprite: Sprite = null
game.splash("Star shooter", "by Adri")
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . c . b b . c . . . . . 
    . . . . . b . d d . b . . . . . 
    . . . . . b b 9 8 b b . . . . . 
    . . . . b b d 9 8 d b b . . . . 
    . . . b d b d 8 8 d b d b . . . 
    . . b a d b d d d d b d a b . . 
    . b d a d b d 1 1 d b d a d b . 
    . b d a d b d 1 1 d b d a d b . 
    . b d a b b d d d d b b a d b . 
    . b d b . . c b b c . . b d b . 
    . b b . . . . . . . . . . b b . 
    `, SpriteKind.Player)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
let enemyShips = [img`
    . c c . . c a a b b c . . c c . 
    c a b c . c 2 2 d 2 c . c a b c 
    c a b c . c 2 2 d 2 c . c a b c 
    c a b c c c 2 2 d 2 c c c a b c 
    c a b c c c 2 2 d 2 c c c a b c 
    c a b c c c 2 2 d 2 c c c a b c 
    c a b c c c 2 2 d 2 c c c a b c 
    c a b c . c 2 2 d 2 c . c a b c 
    c a b c . c 2 2 d 2 c . c a b c 
    . c c . . c 2 2 d 2 c . . c c . 
    . . . . . c a a b b c . . . . . 
    . . . c c c c c c c c c c . . . 
    . . . c a a a a b b b b c . . . 
    . . . . c a 8 9 9 8 b c . . . . 
    . . . . . c c c c c c . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . 2 2 . c c . 2 2 . . . . 
    . . . 2 2 2 c a a c 2 2 2 . . . 
    . . 2 2 2 2 c b b c 2 2 2 2 . . 
    . 2 2 2 2 2 c b b c 2 2 2 2 2 . 
    . 2 2 2 2 2 c a a c 2 2 2 2 2 . 
    . 2 2 2 2 2 c c c c 2 2 2 2 2 . 
    . . c . . . c a b c . . . c . . 
    . . c . . . . a b . . . . c . . 
    . . c . . . . a b . . . . c . . 
    . . a . 2 2 a b b a 2 2 . a . . 
    . . . . 2 2 a 8 8 a 2 2 . . . . 
    . . . . . 2 a 9 9 a 2 . . . . . 
    . . . . . . a b b a . . . . . . 
    . . . . . . . a a . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . a 2 a a c c a a c c a a 2 a . 
    . a 2 b a b b b b b b a b 2 a . 
    . a 2 b a b b d d b b a b 2 a . 
    . a 2 b a b d d d d b a b 2 a . 
    . a 2 b a b d d d d b a b 2 . . 
    . . 2 b a b d d d d b a a . . . 
    . . . a a b d d d d b a . . . . 
    . . . . a b d d d d b a . . . . 
    . . . . a b b d d b b a . . . . 
    . . . . a a b b b b a a . . . . 
    . . . . a a 8 b b 9 a a . . . . 
    . . . . c a 8 8 9 9 a c . . . . 
    . . . . . c a 8 9 a c . . . . . 
    . . . . . . c a a c . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
info.setScore(0)
info.setLife(3)
EMP = 3
textSprite = textsprite.create("x" + EMP, 1, 6)
textSprite.setPosition(6, 20)
textSprite.setIcon(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . 6 6 6 5 5 6 6 6 . . . . 
    . . . 7 7 7 7 6 6 6 6 6 6 . . . 
    . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
    . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
    . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
    . . . 6 8 8 8 8 8 8 8 8 6 . . . 
    . . . . 6 6 8 8 8 8 6 6 . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
textSprite.setBorder(1, 3)
textSprite.z = 1
// wrap around code
game.onUpdate(function () {
    if (mySprite.x < 0) {
        mySprite.x = 160
    } else if (mySprite.x > 160) {
        mySprite.x = 0
    }
})
game.onUpdateInterval(500, function () {
    projectile2 = sprites.createProjectileFromSide(enemyShips[randint(0, enemyShips.length - 1)], 0, randint(50, 100))
    projectile2.x = randint(10, 150)
    projectile2.setKind(SpriteKind.Enemy)
})
