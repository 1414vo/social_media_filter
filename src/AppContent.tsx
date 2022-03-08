import React from 'react';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
import MoodDisplay from './components/moodtest/MoodDisplay';

interface IAppProps {
    tabIndex: number;
}
interface IAppState {
    primary_list: CategoryType[];
    secondary_list: CategoryType[];
    avoid_list: CategoryType[];
    is_on: Map<CategoryType, boolean>;
}
class AppContent extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            primary_list: [CategoryType.Academic, CategoryType.Entertainment],
            secondary_list: [CategoryType.News, CategoryType.Tech, CategoryType.Business],
            avoid_list: [CategoryType.Politics],
            is_on: new Map<CategoryType, boolean>([
                [CategoryType.Academic, true],
                [CategoryType.Entertainment, true],
                [CategoryType.News, false],
                [CategoryType.Tech, false],
                [CategoryType.Business, false],
                [CategoryType.Politics, false]
            ])
        }
    }

    componentDidMount() {
        console.log("mounted");
        chrome.storage.sync.get(['categoryMap', 'primaryList', 'secondaryList', 'avoidList'], (data) => {
            console.log("data: ", data, data.primaryList);
            if(!!data.categoryMap){
                this.setState({
                    is_on: new Map(data.categoryMap)
                })
            }
            if(!!data.primaryList) {
                console.log(data.primaryList, data.secondaryList, data.avoidList);
                this.setState({
                    primary_list: data.primaryList,
                    secondary_list: data.secondaryList,
                    avoid_list: data.avoidList
                })
            }
        });
    }

    toggleCategory(category: CategoryType) {
        this.state.is_on.set(category, !this.state.is_on.get(category));
        if(navigator.serviceWorker.controller){
            console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
            navigator.serviceWorker.controller.postMessage({"changeCategory": this.state.is_on});
        }else{
            console.log("no service");
        }
        this.forceUpdate();
    }

    updateCategories = (primaryList: CategoryType[], secondaryList: CategoryType[], avoidList: CategoryType[]) => {
        primaryList.forEach(cat =>{
            if(!this.state.is_on.has(cat) || !(this.state.primary_list.indexOf(cat) > -1)){
                this.state.is_on.set(cat, true);
            }
        });
        secondaryList.forEach(cat =>{
            if(!this.state.is_on.has(cat) || this.state.primary_list.indexOf(cat) > -1){
                this.state.is_on.set(cat, false);
            }
        });
        avoidList.forEach(cat =>{
            if(!this.state.is_on.has(cat) || this.state.primary_list.indexOf(cat) > -1){
                this.state.is_on.set(cat, false);
            }
        });
        if(navigator.serviceWorker.controller){
            navigator.serviceWorker.controller.postMessage({"changeLists": {"primaryList": primaryList, "secondaryList": secondaryList, "avoidList": avoidList}});
        }else{
            console.log("no service");
        }
        this.setState({
            primary_list: primaryList, secondary_list: secondaryList, avoid_list: avoidList
        });
        this.state.is_on.forEach((value, key) =>{
            if(navigator.serviceWorker.controller){
                navigator.serviceWorker.controller.postMessage({"changeCategory": this.state.is_on});
                console.log(value, key);
            }else{
                console.log("no service");
            }
        });
        
        this.forceUpdate();
    } 

    render() {
        if(this.props.tabIndex == 1){
            return (
                <div className="row">
                    <div className="column-3">
                    <div>Recommended:</div>
                    {
                        this.state.primary_list.map(cat => <CategoryBox key={cat} category={cat} positivity={2} onClick={() => this.toggleCategory(cat)} isOnMap={this.state.is_on}/>)
                    }
                    </div>
                    <div className="column-2">
                    <div>Secondary:</div>
                    {
                        this.state.secondary_list.map(cat => <CategoryBox key={cat} category={cat} positivity={1} onClick={() => this.toggleCategory(cat)} isOnMap={this.state.is_on}/>)
                    }
                    </div>
                    <div className="column-1">
                    <div>Avoid:</div>
                    {
                        this.state.avoid_list.map(cat => <CategoryBox key={cat} category={cat} positivity={0} onClick={() => this.toggleCategory(cat)} isOnMap={this.state.is_on}/>)
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
