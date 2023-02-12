function control2 (speed: number) {
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
        basic.showNumber(1)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Up)) {
        basic.showArrow(ArrowNames.North)
        command(20, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Down)) {
        basic.showArrow(ArrowNames.South)
        command(-20, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Hash)) {
        command(0, 20)
        basic.showArrow(ArrowNames.West)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Star)) {
        basic.showArrow(ArrowNames.East)
        command(0, -20)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Left)) {
        basic.showLeds(`
            # . # # .
            # # . . #
            # # # . #
            . . . . #
            . # # # .
            `)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Right)) {
        basic.showLeds(`
            . # # . #
            # . . # #
            # . # # #
            # . . . .
            . # # # .
            `)
    }
}
function command (xSpeed: number, ySpeed: number) {
    upperLeftSpeed = xSpeed + ySpeed
    lowerLeftSpeed = xSpeed - ySpeed
    upperRightSpeed = xSpeed - ySpeed
    lowerRightSpeed = xSpeed + ySpeed
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
mecanumRobotV2.state()
basic.clearScreen()
irRemote.connectInfrared(DigitalPin.P0)
basic.forever(function () {
    control2(16)
})
