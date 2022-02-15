import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
import Category from './models/Category';
import Tab from './components/Tab';

interface IAppProps {
    tabIndex: number;
    categories: CategoryType[];
}

interface IAppState {
    toxic: CategoryType[];
    medium: CategoryType[];
    light: CategoryType[];
}

class AppContent extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      toxic: [],
      medium: [],
      light: []
    }
    this.splitIntoColumns();
  }

  toggleCategory(category: CategoryType) {
    console.log(CategoryType[category]);
  }

  splitIntoColumns() {
    this.props.categories.forEach(cat => {
      var v = Category.getCategoryScore(cat);
      switch(v) {
        case 0:
          this.state.toxic.push(cat);
          break;
        case 1:
          this.state.medium.push(cat);
          break;
        case 2:
          this.state.light.push(cat);
          break;
      }
    })
  }

  

  render() {
    if(this.props.tabIndex == 0){
        return (
            <div className="row">
                <div className="column-1">
                {
                    this.state.toxic.map(cat => <CategoryBox category={cat} onClick={() => this.toggleCategory(cat)}/>)
                }
                </div>
                <div className="column-2">
                {
                    this.state.medium.map(cat => <CategoryBox category={cat} onClick={() => this.toggleCategory(cat)}/>)
                }
                </div>
                <div className="column-3">
                {
                    this.state.light.map(cat => <CategoryBox category={cat} onClick={() => this.toggleCategory(cat)}/>)
                }
                </div>
            </div>
        );
    }else{
        return (<div></div>);
    }
  }
}

export default AppContent;
