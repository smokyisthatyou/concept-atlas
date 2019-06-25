import {Component, Input, OnInit} from '@angular/core';
import {IPerspective} from '../../model/IPerspective';
import {PerspectiveService} from '../../common/perspective.service';
import {AuthenticationService} from '../../common/authentication.service';
import {IUser} from '../../model/IUser';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-draw-perspective',
  templateUrl: './draw-perspective.component.html',
  styleUrls: ['./draw-perspective.component.css']
})
export class DrawPerspectiveComponent implements OnInit {

  perspective: IPerspective;
  user: IUser;
  @Input() mapwork: string;

    // tslint:disable-next-line:max-line-length
  constructor(private perspService: PerspectiveService, private authService: AuthenticationService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.perspService.currentPersp.subscribe(data => this.perspective = data);
    this.authService.currentUser.subscribe(data => this.user = data);
  }

  haveChild(idPersp: string) {
    // tslint:disable-next-line:only-arrow-functions
    this.perspService.haveAChild(idPersp, this.user.email).subscribe(function() {
      location.reload();
    });

  }

  freeze(idPersp: string) {
    // tslint:disable-next-line:only-arrow-functions
    this.perspService.freezePersp(idPersp, this.user.email).subscribe(function() {
      location.reload();
    });
  }

  publish(idPersp: string) {
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    this.perspService.publishPersp(idPersp, this.mapwork).subscribe( function() {
      location.reload();
  });
  }


  createMpwork(idPersp: string) {
    // tslint:disable-next-line:only-arrow-functions
    this.perspService.createMapworkFromPersp(idPersp, this.user.email).subscribe(function() {
      location.reload();
    });
  }

}
