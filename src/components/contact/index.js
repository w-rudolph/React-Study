import React from 'react';
import Sidebar from '.././sidebar/index';
import style from './index.scss';
import {dateFormat} from '../../utils/utils.js';
class Contact extends React.Component {
    
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState(){
        var fields = [
            {name:'name',required:true, label:'姓名',type:'text'},
            {name:'email',required:true, label:'邮箱',type:'email'},
            {name:'website',required:false, label:'网站',type:'url'},
            {name:'note',required:true, label:'留言',type:'textarea'},
        ];
        let contacts = localStorage.getItem('contacts');
        contacts = contacts === null ? [] : JSON.parse(contacts);
        contacts.sort((a, b) => {
            return b.date - a.date;
        })
        return {formFields: fields, contacts: contacts};
    }
    formSubmit(e){
        e.preventDefault();
        this.state.contacts.unshift({
            name: this.refs.name.value,
            email: this.refs.email.value,
            website: this.refs.website.value,
            note: this.refs.note.value,
            date: Date.now()
        });
        this.refs.contactForm.reset();
        this.forceUpdate();
        this.save();
    }
    save(contacts){
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    render(){
        return (
            <div id="page">
                <Sidebar path="#/contact" />
                <div id="main">
                    <form action="#" method="post" id="contact-form" onSubmit={this.formSubmit.bind(this)} ref="contactForm">
                        {this.state.formFields.map((field, index) => {
                            return (
                                <div className="form-field" key={index}>
                                    <label htmlFor={field.name}>{field.label}&nbsp;<span className={field.required ? "required" : "hidden"}>*</span>：</label>
                                    {["text", "email", "url", "number"].indexOf(field.type) !== -1 ? <input required={field.required} type={field.type} ref={field.name} />  : ""}
                                    {field.type === "textarea" ? <div><textarea required={field.required} ref={field.name}  cols="30" rows="10"></textarea></div> : ""}
                                </div>        
                            )
                        })}
                        <div className="form-field">
                            <button type="submit">提交</button>
                        </div>
                    </form>
                    <div id="notes">
                        <div className="notes-title">
                        {this.state.contacts.length ? "留言板：" : ""}
                        </div>
                        <ul className="notes-list">
                        {this.state.contacts.map((item, index) => {
                            return <li key={index}>
                                <span>{dateFormat(item.date, 'yyyy-MM-dd hh:mm:ss')}&nbsp;</span>
                                <span title={item.email}>
                                    <a href={'mailto:' + item.email}>{item.name}</a> {item.website ? '(网站: ' + item.website + ')' : ''}
                                </span> ：
                                <div>{item.note}</div>
                            </li>
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact;