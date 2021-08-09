import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {employeeModel} from "../_model/data.model";
import {DataService} from "../_service/data.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id: any;
  disabled = false;
  breadcrumb: string;
  submitType: string;
  patternError = true;
  formModel: employeeModel = {} as employeeModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private routerOutlet: RouterOutlet
  ) {
    this.breadcrumb = routerOutlet.activatedRouteData.breadcrumb;
    this.id = this.route.snapshot.paramMap.get('id');
    if (routerOutlet.activatedRouteData.disabled) {
      this.disabled = true;
    }
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    if (this.breadcrumb === 'Add Employee') {
      this.submitType = 'Save';
    } else if (this.breadcrumb === 'Edit Employee') {
      this.submitType = 'Edit';
    }
    this.dataService.getEmployee(this.id).subscribe(data => {
      if (data.id) {
        this.formModel = data;
      } else {
        console.log('error get');
      }
    })
  }

  onSave() {
    if (this.breadcrumb === 'Add Employee') {
      this.formModel.id = Math.floor(Math.random() * 101);
      this.dataService.addEmployee(this.formModel).subscribe(
        () => {
          alert('success');
        }, error => {
          alert('failed');
        }, () => {
          this.router.navigate(['/list']);
        }
      )
    } else if (this.breadcrumb === 'Edit Employee') {
      this.dataService.editEmployee(this.formModel.id, this.formModel).subscribe(
        () => {
          alert('success');
        }, error => {
          alert('failed');
        }, () => {
          this.router.navigate(['/list']);
        }
      )
    } else {
      alert('error form');
    }
  }

  onCancel() {
    this.router.navigate(['/list']);
  }
}
