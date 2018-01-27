from PIL import ImageGrab
import os
import time

# Globals
# ------------------

x_pad = 693
y_pad = 46


def screenGrab():
    box = (x_pad + 1, y_pad + 1, x_pad + 532, y_pad + 946)
    im = ImageGrab.grab(box)
    im.save(os.getcwd() + '\\bot\\screenshot\\files\\full_snap__' + str(int(time.time())) +
            '.png', 'PNG')


def main():
    screenGrab()


if __name__ == '__main__':
    main()
