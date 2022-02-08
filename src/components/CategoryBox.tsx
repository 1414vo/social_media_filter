import React from 'react';
import Category from '../models/Category';
import CategoryType from '../models/CategoryType';
import './Category_Box.css';

interface IBoxProps {
  category: CategoryType;
  onClick: any;
}
interface IBoxState {
  value: Category;
}
class CategoryBox extends React.Component<IBoxProps, IBoxState> {
    constructor(props: IBoxProps) {
        super(props);
        this.state = {
          value: new Category(props.category),
        };
    }

    getBoxStyle(type: number) {
      switch(type) {
        case 0:
          return "red";
        case 1:
          return "yellow";
        case 2:
          return "green";
        default:
          return "default";
      }
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={`category_box ${this.getBoxStyle(this.state.value.categoryScore)}`}>
              {CategoryType[this.state.value.category]}
            </div>
          );
    }
  
}

export default CategoryBox;
