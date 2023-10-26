import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SpfxBasicWebPartStrings';
//import SpfxBasic from './components/SpfxBasic';
//import  BackgroundChanger from './components/backgroundChanger/BackgroundChanger';
//import  PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';
//import MiniContext from './components/miniContext/MiniContext';
//import ToDoContextLocalStorage from './components/toDoContextLocalStorage/ToDoContextLocalStorage';
//import  CurrencyConverter from './components/currencyConverter/CurrencyConverter';
import { ISpfxBasicProps } from './components/ISpfxBasicProps';
import ToDoReactToolKit from './components/todoReactToolKit/TodoReactToolKit';

export interface ISpfxBasicWebPartProps {
  description: string;
}

export default class SpfxBasicWebPart extends BaseClientSideWebPart<ISpfxBasicWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ISpfxBasicProps> = React.createElement(
      ToDoReactToolKit,
      {
        description: this.properties.description      
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<any> {
      return new Promise((resolve,reject)=>{
          resolve("ok");
      });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
