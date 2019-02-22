(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){},221:function(e,t,a){e.exports=a(738)},46:function(e,t,a){},607:function(e,t,a){},608:function(e,t,a){},610:function(e,t,a){},735:function(e,t,a){},736:function(e,t,a){},738:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(91),o=a.n(r),i=(a(106),a(74)),c=a(14),s=a(15),u=a(17),d=a(16),m=a(19),p=a(18),h=a(745),g=a(744),y=a(60),f=a(127),E=a.n(f),v=a(92),b=a.n(v),D=a(55),S=a.n(D),C=a(53),O=a.n(C),k=a(21),T=a.n(k),A=a(30),N={LOCALE_DECIMAL_OPTIONS:{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2},DATE_FORMAT:"DD MMM YYYY",DATE_FORMAT_SHORT:"DD.MM.YYYY",DATE_FORMAT_INPUT:"YYYY-MM-DD",FIRST_DAY_WEEK:1,TIME_UNITS:["day","week","month","year"],CURRENCIES:[{name:"Euro",code:"EUR",symbol:"\u20ac"},{name:"US Dollar",code:"USD",symbol:"$"},{name:"British Pound",code:"GBP",symbol:"\xa3"}],LOCALES:["de-DE","en-US","en-UK"],DEFAULT_CURRENCY_OPTIONS:{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2},DEFAULT_LOCALE:"de-DE",DEFAULT_CURRENCY:"EUR",DEFAULT_CATEGORIES:[{label:"Food",value:"food",descr:"",color:"#7E6258"},{label:"Coffee Shops, Bars & Restaurants",value:"coffeeshop",descr:"",color:"#3EAC9A"},{label:"Household",value:"household",descr:"",color:"#AC633E"},{label:"Culture",value:"culture",descr:"",color:"#58747E"},{label:"Clothes",value:"clothes",descr:"",color:"#3EAC63"},{label:"Transport",value:"transport",descr:"",color:"#7E7558"},{label:"Gifts & Donations",value:"gifts",descr:"",color:"#AC9A3E"}]},j="spendings";function w(e,t,a,n){var l=T.a.get(j);return l?0===arguments.length?l:1===arguments.length?l.filter(function(t){return U.isSameDay(new Date(t.day),e)}):!0===t?l.filter(function(t){return Object(A.isSameWeek)(new Date(t.day),e,{weekStartsOn:N.FIRST_DAY_WEEK})}):!0===a?l.filter(function(t){return Object(A.isSameMonth)(new Date(t.day),e)}):!0===n?l.filter(function(t){return new Date(t.day).getFullYear()===e.getFullYear()}):l:[]}var F=function(e){var t=T.a.get(j);return t?t.slice(-e).reverse():[]},x=function(e){if(!e||0===e.length)return[];var t=T.a.get(j);return t?e.map(function(e){var a=t.filter(function(t){return t.cat===e.value}).map(function(e){return e.amount}).reduce(function(e,t){return e+t},0);return{cat:e.value,amount:Math.round(a)}}):[]},M=function(){return T.a.get("currency")},L=function(){return T.a.get("locale")},R=function(){return T.a.get("categories")},P=function(){if(!T.a.get("recurrentSpending"))return[]},I={food:{share:.25,items:[{comment:"Groceries",min:3,max:100},{comment:"Drinks",min:2,max:30},{comment:"D\xf6ner",min:2.5,max:5}]},coffeeshop:{share:.2,items:[{comment:"Coffee",min:1,max:2.5},{comment:"Coffee & cake",min:4,max:8},{comment:"Capuccino",min:2.5,max:3.5},{comment:"Drink at bar",min:3,max:10}]},household:{share:.2,items:[{comment:"Bicycle repair",min:50,max:100},{comment:"Vacuum cleaner bags",min:5,max:20},{comment:"Detergents",min:1,max:10},{comment:"Bed linen",min:10,max:50},{comment:"Cosmetics",min:.5,max:10},{comment:"Toothbrush",min:1,max:3},{comment:"Bank fees",min:1,max:5}]},culture:{share:.1,items:[{comment:"Book",min:2,max:25},{comment:"Cinema",min:5,max:9},{comment:"Theater",min:8,max:40},{comment:"Library membership",min:10,max:15}]},clothes:{share:.05,items:[{comment:"Present",min:5,max:50},{comment:"Donation",min:5,max:50}]},transport:{share:.15,items:[{comment:"Public transport ticket",min:1.3,max:5.4},{comment:"Train ticket",min:5,max:70},{comment:"Flight",min:30,max:100},{comment:"Petrol",min:10,max:50}]},gifts:{share:.05,items:[{comment:"Present",min:5,max:50},{comment:"Donation",min:5,max:50}]}},U={getNumDaysOfMonth:function(e){var t;switch(e.getMonth()){case 0:case 2:case 4:case 6:case 7:case 9:case 11:t=31;break;case 3:case 5:case 8:case 10:t=30;break;case 1:t=b()(e)?29:28;break;default:t=31}return t},filterSpendingsByCategory:function(e,t){return e&&0!==e.length?e.filter(function(e){return e.cat===t}):[]},calculateTotalAmountByCategory:function(e,t){return e&&0!==e.length?e.filter(function(e){return e.cat===t}).map(function(e){return e.amount}).reduce(function(e,t){return e+t},0):0},calculateSumOfSpendings:function(e){return e&&0!==e.length?e.map(function(e){return e.amount}).reduce(function(e,t){return e+t},0):0},isSameDay:function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()},dateInEachWeek:function(e,t){for(var a=[],n=Object(A.endOfWeek)(t);Object(A.isBefore)(e,n);)a.push(e),e=Object(A.addWeeks)(e,1);return a},dateInEachMonth:function(e,t){for(var a=[],n=Object(A.endOfMonth)(t);Object(A.isBefore)(e,n);)a.push(e),e=O()(e,1);return a},dateInEachYear:function(e,t){for(var a=[],n=Object(A.endOfYear)(t);Object(A.isBefore)(e,n);)a.push(e),e=Object(A.addYears)(e,1);return a},generateRandomData:function(e,t,a){for(var n=[],l=0;l<e;l++)for(var r=Math.random(),o=Object.keys(I),c=0,s=0;s<o.length;s++)if(r<(c+=I[o[s]].share)){n.push(this.createRandomSpending(o[s],t,a));break}!function(e){var t=T.a.get(j);t||(t=[]),T.a.set(j,[].concat(Object(i.a)(t),Object(i.a)(e)))}(n)},getRandomDate:function(e,t){return new Date(+e+Math.random()*(t-e))},getRandomIndex:function(e){return Math.floor(Math.random()*e)},getRandomAmount:function(e,t){return Math.random()*(t-e)+e},createRandomSpending:function(e,t,a){var n=this.getRandomIndex(I[e].items.length),l=I[e].items[n];return{id:S()(),day:this.getRandomDate(t,a),cat:e,amount:this.getRandomAmount(I[e].items[n].min,I[e].items[n].max),comment:l.comment,dateAdded:new Date}}};var W=function(){var e=new Date,t=E()(e,3);return l.a.createElement("header",null,l.a.createElement("div",{className:"wrapper-generate-btn"},l.a.createElement("button",{id:"generate-btn",onClick:function(){return U.generateRandomData(150,t,e)}},"Generate random data"),l.a.createElement("span",{className:"btn-sub-title"},"Requires page reload (TODO)")),l.a.createElement(y.Box,{className:"nav-icon nav-icon"}))},_=a(38),Y=a(42),B=a(202),V=a.n(B),H=(a(607),l.a.createContext({currency:N.DEFAULT_CURRENCY,locale:N.DEFAULT_LOCALE,categories:N.DEFAULT_CATEGORIES,updateCurrency:function(){},updateLocale:function(){},addCategory:function(){},removeCategory:function(){}}));var K=function(e){return l.a.createElement(H.Consumer,null,function(t){var a=t.currency,n=t.locale;return l.a.createElement("div",{className:"hover-total-amount-day",style:e.style},e.amount.toLocaleString(n,Object(Y.a)({},N.DEFAULT_CURRENCY_OPTIONS,{currency:a})))})},G=(a(608),a(609),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={daysWithSpendings:a.getDaysWithSpendings()},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"displayAmountSpent",value:function(e,t,a){e=e.getDate();var n=this.state.daysWithSpendings[e];n&&(n.style={top:a.pageY,left:a.pageX-50},this.setState({daysWithSpendings:Object(Y.a)({},this.state.daysWithSpendings,Object(_.a)({},e,n))}))}},{key:"hideAmountSpent",value:function(e){e=e.getDate();var t=this.state.daysWithSpendings[e];t&&(t.style={display:"none"},this.setState({daysWithSpendings:Object(Y.a)({},this.state.daysWithSpendings,Object(_.a)({},e,t))}))}},{key:"getDaysWithSpendings",value:function(e){var t=w(e=e||this.props.selectedDay,!1,!0,!0),a={};return t.forEach(function(e){var t=new Date(e.day).getDate();a[t]?a[t].amount+=e.amount:a[t]={date:new Date(e.day),amount:e.amount,style:{display:"none"}}}),a}},{key:"updateDaysWithSpendings",value:function(e){this.setState({daysWithSpendings:this.getDaysWithSpendings(e)})}},{key:"render",value:function(){var e=this,t={weekend:{daysOfWeek:[6,0]},today:new Date,selectedDay:this.props.selectedDay,dayWithSpending:Object.values(this.state.daysWithSpendings).map(function(e){return e.date})},a=Object.keys(this.state.daysWithSpendings).map(function(t){return l.a.createElement(K,{key:t,amount:e.state.daysWithSpendings[t].amount,style:e.state.daysWithSpendings[t].style})});return l.a.createElement("div",{id:"calender",className:"box"},l.a.createElement(V.a,{todayButton:"Today",firstDayOfWeek:N.FIRST_DAY_WEEK,modifiers:t,modifiersStyles:{today:{color:"#58747E"},weekend:{color:"#7E6258"},selectedDay:{color:"white",backgroundColor:"#7E6258"},dayWithSpending:{fontWeight:"bold"}},onDayClick:this.props.updateSelectedDay,onDayMouseEnter:function(t,a,n){return e.displayAmountSpent(t,a,n)},onDayMouseLeave:function(t,a,n){return e.hideAmountSpent(t,a,n)},onMonthChange:function(t){return e.updateDaysWithSpendings(t)}}),l.a.createElement("div",null,a),l.a.createElement("div",{className:"box add-actions"},l.a.createElement("span",{className:"add-action",onClick:this.props.openAddModal},l.a.createElement("button",{className:"add-pos-btn"},"+"),"Add spending"),l.a.createElement("span",{className:"add-action",onClick:this.props.openImportModal},l.a.createElement("button",{className:"add-pos-btn"},"+"),"Import from JSON")))}}]),t}(l.a.Component)),J=a(24),X=a.n(J),q=(a(610),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).nodeRef=l.a.createRef(),a.handleClickOutideForm=a.handleClickOutideForm.bind(Object(m.a)(a)),a.state={valDay:a.initDay(),valCategory:"food",valAmount:"",valComment:"",showParsingError:!1},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handleClickOutideForm)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.handleClickOutideForm)}},{key:"handleClickOutideForm",value:function(e){this.nodeRef.current.contains(e.target)||this.props.onClose()}},{key:"initDay",value:function(){return this.props.selectedDay?X()(this.props.selectedDay,N.DATE_FORMAT_INPUT):null}},{key:"handleDay",value:function(e){this.setState({valDay:e.target.value})}},{key:"handleCategory",value:function(e){this.setState({valCategory:e.target.value})}},{key:"handleAmount",value:function(e){this.setState({valAmount:e.target.value.replace(",",".")})}},{key:"handleComment",value:function(e){this.setState({valComment:e.target.value})}},{key:"handleFormInput",value:function(e){e.preventDefault();var t=parseFloat(this.state.valAmount);isNaN(t)?this.setState({showParsingError:!0}):(this.setState({showParsingError:!1}),this.props.addSpendingsPosition(this.state.valCategory,t,this.state.valComment,this.state.valDay)),this.setState({valComment:"",valAmount:""})}},{key:"handleFormInputAndClose",value:function(e){this.handleFormInput(e),this.props.onClose()}},{key:"render",value:function(){var e=this,t=this.props.categories.map(function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.label)}),a={display:this.state.showParsingError?"inline":"none"};return l.a.createElement("div",{id:"add-modal",ref:this.nodeRef},l.a.createElement("div",{id:"tooltip-error",style:a},"Please enter a correct value"),l.a.createElement("button",{className:"close-X",onClick:this.props.onClose},"x"),l.a.createElement("form",{id:"add-form"},l.a.createElement("table",null,l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"Date: "),l.a.createElement("td",null,l.a.createElement("input",{type:"date",value:this.state.valDay,onChange:function(t){return e.handleDay(t)}}))),l.a.createElement("tr",null,l.a.createElement("td",null,"Category: "),l.a.createElement("td",null,l.a.createElement("select",{value:this.valCategory,onChange:function(t){return e.handleCategory(t)}},t))),l.a.createElement("tr",null,l.a.createElement("td",null,"Amount spent: "),l.a.createElement("td",null,l.a.createElement("input",{type:"text",style:this.state.showParsingError?{border:"solid 1px red",backgroundColor:"#ffe6e6"}:{},value:this.state.valAmount.toLocaleString(this.props.locale,N.LOCALE_DECIMAL_OPTIONS),onChange:function(t){return e.handleAmount(t)}}))),l.a.createElement("tr",null,l.a.createElement("td",null,"Comment: "),l.a.createElement("td",null,l.a.createElement("input",{type:"text",maxLength:"150",value:this.state.valComment,onChange:function(t){return e.handleComment(t)}}))),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null,l.a.createElement("input",{type:"submit",onClick:function(t){return e.handleFormInput(t)},value:"Submit + Add next"}),l.a.createElement("input",{type:"submit",onClick:function(t){return e.handleFormInputAndClose(t)},value:"Submit + Close"})))))))}}]),t}(l.a.Component)),$=(a(46),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={catExpandedView:a.initStateObject()},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"initStateObject",value:function(){var e={};return this.props.categories.forEach(function(t){e[t.value]=!0}),e}},{key:"toggleDisplayAllPositionsForCat",value:function(e){var t=this.state.catExpandedView;t[e]=!this.state.catExpandedView[e],this.setState({catExpandedView:t})}},{key:"renderTableBody",value:function(e){var t=this;return this.props.categories.map(function(a){var n=U.calculateTotalAmountByCategory(e,a.value),r=n>0?t.state.catExpandedView[a.value]?"arrow-up":"arrow-down":"";return l.a.createElement("tbody",{key:a.value},l.a.createElement("tr",null,l.a.createElement("td",null,a.label),l.a.createElement("td",{className:"cell-amount"},n.toLocaleString(t.props.locale,t.props.currencyOptions)),l.a.createElement("td",{className:"arrow"},l.a.createElement("span",{className:r,onClick:function(){return t.toggleDisplayAllPositionsForCat(a.value)}}))),t.renderSpendingsPositons(e,a.value))})}},{key:"renderSpendingsPositons",value:function(e,t){var a=this,n=U.filterSpendingsByCategory(e,t),r=this.state.catExpandedView[t]?"":"none";if(n)return n.map(function(e,n){return l.a.createElement("tr",{key:t+n,style:{display:r},className:"font-small-colored"},l.a.createElement("td",null,e.comment),l.a.createElement("td",{className:"cell-amount"},e.amount.toLocaleString(a.props.locale,a.props.currencyOptions)))})}},{key:"render",value:function(){var e=this,t=w(new Date),a=U.calculateSumOfSpendings(t);return l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.props.toggleDisplay("spendingsToday")}},"x"),l.a.createElement("h4",null,"Today's Spendings"),l.a.createElement("table",{className:"table-spendings"},this.renderTableBody(t),l.a.createElement("tfoot",null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Total")),l.a.createElement("td",{className:"cell-amount"},l.a.createElement("b",null,a.toLocaleString(this.props.locale,this.props.currencyOptions)))))))}}]),t}(l.a.Component)),z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={catExpandedView:a.initStateObject()},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.spendingsForDay!==this.props.spendingsForDay&&this.setState({catExpandedView:this.initStateObject()})}},{key:"initStateObject",value:function(){var e={};return this.props.categories.forEach(function(t){e[t.value]=!1}),e}},{key:"calculateTotalAmountPerCategory",value:function(e){return this.props.spendingsForDay&&this.props.spendingsForDay.length>0?this.props.spendingsForDay.filter(function(t){return t.cat===e}).map(function(e){return e.amount}).reduce(function(e,t){return e+t},0):0}},{key:"getSpendingsPositionByCat",value:function(e){if(this.props.spendingsForDay&&this.props.spendingsForDay.length>0)return this.props.spendingsForDay.filter(function(t){return t.cat===e})}},{key:"toggleDisplayAllPositionsForCat",value:function(e){var t=this.state.catExpandedView;t[e]=!this.state.catExpandedView[e],this.setState({catExpandedView:t})}},{key:"renderTableBody",value:function(){var e=this;return this.props.categories.map(function(t){var a=e.calculateTotalAmountPerCategory(t.value),n=a>0?e.state.catExpandedView[t.value]?"arrow-up":"arrow-down":"";return l.a.createElement("tbody",{key:t.value},l.a.createElement("tr",null,l.a.createElement("td",null,t.label),l.a.createElement("td",{className:"cell-amount"},a.toLocaleString(e.props.locale,e.props.currencyOptions)),l.a.createElement("td",{className:"arrow"},l.a.createElement("span",{className:n,onClick:function(){return e.toggleDisplayAllPositionsForCat(t.value)}}))),e.renderSpendingsPositons(t.value))})}},{key:"renderSpendingsPositons",value:function(e){var t=this,a=this.getSpendingsPositionByCat(e),n=this.state.catExpandedView[e]?"":"none";if(a)return a.map(function(a,r){return l.a.createElement("tr",{key:e+r,style:{display:n},className:"font-small-colored"},l.a.createElement("td",null,a.comment),l.a.createElement("td",{className:"cell-amount"},a.amount.toLocaleString(t.props.locale,t.props.currencyOptions)))})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.props.toggleDisplay("spendingsSingleDay")}},"x"),l.a.createElement("h4",null,"Spendings on ",X()(this.props.selectedDay,N.DATE_FORMAT)),l.a.createElement("table",{className:"table-spendings"},this.renderTableBody(),l.a.createElement("tfoot",null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Total")),l.a.createElement("td",{className:"cell-amount"},l.a.createElement("b",null,this.props.totalAmountDay.toLocaleString(this.props.locale,this.props.currencyOptions)))))))}}]),t}(l.a.Component);var Q=function(e){return l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.toggleDisplay("totalSpendings")}},"x"),l.a.createElement("h4",null,"Total Spendings"),l.a.createElement("table",{className:"table-spendings"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"Today:"),l.a.createElement("td",{className:"cell-amount"},e.totalAmountToday.toLocaleString(e.locale,e.currencyOptions))),l.a.createElement("tr",null,l.a.createElement("td",null,"This week:"),l.a.createElement("td",{className:"cell-amount"},e.totalAmountWeek.toLocaleString(e.locale,e.currencyOptions))),l.a.createElement("tr",null,l.a.createElement("td",null,"This month:"),l.a.createElement("td",{className:"cell-amount"},e.totalAmountMonth.toLocaleString(e.locale,e.currencyOptions))),l.a.createElement("tr",null,l.a.createElement("td",null,"This year:"),l.a.createElement("td",{className:"cell-amount"},e.totalAmountYear.toLocaleString(e.locale,e.currencyOptions))))))},Z=a(742),ee=a(212),te=a(101),ae=a(75);var ne=function(e){var t,a=x(e.categories),n=[];return a&&0!==a.length?t=e.categories.map(function(e,t){return n.push(e.color),{name:e.label.length<=20?e.label:e.label.substring(0,18)+"...",value:a[t].amount}}):(n.push("#f1f4f4"),t=[{name:"No data available",value:1}]),l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.toggleDisplay("catPieChart")}},"x"),l.a.createElement("h4",null,"Spendings on Categories"),l.a.createElement("div",{id:"piechart"},l.a.createElement(Z.a,{width:400,height:150},l.a.createElement(ee.a,{cx:100,cy:70,isAnimationActive:!0,data:t,outerRadius:65,fill:"#58747E",labelLine:!1,label:!1,dataKey:"value",nameKey:"name"},t.map(function(e,t){return l.a.createElement(te.a,{fill:n[t],key:t})})),l.a.createElement(ae.a,{layout:"vertical",align:"right",verticalAlign:"top",width:190,iconType:"square",iconSize:12}))))};var le=function(e){var t=e.recentSpendings.map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",{className:"align-left"},X()(t.day,N.DATE_FORMAT_SHORT)),l.a.createElement("td",null,t.comment.length<28?t.comment:t.comment.substring(0,25)+"..."),l.a.createElement("td",{className:"font-small-colored align-right"},t.amount.toLocaleString(e.locale,e.currencyOptions)))});return l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.toggleDisplay("recentHistory")}},"x"),l.a.createElement("h4",null,"Recently Added Spendings"),l.a.createElement("table",{className:"table-spendings-history"},l.a.createElement("tbody",null,t)))};var re=function(e){var t=P().map(function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",{className:"align-left"},X()(t.startDate,N.DATE_FORMAT_SHORT)),l.a.createElement("td",null,t.interval),l.a.createElement("td",null,t.comment.length<28?t.comment:t.comment.substring(0,25)+"..."),l.a.createElement("td",{className:"font-small-colored align-right"},t.amount.toLocaleString(e.locale,e.currencyOptions)))}),a=t.length>0?l.a.createElement("tr",null,l.a.createElement("td",null," Since "),l.a.createElement("td",null," Interval "),l.a.createElement("td",null," Description "),l.a.createElement("td",null," Amount ")):l.a.createElement("tr",null,l.a.createElement("td",null,"No recurrent spendings found"));return l.a.createElement("div",{className:"tile"},l.a.createElement("button",{className:"close-tile",title:"Close",onClick:function(){return e.toggleDisplay("recurrentSpendings")}},"x"),l.a.createElement("h4",null,"Recurrent Spendings"),l.a.createElement("table",{className:"table-spendings-history"},l.a.createElement("thead",null,a),l.a.createElement("tbody",null,t)))},oe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).toggleDisplay=a.toggleDisplay.bind(Object(m.a)(a)),a.state={display:{catPieChart:!0,spendingsSingleDay:!0,totalSpendings:!0,recentHistory:!0,spendingsToday:!0,recurrentSpendings:!0}},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"toggleDisplay",value:function(e){this.setState({display:Object(Y.a)({},this.state.display,Object(_.a)({},e,!this.state.display[e]))})}},{key:"render",value:function(){var e=this;return l.a.createElement(H.Consumer,null,function(t){var a=t.currency,n=t.locale,r=t.categories,o=Object(Y.a)({},N.DEFAULT_CURRENCY_OPTIONS,{currency:a});return l.a.createElement("div",{id:"tiles",className:"box"},e.state.display.catPieChart&&l.a.createElement(ne,{toggleDisplay:e.toggleDisplay,categories:r}),e.state.display.spendingsToday&&l.a.createElement($,{toggleDisplay:e.toggleDisplay,locale:n,currencyOptions:o,categories:r}),e.state.display.totalSpendings&&l.a.createElement(Q,{toggleDisplay:e.toggleDisplay,totalAmountToday:e.props.totalAmountToday,totalAmountWeek:e.props.totalAmountWeek,totalAmountMonth:e.props.totalAmountMonth,totalAmountYear:e.props.totalAmountYear,locale:n,currencyOptions:o}),e.state.display.recentHistory&&l.a.createElement(le,{toggleDisplay:e.toggleDisplay,recentSpendings:e.props.recentSpendings,locale:n,currencyOptions:o}),e.state.display.spendingsSingleDay&&l.a.createElement(z,{toggleDisplay:e.toggleDisplay,totalAmountDay:e.props.totalAmountDay,spendingsForDay:e.props.spendingsForDay,selectedDay:e.props.selectedDay,locale:n,currencyOptions:o,categories:r}),e.state.display.recurrentSpendings&&l.a.createElement(re,{toggleDisplay:e.toggleDisplay,locale:n,currencyOptions:o}))})}}]),t}(l.a.Component),ie=(a(735),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).updateSelectedDay=a.updateSelectedDay.bind(Object(m.a)(a)),a.addSpendingsPosition=a.addSpendingsPosition.bind(Object(m.a)(a)),a.handleFileUpload=a.handleFileUpload.bind(Object(m.a)(a)),a.onClose=a.onClose.bind(Object(m.a)(a)),a.openAddModal=a.openAddModal.bind(Object(m.a)(a)),a.openImportModal=a.openImportModal.bind(Object(m.a)(a)),a.state={selectedDay:new Date,recentSpendings:[],addFormIsVisible:!1},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fileSelector=this.initFileSelector(),this.setState({recentSpendings:F(15)})}},{key:"initFileSelector",value:function(){var e=document.createElement("input");return e.setAttribute("type","file"),e.setAttribute("multiple",!0),e.onchange=this.handleFileUpload,e}},{key:"updateSelectedDay",value:function(e){this.setState({selectedDay:e})}},{key:"addSpendingsPosition",value:function(e,t,a,n){var l=n?new Date(n):this.state.selectedDay,r={id:S()(),day:l,cat:e,amount:t,comment:a};this.setState({recentSpendings:[r].concat(this.state.recentSpendings)}),function(e){var t=T.a.get(j);t||(t=[]),t.push({id:e.id?e.id:S()(),day:e.day,cat:e.cat,amount:e.amount,comment:e.comment,dateAdded:e.dateAdded?e.dateAdded:new Date}),T.a.set(j,t)}(r)}},{key:"getTotalAmountDay",value:function(e){var t=w(e||this.state.selectedDay);return U.calculateSumOfSpendings(t)}},{key:"getTotalAmountWeek",value:function(e){var t=w(e||this.state.selectedDay,!0);return U.calculateSumOfSpendings(t)}},{key:"getTotalAmountMonth",value:function(e){var t=w(e||this.state.selectedDay,!1,!0);return U.calculateSumOfSpendings(t)}},{key:"getTotalAmountYear",value:function(e){var t=w(e||this.state.selectedDay,!1,!1,!0);return U.calculateSumOfSpendings(t)}},{key:"getSpendingsForSelectedDay",value:function(){return w(this.state.selectedDay)}},{key:"calculateTotalAmoutsPerDay",value:function(e){var t=new Array(U.getNumDaysOfMonth(this.state.selectedDay)).fill(0);return this.state.spendingPositions.filter(function(t){return t.day.getMonth()===e}).forEach(function(e){t[e.day.getDate()-1]+=e.amount}),t}},{key:"openAddModal",value:function(){this.setState({addFormIsVisible:!0})}},{key:"openImportModal",value:function(e){e.preventDefault(),this.fileSelector.click()}},{key:"handleFileUpload",value:function(e){var t=this;e.preventDefault();var a=e.target.files;if(a)for(var n=0;n<a.length;n++)"application/json"===a[n].type?function(){var e=new FileReader;e.onload=function(){var a=JSON.parse(e.result);a&&a.data&&a.data.forEach(function(e){t.addSpendingsPosition(e.cat,e.amount,e.comment,new Date(e.day))})},e.onerror=function(e){console.log("error while reading file: "+e)},e.readAsText(a[n])}():console.log("Error: File is not a JSON document...");else console.log("No files to upload found")}},{key:"onClose",value:function(){this.setState({addFormIsVisible:!1})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"dashboard",className:"box"},l.a.createElement(oe,{totalAmountToday:this.getTotalAmountDay(new Date),totalAmountDay:this.getTotalAmountDay(),totalAmountWeek:this.getTotalAmountWeek(new Date),totalAmountMonth:this.getTotalAmountMonth(new Date),totalAmountYear:this.getTotalAmountYear(new Date),selectedDay:this.state.selectedDay,spendingsForDay:this.getSpendingsForSelectedDay(),recentSpendings:this.state.recentSpendings}),l.a.createElement(G,{selectedDay:this.state.selectedDay,updateSelectedDay:this.updateSelectedDay,openAddModal:this.openAddModal,openImportModal:this.openImportModal}),this.state.addFormIsVisible&&l.a.createElement(H.Consumer,null,function(t){var a=t.locale,n=t.categories;return l.a.createElement(q,{selectedDay:e.state.selectedDay,addSpendingsPosition:e.addSpendingsPosition,onClose:e.onClose,locale:a,categories:n})}))}}]),t}(l.a.Component));ie.contextType=H;var ce=ie,se=a(739),ue=a(740),de=a(217),me=a(218),pe=a(216),he=a(131),ge=a.n(he),ye=a(37),fe=a.n(ye),Ee=a(54),ve=a.n(Ee),be=a(130),De=a.n(be),Se=a(95),Ce=a.n(Se),Oe=a(68),ke=a.n(Oe),Te=a(93),Ae=a.n(Te),Ne=a(94),je=a.n(Ne),we=a(129),Fe=a.n(we),xe=a(128),Me=a.n(xe),Le=function(e){function t(e){var a;Object(c.a)(this,t),a=Object(u.a)(this,Object(d.a)(t).call(this,e));var n=new Date;return a.state={unit:"month",category:"all",dateFrom:X()(ge()(n,1),N.DATE_FORMAT_INPUT),dateTo:X()(n,N.DATE_FORMAT_INPUT),dataTotals:[]},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleUnit",value:function(e){this.setState({unit:e.target.value})}},{key:"handleCategory",value:function(e){this.setState({category:e.target.value})}},{key:"handleDate1",value:function(e){this.setState({dateFrom:e.target.value})}},{key:"handleDate2",value:function(e){this.setState({dateTo:e.target.value})}},{key:"updateChart",value:function(){var e,t,a,n=this,l=[];"day"===this.state.unit?(l=Me()(this.state.dateFrom,this.state.dateTo),e=fe.a,t=ke.a,a="DD.MM."):"week"===this.state.unit?(l=U.dateInEachWeek(this.state.dateFrom,this.state.dateTo),e=ve.a,t=Ae.a,a="W"):"month"===this.state.unit?(l=U.dateInEachMonth(this.state.dateFrom,this.state.dateTo),e=De.a,t=je.a,a="MMM"):"year"===this.state.unit&&(l=U.dateInEachYear(this.state.dateFrom,this.state.dateTo),e=Ce.a,t=Fe.a,a="YYYY");var r=l.map(function(l){var r="all"===n.state.category?void 0:n.state.category,o=function(e,t,a,n){if(!e&&!t)return[];var l=T.a.get(j);return l?(e&&(l=l.filter(function(t){return new Date(t.day)>=e})),t&&(l=l.filter(function(e){return new Date(e.day)<=t})),a&&(l=l.filter(function(e){return e.cat===a})),n?l.slice(0,n):l):[]}(e(l),t(l),r),i=U.calculateSumOfSpendings(o);return{name:X()(l,a),value:i}});this.setState({dataTotals:r})}},{key:"render",value:function(){var e=this,t=N.TIME_UNITS.map(function(e){return l.a.createElement("option",{key:e,value:e},e)});return l.a.createElement("div",{id:"analytics",className:"box"},l.a.createElement("h1",{className:"menu-item-headline"},"Analytics"),l.a.createElement("div",{className:"border-dashed scroll-x-axis"},l.a.createElement("h4",null,"Totals"),l.a.createElement("div",{className:"setup"},l.a.createElement("div",null,"Unit:\xa0",l.a.createElement("select",{value:this.state.unit,onChange:function(t){return e.handleUnit(t)}},t)),l.a.createElement("div",null,"Time span:\xa0",l.a.createElement("input",{type:"date",value:this.state.dateFrom,onChange:function(t){return e.handleDate1(t)}}),"\xa0",l.a.createElement("input",{type:"date",value:this.state.dateTo,onChange:function(t){return e.handleDate2(t)}})),l.a.createElement("div",null,"Categories:\xa0",l.a.createElement("select",{value:this.state.category,onChange:function(t){return e.handleCategory(t)}},l.a.createElement("option",{value:"all"},"All"),l.a.createElement(H.Consumer,null,function(e){return e.categories.map(function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.label)})}))),l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){return e.updateChart()}},"Update chart"))),l.a.createElement("div",{className:"chart"},l.a.createElement(se.a,{width:1e3,height:300,data:this.state.dataTotals,margin:{top:30,right:30,left:20,bottom:5}},l.a.createElement(ue.a,{strokeDasharray:"3 3"}),l.a.createElement(de.a,{dataKey:"name"}),l.a.createElement(me.a,null),l.a.createElement(pe.a,{dataKey:"value",fill:"#7E6258"})))),l.a.createElement("div",{className:"border-dashed"},l.a.createElement("h4",null,"Averages"),"TODO"),l.a.createElement("div",{className:"border-dashed"},l.a.createElement("h4",null,"Comparisons"),"TODO"))}}]),t}(n.Component),Re=(a(736),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=N.CURRENCIES.map(function(e){return l.a.createElement("option",{key:e.code,value:e.code},e.name," (",e.symbol,")")}),t=N.LOCALES.map(function(e){return l.a.createElement("option",{key:e,value:e},e)});return l.a.createElement("div",{id:"settings",className:"box"},l.a.createElement("h1",{className:"menu-item-headline"},"Settings"),l.a.createElement("div",{className:"border-dashed"},l.a.createElement("h4",null,"Preferences"),l.a.createElement("table",null,l.a.createElement(H.Consumer,null,function(a){var n=a.currency,r=a.locale,o=a.categories,i=a.updateCurrency,c=a.updateLocale,s=(a.addCategory,a.removeCategory),u=o.map(function(e){return l.a.createElement("tr",{className:"reducedPadding",key:e.value},l.a.createElement("td",null,l.a.createElement("span",{className:"font-small-colored"},e.label)),l.a.createElement("td",null,l.a.createElement("button",{className:"btnDelete",title:"Delete",onClick:function(){return s(e.value)}},"X")))});return l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"prefTitle"},"Currency"),l.a.createElement("td",null,l.a.createElement("span",{className:"font-small-colored"},n)),l.a.createElement("td",null,"Update: ",l.a.createElement("select",{value:n,onChange:function(e){return i(e)}},e))),l.a.createElement("tr",null,l.a.createElement("td",{className:"prefTitle"},"Locale"),l.a.createElement("td",null,l.a.createElement("span",{className:"font-small-colored"},r)),l.a.createElement("td",null,"Update: ",l.a.createElement("select",{value:r,onChange:function(e){return c(e)}},t))),l.a.createElement("tr",null,l.a.createElement("td",{className:"prefTitle",rowSpan:u.length+1},"Categories")),u)}))),l.a.createElement("div",{className:"border-dashed"},l.a.createElement("h4",null,"Recurrent Spendings")))}}]),t}(l.a.Component)),Pe=a(741),Ie=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={displayTitleDashboard:!1,displayTitleAnalytics:!1,displayTitleSettings:!1,distanceTop:55},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleSidebarPosition.bind(this))}},{key:"handleSidebarPosition",value:function(){var e=document.documentElement.scrollTop||document.body.scrollTop;this.setState({distanceTop:Math.max(55-e,0)})}},{key:"toggleNavTitle",value:function(e){this.setState(Object(_.a)({},e,!this.state[e]))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"sidebar",style:{top:this.state.distanceTop}},l.a.createElement("ul",null,l.a.createElement("li",{onMouseEnter:function(){return e.toggleNavTitle("displayTitleDashboard")},onMouseLeave:function(){return e.toggleNavTitle("displayTitleDashboard")}},l.a.createElement(Pe.a,{to:"/dashboard"},l.a.createElement(y.Home,{width:"27",height:"27",className:"nav-icon"}),l.a.createElement("span",{className:this.state.displayTitleDashboard?"":"hidden"},"Dashboard"))),l.a.createElement("li",{onMouseEnter:function(){return e.toggleNavTitle("displayTitleAnalytics")},onMouseLeave:function(){return e.toggleNavTitle("displayTitleAnalytics")}},l.a.createElement(Pe.a,{to:"/analytics"},l.a.createElement(y.BarChart2,{width:"27",height:"27",className:"nav-icon"}),l.a.createElement("span",{className:this.state.displayTitleAnalytics?"":"hidden"},"Analytics"))),l.a.createElement("li",{onMouseEnter:function(){return e.toggleNavTitle("displayTitleSettings")},onMouseLeave:function(){return e.toggleNavTitle("displayTitleSettings")}},l.a.createElement(Pe.a,{to:"/settings"},l.a.createElement(y.Settings,{width:"27",height:"27",className:"nav-icon"}),l.a.createElement("span",{className:this.state.displayTitleSettings?"":"hidden"},"Settings")))))}}]),t}(l.a.Component),Ue=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).updateCurrency=a.updateCurrency.bind(Object(m.a)(a)),a.updateLocale=a.updateLocale.bind(Object(m.a)(a)),a.addCategory=a.addCategory.bind(Object(m.a)(a)),a.removeCategory=a.removeCategory.bind(Object(m.a)(a)),a.state={currency:M()||N.DEFAULT_CURRENCY,locale:L()||N.DEFAULT_LOCALE,categories:R()||N.DEFAULT_CATEGORIES},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillUnmount",value:function(){var e,t,a;e=this.state.currency,T.a.set("currency",e),t=this.state.locale,T.a.set("locale",t),a=this.state.categories,T.a.set("categories",a)}},{key:"updateCurrency",value:function(e){this.setState({currency:e.target.value})}},{key:"updateLocale",value:function(e){this.setState({locale:e.target.value})}},{key:"addCategory",value:function(e){this.setState({categories:[].concat(Object(i.a)(this.state.categories),[e])})}},{key:"removeCategory",value:function(e){var t=this.state.categories.findIndex(function(t){return t.value===e}),a=this.state.categories.slice();a.splice(t,1),this.setState({categories:a})}},{key:"render",value:function(){return l.a.createElement("div",{id:"main-container"},l.a.createElement(W,null),l.a.createElement("nav",{className:"box"},l.a.createElement(Ie,null)),l.a.createElement(H.Provider,{value:{currency:this.state.currency,locale:this.state.locale,categories:this.state.categories,updateCurrency:this.updateCurrency,updateLocale:this.updateLocale,addCategory:this.addCategory,removeCategory:this.removeCategory}},l.a.createElement(h.a,null,l.a.createElement(g.a,{exact:!0,path:"/",component:ce}),l.a.createElement(g.a,{path:"/dashboard",component:ce}),l.a.createElement(g.a,{path:"/analytics",component:Le}),l.a.createElement(g.a,{path:"/settings",component:Re}))))}}]),t}(n.Component),We=a(743),_e=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ye(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(l.a.createElement(We.a,null,l.a.createElement(Ue,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/spendings-tracker",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/spendings-tracker","/service-worker.js");_e?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Ye(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):Ye(e)})}}()}},[[221,1,2]]]);
//# sourceMappingURL=main.f7210622.chunk.js.map