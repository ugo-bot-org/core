"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SLEEP = require("sleep");
const WPI = require("wiringpi-node");
class Test {
    static testPin23() {
        WPI.wiringPiSetupGpio();
        WPI.pinModeAlt(23, WPI.FSEL_OUTP);
        WPI.digitalWrite(23, 0);
        SLEEP.msleep(500);
        WPI.digitalWrite(23, 1);
    }
}
exports.Test = Test;