import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  list: any = [
    {
      title: 'Activity Logs',
      url: 'activity-logs',
      info: '',
      search_keywords: 'user logs',
      show: false,
    },
    {
      title: 'Applications',
      url: '/applications',
      info: '',
      search_keywords: 'apps, projects, change plans',
      show: false,
    },
    {
      title: 'Bill & Payments',
      url: 'bills',
      info: '',
      search_keywords: 'active plan',
      show: false,
    },
    {
      title: 'CMS',
      url: '/cms',
      info: '',
      search_keywords: 'Content management system',
      show: false,
    },
    {
      title: 'Change password',
      url: '/change-password',
      info: '',
      search_keywords: 'Update Password',
      show: false,
    },
    {
      title: 'Structured Data',
      url: '/structured-data-list',
      info: '',
      search_keywords: 'data structure',
      show: false,
    },
  ];
  queryInput = new FormControl('', [Validators.required]);

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}
  search(searchDrop: any) {
    let value = this.queryInput.value ? this.queryInput.value : '';
    value = value.toLowerCase();
    if (value) {
      let counter = 0;
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].show = false;
        var title = this.list[i].title.toLowerCase().indexOf(value),
          search_keywords = this.list[i].search_keywords
            .toLowerCase()
            .indexOf(value);
        let info = this.list[i].info.toLowerCase().indexOf(value);
        if (title != -1 || search_keywords != -1 || info != -1) {
          this.list[i].show = true;
          counter++;
        }
        if (counter > 5) {
          //set limit
          break;
        }
      }
      if (counter > 0) {
        searchDrop.open();
      } else {
        searchDrop.close();
      }
    } else {
      searchDrop.close();
    }
  }
  go(searchDrop: any, index: number) {
    searchDrop.close();
    this.router.navigate([this.list[index].url]);
  }
}
