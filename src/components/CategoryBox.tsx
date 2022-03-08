import React from 'react';
import { isJSDocNamepathType } from 'typescript';
import CategoryType from '../models/CategoryType';
import './CategoryBox.css';

interface IBoxProps {
  category: CategoryType;
  onClick: any;
  positivity: number;
  isOnMap: Map<CategoryType, boolean>;
}
interface IBoxState {
  isOn: boolean | undefined;
}
class CategoryBox extends React.Component<IBoxProps, IBoxState> {
    constructor(props: IBoxProps) {
        super(props);
        this.state = {
          isOn : this.props.isOnMap.has(this.props.category) ? this.props.isOnMap.get(this.props.category) : (this.props.positivity == 2 ? true : false)
        };
    }

    static getDerivedStateFromProps(props: IBoxProps, state: IBoxProps) {
      return {
        isOn : props.isOnMap.has(props.category) ? props.isOnMap.get(props.category) : (props.positivity == 2 ? true : false)
      };
    }

    getBoxStyle(type: number) {
      switch(type) {
        case 0:
          return this.state.isOn ? "toxic on" : "toxic off";
        case 1:
          return this.state.isOn ? "medium on" : "medium off";
        case 2:
          return this.state.isOn ? "good on" : "good off";
        default:
          return "default";
      }
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={`category_box ${this.getBoxStyle(this.props.positivity)}`}>
              <div className='text'>{CategoryType[this.props.category]}</div>
              <div className={`leftCircle ${this.state.isOn?'circleOn':''}`}></div>
              <div className={`rightCircle ${this.state.isOn?'':'circleOff'}`}></div>
            </div>
          );
    }
  
}

export default CategoryBox;
