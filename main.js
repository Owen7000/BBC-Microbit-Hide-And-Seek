input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (state == "setup" && substate == 0) {
        if (me == "H") {
            me = "S"
        } else if (me == "S") {
            me = "H"
        }
        
    } else if (state == "setup" && substate == 1) {
        if (address < 255) {
            address += 1
        } else {
            address = 0
        }
        
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (state == "setup" && substate == 0) {
        substate = 1
    } else if (state == "setup" && substate == 1) {
        substate = 2
    }
    
})
radio.onReceivedString(function on_received_string(receivedString: string) {
    
    if (me == "S") {
        signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        led.plotBarGraph(Math.map(signal, -95, -42, 0, 9), 9)
        count = 0
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (state == "setup" && substate == 1) {
        if (address > 0) {
            address += 0 - 1
        } else {
            address = 255
        }
        
    }
    
})
let count = 0
let signal = 0
let address = 0
let substate = 0
let state = ""
let me = ""
me = "H"
state = "setup"
substate = 0
address = 0
basic.forever(function on_forever() {
    
    if (state == "setup") {
        basic.clearScreen()
        if (substate == 0) {
            basic.showString(me)
        } else if (substate == 1) {
            basic.showNumber(address)
        } else if (substate == 2) {
            radio.setGroup(address)
            radio.setTransmitPower(7)
            state = "game"
        }
        
    } else if (me == "H") {
        basic.showIcon(IconNames.SmallHeart)
        radio.sendString("hiding")
        basic.pause(100)
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        basic.clearScreen()
    }
    
})
