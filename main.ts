function run (speed: number) {
    if (speed >= 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . # # # .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    } else {
        basic.showLeds(`
            . # # # .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, Math.abs(speed))
    }
    basic.clearScreen()
}
function stop () {
    basic.showLeds(`
        . # # # .
        # # . . #
        # . # . #
        # . . # #
        . # # # .
        `)
    mecanumRobotV2.state()
}
function turn (speed: number) {
    if (speed > 0) {
        basic.showLeds(`
            # . # # .
            # # . . #
            # # # . #
            . . . . #
            . # # # .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    } else {
        basic.showLeds(`
            . # # . #
            # . . # #
            # . # # #
            # . . . .
            . # # # .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, Math.abs(speed))
    }
    basic.clearScreen()
}
function move (speed: number) {
    if (irRemote.returnIrButton() == 0) {
        stop()
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Up)) {
        run(speed)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Down)) {
        run(speed * -1)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Left)) {
        turn(speed)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Right)) {
        turn(speed * -1)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_6)) {
        straf(speed)
    }
    if (irRemote.returnIrButton() == irRemote.irButton(IrButton.Number_4)) {
        straf(speed * -1)
    }
}
function straf (speed: number) {
    if (speed >= 0) {
        basic.showLeds(`
            . . # . .
            . # . . #
            # # # # #
            . # . . #
            . . # . .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed)
        mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed)
        mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed)
    } else {
        basic.showLeds(`
            . . # . .
            # . . # .
            # # # # #
            # . . # .
            . . # . .
            `)
        mecanumRobotV2.Motor(LR.Upper_left, MD.Back, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, Math.abs(speed))
        mecanumRobotV2.Motor(LR.Lower_right, MD.Back, Math.abs(speed))
    }
}
mecanumRobotV2.state()
basic.clearScreen()
irRemote.connectInfrared(DigitalPin.P0)
music.playMelody("G A B C5 G C5 C5 - ", 120)
basic.forever(function () {
    move(16)
})
