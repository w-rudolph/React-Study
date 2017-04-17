import React from 'react';
import API from './api'
import Sidebar from '.././sidebar/index';
import style from './index.scss';
import $ from '../../libs/jquery.js';
class Cnode extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {topics:[]};
        this.getTopics();
    }
    getTopics(){
        $.get(API.topics)
        .done((res) => {
            if(res.success) {
                //console.log(res.data.length ? res.data : 'No Data');
                this.state.topics = res.data;
                this.forceUpdate();
            }
        })
    }
    getTopicTab(tab){
        return {
            ask: '问答',
            share: '分享',
            job: '工作'
        }[tab];
    }
    render(){
        return (
            <div id="page">
                <Sidebar path="#/cnode/topics" />
                <div id="main">
                    <div id="cnode-topics">
                        <ul className="topics">
                        {this.state.topics.map((topic, index) => {
                            return (
                                <li key={index} className="topic-item">
                                    <a href='javascript:void(0)' title={topic.author.loginname}><img width="30" height="30" src={topic.author.avatar_url} alt="" /></a>&nbsp;
                                    <span>
                                        <span className="reply_count">{topic.reply_count}</span> / <span className="visit_count">{topic.visit_count}</span>
                                    </span>&nbsp;
                                    {topic.top ? <span className="put_top">置顶</span> : ""}
                                    {!topic.top && topic.good ? <span className="put_good">精华</span> : ""}
                                    {!topic.top && !topic.good ? <span className="topic_tab">{this.getTopicTab(topic.tab)}</span> : ''}&nbsp;
                                    <span className="topic-title">
                                        <a title={topic.title} href={'#/cnode/topic/' + topic.id}>{topic.title}</a>
                                    </span>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Cnode;