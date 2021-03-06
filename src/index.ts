import * as path from 'path';
import 'rxjs/add/operator/filter';

import { ServerIO } from './server/server';

import { Cam } from './core/Cam.core';
import { Buzzer } from './core/Buzzer.core';
import { Lighting } from './core/Lighting.core';
import { Propulsion } from './core/Propulsion.core';

import { Factory } from './factories/main.factory';
import { ConfigReader } from "./helpers/ConfigReader.helper";
import { WiringPINode } from './interfaces/wiringpi-node.interface';

import { INSTANCES } from './consts/instances.const';
import { GLOBAL_KEYS } from './consts/global-keys.const';

export class HUGO {
    private cam: Cam;
    private server: ServerIO;
    private buzzer: Buzzer;
    private lighting: Lighting;
    private propulsion: Propulsion;

    public constructor() {
        this.setRootDir();

        const factory = new Factory();
        global[GLOBAL_KEYS.hugo_factory] = factory;

        this.propulsion = factory.getInstance(INSTANCES.Propulsion) as Propulsion;
        this.propulsion.useIntercom(true);

        this.lighting = factory.getInstance(INSTANCES.Lighting) as Lighting;
        this.lighting.useIntercom(true);

        this.cam = factory.getInstance(INSTANCES.Cam) as Cam;
        this.cam.useIntercom(true);

        this.buzzer = factory.getInstance(INSTANCES.Buzzer) as Buzzer;
        this.buzzer.useIntercom(true);

        this.server = new ServerIO();
        this.server.start();
    }

    private setRootDir() {
        const arrayFormPath = path.resolve(__dirname)
            .split(path.sep);
        arrayFormPath.pop();
        arrayFormPath.shift();

        let stringFormPath = '';
        arrayFormPath.forEach(e => {
            stringFormPath += path.sep + e;
        });

        (global as any).rootDir = stringFormPath + path.sep;
    }
}

new HUGO();