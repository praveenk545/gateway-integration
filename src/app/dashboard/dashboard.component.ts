import { Component } from '@angular/core';
import {} from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faCube,
  faPen,
  faPlus,
  faStar,
  faUser,
  faDashboard,
  faHome,
  faMailReply,
  faSeedling,
  faShareNodes,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  icons = {
    faPlus,
    faPen,
    faAngleRight,
    faCube,
    faStar,
    faUser,
    faDashboard,
    faHome,
    faMailReply,
    faSeedling,
    faShareNodes,
    faReceipt,
  };
}
