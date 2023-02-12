function remote (speed: number) {
    if (irRemote.returnIrButton() == 0) {
        mecanumRobotV2.state()
        basic.showLeds(`
            . # # # .
            # # . . #
            # . # . #
            # . . # #
            . # # # .
            `)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_1)) {
        basic.showArrow(ArrowNames.SouthEast)
        command(speed, 0 - speed, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_2)) {
        basic.showArrow(ArrowNames.South)
        command(speed, 0, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_3)) {
        basic.showArrow(ArrowNames.SouthWest)
        command(speed, speed, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_4)) {
        basic.showArrow(ArrowNames.East)
        command(0, 0 - speed, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_6)) {
        command(0, speed, 0)
        basic.showArrow(ArrowNames.West)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_7)) {
        command(0 - speed, 0 - speed, 0)
        basic.showArrow(ArrowNames.NorthEast)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_8)) {
        basic.showArrow(ArrowNames.North)
        command(0 - speed, 0, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_9)) {
        command(0 - speed, speed, 0)
        basic.showArrow(ArrowNames.NorthWest)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Hash)) {
        basic.showLeds(`
            . # # . #
            # . . # #
            # . # # #
            # . . . .
            . # # # .
            `)
        command(0, 0, speed)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Star)) {
        basic.showLeds(`
            # . # # .
            # # . . #
            # # # . #
            . . . . #
            . # # # .
            `)
        command(0, 0, 0 - speed)
    }
}
function scan () {
    minRange = 100
    minRangeAngle = 180
    for (let angle of angleList) {
        mecanumRobotV2.setServo(servoZero - angle)
        basic.pause(200)
        if (mecanumRobotV2.ultra() < minRange) {
            minRange = mecanumRobotV2.ultra()
            minRangeAngle = angle
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
        }
    }
    return minRangeAngle
}
function command (xSpeed: number, ySpeed: number, rSpeed: number) {
    upperLeftSpeed = xSpeed + ySpeed + rSpeed
    lowerLeftSpeed = xSpeed - ySpeed + rSpeed
    upperRightSpeed = xSpeed - ySpeed - rSpeed
    lowerRightSpeed = xSpeed + ySpeed - rSpeed
    if (upperLeftSpeed >= 0) {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, upperLeftSpeed)
    } else {
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, Math.abs(upperLeftSpeed))
    }
    if (lowerLeftSpeed >= 0) {
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, lowerLeftSpeed)
    } else {
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, Math.abs(lowerLeftSpeed))
    }
    if (upperRightSpeed >= 0) {
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, upperRightSpeed)
    } else {
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, Math.abs(upperRightSpeed))
    }
    if (lowerRightSpeed >= 0) {
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, lowerRightSpeed)
    } else {
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, Math.abs(lowerRightSpeed))
    }
}
let lowerRightSpeed = 0
let upperRightSpeed = 0
let lowerLeftSpeed = 0
let upperLeftSpeed = 0
let minRangeAngle = 0
let minRange = 0
let angleList: number[] = []
let servoZero = 0
mecanumRobotV2.state()
basic.clearScreen()
irRemote.connectInfrared(DigitalPin.P0)
mecanumRobotV2.setServo(servoZero)
servoZero = 98
angleList = [
40,
0,
-40,
0
]
basic.forever(function () {
    basic.showNumber(scan())
    basic.pause(1000)
})
