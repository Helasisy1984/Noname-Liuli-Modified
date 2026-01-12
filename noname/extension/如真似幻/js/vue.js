var Vue =3D (function (exports) {
  'use strict';

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */
  function makeMap(str, expectsLowerCase) {
      const map =3D Object.create(null);
      const list =3D str.split(',');
      for (let i =3D 0; i &lt; list.length; i++) {
          map[list[i]] =3D true;
      }
      return expectsLowerCase ? val =3D&gt; !!map[val.toLowerCase()] : val =
=3D&gt; !!map[val];
  }

  /**
   * dev only flag -&gt; name mapping
   */
  const PatchFlagNames =3D {
      [1 /* PatchFlags.TEXT */]: `TEXT`,
      [2 /* PatchFlags.CLASS */]: `CLASS`,
      [4 /* PatchFlags.STYLE */]: `STYLE`,
      [8 /* PatchFlags.PROPS */]: `PROPS`,
      [16 /* PatchFlags.FULL_PROPS */]: `FULL_PROPS`,
      [32 /* PatchFlags.HYDRATE_EVENTS */]: `HYDRATE_EVENTS`,
      [64 /* PatchFlags.STABLE_FRAGMENT */]: `STABLE_FRAGMENT`,
      [128 /* PatchFlags.KEYED_FRAGMENT */]: `KEYED_FRAGMENT`,
      [256 /* PatchFlags.UNKEYED_FRAGMENT */]: `UNKEYED_FRAGMENT`,
      [512 /* PatchFlags.NEED_PATCH */]: `NEED_PATCH`,
      [1024 /* PatchFlags.DYNAMIC_SLOTS */]: `DYNAMIC_SLOTS`,
      [2048 /* PatchFlags.DEV_ROOT_FRAGMENT */]: `DEV_ROOT_FRAGMENT`,
      [-1 /* PatchFlags.HOISTED */]: `HOISTED`,
      [-2 /* PatchFlags.BAIL */]: `BAIL`
  };

  /**
   * Dev only
   */
  const slotFlagsText =3D {
      [1 /* SlotFlags.STABLE */]: 'STABLE',
      [2 /* SlotFlags.DYNAMIC */]: 'DYNAMIC',
      [3 /* SlotFlags.FORWARDED */]: 'FORWARDED'
  };

  const GLOBALS_WHITE_LISTED =3D 'Infinity,undefined,NaN,isFinite,isNaN,par=
seFloat,parseInt,decodeURI,' +
      'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Arr=
ay,' +
      'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
  const isGloballyWhitelisted =3D /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTE=
D);

  const range =3D 2;
  function generateCodeFrame(source, start =3D 0, end =3D source.length) {
      // Split the content into individual lines but capture the newline se=
quence
      // that separated each line. This is important because the actual seq=
uence is
      // needed to properly take into account the full line length for offs=
et
      // comparison
      let lines =3D source.split(/(\r?\n)/);
      // Separate the lines and newline sequences into separate arrays for =
easier referencing
      const newlineSequences =3D lines.filter((_, idx) =3D&gt; idx % 2 =3D=
=3D=3D 1);
      lines =3D lines.filter((_, idx) =3D&gt; idx % 2 =3D=3D=3D 0);
      let count =3D 0;
      const res =3D [];
      for (let i =3D 0; i &lt; lines.length; i++) {
          count +=3D
              lines[i].length +
                  ((newlineSequences[i] &amp;&amp; newlineSequences[i].leng=
th) || 0);
          if (count &gt;=3D start) {
              for (let j =3D i - range; j &lt;=3D i + range || end &gt; cou=
nt; j++) {
                  if (j &lt; 0 || j &gt;=3D lines.length)
                      continue;
                  const line =3D j + 1;
                  res.push(`${line}${' '.repeat(Math.max(3 - String(line).l=
ength, 0))}|  ${lines[j]}`);
                  const lineLength =3D lines[j].length;
                  const newLineSeqLength =3D (newlineSequences[j] &amp;&amp=
; newlineSequences[j].length) || 0;
                  if (j =3D=3D=3D i) {
                      // push underline
                      const pad =3D start - (count - (lineLength + newLineS=
eqLength));
                      const length =3D Math.max(1, end &gt; count ? lineLen=
gth - pad : end - start);
                      res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(leng=
th));
                  }
                  else if (j &gt; i) {
                      if (end &gt; count) {
                          const length =3D Math.max(Math.min(end - count, l=
ineLength), 1);
                          res.push(`   |  ` + '^'.repeat(length));
                      }
                      count +=3D lineLength + newLineSeqLength;
                  }
              }
              break;
          }
      }
      return res.join('\n');
  }

  function normalizeStyle(value) {
      if (isArray(value)) {
          const res =3D {};
          for (let i =3D 0; i &lt; value.length; i++) {
              const item =3D value[i];
              const normalized =3D isString(item)
                  ? parseStringStyle(item)
                  : normalizeStyle(item);
              if (normalized) {
                  for (const key in normalized) {
                      res[key] =3D normalized[key];
                  }
              }
          }
          return res;
      }
      else if (isString(value)) {
          return value;
      }
      else if (isObject(value)) {
          return value;
      }
  }
  const listDelimiterRE =3D /;(?![^(]*\))/g;
  const propertyDelimiterRE =3D /:([^]+)/;
  const styleCommentRE =3D /\/\*.*?\*\//gs;
  function parseStringStyle(cssText) {
      const ret =3D {};
      cssText
          .replace(styleCommentRE, '')
          .split(listDelimiterRE)
          .forEach(item =3D&gt; {
          if (item) {
              const tmp =3D item.split(propertyDelimiterRE);
              tmp.length &gt; 1 &amp;&amp; (ret[tmp[0].trim()] =3D tmp[1].t=
rim());
          }
      });
      return ret;
  }
  function normalizeClass(value) {
      let res =3D '';
      if (isString(value)) {
          res =3D value;
      }
      else if (isArray(value)) {
          for (let i =3D 0; i &lt; value.length; i++) {
              const normalized =3D normalizeClass(value[i]);
              if (normalized) {
                  res +=3D normalized + ' ';
              }
          }
      }
      else if (isObject(value)) {
          for (const name in value) {
              if (value[name]) {
                  res +=3D name + ' ';
              }
          }
      }
      return res.trim();
  }
  function normalizeProps(props) {
      if (!props)
          return null;
      let { class: klass, style } =3D props;
      if (klass &amp;&amp; !isString(klass)) {
          props.class =3D normalizeClass(klass);
      }
      if (style) {
          props.style =3D normalizeStyle(style);
      }
      return props;
  }

  // These tag configs are shared between compiler-dom and runtime-dom, so =
they
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  const HTML_TAGS =3D 'html,body,base,head,link,meta,style,title,address,ar=
ticle,aside,footer,' +
      'header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,=
' +
      'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,c=
ode,' +
      'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup=
,' +
      'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,=
' +
      'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbod=
y,td,' +
      'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgrou=
p,' +
      'option,output,progress,select,textarea,details,dialog,menu,' +
      'summary,template,blockquote,iframe,tfoot';
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  const SVG_TAGS =3D 'svg,animate,animateMotion,animateTransform,circle,cli=
pPath,color-profile,' +
      'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,=
' +
      'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' +
      'feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,=
' +
      'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' +
      'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filt=
er,' +
      'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mas=
k,' +
      'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' +
      'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symb=
ol,' +
      'text,textPath,title,tspan,unknown,use,view';
  const VOID_TAGS =3D 'area,base,br,col,embed,hr,img,input,link,meta,param,=
source,track,wbr';
  /**
   * Compiler only.
   * Do NOT use in runtime code paths unless behind `true` flag.
   */
  const isHTMLTag =3D /*#__PURE__*/ makeMap(HTML_TAGS);
  /**
   * Compiler only.
   * Do NOT use in runtime code paths unless behind `true` flag.
   */
  const isSVGTag =3D /*#__PURE__*/ makeMap(SVG_TAGS);
  /**
   * Compiler only.
   * Do NOT use in runtime code paths unless behind `true` flag.
   */
  const isVoidTag =3D /*#__PURE__*/ makeMap(VOID_TAGS);

  /**
   * On the client we only need to offer special cases for boolean attribut=
es that
   * have different names from their corresponding dom properties:
   * - itemscope -&gt; N/A
   * - allowfullscreen -&gt; allowFullscreen
   * - formnovalidate -&gt; formNoValidate
   * - ismap -&gt; isMap
   * - nomodule -&gt; noModule
   * - novalidate -&gt; noValidate
   * - readonly -&gt; readOnly
   */
  const specialBooleanAttrs =3D `itemscope,allowfullscreen,formnovalidate,i=
smap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr =3D /*#__PURE__*/ makeMap(specialBooleanAttrs)=
;
  /**
   * Boolean attributes should be included if the value is truthy or ''.
   * e.g. `&lt;select multiple&gt;` compiles to `{ multiple: '' }`
   */
  function includeBooleanAttr(value) {
      return !!value || value =3D=3D=3D '';
  }

  function looseCompareArrays(a, b) {
      if (a.length !=3D=3D b.length)
          return false;
      let equal =3D true;
      for (let i =3D 0; equal &amp;&amp; i &lt; a.length; i++) {
          equal =3D looseEqual(a[i], b[i]);
      }
      return equal;
  }
  function looseEqual(a, b) {
      if (a =3D=3D=3D b)
          return true;
      let aValidType =3D isDate(a);
      let bValidType =3D isDate(b);
      if (aValidType || bValidType) {
          return aValidType &amp;&amp; bValidType ? a.getTime() =3D=3D=3D b=
.getTime() : false;
      }
      aValidType =3D isSymbol(a);
      bValidType =3D isSymbol(b);
      if (aValidType || bValidType) {
          return a =3D=3D=3D b;
      }
      aValidType =3D isArray(a);
      bValidType =3D isArray(b);
      if (aValidType || bValidType) {
          return aValidType &amp;&amp; bValidType ? looseCompareArrays(a, b=
) : false;
      }
      aValidType =3D isObject(a);
      bValidType =3D isObject(b);
      if (aValidType || bValidType) {
          /* istanbul ignore if: this if will probably never be called */
          if (!aValidType || !bValidType) {
              return false;
          }
          const aKeysCount =3D Object.keys(a).length;
          const bKeysCount =3D Object.keys(b).length;
          if (aKeysCount !=3D=3D bKeysCount) {
              return false;
          }
          for (const key in a) {
              const aHasKey =3D a.hasOwnProperty(key);
              const bHasKey =3D b.hasOwnProperty(key);
              if ((aHasKey &amp;&amp; !bHasKey) ||
                  (!aHasKey &amp;&amp; bHasKey) ||
                  !looseEqual(a[key], b[key])) {
                  return false;
              }
          }
      }
      return String(a) =3D=3D=3D String(b);
  }
  function looseIndexOf(arr, val) {
      return arr.findIndex(item =3D&gt; looseEqual(item, val));
  }

  /**
   * For converting {{ interpolation }} values to displayed strings.
   * @private
   */
  const toDisplayString =3D (val) =3D&gt; {
      return isString(val)
          ? val
          : val =3D=3D null
              ? ''
              : isArray(val) ||
                  (isObject(val) &amp;&amp;
                      (val.toString =3D=3D=3D objectToString || !isFunction=
(val.toString)))
                  ? JSON.stringify(val, replacer, 2)
                  : String(val);
  };
  const replacer =3D (_key, val) =3D&gt; {
      // can't use isRef here since @vue/shared has no deps
      if (val &amp;&amp; val.__v_isRef) {
          return replacer(_key, val.value);
      }
      else if (isMap(val)) {
          return {
              [`Map(${val.size})`]: [...val.entries()].reduce((entries, [ke=
y, val]) =3D&gt; {
                  entries[`${key} =3D&gt;`] =3D val;
                  return entries;
              }, {})
          };
      }
      else if (isSet(val)) {
          return {
              [`Set(${val.size})`]: [...val.values()]
          };
      }
      else if (isObject(val) &amp;&amp; !isArray(val) &amp;&amp; !isPlainOb=
ject(val)) {
          return String(val);
      }
      return val;
  };

  const EMPTY_OBJ =3D Object.freeze({})
      ;
  const EMPTY_ARR =3D Object.freeze([]) ;
  const NOOP =3D () =3D&gt; { };
  /**
   * Always return false.
   */
  const NO =3D () =3D&gt; false;
  const onRE =3D /^on[^a-z]/;
  const isOn =3D (key) =3D&gt; onRE.test(key);
  const isModelListener =3D (key) =3D&gt; key.startsWith('onUpdate:');
  const extend =3D Object.assign;
  const remove =3D (arr, el) =3D&gt; {
      const i =3D arr.indexOf(el);
      if (i &gt; -1) {
          arr.splice(i, 1);
      }
  };
  const hasOwnProperty$1 =3D Object.prototype.hasOwnProperty;
  const hasOwn =3D (val, key) =3D&gt; hasOwnProperty$1.call(val, key);
  const isArray =3D Array.isArray;
  const isMap =3D (val) =3D&gt; toTypeString(val) =3D=3D=3D '[object Map]';
  const isSet =3D (val) =3D&gt; toTypeString(val) =3D=3D=3D '[object Set]';
  const isDate =3D (val) =3D&gt; toTypeString(val) =3D=3D=3D '[object Date]=
';
  const isRegExp =3D (val) =3D&gt; toTypeString(val) =3D=3D=3D '[object Reg=
Exp]';
  const isFunction =3D (val) =3D&gt; typeof val =3D=3D=3D 'function';
  const isString =3D (val) =3D&gt; typeof val =3D=3D=3D 'string';
  const isSymbol =3D (val) =3D&gt; typeof val =3D=3D=3D 'symbol';
  const isObject =3D (val) =3D&gt; val !=3D=3D null &amp;&amp; typeof val =
=3D=3D=3D 'object';
  const isPromise =3D (val) =3D&gt; {
      return isObject(val) &amp;&amp; isFunction(val.then) &amp;&amp; isFun=
ction(val.catch);
  };
  const objectToString =3D Object.prototype.toString;
  const toTypeString =3D (value) =3D&gt; objectToString.call(value);
  const toRawType =3D (value) =3D&gt; {
      // extract "RawType" from strings like "[object RawType]"
      return toTypeString(value).slice(8, -1);
  };
  const isPlainObject =3D (val) =3D&gt; toTypeString(val) =3D=3D=3D '[objec=
t Object]';
  const isIntegerKey =3D (key) =3D&gt; isString(key) &amp;&amp;
      key !=3D=3D 'NaN' &amp;&amp;
      key[0] !=3D=3D '-' &amp;&amp;
      '' + parseInt(key, 10) =3D=3D=3D key;
  const isReservedProp =3D /*#__PURE__*/ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ',key,ref,ref_for,ref_key,' +
      'onVnodeBeforeMount,onVnodeMounted,' +
      'onVnodeBeforeUpdate,onVnodeUpdated,' +
      'onVnodeBeforeUnmount,onVnodeUnmounted');
  const isBuiltInDirective =3D /*#__PURE__*/ makeMap('bind,cloak,else-if,el=
se,for,html,if,model,on,once,pre,show,slot,text,memo');
  const cacheStringFunction =3D (fn) =3D&gt; {
      const cache =3D Object.create(null);
      return ((str) =3D&gt; {
          const hit =3D cache[str];
          return hit || (cache[str] =3D fn(str));
      });
  };
  const camelizeRE =3D /-(\w)/g;
  /**
   * @private
   */
  const camelize =3D cacheStringFunction((str) =3D&gt; {
      return str.replace(camelizeRE, (_, c) =3D&gt; (c ? c.toUpperCase() : =
''));
  });
  const hyphenateRE =3D /\B([A-Z])/g;
  /**
   * @private
   */
  const hyphenate =3D cacheStringFunction((str) =3D&gt; str.replace(hyphena=
teRE, '-$1').toLowerCase());
  /**
   * @private
   */
  const capitalize =3D cacheStringFunction((str) =3D&gt; str.charAt(0).toUp=
perCase() + str.slice(1));
  /**
   * @private
   */
  const toHandlerKey =3D cacheStringFunction((str) =3D&gt; str ? `on${capit=
alize(str)}` : ``);
  // compare whether a value has changed, accounting for NaN.
  const hasChanged =3D (value, oldValue) =3D&gt; !Object.is(value, oldValue=
);
  const invokeArrayFns =3D (fns, arg) =3D&gt; {
      for (let i =3D 0; i &lt; fns.length; i++) {
          fns[i](arg);
      }
  };
  const def =3D (obj, key, value) =3D&gt; {
      Object.defineProperty(obj, key, {
          configurable: true,
          enumerable: false,
          value
      });
  };
  /**
   * "123-foo" will be parsed to 123
   * This is used for the .number modifier in v-model
   */
  const looseToNumber =3D (val) =3D&gt; {
      const n =3D parseFloat(val);
      return isNaN(n) ? val : n;
  };
  /**
   * Only conerces number-like strings
   * "123-foo" will be returned as-is
   */
  const toNumber =3D (val) =3D&gt; {
      const n =3D isString(val) ? Number(val) : NaN;
      return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis =3D () =3D&gt; {
      return (_globalThis ||
          (_globalThis =3D
              typeof globalThis !=3D=3D 'undefined'
                  ? globalThis
                  : typeof self !=3D=3D 'undefined'
                      ? self
                      : typeof window !=3D=3D 'undefined'
                          ? window
                          : typeof global !=3D=3D 'undefined'
                              ? global
                              : {}));
  };

  function warn$1(msg, ...args) {
      console.warn(`[Vue warn] ${msg}`, ...args);
  }

  let activeEffectScope;
  class EffectScope {
      constructor(detached =3D false) {
          this.detached =3D detached;
          /**
           * @internal
           */
          this._active =3D true;
          /**
           * @internal
           */
          this.effects =3D [];
          /**
           * @internal
           */
          this.cleanups =3D [];
          this.parent =3D activeEffectScope;
          if (!detached &amp;&amp; activeEffectScope) {
              this.index =3D
                  (activeEffectScope.scopes || (activeEffectScope.scopes =
=3D [])).push(this) - 1;
          }
      }
      get active() {
          return this._active;
      }
      run(fn) {
          if (this._active) {
              const currentEffectScope =3D activeEffectScope;
              try {
                  activeEffectScope =3D this;
                  return fn();
              }
              finally {
                  activeEffectScope =3D currentEffectScope;
              }
          }
          else {
              warn$1(`cannot run an inactive effect scope.`);
          }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      on() {
          activeEffectScope =3D this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      off() {
          activeEffectScope =3D this.parent;
      }
      stop(fromParent) {
          if (this._active) {
              let i, l;
              for (i =3D 0, l =3D this.effects.length; i &lt; l; i++) {
                  this.effects[i].stop();
              }
              for (i =3D 0, l =3D this.cleanups.length; i &lt; l; i++) {
                  this.cleanups[i]();
              }
              if (this.scopes) {
                  for (i =3D 0, l =3D this.scopes.length; i &lt; l; i++) {
                      this.scopes[i].stop(true);
                  }
              }
              // nested scope, dereference from parent to avoid memory leak=
s
              if (!this.detached &amp;&amp; this.parent &amp;&amp; !fromPar=
ent) {
                  // optimized O(1) removal
                  const last =3D this.parent.scopes.pop();
                  if (last &amp;&amp; last !=3D=3D this) {
                      this.parent.scopes[this.index] =3D last;
                      last.index =3D this.index;
                  }
              }
              this.parent =3D undefined;
              this._active =3D false;
          }
      }
  }
  function effectScope(detached) {
      return new EffectScope(detached);
  }
  function recordEffectScope(effect, scope =3D activeEffectScope) {
      if (scope &amp;&amp; scope.active) {
          scope.effects.push(effect);
      }
  }
  function getCurrentScope() {
      return activeEffectScope;
  }
  function onScopeDispose(fn) {
      if (activeEffectScope) {
          activeEffectScope.cleanups.push(fn);
      }
      else {
          warn$1(`onScopeDispose() is called when there is no active effect=
 scope` +
              ` to be associated with.`);
      }
  }

  const createDep =3D (effects) =3D&gt; {
      const dep =3D new Set(effects);
      dep.w =3D 0;
      dep.n =3D 0;
      return dep;
  };
  const wasTracked =3D (dep) =3D&gt; (dep.w &amp; trackOpBit) &gt; 0;
  const newTracked =3D (dep) =3D&gt; (dep.n &amp; trackOpBit) &gt; 0;
  const initDepMarkers =3D ({ deps }) =3D&gt; {
      if (deps.length) {
          for (let i =3D 0; i &lt; deps.length; i++) {
              deps[i].w |=3D trackOpBit; // set was tracked
          }
      }
  };
  const finalizeDepMarkers =3D (effect) =3D&gt; {
      const { deps } =3D effect;
      if (deps.length) {
          let ptr =3D 0;
          for (let i =3D 0; i &lt; deps.length; i++) {
              const dep =3D deps[i];
              if (wasTracked(dep) &amp;&amp; !newTracked(dep)) {
                  dep.delete(effect);
              }
              else {
                  deps[ptr++] =3D dep;
              }
              // clear bits
              dep.w &amp;=3D ~trackOpBit;
              dep.n &amp;=3D ~trackOpBit;
          }
          deps.length =3D ptr;
      }
  };

  const targetMap =3D new WeakMap();
  // The number of effects currently being tracked recursively.
  let effectTrackDepth =3D 0;
  let trackOpBit =3D 1;
  /**
   * The bitwise track markers support at most 30 levels of recursion.
   * This value is chosen to enable modern JS engines to use a SMI on all p=
latforms.
   * When recursion depth is greater, fall back to using a full cleanup.
   */
  const maxMarkerBits =3D 30;
  let activeEffect;
  const ITERATE_KEY =3D Symbol('iterate' );
  const MAP_KEY_ITERATE_KEY =3D Symbol('Map key iterate' );
  class ReactiveEffect {
      constructor(fn, scheduler =3D null, scope) {
          this.fn =3D fn;
          this.scheduler =3D scheduler;
          this.active =3D true;
          this.deps =3D [];
          this.parent =3D undefined;
          recordEffectScope(this, scope);
      }
      run() {
          if (!this.active) {
              return this.fn();
          }
          let parent =3D activeEffect;
          let lastShouldTrack =3D shouldTrack;
          while (parent) {
              if (parent =3D=3D=3D this) {
                  return;
              }
              parent =3D parent.parent;
          }
          try {
              this.parent =3D activeEffect;
              activeEffect =3D this;
              shouldTrack =3D true;
              trackOpBit =3D 1 &lt;&lt; ++effectTrackDepth;
              if (effectTrackDepth &lt;=3D maxMarkerBits) {
                  initDepMarkers(this);
              }
              else {
                  cleanupEffect(this);
              }
              return this.fn();
          }
          finally {
              if (effectTrackDepth &lt;=3D maxMarkerBits) {
                  finalizeDepMarkers(this);
              }
              trackOpBit =3D 1 &lt;&lt; --effectTrackDepth;
              activeEffect =3D this.parent;
              shouldTrack =3D lastShouldTrack;
              this.parent =3D undefined;
              if (this.deferStop) {
                  this.stop();
              }
          }
      }
      stop() {
          // stopped while running itself - defer the cleanup
          if (activeEffect =3D=3D=3D this) {
              this.deferStop =3D true;
          }
          else if (this.active) {
              cleanupEffect(this);
              if (this.onStop) {
                  this.onStop();
              }
              this.active =3D false;
          }
      }
  }
  function cleanupEffect(effect) {
      const { deps } =3D effect;
      if (deps.length) {
          for (let i =3D 0; i &lt; deps.length; i++) {
              deps[i].delete(effect);
          }
          deps.length =3D 0;
      }
  }
  function effect(fn, options) {
      if (fn.effect) {
          fn =3D fn.effect.fn;
      }
      const _effect =3D new ReactiveEffect(fn);
      if (options) {
          extend(_effect, options);
          if (options.scope)
              recordEffectScope(_effect, options.scope);
      }
      if (!options || !options.lazy) {
          _effect.run();
      }
      const runner =3D _effect.run.bind(_effect);
      runner.effect =3D _effect;
      return runner;
  }
  function stop(runner) {
      runner.effect.stop();
  }
  let shouldTrack =3D true;
  const trackStack =3D [];
  function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack =3D false;
  }
  function resetTracking() {
      const last =3D trackStack.pop();
      shouldTrack =3D last =3D=3D=3D undefined ? true : last;
  }
  function track(target, type, key) {
      if (shouldTrack &amp;&amp; activeEffect) {
          let depsMap =3D targetMap.get(target);
          if (!depsMap) {
              targetMap.set(target, (depsMap =3D new Map()));
          }
          let dep =3D depsMap.get(key);
          if (!dep) {
              depsMap.set(key, (dep =3D createDep()));
          }
          const eventInfo =3D { effect: activeEffect, target, type, key }
              ;
          trackEffects(dep, eventInfo);
      }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack =3D false;
      if (effectTrackDepth &lt;=3D maxMarkerBits) {
          if (!newTracked(dep)) {
              dep.n |=3D trackOpBit; // set newly tracked
              shouldTrack =3D !wasTracked(dep);
          }
      }
      else {
          // Full cleanup mode.
          shouldTrack =3D !dep.has(activeEffect);
      }
      if (shouldTrack) {
          dep.add(activeEffect);
          activeEffect.deps.push(dep);
          if (activeEffect.onTrack) {
              activeEffect.onTrack(Object.assign({ effect: activeEffect }, =
debuggerEventExtraInfo));
          }
      }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap =3D targetMap.get(target);
      if (!depsMap) {
          // never been tracked
          return;
      }
      let deps =3D [];
      if (type =3D=3D=3D "clear" /* TriggerOpTypes.CLEAR */) {
          // collection being cleared
          // trigger all effects for target
          deps =3D [...depsMap.values()];
      }
      else if (key =3D=3D=3D 'length' &amp;&amp; isArray(target)) {
          const newLength =3D Number(newValue);
          depsMap.forEach((dep, key) =3D&gt; {
              if (key =3D=3D=3D 'length' || key &gt;=3D newLength) {
                  deps.push(dep);
              }
          });
      }
      else {
          // schedule runs for SET | ADD | DELETE
          if (key !=3D=3D void 0) {
              deps.push(depsMap.get(key));
          }
          // also run for iteration key on ADD | DELETE | Map.SET
          switch (type) {
              case "add" /* TriggerOpTypes.ADD */:
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  else if (isIntegerKey(key)) {
                      // new index added to array -&gt; length changes
                      deps.push(depsMap.get('length'));
                  }
                  break;
              case "delete" /* TriggerOpTypes.DELETE */:
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  break;
              case "set" /* TriggerOpTypes.SET */:
                  if (isMap(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                  }
                  break;
          }
      }
      const eventInfo =3D { target, type, key, newValue, oldValue, oldTarge=
t }
          ;
      if (deps.length =3D=3D=3D 1) {
          if (deps[0]) {
              {
                  triggerEffects(deps[0], eventInfo);
              }
          }
      }
      else {
          const effects =3D [];
          for (const dep of deps) {
              if (dep) {
                  effects.push(...dep);
              }
          }
          {
              triggerEffects(createDep(effects), eventInfo);
          }
      }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
      // spread into array for stabilization
      const effects =3D isArray(dep) ? dep : [...dep];
      for (const effect of effects) {
          if (effect.computed) {
              triggerEffect(effect, debuggerEventExtraInfo);
          }
      }
      for (const effect of effects) {
          if (!effect.computed) {
              triggerEffect(effect, debuggerEventExtraInfo);
          }
      }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
      if (effect !=3D=3D activeEffect || effect.allowRecurse) {
          if (effect.onTrigger) {
              effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
          }
          if (effect.scheduler) {
              effect.scheduler();
          }
          else {
              effect.run();
          }
      }
  }
  function getDepFromReactive(object, key) {
      var _a;
      return (_a =3D targetMap.get(object)) =3D=3D=3D null || _a =3D=3D=3D =
void 0 ? void 0 : _a.get(key);
  }

  const isNonTrackableKeys =3D /*#__PURE__*/ makeMap(`__proto__,__v_isRef,_=
_isVue`);
  const builtInSymbols =3D new Set(
  /*#__PURE__*/
  Object.getOwnPropertyNames(Symbol)
      // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'argument=
s' and 'caller'
      // but accessing them on Symbol leads to TypeError because Symbol is =
a strict mode
      // function
      .filter(key =3D&gt; key !=3D=3D 'arguments' &amp;&amp; key !=3D=3D 'c=
aller')
      .map(key =3D&gt; Symbol[key])
      .filter(isSymbol));
  const get$1 =3D /*#__PURE__*/ createGetter();
  const shallowGet =3D /*#__PURE__*/ createGetter(false, true);
  const readonlyGet =3D /*#__PURE__*/ createGetter(true);
  const shallowReadonlyGet =3D /*#__PURE__*/ createGetter(true, true);
  const arrayInstrumentations =3D /*#__PURE__*/ createArrayInstrumentations=
();
  function createArrayInstrumentations() {
      const instrumentations =3D {};
      ['includes', 'indexOf', 'lastIndexOf'].forEach(key =3D&gt; {
          instrumentations[key] =3D function (...args) {
              const arr =3D toRaw(this);
              for (let i =3D 0, l =3D this.length; i &lt; l; i++) {
                  track(arr, "get" /* TrackOpTypes.GET */, i + '');
              }
              // we run the method using the original args first (which may=
 be reactive)
              const res =3D arr[key](...args);
              if (res =3D=3D=3D -1 || res =3D=3D=3D false) {
                  // if that didn't work, run it again using raw values.
                  return arr[key](...args.map(toRaw));
              }
              else {
                  return res;
              }
          };
      });
      ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key =3D&gt; {
          instrumentations[key] =3D function (...args) {
              pauseTracking();
              const res =3D toRaw(this)[key].apply(this, args);
              resetTracking();
              return res;
          };
      });
      return instrumentations;
  }
  function hasOwnProperty(key) {
      const obj =3D toRaw(this);
      track(obj, "has" /* TrackOpTypes.HAS */, key);
      return obj.hasOwnProperty(key);
  }
  function createGetter(isReadonly =3D false, shallow =3D false) {
      return function get(target, key, receiver) {
          if (key =3D=3D=3D "__v_isReactive" /* ReactiveFlags.IS_REACTIVE *=
/) {
              return !isReadonly;
          }
          else if (key =3D=3D=3D "__v_isReadonly" /* ReactiveFlags.IS_READO=
NLY */) {
              return isReadonly;
          }
          else if (key =3D=3D=3D "__v_isShallow" /* ReactiveFlags.IS_SHALLO=
W */) {
              return shallow;
          }
          else if (key =3D=3D=3D "__v_raw" /* ReactiveFlags.RAW */ &amp;&am=
p;
              receiver =3D=3D=3D
                  (isReadonly
                      ? shallow
                          ? shallowReadonlyMap
                          : readonlyMap
                      : shallow
                          ? shallowReactiveMap
                          : reactiveMap).get(target)) {
              return target;
          }
          const targetIsArray =3D isArray(target);
          if (!isReadonly) {
              if (targetIsArray &amp;&amp; hasOwn(arrayInstrumentations, ke=
y)) {
                  return Reflect.get(arrayInstrumentations, key, receiver);
              }
              if (key =3D=3D=3D 'hasOwnProperty') {
                  return hasOwnProperty;
              }
          }
          const res =3D Reflect.get(target, key, receiver);
          if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(=
key)) {
              return res;
          }
          if (!isReadonly) {
              track(target, "get" /* TrackOpTypes.GET */, key);
          }
          if (shallow) {
              return res;
          }
          if (isRef(res)) {
              // ref unwrapping - skip unwrap for Array + integer key.
              return targetIsArray &amp;&amp; isIntegerKey(key) ? res : res=
.value;
          }
          if (isObject(res)) {
              // Convert returned value into a proxy as well. we do the isO=
bject check
              // here to avoid invalid value warning. Also need to lazy acc=
ess readonly
              // and reactive here to avoid circular dependency.
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
  const set$1 =3D /*#__PURE__*/ createSetter();
  const shallowSet =3D /*#__PURE__*/ createSetter(true);
  function createSetter(shallow =3D false) {
      return function set(target, key, value, receiver) {
          let oldValue =3D target[key];
          if (isReadonly(oldValue) &amp;&amp; isRef(oldValue) &amp;&amp; !i=
sRef(value)) {
              return false;
          }
          if (!shallow) {
              if (!isShallow(value) &amp;&amp; !isReadonly(value)) {
                  oldValue =3D toRaw(oldValue);
                  value =3D toRaw(value);
              }
              if (!isArray(target) &amp;&amp; isRef(oldValue) &amp;&amp; !i=
sRef(value)) {
                  oldValue.value =3D value;
                  return true;
              }
          }
          const hadKey =3D isArray(target) &amp;&amp; isIntegerKey(key)
              ? Number(key) &lt; target.length
              : hasOwn(target, key);
          const result =3D Reflect.set(target, key, value, receiver);
          // don't trigger if target is something up in the prototype chain=
 of original
          if (target =3D=3D=3D toRaw(receiver)) {
              if (!hadKey) {
                  trigger(target, "add" /* TriggerOpTypes.ADD */, key, valu=
e);
              }
              else if (hasChanged(value, oldValue)) {
                  trigger(target, "set" /* TriggerOpTypes.SET */, key, valu=
e, oldValue);
              }
          }
          return result;
      };
  }
  function deleteProperty(target, key) {
      const hadKey =3D hasOwn(target, key);
      const oldValue =3D target[key];
      const result =3D Reflect.deleteProperty(target, key);
      if (result &amp;&amp; hadKey) {
          trigger(target, "delete" /* TriggerOpTypes.DELETE */, key, undefi=
ned, oldValue);
      }
      return result;
  }
  function has$1(target, key) {
      const result =3D Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
          track(target, "has" /* TrackOpTypes.HAS */, key);
      }
      return result;
  }
  function ownKeys(target) {
      track(target, "iterate" /* TrackOpTypes.ITERATE */, isArray(target) ?=
 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
  }
  const mutableHandlers =3D {
      get: get$1,
      set: set$1,
      deleteProperty,
      has: has$1,
      ownKeys
  };
  const readonlyHandlers =3D {
      get: readonlyGet,
      set(target, key) {
          {
              warn$1(`Set operation on key "${String(key)}" failed: target =
is readonly.`, target);
          }
          return true;
      },
      deleteProperty(target, key) {
          {
              warn$1(`Delete operation on key "${String(key)}" failed: targ=
et is readonly.`, target);
          }
          return true;
      }
  };
  const shallowReactiveHandlers =3D /*#__PURE__*/ extend({}, mutableHandler=
s, {
      get: shallowGet,
      set: shallowSet
  });
  // Props handlers are special in the sense that it should not unwrap top-=
level
  // refs (in order to allow refs to be explicitly passed down), but should
  // retain the reactivity of the normal readonly object.
  const shallowReadonlyHandlers =3D /*#__PURE__*/ extend({}, readonlyHandle=
rs, {
      get: shallowReadonlyGet
  });

  const toShallow =3D (value) =3D&gt; value;
  const getProto =3D (v) =3D&gt; Reflect.getPrototypeOf(v);
  function get(target, key, isReadonly =3D false, isShallow =3D false) {
      // #1772: readonly(reactive(Map)) should return readonly + reactive v=
ersion
      // of the value
      target =3D target["__v_raw" /* ReactiveFlags.RAW */];
      const rawTarget =3D toRaw(target);
      const rawKey =3D toRaw(key);
      if (!isReadonly) {
          if (key !=3D=3D rawKey) {
              track(rawTarget, "get" /* TrackOpTypes.GET */, key);
          }
          track(rawTarget, "get" /* TrackOpTypes.GET */, rawKey);
      }
      const { has } =3D getProto(rawTarget);
      const wrap =3D isShallow ? toShallow : isReadonly ? toReadonly : toRe=
active;
      if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
      }
      else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
      }
      else if (target !=3D=3D rawTarget) {
          // #3602 readonly(reactive(Map))
          // ensure that the nested reactive `Map` can do tracking for itse=
lf
          target.get(key);
      }
  }
  function has(key, isReadonly =3D false) {
      const target =3D this["__v_raw" /* ReactiveFlags.RAW */];
      const rawTarget =3D toRaw(target);
      const rawKey =3D toRaw(key);
      if (!isReadonly) {
          if (key !=3D=3D rawKey) {
              track(rawTarget, "has" /* TrackOpTypes.HAS */, key);
          }
          track(rawTarget, "has" /* TrackOpTypes.HAS */, rawKey);
      }
      return key =3D=3D=3D rawKey
          ? target.has(key)
          : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly =3D false) {
      target =3D target["__v_raw" /* ReactiveFlags.RAW */];
      !isReadonly &amp;&amp; track(toRaw(target), "iterate" /* TrackOpTypes=
.ITERATE */, ITERATE_KEY);
      return Reflect.get(target, 'size', target);
  }
  function add(value) {
      value =3D toRaw(value);
      const target =3D toRaw(this);
      const proto =3D getProto(target);
      const hadKey =3D proto.has.call(target, value);
      if (!hadKey) {
          target.add(value);
          trigger(target, "add" /* TriggerOpTypes.ADD */, value, value);
      }
      return this;
  }
  function set(key, value) {
      value =3D toRaw(value);
      const target =3D toRaw(this);
      const { has, get } =3D getProto(target);
      let hadKey =3D has.call(target, key);
      if (!hadKey) {
          key =3D toRaw(key);
          hadKey =3D has.call(target, key);
      }
      else {
          checkIdentityKeys(target, has, key);
      }
      const oldValue =3D get.call(target, key);
      target.set(key, value);
      if (!hadKey) {
          trigger(target, "add" /* TriggerOpTypes.ADD */, key, value);
      }
      else if (hasChanged(value, oldValue)) {
          trigger(target, "set" /* TriggerOpTypes.SET */, key, value, oldVa=
lue);
      }
      return this;
  }
  function deleteEntry(key) {
      const target =3D toRaw(this);
      const { has, get } =3D getProto(target);
      let hadKey =3D has.call(target, key);
      if (!hadKey) {
          key =3D toRaw(key);
          hadKey =3D has.call(target, key);
      }
      else {
          checkIdentityKeys(target, has, key);
      }
      const oldValue =3D get ? get.call(target, key) : undefined;
      // forward the operation before queueing reactions
      const result =3D target.delete(key);
      if (hadKey) {
          trigger(target, "delete" /* TriggerOpTypes.DELETE */, key, undefi=
ned, oldValue);
      }
      return result;
  }
  function clear() {
      const target =3D toRaw(this);
      const hadItems =3D target.size !=3D=3D 0;
      const oldTarget =3D isMap(target)
              ? new Map(target)
              : new Set(target)
          ;
      // forward the operation before queueing reactions
      const result =3D target.clear();
      if (hadItems) {
          trigger(target, "clear" /* TriggerOpTypes.CLEAR */, undefined, un=
defined, oldTarget);
      }
      return result;
  }
  function createForEach(isReadonly, isShallow) {
      return function forEach(callback, thisArg) {
          const observed =3D this;
          const target =3D observed["__v_raw" /* ReactiveFlags.RAW */];
          const rawTarget =3D toRaw(target);
          const wrap =3D isShallow ? toShallow : isReadonly ? toReadonly : =
toReactive;
          !isReadonly &amp;&amp; track(rawTarget, "iterate" /* TrackOpTypes=
.ITERATE */, ITERATE_KEY);
          return target.forEach((value, key) =3D&gt; {
              // important: make sure the callback is
              // 1. invoked with the reactive map as `this` and 3rd arg
              // 2. the value received should be a corresponding reactive/r=
eadonly.
              return callback.call(thisArg, wrap(value), wrap(key), observe=
d);
          });
      };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
      return function (...args) {
          const target =3D this["__v_raw" /* ReactiveFlags.RAW */];
          const rawTarget =3D toRaw(target);
          const targetIsMap =3D isMap(rawTarget);
          const isPair =3D method =3D=3D=3D 'entries' || (method =3D=3D=3D =
Symbol.iterator &amp;&amp; targetIsMap);
          const isKeyOnly =3D method =3D=3D=3D 'keys' &amp;&amp; targetIsMa=
p;
          const innerIterator =3D target[method](...args);
          const wrap =3D isShallow ? toShallow : isReadonly ? toReadonly : =
toReactive;
          !isReadonly &amp;&amp;
              track(rawTarget, "iterate" /* TrackOpTypes.ITERATE */, isKeyO=
nly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
          // return a wrapped iterator which returns observed versions of t=
he
          // values emitted from the real iterator
          return {
              // iterator protocol
              next() {
                  const { value, done } =3D innerIterator.next();
                  return done
                      ? { value, done }
                      : {
                          value: isPair ? [wrap(value[0]), wrap(value[1])] =
: wrap(value),
                          done
                      };
              },
              // iterable protocol
              [Symbol.iterator]() {
                  return this;
              }
          };
      };
  }
  function createReadonlyMethod(type) {
      return function (...args) {
          {
              const key =3D args[0] ? `on key "${args[0]}" ` : ``;
              console.warn(`${capitalize(type)} operation ${key}failed: tar=
get is readonly.`, toRaw(this));
          }
          return type =3D=3D=3D "delete" /* TriggerOpTypes.DELETE */ ? fals=
e : this;
      };
  }
  function createInstrumentations() {
      const mutableInstrumentations =3D {
          get(key) {
              return get(this, key);
          },
          get size() {
              return size(this);
          },
          has,
          add,
          set,
          delete: deleteEntry,
          clear,
          forEach: createForEach(false, false)
      };
      const shallowInstrumentations =3D {
          get(key) {
              return get(this, key, false, true);
          },
          get size() {
              return size(this);
          },
          has,
          add,
          set,
          delete: deleteEntry,
          clear,
          forEach: createForEach(false, true)
      };
      const readonlyInstrumentations =3D {
          get(key) {
              return get(this, key, true);
          },
          get size() {
              return size(this, true);
          },
          has(key) {
              return has.call(this, key, true);
          },
          add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
          set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
          delete: createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */=
),
          clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
          forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations =3D {
          get(key) {
              return get(this, key, true, true);
          },
          get size() {
              return size(this, true);
          },
          has(key) {
              return has.call(this, key, true);
          },
          add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
          set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
          delete: createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */=
),
          clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
          forEach: createForEach(true, true)
      };
      const iteratorMethods =3D ['keys', 'values', 'entries', Symbol.iterat=
or];
      iteratorMethods.forEach(method =3D&gt; {
          mutableInstrumentations[method] =3D createIterableMethod(method, =
false, false);
          readonlyInstrumentations[method] =3D createIterableMethod(method,=
 true, false);
          shallowInstrumentations[method] =3D createIterableMethod(method, =
false, true);
          shallowReadonlyInstrumentations[method] =3D createIterableMethod(=
method, true, true);
      });
      return [
          mutableInstrumentations,
          readonlyInstrumentations,
          shallowInstrumentations,
          shallowReadonlyInstrumentations
      ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrume=
ntations, shallowReadonlyInstrumentations] =3D /* #__PURE__*/ createInstrum=
entations();
  function createInstrumentationGetter(isReadonly, shallow) {
      const instrumentations =3D shallow
          ? isReadonly
              ? shallowReadonlyInstrumentations
              : shallowInstrumentations
          : isReadonly
              ? readonlyInstrumentations
              : mutableInstrumentations;
      return (target, key, receiver) =3D&gt; {
          if (key =3D=3D=3D "__v_isReactive" /* ReactiveFlags.IS_REACTIVE *=
/) {
              return !isReadonly;
          }
          else if (key =3D=3D=3D "__v_isReadonly" /* ReactiveFlags.IS_READO=
NLY */) {
              return isReadonly;
          }
          else if (key =3D=3D=3D "__v_raw" /* ReactiveFlags.RAW */) {
              return target;
          }
          return Reflect.get(hasOwn(instrumentations, key) &amp;&amp; key i=
n target
              ? instrumentations
              : target, key, receiver);
      };
  }
  const mutableCollectionHandlers =3D {
      get: /*#__PURE__*/ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers =3D {
      get: /*#__PURE__*/ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers =3D {
      get: /*#__PURE__*/ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers =3D {
      get: /*#__PURE__*/ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
      const rawKey =3D toRaw(key);
      if (rawKey !=3D=3D key &amp;&amp; has.call(target, rawKey)) {
          const type =3D toRawType(target);
          console.warn(`Reactive ${type} contains both the raw and reactive=
 ` +
              `versions of the same object${type =3D=3D=3D `Map` ? ` as key=
s` : ``}, ` +
              `which can lead to inconsistencies. ` +
              `Avoid differentiating between the raw and reactive versions =
` +
              `of an object and only use the reactive version if possible.`=
);
      }
  }

  const reactiveMap =3D new WeakMap();
  const shallowReactiveMap =3D new WeakMap();
  const readonlyMap =3D new WeakMap();
  const shallowReadonlyMap =3D new WeakMap();
  function targetTypeMap(rawType) {
      switch (rawType) {
          case 'Object':
          case 'Array':
              return 1 /* TargetType.COMMON */;
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
              return 2 /* TargetType.COLLECTION */;
          default:
              return 0 /* TargetType.INVALID */;
      }
  }
  function getTargetType(value) {
      return value["__v_skip" /* ReactiveFlags.SKIP */] || !Object.isExtens=
ible(value)
          ? 0 /* TargetType.INVALID */
          : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
      // if trying to observe a readonly proxy, return the readonly version=
.
      if (isReadonly(target)) {
          return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCo=
llectionHandlers, reactiveMap);
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only th=
e root
   * level properties are reactive. It also does not auto-unwrap refs (even=
 at the
   * root level).
   */
  function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, s=
hallowCollectionHandlers, shallowReactiveMap);
  }
  /**
   * Creates a readonly copy of the original object. Note the returned copy=
 is not
   * made reactive, but `readonly` can be called on an already reactive obj=
ect.
   */
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyC=
ollectionHandlers, readonlyMap);
  }
  /**
   * Returns a reactive-copy of the original object, where only the root le=
vel
   * properties are readonly, and does NOT unwrap refs nor recursively conv=
ert
   * returned properties.
   * This is used for creating the props proxy object for stateful componen=
ts.
   */
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, sh=
allowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectio=
nHandlers, proxyMap) {
      if (!isObject(target)) {
          {
              console.warn(`value cannot be made reactive: ${String(target)=
}`);
          }
          return target;
      }
      // target is already a Proxy, return it.
      // exception: calling readonly() on a reactive object
      if (target["__v_raw" /* ReactiveFlags.RAW */] &amp;&amp;
          !(isReadonly &amp;&amp; target["__v_isReactive" /* ReactiveFlags.=
IS_REACTIVE */])) {
          return target;
      }
      // target already has corresponding Proxy
      const existingProxy =3D proxyMap.get(target);
      if (existingProxy) {
          return existingProxy;
      }
      // only specific value types can be observed.
      const targetType =3D getTargetType(target);
      if (targetType =3D=3D=3D 0 /* TargetType.INVALID */) {
          return target;
      }
      const proxy =3D new Proxy(target, targetType =3D=3D=3D 2 /* TargetTyp=
e.COLLECTION */ ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
  }
  function isReactive(value) {
      if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
      }
      return !!(value &amp;&amp; value["__v_isReactive" /* ReactiveFlags.IS=
_REACTIVE */]);
  }
  function isReadonly(value) {
      return !!(value &amp;&amp; value["__v_isReadonly" /* ReactiveFlags.IS=
_READONLY */]);
  }
  function isShallow(value) {
      return !!(value &amp;&amp; value["__v_isShallow" /* ReactiveFlags.IS_=
SHALLOW */]);
  }
  function isProxy(value) {
      return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
      const raw =3D observed &amp;&amp; observed["__v_raw" /* ReactiveFlags=
.RAW */];
      return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
      def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
      return value;
  }
  const toReactive =3D (value) =3D&gt; isObject(value) ? reactive(value) : =
value;
  const toReadonly =3D (value) =3D&gt; isObject(value) ? readonly(value) : =
value;

  function trackRefValue(ref) {
      if (shouldTrack &amp;&amp; activeEffect) {
          ref =3D toRaw(ref);
          {
              trackEffects(ref.dep || (ref.dep =3D createDep()), {
                  target: ref,
                  type: "get" /* TrackOpTypes.GET */,
                  key: 'value'
              });
          }
      }
  }
  function triggerRefValue(ref, newVal) {
      ref =3D toRaw(ref);
      const dep =3D ref.dep;
      if (dep) {
          {
              triggerEffects(dep, {
                  target: ref,
                  type: "set" /* TriggerOpTypes.SET */,
                  key: 'value',
                  newValue: newVal
              });
          }
      }
  }
  function isRef(r) {
      return !!(r &amp;&amp; r.__v_isRef =3D=3D=3D true);
  }
  function ref(value) {
      return createRef(value, false);
  }
  function shallowRef(value) {
      return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
          return rawValue;
      }
      return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
      constructor(value, __v_isShallow) {
          this.__v_isShallow =3D __v_isShallow;
          this.dep =3D undefined;
          this.__v_isRef =3D true;
          this._rawValue =3D __v_isShallow ? value : toRaw(value);
          this._value =3D __v_isShallow ? value : toReactive(value);
      }
      get value() {
          trackRefValue(this);
          return this._value;
      }
      set value(newVal) {
          const useDirectValue =3D this.__v_isShallow || isShallow(newVal) =
|| isReadonly(newVal);
          newVal =3D useDirectValue ? newVal : toRaw(newVal);
          if (hasChanged(newVal, this._rawValue)) {
              this._rawValue =3D newVal;
              this._value =3D useDirectValue ? newVal : toReactive(newVal);
              triggerRefValue(this, newVal);
          }
      }
  }
  function triggerRef(ref) {
      triggerRefValue(ref, ref.value );
  }
  function unref(ref) {
      return isRef(ref) ? ref.value : ref;
  }
  const shallowUnwrapHandlers =3D {
      get: (target, key, receiver) =3D&gt; unref(Reflect.get(target, key, r=
eceiver)),
      set: (target, key, value, receiver) =3D&gt; {
          const oldValue =3D target[key];
          if (isRef(oldValue) &amp;&amp; !isRef(value)) {
              oldValue.value =3D value;
              return true;
          }
          else {
              return Reflect.set(target, key, value, receiver);
          }
      }
  };
  function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs)
          ? objectWithRefs
          : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class CustomRefImpl {
      constructor(factory) {
          this.dep =3D undefined;
          this.__v_isRef =3D true;
          const { get, set } =3D factory(() =3D&gt; trackRefValue(this), ()=
 =3D&gt; triggerRefValue(this));
          this._get =3D get;
          this._set =3D set;
      }
      get value() {
          return this._get();
      }
      set value(newVal) {
          this._set(newVal);
      }
  }
  function customRef(factory) {
      return new CustomRefImpl(factory);
  }
  function toRefs(object) {
      if (!isProxy(object)) {
          console.warn(`toRefs() expects a reactive object but received a p=
lain one.`);
      }
      const ret =3D isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
          ret[key] =3D toRef(object, key);
      }
      return ret;
  }
  class ObjectRefImpl {
      constructor(_object, _key, _defaultValue) {
          this._object =3D _object;
          this._key =3D _key;
          this._defaultValue =3D _defaultValue;
          this.__v_isRef =3D true;
      }
      get value() {
          const val =3D this._object[this._key];
          return val =3D=3D=3D undefined ? this._defaultValue : val;
      }
      set value(newVal) {
          this._object[this._key] =3D newVal;
      }
      get dep() {
          return getDepFromReactive(toRaw(this._object), this._key);
      }
  }
  function toRef(object, key, defaultValue) {
      const val =3D object[key];
      return isRef(val)
          ? val
          : new ObjectRefImpl(object, key, defaultValue);
  }

  var _a;
  class ComputedRefImpl {
      constructor(getter, _setter, isReadonly, isSSR) {
          this._setter =3D _setter;
          this.dep =3D undefined;
          this.__v_isRef =3D true;
          this[_a] =3D false;
          this._dirty =3D true;
          this.effect =3D new ReactiveEffect(getter, () =3D&gt; {
              if (!this._dirty) {
                  this._dirty =3D true;
                  triggerRefValue(this);
              }
          });
          this.effect.computed =3D this;
          this.effect.active =3D this._cacheable =3D !isSSR;
          this["__v_isReadonly" /* ReactiveFlags.IS_READONLY */] =3D isRead=
only;
      }
      get value() {
          // the computed ref may get wrapped by other proxies e.g. readonl=
y() #3376
          const self =3D toRaw(this);
          trackRefValue(self);
          if (self._dirty || !self._cacheable) {
              self._dirty =3D false;
              self._value =3D self.effect.run();
          }
          return self._value;
      }
      set value(newValue) {
          this._setter(newValue);
      }
  }
  _a =3D "__v_isReadonly" /* ReactiveFlags.IS_READONLY */;
  function computed$1(getterOrOptions, debugOptions, isSSR =3D false) {
      let getter;
      let setter;
      const onlyGetter =3D isFunction(getterOrOptions);
      if (onlyGetter) {
          getter =3D getterOrOptions;
          setter =3D () =3D&gt; {
                  console.warn('Write operation failed: computed value is r=
eadonly');
              }
              ;
      }
      else {
          getter =3D getterOrOptions.get;
          setter =3D getterOrOptions.set;
      }
      const cRef =3D new ComputedRefImpl(getter, setter, onlyGetter || !set=
ter, isSSR);
      if (debugOptions &amp;&amp; !isSSR) {
          cRef.effect.onTrack =3D debugOptions.onTrack;
          cRef.effect.onTrigger =3D debugOptions.onTrigger;
      }
      return cRef;
  }

  const stack =3D [];
  function pushWarningContext(vnode) {
      stack.push(vnode);
  }
  function popWarningContext() {
      stack.pop();
  }
  function warn(msg, ...args) {
      // avoid props formatting or warn handler tracking deps that might be=
 mutated
      // during patch, leading to infinite recursion.
      pauseTracking();
      const instance =3D stack.length ? stack[stack.length - 1].component :=
 null;
      const appWarnHandler =3D instance &amp;&amp; instance.appContext.conf=
ig.warnHandler;
      const trace =3D getComponentTrace();
      if (appWarnHandler) {
          callWithErrorHandling(appWarnHandler, instance, 11 /* ErrorCodes.=
APP_WARN_HANDLER */, [
              msg + args.join(''),
              instance &amp;&amp; instance.proxy,
              trace
                  .map(({ vnode }) =3D&gt; `at &lt;${formatComponentName(in=
stance, vnode.type)}&gt;`)
                  .join('\n'),
              trace
          ]);
      }
      else {
          const warnArgs =3D [`[Vue warn]: ${msg}`, ...args];
          /* istanbul ignore if */
          if (trace.length &amp;&amp;
              // avoid spamming console during tests
              !false) {
              warnArgs.push(`\n`, ...formatTrace(trace));
          }
          console.warn(...warnArgs);
      }
      resetTracking();
  }
  function getComponentTrace() {
      let currentVNode =3D stack[stack.length - 1];
      if (!currentVNode) {
          return [];
      }
      // we can't just use the stack because it will be incomplete during u=
pdates
      // that did not start from the root. Re-construct the parent chain us=
ing
      // instance parent pointers.
      const normalizedStack =3D [];
      while (currentVNode) {
          const last =3D normalizedStack[0];
          if (last &amp;&amp; last.vnode =3D=3D=3D currentVNode) {
              last.recurseCount++;
          }
          else {
              normalizedStack.push({
                  vnode: currentVNode,
                  recurseCount: 0
              });
          }
          const parentInstance =3D currentVNode.component &amp;&amp; curren=
tVNode.component.parent;
          currentVNode =3D parentInstance &amp;&amp; parentInstance.vnode;
      }
      return normalizedStack;
  }
  /* istanbul ignore next */
  function formatTrace(trace) {
      const logs =3D [];
      trace.forEach((entry, i) =3D&gt; {
          logs.push(...(i =3D=3D=3D 0 ? [] : [`\n`]), ...formatTraceEntry(e=
ntry));
      });
      return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
      const postfix =3D recurseCount &gt; 0 ? `... (${recurseCount} recursi=
ve calls)` : ``;
      const isRoot =3D vnode.component ? vnode.component.parent =3D=3D null=
 : false;
      const open =3D ` at &lt;${formatComponentName(vnode.component, vnode.=
type, isRoot)}`;
      const close =3D `&gt;` + postfix;
      return vnode.props
          ? [open, ...formatProps(vnode.props), close]
          : [open + close];
  }
  /* istanbul ignore next */
  function formatProps(props) {
      const res =3D [];
      const keys =3D Object.keys(props);
      keys.slice(0, 3).forEach(key =3D&gt; {
          res.push(...formatProp(key, props[key]));
      });
      if (keys.length &gt; 3) {
          res.push(` ...`);
      }
      return res;
  }
  /* istanbul ignore next */
  function formatProp(key, value, raw) {
      if (isString(value)) {
          value =3D JSON.stringify(value);
          return raw ? value : [`${key}=3D${value}`];
      }
      else if (typeof value =3D=3D=3D 'number' ||
          typeof value =3D=3D=3D 'boolean' ||
          value =3D=3D null) {
          return raw ? value : [`${key}=3D${value}`];
      }
      else if (isRef(value)) {
          value =3D formatProp(key, toRaw(value.value), true);
          return raw ? value : [`${key}=3DRef&lt;`, value, `&gt;`];
      }
      else if (isFunction(value)) {
          return [`${key}=3Dfn${value.name ? `&lt;${value.name}&gt;` : ``}`=
];
      }
      else {
          value =3D toRaw(value);
          return raw ? value : [`${key}=3D`, value];
      }
  }
  /**
   * @internal
   */
  function assertNumber(val, type) {
      if (val =3D=3D=3D undefined) {
          return;
      }
      else if (typeof val !=3D=3D 'number') {
          warn(`${type} is not a valid number - ` + `got ${JSON.stringify(v=
al)}.`);
      }
      else if (isNaN(val)) {
          warn(`${type} is NaN - ` + 'the duration expression might be inco=
rrect.');
      }
  }

  const ErrorTypeStrings =3D {
      ["sp" /* LifecycleHooks.SERVER_PREFETCH */]: 'serverPrefetch hook',
      ["bc" /* LifecycleHooks.BEFORE_CREATE */]: 'beforeCreate hook',
      ["c" /* LifecycleHooks.CREATED */]: 'created hook',
      ["bm" /* LifecycleHooks.BEFORE_MOUNT */]: 'beforeMount hook',
      ["m" /* LifecycleHooks.MOUNTED */]: 'mounted hook',
      ["bu" /* LifecycleHooks.BEFORE_UPDATE */]: 'beforeUpdate hook',
      ["u" /* LifecycleHooks.UPDATED */]: 'updated',
      ["bum" /* LifecycleHooks.BEFORE_UNMOUNT */]: 'beforeUnmount hook',
      ["um" /* LifecycleHooks.UNMOUNTED */]: 'unmounted hook',
      ["a" /* LifecycleHooks.ACTIVATED */]: 'activated hook',
      ["da" /* LifecycleHooks.DEACTIVATED */]: 'deactivated hook',
      ["ec" /* LifecycleHooks.ERROR_CAPTURED */]: 'errorCaptured hook',
      ["rtc" /* LifecycleHooks.RENDER_TRACKED */]: 'renderTracked hook',
      ["rtg" /* LifecycleHooks.RENDER_TRIGGERED */]: 'renderTriggered hook'=
,
      [0 /* ErrorCodes.SETUP_FUNCTION */]: 'setup function',
      [1 /* ErrorCodes.RENDER_FUNCTION */]: 'render function',
      [2 /* ErrorCodes.WATCH_GETTER */]: 'watcher getter',
      [3 /* ErrorCodes.WATCH_CALLBACK */]: 'watcher callback',
      [4 /* ErrorCodes.WATCH_CLEANUP */]: 'watcher cleanup function',
      [5 /* ErrorCodes.NATIVE_EVENT_HANDLER */]: 'native event handler',
      [6 /* ErrorCodes.COMPONENT_EVENT_HANDLER */]: 'component event handle=
r',
      [7 /* ErrorCodes.VNODE_HOOK */]: 'vnode hook',
      [8 /* ErrorCodes.DIRECTIVE_HOOK */]: 'directive hook',
      [9 /* ErrorCodes.TRANSITION_HOOK */]: 'transition hook',
      [10 /* ErrorCodes.APP_ERROR_HANDLER */]: 'app errorHandler',
      [11 /* ErrorCodes.APP_WARN_HANDLER */]: 'app warnHandler',
      [12 /* ErrorCodes.FUNCTION_REF */]: 'ref function',
      [13 /* ErrorCodes.ASYNC_COMPONENT_LOADER */]: 'async component loader=
',
      [14 /* ErrorCodes.SCHEDULER */]: 'scheduler flush. This is likely a V=
ue internals bug. ' +
          'Please open an issue at https://new-issue.vuejs.org/?repo=3Dvuej=
s/core'
  };
  function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
          res =3D args ? fn(...args) : fn();
      }
      catch (err) {
          handleError(err, instance, type);
      }
      return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (isFunction(fn)) {
          const res =3D callWithErrorHandling(fn, instance, type, args);
          if (res &amp;&amp; isPromise(res)) {
              res.catch(err =3D&gt; {
                  handleError(err, instance, type);
              });
          }
          return res;
      }
      const values =3D [];
      for (let i =3D 0; i &lt; fn.length; i++) {
          values.push(callWithAsyncErrorHandling(fn[i], instance, type, arg=
s));
      }
      return values;
  }
  function handleError(err, instance, type, throwInDev =3D true) {
      const contextVNode =3D instance ? instance.vnode : null;
      if (instance) {
          let cur =3D instance.parent;
          // the exposed instance is the render proxy to keep it consistent=
 with 2.x
          const exposedInstance =3D instance.proxy;
          // in production the hook receives only the error code
          const errorInfo =3D ErrorTypeStrings[type] ;
          while (cur) {
              const errorCapturedHooks =3D cur.ec;
              if (errorCapturedHooks) {
                  for (let i =3D 0; i &lt; errorCapturedHooks.length; i++) =
{
                      if (errorCapturedHooks[i](err, exposedInstance, error=
Info) =3D=3D=3D false) {
                          return;
                      }
                  }
              }
              cur =3D cur.parent;
          }
          // app-level handling
          const appErrorHandler =3D instance.appContext.config.errorHandler=
;
          if (appErrorHandler) {
              callWithErrorHandling(appErrorHandler, null, 10 /* ErrorCodes=
.APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
              return;
          }
      }
      logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev =3D true) {
      {
          const info =3D ErrorTypeStrings[type];
          if (contextVNode) {
              pushWarningContext(contextVNode);
          }
          warn(`Unhandled error${info ? ` during execution of ${info}` : ``=
}`);
          if (contextVNode) {
              popWarningContext();
          }
          // crash in dev by default so it's more noticeable
          if (throwInDev) {
              throw err;
          }
          else {
              console.error(err);
          }
      }
  }

  let isFlushing =3D false;
  let isFlushPending =3D false;
  const queue =3D [];
  let flushIndex =3D 0;
  const pendingPostFlushCbs =3D [];
  let activePostFlushCbs =3D null;
  let postFlushIndex =3D 0;
  const resolvedPromise =3D /*#__PURE__*/ Promise.resolve();
  let currentFlushPromise =3D null;
  const RECURSION_LIMIT =3D 100;
  function nextTick(fn) {
      const p =3D currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
  }
  // #2768
  // Use binary-search to find a suitable position in the queue,
  // so that the queue maintains the increasing order of job's id,
  // which can prevent the job from being skipped and also can avoid repeat=
ed patching.
  function findInsertionIndex(id) {
      // the start index should be `flushIndex + 1`
      let start =3D flushIndex + 1;
      let end =3D queue.length;
      while (start &lt; end) {
          const middle =3D (start + end) &gt;&gt;&gt; 1;
          const middleJobId =3D getId(queue[middle]);
          middleJobId &lt; id ? (start =3D middle + 1) : (end =3D middle);
      }
      return start;
  }
  function queueJob(job) {
      // the dedupe search uses the startIndex argument of Array.includes()
      // by default the search index includes the current job that is being=
 run
      // so it cannot recursively trigger itself again.
      // if the job is a watch() callback, the search will start with a +1 =
index to
      // allow it recursively trigger itself - it is the user's responsibil=
ity to
      // ensure it doesn't end up in an infinite loop.
      if (!queue.length ||
          !queue.includes(job, isFlushing &amp;&amp; job.allowRecurse ? flu=
shIndex + 1 : flushIndex)) {
          if (job.id =3D=3D null) {
              queue.push(job);
          }
          else {
              queue.splice(findInsertionIndex(job.id), 0, job);
          }
          queueFlush();
      }
  }
  function queueFlush() {
      if (!isFlushing &amp;&amp; !isFlushPending) {
          isFlushPending =3D true;
          currentFlushPromise =3D resolvedPromise.then(flushJobs);
      }
  }
  function invalidateJob(job) {
      const i =3D queue.indexOf(job);
      if (i &gt; flushIndex) {
          queue.splice(i, 1);
      }
  }
  function queuePostFlushCb(cb) {
      if (!isArray(cb)) {
          if (!activePostFlushCbs ||
              !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushI=
ndex + 1 : postFlushIndex)) {
              pendingPostFlushCbs.push(cb);
          }
      }
      else {
          // if cb is an array, it is a component lifecycle hook which can =
only be
          // triggered by a job, which is already deduped in the main queue=
, so
          // we can skip duplicate check here to improve perf
          pendingPostFlushCbs.push(...cb);
      }
      queueFlush();
  }
  function flushPreFlushCbs(seen,=20
  // if currently flushing, skip the current job itself
  i =3D isFlushing ? flushIndex + 1 : 0) {
      {
          seen =3D seen || new Map();
      }
      for (; i &lt; queue.length; i++) {
          const cb =3D queue[i];
          if (cb &amp;&amp; cb.pre) {
              if (checkRecursiveUpdates(seen, cb)) {
                  continue;
              }
              queue.splice(i, 1);
              i--;
              cb();
          }
      }
  }
  function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
          const deduped =3D [...new Set(pendingPostFlushCbs)];
          pendingPostFlushCbs.length =3D 0;
          // #1947 already has active queue, nested flushPostFlushCbs call
          if (activePostFlushCbs) {
              activePostFlushCbs.push(...deduped);
              return;
          }
          activePostFlushCbs =3D deduped;
          {
              seen =3D seen || new Map();
          }
          activePostFlushCbs.sort((a, b) =3D&gt; getId(a) - getId(b));
          for (postFlushIndex =3D 0; postFlushIndex &lt; activePostFlushCbs=
.length; postFlushIndex++) {
              if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushI=
ndex])) {
                  continue;
              }
              activePostFlushCbs[postFlushIndex]();
          }
          activePostFlushCbs =3D null;
          postFlushIndex =3D 0;
      }
  }
  const getId =3D (job) =3D&gt; job.id =3D=3D null ? Infinity : job.id;
  const comparator =3D (a, b) =3D&gt; {
      const diff =3D getId(a) - getId(b);
      if (diff =3D=3D=3D 0) {
          if (a.pre &amp;&amp; !b.pre)
              return -1;
          if (b.pre &amp;&amp; !a.pre)
              return 1;
      }
      return diff;
  };
  function flushJobs(seen) {
      isFlushPending =3D false;
      isFlushing =3D true;
      {
          seen =3D seen || new Map();
      }
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is=
 always
      //    created before the child so its render effect will have smaller
      //    priority number)
      // 2. If a component is unmounted during a parent component's update,
      //    its update can be skipped.
      queue.sort(comparator);
      // conditional usage of checkRecursiveUpdate must be determined out o=
f
      // try ... catch block since Rollup by default de-optimizes treeshaki=
ng
      // inside try-catch. This can leave all warning code unshaked. Althou=
gh
      // they would get eventually shaken by a minifier like terser, some m=
inifiers
      // would fail to do that (e.g. https://github.com/evanw/esbuild/issue=
s/1610)
      const check =3D (job) =3D&gt; checkRecursiveUpdates(seen, job)
          ;
      try {
          for (flushIndex =3D 0; flushIndex &lt; queue.length; flushIndex++=
) {
              const job =3D queue[flushIndex];
              if (job &amp;&amp; job.active !=3D=3D false) {
                  if (true &amp;&amp; check(job)) {
                      continue;
                  }
                  // console.log(`running:`, job.id)
                  callWithErrorHandling(job, null, 14 /* ErrorCodes.SCHEDUL=
ER */);
              }
          }
      }
      finally {
          flushIndex =3D 0;
          queue.length =3D 0;
          flushPostFlushCbs(seen);
          isFlushing =3D false;
          currentFlushPromise =3D null;
          // some postFlushCb queued jobs!
          // keep flushing until it drains.
          if (queue.length || pendingPostFlushCbs.length) {
              flushJobs(seen);
          }
      }
  }
  function checkRecursiveUpdates(seen, fn) {
      if (!seen.has(fn)) {
          seen.set(fn, 1);
      }
      else {
          const count =3D seen.get(fn);
          if (count &gt; RECURSION_LIMIT) {
              const instance =3D fn.ownerInstance;
              const componentName =3D instance &amp;&amp; getComponentName(=
instance.type);
              warn(`Maximum recursive updates exceeded${componentName ? ` i=
n component &lt;${componentName}&gt;` : ``}. ` +
                  `This means you have a reactive effect that is mutating i=
ts own ` +
                  `dependencies and thus recursively triggering itself. Pos=
sible sources ` +
                  `include component template, render function, updated hoo=
k or ` +
                  `watcher source function.`);
              return true;
          }
          else {
              seen.set(fn, count + 1);
          }
      }
  }

  /* eslint-disable no-restricted-globals */
  let isHmrUpdating =3D false;
  const hmrDirtyComponents =3D new Set();
  // Expose the HMR runtime on the global object
  // This makes it entirely tree-shakable without polluting the exports and=
 makes
  // it easier to be used in toolings like vue-loader
  // Note: for a component to be eligible for HMR it also needs the __hmrId=
 option
  // to be set so that its instances can be registered / removed.
  {
      getGlobalThis().__VUE_HMR_RUNTIME__ =3D {
          createRecord: tryWrap(createRecord),
          rerender: tryWrap(rerender),
          reload: tryWrap(reload)
      };
  }
  const map =3D new Map();
  function registerHMR(instance) {
      const id =3D instance.type.__hmrId;
      let record =3D map.get(id);
      if (!record) {
          createRecord(id, instance.type);
          record =3D map.get(id);
      }
      record.instances.add(instance);
  }
  function unregisterHMR(instance) {
      map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
      if (map.has(id)) {
          return false;
      }
      map.set(id, {
          initialDef: normalizeClassComponent(initialDef),
          instances: new Set()
      });
      return true;
  }
  function normalizeClassComponent(component) {
      return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
      const record =3D map.get(id);
      if (!record) {
          return;
      }
      // update initial record (for not-yet-rendered component)
      record.initialDef.render =3D newRender;
      [...record.instances].forEach(instance =3D&gt; {
          if (newRender) {
              instance.render =3D newRender;
              normalizeClassComponent(instance.type).render =3D newRender;
          }
          instance.renderCache =3D [];
          // this flag forces child components with slot content to update
          isHmrUpdating =3D true;
          instance.update();
          isHmrUpdating =3D false;
      });
  }
  function reload(id, newComp) {
      const record =3D map.get(id);
      if (!record)
          return;
      newComp =3D normalizeClassComponent(newComp);
      // update initial def (for not-yet-rendered components)
      updateComponentDef(record.initialDef, newComp);
      // create a snapshot which avoids the set being mutated during update=
s
      const instances =3D [...record.instances];
      for (const instance of instances) {
          const oldComp =3D normalizeClassComponent(instance.type);
          if (!hmrDirtyComponents.has(oldComp)) {
              // 1. Update existing comp definition to match new one
              if (oldComp !=3D=3D record.initialDef) {
                  updateComponentDef(oldComp, newComp);
              }
              // 2. mark definition dirty. This forces the renderer to repl=
ace the
              // component on patch.
              hmrDirtyComponents.add(oldComp);
          }
          // 3. invalidate options resolution cache
          instance.appContext.optionsCache.delete(instance.type);
          // 4. actually update
          if (instance.ceReload) {
              // custom element
              hmrDirtyComponents.add(oldComp);
              instance.ceReload(newComp.styles);
              hmrDirtyComponents.delete(oldComp);
          }
          else if (instance.parent) {
              // 4. Force the parent instance to re-render. This will cause=
 all updated
              // components to be unmounted and re-mounted. Queue the updat=
e so that we
              // don't end up forcing the same parent to re-render multiple=
 times.
              queueJob(instance.parent.update);
          }
          else if (instance.appContext.reload) {
              // root instance mounted via createApp() has a reload method
              instance.appContext.reload();
          }
          else if (typeof window !=3D=3D 'undefined') {
              // root instance inside tree created via raw render(). Force =
reload.
              window.location.reload();
          }
          else {
              console.warn('[HMR] Root or manually mounted instance modifie=
d. Full reload required.');
          }
      }
      // 5. make sure to cleanup dirty hmr components after update
      queuePostFlushCb(() =3D&gt; {
          for (const instance of instances) {
              hmrDirtyComponents.delete(normalizeClassComponent(instance.ty=
pe));
          }
      });
  }
  function updateComponentDef(oldComp, newComp) {
      extend(oldComp, newComp);
      for (const key in oldComp) {
          if (key !=3D=3D '__file' &amp;&amp; !(key in newComp)) {
              delete oldComp[key];
          }
      }
  }
  function tryWrap(fn) {
      return (id, arg) =3D&gt; {
          try {
              return fn(id, arg);
          }
          catch (e) {
              console.error(e);
              console.warn(`[HMR] Something went wrong during Vue component=
 hot-reload. ` +
                  `Full reload required.`);
          }
      };
  }

  exports.devtools =3D void 0;
  let buffer =3D [];
  let devtoolsNotInstalled =3D false;
  function emit$1(event, ...args) {
      if (exports.devtools) {
          exports.devtools.emit(event, ...args);
      }
      else if (!devtoolsNotInstalled) {
          buffer.push({ event, args });
      }
  }
  function setDevtoolsHook(hook, target) {
      var _a, _b;
      exports.devtools =3D hook;
      if (exports.devtools) {
          exports.devtools.enabled =3D true;
          buffer.forEach(({ event, args }) =3D&gt; exports.devtools.emit(ev=
ent, ...args));
          buffer =3D [];
      }
      else if (
      // handle late devtools injection - only do this if we are in an actu=
al
      // browser environment to avoid the timer handle stalling test runner=
 exit
      // (#4815)
      typeof window !=3D=3D 'undefined' &amp;&amp;
          // some envs mock window but not fully
          window.HTMLElement &amp;&amp;
          // also exclude jsdom
          !((_b =3D (_a =3D window.navigator) =3D=3D=3D null || _a =3D=3D=
=3D void 0 ? void 0 : _a.userAgent) =3D=3D=3D null || _b =3D=3D=3D void 0 ?=
 void 0 : _b.includes('jsdom'))) {
          const replay =3D (target.__VUE_DEVTOOLS_HOOK_REPLAY__ =3D
              target.__VUE_DEVTOOLS_HOOK_REPLAY__ || []);
          replay.push((newHook) =3D&gt; {
              setDevtoolsHook(newHook, target);
          });
          // clear buffer after 3s - the user probably doesn't have devtool=
s installed
          // at all, and keeping the buffer will cause memory leaks (#4738)
          setTimeout(() =3D&gt; {
              if (!exports.devtools) {
                  target.__VUE_DEVTOOLS_HOOK_REPLAY__ =3D null;
                  devtoolsNotInstalled =3D true;
                  buffer =3D [];
              }
          }, 3000);
      }
      else {
          // non-browser env, assume not installed
          devtoolsNotInstalled =3D true;
          buffer =3D [];
      }
  }
  function devtoolsInitApp(app, version) {
      emit$1("app:init" /* DevtoolsHooks.APP_INIT */, app, version, {
          Fragment,
          Text,
          Comment,
          Static
      });
  }
  function devtoolsUnmountApp(app) {
      emit$1("app:unmount" /* DevtoolsHooks.APP_UNMOUNT */, app);
  }
  const devtoolsComponentAdded =3D /*#__PURE__*/ createDevtoolsComponentHoo=
k("component:added" /* DevtoolsHooks.COMPONENT_ADDED */);
  const devtoolsComponentUpdated =3D=20
  /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* Devtools=
Hooks.COMPONENT_UPDATED */);
  const _devtoolsComponentRemoved =3D /*#__PURE__*/ createDevtoolsComponent=
Hook("component:removed" /* DevtoolsHooks.COMPONENT_REMOVED */);
  const devtoolsComponentRemoved =3D (component) =3D&gt; {
      if (exports.devtools &amp;&amp;
          typeof exports.devtools.cleanupBuffer =3D=3D=3D 'function' &amp;&=
amp;
          // remove the component if it wasn't buffered
          !exports.devtools.cleanupBuffer(component)) {
          _devtoolsComponentRemoved(component);
      }
  };
  function createDevtoolsComponentHook(hook) {
      return (component) =3D&gt; {
          emit$1(hook, component.appContext.app, component.uid, component.p=
arent ? component.parent.uid : undefined, component);
      };
  }
  const devtoolsPerfStart =3D /*#__PURE__*/ createDevtoolsPerformanceHook("=
perf:start" /* DevtoolsHooks.PERFORMANCE_START */);
  const devtoolsPerfEnd =3D /*#__PURE__*/ createDevtoolsPerformanceHook("pe=
rf:end" /* DevtoolsHooks.PERFORMANCE_END */);
  function createDevtoolsPerformanceHook(hook) {
      return (component, type, time) =3D&gt; {
          emit$1(hook, component.appContext.app, component.uid, component, =
type, time);
      };
  }
  function devtoolsComponentEmit(component, event, params) {
      emit$1("component:emit" /* DevtoolsHooks.COMPONENT_EMIT */, component=
.appContext.app, component, event, params);
  }

  function emit(instance, event, ...rawArgs) {
      if (instance.isUnmounted)
          return;
      const props =3D instance.vnode.props || EMPTY_OBJ;
      {
          const { emitsOptions, propsOptions: [propsOptions] } =3D instance=
;
          if (emitsOptions) {
              if (!(event in emitsOptions) &amp;&amp;
                  !(false )) {
                  if (!propsOptions || !(toHandlerKey(event) in propsOption=
s)) {
                      warn(`Component emitted event "${event}" but it is ne=
ither declared in ` +
                          `the emits option nor as an "${toHandlerKey(event=
)}" prop.`);
                  }
              }
              else {
                  const validator =3D emitsOptions[event];
                  if (isFunction(validator)) {
                      const isValid =3D validator(...rawArgs);
                      if (!isValid) {
                          warn(`Invalid event arguments: event validation f=
ailed for event "${event}".`);
                      }
                  }
              }
          }
      }
      let args =3D rawArgs;
      const isModelListener =3D event.startsWith('update:');
      // for v-model update:xxx events, apply modifiers on args
      const modelArg =3D isModelListener &amp;&amp; event.slice(7);
      if (modelArg &amp;&amp; modelArg in props) {
          const modifiersKey =3D `${modelArg =3D=3D=3D 'modelValue' ? 'mode=
l' : modelArg}Modifiers`;
          const { number, trim } =3D props[modifiersKey] || EMPTY_OBJ;
          if (trim) {
              args =3D rawArgs.map(a =3D&gt; (isString(a) ? a.trim() : a));
          }
          if (number) {
              args =3D rawArgs.map(looseToNumber);
          }
      }
      {
          devtoolsComponentEmit(instance, event, args);
      }
      {
          const lowerCaseEvent =3D event.toLowerCase();
          if (lowerCaseEvent !=3D=3D event &amp;&amp; props[toHandlerKey(lo=
werCaseEvent)]) {
              warn(`Event "${lowerCaseEvent}" is emitted in component ` +
                  `${formatComponentName(instance, instance.type)} but the =
handler is registered for "${event}". ` +
                  `Note that HTML attributes are case-insensitive and you c=
annot use ` +
                  `v-on to listen to camelCase events when using in-DOM tem=
plates. ` +
                  `You should probably use "${hyphenate(event)}" instead of=
 "${event}".`);
          }
      }
      let handlerName;
      let handler =3D props[(handlerName =3D toHandlerKey(event))] ||
          // also try camelCase event handler (#2249)
          props[(handlerName =3D toHandlerKey(camelize(event)))];
      // for v-model update:xxx events, also trigger kebab-case equivalent
      // for props passed via kebab-case
      if (!handler &amp;&amp; isModelListener) {
          handler =3D props[(handlerName =3D toHandlerKey(hyphenate(event))=
)];
      }
      if (handler) {
          callWithAsyncErrorHandling(handler, instance, 6 /* ErrorCodes.COM=
PONENT_EVENT_HANDLER */, args);
      }
      const onceHandler =3D props[handlerName + `Once`];
      if (onceHandler) {
          if (!instance.emitted) {
              instance.emitted =3D {};
          }
          else if (instance.emitted[handlerName]) {
              return;
          }
          instance.emitted[handlerName] =3D true;
          callWithAsyncErrorHandling(onceHandler, instance, 6 /* ErrorCodes=
.COMPONENT_EVENT_HANDLER */, args);
      }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin =3D false) {
      const cache =3D appContext.emitsCache;
      const cached =3D cache.get(comp);
      if (cached !=3D=3D undefined) {
          return cached;
      }
      const raw =3D comp.emits;
      let normalized =3D {};
      // apply mixin/extends props
      let hasExtends =3D false;
      if (!isFunction(comp)) {
          const extendEmits =3D (raw) =3D&gt; {
              const normalizedFromExtend =3D normalizeEmitsOptions(raw, app=
Context, true);
              if (normalizedFromExtend) {
                  hasExtends =3D true;
                  extend(normalized, normalizedFromExtend);
              }
          };
          if (!asMixin &amp;&amp; appContext.mixins.length) {
              appContext.mixins.forEach(extendEmits);
          }
          if (comp.extends) {
              extendEmits(comp.extends);
          }
          if (comp.mixins) {
              comp.mixins.forEach(extendEmits);
          }
      }
      if (!raw &amp;&amp; !hasExtends) {
          if (isObject(comp)) {
              cache.set(comp, null);
          }
          return null;
      }
      if (isArray(raw)) {
          raw.forEach(key =3D&gt; (normalized[key] =3D null));
      }
      else {
          extend(normalized, raw);
      }
      if (isObject(comp)) {
          cache.set(comp, normalized);
      }
      return normalized;
  }
  // Check if an incoming prop key is a declared emit event listener.
  // e.g. With `emits: { click: null }`, props named `onClick` and `onclick=
` are
  // both considered matched listeners.
  function isEmitListener(options, key) {
      if (!options || !isOn(key)) {
          return false;
      }
      key =3D key.slice(2).replace(/Once$/, '');
      return (hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
          hasOwn(options, hyphenate(key)) ||
          hasOwn(options, key));
  }

  /**
   * mark the current rendering instance for asset resolution (e.g.
   * resolveComponent, resolveDirective) during render
   */
  let currentRenderingInstance =3D null;
  let currentScopeId =3D null;
  /**
   * Note: rendering calls maybe nested. The function returns the parent re=
ndering
   * instance if present, which should be restored after the render is done=
:
   *
   * ```js
   * const prev =3D setCurrentRenderingInstance(i)
   * // ...render
   * setCurrentRenderingInstance(prev)
   * ```
   */
  function setCurrentRenderingInstance(instance) {
      const prev =3D currentRenderingInstance;
      currentRenderingInstance =3D instance;
      currentScopeId =3D (instance &amp;&amp; instance.type.__scopeId) || n=
ull;
      return prev;
  }
  /**
   * Set scope id when creating hoisted vnodes.
   * @private compiler helper
   */
  function pushScopeId(id) {
      currentScopeId =3D id;
  }
  /**
   * Technically we no longer need this after 3.0.8 but we need to keep the=
 same
   * API for backwards compat w/ code generated by compilers.
   * @private
   */
  function popScopeId() {
      currentScopeId =3D null;
  }
  /**
   * Only for backwards compat
   * @private
   */
  const withScopeId =3D (_id) =3D&gt; withCtx;
  /**
   * Wrap a slot function to memoize current rendering instance
   * @private compiler helper
   */
  function withCtx(fn, ctx =3D currentRenderingInstance, isNonScopedSlot //=
 false only
  ) {
      if (!ctx)
          return fn;
      // already normalized
      if (fn._n) {
          return fn;
      }
      const renderFnWithContext =3D (...args) =3D&gt; {
          // If a user calls a compiled slot inside a template expression (=
#1745), it
          // can mess up block tracking, so by default we disable block tra=
cking and
          // force bail out when invoking a compiled slot (indicated by the=
 ._d flag).
          // This isn't necessary if rendering a compiled `&lt;slot&gt;`, s=
o we flip the
          // ._d flag off when invoking the wrapped fn inside `renderSlot`.
          if (renderFnWithContext._d) {
              setBlockTracking(-1);
          }
          const prevInstance =3D setCurrentRenderingInstance(ctx);
          let res;
          try {
              res =3D fn(...args);
          }
          finally {
              setCurrentRenderingInstance(prevInstance);
              if (renderFnWithContext._d) {
                  setBlockTracking(1);
              }
          }
          {
              devtoolsComponentUpdated(ctx);
          }
          return res;
      };
      // mark normalized to avoid duplicated wrapping
      renderFnWithContext._n =3D true;
      // mark this as compiled by default
      // this is used in vnode.ts -&gt; normalizeChildren() to set the slot
      // rendering flag.
      renderFnWithContext._c =3D true;
      // disable block tracking by default
      renderFnWithContext._d =3D true;
      return renderFnWithContext;
  }

  /**
   * dev only flag to track whether $attrs was used during render.
   * If $attrs was used during render then the warning for failed attrs
   * fallthrough can be suppressed.
   */
  let accessedAttrs =3D false;
  function markAttrsAccessed() {
      accessedAttrs =3D true;
  }
  function renderComponentRoot(instance) {
      const { type: Component, vnode, proxy, withProxy, props, propsOptions=
: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState=
, ctx, inheritAttrs } =3D instance;
      let result;
      let fallthroughAttrs;
      const prev =3D setCurrentRenderingInstance(instance);
      {
          accessedAttrs =3D false;
      }
      try {
          if (vnode.shapeFlag &amp; 4 /* ShapeFlags.STATEFUL_COMPONENT */) =
{
              // withProxy is a proxy with a different `has` trap only for
              // runtime-compiled render functions using `with` block.
              const proxyToUse =3D withProxy || proxy;
              result =3D normalizeVNode(render.call(proxyToUse, proxyToUse,=
 renderCache, props, setupState, data, ctx));
              fallthroughAttrs =3D attrs;
          }
          else {
              // functional
              const render =3D Component;
              // in dev, mark attrs accessed if optional props (attrs =3D=
=3D=3D props)
              if (true &amp;&amp; attrs =3D=3D=3D props) {
                  markAttrsAccessed();
              }
              result =3D normalizeVNode(render.length &gt; 1
                  ? render(props, true
                      ? {
                          get attrs() {
                              markAttrsAccessed();
                              return attrs;
                          },
                          slots,
                          emit
                      }
                      : { attrs, slots, emit })
                  : render(props, null /* we know it doesn't need it */));
              fallthroughAttrs =3D Component.props
                  ? attrs
                  : getFunctionalFallthrough(attrs);
          }
      }
      catch (err) {
          blockStack.length =3D 0;
          handleError(err, instance, 1 /* ErrorCodes.RENDER_FUNCTION */);
          result =3D createVNode(Comment);
      }
      // attr merging
      // in dev mode, comments are preserved, and it's possible for a templ=
ate
      // to have comments along side the root element which makes it a frag=
ment
      let root =3D result;
      let setRoot =3D undefined;
      if (result.patchFlag &gt; 0 &amp;&amp;
          result.patchFlag &amp; 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */) {
          [root, setRoot] =3D getChildRoot(result);
      }
      if (fallthroughAttrs &amp;&amp; inheritAttrs !=3D=3D false) {
          const keys =3D Object.keys(fallthroughAttrs);
          const { shapeFlag } =3D root;
          if (keys.length) {
              if (shapeFlag &amp; (1 /* ShapeFlags.ELEMENT */ | 6 /* ShapeF=
lags.COMPONENT */)) {
                  if (propsOptions &amp;&amp; keys.some(isModelListener)) {
                      // If a v-model listener (onUpdate:xxx) has a corresp=
onding declared
                      // prop, it indicates this component expects to handl=
e v-model and
                      // it should not fallthrough.
                      // related: #1543, #1643, #1989
                      fallthroughAttrs =3D filterModelListeners(fallthrough=
Attrs, propsOptions);
                  }
                  root =3D cloneVNode(root, fallthroughAttrs);
              }
              else if (!accessedAttrs &amp;&amp; root.type !=3D=3D Comment)=
 {
                  const allAttrs =3D Object.keys(attrs);
                  const eventAttrs =3D [];
                  const extraAttrs =3D [];
                  for (let i =3D 0, l =3D allAttrs.length; i &lt; l; i++) {
                      const key =3D allAttrs[i];
                      if (isOn(key)) {
                          // ignore v-model handlers when they fail to fall=
through
                          if (!isModelListener(key)) {
                              // remove `on`, lowercase first letter to ref=
lect event casing
                              // accurately
                              eventAttrs.push(key[2].toLowerCase() + key.sl=
ice(3));
                          }
                      }
                      else {
                          extraAttrs.push(key);
                      }
                  }
                  if (extraAttrs.length) {
                      warn(`Extraneous non-props attributes (` +
                          `${extraAttrs.join(', ')}) ` +
                          `were passed to component but could not be automa=
tically inherited ` +
                          `because component renders fragment or text root =
nodes.`);
                  }
                  if (eventAttrs.length) {
                      warn(`Extraneous non-emits event listeners (` +
                          `${eventAttrs.join(', ')}) ` +
                          `were passed to component but could not be automa=
tically inherited ` +
                          `because component renders fragment or text root =
nodes. ` +
                          `If the listener is intended to be a component cu=
stom event listener only, ` +
                          `declare it using the "emits" option.`);
                  }
              }
          }
      }
      // inherit directives
      if (vnode.dirs) {
          if (!isElementRoot(root)) {
              warn(`Runtime directive used on component with non-element ro=
ot node. ` +
                  `The directives will not function as intended.`);
          }
          // clone before mutating since the root may be a hoisted vnode
          root =3D cloneVNode(root);
          root.dirs =3D root.dirs ? root.dirs.concat(vnode.dirs) : vnode.di=
rs;
      }
      // inherit transition data
      if (vnode.transition) {
          if (!isElementRoot(root)) {
              warn(`Component inside &lt;Transition&gt; renders non-element=
 root node ` +
                  `that cannot be animated.`);
          }
          root.transition =3D vnode.transition;
      }
      if (setRoot) {
          setRoot(root);
      }
      else {
          result =3D root;
      }
      setCurrentRenderingInstance(prev);
      return result;
  }
  /**
   * dev only
   * In dev mode, template root level comments are rendered, which turns th=
e
   * template into a fragment root, but we need to locate the single elemen=
t
   * root for attrs and scope id processing.
   */
  const getChildRoot =3D (vnode) =3D&gt; {
      const rawChildren =3D vnode.children;
      const dynamicChildren =3D vnode.dynamicChildren;
      const childRoot =3D filterSingleRoot(rawChildren);
      if (!childRoot) {
          return [vnode, undefined];
      }
      const index =3D rawChildren.indexOf(childRoot);
      const dynamicIndex =3D dynamicChildren ? dynamicChildren.indexOf(chil=
dRoot) : -1;
      const setRoot =3D (updatedRoot) =3D&gt; {
          rawChildren[index] =3D updatedRoot;
          if (dynamicChildren) {
              if (dynamicIndex &gt; -1) {
                  dynamicChildren[dynamicIndex] =3D updatedRoot;
              }
              else if (updatedRoot.patchFlag &gt; 0) {
                  vnode.dynamicChildren =3D [...dynamicChildren, updatedRoo=
t];
              }
          }
      };
      return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
      let singleRoot;
      for (let i =3D 0; i &lt; children.length; i++) {
          const child =3D children[i];
          if (isVNode(child)) {
              // ignore user comment
              if (child.type !=3D=3D Comment || child.children =3D=3D=3D 'v=
-if') {
                  if (singleRoot) {
                      // has more than 1 non-comment child, return now
                      return;
                  }
                  else {
                      singleRoot =3D child;
                  }
              }
          }
          else {
              return;
          }
      }
      return singleRoot;
  }
  const getFunctionalFallthrough =3D (attrs) =3D&gt; {
      let res;
      for (const key in attrs) {
          if (key =3D=3D=3D 'class' || key =3D=3D=3D 'style' || isOn(key)) =
{
              (res || (res =3D {}))[key] =3D attrs[key];
          }
      }
      return res;
  };
  const filterModelListeners =3D (attrs, props) =3D&gt; {
      const res =3D {};
      for (const key in attrs) {
          if (!isModelListener(key) || !(key.slice(9) in props)) {
              res[key] =3D attrs[key];
          }
      }
      return res;
  };
  const isElementRoot =3D (vnode) =3D&gt; {
      return (vnode.shapeFlag &amp; (6 /* ShapeFlags.COMPONENT */ | 1 /* Sh=
apeFlags.ELEMENT */) ||
          vnode.type =3D=3D=3D Comment // potential v-if branch switch
      );
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } =3D pre=
vVNode;
      const { props: nextProps, children: nextChildren, patchFlag } =3D nex=
tVNode;
      const emits =3D component.emitsOptions;
      // Parent component's render function was hot-updated. Since this may=
 have
      // caused the child component's slots content to have changed, we nee=
d to
      // force the child to update as well.
      if ((prevChildren || nextChildren) &amp;&amp; isHmrUpdating) {
          return true;
      }
      // force child update for runtime directive or transition on componen=
t vnode.
      if (nextVNode.dirs || nextVNode.transition) {
          return true;
      }
      if (optimized &amp;&amp; patchFlag &gt;=3D 0) {
          if (patchFlag &amp; 1024 /* PatchFlags.DYNAMIC_SLOTS */) {
              // slot content that references values that might have change=
d,
              // e.g. in a v-for
              return true;
          }
          if (patchFlag &amp; 16 /* PatchFlags.FULL_PROPS */) {
              if (!prevProps) {
                  return !!nextProps;
              }
              // presence of this flag indicates props are always non-null
              return hasPropsChanged(prevProps, nextProps, emits);
          }
          else if (patchFlag &amp; 8 /* PatchFlags.PROPS */) {
              const dynamicProps =3D nextVNode.dynamicProps;
              for (let i =3D 0; i &lt; dynamicProps.length; i++) {
                  const key =3D dynamicProps[i];
                  if (nextProps[key] !=3D=3D prevProps[key] &amp;&amp;
                      !isEmitListener(emits, key)) {
                      return true;
                  }
              }
          }
      }
      else {
          // this path is only taken by manually written render functions
          // so presence of any children leads to a forced update
          if (prevChildren || nextChildren) {
              if (!nextChildren || !nextChildren.$stable) {
                  return true;
              }
          }
          if (prevProps =3D=3D=3D nextProps) {
              return false;
          }
          if (!prevProps) {
              return !!nextProps;
          }
          if (!nextProps) {
              return true;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys =3D Object.keys(nextProps);
      if (nextKeys.length !=3D=3D Object.keys(prevProps).length) {
          return true;
      }
      for (let i =3D 0; i &lt; nextKeys.length; i++) {
          const key =3D nextKeys[i];
          if (nextProps[key] !=3D=3D prevProps[key] &amp;&amp;
              !isEmitListener(emitsOptions, key)) {
              return true;
          }
      }
      return false;
  }
  function updateHOCHostEl({ vnode, parent }, el // HostNode
  ) {
      while (parent &amp;&amp; parent.subTree =3D=3D=3D vnode) {
          (vnode =3D parent.vnode).el =3D el;
          parent =3D parent.parent;
      }
  }

  const isSuspense =3D (type) =3D&gt; type.__isSuspense;
  // Suspense exposes a component-like API, and is treated like a component
  // in the compiler, but internally it's a special built-in type that hook=
s
  // directly into the renderer.
  const SuspenseImpl =3D {
      name: 'Suspense',
      // In order to make Suspense tree-shakable, we need to avoid importin=
g it
      // directly in the renderer. The renderer checks for the __isSuspense=
 flag
      // on a vnode's type and calls the `process` method, passing in rende=
rer
      // internals.
      __isSuspense: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, i=
sSVG, slotScopeIds, optimized,=20
      // platform-specific impl passed from renderer
      rendererInternals) {
          if (n1 =3D=3D null) {
              mountSuspense(n2, container, anchor, parentComponent, parentS=
uspense, isSVG, slotScopeIds, optimized, rendererInternals);
          }
          else {
              patchSuspense(n1, n2, container, anchor, parentComponent, isS=
VG, slotScopeIds, optimized, rendererInternals);
          }
      },
      hydrate: hydrateSuspense,
      create: createSuspenseBoundary,
      normalize: normalizeSuspenseChildren
  };
  // Force-casted public typing for h and TSX props inference
  const Suspense =3D (SuspenseImpl
      );
  function triggerEvent(vnode, name) {
      const eventListener =3D vnode.props &amp;&amp; vnode.props[name];
      if (isFunction(eventListener)) {
          eventListener();
      }
  }
  function mountSuspense(vnode, container, anchor, parentComponent, parentS=
uspense, isSVG, slotScopeIds, optimized, rendererInternals) {
      const { p: patch, o: { createElement } } =3D rendererInternals;
      const hiddenContainer =3D createElement('div');
      const suspense =3D (vnode.suspense =3D createSuspenseBoundary(vnode, =
parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG,=
 slotScopeIds, optimized, rendererInternals));
      // start mounting the content subtree in an off-dom container
      patch(null, (suspense.pendingBranch =3D vnode.ssContent), hiddenConta=
iner, null, parentComponent, suspense, isSVG, slotScopeIds);
      // now check if we have encountered any async deps
      if (suspense.deps &gt; 0) {
          // has async
          // invoke @fallback event
          triggerEvent(vnode, 'onPending');
          triggerEvent(vnode, 'onFallback');
          // mount the fallback tree
          patch(null, vnode.ssFallback, container, anchor, parentComponent,=
 null, // fallback tree will not have suspense context
          isSVG, slotScopeIds);
          setActiveBranch(suspense, vnode.ssFallback);
      }
      else {
          // Suspense has no async deps. Just resolve.
          suspense.resolve();
      }
  }
  function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG,=
 slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) =
{
      const suspense =3D (n2.suspense =3D n1.suspense);
      suspense.vnode =3D n2;
      n2.el =3D n1.el;
      const newBranch =3D n2.ssContent;
      const newFallback =3D n2.ssFallback;
      const { activeBranch, pendingBranch, isInFallback, isHydrating } =3D =
suspense;
      if (pendingBranch) {
          suspense.pendingBranch =3D newBranch;
          if (isSameVNodeType(newBranch, pendingBranch)) {
              // same root type but content may have changed.
              patch(pendingBranch, newBranch, suspense.hiddenContainer, nul=
l, parentComponent, suspense, isSVG, slotScopeIds, optimized);
              if (suspense.deps &lt;=3D 0) {
                  suspense.resolve();
              }
              else if (isInFallback) {
                  patch(activeBranch, newFallback, container, anchor, paren=
tComponent, null, // fallback tree will not have suspense context
                  isSVG, slotScopeIds, optimized);
                  setActiveBranch(suspense, newFallback);
              }
          }
          else {
              // toggled before pending tree is resolved
              suspense.pendingId++;
              if (isHydrating) {
                  // if toggled before hydration is finished, the current D=
OM tree is
                  // no longer valid. set it as the active branch so it wil=
l be unmounted
                  // when resolved
                  suspense.isHydrating =3D false;
                  suspense.activeBranch =3D pendingBranch;
              }
              else {
                  unmount(pendingBranch, parentComponent, suspense);
              }
              // increment pending ID. this is used to invalidate async cal=
lbacks
              // reset suspense state
              suspense.deps =3D 0;
              // discard effects from pending branch
              suspense.effects.length =3D 0;
              // discard previous container
              suspense.hiddenContainer =3D createElement('div');
              if (isInFallback) {
                  // already in fallback state
                  patch(null, newBranch, suspense.hiddenContainer, null, pa=
rentComponent, suspense, isSVG, slotScopeIds, optimized);
                  if (suspense.deps &lt;=3D 0) {
                      suspense.resolve();
                  }
                  else {
                      patch(activeBranch, newFallback, container, anchor, p=
arentComponent, null, // fallback tree will not have suspense context
                      isSVG, slotScopeIds, optimized);
                      setActiveBranch(suspense, newFallback);
                  }
              }
              else if (activeBranch &amp;&amp; isSameVNodeType(newBranch, a=
ctiveBranch)) {
                  // toggled "back" to current active branch
                  patch(activeBranch, newBranch, container, anchor, parentC=
omponent, suspense, isSVG, slotScopeIds, optimized);
                  // force resolve
                  suspense.resolve(true);
              }
              else {
                  // switched to a 3rd branch
                  patch(null, newBranch, suspense.hiddenContainer, null, pa=
rentComponent, suspense, isSVG, slotScopeIds, optimized);
                  if (suspense.deps &lt;=3D 0) {
                      suspense.resolve();
                  }
              }
          }
      }
      else {
          if (activeBranch &amp;&amp; isSameVNodeType(newBranch, activeBran=
ch)) {
              // root did not change, just normal patch
              patch(activeBranch, newBranch, container, anchor, parentCompo=
nent, suspense, isSVG, slotScopeIds, optimized);
              setActiveBranch(suspense, newBranch);
          }
          else {
              // root node toggled
              // invoke @pending event
              triggerEvent(n2, 'onPending');
              // mount pending branch in off-dom container
              suspense.pendingBranch =3D newBranch;
              suspense.pendingId++;
              patch(null, newBranch, suspense.hiddenContainer, null, parent=
Component, suspense, isSVG, slotScopeIds, optimized);
              if (suspense.deps &lt;=3D 0) {
                  // incoming branch has no async deps, resolve now.
                  suspense.resolve();
              }
              else {
                  const { timeout, pendingId } =3D suspense;
                  if (timeout &gt; 0) {
                      setTimeout(() =3D&gt; {
                          if (suspense.pendingId =3D=3D=3D pendingId) {
                              suspense.fallback(newFallback);
                          }
                      }, timeout);
                  }
                  else if (timeout =3D=3D=3D 0) {
                      suspense.fallback(newFallback);
                  }
              }
          }
      }
  }
  let hasWarned =3D false;
  function createSuspenseBoundary(vnode, parent, parentComponent, container=
, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternal=
s, isHydrating =3D false) {
      /* istanbul ignore if */
      if (!hasWarned) {
          hasWarned =3D true;
          // @ts-ignore `console.info` cannot be null error
          console[console.info ? 'info' : 'log'](`&lt;Suspense&gt; is an ex=
perimental feature and its API will likely change.`);
      }
      const { p: patch, m: move, um: unmount, n: next, o: { parentNode, rem=
ove } } =3D rendererInternals;
      const timeout =3D vnode.props ? toNumber(vnode.props.timeout) : undef=
ined;
      {
          assertNumber(timeout, `Suspense timeout`);
      }
      const suspense =3D {
          vnode,
          parent,
          parentComponent,
          isSVG,
          container,
          hiddenContainer,
          anchor,
          deps: 0,
          pendingId: 0,
          timeout: typeof timeout =3D=3D=3D 'number' ? timeout : -1,
          activeBranch: null,
          pendingBranch: null,
          isInFallback: true,
          isHydrating,
          isUnmounted: false,
          effects: [],
          resolve(resume =3D false) {
              {
                  if (!resume &amp;&amp; !suspense.pendingBranch) {
                      throw new Error(`suspense.resolve() is called without=
 a pending branch.`);
                  }
                  if (suspense.isUnmounted) {
                      throw new Error(`suspense.resolve() is called on an a=
lready unmounted suspense boundary.`);
                  }
              }
              const { vnode, activeBranch, pendingBranch, pendingId, effect=
s, parentComponent, container } =3D suspense;
              if (suspense.isHydrating) {
                  suspense.isHydrating =3D false;
              }
              else if (!resume) {
                  const delayEnter =3D activeBranch &amp;&amp;
                      pendingBranch.transition &amp;&amp;
                      pendingBranch.transition.mode =3D=3D=3D 'out-in';
                  if (delayEnter) {
                      activeBranch.transition.afterLeave =3D () =3D&gt; {
                          if (pendingId =3D=3D=3D suspense.pendingId) {
                              move(pendingBranch, container, anchor, 0 /* M=
oveType.ENTER */);
                          }
                      };
                  }
                  // this is initial anchor on mount
                  let { anchor } =3D suspense;
                  // unmount current active tree
                  if (activeBranch) {
                      // if the fallback tree was mounted, it may have been=
 moved
                      // as part of a parent suspense. get the latest ancho=
r for insertion
                      anchor =3D next(activeBranch);
                      unmount(activeBranch, parentComponent, suspense, true=
);
                  }
                  if (!delayEnter) {
                      // move content from off-dom container to actual cont=
ainer
                      move(pendingBranch, container, anchor, 0 /* MoveType.=
ENTER */);
                  }
              }
              setActiveBranch(suspense, pendingBranch);
              suspense.pendingBranch =3D null;
              suspense.isInFallback =3D false;
              // flush buffered effects
              // check if there is a pending parent suspense
              let parent =3D suspense.parent;
              let hasUnresolvedAncestor =3D false;
              while (parent) {
                  if (parent.pendingBranch) {
                      // found a pending parent suspense, merge buffered po=
st jobs
                      // into that parent
                      parent.effects.push(...effects);
                      hasUnresolvedAncestor =3D true;
                      break;
                  }
                  parent =3D parent.parent;
              }
              // no pending parent suspense, flush all jobs
              if (!hasUnresolvedAncestor) {
                  queuePostFlushCb(effects);
              }
              suspense.effects =3D [];
              // invoke @resolve event
              triggerEvent(vnode, 'onResolve');
          },
          fallback(fallbackVNode) {
              if (!suspense.pendingBranch) {
                  return;
              }
              const { vnode, activeBranch, parentComponent, container, isSV=
G } =3D suspense;
              // invoke @fallback event
              triggerEvent(vnode, 'onFallback');
              const anchor =3D next(activeBranch);
              const mountFallback =3D () =3D&gt; {
                  if (!suspense.isInFallback) {
                      return;
                  }
                  // mount the fallback tree
                  patch(null, fallbackVNode, container, anchor, parentCompo=
nent, null, // fallback tree will not have suspense context
                  isSVG, slotScopeIds, optimized);
                  setActiveBranch(suspense, fallbackVNode);
              };
              const delayEnter =3D fallbackVNode.transition &amp;&amp; fall=
backVNode.transition.mode =3D=3D=3D 'out-in';
              if (delayEnter) {
                  activeBranch.transition.afterLeave =3D mountFallback;
              }
              suspense.isInFallback =3D true;
              // unmount current active branch
              unmount(activeBranch, parentComponent, null, // no suspense s=
o unmount hooks fire now
              true // shouldRemove
              );
              if (!delayEnter) {
                  mountFallback();
              }
          },
          move(container, anchor, type) {
              suspense.activeBranch &amp;&amp;
                  move(suspense.activeBranch, container, anchor, type);
              suspense.container =3D container;
          },
          next() {
              return suspense.activeBranch &amp;&amp; next(suspense.activeB=
ranch);
          },
          registerDep(instance, setupRenderEffect) {
              const isInPendingSuspense =3D !!suspense.pendingBranch;
              if (isInPendingSuspense) {
                  suspense.deps++;
              }
              const hydratedEl =3D instance.vnode.el;
              instance
                  .asyncDep.catch(err =3D&gt; {
                  handleError(err, instance, 0 /* ErrorCodes.SETUP_FUNCTION=
 */);
              })
                  .then(asyncSetupResult =3D&gt; {
                  // retry when the setup() promise resolves.
                  // component may have been unmounted before resolve.
                  if (instance.isUnmounted ||
                      suspense.isUnmounted ||
                      suspense.pendingId !=3D=3D instance.suspenseId) {
                      return;
                  }
                  // retry from this component
                  instance.asyncResolved =3D true;
                  const { vnode } =3D instance;
                  {
                      pushWarningContext(vnode);
                  }
                  handleSetupResult(instance, asyncSetupResult, false);
                  if (hydratedEl) {
                      // vnode may have been replaced if an update happened=
 before the
                      // async dep is resolved.
                      vnode.el =3D hydratedEl;
                  }
                  const placeholder =3D !hydratedEl &amp;&amp; instance.sub=
Tree.el;
                  setupRenderEffect(instance, vnode,=20
                  // component may have been moved before resolve.
                  // if this is not a hydration, instance.subTree will be t=
he comment
                  // placeholder.
                  parentNode(hydratedEl || instance.subTree.el),=20
                  // anchor will not be used if this is hydration, so only =
need to
                  // consider the comment placeholder case.
                  hydratedEl ? null : next(instance.subTree), suspense, isS=
VG, optimized);
                  if (placeholder) {
                      remove(placeholder);
                  }
                  updateHOCHostEl(instance, vnode.el);
                  {
                      popWarningContext();
                  }
                  // only decrease deps count if suspense is not already re=
solved
                  if (isInPendingSuspense &amp;&amp; --suspense.deps =3D=3D=
=3D 0) {
                      suspense.resolve();
                  }
              });
          },
          unmount(parentSuspense, doRemove) {
              suspense.isUnmounted =3D true;
              if (suspense.activeBranch) {
                  unmount(suspense.activeBranch, parentComponent, parentSus=
pense, doRemove);
              }
              if (suspense.pendingBranch) {
                  unmount(suspense.pendingBranch, parentComponent, parentSu=
spense, doRemove);
              }
          }
      };
      return suspense;
  }
  function hydrateSuspense(node, vnode, parentComponent, parentSuspense, is=
SVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
      /* eslint-disable no-restricted-globals */
      const suspense =3D (vnode.suspense =3D createSuspenseBoundary(vnode, =
parentSuspense, parentComponent, node.parentNode, document.createElement('d=
iv'), null, isSVG, slotScopeIds, optimized, rendererInternals, true /* hydr=
ating */));
      // there are two possible scenarios for server-rendered suspense:
      // - success: ssr content should be fully resolved
      // - failure: ssr content should be the fallback branch.
      // however, on the client we don't really know if it has failed or no=
t
      // attempt to hydrate the DOM assuming it has succeeded, but we still
      // need to construct a suspense boundary first
      const result =3D hydrateNode(node, (suspense.pendingBranch =3D vnode.=
ssContent), parentComponent, suspense, slotScopeIds, optimized);
      if (suspense.deps =3D=3D=3D 0) {
          suspense.resolve();
      }
      return result;
      /* eslint-enable no-restricted-globals */
  }
  function normalizeSuspenseChildren(vnode) {
      const { shapeFlag, children } =3D vnode;
      const isSlotChildren =3D shapeFlag &amp; 32 /* ShapeFlags.SLOTS_CHILD=
REN */;
      vnode.ssContent =3D normalizeSuspenseSlot(isSlotChildren ? children.d=
efault : children);
      vnode.ssFallback =3D isSlotChildren
          ? normalizeSuspenseSlot(children.fallback)
          : createVNode(Comment);
  }
  function normalizeSuspenseSlot(s) {
      let block;
      if (isFunction(s)) {
          const trackBlock =3D isBlockTreeEnabled &amp;&amp; s._c;
          if (trackBlock) {
              // disableTracking: false
              // allow block tracking for compiled slots
              // (see ./componentRenderContext.ts)
              s._d =3D false;
              openBlock();
          }
          s =3D s();
          if (trackBlock) {
              s._d =3D true;
              block =3D currentBlock;
              closeBlock();
          }
      }
      if (isArray(s)) {
          const singleChild =3D filterSingleRoot(s);
          if (!singleChild) {
              warn(`&lt;Suspense&gt; slots expect a single root node.`);
          }
          s =3D singleChild;
      }
      s =3D normalizeVNode(s);
      if (block &amp;&amp; !s.dynamicChildren) {
          s.dynamicChildren =3D block.filter(c =3D&gt; c !=3D=3D s);
      }
      return s;
  }
  function queueEffectWithSuspense(fn, suspense) {
      if (suspense &amp;&amp; suspense.pendingBranch) {
          if (isArray(fn)) {
              suspense.effects.push(...fn);
          }
          else {
              suspense.effects.push(fn);
          }
      }
      else {
          queuePostFlushCb(fn);
      }
  }
  function setActiveBranch(suspense, branch) {
      suspense.activeBranch =3D branch;
      const { vnode, parentComponent } =3D suspense;
      const el =3D (vnode.el =3D branch.el);
      // in case suspense is the root node of a component,
      // recursively update the HOC el
      if (parentComponent &amp;&amp; parentComponent.subTree =3D=3D=3D vnod=
e) {
          parentComponent.vnode.el =3D el;
          updateHOCHostEl(parentComponent, el);
      }
  }

  function provide(key, value) {
      if (!currentInstance) {
          {
              warn(`provide() can only be used inside setup().`);
          }
      }
      else {
          let provides =3D currentInstance.provides;
          // by default an instance inherits its parent's provides object
          // but when it needs to provide values of its own, it creates its
          // own provides object using parent provides object as prototype.
          // this way in `inject` we can simply look up injections from dir=
ect
          // parent and let the prototype chain do the work.
          const parentProvides =3D currentInstance.parent &amp;&amp; curren=
tInstance.parent.provides;
          if (parentProvides =3D=3D=3D provides) {
              provides =3D currentInstance.provides =3D Object.create(paren=
tProvides);
          }
          // TS doesn't allow symbol as index type
          provides[key] =3D value;
      }
  }
  function inject(key, defaultValue, treatDefaultAsFactory =3D false) {
      // fallback to `currentRenderingInstance` so that this can be called =
in
      // a functional component
      const instance =3D currentInstance || currentRenderingInstance;
      if (instance) {
          // #2400
          // to support `app.use` plugins,
          // fallback to appContext's `provides` if the instance is at root
          const provides =3D instance.parent =3D=3D null
              ? instance.vnode.appContext &amp;&amp; instance.vnode.appCont=
ext.provides
              : instance.parent.provides;
          if (provides &amp;&amp; key in provides) {
              // TS doesn't allow symbol as index type
              return provides[key];
          }
          else if (arguments.length &gt; 1) {
              return treatDefaultAsFactory &amp;&amp; isFunction(defaultVal=
ue)
                  ? defaultValue.call(instance.proxy)
                  : defaultValue;
          }
          else {
              warn(`injection "${String(key)}" not found.`);
          }
      }
      else {
          warn(`inject() can only be used inside setup() or functional comp=
onents.`);
      }
  }

  // Simple effect.
  function watchEffect(effect, options) {
      return doWatch(effect, null, options);
  }
  function watchPostEffect(effect, options) {
      return doWatch(effect, null, Object.assign(Object.assign({}, options)=
, { flush: 'post' }) );
  }
  function watchSyncEffect(effect, options) {
      return doWatch(effect, null, Object.assign(Object.assign({}, options)=
, { flush: 'sync' }) );
  }
  // initial value for watchers to trigger on undefined initial values
  const INITIAL_WATCHER_VALUE =3D {};
  // implementation
  function watch(source, cb, options) {
      if (!isFunction(cb)) {
          warn(`\`watch(fn, options?)\` signature has been moved to a separ=
ate API. ` +
              `Use \`watchEffect(fn, options?)\` instead. \`watch\` now onl=
y ` +
              `supports \`watch(source, cb, options?) signature.`);
      }
      return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger=
 } =3D EMPTY_OBJ) {
      if (!cb) {
          if (immediate !=3D=3D undefined) {
              warn(`watch() "immediate" option is only respected when using=
 the ` +
                  `watch(source, callback, options?) signature.`);
          }
          if (deep !=3D=3D undefined) {
              warn(`watch() "deep" option is only respected when using the =
` +
                  `watch(source, callback, options?) signature.`);
          }
      }
      const warnInvalidSource =3D (s) =3D&gt; {
          warn(`Invalid watch source: `, s, `A watch source can only be a g=
etter/effect function, a ref, ` +
              `a reactive object, or an array of these types.`);
      };
      const instance =3D getCurrentScope() =3D=3D=3D (currentInstance =3D=
=3D=3D null || currentInstance =3D=3D=3D void 0 ? void 0 : currentInstance.=
scope) ? currentInstance : null;
      // const instance =3D currentInstance
      let getter;
      let forceTrigger =3D false;
      let isMultiSource =3D false;
      if (isRef(source)) {
          getter =3D () =3D&gt; source.value;
          forceTrigger =3D isShallow(source);
      }
      else if (isReactive(source)) {
          getter =3D () =3D&gt; source;
          deep =3D true;
      }
      else if (isArray(source)) {
          isMultiSource =3D true;
          forceTrigger =3D source.some(s =3D&gt; isReactive(s) || isShallow=
(s));
          getter =3D () =3D&gt; source.map(s =3D&gt; {
              if (isRef(s)) {
                  return s.value;
              }
              else if (isReactive(s)) {
                  return traverse(s);
              }
              else if (isFunction(s)) {
                  return callWithErrorHandling(s, instance, 2 /* ErrorCodes=
.WATCH_GETTER */);
              }
              else {
                  warnInvalidSource(s);
              }
          });
      }
      else if (isFunction(source)) {
          if (cb) {
              // getter with cb
              getter =3D () =3D&gt; callWithErrorHandling(source, instance,=
 2 /* ErrorCodes.WATCH_GETTER */);
          }
          else {
              // no cb -&gt; simple effect
              getter =3D () =3D&gt; {
                  if (instance &amp;&amp; instance.isUnmounted) {
                      return;
                  }
                  if (cleanup) {
                      cleanup();
                  }
                  return callWithAsyncErrorHandling(source, instance, 3 /* =
ErrorCodes.WATCH_CALLBACK */, [onCleanup]);
              };
          }
      }
      else {
          getter =3D NOOP;
          warnInvalidSource(source);
      }
      if (cb &amp;&amp; deep) {
          const baseGetter =3D getter;
          getter =3D () =3D&gt; traverse(baseGetter());
      }
      let cleanup;
      let onCleanup =3D (fn) =3D&gt; {
          cleanup =3D effect.onStop =3D () =3D&gt; {
              callWithErrorHandling(fn, instance, 4 /* ErrorCodes.WATCH_CLE=
ANUP */);
          };
      };
      let oldValue =3D isMultiSource
          ? new Array(source.length).fill(INITIAL_WATCHER_VALUE)
          : INITIAL_WATCHER_VALUE;
      const job =3D () =3D&gt; {
          if (!effect.active) {
              return;
          }
          if (cb) {
              // watch(source, cb)
              const newValue =3D effect.run();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some((v, i) =3D&gt; hasChanged(v, oldValue=
[i]))
                      : hasChanged(newValue, oldValue)) ||
                  (false  )) {
                  // cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  callWithAsyncErrorHandling(cb, instance, 3 /* ErrorCodes.=
WATCH_CALLBACK */, [
                      newValue,
                      // pass undefined as the old value when it's changed =
for the first time
                      oldValue =3D=3D=3D INITIAL_WATCHER_VALUE
                          ? undefined
                          : isMultiSource &amp;&amp; oldValue[0] =3D=3D=3D =
INITIAL_WATCHER_VALUE
                              ? []
                              : oldValue,
                      onCleanup
                  ]);
                  oldValue =3D newValue;
              }
          }
          else {
              // watchEffect
              effect.run();
          }
      };
      // important: mark the job as a watcher callback so that scheduler kn=
ows
      // it is allowed to self-trigger (#1727)
      job.allowRecurse =3D !!cb;
      let scheduler;
      if (flush =3D=3D=3D 'sync') {
          scheduler =3D job; // the scheduler function gets called directly
      }
      else if (flush =3D=3D=3D 'post') {
          scheduler =3D () =3D&gt; queuePostRenderEffect(job, instance &amp=
;&amp; instance.suspense);
      }
      else {
          // default: 'pre'
          job.pre =3D true;
          if (instance)
              job.id =3D instance.uid;
          scheduler =3D () =3D&gt; queueJob(job);
      }
      const effect =3D new ReactiveEffect(getter, scheduler);
      {
          effect.onTrack =3D onTrack;
          effect.onTrigger =3D onTrigger;
      }
      // initial run
      if (cb) {
          if (immediate) {
              job();
          }
          else {
              oldValue =3D effect.run();
          }
      }
      else if (flush =3D=3D=3D 'post') {
          queuePostRenderEffect(effect.run.bind(effect), instance &amp;&amp=
; instance.suspense);
      }
      else {
          effect.run();
      }
      const unwatch =3D () =3D&gt; {
          effect.stop();
          if (instance &amp;&amp; instance.scope) {
              remove(instance.scope.effects, effect);
          }
      };
      return unwatch;
  }
  // this.$watch
  function instanceWatch(source, value, options) {
      const publicThis =3D this.proxy;
      const getter =3D isString(source)
          ? source.includes('.')
              ? createPathGetter(publicThis, source)
              : () =3D&gt; publicThis[source]
          : source.bind(publicThis, publicThis);
      let cb;
      if (isFunction(value)) {
          cb =3D value;
      }
      else {
          cb =3D value.handler;
          options =3D value;
      }
      const cur =3D currentInstance;
      setCurrentInstance(this);
      const res =3D doWatch(getter, cb.bind(publicThis), options);
      if (cur) {
          setCurrentInstance(cur);
      }
      else {
          unsetCurrentInstance();
      }
      return res;
  }
  function createPathGetter(ctx, path) {
      const segments =3D path.split('.');
      return () =3D&gt; {
          let cur =3D ctx;
          for (let i =3D 0; i &lt; segments.length &amp;&amp; cur; i++) {
              cur =3D cur[segments[i]];
          }
          return cur;
      };
  }
  function traverse(value, seen) {
      if (!isObject(value) || value["__v_skip" /* ReactiveFlags.SKIP */]) {
          return value;
      }
      seen =3D seen || new Set();
      if (seen.has(value)) {
          return value;
      }
      seen.add(value);
      if (isRef(value)) {
          traverse(value.value, seen);
      }
      else if (isArray(value)) {
          for (let i =3D 0; i &lt; value.length; i++) {
              traverse(value[i], seen);
          }
      }
      else if (isSet(value) || isMap(value)) {
          value.forEach((v) =3D&gt; {
              traverse(v, seen);
          });
      }
      else if (isPlainObject(value)) {
          for (const key in value) {
              traverse(value[key], seen);
          }
      }
      return value;
  }

  function useTransitionState() {
      const state =3D {
          isMounted: false,
          isLeaving: false,
          isUnmounting: false,
          leavingVNodes: new Map()
      };
      onMounted(() =3D&gt; {
          state.isMounted =3D true;
      });
      onBeforeUnmount(() =3D&gt; {
          state.isUnmounting =3D true;
      });
      return state;
  }
  const TransitionHookValidator =3D [Function, Array];
  const BaseTransitionImpl =3D {
      name: `BaseTransition`,
      props: {
          mode: String,
          appear: Boolean,
          persisted: Boolean,
          // enter
          onBeforeEnter: TransitionHookValidator,
          onEnter: TransitionHookValidator,
          onAfterEnter: TransitionHookValidator,
          onEnterCancelled: TransitionHookValidator,
          // leave
          onBeforeLeave: TransitionHookValidator,
          onLeave: TransitionHookValidator,
          onAfterLeave: TransitionHookValidator,
          onLeaveCancelled: TransitionHookValidator,
          // appear
          onBeforeAppear: TransitionHookValidator,
          onAppear: TransitionHookValidator,
          onAfterAppear: TransitionHookValidator,
          onAppearCancelled: TransitionHookValidator
      },
      setup(props, { slots }) {
          const instance =3D getCurrentInstance();
          const state =3D useTransitionState();
          let prevTransitionKey;
          return () =3D&gt; {
              const children =3D slots.default &amp;&amp; getTransitionRawC=
hildren(slots.default(), true);
              if (!children || !children.length) {
                  return;
              }
              let child =3D children[0];
              if (children.length &gt; 1) {
                  let hasFound =3D false;
                  // locate first non-comment child
                  for (const c of children) {
                      if (c.type !=3D=3D Comment) {
                          if (hasFound) {
                              // warn more than one non-comment child
                              warn('&lt;transition&gt; can only be used on =
a single element or component. ' +
                                  'Use &lt;transition-group&gt; for lists.'=
);
                              break;
                          }
                          child =3D c;
                          hasFound =3D true;
                      }
                  }
              }
              // there's no need to track reactivity for these props so use=
 the raw
              // props for a bit better perf
              const rawProps =3D toRaw(props);
              const { mode } =3D rawProps;
              // check mode
              if (mode &amp;&amp;
                  mode !=3D=3D 'in-out' &amp;&amp;
                  mode !=3D=3D 'out-in' &amp;&amp;
                  mode !=3D=3D 'default') {
                  warn(`invalid &lt;transition&gt; mode: ${mode}`);
              }
              if (state.isLeaving) {
                  return emptyPlaceholder(child);
              }
              // in the case of &lt;transition&gt;&lt;keep-alive/&gt;&lt;/t=
ransition&gt;, we need to
              // compare the type of the kept-alive children.
              const innerChild =3D getKeepAliveChild(child);
              if (!innerChild) {
                  return emptyPlaceholder(child);
              }
              const enterHooks =3D resolveTransitionHooks(innerChild, rawPr=
ops, state, instance);
              setTransitionHooks(innerChild, enterHooks);
              const oldChild =3D instance.subTree;
              const oldInnerChild =3D oldChild &amp;&amp; getKeepAliveChild=
(oldChild);
              let transitionKeyChanged =3D false;
              const { getTransitionKey } =3D innerChild.type;
              if (getTransitionKey) {
                  const key =3D getTransitionKey();
                  if (prevTransitionKey =3D=3D=3D undefined) {
                      prevTransitionKey =3D key;
                  }
                  else if (key !=3D=3D prevTransitionKey) {
                      prevTransitionKey =3D key;
                      transitionKeyChanged =3D true;
                  }
              }
              // handle mode
              if (oldInnerChild &amp;&amp;
                  oldInnerChild.type !=3D=3D Comment &amp;&amp;
                  (!isSameVNodeType(innerChild, oldInnerChild) || transitio=
nKeyChanged)) {
                  const leavingHooks =3D resolveTransitionHooks(oldInnerChi=
ld, rawProps, state, instance);
                  // update old tree's hooks in case of dynamic transition
                  setTransitionHooks(oldInnerChild, leavingHooks);
                  // switching between different views
                  if (mode =3D=3D=3D 'out-in') {
                      state.isLeaving =3D true;
                      // return placeholder node and queue update when leav=
e finishes
                      leavingHooks.afterLeave =3D () =3D&gt; {
                          state.isLeaving =3D false;
                          // #6835
                          // it also needs to be updated when active is und=
efined
                          if (instance.update.active !=3D=3D false) {
                              instance.update();
                          }
                      };
                      return emptyPlaceholder(child);
                  }
                  else if (mode =3D=3D=3D 'in-out' &amp;&amp; innerChild.ty=
pe !=3D=3D Comment) {
                      leavingHooks.delayLeave =3D (el, earlyRemove, delayed=
Leave) =3D&gt; {
                          const leavingVNodesCache =3D getLeavingNodesForTy=
pe(state, oldInnerChild);
                          leavingVNodesCache[String(oldInnerChild.key)] =3D=
 oldInnerChild;
                          // early removal callback
                          el._leaveCb =3D () =3D&gt; {
                              earlyRemove();
                              el._leaveCb =3D undefined;
                              delete enterHooks.delayedLeave;
                          };
                          enterHooks.delayedLeave =3D delayedLeave;
                      };
                  }
              }
              return child;
          };
      }
  };
  // export the public type for h/tsx inference
  // also to avoid inline import() in generated d.ts files
  const BaseTransition =3D BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
      const { leavingVNodes } =3D state;
      let leavingVNodesCache =3D leavingVNodes.get(vnode.type);
      if (!leavingVNodesCache) {
          leavingVNodesCache =3D Object.create(null);
          leavingVNodes.set(vnode.type, leavingVNodesCache);
      }
      return leavingVNodesCache;
  }
  // The transition hooks are attached to the vnode as vnode.transition
  // and will be called at appropriate timing in the renderer.
  function resolveTransitionHooks(vnode, props, state, instance) {
      const { appear, mode, persisted =3D false, onBeforeEnter, onEnter, on=
AfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeave=
Cancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } =3D=
 props;
      const key =3D String(vnode.key);
      const leavingVNodesCache =3D getLeavingNodesForType(state, vnode);
      const callHook =3D (hook, args) =3D&gt; {
          hook &amp;&amp;
              callWithAsyncErrorHandling(hook, instance, 9 /* ErrorCodes.TR=
ANSITION_HOOK */, args);
      };
      const callAsyncHook =3D (hook, args) =3D&gt; {
          const done =3D args[1];
          callHook(hook, args);
          if (isArray(hook)) {
              if (hook.every(hook =3D&gt; hook.length &lt;=3D 1))
                  done();
          }
          else if (hook.length &lt;=3D 1) {
              done();
          }
      };
      const hooks =3D {
          mode,
          persisted,
          beforeEnter(el) {
              let hook =3D onBeforeEnter;
              if (!state.isMounted) {
                  if (appear) {
                      hook =3D onBeforeAppear || onBeforeEnter;
                  }
                  else {
                      return;
                  }
              }
              // for same element (v-show)
              if (el._leaveCb) {
                  el._leaveCb(true /* cancelled */);
              }
              // for toggled element with same key (v-if)
              const leavingVNode =3D leavingVNodesCache[key];
              if (leavingVNode &amp;&amp;
                  isSameVNodeType(vnode, leavingVNode) &amp;&amp;
                  leavingVNode.el._leaveCb) {
                  // force early removal (not cancelled)
                  leavingVNode.el._leaveCb();
              }
              callHook(hook, [el]);
          },
          enter(el) {
              let hook =3D onEnter;
              let afterHook =3D onAfterEnter;
              let cancelHook =3D onEnterCancelled;
              if (!state.isMounted) {
                  if (appear) {
                      hook =3D onAppear || onEnter;
                      afterHook =3D onAfterAppear || onAfterEnter;
                      cancelHook =3D onAppearCancelled || onEnterCancelled;
                  }
                  else {
                      return;
                  }
              }
              let called =3D false;
              const done =3D (el._enterCb =3D (cancelled) =3D&gt; {
                  if (called)
                      return;
                  called =3D true;
                  if (cancelled) {
                      callHook(cancelHook, [el]);
                  }
                  else {
                      callHook(afterHook, [el]);
                  }
                  if (hooks.delayedLeave) {
                      hooks.delayedLeave();
                  }
                  el._enterCb =3D undefined;
              });
              if (hook) {
                  callAsyncHook(hook, [el, done]);
              }
              else {
                  done();
              }
          },
          leave(el, remove) {
              const key =3D String(vnode.key);
              if (el._enterCb) {
                  el._enterCb(true /* cancelled */);
              }
              if (state.isUnmounting) {
                  return remove();
              }
              callHook(onBeforeLeave, [el]);
              let called =3D false;
              const done =3D (el._leaveCb =3D (cancelled) =3D&gt; {
                  if (called)
                      return;
                  called =3D true;
                  remove();
                  if (cancelled) {
                      callHook(onLeaveCancelled, [el]);
                  }
                  else {
                      callHook(onAfterLeave, [el]);
                  }
                  el._leaveCb =3D undefined;
                  if (leavingVNodesCache[key] =3D=3D=3D vnode) {
                      delete leavingVNodesCache[key];
                  }
              });
              leavingVNodesCache[key] =3D vnode;
              if (onLeave) {
                  callAsyncHook(onLeave, [el, done]);
              }
              else {
                  done();
              }
          },
          clone(vnode) {
              return resolveTransitionHooks(vnode, props, state, instance);
          }
      };
      return hooks;
  }
  // the placeholder really only handles one special case: KeepAlive
  // in the case of a KeepAlive in a leave phase we need to return a KeepAl=
ive
  // placeholder with empty content to avoid the KeepAlive instance from be=
ing
  // unmounted.
  function emptyPlaceholder(vnode) {
      if (isKeepAlive(vnode)) {
          vnode =3D cloneVNode(vnode);
          vnode.children =3D null;
          return vnode;
      }
  }
  function getKeepAliveChild(vnode) {
      return isKeepAlive(vnode)
          ? vnode.children
              ? vnode.children[0]
              : undefined
          : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */ &amp;&amp; vno=
de.component) {
          setTransitionHooks(vnode.component.subTree, hooks);
      }
      else if (vnode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
          vnode.ssContent.transition =3D hooks.clone(vnode.ssContent);
          vnode.ssFallback.transition =3D hooks.clone(vnode.ssFallback);
      }
      else {
          vnode.transition =3D hooks;
      }
  }
  function getTransitionRawChildren(children, keepComment =3D false, parent=
Key) {
      let ret =3D [];
      let keyedFragmentCount =3D 0;
      for (let i =3D 0; i &lt; children.length; i++) {
          let child =3D children[i];
          // #5360 inherit parent key in case of &lt;template v-for&gt;
          const key =3D parentKey =3D=3D null
              ? child.key
              : String(parentKey) + String(child.key !=3D null ? child.key =
: i);
          // handle fragment children case, e.g. v-for
          if (child.type =3D=3D=3D Fragment) {
              if (child.patchFlag &amp; 128 /* PatchFlags.KEYED_FRAGMENT */=
)
                  keyedFragmentCount++;
              ret =3D ret.concat(getTransitionRawChildren(child.children, k=
eepComment, key));
          }
          // comment placeholders should be skipped, e.g. v-if
          else if (keepComment || child.type !=3D=3D Comment) {
              ret.push(key !=3D null ? cloneVNode(child, { key }) : child);
          }
      }
      // #1126 if a transition children list contains multiple sub fragment=
s, these
      // fragments will be merged into a flat children array. Since each v-=
for
      // fragment may contain different static bindings inside, we need to =
de-op
      // these children to force full diffs to ensure correct behavior.
      if (keyedFragmentCount &gt; 1) {
          for (let i =3D 0; i &lt; ret.length; i++) {
              ret[i].patchFlag =3D -2 /* PatchFlags.BAIL */;
          }
      }
      return ret;
  }

  // implementation, close to no-op
  function defineComponent(options) {
      return isFunction(options) ? { setup: options, name: options.name } :=
 options;
  }

  const isAsyncWrapper =3D (i) =3D&gt; !!i.type.__asyncLoader;
  function defineAsyncComponent(source) {
      if (isFunction(source)) {
          source =3D { loader: source };
      }
      const { loader, loadingComponent, errorComponent, delay =3D 200, time=
out, // undefined =3D never times out
      suspensible =3D true, onError: userOnError } =3D source;
      let pendingRequest =3D null;
      let resolvedComp;
      let retries =3D 0;
      const retry =3D () =3D&gt; {
          retries++;
          pendingRequest =3D null;
          return load();
      };
      const load =3D () =3D&gt; {
          let thisRequest;
          return (pendingRequest ||
              (thisRequest =3D pendingRequest =3D
                  loader()
                      .catch(err =3D&gt; {
                      err =3D err instanceof Error ? err : new Error(String=
(err));
                      if (userOnError) {
                          return new Promise((resolve, reject) =3D&gt; {
                              const userRetry =3D () =3D&gt; resolve(retry(=
));
                              const userFail =3D () =3D&gt; reject(err);
                              userOnError(err, userRetry, userFail, retries=
 + 1);
                          });
                      }
                      else {
                          throw err;
                      }
                  })
                      .then((comp) =3D&gt; {
                      if (thisRequest !=3D=3D pendingRequest &amp;&amp; pen=
dingRequest) {
                          return pendingRequest;
                      }
                      if (!comp) {
                          warn(`Async component loader resolved to undefine=
d. ` +
                              `If you are using retry(), make sure to retur=
n its return value.`);
                      }
                      // interop module default
                      if (comp &amp;&amp;
                          (comp.__esModule || comp[Symbol.toStringTag] =3D=
=3D=3D 'Module')) {
                          comp =3D comp.default;
                      }
                      if (comp &amp;&amp; !isObject(comp) &amp;&amp; !isFun=
ction(comp)) {
                          throw new Error(`Invalid async component load res=
ult: ${comp}`);
                      }
                      resolvedComp =3D comp;
                      return comp;
                  })));
      };
      return defineComponent({
          name: 'AsyncComponentWrapper',
          __asyncLoader: load,
          get __asyncResolved() {
              return resolvedComp;
          },
          setup() {
              const instance =3D currentInstance;
              // already resolved
              if (resolvedComp) {
                  return () =3D&gt; createInnerComp(resolvedComp, instance)=
;
              }
              const onError =3D (err) =3D&gt; {
                  pendingRequest =3D null;
                  handleError(err, instance, 13 /* ErrorCodes.ASYNC_COMPONE=
NT_LOADER */, !errorComponent /* do not throw in dev if user provided error=
 component */);
              };
              // suspense-controlled or SSR.
              if ((suspensible &amp;&amp; instance.suspense) ||
                  (false )) {
                  return load()
                      .then(comp =3D&gt; {
                      return () =3D&gt; createInnerComp(comp, instance);
                  })
                      .catch(err =3D&gt; {
                      onError(err);
                      return () =3D&gt; errorComponent
                          ? createVNode(errorComponent, {
                              error: err
                          })
                          : null;
                  });
              }
              const loaded =3D ref(false);
              const error =3D ref();
              const delayed =3D ref(!!delay);
              if (delay) {
                  setTimeout(() =3D&gt; {
                      delayed.value =3D false;
                  }, delay);
              }
              if (timeout !=3D null) {
                  setTimeout(() =3D&gt; {
                      if (!loaded.value &amp;&amp; !error.value) {
                          const err =3D new Error(`Async component timed ou=
t after ${timeout}ms.`);
                          onError(err);
                          error.value =3D err;
                      }
                  }, timeout);
              }
              load()
                  .then(() =3D&gt; {
                  loaded.value =3D true;
                  if (instance.parent &amp;&amp; isKeepAlive(instance.paren=
t.vnode)) {
                      // parent is keep-alive, force update so the loaded c=
omponent's
                      // name is taken into account
                      queueJob(instance.parent.update);
                  }
              })
                  .catch(err =3D&gt; {
                  onError(err);
                  error.value =3D err;
              });
              return () =3D&gt; {
                  if (loaded.value &amp;&amp; resolvedComp) {
                      return createInnerComp(resolvedComp, instance);
                  }
                  else if (error.value &amp;&amp; errorComponent) {
                      return createVNode(errorComponent, {
                          error: error.value
                      });
                  }
                  else if (loadingComponent &amp;&amp; !delayed.value) {
                      return createVNode(loadingComponent);
                  }
              };
          }
      });
  }
  function createInnerComp(comp, parent) {
      const { ref, props, children, ce } =3D parent.vnode;
      const vnode =3D createVNode(comp, props, children);
      // ensure inner component inherits the async wrapper's ref owner
      vnode.ref =3D ref;
      // pass the custom element callback on to the inner comp
      // and remove it from the async wrapper
      vnode.ce =3D ce;
      delete parent.vnode.ce;
      return vnode;
  }

  const isKeepAlive =3D (vnode) =3D&gt; vnode.type.__isKeepAlive;
  const KeepAliveImpl =3D {
      name: `KeepAlive`,
      // Marker for special handling inside the renderer. We are not using =
a =3D=3D=3D
      // check directly on KeepAlive in the renderer, because importing it =
directly
      // would prevent it from being tree-shaken.
      __isKeepAlive: true,
      props: {
          include: [String, RegExp, Array],
          exclude: [String, RegExp, Array],
          max: [String, Number]
      },
      setup(props, { slots }) {
          const instance =3D getCurrentInstance();
          // KeepAlive communicates with the instantiated renderer via the
          // ctx where the renderer passes in its internals,
          // and the KeepAlive instance exposes activate/deactivate impleme=
ntations.
          // The whole point of this is to avoid importing KeepAlive direct=
ly in the
          // renderer to facilitate tree-shaking.
          const sharedContext =3D instance.ctx;
          const cache =3D new Map();
          const keys =3D new Set();
          let current =3D null;
          {
              instance.__v_cache =3D cache;
          }
          const parentSuspense =3D instance.suspense;
          const { renderer: { p: patch, m: move, um: _unmount, o: { createE=
lement } } } =3D sharedContext;
          const storageContainer =3D createElement('div');
          sharedContext.activate =3D (vnode, container, anchor, isSVG, opti=
mized) =3D&gt; {
              const instance =3D vnode.component;
              move(vnode, container, anchor, 0 /* MoveType.ENTER */, parent=
Suspense);
              // in case props have changed
              patch(instance.vnode, vnode, container, anchor, instance, par=
entSuspense, isSVG, vnode.slotScopeIds, optimized);
              queuePostRenderEffect(() =3D&gt; {
                  instance.isDeactivated =3D false;
                  if (instance.a) {
                      invokeArrayFns(instance.a);
                  }
                  const vnodeHook =3D vnode.props &amp;&amp; vnode.props.on=
VnodeMounted;
                  if (vnodeHook) {
                      invokeVNodeHook(vnodeHook, instance.parent, vnode);
                  }
              }, parentSuspense);
              {
                  // Update components tree
                  devtoolsComponentAdded(instance);
              }
          };
          sharedContext.deactivate =3D (vnode) =3D&gt; {
              const instance =3D vnode.component;
              move(vnode, storageContainer, null, 1 /* MoveType.LEAVE */, p=
arentSuspense);
              queuePostRenderEffect(() =3D&gt; {
                  if (instance.da) {
                      invokeArrayFns(instance.da);
                  }
                  const vnodeHook =3D vnode.props &amp;&amp; vnode.props.on=
VnodeUnmounted;
                  if (vnodeHook) {
                      invokeVNodeHook(vnodeHook, instance.parent, vnode);
                  }
                  instance.isDeactivated =3D true;
              }, parentSuspense);
              {
                  // Update components tree
                  devtoolsComponentAdded(instance);
              }
          };
          function unmount(vnode) {
              // reset the shapeFlag so it can be properly unmounted
              resetShapeFlag(vnode);
              _unmount(vnode, instance, parentSuspense, true);
          }
          function pruneCache(filter) {
              cache.forEach((vnode, key) =3D&gt; {
                  const name =3D getComponentName(vnode.type);
                  if (name &amp;&amp; (!filter || !filter(name))) {
                      pruneCacheEntry(key);
                  }
              });
          }
          function pruneCacheEntry(key) {
              const cached =3D cache.get(key);
              if (!current || !isSameVNodeType(cached, current)) {
                  unmount(cached);
              }
              else if (current) {
                  // current active instance should no longer be kept-alive=
.
                  // we can't unmount it now but it might be later, so rese=
t its flag now.
                  resetShapeFlag(current);
              }
              cache.delete(key);
              keys.delete(key);
          }
          // prune cache on include/exclude prop change
          watch(() =3D&gt; [props.include, props.exclude], ([include, exclu=
de]) =3D&gt; {
              include &amp;&amp; pruneCache(name =3D&gt; matches(include, n=
ame));
              exclude &amp;&amp; pruneCache(name =3D&gt; !matches(exclude, =
name));
          },=20
          // prune post-render after `current` has been updated
          { flush: 'post', deep: true });
          // cache sub tree after render
          let pendingCacheKey =3D null;
          const cacheSubtree =3D () =3D&gt; {
              // fix #1621, the pendingCacheKey could be 0
              if (pendingCacheKey !=3D null) {
                  cache.set(pendingCacheKey, getInnerChild(instance.subTree=
));
              }
          };
          onMounted(cacheSubtree);
          onUpdated(cacheSubtree);
          onBeforeUnmount(() =3D&gt; {
              cache.forEach(cached =3D&gt; {
                  const { subTree, suspense } =3D instance;
                  const vnode =3D getInnerChild(subTree);
                  if (cached.type =3D=3D=3D vnode.type &amp;&amp; cached.ke=
y =3D=3D=3D vnode.key) {
                      // current instance will be unmounted as part of keep=
-alive's unmount
                      resetShapeFlag(vnode);
                      // but invoke its deactivated hook here
                      const da =3D vnode.component.da;
                      da &amp;&amp; queuePostRenderEffect(da, suspense);
                      return;
                  }
                  unmount(cached);
              });
          });
          return () =3D&gt; {
              pendingCacheKey =3D null;
              if (!slots.default) {
                  return null;
              }
              const children =3D slots.default();
              const rawVNode =3D children[0];
              if (children.length &gt; 1) {
                  {
                      warn(`KeepAlive should contain exactly one component =
child.`);
                  }
                  current =3D null;
                  return children;
              }
              else if (!isVNode(rawVNode) ||
                  (!(rawVNode.shapeFlag &amp; 4 /* ShapeFlags.STATEFUL_COMP=
ONENT */) &amp;&amp;
                      !(rawVNode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE=
 */))) {
                  current =3D null;
                  return rawVNode;
              }
              let vnode =3D getInnerChild(rawVNode);
              const comp =3D vnode.type;
              // for async components, name check should be based in its lo=
aded
              // inner component if available
              const name =3D getComponentName(isAsyncWrapper(vnode)
                  ? vnode.type.__asyncResolved || {}
                  : comp);
              const { include, exclude, max } =3D props;
              if ((include &amp;&amp; (!name || !matches(include, name))) |=
|
                  (exclude &amp;&amp; name &amp;&amp; matches(exclude, name=
))) {
                  current =3D vnode;
                  return rawVNode;
              }
              const key =3D vnode.key =3D=3D null ? comp : vnode.key;
              const cachedVNode =3D cache.get(key);
              // clone vnode if it's reused because we are going to mutate =
it
              if (vnode.el) {
                  vnode =3D cloneVNode(vnode);
                  if (rawVNode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE *=
/) {
                      rawVNode.ssContent =3D vnode;
                  }
              }
              // #1513 it's possible for the returned vnode to be cloned du=
e to attr
              // fallthrough or scopeId, so the vnode here may not be the f=
inal vnode
              // that is mounted. Instead of caching it directly, we store =
the pending
              // key and cache `instance.subTree` (the normalized vnode) in
              // beforeMount/beforeUpdate hooks.
              pendingCacheKey =3D key;
              if (cachedVNode) {
                  // copy over mounted state
                  vnode.el =3D cachedVNode.el;
                  vnode.component =3D cachedVNode.component;
                  if (vnode.transition) {
                      // recursively update transition hooks on subTree
                      setTransitionHooks(vnode, vnode.transition);
                  }
                  // avoid vnode being mounted as fresh
                  vnode.shapeFlag |=3D 512 /* ShapeFlags.COMPONENT_KEPT_ALI=
VE */;
                  // make this key the freshest
                  keys.delete(key);
                  keys.add(key);
              }
              else {
                  keys.add(key);
                  // prune oldest entry
                  if (max &amp;&amp; keys.size &gt; parseInt(max, 10)) {
                      pruneCacheEntry(keys.values().next().value);
                  }
              }
              // avoid vnode being unmounted
              vnode.shapeFlag |=3D 256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_=
ALIVE */;
              current =3D vnode;
              return isSuspense(rawVNode.type) ? rawVNode : vnode;
          };
      }
  };
  // export the public type for h/tsx inference
  // also to avoid inline import() in generated d.ts files
  const KeepAlive =3D KeepAliveImpl;
  function matches(pattern, name) {
      if (isArray(pattern)) {
          return pattern.some((p) =3D&gt; matches(p, name));
      }
      else if (isString(pattern)) {
          return pattern.split(',').includes(name);
      }
      else if (isRegExp(pattern)) {
          return pattern.test(name);
      }
      /* istanbul ignore next */
      return false;
  }
  function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a" /* LifecycleHooks.ACTIVATED */, targe=
t);
  }
  function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da" /* LifecycleHooks.DEACTIVATED */, ta=
rget);
  }
  function registerKeepAliveHook(hook, type, target =3D currentInstance) {
      // cache the deactivate branch check wrapper for injected hooks so th=
e same
      // hook can be properly deduped by the scheduler. "__wdc" stands for =
"with
      // deactivation check".
      const wrappedHook =3D hook.__wdc ||
          (hook.__wdc =3D () =3D&gt; {
              // only fire the hook if the target instance is NOT in a deac=
tivated branch.
              let current =3D target;
              while (current) {
                  if (current.isDeactivated) {
                      return;
                  }
                  current =3D current.parent;
              }
              return hook();
          });
      injectHook(type, wrappedHook, target);
      // In addition to registering it on the target instance, we walk up t=
he parent
      // chain and register it on all ancestor instances that are keep-aliv=
e roots.
      // This avoids the need to walk the entire component tree when invoki=
ng these
      // hooks, and more importantly, avoids the need to track child compon=
ents in
      // arrays.
      if (target) {
          let current =3D target.parent;
          while (current &amp;&amp; current.parent) {
              if (isKeepAlive(current.parent.vnode)) {
                  injectToKeepAliveRoot(wrappedHook, type, target, current)=
;
              }
              current =3D current.parent;
          }
      }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      // injectHook wraps the original for error handling, so make sure to =
remove
      // the wrapped version.
      const injected =3D injectHook(type, hook, keepAliveRoot, true /* prep=
end */);
      onUnmounted(() =3D&gt; {
          remove(keepAliveRoot[type], injected);
      }, target);
  }
  function resetShapeFlag(vnode) {
      // bitwise operations to remove keep alive flags
      vnode.shapeFlag &amp;=3D ~256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALI=
VE */;
      vnode.shapeFlag &amp;=3D ~512 /* ShapeFlags.COMPONENT_KEPT_ALIVE */;
  }
  function getInnerChild(vnode) {
      return vnode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */ ? vnode.ss=
Content : vnode;
  }

  function injectHook(type, hook, target =3D currentInstance, prepend =3D f=
alse) {
      if (target) {
          const hooks =3D target[type] || (target[type] =3D []);
          // cache the error handling wrapper for injected hooks so the sam=
e hook
          // can be properly deduped by the scheduler. "__weh" stands for "=
with error
          // handling".
          const wrappedHook =3D hook.__weh ||
              (hook.__weh =3D (...args) =3D&gt; {
                  if (target.isUnmounted) {
                      return;
                  }
                  // disable tracking inside all lifecycle hooks
                  // since they can potentially be called inside effects.
                  pauseTracking();
                  // Set currentInstance during hook invocation.
                  // This assumes the hook does not synchronously trigger o=
ther hooks, which
                  // can only be false when the user does something really =
funky.
                  setCurrentInstance(target);
                  const res =3D callWithAsyncErrorHandling(hook, target, ty=
pe, args);
                  unsetCurrentInstance();
                  resetTracking();
                  return res;
              });
          if (prepend) {
              hooks.unshift(wrappedHook);
          }
          else {
              hooks.push(wrappedHook);
          }
          return wrappedHook;
      }
      else {
          const apiName =3D toHandlerKey(ErrorTypeStrings[type].replace(/ h=
ook$/, ''));
          warn(`${apiName} is called when there is no active component inst=
ance to be ` +
              `associated with. ` +
              `Lifecycle injection APIs can only be used during execution o=
f setup().` +
              (` If you are using async setup(), make sure to register life=
cycle ` +
                      `hooks before the first await statement.`
                  ));
      }
  }
  const createHook =3D (lifecycle) =3D&gt; (hook, target =3D currentInstanc=
e) =3D&gt;=20
  // post-create lifecycle registrations are noops during SSR (except for s=
erverPrefetch)
  (!isInSSRComponentSetup || lifecycle =3D=3D=3D "sp" /* LifecycleHooks.SER=
VER_PREFETCH */) &amp;&amp;
      injectHook(lifecycle, (...args) =3D&gt; hook(...args), target);
  const onBeforeMount =3D createHook("bm" /* LifecycleHooks.BEFORE_MOUNT */=
);
  const onMounted =3D createHook("m" /* LifecycleHooks.MOUNTED */);
  const onBeforeUpdate =3D createHook("bu" /* LifecycleHooks.BEFORE_UPDATE =
*/);
  const onUpdated =3D createHook("u" /* LifecycleHooks.UPDATED */);
  const onBeforeUnmount =3D createHook("bum" /* LifecycleHooks.BEFORE_UNMOU=
NT */);
  const onUnmounted =3D createHook("um" /* LifecycleHooks.UNMOUNTED */);
  const onServerPrefetch =3D createHook("sp" /* LifecycleHooks.SERVER_PREFE=
TCH */);
  const onRenderTriggered =3D createHook("rtg" /* LifecycleHooks.RENDER_TRI=
GGERED */);
  const onRenderTracked =3D createHook("rtc" /* LifecycleHooks.RENDER_TRACK=
ED */);
  function onErrorCaptured(hook, target =3D currentInstance) {
      injectHook("ec" /* LifecycleHooks.ERROR_CAPTURED */, hook, target);
  }

  /**
  Runtime helper for applying directives to a vnode. Example usage:

  const comp =3D resolveComponent('comp')
  const foo =3D resolveDirective('foo')
  const bar =3D resolveDirective('bar')

  return withDirectives(h(comp), [
    [foo, this.x],
    [bar, this.y]
  ])
  */
  function validateDirectiveName(name) {
      if (isBuiltInDirective(name)) {
          warn('Do not use built-in directive ids as custom directive id: '=
 + name);
      }
  }
  /**
   * Adds directives to a VNode.
   */
  function withDirectives(vnode, directives) {
      const internalInstance =3D currentRenderingInstance;
      if (internalInstance =3D=3D=3D null) {
          warn(`withDirectives can only be used inside render functions.`);
          return vnode;
      }
      const instance =3D getExposeProxy(internalInstance) ||
          internalInstance.proxy;
      const bindings =3D vnode.dirs || (vnode.dirs =3D []);
      for (let i =3D 0; i &lt; directives.length; i++) {
          let [dir, value, arg, modifiers =3D EMPTY_OBJ] =3D directives[i];
          if (dir) {
              if (isFunction(dir)) {
                  dir =3D {
                      mounted: dir,
                      updated: dir
                  };
              }
              if (dir.deep) {
                  traverse(value);
              }
              bindings.push({
                  dir,
                  instance,
                  value,
                  oldValue: void 0,
                  arg,
                  modifiers
              });
          }
      }
      return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings =3D vnode.dirs;
      const oldBindings =3D prevVNode &amp;&amp; prevVNode.dirs;
      for (let i =3D 0; i &lt; bindings.length; i++) {
          const binding =3D bindings[i];
          if (oldBindings) {
              binding.oldValue =3D oldBindings[i].value;
          }
          let hook =3D binding.dir[name];
          if (hook) {
              // disable tracking inside all lifecycle hooks
              // since they can potentially be called inside effects.
              pauseTracking();
              callWithAsyncErrorHandling(hook, instance, 8 /* ErrorCodes.DI=
RECTIVE_HOOK */, [
                  vnode.el,
                  binding,
                  vnode,
                  prevVNode
              ]);
              resetTracking();
          }
      }
  }

  const COMPONENTS =3D 'components';
  const DIRECTIVES =3D 'directives';
  /**
   * @private
   */
  function resolveComponent(name, maybeSelfReference) {
      return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || na=
me;
  }
  const NULL_DYNAMIC_COMPONENT =3D Symbol();
  /**
   * @private
   */
  function resolveDynamicComponent(component) {
      if (isString(component)) {
          return resolveAsset(COMPONENTS, component, false) || component;
      }
      else {
          // invalid types will fallthrough to createVNode and raise warnin=
g
          return (component || NULL_DYNAMIC_COMPONENT);
      }
  }
  /**
   * @private
   */
  function resolveDirective(name) {
      return resolveAsset(DIRECTIVES, name);
  }
  // implementation
  function resolveAsset(type, name, warnMissing =3D true, maybeSelfReferenc=
e =3D false) {
      const instance =3D currentRenderingInstance || currentInstance;
      if (instance) {
          const Component =3D instance.type;
          // explicit self name has highest priority
          if (type =3D=3D=3D COMPONENTS) {
              const selfName =3D getComponentName(Component, false /* do no=
t include inferred name to avoid breaking existing code */);
              if (selfName &amp;&amp;
                  (selfName =3D=3D=3D name ||
                      selfName =3D=3D=3D camelize(name) ||
                      selfName =3D=3D=3D capitalize(camelize(name)))) {
                  return Component;
              }
          }
          const res =3D=20
          // local registration
          // check instance[type] first which is resolved for options API
          resolve(instance[type] || Component[type], name) ||
              // global registration
              resolve(instance.appContext[type], name);
          if (!res &amp;&amp; maybeSelfReference) {
              // fallback to implicit self-reference
              return Component;
          }
          if (warnMissing &amp;&amp; !res) {
              const extra =3D type =3D=3D=3D COMPONENTS
                  ? `\nIf this is a native custom element, make sure to exc=
lude it from ` +
                      `component resolution via compilerOptions.isCustomEle=
ment.`
                  : ``;
              warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}=
`);
          }
          return res;
      }
      else {
          warn(`resolve${capitalize(type.slice(0, -1))} ` +
              `can only be used in render() or setup().`);
      }
  }
  function resolve(registry, name) {
      return (registry &amp;&amp;
          (registry[name] ||
              registry[camelize(name)] ||
              registry[capitalize(camelize(name))]));
  }

  /**
   * Actual implementation
   */
  function renderList(source, renderItem, cache, index) {
      let ret;
      const cached =3D (cache &amp;&amp; cache[index]);
      if (isArray(source) || isString(source)) {
          ret =3D new Array(source.length);
          for (let i =3D 0, l =3D source.length; i &lt; l; i++) {
              ret[i] =3D renderItem(source[i], i, undefined, cached &amp;&a=
mp; cached[i]);
          }
      }
      else if (typeof source =3D=3D=3D 'number') {
          if (!Number.isInteger(source)) {
              warn(`The v-for range expect an integer value but got ${sourc=
e}.`);
          }
          ret =3D new Array(source);
          for (let i =3D 0; i &lt; source; i++) {
              ret[i] =3D renderItem(i + 1, i, undefined, cached &amp;&amp; =
cached[i]);
          }
      }
      else if (isObject(source)) {
          if (source[Symbol.iterator]) {
              ret =3D Array.from(source, (item, i) =3D&gt; renderItem(item,=
 i, undefined, cached &amp;&amp; cached[i]));
          }
          else {
              const keys =3D Object.keys(source);
              ret =3D new Array(keys.length);
              for (let i =3D 0, l =3D keys.length; i &lt; l; i++) {
                  const key =3D keys[i];
                  ret[i] =3D renderItem(source[key], key, i, cached &amp;&a=
mp; cached[i]);
              }
          }
      }
      else {
          ret =3D [];
      }
      if (cache) {
          cache[index] =3D ret;
      }
      return ret;
  }

  /**
   * Compiler runtime helper for creating dynamic slots object
   * @private
   */
  function createSlots(slots, dynamicSlots) {
      for (let i =3D 0; i &lt; dynamicSlots.length; i++) {
          const slot =3D dynamicSlots[i];
          // array of dynamic slot generated by &lt;template v-for=3D"..." =
#[...]&gt;
          if (isArray(slot)) {
              for (let j =3D 0; j &lt; slot.length; j++) {
                  slots[slot[j].name] =3D slot[j].fn;
              }
          }
          else if (slot) {
              // conditional single slot generated by &lt;template v-if=3D"=
..." #foo&gt;
              slots[slot.name] =3D slot.key
                  ? (...args) =3D&gt; {
                      const res =3D slot.fn(...args);
                      // attach branch key so each conditional branch is co=
nsidered a
                      // different fragment
                      if (res)
                          res.key =3D slot.key;
                      return res;
                  }
                  : slot.fn;
          }
      }
      return slots;
  }

  /**
   * Compiler runtime helper for rendering `&lt;slot/&gt;`
   * @private
   */
  function renderSlot(slots, name, props =3D {},=20
  // this is not a user-facing function, so the fallback is always generate=
d by
  // the compiler and guaranteed to be a function returning an array
  fallback, noSlotted) {
      if (currentRenderingInstance.isCE ||
          (currentRenderingInstance.parent &amp;&amp;
              isAsyncWrapper(currentRenderingInstance.parent) &amp;&amp;
              currentRenderingInstance.parent.isCE)) {
          if (name !=3D=3D 'default')
              props.name =3D name;
          return createVNode('slot', props, fallback &amp;&amp; fallback())=
;
      }
      let slot =3D slots[name];
      if (slot &amp;&amp; slot.length &gt; 1) {
          warn(`SSR-optimized slot function detected in a non-SSR-optimized=
 render ` +
              `function. You need to mark this component with $dynamic-slot=
s in the ` +
              `parent template.`);
          slot =3D () =3D&gt; [];
      }
      // a compiled slot disables block tracking by default to avoid manual
      // invocation interfering with template-based block tracking, but in
      // `renderSlot` we can be sure that it's template-based so we can for=
ce
      // enable it.
      if (slot &amp;&amp; slot._c) {
          slot._d =3D false;
      }
      openBlock();
      const validSlotContent =3D slot &amp;&amp; ensureValidVNode(slot(prop=
s));
      const rendered =3D createBlock(Fragment, {
          key: props.key ||
              // slot content array of a dynamic conditional slot may have =
a branch
              // key attached in the `createSlots` helper, respect that
              (validSlotContent &amp;&amp; validSlotContent.key) ||
              `_${name}`
      }, validSlotContent || (fallback ? fallback() : []), validSlotContent=
 &amp;&amp; slots._ =3D=3D=3D 1 /* SlotFlags.STABLE */
          ? 64 /* PatchFlags.STABLE_FRAGMENT */
          : -2 /* PatchFlags.BAIL */);
      if (!noSlotted &amp;&amp; rendered.scopeId) {
          rendered.slotScopeIds =3D [rendered.scopeId + '-s'];
      }
      if (slot &amp;&amp; slot._c) {
          slot._d =3D true;
      }
      return rendered;
  }
  function ensureValidVNode(vnodes) {
      return vnodes.some(child =3D&gt; {
          if (!isVNode(child))
              return true;
          if (child.type =3D=3D=3D Comment)
              return false;
          if (child.type =3D=3D=3D Fragment &amp;&amp;
              !ensureValidVNode(child.children))
              return false;
          return true;
      })
          ? vnodes
          : null;
  }

  /**
   * For prefixing keys in v-on=3D"obj" with "on"
   * @private
   */
  function toHandlers(obj, preserveCaseIfNecessary) {
      const ret =3D {};
      if (!isObject(obj)) {
          warn(`v-on with no argument expects an object value.`);
          return ret;
      }
      for (const key in obj) {
          ret[preserveCaseIfNecessary &amp;&amp; /[A-Z]/.test(key)
              ? `on:${key}`
              : toHandlerKey(key)] =3D obj[key];
      }
      return ret;
  }

  /**
   * #2437 In Vue 3, functional components do not have a public instance pr=
oxy but
   * they exist in the internal parent chain. For code that relies on trave=
rsing
   * public $parent chains, skip functional ones and go to the parent inste=
ad.
   */
  const getPublicInstance =3D (i) =3D&gt; {
      if (!i)
          return null;
      if (isStatefulComponent(i))
          return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
  };
  const publicPropertiesMap =3D=20
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /*#__PURE__*/ extend(Object.create(null), {
      $: i =3D&gt; i,
      $el: i =3D&gt; i.vnode.el,
      $data: i =3D&gt; i.data,
      $props: i =3D&gt; (shallowReadonly(i.props) ),
      $attrs: i =3D&gt; (shallowReadonly(i.attrs) ),
      $slots: i =3D&gt; (shallowReadonly(i.slots) ),
      $refs: i =3D&gt; (shallowReadonly(i.refs) ),
      $parent: i =3D&gt; getPublicInstance(i.parent),
      $root: i =3D&gt; getPublicInstance(i.root),
      $emit: i =3D&gt; i.emit,
      $options: i =3D&gt; (resolveMergedOptions(i) ),
      $forceUpdate: i =3D&gt; i.f || (i.f =3D () =3D&gt; queueJob(i.update)=
),
      $nextTick: i =3D&gt; i.n || (i.n =3D nextTick.bind(i.proxy)),
      $watch: i =3D&gt; (instanceWatch.bind(i) )
  });
  const isReservedPrefix =3D (key) =3D&gt; key =3D=3D=3D '_' || key =3D=3D=
=3D '$';
  const hasSetupBinding =3D (state, key) =3D&gt; state !=3D=3D EMPTY_OBJ &a=
mp;&amp; !state.__isScriptSetup &amp;&amp; hasOwn(state, key);
  const PublicInstanceProxyHandlers =3D {
      get({ _: instance }, key) {
          const { ctx, setupState, data, props, accessCache, type, appConte=
xt } =3D instance;
          // for internal formatters to know that this is a Vue instance
          if (key =3D=3D=3D '__isVue') {
              return true;
          }
          // data / props / ctx
          // This getter gets called for every property access on the rende=
r context
          // during render and is a major hotspot. The most expensive part =
of this
          // is the multiple hasOwn() calls. It's much faster to do a simpl=
e property
          // access on a plain object, so we use an accessCache object (wit=
h null
          // prototype) to memoize what access type a key corresponds to.
          let normalizedProps;
          if (key[0] !=3D=3D '$') {
              const n =3D accessCache[key];
              if (n !=3D=3D undefined) {
                  switch (n) {
                      case 1 /* AccessTypes.SETUP */:
                          return setupState[key];
                      case 2 /* AccessTypes.DATA */:
                          return data[key];
                      case 4 /* AccessTypes.CONTEXT */:
                          return ctx[key];
                      case 3 /* AccessTypes.PROPS */:
                          return props[key];
                      // default: just fallthrough
                  }
              }
              else if (hasSetupBinding(setupState, key)) {
                  accessCache[key] =3D 1 /* AccessTypes.SETUP */;
                  return setupState[key];
              }
              else if (data !=3D=3D EMPTY_OBJ &amp;&amp; hasOwn(data, key))=
 {
                  accessCache[key] =3D 2 /* AccessTypes.DATA */;
                  return data[key];
              }
              else if (
              // only cache other properties when instance has declared (th=
us stable)
              // props
              (normalizedProps =3D instance.propsOptions[0]) &amp;&amp;
                  hasOwn(normalizedProps, key)) {
                  accessCache[key] =3D 3 /* AccessTypes.PROPS */;
                  return props[key];
              }
              else if (ctx !=3D=3D EMPTY_OBJ &amp;&amp; hasOwn(ctx, key)) {
                  accessCache[key] =3D 4 /* AccessTypes.CONTEXT */;
                  return ctx[key];
              }
              else if (shouldCacheAccess) {
                  accessCache[key] =3D 0 /* AccessTypes.OTHER */;
              }
          }
          const publicGetter =3D publicPropertiesMap[key];
          let cssModule, globalProperties;
          // public $xxx properties
          if (publicGetter) {
              if (key =3D=3D=3D '$attrs') {
                  track(instance, "get" /* TrackOpTypes.GET */, key);
                  markAttrsAccessed();
              }
              return publicGetter(instance);
          }
          else if (
          // css module (injected by vue-loader)
          (cssModule =3D type.__cssModules) &amp;&amp;
              (cssModule =3D cssModule[key])) {
              return cssModule;
          }
          else if (ctx !=3D=3D EMPTY_OBJ &amp;&amp; hasOwn(ctx, key)) {
              // user may set custom properties to `this` that start with `=
$`
              accessCache[key] =3D 4 /* AccessTypes.CONTEXT */;
              return ctx[key];
          }
          else if (
          // global properties
          ((globalProperties =3D appContext.config.globalProperties),
              hasOwn(globalProperties, key))) {
              {
                  return globalProperties[key];
              }
          }
          else if (currentRenderingInstance &amp;&amp;
              (!isString(key) ||
                  // #1091 avoid internal isRef/isVNode checks on component=
 instance leading
                  // to infinite warning loop
                  key.indexOf('__v') !=3D=3D 0)) {
              if (data !=3D=3D EMPTY_OBJ &amp;&amp; isReservedPrefix(key[0]=
) &amp;&amp; hasOwn(data, key)) {
                  warn(`Property ${JSON.stringify(key)} must be accessed vi=
a $data because it starts with a reserved ` +
                      `character ("$" or "_") and is not proxied on the ren=
der context.`);
              }
              else if (instance =3D=3D=3D currentRenderingInstance) {
                  warn(`Property ${JSON.stringify(key)} was accessed during=
 render ` +
                      `but is not defined on instance.`);
              }
          }
      },
      set({ _: instance }, key, value) {
          const { data, setupState, ctx } =3D instance;
          if (hasSetupBinding(setupState, key)) {
              setupState[key] =3D value;
              return true;
          }
          else if (setupState.__isScriptSetup &amp;&amp;
              hasOwn(setupState, key)) {
              warn(`Cannot mutate &lt;script setup&gt; binding "${key}" fro=
m Options API.`);
              return false;
          }
          else if (data !=3D=3D EMPTY_OBJ &amp;&amp; hasOwn(data, key)) {
              data[key] =3D value;
              return true;
          }
          else if (hasOwn(instance.props, key)) {
              warn(`Attempting to mutate prop "${key}". Props are readonly.=
`);
              return false;
          }
          if (key[0] =3D=3D=3D '$' &amp;&amp; key.slice(1) in instance) {
              warn(`Attempting to mutate public property "${key}". ` +
                      `Properties starting with $ are reserved and readonly=
.`);
              return false;
          }
          else {
              if (key in instance.appContext.config.globalProperties) {
                  Object.defineProperty(ctx, key, {
                      enumerable: true,
                      configurable: true,
                      value
                  });
              }
              else {
                  ctx[key] =3D value;
              }
          }
          return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptio=
ns } }, key) {
          let normalizedProps;
          return (!!accessCache[key] ||
              (data !=3D=3D EMPTY_OBJ &amp;&amp; hasOwn(data, key)) ||
              hasSetupBinding(setupState, key) ||
              ((normalizedProps =3D propsOptions[0]) &amp;&amp; hasOwn(norm=
alizedProps, key)) ||
              hasOwn(ctx, key) ||
              hasOwn(publicPropertiesMap, key) ||
              hasOwn(appContext.config.globalProperties, key));
      },
      defineProperty(target, key, descriptor) {
          if (descriptor.get !=3D null) {
              // invalidate key cache of a getter based property #5417
              target._.accessCache[key] =3D 0;
          }
          else if (hasOwn(descriptor, 'value')) {
              this.set(target, key, descriptor.value, null);
          }
          return Reflect.defineProperty(target, key, descriptor);
      }
  };
  {
      PublicInstanceProxyHandlers.ownKeys =3D (target) =3D&gt; {
          warn(`Avoid app logic that relies on enumerating keys on a compon=
ent instance. ` +
              `The keys will be empty in production mode to avoid performan=
ce overhead.`);
          return Reflect.ownKeys(target);
      };
  }
  const RuntimeCompiledPublicInstanceProxyHandlers =3D /*#__PURE__*/ extend=
({}, PublicInstanceProxyHandlers, {
      get(target, key) {
          // fast path for unscopables when using `with` block
          if (key =3D=3D=3D Symbol.unscopables) {
              return;
          }
          return PublicInstanceProxyHandlers.get(target, key, target);
      },
      has(_, key) {
          const has =3D key[0] !=3D=3D '_' &amp;&amp; !isGloballyWhiteliste=
d(key);
          if (!has &amp;&amp; PublicInstanceProxyHandlers.has(_, key)) {
              warn(`Property ${JSON.stringify(key)} should not start with _=
 which is a reserved prefix for Vue internals.`);
          }
          return has;
      }
  });
  // dev only
  // In dev mode, the proxy target exposes the same properties as seen on `=
this`
  // for easier console inspection. In prod mode it will be an empty object=
 so
  // these properties definitions can be skipped.
  function createDevRenderContext(instance) {
      const target =3D {};
      // expose internal instance for proxy handlers
      Object.defineProperty(target, `_`, {
          configurable: true,
          enumerable: false,
          get: () =3D&gt; instance
      });
      // expose public properties
      Object.keys(publicPropertiesMap).forEach(key =3D&gt; {
          Object.defineProperty(target, key, {
              configurable: true,
              enumerable: false,
              get: () =3D&gt; publicPropertiesMap[key](instance),
              // intercepted by the proxy so no need for implementation,
              // but needed to prevent set errors
              set: NOOP
          });
      });
      return target;
  }
  // dev only
  function exposePropsOnRenderContext(instance) {
      const { ctx, propsOptions: [propsOptions] } =3D instance;
      if (propsOptions) {
          Object.keys(propsOptions).forEach(key =3D&gt; {
              Object.defineProperty(ctx, key, {
                  enumerable: true,
                  configurable: true,
                  get: () =3D&gt; instance.props[key],
                  set: NOOP
              });
          });
      }
  }
  // dev only
  function exposeSetupStateOnRenderContext(instance) {
      const { ctx, setupState } =3D instance;
      Object.keys(toRaw(setupState)).forEach(key =3D&gt; {
          if (!setupState.__isScriptSetup) {
              if (isReservedPrefix(key[0])) {
                  warn(`setup() return property ${JSON.stringify(key)} shou=
ld not start with "$" or "_" ` +
                      `which are reserved prefixes for Vue internals.`);
                  return;
              }
              Object.defineProperty(ctx, key, {
                  enumerable: true,
                  configurable: true,
                  get: () =3D&gt; setupState[key],
                  set: NOOP
              });
          }
      });
  }

  function createDuplicateChecker() {
      const cache =3D Object.create(null);
      return (type, key) =3D&gt; {
          if (cache[key]) {
              warn(`${type} property "${key}" is already defined in ${cache=
[key]}.`);
          }
          else {
              cache[key] =3D type;
          }
      };
  }
  let shouldCacheAccess =3D true;
  function applyOptions(instance) {
      const options =3D resolveMergedOptions(instance);
      const publicThis =3D instance.proxy;
      const ctx =3D instance.ctx;
      // do not cache property access on public proxy during state initiali=
zation
      shouldCacheAccess =3D false;
      // call beforeCreate first before accessing other options since
      // the hook may mutate resolved options (#2791)
      if (options.beforeCreate) {
          callHook$1(options.beforeCreate, instance, "bc" /* LifecycleHooks=
.BEFORE_CREATE */);
      }
      const {=20
      // state
      data: dataOptions, computed: computedOptions, methods, watch: watchOp=
tions, provide: provideOptions, inject: injectOptions,=20
      // lifecycle
      created, beforeMount, mounted, beforeUpdate, updated, activated, deac=
tivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, render=
Tracked, renderTriggered, errorCaptured, serverPrefetch,=20
      // public API
      expose, inheritAttrs,=20
      // assets
      components, directives, filters } =3D options;
      const checkDuplicateProperties =3D createDuplicateChecker() ;
      {
          const [propsOptions] =3D instance.propsOptions;
          if (propsOptions) {
              for (const key in propsOptions) {
                  checkDuplicateProperties("Props" /* OptionTypes.PROPS */,=
 key);
              }
          }
      }
      // options initialization order (to be consistent with Vue 2):
      // - props (already done outside of this function)
      // - inject
      // - methods
      // - data (deferred since it relies on `this` access)
      // - computed
      // - watch (deferred since it relies on `this` access)
      if (injectOptions) {
          resolveInjections(injectOptions, ctx, checkDuplicateProperties, i=
nstance.appContext.config.unwrapInjectedRef);
      }
      if (methods) {
          for (const key in methods) {
              const methodHandler =3D methods[key];
              if (isFunction(methodHandler)) {
                  // In dev mode, we use the `createRenderContext` function=
 to define
                  // methods to the proxy target, and those are read-only b=
ut
                  // reconfigurable, so it needs to be redefined here
                  {
                      Object.defineProperty(ctx, key, {
                          value: methodHandler.bind(publicThis),
                          configurable: true,
                          enumerable: true,
                          writable: true
                      });
                  }
                  {
                      checkDuplicateProperties("Methods" /* OptionTypes.MET=
HODS */, key);
                  }
              }
              else {
                  warn(`Method "${key}" has type "${typeof methodHandler}" =
in the component definition. ` +
                      `Did you reference the function correctly?`);
              }
          }
      }
      if (dataOptions) {
          if (!isFunction(dataOptions)) {
              warn(`The data option must be a function. ` +
                  `Plain object usage is no longer supported.`);
          }
          const data =3D dataOptions.call(publicThis, publicThis);
          if (isPromise(data)) {
              warn(`data() returned a Promise - note data() cannot be async=
; If you ` +
                  `intend to perform data fetching before component renders=
, use ` +
                  `async setup() + &lt;Suspense&gt;.`);
          }
          if (!isObject(data)) {
              warn(`data() should return an object.`);
          }
          else {
              instance.data =3D reactive(data);
              {
                  for (const key in data) {
                      checkDuplicateProperties("Data" /* OptionTypes.DATA *=
/, key);
                      // expose data on ctx during dev
                      if (!isReservedPrefix(key[0])) {
                          Object.defineProperty(ctx, key, {
                              configurable: true,
                              enumerable: true,
                              get: () =3D&gt; data[key],
                              set: NOOP
                          });
                      }
                  }
              }
          }
      }
      // state initialization complete at this point - start caching access
      shouldCacheAccess =3D true;
      if (computedOptions) {
          for (const key in computedOptions) {
              const opt =3D computedOptions[key];
              const get =3D isFunction(opt)
                  ? opt.bind(publicThis, publicThis)
                  : isFunction(opt.get)
                      ? opt.get.bind(publicThis, publicThis)
                      : NOOP;
              if (get =3D=3D=3D NOOP) {
                  warn(`Computed property "${key}" has no getter.`);
              }
              const set =3D !isFunction(opt) &amp;&amp; isFunction(opt.set)
                  ? opt.set.bind(publicThis)
                  : () =3D&gt; {
                          warn(`Write operation failed: computed property "=
${key}" is readonly.`);
                      }
                      ;
              const c =3D computed({
                  get,
                  set
              });
              Object.defineProperty(ctx, key, {
                  enumerable: true,
                  configurable: true,
                  get: () =3D&gt; c.value,
                  set: v =3D&gt; (c.value =3D v)
              });
              {
                  checkDuplicateProperties("Computed" /* OptionTypes.COMPUT=
ED */, key);
              }
          }
      }
      if (watchOptions) {
          for (const key in watchOptions) {
              createWatcher(watchOptions[key], ctx, publicThis, key);
          }
      }
      if (provideOptions) {
          const provides =3D isFunction(provideOptions)
              ? provideOptions.call(publicThis)
              : provideOptions;
          Reflect.ownKeys(provides).forEach(key =3D&gt; {
              provide(key, provides[key]);
          });
      }
      if (created) {
          callHook$1(created, instance, "c" /* LifecycleHooks.CREATED */);
      }
      function registerLifecycleHook(register, hook) {
          if (isArray(hook)) {
              hook.forEach(_hook =3D&gt; register(_hook.bind(publicThis)));
          }
          else if (hook) {
              register(hook.bind(publicThis));
          }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (isArray(expose)) {
          if (expose.length) {
              const exposed =3D instance.exposed || (instance.exposed =3D {=
});
              expose.forEach(key =3D&gt; {
                  Object.defineProperty(exposed, key, {
                      get: () =3D&gt; publicThis[key],
                      set: val =3D&gt; (publicThis[key] =3D val)
                  });
              });
          }
          else if (!instance.exposed) {
              instance.exposed =3D {};
          }
      }
      // options that are handled when creating the instance but also need =
to be
      // applied from mixins
      if (render &amp;&amp; instance.render =3D=3D=3D NOOP) {
          instance.render =3D render;
      }
      if (inheritAttrs !=3D null) {
          instance.inheritAttrs =3D inheritAttrs;
      }
      // asset options.
      if (components)
          instance.components =3D components;
      if (directives)
          instance.directives =3D directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties =
=3D NOOP, unwrapRef =3D false) {
      if (isArray(injectOptions)) {
          injectOptions =3D normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
          const opt =3D injectOptions[key];
          let injected;
          if (isObject(opt)) {
              if ('default' in opt) {
                  injected =3D inject(opt.from || key, opt.default, true /*=
 treat default function as factory */);
              }
              else {
                  injected =3D inject(opt.from || key);
              }
          }
          else {
              injected =3D inject(opt);
          }
          if (isRef(injected)) {
              // TODO remove the check in 3.3
              if (unwrapRef) {
                  Object.defineProperty(ctx, key, {
                      enumerable: true,
                      configurable: true,
                      get: () =3D&gt; injected.value,
                      set: v =3D&gt; (injected.value =3D v)
                  });
              }
              else {
                  {
                      warn(`injected property "${key}" is a ref and will be=
 auto-unwrapped ` +
                          `and no longer needs \`.value\` in the next minor=
 release. ` +
                          `To opt-in to the new behavior now, ` +
                          `set \`app.config.unwrapInjectedRef =3D true\` (t=
his config is ` +
                          `temporary and will not be needed in the future.)=
`);
                  }
                  ctx[key] =3D injected;
              }
          }
          else {
              ctx[key] =3D injected;
          }
          {
              checkDuplicateProperties("Inject" /* OptionTypes.INJECT */, k=
ey);
          }
      }
  }
  function callHook$1(hook, instance, type) {
      callWithAsyncErrorHandling(isArray(hook)
          ? hook.map(h =3D&gt; h.bind(instance.proxy))
          : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
      const getter =3D key.includes('.')
          ? createPathGetter(publicThis, key)
          : () =3D&gt; publicThis[key];
      if (isString(raw)) {
          const handler =3D ctx[raw];
          if (isFunction(handler)) {
              watch(getter, handler);
          }
          else {
              warn(`Invalid watch handler specified by key "${raw}"`, handl=
er);
          }
      }
      else if (isFunction(raw)) {
          watch(getter, raw.bind(publicThis));
      }
      else if (isObject(raw)) {
          if (isArray(raw)) {
              raw.forEach(r =3D&gt; createWatcher(r, ctx, publicThis, key))=
;
          }
          else {
              const handler =3D isFunction(raw.handler)
                  ? raw.handler.bind(publicThis)
                  : ctx[raw.handler];
              if (isFunction(handler)) {
                  watch(getter, handler, raw);
              }
              else {
                  warn(`Invalid watch handler specified by key "${raw.handl=
er}"`, handler);
              }
          }
      }
      else {
          warn(`Invalid watch option: "${key}"`, raw);
      }
  }
  /**
   * Resolve merged options and cache it on the component.
   * This is done only once per-component since the merging does not involv=
e
   * instances.
   */
  function resolveMergedOptions(instance) {
      const base =3D instance.type;
      const { mixins, extends: extendsOptions } =3D base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMe=
rgeStrategies } } =3D instance.appContext;
      const cached =3D cache.get(base);
      let resolved;
      if (cached) {
          resolved =3D cached;
      }
      else if (!globalMixins.length &amp;&amp; !mixins &amp;&amp; !extendsO=
ptions) {
          {
              resolved =3D base;
          }
      }
      else {
          resolved =3D {};
          if (globalMixins.length) {
              globalMixins.forEach(m =3D&gt; mergeOptions(resolved, m, opti=
onMergeStrategies, true));
          }
          mergeOptions(resolved, base, optionMergeStrategies);
      }
      if (isObject(base)) {
          cache.set(base, resolved);
      }
      return resolved;
  }
  function mergeOptions(to, from, strats, asMixin =3D false) {
      const { mixins, extends: extendsOptions } =3D from;
      if (extendsOptions) {
          mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
          mixins.forEach((m) =3D&gt; mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
          if (asMixin &amp;&amp; key =3D=3D=3D 'expose') {
              warn(`"expose" option is ignored when declared in mixins or e=
xtends. ` +
                      `It should only be declared in the base component its=
elf.`);
          }
          else {
              const strat =3D internalOptionMergeStrats[key] || (strats &am=
p;&amp; strats[key]);
              to[key] =3D strat ? strat(to[key], from[key]) : from[key];
          }
      }
      return to;
  }
  const internalOptionMergeStrats =3D {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray$1,
      created: mergeAsArray$1,
      beforeMount: mergeAsArray$1,
      mounted: mergeAsArray$1,
      beforeUpdate: mergeAsArray$1,
      updated: mergeAsArray$1,
      beforeDestroy: mergeAsArray$1,
      beforeUnmount: mergeAsArray$1,
      destroyed: mergeAsArray$1,
      unmounted: mergeAsArray$1,
      activated: mergeAsArray$1,
      deactivated: mergeAsArray$1,
      errorCaptured: mergeAsArray$1,
      serverPrefetch: mergeAsArray$1,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
  };
  function mergeDataFn(to, from) {
      if (!from) {
          return to;
      }
      if (!to) {
          return from;
      }
      return function mergedDataFn() {
          return (extend)(isFunction(to) ? to.call(this, this) : to, isFunc=
tion(from) ? from.call(this, this) : from);
      };
  }
  function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from))=
;
  }
  function normalizeInject(raw) {
      if (isArray(raw)) {
          const res =3D {};
          for (let i =3D 0; i &lt; raw.length; i++) {
              res[raw[i]] =3D raw[i];
          }
          return res;
      }
      return raw;
  }
  function mergeAsArray$1(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
      return to ? extend(extend(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
      if (!to)
          return from;
      if (!from)
          return to;
      const merged =3D extend(Object.create(null), to);
      for (const key in from) {
          merged[key] =3D mergeAsArray$1(to[key], from[key]);
      }
      return merged;
  }

  function initProps(instance, rawProps, isStateful, // result of bitwise f=
lag comparison
  isSSR =3D false) {
      const props =3D {};
      const attrs =3D {};
      def(attrs, InternalObjectKey, 1);
      instance.propsDefaults =3D Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      // ensure all declared prop keys are present
      for (const key in instance.propsOptions[0]) {
          if (!(key in props)) {
              props[key] =3D undefined;
          }
      }
      // validation
      {
          validateProps(rawProps || {}, props, instance);
      }
      if (isStateful) {
          // stateful
          instance.props =3D isSSR ? props : shallowReactive(props);
      }
      else {
          if (!instance.type.props) {
              // functional w/ optional props, props =3D=3D=3D attrs
              instance.props =3D attrs;
          }
          else {
              // functional w/ declared props
              instance.props =3D props;
          }
      }
      instance.attrs =3D attrs;
  }
  function isInHmrContext(instance) {
      while (instance) {
          if (instance.type.__hmrId)
              return true;
          instance =3D instance.parent;
      }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const { props, attrs, vnode: { patchFlag } } =3D instance;
      const rawCurrentProps =3D toRaw(props);
      const [options] =3D instance.propsOptions;
      let hasAttrsChanged =3D false;
      if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !(isInHmrContext(instance)) &amp;&amp;
          (optimized || patchFlag &gt; 0) &amp;&amp;
          !(patchFlag &amp; 16 /* PatchFlags.FULL_PROPS */)) {
          if (patchFlag &amp; 8 /* PatchFlags.PROPS */) {
              // Compiler-generated props &amp; no keys change, just set th=
e updated
              // the props.
              const propsToUpdate =3D instance.vnode.dynamicProps;
              for (let i =3D 0; i &lt; propsToUpdate.length; i++) {
                  let key =3D propsToUpdate[i];
                  // skip if the prop key is a declared emit event listener
                  if (isEmitListener(instance.emitsOptions, key)) {
                      continue;
                  }
                  // PROPS flag guarantees rawProps to be non-null
                  const value =3D rawProps[key];
                  if (options) {
                      // attr / props separation was done on init and will =
be consistent
                      // in this code path, so just check if attrs have it.
                      if (hasOwn(attrs, key)) {
                          if (value !=3D=3D attrs[key]) {
                              attrs[key] =3D value;
                              hasAttrsChanged =3D true;
                          }
                      }
                      else {
                          const camelizedKey =3D camelize(key);
                          props[camelizedKey] =3D resolvePropValue(options,=
 rawCurrentProps, camelizedKey, value, instance, false /* isAbsent */);
                      }
                  }
                  else {
                      if (value !=3D=3D attrs[key]) {
                          attrs[key] =3D value;
                          hasAttrsChanged =3D true;
                      }
                  }
              }
          }
      }
      else {
          // full props update.
          if (setFullProps(instance, rawProps, props, attrs)) {
              hasAttrsChanged =3D true;
          }
          // in case of dynamic props, check if we need to delete keys from
          // the props object
          let kebabKey;
          for (const key in rawCurrentProps) {
              if (!rawProps ||
                  // for camelCase
                  (!hasOwn(rawProps, key) &amp;&amp;
                      // it's possible the original props was passed in as =
kebab-case
                      // and converted to camelCase (#955)
                      ((kebabKey =3D hyphenate(key)) =3D=3D=3D key || !hasO=
wn(rawProps, kebabKey)))) {
                  if (options) {
                      if (rawPrevProps &amp;&amp;
                          // for camelCase
                          (rawPrevProps[key] !=3D=3D undefined ||
                              // for kebab-case
                              rawPrevProps[kebabKey] !=3D=3D undefined)) {
                          props[key] =3D resolvePropValue(options, rawCurre=
ntProps, key, undefined, instance, true /* isAbsent */);
                      }
                  }
                  else {
                      delete props[key];
                  }
              }
          }
          // in the case of functional component w/o props declaration, pro=
ps and
          // attrs point to the same object so it should already have been =
updated.
          if (attrs !=3D=3D rawCurrentProps) {
              for (const key in attrs) {
                  if (!rawProps ||
                      (!hasOwn(rawProps, key) &amp;&amp;
                          (!false ))) {
                      delete attrs[key];
                      hasAttrsChanged =3D true;
                  }
              }
          }
      }
      // trigger updates for $attrs in case it's used in component slots
      if (hasAttrsChanged) {
          trigger(instance, "set" /* TriggerOpTypes.SET */, '$attrs');
      }
      {
          validateProps(rawProps || {}, props, instance);
      }
  }
  function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] =3D instance.propsOptions;
      let hasAttrsChanged =3D false;
      let rawCastValues;
      if (rawProps) {
          for (let key in rawProps) {
              // key, ref are reserved and never passed down
              if (isReservedProp(key)) {
                  continue;
              }
              const value =3D rawProps[key];
              // prop option names are camelized during normalization, so t=
o support
              // kebab -&gt; camel conversion here we need to camelize the =
key.
              let camelKey;
              if (options &amp;&amp; hasOwn(options, (camelKey =3D camelize=
(key)))) {
                  if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                      props[camelKey] =3D value;
                  }
                  else {
                      (rawCastValues || (rawCastValues =3D {}))[camelKey] =
=3D value;
                  }
              }
              else if (!isEmitListener(instance.emitsOptions, key)) {
                  if (!(key in attrs) || value !=3D=3D attrs[key]) {
                      attrs[key] =3D value;
                      hasAttrsChanged =3D true;
                  }
              }
          }
      }
      if (needCastKeys) {
          const rawCurrentProps =3D toRaw(props);
          const castValues =3D rawCastValues || EMPTY_OBJ;
          for (let i =3D 0; i &lt; needCastKeys.length; i++) {
              const key =3D needCastKeys[i];
              props[key] =3D resolvePropValue(options, rawCurrentProps, key=
, castValues[key], instance, !hasOwn(castValues, key));
          }
      }
      return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent)=
 {
      const opt =3D options[key];
      if (opt !=3D null) {
          const hasDefault =3D hasOwn(opt, 'default');
          // default values
          if (hasDefault &amp;&amp; value =3D=3D=3D undefined) {
              const defaultValue =3D opt.default;
              if (opt.type !=3D=3D Function &amp;&amp; isFunction(defaultVa=
lue)) {
                  const { propsDefaults } =3D instance;
                  if (key in propsDefaults) {
                      value =3D propsDefaults[key];
                  }
                  else {
                      setCurrentInstance(instance);
                      value =3D propsDefaults[key] =3D defaultValue.call(nu=
ll, props);
                      unsetCurrentInstance();
                  }
              }
              else {
                  value =3D defaultValue;
              }
          }
          // boolean casting
          if (opt[0 /* BooleanFlags.shouldCast */]) {
              if (isAbsent &amp;&amp; !hasDefault) {
                  value =3D false;
              }
              else if (opt[1 /* BooleanFlags.shouldCastTrue */] &amp;&amp;
                  (value =3D=3D=3D '' || value =3D=3D=3D hyphenate(key))) {
                  value =3D true;
              }
          }
      }
      return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin =3D false) {
      const cache =3D appContext.propsCache;
      const cached =3D cache.get(comp);
      if (cached) {
          return cached;
      }
      const raw =3D comp.props;
      const normalized =3D {};
      const needCastKeys =3D [];
      // apply mixin/extends props
      let hasExtends =3D false;
      if (!isFunction(comp)) {
          const extendProps =3D (raw) =3D&gt; {
              hasExtends =3D true;
              const [props, keys] =3D normalizePropsOptions(raw, appContext=
, true);
              extend(normalized, props);
              if (keys)
                  needCastKeys.push(...keys);
          };
          if (!asMixin &amp;&amp; appContext.mixins.length) {
              appContext.mixins.forEach(extendProps);
          }
          if (comp.extends) {
              extendProps(comp.extends);
          }
          if (comp.mixins) {
              comp.mixins.forEach(extendProps);
          }
      }
      if (!raw &amp;&amp; !hasExtends) {
          if (isObject(comp)) {
              cache.set(comp, EMPTY_ARR);
          }
          return EMPTY_ARR;
      }
      if (isArray(raw)) {
          for (let i =3D 0; i &lt; raw.length; i++) {
              if (!isString(raw[i])) {
                  warn(`props must be strings when using array syntax.`, ra=
w[i]);
              }
              const normalizedKey =3D camelize(raw[i]);
              if (validatePropName(normalizedKey)) {
                  normalized[normalizedKey] =3D EMPTY_OBJ;
              }
          }
      }
      else if (raw) {
          if (!isObject(raw)) {
              warn(`invalid props options`, raw);
          }
          for (const key in raw) {
              const normalizedKey =3D camelize(key);
              if (validatePropName(normalizedKey)) {
                  const opt =3D raw[key];
                  const prop =3D (normalized[normalizedKey] =3D
                      isArray(opt) || isFunction(opt) ? { type: opt } : Obj=
ect.assign({}, opt));
                  if (prop) {
                      const booleanIndex =3D getTypeIndex(Boolean, prop.typ=
e);
                      const stringIndex =3D getTypeIndex(String, prop.type)=
;
                      prop[0 /* BooleanFlags.shouldCast */] =3D booleanInde=
x &gt; -1;
                      prop[1 /* BooleanFlags.shouldCastTrue */] =3D
                          stringIndex &lt; 0 || booleanIndex &lt; stringInd=
ex;
                      // if the prop needs boolean casting or default value
                      if (booleanIndex &gt; -1 || hasOwn(prop, 'default')) =
{
                          needCastKeys.push(normalizedKey);
                      }
                  }
              }
          }
      }
      const res =3D [normalized, needCastKeys];
      if (isObject(comp)) {
          cache.set(comp, res);
      }
      return res;
  }
  function validatePropName(key) {
      if (key[0] !=3D=3D '$') {
          return true;
      }
      else {
          warn(`Invalid prop name: "${key}" is a reserved property.`);
      }
      return false;
  }
  // use function string name to check type constructors
  // so that it works across vms / iframes.
  function getType(ctor) {
      const match =3D ctor &amp;&amp; ctor.toString().match(/^\s*(function|=
class) (\w+)/);
      return match ? match[2] : ctor =3D=3D=3D null ? 'null' : '';
  }
  function isSameType(a, b) {
      return getType(a) =3D=3D=3D getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
      if (isArray(expectedTypes)) {
          return expectedTypes.findIndex(t =3D&gt; isSameType(t, type));
      }
      else if (isFunction(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1;
      }
      return -1;
  }
  /**
   * dev only
   */
  function validateProps(rawProps, props, instance) {
      const resolvedValues =3D toRaw(props);
      const options =3D instance.propsOptions[0];
      for (const key in options) {
          let opt =3D options[key];
          if (opt =3D=3D null)
              continue;
          validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key=
) &amp;&amp; !hasOwn(rawProps, hyphenate(key)));
      }
  }
  /**
   * dev only
   */
  function validateProp(name, value, prop, isAbsent) {
      const { type, required, validator } =3D prop;
      // required!
      if (required &amp;&amp; isAbsent) {
          warn('Missing required prop: "' + name + '"');
          return;
      }
      // missing but optional
      if (value =3D=3D null &amp;&amp; !prop.required) {
          return;
      }
      // type check
      if (type !=3D null &amp;&amp; type !=3D=3D true) {
          let isValid =3D false;
          const types =3D isArray(type) ? type : [type];
          const expectedTypes =3D [];
          // value is valid as long as one of the specified types match
          for (let i =3D 0; i &lt; types.length &amp;&amp; !isValid; i++) {
              const { valid, expectedType } =3D assertType(value, types[i])=
;
              expectedTypes.push(expectedType || '');
              isValid =3D valid;
          }
          if (!isValid) {
              warn(getInvalidTypeMessage(name, value, expectedTypes));
              return;
          }
      }
      // custom validator
      if (validator &amp;&amp; !validator(value)) {
          warn('Invalid prop: custom validator check failed for prop "' + n=
ame + '".');
      }
  }
  const isSimpleType =3D /*#__PURE__*/ makeMap('String,Number,Boolean,Funct=
ion,Symbol,BigInt');
  /**
   * dev only
   */
  function assertType(value, type) {
      let valid;
      const expectedType =3D getType(type);
      if (isSimpleType(expectedType)) {
          const t =3D typeof value;
          valid =3D t =3D=3D=3D expectedType.toLowerCase();
          // for primitive wrapper objects
          if (!valid &amp;&amp; t =3D=3D=3D 'object') {
              valid =3D value instanceof type;
          }
      }
      else if (expectedType =3D=3D=3D 'Object') {
          valid =3D isObject(value);
      }
      else if (expectedType =3D=3D=3D 'Array') {
          valid =3D isArray(value);
      }
      else if (expectedType =3D=3D=3D 'null') {
          valid =3D value =3D=3D=3D null;
      }
      else {
          valid =3D value instanceof type;
      }
      return {
          valid,
          expectedType
      };
  }
  /**
   * dev only
   */
  function getInvalidTypeMessage(name, value, expectedTypes) {
      let message =3D `Invalid prop: type check failed for prop "${name}".`=
 +
          ` Expected ${expectedTypes.map(capitalize).join(' | ')}`;
      const expectedType =3D expectedTypes[0];
      const receivedType =3D toRawType(value);
      const expectedValue =3D styleValue(value, expectedType);
      const receivedValue =3D styleValue(value, receivedType);
      // check if we need to specify expected value
      if (expectedTypes.length =3D=3D=3D 1 &amp;&amp;
          isExplicable(expectedType) &amp;&amp;
          !isBoolean(expectedType, receivedType)) {
          message +=3D ` with value ${expectedValue}`;
      }
      message +=3D `, got ${receivedType} `;
      // check if we need to specify received value
      if (isExplicable(receivedType)) {
          message +=3D `with value ${receivedValue}.`;
      }
      return message;
  }
  /**
   * dev only
   */
  function styleValue(value, type) {
      if (type =3D=3D=3D 'String') {
          return `"${value}"`;
      }
      else if (type =3D=3D=3D 'Number') {
          return `${Number(value)}`;
      }
      else {
          return `${value}`;
      }
  }
  /**
   * dev only
   */
  function isExplicable(type) {
      const explicitTypes =3D ['string', 'number', 'boolean'];
      return explicitTypes.some(elem =3D&gt; type.toLowerCase() =3D=3D=3D e=
lem);
  }
  /**
   * dev only
   */
  function isBoolean(...args) {
      return args.some(elem =3D&gt; elem.toLowerCase() =3D=3D=3D 'boolean')=
;
  }

  const isInternalKey =3D (key) =3D&gt; key[0] =3D=3D=3D '_' || key =3D=3D=
=3D '$stable';
  const normalizeSlotValue =3D (value) =3D&gt; isArray(value)
      ? value.map(normalizeVNode)
      : [normalizeVNode(value)];
  const normalizeSlot =3D (key, rawSlot, ctx) =3D&gt; {
      if (rawSlot._n) {
          // already normalized - #5353
          return rawSlot;
      }
      const normalized =3D withCtx((...args) =3D&gt; {
          if (true &amp;&amp; currentInstance) {
              warn(`Slot "${key}" invoked outside of the render function: `=
 +
                  `this will not track dependencies used in the slot. ` +
                  `Invoke the slot function inside the render function inst=
ead.`);
          }
          return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c =3D false;
      return normalized;
  };
  const normalizeObjectSlots =3D (rawSlots, slots, instance) =3D&gt; {
      const ctx =3D rawSlots._ctx;
      for (const key in rawSlots) {
          if (isInternalKey(key))
              continue;
          const value =3D rawSlots[key];
          if (isFunction(value)) {
              slots[key] =3D normalizeSlot(key, value, ctx);
          }
          else if (value !=3D null) {
              {
                  warn(`Non-function value encountered for slot "${key}". `=
 +
                      `Prefer function slots for better performance.`);
              }
              const normalized =3D normalizeSlotValue(value);
              slots[key] =3D () =3D&gt; normalized;
          }
      }
  };
  const normalizeVNodeSlots =3D (instance, children) =3D&gt; {
      if (!isKeepAlive(instance.vnode) &amp;&amp;
          !(false )) {
          warn(`Non-function value encountered for default slot. ` +
              `Prefer function slots for better performance.`);
      }
      const normalized =3D normalizeSlotValue(children);
      instance.slots.default =3D () =3D&gt; normalized;
  };
  const initSlots =3D (instance, children) =3D&gt; {
      if (instance.vnode.shapeFlag &amp; 32 /* ShapeFlags.SLOTS_CHILDREN */=
) {
          const type =3D children._;
          if (type) {
              // users can get the shallow readonly version of the slots ob=
ject through `this.$slots`,
              // we should avoid the proxy object polluting the slots of th=
e internal instance
              instance.slots =3D toRaw(children);
              // make compiler marker non-enumerable
              def(children, '_', type);
          }
          else {
              normalizeObjectSlots(children, (instance.slots =3D {}));
          }
      }
      else {
          instance.slots =3D {};
          if (children) {
              normalizeVNodeSlots(instance, children);
          }
      }
      def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots =3D (instance, children, optimized) =3D&gt; {
      const { vnode, slots } =3D instance;
      let needDeletionCheck =3D true;
      let deletionComparisonTarget =3D EMPTY_OBJ;
      if (vnode.shapeFlag &amp; 32 /* ShapeFlags.SLOTS_CHILDREN */) {
          const type =3D children._;
          if (type) {
              // compiled slots.
              if (isHmrUpdating) {
                  // Parent was HMR updated so slot content may have change=
d.
                  // force update slots and mark instance for hmr as well
                  extend(slots, children);
              }
              else if (optimized &amp;&amp; type =3D=3D=3D 1 /* SlotFlags.S=
TABLE */) {
                  // compiled AND stable.
                  // no need to update, and skip stale slots removal.
                  needDeletionCheck =3D false;
              }
              else {
                  // compiled but dynamic (v-if/v-for on slots) - update sl=
ots, but skip
                  // normalization.
                  extend(slots, children);
                  // #2893
                  // when rendering the optimized slots by manually written=
 render function,
                  // we need to delete the `slots._` flag if necessary to m=
ake subsequent updates reliable,
                  // i.e. let the `renderSlot` create the bailed Fragment
                  if (!optimized &amp;&amp; type =3D=3D=3D 1 /* SlotFlags.S=
TABLE */) {
                      delete slots._;
                  }
              }
          }
          else {
              needDeletionCheck =3D !children.$stable;
              normalizeObjectSlots(children, slots);
          }
          deletionComparisonTarget =3D children;
      }
      else if (children) {
          // non slot object children (direct value) passed to a component
          normalizeVNodeSlots(instance, children);
          deletionComparisonTarget =3D { default: 1 };
      }
      // delete stale slots
      if (needDeletionCheck) {
          for (const key in slots) {
              if (!isInternalKey(key) &amp;&amp; !(key in deletionCompariso=
nTarget)) {
                  delete slots[key];
              }
          }
      }
  };

  function createAppContext() {
      return {
          app: null,
          config: {
              isNativeTag: NO,
              performance: false,
              globalProperties: {},
              optionMergeStrategies: {},
              errorHandler: undefined,
              warnHandler: undefined,
              compilerOptions: {}
          },
          mixins: [],
          components: {},
          directives: {},
          provides: Object.create(null),
          optionsCache: new WeakMap(),
          propsCache: new WeakMap(),
          emitsCache: new WeakMap()
      };
  }
  let uid$1 =3D 0;
  function createAppAPI(render, hydrate) {
      return function createApp(rootComponent, rootProps =3D null) {
          if (!isFunction(rootComponent)) {
              rootComponent =3D Object.assign({}, rootComponent);
          }
          if (rootProps !=3D null &amp;&amp; !isObject(rootProps)) {
              warn(`root props passed to app.mount() must be an object.`);
              rootProps =3D null;
          }
          const context =3D createAppContext();
          const installedPlugins =3D new Set();
          let isMounted =3D false;
          const app =3D (context.app =3D {
              _uid: uid$1++,
              _component: rootComponent,
              _props: rootProps,
              _container: null,
              _context: context,
              _instance: null,
              version,
              get config() {
                  return context.config;
              },
              set config(v) {
                  {
                      warn(`app.config cannot be replaced. Modify individua=
l options instead.`);
                  }
              },
              use(plugin, ...options) {
                  if (installedPlugins.has(plugin)) {
                      warn(`Plugin has already been applied to target app.`=
);
                  }
                  else if (plugin &amp;&amp; isFunction(plugin.install)) {
                      installedPlugins.add(plugin);
                      plugin.install(app, ...options);
                  }
                  else if (isFunction(plugin)) {
                      installedPlugins.add(plugin);
                      plugin(app, ...options);
                  }
                  else {
                      warn(`A plugin must either be a function or an object=
 with an "install" ` +
                          `function.`);
                  }
                  return app;
              },
              mixin(mixin) {
                  {
                      if (!context.mixins.includes(mixin)) {
                          context.mixins.push(mixin);
                      }
                      else {
                          warn('Mixin has already been applied to target ap=
p' +
                              (mixin.name ? `: ${mixin.name}` : ''));
                      }
                  }
                  return app;
              },
              component(name, component) {
                  {
                      validateComponentName(name, context.config);
                  }
                  if (!component) {
                      return context.components[name];
                  }
                  if (context.components[name]) {
                      warn(`Component "${name}" has already been registered=
 in target app.`);
                  }
                  context.components[name] =3D component;
                  return app;
              },
              directive(name, directive) {
                  {
                      validateDirectiveName(name);
                  }
                  if (!directive) {
                      return context.directives[name];
                  }
                  if (context.directives[name]) {
                      warn(`Directive "${name}" has already been registered=
 in target app.`);
                  }
                  context.directives[name] =3D directive;
                  return app;
              },
              mount(rootContainer, isHydrate, isSVG) {
                  if (!isMounted) {
                      // #5571
                      if (rootContainer.__vue_app__) {
                          warn(`There is already an app instance mounted on=
 the host container.\n` +
                              ` If you want to mount another app on the sam=
e host container,` +
                              ` you need to unmount the previous app by cal=
ling \`app.unmount()\` first.`);
                      }
                      const vnode =3D createVNode(rootComponent, rootProps)=
;
                      // store app context on the root VNode.
                      // this will be set on the root instance on initial m=
ount.
                      vnode.appContext =3D context;
                      // HMR root reload
                      {
                          context.reload =3D () =3D&gt; {
                              render(cloneVNode(vnode), rootContainer, isSV=
G);
                          };
                      }
                      if (isHydrate &amp;&amp; hydrate) {
                          hydrate(vnode, rootContainer);
                      }
                      else {
                          render(vnode, rootContainer, isSVG);
                      }
                      isMounted =3D true;
                      app._container =3D rootContainer;
                      rootContainer.__vue_app__ =3D app;
                      {
                          app._instance =3D vnode.component;
                          devtoolsInitApp(app, version);
                      }
                      return getExposeProxy(vnode.component) || vnode.compo=
nent.proxy;
                  }
                  else {
                      warn(`App has already been mounted.\n` +
                          `If you want to remount the same app, move your a=
pp creation logic ` +
                          `into a factory function and create fresh app ins=
tances for each ` +
                          `mount - e.g. \`const createMyApp =3D () =3D&gt; =
createApp(App)\``);
                  }
              },
              unmount() {
                  if (isMounted) {
                      render(null, app._container);
                      {
                          app._instance =3D null;
                          devtoolsUnmountApp(app);
                      }
                      delete app._container.__vue_app__;
                  }
                  else {
                      warn(`Cannot unmount an app that is not mounted.`);
                  }
              },
              provide(key, value) {
                  if (key in context.provides) {
                      warn(`App already provides property with key "${Strin=
g(key)}". ` +
                          `It will be overwritten with the new value.`);
                  }
                  context.provides[key] =3D value;
                  return app;
              }
          });
          return app;
      };
  }

  /**
   * Function for handling a template ref
   */
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount =3D f=
alse) {
      if (isArray(rawRef)) {
          rawRef.forEach((r, i) =3D&gt; setRef(r, oldRawRef &amp;&amp; (isA=
rray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmou=
nt));
          return;
      }
      if (isAsyncWrapper(vnode) &amp;&amp; !isUnmount) {
          // when mounting async components, nothing needs to be done,
          // because the template ref is forwarded to inner component
          return;
      }
      const refValue =3D vnode.shapeFlag &amp; 4 /* ShapeFlags.STATEFUL_COM=
PONENT */
          ? getExposeProxy(vnode.component) || vnode.component.proxy
          : vnode.el;
      const value =3D isUnmount ? null : refValue;
      const { i: owner, r: ref } =3D rawRef;
      if (!owner) {
          warn(`Missing ref owner context. ref cannot be used on hoisted vn=
odes. ` +
              `A vnode with ref must be created inside the render function.=
`);
          return;
      }
      const oldRef =3D oldRawRef &amp;&amp; oldRawRef.r;
      const refs =3D owner.refs =3D=3D=3D EMPTY_OBJ ? (owner.refs =3D {}) :=
 owner.refs;
      const setupState =3D owner.setupState;
      // dynamic ref changed. unset old ref
      if (oldRef !=3D null &amp;&amp; oldRef !=3D=3D ref) {
          if (isString(oldRef)) {
              refs[oldRef] =3D null;
              if (hasOwn(setupState, oldRef)) {
                  setupState[oldRef] =3D null;
              }
          }
          else if (isRef(oldRef)) {
              oldRef.value =3D null;
          }
      }
      if (isFunction(ref)) {
          callWithErrorHandling(ref, owner, 12 /* ErrorCodes.FUNCTION_REF *=
/, [value, refs]);
      }
      else {
          const _isString =3D isString(ref);
          const _isRef =3D isRef(ref);
          if (_isString || _isRef) {
              const doSet =3D () =3D&gt; {
                  if (rawRef.f) {
                      const existing =3D _isString
                          ? hasOwn(setupState, ref)
                              ? setupState[ref]
                              : refs[ref]
                          : ref.value;
                      if (isUnmount) {
                          isArray(existing) &amp;&amp; remove(existing, ref=
Value);
                      }
                      else {
                          if (!isArray(existing)) {
                              if (_isString) {
                                  refs[ref] =3D [refValue];
                                  if (hasOwn(setupState, ref)) {
                                      setupState[ref] =3D refs[ref];
                                  }
                              }
                              else {
                                  ref.value =3D [refValue];
                                  if (rawRef.k)
                                      refs[rawRef.k] =3D ref.value;
                              }
                          }
                          else if (!existing.includes(refValue)) {
                              existing.push(refValue);
                          }
                      }
                  }
                  else if (_isString) {
                      refs[ref] =3D value;
                      if (hasOwn(setupState, ref)) {
                          setupState[ref] =3D value;
                      }
                  }
                  else if (_isRef) {
                      ref.value =3D value;
                      if (rawRef.k)
                          refs[rawRef.k] =3D value;
                  }
                  else {
                      warn('Invalid template ref type:', ref, `(${typeof re=
f})`);
                  }
              };
              if (value) {
                  doSet.id =3D -1;
                  queuePostRenderEffect(doSet, parentSuspense);
              }
              else {
                  doSet();
              }
          }
          else {
              warn('Invalid template ref type:', ref, `(${typeof ref})`);
          }
      }
  }

  let hasMismatch =3D false;
  const isSVGContainer =3D (container) =3D&gt; /svg/.test(container.namespa=
ceURI) &amp;&amp; container.tagName !=3D=3D 'foreignObject';
  const isComment =3D (node) =3D&gt; node.nodeType =3D=3D=3D 8 /* DOMNodeTy=
pes.COMMENT */;
  // Note: hydration is DOM-specific
  // But we have to place it in core due to tight coupling with core - spli=
tting
  // it out creates a ton of unnecessary complexity.
  // Hydration also depends on some renderer internal logic which needs to =
be
  // passed in via arguments.
  function createHydrationFunctions(rendererInternals) {
      const { mt: mountComponent, p: patch, o: { patchProp, createText, nex=
tSibling, parentNode, remove, insert, createComment } } =3D rendererInterna=
ls;
      const hydrate =3D (vnode, container) =3D&gt; {
          if (!container.hasChildNodes()) {
              warn(`Attempting to hydrate existing markup but container is =
empty. ` +
                      `Performing full mount instead.`);
              patch(null, vnode, container);
              flushPostFlushCbs();
              container._vnode =3D vnode;
              return;
          }
          hasMismatch =3D false;
          hydrateNode(container.firstChild, vnode, null, null, null);
          flushPostFlushCbs();
          container._vnode =3D vnode;
          if (hasMismatch &amp;&amp; !false) {
              // this error should show up in production
              console.error(`Hydration completed but contains mismatches.`)=
;
          }
      };
      const hydrateNode =3D (node, vnode, parentComponent, parentSuspense, =
slotScopeIds, optimized =3D false) =3D&gt; {
          const isFragmentStart =3D isComment(node) &amp;&amp; node.data =
=3D=3D=3D '[';
          const onMismatch =3D () =3D&gt; handleMismatch(node, vnode, paren=
tComponent, parentSuspense, slotScopeIds, isFragmentStart);
          const { type, ref, shapeFlag, patchFlag } =3D vnode;
          let domType =3D node.nodeType;
          vnode.el =3D node;
          if (patchFlag =3D=3D=3D -2 /* PatchFlags.BAIL */) {
              optimized =3D false;
              vnode.dynamicChildren =3D null;
          }
          let nextNode =3D null;
          switch (type) {
              case Text:
                  if (domType !=3D=3D 3 /* DOMNodeTypes.TEXT */) {
                      // #5728 empty text node inside a slot can cause hydr=
ation failure
                      // because the server rendered HTML won't contain a t=
ext node
                      if (vnode.children =3D=3D=3D '') {
                          insert((vnode.el =3D createText('')), parentNode(=
node), node);
                          nextNode =3D node;
                      }
                      else {
                          nextNode =3D onMismatch();
                      }
                  }
                  else {
                      if (node.data !=3D=3D vnode.children) {
                          hasMismatch =3D true;
                          warn(`Hydration text mismatch:` +
                                  `\n- Client: ${JSON.stringify(node.data)}=
` +
                                  `\n- Server: ${JSON.stringify(vnode.child=
ren)}`);
                          node.data =3D vnode.children;
                      }
                      nextNode =3D nextSibling(node);
                  }
                  break;
              case Comment:
                  if (domType !=3D=3D 8 /* DOMNodeTypes.COMMENT */ || isFra=
gmentStart) {
                      nextNode =3D onMismatch();
                  }
                  else {
                      nextNode =3D nextSibling(node);
                  }
                  break;
              case Static:
                  if (isFragmentStart) {
                      // entire template is static but SSRed as a fragment
                      node =3D nextSibling(node);
                      domType =3D node.nodeType;
                  }
                  if (domType =3D=3D=3D 1 /* DOMNodeTypes.ELEMENT */ || dom=
Type =3D=3D=3D 3 /* DOMNodeTypes.TEXT */) {
                      // determine anchor, adopt content
                      nextNode =3D node;
                      // if the static vnode has its content stripped durin=
g build,
                      // adopt it from the server-rendered HTML.
                      const needToAdoptContent =3D !vnode.children.length;
                      for (let i =3D 0; i &lt; vnode.staticCount; i++) {
                          if (needToAdoptContent)
                              vnode.children +=3D
                                  nextNode.nodeType =3D=3D=3D 1 /* DOMNodeT=
ypes.ELEMENT */
                                      ? nextNode.outerHTML
                                      : nextNode.data;
                          if (i =3D=3D=3D vnode.staticCount - 1) {
                              vnode.anchor =3D nextNode;
                          }
                          nextNode =3D nextSibling(nextNode);
                      }
                      return isFragmentStart ? nextSibling(nextNode) : next=
Node;
                  }
                  else {
                      onMismatch();
                  }
                  break;
              case Fragment:
                  if (!isFragmentStart) {
                      nextNode =3D onMismatch();
                  }
                  else {
                      nextNode =3D hydrateFragment(node, vnode, parentCompo=
nent, parentSuspense, slotScopeIds, optimized);
                  }
                  break;
              default:
                  if (shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */) {
                      if (domType !=3D=3D 1 /* DOMNodeTypes.ELEMENT */ ||
                          vnode.type.toLowerCase() !=3D=3D
                              node.tagName.toLowerCase()) {
                          nextNode =3D onMismatch();
                      }
                      else {
                          nextNode =3D hydrateElement(node, vnode, parentCo=
mponent, parentSuspense, slotScopeIds, optimized);
                      }
                  }
                  else if (shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
                      // when setting up the render effect, if the initial =
vnode already
                      // has .el set, the component will perform hydration =
instead of mount
                      // on its sub-tree.
                      vnode.slotScopeIds =3D slotScopeIds;
                      const container =3D parentNode(node);
                      mountComponent(vnode, container, null, parentComponen=
t, parentSuspense, isSVGContainer(container), optimized);
                      // component may be async, so in the case of fragment=
s we cannot rely
                      // on component's rendered output to determine the en=
d of the fragment
                      // instead, we do a lookahead to find the end anchor =
node.
                      nextNode =3D isFragmentStart
                          ? locateClosingAsyncAnchor(node)
                          : nextSibling(node);
                      // #4293 teleport as component root
                      if (nextNode &amp;&amp;
                          isComment(nextNode) &amp;&amp;
                          nextNode.data =3D=3D=3D 'teleport end') {
                          nextNode =3D nextSibling(nextNode);
                      }
                      // #3787
                      // if component is async, it may get moved / unmounte=
d before its
                      // inner component is loaded, so we need to give it a=
 placeholder
                      // vnode that matches its adopted DOM.
                      if (isAsyncWrapper(vnode)) {
                          let subTree;
                          if (isFragmentStart) {
                              subTree =3D createVNode(Fragment);
                              subTree.anchor =3D nextNode
                                  ? nextNode.previousSibling
                                  : container.lastChild;
                          }
                          else {
                              subTree =3D
                                  node.nodeType =3D=3D=3D 3 ? createTextVNo=
de('') : createVNode('div');
                          }
                          subTree.el =3D node;
                          vnode.component.subTree =3D subTree;
                      }
                  }
                  else if (shapeFlag &amp; 64 /* ShapeFlags.TELEPORT */) {
                      if (domType !=3D=3D 8 /* DOMNodeTypes.COMMENT */) {
                          nextNode =3D onMismatch();
                      }
                      else {
                          nextNode =3D vnode.type.hydrate(node, vnode, pare=
ntComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hy=
drateChildren);
                      }
                  }
                  else if (shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
                      nextNode =3D vnode.type.hydrate(node, vnode, parentCo=
mponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, op=
timized, rendererInternals, hydrateNode);
                  }
                  else {
                      warn('Invalid HostVNode type:', type, `(${typeof type=
})`);
                  }
          }
          if (ref !=3D null) {
              setRef(ref, null, parentSuspense, vnode);
          }
          return nextNode;
      };
      const hydrateElement =3D (el, vnode, parentComponent, parentSuspense,=
 slotScopeIds, optimized) =3D&gt; {
          optimized =3D optimized || !!vnode.dynamicChildren;
          const { type, props, patchFlag, shapeFlag, dirs } =3D vnode;
          // #4006 for form elements with non-string v-model value bindings
          // e.g. &lt;option :value=3D"obj"&gt;, &lt;input type=3D"checkbox=
" :true-value=3D"1"&gt;
          const forcePatchValue =3D (type =3D=3D=3D 'input' &amp;&amp; dirs=
) || type =3D=3D=3D 'option';
          // skip props &amp; children if this is hoisted static nodes
          // #5405 in dev, always hydrate children for HMR
          {
              if (dirs) {
                  invokeDirectiveHook(vnode, null, parentComponent, 'create=
d');
              }
              // props
              if (props) {
                  if (forcePatchValue ||
                      !optimized ||
                      patchFlag &amp; (16 /* PatchFlags.FULL_PROPS */ | 32 =
/* PatchFlags.HYDRATE_EVENTS */)) {
                      for (const key in props) {
                          if ((forcePatchValue &amp;&amp; key.endsWith('val=
ue')) ||
                              (isOn(key) &amp;&amp; !isReservedProp(key))) =
{
                              patchProp(el, key, null, props[key], false, u=
ndefined, parentComponent);
                          }
                      }
                  }
                  else if (props.onClick) {
                      // Fast path for click listeners (which is most often=
) to avoid
                      // iterating through props.
                      patchProp(el, 'onClick', null, props.onClick, false, =
undefined, parentComponent);
                  }
              }
              // vnode / directive hooks
              let vnodeHooks;
              if ((vnodeHooks =3D props &amp;&amp; props.onVnodeBeforeMount=
)) {
                  invokeVNodeHook(vnodeHooks, parentComponent, vnode);
              }
              if (dirs) {
                  invokeDirectiveHook(vnode, null, parentComponent, 'before=
Mount');
              }
              if ((vnodeHooks =3D props &amp;&amp; props.onVnodeMounted) ||=
 dirs) {
                  queueEffectWithSuspense(() =3D&gt; {
                      vnodeHooks &amp;&amp; invokeVNodeHook(vnodeHooks, par=
entComponent, vnode);
                      dirs &amp;&amp; invokeDirectiveHook(vnode, null, pare=
ntComponent, 'mounted');
                  }, parentSuspense);
              }
              // children
              if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */ &amp;&=
amp;
                  // skip if element has innerHTML / textContent
                  !(props &amp;&amp; (props.innerHTML || props.textContent)=
)) {
                  let next =3D hydrateChildren(el.firstChild, vnode, el, pa=
rentComponent, parentSuspense, slotScopeIds, optimized);
                  let hasWarned =3D false;
                  while (next) {
                      hasMismatch =3D true;
                      if (!hasWarned) {
                          warn(`Hydration children mismatch in &lt;${vnode.=
type}&gt;: ` +
                              `server rendered element contains more child =
nodes than client vdom.`);
                          hasWarned =3D true;
                      }
                      // The SSRed DOM contains more nodes than it should. =
Remove them.
                      const cur =3D next;
                      next =3D next.nextSibling;
                      remove(cur);
                  }
              }
              else if (shapeFlag &amp; 8 /* ShapeFlags.TEXT_CHILDREN */) {
                  if (el.textContent !=3D=3D vnode.children) {
                      hasMismatch =3D true;
                      warn(`Hydration text content mismatch in &lt;${vnode.=
type}&gt;:\n` +
                              `- Client: ${el.textContent}\n` +
                              `- Server: ${vnode.children}`);
                      el.textContent =3D vnode.children;
                  }
              }
          }
          return el.nextSibling;
      };
      const hydrateChildren =3D (node, parentVNode, container, parentCompon=
ent, parentSuspense, slotScopeIds, optimized) =3D&gt; {
          optimized =3D optimized || !!parentVNode.dynamicChildren;
          const children =3D parentVNode.children;
          const l =3D children.length;
          let hasWarned =3D false;
          for (let i =3D 0; i &lt; l; i++) {
              const vnode =3D optimized
                  ? children[i]
                  : (children[i] =3D normalizeVNode(children[i]));
              if (node) {
                  node =3D hydrateNode(node, vnode, parentComponent, parent=
Suspense, slotScopeIds, optimized);
              }
              else if (vnode.type =3D=3D=3D Text &amp;&amp; !vnode.children=
) {
                  continue;
              }
              else {
                  hasMismatch =3D true;
                  if (!hasWarned) {
                      warn(`Hydration children mismatch in &lt;${container.=
tagName.toLowerCase()}&gt;: ` +
                          `server rendered element contains fewer child nod=
es than client vdom.`);
                      hasWarned =3D true;
                  }
                  // the SSRed DOM didn't contain enough nodes. Mount the m=
issing ones.
                  patch(null, vnode, container, null, parentComponent, pare=
ntSuspense, isSVGContainer(container), slotScopeIds);
              }
          }
          return node;
      };
      const hydrateFragment =3D (node, vnode, parentComponent, parentSuspen=
se, slotScopeIds, optimized) =3D&gt; {
          const { slotScopeIds: fragmentSlotScopeIds } =3D vnode;
          if (fragmentSlotScopeIds) {
              slotScopeIds =3D slotScopeIds
                  ? slotScopeIds.concat(fragmentSlotScopeIds)
                  : fragmentSlotScopeIds;
          }
          const container =3D parentNode(node);
          const next =3D hydrateChildren(nextSibling(node), vnode, containe=
r, parentComponent, parentSuspense, slotScopeIds, optimized);
          if (next &amp;&amp; isComment(next) &amp;&amp; next.data =3D=3D=
=3D ']') {
              return nextSibling((vnode.anchor =3D next));
          }
          else {
              // fragment didn't hydrate successfully, since we didn't get =
a end anchor
              // back. This should have led to node/children mismatch warni=
ngs.
              hasMismatch =3D true;
              // since the anchor is missing, we need to create one and ins=
ert it
              insert((vnode.anchor =3D createComment(`]`)), container, next=
);
              return next;
          }
      };
      const handleMismatch =3D (node, vnode, parentComponent, parentSuspens=
e, slotScopeIds, isFragment) =3D&gt; {
          hasMismatch =3D true;
          warn(`Hydration node mismatch:\n- Client vnode:`, vnode.type, `\n=
- Server rendered DOM:`, node, node.nodeType =3D=3D=3D 3 /* DOMNodeTypes.TE=
XT */
                  ? `(text)`
                  : isComment(node) &amp;&amp; node.data =3D=3D=3D '['
                      ? `(start of fragment)`
                      : ``);
          vnode.el =3D null;
          if (isFragment) {
              // remove excessive fragment nodes
              const end =3D locateClosingAsyncAnchor(node);
              while (true) {
                  const next =3D nextSibling(node);
                  if (next &amp;&amp; next !=3D=3D end) {
                      remove(next);
                  }
                  else {
                      break;
                  }
              }
          }
          const next =3D nextSibling(node);
          const container =3D parentNode(node);
          remove(node);
          patch(null, vnode, container, next, parentComponent, parentSuspen=
se, isSVGContainer(container), slotScopeIds);
          return next;
      };
      const locateClosingAsyncAnchor =3D (node) =3D&gt; {
          let match =3D 0;
          while (node) {
              node =3D nextSibling(node);
              if (node &amp;&amp; isComment(node)) {
                  if (node.data =3D=3D=3D '[')
                      match++;
                  if (node.data =3D=3D=3D ']') {
                      if (match =3D=3D=3D 0) {
                          return nextSibling(node);
                      }
                      else {
                          match--;
                      }
                  }
              }
          }
          return node;
      };
      return [hydrate, hydrateNode];
  }

  /* eslint-disable no-restricted-globals */
  let supported;
  let perf;
  function startMeasure(instance, type) {
      if (instance.appContext.config.performance &amp;&amp; isSupported()) =
{
          perf.mark(`vue-${type}-${instance.uid}`);
      }
      {
          devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Da=
te.now());
      }
  }
  function endMeasure(instance, type) {
      if (instance.appContext.config.performance &amp;&amp; isSupported()) =
{
          const startTag =3D `vue-${type}-${instance.uid}`;
          const endTag =3D startTag + `:end`;
          perf.mark(endTag);
          perf.measure(`&lt;${formatComponentName(instance, instance.type)}=
&gt; ${type}`, startTag, endTag);
          perf.clearMarks(startTag);
          perf.clearMarks(endTag);
      }
      {
          devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date=
.now());
      }
  }
  function isSupported() {
      if (supported !=3D=3D undefined) {
          return supported;
      }
      if (typeof window !=3D=3D 'undefined' &amp;&amp; window.performance) =
{
          supported =3D true;
          perf =3D window.performance;
      }
      else {
          supported =3D false;
      }
      return supported;
  }

  const queuePostRenderEffect =3D queueEffectWithSuspense
      ;
  /**
   * The createRenderer function accepts two generic arguments:
   * HostNode and HostElement, corresponding to Node and Element types in t=
he
   * host environment. For example, for runtime-dom, HostNode would be the =
DOM
   * `Node` interface and HostElement would be the DOM `Element` interface.
   *
   * Custom renderers can pass in the platform specific types like this:
   *
   * ``` js
   * const { render, createApp } =3D createRenderer&lt;Node, Element&gt;({
   *   patchProp,
   *   ...nodeOps
   * })
   * ```
   */
  function createRenderer(options) {
      return baseCreateRenderer(options);
  }
  // Separate API for creating hydration-enabled renderer.
  // Hydration logic is only used when calling this function, making it
  // tree-shakable.
  function createHydrationRenderer(options) {
      return baseCreateRenderer(options, createHydrationFunctions);
  }
  // implementation
  function baseCreateRenderer(options, createHydrationFns) {
      const target =3D getGlobalThis();
      target.__VUE__ =3D true;
      {
          setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
      }
      const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchP=
rop, createElement: hostCreateElement, createText: hostCreateText, createCo=
mment: hostCreateComment, setText: hostSetText, setElementText: hostSetElem=
entText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScope=
Id: hostSetScopeId =3D NOOP, insertStaticContent: hostInsertStaticContent }=
 =3D options;
      // Note: functions inside this closure should use `const xxx =3D () =
=3D&gt; {}`
      // style in order to prevent being inlined by minifiers.
      const patch =3D (n1, n2, container, anchor =3D null, parentComponent =
=3D null, parentSuspense =3D null, isSVG =3D false, slotScopeIds =3D null, =
optimized =3D isHmrUpdating ? false : !!n2.dynamicChildren) =3D&gt; {
          if (n1 =3D=3D=3D n2) {
              return;
          }
          // patching &amp; not same type, unmount old tree
          if (n1 &amp;&amp; !isSameVNodeType(n1, n2)) {
              anchor =3D getNextHostNode(n1);
              unmount(n1, parentComponent, parentSuspense, true);
              n1 =3D null;
          }
          if (n2.patchFlag =3D=3D=3D -2 /* PatchFlags.BAIL */) {
              optimized =3D false;
              n2.dynamicChildren =3D null;
          }
          const { type, ref, shapeFlag } =3D n2;
          switch (type) {
              case Text:
                  processText(n1, n2, container, anchor);
                  break;
              case Comment:
                  processCommentNode(n1, n2, container, anchor);
                  break;
              case Static:
                  if (n1 =3D=3D null) {
                      mountStaticNode(n2, container, anchor, isSVG);
                  }
                  else {
                      patchStaticNode(n1, n2, container, isSVG);
                  }
                  break;
              case Fragment:
                  processFragment(n1, n2, container, anchor, parentComponen=
t, parentSuspense, isSVG, slotScopeIds, optimized);
                  break;
              default:
                  if (shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */) {
                      processElement(n1, n2, container, anchor, parentCompo=
nent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
                      processComponent(n1, n2, container, anchor, parentCom=
ponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (shapeFlag &amp; 64 /* ShapeFlags.TELEPORT */) {
                      type.process(n1, n2, container, anchor, parentCompone=
nt, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                  }
                  else if (shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
                      type.process(n1, n2, container, anchor, parentCompone=
nt, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                  }
                  else {
                      warn('Invalid VNode type:', type, `(${typeof type})`)=
;
                  }
          }
          // set ref
          if (ref !=3D null &amp;&amp; parentComponent) {
              setRef(ref, n1 &amp;&amp; n1.ref, parentSuspense, n2 || n1, !=
n2);
          }
      };
      const processText =3D (n1, n2, container, anchor) =3D&gt; {
          if (n1 =3D=3D null) {
              hostInsert((n2.el =3D hostCreateText(n2.children)), container=
, anchor);
          }
          else {
              const el =3D (n2.el =3D n1.el);
              if (n2.children !=3D=3D n1.children) {
                  hostSetText(el, n2.children);
              }
          }
      };
      const processCommentNode =3D (n1, n2, container, anchor) =3D&gt; {
          if (n1 =3D=3D null) {
              hostInsert((n2.el =3D hostCreateComment(n2.children || '')), =
container, anchor);
          }
          else {
              // there's no support for dynamic comments
              n2.el =3D n1.el;
          }
      };
      const mountStaticNode =3D (n2, container, anchor, isSVG) =3D&gt; {
          [n2.el, n2.anchor] =3D hostInsertStaticContent(n2.children, conta=
iner, anchor, isSVG, n2.el, n2.anchor);
      };
      /**
       * Dev / HMR only
       */
      const patchStaticNode =3D (n1, n2, container, isSVG) =3D&gt; {
          // static nodes are only patched during dev for HMR
          if (n2.children !=3D=3D n1.children) {
              const anchor =3D hostNextSibling(n1.anchor);
              // remove existing
              removeStaticNode(n1);
              [n2.el, n2.anchor] =3D hostInsertStaticContent(n2.children, c=
ontainer, anchor, isSVG);
          }
          else {
              n2.el =3D n1.el;
              n2.anchor =3D n1.anchor;
          }
      };
      const moveStaticNode =3D ({ el, anchor }, container, nextSibling) =3D=
&gt; {
          let next;
          while (el &amp;&amp; el !=3D=3D anchor) {
              next =3D hostNextSibling(el);
              hostInsert(el, container, nextSibling);
              el =3D next;
          }
          hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode =3D ({ el, anchor }) =3D&gt; {
          let next;
          while (el &amp;&amp; el !=3D=3D anchor) {
              next =3D hostNextSibling(el);
              hostRemove(el);
              el =3D next;
          }
          hostRemove(anchor);
      };
      const processElement =3D (n1, n2, container, anchor, parentComponent,=
 parentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          isSVG =3D isSVG || n2.type =3D=3D=3D 'svg';
          if (n1 =3D=3D null) {
              mountElement(n2, container, anchor, parentComponent, parentSu=
spense, isSVG, slotScopeIds, optimized);
          }
          else {
              patchElement(n1, n2, parentComponent, parentSuspense, isSVG, =
slotScopeIds, optimized);
          }
      };
      const mountElement =3D (vnode, container, anchor, parentComponent, pa=
rentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          let el;
          let vnodeHook;
          const { type, props, shapeFlag, transition, dirs } =3D vnode;
          el =3D vnode.el =3D hostCreateElement(vnode.type, isSVG, props &a=
mp;&amp; props.is, props);
          // mount children first, since some props may rely on child conte=
nt
          // being already rendered, e.g. `&lt;select value&gt;`
          if (shapeFlag &amp; 8 /* ShapeFlags.TEXT_CHILDREN */) {
              hostSetElementText(el, vnode.children);
          }
          else if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
              mountChildren(vnode.children, el, null, parentComponent, pare=
ntSuspense, isSVG &amp;&amp; type !=3D=3D 'foreignObject', slotScopeIds, op=
timized);
          }
          if (dirs) {
              invokeDirectiveHook(vnode, null, parentComponent, 'created');
          }
          // scopeId
          setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponen=
t);
          // props
          if (props) {
              for (const key in props) {
                  if (key !=3D=3D 'value' &amp;&amp; !isReservedProp(key)) =
{
                      hostPatchProp(el, key, null, props[key], isSVG, vnode=
.children, parentComponent, parentSuspense, unmountChildren);
                  }
              }
              /**
               * Special case for setting value on DOM elements:
               * - it can be order-sensitive (e.g. should be set *after* mi=
n/max, #2325, #4024)
               * - it needs to be forced (#1471)
               * #2353 proposes adding another renderer option to configure=
 this, but
               * the properties affects are so finite it is worth special c=
asing it
               * here to reduce the complexity. (Special casing it also sho=
uld not
               * affect non-DOM renderers)
               */
              if ('value' in props) {
                  hostPatchProp(el, 'value', null, props.value);
              }
              if ((vnodeHook =3D props.onVnodeBeforeMount)) {
                  invokeVNodeHook(vnodeHook, parentComponent, vnode);
              }
          }
          {
              Object.defineProperty(el, '__vnode', {
                  value: vnode,
                  enumerable: false
              });
              Object.defineProperty(el, '__vueParentComponent', {
                  value: parentComponent,
                  enumerable: false
              });
          }
          if (dirs) {
              invokeDirectiveHook(vnode, null, parentComponent, 'beforeMoun=
t');
          }
          // #1583 For inside suspense + suspense not resolved case, enter =
hook should call when suspense resolved
          // #1689 For inside suspense + suspense resolved case, just call =
it
          const needCallTransitionHooks =3D (!parentSuspense || (parentSusp=
ense &amp;&amp; !parentSuspense.pendingBranch)) &amp;&amp;
              transition &amp;&amp;
              !transition.persisted;
          if (needCallTransitionHooks) {
              transition.beforeEnter(el);
          }
          hostInsert(el, container, anchor);
          if ((vnodeHook =3D props &amp;&amp; props.onVnodeMounted) ||
              needCallTransitionHooks ||
              dirs) {
              queuePostRenderEffect(() =3D&gt; {
                  vnodeHook &amp;&amp; invokeVNodeHook(vnodeHook, parentCom=
ponent, vnode);
                  needCallTransitionHooks &amp;&amp; transition.enter(el);
                  dirs &amp;&amp; invokeDirectiveHook(vnode, null, parentCo=
mponent, 'mounted');
              }, parentSuspense);
          }
      };
      const setScopeId =3D (el, vnode, scopeId, slotScopeIds, parentCompone=
nt) =3D&gt; {
          if (scopeId) {
              hostSetScopeId(el, scopeId);
          }
          if (slotScopeIds) {
              for (let i =3D 0; i &lt; slotScopeIds.length; i++) {
                  hostSetScopeId(el, slotScopeIds[i]);
              }
          }
          if (parentComponent) {
              let subTree =3D parentComponent.subTree;
              if (subTree.patchFlag &gt; 0 &amp;&amp;
                  subTree.patchFlag &amp; 2048 /* PatchFlags.DEV_ROOT_FRAGM=
ENT */) {
                  subTree =3D
                      filterSingleRoot(subTree.children) || subTree;
              }
              if (vnode =3D=3D=3D subTree) {
                  const parentVNode =3D parentComponent.vnode;
                  setScopeId(el, parentVNode, parentVNode.scopeId, parentVN=
ode.slotScopeIds, parentComponent.parent);
              }
          }
      };
      const mountChildren =3D (children, container, anchor, parentComponent=
, parentSuspense, isSVG, slotScopeIds, optimized, start =3D 0) =3D&gt; {
          for (let i =3D start; i &lt; children.length; i++) {
              const child =3D (children[i] =3D optimized
                  ? cloneIfMounted(children[i])
                  : normalizeVNode(children[i]));
              patch(null, child, container, anchor, parentComponent, parent=
Suspense, isSVG, slotScopeIds, optimized);
          }
      };
      const patchElement =3D (n1, n2, parentComponent, parentSuspense, isSV=
G, slotScopeIds, optimized) =3D&gt; {
          const el =3D (n2.el =3D n1.el);
          let { patchFlag, dynamicChildren, dirs } =3D n2;
          // #1426 take the old vnode's patch flag into account since user =
may clone a
          // compiler-generated vnode, which de-opts to FULL_PROPS
          patchFlag |=3D n1.patchFlag &amp; 16 /* PatchFlags.FULL_PROPS */;
          const oldProps =3D n1.props || EMPTY_OBJ;
          const newProps =3D n2.props || EMPTY_OBJ;
          let vnodeHook;
          // disable recurse in beforeUpdate hooks
          parentComponent &amp;&amp; toggleRecurse(parentComponent, false);
          if ((vnodeHook =3D newProps.onVnodeBeforeUpdate)) {
              invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          }
          if (dirs) {
              invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
          }
          parentComponent &amp;&amp; toggleRecurse(parentComponent, true);
          if (isHmrUpdating) {
              // HMR updated, force full diff
              patchFlag =3D 0;
              optimized =3D false;
              dynamicChildren =3D null;
          }
          const areChildrenSVG =3D isSVG &amp;&amp; n2.type !=3D=3D 'foreig=
nObject';
          if (dynamicChildren) {
              patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, p=
arentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
              if (parentComponent &amp;&amp; parentComponent.type.__hmrId) =
{
                  traverseStaticChildren(n1, n2);
              }
          }
          else if (!optimized) {
              // full diff
              patchChildren(n1, n2, el, null, parentComponent, parentSuspen=
se, areChildrenSVG, slotScopeIds, false);
          }
          if (patchFlag &gt; 0) {
              // the presence of a patchFlag means this element's render co=
de was
              // generated by the compiler and can take the fast path.
              // in this path old node and new node are guaranteed to have =
the same shape
              // (i.e. at the exact same position in the source template)
              if (patchFlag &amp; 16 /* PatchFlags.FULL_PROPS */) {
                  // element props contain dynamic keys, full diff needed
                  patchProps(el, n2, oldProps, newProps, parentComponent, p=
arentSuspense, isSVG);
              }
              else {
                  // class
                  // this flag is matched when the element has dynamic clas=
s bindings.
                  if (patchFlag &amp; 2 /* PatchFlags.CLASS */) {
                      if (oldProps.class !=3D=3D newProps.class) {
                          hostPatchProp(el, 'class', null, newProps.class, =
isSVG);
                      }
                  }
                  // style
                  // this flag is matched when the element has dynamic styl=
e bindings
                  if (patchFlag &amp; 4 /* PatchFlags.STYLE */) {
                      hostPatchProp(el, 'style', oldProps.style, newProps.s=
tyle, isSVG);
                  }
                  // props
                  // This flag is matched when the element has dynamic prop=
/attr bindings
                  // other than class and style. The keys of dynamic prop/a=
ttrs are saved for
                  // faster iteration.
                  // Note dynamic keys like :[foo]=3D"bar" will cause this =
optimization to
                  // bail out and go through a full diff because we need to=
 unset the old key
                  if (patchFlag &amp; 8 /* PatchFlags.PROPS */) {
                      // if the flag is present then dynamicProps must be n=
on-null
                      const propsToUpdate =3D n2.dynamicProps;
                      for (let i =3D 0; i &lt; propsToUpdate.length; i++) {
                          const key =3D propsToUpdate[i];
                          const prev =3D oldProps[key];
                          const next =3D newProps[key];
                          // #1471 force patch value
                          if (next !=3D=3D prev || key =3D=3D=3D 'value') {
                              hostPatchProp(el, key, prev, next, isSVG, n1.=
children, parentComponent, parentSuspense, unmountChildren);
                          }
                      }
                  }
              }
              // text
              // This flag is matched when the element has only dynamic tex=
t children.
              if (patchFlag &amp; 1 /* PatchFlags.TEXT */) {
                  if (n1.children !=3D=3D n2.children) {
                      hostSetElementText(el, n2.children);
                  }
              }
          }
          else if (!optimized &amp;&amp; dynamicChildren =3D=3D null) {
              // unoptimized, full diff
              patchProps(el, n2, oldProps, newProps, parentComponent, paren=
tSuspense, isSVG);
          }
          if ((vnodeHook =3D newProps.onVnodeUpdated) || dirs) {
              queuePostRenderEffect(() =3D&gt; {
                  vnodeHook &amp;&amp; invokeVNodeHook(vnodeHook, parentCom=
ponent, n2, n1);
                  dirs &amp;&amp; invokeDirectiveHook(n2, n1, parentCompone=
nt, 'updated');
              }, parentSuspense);
          }
      };
      // The fast path for blocks.
      const patchBlockChildren =3D (oldChildren, newChildren, fallbackConta=
iner, parentComponent, parentSuspense, isSVG, slotScopeIds) =3D&gt; {
          for (let i =3D 0; i &lt; newChildren.length; i++) {
              const oldVNode =3D oldChildren[i];
              const newVNode =3D newChildren[i];
              // Determine the container (parent element) for the patch.
              const container =3D=20
              // oldVNode may be an errored async setup() component inside =
Suspense
              // which will not have a mounted element
              oldVNode.el &amp;&amp;
                  // - In the case of a Fragment, we need to provide the ac=
tual parent
                  // of the Fragment itself so it can move its children.
                  (oldVNode.type =3D=3D=3D Fragment ||
                      // - In the case of different nodes, there is going t=
o be a replacement
                      // which also requires the correct parent container
                      !isSameVNodeType(oldVNode, newVNode) ||
                      // - In the case of a component, it could contain any=
thing.
                      oldVNode.shapeFlag &amp; (6 /* ShapeFlags.COMPONENT *=
/ | 64 /* ShapeFlags.TELEPORT */))
                  ? hostParentNode(oldVNode.el)
                  : // In other cases, the parent container is not actually=
 used so we
                      // just pass the block element here to avoid a DOM pa=
rentNode call.
                      fallbackContainer;
              patch(oldVNode, newVNode, container, null, parentComponent, p=
arentSuspense, isSVG, slotScopeIds, true);
          }
      };
      const patchProps =3D (el, vnode, oldProps, newProps, parentComponent,=
 parentSuspense, isSVG) =3D&gt; {
          if (oldProps !=3D=3D newProps) {
              if (oldProps !=3D=3D EMPTY_OBJ) {
                  for (const key in oldProps) {
                      if (!isReservedProp(key) &amp;&amp; !(key in newProps=
)) {
                          hostPatchProp(el, key, oldProps[key], null, isSVG=
, vnode.children, parentComponent, parentSuspense, unmountChildren);
                      }
                  }
              }
              for (const key in newProps) {
                  // empty string is not valid prop
                  if (isReservedProp(key))
                      continue;
                  const next =3D newProps[key];
                  const prev =3D oldProps[key];
                  // defer patching value
                  if (next !=3D=3D prev &amp;&amp; key !=3D=3D 'value') {
                      hostPatchProp(el, key, prev, next, isSVG, vnode.child=
ren, parentComponent, parentSuspense, unmountChildren);
                  }
              }
              if ('value' in newProps) {
                  hostPatchProp(el, 'value', oldProps.value, newProps.value=
);
              }
          }
      };
      const processFragment =3D (n1, n2, container, anchor, parentComponent=
, parentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          const fragmentStartAnchor =3D (n2.el =3D n1 ? n1.el : hostCreateT=
ext(''));
          const fragmentEndAnchor =3D (n2.anchor =3D n1 ? n1.anchor : hostC=
reateText(''));
          let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScope=
Ids } =3D n2;
          if (// #5523 dev root fragment may inherit directives
              (isHmrUpdating || patchFlag &amp; 2048 /* PatchFlags.DEV_ROOT=
_FRAGMENT */)) {
              // HMR updated / Dev root fragment (w/ comments), force full =
diff
              patchFlag =3D 0;
              optimized =3D false;
              dynamicChildren =3D null;
          }
          // check if this is a slot fragment with :slotted scope ids
          if (fragmentSlotScopeIds) {
              slotScopeIds =3D slotScopeIds
                  ? slotScopeIds.concat(fragmentSlotScopeIds)
                  : fragmentSlotScopeIds;
          }
          if (n1 =3D=3D null) {
              hostInsert(fragmentStartAnchor, container, anchor);
              hostInsert(fragmentEndAnchor, container, anchor);
              // a fragment can only have array children
              // since they are either generated by the compiler, or implic=
itly created
              // from arrays.
              mountChildren(n2.children, container, fragmentEndAnchor, pare=
ntComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
          else {
              if (patchFlag &gt; 0 &amp;&amp;
                  patchFlag &amp; 64 /* PatchFlags.STABLE_FRAGMENT */ &amp;=
&amp;
                  dynamicChildren &amp;&amp;
                  // #2715 the previous fragment could've been a BAILed one=
 as a result
                  // of renderSlot() with no valid children
                  n1.dynamicChildren) {
                  // a stable fragment (template root or &lt;template v-for=
&gt;) doesn't need to
                  // patch children order, but it may contain dynamicChildr=
en.
                  patchBlockChildren(n1.dynamicChildren, dynamicChildren, c=
ontainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
                  if (parentComponent &amp;&amp; parentComponent.type.__hmr=
Id) {
                      traverseStaticChildren(n1, n2);
                  }
                  else if (
                  // #2080 if the stable fragment has a key, it's a &lt;tem=
plate v-for&gt; that may
                  //  get moved around. Make sure all root level vnodes inh=
erit el.
                  // #2134 or if it's a component root, it may also get mov=
ed around
                  // as the component is being moved.
                  n2.key !=3D null ||
                      (parentComponent &amp;&amp; n2 =3D=3D=3D parentCompon=
ent.subTree)) {
                      traverseStaticChildren(n1, n2, true /* shallow */);
                  }
              }
              else {
                  // keyed / unkeyed, or manual fragments.
                  // for keyed &amp; unkeyed, since they are compiler gener=
ated from v-for,
                  // each child is guaranteed to be a block so the fragment=
 will never
                  // have dynamicChildren.
                  patchChildren(n1, n2, container, fragmentEndAnchor, paren=
tComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              }
          }
      };
      const processComponent =3D (n1, n2, container, anchor, parentComponen=
t, parentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          n2.slotScopeIds =3D slotScopeIds;
          if (n1 =3D=3D null) {
              if (n2.shapeFlag &amp; 512 /* ShapeFlags.COMPONENT_KEPT_ALIVE=
 */) {
                  parentComponent.ctx.activate(n2, container, anchor, isSVG=
, optimized);
              }
              else {
                  mountComponent(n2, container, anchor, parentComponent, pa=
rentSuspense, isSVG, optimized);
              }
          }
          else {
              updateComponent(n1, n2, optimized);
          }
      };
      const mountComponent =3D (initialVNode, container, anchor, parentComp=
onent, parentSuspense, isSVG, optimized) =3D&gt; {
          const instance =3D (initialVNode.component =3D createComponentIns=
tance(initialVNode, parentComponent, parentSuspense));
          if (instance.type.__hmrId) {
              registerHMR(instance);
          }
          {
              pushWarningContext(initialVNode);
              startMeasure(instance, `mount`);
          }
          // inject renderer internals for keepAlive
          if (isKeepAlive(initialVNode)) {
              instance.ctx.renderer =3D internals;
          }
          // resolve props and slots for setup context
          {
              {
                  startMeasure(instance, `init`);
              }
              setupComponent(instance);
              {
                  endMeasure(instance, `init`);
              }
          }
          // setup() is async. This component relies on async logic to be r=
esolved
          // before proceeding
          if (instance.asyncDep) {
              parentSuspense &amp;&amp; parentSuspense.registerDep(instance=
, setupRenderEffect);
              // Give it a placeholder if this is not hydration
              // TODO handle self-defined fallback
              if (!initialVNode.el) {
                  const placeholder =3D (instance.subTree =3D createVNode(C=
omment));
                  processCommentNode(null, placeholder, container, anchor);
              }
              return;
          }
          setupRenderEffect(instance, initialVNode, container, anchor, pare=
ntSuspense, isSVG, optimized);
          {
              popWarningContext();
              endMeasure(instance, `mount`);
          }
      };
      const updateComponent =3D (n1, n2, optimized) =3D&gt; {
          const instance =3D (n2.component =3D n1.component);
          if (shouldUpdateComponent(n1, n2, optimized)) {
              if (instance.asyncDep &amp;&amp;
                  !instance.asyncResolved) {
                  // async &amp; still pending - just update props and slot=
s
                  // since the component's reactive effect for render isn't=
 set-up yet
                  {
                      pushWarningContext(n2);
                  }
                  updateComponentPreRender(instance, n2, optimized);
                  {
                      popWarningContext();
                  }
                  return;
              }
              else {
                  // normal update
                  instance.next =3D n2;
                  // in case the child component is also queued, remove it =
to avoid
                  // double updating the same child component in the same f=
lush.
                  invalidateJob(instance.update);
                  // instance.update is the reactive effect.
                  instance.update();
              }
          }
          else {
              // no update needed. just copy over properties
              n2.el =3D n1.el;
              instance.vnode =3D n2;
          }
      };
      const setupRenderEffect =3D (instance, initialVNode, container, ancho=
r, parentSuspense, isSVG, optimized) =3D&gt; {
          const componentUpdateFn =3D () =3D&gt; {
              if (!instance.isMounted) {
                  let vnodeHook;
                  const { el, props } =3D initialVNode;
                  const { bm, m, parent } =3D instance;
                  const isAsyncWrapperVNode =3D isAsyncWrapper(initialVNode=
);
                  toggleRecurse(instance, false);
                  // beforeMount hook
                  if (bm) {
                      invokeArrayFns(bm);
                  }
                  // onVnodeBeforeMount
                  if (!isAsyncWrapperVNode &amp;&amp;
                      (vnodeHook =3D props &amp;&amp; props.onVnodeBeforeMo=
unt)) {
                      invokeVNodeHook(vnodeHook, parent, initialVNode);
                  }
                  toggleRecurse(instance, true);
                  if (el &amp;&amp; hydrateNode) {
                      // vnode has adopted host node - perform hydration in=
stead of mount.
                      const hydrateSubTree =3D () =3D&gt; {
                          {
                              startMeasure(instance, `render`);
                          }
                          instance.subTree =3D renderComponentRoot(instance=
);
                          {
                              endMeasure(instance, `render`);
                          }
                          {
                              startMeasure(instance, `hydrate`);
                          }
                          hydrateNode(el, instance.subTree, instance, paren=
tSuspense, null);
                          {
                              endMeasure(instance, `hydrate`);
                          }
                      };
                      if (isAsyncWrapperVNode) {
                          initialVNode.type.__asyncLoader().then(
                          // note: we are moving the render call into an as=
ync callback,
                          // which means it won't track dependencies - but =
it's ok because
                          // a server-rendered async wrapper is already in =
resolved state
                          // and it will never need to change.
                          () =3D&gt; !instance.isUnmounted &amp;&amp; hydra=
teSubTree());
                      }
                      else {
                          hydrateSubTree();
                      }
                  }
                  else {
                      {
                          startMeasure(instance, `render`);
                      }
                      const subTree =3D (instance.subTree =3D renderCompone=
ntRoot(instance));
                      {
                          endMeasure(instance, `render`);
                      }
                      {
                          startMeasure(instance, `patch`);
                      }
                      patch(null, subTree, container, anchor, instance, par=
entSuspense, isSVG);
                      {
                          endMeasure(instance, `patch`);
                      }
                      initialVNode.el =3D subTree.el;
                  }
                  // mounted hook
                  if (m) {
                      queuePostRenderEffect(m, parentSuspense);
                  }
                  // onVnodeMounted
                  if (!isAsyncWrapperVNode &amp;&amp;
                      (vnodeHook =3D props &amp;&amp; props.onVnodeMounted)=
) {
                      const scopedInitialVNode =3D initialVNode;
                      queuePostRenderEffect(() =3D&gt; invokeVNodeHook(vnod=
eHook, parent, scopedInitialVNode), parentSuspense);
                  }
                  // activated hook for keep-alive roots.
                  // #1742 activated hook must be accessed after first rend=
er
                  // since the hook may be injected by a child keep-alive
                  if (initialVNode.shapeFlag &amp; 256 /* ShapeFlags.COMPON=
ENT_SHOULD_KEEP_ALIVE */ ||
                      (parent &amp;&amp;
                          isAsyncWrapper(parent.vnode) &amp;&amp;
                          parent.vnode.shapeFlag &amp; 256 /* ShapeFlags.CO=
MPONENT_SHOULD_KEEP_ALIVE */)) {
                      instance.a &amp;&amp; queuePostRenderEffect(instance.=
a, parentSuspense);
                  }
                  instance.isMounted =3D true;
                  {
                      devtoolsComponentAdded(instance);
                  }
                  // #2458: deference mount-only object parameters to preve=
nt memleaks
                  initialVNode =3D container =3D anchor =3D null;
              }
              else {
                  // updateComponent
                  // This is triggered by mutation of component's own state=
 (next: null)
                  // OR parent calling processComponent (next: VNode)
                  let { next, bu, u, parent, vnode } =3D instance;
                  let originNext =3D next;
                  let vnodeHook;
                  {
                      pushWarningContext(next || instance.vnode);
                  }
                  // Disallow component effect recursion during pre-lifecyc=
le hooks.
                  toggleRecurse(instance, false);
                  if (next) {
                      next.el =3D vnode.el;
                      updateComponentPreRender(instance, next, optimized);
                  }
                  else {
                      next =3D vnode;
                  }
                  // beforeUpdate hook
                  if (bu) {
                      invokeArrayFns(bu);
                  }
                  // onVnodeBeforeUpdate
                  if ((vnodeHook =3D next.props &amp;&amp; next.props.onVno=
deBeforeUpdate)) {
                      invokeVNodeHook(vnodeHook, parent, next, vnode);
                  }
                  toggleRecurse(instance, true);
                  // render
                  {
                      startMeasure(instance, `render`);
                  }
                  const nextTree =3D renderComponentRoot(instance);
                  {
                      endMeasure(instance, `render`);
                  }
                  const prevTree =3D instance.subTree;
                  instance.subTree =3D nextTree;
                  {
                      startMeasure(instance, `patch`);
                  }
                  patch(prevTree, nextTree,=20
                  // parent may have changed if it's in a teleport
                  hostParentNode(prevTree.el),=20
                  // anchor may have changed if it's in a fragment
                  getNextHostNode(prevTree), instance, parentSuspense, isSV=
G);
                  {
                      endMeasure(instance, `patch`);
                  }
                  next.el =3D nextTree.el;
                  if (originNext =3D=3D=3D null) {
                      // self-triggered update. In case of HOC, update pare=
nt component
                      // vnode el. HOC is indicated by parent instance's su=
bTree pointing
                      // to child component's vnode
                      updateHOCHostEl(instance, nextTree.el);
                  }
                  // updated hook
                  if (u) {
                      queuePostRenderEffect(u, parentSuspense);
                  }
                  // onVnodeUpdated
                  if ((vnodeHook =3D next.props &amp;&amp; next.props.onVno=
deUpdated)) {
                      queuePostRenderEffect(() =3D&gt; invokeVNodeHook(vnod=
eHook, parent, next, vnode), parentSuspense);
                  }
                  {
                      devtoolsComponentUpdated(instance);
                  }
                  {
                      popWarningContext();
                  }
              }
          };
          // create reactive effect for rendering
          const effect =3D (instance.effect =3D new ReactiveEffect(componen=
tUpdateFn, () =3D&gt; queueJob(update), instance.scope // track it in compo=
nent's effect scope
          ));
          const update =3D (instance.update =3D () =3D&gt; effect.run());
          update.id =3D instance.uid;
          // allowRecurse
          // #1801, #2043 component render effects should allow recursive u=
pdates
          toggleRecurse(instance, true);
          {
              effect.onTrack =3D instance.rtc
                  ? e =3D&gt; invokeArrayFns(instance.rtc, e)
                  : void 0;
              effect.onTrigger =3D instance.rtg
                  ? e =3D&gt; invokeArrayFns(instance.rtg, e)
                  : void 0;
              update.ownerInstance =3D instance;
          }
          update();
      };
      const updateComponentPreRender =3D (instance, nextVNode, optimized) =
=3D&gt; {
          nextVNode.component =3D instance;
          const prevProps =3D instance.vnode.props;
          instance.vnode =3D nextVNode;
          instance.next =3D null;
          updateProps(instance, nextVNode.props, prevProps, optimized);
          updateSlots(instance, nextVNode.children, optimized);
          pauseTracking();
          // props update may have triggered pre-flush watchers.
          // flush them before the render update.
          flushPreFlushCbs();
          resetTracking();
      };
      const patchChildren =3D (n1, n2, container, anchor, parentComponent, =
parentSuspense, isSVG, slotScopeIds, optimized =3D false) =3D&gt; {
          const c1 =3D n1 &amp;&amp; n1.children;
          const prevShapeFlag =3D n1 ? n1.shapeFlag : 0;
          const c2 =3D n2.children;
          const { patchFlag, shapeFlag } =3D n2;
          // fast path
          if (patchFlag &gt; 0) {
              if (patchFlag &amp; 128 /* PatchFlags.KEYED_FRAGMENT */) {
                  // this could be either fully-keyed or mixed (some keyed =
some not)
                  // presence of patchFlag means children are guaranteed to=
 be arrays
                  patchKeyedChildren(c1, c2, container, anchor, parentCompo=
nent, parentSuspense, isSVG, slotScopeIds, optimized);
                  return;
              }
              else if (patchFlag &amp; 256 /* PatchFlags.UNKEYED_FRAGMENT *=
/) {
                  // unkeyed
                  patchUnkeyedChildren(c1, c2, container, anchor, parentCom=
ponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  return;
              }
          }
          // children has 3 possibilities: text, array or no children.
          if (shapeFlag &amp; 8 /* ShapeFlags.TEXT_CHILDREN */) {
              // text children fast path
              if (prevShapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                  unmountChildren(c1, parentComponent, parentSuspense);
              }
              if (c2 !=3D=3D c1) {
                  hostSetElementText(container, c2);
              }
          }
          else {
              if (prevShapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                  // prev children was array
                  if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                      // two arrays, cannot assume anything, do full diff
                      patchKeyedChildren(c1, c2, container, anchor, parentC=
omponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else {
                      // no new children, just unmount old
                      unmountChildren(c1, parentComponent, parentSuspense, =
true);
                  }
              }
              else {
                  // prev children was text OR null
                  // new children is array OR null
                  if (prevShapeFlag &amp; 8 /* ShapeFlags.TEXT_CHILDREN */)=
 {
                      hostSetElementText(container, '');
                  }
                  // mount new if array
                  if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                      mountChildren(c2, container, anchor, parentComponent,=
 parentSuspense, isSVG, slotScopeIds, optimized);
                  }
              }
          }
      };
      const patchUnkeyedChildren =3D (c1, c2, container, anchor, parentComp=
onent, parentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          c1 =3D c1 || EMPTY_ARR;
          c2 =3D c2 || EMPTY_ARR;
          const oldLength =3D c1.length;
          const newLength =3D c2.length;
          const commonLength =3D Math.min(oldLength, newLength);
          let i;
          for (i =3D 0; i &lt; commonLength; i++) {
              const nextChild =3D (c2[i] =3D optimized
                  ? cloneIfMounted(c2[i])
                  : normalizeVNode(c2[i]));
              patch(c1[i], nextChild, container, null, parentComponent, par=
entSuspense, isSVG, slotScopeIds, optimized);
          }
          if (oldLength &gt; newLength) {
              // remove old
              unmountChildren(c1, parentComponent, parentSuspense, true, fa=
lse, commonLength);
          }
          else {
              // mount new
              mountChildren(c2, container, anchor, parentComponent, parentS=
uspense, isSVG, slotScopeIds, optimized, commonLength);
          }
      };
      // can be all-keyed or mixed
      const patchKeyedChildren =3D (c1, c2, container, parentAnchor, parent=
Component, parentSuspense, isSVG, slotScopeIds, optimized) =3D&gt; {
          let i =3D 0;
          const l2 =3D c2.length;
          let e1 =3D c1.length - 1; // prev ending index
          let e2 =3D l2 - 1; // next ending index
          // 1. sync from start
          // (a b) c
          // (a b) d e
          while (i &lt;=3D e1 &amp;&amp; i &lt;=3D e2) {
              const n1 =3D c1[i];
              const n2 =3D (c2[i] =3D optimized
                  ? cloneIfMounted(c2[i])
                  : normalizeVNode(c2[i]));
              if (isSameVNodeType(n1, n2)) {
                  patch(n1, n2, container, null, parentComponent, parentSus=
pense, isSVG, slotScopeIds, optimized);
              }
              else {
                  break;
              }
              i++;
          }
          // 2. sync from end
          // a (b c)
          // d e (b c)
          while (i &lt;=3D e1 &amp;&amp; i &lt;=3D e2) {
              const n1 =3D c1[e1];
              const n2 =3D (c2[e2] =3D optimized
                  ? cloneIfMounted(c2[e2])
                  : normalizeVNode(c2[e2]));
              if (isSameVNodeType(n1, n2)) {
                  patch(n1, n2, container, null, parentComponent, parentSus=
pense, isSVG, slotScopeIds, optimized);
              }
              else {
                  break;
              }
              e1--;
              e2--;
          }
          // 3. common sequence + mount
          // (a b)
          // (a b) c
          // i =3D 2, e1 =3D 1, e2 =3D 2
          // (a b)
          // c (a b)
          // i =3D 0, e1 =3D -1, e2 =3D 0
          if (i &gt; e1) {
              if (i &lt;=3D e2) {
                  const nextPos =3D e2 + 1;
                  const anchor =3D nextPos &lt; l2 ? c2[nextPos].el : paren=
tAnchor;
                  while (i &lt;=3D e2) {
                      patch(null, (c2[i] =3D optimized
                          ? cloneIfMounted(c2[i])
                          : normalizeVNode(c2[i])), container, anchor, pare=
ntComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                      i++;
                  }
              }
          }
          // 4. common sequence + unmount
          // (a b) c
          // (a b)
          // i =3D 2, e1 =3D 2, e2 =3D 1
          // a (b c)
          // (b c)
          // i =3D 0, e1 =3D 0, e2 =3D -1
          else if (i &gt; e2) {
              while (i &lt;=3D e1) {
                  unmount(c1[i], parentComponent, parentSuspense, true);
                  i++;
              }
          }
          // 5. unknown sequence
          // [i ... e1 + 1]: a b [c d e] f g
          // [i ... e2 + 1]: a b [e d c h] f g
          // i =3D 2, e1 =3D 4, e2 =3D 5
          else {
              const s1 =3D i; // prev starting index
              const s2 =3D i; // next starting index
              // 5.1 build key:index map for newChildren
              const keyToNewIndexMap =3D new Map();
              for (i =3D s2; i &lt;=3D e2; i++) {
                  const nextChild =3D (c2[i] =3D optimized
                      ? cloneIfMounted(c2[i])
                      : normalizeVNode(c2[i]));
                  if (nextChild.key !=3D null) {
                      if (keyToNewIndexMap.has(nextChild.key)) {
                          warn(`Duplicate keys found during update:`, JSON.=
stringify(nextChild.key), `Make sure keys are unique.`);
                      }
                      keyToNewIndexMap.set(nextChild.key, i);
                  }
              }
              // 5.2 loop through old children left to be patched and try t=
o patch
              // matching nodes &amp; remove nodes that are no longer prese=
nt
              let j;
              let patched =3D 0;
              const toBePatched =3D e2 - s2 + 1;
              let moved =3D false;
              // used to track whether any node has moved
              let maxNewIndexSoFar =3D 0;
              // works as Map&lt;newIndex, oldIndex&gt;
              // Note that oldIndex is offset by +1
              // and oldIndex =3D 0 is a special value indicating the new n=
ode has
              // no corresponding old node.
              // used for determining longest stable subsequence
              const newIndexToOldIndexMap =3D new Array(toBePatched);
              for (i =3D 0; i &lt; toBePatched; i++)
                  newIndexToOldIndexMap[i] =3D 0;
              for (i =3D s1; i &lt;=3D e1; i++) {
                  const prevChild =3D c1[i];
                  if (patched &gt;=3D toBePatched) {
                      // all new children have been patched so this can onl=
y be a removal
                      unmount(prevChild, parentComponent, parentSuspense, t=
rue);
                      continue;
                  }
                  let newIndex;
                  if (prevChild.key !=3D null) {
                      newIndex =3D keyToNewIndexMap.get(prevChild.key);
                  }
                  else {
                      // key-less node, try to locate a key-less node of th=
e same type
                      for (j =3D s2; j &lt;=3D e2; j++) {
                          if (newIndexToOldIndexMap[j - s2] =3D=3D=3D 0 &am=
p;&amp;
                              isSameVNodeType(prevChild, c2[j])) {
                              newIndex =3D j;
                              break;
                          }
                      }
                  }
                  if (newIndex =3D=3D=3D undefined) {
                      unmount(prevChild, parentComponent, parentSuspense, t=
rue);
                  }
                  else {
                      newIndexToOldIndexMap[newIndex - s2] =3D i + 1;
                      if (newIndex &gt;=3D maxNewIndexSoFar) {
                          maxNewIndexSoFar =3D newIndex;
                      }
                      else {
                          moved =3D true;
                      }
                      patch(prevChild, c2[newIndex], container, null, paren=
tComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                      patched++;
                  }
              }
              // 5.3 move and mount
              // generate longest stable subsequence only when nodes have m=
oved
              const increasingNewIndexSequence =3D moved
                  ? getSequence(newIndexToOldIndexMap)
                  : EMPTY_ARR;
              j =3D increasingNewIndexSequence.length - 1;
              // looping backwards so that we can use last patched node as =
anchor
              for (i =3D toBePatched - 1; i &gt;=3D 0; i--) {
                  const nextIndex =3D s2 + i;
                  const nextChild =3D c2[nextIndex];
                  const anchor =3D nextIndex + 1 &lt; l2 ? c2[nextIndex + 1=
].el : parentAnchor;
                  if (newIndexToOldIndexMap[i] =3D=3D=3D 0) {
                      // mount new
                      patch(null, nextChild, container, anchor, parentCompo=
nent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (moved) {
                      // move if:
                      // There is no stable subsequence (e.g. a reverse)
                      // OR current node is not among the stable sequence
                      if (j &lt; 0 || i !=3D=3D increasingNewIndexSequence[=
j]) {
                          move(nextChild, container, anchor, 2 /* MoveType.=
REORDER */);
                      }
                      else {
                          j--;
                      }
                  }
              }
          }
      };
      const move =3D (vnode, container, anchor, moveType, parentSuspense =
=3D null) =3D&gt; {
          const { el, type, transition, children, shapeFlag } =3D vnode;
          if (shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
              move(vnode.component.subTree, container, anchor, moveType);
              return;
          }
          if (shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
              vnode.suspense.move(container, anchor, moveType);
              return;
          }
          if (shapeFlag &amp; 64 /* ShapeFlags.TELEPORT */) {
              type.move(vnode, container, anchor, internals);
              return;
          }
          if (type =3D=3D=3D Fragment) {
              hostInsert(el, container, anchor);
              for (let i =3D 0; i &lt; children.length; i++) {
                  move(children[i], container, anchor, moveType);
              }
              hostInsert(vnode.anchor, container, anchor);
              return;
          }
          if (type =3D=3D=3D Static) {
              moveStaticNode(vnode, container, anchor);
              return;
          }
          // single nodes
          const needTransition =3D moveType !=3D=3D 2 /* MoveType.REORDER *=
/ &amp;&amp;
              shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */ &amp;&amp;
              transition;
          if (needTransition) {
              if (moveType =3D=3D=3D 0 /* MoveType.ENTER */) {
                  transition.beforeEnter(el);
                  hostInsert(el, container, anchor);
                  queuePostRenderEffect(() =3D&gt; transition.enter(el), pa=
rentSuspense);
              }
              else {
                  const { leave, delayLeave, afterLeave } =3D transition;
                  const remove =3D () =3D&gt; hostInsert(el, container, anc=
hor);
                  const performLeave =3D () =3D&gt; {
                      leave(el, () =3D&gt; {
                          remove();
                          afterLeave &amp;&amp; afterLeave();
                      });
                  };
                  if (delayLeave) {
                      delayLeave(el, remove, performLeave);
                  }
                  else {
                      performLeave();
                  }
              }
          }
          else {
              hostInsert(el, container, anchor);
          }
      };
      const unmount =3D (vnode, parentComponent, parentSuspense, doRemove =
=3D false, optimized =3D false) =3D&gt; {
          const { type, props, ref, children, dynamicChildren, shapeFlag, p=
atchFlag, dirs } =3D vnode;
          // unset ref
          if (ref !=3D null) {
              setRef(ref, null, parentSuspense, vnode, true);
          }
          if (shapeFlag &amp; 256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE=
 */) {
              parentComponent.ctx.deactivate(vnode);
              return;
          }
          const shouldInvokeDirs =3D shapeFlag &amp; 1 /* ShapeFlags.ELEMEN=
T */ &amp;&amp; dirs;
          const shouldInvokeVnodeHook =3D !isAsyncWrapper(vnode);
          let vnodeHook;
          if (shouldInvokeVnodeHook &amp;&amp;
              (vnodeHook =3D props &amp;&amp; props.onVnodeBeforeUnmount)) =
{
              invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
          if (shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
              unmountComponent(vnode.component, parentSuspense, doRemove);
          }
          else {
              if (shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
                  vnode.suspense.unmount(parentSuspense, doRemove);
                  return;
              }
              if (shouldInvokeDirs) {
                  invokeDirectiveHook(vnode, null, parentComponent, 'before=
Unmount');
              }
              if (shapeFlag &amp; 64 /* ShapeFlags.TELEPORT */) {
                  vnode.type.remove(vnode, parentComponent, parentSuspense,=
 optimized, internals, doRemove);
              }
              else if (dynamicChildren &amp;&amp;
                  // #1153: fast path should not be taken for non-stable (v=
-for) fragments
                  (type !=3D=3D Fragment ||
                      (patchFlag &gt; 0 &amp;&amp; patchFlag &amp; 64 /* Pa=
tchFlags.STABLE_FRAGMENT */))) {
                  // fast path for block nodes: only need to unmount dynami=
c children.
                  unmountChildren(dynamicChildren, parentComponent, parentS=
uspense, false, true);
              }
              else if ((type =3D=3D=3D Fragment &amp;&amp;
                  patchFlag &amp;
                      (128 /* PatchFlags.KEYED_FRAGMENT */ | 256 /* PatchFl=
ags.UNKEYED_FRAGMENT */)) ||
                  (!optimized &amp;&amp; shapeFlag &amp; 16 /* ShapeFlags.A=
RRAY_CHILDREN */)) {
                  unmountChildren(children, parentComponent, parentSuspense=
);
              }
              if (doRemove) {
                  remove(vnode);
              }
          }
          if ((shouldInvokeVnodeHook &amp;&amp;
              (vnodeHook =3D props &amp;&amp; props.onVnodeUnmounted)) ||
              shouldInvokeDirs) {
              queuePostRenderEffect(() =3D&gt; {
                  vnodeHook &amp;&amp; invokeVNodeHook(vnodeHook, parentCom=
ponent, vnode);
                  shouldInvokeDirs &amp;&amp;
                      invokeDirectiveHook(vnode, null, parentComponent, 'un=
mounted');
              }, parentSuspense);
          }
      };
      const remove =3D vnode =3D&gt; {
          const { type, el, anchor, transition } =3D vnode;
          if (type =3D=3D=3D Fragment) {
              if (vnode.patchFlag &gt; 0 &amp;&amp;
                  vnode.patchFlag &amp; 2048 /* PatchFlags.DEV_ROOT_FRAGMEN=
T */ &amp;&amp;
                  transition &amp;&amp;
                  !transition.persisted) {
                  vnode.children.forEach(child =3D&gt; {
                      if (child.type =3D=3D=3D Comment) {
                          hostRemove(child.el);
                      }
                      else {
                          remove(child);
                      }
                  });
              }
              else {
                  removeFragment(el, anchor);
              }
              return;
          }
          if (type =3D=3D=3D Static) {
              removeStaticNode(vnode);
              return;
          }
          const performRemove =3D () =3D&gt; {
              hostRemove(el);
              if (transition &amp;&amp; !transition.persisted &amp;&amp; tr=
ansition.afterLeave) {
                  transition.afterLeave();
              }
          };
          if (vnode.shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */ &amp;&amp;
              transition &amp;&amp;
              !transition.persisted) {
              const { leave, delayLeave } =3D transition;
              const performLeave =3D () =3D&gt; leave(el, performRemove);
              if (delayLeave) {
                  delayLeave(vnode.el, performRemove, performLeave);
              }
              else {
                  performLeave();
              }
          }
          else {
              performRemove();
          }
      };
      const removeFragment =3D (cur, end) =3D&gt; {
          // For fragments, directly remove all contained DOM nodes.
          // (fragment child nodes cannot have transition)
          let next;
          while (cur !=3D=3D end) {
              next =3D hostNextSibling(cur);
              hostRemove(cur);
              cur =3D next;
          }
          hostRemove(end);
      };
      const unmountComponent =3D (instance, parentSuspense, doRemove) =3D&g=
t; {
          if (instance.type.__hmrId) {
              unregisterHMR(instance);
          }
          const { bum, scope, update, subTree, um } =3D instance;
          // beforeUnmount hook
          if (bum) {
              invokeArrayFns(bum);
          }
          // stop effects in component scope
          scope.stop();
          // update may be null if a component is unmounted before its asyn=
c
          // setup has resolved.
          if (update) {
              // so that scheduler will no longer invoke it
              update.active =3D false;
              unmount(subTree, instance, parentSuspense, doRemove);
          }
          // unmounted hook
          if (um) {
              queuePostRenderEffect(um, parentSuspense);
          }
          queuePostRenderEffect(() =3D&gt; {
              instance.isUnmounted =3D true;
          }, parentSuspense);
          // A component with async dep inside a pending suspense is unmoun=
ted before
          // its async dep resolves. This should remove the dep from the su=
spense, and
          // cause the suspense to resolve immediately if that was the last=
 dep.
          if (parentSuspense &amp;&amp;
              parentSuspense.pendingBranch &amp;&amp;
              !parentSuspense.isUnmounted &amp;&amp;
              instance.asyncDep &amp;&amp;
              !instance.asyncResolved &amp;&amp;
              instance.suspenseId =3D=3D=3D parentSuspense.pendingId) {
              parentSuspense.deps--;
              if (parentSuspense.deps =3D=3D=3D 0) {
                  parentSuspense.resolve();
              }
          }
          {
              devtoolsComponentRemoved(instance);
          }
      };
      const unmountChildren =3D (children, parentComponent, parentSuspense,=
 doRemove =3D false, optimized =3D false, start =3D 0) =3D&gt; {
          for (let i =3D start; i &lt; children.length; i++) {
              unmount(children[i], parentComponent, parentSuspense, doRemov=
e, optimized);
          }
      };
      const getNextHostNode =3D vnode =3D&gt; {
          if (vnode.shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
              return getNextHostNode(vnode.component.subTree);
          }
          if (vnode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
              return vnode.suspense.next();
          }
          return hostNextSibling((vnode.anchor || vnode.el));
      };
      const render =3D (vnode, container, isSVG) =3D&gt; {
          if (vnode =3D=3D null) {
              if (container._vnode) {
                  unmount(container._vnode, null, null, true);
              }
          }
          else {
              patch(container._vnode || null, vnode, container, null, null,=
 null, isSVG);
          }
          flushPreFlushCbs();
          flushPostFlushCbs();
          container._vnode =3D vnode;
      };
      const internals =3D {
          p: patch,
          um: unmount,
          m: move,
          r: remove,
          mt: mountComponent,
          mc: mountChildren,
          pc: patchChildren,
          pbc: patchBlockChildren,
          n: getNextHostNode,
          o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
          [hydrate, hydrateNode] =3D createHydrationFns(internals);
      }
      return {
          render,
          hydrate,
          createApp: createAppAPI(render, hydrate)
      };
  }
  function toggleRecurse({ effect, update }, allowed) {
      effect.allowRecurse =3D update.allowRecurse =3D allowed;
  }
  /**
   * #1156
   * When a component is HMR-enabled, we need to make sure that all static =
nodes
   * inside a block also inherit the DOM element from the previous tree so =
that
   * HMR updates (which are full updates) can retrieve the element for patc=
hing.
   *
   * #2080
   * Inside keyed `template` fragment static children, if a fragment is mov=
ed,
   * the children will always be moved. Therefore, in order to ensure corre=
ct move
   * position, el should be inherited from previous nodes.
   */
  function traverseStaticChildren(n1, n2, shallow =3D false) {
      const ch1 =3D n1.children;
      const ch2 =3D n2.children;
      if (isArray(ch1) &amp;&amp; isArray(ch2)) {
          for (let i =3D 0; i &lt; ch1.length; i++) {
              // this is only called in the optimized path so array childre=
n are
              // guaranteed to be vnodes
              const c1 =3D ch1[i];
              let c2 =3D ch2[i];
              if (c2.shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */ &amp;&amp; =
!c2.dynamicChildren) {
                  if (c2.patchFlag &lt;=3D 0 || c2.patchFlag =3D=3D=3D 32 /=
* PatchFlags.HYDRATE_EVENTS */) {
                      c2 =3D ch2[i] =3D cloneIfMounted(ch2[i]);
                      c2.el =3D c1.el;
                  }
                  if (!shallow)
                      traverseStaticChildren(c1, c2);
              }
              // #6852 also inherit for text nodes
              if (c2.type =3D=3D=3D Text) {
                  c2.el =3D c1.el;
              }
              // also inherit for comment nodes, but not placeholders (e.g.=
 v-if which
              // would have received .el during block patch)
              if (c2.type =3D=3D=3D Comment &amp;&amp; !c2.el) {
                  c2.el =3D c1.el;
              }
          }
      }
  }
  // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
  function getSequence(arr) {
      const p =3D arr.slice();
      const result =3D [0];
      let i, j, u, v, c;
      const len =3D arr.length;
      for (i =3D 0; i &lt; len; i++) {
          const arrI =3D arr[i];
          if (arrI !=3D=3D 0) {
              j =3D result[result.length - 1];
              if (arr[j] &lt; arrI) {
                  p[i] =3D j;
                  result.push(i);
                  continue;
              }
              u =3D 0;
              v =3D result.length - 1;
              while (u &lt; v) {
                  c =3D (u + v) &gt;&gt; 1;
                  if (arr[result[c]] &lt; arrI) {
                      u =3D c + 1;
                  }
                  else {
                      v =3D c;
                  }
              }
              if (arrI &lt; arr[result[u]]) {
                  if (u &gt; 0) {
                      p[i] =3D result[u - 1];
                  }
                  result[u] =3D i;
              }
          }
      }
      u =3D result.length;
      v =3D result[u - 1];
      while (u-- &gt; 0) {
          result[u] =3D v;
          v =3D p[v];
      }
      return result;
  }

  const isTeleport =3D (type) =3D&gt; type.__isTeleport;
  const isTeleportDisabled =3D (props) =3D&gt; props &amp;&amp; (props.disa=
bled || props.disabled =3D=3D=3D '');
  const isTargetSVG =3D (target) =3D&gt; typeof SVGElement !=3D=3D 'undefin=
ed' &amp;&amp; target instanceof SVGElement;
  const resolveTarget =3D (props, select) =3D&gt; {
      const targetSelector =3D props &amp;&amp; props.to;
      if (isString(targetSelector)) {
          if (!select) {
              warn(`Current renderer does not support string target for Tel=
eports. ` +
                      `(missing querySelector renderer option)`);
              return null;
          }
          else {
              const target =3D select(targetSelector);
              if (!target) {
                  warn(`Failed to locate Teleport target with selector "${t=
argetSelector}". ` +
                          `Note the target element must exist before the co=
mponent is mounted - ` +
                          `i.e. the target cannot be rendered by the compon=
ent itself, and ` +
                          `ideally should be outside of the entire Vue comp=
onent tree.`);
              }
              return target;
          }
      }
      else {
          if (!targetSelector &amp;&amp; !isTeleportDisabled(props)) {
              warn(`Invalid Teleport target: ${targetSelector}`);
          }
          return targetSelector;
      }
  };
  const TeleportImpl =3D {
      __isTeleport: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, i=
sSVG, slotScopeIds, optimized, internals) {
          const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChil=
dren, o: { insert, querySelector, createText, createComment } } =3D interna=
ls;
          const disabled =3D isTeleportDisabled(n2.props);
          let { shapeFlag, children, dynamicChildren } =3D n2;
          // #3302
          // HMR updated, force full diff
          if (isHmrUpdating) {
              optimized =3D false;
              dynamicChildren =3D null;
          }
          if (n1 =3D=3D null) {
              // insert anchors in the main view
              const placeholder =3D (n2.el =3D createComment('teleport star=
t')
                  );
              const mainAnchor =3D (n2.anchor =3D createComment('teleport e=
nd')
                  );
              insert(placeholder, container, anchor);
              insert(mainAnchor, container, anchor);
              const target =3D (n2.target =3D resolveTarget(n2.props, query=
Selector));
              const targetAnchor =3D (n2.targetAnchor =3D createText(''));
              if (target) {
                  insert(targetAnchor, target);
                  // #2652 we could be teleporting from a non-SVG tree into=
 an SVG tree
                  isSVG =3D isSVG || isTargetSVG(target);
              }
              else if (!disabled) {
                  warn('Invalid Teleport target on mount:', target, `(${typ=
eof target})`);
              }
              const mount =3D (container, anchor) =3D&gt; {
                  // Teleport *always* has Array children. This is enforced=
 in both the
                  // compiler and vnode children normalization.
                  if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                      mountChildren(children, container, anchor, parentComp=
onent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
              };
              if (disabled) {
                  mount(container, mainAnchor);
              }
              else if (target) {
                  mount(target, targetAnchor);
              }
          }
          else {
              // update content
              n2.el =3D n1.el;
              const mainAnchor =3D (n2.anchor =3D n1.anchor);
              const target =3D (n2.target =3D n1.target);
              const targetAnchor =3D (n2.targetAnchor =3D n1.targetAnchor);
              const wasDisabled =3D isTeleportDisabled(n1.props);
              const currentContainer =3D wasDisabled ? container : target;
              const currentAnchor =3D wasDisabled ? mainAnchor : targetAnch=
or;
              isSVG =3D isSVG || isTargetSVG(target);
              if (dynamicChildren) {
                  // fast path when the teleport happens to be a block root
                  patchBlockChildren(n1.dynamicChildren, dynamicChildren, c=
urrentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
                  // even in block tree mode we need to make sure all root-=
level nodes
                  // in the teleport inherit previous DOM references so tha=
t they can
                  // be moved in future patches.
                  traverseStaticChildren(n1, n2, true);
              }
              else if (!optimized) {
                  patchChildren(n1, n2, currentContainer, currentAnchor, pa=
rentComponent, parentSuspense, isSVG, slotScopeIds, false);
              }
              if (disabled) {
                  if (!wasDisabled) {
                      // enabled -&gt; disabled
                      // move into main container
                      moveTeleport(n2, container, mainAnchor, internals, 1 =
/* TeleportMoveTypes.TOGGLE */);
                  }
              }
              else {
                  // target changed
                  if ((n2.props &amp;&amp; n2.props.to) !=3D=3D (n1.props &=
amp;&amp; n1.props.to)) {
                      const nextTarget =3D (n2.target =3D resolveTarget(n2.=
props, querySelector));
                      if (nextTarget) {
                          moveTeleport(n2, nextTarget, null, internals, 0 /=
* TeleportMoveTypes.TARGET_CHANGE */);
                      }
                      else {
                          warn('Invalid Teleport target on update:', target=
, `(${typeof target})`);
                      }
                  }
                  else if (wasDisabled) {
                      // disabled -&gt; enabled
                      // move into teleport target
                      moveTeleport(n2, target, targetAnchor, internals, 1 /=
* TeleportMoveTypes.TOGGLE */);
                  }
              }
          }
          updateCssVars(n2);
      },
      remove(vnode, parentComponent, parentSuspense, optimized, { um: unmou=
nt, o: { remove: hostRemove } }, doRemove) {
          const { shapeFlag, children, anchor, targetAnchor, target, props =
} =3D vnode;
          if (target) {
              hostRemove(targetAnchor);
          }
          // an unmounted teleport should always remove its children if not=
 disabled
          if (doRemove || !isTeleportDisabled(props)) {
              hostRemove(anchor);
              if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                  for (let i =3D 0; i &lt; children.length; i++) {
                      const child =3D children[i];
                      unmount(child, parentComponent, parentSuspense, true,=
 !!child.dynamicChildren);
                  }
              }
          }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m:=
 move }, moveType =3D 2 /* TeleportMoveTypes.REORDER */) {
      // move target anchor if this is a target change.
      if (moveType =3D=3D=3D 0 /* TeleportMoveTypes.TARGET_CHANGE */) {
          insert(vnode.targetAnchor, container, parentAnchor);
      }
      const { el, anchor, shapeFlag, children, props } =3D vnode;
      const isReorder =3D moveType =3D=3D=3D 2 /* TeleportMoveTypes.REORDER=
 */;
      // move main view anchor if this is a re-order.
      if (isReorder) {
          insert(el, container, parentAnchor);
      }
      // if this is a re-order and teleport is enabled (content is in targe=
t)
      // do not move children. So the opposite is: only move children if th=
is
      // is not a reorder, or the teleport is disabled
      if (!isReorder || isTeleportDisabled(props)) {
          // Teleport has either Array children or no children.
          if (shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
              for (let i =3D 0; i &lt; children.length; i++) {
                  move(children[i], container, parentAnchor, 2 /* MoveType.=
REORDER */);
              }
          }
      }
      // move main view anchor if this is a re-order.
      if (isReorder) {
          insert(anchor, container, parentAnchor);
      }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, sl=
otScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, h=
ydrateChildren) {
      const target =3D (vnode.target =3D resolveTarget(vnode.props, querySe=
lector));
      if (target) {
          // if multiple teleports rendered to the same target element, we =
need to
          // pick up from where the last teleport finished instead of the f=
irst node
          const targetNode =3D target._lpa || target.firstChild;
          if (vnode.shapeFlag &amp; 16 /* ShapeFlags.ARRAY_CHILDREN */) {
              if (isTeleportDisabled(vnode.props)) {
                  vnode.anchor =3D hydrateChildren(nextSibling(node), vnode=
, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimize=
d);
                  vnode.targetAnchor =3D targetNode;
              }
              else {
                  vnode.anchor =3D nextSibling(node);
                  // lookahead until we find the target anchor
                  // we cannot rely on return value of hydrateChildren() be=
cause there
                  // could be nested teleports
                  let targetAnchor =3D targetNode;
                  while (targetAnchor) {
                      targetAnchor =3D nextSibling(targetAnchor);
                      if (targetAnchor &amp;&amp;
                          targetAnchor.nodeType =3D=3D=3D 8 &amp;&amp;
                          targetAnchor.data =3D=3D=3D 'teleport anchor') {
                          vnode.targetAnchor =3D targetAnchor;
                          target._lpa =3D
                              vnode.targetAnchor &amp;&amp; nextSibling(vno=
de.targetAnchor);
                          break;
                      }
                  }
                  hydrateChildren(targetNode, vnode, target, parentComponen=
t, parentSuspense, slotScopeIds, optimized);
              }
          }
          updateCssVars(vnode);
      }
      return vnode.anchor &amp;&amp; nextSibling(vnode.anchor);
  }
  // Force-casted public typing for h and TSX props inference
  const Teleport =3D TeleportImpl;
  function updateCssVars(vnode) {
      // presence of .ut method indicates owner component uses css vars.
      // code path here can assume browser environment.
      const ctx =3D vnode.ctx;
      if (ctx &amp;&amp; ctx.ut) {
          let node =3D vnode.children[0].el;
          while (node !=3D=3D vnode.targetAnchor) {
              if (node.nodeType =3D=3D=3D 1)
                  node.setAttribute('data-v-owner', ctx.uid);
              node =3D node.nextSibling;
          }
          ctx.ut();
      }
  }

  const Fragment =3D Symbol('Fragment' );
  const Text =3D Symbol('Text' );
  const Comment =3D Symbol('Comment' );
  const Static =3D Symbol('Static' );
  // Since v-if and v-for are the two possible ways node structure can dyna=
mically
  // change, once we consider v-if branches and each v-for fragment a block=
, we
  // can divide a template into nested blocks, and within each block the no=
de
  // structure would be stable. This allows us to skip most children diffin=
g
  // and only worry about the dynamic nodes (indicated by patch flags).
  const blockStack =3D [];
  let currentBlock =3D null;
  /**
   * Open a block.
   * This must be called before `createBlock`. It cannot be part of `create=
Block`
   * because the children of the block are evaluated before `createBlock` i=
tself
   * is called. The generated code typically looks like this:
   *
   * ```js
   * function render() {
   *   return (openBlock(),createBlock('div', null, [...]))
   * }
   * ```
   * disableTracking is true when creating a v-for fragment block, since a =
v-for
   * fragment always diffs its children.
   *
   * @private
   */
  function openBlock(disableTracking =3D false) {
      blockStack.push((currentBlock =3D disableTracking ? null : []));
  }
  function closeBlock() {
      blockStack.pop();
      currentBlock =3D blockStack[blockStack.length - 1] || null;
  }
  // Whether we should be tracking dynamic child nodes inside a block.
  // Only tracks when this value is &gt; 0
  // We are not using a simple boolean because this value may need to be
  // incremented/decremented by nested usage of v-once (see below)
  let isBlockTreeEnabled =3D 1;
  /**
   * Block tracking sometimes needs to be disabled, for example during the
   * creation of a tree that needs to be cached by v-once. The compiler gen=
erates
   * code like this:
   *
   * ``` js
   * _cache[1] || (
   *   setBlockTracking(-1),
   *   _cache[1] =3D createVNode(...),
   *   setBlockTracking(1),
   *   _cache[1]
   * )
   * ```
   *
   * @private
   */
  function setBlockTracking(value) {
      isBlockTreeEnabled +=3D value;
  }
  function setupBlock(vnode) {
      // save current block children on the block vnode
      vnode.dynamicChildren =3D
          isBlockTreeEnabled &gt; 0 ? currentBlock || EMPTY_ARR : null;
      // close block
      closeBlock();
      // a block is always going to be patched, so track it as a child of i=
ts
      // parent block
      if (isBlockTreeEnabled &gt; 0 &amp;&amp; currentBlock) {
          currentBlock.push(vnode);
      }
      return vnode;
  }
  /**
   * @private
   */
  function createElementBlock(type, props, children, patchFlag, dynamicProp=
s, shapeFlag) {
      return setupBlock(createBaseVNode(type, props, children, patchFlag, d=
ynamicProps, shapeFlag, true /* isBlock */));
  }
  /**
   * Create a block root vnode. Takes the same exact arguments as `createVN=
ode`.
   * A block root keeps track of dynamic nodes within the block in the
   * `dynamicChildren` array.
   *
   * @private
   */
  function createBlock(type, props, children, patchFlag, dynamicProps) {
      return setupBlock(createVNode(type, props, children, patchFlag, dynam=
icProps, true /* isBlock: prevent a block from tracking itself */));
  }
  function isVNode(value) {
      return value ? value.__v_isVNode =3D=3D=3D true : false;
  }
  function isSameVNodeType(n1, n2) {
      if (n2.shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */ &amp;&amp;
          hmrDirtyComponents.has(n2.type)) {
          // #7042, ensure the vnode being unmounted during HMR
          // bitwise operations to remove keep alive flags
          n1.shapeFlag &amp;=3D ~256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_AL=
IVE */;
          n2.shapeFlag &amp;=3D ~512 /* ShapeFlags.COMPONENT_KEPT_ALIVE */;
          // HMR only: if the component has been hot-updated, force a reloa=
d.
          return false;
      }
      return n1.type =3D=3D=3D n2.type &amp;&amp; n1.key =3D=3D=3D n2.key;
  }
  let vnodeArgsTransformer;
  /**
   * Internal API for registering an arguments transform for createVNode
   * used for creating stubs in the test-utils
   * It is *internal* but needs to be exposed for test-utils to pick up pro=
per
   * typings
   */
  function transformVNodeArgs(transformer) {
      vnodeArgsTransformer =3D transformer;
  }
  const createVNodeWithArgsTransform =3D (...args) =3D&gt; {
      return _createVNode(...(vnodeArgsTransformer
          ? vnodeArgsTransformer(args, currentRenderingInstance)
          : args));
  };
  const InternalObjectKey =3D `__vInternal`;
  const normalizeKey =3D ({ key }) =3D&gt; key !=3D null ? key : null;
  const normalizeRef =3D ({ ref, ref_key, ref_for }) =3D&gt; {
      return (ref !=3D null
          ? isString(ref) || isRef(ref) || isFunction(ref)
              ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref=
_for }
              : ref
          : null);
  };
  function createBaseVNode(type, props =3D null, children =3D null, patchFl=
ag =3D 0, dynamicProps =3D null, shapeFlag =3D type =3D=3D=3D Fragment ? 0 =
: 1 /* ShapeFlags.ELEMENT */, isBlockNode =3D false, needFullChildrenNormal=
ization =3D false) {
      const vnode =3D {
          __v_isVNode: true,
          __v_skip: true,
          type,
          props,
          key: props &amp;&amp; normalizeKey(props),
          ref: props &amp;&amp; normalizeRef(props),
          scopeId: currentScopeId,
          slotScopeIds: null,
          children,
          component: null,
          suspense: null,
          ssContent: null,
          ssFallback: null,
          dirs: null,
          transition: null,
          el: null,
          anchor: null,
          target: null,
          targetAnchor: null,
          staticCount: 0,
          shapeFlag,
          patchFlag,
          dynamicProps,
          dynamicChildren: null,
          appContext: null,
          ctx: currentRenderingInstance
      };
      if (needFullChildrenNormalization) {
          normalizeChildren(vnode, children);
          // normalize suspense children
          if (shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
              type.normalize(vnode);
          }
      }
      else if (children) {
          // compiled element vnode - if children is passed, only possible =
types are
          // string or Array.
          vnode.shapeFlag |=3D isString(children)
              ? 8 /* ShapeFlags.TEXT_CHILDREN */
              : 16 /* ShapeFlags.ARRAY_CHILDREN */;
      }
      // validate key
      if (vnode.key !=3D=3D vnode.key) {
          warn(`VNode created with invalid key (NaN). VNode type:`, vnode.t=
ype);
      }
      // track vnode for block tree
      if (isBlockTreeEnabled &gt; 0 &amp;&amp;
          // avoid a block node from tracking itself
          !isBlockNode &amp;&amp;
          // has current parent block
          currentBlock &amp;&amp;
          // presence of a patch flag indicates this node needs patching on=
 updates.
          // component nodes also should always be patched, because even if=
 the
          // component doesn't need to update, it needs to persist the inst=
ance on to
          // the next vnode so that it can be properly unmounted later.
          (vnode.patchFlag &gt; 0 || shapeFlag &amp; 6 /* ShapeFlags.COMPON=
ENT */) &amp;&amp;
          // the EVENTS flag is only for hydration and if it is the only fl=
ag, the
          // vnode should not be considered dynamic due to handler caching.
          vnode.patchFlag !=3D=3D 32 /* PatchFlags.HYDRATE_EVENTS */) {
          currentBlock.push(vnode);
      }
      return vnode;
  }
  const createVNode =3D (createVNodeWithArgsTransform );
  function _createVNode(type, props =3D null, children =3D null, patchFlag =
=3D 0, dynamicProps =3D null, isBlockNode =3D false) {
      if (!type || type =3D=3D=3D NULL_DYNAMIC_COMPONENT) {
          if (!type) {
              warn(`Invalid vnode type when creating vnode: ${type}.`);
          }
          type =3D Comment;
      }
      if (isVNode(type)) {
          // createVNode receiving an existing vnode. This happens in cases=
 like
          // &lt;component :is=3D"vnode"/&gt;
          // #2078 make sure to merge refs during the clone instead of over=
writing it
          const cloned =3D cloneVNode(type, props, true /* mergeRef: true *=
/);
          if (children) {
              normalizeChildren(cloned, children);
          }
          if (isBlockTreeEnabled &gt; 0 &amp;&amp; !isBlockNode &amp;&amp; =
currentBlock) {
              if (cloned.shapeFlag &amp; 6 /* ShapeFlags.COMPONENT */) {
                  currentBlock[currentBlock.indexOf(type)] =3D cloned;
              }
              else {
                  currentBlock.push(cloned);
              }
          }
          cloned.patchFlag |=3D -2 /* PatchFlags.BAIL */;
          return cloned;
      }
      // class component normalization.
      if (isClassComponent(type)) {
          type =3D type.__vccOpts;
      }
      // class &amp; style normalization.
      if (props) {
          // for reactive or proxy objects, we need to clone it to enable m=
utation.
          props =3D guardReactiveProps(props);
          let { class: klass, style } =3D props;
          if (klass &amp;&amp; !isString(klass)) {
              props.class =3D normalizeClass(klass);
          }
          if (isObject(style)) {
              // reactive state objects need to be cloned since they are li=
kely to be
              // mutated
              if (isProxy(style) &amp;&amp; !isArray(style)) {
                  style =3D extend({}, style);
              }
              props.style =3D normalizeStyle(style);
          }
      }
      // encode the vnode type information into a bitmap
      const shapeFlag =3D isString(type)
          ? 1 /* ShapeFlags.ELEMENT */
          : isSuspense(type)
              ? 128 /* ShapeFlags.SUSPENSE */
              : isTeleport(type)
                  ? 64 /* ShapeFlags.TELEPORT */
                  : isObject(type)
                      ? 4 /* ShapeFlags.STATEFUL_COMPONENT */
                      : isFunction(type)
                          ? 2 /* ShapeFlags.FUNCTIONAL_COMPONENT */
                          : 0;
      if (shapeFlag &amp; 4 /* ShapeFlags.STATEFUL_COMPONENT */ &amp;&amp; =
isProxy(type)) {
          type =3D toRaw(type);
          warn(`Vue received a Component which was made a reactive object. =
This can ` +
              `lead to unnecessary performance overhead, and should be avoi=
ded by ` +
              `marking the component with \`markRaw\` or using \`shallowRef=
\` ` +
              `instead of \`ref\`.`, `\nComponent that was made reactive: `=
, type);
      }
      return createBaseVNode(type, props, children, patchFlag, dynamicProps=
, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
      if (!props)
          return null;
      return isProxy(props) || InternalObjectKey in props
          ? extend({}, props)
          : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef =3D false) {
      // This is intentionally NOT using spread or extend to avoid the runt=
ime
      // key enumeration cost.
      const { props, ref, patchFlag, children } =3D vnode;
      const mergedProps =3D extraProps ? mergeProps(props || {}, extraProps=
) : props;
      const cloned =3D {
          __v_isVNode: true,
          __v_skip: true,
          type: vnode.type,
          props: mergedProps,
          key: mergedProps &amp;&amp; normalizeKey(mergedProps),
          ref: extraProps &amp;&amp; extraProps.ref
              ? // #2078 in the case of &lt;component :is=3D"vnode" ref=3D"=
extra"/&gt;
                  // if the vnode itself already has a ref, cloneVNode will=
 need to merge
                  // the refs so the single vnode can be set on multiple re=
fs
                  mergeRef &amp;&amp; ref
                      ? isArray(ref)
                          ? ref.concat(normalizeRef(extraProps))
                          : [ref, normalizeRef(extraProps)]
                      : normalizeRef(extraProps)
              : ref,
          scopeId: vnode.scopeId,
          slotScopeIds: vnode.slotScopeIds,
          children: patchFlag =3D=3D=3D -1 /* PatchFlags.HOISTED */ &amp;&a=
mp; isArray(children)
              ? children.map(deepCloneVNode)
              : children,
          target: vnode.target,
          targetAnchor: vnode.targetAnchor,
          staticCount: vnode.staticCount,
          shapeFlag: vnode.shapeFlag,
          // if the vnode is cloned with extra props, we can no longer assu=
me its
          // existing patch flag to be reliable and need to add the FULL_PR=
OPS flag.
          // note: preserve flag for fragments since they use the flag for =
children
          // fast paths only.
          patchFlag: extraProps &amp;&amp; vnode.type !=3D=3D Fragment
              ? patchFlag =3D=3D=3D -1 // hoisted node
                  ? 16 /* PatchFlags.FULL_PROPS */
                  : patchFlag | 16 /* PatchFlags.FULL_PROPS */
              : patchFlag,
          dynamicProps: vnode.dynamicProps,
          dynamicChildren: vnode.dynamicChildren,
          appContext: vnode.appContext,
          dirs: vnode.dirs,
          transition: vnode.transition,
          // These should technically only be non-null on mounted VNodes. H=
owever,
          // they *should* be copied for kept-alive vnodes. So we just alwa=
ys copy
          // them since them being non-null during a mount doesn't affect t=
he logic as
          // they will simply be overwritten.
          component: vnode.component,
          suspense: vnode.suspense,
          ssContent: vnode.ssContent &amp;&amp; cloneVNode(vnode.ssContent)=
,
          ssFallback: vnode.ssFallback &amp;&amp; cloneVNode(vnode.ssFallba=
ck),
          el: vnode.el,
          anchor: vnode.anchor,
          ctx: vnode.ctx,
          ce: vnode.ce
      };
      return cloned;
  }
  /**
   * Dev only, for HMR of hoisted vnodes reused in v-for
   * https://github.com/vitejs/vite/issues/2022
   */
  function deepCloneVNode(vnode) {
      const cloned =3D cloneVNode(vnode);
      if (isArray(vnode.children)) {
          cloned.children =3D vnode.children.map(deepCloneVNode);
      }
      return cloned;
  }
  /**
   * @private
   */
  function createTextVNode(text =3D ' ', flag =3D 0) {
      return createVNode(Text, null, text, flag);
  }
  /**
   * @private
   */
  function createStaticVNode(content, numberOfNodes) {
      // A static vnode can contain multiple stringified elements, and the =
number
      // of elements is necessary for hydration.
      const vnode =3D createVNode(Static, null, content);
      vnode.staticCount =3D numberOfNodes;
      return vnode;
  }
  /**
   * @private
   */
  function createCommentVNode(text =3D '',=20
  // when used as the v-else branch, the comment node must be created as a
  // block to ensure correct updates.
  asBlock =3D false) {
      return asBlock
          ? (openBlock(), createBlock(Comment, null, text))
          : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
      if (child =3D=3D null || typeof child =3D=3D=3D 'boolean') {
          // empty placeholder
          return createVNode(Comment);
      }
      else if (isArray(child)) {
          // fragment
          return createVNode(Fragment, null,=20
          // #3666, avoid reference pollution when reusing vnode
          child.slice());
      }
      else if (typeof child =3D=3D=3D 'object') {
          // already vnode, this should be the most common since compiled t=
emplates
          // always produce all-vnode children arrays
          return cloneIfMounted(child);
      }
      else {
          // strings and numbers
          return createVNode(Text, null, String(child));
      }
  }
  // optimized normalization for template-compiled render fns
  function cloneIfMounted(child) {
      return (child.el =3D=3D=3D null &amp;&amp; child.patchFlag !=3D=3D -1=
 /* PatchFlags.HOISTED */) ||
          child.memo
          ? child
          : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
      let type =3D 0;
      const { shapeFlag } =3D vnode;
      if (children =3D=3D null) {
          children =3D null;
      }
      else if (isArray(children)) {
          type =3D 16 /* ShapeFlags.ARRAY_CHILDREN */;
      }
      else if (typeof children =3D=3D=3D 'object') {
          if (shapeFlag &amp; (1 /* ShapeFlags.ELEMENT */ | 64 /* ShapeFlag=
s.TELEPORT */)) {
              // Normalize slot to plain children for plain element and Tel=
eport
              const slot =3D children.default;
              if (slot) {
                  // _c marker is added by withCtx() indicating this is a c=
ompiled slot
                  slot._c &amp;&amp; (slot._d =3D false);
                  normalizeChildren(vnode, slot());
                  slot._c &amp;&amp; (slot._d =3D true);
              }
              return;
          }
          else {
              type =3D 32 /* ShapeFlags.SLOTS_CHILDREN */;
              const slotFlag =3D children._;
              if (!slotFlag &amp;&amp; !(InternalObjectKey in children)) {
                  children._ctx =3D currentRenderingInstance;
              }
              else if (slotFlag =3D=3D=3D 3 /* SlotFlags.FORWARDED */ &amp;=
&amp; currentRenderingInstance) {
                  // a child component receives forwarded slots from the pa=
rent.
                  // its slot type is determined by its parent's slot type.
                  if (currentRenderingInstance.slots._ =3D=3D=3D 1 /* SlotF=
lags.STABLE */) {
                      children._ =3D 1 /* SlotFlags.STABLE */;
                  }
                  else {
                      children._ =3D 2 /* SlotFlags.DYNAMIC */;
                      vnode.patchFlag |=3D 1024 /* PatchFlags.DYNAMIC_SLOTS=
 */;
                  }
              }
          }
      }
      else if (isFunction(children)) {
          children =3D { default: children, _ctx: currentRenderingInstance =
};
          type =3D 32 /* ShapeFlags.SLOTS_CHILDREN */;
      }
      else {
          children =3D String(children);
          // force teleport children to array so it can be moved around
          if (shapeFlag &amp; 64 /* ShapeFlags.TELEPORT */) {
              type =3D 16 /* ShapeFlags.ARRAY_CHILDREN */;
              children =3D [createTextVNode(children)];
          }
          else {
              type =3D 8 /* ShapeFlags.TEXT_CHILDREN */;
          }
      }
      vnode.children =3D children;
      vnode.shapeFlag |=3D type;
  }
  function mergeProps(...args) {
      const ret =3D {};
      for (let i =3D 0; i &lt; args.length; i++) {
          const toMerge =3D args[i];
          for (const key in toMerge) {
              if (key =3D=3D=3D 'class') {
                  if (ret.class !=3D=3D toMerge.class) {
                      ret.class =3D normalizeClass([ret.class, toMerge.clas=
s]);
                  }
              }
              else if (key =3D=3D=3D 'style') {
                  ret.style =3D normalizeStyle([ret.style, toMerge.style]);
              }
              else if (isOn(key)) {
                  const existing =3D ret[key];
                  const incoming =3D toMerge[key];
                  if (incoming &amp;&amp;
                      existing !=3D=3D incoming &amp;&amp;
                      !(isArray(existing) &amp;&amp; existing.includes(inco=
ming))) {
                      ret[key] =3D existing
                          ? [].concat(existing, incoming)
                          : incoming;
                  }
              }
              else if (key !=3D=3D '') {
                  ret[key] =3D toMerge[key];
              }
          }
      }
      return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode =3D null) {
      callWithAsyncErrorHandling(hook, instance, 7 /* ErrorCodes.VNODE_HOOK=
 */, [
          vnode,
          prevVNode
      ]);
  }

  const emptyAppContext =3D createAppContext();
  let uid =3D 0;
  function createComponentInstance(vnode, parent, suspense) {
      const type =3D vnode.type;
      // inherit parent app context - or - if root, adopt from root vnode
      const appContext =3D (parent ? parent.appContext : vnode.appContext) =
|| emptyAppContext;
      const instance =3D {
          uid: uid++,
          vnode,
          type,
          parent,
          appContext,
          root: null,
          next: null,
          subTree: null,
          effect: null,
          update: null,
          scope: new EffectScope(true /* detached */),
          render: null,
          proxy: null,
          exposed: null,
          exposeProxy: null,
          withProxy: null,
          provides: parent ? parent.provides : Object.create(appContext.pro=
vides),
          accessCache: null,
          renderCache: [],
          // local resolved assets
          components: null,
          directives: null,
          // resolved props and emits options
          propsOptions: normalizePropsOptions(type, appContext),
          emitsOptions: normalizeEmitsOptions(type, appContext),
          // emit
          emit: null,
          emitted: null,
          // props default value
          propsDefaults: EMPTY_OBJ,
          // inheritAttrs
          inheritAttrs: type.inheritAttrs,
          // state
          ctx: EMPTY_OBJ,
          data: EMPTY_OBJ,
          props: EMPTY_OBJ,
          attrs: EMPTY_OBJ,
          slots: EMPTY_OBJ,
          refs: EMPTY_OBJ,
          setupState: EMPTY_OBJ,
          setupContext: null,
          // suspense related
          suspense,
          suspenseId: suspense ? suspense.pendingId : 0,
          asyncDep: null,
          asyncResolved: false,
          // lifecycle hooks
          // not using enums here because it results in computed properties
          isMounted: false,
          isUnmounted: false,
          isDeactivated: false,
          bc: null,
          c: null,
          bm: null,
          m: null,
          bu: null,
          u: null,
          um: null,
          bum: null,
          da: null,
          a: null,
          rtg: null,
          rtc: null,
          ec: null,
          sp: null
      };
      {
          instance.ctx =3D createDevRenderContext(instance);
      }
      instance.root =3D parent ? parent.root : instance;
      instance.emit =3D emit.bind(null, instance);
      // apply custom element special handling
      if (vnode.ce) {
          vnode.ce(instance);
      }
      return instance;
  }
  let currentInstance =3D null;
  const getCurrentInstance =3D () =3D&gt; currentInstance || currentRenderi=
ngInstance;
  const setCurrentInstance =3D (instance) =3D&gt; {
      currentInstance =3D instance;
      instance.scope.on();
  };
  const unsetCurrentInstance =3D () =3D&gt; {
      currentInstance &amp;&amp; currentInstance.scope.off();
      currentInstance =3D null;
  };
  const isBuiltInTag =3D /*#__PURE__*/ makeMap('slot,component');
  function validateComponentName(name, config) {
      const appIsNativeTag =3D config.isNativeTag || NO;
      if (isBuiltInTag(name) || appIsNativeTag(name)) {
          warn('Do not use built-in or reserved HTML elements as component =
id: ' + name);
      }
  }
  function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag &amp; 4 /* ShapeFlags.STATEFUL_COMPON=
ENT */;
  }
  let isInSSRComponentSetup =3D false;
  function setupComponent(instance, isSSR =3D false) {
      isInSSRComponentSetup =3D isSSR;
      const { props, children } =3D instance.vnode;
      const isStateful =3D isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult =3D isStateful
          ? setupStatefulComponent(instance, isSSR)
          : undefined;
      isInSSRComponentSetup =3D false;
      return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
      var _a;
      const Component =3D instance.type;
      {
          if (Component.name) {
              validateComponentName(Component.name, instance.appContext.con=
fig);
          }
          if (Component.components) {
              const names =3D Object.keys(Component.components);
              for (let i =3D 0; i &lt; names.length; i++) {
                  validateComponentName(names[i], instance.appContext.confi=
g);
              }
          }
          if (Component.directives) {
              const names =3D Object.keys(Component.directives);
              for (let i =3D 0; i &lt; names.length; i++) {
                  validateDirectiveName(names[i]);
              }
          }
          if (Component.compilerOptions &amp;&amp; isRuntimeOnly()) {
              warn(`"compilerOptions" is only supported when using a build =
of Vue that ` +
                  `includes the runtime compiler. Since you are using a run=
time-only ` +
                  `build, the options should be passed via your build tool =
config instead.`);
          }
      }
      // 0. create render proxy property access cache
      instance.accessCache =3D Object.create(null);
      // 1. create public instance / render proxy
      // also mark it raw so it's never observed
      instance.proxy =3D markRaw(new Proxy(instance.ctx, PublicInstanceProx=
yHandlers));
      {
          exposePropsOnRenderContext(instance);
      }
      // 2. call setup()
      const { setup } =3D Component;
      if (setup) {
          const setupContext =3D (instance.setupContext =3D
              setup.length &gt; 1 ? createSetupContext(instance) : null);
          setCurrentInstance(instance);
          pauseTracking();
          const setupResult =3D callWithErrorHandling(setup, instance, 0 /*=
 ErrorCodes.SETUP_FUNCTION */, [shallowReadonly(instance.props) , setupCont=
ext]);
          resetTracking();
          unsetCurrentInstance();
          if (isPromise(setupResult)) {
              setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
              if (isSSR) {
                  // return the promise so server-renderer can wait on it
                  return setupResult
                      .then((resolvedResult) =3D&gt; {
                      handleSetupResult(instance, resolvedResult, isSSR);
                  })
                      .catch(e =3D&gt; {
                      handleError(e, instance, 0 /* ErrorCodes.SETUP_FUNCTI=
ON */);
                  });
              }
              else {
                  // async setup returned Promise.
                  // bail here and wait for re-entry.
                  instance.asyncDep =3D setupResult;
                  if (!instance.suspense) {
                      const name =3D (_a =3D Component.name) !=3D=3D null &=
amp;&amp; _a !=3D=3D void 0 ? _a : 'Anonymous';
                      warn(`Component &lt;${name}&gt;: setup function retur=
ned a promise, but no ` +
                          `&lt;Suspense&gt; boundary was found in the paren=
t component tree. ` +
                          `A component with async setup() must be nested in=
 a &lt;Suspense&gt; ` +
                          `in order to be rendered.`);
                  }
              }
          }
          else {
              handleSetupResult(instance, setupResult, isSSR);
          }
      }
      else {
          finishComponentSetup(instance, isSSR);
      }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
      if (isFunction(setupResult)) {
          // setup returned an inline render function
          {
              instance.render =3D setupResult;
          }
      }
      else if (isObject(setupResult)) {
          if (isVNode(setupResult)) {
              warn(`setup() should not return VNodes directly - ` +
                  `return a render function instead.`);
          }
          // setup returned bindings.
          // assuming a render function compiled from template is present.
          {
              instance.devtoolsRawSetupState =3D setupResult;
          }
          instance.setupState =3D proxyRefs(setupResult);
          {
              exposeSetupStateOnRenderContext(instance);
          }
      }
      else if (setupResult !=3D=3D undefined) {
          warn(`setup() should return an object. Received: ${setupResult =
=3D=3D=3D null ? 'null' : typeof setupResult}`);
      }
      finishComponentSetup(instance, isSSR);
  }
  let compile$1;
  let installWithProxy;
  /**
   * For runtime-dom to register the compiler.
   * Note the exported method uses any to avoid d.ts relying on the compile=
r types.
   */
  function registerRuntimeCompiler(_compile) {
      compile$1 =3D _compile;
      installWithProxy =3D i =3D&gt; {
          if (i.render._rc) {
              i.withProxy =3D new Proxy(i.ctx, RuntimeCompiledPublicInstanc=
eProxyHandlers);
          }
      };
  }
  // dev only
  const isRuntimeOnly =3D () =3D&gt; !compile$1;
  function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component =3D instance.type;
      // template / render function normalization
      // could be already set when returned from setup()
      if (!instance.render) {
          // only do on-the-fly compile if not in SSR - SSR on-the-fly comp=
ilation
          // is done by server-renderer
          if (!isSSR &amp;&amp; compile$1 &amp;&amp; !Component.render) {
              const template =3D Component.template ||
                  resolveMergedOptions(instance).template;
              if (template) {
                  {
                      startMeasure(instance, `compile`);
                  }
                  const { isCustomElement, compilerOptions } =3D instance.a=
ppContext.config;
                  const { delimiters, compilerOptions: componentCompilerOpt=
ions } =3D Component;
                  const finalCompilerOptions =3D extend(extend({
                      isCustomElement,
                      delimiters
                  }, compilerOptions), componentCompilerOptions);
                  Component.render =3D compile$1(template, finalCompilerOpt=
ions);
                  {
                      endMeasure(instance, `compile`);
                  }
              }
          }
          instance.render =3D (Component.render || NOOP);
          // for runtime-compiled render functions using `with` blocks, the=
 render
          // proxy used needs a different `has` handler which is more perfo=
rmant and
          // also only allows a whitelist of globals to fallthrough.
          if (installWithProxy) {
              installWithProxy(instance);
          }
      }
      // support for 2.x options
      {
          setCurrentInstance(instance);
          pauseTracking();
          applyOptions(instance);
          resetTracking();
          unsetCurrentInstance();
      }
      // warn missing template/render
      // the runtime compilation of template in SSR is done by server-rende=
r
      if (!Component.render &amp;&amp; instance.render =3D=3D=3D NOOP &amp;=
&amp; !isSSR) {
          /* istanbul ignore if */
          if (!compile$1 &amp;&amp; Component.template) {
              warn(`Component provided template option but ` +
                  `runtime compilation is not supported in this build of Vu=
e.` +
                  (` Use "vue.global.js" instead.`
                              ) /* should not happen */);
          }
          else {
              warn(`Component is missing template or render function.`);
          }
      }
  }
  function createAttrsProxy(instance) {
      return new Proxy(instance.attrs, {
              get(target, key) {
                  markAttrsAccessed();
                  track(instance, "get" /* TrackOpTypes.GET */, '$attrs');
                  return target[key];
              },
              set() {
                  warn(`setupContext.attrs is readonly.`);
                  return false;
              },
              deleteProperty() {
                  warn(`setupContext.attrs is readonly.`);
                  return false;
              }
          }
          );
  }
  function createSetupContext(instance) {
      const expose =3D exposed =3D&gt; {
          {
              if (instance.exposed) {
                  warn(`expose() should be called only once per setup().`);
              }
              if (exposed !=3D null) {
                  let exposedType =3D typeof exposed;
                  if (exposedType =3D=3D=3D 'object') {
                      if (isArray(exposed)) {
                          exposedType =3D 'array';
                      }
                      else if (isRef(exposed)) {
                          exposedType =3D 'ref';
                      }
                  }
                  if (exposedType !=3D=3D 'object') {
                      warn(`expose() should be passed a plain object, recei=
ved ${exposedType}.`);
                  }
              }
          }
          instance.exposed =3D exposed || {};
      };
      let attrs;
      {
          // We use getters in dev in case libs like test-utils overwrite i=
nstance
          // properties (overwrites should not be done in prod)
          return Object.freeze({
              get attrs() {
                  return attrs || (attrs =3D createAttrsProxy(instance));
              },
              get slots() {
                  return shallowReadonly(instance.slots);
              },
              get emit() {
                  return (event, ...args) =3D&gt; instance.emit(event, ...a=
rgs);
              },
              expose
          });
      }
  }
  function getExposeProxy(instance) {
      if (instance.exposed) {
          return (instance.exposeProxy ||
              (instance.exposeProxy =3D new Proxy(proxyRefs(markRaw(instanc=
e.exposed)), {
                  get(target, key) {
                      if (key in target) {
                          return target[key];
                      }
                      else if (key in publicPropertiesMap) {
                          return publicPropertiesMap[key](instance);
                      }
                  },
                  has(target, key) {
                      return key in target || key in publicPropertiesMap;
                  }
              })));
      }
  }
  const classifyRE =3D /(?:^|[-_])(\w)/g;
  const classify =3D (str) =3D&gt; str.replace(classifyRE, c =3D&gt; c.toUp=
perCase()).replace(/[-_]/g, '');
  function getComponentName(Component, includeInferred =3D true) {
      return isFunction(Component)
          ? Component.displayName || Component.name
          : Component.name || (includeInferred &amp;&amp; Component.__name)=
;
  }
  /* istanbul ignore next */
  function formatComponentName(instance, Component, isRoot =3D false) {
      let name =3D getComponentName(Component);
      if (!name &amp;&amp; Component.__file) {
          const match =3D Component.__file.match(/([^/\\]+)\.\w+$/);
          if (match) {
              name =3D match[1];
          }
      }
      if (!name &amp;&amp; instance &amp;&amp; instance.parent) {
          // try to infer the name based on reverse resolution
          const inferFromRegistry =3D (registry) =3D&gt; {
              for (const key in registry) {
                  if (registry[key] =3D=3D=3D Component) {
                      return key;
                  }
              }
          };
          name =3D
              inferFromRegistry(instance.components ||
                  instance.parent.type.components) || inferFromRegistry(ins=
tance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
      return isFunction(value) &amp;&amp; '__vccOpts' in value;
  }

  const computed =3D ((getterOrOptions, debugOptions) =3D&gt; {
      // @ts-ignore
      return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetu=
p);
  });

  // dev only
  const warnRuntimeUsage =3D (method) =3D&gt; warn(`${method}() is a compil=
er-hint helper that is only usable inside ` +
      `&lt;script setup&gt; of a single file component. Its arguments shoul=
d be ` +
      `compiled away and passing it at runtime has no effect.`);
  // implementation
  function defineProps() {
      {
          warnRuntimeUsage(`defineProps`);
      }
      return null;
  }
  // implementation
  function defineEmits() {
      {
          warnRuntimeUsage(`defineEmits`);
      }
      return null;
  }
  /**
   * Vue `&lt;script setup&gt;` compiler macro for declaring a component's =
exposed
   * instance properties when it is accessed by a parent component via temp=
late
   * refs.
   *
   * `&lt;script setup&gt;` components are closed by default - i.e. variabl=
es inside
   * the `&lt;script setup&gt;` scope is not exposed to parent unless expli=
citly exposed
   * via `defineExpose`.
   *
   * This is only usable inside `&lt;script setup&gt;`, is compiled away in=
 the
   * output and should **not** be actually called at runtime.
   */
  function defineExpose(exposed) {
      {
          warnRuntimeUsage(`defineExpose`);
      }
  }
  /**
   * Vue `&lt;script setup&gt;` compiler macro for providing props default =
values when
   * using type-based `defineProps` declaration.
   *
   * Example usage:
   * ```ts
   * withDefaults(defineProps&lt;{
   *   size?: number
   *   labels?: string[]
   * }&gt;(), {
   *   size: 3,
   *   labels: () =3D&gt; ['default label']
   * })
   * ```
   *
   * This is only usable inside `&lt;script setup&gt;`, is compiled away in=
 the output
   * and should **not** be actually called at runtime.
   */
  function withDefaults(props, defaults) {
      {
          warnRuntimeUsage(`withDefaults`);
      }
      return null;
  }
  function useSlots() {
      return getContext().slots;
  }
  function useAttrs() {
      return getContext().attrs;
  }
  function getContext() {
      const i =3D getCurrentInstance();
      if (!i) {
          warn(`useContext() called without active instance.`);
      }
      return i.setupContext || (i.setupContext =3D createSetupContext(i));
  }
  /**
   * Runtime helper for merging default declarations. Imported by compiled =
code
   * only.
   * @internal
   */
  function mergeDefaults(raw, defaults) {
      const props =3D isArray(raw)
          ? raw.reduce((normalized, p) =3D&gt; ((normalized[p] =3D {}), nor=
malized), {})
          : raw;
      for (const key in defaults) {
          const opt =3D props[key];
          if (opt) {
              if (isArray(opt) || isFunction(opt)) {
                  props[key] =3D { type: opt, default: defaults[key] };
              }
              else {
                  opt.default =3D defaults[key];
              }
          }
          else if (opt =3D=3D=3D null) {
              props[key] =3D { default: defaults[key] };
          }
          else {
              warn(`props default key "${key}" has no corresponding declara=
tion.`);
          }
      }
      return props;
  }
  /**
   * Used to create a proxy for the rest element when destructuring props w=
ith
   * defineProps().
   * @internal
   */
  function createPropsRestProxy(props, excludedKeys) {
      const ret =3D {};
      for (const key in props) {
          if (!excludedKeys.includes(key)) {
              Object.defineProperty(ret, key, {
                  enumerable: true,
                  get: () =3D&gt; props[key]
              });
          }
      }
      return ret;
  }
  /**
   * `&lt;script setup&gt;` helper for persisting the current instance cont=
ext over
   * async/await flows.
   *
   * `@vue/compiler-sfc` converts the following:
   *
   * ```ts
   * const x =3D await foo()
   * ```
   *
   * into:
   *
   * ```ts
   * let __temp, __restore
   * const x =3D (([__temp, __restore] =3D withAsyncContext(() =3D&gt; foo(=
))),__temp=3Dawait __temp,__restore(),__temp)
   * ```
   * @internal
   */
  function withAsyncContext(getAwaitable) {
      const ctx =3D getCurrentInstance();
      if (!ctx) {
          warn(`withAsyncContext called without active current instance. ` =
+
              `This is likely a bug.`);
      }
      let awaitable =3D getAwaitable();
      unsetCurrentInstance();
      if (isPromise(awaitable)) {
          awaitable =3D awaitable.catch(e =3D&gt; {
              setCurrentInstance(ctx);
              throw e;
          });
      }
      return [awaitable, () =3D&gt; setCurrentInstance(ctx)];
  }

  // Actual implementation
  function h(type, propsOrChildren, children) {
      const l =3D arguments.length;
      if (l =3D=3D=3D 2) {
          if (isObject(propsOrChildren) &amp;&amp; !isArray(propsOrChildren=
)) {
              // single vnode without props
              if (isVNode(propsOrChildren)) {
                  return createVNode(type, null, [propsOrChildren]);
              }
              // props without children
              return createVNode(type, propsOrChildren);
          }
          else {
              // omit props
              return createVNode(type, null, propsOrChildren);
          }
      }
      else {
          if (l &gt; 3) {
              children =3D Array.prototype.slice.call(arguments, 2);
          }
          else if (l =3D=3D=3D 3 &amp;&amp; isVNode(children)) {
              children =3D [children];
          }
          return createVNode(type, propsOrChildren, children);
      }
  }

  const ssrContextKey =3D Symbol(`ssrContext` );
  const useSSRContext =3D () =3D&gt; {
      {
          warn(`useSSRContext() is not supported in the global build.`);
      }
  };

  function initCustomFormatter() {
      /* eslint-disable no-restricted-globals */
      if (typeof window =3D=3D=3D 'undefined') {
          return;
      }
      const vueStyle =3D { style: 'color:#3ba776' };
      const numberStyle =3D { style: 'color:#0b1bc9' };
      const stringStyle =3D { style: 'color:#b62e24' };
      const keywordStyle =3D { style: 'color:#9d288c' };
      // custom formatter for Chrome
      // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-obje=
ct-formatters.html
      const formatter =3D {
          header(obj) {
              // TODO also format ComponentPublicInstance &amp; ctx.slots/a=
ttrs in setup
              if (!isObject(obj)) {
                  return null;
              }
              if (obj.__isVue) {
                  return ['div', vueStyle, `VueInstance`];
              }
              else if (isRef(obj)) {
                  return [
                      'div',
                      {},
                      ['span', vueStyle, genRefFlag(obj)],
                      '&lt;',
                      formatValue(obj.value),
                      `&gt;`
                  ];
              }
              else if (isReactive(obj)) {
                  return [
                      'div',
                      {},
                      ['span', vueStyle, isShallow(obj) ? 'ShallowReactive'=
 : 'Reactive'],
                      '&lt;',
                      formatValue(obj),
                      `&gt;${isReadonly(obj) ? ` (readonly)` : ``}`
                  ];
              }
              else if (isReadonly(obj)) {
                  return [
                      'div',
                      {},
                      ['span', vueStyle, isShallow(obj) ? 'ShallowReadonly'=
 : 'Readonly'],
                      '&lt;',
                      formatValue(obj),
                      '&gt;'
                  ];
              }
              return null;
          },
          hasBody(obj) {
              return obj &amp;&amp; obj.__isVue;
          },
          body(obj) {
              if (obj &amp;&amp; obj.__isVue) {
                  return [
                      'div',
                      {},
                      ...formatInstance(obj.$)
                  ];
              }
          }
      };
      function formatInstance(instance) {
          const blocks =3D [];
          if (instance.type.props &amp;&amp; instance.props) {
              blocks.push(createInstanceBlock('props', toRaw(instance.props=
)));
          }
          if (instance.setupState !=3D=3D EMPTY_OBJ) {
              blocks.push(createInstanceBlock('setup', instance.setupState)=
);
          }
          if (instance.data !=3D=3D EMPTY_OBJ) {
              blocks.push(createInstanceBlock('data', toRaw(instance.data))=
);
          }
          const computed =3D extractKeys(instance, 'computed');
          if (computed) {
              blocks.push(createInstanceBlock('computed', computed));
          }
          const injected =3D extractKeys(instance, 'inject');
          if (injected) {
              blocks.push(createInstanceBlock('injected', injected));
          }
          blocks.push([
              'div',
              {},
              [
                  'span',
                  {
                      style: keywordStyle.style + ';opacity:0.66'
                  },
                  '$ (internal): '
              ],
              ['object', { object: instance }]
          ]);
          return blocks;
      }
      function createInstanceBlock(type, target) {
          target =3D extend({}, target);
          if (!Object.keys(target).length) {
              return ['span', {}];
          }
          return [
              'div',
              { style: 'line-height:1.25em;margin-bottom:0.6em' },
              [
                  'div',
                  {
                      style: 'color:#476582'
                  },
                  type
              ],
              [
                  'div',
                  {
                      style: 'padding-left:1.25em'
                  },
                  ...Object.keys(target).map(key =3D&gt; {
                      return [
                          'div',
                          {},
                          ['span', keywordStyle, key + ': '],
                          formatValue(target[key], false)
                      ];
                  })
              ]
          ];
      }
      function formatValue(v, asRaw =3D true) {
          if (typeof v =3D=3D=3D 'number') {
              return ['span', numberStyle, v];
          }
          else if (typeof v =3D=3D=3D 'string') {
              return ['span', stringStyle, JSON.stringify(v)];
          }
          else if (typeof v =3D=3D=3D 'boolean') {
              return ['span', keywordStyle, v];
          }
          else if (isObject(v)) {
              return ['object', { object: asRaw ? toRaw(v) : v }];
          }
          else {
              return ['span', stringStyle, String(v)];
          }
      }
      function extractKeys(instance, type) {
          const Comp =3D instance.type;
          if (isFunction(Comp)) {
              return;
          }
          const extracted =3D {};
          for (const key in instance.ctx) {
              if (isKeyOfType(Comp, key, type)) {
                  extracted[key] =3D instance.ctx[key];
              }
          }
          return extracted;
      }
      function isKeyOfType(Comp, key, type) {
          const opts =3D Comp[type];
          if ((isArray(opts) &amp;&amp; opts.includes(key)) ||
              (isObject(opts) &amp;&amp; key in opts)) {
              return true;
          }
          if (Comp.extends &amp;&amp; isKeyOfType(Comp.extends, key, type))=
 {
              return true;
          }
          if (Comp.mixins &amp;&amp; Comp.mixins.some(m =3D&gt; isKeyOfType=
(m, key, type))) {
              return true;
          }
      }
      function genRefFlag(v) {
          if (isShallow(v)) {
              return `ShallowRef`;
          }
          if (v.effect) {
              return `ComputedRef`;
          }
          return `Ref`;
      }
      if (window.devtoolsFormatters) {
          window.devtoolsFormatters.push(formatter);
      }
      else {
          window.devtoolsFormatters =3D [formatter];
      }
  }

  function withMemo(memo, render, cache, index) {
      const cached =3D cache[index];
      if (cached &amp;&amp; isMemoSame(cached, memo)) {
          return cached;
      }
      const ret =3D render();
      // shallow clone
      ret.memo =3D memo.slice();
      return (cache[index] =3D ret);
  }
  function isMemoSame(cached, memo) {
      const prev =3D cached.memo;
      if (prev.length !=3D memo.length) {
          return false;
      }
      for (let i =3D 0; i &lt; prev.length; i++) {
          if (hasChanged(prev[i], memo[i])) {
              return false;
          }
      }
      // make sure to let parent block track it when returning cached
      if (isBlockTreeEnabled &gt; 0 &amp;&amp; currentBlock) {
          currentBlock.push(cached);
      }
      return true;
  }

  // Core API -------------------------------------------------------------=
-----
  const version =3D "3.2.47";
  /**
   * SSR utils for \@vue/server-renderer. Only exposed in ssr-possible buil=
ds.
   * @internal
   */
  const ssrUtils =3D (null);
  /**
   * @internal only exposed in compat builds
   */
  const resolveFilter =3D null;
  /**
   * @internal only exposed in compat builds.
   */
  const compatUtils =3D (null);

  const svgNS =3D 'http://www.w3.org/2000/svg';
  const doc =3D (typeof document !=3D=3D 'undefined' ? document : null);
  const templateContainer =3D doc &amp;&amp; /*#__PURE__*/ doc.createElemen=
t('template');
  const nodeOps =3D {
      insert: (child, parent, anchor) =3D&gt; {
          parent.insertBefore(child, anchor || null);
      },
      remove: child =3D&gt; {
          const parent =3D child.parentNode;
          if (parent) {
              parent.removeChild(child);
          }
      },
      createElement: (tag, isSVG, is, props) =3D&gt; {
          const el =3D isSVG
              ? doc.createElementNS(svgNS, tag)
              : doc.createElement(tag, is ? { is } : undefined);
          if (tag =3D=3D=3D 'select' &amp;&amp; props &amp;&amp; props.mult=
iple !=3D null) {
              el.setAttribute('multiple', props.multiple);
          }
          return el;
      },
      createText: text =3D&gt; doc.createTextNode(text),
      createComment: text =3D&gt; doc.createComment(text),
      setText: (node, text) =3D&gt; {
          node.nodeValue =3D text;
      },
      setElementText: (el, text) =3D&gt; {
          el.textContent =3D text;
      },
      parentNode: node =3D&gt; node.parentNode,
      nextSibling: node =3D&gt; node.nextSibling,
      querySelector: selector =3D&gt; doc.querySelector(selector),
      setScopeId(el, id) {
          el.setAttribute(id, '');
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, isSVG, start, end) {
          // &lt;parent&gt; before | first ... last | anchor &lt;/parent&gt=
;
          const before =3D anchor ? anchor.previousSibling : parent.lastChi=
ld;
          // #5308 can only take cached path if:
          // - has a single root node
          // - nextSibling info is still available
          if (start &amp;&amp; (start =3D=3D=3D end || start.nextSibling)) =
{
              // cached
              while (true) {
                  parent.insertBefore(start.cloneNode(true), anchor);
                  if (start =3D=3D=3D end || !(start =3D start.nextSibling)=
)
                      break;
              }
          }
          else {
              // fresh insert
              templateContainer.innerHTML =3D isSVG ? `&lt;svg&gt;${content=
}&lt;/svg&gt;` : content;
              const template =3D templateContainer.content;
              if (isSVG) {
                  // remove outer svg wrapper
                  const wrapper =3D template.firstChild;
                  while (wrapper.firstChild) {
                      template.appendChild(wrapper.firstChild);
                  }
                  template.removeChild(wrapper);
              }
              parent.insertBefore(template, anchor);
          }
          return [
              // first
              before ? before.nextSibling : parent.firstChild,
              // last
              anchor ? anchor.previousSibling : parent.lastChild
          ];
      }
  };

  // compiler should normalize class + :class bindings on the same element
  // into a single binding ['staticClass', dynamic]
  function patchClass(el, value, isSVG) {
      // directly setting className should be faster than setAttribute in t=
heory
      // if this is an element during a transition, take the temporary tran=
sition
      // classes into account.
      const transitionClasses =3D el._vtc;
      if (transitionClasses) {
          value =3D (value ? [value, ...transitionClasses] : [...transition=
Classes]).join(' ');
      }
      if (value =3D=3D null) {
          el.removeAttribute('class');
      }
      else if (isSVG) {
          el.setAttribute('class', value);
      }
      else {
          el.className =3D value;
      }
  }

  function patchStyle(el, prev, next) {
      const style =3D el.style;
      const isCssString =3D isString(next);
      if (next &amp;&amp; !isCssString) {
          if (prev &amp;&amp; !isString(prev)) {
              for (const key in prev) {
                  if (next[key] =3D=3D null) {
                      setStyle(style, key, '');
                  }
              }
          }
          for (const key in next) {
              setStyle(style, key, next[key]);
          }
      }
      else {
          const currentDisplay =3D style.display;
          if (isCssString) {
              if (prev !=3D=3D next) {
                  style.cssText =3D next;
              }
          }
          else if (prev) {
              el.removeAttribute('style');
          }
          // indicates that the `display` of the element is controlled by `=
v-show`,
          // so we always keep the current `display` value regardless of th=
e `style`
          // value, thus handing over control to `v-show`.
          if ('_vod' in el) {
              style.display =3D currentDisplay;
          }
      }
  }
  const semicolonRE =3D /[^\\];\s*$/;
  const importantRE =3D /\s*!important$/;
  function setStyle(style, name, val) {
      if (isArray(val)) {
          val.forEach(v =3D&gt; setStyle(style, name, v));
      }
      else {
          if (val =3D=3D null)
              val =3D '';
          {
              if (semicolonRE.test(val)) {
                  warn(`Unexpected semicolon at the end of '${name}' style =
value: '${val}'`);
              }
          }
          if (name.startsWith('--')) {
              // custom property definition
              style.setProperty(name, val);
          }
          else {
              const prefixed =3D autoPrefix(style, name);
              if (importantRE.test(val)) {
                  // !important
                  style.setProperty(hyphenate(prefixed), val.replace(import=
antRE, ''), 'important');
              }
              else {
                  style[prefixed] =3D val;
              }
          }
      }
  }
  const prefixes =3D ['Webkit', 'Moz', 'ms'];
  const prefixCache =3D {};
  function autoPrefix(style, rawName) {
      const cached =3D prefixCache[rawName];
      if (cached) {
          return cached;
      }
      let name =3D camelize(rawName);
      if (name !=3D=3D 'filter' &amp;&amp; name in style) {
          return (prefixCache[rawName] =3D name);
      }
      name =3D capitalize(name);
      for (let i =3D 0; i &lt; prefixes.length; i++) {
          const prefixed =3D prefixes[i] + name;
          if (prefixed in style) {
              return (prefixCache[rawName] =3D prefixed);
          }
      }
      return rawName;
  }

  const xlinkNS =3D 'http://www.w3.org/1999/xlink';
  function patchAttr(el, key, value, isSVG, instance) {
      if (isSVG &amp;&amp; key.startsWith('xlink:')) {
          if (value =3D=3D null) {
              el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
          }
          else {
              el.setAttributeNS(xlinkNS, key, value);
          }
      }
      else {
          // note we are only checking boolean attributes that don't have a
          // corresponding dom prop of the same name here.
          const isBoolean =3D isSpecialBooleanAttr(key);
          if (value =3D=3D null || (isBoolean &amp;&amp; !includeBooleanAtt=
r(value))) {
              el.removeAttribute(key);
          }
          else {
              el.setAttribute(key, isBoolean ? '' : value);
          }
      }
  }

  // __UNSAFE__
  // functions. The user is responsible for using them with only trusted co=
ntent.
  function patchDOMProp(el, key, value,=20
  // the following args are passed only due to potential innerHTML/textCont=
ent
  // overriding existing VNodes, in which case the old tree must be properl=
y
  // unmounted.
  prevChildren, parentComponent, parentSuspense, unmountChildren) {
      if (key =3D=3D=3D 'innerHTML' || key =3D=3D=3D 'textContent') {
          if (prevChildren) {
              unmountChildren(prevChildren, parentComponent, parentSuspense=
);
          }
          el[key] =3D value =3D=3D null ? '' : value;
          return;
      }
      if (key =3D=3D=3D 'value' &amp;&amp;
          el.tagName !=3D=3D 'PROGRESS' &amp;&amp;
          // custom elements may use _value internally
          !el.tagName.includes('-')) {
          // store value as _value as well since
          // non-string values will be stringified.
          el._value =3D value;
          const newValue =3D value =3D=3D null ? '' : value;
          if (el.value !=3D=3D newValue ||
              // #4956: always set for OPTION elements because its value fa=
lls back to
              // textContent if no value attribute is present. And setting =
.value for
              // OPTION has no side effect
              el.tagName =3D=3D=3D 'OPTION') {
              el.value =3D newValue;
          }
          if (value =3D=3D null) {
              el.removeAttribute(key);
          }
          return;
      }
      let needRemove =3D false;
      if (value =3D=3D=3D '' || value =3D=3D null) {
          const type =3D typeof el[key];
          if (type =3D=3D=3D 'boolean') {
              // e.g. &lt;select multiple&gt; compiles to { multiple: '' }
              value =3D includeBooleanAttr(value);
          }
          else if (value =3D=3D null &amp;&amp; type =3D=3D=3D 'string') {
              // e.g. &lt;div :id=3D"null"&gt;
              value =3D '';
              needRemove =3D true;
          }
          else if (type =3D=3D=3D 'number') {
              // e.g. &lt;img :width=3D"null"&gt;
              value =3D 0;
              needRemove =3D true;
          }
      }
      // some properties perform value validation and throw,
      // some properties has getter, no setter, will error in 'use strict'
      // eg. &lt;select :type=3D"null"&gt;&lt;/select&gt; &lt;select :willV=
alidate=3D"null"&gt;&lt;/select&gt;
      try {
          el[key] =3D value;
      }
      catch (e) {
          // do not warn if value is auto-coerced from nullish values
          if (!needRemove) {
              warn(`Failed setting prop "${key}" on &lt;${el.tagName.toLowe=
rCase()}&gt;: ` +
                  `value ${value} is invalid.`, e);
          }
      }
      needRemove &amp;&amp; el.removeAttribute(key);
  }

  function addEventListener(el, event, handler, options) {
      el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
      el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance =3D null)=
 {
      // vei =3D vue event invokers
      const invokers =3D el._vei || (el._vei =3D {});
      const existingInvoker =3D invokers[rawName];
      if (nextValue &amp;&amp; existingInvoker) {
          // patch
          existingInvoker.value =3D nextValue;
      }
      else {
          const [name, options] =3D parseName(rawName);
          if (nextValue) {
              // add
              const invoker =3D (invokers[rawName] =3D createInvoker(nextVa=
lue, instance));
              addEventListener(el, name, invoker, options);
          }
          else if (existingInvoker) {
              // remove
              removeEventListener(el, name, existingInvoker, options);
              invokers[rawName] =3D undefined;
          }
      }
  }
  const optionsModifierRE =3D /(?:Once|Passive|Capture)$/;
  function parseName(name) {
      let options;
      if (optionsModifierRE.test(name)) {
          options =3D {};
          let m;
          while ((m =3D name.match(optionsModifierRE))) {
              name =3D name.slice(0, name.length - m[0].length);
              options[m[0].toLowerCase()] =3D true;
          }
      }
      const event =3D name[2] =3D=3D=3D ':' ? name.slice(3) : hyphenate(nam=
e.slice(2));
      return [event, options];
  }
  // To avoid the overhead of repeatedly calling Date.now(), we cache
  // and use the same timestamp for all event listeners attached in the sam=
e tick.
  let cachedNow =3D 0;
  const p =3D /*#__PURE__*/ Promise.resolve();
  const getNow =3D () =3D&gt; cachedNow || (p.then(() =3D&gt; (cachedNow =
=3D 0)), (cachedNow =3D Date.now()));
  function createInvoker(initialValue, instance) {
      const invoker =3D (e) =3D&gt; {
          // async edge case vuejs/vue#6566
          // inner click event triggers patch, event handler
          // attached to outer element during patch, and triggered again. T=
his
          // happens because browsers fire microtask ticks between event pr=
opagation.
          // this no longer happens for templates in Vue 3, but could still=
 be
          // theoretically possible for hand-written render functions.
          // the solution: we save the timestamp when a handler is attached=
,
          // and also attach the timestamp to any event that was handled by=
 vue
          // for the first time (to avoid inconsistent event timestamp impl=
ementations
          // or events fired from iframes, e.g. #2513)
          // The handler would only fire if the event passed to it was fire=
d
          // AFTER it was attached.
          if (!e._vts) {
              e._vts =3D Date.now();
          }
          else if (e._vts &lt;=3D invoker.attached) {
              return;
          }
          callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invok=
er.value), instance, 5 /* ErrorCodes.NATIVE_EVENT_HANDLER */, [e]);
      };
      invoker.value =3D initialValue;
      invoker.attached =3D getNow();
      return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
      if (isArray(value)) {
          const originalStop =3D e.stopImmediatePropagation;
          e.stopImmediatePropagation =3D () =3D&gt; {
              originalStop.call(e);
              e._stopped =3D true;
          };
          return value.map(fn =3D&gt; (e) =3D&gt; !e._stopped &amp;&amp; fn=
 &amp;&amp; fn(e));
      }
      else {
          return value;
      }
  }

  const nativeOnRE =3D /^on[a-z]/;
  const patchProp =3D (el, key, prevValue, nextValue, isSVG =3D false, prev=
Children, parentComponent, parentSuspense, unmountChildren) =3D&gt; {
      if (key =3D=3D=3D 'class') {
          patchClass(el, nextValue, isSVG);
      }
      else if (key =3D=3D=3D 'style') {
          patchStyle(el, prevValue, nextValue);
      }
      else if (isOn(key)) {
          // ignore v-model listeners
          if (!isModelListener(key)) {
              patchEvent(el, key, prevValue, nextValue, parentComponent);
          }
      }
      else if (key[0] =3D=3D=3D '.'
          ? ((key =3D key.slice(1)), true)
          : key[0] =3D=3D=3D '^'
              ? ((key =3D key.slice(1)), false)
              : shouldSetAsProp(el, key, nextValue, isSVG)) {
          patchDOMProp(el, key, nextValue, prevChildren, parentComponent, p=
arentSuspense, unmountChildren);
      }
      else {
          // special case for &lt;input v-model type=3D"checkbox"&gt; with
          // :true-value &amp; :false-value
          // store value as dom properties since non-string values will be
          // stringified.
          if (key =3D=3D=3D 'true-value') {
              el._trueValue =3D nextValue;
          }
          else if (key =3D=3D=3D 'false-value') {
              el._falseValue =3D nextValue;
          }
          patchAttr(el, key, nextValue, isSVG);
      }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
      if (isSVG) {
          // most keys must be set as attribute on svg elements to work
          // ...except innerHTML &amp; textContent
          if (key =3D=3D=3D 'innerHTML' || key =3D=3D=3D 'textContent') {
              return true;
          }
          // or native onclick with function values
          if (key in el &amp;&amp; nativeOnRE.test(key) &amp;&amp; isFuncti=
on(value)) {
              return true;
          }
          return false;
      }
      // these are enumerated attrs, however their corresponding DOM proper=
ties
      // are actually booleans - this leads to setting it with a string "fa=
lse"
      // value leading it to be coerced to `true`, so we need to always tre=
at
      // them as attributes.
      // Note that `contentEditable` doesn't have this problem: its DOM
      // property is also enumerated string values.
      if (key =3D=3D=3D 'spellcheck' || key =3D=3D=3D 'draggable' || key =
=3D=3D=3D 'translate') {
          return false;
      }
      // #1787, #2840 form property on form elements is readonly and must b=
e set as
      // attribute.
      if (key =3D=3D=3D 'form') {
          return false;
      }
      // #1526 &lt;input list&gt; must be set as attribute
      if (key =3D=3D=3D 'list' &amp;&amp; el.tagName =3D=3D=3D 'INPUT') {
          return false;
      }
      // #2766 &lt;textarea type&gt; must be set as attribute
      if (key =3D=3D=3D 'type' &amp;&amp; el.tagName =3D=3D=3D 'TEXTAREA') =
{
          return false;
      }
      // native onclick with string value, must be set as attribute
      if (nativeOnRE.test(key) &amp;&amp; isString(value)) {
          return false;
      }
      return key in el;
  }

  function defineCustomElement(options, hydrate) {
      const Comp =3D defineComponent(options);
      class VueCustomElement extends VueElement {
          constructor(initialProps) {
              super(Comp, initialProps, hydrate);
          }
      }
      VueCustomElement.def =3D Comp;
      return VueCustomElement;
  }
  const defineSSRCustomElement =3D ((options) =3D&gt; {
      // @ts-ignore
      return defineCustomElement(options, hydrate);
  });
  const BaseClass =3D (typeof HTMLElement !=3D=3D 'undefined' ? HTMLElement=
 : class {
  });
  class VueElement extends BaseClass {
      constructor(_def, _props =3D {}, hydrate) {
          super();
          this._def =3D _def;
          this._props =3D _props;
          /**
           * @internal
           */
          this._instance =3D null;
          this._connected =3D false;
          this._resolved =3D false;
          this._numberProps =3D null;
          if (this.shadowRoot &amp;&amp; hydrate) {
              hydrate(this._createVNode(), this.shadowRoot);
          }
          else {
              if (this.shadowRoot) {
                  warn(`Custom element has pre-rendered declarative shadow =
root but is not ` +
                      `defined as hydratable. Use \`defineSSRCustomElement\=
`.`);
              }
              this.attachShadow({ mode: 'open' });
              if (!this._def.__asyncLoader) {
                  // for sync component defs we can immediately resolve pro=
ps
                  this._resolveProps(this._def);
              }
          }
      }
      connectedCallback() {
          this._connected =3D true;
          if (!this._instance) {
              if (this._resolved) {
                  this._update();
              }
              else {
                  this._resolveDef();
              }
          }
      }
      disconnectedCallback() {
          this._connected =3D false;
          nextTick(() =3D&gt; {
              if (!this._connected) {
                  render(null, this.shadowRoot);
                  this._instance =3D null;
              }
          });
      }
      /**
       * resolve inner component definition (handle possible async componen=
t)
       */
      _resolveDef() {
          this._resolved =3D true;
          // set initial attrs
          for (let i =3D 0; i &lt; this.attributes.length; i++) {
              this._setAttr(this.attributes[i].name);
          }
          // watch future attr changes
          new MutationObserver(mutations =3D&gt; {
              for (const m of mutations) {
                  this._setAttr(m.attributeName);
              }
          }).observe(this, { attributes: true });
          const resolve =3D (def, isAsync =3D false) =3D&gt; {
              const { props, styles } =3D def;
              // cast Number-type props set before resolve
              let numberProps;
              if (props &amp;&amp; !isArray(props)) {
                  for (const key in props) {
                      const opt =3D props[key];
                      if (opt =3D=3D=3D Number || (opt &amp;&amp; opt.type =
=3D=3D=3D Number)) {
                          if (key in this._props) {
                              this._props[key] =3D toNumber(this._props[key=
]);
                          }
                          (numberProps || (numberProps =3D Object.create(nu=
ll)))[camelize(key)] =3D true;
                      }
                  }
              }
              this._numberProps =3D numberProps;
              if (isAsync) {
                  // defining getter/setters on prototype
                  // for sync defs, this already happened in the constructo=
r
                  this._resolveProps(def);
              }
              // apply CSS
              this._applyStyles(styles);
              // initial render
              this._update();
          };
          const asyncDef =3D this._def.__asyncLoader;
          if (asyncDef) {
              asyncDef().then(def =3D&gt; resolve(def, true));
          }
          else {
              resolve(this._def);
          }
      }
      _resolveProps(def) {
          const { props } =3D def;
          const declaredPropKeys =3D isArray(props) ? props : Object.keys(p=
rops || {});
          // check if there are props set pre-upgrade or connect
          for (const key of Object.keys(this)) {
              if (key[0] !=3D=3D '_' &amp;&amp; declaredPropKeys.includes(k=
ey)) {
                  this._setProp(key, this[key], true, false);
              }
          }
          // defining getter/setters on prototype
          for (const key of declaredPropKeys.map(camelize)) {
              Object.defineProperty(this, key, {
                  get() {
                      return this._getProp(key);
                  },
                  set(val) {
                      this._setProp(key, val);
                  }
              });
          }
      }
      _setAttr(key) {
          let value =3D this.getAttribute(key);
          const camelKey =3D camelize(key);
          if (this._numberProps &amp;&amp; this._numberProps[camelKey]) {
              value =3D toNumber(value);
          }
          this._setProp(camelKey, value, false);
      }
      /**
       * @internal
       */
      _getProp(key) {
          return this._props[key];
      }
      /**
       * @internal
       */
      _setProp(key, val, shouldReflect =3D true, shouldUpdate =3D true) {
          if (val !=3D=3D this._props[key]) {
              this._props[key] =3D val;
              if (shouldUpdate &amp;&amp; this._instance) {
                  this._update();
              }
              // reflect
              if (shouldReflect) {
                  if (val =3D=3D=3D true) {
                      this.setAttribute(hyphenate(key), '');
                  }
                  else if (typeof val =3D=3D=3D 'string' || typeof val =3D=
=3D=3D 'number') {
                      this.setAttribute(hyphenate(key), val + '');
                  }
                  else if (!val) {
                      this.removeAttribute(hyphenate(key));
                  }
              }
          }
      }
      _update() {
          render(this._createVNode(), this.shadowRoot);
      }
      _createVNode() {
          const vnode =3D createVNode(this._def, extend({}, this._props));
          if (!this._instance) {
              vnode.ce =3D instance =3D&gt; {
                  this._instance =3D instance;
                  instance.isCE =3D true;
                  // HMR
                  {
                      instance.ceReload =3D newStyles =3D&gt; {
                          // always reset styles
                          if (this._styles) {
                              this._styles.forEach(s =3D&gt; this.shadowRoo=
t.removeChild(s));
                              this._styles.length =3D 0;
                          }
                          this._applyStyles(newStyles);
                          this._instance =3D null;
                          this._update();
                      };
                  }
                  const dispatch =3D (event, args) =3D&gt; {
                      this.dispatchEvent(new CustomEvent(event, {
                          detail: args
                      }));
                  };
                  // intercept emit
                  instance.emit =3D (event, ...args) =3D&gt; {
                      // dispatch both the raw and hyphenated versions of a=
n event
                      // to match Vue behavior
                      dispatch(event, args);
                      if (hyphenate(event) !=3D=3D event) {
                          dispatch(hyphenate(event), args);
                      }
                  };
                  // locate nearest Vue custom element parent for provide/i=
nject
                  let parent =3D this;
                  while ((parent =3D
                      parent &amp;&amp; (parent.parentNode || parent.host))=
) {
                      if (parent instanceof VueElement) {
                          instance.parent =3D parent._instance;
                          instance.provides =3D parent._instance.provides;
                          break;
                      }
                  }
              };
          }
          return vnode;
      }
      _applyStyles(styles) {
          if (styles) {
              styles.forEach(css =3D&gt; {
                  const s =3D document.createElement('style');
                  s.textContent =3D css;
                  this.shadowRoot.appendChild(s);
                  // record for HMR
                  {
                      (this._styles || (this._styles =3D [])).push(s);
                  }
              });
          }
      }
  }

  function useCssModule(name =3D '$style') {
      /* istanbul ignore else */
      {
          {
              warn(`useCssModule() is not supported in the global build.`);
          }
          return EMPTY_OBJ;
      }
  }

  /**
   * Runtime helper for SFC's CSS variable injection feature.
   * @private
   */
  function useCssVars(getter) {
      const instance =3D getCurrentInstance();
      /* istanbul ignore next */
      if (!instance) {
          warn(`useCssVars is called without current active component insta=
nce.`);
          return;
      }
      const updateTeleports =3D (instance.ut =3D (vars =3D getter(instance.=
proxy)) =3D&gt; {
          Array.from(document.querySelectorAll(`[data-v-owner=3D"${instance=
.uid}"]`)).forEach(node =3D&gt; setVarsOnNode(node, vars));
      });
      const setVars =3D () =3D&gt; {
          const vars =3D getter(instance.proxy);
          setVarsOnVNode(instance.subTree, vars);
          updateTeleports(vars);
      };
      watchPostEffect(setVars);
      onMounted(() =3D&gt; {
          const ob =3D new MutationObserver(setVars);
          ob.observe(instance.subTree.el.parentNode, { childList: true });
          onUnmounted(() =3D&gt; ob.disconnect());
      });
  }
  function setVarsOnVNode(vnode, vars) {
      if (vnode.shapeFlag &amp; 128 /* ShapeFlags.SUSPENSE */) {
          const suspense =3D vnode.suspense;
          vnode =3D suspense.activeBranch;
          if (suspense.pendingBranch &amp;&amp; !suspense.isHydrating) {
              suspense.effects.push(() =3D&gt; {
                  setVarsOnVNode(suspense.activeBranch, vars);
              });
          }
      }
      // drill down HOCs until it's a non-component vnode
      while (vnode.component) {
          vnode =3D vnode.component.subTree;
      }
      if (vnode.shapeFlag &amp; 1 /* ShapeFlags.ELEMENT */ &amp;&amp; vnode=
.el) {
          setVarsOnNode(vnode.el, vars);
      }
      else if (vnode.type =3D=3D=3D Fragment) {
          vnode.children.forEach(c =3D&gt; setVarsOnVNode(c, vars));
      }
      else if (vnode.type =3D=3D=3D Static) {
          let { el, anchor } =3D vnode;
          while (el) {
              setVarsOnNode(el, vars);
              if (el =3D=3D=3D anchor)
                  break;
              el =3D el.nextSibling;
          }
      }
  }
  function setVarsOnNode(el, vars) {
      if (el.nodeType =3D=3D=3D 1) {
          const style =3D el.style;
          for (const key in vars) {
              style.setProperty(`--${key}`, vars[key]);
          }
      }
  }

  const TRANSITION$1 =3D 'transition';
  const ANIMATION =3D 'animation';
  // DOM Transition is a higher-order-component based on the platform-agnos=
tic
  // base Transition component, with DOM-specific logic.
  const Transition =3D (props, { slots }) =3D&gt; h(BaseTransition, resolve=
TransitionProps(props), slots);
  Transition.displayName =3D 'Transition';
  const DOMTransitionPropsValidators =3D {
      name: String,
      type: String,
      css: {
          type: Boolean,
          default: true
      },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String
  };
  const TransitionPropsValidators =3D (Transition.props =3D
      /*#__PURE__*/ extend({}, BaseTransition.props, DOMTransitionPropsVali=
dators));
  /**
   * #3227 Incoming hooks may be merged into arrays when wrapping Transitio=
n
   * with custom HOCs.
   */
  const callHook =3D (hook, args =3D []) =3D&gt; {
      if (isArray(hook)) {
          hook.forEach(h =3D&gt; h(...args));
      }
      else if (hook) {
          hook(...args);
      }
  };
  /**
   * Check if a hook expects a callback (2nd arg), which means the user
   * intends to explicitly control the end of the transition.
   */
  const hasExplicitCallback =3D (hook) =3D&gt; {
      return hook
          ? isArray(hook)
              ? hook.some(h =3D&gt; h.length &gt; 1)
              : hook.length &gt; 1
          : false;
  };
  function resolveTransitionProps(rawProps) {
      const baseProps =3D {};
      for (const key in rawProps) {
          if (!(key in DOMTransitionPropsValidators)) {
              baseProps[key] =3D rawProps[key];
          }
      }
      if (rawProps.css =3D=3D=3D false) {
          return baseProps;
      }
      const { name =3D 'v', type, duration, enterFromClass =3D `${name}-ent=
er-from`, enterActiveClass =3D `${name}-enter-active`, enterToClass =3D `${=
name}-enter-to`, appearFromClass =3D enterFromClass, appearActiveClass =3D =
enterActiveClass, appearToClass =3D enterToClass, leaveFromClass =3D `${nam=
e}-leave-from`, leaveActiveClass =3D `${name}-leave-active`, leaveToClass =
=3D `${name}-leave-to` } =3D rawProps;
      const durations =3D normalizeDuration(duration);
      const enterDuration =3D durations &amp;&amp; durations[0];
      const leaveDuration =3D durations &amp;&amp; durations[1];
      const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCan=
celled, onBeforeAppear =3D onBeforeEnter, onAppear =3D onEnter, onAppearCan=
celled =3D onEnterCancelled } =3D baseProps;
      const finishEnter =3D (el, isAppear, done) =3D&gt; {
          removeTransitionClass(el, isAppear ? appearToClass : enterToClass=
);
          removeTransitionClass(el, isAppear ? appearActiveClass : enterAct=
iveClass);
          done &amp;&amp; done();
      };
      const finishLeave =3D (el, done) =3D&gt; {
          el._isLeaving =3D false;
          removeTransitionClass(el, leaveFromClass);
          removeTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveActiveClass);
          done &amp;&amp; done();
      };
      const makeEnterHook =3D (isAppear) =3D&gt; {
          return (el, done) =3D&gt; {
              const hook =3D isAppear ? onAppear : onEnter;
              const resolve =3D () =3D&gt; finishEnter(el, isAppear, done);
              callHook(hook, [el, resolve]);
              nextFrame(() =3D&gt; {
                  removeTransitionClass(el, isAppear ? appearFromClass : en=
terFromClass);
                  addTransitionClass(el, isAppear ? appearToClass : enterTo=
Class);
                  if (!hasExplicitCallback(hook)) {
                      whenTransitionEnds(el, type, enterDuration, resolve);
                  }
              });
          };
      };
      return extend(baseProps, {
          onBeforeEnter(el) {
              callHook(onBeforeEnter, [el]);
              addTransitionClass(el, enterFromClass);
              addTransitionClass(el, enterActiveClass);
          },
          onBeforeAppear(el) {
              callHook(onBeforeAppear, [el]);
              addTransitionClass(el, appearFromClass);
              addTransitionClass(el, appearActiveClass);
          },
          onEnter: makeEnterHook(false),
          onAppear: makeEnterHook(true),
          onLeave(el, done) {
              el._isLeaving =3D true;
              const resolve =3D () =3D&gt; finishLeave(el, done);
              addTransitionClass(el, leaveFromClass);
              // force reflow so *-leave-from classes immediately take effe=
ct (#2593)
              forceReflow();
              addTransitionClass(el, leaveActiveClass);
              nextFrame(() =3D&gt; {
                  if (!el._isLeaving) {
                      // cancelled
                      return;
                  }
                  removeTransitionClass(el, leaveFromClass);
                  addTransitionClass(el, leaveToClass);
                  if (!hasExplicitCallback(onLeave)) {
                      whenTransitionEnds(el, type, leaveDuration, resolve);
                  }
              });
              callHook(onLeave, [el, resolve]);
          },
          onEnterCancelled(el) {
              finishEnter(el, false);
              callHook(onEnterCancelled, [el]);
          },
          onAppearCancelled(el) {
              finishEnter(el, true);
              callHook(onAppearCancelled, [el]);
          },
          onLeaveCancelled(el) {
              finishLeave(el);
              callHook(onLeaveCancelled, [el]);
          }
      });
  }
  function normalizeDuration(duration) {
      if (duration =3D=3D null) {
          return null;
      }
      else if (isObject(duration)) {
          return [NumberOf(duration.enter), NumberOf(duration.leave)];
      }
      else {
          const n =3D NumberOf(duration);
          return [n, n];
      }
  }
  function NumberOf(val) {
      const res =3D toNumber(val);
      {
          assertNumber(res, '&lt;transition&gt; explicit duration');
      }
      return res;
  }
  function addTransitionClass(el, cls) {
      cls.split(/\s+/).forEach(c =3D&gt; c &amp;&amp; el.classList.add(c));
      (el._vtc ||
          (el._vtc =3D new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
      cls.split(/\s+/).forEach(c =3D&gt; c &amp;&amp; el.classList.remove(c=
));
      const { _vtc } =3D el;
      if (_vtc) {
          _vtc.delete(cls);
          if (!_vtc.size) {
              el._vtc =3D undefined;
          }
      }
  }
  function nextFrame(cb) {
      requestAnimationFrame(() =3D&gt; {
          requestAnimationFrame(cb);
      });
  }
  let endId =3D 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
      const id =3D (el._endId =3D ++endId);
      const resolveIfNotStale =3D () =3D&gt; {
          if (id =3D=3D=3D el._endId) {
              resolve();
          }
      };
      if (explicitTimeout) {
          return setTimeout(resolveIfNotStale, explicitTimeout);
      }
      const { type, timeout, propCount } =3D getTransitionInfo(el, expected=
Type);
      if (!type) {
          return resolve();
      }
      const endEvent =3D type + 'end';
      let ended =3D 0;
      const end =3D () =3D&gt; {
          el.removeEventListener(endEvent, onEnd);
          resolveIfNotStale();
      };
      const onEnd =3D (e) =3D&gt; {
          if (e.target =3D=3D=3D el &amp;&amp; ++ended &gt;=3D propCount) {
              end();
          }
      };
      setTimeout(() =3D&gt; {
          if (ended &lt; propCount) {
              end();
          }
      }, timeout + 1);
      el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
      const styles =3D window.getComputedStyle(el);
      // JSDOM may return undefined for transition properties
      const getStyleProperties =3D (key) =3D&gt; (styles[key] || '').split(=
', ');
      const transitionDelays =3D getStyleProperties(`${TRANSITION$1}Delay`)=
;
      const transitionDurations =3D getStyleProperties(`${TRANSITION$1}Dura=
tion`);
      const transitionTimeout =3D getTimeout(transitionDelays, transitionDu=
rations);
      const animationDelays =3D getStyleProperties(`${ANIMATION}Delay`);
      const animationDurations =3D getStyleProperties(`${ANIMATION}Duration=
`);
      const animationTimeout =3D getTimeout(animationDelays, animationDurat=
ions);
      let type =3D null;
      let timeout =3D 0;
      let propCount =3D 0;
      /* istanbul ignore if */
      if (expectedType =3D=3D=3D TRANSITION$1) {
          if (transitionTimeout &gt; 0) {
              type =3D TRANSITION$1;
              timeout =3D transitionTimeout;
              propCount =3D transitionDurations.length;
          }
      }
      else if (expectedType =3D=3D=3D ANIMATION) {
          if (animationTimeout &gt; 0) {
              type =3D ANIMATION;
              timeout =3D animationTimeout;
              propCount =3D animationDurations.length;
          }
      }
      else {
          timeout =3D Math.max(transitionTimeout, animationTimeout);
          type =3D
              timeout &gt; 0
                  ? transitionTimeout &gt; animationTimeout
                      ? TRANSITION$1
                      : ANIMATION
                  : null;
          propCount =3D type
              ? type =3D=3D=3D TRANSITION$1
                  ? transitionDurations.length
                  : animationDurations.length
              : 0;
      }
      const hasTransform =3D type =3D=3D=3D TRANSITION$1 &amp;&amp;
          /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION$1}=
Property`).toString());
      return {
          type,
          timeout,
          propCount,
          hasTransform
      };
  }
  function getTimeout(delays, durations) {
      while (delays.length &lt; durations.length) {
          delays =3D delays.concat(delays);
      }
      return Math.max(...durations.map((d, i) =3D&gt; toMs(d) + toMs(delays=
[i])));
  }
  // Old versions of Chromium (below 61.0.3163.100) formats floating pointe=
r
  // numbers in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down
  // (i.e. acting as a floor function) causing unexpected behaviors
  function toMs(s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000;
  }
  // synchronously force layout to put elements into a certain state
  function forceReflow() {
      return document.body.offsetHeight;
  }

  const positionMap =3D new WeakMap();
  const newPositionMap =3D new WeakMap();
  const TransitionGroupImpl =3D {
      name: 'TransitionGroup',
      props: /*#__PURE__*/ extend({}, TransitionPropsValidators, {
          tag: String,
          moveClass: String
      }),
      setup(props, { slots }) {
          const instance =3D getCurrentInstance();
          const state =3D useTransitionState();
          let prevChildren;
          let children;
          onUpdated(() =3D&gt; {
              // children is guaranteed to exist after initial render
              if (!prevChildren.length) {
                  return;
              }
              const moveClass =3D props.moveClass || `${props.name || 'v'}-=
move`;
              if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, m=
oveClass)) {
                  return;
              }
              // we divide the work into three loops to avoid mixing DOM re=
ads and writes
              // in each iteration - which helps prevent layout thrashing.
              prevChildren.forEach(callPendingCbs);
              prevChildren.forEach(recordPosition);
              const movedChildren =3D prevChildren.filter(applyTranslation)=
;
              // force reflow to put everything in position
              forceReflow();
              movedChildren.forEach(c =3D&gt; {
                  const el =3D c.el;
                  const style =3D el.style;
                  addTransitionClass(el, moveClass);
                  style.transform =3D style.webkitTransform =3D style.trans=
itionDuration =3D '';
                  const cb =3D (el._moveCb =3D (e) =3D&gt; {
                      if (e &amp;&amp; e.target !=3D=3D el) {
                          return;
                      }
                      if (!e || /transform$/.test(e.propertyName)) {
                          el.removeEventListener('transitionend', cb);
                          el._moveCb =3D null;
                          removeTransitionClass(el, moveClass);
                      }
                  });
                  el.addEventListener('transitionend', cb);
              });
          });
          return () =3D&gt; {
              const rawProps =3D toRaw(props);
              const cssTransitionProps =3D resolveTransitionProps(rawProps)=
;
              let tag =3D rawProps.tag || Fragment;
              prevChildren =3D children;
              children =3D slots.default ? getTransitionRawChildren(slots.d=
efault()) : [];
              for (let i =3D 0; i &lt; children.length; i++) {
                  const child =3D children[i];
                  if (child.key !=3D null) {
                      setTransitionHooks(child, resolveTransitionHooks(chil=
d, cssTransitionProps, state, instance));
                  }
                  else {
                      warn(`&lt;TransitionGroup&gt; children must be keyed.=
`);
                  }
              }
              if (prevChildren) {
                  for (let i =3D 0; i &lt; prevChildren.length; i++) {
                      const child =3D prevChildren[i];
                      setTransitionHooks(child, resolveTransitionHooks(chil=
d, cssTransitionProps, state, instance));
                      positionMap.set(child, child.el.getBoundingClientRect=
());
                  }
              }
              return createVNode(tag, null, children);
          };
      }
  };
  /**
   * TransitionGroup does not support "mode" so we need to remove it from t=
he
   * props declarations, but direct delete operation is considered a side e=
ffect
   * and will make the entire transition feature non-tree-shakeable, so we =
do it
   * in a function and mark the function's invocation as pure.
   */
  const removeMode =3D (props) =3D&gt; delete props.mode;
  /*#__PURE__*/ removeMode(TransitionGroupImpl.props);
  const TransitionGroup =3D TransitionGroupImpl;
  function callPendingCbs(c) {
      const el =3D c.el;
      if (el._moveCb) {
          el._moveCb();
      }
      if (el._enterCb) {
          el._enterCb();
      }
  }
  function recordPosition(c) {
      newPositionMap.set(c, c.el.getBoundingClientRect());
  }
  function applyTranslation(c) {
      const oldPos =3D positionMap.get(c);
      const newPos =3D newPositionMap.get(c);
      const dx =3D oldPos.left - newPos.left;
      const dy =3D oldPos.top - newPos.top;
      if (dx || dy) {
          const s =3D c.el.style;
          s.transform =3D s.webkitTransform =3D `translate(${dx}px,${dy}px)=
`;
          s.transitionDuration =3D '0s';
          return c;
      }
  }
  function hasCSSTransform(el, root, moveClass) {
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      const clone =3D el.cloneNode();
      if (el._vtc) {
          el._vtc.forEach(cls =3D&gt; {
              cls.split(/\s+/).forEach(c =3D&gt; c &amp;&amp; clone.classLi=
st.remove(c));
          });
      }
      moveClass.split(/\s+/).forEach(c =3D&gt; c &amp;&amp; clone.classList=
.add(c));
      clone.style.display =3D 'none';
      const container =3D (root.nodeType =3D=3D=3D 1 ? root : root.parentNo=
de);
      container.appendChild(clone);
      const { hasTransform } =3D getTransitionInfo(clone);
      container.removeChild(clone);
      return hasTransform;
  }

  const getModelAssigner =3D (vnode) =3D&gt; {
      const fn =3D vnode.props['onUpdate:modelValue'] ||
          (false );
      return isArray(fn) ? value =3D&gt; invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
      e.target.composing =3D true;
  }
  function onCompositionEnd(e) {
      const target =3D e.target;
      if (target.composing) {
          target.composing =3D false;
          target.dispatchEvent(new Event('input'));
      }
  }
  // We are exporting the v-model runtime directly as vnode hooks so that i=
t can
  // be tree-shaken in case v-model is never used.
  const vModelText =3D {
      created(el, { modifiers: { lazy, trim, number } }, vnode) {
          el._assign =3D getModelAssigner(vnode);
          const castToNumber =3D number || (vnode.props &amp;&amp; vnode.pr=
ops.type =3D=3D=3D 'number');
          addEventListener(el, lazy ? 'change' : 'input', e =3D&gt; {
              if (e.target.composing)
                  return;
              let domValue =3D el.value;
              if (trim) {
                  domValue =3D domValue.trim();
              }
              if (castToNumber) {
                  domValue =3D looseToNumber(domValue);
              }
              el._assign(domValue);
          });
          if (trim) {
              addEventListener(el, 'change', () =3D&gt; {
                  el.value =3D el.value.trim();
              });
          }
          if (!lazy) {
              addEventListener(el, 'compositionstart', onCompositionStart);
              addEventListener(el, 'compositionend', onCompositionEnd);
              // Safari &lt; 10.2 &amp; UIWebView doesn't fire compositione=
nd when
              // switching focus before confirming composition choice
              // this also fixes the issue where some browsers e.g. iOS Chr=
ome
              // fires "change" instead of "input" on autocomplete.
              addEventListener(el, 'change', onCompositionEnd);
          }
      },
      // set value on mounted so it's after min/max for type=3D"range"
      mounted(el, { value }) {
          el.value =3D value =3D=3D null ? '' : value;
      },
      beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode)=
 {
          el._assign =3D getModelAssigner(vnode);
          // avoid clearing unresolved text. #2302
          if (el.composing)
              return;
          if (document.activeElement =3D=3D=3D el &amp;&amp; el.type !=3D=
=3D 'range') {
              if (lazy) {
                  return;
              }
              if (trim &amp;&amp; el.value.trim() =3D=3D=3D value) {
                  return;
              }
              if ((number || el.type =3D=3D=3D 'number') &amp;&amp;
                  looseToNumber(el.value) =3D=3D=3D value) {
                  return;
              }
          }
          const newValue =3D value =3D=3D null ? '' : value;
          if (el.value !=3D=3D newValue) {
              el.value =3D newValue;
          }
      }
  };
  const vModelCheckbox =3D {
      // #4096 array checkboxes need to be deep traversed
      deep: true,
      created(el, _, vnode) {
          el._assign =3D getModelAssigner(vnode);
          addEventListener(el, 'change', () =3D&gt; {
              const modelValue =3D el._modelValue;
              const elementValue =3D getValue(el);
              const checked =3D el.checked;
              const assign =3D el._assign;
              if (isArray(modelValue)) {
                  const index =3D looseIndexOf(modelValue, elementValue);
                  const found =3D index !=3D=3D -1;
                  if (checked &amp;&amp; !found) {
                      assign(modelValue.concat(elementValue));
                  }
                  else if (!checked &amp;&amp; found) {
                      const filtered =3D [...modelValue];
                      filtered.splice(index, 1);
                      assign(filtered);
                  }
              }
              else if (isSet(modelValue)) {
                  const cloned =3D new Set(modelValue);
                  if (checked) {
                      cloned.add(elementValue);
                  }
                  else {
                      cloned.delete(elementValue);
                  }
                  assign(cloned);
              }
              else {
                  assign(getCheckboxValue(el, checked));
              }
          });
      },
      // set initial checked on mount to wait for true-value/false-value
      mounted: setChecked,
      beforeUpdate(el, binding, vnode) {
          el._assign =3D getModelAssigner(vnode);
          setChecked(el, binding, vnode);
      }
  };
  function setChecked(el, { value, oldValue }, vnode) {
      el._modelValue =3D value;
      if (isArray(value)) {
          el.checked =3D looseIndexOf(value, vnode.props.value) &gt; -1;
      }
      else if (isSet(value)) {
          el.checked =3D value.has(vnode.props.value);
      }
      else if (value !=3D=3D oldValue) {
          el.checked =3D looseEqual(value, getCheckboxValue(el, true));
      }
  }
  const vModelRadio =3D {
      created(el, { value }, vnode) {
          el.checked =3D looseEqual(value, vnode.props.value);
          el._assign =3D getModelAssigner(vnode);
          addEventListener(el, 'change', () =3D&gt; {
              el._assign(getValue(el));
          });
      },
      beforeUpdate(el, { value, oldValue }, vnode) {
          el._assign =3D getModelAssigner(vnode);
          if (value !=3D=3D oldValue) {
              el.checked =3D looseEqual(value, vnode.props.value);
          }
      }
  };
  const vModelSelect =3D {
      // &lt;select multiple&gt; value need to be deep traversed
      deep: true,
      created(el, { value, modifiers: { number } }, vnode) {
          const isSetModel =3D isSet(value);
          addEventListener(el, 'change', () =3D&gt; {
              const selectedVal =3D Array.prototype.filter
                  .call(el.options, (o) =3D&gt; o.selected)
                  .map((o) =3D&gt; number ? looseToNumber(getValue(o)) : ge=
tValue(o));
              el._assign(el.multiple
                  ? isSetModel
                      ? new Set(selectedVal)
                      : selectedVal
                  : selectedVal[0]);
          });
          el._assign =3D getModelAssigner(vnode);
      },
      // set value in mounted &amp; updated because &lt;select&gt; relies o=
n its children
      // &lt;option&gt;s.
      mounted(el, { value }) {
          setSelected(el, value);
      },
      beforeUpdate(el, _binding, vnode) {
          el._assign =3D getModelAssigner(vnode);
      },
      updated(el, { value }) {
          setSelected(el, value);
      }
  };
  function setSelected(el, value) {
      const isMultiple =3D el.multiple;
      if (isMultiple &amp;&amp; !isArray(value) &amp;&amp; !isSet(value)) {
          warn(`&lt;select multiple v-model&gt; expects an Array or Set val=
ue for its binding, ` +
                  `but got ${Object.prototype.toString.call(value).slice(8,=
 -1)}.`);
          return;
      }
      for (let i =3D 0, l =3D el.options.length; i &lt; l; i++) {
          const option =3D el.options[i];
          const optionValue =3D getValue(option);
          if (isMultiple) {
              if (isArray(value)) {
                  option.selected =3D looseIndexOf(value, optionValue) &gt;=
 -1;
              }
              else {
                  option.selected =3D value.has(optionValue);
              }
          }
          else {
              if (looseEqual(getValue(option), value)) {
                  if (el.selectedIndex !=3D=3D i)
                      el.selectedIndex =3D i;
                  return;
              }
          }
      }
      if (!isMultiple &amp;&amp; el.selectedIndex !=3D=3D -1) {
          el.selectedIndex =3D -1;
      }
  }
  // retrieve raw value set via :value bindings
  function getValue(el) {
      return '_value' in el ? el._value : el.value;
  }
  // retrieve raw value for true-value and false-value set via :true-value =
or :false-value bindings
  function getCheckboxValue(el, checked) {
      const key =3D checked ? '_trueValue' : '_falseValue';
      return key in el ? el[key] : checked;
  }
  const vModelDynamic =3D {
      created(el, binding, vnode) {
          callModelHook(el, binding, vnode, null, 'created');
      },
      mounted(el, binding, vnode) {
          callModelHook(el, binding, vnode, null, 'mounted');
      },
      beforeUpdate(el, binding, vnode, prevVNode) {
          callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
      },
      updated(el, binding, vnode, prevVNode) {
          callModelHook(el, binding, vnode, prevVNode, 'updated');
      }
  };
  function resolveDynamicModel(tagName, type) {
      switch (tagName) {
          case 'SELECT':
              return vModelSelect;
          case 'TEXTAREA':
              return vModelText;
          default:
              switch (type) {
                  case 'checkbox':
                      return vModelCheckbox;
                  case 'radio':
                      return vModelRadio;
                  default:
                      return vModelText;
              }
      }
  }
  function callModelHook(el, binding, vnode, prevVNode, hook) {
      const modelToUse =3D resolveDynamicModel(el.tagName, vnode.props &amp=
;&amp; vnode.props.type);
      const fn =3D modelToUse[hook];
      fn &amp;&amp; fn(el, binding, vnode, prevVNode);
  }

  const systemModifiers =3D ['ctrl', 'shift', 'alt', 'meta'];
  const modifierGuards =3D {
      stop: e =3D&gt; e.stopPropagation(),
      prevent: e =3D&gt; e.preventDefault(),
      self: e =3D&gt; e.target !=3D=3D e.currentTarget,
      ctrl: e =3D&gt; !e.ctrlKey,
      shift: e =3D&gt; !e.shiftKey,
      alt: e =3D&gt; !e.altKey,
      meta: e =3D&gt; !e.metaKey,
      left: e =3D&gt; 'button' in e &amp;&amp; e.button !=3D=3D 0,
      middle: e =3D&gt; 'button' in e &amp;&amp; e.button !=3D=3D 1,
      right: e =3D&gt; 'button' in e &amp;&amp; e.button !=3D=3D 2,
      exact: (e, modifiers) =3D&gt; systemModifiers.some(m =3D&gt; e[`${m}K=
ey`] &amp;&amp; !modifiers.includes(m))
  };
  /**
   * @private
   */
  const withModifiers =3D (fn, modifiers) =3D&gt; {
      return (event, ...args) =3D&gt; {
          for (let i =3D 0; i &lt; modifiers.length; i++) {
              const guard =3D modifierGuards[modifiers[i]];
              if (guard &amp;&amp; guard(event, modifiers))
                  return;
          }
          return fn(event, ...args);
      };
  };
  // Kept for 2.x compat.
  // Note: IE11 compat for `spacebar` and `del` is removed for now.
  const keyNames =3D {
      esc: 'escape',
      space: ' ',
      up: 'arrow-up',
      left: 'arrow-left',
      right: 'arrow-right',
      down: 'arrow-down',
      delete: 'backspace'
  };
  /**
   * @private
   */
  const withKeys =3D (fn, modifiers) =3D&gt; {
      return (event) =3D&gt; {
          if (!('key' in event)) {
              return;
          }
          const eventKey =3D hyphenate(event.key);
          if (modifiers.some(k =3D&gt; k =3D=3D=3D eventKey || keyNames[k] =
=3D=3D=3D eventKey)) {
              return fn(event);
          }
      };
  };

  const vShow =3D {
      beforeMount(el, { value }, { transition }) {
          el._vod =3D el.style.display =3D=3D=3D 'none' ? '' : el.style.dis=
play;
          if (transition &amp;&amp; value) {
              transition.beforeEnter(el);
          }
          else {
              setDisplay(el, value);
          }
      },
      mounted(el, { value }, { transition }) {
          if (transition &amp;&amp; value) {
              transition.enter(el);
          }
      },
      updated(el, { value, oldValue }, { transition }) {
          if (!value =3D=3D=3D !oldValue)
              return;
          if (transition) {
              if (value) {
                  transition.beforeEnter(el);
                  setDisplay(el, true);
                  transition.enter(el);
              }
              else {
                  transition.leave(el, () =3D&gt; {
                      setDisplay(el, false);
                  });
              }
          }
          else {
              setDisplay(el, value);
          }
      },
      beforeUnmount(el, { value }) {
          setDisplay(el, value);
      }
  };
  function setDisplay(el, value) {
      el.style.display =3D value ? el._vod : 'none';
  }

  const rendererOptions =3D /*#__PURE__*/ extend({ patchProp }, nodeOps);
  // lazy create the renderer - this makes core renderer logic tree-shakabl=
e
  // in case the user only imports reactivity utilities from Vue.
  let renderer;
  let enabledHydration =3D false;
  function ensureRenderer() {
      return (renderer ||
          (renderer =3D createRenderer(rendererOptions)));
  }
  function ensureHydrationRenderer() {
      renderer =3D enabledHydration
          ? renderer
          : createHydrationRenderer(rendererOptions);
      enabledHydration =3D true;
      return renderer;
  }
  // use explicit type casts here to avoid import() calls in rolled-up d.ts
  const render =3D ((...args) =3D&gt; {
      ensureRenderer().render(...args);
  });
  const hydrate =3D ((...args) =3D&gt; {
      ensureHydrationRenderer().hydrate(...args);
  });
  const createApp =3D ((...args) =3D&gt; {
      const app =3D ensureRenderer().createApp(...args);
      {
          injectNativeTagCheck(app);
          injectCompilerOptionsCheck(app);
      }
      const { mount } =3D app;
      app.mount =3D (containerOrSelector) =3D&gt; {
          const container =3D normalizeContainer(containerOrSelector);
          if (!container)
              return;
          const component =3D app._component;
          if (!isFunction(component) &amp;&amp; !component.render &amp;&amp=
; !component.template) {
              // __UNSAFE__
              // Reason: potential execution of JS expressions in in-DOM te=
mplate.
              // The user must make sure the in-DOM template is trusted. If=
 it's
              // rendered by the server, the template should not contain an=
y user data.
              component.template =3D container.innerHTML;
          }
          // clear content before mounting
          container.innerHTML =3D '';
          const proxy =3D mount(container, false, container instanceof SVGE=
lement);
          if (container instanceof Element) {
              container.removeAttribute('v-cloak');
              container.setAttribute('data-v-app', '');
          }
          return proxy;
      };
      return app;
  });
  const createSSRApp =3D ((...args) =3D&gt; {
      const app =3D ensureHydrationRenderer().createApp(...args);
      {
          injectNativeTagCheck(app);
          injectCompilerOptionsCheck(app);
      }
      const { mount } =3D app;
      app.mount =3D (containerOrSelector) =3D&gt; {
          const container =3D normalizeContainer(containerOrSelector);
          if (container) {
              return mount(container, true, container instanceof SVGElement=
);
          }
      };
      return app;
  });
  function injectNativeTagCheck(app) {
      // Inject `isNativeTag`
      // this is used for component name validation (dev only)
      Object.defineProperty(app.config, 'isNativeTag', {
          value: (tag) =3D&gt; isHTMLTag(tag) || isSVGTag(tag),
          writable: false
      });
  }
  // dev only
  function injectCompilerOptionsCheck(app) {
      if (isRuntimeOnly()) {
          const isCustomElement =3D app.config.isCustomElement;
          Object.defineProperty(app.config, 'isCustomElement', {
              get() {
                  return isCustomElement;
              },
              set() {
                  warn(`The \`isCustomElement\` config option is deprecated=
. Use ` +
                      `\`compilerOptions.isCustomElement\` instead.`);
              }
          });
          const compilerOptions =3D app.config.compilerOptions;
          const msg =3D `The \`compilerOptions\` config option is only resp=
ected when using ` +
              `a build of Vue.js that includes the runtime compiler (aka "f=
ull build"). ` +
              `Since you are using the runtime-only build, \`compilerOption=
s\` ` +
              `must be passed to \`@vue/compiler-dom\` in the build setup i=
nstead.\n` +
              `- For vue-loader: pass it via vue-loader's \`compilerOptions=
\` loader option.\n` +
              `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#=
modifying-options-of-a-loader\n` +
              `- For vite: pass it via @vitejs/plugin-vue options. See http=
s://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passin=
g-options-to-vuecompiler-dom`;
          Object.defineProperty(app.config, 'compilerOptions', {
              get() {
                  warn(msg);
                  return compilerOptions;
              },
              set() {
                  warn(msg);
              }
          });
      }
  }
  function normalizeContainer(container) {
      if (isString(container)) {
          const res =3D document.querySelector(container);
          if (!res) {
              warn(`Failed to mount app: mount target selector "${container=
}" returned null.`);
          }
          return res;
      }
      if (window.ShadowRoot &amp;&amp;
          container instanceof window.ShadowRoot &amp;&amp;
          container.mode =3D=3D=3D 'closed') {
          warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead=
 to unpredictable bugs`);
      }
      return container;
  }
  /**
   * @internal
   */
  const initDirectivesForSSR =3D NOOP;

  function initDev() {
      {
          /* istanbul ignore if */
          {
              console.info(`You are running a development build of Vue.\n` =
+
                  `Make sure to use the production build (*.prod.js) when d=
eploying for production.`);
          }
          initCustomFormatter();
      }
  }

  function defaultOnError(error) {
      throw error;
  }
  function defaultOnWarn(msg) {
      console.warn(`[Vue warn] ${msg.message}`);
  }
  function createCompilerError(code, loc, messages, additionalMessage) {
      const msg =3D (messages || errorMessages)[code] + (additionalMessage =
|| ``)
          ;
      const error =3D new SyntaxError(String(msg));
      error.code =3D code;
      error.loc =3D loc;
      return error;
  }
  const errorMessages =3D {
      // parse errors
      [0 /* ErrorCodes.ABRUPT_CLOSING_OF_EMPTY_COMMENT */]: 'Illegal commen=
t.',
      [1 /* ErrorCodes.CDATA_IN_HTML_CONTENT */]: 'CDATA section is allowed=
 only in XML context.',
      [2 /* ErrorCodes.DUPLICATE_ATTRIBUTE */]: 'Duplicate attribute.',
      [3 /* ErrorCodes.END_TAG_WITH_ATTRIBUTES */]: 'End tag cannot have at=
tributes.',
      [4 /* ErrorCodes.END_TAG_WITH_TRAILING_SOLIDUS */]: "Illegal '/' in t=
ags.",
      [5 /* ErrorCodes.EOF_BEFORE_TAG_NAME */]: 'Unexpected EOF in tag.',
      [6 /* ErrorCodes.EOF_IN_CDATA */]: 'Unexpected EOF in CDATA section.'=
,
      [7 /* ErrorCodes.EOF_IN_COMMENT */]: 'Unexpected EOF in comment.',
      [8 /* ErrorCodes.EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */]: 'Unexpecte=
d EOF in script.',
      [9 /* ErrorCodes.EOF_IN_TAG */]: 'Unexpected EOF in tag.',
      [10 /* ErrorCodes.INCORRECTLY_CLOSED_COMMENT */]: 'Incorrectly closed=
 comment.',
      [11 /* ErrorCodes.INCORRECTLY_OPENED_COMMENT */]: 'Incorrectly opened=
 comment.',
      [12 /* ErrorCodes.INVALID_FIRST_CHARACTER_OF_TAG_NAME */]: "Illegal t=
ag name. Use '&amp;lt;' to print '&lt;'.",
      [13 /* ErrorCodes.MISSING_ATTRIBUTE_VALUE */]: 'Attribute value was e=
xpected.',
      [14 /* ErrorCodes.MISSING_END_TAG_NAME */]: 'End tag name was expecte=
d.',
      [15 /* ErrorCodes.MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */]: 'Whitesp=
ace was expected.',
      [16 /* ErrorCodes.NESTED_COMMENT */]: "Unexpected '&lt;!--' in commen=
t.",
      [17 /* ErrorCodes.UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */]: 'Attrib=
ute name cannot contain U+0022 ("), U+0027 (\'), and U+003C (&lt;).',
      [18 /* ErrorCodes.UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */=
]: 'Unquoted attribute value cannot contain U+0022 ("), U+0027 (\'), U+003C=
 (&lt;), U+003D (=3D), and U+0060 (`).',
      [19 /* ErrorCodes.UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */]: "=
Attribute name cannot start with '=3D'.",
      [21 /* ErrorCodes.UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */]: "=
'&lt;?' is allowed only in XML context.",
      [20 /* ErrorCodes.UNEXPECTED_NULL_CHARACTER */]: `Unexpected null cha=
racter.`,
      [22 /* ErrorCodes.UNEXPECTED_SOLIDUS_IN_TAG */]: "Illegal '/' in tags=
.",
      // Vue-specific parse errors
      [23 /* ErrorCodes.X_INVALID_END_TAG */]: 'Invalid end tag.',
      [24 /* ErrorCodes.X_MISSING_END_TAG */]: 'Element is missing end tag.=
',
      [25 /* ErrorCodes.X_MISSING_INTERPOLATION_END */]: 'Interpolation end=
 sign was not found.',
      [27 /* ErrorCodes.X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */]: 'End =
bracket for dynamic directive argument was not found. ' +
          'Note that dynamic directive argument cannot contain spaces.',
      [26 /* ErrorCodes.X_MISSING_DIRECTIVE_NAME */]: 'Legal directive name=
 was expected.',
      // transform errors
      [28 /* ErrorCodes.X_V_IF_NO_EXPRESSION */]: `v-if/v-else-if is missin=
g expression.`,
      [29 /* ErrorCodes.X_V_IF_SAME_KEY */]: `v-if/else branches must use u=
nique keys.`,
      [30 /* ErrorCodes.X_V_ELSE_NO_ADJACENT_IF */]: `v-else/v-else-if has =
no adjacent v-if or v-else-if.`,
      [31 /* ErrorCodes.X_V_FOR_NO_EXPRESSION */]: `v-for is missing expres=
sion.`,
      [32 /* ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION */]: `v-for has invali=
d expression.`,
      [33 /* ErrorCodes.X_V_FOR_TEMPLATE_KEY_PLACEMENT */]: `&lt;template v=
-for&gt; key should be placed on the &lt;template&gt; tag.`,
      [34 /* ErrorCodes.X_V_BIND_NO_EXPRESSION */]: `v-bind is missing expr=
ession.`,
      [35 /* ErrorCodes.X_V_ON_NO_EXPRESSION */]: `v-on is missing expressi=
on.`,
      [36 /* ErrorCodes.X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */]: `=
Unexpected custom directive on &lt;slot&gt; outlet.`,
      [37 /* ErrorCodes.X_V_SLOT_MIXED_SLOT_USAGE */]: `Mixed v-slot usage =
on both the component and nested &lt;template&gt;. ` +
          `When there are multiple named slots, all slots should use &lt;te=
mplate&gt; ` +
          `syntax to avoid scope ambiguity.`,
      [38 /* ErrorCodes.X_V_SLOT_DUPLICATE_SLOT_NAMES */]: `Duplicate slot =
names found. `,
      [39 /* ErrorCodes.X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */]: `Ext=
raneous children found when component already has explicitly named ` +
          `default slot. These children will be ignored.`,
      [40 /* ErrorCodes.X_V_SLOT_MISPLACED */]: `v-slot can only be used on=
 components or &lt;template&gt; tags.`,
      [41 /* ErrorCodes.X_V_MODEL_NO_EXPRESSION */]: `v-model is missing ex=
pression.`,
      [42 /* ErrorCodes.X_V_MODEL_MALFORMED_EXPRESSION */]: `v-model value =
must be a valid JavaScript member expression.`,
      [43 /* ErrorCodes.X_V_MODEL_ON_SCOPE_VARIABLE */]: `v-model cannot be=
 used on v-for or v-slot scope variables because they are not writable.`,
      [44 /* ErrorCodes.X_V_MODEL_ON_PROPS */]: `v-model cannot be used on =
a prop, because local prop bindings are not writable.\nUse a v-bind binding=
 combined with a v-on listener that emits update:x event instead.`,
      [45 /* ErrorCodes.X_INVALID_EXPRESSION */]: `Error parsing JavaScript=
 expression: `,
      [46 /* ErrorCodes.X_KEEP_ALIVE_INVALID_CHILDREN */]: `&lt;KeepAlive&g=
t; expects exactly one child component.`,
      // generic errors
      [47 /* ErrorCodes.X_PREFIX_ID_NOT_SUPPORTED */]: `"prefixIdentifiers"=
 option is not supported in this build of compiler.`,
      [48 /* ErrorCodes.X_MODULE_MODE_NOT_SUPPORTED */]: `ES module mode is=
 not supported in this build of compiler.`,
      [49 /* ErrorCodes.X_CACHE_HANDLER_NOT_SUPPORTED */]: `"cacheHandlers"=
 option is only supported when the "prefixIdentifiers" option is enabled.`,
      [50 /* ErrorCodes.X_SCOPE_ID_NOT_SUPPORTED */]: `"scopeId" option is =
only supported in module mode.`,
      // just to fulfill types
      [51 /* ErrorCodes.__EXTEND_POINT__ */]: ``
  };

  const FRAGMENT =3D Symbol(`Fragment` );
  const TELEPORT =3D Symbol(`Teleport` );
  const SUSPENSE =3D Symbol(`Suspense` );
  const KEEP_ALIVE =3D Symbol(`KeepAlive` );
  const BASE_TRANSITION =3D Symbol(`BaseTransition` );
  const OPEN_BLOCK =3D Symbol(`openBlock` );
  const CREATE_BLOCK =3D Symbol(`createBlock` );
  const CREATE_ELEMENT_BLOCK =3D Symbol(`createElementBlock` );
  const CREATE_VNODE =3D Symbol(`createVNode` );
  const CREATE_ELEMENT_VNODE =3D Symbol(`createElementVNode` );
  const CREATE_COMMENT =3D Symbol(`createCommentVNode` );
  const CREATE_TEXT =3D Symbol(`createTextVNode` );
  const CREATE_STATIC =3D Symbol(`createStaticVNode` );
  const RESOLVE_COMPONENT =3D Symbol(`resolveComponent` );
  const RESOLVE_DYNAMIC_COMPONENT =3D Symbol(`resolveDynamicComponent` );
  const RESOLVE_DIRECTIVE =3D Symbol(`resolveDirective` );
  const RESOLVE_FILTER =3D Symbol(`resolveFilter` );
  const WITH_DIRECTIVES =3D Symbol(`withDirectives` );
  const RENDER_LIST =3D Symbol(`renderList` );
  const RENDER_SLOT =3D Symbol(`renderSlot` );
  const CREATE_SLOTS =3D Symbol(`createSlots` );
  const TO_DISPLAY_STRING =3D Symbol(`toDisplayString` );
  const MERGE_PROPS =3D Symbol(`mergeProps` );
  const NORMALIZE_CLASS =3D Symbol(`normalizeClass` );
  const NORMALIZE_STYLE =3D Symbol(`normalizeStyle` );
  const NORMALIZE_PROPS =3D Symbol(`normalizeProps` );
  const GUARD_REACTIVE_PROPS =3D Symbol(`guardReactiveProps` );
  const TO_HANDLERS =3D Symbol(`toHandlers` );
  const CAMELIZE =3D Symbol(`camelize` );
  const CAPITALIZE =3D Symbol(`capitalize` );
  const TO_HANDLER_KEY =3D Symbol(`toHandlerKey` );
  const SET_BLOCK_TRACKING =3D Symbol(`setBlockTracking` );
  const PUSH_SCOPE_ID =3D Symbol(`pushScopeId` );
  const POP_SCOPE_ID =3D Symbol(`popScopeId` );
  const WITH_CTX =3D Symbol(`withCtx` );
  const UNREF =3D Symbol(`unref` );
  const IS_REF =3D Symbol(`isRef` );
  const WITH_MEMO =3D Symbol(`withMemo` );
  const IS_MEMO_SAME =3D Symbol(`isMemoSame` );
  // Name mapping for runtime helpers that need to be imported from 'vue' i=
n
  // generated code. Make sure these are correctly exported in the runtime!
  const helperNameMap =3D {
      [FRAGMENT]: `Fragment`,
      [TELEPORT]: `Teleport`,
      [SUSPENSE]: `Suspense`,
      [KEEP_ALIVE]: `KeepAlive`,
      [BASE_TRANSITION]: `BaseTransition`,
      [OPEN_BLOCK]: `openBlock`,
      [CREATE_BLOCK]: `createBlock`,
      [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
      [CREATE_VNODE]: `createVNode`,
      [CREATE_ELEMENT_VNODE]: `createElementVNode`,
      [CREATE_COMMENT]: `createCommentVNode`,
      [CREATE_TEXT]: `createTextVNode`,
      [CREATE_STATIC]: `createStaticVNode`,
      [RESOLVE_COMPONENT]: `resolveComponent`,
      [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
      [RESOLVE_DIRECTIVE]: `resolveDirective`,
      [RESOLVE_FILTER]: `resolveFilter`,
      [WITH_DIRECTIVES]: `withDirectives`,
      [RENDER_LIST]: `renderList`,
      [RENDER_SLOT]: `renderSlot`,
      [CREATE_SLOTS]: `createSlots`,
      [TO_DISPLAY_STRING]: `toDisplayString`,
      [MERGE_PROPS]: `mergeProps`,
      [NORMALIZE_CLASS]: `normalizeClass`,
      [NORMALIZE_STYLE]: `normalizeStyle`,
      [NORMALIZE_PROPS]: `normalizeProps`,
      [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
      [TO_HANDLERS]: `toHandlers`,
      [CAMELIZE]: `camelize`,
      [CAPITALIZE]: `capitalize`,
      [TO_HANDLER_KEY]: `toHandlerKey`,
      [SET_BLOCK_TRACKING]: `setBlockTracking`,
      [PUSH_SCOPE_ID]: `pushScopeId`,
      [POP_SCOPE_ID]: `popScopeId`,
      [WITH_CTX]: `withCtx`,
      [UNREF]: `unref`,
      [IS_REF]: `isRef`,
      [WITH_MEMO]: `withMemo`,
      [IS_MEMO_SAME]: `isMemoSame`
  };
  function registerRuntimeHelpers(helpers) {
      Object.getOwnPropertySymbols(helpers).forEach(s =3D&gt; {
          helperNameMap[s] =3D helpers[s];
      });
  }

  // AST Utilities --------------------------------------------------------=
-------
  // Some expressions, e.g. sequence and conditional expressions, are never
  // associated with template nodes, so their source locations are just a s=
tub.
  // Container types like CompoundExpression also don't need a real locatio=
n.
  const locStub =3D {
      source: '',
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 1, offset: 0 }
  };
  function createRoot(children, loc =3D locStub) {
      return {
          type: 0 /* NodeTypes.ROOT */,
          children,
          helpers: new Set(),
          components: [],
          directives: [],
          hoists: [],
          imports: [],
          cached: 0,
          temps: 0,
          codegenNode: undefined,
          loc
      };
  }
  function createVNodeCall(context, tag, props, children, patchFlag, dynami=
cProps, directives, isBlock =3D false, disableTracking =3D false, isCompone=
nt =3D false, loc =3D locStub) {
      if (context) {
          if (isBlock) {
              context.helper(OPEN_BLOCK);
              context.helper(getVNodeBlockHelper(context.inSSR, isComponent=
));
          }
          else {
              context.helper(getVNodeHelper(context.inSSR, isComponent));
          }
          if (directives) {
              context.helper(WITH_DIRECTIVES);
          }
      }
      return {
          type: 13 /* NodeTypes.VNODE_CALL */,
          tag,
          props,
          children,
          patchFlag,
          dynamicProps,
          directives,
          isBlock,
          disableTracking,
          isComponent,
          loc
      };
  }
  function createArrayExpression(elements, loc =3D locStub) {
      return {
          type: 17 /* NodeTypes.JS_ARRAY_EXPRESSION */,
          loc,
          elements
      };
  }
  function createObjectExpression(properties, loc =3D locStub) {
      return {
          type: 15 /* NodeTypes.JS_OBJECT_EXPRESSION */,
          loc,
          properties
      };
  }
  function createObjectProperty(key, value) {
      return {
          type: 16 /* NodeTypes.JS_PROPERTY */,
          loc: locStub,
          key: isString(key) ? createSimpleExpression(key, true) : key,
          value
      };
  }
  function createSimpleExpression(content, isStatic =3D false, loc =3D locS=
tub, constType =3D 0 /* ConstantTypes.NOT_CONSTANT */) {
      return {
          type: 4 /* NodeTypes.SIMPLE_EXPRESSION */,
          loc,
          content,
          isStatic,
          constType: isStatic ? 3 /* ConstantTypes.CAN_STRINGIFY */ : const=
Type
      };
  }
  function createCompoundExpression(children, loc =3D locStub) {
      return {
          type: 8 /* NodeTypes.COMPOUND_EXPRESSION */,
          loc,
          children
      };
  }
  function createCallExpression(callee, args =3D [], loc =3D locStub) {
      return {
          type: 14 /* NodeTypes.JS_CALL_EXPRESSION */,
          loc,
          callee,
          arguments: args
      };
  }
  function createFunctionExpression(params, returns =3D undefined, newline =
=3D false, isSlot =3D false, loc =3D locStub) {
      return {
          type: 18 /* NodeTypes.JS_FUNCTION_EXPRESSION */,
          params,
          returns,
          newline,
          isSlot,
          loc
      };
  }
  function createConditionalExpression(test, consequent, alternate, newline=
 =3D true) {
      return {
          type: 19 /* NodeTypes.JS_CONDITIONAL_EXPRESSION */,
          test,
          consequent,
          alternate,
          newline,
          loc: locStub
      };
  }
  function createCacheExpression(index, value, isVNode =3D false) {
      return {
          type: 20 /* NodeTypes.JS_CACHE_EXPRESSION */,
          index,
          value,
          isVNode,
          loc: locStub
      };
  }
  function createBlockStatement(body) {
      return {
          type: 21 /* NodeTypes.JS_BLOCK_STATEMENT */,
          body,
          loc: locStub
      };
  }

  const isStaticExp =3D (p) =3D&gt; p.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_=
EXPRESSION */ &amp;&amp; p.isStatic;
  const isBuiltInType =3D (tag, expected) =3D&gt; tag =3D=3D=3D expected ||=
 tag =3D=3D=3D hyphenate(expected);
  function isCoreComponent(tag) {
      if (isBuiltInType(tag, 'Teleport')) {
          return TELEPORT;
      }
      else if (isBuiltInType(tag, 'Suspense')) {
          return SUSPENSE;
      }
      else if (isBuiltInType(tag, 'KeepAlive')) {
          return KEEP_ALIVE;
      }
      else if (isBuiltInType(tag, 'BaseTransition')) {
          return BASE_TRANSITION;
      }
  }
  const nonIdentifierRE =3D /^\d|[^\$\w]/;
  const isSimpleIdentifier =3D (name) =3D&gt; !nonIdentifierRE.test(name);
  const validFirstIdentCharRE =3D /[A-Za-z_$\xA0-\uFFFF]/;
  const validIdentCharRE =3D /[\.\?\w$\xA0-\uFFFF]/;
  const whitespaceRE =3D /\s+[.[]\s*|\s*[.[]\s+/g;
  /**
   * Simple lexer to check if an expression is a member expression. This is
   * lax and only checks validity at the root level (i.e. does not validate=
 exps
   * inside square brackets), but it's ok since these are only used on temp=
late
   * expressions and false positives are invalid expressions in the first p=
lace.
   */
  const isMemberExpressionBrowser =3D (path) =3D&gt; {
      // remove whitespaces around . or [ first
      path =3D path.trim().replace(whitespaceRE, s =3D&gt; s.trim());
      let state =3D 0 /* MemberExpLexState.inMemberExp */;
      let stateStack =3D [];
      let currentOpenBracketCount =3D 0;
      let currentOpenParensCount =3D 0;
      let currentStringType =3D null;
      for (let i =3D 0; i &lt; path.length; i++) {
          const char =3D path.charAt(i);
          switch (state) {
              case 0 /* MemberExpLexState.inMemberExp */:
                  if (char =3D=3D=3D '[') {
                      stateStack.push(state);
                      state =3D 1 /* MemberExpLexState.inBrackets */;
                      currentOpenBracketCount++;
                  }
                  else if (char =3D=3D=3D '(') {
                      stateStack.push(state);
                      state =3D 2 /* MemberExpLexState.inParens */;
                      currentOpenParensCount++;
                  }
                  else if (!(i =3D=3D=3D 0 ? validFirstIdentCharRE : validI=
dentCharRE).test(char)) {
                      return false;
                  }
                  break;
              case 1 /* MemberExpLexState.inBrackets */:
                  if (char =3D=3D=3D `'` || char =3D=3D=3D `"` || char =3D=
=3D=3D '`') {
                      stateStack.push(state);
                      state =3D 3 /* MemberExpLexState.inString */;
                      currentStringType =3D char;
                  }
                  else if (char =3D=3D=3D `[`) {
                      currentOpenBracketCount++;
                  }
                  else if (char =3D=3D=3D `]`) {
                      if (!--currentOpenBracketCount) {
                          state =3D stateStack.pop();
                      }
                  }
                  break;
              case 2 /* MemberExpLexState.inParens */:
                  if (char =3D=3D=3D `'` || char =3D=3D=3D `"` || char =3D=
=3D=3D '`') {
                      stateStack.push(state);
                      state =3D 3 /* MemberExpLexState.inString */;
                      currentStringType =3D char;
                  }
                  else if (char =3D=3D=3D `(`) {
                      currentOpenParensCount++;
                  }
                  else if (char =3D=3D=3D `)`) {
                      // if the exp ends as a call then it should not be co=
nsidered valid
                      if (i =3D=3D=3D path.length - 1) {
                          return false;
                      }
                      if (!--currentOpenParensCount) {
                          state =3D stateStack.pop();
                      }
                  }
                  break;
              case 3 /* MemberExpLexState.inString */:
                  if (char =3D=3D=3D currentStringType) {
                      state =3D stateStack.pop();
                      currentStringType =3D null;
                  }
                  break;
          }
      }
      return !currentOpenBracketCount &amp;&amp; !currentOpenParensCount;
  };
  const isMemberExpression =3D isMemberExpressionBrowser
      ;
  function getInnerRange(loc, offset, length) {
      const source =3D loc.source.slice(offset, offset + length);
      const newLoc =3D {
          source,
          start: advancePositionWithClone(loc.start, loc.source, offset),
          end: loc.end
      };
      if (length !=3D null) {
          newLoc.end =3D advancePositionWithClone(loc.start, loc.source, of=
fset + length);
      }
      return newLoc;
  }
  function advancePositionWithClone(pos, source, numberOfCharacters =3D sou=
rce.length) {
      return advancePositionWithMutation(extend({}, pos), source, numberOfC=
haracters);
  }
  // advance by mutation without cloning (for performance reasons), since t=
his
  // gets called a lot in the parser
  function advancePositionWithMutation(pos, source, numberOfCharacters =3D =
source.length) {
      let linesCount =3D 0;
      let lastNewLinePos =3D -1;
      for (let i =3D 0; i &lt; numberOfCharacters; i++) {
          if (source.charCodeAt(i) =3D=3D=3D 10 /* newline char code */) {
              linesCount++;
              lastNewLinePos =3D i;
          }
      }
      pos.offset +=3D numberOfCharacters;
      pos.line +=3D linesCount;
      pos.column =3D
          lastNewLinePos =3D=3D=3D -1
              ? pos.column + numberOfCharacters
              : numberOfCharacters - lastNewLinePos;
      return pos;
  }
  function assert(condition, msg) {
      /* istanbul ignore if */
      if (!condition) {
          throw new Error(msg || `unexpected compiler condition`);
      }
  }
  function findDir(node, name, allowEmpty =3D false) {
      for (let i =3D 0; i &lt; node.props.length; i++) {
          const p =3D node.props[i];
          if (p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ &amp;&amp;
              (allowEmpty || p.exp) &amp;&amp;
              (isString(name) ? p.name =3D=3D=3D name : name.test(p.name)))=
 {
              return p;
          }
      }
  }
  function findProp(node, name, dynamicOnly =3D false, allowEmpty =3D false=
) {
      for (let i =3D 0; i &lt; node.props.length; i++) {
          const p =3D node.props[i];
          if (p.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */) {
              if (dynamicOnly)
                  continue;
              if (p.name =3D=3D=3D name &amp;&amp; (p.value || allowEmpty))=
 {
                  return p;
              }
          }
          else if (p.name =3D=3D=3D 'bind' &amp;&amp;
              (p.exp || allowEmpty) &amp;&amp;
              isStaticArgOf(p.arg, name)) {
              return p;
          }
      }
  }
  function isStaticArgOf(arg, name) {
      return !!(arg &amp;&amp; isStaticExp(arg) &amp;&amp; arg.content =3D=
=3D=3D name);
  }
  function hasDynamicKeyVBind(node) {
      return node.props.some(p =3D&gt; p.type =3D=3D=3D 7 /* NodeTypes.DIRE=
CTIVE */ &amp;&amp;
          p.name =3D=3D=3D 'bind' &amp;&amp;
          (!p.arg || // v-bind=3D"obj"
              p.arg.type !=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */ || // =
v-bind:[_ctx.foo]
              !p.arg.isStatic) // v-bind:[foo]
      );
  }
  function isText$1(node) {
      return node.type =3D=3D=3D 5 /* NodeTypes.INTERPOLATION */ || node.ty=
pe =3D=3D=3D 2 /* NodeTypes.TEXT */;
  }
  function isVSlot(p) {
      return p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ &amp;&amp; p.name=
 =3D=3D=3D 'slot';
  }
  function isTemplateNode(node) {
      return (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp; node=
.tagType =3D=3D=3D 3 /* ElementTypes.TEMPLATE */);
  }
  function isSlotOutlet(node) {
      return node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp; node.=
tagType =3D=3D=3D 2 /* ElementTypes.SLOT */;
  }
  function getVNodeHelper(ssr, isComponent) {
      return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
  }
  function getVNodeBlockHelper(ssr, isComponent) {
      return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
  }
  const propsHelperSet =3D new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS])=
;
  function getUnnormalizedProps(props, callPath =3D []) {
      if (props &amp;&amp;
          !isString(props) &amp;&amp;
          props.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */) {
          const callee =3D props.callee;
          if (!isString(callee) &amp;&amp; propsHelperSet.has(callee)) {
              return getUnnormalizedProps(props.arguments[0], callPath.conc=
at(props));
          }
      }
      return [props, callPath];
  }
  function injectProp(node, prop, context) {
      let propsWithInjection;
      /**
       * 1. mergeProps(...)
       * 2. toHandlers(...)
       * 3. normalizeProps(...)
       * 4. normalizeProps(guardReactiveProps(...))
       *
       * we need to get the real props before normalization
       */
      let props =3D node.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */ ? nod=
e.props : node.arguments[2];
      let callPath =3D [];
      let parentCall;
      if (props &amp;&amp;
          !isString(props) &amp;&amp;
          props.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */) {
          const ret =3D getUnnormalizedProps(props);
          props =3D ret[0];
          callPath =3D ret[1];
          parentCall =3D callPath[callPath.length - 1];
      }
      if (props =3D=3D null || isString(props)) {
          propsWithInjection =3D createObjectExpression([prop]);
      }
      else if (props.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */) =
{
          // merged props... add ours
          // only inject key to object literal if it's the first argument s=
o that
          // if doesn't override user provided keys
          const first =3D props.arguments[0];
          if (!isString(first) &amp;&amp; first.type =3D=3D=3D 15 /* NodeTy=
pes.JS_OBJECT_EXPRESSION */) {
              // #6631
              if (!hasProp(prop, first)) {
                  first.properties.unshift(prop);
              }
          }
          else {
              if (props.callee =3D=3D=3D TO_HANDLERS) {
                  // #2366
                  propsWithInjection =3D createCallExpression(context.helpe=
r(MERGE_PROPS), [
                      createObjectExpression([prop]),
                      props
                  ]);
              }
              else {
                  props.arguments.unshift(createObjectExpression([prop]));
              }
          }
          !propsWithInjection &amp;&amp; (propsWithInjection =3D props);
      }
      else if (props.type =3D=3D=3D 15 /* NodeTypes.JS_OBJECT_EXPRESSION */=
) {
          if (!hasProp(prop, props)) {
              props.properties.unshift(prop);
          }
          propsWithInjection =3D props;
      }
      else {
          // single v-bind with expression, return a merged replacement
          propsWithInjection =3D createCallExpression(context.helper(MERGE_=
PROPS), [
              createObjectExpression([prop]),
              props
          ]);
          // in the case of nested helper call, e.g. `normalizeProps(guardR=
eactiveProps(props))`,
          // it will be rewritten as `normalizeProps(mergeProps({ key: 0 },=
 props))`,
          // the `guardReactiveProps` will no longer be needed
          if (parentCall &amp;&amp; parentCall.callee =3D=3D=3D GUARD_REACT=
IVE_PROPS) {
              parentCall =3D callPath[callPath.length - 2];
          }
      }
      if (node.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */) {
          if (parentCall) {
              parentCall.arguments[0] =3D propsWithInjection;
          }
          else {
              node.props =3D propsWithInjection;
          }
      }
      else {
          if (parentCall) {
              parentCall.arguments[0] =3D propsWithInjection;
          }
          else {
              node.arguments[2] =3D propsWithInjection;
          }
      }
  }
  // check existing key to avoid overriding user provided keys
  function hasProp(prop, props) {
      let result =3D false;
      if (prop.key.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
          const propKeyName =3D prop.key.content;
          result =3D props.properties.some(p =3D&gt; p.key.type =3D=3D=3D 4=
 /* NodeTypes.SIMPLE_EXPRESSION */ &amp;&amp;
              p.key.content =3D=3D=3D propKeyName);
      }
      return result;
  }
  function toValidAssetId(name, type) {
      // see issue#4422, we need adding identifier on validAssetId if varia=
ble `name` has specific character
      return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue)=
 =3D&gt; {
        return searchValue =3D=3D=3D '-' ? '_' : name.charCodeAt(replaceVal=
ue).toString();
    })}`;
  }
  function getMemoedVNodeCall(node) {
      if (node.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */ &amp;&a=
mp; node.callee =3D=3D=3D WITH_MEMO) {
          return node.arguments[1].returns;
      }
      else {
          return node;
      }
  }
  function makeBlock(node, { helper, removeHelper, inSSR }) {
      if (!node.isBlock) {
          node.isBlock =3D true;
          removeHelper(getVNodeHelper(inSSR, node.isComponent));
          helper(OPEN_BLOCK);
          helper(getVNodeBlockHelper(inSSR, node.isComponent));
      }
  }

  const deprecationData =3D {
      ["COMPILER_IS_ON_ELEMENT" /* CompilerDeprecationTypes.COMPILER_IS_ON_=
ELEMENT */]: {
          message: `Platform-native elements with "is" prop will no longer =
be ` +
              `treated as components in Vue 3 unless the "is" value is expl=
icitly ` +
              `prefixed with "vue:".`,
          link: `https://v3-migration.vuejs.org/breaking-changes/custom-ele=
ments-interop.html`
      },
      ["COMPILER_V_BIND_SYNC" /* CompilerDeprecationTypes.COMPILER_V_BIND_S=
YNC */]: {
          message: key =3D&gt; `.sync modifier for v-bind has been removed.=
 Use v-model with ` +
              `argument instead. \`v-bind:${key}.sync\` should be changed t=
o ` +
              `\`v-model:${key}\`.`,
          link: `https://v3-migration.vuejs.org/breaking-changes/v-model.ht=
ml`
      },
      ["COMPILER_V_BIND_PROP" /* CompilerDeprecationTypes.COMPILER_V_BIND_P=
ROP */]: {
          message: `.prop modifier for v-bind has been removed and no longe=
r necessary. ` +
              `Vue 3 will automatically set a binding as DOM property when =
appropriate.`
      },
      ["COMPILER_V_BIND_OBJECT_ORDER" /* CompilerDeprecationTypes.COMPILER_=
V_BIND_OBJECT_ORDER */]: {
          message: `v-bind=3D"obj" usage is now order sensitive and behaves=
 like JavaScript ` +
              `object spread: it will now overwrite an existing non-mergeab=
le attribute ` +
              `that appears before v-bind in the case of conflict. ` +
              `To retain 2.x behavior, move v-bind to make it the first att=
ribute. ` +
              `You can also suppress this warning if the usage is intended.=
`,
          link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.htm=
l`
      },
      ["COMPILER_V_ON_NATIVE" /* CompilerDeprecationTypes.COMPILER_V_ON_NAT=
IVE */]: {
          message: `.native modifier for v-on has been removed as is no lon=
ger necessary.`,
          link: `https://v3-migration.vuejs.org/breaking-changes/v-on-nativ=
e-modifier-removed.html`
      },
      ["COMPILER_V_IF_V_FOR_PRECEDENCE" /* CompilerDeprecationTypes.COMPILE=
R_V_IF_V_FOR_PRECEDENCE */]: {
          message: `v-if / v-for precedence when used on the same element h=
as changed ` +
              `in Vue 3: v-if now takes higher precedence and will no longe=
r have ` +
              `access to v-for scope variables. It is best to avoid the amb=
iguity ` +
              `with &lt;template&gt; tags or use a computed property that f=
ilters v-for ` +
              `data source.`,
          link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for=
.html`
      },
      ["COMPILER_NATIVE_TEMPLATE" /* CompilerDeprecationTypes.COMPILER_NATI=
VE_TEMPLATE */]: {
          message: `&lt;template&gt; with no special directives will render=
 as a native template ` +
              `element instead of its inner content in Vue 3.`
      },
      ["COMPILER_INLINE_TEMPLATE" /* CompilerDeprecationTypes.COMPILER_INLI=
NE_TEMPLATE */]: {
          message: `"inline-template" has been removed in Vue 3.`,
          link: `https://v3-migration.vuejs.org/breaking-changes/inline-tem=
plate-attribute.html`
      },
      ["COMPILER_FILTER" /* CompilerDeprecationTypes.COMPILER_FILTERS */]: =
{
          message: `filters have been removed in Vue 3. ` +
              `The "|" symbol will be treated as native JavaScript bitwise =
OR operator. ` +
              `Use method calls or computed properties instead.`,
          link: `https://v3-migration.vuejs.org/breaking-changes/filters.ht=
ml`
      }
  };
  function getCompatValue(key, context) {
      const config =3D context.options
          ? context.options.compatConfig
          : context.compatConfig;
      const value =3D config &amp;&amp; config[key];
      if (key =3D=3D=3D 'MODE') {
          return value || 3; // compiler defaults to v3 behavior
      }
      else {
          return value;
      }
  }
  function isCompatEnabled(key, context) {
      const mode =3D getCompatValue('MODE', context);
      const value =3D getCompatValue(key, context);
      // in v3 mode, only enable if explicitly set to true
      // otherwise enable for any non-false value
      return mode =3D=3D=3D 3 ? value =3D=3D=3D true : value !=3D=3D false;
  }
  function checkCompatEnabled(key, context, loc, ...args) {
      const enabled =3D isCompatEnabled(key, context);
      if (enabled) {
          warnDeprecation(key, context, loc, ...args);
      }
      return enabled;
  }
  function warnDeprecation(key, context, loc, ...args) {
      const val =3D getCompatValue(key, context);
      if (val =3D=3D=3D 'suppress-warning') {
          return;
      }
      const { message, link } =3D deprecationData[key];
      const msg =3D `(deprecation ${key}) ${typeof message =3D=3D=3D 'funct=
ion' ? message(...args) : message}${link ? `\n  Details: ${link}` : ``}`;
      const err =3D new SyntaxError(msg);
      err.code =3D key;
      if (loc)
          err.loc =3D loc;
      context.onWarn(err);
  }

  // The default decoder only provides escapes for characters reserved as p=
art of
  // the template syntax, and is only used if the custom renderer did not p=
rovide
  // a platform-specific decoder.
  const decodeRE =3D /&amp;(gt|lt|amp|apos|quot);/g;
  const decodeMap =3D {
      gt: '&gt;',
      lt: '&lt;',
      amp: '&amp;',
      apos: "'",
      quot: '"'
  };
  const defaultParserOptions =3D {
      delimiters: [`{{`, `}}`],
      getNamespace: () =3D&gt; 0 /* Namespaces.HTML */,
      getTextMode: () =3D&gt; 0 /* TextModes.DATA */,
      isVoidTag: NO,
      isPreTag: NO,
      isCustomElement: NO,
      decodeEntities: (rawText) =3D&gt; rawText.replace(decodeRE, (_, p1) =
=3D&gt; decodeMap[p1]),
      onError: defaultOnError,
      onWarn: defaultOnWarn,
      comments: true
  };
  function baseParse(content, options =3D {}) {
      const context =3D createParserContext(content, options);
      const start =3D getCursor(context);
      return createRoot(parseChildren(context, 0 /* TextModes.DATA */, []),=
 getSelection(context, start));
  }
  function createParserContext(content, rawOptions) {
      const options =3D extend({}, defaultParserOptions);
      let key;
      for (key in rawOptions) {
          // @ts-ignore
          options[key] =3D
              rawOptions[key] =3D=3D=3D undefined
                  ? defaultParserOptions[key]
                  : rawOptions[key];
      }
      return {
          options,
          column: 1,
          line: 1,
          offset: 0,
          originalSource: content,
          source: content,
          inPre: false,
          inVPre: false,
          onWarn: options.onWarn
      };
  }
  function parseChildren(context, mode, ancestors) {
      const parent =3D last(ancestors);
      const ns =3D parent ? parent.ns : 0 /* Namespaces.HTML */;
      const nodes =3D [];
      while (!isEnd(context, mode, ancestors)) {
          const s =3D context.source;
          let node =3D undefined;
          if (mode =3D=3D=3D 0 /* TextModes.DATA */ || mode =3D=3D=3D 1 /* =
TextModes.RCDATA */) {
              if (!context.inVPre &amp;&amp; startsWith(s, context.options.=
delimiters[0])) {
                  // '{{'
                  node =3D parseInterpolation(context, mode);
              }
              else if (mode =3D=3D=3D 0 /* TextModes.DATA */ &amp;&amp; s[0=
] =3D=3D=3D '&lt;') {
                  // https://html.spec.whatwg.org/multipage/parsing.html#ta=
g-open-state
                  if (s.length =3D=3D=3D 1) {
                      emitError(context, 5 /* ErrorCodes.EOF_BEFORE_TAG_NAM=
E */, 1);
                  }
                  else if (s[1] =3D=3D=3D '!') {
                      // https://html.spec.whatwg.org/multipage/parsing.htm=
l#markup-declaration-open-state
                      if (startsWith(s, '&lt;!--')) {
                          node =3D parseComment(context);
                      }
                      else if (startsWith(s, '&lt;!DOCTYPE')) {
                          // Ignore DOCTYPE by a limitation.
                          node =3D parseBogusComment(context);
                      }
                      else if (startsWith(s, '&lt;![CDATA[')) {
                          if (ns !=3D=3D 0 /* Namespaces.HTML */) {
                              node =3D parseCDATA(context, ancestors);
                          }
                          else {
                              emitError(context, 1 /* ErrorCodes.CDATA_IN_H=
TML_CONTENT */);
                              node =3D parseBogusComment(context);
                          }
                      }
                      else {
                          emitError(context, 11 /* ErrorCodes.INCORRECTLY_O=
PENED_COMMENT */);
                          node =3D parseBogusComment(context);
                      }
                  }
                  else if (s[1] =3D=3D=3D '/') {
                      // https://html.spec.whatwg.org/multipage/parsing.htm=
l#end-tag-open-state
                      if (s.length =3D=3D=3D 2) {
                          emitError(context, 5 /* ErrorCodes.EOF_BEFORE_TAG=
_NAME */, 2);
                      }
                      else if (s[2] =3D=3D=3D '&gt;') {
                          emitError(context, 14 /* ErrorCodes.MISSING_END_T=
AG_NAME */, 2);
                          advanceBy(context, 3);
                          continue;
                      }
                      else if (/[a-z]/i.test(s[2])) {
                          emitError(context, 23 /* ErrorCodes.X_INVALID_END=
_TAG */);
                          parseTag(context, 1 /* TagType.End */, parent);
                          continue;
                      }
                      else {
                          emitError(context, 12 /* ErrorCodes.INVALID_FIRST=
_CHARACTER_OF_TAG_NAME */, 2);
                          node =3D parseBogusComment(context);
                      }
                  }
                  else if (/[a-z]/i.test(s[1])) {
                      node =3D parseElement(context, ancestors);
                  }
                  else if (s[1] =3D=3D=3D '?') {
                      emitError(context, 21 /* ErrorCodes.UNEXPECTED_QUESTI=
ON_MARK_INSTEAD_OF_TAG_NAME */, 1);
                      node =3D parseBogusComment(context);
                  }
                  else {
                      emitError(context, 12 /* ErrorCodes.INVALID_FIRST_CHA=
RACTER_OF_TAG_NAME */, 1);
                  }
              }
          }
          if (!node) {
              node =3D parseText(context, mode);
          }
          if (isArray(node)) {
              for (let i =3D 0; i &lt; node.length; i++) {
                  pushNode(nodes, node[i]);
              }
          }
          else {
              pushNode(nodes, node);
          }
      }
      // Whitespace handling strategy like v2
      let removedWhitespace =3D false;
      if (mode !=3D=3D 2 /* TextModes.RAWTEXT */ &amp;&amp; mode !=3D=3D 1 =
/* TextModes.RCDATA */) {
          const shouldCondense =3D context.options.whitespace !=3D=3D 'pres=
erve';
          for (let i =3D 0; i &lt; nodes.length; i++) {
              const node =3D nodes[i];
              if (node.type =3D=3D=3D 2 /* NodeTypes.TEXT */) {
                  if (!context.inPre) {
                      if (!/[^\t\r\n\f ]/.test(node.content)) {
                          const prev =3D nodes[i - 1];
                          const next =3D nodes[i + 1];
                          // Remove if:
                          // - the whitespace is the first or last node, or=
:
                          // - (condense mode) the whitespace is between tw=
os comments, or:
                          // - (condense mode) the whitespace is between co=
mment and element, or:
                          // - (condense mode) the whitespace is between tw=
o elements AND contains newline
                          if (!prev ||
                              !next ||
                              (shouldCondense &amp;&amp;
                                  ((prev.type =3D=3D=3D 3 /* NodeTypes.COMM=
ENT */ &amp;&amp;
                                      next.type =3D=3D=3D 3 /* NodeTypes.CO=
MMENT */) ||
                                      (prev.type =3D=3D=3D 3 /* NodeTypes.C=
OMMENT */ &amp;&amp;
                                          next.type =3D=3D=3D 1 /* NodeType=
s.ELEMENT */) ||
                                      (prev.type =3D=3D=3D 1 /* NodeTypes.E=
LEMENT */ &amp;&amp;
                                          next.type =3D=3D=3D 3 /* NodeType=
s.COMMENT */) ||
                                      (prev.type =3D=3D=3D 1 /* NodeTypes.E=
LEMENT */ &amp;&amp;
                                          next.type =3D=3D=3D 1 /* NodeType=
s.ELEMENT */ &amp;&amp;
                                          /[\r\n]/.test(node.content))))) {
                              removedWhitespace =3D true;
                              nodes[i] =3D null;
                          }
                          else {
                              // Otherwise, the whitespace is condensed int=
o a single space
                              node.content =3D ' ';
                          }
                      }
                      else if (shouldCondense) {
                          // in condense mode, consecutive whitespaces in t=
ext are condensed
                          // down to a single space.
                          node.content =3D node.content.replace(/[\t\r\n\f =
]+/g, ' ');
                      }
                  }
                  else {
                      // #6410 normalize windows newlines in &lt;pre&gt;:
                      // in SSR, browsers normalize server-rendered \r\n in=
to a single \n
                      // in the DOM
                      node.content =3D node.content.replace(/\r\n/g, '\n');
                  }
              }
              // Remove comment nodes if desired by configuration.
              else if (node.type =3D=3D=3D 3 /* NodeTypes.COMMENT */ &amp;&=
amp; !context.options.comments) {
                  removedWhitespace =3D true;
                  nodes[i] =3D null;
              }
          }
          if (context.inPre &amp;&amp; parent &amp;&amp; context.options.is=
PreTag(parent.tag)) {
              // remove leading newline per html spec
              // https://html.spec.whatwg.org/multipage/grouping-content.ht=
ml#the-pre-element
              const first =3D nodes[0];
              if (first &amp;&amp; first.type =3D=3D=3D 2 /* NodeTypes.TEXT=
 */) {
                  first.content =3D first.content.replace(/^\r?\n/, '');
              }
          }
      }
      return removedWhitespace ? nodes.filter(Boolean) : nodes;
  }
  function pushNode(nodes, node) {
      if (node.type =3D=3D=3D 2 /* NodeTypes.TEXT */) {
          const prev =3D last(nodes);
          // Merge if both this and the previous node are text and those ar=
e
          // consecutive. This happens for cases like "a &lt; b".
          if (prev &amp;&amp;
              prev.type =3D=3D=3D 2 /* NodeTypes.TEXT */ &amp;&amp;
              prev.loc.end.offset =3D=3D=3D node.loc.start.offset) {
              prev.content +=3D node.content;
              prev.loc.end =3D node.loc.end;
              prev.loc.source +=3D node.loc.source;
              return;
          }
      }
      nodes.push(node);
  }
  function parseCDATA(context, ancestors) {
      advanceBy(context, 9);
      const nodes =3D parseChildren(context, 3 /* TextModes.CDATA */, ances=
tors);
      if (context.source.length =3D=3D=3D 0) {
          emitError(context, 6 /* ErrorCodes.EOF_IN_CDATA */);
      }
      else {
          advanceBy(context, 3);
      }
      return nodes;
  }
  function parseComment(context) {
      const start =3D getCursor(context);
      let content;
      // Regular comment.
      const match =3D /--(\!)?&gt;/.exec(context.source);
      if (!match) {
          content =3D context.source.slice(4);
          advanceBy(context, context.source.length);
          emitError(context, 7 /* ErrorCodes.EOF_IN_COMMENT */);
      }
      else {
          if (match.index &lt;=3D 3) {
              emitError(context, 0 /* ErrorCodes.ABRUPT_CLOSING_OF_EMPTY_CO=
MMENT */);
          }
          if (match[1]) {
              emitError(context, 10 /* ErrorCodes.INCORRECTLY_CLOSED_COMMEN=
T */);
          }
          content =3D context.source.slice(4, match.index);
          // Advancing with reporting nested comments.
          const s =3D context.source.slice(0, match.index);
          let prevIndex =3D 1, nestedIndex =3D 0;
          while ((nestedIndex =3D s.indexOf('&lt;!--', prevIndex)) !=3D=3D =
-1) {
              advanceBy(context, nestedIndex - prevIndex + 1);
              if (nestedIndex + 4 &lt; s.length) {
                  emitError(context, 16 /* ErrorCodes.NESTED_COMMENT */);
              }
              prevIndex =3D nestedIndex + 1;
          }
          advanceBy(context, match.index + match[0].length - prevIndex + 1)=
;
      }
      return {
          type: 3 /* NodeTypes.COMMENT */,
          content,
          loc: getSelection(context, start)
      };
  }
  function parseBogusComment(context) {
      const start =3D getCursor(context);
      const contentStart =3D context.source[1] =3D=3D=3D '?' ? 1 : 2;
      let content;
      const closeIndex =3D context.source.indexOf('&gt;');
      if (closeIndex =3D=3D=3D -1) {
          content =3D context.source.slice(contentStart);
          advanceBy(context, context.source.length);
      }
      else {
          content =3D context.source.slice(contentStart, closeIndex);
          advanceBy(context, closeIndex + 1);
      }
      return {
          type: 3 /* NodeTypes.COMMENT */,
          content,
          loc: getSelection(context, start)
      };
  }
  function parseElement(context, ancestors) {
      // Start tag.
      const wasInPre =3D context.inPre;
      const wasInVPre =3D context.inVPre;
      const parent =3D last(ancestors);
      const element =3D parseTag(context, 0 /* TagType.Start */, parent);
      const isPreBoundary =3D context.inPre &amp;&amp; !wasInPre;
      const isVPreBoundary =3D context.inVPre &amp;&amp; !wasInVPre;
      if (element.isSelfClosing || context.options.isVoidTag(element.tag)) =
{
          // #4030 self-closing &lt;pre&gt; tag
          if (isPreBoundary) {
              context.inPre =3D false;
          }
          if (isVPreBoundary) {
              context.inVPre =3D false;
          }
          return element;
      }
      // Children.
      ancestors.push(element);
      const mode =3D context.options.getTextMode(element, parent);
      const children =3D parseChildren(context, mode, ancestors);
      ancestors.pop();
      element.children =3D children;
      // End tag.
      if (startsWithEndTagOpen(context.source, element.tag)) {
          parseTag(context, 1 /* TagType.End */, parent);
      }
      else {
          emitError(context, 24 /* ErrorCodes.X_MISSING_END_TAG */, 0, elem=
ent.loc.start);
          if (context.source.length =3D=3D=3D 0 &amp;&amp; element.tag.toLo=
werCase() =3D=3D=3D 'script') {
              const first =3D children[0];
              if (first &amp;&amp; startsWith(first.loc.source, '&lt;!--'))=
 {
                  emitError(context, 8 /* ErrorCodes.EOF_IN_SCRIPT_HTML_COM=
MENT_LIKE_TEXT */);
              }
          }
      }
      element.loc =3D getSelection(context, element.loc.start);
      if (isPreBoundary) {
          context.inPre =3D false;
      }
      if (isVPreBoundary) {
          context.inVPre =3D false;
      }
      return element;
  }
  const isSpecialTemplateDirective =3D /*#__PURE__*/ makeMap(`if,else,else-=
if,for,slot`);
  function parseTag(context, type, parent) {
      // Tag open.
      const start =3D getCursor(context);
      const match =3D /^&lt;\/?([a-z][^\t\r\n\f /&gt;]*)/i.exec(context.sou=
rce);
      const tag =3D match[1];
      const ns =3D context.options.getNamespace(tag, parent);
      advanceBy(context, match[0].length);
      advanceSpaces(context);
      // save current state in case we need to re-parse attributes with v-p=
re
      const cursor =3D getCursor(context);
      const currentSource =3D context.source;
      // check &lt;pre&gt; tag
      if (context.options.isPreTag(tag)) {
          context.inPre =3D true;
      }
      // Attributes.
      let props =3D parseAttributes(context, type);
      // check v-pre
      if (type =3D=3D=3D 0 /* TagType.Start */ &amp;&amp;
          !context.inVPre &amp;&amp;
          props.some(p =3D&gt; p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */=
 &amp;&amp; p.name =3D=3D=3D 'pre')) {
          context.inVPre =3D true;
          // reset context
          extend(context, cursor);
          context.source =3D currentSource;
          // re-parse attrs and filter out v-pre itself
          props =3D parseAttributes(context, type).filter(p =3D&gt; p.name =
!=3D=3D 'v-pre');
      }
      // Tag close.
      let isSelfClosing =3D false;
      if (context.source.length =3D=3D=3D 0) {
          emitError(context, 9 /* ErrorCodes.EOF_IN_TAG */);
      }
      else {
          isSelfClosing =3D startsWith(context.source, '/&gt;');
          if (type =3D=3D=3D 1 /* TagType.End */ &amp;&amp; isSelfClosing) =
{
              emitError(context, 4 /* ErrorCodes.END_TAG_WITH_TRAILING_SOLI=
DUS */);
          }
          advanceBy(context, isSelfClosing ? 2 : 1);
      }
      if (type =3D=3D=3D 1 /* TagType.End */) {
          return;
      }
      let tagType =3D 0 /* ElementTypes.ELEMENT */;
      if (!context.inVPre) {
          if (tag =3D=3D=3D 'slot') {
              tagType =3D 2 /* ElementTypes.SLOT */;
          }
          else if (tag =3D=3D=3D 'template') {
              if (props.some(p =3D&gt; p.type =3D=3D=3D 7 /* NodeTypes.DIRE=
CTIVE */ &amp;&amp; isSpecialTemplateDirective(p.name))) {
                  tagType =3D 3 /* ElementTypes.TEMPLATE */;
              }
          }
          else if (isComponent(tag, props, context)) {
              tagType =3D 1 /* ElementTypes.COMPONENT */;
          }
      }
      return {
          type: 1 /* NodeTypes.ELEMENT */,
          ns,
          tag,
          tagType,
          props,
          isSelfClosing,
          children: [],
          loc: getSelection(context, start),
          codegenNode: undefined // to be created during transform phase
      };
  }
  function isComponent(tag, props, context) {
      const options =3D context.options;
      if (options.isCustomElement(tag)) {
          return false;
      }
      if (tag =3D=3D=3D 'component' ||
          /^[A-Z]/.test(tag) ||
          isCoreComponent(tag) ||
          (options.isBuiltInComponent &amp;&amp; options.isBuiltInComponent=
(tag)) ||
          (options.isNativeTag &amp;&amp; !options.isNativeTag(tag))) {
          return true;
      }
      // at this point the tag should be a native tag, but check for potent=
ial "is"
      // casting
      for (let i =3D 0; i &lt; props.length; i++) {
          const p =3D props[i];
          if (p.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */) {
              if (p.name =3D=3D=3D 'is' &amp;&amp; p.value) {
                  if (p.value.content.startsWith('vue:')) {
                      return true;
                  }
              }
          }
          else {
              // directive
              // v-is (TODO Deprecate)
              if (p.name =3D=3D=3D 'is') {
                  return true;
              }
              else if (
              // :is on plain element - only treat as component in compat m=
ode
              p.name =3D=3D=3D 'bind' &amp;&amp;
                  isStaticArgOf(p.arg, 'is') &amp;&amp;
                  false &amp;&amp;
                  checkCompatEnabled("COMPILER_IS_ON_ELEMENT" /* CompilerDe=
precationTypes.COMPILER_IS_ON_ELEMENT */, context, p.loc)) {
                  return true;
              }
          }
      }
  }
  function parseAttributes(context, type) {
      const props =3D [];
      const attributeNames =3D new Set();
      while (context.source.length &gt; 0 &amp;&amp;
          !startsWith(context.source, '&gt;') &amp;&amp;
          !startsWith(context.source, '/&gt;')) {
          if (startsWith(context.source, '/')) {
              emitError(context, 22 /* ErrorCodes.UNEXPECTED_SOLIDUS_IN_TAG=
 */);
              advanceBy(context, 1);
              advanceSpaces(context);
              continue;
          }
          if (type =3D=3D=3D 1 /* TagType.End */) {
              emitError(context, 3 /* ErrorCodes.END_TAG_WITH_ATTRIBUTES */=
);
          }
          const attr =3D parseAttribute(context, attributeNames);
          // Trim whitespace between class
          // https://github.com/vuejs/core/issues/4251
          if (attr.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */ &amp;&amp;
              attr.value &amp;&amp;
              attr.name =3D=3D=3D 'class') {
              attr.value.content =3D attr.value.content.replace(/\s+/g, ' '=
).trim();
          }
          if (type =3D=3D=3D 0 /* TagType.Start */) {
              props.push(attr);
          }
          if (/^[^\t\r\n\f /&gt;]/.test(context.source)) {
              emitError(context, 15 /* ErrorCodes.MISSING_WHITESPACE_BETWEE=
N_ATTRIBUTES */);
          }
          advanceSpaces(context);
      }
      return props;
  }
  function parseAttribute(context, nameSet) {
      // Name.
      const start =3D getCursor(context);
      const match =3D /^[^\t\r\n\f /&gt;][^\t\r\n\f /&gt;=3D]*/.exec(contex=
t.source);
      const name =3D match[0];
      if (nameSet.has(name)) {
          emitError(context, 2 /* ErrorCodes.DUPLICATE_ATTRIBUTE */);
      }
      nameSet.add(name);
      if (name[0] =3D=3D=3D '=3D') {
          emitError(context, 19 /* ErrorCodes.UNEXPECTED_EQUALS_SIGN_BEFORE=
_ATTRIBUTE_NAME */);
      }
      {
          const pattern =3D /["'&lt;]/g;
          let m;
          while ((m =3D pattern.exec(name))) {
              emitError(context, 17 /* ErrorCodes.UNEXPECTED_CHARACTER_IN_A=
TTRIBUTE_NAME */, m.index);
          }
      }
      advanceBy(context, name.length);
      // Value
      let value =3D undefined;
      if (/^[\t\r\n\f ]*=3D/.test(context.source)) {
          advanceSpaces(context);
          advanceBy(context, 1);
          advanceSpaces(context);
          value =3D parseAttributeValue(context);
          if (!value) {
              emitError(context, 13 /* ErrorCodes.MISSING_ATTRIBUTE_VALUE *=
/);
          }
      }
      const loc =3D getSelection(context, start);
      if (!context.inVPre &amp;&amp; /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name=
)) {
          const match =3D /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\=
]|[^\.]+))?(.+)?$/i.exec(name);
          let isPropShorthand =3D startsWith(name, '.');
          let dirName =3D match[1] ||
              (isPropShorthand || startsWith(name, ':')
                  ? 'bind'
                  : startsWith(name, '@')
                      ? 'on'
                      : 'slot');
          let arg;
          if (match[2]) {
              const isSlot =3D dirName =3D=3D=3D 'slot';
              const startOffset =3D name.lastIndexOf(match[2]);
              const loc =3D getSelection(context, getNewPosition(context, s=
tart, startOffset), getNewPosition(context, start, startOffset + match[2].l=
ength + ((isSlot &amp;&amp; match[3]) || '').length));
              let content =3D match[2];
              let isStatic =3D true;
              if (content.startsWith('[')) {
                  isStatic =3D false;
                  if (!content.endsWith(']')) {
                      emitError(context, 27 /* ErrorCodes.X_MISSING_DYNAMIC=
_DIRECTIVE_ARGUMENT_END */);
                      content =3D content.slice(1);
                  }
                  else {
                      content =3D content.slice(1, content.length - 1);
                  }
              }
              else if (isSlot) {
                  // #1241 special case for v-slot: vuetify relies extensiv=
ely on slot
                  // names containing dots. v-slot doesn't have any modifie=
rs and Vue 2.x
                  // supports such usage so we are keeping it consistent wi=
th 2.x.
                  content +=3D match[3] || '';
              }
              arg =3D {
                  type: 4 /* NodeTypes.SIMPLE_EXPRESSION */,
                  content,
                  isStatic,
                  constType: isStatic
                      ? 3 /* ConstantTypes.CAN_STRINGIFY */
                      : 0 /* ConstantTypes.NOT_CONSTANT */,
                  loc
              };
          }
          if (value &amp;&amp; value.isQuoted) {
              const valueLoc =3D value.loc;
              valueLoc.start.offset++;
              valueLoc.start.column++;
              valueLoc.end =3D advancePositionWithClone(valueLoc.start, val=
ue.content);
              valueLoc.source =3D valueLoc.source.slice(1, -1);
          }
          const modifiers =3D match[3] ? match[3].slice(1).split('.') : [];
          if (isPropShorthand)
              modifiers.push('prop');
          return {
              type: 7 /* NodeTypes.DIRECTIVE */,
              name: dirName,
              exp: value &amp;&amp; {
                  type: 4 /* NodeTypes.SIMPLE_EXPRESSION */,
                  content: value.content,
                  isStatic: false,
                  // Treat as non-constant by default. This can be potentia=
lly set to
                  // other values by `transformExpression` to make it eligi=
ble for hoisting.
                  constType: 0 /* ConstantTypes.NOT_CONSTANT */,
                  loc: value.loc
              },
              arg,
              modifiers,
              loc
          };
      }
      // missing directive name or illegal directive name
      if (!context.inVPre &amp;&amp; startsWith(name, 'v-')) {
          emitError(context, 26 /* ErrorCodes.X_MISSING_DIRECTIVE_NAME */);
      }
      return {
          type: 6 /* NodeTypes.ATTRIBUTE */,
          name,
          value: value &amp;&amp; {
              type: 2 /* NodeTypes.TEXT */,
              content: value.content,
              loc: value.loc
          },
          loc
      };
  }
  function parseAttributeValue(context) {
      const start =3D getCursor(context);
      let content;
      const quote =3D context.source[0];
      const isQuoted =3D quote =3D=3D=3D `"` || quote =3D=3D=3D `'`;
      if (isQuoted) {
          // Quoted value.
          advanceBy(context, 1);
          const endIndex =3D context.source.indexOf(quote);
          if (endIndex =3D=3D=3D -1) {
              content =3D parseTextData(context, context.source.length, 4 /=
* TextModes.ATTRIBUTE_VALUE */);
          }
          else {
              content =3D parseTextData(context, endIndex, 4 /* TextModes.A=
TTRIBUTE_VALUE */);
              advanceBy(context, 1);
          }
      }
      else {
          // Unquoted
          const match =3D /^[^\t\r\n\f &gt;]+/.exec(context.source);
          if (!match) {
              return undefined;
          }
          const unexpectedChars =3D /["'&lt;=3D`]/g;
          let m;
          while ((m =3D unexpectedChars.exec(match[0]))) {
              emitError(context, 18 /* ErrorCodes.UNEXPECTED_CHARACTER_IN_U=
NQUOTED_ATTRIBUTE_VALUE */, m.index);
          }
          content =3D parseTextData(context, match[0].length, 4 /* TextMode=
s.ATTRIBUTE_VALUE */);
      }
      return { content, isQuoted, loc: getSelection(context, start) };
  }
  function parseInterpolation(context, mode) {
      const [open, close] =3D context.options.delimiters;
      const closeIndex =3D context.source.indexOf(close, open.length);
      if (closeIndex =3D=3D=3D -1) {
          emitError(context, 25 /* ErrorCodes.X_MISSING_INTERPOLATION_END *=
/);
          return undefined;
      }
      const start =3D getCursor(context);
      advanceBy(context, open.length);
      const innerStart =3D getCursor(context);
      const innerEnd =3D getCursor(context);
      const rawContentLength =3D closeIndex - open.length;
      const rawContent =3D context.source.slice(0, rawContentLength);
      const preTrimContent =3D parseTextData(context, rawContentLength, mod=
e);
      const content =3D preTrimContent.trim();
      const startOffset =3D preTrimContent.indexOf(content);
      if (startOffset &gt; 0) {
          advancePositionWithMutation(innerStart, rawContent, startOffset);
      }
      const endOffset =3D rawContentLength - (preTrimContent.length - conte=
nt.length - startOffset);
      advancePositionWithMutation(innerEnd, rawContent, endOffset);
      advanceBy(context, close.length);
      return {
          type: 5 /* NodeTypes.INTERPOLATION */,
          content: {
              type: 4 /* NodeTypes.SIMPLE_EXPRESSION */,
              isStatic: false,
              // Set `isConstant` to false by default and will decide in tr=
ansformExpression
              constType: 0 /* ConstantTypes.NOT_CONSTANT */,
              content,
              loc: getSelection(context, innerStart, innerEnd)
          },
          loc: getSelection(context, start)
      };
  }
  function parseText(context, mode) {
      const endTokens =3D mode =3D=3D=3D 3 /* TextModes.CDATA */ ? [']]&gt;=
'] : ['&lt;', context.options.delimiters[0]];
      let endIndex =3D context.source.length;
      for (let i =3D 0; i &lt; endTokens.length; i++) {
          const index =3D context.source.indexOf(endTokens[i], 1);
          if (index !=3D=3D -1 &amp;&amp; endIndex &gt; index) {
              endIndex =3D index;
          }
      }
      const start =3D getCursor(context);
      const content =3D parseTextData(context, endIndex, mode);
      return {
          type: 2 /* NodeTypes.TEXT */,
          content,
          loc: getSelection(context, start)
      };
  }
  /**
   * Get text data with a given length from the current location.
   * This translates HTML entities in the text data.
   */
  function parseTextData(context, length, mode) {
      const rawText =3D context.source.slice(0, length);
      advanceBy(context, length);
      if (mode =3D=3D=3D 2 /* TextModes.RAWTEXT */ ||
          mode =3D=3D=3D 3 /* TextModes.CDATA */ ||
          !rawText.includes('&amp;')) {
          return rawText;
      }
      else {
          // DATA or RCDATA containing "&amp;"". Entity decoding required.
          return context.options.decodeEntities(rawText, mode =3D=3D=3D 4 /=
* TextModes.ATTRIBUTE_VALUE */);
      }
  }
  function getCursor(context) {
      const { column, line, offset } =3D context;
      return { column, line, offset };
  }
  function getSelection(context, start, end) {
      end =3D end || getCursor(context);
      return {
          start,
          end,
          source: context.originalSource.slice(start.offset, end.offset)
      };
  }
  function last(xs) {
      return xs[xs.length - 1];
  }
  function startsWith(source, searchString) {
      return source.startsWith(searchString);
  }
  function advanceBy(context, numberOfCharacters) {
      const { source } =3D context;
      advancePositionWithMutation(context, source, numberOfCharacters);
      context.source =3D source.slice(numberOfCharacters);
  }
  function advanceSpaces(context) {
      const match =3D /^[\t\r\n\f ]+/.exec(context.source);
      if (match) {
          advanceBy(context, match[0].length);
      }
  }
  function getNewPosition(context, start, numberOfCharacters) {
      return advancePositionWithClone(start, context.originalSource.slice(s=
tart.offset, numberOfCharacters), numberOfCharacters);
  }
  function emitError(context, code, offset, loc =3D getCursor(context)) {
      if (offset) {
          loc.offset +=3D offset;
          loc.column +=3D offset;
      }
      context.options.onError(createCompilerError(code, {
          start: loc,
          end: loc,
          source: ''
      }));
  }
  function isEnd(context, mode, ancestors) {
      const s =3D context.source;
      switch (mode) {
          case 0 /* TextModes.DATA */:
              if (startsWith(s, '&lt;/')) {
                  // TODO: probably bad performance
                  for (let i =3D ancestors.length - 1; i &gt;=3D 0; --i) {
                      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
                          return true;
                      }
                  }
              }
              break;
          case 1 /* TextModes.RCDATA */:
          case 2 /* TextModes.RAWTEXT */: {
              const parent =3D last(ancestors);
              if (parent &amp;&amp; startsWithEndTagOpen(s, parent.tag)) {
                  return true;
              }
              break;
          }
          case 3 /* TextModes.CDATA */:
              if (startsWith(s, ']]&gt;')) {
                  return true;
              }
              break;
      }
      return !s;
  }
  function startsWithEndTagOpen(source, tag) {
      return (startsWith(source, '&lt;/') &amp;&amp;
          source.slice(2, 2 + tag.length).toLowerCase() =3D=3D=3D tag.toLow=
erCase() &amp;&amp;
          /[\t\r\n\f /&gt;]/.test(source[2 + tag.length] || '&gt;'));
  }

  function hoistStatic(root, context) {
      walk(root, context,=20
      // Root node is unfortunately non-hoistable due to potential parent
      // fallthrough attributes.
      isSingleElementRoot(root, root.children[0]));
  }
  function isSingleElementRoot(root, child) {
      const { children } =3D root;
      return (children.length =3D=3D=3D 1 &amp;&amp;
          child.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
          !isSlotOutlet(child));
  }
  function walk(node, context, doNotHoistNode =3D false) {
      const { children } =3D node;
      const originalCount =3D children.length;
      let hoistedCount =3D 0;
      for (let i =3D 0; i &lt; children.length; i++) {
          const child =3D children[i];
          // only plain elements &amp; text calls are eligible for hoisting=
.
          if (child.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
              child.tagType =3D=3D=3D 0 /* ElementTypes.ELEMENT */) {
              const constantType =3D doNotHoistNode
                  ? 0 /* ConstantTypes.NOT_CONSTANT */
                  : getConstantType(child, context);
              if (constantType &gt; 0 /* ConstantTypes.NOT_CONSTANT */) {
                  if (constantType &gt;=3D 2 /* ConstantTypes.CAN_HOIST */)=
 {
                      child.codegenNode.patchFlag =3D
                          -1 /* PatchFlags.HOISTED */ + (` /* HOISTED */` )=
;
                      child.codegenNode =3D context.hoist(child.codegenNode=
);
                      hoistedCount++;
                      continue;
                  }
              }
              else {
                  // node may contain dynamic children, but its props may b=
e eligible for
                  // hoisting.
                  const codegenNode =3D child.codegenNode;
                  if (codegenNode.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL=
 */) {
                      const flag =3D getPatchFlag(codegenNode);
                      if ((!flag ||
                          flag =3D=3D=3D 512 /* PatchFlags.NEED_PATCH */ ||
                          flag =3D=3D=3D 1 /* PatchFlags.TEXT */) &amp;&amp=
;
                          getGeneratedPropsConstantType(child, context) &gt=
;=3D
                              2 /* ConstantTypes.CAN_HOIST */) {
                          const props =3D getNodeProps(child);
                          if (props) {
                              codegenNode.props =3D context.hoist(props);
                          }
                      }
                      if (codegenNode.dynamicProps) {
                          codegenNode.dynamicProps =3D context.hoist(codege=
nNode.dynamicProps);
                      }
                  }
              }
          }
          // walk further
          if (child.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
              const isComponent =3D child.tagType =3D=3D=3D 1 /* ElementTyp=
es.COMPONENT */;
              if (isComponent) {
                  context.scopes.vSlot++;
              }
              walk(child, context);
              if (isComponent) {
                  context.scopes.vSlot--;
              }
          }
          else if (child.type =3D=3D=3D 11 /* NodeTypes.FOR */) {
              // Do not hoist v-for single child because it has to be a blo=
ck
              walk(child, context, child.children.length =3D=3D=3D 1);
          }
          else if (child.type =3D=3D=3D 9 /* NodeTypes.IF */) {
              for (let i =3D 0; i &lt; child.branches.length; i++) {
                  // Do not hoist v-if single child because it has to be a =
block
                  walk(child.branches[i], context, child.branches[i].childr=
en.length =3D=3D=3D 1);
              }
          }
      }
      if (hoistedCount &amp;&amp; context.transformHoist) {
          context.transformHoist(children, context, node);
      }
      // all children were hoisted - the entire children array is hoistable=
.
      if (hoistedCount &amp;&amp;
          hoistedCount =3D=3D=3D originalCount &amp;&amp;
          node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
          node.tagType =3D=3D=3D 0 /* ElementTypes.ELEMENT */ &amp;&amp;
          node.codegenNode &amp;&amp;
          node.codegenNode.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */ &am=
p;&amp;
          isArray(node.codegenNode.children)) {
          node.codegenNode.children =3D context.hoist(createArrayExpression=
(node.codegenNode.children));
      }
  }
  function getConstantType(node, context) {
      const { constantCache } =3D context;
      switch (node.type) {
          case 1 /* NodeTypes.ELEMENT */:
              if (node.tagType !=3D=3D 0 /* ElementTypes.ELEMENT */) {
                  return 0 /* ConstantTypes.NOT_CONSTANT */;
              }
              const cached =3D constantCache.get(node);
              if (cached !=3D=3D undefined) {
                  return cached;
              }
              const codegenNode =3D node.codegenNode;
              if (codegenNode.type !=3D=3D 13 /* NodeTypes.VNODE_CALL */) {
                  return 0 /* ConstantTypes.NOT_CONSTANT */;
              }
              if (codegenNode.isBlock &amp;&amp;
                  node.tag !=3D=3D 'svg' &amp;&amp;
                  node.tag !=3D=3D 'foreignObject') {
                  return 0 /* ConstantTypes.NOT_CONSTANT */;
              }
              const flag =3D getPatchFlag(codegenNode);
              if (!flag) {
                  let returnType =3D 3 /* ConstantTypes.CAN_STRINGIFY */;
                  // Element itself has no patch flag. However we still nee=
d to check:
                  // 1. Even for a node with no patch flag, it is possible =
for it to contain
                  // non-hoistable expressions that refers to scope variabl=
es, e.g. compiler
                  // injected keys or cached event handlers. Therefore we n=
eed to always
                  // check the codegenNode's props to be sure.
                  const generatedPropsType =3D getGeneratedPropsConstantTyp=
e(node, context);
                  if (generatedPropsType =3D=3D=3D 0 /* ConstantTypes.NOT_C=
ONSTANT */) {
                      constantCache.set(node, 0 /* ConstantTypes.NOT_CONSTA=
NT */);
                      return 0 /* ConstantTypes.NOT_CONSTANT */;
                  }
                  if (generatedPropsType &lt; returnType) {
                      returnType =3D generatedPropsType;
                  }
                  // 2. its children.
                  for (let i =3D 0; i &lt; node.children.length; i++) {
                      const childType =3D getConstantType(node.children[i],=
 context);
                      if (childType =3D=3D=3D 0 /* ConstantTypes.NOT_CONSTA=
NT */) {
                          constantCache.set(node, 0 /* ConstantTypes.NOT_CO=
NSTANT */);
                          return 0 /* ConstantTypes.NOT_CONSTANT */;
                      }
                      if (childType &lt; returnType) {
                          returnType =3D childType;
                      }
                  }
                  // 3. if the type is not already CAN_SKIP_PATCH which is =
the lowest non-0
                  // type, check if any of the props can cause the type to =
be lowered
                  // we can skip can_patch because it's guaranteed by the a=
bsence of a
                  // patchFlag.
                  if (returnType &gt; 1 /* ConstantTypes.CAN_SKIP_PATCH */)=
 {
                      for (let i =3D 0; i &lt; node.props.length; i++) {
                          const p =3D node.props[i];
                          if (p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ =
&amp;&amp; p.name =3D=3D=3D 'bind' &amp;&amp; p.exp) {
                              const expType =3D getConstantType(p.exp, cont=
ext);
                              if (expType =3D=3D=3D 0 /* ConstantTypes.NOT_=
CONSTANT */) {
                                  constantCache.set(node, 0 /* ConstantType=
s.NOT_CONSTANT */);
                                  return 0 /* ConstantTypes.NOT_CONSTANT */=
;
                              }
                              if (expType &lt; returnType) {
                                  returnType =3D expType;
                              }
                          }
                      }
                  }
                  // only svg/foreignObject could be block here, however if=
 they are
                  // static then they don't need to be blocks since there w=
ill be no
                  // nested updates.
                  if (codegenNode.isBlock) {
                      // except set custom directives.
                      for (let i =3D 0; i &lt; node.props.length; i++) {
                          const p =3D node.props[i];
                          if (p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */)=
 {
                              constantCache.set(node, 0 /* ConstantTypes.NO=
T_CONSTANT */);
                              return 0 /* ConstantTypes.NOT_CONSTANT */;
                          }
                      }
                      context.removeHelper(OPEN_BLOCK);
                      context.removeHelper(getVNodeBlockHelper(context.inSS=
R, codegenNode.isComponent));
                      codegenNode.isBlock =3D false;
                      context.helper(getVNodeHelper(context.inSSR, codegenN=
ode.isComponent));
                  }
                  constantCache.set(node, returnType);
                  return returnType;
              }
              else {
                  constantCache.set(node, 0 /* ConstantTypes.NOT_CONSTANT *=
/);
                  return 0 /* ConstantTypes.NOT_CONSTANT */;
              }
          case 2 /* NodeTypes.TEXT */:
          case 3 /* NodeTypes.COMMENT */:
              return 3 /* ConstantTypes.CAN_STRINGIFY */;
          case 9 /* NodeTypes.IF */:
          case 11 /* NodeTypes.FOR */:
          case 10 /* NodeTypes.IF_BRANCH */:
              return 0 /* ConstantTypes.NOT_CONSTANT */;
          case 5 /* NodeTypes.INTERPOLATION */:
          case 12 /* NodeTypes.TEXT_CALL */:
              return getConstantType(node.content, context);
          case 4 /* NodeTypes.SIMPLE_EXPRESSION */:
              return node.constType;
          case 8 /* NodeTypes.COMPOUND_EXPRESSION */:
              let returnType =3D 3 /* ConstantTypes.CAN_STRINGIFY */;
              for (let i =3D 0; i &lt; node.children.length; i++) {
                  const child =3D node.children[i];
                  if (isString(child) || isSymbol(child)) {
                      continue;
                  }
                  const childType =3D getConstantType(child, context);
                  if (childType =3D=3D=3D 0 /* ConstantTypes.NOT_CONSTANT *=
/) {
                      return 0 /* ConstantTypes.NOT_CONSTANT */;
                  }
                  else if (childType &lt; returnType) {
                      returnType =3D childType;
                  }
              }
              return returnType;
          default:
              return 0 /* ConstantTypes.NOT_CONSTANT */;
      }
  }
  const allowHoistedHelperSet =3D new Set([
      NORMALIZE_CLASS,
      NORMALIZE_STYLE,
      NORMALIZE_PROPS,
      GUARD_REACTIVE_PROPS
  ]);
  function getConstantTypeOfHelperCall(value, context) {
      if (value.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */ &amp;&=
amp;
          !isString(value.callee) &amp;&amp;
          allowHoistedHelperSet.has(value.callee)) {
          const arg =3D value.arguments[0];
          if (arg.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
              return getConstantType(arg, context);
          }
          else if (arg.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESSION */=
) {
              // in the case of nested helper call, e.g. `normalizeProps(gu=
ardReactiveProps(exp))`
              return getConstantTypeOfHelperCall(arg, context);
          }
      }
      return 0 /* ConstantTypes.NOT_CONSTANT */;
  }
  function getGeneratedPropsConstantType(node, context) {
      let returnType =3D 3 /* ConstantTypes.CAN_STRINGIFY */;
      const props =3D getNodeProps(node);
      if (props &amp;&amp; props.type =3D=3D=3D 15 /* NodeTypes.JS_OBJECT_E=
XPRESSION */) {
          const { properties } =3D props;
          for (let i =3D 0; i &lt; properties.length; i++) {
              const { key, value } =3D properties[i];
              const keyType =3D getConstantType(key, context);
              if (keyType =3D=3D=3D 0 /* ConstantTypes.NOT_CONSTANT */) {
                  return keyType;
              }
              if (keyType &lt; returnType) {
                  returnType =3D keyType;
              }
              let valueType;
              if (value.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */)=
 {
                  valueType =3D getConstantType(value, context);
              }
              else if (value.type =3D=3D=3D 14 /* NodeTypes.JS_CALL_EXPRESS=
ION */) {
                  // some helper calls can be hoisted,
                  // such as the `normalizeProps` generated by the compiler=
 for pre-normalize class,
                  // in this case we need to respect the ConstantType of th=
e helper's arguments
                  valueType =3D getConstantTypeOfHelperCall(value, context)=
;
              }
              else {
                  valueType =3D 0 /* ConstantTypes.NOT_CONSTANT */;
              }
              if (valueType =3D=3D=3D 0 /* ConstantTypes.NOT_CONSTANT */) {
                  return valueType;
              }
              if (valueType &lt; returnType) {
                  returnType =3D valueType;
              }
          }
      }
      return returnType;
  }
  function getNodeProps(node) {
      const codegenNode =3D node.codegenNode;
      if (codegenNode.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */) {
          return codegenNode.props;
      }
  }
  function getPatchFlag(node) {
      const flag =3D node.patchFlag;
      return flag ? parseInt(flag, 10) : undefined;
  }

  function createTransformContext(root, { filename =3D '', prefixIdentifier=
s =3D false, hoistStatic =3D false, cacheHandlers =3D false, nodeTransforms=
 =3D [], directiveTransforms =3D {}, transformHoist =3D null, isBuiltInComp=
onent =3D NOOP, isCustomElement =3D NOOP, expressionPlugins =3D [], scopeId=
 =3D null, slotted =3D true, ssr =3D false, inSSR =3D false, ssrCssVars =3D=
 ``, bindingMetadata =3D EMPTY_OBJ, inline =3D false, isTS =3D false, onErr=
or =3D defaultOnError, onWarn =3D defaultOnWarn, compatConfig }) {
      const nameMatch =3D filename.replace(/\?.*$/, '').match(/([^/\\]+)\.\=
w+$/);
      const context =3D {
          // options
          selfName: nameMatch &amp;&amp; capitalize(camelize(nameMatch[1]))=
,
          prefixIdentifiers,
          hoistStatic,
          cacheHandlers,
          nodeTransforms,
          directiveTransforms,
          transformHoist,
          isBuiltInComponent,
          isCustomElement,
          expressionPlugins,
          scopeId,
          slotted,
          ssr,
          inSSR,
          ssrCssVars,
          bindingMetadata,
          inline,
          isTS,
          onError,
          onWarn,
          compatConfig,
          // state
          root,
          helpers: new Map(),
          components: new Set(),
          directives: new Set(),
          hoists: [],
          imports: [],
          constantCache: new Map(),
          temps: 0,
          cached: 0,
          identifiers: Object.create(null),
          scopes: {
              vFor: 0,
              vSlot: 0,
              vPre: 0,
              vOnce: 0
          },
          parent: null,
          currentNode: root,
          childIndex: 0,
          inVOnce: false,
          // methods
          helper(name) {
              const count =3D context.helpers.get(name) || 0;
              context.helpers.set(name, count + 1);
              return name;
          },
          removeHelper(name) {
              const count =3D context.helpers.get(name);
              if (count) {
                  const currentCount =3D count - 1;
                  if (!currentCount) {
                      context.helpers.delete(name);
                  }
                  else {
                      context.helpers.set(name, currentCount);
                  }
              }
          },
          helperString(name) {
              return `_${helperNameMap[context.helper(name)]}`;
          },
          replaceNode(node) {
              /* istanbul ignore if */
              {
                  if (!context.currentNode) {
                      throw new Error(`Node being replaced is already remov=
ed.`);
                  }
                  if (!context.parent) {
                      throw new Error(`Cannot replace root node.`);
                  }
              }
              context.parent.children[context.childIndex] =3D context.curre=
ntNode =3D node;
          },
          removeNode(node) {
              if (!context.parent) {
                  throw new Error(`Cannot remove root node.`);
              }
              const list =3D context.parent.children;
              const removalIndex =3D node
                  ? list.indexOf(node)
                  : context.currentNode
                      ? context.childIndex
                      : -1;
              /* istanbul ignore if */
              if (removalIndex &lt; 0) {
                  throw new Error(`node being removed is not a child of cur=
rent parent`);
              }
              if (!node || node =3D=3D=3D context.currentNode) {
                  // current node removed
                  context.currentNode =3D null;
                  context.onNodeRemoved();
              }
              else {
                  // sibling node removed
                  if (context.childIndex &gt; removalIndex) {
                      context.childIndex--;
                      context.onNodeRemoved();
                  }
              }
              context.parent.children.splice(removalIndex, 1);
          },
          onNodeRemoved: () =3D&gt; { },
          addIdentifiers(exp) {
          },
          removeIdentifiers(exp) {
          },
          hoist(exp) {
              if (isString(exp))
                  exp =3D createSimpleExpression(exp);
              context.hoists.push(exp);
              const identifier =3D createSimpleExpression(`_hoisted_${conte=
xt.hoists.length}`, false, exp.loc, 2 /* ConstantTypes.CAN_HOIST */);
              identifier.hoisted =3D exp;
              return identifier;
          },
          cache(exp, isVNode =3D false) {
              return createCacheExpression(context.cached++, exp, isVNode);
          }
      };
      return context;
  }
  function transform(root, options) {
      const context =3D createTransformContext(root, options);
      traverseNode(root, context);
      if (options.hoistStatic) {
          hoistStatic(root, context);
      }
      if (!options.ssr) {
          createRootCodegen(root, context);
      }
      // finalize meta information
      root.helpers =3D new Set([...context.helpers.keys()]);
      root.components =3D [...context.components];
      root.directives =3D [...context.directives];
      root.imports =3D context.imports;
      root.hoists =3D context.hoists;
      root.temps =3D context.temps;
      root.cached =3D context.cached;
  }
  function createRootCodegen(root, context) {
      const { helper } =3D context;
      const { children } =3D root;
      if (children.length =3D=3D=3D 1) {
          const child =3D children[0];
          // if the single child is an element, turn it into a block.
          if (isSingleElementRoot(root, child) &amp;&amp; child.codegenNode=
) {
              // single element root is never hoisted so codegenNode will n=
ever be
              // SimpleExpressionNode
              const codegenNode =3D child.codegenNode;
              if (codegenNode.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */)=
 {
                  makeBlock(codegenNode, context);
              }
              root.codegenNode =3D codegenNode;
          }
          else {
              // - single &lt;slot/&gt;, IfNode, ForNode: already blocks.
              // - single text node: always patched.
              // root codegen falls through via genNode()
              root.codegenNode =3D child;
          }
      }
      else if (children.length &gt; 1) {
          // root has multiple nodes - return a fragment block.
          let patchFlag =3D 64 /* PatchFlags.STABLE_FRAGMENT */;
          let patchFlagText =3D PatchFlagNames[64 /* PatchFlags.STABLE_FRAG=
MENT */];
          // check if the fragment actually contains a single valid child w=
ith
          // the rest being comments
          if (children.filter(c =3D&gt; c.type !=3D=3D 3 /* NodeTypes.COMME=
NT */).length =3D=3D=3D 1) {
              patchFlag |=3D 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */;
              patchFlagText +=3D `, ${PatchFlagNames[2048 /* PatchFlags.DEV=
_ROOT_FRAGMENT */]}`;
          }
          root.codegenNode =3D createVNodeCall(context, helper(FRAGMENT), u=
ndefined, root.children, patchFlag + (` /* ${patchFlagText} */` ), undefine=
d, undefined, true, undefined, false /* isComponent */);
      }
      else ;
  }
  function traverseChildren(parent, context) {
      let i =3D 0;
      const nodeRemoved =3D () =3D&gt; {
          i--;
      };
      for (; i &lt; parent.children.length; i++) {
          const child =3D parent.children[i];
          if (isString(child))
              continue;
          context.parent =3D parent;
          context.childIndex =3D i;
          context.onNodeRemoved =3D nodeRemoved;
          traverseNode(child, context);
      }
  }
  function traverseNode(node, context) {
      context.currentNode =3D node;
      // apply transform plugins
      const { nodeTransforms } =3D context;
      const exitFns =3D [];
      for (let i =3D 0; i &lt; nodeTransforms.length; i++) {
          const onExit =3D nodeTransforms[i](node, context);
          if (onExit) {
              if (isArray(onExit)) {
                  exitFns.push(...onExit);
              }
              else {
                  exitFns.push(onExit);
              }
          }
          if (!context.currentNode) {
              // node was removed
              return;
          }
          else {
              // node may have been replaced
              node =3D context.currentNode;
          }
      }
      switch (node.type) {
          case 3 /* NodeTypes.COMMENT */:
              if (!context.ssr) {
                  // inject import for the Comment symbol, which is needed =
for creating
                  // comment nodes with `createVNode`
                  context.helper(CREATE_COMMENT);
              }
              break;
          case 5 /* NodeTypes.INTERPOLATION */:
              // no need to traverse, but we need to inject toString helper
              if (!context.ssr) {
                  context.helper(TO_DISPLAY_STRING);
              }
              break;
          // for container types, further traverse downwards
          case 9 /* NodeTypes.IF */:
              for (let i =3D 0; i &lt; node.branches.length; i++) {
                  traverseNode(node.branches[i], context);
              }
              break;
          case 10 /* NodeTypes.IF_BRANCH */:
          case 11 /* NodeTypes.FOR */:
          case 1 /* NodeTypes.ELEMENT */:
          case 0 /* NodeTypes.ROOT */:
              traverseChildren(node, context);
              break;
      }
      // exit transforms
      context.currentNode =3D node;
      let i =3D exitFns.length;
      while (i--) {
          exitFns[i]();
      }
  }
  function createStructuralDirectiveTransform(name, fn) {
      const matches =3D isString(name)
          ? (n) =3D&gt; n =3D=3D=3D name
          : (n) =3D&gt; name.test(n);
      return (node, context) =3D&gt; {
          if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
              const { props } =3D node;
              // structural directive transforms are not concerned with slo=
ts
              // as they are handled separately in vSlot.ts
              if (node.tagType =3D=3D=3D 3 /* ElementTypes.TEMPLATE */ &amp=
;&amp; props.some(isVSlot)) {
                  return;
              }
              const exitFns =3D [];
              for (let i =3D 0; i &lt; props.length; i++) {
                  const prop =3D props[i];
                  if (prop.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ &amp;=
&amp; matches(prop.name)) {
                      // structural directives are removed to avoid infinit=
e recursion
                      // also we remove them *before* applying so that it c=
an further
                      // traverse itself in case it moves the node around
                      props.splice(i, 1);
                      i--;
                      const onExit =3D fn(node, prop, context);
                      if (onExit)
                          exitFns.push(onExit);
                  }
              }
              return exitFns;
          }
      };
  }

  const PURE_ANNOTATION =3D `/*#__PURE__*/`;
  const aliasHelper =3D (s) =3D&gt; `${helperNameMap[s]}: _${helperNameMap[=
s]}`;
  function createCodegenContext(ast, { mode =3D 'function', prefixIdentifie=
rs =3D mode =3D=3D=3D 'module', sourceMap =3D false, filename =3D `template=
.vue.html`, scopeId =3D null, optimizeImports =3D false, runtimeGlobalName =
=3D `Vue`, runtimeModuleName =3D `vue`, ssrRuntimeModuleName =3D 'vue/serve=
r-renderer', ssr =3D false, isTS =3D false, inSSR =3D false }) {
      const context =3D {
          mode,
          prefixIdentifiers,
          sourceMap,
          filename,
          scopeId,
          optimizeImports,
          runtimeGlobalName,
          runtimeModuleName,
          ssrRuntimeModuleName,
          ssr,
          isTS,
          inSSR,
          source: ast.loc.source,
          code: ``,
          column: 1,
          line: 1,
          offset: 0,
          indentLevel: 0,
          pure: false,
          map: undefined,
          helper(key) {
              return `_${helperNameMap[key]}`;
          },
          push(code, node) {
              context.code +=3D code;
          },
          indent() {
              newline(++context.indentLevel);
          },
          deindent(withoutNewLine =3D false) {
              if (withoutNewLine) {
                  --context.indentLevel;
              }
              else {
                  newline(--context.indentLevel);
              }
          },
          newline() {
              newline(context.indentLevel);
          }
      };
      function newline(n) {
          context.push('\n' + `  `.repeat(n));
      }
      return context;
  }
  function generate(ast, options =3D {}) {
      const context =3D createCodegenContext(ast, options);
      if (options.onContextCreated)
          options.onContextCreated(context);
      const { mode, push, prefixIdentifiers, indent, deindent, newline, sco=
peId, ssr } =3D context;
      const helpers =3D Array.from(ast.helpers);
      const hasHelpers =3D helpers.length &gt; 0;
      const useWithBlock =3D !prefixIdentifiers &amp;&amp; mode !=3D=3D 'mo=
dule';
      const isSetupInlined =3D !true ;
      // preambles
      // in setup() inline mode, the preamble is generated in a sub context
      // and returned separately.
      const preambleContext =3D isSetupInlined
          ? createCodegenContext(ast, options)
          : context;
      {
          genFunctionPreamble(ast, preambleContext);
      }
      // enter render function
      const functionName =3D ssr ? `ssrRender` : `render`;
      const args =3D ssr ? ['_ctx', '_push', '_parent', '_attrs'] : ['_ctx'=
, '_cache'];
      const signature =3D args.join(', ');
      {
          push(`function ${functionName}(${signature}) {`);
      }
      indent();
      if (useWithBlock) {
          push(`with (_ctx) {`);
          indent();
          // function mode const declarations should be inside with block
          // also they should be renamed to avoid collision with user prope=
rties
          if (hasHelpers) {
              push(`const { ${helpers.map(aliasHelper).join(', ')} } =3D _V=
ue`);
              push(`\n`);
              newline();
          }
      }
      // generate asset resolution statements
      if (ast.components.length) {
          genAssets(ast.components, 'component', context);
          if (ast.directives.length || ast.temps &gt; 0) {
              newline();
          }
      }
      if (ast.directives.length) {
          genAssets(ast.directives, 'directive', context);
          if (ast.temps &gt; 0) {
              newline();
          }
      }
      if (ast.temps &gt; 0) {
          push(`let `);
          for (let i =3D 0; i &lt; ast.temps; i++) {
              push(`${i &gt; 0 ? `, ` : ``}_temp${i}`);
          }
      }
      if (ast.components.length || ast.directives.length || ast.temps) {
          push(`\n`);
          newline();
      }
      // generate the VNode tree expression
      if (!ssr) {
          push(`return `);
      }
      if (ast.codegenNode) {
          genNode(ast.codegenNode, context);
      }
      else {
          push(`null`);
      }
      if (useWithBlock) {
          deindent();
          push(`}`);
      }
      deindent();
      push(`}`);
      return {
          ast,
          code: context.code,
          preamble: isSetupInlined ? preambleContext.code : ``,
          // SourceMapGenerator does have toJSON() method but it's not in t=
he types
          map: context.map ? context.map.toJSON() : undefined
      };
  }
  function genFunctionPreamble(ast, context) {
      const { ssr, prefixIdentifiers, push, newline, runtimeModuleName, run=
timeGlobalName, ssrRuntimeModuleName } =3D context;
      const VueBinding =3D runtimeGlobalName;
      // Generate const declaration for helpers
      // In prefix mode, we place the const declaration at top so it's done
      // only once; But if we not prefixing, we place the declaration insid=
e the
      // with block so it doesn't incur the `in` check cost for every helpe=
r access.
      const helpers =3D Array.from(ast.helpers);
      if (helpers.length &gt; 0) {
          {
              // "with" mode.
              // save Vue in a separate variable to avoid collision
              push(`const _Vue =3D ${VueBinding}\n`);
              // in "with" mode, helpers are declared inside the with block=
 to avoid
              // has check cost, but hoists are lifted out of the function =
- we need
              // to provide the helper here.
              if (ast.hoists.length) {
                  const staticHelpers =3D [
                      CREATE_VNODE,
                      CREATE_ELEMENT_VNODE,
                      CREATE_COMMENT,
                      CREATE_TEXT,
                      CREATE_STATIC
                  ]
                      .filter(helper =3D&gt; helpers.includes(helper))
                      .map(aliasHelper)
                      .join(', ');
                  push(`const { ${staticHelpers} } =3D _Vue\n`);
              }
          }
      }
      genHoists(ast.hoists, context);
      newline();
      push(`return `);
  }
  function genAssets(assets, type, { helper, push, newline, isTS }) {
      const resolver =3D helper(type =3D=3D=3D 'component'
              ? RESOLVE_COMPONENT
              : RESOLVE_DIRECTIVE);
      for (let i =3D 0; i &lt; assets.length; i++) {
          let id =3D assets[i];
          // potential component implicit self-reference inferred from SFC =
filename
          const maybeSelfReference =3D id.endsWith('__self');
          if (maybeSelfReference) {
              id =3D id.slice(0, -6);
          }
          push(`const ${toValidAssetId(id, type)} =3D ${resolver}(${JSON.st=
ringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`);
          if (i &lt; assets.length - 1) {
              newline();
          }
      }
  }
  function genHoists(hoists, context) {
      if (!hoists.length) {
          return;
      }
      context.pure =3D true;
      const { push, newline, helper, scopeId, mode } =3D context;
      newline();
      for (let i =3D 0; i &lt; hoists.length; i++) {
          const exp =3D hoists[i];
          if (exp) {
              push(`const _hoisted_${i + 1} =3D ${``}`);
              genNode(exp, context);
              newline();
          }
      }
      context.pure =3D false;
  }
  function isText(n) {
      return (isString(n) ||
          n.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */ ||
          n.type =3D=3D=3D 2 /* NodeTypes.TEXT */ ||
          n.type =3D=3D=3D 5 /* NodeTypes.INTERPOLATION */ ||
          n.type =3D=3D=3D 8 /* NodeTypes.COMPOUND_EXPRESSION */);
  }
  function genNodeListAsArray(nodes, context) {
      const multilines =3D nodes.length &gt; 3 ||
          (nodes.some(n =3D&gt; isArray(n) || !isText(n)));
      context.push(`[`);
      multilines &amp;&amp; context.indent();
      genNodeList(nodes, context, multilines);
      multilines &amp;&amp; context.deindent();
      context.push(`]`);
  }
  function genNodeList(nodes, context, multilines =3D false, comma =3D true=
) {
      const { push, newline } =3D context;
      for (let i =3D 0; i &lt; nodes.length; i++) {
          const node =3D nodes[i];
          if (isString(node)) {
              push(node);
          }
          else if (isArray(node)) {
              genNodeListAsArray(node, context);
          }
          else {
              genNode(node, context);
          }
          if (i &lt; nodes.length - 1) {
              if (multilines) {
                  comma &amp;&amp; push(',');
                  newline();
              }
              else {
                  comma &amp;&amp; push(', ');
              }
          }
      }
  }
  function genNode(node, context) {
      if (isString(node)) {
          context.push(node);
          return;
      }
      if (isSymbol(node)) {
          context.push(context.helper(node));
          return;
      }
      switch (node.type) {
          case 1 /* NodeTypes.ELEMENT */:
          case 9 /* NodeTypes.IF */:
          case 11 /* NodeTypes.FOR */:
              assert(node.codegenNode !=3D null, `Codegen node is missing f=
or element/if/for node. ` +
                      `Apply appropriate transforms first.`);
              genNode(node.codegenNode, context);
              break;
          case 2 /* NodeTypes.TEXT */:
              genText(node, context);
              break;
          case 4 /* NodeTypes.SIMPLE_EXPRESSION */:
              genExpression(node, context);
              break;
          case 5 /* NodeTypes.INTERPOLATION */:
              genInterpolation(node, context);
              break;
          case 12 /* NodeTypes.TEXT_CALL */:
              genNode(node.codegenNode, context);
              break;
          case 8 /* NodeTypes.COMPOUND_EXPRESSION */:
              genCompoundExpression(node, context);
              break;
          case 3 /* NodeTypes.COMMENT */:
              genComment(node, context);
              break;
          case 13 /* NodeTypes.VNODE_CALL */:
              genVNodeCall(node, context);
              break;
          case 14 /* NodeTypes.JS_CALL_EXPRESSION */:
              genCallExpression(node, context);
              break;
          case 15 /* NodeTypes.JS_OBJECT_EXPRESSION */:
              genObjectExpression(node, context);
              break;
          case 17 /* NodeTypes.JS_ARRAY_EXPRESSION */:
              genArrayExpression(node, context);
              break;
          case 18 /* NodeTypes.JS_FUNCTION_EXPRESSION */:
              genFunctionExpression(node, context);
              break;
          case 19 /* NodeTypes.JS_CONDITIONAL_EXPRESSION */:
              genConditionalExpression(node, context);
              break;
          case 20 /* NodeTypes.JS_CACHE_EXPRESSION */:
              genCacheExpression(node, context);
              break;
          case 21 /* NodeTypes.JS_BLOCK_STATEMENT */:
              genNodeList(node.body, context, true, false);
              break;
          // SSR only types
          case 22 /* NodeTypes.JS_TEMPLATE_LITERAL */:
              break;
          case 23 /* NodeTypes.JS_IF_STATEMENT */:
              break;
          case 24 /* NodeTypes.JS_ASSIGNMENT_EXPRESSION */:
              break;
          case 25 /* NodeTypes.JS_SEQUENCE_EXPRESSION */:
              break;
          case 26 /* NodeTypes.JS_RETURN_STATEMENT */:
              break;
          /* istanbul ignore next */
          case 10 /* NodeTypes.IF_BRANCH */:
              // noop
              break;
          default:
              {
                  assert(false, `unhandled codegen node type: ${node.type}`=
);
                  // make sure we exhaust all possible types
                  const exhaustiveCheck =3D node;
                  return exhaustiveCheck;
              }
      }
  }
  function genText(node, context) {
      context.push(JSON.stringify(node.content), node);
  }
  function genExpression(node, context) {
      const { content, isStatic } =3D node;
      context.push(isStatic ? JSON.stringify(content) : content, node);
  }
  function genInterpolation(node, context) {
      const { push, helper, pure } =3D context;
      if (pure)
          push(PURE_ANNOTATION);
      push(`${helper(TO_DISPLAY_STRING)}(`);
      genNode(node.content, context);
      push(`)`);
  }
  function genCompoundExpression(node, context) {
      for (let i =3D 0; i &lt; node.children.length; i++) {
          const child =3D node.children[i];
          if (isString(child)) {
              context.push(child);
          }
          else {
              genNode(child, context);
          }
      }
  }
  function genExpressionAsPropertyKey(node, context) {
      const { push } =3D context;
      if (node.type =3D=3D=3D 8 /* NodeTypes.COMPOUND_EXPRESSION */) {
          push(`[`);
          genCompoundExpression(node, context);
          push(`]`);
      }
      else if (node.isStatic) {
          // only quote keys if necessary
          const text =3D isSimpleIdentifier(node.content)
              ? node.content
              : JSON.stringify(node.content);
          push(text, node);
      }
      else {
          push(`[${node.content}]`, node);
      }
  }
  function genComment(node, context) {
      const { push, helper, pure } =3D context;
      if (pure) {
          push(PURE_ANNOTATION);
      }
      push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, no=
de);
  }
  function genVNodeCall(node, context) {
      const { push, helper, pure } =3D context;
      const { tag, props, children, patchFlag, dynamicProps, directives, is=
Block, disableTracking, isComponent } =3D node;
      if (directives) {
          push(helper(WITH_DIRECTIVES) + `(`);
      }
      if (isBlock) {
          push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `=
);
      }
      if (pure) {
          push(PURE_ANNOTATION);
      }
      const callHelper =3D isBlock
          ? getVNodeBlockHelper(context.inSSR, isComponent)
          : getVNodeHelper(context.inSSR, isComponent);
      push(helper(callHelper) + `(`, node);
      genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamic=
Props]), context);
      push(`)`);
      if (isBlock) {
          push(`)`);
      }
      if (directives) {
          push(`, `);
          genNode(directives, context);
          push(`)`);
      }
  }
  function genNullableArgs(args) {
      let i =3D args.length;
      while (i--) {
          if (args[i] !=3D null)
              break;
      }
      return args.slice(0, i + 1).map(arg =3D&gt; arg || `null`);
  }
  // JavaScript
  function genCallExpression(node, context) {
      const { push, helper, pure } =3D context;
      const callee =3D isString(node.callee) ? node.callee : helper(node.ca=
llee);
      if (pure) {
          push(PURE_ANNOTATION);
      }
      push(callee + `(`, node);
      genNodeList(node.arguments, context);
      push(`)`);
  }
  function genObjectExpression(node, context) {
      const { push, indent, deindent, newline } =3D context;
      const { properties } =3D node;
      if (!properties.length) {
          push(`{}`, node);
          return;
      }
      const multilines =3D properties.length &gt; 1 ||
          (properties.some(p =3D&gt; p.value.type !=3D=3D 4 /* NodeTypes.SI=
MPLE_EXPRESSION */));
      push(multilines ? `{` : `{ `);
      multilines &amp;&amp; indent();
      for (let i =3D 0; i &lt; properties.length; i++) {
          const { key, value } =3D properties[i];
          // key
          genExpressionAsPropertyKey(key, context);
          push(`: `);
          // value
          genNode(value, context);
          if (i &lt; properties.length - 1) {
              // will only reach this if it's multilines
              push(`,`);
              newline();
          }
      }
      multilines &amp;&amp; deindent();
      push(multilines ? `}` : ` }`);
  }
  function genArrayExpression(node, context) {
      genNodeListAsArray(node.elements, context);
  }
  function genFunctionExpression(node, context) {
      const { push, indent, deindent } =3D context;
      const { params, returns, body, newline, isSlot } =3D node;
      if (isSlot) {
          // wrap slot functions with owner context
          push(`_${helperNameMap[WITH_CTX]}(`);
      }
      push(`(`, node);
      if (isArray(params)) {
          genNodeList(params, context);
      }
      else if (params) {
          genNode(params, context);
      }
      push(`) =3D&gt; `);
      if (newline || body) {
          push(`{`);
          indent();
      }
      if (returns) {
          if (newline) {
              push(`return `);
          }
          if (isArray(returns)) {
              genNodeListAsArray(returns, context);
          }
          else {
              genNode(returns, context);
          }
      }
      else if (body) {
          genNode(body, context);
      }
      if (newline || body) {
          deindent();
          push(`}`);
      }
      if (isSlot) {
          push(`)`);
      }
  }
  function genConditionalExpression(node, context) {
      const { test, consequent, alternate, newline: needNewline } =3D node;
      const { push, indent, deindent, newline } =3D context;
      if (test.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
          const needsParens =3D !isSimpleIdentifier(test.content);
          needsParens &amp;&amp; push(`(`);
          genExpression(test, context);
          needsParens &amp;&amp; push(`)`);
      }
      else {
          push(`(`);
          genNode(test, context);
          push(`)`);
      }
      needNewline &amp;&amp; indent();
      context.indentLevel++;
      needNewline || push(` `);
      push(`? `);
      genNode(consequent, context);
      context.indentLevel--;
      needNewline &amp;&amp; newline();
      needNewline || push(` `);
      push(`: `);
      const isNested =3D alternate.type =3D=3D=3D 19 /* NodeTypes.JS_CONDIT=
IONAL_EXPRESSION */;
      if (!isNested) {
          context.indentLevel++;
      }
      genNode(alternate, context);
      if (!isNested) {
          context.indentLevel--;
      }
      needNewline &amp;&amp; deindent(true /* without newline */);
  }
  function genCacheExpression(node, context) {
      const { push, helper, indent, deindent, newline } =3D context;
      push(`_cache[${node.index}] || (`);
      if (node.isVNode) {
          indent();
          push(`${helper(SET_BLOCK_TRACKING)}(-1),`);
          newline();
      }
      push(`_cache[${node.index}] =3D `);
      genNode(node.value, context);
      if (node.isVNode) {
          push(`,`);
          newline();
          push(`${helper(SET_BLOCK_TRACKING)}(1),`);
          newline();
          push(`_cache[${node.index}]`);
          deindent();
      }
      push(`)`);
  }

  // these keywords should not appear inside expressions, but operators lik=
e
  // 'typeof', 'instanceof', and 'in' are allowed
  const prohibitedKeywordRE =3D new RegExp('\\b' +
      ('arguments,await,break,case,catch,class,const,continue,debugger,defa=
ult,' +
          'delete,do,else,export,extends,finally,for,function,if,import,let=
,new,' +
          'return,super,switch,throw,try,var,void,while,with,yield')
          .split(',')
          .join('\\b|\\b') +
      '\\b');
  // strip strings in expressions
  const stripStringRE =3D /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\=
\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
  /**
   * Validate a non-prefixed expression.
   * This is only called when using the in-browser runtime compiler since i=
t
   * doesn't prefix expressions.
   */
  function validateBrowserExpression(node, context, asParams =3D false, asR=
awStatements =3D false) {
      const exp =3D node.content;
      // empty expressions are validated per-directive since some directive=
s
      // do allow empty expressions.
      if (!exp.trim()) {
          return;
      }
      try {
          new Function(asRawStatements
              ? ` ${exp} `
              : `return ${asParams ? `(${exp}) =3D&gt; {}` : `(${exp})`}`);
      }
      catch (e) {
          let message =3D e.message;
          const keywordMatch =3D exp
              .replace(stripStringRE, '')
              .match(prohibitedKeywordRE);
          if (keywordMatch) {
              message =3D `avoid using JavaScript keyword as property name:=
 "${keywordMatch[0]}"`;
          }
          context.onError(createCompilerError(45 /* ErrorCodes.X_INVALID_EX=
PRESSION */, node.loc, undefined, message));
      }
  }

  const transformExpression =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 5 /* NodeTypes.INTERPOLATION */) {
          node.content =3D processExpression(node.content, context);
      }
      else if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
          // handle directives on element
          for (let i =3D 0; i &lt; node.props.length; i++) {
              const dir =3D node.props[i];
              // do not process for v-on &amp; v-for since they are special=
 handled
              if (dir.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ &amp;&amp;=
 dir.name !=3D=3D 'for') {
                  const exp =3D dir.exp;
                  const arg =3D dir.arg;
                  // do not process exp if this is v-on:arg - we need speci=
al handling
                  // for wrapping inline statements.
                  if (exp &amp;&amp;
                      exp.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION *=
/ &amp;&amp;
                      !(dir.name =3D=3D=3D 'on' &amp;&amp; arg)) {
                      dir.exp =3D processExpression(exp, context,=20
                      // slot args must be processed as function params
                      dir.name =3D=3D=3D 'slot');
                  }
                  if (arg &amp;&amp; arg.type =3D=3D=3D 4 /* NodeTypes.SIMP=
LE_EXPRESSION */ &amp;&amp; !arg.isStatic) {
                      dir.arg =3D processExpression(arg, context);
                  }
              }
          }
      }
  };
  // Important: since this function uses Node.js only dependencies, it shou=
ld
  // always be used with a leading !true check so that it can be
  // tree-shaken from the browser build.
  function processExpression(node, context,=20
  // some expressions like v-slot props &amp; v-for aliases should be parse=
d as
  // function params
  asParams =3D false,=20
  // v-on handler values may contain multiple statements
  asRawStatements =3D false, localVars =3D Object.create(context.identifier=
s)) {
      {
          {
              // simple in-browser validation (same logic in 2.x)
              validateBrowserExpression(node, context, asParams, asRawState=
ments);
          }
          return node;
      }
  }

  const transformIf =3D createStructuralDirectiveTransform(/^(if|else|else-=
if)$/, (node, dir, context) =3D&gt; {
      return processIf(node, dir, context, (ifNode, branch, isRoot) =3D&gt;=
 {
          // #1587: We need to dynamically increment the key based on the c=
urrent
          // node's sibling nodes, since chained v-if/else branches are
          // rendered at the same depth
          const siblings =3D context.parent.children;
          let i =3D siblings.indexOf(ifNode);
          let key =3D 0;
          while (i-- &gt;=3D 0) {
              const sibling =3D siblings[i];
              if (sibling &amp;&amp; sibling.type =3D=3D=3D 9 /* NodeTypes.=
IF */) {
                  key +=3D sibling.branches.length;
              }
          }
          // Exit callback. Complete the codegenNode when all children have=
 been
          // transformed.
          return () =3D&gt; {
              if (isRoot) {
                  ifNode.codegenNode =3D createCodegenNodeForBranch(branch,=
 key, context);
              }
              else {
                  // attach this branch's codegen node to the v-if root.
                  const parentCondition =3D getParentCondition(ifNode.codeg=
enNode);
                  parentCondition.alternate =3D createCodegenNodeForBranch(=
branch, key + ifNode.branches.length - 1, context);
              }
          };
      });
  });
  // target-agnostic transform used for both Client and SSR
  function processIf(node, dir, context, processCodegen) {
      if (dir.name !=3D=3D 'else' &amp;&amp;
          (!dir.exp || !dir.exp.content.trim())) {
          const loc =3D dir.exp ? dir.exp.loc : node.loc;
          context.onError(createCompilerError(28 /* ErrorCodes.X_V_IF_NO_EX=
PRESSION */, dir.loc));
          dir.exp =3D createSimpleExpression(`true`, false, loc);
      }
      if (dir.exp) {
          validateBrowserExpression(dir.exp, context);
      }
      if (dir.name =3D=3D=3D 'if') {
          const branch =3D createIfBranch(node, dir);
          const ifNode =3D {
              type: 9 /* NodeTypes.IF */,
              loc: node.loc,
              branches: [branch]
          };
          context.replaceNode(ifNode);
          if (processCodegen) {
              return processCodegen(ifNode, branch, true);
          }
      }
      else {
          // locate the adjacent v-if
          const siblings =3D context.parent.children;
          const comments =3D [];
          let i =3D siblings.indexOf(node);
          while (i-- &gt;=3D -1) {
              const sibling =3D siblings[i];
              if (sibling &amp;&amp; sibling.type =3D=3D=3D 3 /* NodeTypes.=
COMMENT */) {
                  context.removeNode(sibling);
                  comments.unshift(sibling);
                  continue;
              }
              if (sibling &amp;&amp;
                  sibling.type =3D=3D=3D 2 /* NodeTypes.TEXT */ &amp;&amp;
                  !sibling.content.trim().length) {
                  context.removeNode(sibling);
                  continue;
              }
              if (sibling &amp;&amp; sibling.type =3D=3D=3D 9 /* NodeTypes.=
IF */) {
                  // Check if v-else was followed by v-else-if
                  if (dir.name =3D=3D=3D 'else-if' &amp;&amp;
                      sibling.branches[sibling.branches.length - 1].conditi=
on =3D=3D=3D undefined) {
                      context.onError(createCompilerError(30 /* ErrorCodes.=
X_V_ELSE_NO_ADJACENT_IF */, node.loc));
                  }
                  // move the node to the if node's branches
                  context.removeNode();
                  const branch =3D createIfBranch(node, dir);
                  if (comments.length &amp;&amp;
                      // #3619 ignore comments if the v-if is direct child =
of &lt;transition&gt;
                      !(context.parent &amp;&amp;
                          context.parent.type =3D=3D=3D 1 /* NodeTypes.ELEM=
ENT */ &amp;&amp;
                          isBuiltInType(context.parent.tag, 'transition')))=
 {
                      branch.children =3D [...comments, ...branch.children]=
;
                  }
                  // check if user is forcing same key on different branche=
s
                  {
                      const key =3D branch.userKey;
                      if (key) {
                          sibling.branches.forEach(({ userKey }) =3D&gt; {
                              if (isSameKey(userKey, key)) {
                                  context.onError(createCompilerError(29 /*=
 ErrorCodes.X_V_IF_SAME_KEY */, branch.userKey.loc));
                              }
                          });
                      }
                  }
                  sibling.branches.push(branch);
                  const onExit =3D processCodegen &amp;&amp; processCodegen=
(sibling, branch, false);
                  // since the branch was removed, it will not be traversed=
.
                  // make sure to traverse here.
                  traverseNode(branch, context);
                  // call on exit
                  if (onExit)
                      onExit();
                  // make sure to reset currentNode after traversal to indi=
cate this
                  // node has been removed.
                  context.currentNode =3D null;
              }
              else {
                  context.onError(createCompilerError(30 /* ErrorCodes.X_V_=
ELSE_NO_ADJACENT_IF */, node.loc));
              }
              break;
          }
      }
  }
  function createIfBranch(node, dir) {
      const isTemplateIf =3D node.tagType =3D=3D=3D 3 /* ElementTypes.TEMPL=
ATE */;
      return {
          type: 10 /* NodeTypes.IF_BRANCH */,
          loc: node.loc,
          condition: dir.name =3D=3D=3D 'else' ? undefined : dir.exp,
          children: isTemplateIf &amp;&amp; !findDir(node, 'for') ? node.ch=
ildren : [node],
          userKey: findProp(node, `key`),
          isTemplateIf
      };
  }
  function createCodegenNodeForBranch(branch, keyIndex, context) {
      if (branch.condition) {
          return createConditionalExpression(branch.condition, createChildr=
enCodegenNode(branch, keyIndex, context),=20
          // make sure to pass in asBlock: true so that the comment node ca=
ll
          // closes the current block.
          createCallExpression(context.helper(CREATE_COMMENT), [
              '"v-if"' ,
              'true'
          ]));
      }
      else {
          return createChildrenCodegenNode(branch, keyIndex, context);
      }
  }
  function createChildrenCodegenNode(branch, keyIndex, context) {
      const { helper } =3D context;
      const keyProperty =3D createObjectProperty(`key`, createSimpleExpress=
ion(`${keyIndex}`, false, locStub, 2 /* ConstantTypes.CAN_HOIST */));
      const { children } =3D branch;
      const firstChild =3D children[0];
      const needFragmentWrapper =3D children.length !=3D=3D 1 || firstChild=
.type !=3D=3D 1 /* NodeTypes.ELEMENT */;
      if (needFragmentWrapper) {
          if (children.length =3D=3D=3D 1 &amp;&amp; firstChild.type =3D=3D=
=3D 11 /* NodeTypes.FOR */) {
              // optimize away nested fragments when child is a ForNode
              const vnodeCall =3D firstChild.codegenNode;
              injectProp(vnodeCall, keyProperty, context);
              return vnodeCall;
          }
          else {
              let patchFlag =3D 64 /* PatchFlags.STABLE_FRAGMENT */;
              let patchFlagText =3D PatchFlagNames[64 /* PatchFlags.STABLE_=
FRAGMENT */];
              // check if the fragment actually contains a single valid chi=
ld with
              // the rest being comments
              if (!branch.isTemplateIf &amp;&amp;
                  children.filter(c =3D&gt; c.type !=3D=3D 3 /* NodeTypes.C=
OMMENT */).length =3D=3D=3D 1) {
                  patchFlag |=3D 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */;
                  patchFlagText +=3D `, ${PatchFlagNames[2048 /* PatchFlags=
.DEV_ROOT_FRAGMENT */]}`;
              }
              return createVNodeCall(context, helper(FRAGMENT), createObjec=
tExpression([keyProperty]), children, patchFlag + (` /* ${patchFlagText} */=
` ), undefined, undefined, true, false, false /* isComponent */, branch.loc=
);
          }
      }
      else {
          const ret =3D firstChild.codegenNode;
          const vnodeCall =3D getMemoedVNodeCall(ret);
          // Change createVNode to createBlock.
          if (vnodeCall.type =3D=3D=3D 13 /* NodeTypes.VNODE_CALL */) {
              makeBlock(vnodeCall, context);
          }
          // inject branch key
          injectProp(vnodeCall, keyProperty, context);
          return ret;
      }
  }
  function isSameKey(a, b) {
      if (!a || a.type !=3D=3D b.type) {
          return false;
      }
      if (a.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */) {
          if (a.value.content !=3D=3D b.value.content) {
              return false;
          }
      }
      else {
          // directive
          const exp =3D a.exp;
          const branchExp =3D b.exp;
          if (exp.type !=3D=3D branchExp.type) {
              return false;
          }
          if (exp.type !=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */ ||
              exp.isStatic !=3D=3D branchExp.isStatic ||
              exp.content !=3D=3D branchExp.content) {
              return false;
          }
      }
      return true;
  }
  function getParentCondition(node) {
      while (true) {
          if (node.type =3D=3D=3D 19 /* NodeTypes.JS_CONDITIONAL_EXPRESSION=
 */) {
              if (node.alternate.type =3D=3D=3D 19 /* NodeTypes.JS_CONDITIO=
NAL_EXPRESSION */) {
                  node =3D node.alternate;
              }
              else {
                  return node;
              }
          }
          else if (node.type =3D=3D=3D 20 /* NodeTypes.JS_CACHE_EXPRESSION =
*/) {
              node =3D node.value;
          }
      }
  }

  const transformFor =3D createStructuralDirectiveTransform('for', (node, d=
ir, context) =3D&gt; {
      const { helper, removeHelper } =3D context;
      return processFor(node, dir, context, forNode =3D&gt; {
          // create the loop render function expression now, and add the
          // iterator on exit after all children have been traversed
          const renderExp =3D createCallExpression(helper(RENDER_LIST), [
              forNode.source
          ]);
          const isTemplate =3D isTemplateNode(node);
          const memo =3D findDir(node, 'memo');
          const keyProp =3D findProp(node, `key`);
          const keyExp =3D keyProp &amp;&amp;
              (keyProp.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */
                  ? createSimpleExpression(keyProp.value.content, true)
                  : keyProp.exp);
          const keyProperty =3D keyProp ? createObjectProperty(`key`, keyEx=
p) : null;
          const isStableFragment =3D forNode.source.type =3D=3D=3D 4 /* Nod=
eTypes.SIMPLE_EXPRESSION */ &amp;&amp;
              forNode.source.constType &gt; 0 /* ConstantTypes.NOT_CONSTANT=
 */;
          const fragmentFlag =3D isStableFragment
              ? 64 /* PatchFlags.STABLE_FRAGMENT */
              : keyProp
                  ? 128 /* PatchFlags.KEYED_FRAGMENT */
                  : 256 /* PatchFlags.UNKEYED_FRAGMENT */;
          forNode.codegenNode =3D createVNodeCall(context, helper(FRAGMENT)=
, undefined, renderExp, fragmentFlag +
              (` /* ${PatchFlagNames[fragmentFlag]} */` ), undefined, undef=
ined, true /* isBlock */, !isStableFragment /* disableTracking */, false /*=
 isComponent */, node.loc);
          return () =3D&gt; {
              // finish the codegen now that all children have been travers=
ed
              let childBlock;
              const { children } =3D forNode;
              // check &lt;template v-for&gt; key placement
              if (isTemplate) {
                  node.children.some(c =3D&gt; {
                      if (c.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
                          const key =3D findProp(c, 'key');
                          if (key) {
                              context.onError(createCompilerError(33 /* Err=
orCodes.X_V_FOR_TEMPLATE_KEY_PLACEMENT */, key.loc));
                              return true;
                          }
                      }
                  });
              }
              const needFragmentWrapper =3D children.length !=3D=3D 1 || ch=
ildren[0].type !=3D=3D 1 /* NodeTypes.ELEMENT */;
              const slotOutlet =3D isSlotOutlet(node)
                  ? node
                  : isTemplate &amp;&amp;
                      node.children.length =3D=3D=3D 1 &amp;&amp;
                      isSlotOutlet(node.children[0])
                      ? node.children[0] // api-extractor somehow fails to =
infer this
                      : null;
              if (slotOutlet) {
                  // &lt;slot v-for=3D"..."&gt; or &lt;template v-for=3D"..=
."&gt;&lt;slot/&gt;&lt;/template&gt;
                  childBlock =3D slotOutlet.codegenNode;
                  if (isTemplate &amp;&amp; keyProperty) {
                      // &lt;template v-for=3D"..." :key=3D"..."&gt;&lt;slo=
t/&gt;&lt;/template&gt;
                      // we need to inject the key to the renderSlot() call=
.
                      // the props for renderSlot is passed as the 3rd argu=
ment.
                      injectProp(childBlock, keyProperty, context);
                  }
              }
              else if (needFragmentWrapper) {
                  // &lt;template v-for=3D"..."&gt; with text or multi-elem=
ents
                  // should generate a fragment block for each loop
                  childBlock =3D createVNodeCall(context, helper(FRAGMENT),=
 keyProperty ? createObjectExpression([keyProperty]) : undefined, node.chil=
dren, 64 /* PatchFlags.STABLE_FRAGMENT */ +
                      (` /* ${PatchFlagNames[64 /* PatchFlags.STABLE_FRAGME=
NT */]} */`
                          ), undefined, undefined, true, undefined, false /=
* isComponent */);
              }
              else {
                  // Normal element v-for. Directly use the child's codegen=
Node
                  // but mark it as a block.
                  childBlock =3D children[0]
                      .codegenNode;
                  if (isTemplate &amp;&amp; keyProperty) {
                      injectProp(childBlock, keyProperty, context);
                  }
                  if (childBlock.isBlock !=3D=3D !isStableFragment) {
                      if (childBlock.isBlock) {
                          // switch from block to vnode
                          removeHelper(OPEN_BLOCK);
                          removeHelper(getVNodeBlockHelper(context.inSSR, c=
hildBlock.isComponent));
                      }
                      else {
                          // switch from vnode to block
                          removeHelper(getVNodeHelper(context.inSSR, childB=
lock.isComponent));
                      }
                  }
                  childBlock.isBlock =3D !isStableFragment;
                  if (childBlock.isBlock) {
                      helper(OPEN_BLOCK);
                      helper(getVNodeBlockHelper(context.inSSR, childBlock.=
isComponent));
                  }
                  else {
                      helper(getVNodeHelper(context.inSSR, childBlock.isCom=
ponent));
                  }
              }
              if (memo) {
                  const loop =3D createFunctionExpression(createForLoopPara=
ms(forNode.parseResult, [
                      createSimpleExpression(`_cached`)
                  ]));
                  loop.body =3D createBlockStatement([
                      createCompoundExpression([`const _memo =3D (`, memo.e=
xp, `)`]),
                      createCompoundExpression([
                          `if (_cached`,
                          ...(keyExp ? [` &amp;&amp; _cached.key =3D=3D=3D =
`, keyExp] : []),
                          ` &amp;&amp; ${context.helperString(IS_MEMO_SAME)=
}(_cached, _memo)) return _cached`
                      ]),
                      createCompoundExpression([`const _item =3D `, childBl=
ock]),
                      createSimpleExpression(`_item.memo =3D _memo`),
                      createSimpleExpression(`return _item`)
                  ]);
                  renderExp.arguments.push(loop, createSimpleExpression(`_c=
ache`), createSimpleExpression(String(context.cached++)));
              }
              else {
                  renderExp.arguments.push(createFunctionExpression(createF=
orLoopParams(forNode.parseResult), childBlock, true /* force newline */));
              }
          };
      });
  });
  // target-agnostic transform used for both Client and SSR
  function processFor(node, dir, context, processCodegen) {
      if (!dir.exp) {
          context.onError(createCompilerError(31 /* ErrorCodes.X_V_FOR_NO_E=
XPRESSION */, dir.loc));
          return;
      }
      const parseResult =3D parseForExpression(
      // can only be simple expression because vFor transform is applied
      // before expression transform.
      dir.exp, context);
      if (!parseResult) {
          context.onError(createCompilerError(32 /* ErrorCodes.X_V_FOR_MALF=
ORMED_EXPRESSION */, dir.loc));
          return;
      }
      const { addIdentifiers, removeIdentifiers, scopes } =3D context;
      const { source, value, key, index } =3D parseResult;
      const forNode =3D {
          type: 11 /* NodeTypes.FOR */,
          loc: dir.loc,
          source,
          valueAlias: value,
          keyAlias: key,
          objectIndexAlias: index,
          parseResult,
          children: isTemplateNode(node) ? node.children : [node]
      };
      context.replaceNode(forNode);
      // bookkeeping
      scopes.vFor++;
      const onExit =3D processCodegen &amp;&amp; processCodegen(forNode);
      return () =3D&gt; {
          scopes.vFor--;
          if (onExit)
              onExit();
      };
  }
  const forAliasRE =3D /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  // This regex doesn't cover the case if key or index aliases have destruc=
turing,
  // but those do not make sense in the first place, so this works in pract=
ice.
  const forIteratorRE =3D /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  const stripParensRE =3D /^\(|\)$/g;
  function parseForExpression(input, context) {
      const loc =3D input.loc;
      const exp =3D input.content;
      const inMatch =3D exp.match(forAliasRE);
      if (!inMatch)
          return;
      const [, LHS, RHS] =3D inMatch;
      const result =3D {
          source: createAliasExpression(loc, RHS.trim(), exp.indexOf(RHS, L=
HS.length)),
          value: undefined,
          key: undefined,
          index: undefined
      };
      {
          validateBrowserExpression(result.source, context);
      }
      let valueContent =3D LHS.trim().replace(stripParensRE, '').trim();
      const trimmedOffset =3D LHS.indexOf(valueContent);
      const iteratorMatch =3D valueContent.match(forIteratorRE);
      if (iteratorMatch) {
          valueContent =3D valueContent.replace(forIteratorRE, '').trim();
          const keyContent =3D iteratorMatch[1].trim();
          let keyOffset;
          if (keyContent) {
              keyOffset =3D exp.indexOf(keyContent, trimmedOffset + valueCo=
ntent.length);
              result.key =3D createAliasExpression(loc, keyContent, keyOffs=
et);
              {
                  validateBrowserExpression(result.key, context, true);
              }
          }
          if (iteratorMatch[2]) {
              const indexContent =3D iteratorMatch[2].trim();
              if (indexContent) {
                  result.index =3D createAliasExpression(loc, indexContent,=
 exp.indexOf(indexContent, result.key
                      ? keyOffset + keyContent.length
                      : trimmedOffset + valueContent.length));
                  {
                      validateBrowserExpression(result.index, context, true=
);
                  }
              }
          }
      }
      if (valueContent) {
          result.value =3D createAliasExpression(loc, valueContent, trimmed=
Offset);
          {
              validateBrowserExpression(result.value, context, true);
          }
      }
      return result;
  }
  function createAliasExpression(range, content, offset) {
      return createSimpleExpression(content, false, getInnerRange(range, of=
fset, content.length));
  }
  function createForLoopParams({ value, key, index }, memoArgs =3D []) {
      return createParamsList([value, key, index, ...memoArgs]);
  }
  function createParamsList(args) {
      let i =3D args.length;
      while (i--) {
          if (args[i])
              break;
      }
      return args
          .slice(0, i + 1)
          .map((arg, i) =3D&gt; arg || createSimpleExpression(`_`.repeat(i =
+ 1), false));
  }

  const defaultFallback =3D createSimpleExpression(`undefined`, false);
  // A NodeTransform that:
  // 1. Tracks scope identifiers for scoped slots so that they don't get pr=
efixed
  //    by transformExpression. This is only applied in non-browser builds =
with
  //    { prefixIdentifiers: true }.
  // 2. Track v-slot depths so that we know a slot is inside another slot.
  //    Note the exit callback is executed before buildSlots() on the same =
node,
  //    so only nested slots see positive numbers.
  const trackSlotScopes =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
          (node.tagType =3D=3D=3D 1 /* ElementTypes.COMPONENT */ ||
              node.tagType =3D=3D=3D 3 /* ElementTypes.TEMPLATE */)) {
          // We are only checking non-empty v-slot here
          // since we only care about slots that introduce scope variables.
          const vSlot =3D findDir(node, 'slot');
          if (vSlot) {
              vSlot.exp;
              context.scopes.vSlot++;
              return () =3D&gt; {
                  context.scopes.vSlot--;
              };
          }
      }
  };
  const buildClientSlotFn =3D (props, children, loc) =3D&gt; createFunction=
Expression(props, children, false /* newline */, true /* isSlot */, childre=
n.length ? children[0].loc : loc);
  // Instead of being a DirectiveTransform, v-slot processing is called dur=
ing
  // transformElement to build the slots object for a component.
  function buildSlots(node, context, buildSlotFn =3D buildClientSlotFn) {
      context.helper(WITH_CTX);
      const { children, loc } =3D node;
      const slotsProperties =3D [];
      const dynamicSlots =3D [];
      // If the slot is inside a v-for or another v-slot, force it to be dy=
namic
      // since it likely uses a scope variable.
      let hasDynamicSlots =3D context.scopes.vSlot &gt; 0 || context.scopes=
.vFor &gt; 0;
      // 1. Check for slot with slotProps on component itself.
      //    &lt;Comp v-slot=3D"{ prop }"/&gt;
      const onComponentSlot =3D findDir(node, 'slot', true);
      if (onComponentSlot) {
          const { arg, exp } =3D onComponentSlot;
          if (arg &amp;&amp; !isStaticExp(arg)) {
              hasDynamicSlots =3D true;
          }
          slotsProperties.push(createObjectProperty(arg || createSimpleExpr=
ession('default', true), buildSlotFn(exp, children, loc)));
      }
      // 2. Iterate through children and check for template slots
      //    &lt;template v-slot:foo=3D"{ prop }"&gt;
      let hasTemplateSlots =3D false;
      let hasNamedDefaultSlot =3D false;
      const implicitDefaultChildren =3D [];
      const seenSlotNames =3D new Set();
      let conditionalBranchIndex =3D 0;
      for (let i =3D 0; i &lt; children.length; i++) {
          const slotElement =3D children[i];
          let slotDir;
          if (!isTemplateNode(slotElement) ||
              !(slotDir =3D findDir(slotElement, 'slot', true))) {
              // not a &lt;template v-slot&gt;, skip.
              if (slotElement.type !=3D=3D 3 /* NodeTypes.COMMENT */) {
                  implicitDefaultChildren.push(slotElement);
              }
              continue;
          }
          if (onComponentSlot) {
              // already has on-component slot - this is incorrect usage.
              context.onError(createCompilerError(37 /* ErrorCodes.X_V_SLOT=
_MIXED_SLOT_USAGE */, slotDir.loc));
              break;
          }
          hasTemplateSlots =3D true;
          const { children: slotChildren, loc: slotLoc } =3D slotElement;
          const { arg: slotName =3D createSimpleExpression(`default`, true)=
, exp: slotProps, loc: dirLoc } =3D slotDir;
          // check if name is dynamic.
          let staticSlotName;
          if (isStaticExp(slotName)) {
              staticSlotName =3D slotName ? slotName.content : `default`;
          }
          else {
              hasDynamicSlots =3D true;
          }
          const slotFunction =3D buildSlotFn(slotProps, slotChildren, slotL=
oc);
          // check if this slot is conditional (v-if/v-for)
          let vIf;
          let vElse;
          let vFor;
          if ((vIf =3D findDir(slotElement, 'if'))) {
              hasDynamicSlots =3D true;
              dynamicSlots.push(createConditionalExpression(vIf.exp, buildD=
ynamicSlot(slotName, slotFunction, conditionalBranchIndex++), defaultFallba=
ck));
          }
          else if ((vElse =3D findDir(slotElement, /^else(-if)?$/, true /* =
allowEmpty */))) {
              // find adjacent v-if
              let j =3D i;
              let prev;
              while (j--) {
                  prev =3D children[j];
                  if (prev.type !=3D=3D 3 /* NodeTypes.COMMENT */) {
                      break;
                  }
              }
              if (prev &amp;&amp; isTemplateNode(prev) &amp;&amp; findDir(p=
rev, 'if')) {
                  // remove node
                  children.splice(i, 1);
                  i--;
                  // attach this slot to previous conditional
                  let conditional =3D dynamicSlots[dynamicSlots.length - 1]=
;
                  while (conditional.alternate.type =3D=3D=3D 19 /* NodeTyp=
es.JS_CONDITIONAL_EXPRESSION */) {
                      conditional =3D conditional.alternate;
                  }
                  conditional.alternate =3D vElse.exp
                      ? createConditionalExpression(vElse.exp, buildDynamic=
Slot(slotName, slotFunction, conditionalBranchIndex++), defaultFallback)
                      : buildDynamicSlot(slotName, slotFunction, conditiona=
lBranchIndex++);
              }
              else {
                  context.onError(createCompilerError(30 /* ErrorCodes.X_V_=
ELSE_NO_ADJACENT_IF */, vElse.loc));
              }
          }
          else if ((vFor =3D findDir(slotElement, 'for'))) {
              hasDynamicSlots =3D true;
              const parseResult =3D vFor.parseResult ||
                  parseForExpression(vFor.exp, context);
              if (parseResult) {
                  // Render the dynamic slots as an array and add it to the=
 createSlot()
                  // args. The runtime knows how to handle it appropriately=
.
                  dynamicSlots.push(createCallExpression(context.helper(REN=
DER_LIST), [
                      parseResult.source,
                      createFunctionExpression(createForLoopParams(parseRes=
ult), buildDynamicSlot(slotName, slotFunction), true /* force newline */)
                  ]));
              }
              else {
                  context.onError(createCompilerError(32 /* ErrorCodes.X_V_=
FOR_MALFORMED_EXPRESSION */, vFor.loc));
              }
          }
          else {
              // check duplicate static names
              if (staticSlotName) {
                  if (seenSlotNames.has(staticSlotName)) {
                      context.onError(createCompilerError(38 /* ErrorCodes.=
X_V_SLOT_DUPLICATE_SLOT_NAMES */, dirLoc));
                      continue;
                  }
                  seenSlotNames.add(staticSlotName);
                  if (staticSlotName =3D=3D=3D 'default') {
                      hasNamedDefaultSlot =3D true;
                  }
              }
              slotsProperties.push(createObjectProperty(slotName, slotFunct=
ion));
          }
      }
      if (!onComponentSlot) {
          const buildDefaultSlotProperty =3D (props, children) =3D&gt; {
              const fn =3D buildSlotFn(props, children, loc);
              return createObjectProperty(`default`, fn);
          };
          if (!hasTemplateSlots) {
              // implicit default slot (on component)
              slotsProperties.push(buildDefaultSlotProperty(undefined, chil=
dren));
          }
          else if (implicitDefaultChildren.length &amp;&amp;
              // #3766
              // with whitespace: 'preserve', whitespaces between slots wil=
l end up in
              // implicitDefaultChildren. Ignore if all implicit children a=
re whitespaces.
              implicitDefaultChildren.some(node =3D&gt; isNonWhitespaceCont=
ent(node))) {
              // implicit default slot (mixed with named slots)
              if (hasNamedDefaultSlot) {
                  context.onError(createCompilerError(39 /* ErrorCodes.X_V_=
SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */, implicitDefaultChildren[0].loc));
              }
              else {
                  slotsProperties.push(buildDefaultSlotProperty(undefined, =
implicitDefaultChildren));
              }
          }
      }
      const slotFlag =3D hasDynamicSlots
          ? 2 /* SlotFlags.DYNAMIC */
          : hasForwardedSlots(node.children)
              ? 3 /* SlotFlags.FORWARDED */
              : 1 /* SlotFlags.STABLE */;
      let slots =3D createObjectExpression(slotsProperties.concat(createObj=
ectProperty(`_`,=20
      // 2 =3D compiled but dynamic =3D can skip normalization, but must ru=
n diff
      // 1 =3D compiled and static =3D can skip normalization AND diff as o=
ptimized
      createSimpleExpression(slotFlag + (` /* ${slotFlagsText[slotFlag]} */=
` ), false))), loc);
      if (dynamicSlots.length) {
          slots =3D createCallExpression(context.helper(CREATE_SLOTS), [
              slots,
              createArrayExpression(dynamicSlots)
          ]);
      }
      return {
          slots,
          hasDynamicSlots
      };
  }
  function buildDynamicSlot(name, fn, index) {
      const props =3D [
          createObjectProperty(`name`, name),
          createObjectProperty(`fn`, fn)
      ];
      if (index !=3D null) {
          props.push(createObjectProperty(`key`, createSimpleExpression(Str=
ing(index), true)));
      }
      return createObjectExpression(props);
  }
  function hasForwardedSlots(children) {
      for (let i =3D 0; i &lt; children.length; i++) {
          const child =3D children[i];
          switch (child.type) {
              case 1 /* NodeTypes.ELEMENT */:
                  if (child.tagType =3D=3D=3D 2 /* ElementTypes.SLOT */ ||
                      hasForwardedSlots(child.children)) {
                      return true;
                  }
                  break;
              case 9 /* NodeTypes.IF */:
                  if (hasForwardedSlots(child.branches))
                      return true;
                  break;
              case 10 /* NodeTypes.IF_BRANCH */:
              case 11 /* NodeTypes.FOR */:
                  if (hasForwardedSlots(child.children))
                      return true;
                  break;
          }
      }
      return false;
  }
  function isNonWhitespaceContent(node) {
      if (node.type !=3D=3D 2 /* NodeTypes.TEXT */ &amp;&amp; node.type !=
=3D=3D 12 /* NodeTypes.TEXT_CALL */)
          return true;
      return node.type =3D=3D=3D 2 /* NodeTypes.TEXT */
          ? !!node.content.trim()
          : isNonWhitespaceContent(node.content);
  }

  // some directive transforms (e.g. v-model) may return a symbol for runti=
me
  // import, which should be used instead of a resolveDirective call.
  const directiveImportMap =3D new WeakMap();
  // generate a JavaScript AST for this element's codegen
  const transformElement =3D (node, context) =3D&gt; {
      // perform the work on exit, after all child expressions have been
      // processed and merged.
      return function postTransformElement() {
          node =3D context.currentNode;
          if (!(node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
              (node.tagType =3D=3D=3D 0 /* ElementTypes.ELEMENT */ ||
                  node.tagType =3D=3D=3D 1 /* ElementTypes.COMPONENT */))) =
{
              return;
          }
          const { tag, props } =3D node;
          const isComponent =3D node.tagType =3D=3D=3D 1 /* ElementTypes.CO=
MPONENT */;
          // The goal of the transform is to create a codegenNode implement=
ing the
          // VNodeCall interface.
          let vnodeTag =3D isComponent
              ? resolveComponentType(node, context)
              : `"${tag}"`;
          const isDynamicComponent =3D isObject(vnodeTag) &amp;&amp; vnodeT=
ag.callee =3D=3D=3D RESOLVE_DYNAMIC_COMPONENT;
          let vnodeProps;
          let vnodeChildren;
          let vnodePatchFlag;
          let patchFlag =3D 0;
          let vnodeDynamicProps;
          let dynamicPropNames;
          let vnodeDirectives;
          let shouldUseBlock =3D=20
          // dynamic component may resolve to plain elements
          isDynamicComponent ||
              vnodeTag =3D=3D=3D TELEPORT ||
              vnodeTag =3D=3D=3D SUSPENSE ||
              (!isComponent &amp;&amp;
                  // &lt;svg&gt; and &lt;foreignObject&gt; must be forced i=
nto blocks so that block
                  // updates inside get proper isSVG flag at runtime. (#639=
, #643)
                  // This is technically web-specific, but splitting the lo=
gic out of core
                  // leads to too much unnecessary complexity.
                  (tag =3D=3D=3D 'svg' || tag =3D=3D=3D 'foreignObject'));
          // props
          if (props.length &gt; 0) {
              const propsBuildResult =3D buildProps(node, context, undefine=
d, isComponent, isDynamicComponent);
              vnodeProps =3D propsBuildResult.props;
              patchFlag =3D propsBuildResult.patchFlag;
              dynamicPropNames =3D propsBuildResult.dynamicPropNames;
              const directives =3D propsBuildResult.directives;
              vnodeDirectives =3D
                  directives &amp;&amp; directives.length
                      ? createArrayExpression(directives.map(dir =3D&gt; bu=
ildDirectiveArgs(dir, context)))
                      : undefined;
              if (propsBuildResult.shouldUseBlock) {
                  shouldUseBlock =3D true;
              }
          }
          // children
          if (node.children.length &gt; 0) {
              if (vnodeTag =3D=3D=3D KEEP_ALIVE) {
                  // Although a built-in component, we compile KeepAlive wi=
th raw children
                  // instead of slot functions so that it can be used insid=
e Transition
                  // or other Transition-wrapping HOCs.
                  // To ensure correct updates with block optimizations, we=
 need to:
                  // 1. Force keep-alive into a block. This avoids its chil=
dren being
                  //    collected by a parent block.
                  shouldUseBlock =3D true;
                  // 2. Force keep-alive to always be updated, since it use=
s raw children.
                  patchFlag |=3D 1024 /* PatchFlags.DYNAMIC_SLOTS */;
                  if (node.children.length &gt; 1) {
                      context.onError(createCompilerError(46 /* ErrorCodes.=
X_KEEP_ALIVE_INVALID_CHILDREN */, {
                          start: node.children[0].loc.start,
                          end: node.children[node.children.length - 1].loc.=
end,
                          source: ''
                      }));
                  }
              }
              const shouldBuildAsSlots =3D isComponent &amp;&amp;
                  // Teleport is not a real component and has dedicated run=
time handling
                  vnodeTag !=3D=3D TELEPORT &amp;&amp;
                  // explained above.
                  vnodeTag !=3D=3D KEEP_ALIVE;
              if (shouldBuildAsSlots) {
                  const { slots, hasDynamicSlots } =3D buildSlots(node, con=
text);
                  vnodeChildren =3D slots;
                  if (hasDynamicSlots) {
                      patchFlag |=3D 1024 /* PatchFlags.DYNAMIC_SLOTS */;
                  }
              }
              else if (node.children.length =3D=3D=3D 1 &amp;&amp; vnodeTag=
 !=3D=3D TELEPORT) {
                  const child =3D node.children[0];
                  const type =3D child.type;
                  // check for dynamic text children
                  const hasDynamicTextChild =3D type =3D=3D=3D 5 /* NodeTyp=
es.INTERPOLATION */ ||
                      type =3D=3D=3D 8 /* NodeTypes.COMPOUND_EXPRESSION */;
                  if (hasDynamicTextChild &amp;&amp;
                      getConstantType(child, context) =3D=3D=3D 0 /* Consta=
ntTypes.NOT_CONSTANT */) {
                      patchFlag |=3D 1 /* PatchFlags.TEXT */;
                  }
                  // pass directly if the only child is a text node
                  // (plain / interpolation / expression)
                  if (hasDynamicTextChild || type =3D=3D=3D 2 /* NodeTypes.=
TEXT */) {
                      vnodeChildren =3D child;
                  }
                  else {
                      vnodeChildren =3D node.children;
                  }
              }
              else {
                  vnodeChildren =3D node.children;
              }
          }
          // patchFlag &amp; dynamicPropNames
          if (patchFlag !=3D=3D 0) {
              {
                  if (patchFlag &lt; 0) {
                      // special flags (negative and mutually exclusive)
                      vnodePatchFlag =3D patchFlag + ` /* ${PatchFlagNames[=
patchFlag]} */`;
                  }
                  else {
                      // bitwise flags
                      const flagNames =3D Object.keys(PatchFlagNames)
                          .map(Number)
                          .filter(n =3D&gt; n &gt; 0 &amp;&amp; patchFlag &=
amp; n)
                          .map(n =3D&gt; PatchFlagNames[n])
                          .join(`, `);
                      vnodePatchFlag =3D patchFlag + ` /* ${flagNames} */`;
                  }
              }
              if (dynamicPropNames &amp;&amp; dynamicPropNames.length) {
                  vnodeDynamicProps =3D stringifyDynamicPropNames(dynamicPr=
opNames);
              }
          }
          node.codegenNode =3D createVNodeCall(context, vnodeTag, vnodeProp=
s, vnodeChildren, vnodePatchFlag, vnodeDynamicProps, vnodeDirectives, !!sho=
uldUseBlock, false /* disableTracking */, isComponent, node.loc);
      };
  };
  function resolveComponentType(node, context, ssr =3D false) {
      let { tag } =3D node;
      // 1. dynamic component
      const isExplicitDynamic =3D isComponentTag(tag);
      const isProp =3D findProp(node, 'is');
      if (isProp) {
          if (isExplicitDynamic ||
              (false )) {
              const exp =3D isProp.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE =
*/
                  ? isProp.value &amp;&amp; createSimpleExpression(isProp.v=
alue.content, true)
                  : isProp.exp;
              if (exp) {
                  return createCallExpression(context.helper(RESOLVE_DYNAMI=
C_COMPONENT), [
                      exp
                  ]);
              }
          }
          else if (isProp.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */ &amp;&=
amp;
              isProp.value.content.startsWith('vue:')) {
              // &lt;button is=3D"vue:xxx"&gt;
              // if not &lt;component&gt;, only is value that starts with "=
vue:" will be
              // treated as component by the parse phase and reach here, un=
less it's
              // compat mode where all is values are considered components
              tag =3D isProp.value.content.slice(4);
          }
      }
      // 1.5 v-is (TODO: Deprecate)
      const isDir =3D !isExplicitDynamic &amp;&amp; findDir(node, 'is');
      if (isDir &amp;&amp; isDir.exp) {
          return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPON=
ENT), [
              isDir.exp
          ]);
      }
      // 2. built-in components (Teleport, Transition, KeepAlive, Suspense.=
..)
      const builtIn =3D isCoreComponent(tag) || context.isBuiltInComponent(=
tag);
      if (builtIn) {
          // built-ins are simply fallthroughs / have special handling duri=
ng ssr
          // so we don't need to import their runtime equivalents
          if (!ssr)
              context.helper(builtIn);
          return builtIn;
      }
      // 5. user component (resolve)
      context.helper(RESOLVE_COMPONENT);
      context.components.add(tag);
      return toValidAssetId(tag, `component`);
  }
  function buildProps(node, context, props =3D node.props, isComponent, isD=
ynamicComponent, ssr =3D false) {
      const { tag, loc: elementLoc, children } =3D node;
      let properties =3D [];
      const mergeArgs =3D [];
      const runtimeDirectives =3D [];
      const hasChildren =3D children.length &gt; 0;
      let shouldUseBlock =3D false;
      // patchFlag analysis
      let patchFlag =3D 0;
      let hasRef =3D false;
      let hasClassBinding =3D false;
      let hasStyleBinding =3D false;
      let hasHydrationEventBinding =3D false;
      let hasDynamicKeys =3D false;
      let hasVnodeHook =3D false;
      const dynamicPropNames =3D [];
      const pushMergeArg =3D (arg) =3D&gt; {
          if (properties.length) {
              mergeArgs.push(createObjectExpression(dedupeProperties(proper=
ties), elementLoc));
              properties =3D [];
          }
          if (arg)
              mergeArgs.push(arg);
      };
      const analyzePatchFlag =3D ({ key, value }) =3D&gt; {
          if (isStaticExp(key)) {
              const name =3D key.content;
              const isEventHandler =3D isOn(name);
              if (isEventHandler &amp;&amp;
                  (!isComponent || isDynamicComponent) &amp;&amp;
                  // omit the flag for click handlers because hydration giv=
es click
                  // dedicated fast path.
                  name.toLowerCase() !=3D=3D 'onclick' &amp;&amp;
                  // omit v-model handlers
                  name !=3D=3D 'onUpdate:modelValue' &amp;&amp;
                  // omit onVnodeXXX hooks
                  !isReservedProp(name)) {
                  hasHydrationEventBinding =3D true;
              }
              if (isEventHandler &amp;&amp; isReservedProp(name)) {
                  hasVnodeHook =3D true;
              }
              if (value.type =3D=3D=3D 20 /* NodeTypes.JS_CACHE_EXPRESSION =
*/ ||
                  ((value.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION *=
/ ||
                      value.type =3D=3D=3D 8 /* NodeTypes.COMPOUND_EXPRESSI=
ON */) &amp;&amp;
                      getConstantType(value, context) &gt; 0)) {
                  // skip if the prop is a cached handler or has constant v=
alue
                  return;
              }
              if (name =3D=3D=3D 'ref') {
                  hasRef =3D true;
              }
              else if (name =3D=3D=3D 'class') {
                  hasClassBinding =3D true;
              }
              else if (name =3D=3D=3D 'style') {
                  hasStyleBinding =3D true;
              }
              else if (name !=3D=3D 'key' &amp;&amp; !dynamicPropNames.incl=
udes(name)) {
                  dynamicPropNames.push(name);
              }
              // treat the dynamic class and style binding of the component=
 as dynamic props
              if (isComponent &amp;&amp;
                  (name =3D=3D=3D 'class' || name =3D=3D=3D 'style') &amp;&=
amp;
                  !dynamicPropNames.includes(name)) {
                  dynamicPropNames.push(name);
              }
          }
          else {
              hasDynamicKeys =3D true;
          }
      };
      for (let i =3D 0; i &lt; props.length; i++) {
          // static attribute
          const prop =3D props[i];
          if (prop.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */) {
              const { loc, name, value } =3D prop;
              let isStatic =3D true;
              if (name =3D=3D=3D 'ref') {
                  hasRef =3D true;
                  if (context.scopes.vFor &gt; 0) {
                      properties.push(createObjectProperty(createSimpleExpr=
ession('ref_for', true), createSimpleExpression('true')));
                  }
              }
              // skip is on &lt;component&gt;, or is=3D"vue:xxx"
              if (name =3D=3D=3D 'is' &amp;&amp;
                  (isComponentTag(tag) ||
                      (value &amp;&amp; value.content.startsWith('vue:')) |=
|
                      (false ))) {
                  continue;
              }
              properties.push(createObjectProperty(createSimpleExpression(n=
ame, true, getInnerRange(loc, 0, name.length)), createSimpleExpression(valu=
e ? value.content : '', isStatic, value ? value.loc : loc)));
          }
          else {
              // directives
              const { name, arg, exp, loc } =3D prop;
              const isVBind =3D name =3D=3D=3D 'bind';
              const isVOn =3D name =3D=3D=3D 'on';
              // skip v-slot - it is handled by its dedicated transform.
              if (name =3D=3D=3D 'slot') {
                  if (!isComponent) {
                      context.onError(createCompilerError(40 /* ErrorCodes.=
X_V_SLOT_MISPLACED */, loc));
                  }
                  continue;
              }
              // skip v-once/v-memo - they are handled by dedicated transfo=
rms.
              if (name =3D=3D=3D 'once' || name =3D=3D=3D 'memo') {
                  continue;
              }
              // skip v-is and :is on &lt;component&gt;
              if (name =3D=3D=3D 'is' ||
                  (isVBind &amp;&amp;
                      isStaticArgOf(arg, 'is') &amp;&amp;
                      (isComponentTag(tag) ||
                          (false )))) {
                  continue;
              }
              // skip v-on in SSR compilation
              if (isVOn &amp;&amp; ssr) {
                  continue;
              }
              if (
              // #938: elements with dynamic keys should be forced into blo=
cks
              (isVBind &amp;&amp; isStaticArgOf(arg, 'key')) ||
                  // inline before-update hooks need to force block so that=
 it is invoked
                  // before children
                  (isVOn &amp;&amp; hasChildren &amp;&amp; isStaticArgOf(ar=
g, 'vue:before-update'))) {
                  shouldUseBlock =3D true;
              }
              if (isVBind &amp;&amp; isStaticArgOf(arg, 'ref') &amp;&amp; c=
ontext.scopes.vFor &gt; 0) {
                  properties.push(createObjectProperty(createSimpleExpressi=
on('ref_for', true), createSimpleExpression('true')));
              }
              // special case for v-bind and v-on with no argument
              if (!arg &amp;&amp; (isVBind || isVOn)) {
                  hasDynamicKeys =3D true;
                  if (exp) {
                      if (isVBind) {
                          // have to merge early for compat build check
                          pushMergeArg();
                          mergeArgs.push(exp);
                      }
                      else {
                          // v-on=3D"obj" -&gt; toHandlers(obj)
                          pushMergeArg({
                              type: 14 /* NodeTypes.JS_CALL_EXPRESSION */,
                              loc,
                              callee: context.helper(TO_HANDLERS),
                              arguments: isComponent ? [exp] : [exp, `true`=
]
                          });
                      }
                  }
                  else {
                      context.onError(createCompilerError(isVBind
                          ? 34 /* ErrorCodes.X_V_BIND_NO_EXPRESSION */
                          : 35 /* ErrorCodes.X_V_ON_NO_EXPRESSION */, loc))=
;
                  }
                  continue;
              }
              const directiveTransform =3D context.directiveTransforms[name=
];
              if (directiveTransform) {
                  // has built-in directive transform.
                  const { props, needRuntime } =3D directiveTransform(prop,=
 node, context);
                  !ssr &amp;&amp; props.forEach(analyzePatchFlag);
                  if (isVOn &amp;&amp; arg &amp;&amp; !isStaticExp(arg)) {
                      pushMergeArg(createObjectExpression(props, elementLoc=
));
                  }
                  else {
                      properties.push(...props);
                  }
                  if (needRuntime) {
                      runtimeDirectives.push(prop);
                      if (isSymbol(needRuntime)) {
                          directiveImportMap.set(prop, needRuntime);
                      }
                  }
              }
              else if (!isBuiltInDirective(name)) {
                  // no built-in transform, this is a user custom directive=
.
                  runtimeDirectives.push(prop);
                  // custom dirs may use beforeUpdate so they need to force=
 blocks
                  // to ensure before-update gets called before children up=
date
                  if (hasChildren) {
                      shouldUseBlock =3D true;
                  }
              }
          }
      }
      let propsExpression =3D undefined;
      // has v-bind=3D"object" or v-on=3D"object", wrap with mergeProps
      if (mergeArgs.length) {
          // close up any not-yet-merged props
          pushMergeArg();
          if (mergeArgs.length &gt; 1) {
              propsExpression =3D createCallExpression(context.helper(MERGE=
_PROPS), mergeArgs, elementLoc);
          }
          else {
              // single v-bind with nothing else - no need for a mergeProps=
 call
              propsExpression =3D mergeArgs[0];
          }
      }
      else if (properties.length) {
          propsExpression =3D createObjectExpression(dedupeProperties(prope=
rties), elementLoc);
      }
      // patchFlag analysis
      if (hasDynamicKeys) {
          patchFlag |=3D 16 /* PatchFlags.FULL_PROPS */;
      }
      else {
          if (hasClassBinding &amp;&amp; !isComponent) {
              patchFlag |=3D 2 /* PatchFlags.CLASS */;
          }
          if (hasStyleBinding &amp;&amp; !isComponent) {
              patchFlag |=3D 4 /* PatchFlags.STYLE */;
          }
          if (dynamicPropNames.length) {
              patchFlag |=3D 8 /* PatchFlags.PROPS */;
          }
          if (hasHydrationEventBinding) {
              patchFlag |=3D 32 /* PatchFlags.HYDRATE_EVENTS */;
          }
      }
      if (!shouldUseBlock &amp;&amp;
          (patchFlag =3D=3D=3D 0 || patchFlag =3D=3D=3D 32 /* PatchFlags.HY=
DRATE_EVENTS */) &amp;&amp;
          (hasRef || hasVnodeHook || runtimeDirectives.length &gt; 0)) {
          patchFlag |=3D 512 /* PatchFlags.NEED_PATCH */;
      }
      // pre-normalize props, SSR is skipped for now
      if (!context.inSSR &amp;&amp; propsExpression) {
          switch (propsExpression.type) {
              case 15 /* NodeTypes.JS_OBJECT_EXPRESSION */:
                  // means that there is no v-bind,
                  // but still need to deal with dynamic key binding
                  let classKeyIndex =3D -1;
                  let styleKeyIndex =3D -1;
                  let hasDynamicKey =3D false;
                  for (let i =3D 0; i &lt; propsExpression.properties.lengt=
h; i++) {
                      const key =3D propsExpression.properties[i].key;
                      if (isStaticExp(key)) {
                          if (key.content =3D=3D=3D 'class') {
                              classKeyIndex =3D i;
                          }
                          else if (key.content =3D=3D=3D 'style') {
                              styleKeyIndex =3D i;
                          }
                      }
                      else if (!key.isHandlerKey) {
                          hasDynamicKey =3D true;
                      }
                  }
                  const classProp =3D propsExpression.properties[classKeyIn=
dex];
                  const styleProp =3D propsExpression.properties[styleKeyIn=
dex];
                  // no dynamic key
                  if (!hasDynamicKey) {
                      if (classProp &amp;&amp; !isStaticExp(classProp.value=
)) {
                          classProp.value =3D createCallExpression(context.=
helper(NORMALIZE_CLASS), [classProp.value]);
                      }
                      if (styleProp &amp;&amp;
                          // the static style is compiled into an object,
                          // so use `hasStyleBinding` to ensure that it is =
a dynamic style binding
                          (hasStyleBinding ||
                              (styleProp.value.type =3D=3D=3D 4 /* NodeType=
s.SIMPLE_EXPRESSION */ &amp;&amp;
                                  styleProp.value.content.trim()[0] =3D=3D=
=3D `[`) ||
                              // v-bind:style and style both exist,
                              // v-bind:style with static literal object
                              styleProp.value.type =3D=3D=3D 17 /* NodeType=
s.JS_ARRAY_EXPRESSION */)) {
                          styleProp.value =3D createCallExpression(context.=
helper(NORMALIZE_STYLE), [styleProp.value]);
                      }
                  }
                  else {
                      // dynamic key binding, wrap with `normalizeProps`
                      propsExpression =3D createCallExpression(context.help=
er(NORMALIZE_PROPS), [propsExpression]);
                  }
                  break;
              case 14 /* NodeTypes.JS_CALL_EXPRESSION */:
                  // mergeProps call, do nothing
                  break;
              default:
                  // single v-bind
                  propsExpression =3D createCallExpression(context.helper(N=
ORMALIZE_PROPS), [
                      createCallExpression(context.helper(GUARD_REACTIVE_PR=
OPS), [
                          propsExpression
                      ])
                  ]);
                  break;
          }
      }
      return {
          props: propsExpression,
          directives: runtimeDirectives,
          patchFlag,
          dynamicPropNames,
          shouldUseBlock
      };
  }
  // Dedupe props in an object literal.
  // Literal duplicated attributes would have been warned during the parse =
phase,
  // however, it's possible to encounter duplicated `onXXX` handlers with d=
ifferent
  // modifiers. We also need to merge static and dynamic class / style attr=
ibutes.
  // - onXXX handlers / style: merge into array
  // - class: merge into single expression with concatenation
  function dedupeProperties(properties) {
      const knownProps =3D new Map();
      const deduped =3D [];
      for (let i =3D 0; i &lt; properties.length; i++) {
          const prop =3D properties[i];
          // dynamic keys are always allowed
          if (prop.key.type =3D=3D=3D 8 /* NodeTypes.COMPOUND_EXPRESSION */=
 || !prop.key.isStatic) {
              deduped.push(prop);
              continue;
          }
          const name =3D prop.key.content;
          const existing =3D knownProps.get(name);
          if (existing) {
              if (name =3D=3D=3D 'style' || name =3D=3D=3D 'class' || isOn(=
name)) {
                  mergeAsArray(existing, prop);
              }
              // unexpected duplicate, should have emitted error during par=
se
          }
          else {
              knownProps.set(name, prop);
              deduped.push(prop);
          }
      }
      return deduped;
  }
  function mergeAsArray(existing, incoming) {
      if (existing.value.type =3D=3D=3D 17 /* NodeTypes.JS_ARRAY_EXPRESSION=
 */) {
          existing.value.elements.push(incoming.value);
      }
      else {
          existing.value =3D createArrayExpression([existing.value, incomin=
g.value], existing.loc);
      }
  }
  function buildDirectiveArgs(dir, context) {
      const dirArgs =3D [];
      const runtime =3D directiveImportMap.get(dir);
      if (runtime) {
          // built-in directive with runtime
          dirArgs.push(context.helperString(runtime));
      }
      else {
          {
              // inject statement for resolving directive
              context.helper(RESOLVE_DIRECTIVE);
              context.directives.add(dir.name);
              dirArgs.push(toValidAssetId(dir.name, `directive`));
          }
      }
      const { loc } =3D dir;
      if (dir.exp)
          dirArgs.push(dir.exp);
      if (dir.arg) {
          if (!dir.exp) {
              dirArgs.push(`void 0`);
          }
          dirArgs.push(dir.arg);
      }
      if (Object.keys(dir.modifiers).length) {
          if (!dir.arg) {
              if (!dir.exp) {
                  dirArgs.push(`void 0`);
              }
              dirArgs.push(`void 0`);
          }
          const trueExpression =3D createSimpleExpression(`true`, false, lo=
c);
          dirArgs.push(createObjectExpression(dir.modifiers.map(modifier =
=3D&gt; createObjectProperty(modifier, trueExpression)), loc));
      }
      return createArrayExpression(dirArgs, dir.loc);
  }
  function stringifyDynamicPropNames(props) {
      let propsNamesString =3D `[`;
      for (let i =3D 0, l =3D props.length; i &lt; l; i++) {
          propsNamesString +=3D JSON.stringify(props[i]);
          if (i &lt; l - 1)
              propsNamesString +=3D ', ';
      }
      return propsNamesString + `]`;
  }
  function isComponentTag(tag) {
      return tag =3D=3D=3D 'component' || tag =3D=3D=3D 'Component';
  }

  const transformSlotOutlet =3D (node, context) =3D&gt; {
      if (isSlotOutlet(node)) {
          const { children, loc } =3D node;
          const { slotName, slotProps } =3D processSlotOutlet(node, context=
);
          const slotArgs =3D [
              context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
              slotName,
              '{}',
              'undefined',
              'true'
          ];
          let expectedLen =3D 2;
          if (slotProps) {
              slotArgs[2] =3D slotProps;
              expectedLen =3D 3;
          }
          if (children.length) {
              slotArgs[3] =3D createFunctionExpression([], children, false,=
 false, loc);
              expectedLen =3D 4;
          }
          if (context.scopeId &amp;&amp; !context.slotted) {
              expectedLen =3D 5;
          }
          slotArgs.splice(expectedLen); // remove unused arguments
          node.codegenNode =3D createCallExpression(context.helper(RENDER_S=
LOT), slotArgs, loc);
      }
  };
  function processSlotOutlet(node, context) {
      let slotName =3D `"default"`;
      let slotProps =3D undefined;
      const nonNameProps =3D [];
      for (let i =3D 0; i &lt; node.props.length; i++) {
          const p =3D node.props[i];
          if (p.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */) {
              if (p.value) {
                  if (p.name =3D=3D=3D 'name') {
                      slotName =3D JSON.stringify(p.value.content);
                  }
                  else {
                      p.name =3D camelize(p.name);
                      nonNameProps.push(p);
                  }
              }
          }
          else {
              if (p.name =3D=3D=3D 'bind' &amp;&amp; isStaticArgOf(p.arg, '=
name')) {
                  if (p.exp)
                      slotName =3D p.exp;
              }
              else {
                  if (p.name =3D=3D=3D 'bind' &amp;&amp; p.arg &amp;&amp; i=
sStaticExp(p.arg)) {
                      p.arg.content =3D camelize(p.arg.content);
                  }
                  nonNameProps.push(p);
              }
          }
      }
      if (nonNameProps.length &gt; 0) {
          const { props, directives } =3D buildProps(node, context, nonName=
Props, false, false);
          slotProps =3D props;
          if (directives.length) {
              context.onError(createCompilerError(36 /* ErrorCodes.X_V_SLOT=
_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */, directives[0].loc));
          }
      }
      return {
          slotName,
          slotProps
      };
  }

  const fnExpRE =3D /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=3D]+)?=3D&g=
t;|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
  const transformOn$1 =3D (dir, node, context, augmentor) =3D&gt; {
      const { loc, modifiers, arg } =3D dir;
      if (!dir.exp &amp;&amp; !modifiers.length) {
          context.onError(createCompilerError(35 /* ErrorCodes.X_V_ON_NO_EX=
PRESSION */, loc));
      }
      let eventName;
      if (arg.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
          if (arg.isStatic) {
              let rawName =3D arg.content;
              // TODO deprecate @vnodeXXX usage
              if (rawName.startsWith('vue:')) {
                  rawName =3D `vnode-${rawName.slice(4)}`;
              }
              const eventString =3D node.tagType !=3D=3D 0 /* ElementTypes.=
ELEMENT */ ||
                  rawName.startsWith('vnode') ||
                  !/[A-Z]/.test(rawName)
                  ? // for non-element and vnode lifecycle event listeners,=
 auto convert
                      // it to camelCase. See issue #2249
                      toHandlerKey(camelize(rawName))
                  : // preserve case for plain element listeners that have =
uppercase
                      // letters, as these may be custom elements' custom e=
vents
                      `on:${rawName}`;
              eventName =3D createSimpleExpression(eventString, true, arg.l=
oc);
          }
          else {
              // #2388
              eventName =3D createCompoundExpression([
                  `${context.helperString(TO_HANDLER_KEY)}(`,
                  arg,
                  `)`
              ]);
          }
      }
      else {
          // already a compound expression.
          eventName =3D arg;
          eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY=
)}(`);
          eventName.children.push(`)`);
      }
      // handler processing
      let exp =3D dir.exp;
      if (exp &amp;&amp; !exp.content.trim()) {
          exp =3D undefined;
      }
      let shouldCache =3D context.cacheHandlers &amp;&amp; !exp &amp;&amp; =
!context.inVOnce;
      if (exp) {
          const isMemberExp =3D isMemberExpression(exp.content);
          const isInlineStatement =3D !(isMemberExp || fnExpRE.test(exp.con=
tent));
          const hasMultipleStatements =3D exp.content.includes(`;`);
          {
              validateBrowserExpression(exp, context, false, hasMultipleSta=
tements);
          }
          if (isInlineStatement || (shouldCache &amp;&amp; isMemberExp)) {
              // wrap inline statement in a function expression
              exp =3D createCompoundExpression([
                  `${isInlineStatement
                    ? `$event`
                    : `${``}(...args)`} =3D&gt; ${hasMultipleStatements ? `=
{` : `(`}`,
                  exp,
                  hasMultipleStatements ? `}` : `)`
              ]);
          }
      }
      let ret =3D {
          props: [
              createObjectProperty(eventName, exp || createSimpleExpression=
(`() =3D&gt; {}`, false, loc))
          ]
      };
      // apply extended compiler augmentor
      if (augmentor) {
          ret =3D augmentor(ret);
      }
      if (shouldCache) {
          // cache handlers so that it's always the same handler being pass=
ed down.
          // this avoids unnecessary re-renders when users use inline handl=
ers on
          // components.
          ret.props[0].value =3D context.cache(ret.props[0].value);
      }
      // mark the key as handler for props normalization check
      ret.props.forEach(p =3D&gt; (p.key.isHandlerKey =3D true));
      return ret;
  };

  // v-bind without arg is handled directly in ./transformElements.ts due t=
o it affecting
  // codegen for the entire props object. This transform here is only for v=
-bind
  // *with* args.
  const transformBind =3D (dir, _node, context) =3D&gt; {
      const { exp, modifiers, loc } =3D dir;
      const arg =3D dir.arg;
      if (arg.type !=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
          arg.children.unshift(`(`);
          arg.children.push(`) || ""`);
      }
      else if (!arg.isStatic) {
          arg.content =3D `${arg.content} || ""`;
      }
      // .sync is replaced by v-model:arg
      if (modifiers.includes('camel')) {
          if (arg.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
              if (arg.isStatic) {
                  arg.content =3D camelize(arg.content);
              }
              else {
                  arg.content =3D `${context.helperString(CAMELIZE)}(${arg.=
content})`;
              }
          }
          else {
              arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
              arg.children.push(`)`);
          }
      }
      if (!context.inSSR) {
          if (modifiers.includes('prop')) {
              injectPrefix(arg, '.');
          }
          if (modifiers.includes('attr')) {
              injectPrefix(arg, '^');
          }
      }
      if (!exp ||
          (exp.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */ &amp;&amp=
; !exp.content.trim())) {
          context.onError(createCompilerError(34 /* ErrorCodes.X_V_BIND_NO_=
EXPRESSION */, loc));
          return {
              props: [createObjectProperty(arg, createSimpleExpression('', =
true, loc))]
          };
      }
      return {
          props: [createObjectProperty(arg, exp)]
      };
  };
  const injectPrefix =3D (arg, prefix) =3D&gt; {
      if (arg.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
          if (arg.isStatic) {
              arg.content =3D prefix + arg.content;
          }
          else {
              arg.content =3D `\`${prefix}\${${arg.content}}\``;
          }
      }
      else {
          arg.children.unshift(`'${prefix}' + (`);
          arg.children.push(`)`);
      }
  };

  // Merge adjacent text nodes and expressions into a single expression
  // e.g. &lt;div&gt;abc {{ d }} {{ e }}&lt;/div&gt; should have a single e=
xpression node as child.
  const transformText =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 0 /* NodeTypes.ROOT */ ||
          node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ ||
          node.type =3D=3D=3D 11 /* NodeTypes.FOR */ ||
          node.type =3D=3D=3D 10 /* NodeTypes.IF_BRANCH */) {
          // perform the transform on node exit so that all expressions hav=
e already
          // been processed.
          return () =3D&gt; {
              const children =3D node.children;
              let currentContainer =3D undefined;
              let hasText =3D false;
              for (let i =3D 0; i &lt; children.length; i++) {
                  const child =3D children[i];
                  if (isText$1(child)) {
                      hasText =3D true;
                      for (let j =3D i + 1; j &lt; children.length; j++) {
                          const next =3D children[j];
                          if (isText$1(next)) {
                              if (!currentContainer) {
                                  currentContainer =3D children[i] =3D crea=
teCompoundExpression([child], child.loc);
                              }
                              // merge adjacent text node into current
                              currentContainer.children.push(` + `, next);
                              children.splice(j, 1);
                              j--;
                          }
                          else {
                              currentContainer =3D undefined;
                              break;
                          }
                      }
                  }
              }
              if (!hasText ||
                  // if this is a plain element with a single text child, l=
eave it
                  // as-is since the runtime has dedicated fast path for th=
is by directly
                  // setting textContent of the element.
                  // for component root it's always normalized anyway.
                  (children.length =3D=3D=3D 1 &amp;&amp;
                      (node.type =3D=3D=3D 0 /* NodeTypes.ROOT */ ||
                          (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &a=
mp;&amp;
                              node.tagType =3D=3D=3D 0 /* ElementTypes.ELEM=
ENT */ &amp;&amp;
                              // #3756
                              // custom directives can potentially add DOM =
elements arbitrarily,
                              // we need to avoid setting textContent of th=
e element at runtime
                              // to avoid accidentally overwriting the DOM =
elements added
                              // by the user through custom directives.
                              !node.props.find(p =3D&gt; p.type =3D=3D=3D 7=
 /* NodeTypes.DIRECTIVE */ &amp;&amp;
                                  !context.directiveTransforms[p.name]) &am=
p;&amp;
                              // in compat mode, &lt;template&gt; tags with=
 no special directives
                              // will be rendered as a fragment so its chil=
dren must be
                              // converted into vnodes.
                              !(false ))))) {
                  return;
              }
              // pre-convert text nodes into createTextVNode(text) calls to=
 avoid
              // runtime normalization.
              for (let i =3D 0; i &lt; children.length; i++) {
                  const child =3D children[i];
                  if (isText$1(child) || child.type =3D=3D=3D 8 /* NodeType=
s.COMPOUND_EXPRESSION */) {
                      const callArgs =3D [];
                      // createTextVNode defaults to single whitespace, so =
if it is a
                      // single space the code could be an empty call to sa=
ve bytes.
                      if (child.type !=3D=3D 2 /* NodeTypes.TEXT */ || chil=
d.content !=3D=3D ' ') {
                          callArgs.push(child);
                      }
                      // mark dynamic text with flag so it gets patched ins=
ide a block
                      if (!context.ssr &amp;&amp;
                          getConstantType(child, context) =3D=3D=3D 0 /* Co=
nstantTypes.NOT_CONSTANT */) {
                          callArgs.push(1 /* PatchFlags.TEXT */ +
                              (` /* ${PatchFlagNames[1 /* PatchFlags.TEXT *=
/]} */` ));
                      }
                      children[i] =3D {
                          type: 12 /* NodeTypes.TEXT_CALL */,
                          content: child,
                          loc: child.loc,
                          codegenNode: createCallExpression(context.helper(=
CREATE_TEXT), callArgs)
                      };
                  }
              }
          };
      }
  };

  const seen$1 =3D new WeakSet();
  const transformOnce =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp; findDir(=
node, 'once', true)) {
          if (seen$1.has(node) || context.inVOnce) {
              return;
          }
          seen$1.add(node);
          context.inVOnce =3D true;
          context.helper(SET_BLOCK_TRACKING);
          return () =3D&gt; {
              context.inVOnce =3D false;
              const cur =3D context.currentNode;
              if (cur.codegenNode) {
                  cur.codegenNode =3D context.cache(cur.codegenNode, true /=
* isVNode */);
              }
          };
      }
  };

  const transformModel$1 =3D (dir, node, context) =3D&gt; {
      const { exp, arg } =3D dir;
      if (!exp) {
          context.onError(createCompilerError(41 /* ErrorCodes.X_V_MODEL_NO=
_EXPRESSION */, dir.loc));
          return createTransformProps();
      }
      const rawExp =3D exp.loc.source;
      const expString =3D exp.type =3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSI=
ON */ ? exp.content : rawExp;
      // im SFC &lt;script setup&gt; inline mode, the exp may have been tra=
nsformed into
      // _unref(exp)
      const bindingType =3D context.bindingMetadata[rawExp];
      // check props
      if (bindingType =3D=3D=3D "props" /* BindingTypes.PROPS */ ||
          bindingType =3D=3D=3D "props-aliased" /* BindingTypes.PROPS_ALIAS=
ED */) {
          context.onError(createCompilerError(44 /* ErrorCodes.X_V_MODEL_ON=
_PROPS */, exp.loc));
          return createTransformProps();
      }
      const maybeRef =3D !true  ;
      if (!expString.trim() ||
          (!isMemberExpression(expString) &amp;&amp; !maybeRef)) {
          context.onError(createCompilerError(42 /* ErrorCodes.X_V_MODEL_MA=
LFORMED_EXPRESSION */, exp.loc));
          return createTransformProps();
      }
      const propName =3D arg ? arg : createSimpleExpression('modelValue', t=
rue);
      const eventName =3D arg
          ? isStaticExp(arg)
              ? `onUpdate:${camelize(arg.content)}`
              : createCompoundExpression(['"onUpdate:" + ', arg])
          : `onUpdate:modelValue`;
      let assignmentExp;
      const eventArg =3D context.isTS ? `($event: any)` : `$event`;
      {
          assignmentExp =3D createCompoundExpression([
              `${eventArg} =3D&gt; ((`,
              exp,
              `) =3D $event)`
          ]);
      }
      const props =3D [
          // modelValue: foo
          createObjectProperty(propName, dir.exp),
          // "onUpdate:modelValue": $event =3D&gt; (foo =3D $event)
          createObjectProperty(eventName, assignmentExp)
      ];
      // modelModifiers: { foo: true, "bar-baz": true }
      if (dir.modifiers.length &amp;&amp; node.tagType =3D=3D=3D 1 /* Eleme=
ntTypes.COMPONENT */) {
          const modifiers =3D dir.modifiers
              .map(m =3D&gt; (isSimpleIdentifier(m) ? m : JSON.stringify(m)=
) + `: true`)
              .join(`, `);
          const modifiersKey =3D arg
              ? isStaticExp(arg)
                  ? `${arg.content}Modifiers`
                  : createCompoundExpression([arg, ' + "Modifiers"'])
              : `modelModifiers`;
          props.push(createObjectProperty(modifiersKey, createSimpleExpress=
ion(`{ ${modifiers} }`, false, dir.loc, 2 /* ConstantTypes.CAN_HOIST */)));
      }
      return createTransformProps(props);
  };
  function createTransformProps(props =3D []) {
      return { props };
  }

  const seen =3D new WeakSet();
  const transformMemo =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
          const dir =3D findDir(node, 'memo');
          if (!dir || seen.has(node)) {
              return;
          }
          seen.add(node);
          return () =3D&gt; {
              const codegenNode =3D node.codegenNode ||
                  context.currentNode.codegenNode;
              if (codegenNode &amp;&amp; codegenNode.type =3D=3D=3D 13 /* N=
odeTypes.VNODE_CALL */) {
                  // non-component sub tree should be turned into a block
                  if (node.tagType !=3D=3D 1 /* ElementTypes.COMPONENT */) =
{
                      makeBlock(codegenNode, context);
                  }
                  node.codegenNode =3D createCallExpression(context.helper(=
WITH_MEMO), [
                      dir.exp,
                      createFunctionExpression(undefined, codegenNode),
                      `_cache`,
                      String(context.cached++)
                  ]);
              }
          };
      }
  };

  function getBaseTransformPreset(prefixIdentifiers) {
      return [
          [
              transformOnce,
              transformIf,
              transformMemo,
              transformFor,
              ...([]),
              ...([transformExpression]
                      ),
              transformSlotOutlet,
              transformElement,
              trackSlotScopes,
              transformText
          ],
          {
              on: transformOn$1,
              bind: transformBind,
              model: transformModel$1
          }
      ];
  }
  // we name it `baseCompile` so that higher order compilers like
  // @vue/compiler-dom can export `compile` while re-exporting everything e=
lse.
  function baseCompile(template, options =3D {}) {
      const onError =3D options.onError || defaultOnError;
      const isModuleMode =3D options.mode =3D=3D=3D 'module';
      /* istanbul ignore if */
      {
          if (options.prefixIdentifiers =3D=3D=3D true) {
              onError(createCompilerError(47 /* ErrorCodes.X_PREFIX_ID_NOT_=
SUPPORTED */));
          }
          else if (isModuleMode) {
              onError(createCompilerError(48 /* ErrorCodes.X_MODULE_MODE_NO=
T_SUPPORTED */));
          }
      }
      const prefixIdentifiers =3D !true ;
      if (options.cacheHandlers) {
          onError(createCompilerError(49 /* ErrorCodes.X_CACHE_HANDLER_NOT_=
SUPPORTED */));
      }
      if (options.scopeId &amp;&amp; !isModuleMode) {
          onError(createCompilerError(50 /* ErrorCodes.X_SCOPE_ID_NOT_SUPPO=
RTED */));
      }
      const ast =3D isString(template) ? baseParse(template, options) : tem=
plate;
      const [nodeTransforms, directiveTransforms] =3D getBaseTransformPrese=
t();
      transform(ast, extend({}, options, {
          prefixIdentifiers,
          nodeTransforms: [
              ...nodeTransforms,
              ...(options.nodeTransforms || []) // user transforms
          ],
          directiveTransforms: extend({}, directiveTransforms, options.dire=
ctiveTransforms || {} // user transforms
          )
      }));
      return generate(ast, extend({}, options, {
          prefixIdentifiers
      }));
  }

  const noopDirectiveTransform =3D () =3D&gt; ({ props: [] });

  const V_MODEL_RADIO =3D Symbol(`vModelRadio` );
  const V_MODEL_CHECKBOX =3D Symbol(`vModelCheckbox` );
  const V_MODEL_TEXT =3D Symbol(`vModelText` );
  const V_MODEL_SELECT =3D Symbol(`vModelSelect` );
  const V_MODEL_DYNAMIC =3D Symbol(`vModelDynamic` );
  const V_ON_WITH_MODIFIERS =3D Symbol(`vOnModifiersGuard` );
  const V_ON_WITH_KEYS =3D Symbol(`vOnKeysGuard` );
  const V_SHOW =3D Symbol(`vShow` );
  const TRANSITION =3D Symbol(`Transition` );
  const TRANSITION_GROUP =3D Symbol(`TransitionGroup` );
  registerRuntimeHelpers({
      [V_MODEL_RADIO]: `vModelRadio`,
      [V_MODEL_CHECKBOX]: `vModelCheckbox`,
      [V_MODEL_TEXT]: `vModelText`,
      [V_MODEL_SELECT]: `vModelSelect`,
      [V_MODEL_DYNAMIC]: `vModelDynamic`,
      [V_ON_WITH_MODIFIERS]: `withModifiers`,
      [V_ON_WITH_KEYS]: `withKeys`,
      [V_SHOW]: `vShow`,
      [TRANSITION]: `Transition`,
      [TRANSITION_GROUP]: `TransitionGroup`
  });

  /* eslint-disable no-restricted-globals */
  let decoder;
  function decodeHtmlBrowser(raw, asAttr =3D false) {
      if (!decoder) {
          decoder =3D document.createElement('div');
      }
      if (asAttr) {
          decoder.innerHTML =3D `&lt;div foo=3D"${raw.replace(/"/g, '&amp;q=
uot;')}"&gt;`;
          return decoder.children[0].getAttribute('foo');
      }
      else {
          decoder.innerHTML =3D raw;
          return decoder.textContent;
      }
  }

  const isRawTextContainer =3D /*#__PURE__*/ makeMap('style,iframe,script,n=
oscript', true);
  const parserOptions =3D {
      isVoidTag,
      isNativeTag: tag =3D&gt; isHTMLTag(tag) || isSVGTag(tag),
      isPreTag: tag =3D&gt; tag =3D=3D=3D 'pre',
      decodeEntities: decodeHtmlBrowser ,
      isBuiltInComponent: (tag) =3D&gt; {
          if (isBuiltInType(tag, `Transition`)) {
              return TRANSITION;
          }
          else if (isBuiltInType(tag, `TransitionGroup`)) {
              return TRANSITION_GROUP;
          }
      },
      // https://html.spec.whatwg.org/multipage/parsing.html#tree-construct=
ion-dispatcher
      getNamespace(tag, parent) {
          let ns =3D parent ? parent.ns : 0 /* DOMNamespaces.HTML */;
          if (parent &amp;&amp; ns =3D=3D=3D 2 /* DOMNamespaces.MATH_ML */)=
 {
              if (parent.tag =3D=3D=3D 'annotation-xml') {
                  if (tag =3D=3D=3D 'svg') {
                      return 1 /* DOMNamespaces.SVG */;
                  }
                  if (parent.props.some(a =3D&gt; a.type =3D=3D=3D 6 /* Nod=
eTypes.ATTRIBUTE */ &amp;&amp;
                      a.name =3D=3D=3D 'encoding' &amp;&amp;
                      a.value !=3D null &amp;&amp;
                      (a.value.content =3D=3D=3D 'text/html' ||
                          a.value.content =3D=3D=3D 'application/xhtml+xml'=
))) {
                      ns =3D 0 /* DOMNamespaces.HTML */;
                  }
              }
              else if (/^m(?:[ions]|text)$/.test(parent.tag) &amp;&amp;
                  tag !=3D=3D 'mglyph' &amp;&amp;
                  tag !=3D=3D 'malignmark') {
                  ns =3D 0 /* DOMNamespaces.HTML */;
              }
          }
          else if (parent &amp;&amp; ns =3D=3D=3D 1 /* DOMNamespaces.SVG */=
) {
              if (parent.tag =3D=3D=3D 'foreignObject' ||
                  parent.tag =3D=3D=3D 'desc' ||
                  parent.tag =3D=3D=3D 'title') {
                  ns =3D 0 /* DOMNamespaces.HTML */;
              }
          }
          if (ns =3D=3D=3D 0 /* DOMNamespaces.HTML */) {
              if (tag =3D=3D=3D 'svg') {
                  return 1 /* DOMNamespaces.SVG */;
              }
              if (tag =3D=3D=3D 'math') {
                  return 2 /* DOMNamespaces.MATH_ML */;
              }
          }
          return ns;
      },
      // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-f=
ragments
      getTextMode({ tag, ns }) {
          if (ns =3D=3D=3D 0 /* DOMNamespaces.HTML */) {
              if (tag =3D=3D=3D 'textarea' || tag =3D=3D=3D 'title') {
                  return 1 /* TextModes.RCDATA */;
              }
              if (isRawTextContainer(tag)) {
                  return 2 /* TextModes.RAWTEXT */;
              }
          }
          return 0 /* TextModes.DATA */;
      }
  };

  // Parse inline CSS strings for static style attributes into an object.
  // This is a NodeTransform since it works on the static `style` attribute=
 and
  // converts it into a dynamic equivalent:
  // style=3D"color: red" -&gt; :style=3D'{ "color": "red" }'
  // It is then processed by `transformElement` and included in the generat=
ed
  // props.
  const transformStyle =3D node =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
          node.props.forEach((p, i) =3D&gt; {
              if (p.type =3D=3D=3D 6 /* NodeTypes.ATTRIBUTE */ &amp;&amp; p=
.name =3D=3D=3D 'style' &amp;&amp; p.value) {
                  // replace p with an expression node
                  node.props[i] =3D {
                      type: 7 /* NodeTypes.DIRECTIVE */,
                      name: `bind`,
                      arg: createSimpleExpression(`style`, true, p.loc),
                      exp: parseInlineCSS(p.value.content, p.loc),
                      modifiers: [],
                      loc: p.loc
                  };
              }
          });
      }
  };
  const parseInlineCSS =3D (cssText, loc) =3D&gt; {
      const normalized =3D parseStringStyle(cssText);
      return createSimpleExpression(JSON.stringify(normalized), false, loc,=
 3 /* ConstantTypes.CAN_STRINGIFY */);
  };

  function createDOMCompilerError(code, loc) {
      return createCompilerError(code, loc, DOMErrorMessages );
  }
  const DOMErrorMessages =3D {
      [51 /* DOMErrorCodes.X_V_HTML_NO_EXPRESSION */]: `v-html is missing e=
xpression.`,
      [52 /* DOMErrorCodes.X_V_HTML_WITH_CHILDREN */]: `v-html will overrid=
e element children.`,
      [53 /* DOMErrorCodes.X_V_TEXT_NO_EXPRESSION */]: `v-text is missing e=
xpression.`,
      [54 /* DOMErrorCodes.X_V_TEXT_WITH_CHILDREN */]: `v-text will overrid=
e element children.`,
      [55 /* DOMErrorCodes.X_V_MODEL_ON_INVALID_ELEMENT */]: `v-model can o=
nly be used on &lt;input&gt;, &lt;textarea&gt; and &lt;select&gt; elements.=
`,
      [56 /* DOMErrorCodes.X_V_MODEL_ARG_ON_ELEMENT */]: `v-model argument =
is not supported on plain elements.`,
      [57 /* DOMErrorCodes.X_V_MODEL_ON_FILE_INPUT_ELEMENT */]: `v-model ca=
nnot be used on file inputs since they are read-only. Use a v-on:change lis=
tener instead.`,
      [58 /* DOMErrorCodes.X_V_MODEL_UNNECESSARY_VALUE */]: `Unnecessary va=
lue binding used alongside v-model. It will interfere with v-model's behavi=
or.`,
      [59 /* DOMErrorCodes.X_V_SHOW_NO_EXPRESSION */]: `v-show is missing e=
xpression.`,
      [60 /* DOMErrorCodes.X_TRANSITION_INVALID_CHILDREN */]: `&lt;Transiti=
on&gt; expects exactly one child element or component.`,
      [61 /* DOMErrorCodes.X_IGNORED_SIDE_EFFECT_TAG */]: `Tags with side e=
ffect (&lt;script&gt; and &lt;style&gt;) are ignored in client component te=
mplates.`
  };

  const transformVHtml =3D (dir, node, context) =3D&gt; {
      const { exp, loc } =3D dir;
      if (!exp) {
          context.onError(createDOMCompilerError(51 /* DOMErrorCodes.X_V_HT=
ML_NO_EXPRESSION */, loc));
      }
      if (node.children.length) {
          context.onError(createDOMCompilerError(52 /* DOMErrorCodes.X_V_HT=
ML_WITH_CHILDREN */, loc));
          node.children.length =3D 0;
      }
      return {
          props: [
              createObjectProperty(createSimpleExpression(`innerHTML`, true=
, loc), exp || createSimpleExpression('', true))
          ]
      };
  };

  const transformVText =3D (dir, node, context) =3D&gt; {
      const { exp, loc } =3D dir;
      if (!exp) {
          context.onError(createDOMCompilerError(53 /* DOMErrorCodes.X_V_TE=
XT_NO_EXPRESSION */, loc));
      }
      if (node.children.length) {
          context.onError(createDOMCompilerError(54 /* DOMErrorCodes.X_V_TE=
XT_WITH_CHILDREN */, loc));
          node.children.length =3D 0;
      }
      return {
          props: [
              createObjectProperty(createSimpleExpression(`textContent`, tr=
ue), exp
                  ? getConstantType(exp, context) &gt; 0
                      ? exp
                      : createCallExpression(context.helperString(TO_DISPLA=
Y_STRING), [exp], loc)
                  : createSimpleExpression('', true))
          ]
      };
  };

  const transformModel =3D (dir, node, context) =3D&gt; {
      const baseResult =3D transformModel$1(dir, node, context);
      // base transform has errors OR component v-model (only need props)
      if (!baseResult.props.length || node.tagType =3D=3D=3D 1 /* ElementTy=
pes.COMPONENT */) {
          return baseResult;
      }
      if (dir.arg) {
          context.onError(createDOMCompilerError(56 /* DOMErrorCodes.X_V_MO=
DEL_ARG_ON_ELEMENT */, dir.arg.loc));
      }
      function checkDuplicatedValue() {
          const value =3D findProp(node, 'value');
          if (value) {
              context.onError(createDOMCompilerError(58 /* DOMErrorCodes.X_=
V_MODEL_UNNECESSARY_VALUE */, value.loc));
          }
      }
      const { tag } =3D node;
      const isCustomElement =3D context.isCustomElement(tag);
      if (tag =3D=3D=3D 'input' ||
          tag =3D=3D=3D 'textarea' ||
          tag =3D=3D=3D 'select' ||
          isCustomElement) {
          let directiveToUse =3D V_MODEL_TEXT;
          let isInvalidType =3D false;
          if (tag =3D=3D=3D 'input' || isCustomElement) {
              const type =3D findProp(node, `type`);
              if (type) {
                  if (type.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */) {
                      // :type=3D"foo"
                      directiveToUse =3D V_MODEL_DYNAMIC;
                  }
                  else if (type.value) {
                      switch (type.value.content) {
                          case 'radio':
                              directiveToUse =3D V_MODEL_RADIO;
                              break;
                          case 'checkbox':
                              directiveToUse =3D V_MODEL_CHECKBOX;
                              break;
                          case 'file':
                              isInvalidType =3D true;
                              context.onError(createDOMCompilerError(57 /* =
DOMErrorCodes.X_V_MODEL_ON_FILE_INPUT_ELEMENT */, dir.loc));
                              break;
                          default:
                              // text type
                              checkDuplicatedValue();
                              break;
                      }
                  }
              }
              else if (hasDynamicKeyVBind(node)) {
                  // element has bindings with dynamic keys, which can poss=
ibly contain
                  // "type".
                  directiveToUse =3D V_MODEL_DYNAMIC;
              }
              else {
                  // text type
                  checkDuplicatedValue();
              }
          }
          else if (tag =3D=3D=3D 'select') {
              directiveToUse =3D V_MODEL_SELECT;
          }
          else {
              // textarea
              checkDuplicatedValue();
          }
          // inject runtime directive
          // by returning the helper symbol via needRuntime
          // the import will replaced a resolveDirective call.
          if (!isInvalidType) {
              baseResult.needRuntime =3D context.helper(directiveToUse);
          }
      }
      else {
          context.onError(createDOMCompilerError(55 /* DOMErrorCodes.X_V_MO=
DEL_ON_INVALID_ELEMENT */, dir.loc));
      }
      // native vmodel doesn't need the `modelValue` props since they are a=
lso
      // passed to the runtime as `binding.value`. removing it reduces code=
 size.
      baseResult.props =3D baseResult.props.filter(p =3D&gt; !(p.key.type =
=3D=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */ &amp;&amp;
          p.key.content =3D=3D=3D 'modelValue'));
      return baseResult;
  };

  const isEventOptionModifier =3D /*#__PURE__*/ makeMap(`passive,once,captu=
re`);
  const isNonKeyModifier =3D /*#__PURE__*/ makeMap(
  // event propagation management
`stop,prevent,self,`   +
      // system modifiers + exact
      `ctrl,shift,alt,meta,exact,` +
      // mouse
      `middle`);
  // left &amp; right could be mouse or key modifiers based on event type
  const maybeKeyModifier =3D /*#__PURE__*/ makeMap('left,right');
  const isKeyboardEvent =3D /*#__PURE__*/ makeMap(`onkeyup,onkeydown,onkeyp=
ress`, true);
  const resolveModifiers =3D (key, modifiers, context, loc) =3D&gt; {
      const keyModifiers =3D [];
      const nonKeyModifiers =3D [];
      const eventOptionModifiers =3D [];
      for (let i =3D 0; i &lt; modifiers.length; i++) {
          const modifier =3D modifiers[i];
          if (isEventOptionModifier(modifier)) {
              // eventOptionModifiers: modifiers for addEventListener() opt=
ions,
              // e.g. .passive &amp; .capture
              eventOptionModifiers.push(modifier);
          }
          else {
              // runtimeModifiers: modifiers that needs runtime guards
              if (maybeKeyModifier(modifier)) {
                  if (isStaticExp(key)) {
                      if (isKeyboardEvent(key.content)) {
                          keyModifiers.push(modifier);
                      }
                      else {
                          nonKeyModifiers.push(modifier);
                      }
                  }
                  else {
                      keyModifiers.push(modifier);
                      nonKeyModifiers.push(modifier);
                  }
              }
              else {
                  if (isNonKeyModifier(modifier)) {
                      nonKeyModifiers.push(modifier);
                  }
                  else {
                      keyModifiers.push(modifier);
                  }
              }
          }
      }
      return {
          keyModifiers,
          nonKeyModifiers,
          eventOptionModifiers
      };
  };
  const transformClick =3D (key, event) =3D&gt; {
      const isStaticClick =3D isStaticExp(key) &amp;&amp; key.content.toLow=
erCase() =3D=3D=3D 'onclick';
      return isStaticClick
          ? createSimpleExpression(event, true)
          : key.type !=3D=3D 4 /* NodeTypes.SIMPLE_EXPRESSION */
              ? createCompoundExpression([
                  `(`,
                  key,
                  `) =3D=3D=3D "onClick" ? "${event}" : (`,
                  key,
                  `)`
              ])
              : key;
  };
  const transformOn =3D (dir, node, context) =3D&gt; {
      return transformOn$1(dir, node, context, baseResult =3D&gt; {
          const { modifiers } =3D dir;
          if (!modifiers.length)
              return baseResult;
          let { key, value: handlerExp } =3D baseResult.props[0];
          const { keyModifiers, nonKeyModifiers, eventOptionModifiers } =3D=
 resolveModifiers(key, modifiers, context, dir.loc);
          // normalize click.right and click.middle since they don't actual=
ly fire
          if (nonKeyModifiers.includes('right')) {
              key =3D transformClick(key, `onContextmenu`);
          }
          if (nonKeyModifiers.includes('middle')) {
              key =3D transformClick(key, `onMouseup`);
          }
          if (nonKeyModifiers.length) {
              handlerExp =3D createCallExpression(context.helper(V_ON_WITH_=
MODIFIERS), [
                  handlerExp,
                  JSON.stringify(nonKeyModifiers)
              ]);
          }
          if (keyModifiers.length &amp;&amp;
              // if event name is dynamic, always wrap with keys guard
              (!isStaticExp(key) || isKeyboardEvent(key.content))) {
              handlerExp =3D createCallExpression(context.helper(V_ON_WITH_=
KEYS), [
                  handlerExp,
                  JSON.stringify(keyModifiers)
              ]);
          }
          if (eventOptionModifiers.length) {
              const modifierPostfix =3D eventOptionModifiers.map(capitalize=
).join('');
              key =3D isStaticExp(key)
                  ? createSimpleExpression(`${key.content}${modifierPostfix=
}`, true)
                  : createCompoundExpression([`(`, key, `) + "${modifierPos=
tfix}"`]);
          }
          return {
              props: [createObjectProperty(key, handlerExp)]
          };
      });
  };

  const transformShow =3D (dir, node, context) =3D&gt; {
      const { exp, loc } =3D dir;
      if (!exp) {
          context.onError(createDOMCompilerError(59 /* DOMErrorCodes.X_V_SH=
OW_NO_EXPRESSION */, loc));
      }
      return {
          props: [],
          needRuntime: context.helper(V_SHOW)
      };
  };

  const transformTransition =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
          node.tagType =3D=3D=3D 1 /* ElementTypes.COMPONENT */) {
          const component =3D context.isBuiltInComponent(node.tag);
          if (component =3D=3D=3D TRANSITION) {
              return () =3D&gt; {
                  if (!node.children.length) {
                      return;
                  }
                  // warn multiple transition children
                  if (hasMultipleChildren(node)) {
                      context.onError(createDOMCompilerError(60 /* DOMError=
Codes.X_TRANSITION_INVALID_CHILDREN */, {
                          start: node.children[0].loc.start,
                          end: node.children[node.children.length - 1].loc.=
end,
                          source: ''
                      }));
                  }
                  // check if it's s single child w/ v-show
                  // if yes, inject "persisted: true" to the transition pro=
ps
                  const child =3D node.children[0];
                  if (child.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */) {
                      for (const p of child.props) {
                          if (p.type =3D=3D=3D 7 /* NodeTypes.DIRECTIVE */ =
&amp;&amp; p.name =3D=3D=3D 'show') {
                              node.props.push({
                                  type: 6 /* NodeTypes.ATTRIBUTE */,
                                  name: 'persisted',
                                  value: undefined,
                                  loc: node.loc
                              });
                          }
                      }
                  }
              };
          }
      }
  };
  function hasMultipleChildren(node) {
      // #1352 filter out potential comment nodes.
      const children =3D (node.children =3D node.children.filter(c =3D&gt; =
c.type !=3D=3D 3 /* NodeTypes.COMMENT */ &amp;&amp;
          !(c.type =3D=3D=3D 2 /* NodeTypes.TEXT */ &amp;&amp; !c.content.t=
rim())));
      const child =3D children[0];
      return (children.length !=3D=3D 1 ||
          child.type =3D=3D=3D 11 /* NodeTypes.FOR */ ||
          (child.type =3D=3D=3D 9 /* NodeTypes.IF */ &amp;&amp; child.branc=
hes.some(hasMultipleChildren)));
  }

  const ignoreSideEffectTags =3D (node, context) =3D&gt; {
      if (node.type =3D=3D=3D 1 /* NodeTypes.ELEMENT */ &amp;&amp;
          node.tagType =3D=3D=3D 0 /* ElementTypes.ELEMENT */ &amp;&amp;
          (node.tag =3D=3D=3D 'script' || node.tag =3D=3D=3D 'style')) {
          context.onError(createDOMCompilerError(61 /* DOMErrorCodes.X_IGNO=
RED_SIDE_EFFECT_TAG */, node.loc));
          context.removeNode();
      }
  };

  const DOMNodeTransforms =3D [
      transformStyle,
      ...([transformTransition] )
  ];
  const DOMDirectiveTransforms =3D {
      cloak: noopDirectiveTransform,
      html: transformVHtml,
      text: transformVText,
      model: transformModel,
      on: transformOn,
      show: transformShow
  };
  function compile(template, options =3D {}) {
      return baseCompile(template, extend({}, parserOptions, options, {
          nodeTransforms: [
              // ignore &lt;script&gt; and &lt;tag&gt;
              // this is not put inside DOMNodeTransforms because that list=
 is used
              // by compiler-ssr to generate vnode fallback branches
              ignoreSideEffectTags,
              ...DOMNodeTransforms,
              ...(options.nodeTransforms || [])
          ],
          directiveTransforms: extend({}, DOMDirectiveTransforms, options.d=
irectiveTransforms || {}),
          transformHoist: null=20
      }));
  }

  // This entry is the "full-build" that includes both the runtime
  {
      initDev();
  }
  const compileCache =3D Object.create(null);
  function compileToFunction(template, options) {
      if (!isString(template)) {
          if (template.nodeType) {
              template =3D template.innerHTML;
          }
          else {
              warn(`invalid template option: `, template);
              return NOOP;
          }
      }
      const key =3D template;
      const cached =3D compileCache[key];
      if (cached) {
          return cached;
      }
      if (template[0] =3D=3D=3D '#') {
          const el =3D document.querySelector(template);
          if (!el) {
              warn(`Template element not found or is empty: ${template}`);
          }
          // __UNSAFE__
          // Reason: potential execution of JS expressions in in-DOM templa=
te.
          // The user must make sure the in-DOM template is trusted. If it'=
s rendered
          // by the server, the template should not contain any user data.
          template =3D el ? el.innerHTML : ``;
      }
      const opts =3D extend({
          hoistStatic: true,
          onError: onError ,
          onWarn: e =3D&gt; onError(e, true)=20
      }, options);
      if (!opts.isCustomElement &amp;&amp; typeof customElements !=3D=3D 'u=
ndefined') {
          opts.isCustomElement =3D tag =3D&gt; !!customElements.get(tag);
      }
      const { code } =3D compile(template, opts);
      function onError(err, asWarning =3D false) {
          const message =3D asWarning
              ? err.message
              : `Template compilation error: ${err.message}`;
          const codeFrame =3D err.loc &amp;&amp;
              generateCodeFrame(template, err.loc.start.offset, err.loc.end=
.offset);
          warn(codeFrame ? `${message}\n${codeFrame}` : message);
      }
      // The wildcard import results in a huge object with every export
      // with keys that cannot be mangled, and can be quite heavy size-wise=
.
      // In the global build we know `Vue` is available globally so we can =
avoid
      // the wildcard object.
      const render =3D (new Function(code)() );
      render._rc =3D true;
      return (compileCache[key] =3D render);
  }
  registerRuntimeCompiler(compileToFunction);

  exports.BaseTransition =3D BaseTransition;
  exports.Comment =3D Comment;
  exports.EffectScope =3D EffectScope;
  exports.Fragment =3D Fragment;
  exports.KeepAlive =3D KeepAlive;
  exports.ReactiveEffect =3D ReactiveEffect;
  exports.Static =3D Static;
  exports.Suspense =3D Suspense;
  exports.Teleport =3D Teleport;
  exports.Text =3D Text;
  exports.Transition =3D Transition;
  exports.TransitionGroup =3D TransitionGroup;
  exports.VueElement =3D VueElement;
  exports.assertNumber =3D assertNumber;
  exports.callWithAsyncErrorHandling =3D callWithAsyncErrorHandling;
  exports.callWithErrorHandling =3D callWithErrorHandling;
  exports.camelize =3D camelize;
  exports.capitalize =3D capitalize;
  exports.cloneVNode =3D cloneVNode;
  exports.compatUtils =3D compatUtils;
  exports.compile =3D compileToFunction;
  exports.computed =3D computed;
  exports.createApp =3D createApp;
  exports.createBlock =3D createBlock;
  exports.createCommentVNode =3D createCommentVNode;
  exports.createElementBlock =3D createElementBlock;
  exports.createElementVNode =3D createBaseVNode;
  exports.createHydrationRenderer =3D createHydrationRenderer;
  exports.createPropsRestProxy =3D createPropsRestProxy;
  exports.createRenderer =3D createRenderer;
  exports.createSSRApp =3D createSSRApp;
  exports.createSlots =3D createSlots;
  exports.createStaticVNode =3D createStaticVNode;
  exports.createTextVNode =3D createTextVNode;
  exports.createVNode =3D createVNode;
  exports.customRef =3D customRef;
  exports.defineAsyncComponent =3D defineAsyncComponent;
  exports.defineComponent =3D defineComponent;
  exports.defineCustomElement =3D defineCustomElement;
  exports.defineEmits =3D defineEmits;
  exports.defineExpose =3D defineExpose;
  exports.defineProps =3D defineProps;
  exports.defineSSRCustomElement =3D defineSSRCustomElement;
  exports.effect =3D effect;
  exports.effectScope =3D effectScope;
  exports.getCurrentInstance =3D getCurrentInstance;
  exports.getCurrentScope =3D getCurrentScope;
  exports.getTransitionRawChildren =3D getTransitionRawChildren;
  exports.guardReactiveProps =3D guardReactiveProps;
  exports.h =3D h;
  exports.handleError =3D handleError;
  exports.hydrate =3D hydrate;
  exports.initCustomFormatter =3D initCustomFormatter;
  exports.initDirectivesForSSR =3D initDirectivesForSSR;
  exports.inject =3D inject;
  exports.isMemoSame =3D isMemoSame;
  exports.isProxy =3D isProxy;
  exports.isReactive =3D isReactive;
  exports.isReadonly =3D isReadonly;
  exports.isRef =3D isRef;
  exports.isRuntimeOnly =3D isRuntimeOnly;
  exports.isShallow =3D isShallow;
  exports.isVNode =3D isVNode;
  exports.markRaw =3D markRaw;
  exports.mergeDefaults =3D mergeDefaults;
  exports.mergeProps =3D mergeProps;
  exports.nextTick =3D nextTick;
  exports.normalizeClass =3D normalizeClass;
  exports.normalizeProps =3D normalizeProps;
  exports.normalizeStyle =3D normalizeStyle;
  exports.onActivated =3D onActivated;
  exports.onBeforeMount =3D onBeforeMount;
  exports.onBeforeUnmount =3D onBeforeUnmount;
  exports.onBeforeUpdate =3D onBeforeUpdate;
  exports.onDeactivated =3D onDeactivated;
  exports.onErrorCaptured =3D onErrorCaptured;
  exports.onMounted =3D onMounted;
  exports.onRenderTracked =3D onRenderTracked;
  exports.onRenderTriggered =3D onRenderTriggered;
  exports.onScopeDispose =3D onScopeDispose;
  exports.onServerPrefetch =3D onServerPrefetch;
  exports.onUnmounted =3D onUnmounted;
  exports.onUpdated =3D onUpdated;
  exports.openBlock =3D openBlock;
  exports.popScopeId =3D popScopeId;
  exports.provide =3D provide;
  exports.proxyRefs =3D proxyRefs;
  exports.pushScopeId =3D pushScopeId;
  exports.queuePostFlushCb =3D queuePostFlushCb;
  exports.reactive =3D reactive;
  exports.readonly =3D readonly;
  exports.ref =3D ref;
  exports.registerRuntimeCompiler =3D registerRuntimeCompiler;
  exports.render =3D render;
  exports.renderList =3D renderList;
  exports.renderSlot =3D renderSlot;
  exports.resolveComponent =3D resolveComponent;
  exports.resolveDirective =3D resolveDirective;
  exports.resolveDynamicComponent =3D resolveDynamicComponent;
  exports.resolveFilter =3D resolveFilter;
  exports.resolveTransitionHooks =3D resolveTransitionHooks;
  exports.setBlockTracking =3D setBlockTracking;
  exports.setDevtoolsHook =3D setDevtoolsHook;
  exports.setTransitionHooks =3D setTransitionHooks;
  exports.shallowReactive =3D shallowReactive;
  exports.shallowReadonly =3D shallowReadonly;
  exports.shallowRef =3D shallowRef;
  exports.ssrContextKey =3D ssrContextKey;
  exports.ssrUtils =3D ssrUtils;
  exports.stop =3D stop;
  exports.toDisplayString =3D toDisplayString;
  exports.toHandlerKey =3D toHandlerKey;
  exports.toHandlers =3D toHandlers;
  exports.toRaw =3D toRaw;
  exports.toRef =3D toRef;
  exports.toRefs =3D toRefs;
  exports.transformVNodeArgs =3D transformVNodeArgs;
  exports.triggerRef =3D triggerRef;
  exports.unref =3D unref;
  exports.useAttrs =3D useAttrs;
  exports.useCssModule =3D useCssModule;
  exports.useCssVars =3D useCssVars;
  exports.useSSRContext =3D useSSRContext;
  exports.useSlots =3D useSlots;
  exports.useTransitionState =3D useTransitionState;
  exports.vModelCheckbox =3D vModelCheckbox;
  exports.vModelDynamic =3D vModelDynamic;
  exports.vModelRadio =3D vModelRadio;
  exports.vModelSelect =3D vModelSelect;
  exports.vModelText =3D vModelText;
  exports.vShow =3D vShow;
  exports.version =3D version;
  exports.warn =3D warn;
  exports.watch =3D watch;
  exports.watchEffect =3D watchEffect;
  exports.watchPostEffect =3D watchPostEffect;
  exports.watchSyncEffect =3D watchSyncEffect;
  exports.withAsyncContext =3D withAsyncContext;
  exports.withCtx =3D withCtx;
  exports.withDefaults =3D withDefaults;
  exports.withDirectives =3D withDirectives;
  exports.withKeys =3D withKeys;
  exports.withMemo =3D withMemo;
  exports.withModifiers =3D withModifiers;
  exports.withScopeId =3D withScopeId;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
