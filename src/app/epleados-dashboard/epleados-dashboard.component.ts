import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-epleados-dashboard',
  templateUrl: './epleados-dashboard.component.html',
  styleUrls: ['./epleados-dashboard.component.css']
})
export class EpleadosDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd! : boolean;
  showUpdate! : boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue =  this.formbuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        mobile: [''],
        salary: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){//Este le va a pasar todos los datos a la API y cuando ahce click en el add se agrega todo
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    //
    this.api.postEmploye(this.employeeModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("Employe added successfully");
        let ref = document.getElementById("cancel"); //Con esto hago que al hacer click en la alerta se cierre el add
        ref?.click();//Con esto hago que al hacer click en la alerta se cierre el add
        this.formValue.reset();
        this.getAllEmployee();
      },
      err=>{
        alert("Something went wrong");
      });
  }

  getAllEmployee(){ //Levanta todos los empleados del json
    this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res;
    })
  }
  
  deleteEmployee(row : any){//Borrar empleado

    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee delete successfully");
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;


    this.employeeModelObj.id = row.id; //necesario para que funciones updateEmployeeDetails
    this.formValue.controls['firstName'].setValue(row.firstName); //Esta chorrera de coso hace que se muestre el nombre del que vas a editar en la casilla y asi con todos los otros
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
      .subscribe(res=>{
        alert("Update Success");
        let ref = document.getElementById("cancel"); //Con esto hago que al hacer click en la alerta se cierre el add
        ref?.click();//Con esto hago que al hacer click en la alerta se cierre el add
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

}
