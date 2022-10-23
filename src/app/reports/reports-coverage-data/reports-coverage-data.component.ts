import { Router } from '@angular/router';
import { BodyComponent } from './../../commons/body/body.component';
import { BaseAPI } from './../../../app/services/api/base.api';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateFunction } from '../../commons/models/date.models';
import { apiDirectory } from '../../../global';
import groupBy from 'lodash/groupBy';

@Component({
  selector: 'adj-reports-coverage-data',
  templateUrl: './reports-coverage-data.component.html',
  styleUrls: ['./reports-coverage-data.component.scss'],
})
export class ReportsCoverageDataComponent implements OnInit {
  public results: Array<String> = [];
  public params: Map<string, any>;
  private body: BodyComponent;
  public showByMarket: String;
  public showByMonth: String;
  public monthGroup: string = '0';
  public marketGroup: string = '0';
  public totalRecords: Number;
  constructor(private baseAPI: BaseAPI,     
    private router: Router) { }

  ngOnInit() {
    this.getSummaryTableData();
  }


  getSummaryTableData() {

    const params = new Map<string, string>(this.params);
    // params.set('search', searchTerm);
    params.set('month_group', this.monthGroup)
    params.set('market_group', this.marketGroup)

    this.baseAPI.executeGet({
      url: apiDirectory.l1Coverage,
      params: params
    }).subscribe(response => {
      if (response.results && response.results.length) {
        this.results = [];
        let showSubTotals = true;
        let responseResults = response.results;
       
        let totalObj: any = {};
        responseResults.map(obj => {
            for (var property in obj) {
            if (typeof obj[property] == 'number') {
            obj[property] = Math.round(obj[property]);
            }
            }  
          })
        for (var property in responseResults[0]) {
          
          totalObj[property] = 0;
          responseResults.map((obj, index) => {
            if (typeof obj[property] == 'number') {
              totalObj[property] += obj[property];
              totalObj['totalSum'] = true;

            } else {
              if (property == 'region') {
                totalObj[property] = 'PAN INDIA TOTAL';
              } else {
                totalObj[property] = '';
              }
            }

            if(obj.hasOwnProperty('region')) {
              showSubTotals = true;
            } else {
              showSubTotals = false;

            }

          })
        }
        if (showSubTotals) {

          const groupByRegion = groupBy(responseResults, function (n) {
            return n.region;
          });

          for (let row in groupByRegion) {
            let totalref = {}
            for (var property in responseResults[0]) {
              totalref[property] = 0;
              groupByRegion[row].map((obj) => {
                if (typeof obj[property] == 'number') {
                  totalref[property] += obj[property];
                  totalref['regionSum'] = true;


                } else {
                  if (property == 'region') {
                    totalref[property] = obj[property] + ' TOTAL ';
                  } else {
                    totalref[property] = '';
                  }
                }
              })
            }
            groupByRegion[row].push(totalref)
            this.results = [...this.results, ...groupByRegion[row]];
          }
        }else{
          this.results = responseResults;
        }
        this.results.push(totalObj)

        this.totalRecords = this.results.length;
      }
    }, error => this.body.error = error)
  }

  ChangeMonth(event) {
    this.monthGroup = event.detail.checked ?  '1' : '0';
    this.getSummaryTableData();

  }
  ChangeMarket(event) {
    this.marketGroup = event.detail.checked ?  '1' : '0';
    this.getSummaryTableData();

  }

  
  public close() {
    this.router.navigate(['/rainbow/reports']);

}

}
