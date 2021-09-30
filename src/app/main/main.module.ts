import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewsListComponent } from './news-list/news-list.component';
import { MainComponent } from './main.component';
import { MainTabsComponent } from './main-tabs/main-tabs.component';

@NgModule({
  declarations: [NewsListComponent, MainComponent, MainTabsComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  exports: [NewsListComponent],
})
export class MainModule {}
