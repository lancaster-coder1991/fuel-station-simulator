# Fuel Station Simulator

This application simulates a fuel station filling up cars periodically.

## Installation

Clone the repo and then run `npm i` to install dependencies. These will include [ts-node](https://www.npmjs.com/package/ts-node), which is required to run the application from the command line.

## Running the application

To run the application, simply run `ts-node src/index.ts` from the root of the project using a terminal. A new fuel station instance will be created and its `fillNewCar` method will be run every 1.5 - 2.2 seconds. Output in the console will confirm every time a successful transaction has taken place, or will output `No available pumps!` if a car tries to enter when all pumps are in use or blocking other available pumps.

## Current Features

The application currently supports the current features:

-   Basic fuel filling at 1.5 litres/second
-   Lane blocking (i.e. a vehicle in pump 3 will block pumps 2 and 1).
-   Random current fuel level, fuel type and tank capacity allocated to each new car (capacity between 10 and 150)
-   Running totals of litres and cars filled, and a list of transactions stored in the fuel station instance

## Features to Add

-   Different types of vehicle with fixed tank capacities
-   Waiting and 'driver agitation'
