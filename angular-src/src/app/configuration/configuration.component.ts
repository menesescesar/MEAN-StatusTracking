import { Component, OnInit } from '@angular/core';
import {Ng2SmartTableModule, LocalDataSource} from 'ng2-smart-table';

import {Machine} from "../models/machine.model";
import {Type} from "../models/type.model";
import {Family} from "../models/family.model";
import {Product} from "../models/product.model";
import {Line} from "../models/line.model";

import {MachineService} from "../services/machine.service";
import {LineService} from "../services/line.service";
import {FamilyService} from "../services/family.service";
import {TypeService} from "../services/type.service";
import {ProductService} from "../services/product.service";

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  lines : Line[];
  machines : Machine[];
  types: Type[];
  families: Family[];
  products: Product[];


   constructor(private _machineService: MachineService,
              private _lineService: LineService,
              private _typeService: TypeService,
              private _productService: ProductService,
              private _familyService: FamilyService){
  }

    ngOnInit() {
        this.getMachines();
        this.getLines();
        this.getProducts();
        this.getTypes();
        this.getFamilies();
    }

    getLines(){
        this._lineService.loadLines().then(lines => {this.lines = lines;});
    }
    getMachines(){
        this._machineService.loadMachines().then(machines => {this.machines = machines;});
    }
    getProducts(){
        this._productService.loadProducts().then(products => {this.products = products;});
    }
    getTypes(){
        this._typeService.loadTypes().then(types => {this.types = types;});
    }
    getFamilies(){
    this._familyService.loadFamilies().then(fam => {this.families = fam;});
    }

    //Lines
    displayDialogLine: boolean = false;
    line: Line;
    selectedLine: Line;
    newLine: boolean;

    showDialogToAddLine() {
        this.newLine = true;
        this.displayDialogLine = true;
        this.line = new Line(null,null,null);
    }
    saveLine() {
        let lines = [...this.lines];
        if(this.newLine) {
            this._lineService.create({
                _id: null,
                "name": this.line.name,
                "description": this.line.description
            })
                .then(line => {
                    lines.push(line);
                    this.lines = lines;
                    this.line = null;
                    this.displayDialogLine = false;
                });
        }
        else
        {
            this._lineService.update({
                _id:this.line._id,
                "name": this.line.name,
                "description": this.line.description
            })
                .then(line => {
                    lines[this.findSelectedLineIndex()] = this.line;
                    this.lines = lines;
                    this.line = null;
                    this.displayDialogLine = false;
                });
        }
    }
    deleteLine() {
        let index = this.findSelectedLineIndex();
        this.lines = this.lines.filter((val,i) => i!=index);
        this._lineService.delete(this.line._id);
        this.line = null;
        this.displayDialogLine = false;
    }
    onRowSelectLine(event) {
        this.newLine = false;
        this.line = this.cloneLine(event.data);
        this.displayDialogLine = true;
    }
    cloneLine(c: Line): Line {
        let line = new Line(null,null,null);
        for(let prop in c) {
            line[prop] = c[prop];
        }
        return line;
    }
    findSelectedLineIndex(): number {
        return this.lines.indexOf(this.selectedLine);
    }
    lineName(line){
        if(line && this.lines) {
            for(let i in this.lines)
            {
                if(this.lines[i]._id == line)
                    return this.lines[i].name;
            }
        }
        return '';
    }

    //Families
    displayDialogFamily: boolean = false;
    family: Family;
    selectedFamily: Family;
    newFamily: boolean;

    showDialogToAddFamily() {
    this.newFamily = true;
    this.displayDialogFamily = true;
    this.family = new Family(null,null,null);
    }
    saveFamily() {
        let families = [...this.families];
        if(this.newFamily) {
          this._familyService.create({
            _id: null,
            "name": this.family.name,
            "description": this.family.description
          })
              .then(fam => {
                    families.push(fam);
                    this.families = families;
                    this.family = null;
                    this.displayDialogFamily = false;
              });
        }
        else
        {
            this._familyService.update({
                    _id:this.family._id,
                    "name": this.family.name,
                    "description": this.family.description
            })
                .then(fam => {
                    families[this.findSelectedFamilyIndex()] = this.family;
                    this.families = families;
                    this.family = null;
                    this.displayDialogFamily = false;
                });
        }
    }
    deleteFamily() {
    let index = this.findSelectedFamilyIndex();
    this.families = this.families.filter((val,i) => i!=index);
    this._familyService.delete(this.family._id);
    this.family = null;
    this.displayDialogFamily = false;
    }
    onRowSelectFamily(event) {
    this.newFamily = false;
    this.family = this.cloneFamily(event.data);
    this.displayDialogFamily = true;
    }
    cloneFamily(c: Family): Family {
    let family = new Family(null,null,null);
    for(let prop in c) {
      family[prop] = c[prop];
    }
    return family;
    }
    findSelectedFamilyIndex(): number {
    return this.families.indexOf(this.selectedFamily);
  }
    productFamilyName(productFamily){
        if(productFamily && this.families) {
            for(let i in this.families)
            {
                if(this.families[i]._id == productFamily)
                    return this.families[i].name;
            }
        }
        return '';
    }

    //Types
    displayDialogType: boolean = false;
    type: Type;
    selectedType: Type;
    newType: boolean;

    showDialogToAddType() {
        this.newType = true;
        this.displayDialogType = true;
        this.type = new Type(null,null,null);
    }
    saveType() {
        let types = [...this.types];
        if(this.newType) {
            this._typeService.create({
                _id: null,
                "name": this.type.name,
                "description": this.type.description
            })
                .then(type => {
                    types.push(type);
                    this.types = types;
                    this.type = null;
                    this.displayDialogType = false;
                });
        }
        else
        {
            this._typeService.update({
                _id:this.type._id,
                "name": this.type.name,
                "description": this.type.description
            })
                .then(type => {
                    types[this.findSelectedTypeIndex()] = this.type;
                    this.types = types;
                    this.type = null;
                    this.displayDialogType = false;
                });
        }
    }
    deleteType() {
        let index = this.findSelectedTypeIndex();
        this.types = this.types.filter((val,i) => i!=index);
        this._typeService.delete(this.type._id);
        this.type = null;
        this.displayDialogType = false;
    }
    onRowSelectType(event) {
        this.newType = false;
        this.type = this.cloneType(event.data);
        this.displayDialogType = true;
    }
    cloneType(c: Type): Type {
        let type = new Type(null,null,null);
        for(let prop in c) {
            type[prop] = c[prop];
        }
        return type;
    }
    findSelectedTypeIndex(): number {
        return this.types.indexOf(this.selectedType);
    }
    machineTypeName(machineType){
        if(machineType && this.types) {
            for(let i in this.types)
            {
                if(this.types[i]._id == machineType)
                    return this.types[i].name;
            }
        }
        return '';
    }

    //Products
    displayDialogProduct: boolean = false;
    product: Product;
    selectedProduct: Product;
    newProduct: boolean;

    showDialogToAddProduct() {
        this.newProduct = true;
        this.displayDialogProduct = true;
        this.product = new Product(null,null,null);
    }
    saveProduct() {
        let products = [...this.products];
        if(this.newProduct) {
            this._productService.create({
                _id: null,
                "name": this.product.name,
                "productFamily": this.product.productFamily
            })
                .then(product => {
                    products.push(product);
                    this.products = products;
                    this.product = null;
                    this.displayDialogProduct = false;
                });
        }
        else
        {
            this._productService.update({
                _id:this.product._id,
                "name": this.product.name,
                "productFamily": this.product.productFamily
            })
                .then(product => {
                    products[this.findSelectedProductIndex()] = this.product;
                    this.products = products;
                    this.product = null;
                    this.displayDialogProduct = false;
                });
        }
    }
    deleteProduct() {
        let index = this.findSelectedProductIndex();
        this.products = this.products.filter((val,i) => i!=index);
        this._productService.delete(this.product._id);
        this.product = null;
        this.displayDialogProduct = false;
    }
    onRowSelectProduct(event) {
        this.newProduct = false;
        this.product = this.cloneProduct(event.data);
        this.displayDialogProduct = true;
    }
    cloneProduct(c: Product): Product {
        let product = new Product(null,null,null);
        for(let prop in c) {
            product[prop] = c[prop];
        }
        return product;
    }
    findSelectedProductIndex(): number {
        return this.products.indexOf(this.selectedProduct);
    }

    //Machines
    displayDialogMachine: boolean = false;
    machine: Machine;
    selectedMachine: Machine;
    newMachine: boolean;

    showDialogToAddMachine() {
        this.newMachine = true;
        this.displayDialogMachine = true;
        this.machine = new Machine(null,null,null,null,null,null);
    }
    saveMachine() {
        let machines = [...this.machines];
        if(this.newMachine) {
            this._machineService.create({
                _id: null,
                "name": this.machine.name,
                "serialNumber": this.machine.serialNumber,
                "line": this.machine.line,
                "previous": this.machine.previous,
                "machineType": this.machine.machineType
            })
                .then(machine => {
                    machines.push(machine);
                    this.machines = machines;
                    this.machine = null;
                    this.displayDialogMachine = false;
                });
        }
        else
        {
            this._machineService.update({
                _id:this.machine._id,
                "name": this.machine.name,
                "serialNumber": this.machine.serialNumber,
                "line": this.machine.line,
                "previous": this.machine.previous,
                "machineType": this.machine.machineType
            })
                .then(machine => {
                    machines[this.findSelectedMachineIndex()] = this.machine;
                    this.machines = machines;
                    this.machine = null;
                    this.displayDialogMachine = false;
                });
        }
    }
    deleteMachine() {
        let index = this.findSelectedMachineIndex();
        this.machines = this.machines.filter((val,i) => i!=index);
        this._machineService.delete(this.machine._id);
        this.machine = null;
        this.displayDialogMachine = false;
    }
    onRowSelectMachine(event) {
        this.newMachine = false;
        this.machine = this.cloneMachine(event.data);
        this.displayDialogMachine = true;
    }
    cloneMachine(c: Machine): Machine {
        let machine = new Machine(null,null,null,null,null,null);
        for(let prop in c) {
            machine[prop] = c[prop];
        }
        return machine;
    }
    findSelectedMachineIndex(): number {
        return this.machines.indexOf(this.selectedMachine);
    }
    machineName(machine){
        if(machine && this.machines) {
            for(let i in this.machines)
            {
                if(this.machines[i]._id == machine)
                    return this.machines[i].name;
            }
        }
        return '';
    }
}
