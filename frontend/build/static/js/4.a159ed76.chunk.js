(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{109:function(e,t){},112:function(e,t,a){},117:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(8),s=a(10),o=a(9),c=a(11),i=a(3),u=a(0),l=a.n(u),m=a(12),d=a(2),h=a.n(d),p=a(4),g=a(5),f=a.n(g),v=function(){var e=Object(p.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={success:!1,message:"",payload:null},t||(a.success=!1,a.message="No user token found"),e.prev=2,e.next=5,f.a.get("/user/getUser?token="+t);case 5:a.payload=e.sent,a.success=!0,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),a.success=!1,a.message="Error calling userGet api endpoint";case 13:return e.abrupt("return",Promise.resolve(a));case 14:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(p.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={success:!1,message:"",payload:null},t||(a.message="No chatId given"),e.prev=2,e.next=5,f.a.get("/user/getMessages?cid="+t);case 5:a.payload=e.sent,a.success=!0,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),a.message="Error calling getMessages api endpoint";case 12:return e.abrupt("return",Promise.resolve(a));case 13:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(p.a)(h.a.mark(function e(t,a){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Promise,e.next=3,f.a.post("/chatroom/create",{chatroomName:t,email:a});case 3:return e.t1=e.sent,e.abrupt("return",e.t0.resolve.call(e.t0,e.t1));case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),k=function(){var e=Object(p.a)(h.a.mark(function e(t,a){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Promise,e.next=3,f.a.delete("/chatroom/delete",{params:{cid:t,userEmail:a}});case 3:return e.t1=e.sent,e.abrupt("return",e.t0.resolve.call(e.t0,e.t1));case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),w=function(){var e=Object(p.a)(h.a.mark(function e(){var t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={success:!1,message:"",payload:null},e.prev=1,t.success=!0,e.next=5,f.a.get("/chatroom/getAll");case 5:t.payload=e.sent,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),t.success=!1,t.message="Error calling /chatroom/getAll api endpoint";case 12:return e.abrupt("return",Promise.resolve(t));case 13:case"end":return e.stop()}},e,null,[[1,8]])}));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(p.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={success:!1,message:"",payload:null},t||(a.message="No chatroom id given"),e.prev=2,a.success=!0,e.next=6,f.a.get("/chatroom/getOne",{params:{cid:t}});case 6:a.payload=e.sent,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),a.success=!1,a.message="Error calling /chatroom/getOne api endpoint";case 13:return e.abrupt("return",Promise.resolve(a));case 14:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(h.a.mark(function e(t,a){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Promise,e.next=3,f.a.get("/chatroom/select",{params:{cid:t,userEmail:a}});case 3:return e.t1=e.sent,e.abrupt("return",e.t0.resolve.call(e.t0,e.t1));case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),O=a(83),N=a.n(O)()("/"),j=(a(112),function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.data,t=e.firstName,a=e.lastName;return"undefined"===typeof this.props.data||"undefined"===typeof t||"undefined"===typeof a?l.a.createElement("div",null,"Loading..."):l.a.createElement("div",null,l.a.createElement("p",null,"Currently logged in as:"),l.a.createElement("h2",null,t+" "+a))}}]),t}(u.Component)),S=a(114),D=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.roomArr;return l.a.createElement("div",{className:"room-holder"},t.map(function(t){return l.a.createElement("div",{className:"room",key:t._id},l.a.createElement("input",{type:"text",value:t.chatroomName,readOnly:!0}),l.a.createElement("div",{className:"action-btns"},l.a.createElement("button",{onClick:function(){e.props.handleDelete(t._id)},className:"btnDelete"},"Delete"),l.a.createElement("button",{onClick:function(){e.props.handleSelect(t._id)},className:"btnJoin"},"Join")))}))}}]),t}(u.Component),M=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={message:"",isLoading:!0,chatrooms:[],newChatroomName:""},a.handleSelect=a.handleSelect.bind(Object(i.a)(Object(i.a)(a))),a.handleDelete=a.handleDelete.bind(Object(i.a)(Object(i.a)(a))),a.handleCreate=a.handleCreate.bind(Object(i.a)(Object(i.a)(a))),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;w().then(function(t){t.success||e.setState({isLoading:!1,message:"Unable to grab chatrooms"});var a=t.payload.data.payload;a||e.setState({isLoading:!1,message:"Unable to grab chatrooms"}),e.setState({isLoading:!1,chatrooms:a})})}},{key:"handleSelect",value:function(e){var t=this,a=this.props.data.email;a&&E(e,a).then(function(a){a.data.success?(document.querySelector(".chatRoom .errorMsg").innerText="",C(e).then(function(e){if(e.success){var a=e.payload.data.payload;t.props.chatroomChange(a._id,a.chatroomName)}else document.querySelector(".chatRoom .errorMsg").innerText=e.message})):document.querySelector(".chatRoom .errorMsg").innerText=a.data.message})}},{key:"handleDelete",value:function(e){var t=this,a=this.props.data.email;if(a){var n=this.state.chatrooms.filter(function(t){return t._id!==e});k(e,a).then(function(e){e.data.success?(document.querySelector(".chatRoom .errorMsg").innerText="",t.setState({chatrooms:n})):document.querySelector(".chatRoom .errorMsg").innerText=e.data.message})}}},{key:"handleCreate",value:function(){var e=this,t=this.props.data.email;y(this.state.newChatroomName,t).then(function(t){t.data.success?(e.setState({chatrooms:[].concat(Object(S.a)(e.state.chatrooms),[t.data.payload]),newChatroomName:""}),document.querySelector(".chatRoom .errorMsg").innerText="",document.querySelector("input.txtCreate").style.display="none"):document.querySelector(".chatRoom .errorMsg").innerText=t.data.message})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoading,n=t.message,r=t.newChatroomName;return a||this.props.data==={}?l.a.createElement("div",null,"Loading..."):l.a.createElement("div",null,l.a.createElement("h1",null,"ChatRooms"),l.a.createElement("button",{className:"btnCreate",onClick:function(e){e.stopPropagation(),document.querySelector("input.txtCreate").style.display="block"}},"Create Chatroom"),l.a.createElement("input",{type:"text",className:"txtCreate",onChange:function(t){e.setState({newChatroomName:t.target.value})},onKeyDown:function(t){13===t.keyCode&&e.handleCreate()},onClick:function(e){e.stopPropagation()},value:r,placeholder:"Enter Chatroom Name..."}),l.a.createElement("div",{className:"errorMsg"},n),l.a.createElement(D,{roomArr:this.state.chatrooms,handleDelete:this.handleDelete,handleSelect:this.handleSelect}))}}]),t}(u.Component),x=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={newMessage:"",menuToggled:!1},a.handleMenuClick=a.handleMenuClick.bind(Object(i.a)(Object(i.a)(a))),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"handleMenuClick",value:function(){var e=document.querySelector(".left-panel"),t=document.querySelector(".hidden-menu-btn");e&&(this.state.menuToggled?(e.style.display="none",t.style.top="0",t.style.color="var(--dark-blue)",t.style.position="relative"):(e.style.display="block",t.style.top="calc(-98vh)",t.style.color="var(--white)",t.style.position="absolute",t.style.right="10px"),this.setState({menuToggled:!this.state.menuToggled}))}},{key:"formatDate",value:function(e){var t=e.getHours(),a=e.getMinutes(),n=e.getDate(),r=e.getFullYear(),s=t>=12?"pm":"am";return t%=12,e.getMonth()+1+"/"+n+"/"+r+" "+(t=t||12)+":"+(a=a<10?"0"+a:a)+" "+s}},{key:"render",value:function(){var e=this,t=this.props,a=t.messages,n=t.userData;return l.a.createElement("div",null,l.a.createElement("div",{className:"message-room"},this.props.currentRoom,l.a.createElement("div",{className:"hidden-menu-btn",onClick:this.handleMenuClick},"menu")),l.a.createElement("div",{className:"messages inset-shadow"},a.map(function(t,a){var r=!1;n.firstName===t.userInfo.firstName&&n.lastName===t.userInfo.lastName&&(r=!0);var s=new Date(t.timestamp),o=e.formatDate(s);return l.a.createElement("div",{className:"message "+(r?" mainUser":""),key:a},l.a.createElement("div",{className:"userInfo"},n==={}?"Anon: ".concat(t.message):"".concat(t.userInfo.firstName," ").concat(t.userInfo.lastName),"\xa0-\xa0",o),l.a.createElement("div",{className:"userMsg"},t.message))})),l.a.createElement("div",{className:"message-input inset-shadow"},l.a.createElement("input",{type:"text",onChange:function(t){return e.setState({newMessage:t.target.value})},onKeyDown:function(t){13===t.keyCode&&(e.props.handleSend(e.state.newMessage),e.setState({newMessage:""}))},value:this.state.newMessage,placeholder:"Enter Message..."}),l.a.createElement("button",{onClick:function(t){e.props.handleSend(e.state.newMessage),e.setState({newMessage:""})}},"Send")))}}]),t}(u.Component);a.d(t,"default",function(){return R});var R=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={messages:[],userData:{},senderData:{},errorMessage:"",currentRoom:"Loading...",currentRoomID:""},a.handleSend=a.handleSend.bind(Object(i.a)(Object(i.a)(a))),a.socketReceiver=a.socketReceiver.bind(Object(i.a)(Object(i.a)(a))),a.handleChatroomChange=a.handleChatroomChange.bind(Object(i.a)(Object(i.a)(a))),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this;v(this.props.loginToken).then(function(a){var n=a.payload.data.payload;a.success||e.setState({errorMessage:"Error grabbing user data"}),C(n.chatroom).then(function(a){a.payload.data.success||e.setState({errorMessage:"Error grabbing messages",userData:n});var r,s=a.payload.data.payload;"undefined"!==typeof a.payload.data.roomDeleted&&a.payload.data.roomDeleted?E(s._id,n.email).then(function(a){a.data.success||e.setState({errorMessage:"Error grabbing messages",userData:n,currentRoomID:s._id,currentRoom:s.chatroomName}),t.handleChatroomChange(s._id,s.chatroomName)}):b(n.chatroom).then(function(t){t.success||e.setState({errorMessage:"Error grabbing messages",userData:n,currentRoomID:n.chatroom,currentRoom:s.chatroomName});var a=t.payload.data.payload.map(function(e){return{message:e.message,timestamp:e.timestamp,userInfo:e.userInfo}});e.setState({messages:a,errorMessage:"",userData:n,currentRoomID:n.chatroom,currentRoom:s.chatroomName})}),r=e.state.userData,N.emit("userConnected",r)})}),this.socketReceiver(),window.onfocus=function(){-1!==window.document.title.indexOf("New Message")&&(window.document.title="Lets Chat")}}},{key:"handleChatroomChange",value:function(e,t){var a=this;b(e).then(function(n){n.success||a.setState({errorMessage:"Error grabbing messages"});var r=n.payload.data.payload.map(function(e){return{message:e.message,timestamp:e.timestamp,userInfo:e.userInfo}});a.setState({messages:r,errorMessage:"",currentRoom:t,currentRoomID:e})})}},{key:"handleSend",value:function(e){if(e){var t={message:e,token:this.props.loginToken,chatRoomId:this.state.currentRoomID,senderInfo:this.state.userData};n=t,N.emit("sentMessage",n);var a=this.state.messages.concat({message:e,timestamp:(new Date).toString(),userInfo:this.state.userData});this.setState({messages:a})}var n}},{key:"socketReceiver",value:function(){var e=this,t=this;new Promise(function(e,t){N.on("newMessage",function(t){e({type:"newMessage",data:t})}),N.on("newConnection",function(t){e({type:"userConnected",user:t})}),N.on("userDisconnected",function(t){e({type:"userDisconnected",user:t})})}).then(function(a){switch(a.type){case"newMessage":var n=e.state.messages.concat({message:a.data.message,timestamp:(new Date).toString(),userInfo:a.data.senderInfo});e.setState({messages:n}),window.document.title="Lets Chat - New Message",t.socketReceiver();break;case"userConnected":case"userDisconnected":t.socketReceiver();break;default:window.document.title="Lets Chat"}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.userData,n=t.errorMessage,r=t.messages;return l.a.createElement("div",{className:"dashboard"},l.a.createElement("div",{className:"left-panel panel",onClick:function(){document.querySelector(".chatRoom .errorMsg").innerText="",document.querySelector("input.txtCreate").style.display="none"}},l.a.createElement("div",{className:"user-info"},l.a.createElement(j,{data:a}),l.a.createElement("h2",{className:"dashboard-error-message"},n)),l.a.createElement("div",{className:"chatRoom"},l.a.createElement(M,{data:a,chatroomChange:this.handleChatroomChange})),l.a.createElement("button",{className:"btn-logout",onClick:function(){var t;confirm("Are you sure you want to logout?")&&(e.props.removeToken(),t=e.state.userData,N.emit("userDisconnected",t),Object(m.b)(e.props.loginToken))}},"Logout")),l.a.createElement("div",{className:"right-panel panel"},l.a.createElement("div",{className:"panelHeader"}),l.a.createElement("div",{className:"messageBoard"},l.a.createElement(x,{messages:r,userData:a,handleSend:this.handleSend,currentRoom:this.state.currentRoom}))))}}]),t}(u.Component)}}]);
//# sourceMappingURL=4.a159ed76.chunk.js.map