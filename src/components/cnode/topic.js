import React from 'react';
import API from './api'
import Sidebar from '.././sidebar/index';
import style from './index.scss';
import $ from '../../libs/jquery.js';

class Topic extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            topic: {id:""}
        }
        this.getTopic();
    }
    getTopic(){
        let topic_id = this.props.params.id;
        if(!topic_id) return;
        $.get(API.getTopic + '/' + topic_id)
        .done(res => {
            if(res.success) {
                console.log(res.data);
                this.state.topic = res.data;
                this.forceUpdate();
            }
        })
    }
    render(){
        return (
            <div id="page">
                <Sidebar path="#/cnode/topics" />
                <div id="main">         
                    <div dangerouslySetInnerHTML={{__html: this.state.topic.content}} />
                </div>
            </div>
        )
    }
}
export default Topic;

