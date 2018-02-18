import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';

import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  allHeroes = HEROES;
  heroes: Hero[] = [];
  selectedHero: Hero;
  page: number = 0;
  // page: number = 1;
  pageSize: number = 5;

  displayedColumns = ['id', 'name'];
  dataSource: MatTableDataSource<Hero>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {
    this.getHeroesByPage();
  }

  ngAfterViewInit() {

  }

  // Base md-table
  getHeroesByPage(page=this.page, pageSize=this.pageSize) {
    this.heroes = this.allHeroes.slice(page * pageSize, (page + 1) * pageSize);
    this.dataSource = new MatTableDataSource<Hero>(this.heroes);
  }

  // Extended md-table
  // getHeroesByPage(page=this.page, pageSize=this.pageSize) {
  //   this.heroes = this.allHeroes.slice((page - 1) * this.pageSize, page * pageSize);
  //   this.dataSource = new MatTableDataSource<Hero>(this.heroes);
  // }

  onSelect(hero: Hero): void {
    // this.selectedHero = hero;
    let dialogRef = this.dialog.open(HeroDetailComponent, { data: JSON.parse(JSON.stringify(hero)) });
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.name !== hero.name)
        hero.name = data.name;
    });
  }

  onPageChange(ev: any) {
    this.pageSize = ev.pageSize;
    this.page = ev.pageIndex;
    this.getHeroesByPage();
  }

  onPageChange2(ev: any) {
    this.pageSize = ev.itemsPerPage;
    this.page = ev.page;
    this.getHeroesByPage();
  }

}
