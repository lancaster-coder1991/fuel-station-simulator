import { FuelStation, Lane, Pump } from "./classes";
import { randomInteger } from "./utils";

const pump1 = new Pump("1");
const pump2 = new Pump("2");
const pump3 = new Pump("3");
const pump4 = new Pump("4");
const pump5 = new Pump("5");
const pump6 = new Pump("6");
const pump7 = new Pump("7");
const pump8 = new Pump("8");
const pump9 = new Pump("9");

const lane1: Lane = {
    pumps: [pump3, pump2, pump1],
};

const lane2: Lane = {
    pumps: [pump6, pump5, pump4],
};

const lane3: Lane = {
    pumps: [pump9, pump8, pump7],
};

const fuelStation: FuelStation = new FuelStation([lane1, lane2, lane3]);

setInterval(
    fuelStation.fillNewCar.bind(fuelStation),
    randomInteger(1500, 2200)
);
