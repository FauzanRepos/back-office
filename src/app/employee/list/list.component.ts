import {Component, OnInit} from '@angular/core';
import {DataService} from "../_service/data.service";
import {employeeModel} from "../_model/data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  total = 0;
  loading = false;
  employeeMandilist: employeeModel[];

  constructor(
    private router: Router,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.dataService.getEmployees().subscribe(data => {
      this.loading = false;
      this.total = data.length;
      this.employeeMandilist = data;
    })
  }

  goCreate() {
    this.router.navigate(['/add']);
  }

  goDetail(index: number) {
    this.router.navigate(['/detail/' + this.employeeMandilist[index].id]);
  }

  goEdit(index: number) {
    this.router.navigate(['/edit/' + this.employeeMandilist[index].id]);
  }

  goDelete(index: number) {
    this.dataService.removeEmployee(this.employeeMandilist[index].id);
    this.fetchData();
  }

}
