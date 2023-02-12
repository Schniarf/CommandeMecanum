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
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_5)) {
        basic.showIcon(IconNames.Ghost)
        command(0, 20, 20)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_1)) {
        basic.showArrow(ArrowNames.SouthEast)
        command(20, -20, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_2)) {
        basic.showArrow(ArrowNames.South)
        command(20, 0, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_3)) {
        basic.showArrow(ArrowNames.SouthWest)
        command(20, 20, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_4)) {
        basic.showArrow(ArrowNames.East)
        command(0, -20, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_6)) {
        command(0, 20, 0)
        basic.showArrow(ArrowNames.West)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_7)) {
        command(-20, -20, 0)
        basic.showArrow(ArrowNames.NorthEast)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_8)) {
        basic.showArrow(ArrowNames.North)
        command(-20, 0, 0)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_9)) {
        command(-20, 20, 0)
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
        command(0, 0, 20)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Star)) {
        basic.showLeds(`
            # . # # .
            # # . . #
            # # # . #
            . . . . #
            . # # # .
            `)
        command(0, 0, -20)
    }
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
mecanumRobotV2.state()
basic.clearScreen()
irRemote.connectInfrared(DigitalPin.P0)
basic.forever(function () {
    control2(16)
})
