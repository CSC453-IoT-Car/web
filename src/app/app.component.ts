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

    constructor(private backendService: BackendService, 
        // public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.backendService.getRegistered().subscribe(
            data => { this.items = data},
            err => {console.error('hrhr', err)},
            () => {
                for (let item of this.items) {
                    if (item.type == 'beacon') {
                        this.beacons.push(item);
                    } else {
                        this.cars.push(item);
                    }
                }
                console.log('beacons', this.beacons)
                console.log('cars', this.cars)
            }
        );
    }

    setTarget(car: any, beacon: any) {
        this.backendService.setTarget(car.id, beacon.id).subscribe(
            data => {console.log(data)},
            err => {console.error("erroe", err)},
            () => {
                
            }
        )
        console.log('set target', car, beacon);
    }
}