import React from 'react';
import './App.css';
import Tab from './components/Tab';
import AppContent from './AppContent';
import { changeBackgroundColor } from './backgroundColor';

interface IAppProps {}

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
    if (i == 1) {
      changeBackgroundColor();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div onClick={() => this.updateTabIndex(0)} className="Header-tab"><Tab title="Home" isSelected={this.state.tabIndex == 0}></Tab></div>
          <div onClick={() => this.updateTabIndex(1)} className="Header-tab"><Tab title="Your Feed" isSelected={this.state.tabIndex == 1}></Tab></div>
        </div>
        <div className="App-content">
            <AppContent tabIndex={this.state.tabIndex}></AppContent>
        </div>
      </div>
    );
  }
}

export default App;
