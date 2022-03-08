import { throws } from 'assert';
import React from 'react';
import './Tab.css';

interface ITabProps {
    title: string;
    isSelected: boolean;
}

class Tab extends React.Component<ITabProps> {
    constructor(props: ITabProps) {
        super(props);
    }
    /**
     * Renders the tab.
     * @returns The rendered component.
     */
    render() {
        if(this.props.isSelected) {
            return (<div className="Tab-selected">
                {this.props.title}
            </div>);
        }
        return (<div className="Tab">
            {this.props.title}
        </div>);
    }
}

export default Tab;