import React from 'react';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
import Category from './models/Category';
import MoodDisplay from './components/moodtest/MoodDisplay';

export function updateBackgroundColor(color: string) {
    if(navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({"color": color});
    }
}

interface IAppProps {
    tabIndex: number;
}
interface IAppState {
    primary_list: CategoryType[];
    secondary_list: CategoryType[];
    avoid_list: CategoryType[];
}
class AppContent extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            primary_list: [CategoryType.Academic, CategoryType.Entertainment],
            secondary_list: [CategoryType.News, CategoryType.Tech, CategoryType.Business],
            avoid_list: [CategoryType.Politics]
        }
    }

    toggleCategory(category: CategoryType) {
        console.log(CategoryType[category]);
        if(navigator.serviceWorker.controller){
            console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
            navigator.serviceWorker.controller.postMessage(CategoryType[category]);
        }else{
            console.log("no service");
        }
    }

    updateCategories = (primaryList: CategoryType[], secondaryList: CategoryType[], avoidList: CategoryType[]) => {
        this.setState({
            primary_list: primaryList, secondary_list: secondaryList, avoid_list: avoidList
        });
    } 

    render() {
        if(this.props.tabIndex == 1){
            return (
                <div className="row">
                    <div className="column-3">
                    {
                        this.state.primary_list.map(cat => <CategoryBox category={cat} positivity={2} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                    <div className="column-2">
                    {
                        this.state.secondary_list.map(cat => <CategoryBox category={cat} positivity={1} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                    <div className="column-1">
                    {
                        this.state.avoid_list.map(cat => <CategoryBox category={cat} positivity={0} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                </div>
            );
        }else{
            return (<div><MoodDisplay callback={this.updateCategories}></MoodDisplay></div>);
        }
    }
}

export default AppContent;
