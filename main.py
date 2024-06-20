def on_button_pressed_a():
    global me, address
    if state == "setup" and substate == 0:
        if me == "H":
            me = "S"
        elif me == "S":
            me = "H"
    elif state == "setup" and substate == 1:
        if address < 255:
            address += 1
        else:
            address = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global substate
    if state == "setup" and substate == 0:
        substate = 1
    elif state == "setup" and substate == 1:
        substate = 2
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global signal, count
    if me == "S":
        signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
        led.plot_bar_graph(Math.map(signal, -95, -42, 0, 9), 9)
        count = 0
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global address
    if state == "setup" and substate == 1:
        if address > 0:
            address += 0 - 1
        else:
            address = 255
input.on_button_pressed(Button.B, on_button_pressed_b)

count = 0
signal = 0
address = 0
substate = 0
state = ""
me = ""
me = "H"
state = "setup"
substate = 0
address = 0

def on_forever():
    global state
    if state == "setup":
        basic.clear_screen()
        if substate == 0:
            basic.show_string(me)
        elif substate == 1:
            basic.show_number(address)
        elif substate == 2:
            radio.set_group(address)
            radio.set_transmit_power(7)
            state = "game"
    elif me == "H":
        basic.show_icon(IconNames.SMALL_HEART)
        radio.send_string("hiding")
        basic.pause(100)
        basic.show_icon(IconNames.HEART)
        basic.pause(100)
        basic.clear_screen()
basic.forever(on_forever)
