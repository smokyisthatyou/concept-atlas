import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IMapwork } from 'src/app/model/IMapwork';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {IPerspective} from '../../model/IPerspective';
import {PerspectiveService} from '../../common/perspective.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perspective-tree',
  templateUrl: './perspective-tree.component.html',
  styleUrls: ['./perspective-tree.component.css']
})

export class PerspectiveTreeComponent implements OnInit {

  treeControl = new NestedTreeControl<IPerspective>(node => node.children);
  dataSource = new MatTreeNestedDataSource<IPerspective>();
  @Input() mapwork: string;
  hasChild = (_: number, node: IPerspective) => !!node.children && node.children.length > 0;

  constructor(private treeService: PerspectiveService, private router: Router) {
/*
    this.dataSource.data = TREE_DATA;

    this.treeControl.dataNodes = TREE_DATA;
*/

}

  clickHandler(perspective) {
    this.treeService.setCurrentPersp(perspective);
  }


  ngOnInit() {

    this.treeService.getPerspectiveTree(this.mapwork).subscribe(data => {
      // @ts-ignore
      this.dataSource.data = data;
      this.treeControl.dataNodes = data;
      this.treeControl.expandAll();
    });


  }

}
