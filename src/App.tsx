import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
import Category from './models/Category';
import Tab from './components/Tab';
import AppContent from './AppContent';

interface IAppProps {
    primary_list: CategoryType[];
    secondary_list: CategoryType[];
    avoid_list: CategoryType[];
}

interface IAppState {
    tabIndex: number;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  updateTabIndex(i: number) {
    this.setState({
      tabIndex: i
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div onClick={() => this.updateTabIndex(0)} className="Header-tab"><Tab title="Home" isSelected={this.state.tabIndex == 0}></Tab></div>
          <div onClick={() => this.updateTabIndex(1)} className="Header-tab"><Tab title="Your Feed" isSelected={this.state.tabIndex == 1}></Tab></div>
        </div>
        <div className="App-content">
            <AppContent primary_list={this.props.primary_list} secondary_list={this.props.secondary_list} avoid_list={this.props.avoid_list} tabIndex={this.state.tabIndex}></AppContent>
        </div>
      </div>
    );
  }
}

export default App;
