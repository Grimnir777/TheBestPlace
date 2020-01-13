import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CitiesComponent } from './cities/cities.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cities'},
  {path: 'cities', component: CitiesComponent},
  {path: 'city/:id' , component: CityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
