var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);n.prototype=e.prototype,t.prototype=new n},PF;!function(t){var e=function(){function e(e){e||(e={}),this.allowDiagonal=e.allowDiagonal,this.dontCrossCorners=e.dontCrossCorners,this.heuristic=e.heuristic||t.Heuristic.manhattan,this.weight=e.weight||1,this.diagonalMovement=e.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=t.DiagonalMovement.OnlyWhenNoObstacles:this.diagonalMovement=t.DiagonalMovement.IfAtMostOneObstacle:this.diagonalMovement=t.DiagonalMovement.Never),this.diagonalMovement===t.DiagonalMovement.Never?this.heuristic=e.heuristic||t.Heuristic.manhattan:this.heuristic=e.heuristic||t.Heuristic.octile}return e.prototype.findPath=function(t,e,n,i,r){return[]},e}();t.FindingBase=e,__reflect(e.prototype,"PF.FindingBase")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s,l,u,h,p,f,c,d=new t.Heap(function(t,e){return t.f-e.f}),g=o.getNodeAt(e,n),v=o.getNodeAt(i,r),b=this.heuristic,A=this.diagonalMovement,y=this.weight,F=Math.abs,k=Math.SQRT2;for(g.g=0,g.f=0,d.push(g),g.opened=!0;!d.empty();){if(a=d.pop(),a.closed=!0,a===v)return t.Util.backtrace(v);for(s=o.getNeighbors(a,A),u=0,h=s.length;h>u;++u)l=s[u],l.closed||(p=l.x,f=l.y,c=a.g+(p-a.x===0||f-a.y===0?1:k),(!l.opened||c<l.g)&&(l.g=c,l.h=l.h||y*b(F(p-i),F(f-r)),l.f=l.g+l.h,l.parent=a,l.opened?d.updateItem(l):(d.push(l),l.opened=!0)))}return[]},n}(t.FindingBase);t.AStarFinder=e,__reflect(e.prototype,"PF.AStarFinder")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s,l,u,h,p,f,c,d=function(t,e){return t.f-e.f},g=new t.Heap(d),v=new t.Heap(d),b=o.getNodeAt(e,n),A=o.getNodeAt(i,r),y=this.heuristic,F=this.diagonalMovement,k=this.weight,m=Math.abs,_=Math.SQRT2,P=1,M=2;for(b.g=0,b.f=0,g.push(b),b.opened=P,A.g=0,A.f=0,v.push(A),A.opened=M;!g.empty()&&!v.empty();){for(a=g.pop(),a.closed=!0,s=o.getNeighbors(a,F),u=0,h=s.length;h>u;++u)if(l=s[u],!l.closed){if(l.opened===M)return t.Util.biBacktrace(a,l);p=l.x,f=l.y,c=a.g+(p-a.x===0||f-a.y===0?1:_),(!l.opened||c<l.g)&&(l.g=c,l.h=l.h||k*y(m(p-i),m(f-r)),l.f=l.g+l.h,l.parent=a,l.opened?g.updateItem(l):(g.push(l),l.opened=P))}for(a=v.pop(),a.closed=!0,s=o.getNeighbors(a,F),u=0,h=s.length;h>u;++u)if(l=s[u],!l.closed){if(l.opened===P)return t.Util.biBacktrace(l,a);p=l.x,f=l.y,c=a.g+(p-a.x===0||f-a.y===0?1:_),(!l.opened||c<l.g)&&(l.g=c,l.h=l.h||k*y(m(p-e),m(f-n)),l.f=l.g+l.h,l.parent=a,l.opened?v.updateItem(l):(v.push(l),l.opened=M))}}return[]},n}(t.FindingBase);t.BiAStarFinder=e,__reflect(e.prototype,"PF.BiAStarFinder")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(n){var i=e.call(this,n)||this;return i.heuristic=n.heuristic||t.Heuristic.manhattan,i.trackJumpRecursion=n.trackJumpRecursion||!1,i}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s=this.openList=new t.Heap(function(t,e){return t.f-e.f}),l=this.startNode=o.getNodeAt(e,n),u=this.endNode=o.getNodeAt(i,r);for(this.grid=o,l.g=0,l.f=0,s.push(l),l.opened=!0;!s.empty();){if(a=s.pop(),a.closed=!0,a===u)return t.Util.expandPath(t.Util.backtrace(u));this._identifySuccessors(a)}return[]},n.prototype._findNeighbors=function(t){},n.prototype._jump=function(t,e,n,i){return null},n.prototype._identifySuccessors=function(e){var n,i,r,o,a,s,l,u,h,p,f=this.grid,c=this.heuristic,d=this.openList,g=this.endNode.x,v=this.endNode.y,b=e.x,A=e.y,y=Math.abs;Math.max;for(n=this._findNeighbors(e),o=0,a=n.length;a>o;++o)if(i=n[o],r=this._jump(i[0],i[1],b,A)){if(s=r[0],l=r[1],p=f.getNodeAt(s,l),p.closed)continue;u=t.Heuristic.octile(y(s-b),y(l-A)),h=e.g+u,(!p.opened||h<p.g)&&(p.g=h,p.h=p.h||c(y(s-g),y(l-v)),p.f=p.g+p.h,p.parent=e,p.opened?d.updateItem(p):(d.push(p),p.opened=!0))}},n}(t.AStarFinder);t.JumpPointFinderBase=e,__reflect(e.prototype,"PF.JumpPointFinderBase")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(n){var i=e.call(this,n)||this;return i.allowDiagonal=n.allowDiagonal,i.dontCrossCorners=n.dontCrossCorners,i.diagonalMovement=n.diagonalMovement,i.diagonalMovement||(i.allowDiagonal?i.dontCrossCorners?i.diagonalMovement=t.DiagonalMovement.OnlyWhenNoObstacles:i.diagonalMovement=t.DiagonalMovement.IfAtMostOneObstacle:i.diagonalMovement=t.DiagonalMovement.Never),i}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s,l,u,h,p=o.getNodeAt(e,n),f=o.getNodeAt(i,r),c=[],d=[],g=this.diagonalMovement,v=0,b=1;for(c.push(p),p.opened=!0,p.by=v,d.push(f),f.opened=!0,f.by=b;c.length&&d.length;){for(l=c.shift(),l.closed=!0,a=o.getNeighbors(l,g),u=0,h=a.length;h>u;++u)if(s=a[u],!s.closed)if(s.opened){if(s.by===b)return t.Util.biBacktrace(l,s)}else c.push(s),s.parent=l,s.opened=!0,s.by=v;for(l=d.shift(),l.closed=!0,a=o.getNeighbors(l,g),u=0,h=a.length;h>u;++u)if(s=a[u],!s.closed)if(s.opened){if(s.by===v)return t.Util.biBacktrace(s,l)}else d.push(s),s.parent=l,s.opened=!0,s.by=b}return[]},n}(t.FindingBase);t.BiBreadthFirstFinder=e,__reflect(e.prototype,"PF.BiBreadthFirstFinder")}(PF||(PF={}));var PF;!function(t){var e=function(){function t(){}return t.backtrace=function(t){for(var e=[t];t.parent;)t=t.parent,e.push(t);return e.reverse()},t.biBacktrace=function(t,e){var n=this.backtrace(t),i=this.backtrace(e);return n.concat(i.reverse())},t.pathLength=function(t){var e,n,i,r,o,a=0;for(e=1;e<t.length;++e)n=t[e-1],i=t[e],r=n[0]-i[0],o=n[1]-i[1],a+=Math.sqrt(r*r+o*o);return a},t.interpolate=function(t,e,n,i){var r,o,a,s,l,u,h=Math.abs,p=[];for(a=h(n-t),s=h(i-e),r=n>t?1:-1,o=i>e?1:-1,l=a-s;;){if(p.push([t,e]),t===n&&e===i)break;u=2*l,u>-s&&(l-=s,t+=r),a>u&&(l+=a,e+=o)}return p},t.expandPath=function(t){var e,n,i,r,o,a,s=[],l=t.length;if(2>l)return s;for(o=0;l-1>o;++o)for(e=t[o],n=t[o+1],i=this.interpolate(e[0],e[1],n[0],n[1]),r=i.length,a=0;r-1>a;++a)s.push(i[a]);return s.push(t[l-1]),s},t.smoothenPath=function(t,e){var n,i,r,o,a,s,l,u,h,p,f,c=e.length,d=e[0][0],g=e[0][1],v=e[c-1][0],b=e[c-1][1];for(n=d,i=g,a=[[n,i]],s=2;c>s;++s){for(u=e[s],r=u[0],o=u[1],h=this.interpolate(n,i,r,o),f=!1,l=1;l<h.length;++l)if(p=h[l],!t.isWalkableAt(p[0],p[1])){f=!0;break}if(f){var A=e[s-1];a.push(A),n=A[0],i=A[1]}}return a.push([v,b]),a},t.compressPath=function(t){if(t.length<3)return t;var e,n,i,r,o,a,s=[],l=t[0][0],u=t[0][1],h=t[1][0],p=t[1][1],f=h-l,c=p-u;for(o=Math.sqrt(f*f+c*c),f/=o,c/=o,s.push([l,u]),a=2;a<t.length;a++)e=h,n=p,i=f,r=c,h=t[a][0],p=t[a][1],f=h-e,c=p-n,o=Math.sqrt(f*f+c*c),f/=o,c/=o,(f!==i||c!==r)&&s.push([e,n]);return s.push([h,p]),s},t}();t.Util=e,__reflect(e.prototype,"PF.Util")}(PF||(PF={}));var PF;!function(t){var e;!function(t){t[t.Always=1]="Always",t[t.Never=2]="Never",t[t.IfAtMostOneObstacle=3]="IfAtMostOneObstacle",t[t.OnlyWhenNoObstacles=4]="OnlyWhenNoObstacles"}(e=t.DiagonalMovement||(t.DiagonalMovement={}))}(PF||(PF={}));var PF;!function(t){var e=Math.floor,n=Math.min,i=function(t,e){return e>t?-1:t>e?1:0},r=function(t,n,r,o,a){var s;if(null==r&&(r=0),null==a&&(a=i),0>r)throw new Error("lo must be non-negative");for(null==o&&(o=t.length);o>r;)s=e((r+o)/2),a(n,t[s])<0?o=s:r=s+1;return[].splice.apply(t,[r,r-r].concat(n)),n},o=function(t,e,n){return null==n&&(n=i),t.push(e),c(t,0,t.length-1,n)},a=function(t,e){var n,r;return null==e&&(e=i),n=t.pop(),t.length?(r=t[0],t[0]=n,d(t,0,e)):r=n,r},s=function(t,e,n){var r;return null==n&&(n=i),r=t[0],t[0]=e,d(t,0,n),r},l=function(t,e,n){var r;return null==n&&(n=i),t.length&&n(t[0],e)<0&&(r=[t[0],e],e=r[0],t[0]=r[1],d(t,0,n)),e},u=function(t,n){var r,o,a,s,l,u;for(null==n&&(n=i),s=function(){u=[];for(var n=0,i=e(t.length/2);i>=0?i>n:n>i;i>=0?n++:n--)u.push(n);return u}.apply(this).reverse(),l=[],o=0,a=s.length;a>o;o++)r=s[o],l.push(d(t,r,n));return l},h=function(t,e,n){var r;return null==n&&(n=i),r=t.indexOf(e),-1!==r?(c(t,0,r,n),d(t,r,n)):void 0},p=function(t,e,n){var r,o,a,s,h;if(null==n&&(n=i),o=t.slice(0,e),!o.length)return o;for(u(o,n),h=t.slice(e),a=0,s=h.length;s>a;a++)r=h[a],l(o,r,n);return o.sort(n).reverse()},f=function(t,e,o){var s,l,h,p,f,c,d,g,v,b;if(null==o&&(o=i),10*e<=t.length){if(p=t.slice(0,e).sort(o),!p.length)return p;for(h=p[p.length-1],g=t.slice(e),f=0,d=g.length;d>f;f++)s=g[f],o(s,h)<0&&(r(p,s,0,null,o),p.pop(),h=p[p.length-1]);return p}for(u(t,o),b=[],l=c=0,v=n(e,t.length);v>=0?v>c:c>v;l=v>=0?++c:--c)b.push(a(t,o));return b},c=function(t,e,n,r){var o,a,s;for(null==r&&(r=i),o=t[n];n>e&&(s=n-1>>1,a=t[s],r(o,a)<0);)t[n]=a,n=s;return t[n]=o},d=function(t,e,n){var r,o,a,s,l;for(null==n&&(n=i),o=t.length,l=e,a=t[e],r=2*e+1;o>r;)s=r+1,o>s&&!(n(t[r],t[s])<0)&&(r=s),t[e]=t[r],e=r,r=2*e+1;return t[e]=a,c(t,l,e,n)},g=function(){function t(t){this.cmp=null!=t?t:i,this.nodes=[]}return t.prototype.push=function(t){return o(this.nodes,t,this.cmp)},t.prototype.pop=function(){return a(this.nodes,this.cmp)},t.prototype.peek=function(){return this.nodes[0]},t.prototype.contains=function(t){return-1!==this.nodes.indexOf(t)},t.prototype.replace=function(t){return s(this.nodes,t,this.cmp)},t.prototype.pushpop=function(t){return l(this.nodes,t,this.cmp)},t.prototype.heapify=function(){return u(this.nodes,this.cmp)},t.prototype.updateItem=function(t){return h(this.nodes,t,this.cmp)},t.prototype.clear=function(){return this.nodes=[]},t.prototype.empty=function(){return 0===this.nodes.length},t.prototype.size=function(){return this.nodes.length},t.prototype.clone=function(){var e;return e=new t,e.nodes=this.nodes.slice(0),e},t.prototype.toArray=function(){return this.nodes.slice(0)},t.prototype.insert=function(t){return this.push(t)},t.prototype.top=function(){return this.peek()},t.prototype.front=function(){return this.peek()},t.prototype.has=function(t){return this.contains(t)},t.prototype.copy=function(){return this.clone()},t.push=o,t.pop=a,t.replace=s,t.pushpop=l,t.heapify=u,t.updateItem=h,t.nlargest=p,t.nsmallest=f,t}();t.Heap=g,__reflect(g.prototype,"PF.Heap")}(PF||(PF={}));var PF;!function(t){var e=function(t){function e(e){var n=t.call(this,e)||this,i=n.heuristic;return n.heuristic=function(t,e){return 1e6*i(t,e)},n}return __extends(e,t),e}(t.AStarFinder);t.BestFirstFinder=e,__reflect(e.prototype,"PF.BestFirstFinder")}(PF||(PF={}));var PF;!function(t){var e=function(){function t(){}return t.manhattan=function(t,e){return t+e},t.euclidean=function(t,e){return Math.sqrt(t*t+e*e)},t.octile=function(t,e){var n=Math.SQRT2-1;return e>t?n*t+e:n*e+t},t.chebyshev=function(t,e){return Math.max(t,e)},t}();t.Heuristic=e,__reflect(e.prototype,"PF.Heuristic")}(PF||(PF={}));var PF;!function(t){var e=function(t){function e(e){var n=t.call(this,e)||this,i=n.heuristic;return n.heuristic=function(t,e){return 1e6*i(t,e)},n}return __extends(e,t),e}(t.BiAStarFinder);t.BiBestFirstFinder=e,__reflect(e.prototype,"PF.BiBestFirstFinder")}(PF||(PF={}));var PF;!function(t){var e=function(){function e(t,e,n){var i;"object"!=typeof t?i=t:(e=t.length,i=t[0].length,n=t),this.width=i,this.height=e,this.nodes=this._buildNodes(i,e,n)}return e.prototype.clearState=function(){for(var t=0;t<this.nodes.length;t++)for(var e=this.nodes[t],n=0;n<e.length;n++)e[n].clearState()},e.prototype._buildNodes=function(e,n,i){var r,o,a=new Array(n);for(r=0;n>r;++r)for(a[r]=new Array(e),o=0;e>o;++o)a[r][o]=new t.Node(o,r);if(void 0===i)return a;if(i.length!==n||i[0].length!==e)throw new Error("Matrix size does not fit");for(r=0;n>r;++r)for(o=0;e>o;++o)i[r][o]&&(a[r][o].walkable=!1);return a},e.prototype.getNodeAt=function(t,e){return this.nodes[e][t]},e.prototype.isWalkableAt=function(t,e){return this.isInside(t,e)&&this.nodes[e][t].walkable},e.prototype.isInside=function(t,e){return t>=0&&t<this.width&&e>=0&&e<this.height},e.prototype.setWalkableAt=function(t,e,n){this.nodes[e][t].walkable=n},e.prototype.getNeighbors=function(e,n){var i=e.x,r=e.y,o=[],a=!1,s=!1,l=!1,u=!1,h=!1,p=!1,f=!1,c=!1,d=this.nodes;if(this.isWalkableAt(i,r-1)&&(o.push(d[r-1][i]),a=!0),this.isWalkableAt(i+1,r)&&(o.push(d[r][i+1]),l=!0),this.isWalkableAt(i,r+1)&&(o.push(d[r+1][i]),h=!0),this.isWalkableAt(i-1,r)&&(o.push(d[r][i-1]),f=!0),n===t.DiagonalMovement.Never)return o;if(n===t.DiagonalMovement.OnlyWhenNoObstacles)s=f&&a,u=a&&l,p=l&&h,c=h&&f;else if(n===t.DiagonalMovement.IfAtMostOneObstacle)s=f||a,u=a||l,p=l||h,c=h||f;else{if(n!==t.DiagonalMovement.Always)throw new Error("Incorrect value of diagonalMovement");s=!0,u=!0,p=!0,c=!0}return s&&this.isWalkableAt(i-1,r-1)&&o.push(d[r-1][i-1]),u&&this.isWalkableAt(i+1,r-1)&&o.push(d[r-1][i+1]),p&&this.isWalkableAt(i+1,r+1)&&o.push(d[r+1][i+1]),c&&this.isWalkableAt(i-1,r+1)&&o.push(d[r+1][i-1]),o},e.prototype.clone=function(){var n,i,r=this.width,o=this.height,a=this.nodes,s=new e(r,o),l=new Array(o);for(n=0;o>n;++n)for(l[n]=new Array(r),i=0;r>i;++i)l[n][i]=new t.Node(i,n,a[n][i].walkable);return s.nodes=l,s},e}();t.Grid=e,__reflect(e.prototype,"PF.Grid")}(PF||(PF={}));var PF;!function(t){var e=function(t){function e(e){var n=t.call(this,e)||this;return n.heuristic=function(t,e){return 0},n}return __extends(e,t),e}(t.BiAStarFinder);t.BiDijkstraFinder=e,__reflect(e.prototype,"PF.BiDijkstraFinder")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(n){var i=e.call(this,n)||this;return i.allowDiagonal=n.allowDiagonal,i.dontCrossCorners=n.dontCrossCorners,i.diagonalMovement=n.diagonalMovement,i.diagonalMovement||(i.allowDiagonal?i.dontCrossCorners?i.diagonalMovement=t.DiagonalMovement.OnlyWhenNoObstacles:i.diagonalMovement=t.DiagonalMovement.IfAtMostOneObstacle:i.diagonalMovement=t.DiagonalMovement.Never),i}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s,l,u,h,p=[],f=this.diagonalMovement,c=o.getNodeAt(e,n),d=o.getNodeAt(i,r);for(p.push(c),c.opened=!0;p.length;){if(l=p.shift(),l.closed=!0,l===d)return t.Util.backtrace(d);for(a=o.getNeighbors(l,f),u=0,h=a.length;h>u;++u)s=a[u],s.closed||s.opened||(p.push(s),s.opened=!0,s.parent=l)}return[]},n}(t.BiAStarFinder);t.BreadthFirstFinder=e,__reflect(e.prototype,"PF.BreadthFirstFinder")}(PF||(PF={}));var PF;!function(t){var e=function(t){function e(e){var n=t.call(this,e)||this;return n.heuristic=function(t,e){return 0},n}return __extends(e,t),e}(t.AStarFinder);t.DijkstraFinder=e,__reflect(e.prototype,"PF.DijkstraFinder")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){var n=e.call(this,t)||this;return n.trackRecursion=t.trackRecursion||!1,n.timeLimit=t.timeLimit||1/0,n}return __extends(n,e),n.prototype.findPath=function(e,n,i,r,o){var a,s,l,u=0,h=(new Date).getTime(),p=function(t,e){return this.heuristic(Math.abs(e.x-t.x),Math.abs(e.y-t.y))}.bind(this),f=function(t,e){return t.x===e.x||t.y===e.y?1:Math.SQRT2},c=function(e,n,i,r,a){if(u++,this.timeLimit>0&&(new Date).getTime()-h>1e3*this.timeLimit)return 1/0;var s=n+p(e,g)*this.weight;if(s>i)return s;if(e==g)return r[a]=[e.x,e.y],e;var l,d,v,b,A=o.getNeighbors(e,this.diagonalMovement);for(v=0,l=1/0;b=A[v];++v){if(this.trackRecursion&&(b.retainCount=b.retainCount+1||1,b.tested!==!0&&(b.tested=!0)),d=c(b,n+f(e,b),i,r,a+1),d instanceof t.Node)return r[a]=[e.x,e.y],d;this.trackRecursion&&0===--b.retainCount&&(b.tested=!1),l>d&&(l=d)}return l}.bind(this),d=o.getNodeAt(e,n),g=o.getNodeAt(i,r),v=p(d,g);for(a=0;!0;++a){if(s=[],l=c(d,0,v,s,0),l===1/0)return[];if(l instanceof t.Node)return s;v=l}return[]},n}(t.FindingBase);t.IDAStarFinder=e,__reflect(e.prototype,"PF.IDAStarFinder")}(PF||(PF={}));var PF;!function(t){var e=function(){function t(t,e,n){this.x=t,this.y=e,this.walkable=void 0===n?!0:n}return t.prototype.clearState=function(){this.tested=!1,this.opened=!1,this.closed=!1,this.parent=null},t}();t.Node=e,__reflect(e.prototype,"PF.Node")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype._jump=function(t,e,n,i){var r=this.grid,o=t-n,a=e-i;if(!r.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(r.getNodeAt(t,e).tested=!0),r.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o&&0!==a){if(r.isWalkableAt(t-o,e+a)&&!r.isWalkableAt(t-o,e)||r.isWalkableAt(t+o,e-a)&&!r.isWalkableAt(t,e-a))return[t,e];if(this._jump(t+o,e,t,e)||this._jump(t,e+a,t,e))return[t,e]}else if(0!==o){if(r.isWalkableAt(t+o,e+1)&&!r.isWalkableAt(t,e+1)||r.isWalkableAt(t+o,e-1)&&!r.isWalkableAt(t,e-1))return[t,e]}else if(r.isWalkableAt(t+1,e+a)&&!r.isWalkableAt(t+1,e)||r.isWalkableAt(t-1,e+a)&&!r.isWalkableAt(t-1,e))return[t,e];return this._jump(t+o,e+a,t,e)},n.prototype._findNeighbors=function(e){var n,i,r,o,a,s,l,u,h=e.parent,p=e.x,f=e.y,c=this.grid,d=[];if(h)n=h.x,i=h.y,r=(p-n)/Math.max(Math.abs(p-n),1),o=(f-i)/Math.max(Math.abs(f-i),1),0!==r&&0!==o?(c.isWalkableAt(p,f+o)&&d.push([p,f+o]),c.isWalkableAt(p+r,f)&&d.push([p+r,f]),c.isWalkableAt(p+r,f+o)&&d.push([p+r,f+o]),c.isWalkableAt(p-r,f)||d.push([p-r,f+o]),c.isWalkableAt(p,f-o)||d.push([p+r,f-o])):0===r?(c.isWalkableAt(p,f+o)&&d.push([p,f+o]),c.isWalkableAt(p+1,f)||d.push([p+1,f+o]),c.isWalkableAt(p-1,f)||d.push([p-1,f+o])):(c.isWalkableAt(p+r,f)&&d.push([p+r,f]),c.isWalkableAt(p,f+1)||d.push([p+r,f+1]),c.isWalkableAt(p,f-1)||d.push([p+r,f-1]));else for(a=c.getNeighbors(e,t.DiagonalMovement.Always),l=0,u=a.length;u>l;++l)s=a[l],d.push([s.x,s.y]);return d},n}(t.JumpPointFinderBase);t.JPFAlwaysMoveDiagonally=e,__reflect(e.prototype,"PF.JPFAlwaysMoveDiagonally")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype._jump=function(t,e,n,i){var r=this.grid,o=t-n,a=e-i;if(!r.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(r.getNodeAt(t,e).tested=!0),r.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o&&0!==a){if(r.isWalkableAt(t-o,e+a)&&!r.isWalkableAt(t-o,e)||r.isWalkableAt(t+o,e-a)&&!r.isWalkableAt(t,e-a))return[t,e];if(this._jump(t+o,e,t,e)||this._jump(t,e+a,t,e))return[t,e]}else if(0!==o){if(r.isWalkableAt(t+o,e+1)&&!r.isWalkableAt(t,e+1)||r.isWalkableAt(t+o,e-1)&&!r.isWalkableAt(t,e-1))return[t,e]}else if(r.isWalkableAt(t+1,e+a)&&!r.isWalkableAt(t+1,e)||r.isWalkableAt(t-1,e+a)&&!r.isWalkableAt(t-1,e))return[t,e];return r.isWalkableAt(t+o,e)||r.isWalkableAt(t,e+a)?this._jump(t+o,e+a,t,e):null},n.prototype._findNeighbors=function(e){var n,i,r,o,a,s,l,u,h=e.parent,p=e.x,f=e.y,c=this.grid,d=[];if(h)n=h.x,i=h.y,r=(p-n)/Math.max(Math.abs(p-n),1),o=(f-i)/Math.max(Math.abs(f-i),1),0!==r&&0!==o?(c.isWalkableAt(p,f+o)&&d.push([p,f+o]),c.isWalkableAt(p+r,f)&&d.push([p+r,f]),(c.isWalkableAt(p,f+o)||c.isWalkableAt(p+r,f))&&d.push([p+r,f+o]),!c.isWalkableAt(p-r,f)&&c.isWalkableAt(p,f+o)&&d.push([p-r,f+o]),!c.isWalkableAt(p,f-o)&&c.isWalkableAt(p+r,f)&&d.push([p+r,f-o])):0===r?c.isWalkableAt(p,f+o)&&(d.push([p,f+o]),c.isWalkableAt(p+1,f)||d.push([p+1,f+o]),c.isWalkableAt(p-1,f)||d.push([p-1,f+o])):c.isWalkableAt(p+r,f)&&(d.push([p+r,f]),c.isWalkableAt(p,f+1)||d.push([p+r,f+1]),c.isWalkableAt(p,f-1)||d.push([p+r,f-1]));else for(a=c.getNeighbors(e,t.DiagonalMovement.IfAtMostOneObstacle),l=0,u=a.length;u>l;++l)s=a[l],d.push([s.x,s.y]);return d},n}(t.JumpPointFinderBase);t.JPFMoveDiagonallyIfAtMostOneObstacle=e,__reflect(e.prototype,"PF.JPFMoveDiagonallyIfAtMostOneObstacle")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype._jump=function(t,e,n,i){var r=this.grid,o=t-n,a=e-i;if(!r.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(r.getNodeAt(t,e).tested=!0),r.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o&&0!==a){if(this._jump(t+o,e,t,e)||this._jump(t,e+a,t,e))return[t,e]}else if(0!==o){if(r.isWalkableAt(t,e-1)&&!r.isWalkableAt(t-o,e-1)||r.isWalkableAt(t,e+1)&&!r.isWalkableAt(t-o,e+1))return[t,e]}else if(0!==a&&(r.isWalkableAt(t-1,e)&&!r.isWalkableAt(t-1,e-a)||r.isWalkableAt(t+1,e)&&!r.isWalkableAt(t+1,e-a)))return[t,e];return r.isWalkableAt(t+o,e)&&r.isWalkableAt(t,e+a)?this._jump(t+o,e+a,t,e):null},n.prototype._findNeighbors=function(e){var n,i,r,o,a,s,l,u,h=e.parent,p=e.x,f=e.y,c=this.grid,d=[];if(h)if(n=h.x,i=h.y,r=(p-n)/Math.max(Math.abs(p-n),1),o=(f-i)/Math.max(Math.abs(f-i),1),0!==r&&0!==o)c.isWalkableAt(p,f+o)&&d.push([p,f+o]),c.isWalkableAt(p+r,f)&&d.push([p+r,f]),c.isWalkableAt(p,f+o)&&c.isWalkableAt(p+r,f)&&d.push([p+r,f+o]);else{var g;if(0!==r){g=c.isWalkableAt(p+r,f);var v=c.isWalkableAt(p,f+1),b=c.isWalkableAt(p,f-1);g&&(d.push([p+r,f]),v&&d.push([p+r,f+1]),b&&d.push([p+r,f-1])),v&&d.push([p,f+1]),b&&d.push([p,f-1])}else if(0!==o){g=c.isWalkableAt(p,f+o);var A=c.isWalkableAt(p+1,f),y=c.isWalkableAt(p-1,f);g&&(d.push([p,f+o]),A&&d.push([p+1,f+o]),y&&d.push([p-1,f+o])),A&&d.push([p+1,f]),y&&d.push([p-1,f])}}else for(a=c.getNeighbors(e,t.DiagonalMovement.OnlyWhenNoObstacles),l=0,u=a.length;u>l;++l)s=a[l],d.push([s.x,s.y]);return d},n}(t.JumpPointFinderBase);t.JPFMoveDiagonallyIfNoObstacles=e,__reflect(e.prototype,"PF.JPFMoveDiagonallyIfNoObstacles")}(PF||(PF={}));var PF;!function(t){var e=function(e){function n(t){return e.call(this,t)||this}return __extends(n,e),n.prototype.jump=function(t,e,n,i){var r=this.grid,o=t-n,a=e-i;if(!r.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(r.getNodeAt(t,e).tested=!0),r.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o){if(r.isWalkableAt(t,e-1)&&!r.isWalkableAt(t-o,e-1)||r.isWalkableAt(t,e+1)&&!r.isWalkableAt(t-o,e+1))return[t,e]}else{if(0===a)throw new Error("Only horizontal and vertical movements are allowed");if(r.isWalkableAt(t-1,e)&&!r.isWalkableAt(t-1,e-a)||r.isWalkableAt(t+1,e)&&!r.isWalkableAt(t+1,e-a))return[t,e];if(this._jump(t+1,e,t,e)||this._jump(t-1,e,t,e))return[t,e]}return this._jump(t+o,e+a,t,e)},n.prototype._findNeighbors=function(e){var n,i,r,o,a,s,l,u,h=e.parent,p=e.x,f=e.y,c=this.grid,d=[];if(h)n=h.x,i=h.y,r=(p-n)/Math.max(Math.abs(p-n),1),o=(f-i)/Math.max(Math.abs(f-i),1),0!==r?(c.isWalkableAt(p,f-1)&&d.push([p,f-1]),c.isWalkableAt(p,f+1)&&d.push([p,f+1]),c.isWalkableAt(p+r,f)&&d.push([p+r,f])):0!==o&&(c.isWalkableAt(p-1,f)&&d.push([p-1,f]),c.isWalkableAt(p+1,f)&&d.push([p+1,f]),c.isWalkableAt(p,f+o)&&d.push([p,f+o]));else for(a=c.getNeighbors(e,t.DiagonalMovement.Never),l=0,u=a.length;u>l;++l)s=a[l],d.push([s.x,s.y]);return d},n}(t.JumpPointFinderBase);t.JPFNeverMoveDiagonally=e,__reflect(e.prototype,"PF.JPFNeverMoveDiagonally")}(PF||(PF={}));var PF;!function(t){var e=function(){function e(e){return e.diagonalMovement===t.DiagonalMovement.Never?new t.JPFNeverMoveDiagonally(e):e.diagonalMovement===t.DiagonalMovement.Always?new t.JPFAlwaysMoveDiagonally(e):e.diagonalMovement===t.DiagonalMovement.OnlyWhenNoObstacles?new t.JPFMoveDiagonallyIfNoObstacles(e):new t.JPFMoveDiagonallyIfAtMostOneObstacle(e)}return e}();t.JumpPointFinder=e,__reflect(e.prototype,"PF.JumpPointFinder")}(PF||(PF={}));