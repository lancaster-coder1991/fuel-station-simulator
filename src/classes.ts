import delay from "delay";
import { randomInteger } from "./utils";
import _ from "lodash";

export type Lane = {
    pumps: Pump[];
};

enum FuelType {
    Unleaded = "UNLEADED",
    LPG = "LPG",
    Diesel = "DIESEL",
}

export class FuelStation {
    totalLitresFilled: number = 0;
    totalCarsFilled: number = 0;
    transactions: Transaction[] = [];
    constructor(public lanes: Lane[]) {
        this.lanes = lanes;
    }

    public async fillNewCar() {
        const newCar = new Car();
        const assignedPump = this.assignPump();
        if (typeof assignedPump === "undefined") {
            console.log("No available pumps!");
            return;
        }
        await assignedPump.fillCar(newCar, this);
        console.log(
            `Another car successfully filled! \n
        Total Litres Filled: ${this.totalLitresFilled} \n
        Total Cars Filled: ${this.totalCarsFilled} \n
        -------------------------------------- \n`
        );
    }

    private assignPump(): Pump | undefined {
        let assignedPump: Pump | undefined = undefined;
        for (
            let laneIndex: number = 0;
            laneIndex < this.lanes.length;
            laneIndex++
        ) {
            const currentLane = this.lanes[laneIndex];
            for (
                let pumpIndex: number = 0;
                pumpIndex < currentLane.pumps.length;
                pumpIndex++
            ) {
                const currentPump = currentLane.pumps[pumpIndex];
                const nextPump = currentLane.pumps[pumpIndex + 1];
                if (
                    (!currentPump.inUse &&
                        typeof nextPump !== "undefined" &&
                        nextPump.inUse) ||
                    (!currentPump.inUse && typeof nextPump === "undefined")
                ) {
                    currentPump.inUse = true;
                    assignedPump = currentPump;
                    break;
                } else if (
                    !currentPump.inUse &&
                    typeof nextPump !== "undefined" &&
                    !nextPump.inUse
                )
                    continue;
                else if (currentPump.inUse) break;
            }
            if (typeof assignedPump !== "undefined") break;
        }
        return assignedPump;
    }
}

export class Pump {
    inUse: Boolean = false;
    constructor(public pumpNumber: string) {
        this.pumpNumber = pumpNumber;
    }

    public async fillCar(car: Car, fuelStation: FuelStation) {
        await delay((car.currentFuelLevel / 1.5) * 1000);
        const litresFilledThisTransaction =
            car.tankCapacity - car.currentFuelLevel;
        fuelStation.totalLitresFilled += litresFilledThisTransaction;
        fuelStation.totalCarsFilled++;
        fuelStation.transactions.push(
            new Transaction(
                new Date(),
                car.fuelType,
                litresFilledThisTransaction
            )
        );
        this.inUse = false;
    }
}

export class Car {
    currentFuelLevel: number;
    constructor(
        public tankCapacity: number = randomInteger(10, 150),
        public fuelType: FuelType = _.sample(
            Object.values(FuelType)
        ) as FuelType
    ) {
        this.tankCapacity = tankCapacity;
        this.fuelType = fuelType;
        this.currentFuelLevel = randomInteger(1, this.tankCapacity / 4);
    }
}

export class Transaction {
    constructor(
        public date: Date,
        public fuelType: FuelType,
        public litresDispensed: number
    ) {
        this.date = date;
        this.fuelType = fuelType;
        this.litresDispensed = litresDispensed;
    }
}
