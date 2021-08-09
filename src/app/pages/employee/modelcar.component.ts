import {Component, OnInit} from '@angular/core';
import {
  CarForms,
  CarModelAttributes,
  CarModelContents,
  CarModelList,
  MakerAttributes,
  MakerContent,
  MakerList,
  SegmentAttributes,
  SegmentContent,
  SegmentList
} from '@app/core/_models';
import {AlertService, DropDownService, EmployeeService} from '@app/core/_services';
import {ClrDatagridSortOrder, ClrDatagridStateInterface} from '@clr/angular';

// import {map, flatMap} from "rxjs/operators";
// import { Observable } from "rxjs";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  /* It maintains list of data */
  Cars: CarModelContents[] = [];
  formModel: CarForms;
  newForm: CarModelContents;
  sortOrder: ClrDatagridSortOrder = ClrDatagridSortOrder.UNSORTED;
  total: number;
  loading = true;

  /* Variables for form input */
  showForm = false;
  submitType = 'Save';
  selectedRow: number;

  /* For model car list */
  Employee: CarModelAttributes;
  modelList: CarModelList;
  // It maintains Array of "hardcoded" dropdown.
  products = [];
  // For maker dropdown menu
  makers: MakerAttributes;
  makerList: MakerList;
  makerContents: MakerContent[] = [];
  // For segment dropdown menu
  segments: SegmentAttributes;
  segmentList: SegmentList;
  segmentContents: SegmentContent[] = [];

  constructor(
    private dataService: EmployeeService,
    private dropDownService: DropDownService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    // get all dropdown data
    this.getDropdown();

    // Add default product data.
    this.Cars.push({
      modelId: '0b0fd845-a4d6-40f6-997b-d497b80e1594', activeStatus: true,
      description: 'No description', modelName: 'Test Model', makerId: '',
      segmentId: '', makerName: '', segmentName: '', modelType: 'Test Model', productName: 'Test Product'
    });
    this.products.push({id: '1', name: 'TAXI'});
    this.products.push({id: '2', name: 'TRUCK'});
    this.products.push({id: '3', name: 'BUS'});
    this.products.push({id: '4', name: 'CAR'});
    this.products.push({id: '5', name: 'BIKE'});
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    // let pagingFilters: any;
    // const filters: { [prop: string]: any[] } = {};
    // if (state.filters) {
    //   for (const filter of state.filters) {
    //     const {property, value} = <{ property: string; value: string }>filter;
    //     filters[property] = [value];
    //     console.log('property: ' + property);
    //     console.log('value: ' + value);
    //   }
    // }
    // if (!filters) {
    //   pagingFilters = null;
    // } else {
    //   pagingFilters = filters;
    // }
    // console.log('API request: ', state, ', with filter: ', filters, ', with sorting: ', state.sort);
    // console.log('pagingfilters: ', filters);
    // <{ by: string; reverse: boolean }>state.sort;
    let a;  // makerName
    let b;  // modelName
    let c;  // modelType
    let y;  // sort by
    let z;  // order by
    if (state.filters) {
      console.log('ClrDatagridStateInterface: ', JSON.stringify(state.filters));
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < state.filters.length; i++) {
        if (state.filters[i].property === 'makerName') {
          a = state.filters[i].value;
        }
        if (state.filters[i].property === 'modelName') {
          b = state.filters[i].value;
        }
        if (state.filters[i].property === 'modelType') {
          c = state.filters[i].value;
        }
      }
    }
    if (state.sort) {
      console.log('Test sorting: ', state.sort.by, ', with condition: ', state.sort.reverse);
      y = state.sort.by;
      if (state.sort.reverse === false) {
        z = 'DESC';
      } else if (state.sort.reverse === true) {
        z = 'ASC';
      }
    }
    if (!a) {
      a = '';
    }
    if (!b) {
      b = '';
    }
    if (!c) {
      c = '';
    }
    if (!y) {
      y = '';
    }
    if (!z) {
      z = '';
    }
    if (state.page) {
      this.dataService.pageData(state.page.from, state.page.size, a, b, c, y, z)
        .subscribe(result => {
            /* Algorithm for checking message */
            /* Algorithm for checking message */
            this.modelList = result;
            if (this.modelList.serviceResponse.responseStatus === 'AUC002'
              && this.modelList.serviceResponse.responseMessage === 'Data Successfully Fetched') {
              console.log('Success ' + this.modelList.serviceResponse.responseStatus);
              // this.alertService.success(this.modelList.serviceResponse.responseMessage);

              // When success
              this.Employee = this.modelList.modelList;
              this.Cars = this.Employee.content;
              this.total = this.Employee.totalElements;
            } else {
              this.Cars = [];
              this.alertService.warning(this.modelList.serviceResponse.responseMessage);
            }
            /* Algorithm for checking message */
            /* Algorithm for checking message */
            this.loading = false;
          },
          error => {
            this.Cars = [];
            this.loading = false;
            this.alertService.error('Download Table data error, Response: ' + error);
          }, () => {
            console.log('data finished to fetch');
          });


      //   .then(
      //   result => {
      //     /* Algorithm for checking message */
      //     /* Algorithm for checking message */
      //     this.modelList = result;
      //     if (this.modelList.serviceResponse.responseStatus === 'MDL001'
      //       && this.modelList.serviceResponse.responseMessage === 'Stock Model Successfully Fetched') {
      //       console.log('Success ' + this.modelList.serviceResponse.responseStatus);
      //       // this.alertService.success(this.modelList.serviceResponse.responseMessage);
      //
      //       // When success
      //       this.Employee = this.modelList.modelList;
      //       this.Cars = this.Employee.content;
      //       this.total = this.Employee.totalElements;
      //     } else {
      //       this.Cars = [];
      //       this.alertService.warning(this.modelList.serviceResponse.responseMessage);
      //     }
      //     /* Algorithm for checking message */
      //     /* Algorithm for checking message */
      //     this.loading = false;
      //   },
      //   error => {
      //     this.Cars = [];
      //     this.loading = false;
      //     this.alertService.error('Download Table data error, Response: ' + error);
      //   }
      // );
    } else {
      console.log('Clarity error', state);
    }
  }

  // // This method associate to New Button.
  onNew() {
    // get all dropdown data
    this.getDropdown();
    this.formModel = new CarForms();
    this.submitType = 'Save';
    this.showForm = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    console.log('Changing status: ' + this.Cars[index].modelId);
    this.dataService.delete(this.Cars[index].modelId, this.Cars[index].activeStatus)
      .subscribe(
        success => {
          /* Algorithm for checking message */
          /* Algorithm for checking message */
          const res = JSON.stringify(success);
          const res2 = JSON.parse(res);
          if (res2.responseStatus === 'RMV001' && res2.responseMessage === 'Remove Data Successfully') {
            console.log('Success ' + res2.responseStatus);
            this.alertService.success(res2.responseMessage);

            // When success
            this.Cars[index].activeStatus = !this.Cars[index].activeStatus;
            // ---------- this.Cars.splice(index, 1);
          } else {
            console.log('Failed ' + res2.responseStatus);
            this.alertService.warning(res2.responseMessage);
          }
          /* Algorithm for checking message */
          /* Algorithm for checking message */
        },
        error => {
          this.alertService.error('Delete Data failed, Response: ' + error);
        },
        () => {
          console.log('Delete observable is now completed.');
        }
      );
    // setTimeout(() => {
    //   this.justRefresh();
    // }, 750);
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.dataService.addNew(this.formModel)
        .subscribe(
          val => {
            /* Algorithm for checking message */
            /* Algorithm for checking message */
            const res = JSON.stringify(val);
            const res2 = JSON.parse(res);
            if (res2.responseStatus === 'STK002' && res2.responseMessage === 'Stock Successfully Created') {
              console.log('Success ' + res2.responseStatus);
              this.alertService.success(res2.responseMessage);

              // When Success
              this.newForm = Object.assign(this.formModel);
              this.newForm.segmentName = this.getSegmentName(this.formModel.segmentId);
              this.newForm.makerName = this.getMakerName(this.formModel.makerId);
              this.newForm.activeStatus = true;
              this.Cars.push(this.newForm);
            } else {
              console.log('Failed ' + res2.responseStatus);
              this.alertService.warning(res2.responseMessage);
            }
            /* Algorithm for checking message */
            /* Algorithm for checking message */
          },
          error => {
            this.alertService.error('Sending new Data failed, Response: ' + error);
          },
          () => {
            console.log('Register observable is now completed.');
          }
        );
    } else {
      // Update the existing properties values based on model.
      this.dataService.update(this.formModel)
        .subscribe(
          val => {
            /* Algorithm for checking message */
            /* Algorithm for checking message */
            const res = JSON.stringify(val);
            const res2 = JSON.parse(res);
            if (res2.responseStatus === 'STK004' && res2.responseMessage === 'Stock Successfully Updated') {
              console.log('Success ' + res2.responseStatus);
              this.alertService.success(res2.responseMessage);

              // When Success
              this.Cars[this.selectedRow].productName = this.formModel.productName;
              this.Cars[this.selectedRow].segmentId = this.formModel.segmentId;
              this.Cars[this.selectedRow].makerId = this.formModel.makerId;
              this.Cars[this.selectedRow].segmentName = this.getSegmentName(this.formModel.segmentId);
              this.Cars[this.selectedRow].makerName = this.getMakerName(this.formModel.makerId);
              this.Cars[this.selectedRow].modelName = this.formModel.modelName;
              this.Cars[this.selectedRow].modelType = this.formModel.modelType;
              this.Cars[this.selectedRow].description = this.formModel.description;
              // --------- this.Cars[this.selectedRow].activeStatus = this.formModel.activeStatus;
            } else {
              console.log('Failed ' + res2.responseStatus);
              this.alertService.warning(res2.responseMessage);
            }
            /* Algorithm for checking message */
            /* Algorithm for checking message */
          },
          error => {
            this.alertService.error('Update Data failed, Response: ' + error);
          },
          () => {
            console.log('Update observable is now completed.');
          }
        );
    }
    this.showForm = false;
    // setTimeout(() => {
    //   this.justRefresh();
    // }, 750);
    // console.log('Sending data form =');
    // console.log(this.formModel);
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    this.selectedRow = index;
    this.formModel = new CarForms();
    this.formModel = Object.assign({}, this.Cars[this.selectedRow]);
    this.submitType = 'Update';
    this.showForm = true;
  }

  // This method associate toCancel Button.
  onCancel() {
    this.showForm = false;
  }

  // This method associate to dropdown menu.
  getDropdown() {
    this.dropDownService.loadMakers().subscribe(
      result => {
        this.makerList = result;
        this.makers = this.makerList.makers;
        this.makerContents = this.makers.content;
        console.log('ini list maker');
        console.log(this.makerContents);
      },
      error => {
        this.alertService.error('Get segment data error, Response: ' + error);
      }
    );
    this.dropDownService.loadSegments().subscribe(
      result => {
        this.segmentList = result;
        this.segments = this.segmentList.segments;
        this.segmentContents = this.segments.content;
        console.log('ini list segment');
        console.log(this.makerContents);
      },
      error => {
        this.alertService.error('Get segment data error, Response: ' + error);
      }
    );
  }

  // This method associate to query from maker dropdown.
  getMakerName(id: any) {
    const index = this.makerContents.findIndex(makerContents => makerContents.makerId === id);
    if (index === -1) {
      return 'ID NOT FOUND';
    }
    // console.log('Index new maker: ' + index + ', with ID: ' + id);
    return this.makerContents[index].makerName;
  }

  // This method associate to query from segment dropdown.
  getSegmentName(id: any) {
    const index = this.segmentContents.findIndex(segmentContents => segmentContents.segmentId === id);
    if (index === -1) {
      return 'ID NOT FOUND';
    }
    // console.log('Index new segments: ' + index + ', with ID: ' + id);
    return this.segmentContents[index].segmentName;
  }

  // Timer in typescript
  // justRefresh() {
  //   this.dataService.getAll().then(
  //     result => {
  //       this.modelList = result;
  //       this.Employee = this.modelList.modelList;
  //       if (this.Employee != null) {
  //         this.Cars.splice(length);
  //         console.log('Refresh Successful');
  //         this.Cars = this.Employee.content;
  //         // setTimeout(() => {
  //         //   this.alertService.info('Update Data Finished');
  //         // }, 1000);
  //       } else if (this.Employee == null) {
  //         this.alertService.warning('Failed to Update Model Stock');
  //       }
  //     },
  //     error => {
  //       this.alertService.error('Update data error, Response: ' + error);
  //     }
  //   );
  // }
}


// *********** Just example of code, don't delete this *****************//

// result.(pipe(flatMap(segments => {
//   return {
//     id: segments.segmentId,
//     name: segments.segmentName
//   }
// })).forEach(segments => this.segments(segments));

// result.forEach(segments=>{
//   this.segments.push(
//     {
//       "id":segments.segmentId,
//       "name":segments.segmentName
//     });
// });

// this.s.splice(length);  clear dropdown array
// let index = this.makerContents.indexOf(id);
// let copy = Object.assign({this.segments}, result);

// for (let i=0; i<result[].length; i++){
//   this.segments.push({
//     id: result[i].segments[].segmentId,
//     name: result[i].segments[].segmentName
//   });
// };
