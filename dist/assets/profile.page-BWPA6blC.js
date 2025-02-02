import{r as s,m as u,j as e,b as se,c as ie,d as le,e as ce,f as w,g as de,I as ue,h as ge,u as pe,T as v,B as j,F as b,C as fe,a as me}from"./index-BtzxSjkc.js";import{T as $}from"./title.config-Da5Xfb9-.js";import{c as I}from"./create-slot-recipe-context-BKeR3ukz.js";import{c as A,a as k,b as p,d as E,u as z,e as B,f as y,g as F,n as O}from"./use-environment-context-CbcAjUHh.js";import{u as S,a as T,s as H,P as M,b as xe}from"./portal-CDG4gyU7.js";import{H as R}from"./heading-SoSsjYZm.js";const[V,he]=A({name:"RenderStrategyContext",hookName:"useRenderStrategyContext",providerName:"<RenderStrategyPropsProvider />"}),W=o=>k()(o,["lazyMount","unmountOnExit"]),[G,C]=A({name:"DialogContext",hookName:"useDialogContext",providerName:"<DialogProvider />"}),Z=s.forwardRef((o,t)=>{const r=C(),n=he(),a=S({...n,present:r.open}),i=u(r.getBackdropProps(),a.getPresenceProps(),o);return a.unmounted?null:e.jsx(p.div,{...i,ref:E(a.ref,t)})});Z.displayName="DialogBackdrop";const L=s.forwardRef((o,t)=>{const r=C(),n=u(r.getCloseTriggerProps(),o);return e.jsx(p.button,{...n,ref:t})});L.displayName="DialogCloseTrigger";const X=s.forwardRef((o,t)=>{const r=C(),n=T(),a=u(r.getContentProps(),n.getPresenceProps(),o);return n.unmounted?null:e.jsx(p.div,{...a,ref:E(n.ref,t)})});X.displayName="DialogContent";const _=s.forwardRef((o,t)=>{const r=C(),n=u(r.getDescriptionProps(),o);return e.jsx(p.div,{...n,ref:t})});_.displayName="DialogDescription";const q=s.forwardRef((o,t)=>{const r=C(),n=u(r.getPositionerProps(),o);return T().unmounted?null:e.jsx(p.div,{...n,ref:t})});q.displayName="DialogPositioner";const Ce=(o={})=>{const{getRootNode:t}=z(),{dir:r}=B(),n={id:s.useId(),getRootNode:t,dir:r,open:o.defaultOpen,"open.controlled":o.open!==void 0,...o},a={...n,open:o.open,onOpenChange:y(o.onOpenChange,{sync:!0}),onEscapeKeyDown:y(o.onEscapeKeyDown),onInteractOutside:y(o.onInteractOutside)},[i,l]=F(se(n),{context:a});return ie(i,l,O)},ve=o=>{const[t,{children:r,...n}]=H(o),[a]=W(t),i=Ce(n),l=S(u({present:i.open},t));return e.jsx(G,{value:i,children:e.jsx(V,{value:a,children:e.jsx(M,{value:l,children:r})})})},Pe=o=>{const[t,{value:r,children:n}]=H(o),[a]=W(t),i=S(u({present:r.open},t));return e.jsx(G,{value:r,children:e.jsx(V,{value:a,children:e.jsx(M,{value:i,children:n})})})},J=s.forwardRef((o,t)=>{const r=C(),n=u(r.getTitleProps(),o);return e.jsx(p.h2,{...n,ref:t})});J.displayName="DialogTitle";const K=s.forwardRef((o,t)=>{const r=C(),n=T(),a=u({...r.getTriggerProps(),"aria-controls":n.unmounted?void 0:r.getTriggerProps()["aria-controls"]},o);return e.jsx(p.button,{...a,ref:t})});K.displayName="DialogTrigger";const[Q,U]=A({name:"AvatarContext",hookName:"useAvatarContext",providerName:"<AvatarProvider />"}),Y=s.forwardRef((o,t)=>{const r=U(),n=u(r.getFallbackProps(),o);return e.jsx(p.span,{...n,ref:t})});Y.displayName="AvatarFallback";const ee=s.forwardRef((o,t)=>{const r=U(),n=u(r.getImageProps(),o);return e.jsx(p.img,{...n,ref:t})});ee.displayName="AvatarImage";const je=(o={})=>{const{getRootNode:t}=z(),{dir:r}=B(),n={id:s.useId(),dir:r,getRootNode:t,...o},a={...n,onStatusChange:y(o.onStatusChange)},[i,l]=F(le(n),{context:a});return ce(i,l,O)},te=s.forwardRef((o,t)=>{const[r,n]=k()(o,["id","ids","onStatusChange"]),a=je(r),i=u(a.getRootProps(),n);return e.jsx(Q,{value:a,children:e.jsx(p.div,{...i,ref:t})})});te.displayName="AvatarRoot";const re=s.forwardRef((o,t)=>{const[{value:r},n]=k()(o,["value"]),a=u(r.getRootProps(),n);return e.jsx(Q,{value:r,children:e.jsx(p.div,{...a,ref:t})})});re.displayName="AvatarRootProvider";const{withProvider:oe,withContext:ne,useStyles:at,PropsProvider:be}=I({key:"avatar"});oe(re,"root",{forwardAsChild:!0});const ye=oe(te,"root",{forwardAsChild:!0}),Re=be,De=ne(Y,"fallback",{forwardAsChild:!0}),we=ne(ee,"image",{forwardAsChild:!0,defaultProps:{draggable:"false",referrerPolicy:"no-referrer"}}),Ae=s.forwardRef(function(t,r){return e.jsx(w.svg,{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",height:"1.2em",width:"1.2em",ref:r,...t,children:e.jsx("path",{d:"M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"})})}),{PropsProvider:st,withContext:ke}=de({key:"badge"}),N=ke("span"),D=o=>o?"":void 0,Se=w("div",{base:{display:"inline-flex",gap:"0.5rem",isolation:"isolate",position:"relative","& [data-group-item]":{_focusVisible:{zIndex:1}}},variants:{orientation:{horizontal:{flexDirection:"row"},vertical:{flexDirection:"column"}},attached:{true:{gap:"0!"}},grow:{true:{display:"flex","& > *":{flex:1}}},stacking:{"first-on-top":{"& > [data-group-item]":{zIndex:"calc(var(--group-count) - var(--group-index))"}},"last-on-top":{"& > [data-group-item]":{zIndex:"var(--group-index)"}}}},compoundVariants:[{orientation:"horizontal",attached:!0,css:{"& > *[data-first]":{borderEndRadius:"0!",marginEnd:"-1px"},"& > *[data-between]":{borderRadius:"0!",marginEnd:"-1px"},"& > *[data-last]":{borderStartRadius:"0!"}}},{orientation:"vertical",attached:!0,css:{"& > *[data-first]":{borderBottomRadius:"0!",marginBottom:"-1px"},"& > *[data-between]":{borderRadius:"0!",marginBottom:"-1px"},"& > *[data-last]":{borderTopRadius:"0!"}}}],defaultVariants:{orientation:"horizontal"}}),Te=s.memo(s.forwardRef(function(t,r){const{align:n="center",justify:a="flex-start",children:i,wrap:l,...m}=t,x=s.Children.count(i),h=s.useMemo(()=>s.Children.toArray(i).filter(s.isValidElement).map((c,g)=>{const P=c.props;return s.cloneElement(c,{...P,"data-group-item":"","data-first":D(g===0),"data-last":D(g===x-1),"data-between":D(g>0&&g<x-1),style:{"--group-count":x,"--group-index":g,...(P==null?void 0:P.style)??{}}})}),[i,x]);return e.jsx(Se,{ref:r,alignItems:n,justifyContent:a,flexWrap:l,...m,children:h})})),{withRootProvider:ae,withContext:f,useStyles:it,PropsProvider:lt}=I({key:"dialog"});ae(Pe,{defaultProps:{unmountOnExit:!0,lazyMount:!0}});const $e=ae(ve,{defaultProps:{unmountOnExit:!0,lazyMount:!0}});f(K,"trigger",{forwardAsChild:!0});const Ne=f(q,"positioner",{forwardAsChild:!0}),Ie=f(X,"content",{forwardAsChild:!0});f(_,"description",{forwardAsChild:!0});const Ee=f(J,"title",{forwardAsChild:!0}),ze=f(L,"closeTrigger",{forwardAsChild:!0}),Be=s.forwardRef(function(t,r){const n=C();return e.jsx(w.button,{...t,ref:r,onClick:()=>n.setOpen(!1)})}),Fe=f(Z,"backdrop",{forwardAsChild:!0}),Oe=f("div","body"),He=f("div","footer"),Me=f("div","header"),Ve=s.forwardRef(function(t,r){const{name:n,src:a,srcSet:i,loading:l,icon:m,fallback:x,children:h,...d}=t;return e.jsxs(ye,{ref:r,...d,children:[e.jsx(We,{name:n,icon:m,children:x}),e.jsx(we,{src:a,srcSet:i,loading:l}),h]})}),We=s.forwardRef(function(t,r){const{name:n,icon:a,children:i,...l}=t;return e.jsxs(De,{ref:r,...l,children:[i,n!=null&&i==null&&e.jsx(e.Fragment,{children:Ge(n)}),n==null&&i==null&&e.jsx(Ae,{asChild:!!a,children:a})]})});function Ge(o){const t=o.trim().split(" "),r=t[0]!=null?t[0]:"",n=t.length>1?t[t.length-1]:"";return r&&n?`${r.charAt(0)}${n.charAt(0)}`:r.charAt(0)}s.forwardRef(function(t,r){const{size:n,variant:a,borderless:i,...l}=t;return e.jsx(Re,{value:{size:n,variant:a,borderless:i},children:e.jsx(Te,{gap:"0",spaceX:"-3",ref:r,...l})})});const Ze=s.forwardRef(function(t,r){return e.jsx(ue,{variant:"ghost","aria-label":"Close",ref:r,...t,children:t.children??e.jsx(ge,{})})}),Le=s.forwardRef(function(t,r){const{children:n,portalled:a=!0,portalRef:i,backdrop:l=!0,...m}=t;return e.jsxs(xe,{disabled:!a,container:i,children:[l&&e.jsx(Fe,{}),e.jsx(Ne,{children:e.jsx(Ie,{ref:r,...m,asChild:!1,children:n})})]})}),Xe=s.forwardRef(function(t,r){return e.jsx(ze,{position:"absolute",top:"2",insetEnd:"2",...t,asChild:!0,children:e.jsx(Ze,{size:"sm",ref:r,children:t.children})})}),_e=$e,qe=He,Je=Me,Ke=Oe,Qe=Ee,Ue=Be,ct=()=>{const o=pe(c=>c.user),[t,r]=s.useState(null);if(!o)return e.jsx(v,{children:"Завантаження профілю..."});const{firstName:n,userName:a,coins:i,titles:l,availableChapters:m}=o,x=c=>{r(c)},h=c=>{c||r(null)},d=t?$[t]:null;return e.jsxs(j,{p:6,maxW:"800px",mx:"auto",children:[e.jsx(R,{as:"h1",mb:4,style:{textAlign:"center"},children:"Профіль"}),e.jsxs(b,{alignItems:"center",mb:6,p:4,border:"1px solid #ddd",borderRadius:"md",style:{backgroundColor:"#f9f9f9"},children:[e.jsx(Ve,{name:n||a,size:"lg",mr:4}),e.jsxs(j,{children:[e.jsx(v,{fontSize:"xl",fontWeight:"bold",children:n||a}),e.jsxs(v,{fontSize:"md",children:["Монети: ",i]})]})]}),e.jsx(R,{as:"h2",size:"md",mb:2,children:"Мої титули:"}),l.length===0?e.jsx(v,{fontStyle:"italic",mb:6,children:"Немає титулів"}):e.jsx(b,{wrap:"wrap",gap:"0.5rem",mb:6,children:l.map(c=>{const g=$[c];if(!g)return null;const P=g.icon;return e.jsxs(N,{px:2,py:1,borderRadius:"md",cursor:"pointer",onClick:()=>x(c),style:{display:"flex",alignItems:"center",background:g.backgroundColor,color:g.iconColor,fontWeight:"bold"},children:[e.jsx(j,{as:P,style:{marginRight:"6px"}}),g.name]},c)})}),e.jsx(R,{as:"h2",size:"md",mb:2,children:"Доступні глави:"}),m.length===0?e.jsx(v,{fontStyle:"italic",children:"Немає доступних глав"}):e.jsx(b,{wrap:"wrap",gap:"0.5rem",children:m.map(c=>e.jsx(N,{px:2,py:1,borderRadius:"md",style:{backgroundColor:"#EEEAFD",color:"#5D3FD3",fontWeight:"bold"},children:fe[c]},c))}),e.jsx(_e,{open:!!t,onOpenChange:()=>h(!0),onInteractOutside:()=>h(!1),children:d&&e.jsxs(Le,{p:2,style:{background:d.backgroundColor,margin:"0 2rem",marginTop:"35vh"},children:[e.jsx(Je,{children:e.jsx(Qe,{children:e.jsxs(b,{alignItems:"center",children:[e.jsx(j,{as:d.icon,style:{marginRight:"8px",color:d.iconColor,fontSize:"24px"}}),d.name]})})}),e.jsxs(Ke,{children:[e.jsx(v,{mb:3,whiteSpace:"pre-line",children:d.description}),d.cost&&e.jsxs(v,{fontWeight:"bold",children:["Ціна: ",d.cost," монет"]})]}),e.jsx(qe,{children:e.jsx(Ue,{asChild:!0,children:e.jsx(me,{p:2,onClick:()=>h(!1),variant:"outline",style:{marginRight:"8px",background:d.iconColor,color:d.backgroundColor},children:"Закрити"})})}),e.jsx(Xe,{onClick:()=>h(!1)})]})})]})};export{ct as default};
