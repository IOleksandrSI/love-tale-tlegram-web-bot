import{r as s,m as v,a8 as S,a9 as w,aa as P,ab as k,ac as x,ad as q,ae as O}from"./index-BtzxSjkc.js";function M(e,t){return`${e} returned \`undefined\`. Seems you forgot to wrap component within ${t}`}function C(e={}){const{name:t,strict:n=!0,hookName:r="useContext",providerName:o="Provider",errorMessage:c,defaultValue:u}=e,a=s.createContext(u);a.displayName=t;function i(){var p;const l=s.useContext(a);if(!l&&n){const f=new Error(c??M(r,o));throw f.name="ContextError",(p=Error.captureStackTrace)==null||p.call(Error,f,i),f}return l}return[a.Provider,i,a]}const[H,J]=C({name:"LocaleContext",hookName:"useLocaleContext",providerName:"<LocaleProvider />",strict:!1,defaultValue:{dir:"ltr",locale:"en-US"}});function N(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function W(...e){return t=>{for(const n of e)N(n,t)}}function j(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}const y=e=>{const t=s.memo(s.forwardRef((n,r)=>{const{asChild:o,children:c,...u}=n;if(!o)return s.createElement(e,{...u,ref:r},c);const a=s.Children.only(c);if(!s.isValidElement(a))return null;const i=j(a);return s.cloneElement(a,{...v(u,a.props),ref:r?W(r,i):i})}));return t.displayName=e.displayName||e.name,t},A=()=>{const e=new Map;return new Proxy(y,{apply(t,n,r){return y(r[0])},get(t,n){const r=n;return e.has(r)||e.set(r,y(r)),e.get(r)}})},Q=A(),X=()=>(e,t)=>t.reduce((n,r)=>{const[o,c]=n,u=r;return c[u]!==void 0&&(o[u]=c[u]),delete c[u],[o,c]},[{},{...e}]);var Y=S(),Z=w(e=>e),E=e=>(e==null?void 0:e.constructor.name)==="Array",L=(e,t)=>{if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!m(e[n],t[n]))return!1;return!0},m=(e,t)=>{if(Object.is(e,t))return!0;if(e==null&&t!=null||e!=null&&t==null)return!1;if(typeof(e==null?void 0:e.isEqual)=="function"&&typeof(t==null?void 0:t.isEqual)=="function")return e.isEqual(t);if(typeof e=="function"&&typeof t=="function")return e.toString()===t.toString();if(E(e)&&E(t))return L(Array.from(e),Array.from(t));if(typeof e!="object"||typeof t!="object")return!1;const n=Object.keys(t??Object.create(null)),r=n.length;for(let o=0;o<r;o++)if(!Reflect.has(e,n[o]))return!1;for(let o=0;o<r;o++){const c=n[o];if(!m(e[c],t[c]))return!1}return!0},_=Function.prototype.toString;_.call(Object);function R(e){if(!D(e)||e===void 0)return e;const t=Reflect.ownKeys(e).filter(r=>typeof r=="string"),n={};for(const r of t){const o=e[r];o!==void 0&&(n[r]=R(o))}return n}var D=e=>e&&typeof e=="object"&&e.constructor===Object;function V(e,t){const n=s.useRef(!1),r=s.useRef(!1);s.useEffect(()=>{if(n.current&&r.current)return e();r.current=!0},t),s.useEffect(()=>(n.current=!0,()=>{n.current=!1}),[])}var z=P("__zag__targetCache",()=>new WeakMap);function K(e,t){const{actions:n,context:r,sync:o}=t??{},c=s.useRef(void 0),u=s.useRef(void 0),a=s.useSyncExternalStore(s.useCallback(f=>k(e.state,f,o),[o]),()=>{const f=x(e.state);try{if(c.current&&u.current&&!q(c.current,f,u.current,new WeakMap))return c.current}catch{}return f},()=>x(e.state));e.setOptions({actions:n});const i=s.useMemo(()=>R(r??{}),[r]);V(()=>{const f=Object.entries(i),g=e.contextSnapshot??{};f.map(([d,h])=>({key:d,curr:h,prev:g[d],equal:m(g[d],h)})).every(({equal:d})=>d)||e.setContext(i)},[i]);const l=new WeakMap;s.useEffect(()=>{c.current=a,u.current=l});const p=s.useMemo(()=>new WeakMap,[]);return O(a,l,p,z)}function $(e){const t=s.useRef(void 0);return t.current||(t.current={v:e()}),t.current.v}var F=typeof document<"u"?s.useLayoutEffect:s.useEffect;function I(e,t){const{state:n,context:r}=t??{},o=$(()=>{const u=typeof e=="function"?e():e;return r&&u.setContext(r),u._created(),u}),c=s.useRef(void 0);return F(()=>{const u=n??c.current;return o.start(u),()=>{o.stop()}},[]),o}function b(e,t){const n=I(e,t);return[K(n,t),n.send,n]}function ee(e,t={}){const{sync:n=!1}=t,r=T(e);return s.useCallback((...o)=>{var c;return n?queueMicrotask(()=>{var u;return(u=r.current)==null?void 0:u.call(r,...o)}):(c=r.current)==null?void 0:c.call(r,...o)},[n,r])}function T(e){const t=s.useRef(e);return t.current=e,t}const[te,re]=C({name:"EnvironmentContext",hookName:"useEnvironmentContext",providerName:"<EnvironmentProvider />",strict:!1,defaultValue:{getRootNode:()=>document,getDocument:()=>document,getWindow:()=>window}});export{X as a,Q as b,C as c,W as d,J as e,ee as f,b as g,Z as n,Y as r,re as u};
