import './polyfills.server.mjs';
import{P as Oe,R as Se,S as J,V as Ie,b as y,c as D,e as le,f as de,g as C,h as pe,i as ue,k as fe,m as ge,n as _e,o as ve,p as he,q as Ce,s as be,t as we,u as xe,v as ye,w as Me,x as Pe}from"./chunk-I3D265TC.mjs";import{a as S,b as I}from"./chunk-7QWHGEEN.mjs";import{$a as Y,Aa as X,Ca as u,Da as A,Ea as l,Fc as se,Hc as N,Ic as me,J as Q,Jc as ce,K as V,Kc as j,M as K,N as q,Na as r,Oa as n,Pa as v,Qa as z,R as _,Ra as k,S as R,Ta as x,Ub as ne,V as b,Vb as ie,W as w,Wa as f,Wb as O,Ya as g,Yb as re,_b as oe,ca as T,d as H,eb as E,ec as ae,fb as a,gb as h,hb as F,ib as ee,l as W,pa as m,qa as d,qb as te,rb as L,sb as $,vb as U}from"./chunk-LXPPITVW.mjs";import{a as Z}from"./chunk-VVCT4QZE.mjs";var ze=(()=>{let e=class e{constructor(i){this.authService=i,this.username=""}ngOnInit(){this.authService.getUser().subscribe(i=>{i&&(this.username=`${i.firstname} ${i.lastname}`)})}logout(){this.authService.logout().subscribe()}};e.\u0275fac=function(o){return new(o||e)(d(S))},e.\u0275cmp=_({type:e,selectors:[["app-user-dashboard"]],decls:30,vars:1,consts:[[1,"user-dashboard"],[1,"wrapper"],[1,"user-dashboard__title-box"],[1,"user-dashboard__title"],[1,"user-dashboard__subTitle"],[1,"main-content"],[1,"user-sidebar"],[1,"user-info"],[1,"user-avatar"],["color","primary",1,""],[1,"user-name"],["routerLink","visits","routerLinkActive","active"],["routerLink","settings","routerLinkActive","active"],["routerLink","terms-and-conditions","routerLinkActive","active"],[1,"nav__btn",3,"click"],[1,"user-content"]],template:function(o,s){o&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),a(4,"PROFIL"),n(),r(5,"h3",4),a(6,"Tw\xF3j profil"),n()(),r(7,"main",5)(8,"nav",6)(9,"div",7)(10,"div",8)(11,"mat-icon",9),a(12,"person"),n()(),r(13,"span",10),a(14),n()(),r(15,"ul")(16,"li")(17,"a",11),a(18,"Wizyty"),n()(),r(19,"li")(20,"a",12),a(21,"Ustawienia konta"),n()(),r(22,"li")(23,"a",13),a(24,"Regulamin"),n()(),r(25,"li")(26,"button",14),f("click",function(){return s.logout()}),a(27,"Wyloguj si\u0119"),n()()()(),r(28,"div",15),v(29,"router-outlet"),n()()()()),o&2&&(m(14),h(s.username))},dependencies:[se,me,ce,y],styles:[".user-dashboard[_ngcontent-%COMP%]{padding:20px}.user-dashboard[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]{max-width:1600px;margin:0 auto}.user-dashboard__title-box[_ngcontent-%COMP%]{margin:40px 0;border-bottom:2px solid #b7a379}.user-dashboard__title[_ngcontent-%COMP%]{margin-bottom:.75rem;font-size:1.8rem;font-family:Jost,sans-serif;color:#b7a379;font-weight:700}.user-dashboard__subTitle[_ngcontent-%COMP%]{margin-bottom:2rem;font-size:2.2rem;font-weight:700;font-family:Jost,sans-serif}.user-dashboard[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%]{display:flex;flex-direction:column}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]{padding:20px 0}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;gap:10px;align-items:center;margin-bottom:20px}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#b7a37933;width:42px;min-width:42px;height:42px;border-radius:60%}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]{font-size:1.8rem;color:#333}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:5px}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{text-decoration:none;color:#333;font-weight:700;display:block;padding:10px 10px 10px 20px;border-left:4px solid transparent;border-radius:4px;transition:background-color .3s,border-color .3s}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background-color:#f0e6d2;color:#b7a379;font-weight:700;border-left:4px solid #b7a379}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;background-color:transparent;width:100%;text-align:left;cursor:pointer}@media (min-width: 992px){.user-dashboard__title[_ngcontent-%COMP%]{font-size:1.8rem}.user-dashboard__subTitle[_ngcontent-%COMP%]{font-size:2.8rem}.user-dashboard[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:stretch}.user-dashboard[_ngcontent-%COMP%]   .user-sidebar[_ngcontent-%COMP%]{width:250px;min-height:50vh}.user-dashboard[_ngcontent-%COMP%]   .user-content[_ngcontent-%COMP%]{width:100%;padding:20px 0;margin-left:60px}}"]});let t=e;return t})();var P=(()=>{let e=class e{constructor(i){this.http=i,this.baseUrl="/api/"}getUpcomingReservations(){return this.http.get(`${this.baseUrl}reservations/user-upcoming-reservations`)}getPastReservations(){return this.http.get(`${this.baseUrl}reservations/user-past-reservations`)}cancelReservation(i){return this.http.put(`${this.baseUrl}reservations/cancel/${i}`,{})}getUserInfo(){return this.http.get(`${this.baseUrl}user/me`)}changePassword(i,o){return this.http.put(`${this.baseUrl}user/change-password`,{oldPassword:i,newPassword:o})}updateUserInfo(i){return this.http.put(`${this.baseUrl}user/update-info`,i)}};e.\u0275fac=function(o){return new(o||e)(K(ae))},e.\u0275prov=Q({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var Ee=(()=>{let e=class e extends Se{constructor(i,o){super(),this.modalService=i,this.userService=o,this.reservationCancelled=new T,this.title="Potwierd\u017A",this.subject=new H,this.subject$=this.subject.asObservable(),this.subject$.subscribe({next:s=>{this.reservation=s}})}ngOnInit(){}closeModal(){this.modalService.close()}nextConfirm(){this.reservation.id&&this.userService.cancelReservation(this.reservation.id).subscribe({next:()=>{this.reservationCancelled.emit(),this.modalService.close()},error:i=>{console.error("B\u0142\u0105d podczas anulowania rezerwacji:",i),this.modalService.close()}})}nextReject(){this.modalService.close()}};e.\u0275fac=function(o){return new(o||e)(d(I),d(P))},e.\u0275cmp=_({type:e,selectors:[["app-confirm-delete-visit-modal"]],outputs:{reservationCancelled:"reservationCancelled"},features:[X],decls:4,vars:2,consts:[["size","sm",3,"title","showButtons"],[1,"info-modal-content"]],template:function(o,s){o&1&&(r(0,"app-base-modal",0)(1,"div",1)(2,"p"),a(3,"Czy aby na pewno chcesz usun\u0105c dan\u0105 rezewacj\u0119?"),n()()()),o&2&&(Y("title",s.title),l("showButtons",!0))},dependencies:[Oe]});let t=e;return t})();var Le=(t,e,c)=>({"reservation-card__status--completed":t,"reservation-card__status--cancelled":e,"reservation-card__status--upcoming":c});function $e(t,e){if(t&1){let c=x();z(0),r(1,"button",15),f("click",function(){b(c);let o=g();return w(o.cancelReservation())}),a(2," Anuluj rezerwacj\u0119 "),n(),k()}}function Je(t,e){if(t&1){let c=x();r(0,"button",16),f("click",function(){b(c);let o=g();return w(o.rescheduleReservation())}),a(1," Um\xF3w ponownie "),n()}}var je=(()=>{let e=class e{constructor(i,o,s){this.userService=i,this.router=o,this.modalService=s,this.reservationCancelled=new T}cancelReservation(){let i=Z({},this.reservation),o=this.modalService.openModal(Ee);o.subject.next(i),o.componentRef.instance.reservationCancelled.subscribe(()=>{this.reservationCancelled.emit()})}rescheduleReservation(){this.router.navigate(["/services"])}};e.\u0275fac=function(o){return new(o||e)(d(P),d(N),d(I))},e.\u0275cmp=_({type:e,selectors:[["app-reservation-item"]],inputs:{reservation:"reservation"},outputs:{reservationCancelled:"reservationCancelled"},decls:27,vars:21,consts:[["rescheduleTemplate",""],[1,"reservation-card"],[1,"reservation-card__content"],[1,"reservation-card__status",3,"ngClass"],[1,"reservation-card__service-name"],[1,"reservation-card__price"],[1,"reservation-card__employee-info"],[1,"reservation-card__employee-icon"],[1,"reservation-card__employee-name"],[4,"ngIf","ngIfElse"],[1,"reservation-card__details"],[1,"reservation-card__date"],[1,"reservation-card__date-day-name"],[1,"reservation-card__date-day"],[1,"reservation-card__date-time"],["mat-raised-button","","color","warn",1,"reservation-card__btn","reservation-card__btn--cancel",3,"click"],["mat-raised-button","","color","primary",1,"reservation-card__btn","reservation-card__btn--reschedule",3,"click"]],template:function(o,s){if(o&1&&(r(0,"div",1)(1,"div",2)(2,"span",3),a(3),n(),r(4,"h3",4),a(5),n(),r(6,"p",5),a(7),n(),r(8,"div",6)(9,"span",7)(10,"mat-icon"),a(11,"person"),n()(),r(12,"span",8),a(13),n()(),u(14,$e,3,0,"ng-container",9)(15,Je,2,0,"ng-template",null,0,U),n(),r(17,"div",10)(18,"div",11)(19,"span",12),a(20),L(21,"date"),n(),r(22,"span",13),a(23),L(24,"date"),n(),r(25,"span",14),a(26),n()()()()),o&2){let p=E(16);m(2),l("ngClass",te(17,Le,s.reservation.status==="zako\u0144czona",s.reservation.status==="anulowana",s.reservation.status==="oczekujaca")),m(),F(" ",s.reservation.status," "),m(2),h(s.reservation.offerName),m(2),F("Cena: ",s.reservation.price," z\u0142"),m(6),ee(" ",s.reservation.employeeFirstName," ",s.reservation.employeeLastName," "),m(),l("ngIf",s.reservation.status==="oczekujaca")("ngIfElse",p),m(6),F(" ",$(21,11,s.reservation.reservationDate,"MMM")," "),m(3),h($(24,14,s.reservation.reservationDate,"dd")),m(3),h(s.reservation.reservationTime)}},dependencies:[ne,O,y,D,re],styles:[".reservation-card[_ngcontent-%COMP%]{display:flex;border-radius:8px;margin-bottom:20px;background-color:#fff;box-shadow:#11111a0d 0 4px 16px,#11111a0d 0 8px 32px;border:1px solid #e0e0e0;font-family:Jost,sans-serif}.reservation-card__content[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;padding:15px 30px 15px 15px;border-right:1px solid #e0e0e0}.reservation-card__status[_ngcontent-%COMP%]{padding:4px 8px;margin-bottom:10px;border-radius:8px;font-weight:500;color:#000;align-self:flex-start}.reservation-card__status--completed[_ngcontent-%COMP%], .reservation-card__status--cancelled[_ngcontent-%COMP%]{background-color:#f4f4f4}.reservation-card__status--upcoming[_ngcontent-%COMP%]{background-color:#f0e6d2;color:#b7a379}.reservation-card__service-name[_ngcontent-%COMP%]{font-family:Jost,sans-serif;font-weight:500;font-size:1.8rem;margin:0}.reservation-card__price[_ngcontent-%COMP%]{margin:5px 0 0}.reservation-card__employee-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;margin:10px 0 15px}.reservation-card__details[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px 30px}.reservation-card__date[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.reservation-card__date-day[_ngcontent-%COMP%]{margin:10px 0;font-size:3rem;font-weight:500}.reservation-card__date-day-name[_ngcontent-%COMP%]{font-size:1.4rem;font-weight:500}.reservation-card__date-day-name[_ngcontent-%COMP%]:first-letter{text-transform:uppercase}.reservation-card__date-time[_ngcontent-%COMP%]{font-size:1.4rem}@media (min-width: 768px){.reservation-card__content[_ngcontent-%COMP%]{padding:15px 50px 15px 15px}.reservation-card__details[_ngcontent-%COMP%]{padding:15px 50px}}@media (min-width: 996px){.reservation-card[_ngcontent-%COMP%]{max-width:600px}}"]});let t=e;return t})();function Ze(t,e){t&1&&(r(0,"mat-icon",10),a(1,"keyboard_arrow_down"),n())}function He(t,e){t&1&&(r(0,"mat-icon",10),a(1,"keyboard_arrow_right"),n())}function We(t,e){if(t&1){let c=x();r(0,"app-reservation-item",13),f("reservationCancelled",function(){b(c);let o=g(3);return w(o.onReservationCancelled())}),n()}if(t&2){let c=e.$implicit;l("reservation",c)}}function Qe(t,e){if(t&1&&(z(0),u(1,We,1,1,"app-reservation-item",12),k()),t&2){let c=g(2);m(),l("ngForOf",c.upcomingReservations)}}function Ke(t,e){t&1&&(r(0,"p",14),a(1,"Brak zaplanowanych wizyt"),n())}function Xe(t,e){if(t&1&&(r(0,"div"),u(1,Qe,2,1,"ng-container",11)(2,Ke,2,0,"ng-template",null,0,U),n()),t&2){let c=E(3),i=g();m(),l("ngIf",i.upcomingReservations.length>0)("ngIfElse",c)}}function Ye(t,e){t&1&&(r(0,"mat-icon",10),a(1,"keyboard_arrow_down"),n())}function et(t,e){t&1&&(r(0,"mat-icon",10),a(1,"keyboard_arrow_right"),n())}function tt(t,e){if(t&1){let c=x();r(0,"app-reservation-item",13),f("reservationCancelled",function(){b(c);let o=g(3);return w(o.onReservationCancelled())}),n()}if(t&2){let c=e.$implicit;l("reservation",c)}}function nt(t,e){if(t&1&&(z(0),u(1,tt,1,1,"app-reservation-item",12),k()),t&2){let c=g(2);m(),l("ngForOf",c.pastReservations)}}function it(t,e){t&1&&(r(0,"p",14),a(1,"Brak zako\u0144czonych wizyt"),n())}function rt(t,e){if(t&1&&(r(0,"div"),u(1,nt,2,1,"ng-container",11)(2,it,2,0,"ng-template",null,1,U),n()),t&2){let c=E(3),i=g();m(),l("ngIf",i.pastReservations.length>0)("ngIfElse",c)}}var Ve=(()=>{let e=class e{constructor(i){this.userService=i,this.upcomingReservations=[],this.pastReservations=[],this.showUpcomingVisits=!0,this.showPastVisits=!0}ngOnInit(){this.userService.getUpcomingReservations().subscribe(i=>{this.upcomingReservations=i.sort((o,s)=>new Date(s.reservationDate).getTime()-new Date(o.reservationDate).getTime())}),this.userService.getPastReservations().subscribe(i=>{this.pastReservations=i.sort((o,s)=>new Date(s.reservationDate).getTime()-new Date(o.reservationDate).getTime())})}toggleUpcomingVisits(){this.showUpcomingVisits=!this.showUpcomingVisits}togglePastVisits(){this.showPastVisits=!this.showPastVisits}onReservationCancelled(){this.loadReservations()}loadReservations(){this.userService.getUpcomingReservations().subscribe(i=>{this.upcomingReservations=i}),this.userService.getPastReservations().subscribe(i=>{this.pastReservations=i})}};e.\u0275fac=function(o){return new(o||e)(d(P))},e.\u0275cmp=_({type:e,selectors:[["app-user-visits"]],decls:17,vars:6,consts:[["noUpcomingVisits",""],["noPastVisits",""],[1,"visits"],[1,"visits__title"],[1,"upcoming-visits"],[1,"visits__subtitle",3,"click"],[1,"icon-box"],["class","icon",4,"ngIf"],[4,"ngIf"],[1,"past-visits"],[1,"icon"],[4,"ngIf","ngIfElse"],[3,"reservation","reservationCancelled",4,"ngFor","ngForOf"],[3,"reservationCancelled","reservation"],[1,"visits__empty-message"]],template:function(o,s){o&1&&(r(0,"div",2)(1,"h2",3),a(2,"Wizyty"),n(),r(3,"div",4)(4,"h3",5),f("click",function(){return s.toggleUpcomingVisits()}),a(5," Zaplanowane "),r(6,"span",6),u(7,Ze,2,0,"mat-icon",7)(8,He,2,0,"mat-icon",7),n()(),u(9,Xe,4,2,"div",8),n(),r(10,"div",9)(11,"h3",5),f("click",function(){return s.togglePastVisits()}),a(12," Zako\u0144czone "),r(13,"span",6),u(14,Ye,2,0,"mat-icon",7)(15,et,2,0,"mat-icon",7),n()(),u(16,rt,4,2,"div",8),n()()),o&2&&(m(7),l("ngIf",s.showUpcomingVisits),m(),l("ngIf",!s.showUpcomingVisits),m(),l("ngIf",s.showUpcomingVisits),m(5),l("ngIf",s.showPastVisits),m(),l("ngIf",!s.showPastVisits),m(),l("ngIf",s.showPastVisits))},dependencies:[ie,O,y,je],styles:[".visits[_ngcontent-%COMP%]{width:100%;font-family:Jost,sans-serif}.visits__title[_ngcontent-%COMP%]{font-size:2.4rem;font-weight:700;font-family:Jost,sans-serif}.visits__subtitle[_ngcontent-%COMP%]{display:flex;align-items:center;font-family:Jost,sans-serif;font-size:1.8rem}.visits[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.visits[_ngcontent-%COMP%]   .past-visits[_ngcontent-%COMP%]{margin-top:30px}.visits__empty-message[_ngcontent-%COMP%]{font-size:1.6rem}"]});let t=e;return t})();function ot(t,e){if(t&1){let c=x();r(0,"div",13)(1,"h2"),a(2,"Twoje dane"),n(),r(3,"form",3),f("ngSubmit",function(){b(c);let o=g();return w(o.onUpdateUserInfo())}),r(4,"div",5)(5,"mat-form-field",6)(6,"mat-label"),a(7,"Email"),n(),v(8,"input",14),n()(),r(9,"div",5)(10,"mat-form-field",6)(11,"mat-label"),a(12,"Imi\u0119"),n(),v(13,"input",15),n()(),r(14,"div",5)(15,"mat-form-field",6)(16,"mat-label"),a(17,"Nazwisko"),n(),v(18,"input",16),n()(),r(19,"div",5)(20,"mat-form-field",6)(21,"mat-label"),a(22,"Numer telefonu"),n(),v(23,"input",17),n()(),r(24,"div",5)(25,"mat-form-field",6)(26,"mat-label"),a(27,"Adres"),n(),v(28,"input",18),n()(),r(29,"button",11),a(30," Zaktualizuj dane "),n()()()}if(t&2){let c=g();m(3),l("formGroup",c.userInfoForm),m(26),l("disabled",c.userInfoForm.invalid||!c.isUserInfoChanged)}}function at(t,e){t&1&&(r(0,"mat-error"),a(1," Has\u0142o musi sk\u0142ada\u0107 si\u0119 z co najmniej 8 znak\xF3w. "),n())}function st(t,e){if(t&1&&(r(0,"p",19),a(1),n()),t&2){let c=g();m(),h(c.message)}}var Re=(()=>{let e=class e{constructor(i,o,s,p){this.userService=i,this.authService=o,this.modalService=s,this.fb=p,this.userInfo=null,this.message="",this.hideOldPassword=!0,this.hideNewPassword=!0,this.isUserInfoChanged=!1,this.userInfoForm=this.fb.group({email:["",[C.required,C.email]],firstname:["",C.required],lastname:["",C.required],phoneNumber:["",C.required],address:["",C.required]}),this.passwordForm=this.fb.group({oldPassword:["",C.required],newPassword:["",[C.required,C.minLength(8)]]})}ngOnInit(){this.loadUserInfo()}loadUserInfo(){this.userService.getUserInfo().subscribe({next:i=>{this.userInfo=i,this.userInfoForm.patchValue(i),this.monitorUserInfoChanges()},error:i=>{console.error("B\u0142\u0105d podczas \u0142adowania danych u\u017Cytkownika:",i),this.message="Nie uda\u0142o si\u0119 za\u0142adowa\u0107 informacji o u\u017Cytkowniku. Spr\xF3buj ponownie p\xF3\u017Aniej."}})}monitorUserInfoChanges(){this.userInfoForm.valueChanges.subscribe(()=>{this.userInfo&&(this.isUserInfoChanged=!this.areFormsEqual(this.userInfoForm.value,this.userInfo))})}areFormsEqual(i,o){return i.email===o.email&&i.firstname===o.firstname&&i.lastname===o.lastname&&i.phoneNumber===o.phoneNumber&&i.address===o.address}onUpdateUserInfo(){if(this.userInfoForm.invalid)return;let i=this.userInfoForm.value;this.userService.updateUserInfo(i).subscribe({next:o=>{if(this.modalService.openModal(J).subject.next("Pomy\u015Blnie zaktualizowano dane u\u017Cytkownika."),this.userInfo){let p={username:this.userInfo.username,email:i.email,firstname:i.firstname,lastname:i.lastname,role:this.userInfo.role};this.authService.updateUser(p),this.isUserInfoChanged=!1}},error:o=>{console.error("B\u0142\u0105d podczas aktualizacji danych u\u017Cytkownika:",o),this.message="Nie uda\u0142o si\u0119 zaktualizowa\u0107 informacji. Spr\xF3buj ponownie."}})}onChangePassword(){if(this.passwordForm.invalid)return;this.message="";let{oldPassword:i,newPassword:o}=this.passwordForm.value;this.userService.changePassword(i,o).subscribe({next:s=>{this.modalService.openModal(J).subject.next("Has\u0142o zosta\u0142o pomy\u015Blnie zmienione."),this.passwordForm.reset(),Object.keys(this.passwordForm.controls).forEach(De=>{this.passwordForm.get(De)?.setErrors(null)})},error:s=>{console.error("B\u0142\u0105d podczas zmiany has\u0142a:",s),s.status===400&&s.error.message==="Incorrect old password"?this.message="Podano nieprawid\u0142owe stare has\u0142o. Spr\xF3buj ponownie.":this.message="Nie uda\u0142o si\u0119 zmieni\u0107 has\u0142a. Spr\xF3buj ponownie."}})}toggleOldPasswordVisibility(){this.hideOldPassword=!this.hideOldPassword}toggleNewPasswordVisibility(){this.hideNewPassword=!this.hideNewPassword}};e.\u0275fac=function(o){return new(o||e)(d(P),d(S),d(I),d(Ce))},e.\u0275cmp=_({type:e,selectors:[["app-user-settings"]],decls:27,vars:13,consts:[[1,"settings"],["class","user-info",4,"ngIf"],[1,"change-password"],[3,"ngSubmit","formGroup"],["type","text","autocomplete","username","hidden",""],[1,"form-group"],["appearance","fill",1,"form-field"],["matInput","","formControlName","oldPassword","required","","autocomplete","current-password",3,"type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],["matInput","","formControlName","newPassword","required","","minlength","6","autocomplete","new-password",3,"type"],[4,"ngIf"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["class","message",4,"ngIf"],[1,"user-info"],["matInput","","type","email","formControlName","email","required","","autocomplete","email"],["matInput","","formControlName","firstname","required","","autocomplete","given-name"],["matInput","","formControlName","lastname","required","","autocomplete","family-name"],["matInput","","formControlName","phoneNumber","required","","autocomplete","tel"],["matInput","","formControlName","address","required","","autocomplete","street-address"],[1,"message"]],template:function(o,s){if(o&1&&(r(0,"section",0),u(1,ot,31,2,"div",1),r(2,"div",2)(3,"h2"),a(4,"Zmie\u0144 has\u0142o"),n(),r(5,"form",3),f("ngSubmit",function(){return s.onChangePassword()}),v(6,"input",4),r(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),a(10,"Stare has\u0142o"),n(),v(11,"input",7),r(12,"button",8),f("click",function(){return s.toggleOldPasswordVisibility()}),r(13,"mat-icon"),a(14),n()()()(),r(15,"div",5)(16,"mat-form-field",6)(17,"mat-label"),a(18,"Nowe has\u0142o"),n(),v(19,"input",9),r(20,"button",8),f("click",function(){return s.toggleNewPasswordVisibility()}),r(21,"mat-icon"),a(22),n()(),u(23,at,2,0,"mat-error",10),n()(),r(24,"button",11),a(25," Zmie\u0144 has\u0142o "),n()()(),u(26,st,2,1,"p",12),n()),o&2){let p;m(),l("ngIf",s.userInfo),m(4),l("formGroup",s.passwordForm),m(6),l("type",s.hideOldPassword?"password":"text"),m(),A("aria-label","Hide password")("aria-pressed",s.hideOldPassword),m(2),h(s.hideOldPassword?"visibility_off":"visibility"),m(5),l("type",s.hideNewPassword?"password":"text"),m(),A("aria-label","Hide password")("aria-pressed",s.hideNewPassword),m(2),h(s.hideNewPassword?"visibility_off":"visibility"),m(),l("ngIf",(p=s.passwordForm.get("newPassword"))==null?null:p.hasError("minlength")),m(),l("disabled",s.passwordForm.invalid),m(2),l("ngIf",s.message)}},dependencies:[O,y,D,le,Me,we,xe,ye,Pe,fe,de,pe,ue,ve,he,ge,_e],styles:[".user-info[_ngcontent-%COMP%]{margin-bottom:2rem}.user-info[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{display:block}.settings[_ngcontent-%COMP%]{padding-bottom:40px}.change-password[_ngcontent-%COMP%]{margin-top:40px}.change-password[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{display:block}.change-password[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:1rem}h2[_ngcontent-%COMP%]{font-family:Jost,sans-serif;font-size:2.4rem;font-weight:700}.message[_ngcontent-%COMP%]{margin-top:20px;font-size:1.6rem}@media (min-width: 992px){.settings[_ngcontent-%COMP%]{max-width:600px}}"]});let t=e;return t})();var Te=(t,e)=>{let c=q(S),i=q(N),o=t.data.roles;return c.getUser().pipe(W(s=>s&&o.includes(s.role)?!0:(i.navigate(["/auth/login"]),!1)))};var Fe=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=_({type:e,selectors:[["app-terms-and-conditions"]],decls:33,vars:0,consts:[[1,"terms-container"],[1,"terms-title"],[1,"terms-content"]],template:function(o,s){o&1&&(r(0,"div",0)(1,"h2",1),a(2,"Regulamin"),n(),r(3,"section",2)(4,"p"),a(5," Witamy w aplikacji rezerwacji us\u0142ug "),r(6,"strong"),a(7,"QuickCut"),n(),a(8,". Przed korzystaniem z aplikacji, prosimy o zapoznanie si\u0119 z poni\u017Cszym regulaminem. "),n(),r(9,"h3"),a(10,"1. Postanowienia og\xF3lne"),n(),r(11,"p"),a(12," Ten regulamin okre\u015Bla zasady korzystania z aplikacji QuickCut. Korzystanie z aplikacji oznacza akceptacj\u0119 regulaminu. "),n(),r(13,"h3"),a(14,"2. Zak\u0142adanie konta"),n(),r(15,"p"),a(16," U\u017Cytkownik mo\u017Ce za\u0142o\u017Cy\u0107 konto w aplikacji poprzez wype\u0142nienie formularza rejestracyjnego. Dane osobowe musz\u0105 by\u0107 prawdziwe i aktualne. "),n(),r(17,"h3"),a(18,"3. Rezerwacje"),n(),r(19,"p"),a(20," U\u017Cytkownik mo\u017Ce dokonywa\u0107 rezerwacji wybranych us\u0142ug za po\u015Brednictwem aplikacji. W przypadku anulowania rezerwacji, mo\u017Cemy naliczy\u0107 op\u0142at\u0119 za odwo\u0142anie. "),n(),r(21,"h3"),a(22,"4. Prawa i obowi\u0105zki"),n(),r(23,"p"),a(24," U\u017Cytkownik zobowi\u0105zany jest do korzystania z aplikacji zgodnie z jej przeznaczeniem oraz do przestrzegania regulaminu. Administrator zastrzega sobie prawo do usuni\u0119cia konta w przypadku naruszenia zasad. "),n(),r(25,"h3"),a(26,"5. Dane osobowe"),n(),r(27,"p"),a(28," Dane osobowe u\u017Cytkownika przetwarzane s\u0105 zgodnie z nasz\u0105 polityk\u0105 prywatno\u015Bci. U\u017Cytkownik ma prawo do wgl\u0105du i edycji swoich danych. "),n(),r(29,"h3"),a(30,"6. Postanowienia ko\u0144cowe"),n(),r(31,"p"),a(32," Administrator mo\u017Ce dokona\u0107 zmian w regulaminie. U\u017Cytkownik zostanie poinformowany o zmianach przed ich wej\u015Bciem w \u017Cycie. "),n()()())},styles:[".terms-container[_ngcontent-%COMP%]{max-width:800px;padding-bottom:40px}.terms-title[_ngcontent-%COMP%]{font-family:Jost,sans-serif;font-size:2.4rem;font-weight:700;margin-bottom:20px}.terms-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.6rem;margin-bottom:20px}.terms-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-weight:700;font-family:Jost,sans-serif}"]});let t=e;return t})();var mt=[{path:"",component:ze,canActivate:[Te],data:{roles:["USER"]},children:[{path:"",redirectTo:"visits",pathMatch:"full"},{path:"visits",component:Ve},{path:"terms-and-conditions",component:Fe},{path:"settings",component:Re}]}],Ne=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=R({type:e}),e.\u0275inj=V({imports:[j.forChild(mt),j]});let t=e;return t})();var mn=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=R({type:e}),e.\u0275inj=V({imports:[oe,j,Ne,Ie,be]});let t=e;return t})();export{mn as UserModule};
