import { Component, OnInit } from '@angular/core';
import {LineService} from "../services/line.service";
import {Line} from "../models/line.model";
import {MachineService} from "../services/machine.service";
import {Machine} from "../models/machine.model";
import {Production} from "../models/production.model";
import {ProductionService} from "../services/production.service";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
    lines : Line[];
    machines : Machine[];
    products: Product[];
    productions : Production[];

  constructor(private _machineService: MachineService,
              private _lineService: LineService,
              private _productService: ProductService,
              private _productionService: ProductionService) {}

  ngOnInit() {
    this.getLines();
    this.getMachines();
    this.getProductions();
    this.getProducts();
  }

    getProducts(){
        this._productService.productsSource.subscribe((products) => {
            this.products = products;
        });
    }
    getLines(){
      this._lineService.linesSource.subscribe((lines) => {
          this.lines = lines;
      });
    }
    getMachines(){
      this._machineService.machinesSource.subscribe((machines) => {
          this.machines = machines;
      });
    }
    getProductions(){
        this._productionService.loadProductions().then(productions => {this.productions = productions;});
    }

    displayDialogProduction: boolean = false;
    selectedMachine: string;
    selectedLine: string;
    production: Production;
    newProduction: boolean;
    selectedProduction: string;
    selectedProduct: string;

    saveProduction(status){
        var prod = this.findSelectedProduction();
        prod.status = status;

        this.saveProd(prod);
    }

    saveNew(){
        var prod = this.production;
        prod.product = this.selectedProduct;
        prod.line = this.selectedLine;
        prod.machine = this.selectedMachine;
        prod.status = null;
        prod.finished = null;

        this.saveProd(prod);
    }

    findSelectedProduction(): Production {
        if(this.selectedProduction && this.productions) {
            for(let i in this.productions)
            {
                if(this.productions[i]._id == this.selectedProduction)
                    return this.productions[i];
            }
        }
    }

    saveProd(prod) {
        let productions = [...this.productions];
        if(this.newProduction) {
            let production = this._productionService.create({
                 _id: null,
                 "status": null,
                 "productSerial": prod.productSerial,
                 "line": prod.line,
                 "machine": prod.machine,
                 "product":  prod.product,
                 "finished": null
            })
             .then(prod => {
                 productions.push(prod);
                 this.productions = productions;
                 this.selectedProduction = null;
                 this.displayDialogProduction = false;
                 this.newProduction = false;
                 this.production = null;
             });
        }
        else
        {
            this._productionService.update({
                _id: prod._id,
                "status": prod.status,
                "productSerial": prod.productSerial,
                "line": prod.line,
                "machine": prod.machine,
                "product": prod.product,
                "finished": prod.finished
            })
            .then(prod => {
                if(prod) {
                    productions.push(prod);
                    this.productions = productions;
                }
                this.newProduction = false;
                this.selectedProduction = null;
                this.displayDialogProduction = false;
                this.production = null;
            });
        }
    }

    work(machine,line){
        this.displayDialogProduction=true;
        this.selectedMachine = machine;
        this.selectedLine = line;

        this.production = new Production(null,null,null,null,null,null,null);
    }

    new(machine,line){
        this.displayDialogProduction=true;
        this.selectedMachine = machine;
        this.selectedLine = line;
        this.newProduction = true;

        this.production = new Production(null,null,null,null,null,null,null);
    }
}
