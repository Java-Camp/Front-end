import { Component, OnInit } from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import { UserDataService, User } from "../user-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  is_active = "";
  constructor(private data:UserDataService) { }

  ngOnInit(): void {
  }

  public user = this.data.user;

  toggleNav(){
    if(this.is_active){
        this.is_active = "";
    }
    else{
        this.is_active = "_active";
    }
  }

}
