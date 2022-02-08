import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';

interface IAppProps {
    categories: CategoryType[];
}

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  toggleCategory(index: number) {
    console.log(CategoryType[this.props.categories[index]]);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            this.props.categories.map((cat,i) => <CategoryBox category={cat} onClick={() => this.toggleCategory(i)}/>)
          }
        </header>
      </div>
    );
  }
}

export default App;
