import { Router } from '@angular/router';
import { BodyComponent } from './../../commons/body/body.component';
import { BaseAPI } from './../../../app/services/api/base.api';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateFunction } from '../../commons/models/date.models';
import { apiDirectory } from '../../../global';

import groupBy from 'lodash/groupBy';

@Component({
  selector: 'adj-reports-data',
  templateUrl: './reports-data.component.html',
  styleUrls: ['./reports-data.component.scss'],
})
export class ReportsDataComponent implements OnInit {
  public results: Array<String> = [];
  public params: Map<string, any>;
  private body: BodyComponent;
  public showByMarket: String;
  public showByRa: String;
  public marketGrp: string = '0';
  public raColor: string = '0';
  public totalRecords: Number;
  public sum: Number = 0;

  constructor(private baseAPI: BaseAPI,     
       private router: Router,
    ) { }

  ngOnInit() {

      this.getSummaryTableData();
  }

  getSummaryTableData() {

    const params = new Map<string, string>(this.params);
    // params.set('search', searchTerm);
    params.set('market_group', this.marketGrp)
    params.set('ra_color_group', this.raColor)

    this.baseAPI.executeGet({
      url: apiDirectory.storeSummary,
      params: params
    }).subscribe(response => {
      if (response.results && response.results.length) {
        this.results = [];
        let showSubTotals = true;
        let responseResults = response.results;
        let grandTotalPJP = 0;
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
                    totalref[property] = obj[property] + ' TOTAL';
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

  

  public ionChangeMarket(event) {
    this.marketGrp = event.detail.checked ?  '1' : '0';
    this.getSummaryTableData();

  }

  public ionChangeRa(event) {
    this.raColor = event.detail.checked ?  '1' : '0';
    this.getSummaryTableData();

  }
  
  public close() {
    this.router.navigate(['/rainbow/reports']);

}

}
