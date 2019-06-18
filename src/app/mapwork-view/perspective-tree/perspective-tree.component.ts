import {Component, Input, OnInit} from '@angular/core';
import { IMapwork } from 'src/app/model/IMapwork';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {IPerspective} from '../../model/IPerspective';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];



@Component({
  selector: 'app-perspective-tree',
  templateUrl: './perspective-tree.component.html',
  styleUrls: ['./perspective-tree.component.css']
})

export class PerspectiveTreeComponent implements OnInit {
  constructor() {
    this.dataSource.data = TREE_DATA;

    this.treeControl.dataNodes = TREE_DATA;
  }
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  @Input() mapwork: IMapwork;
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;



  ngOnInit() {
    this.treeControl.expandAll();
  }



}
