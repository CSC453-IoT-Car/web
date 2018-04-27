import { Component, OnInit, Inject } from '@angular/core';
import { BackendService } from './backend.service';
import { Target } from './target';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'IoT Car';
    public items;
    public cars = new Array();
    public beacons = new Array();
    public loggedIn = false;
    private updateInterval;

    constructor(private backendService: BackendService, 
        // public dialog: MatDialog
    ) {
        var k = localStorage.getItem("key");
        if (k) {
            this.backendService.key = k;
            this.loggedIn = true;
            this.getItems();
        }
    }

    ngOnInit() {
        //this.getItems();
    }

    login(pass) {
        this.backendService.login(pass).subscribe(
            data => {
                var d:any = data;
                this.backendService.key = d.key;
                localStorage.setItem("key", d.key);
            },
            err => {console.log('err?'); console.log(err)},
            () => {
                console.log('Logged in');
                this.getItems();
                this.loggedIn = true;
            }
        );
    }

    getItems() {
        console.log('Updating');
        this.backendService.getRegistered().subscribe(
            data => { this.items = data},
            err => {console.error('hrhr', err)},
            () => {
                this.cars = new Array();
                this.beacons = new Array();
                for (let item of this.items) {
                    if (item.type == 'beacon') {
                        this.beacons.push(item);
                    } else {
                        var now = Date.now();
                        item.lastCom = (now - item.lastCom) / 1000;
                        this.cars.push(item);
                    }
                }
                this.beacons.push({
                    id: -1
                });
                console.log('beacons', this.beacons)
                console.log('cars', this.cars)
            }
        );
    }

    setTarget(car: any, beacon: any) {
        this.backendService.setTarget(car.id, beacon.id).subscribe(
            data => {console.log(data);this.getItems()},
            err => {console.error("erroe", err); this.getItems()},
            () => {
                this.getItems()
            }
        )
        console.log('set target', car, beacon);
    }

    remove(id) {
        this.backendService.remove(id).subscribe(
            data => {this.getItems()},
            err => {console.log(err); this.getItems()},
            () => {this.getItems()}
        );
    }

    registerBeacon(id) {
        this.backendService.registerBeacon(id).subscribe(
            data => {this.getItems();},
            err => {this.getItems();},
            () => {this.getItems();}
        );
    }
}