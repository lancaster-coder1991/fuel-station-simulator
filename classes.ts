import delay from "delay";

export type Lane = {
    pumps: Pump[];
};

enum FuelType {
    Unleaded = "UNLEADED",
    LPG = "LPG",
    Diesel = "DIESEL",
}

export class FuelStation {
    constructor(public lanes: Lane[]) {
        this.lanes = lanes;
    }

    public fillNewCar() {
        const newCar = new Car();
        const assignedPump = this.assignPump();
        if (assignedPump === "No available pumps!") return;
        assignedPump.fillCar(newCar);
    }

    private assignPump(): Pump | "No available pumps!" {
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
                if (!currentPump.inUse) {
                    currentPump.inUse = true;
                    assignedPump = currentPump;
                    break;
                }
            }
            if (typeof assignedPump !== "undefined") break;
        }
        if (typeof assignedPump !== "undefined") return assignedPump;
        else return "No available pumps!";
    }
}

export class Pump {
    inUse: Boolean = false;
    constructor(public pumpNumber: string) {
        this.pumpNumber = pumpNumber;
    }

    public fillCar(car: Car) {
        delay((car.tankCapacity / 1.5) * 1000);
        this.inUse = false;
    }
}

export class Car {
    constructor(
        public tankCapacity: number = 10,
        public fuelType: FuelType = FuelType.Unleaded
    ) {
        this.tankCapacity = tankCapacity;
        this.fuelType = fuelType;
    }
}
