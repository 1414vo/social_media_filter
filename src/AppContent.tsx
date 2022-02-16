import React from 'react';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
import Category from './models/Category';
import MoodDisplay from './components/moodtest/MoodDisplay';

interface IAppProps {
    tabIndex: number;
    primary_list: CategoryType[];
    secondary_list: CategoryType[];
    avoid_list: CategoryType[];
}

class AppContent extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props);
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

    render() {
        if(this.props.tabIndex == 1){
            return (
                <div className="row">
                    <div className="column-3">
                    {
                        this.props.primary_list.map(cat => <CategoryBox category={cat} positivity={2} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                    <div className="column-2">
                    {
                        this.props.secondary_list.map(cat => <CategoryBox category={cat} positivity={1} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                    <div className="column-1">
                    {
                        this.props.avoid_list.map(cat => <CategoryBox category={cat} positivity={0} onClick={() => this.toggleCategory(cat)}/>)
                    }
                    </div>
                </div>
            );
        }else{
            return (<div><MoodDisplay></MoodDisplay></div>);
        }
    }
}

export default AppContent;
