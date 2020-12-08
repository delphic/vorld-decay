(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.3.0

Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).glMatrix={})}(this,(function(t){"use strict";var n=1e-6,a="undefined"!=typeof Float32Array?Float32Array:Array,r=Math.random;var u=Math.PI/180;Math.hypot||(Math.hypot=function(){for(var t=0,n=arguments.length;n--;)t+=arguments[n]*arguments[n];return Math.sqrt(t)});var e=Object.freeze({__proto__:null,EPSILON:n,get ARRAY_TYPE(){return a},RANDOM:r,setMatrixArrayType:function(t){a=t},toRadian:function(t){return t*u},equals:function(t,a){return Math.abs(t-a)<=n*Math.max(1,Math.abs(t),Math.abs(a))}});function o(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*i+e*h,t[1]=u*i+o*h,t[2]=r*c+e*s,t[3]=u*c+o*s,t}function i(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}var h=o,c=i,s=Object.freeze({__proto__:null,create:function(){var t=new a(4);return a!=Float32Array&&(t[1]=0,t[2]=0),t[0]=1,t[3]=1,t},clone:function(t){var n=new a(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},fromValues:function(t,n,r,u){var e=new a(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=u,e},set:function(t,n,a,r,u){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t},transpose:function(t,n){if(t===n){var a=n[1];t[1]=n[2],t[2]=a}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*e-u*r;return o?(o=1/o,t[0]=e*o,t[1]=-r*o,t[2]=-u*o,t[3]=a*o,t):null},adjoint:function(t,n){var a=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=a,t},determinant:function(t){return t[0]*t[3]-t[2]*t[1]},multiply:o,rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+e*i,t[1]=u*h+o*i,t[2]=r*-i+e*h,t[3]=u*-i+o*h,t},scale:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],h=a[1];return t[0]=r*i,t[1]=u*i,t[2]=e*h,t[3]=o*h,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},str:function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3])},LDU:function(t,n,a,r){return t[2]=r[2]/r[0],a[0]=r[0],a[1]=r[1],a[3]=r[3]-t[2]*a[1],[t,n,a]},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t},subtract:i,exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=a[0],h=a[1],c=a[2],s=a[3];return Math.abs(r-i)<=n*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(u-h)<=n*Math.max(1,Math.abs(u),Math.abs(h))&&Math.abs(e-c)<=n*Math.max(1,Math.abs(e),Math.abs(c))&&Math.abs(o-s)<=n*Math.max(1,Math.abs(o),Math.abs(s))},multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},mul:h,sub:c});function M(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1],M=a[2],f=a[3],l=a[4],v=a[5];return t[0]=r*c+e*s,t[1]=u*c+o*s,t[2]=r*M+e*f,t[3]=u*M+o*f,t[4]=r*l+e*v+i,t[5]=u*l+o*v+h,t}function f(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t}var l=M,v=f,b=Object.freeze({__proto__:null,create:function(){var t=new a(6);return a!=Float32Array&&(t[1]=0,t[2]=0,t[4]=0,t[5]=0),t[0]=1,t[3]=1,t},clone:function(t){var n=new a(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},fromValues:function(t,n,r,u,e,o){var i=new a(6);return i[0]=t,i[1]=n,i[2]=r,i[3]=u,i[4]=e,i[5]=o,i},set:function(t,n,a,r,u,e,o){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=a*e-r*u;return h?(h=1/h,t[0]=e*h,t[1]=-r*h,t[2]=-u*h,t[3]=a*h,t[4]=(u*i-e*o)*h,t[5]=(r*o-a*i)*h,t):null},determinant:function(t){return t[0]*t[3]-t[1]*t[2]},multiply:M,rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=Math.sin(a),s=Math.cos(a);return t[0]=r*s+e*c,t[1]=u*s+o*c,t[2]=r*-c+e*s,t[3]=u*-c+o*s,t[4]=i,t[5]=h,t},scale:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1];return t[0]=r*c,t[1]=u*c,t[2]=e*s,t[3]=o*s,t[4]=i,t[5]=h,t},translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=r*c+e*s+i,t[5]=u*c+o*s+h,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t[4]=0,t[5]=0,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},str:function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],1)},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t},subtract:f,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],h=t[5],c=a[0],s=a[1],M=a[2],f=a[3],l=a[4],v=a[5];return Math.abs(r-c)<=n*Math.max(1,Math.abs(r),Math.abs(c))&&Math.abs(u-s)<=n*Math.max(1,Math.abs(u),Math.abs(s))&&Math.abs(e-M)<=n*Math.max(1,Math.abs(e),Math.abs(M))&&Math.abs(o-f)<=n*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(i-l)<=n*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(h-v)<=n*Math.max(1,Math.abs(h),Math.abs(v))},mul:l,sub:v});function m(){var t=new a(9);return a!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function d(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=a[0],l=a[1],v=a[2],b=a[3],m=a[4],d=a[5],x=a[6],p=a[7],y=a[8];return t[0]=f*r+l*o+v*c,t[1]=f*u+l*i+v*s,t[2]=f*e+l*h+v*M,t[3]=b*r+m*o+d*c,t[4]=b*u+m*i+d*s,t[5]=b*e+m*h+d*M,t[6]=x*r+p*o+y*c,t[7]=x*u+p*i+y*s,t[8]=x*e+p*h+y*M,t}function x(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t}var p=d,y=x,q=Object.freeze({__proto__:null,create:m,fromMat4:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},clone:function(t){var n=new a(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromValues:function(t,n,r,u,e,o,i,h,c){var s=new a(9);return s[0]=t,s[1]=n,s[2]=r,s[3]=u,s[4]=e,s[5]=o,s[6]=i,s[7]=h,s[8]=c,s},set:function(t,n,a,r,u,e,o,i,h,c){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=h,t[8]=c,t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},transpose:function(t,n){if(t===n){var a=n[1],r=n[2],u=n[5];t[1]=n[3],t[2]=n[6],t[3]=a,t[5]=n[7],t[6]=r,t[7]=u}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=s*o-i*c,f=-s*e+i*h,l=c*e-o*h,v=a*M+r*f+u*l;return v?(v=1/v,t[0]=M*v,t[1]=(-s*r+u*c)*v,t[2]=(i*r-u*o)*v,t[3]=f*v,t[4]=(s*a-u*h)*v,t[5]=(-i*a+u*e)*v,t[6]=l*v,t[7]=(-c*a+r*h)*v,t[8]=(o*a-r*e)*v,t):null},adjoint:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8];return t[0]=o*s-i*c,t[1]=u*c-r*s,t[2]=r*i-u*o,t[3]=i*h-e*s,t[4]=a*s-u*h,t[5]=u*e-a*i,t[6]=e*c-o*h,t[7]=r*h-a*c,t[8]=a*o-r*e,t},determinant:function(t){var n=t[0],a=t[1],r=t[2],u=t[3],e=t[4],o=t[5],i=t[6],h=t[7],c=t[8];return n*(c*e-o*h)+a*(-c*u+o*i)+r*(h*u-e*i)},multiply:d,translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=a[0],l=a[1];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=i,t[5]=h,t[6]=f*r+l*o+c,t[7]=f*u+l*i+s,t[8]=f*e+l*h+M,t},rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=Math.sin(a),l=Math.cos(a);return t[0]=l*r+f*o,t[1]=l*u+f*i,t[2]=l*e+f*h,t[3]=l*o-f*r,t[4]=l*i-f*u,t[5]=l*h-f*e,t[6]=c,t[7]=s,t[8]=M,t},scale:function(t,n,a){var r=a[0],u=a[1];return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=u*n[3],t[4]=u*n[4],t[5]=u*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=-a,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromMat2d:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a+a,i=r+r,h=u+u,c=a*o,s=r*o,M=r*i,f=u*o,l=u*i,v=u*h,b=e*o,m=e*i,d=e*h;return t[0]=1-M-v,t[3]=s-d,t[6]=f+m,t[1]=s+d,t[4]=1-c-v,t[7]=l-b,t[2]=f-m,t[5]=l+b,t[8]=1-c-M,t},normalFromMat4:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],x=a*i-r*o,p=a*h-u*o,y=a*c-e*o,q=r*h-u*i,g=r*c-e*i,_=u*c-e*h,A=s*b-M*v,w=s*m-f*v,z=s*d-l*v,R=M*m-f*b,j=M*d-l*b,P=f*d-l*m,T=x*P-p*j+y*R+q*z-g*w+_*A;return T?(T=1/T,t[0]=(i*P-h*j+c*R)*T,t[1]=(h*z-o*P-c*w)*T,t[2]=(o*j-i*z+c*A)*T,t[3]=(u*j-r*P-e*R)*T,t[4]=(a*P-u*z+e*w)*T,t[5]=(r*z-a*j-e*A)*T,t[6]=(b*_-m*g+d*q)*T,t[7]=(m*y-v*_-d*p)*T,t[8]=(v*g-b*y+d*x)*T,t):null},projection:function(t,n,a){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/a,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t},str:function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t},subtract:x,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],h=t[5],c=t[6],s=t[7],M=t[8],f=a[0],l=a[1],v=a[2],b=a[3],m=a[4],d=a[5],x=a[6],p=a[7],y=a[8];return Math.abs(r-f)<=n*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(u-l)<=n*Math.max(1,Math.abs(u),Math.abs(l))&&Math.abs(e-v)<=n*Math.max(1,Math.abs(e),Math.abs(v))&&Math.abs(o-b)<=n*Math.max(1,Math.abs(o),Math.abs(b))&&Math.abs(i-m)<=n*Math.max(1,Math.abs(i),Math.abs(m))&&Math.abs(h-d)<=n*Math.max(1,Math.abs(h),Math.abs(d))&&Math.abs(c-x)<=n*Math.max(1,Math.abs(c),Math.abs(x))&&Math.abs(s-p)<=n*Math.max(1,Math.abs(s),Math.abs(p))&&Math.abs(M-y)<=n*Math.max(1,Math.abs(M),Math.abs(y))},mul:p,sub:y});function g(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function _(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],b=n[12],m=n[13],d=n[14],x=n[15],p=a[0],y=a[1],q=a[2],g=a[3];return t[0]=p*r+y*i+q*M+g*b,t[1]=p*u+y*h+q*f+g*m,t[2]=p*e+y*c+q*l+g*d,t[3]=p*o+y*s+q*v+g*x,p=a[4],y=a[5],q=a[6],g=a[7],t[4]=p*r+y*i+q*M+g*b,t[5]=p*u+y*h+q*f+g*m,t[6]=p*e+y*c+q*l+g*d,t[7]=p*o+y*s+q*v+g*x,p=a[8],y=a[9],q=a[10],g=a[11],t[8]=p*r+y*i+q*M+g*b,t[9]=p*u+y*h+q*f+g*m,t[10]=p*e+y*c+q*l+g*d,t[11]=p*o+y*s+q*v+g*x,p=a[12],y=a[13],q=a[14],g=a[15],t[12]=p*r+y*i+q*M+g*b,t[13]=p*u+y*h+q*f+g*m,t[14]=p*e+y*c+q*l+g*d,t[15]=p*o+y*s+q*v+g*x,t}function A(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=r+r,h=u+u,c=e+e,s=r*i,M=r*h,f=r*c,l=u*h,v=u*c,b=e*c,m=o*i,d=o*h,x=o*c;return t[0]=1-(l+b),t[1]=M+x,t[2]=f-d,t[3]=0,t[4]=M-x,t[5]=1-(s+b),t[6]=v+m,t[7]=0,t[8]=f+d,t[9]=v-m,t[10]=1-(s+l),t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function w(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function z(t,n){var a=n[0],r=n[1],u=n[2],e=n[4],o=n[5],i=n[6],h=n[8],c=n[9],s=n[10];return t[0]=Math.hypot(a,r,u),t[1]=Math.hypot(e,o,i),t[2]=Math.hypot(h,c,s),t}function R(t,n){var r=new a(3);z(r,n);var u=1/r[0],e=1/r[1],o=1/r[2],i=n[0]*u,h=n[1]*e,c=n[2]*o,s=n[4]*u,M=n[5]*e,f=n[6]*o,l=n[8]*u,v=n[9]*e,b=n[10]*o,m=i+M+b,d=0;return m>0?(d=2*Math.sqrt(m+1),t[3]=.25*d,t[0]=(f-v)/d,t[1]=(l-c)/d,t[2]=(h-s)/d):i>M&&i>b?(d=2*Math.sqrt(1+i-M-b),t[3]=(f-v)/d,t[0]=.25*d,t[1]=(h+s)/d,t[2]=(l+c)/d):M>b?(d=2*Math.sqrt(1+M-i-b),t[3]=(l-c)/d,t[0]=(h+s)/d,t[1]=.25*d,t[2]=(f+v)/d):(d=2*Math.sqrt(1+b-i-M),t[3]=(h-s)/d,t[0]=(l+c)/d,t[1]=(f+v)/d,t[2]=.25*d),t}function j(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t[9]=n[9]-a[9],t[10]=n[10]-a[10],t[11]=n[11]-a[11],t[12]=n[12]-a[12],t[13]=n[13]-a[13],t[14]=n[14]-a[14],t[15]=n[15]-a[15],t}var P=_,T=j,S=Object.freeze({__proto__:null,create:function(){var t=new a(16);return a!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},clone:function(t){var n=new a(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},fromValues:function(t,n,r,u,e,o,i,h,c,s,M,f,l,v,b,m){var d=new a(16);return d[0]=t,d[1]=n,d[2]=r,d[3]=u,d[4]=e,d[5]=o,d[6]=i,d[7]=h,d[8]=c,d[9]=s,d[10]=M,d[11]=f,d[12]=l,d[13]=v,d[14]=b,d[15]=m,d},set:function(t,n,a,r,u,e,o,i,h,c,s,M,f,l,v,b,m){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=h,t[8]=c,t[9]=s,t[10]=M,t[11]=f,t[12]=l,t[13]=v,t[14]=b,t[15]=m,t},identity:g,transpose:function(t,n){if(t===n){var a=n[1],r=n[2],u=n[3],e=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=a,t[6]=n[9],t[7]=n[13],t[8]=r,t[9]=e,t[11]=n[14],t[12]=u,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],x=a*i-r*o,p=a*h-u*o,y=a*c-e*o,q=r*h-u*i,g=r*c-e*i,_=u*c-e*h,A=s*b-M*v,w=s*m-f*v,z=s*d-l*v,R=M*m-f*b,j=M*d-l*b,P=f*d-l*m,T=x*P-p*j+y*R+q*z-g*w+_*A;return T?(T=1/T,t[0]=(i*P-h*j+c*R)*T,t[1]=(u*j-r*P-e*R)*T,t[2]=(b*_-m*g+d*q)*T,t[3]=(f*g-M*_-l*q)*T,t[4]=(h*z-o*P-c*w)*T,t[5]=(a*P-u*z+e*w)*T,t[6]=(m*y-v*_-d*p)*T,t[7]=(s*_-f*y+l*p)*T,t[8]=(o*j-i*z+c*A)*T,t[9]=(r*z-a*j-e*A)*T,t[10]=(v*g-b*y+d*x)*T,t[11]=(M*y-s*g-l*x)*T,t[12]=(i*w-o*R-h*A)*T,t[13]=(a*R-r*w+u*A)*T,t[14]=(b*p-v*q-m*x)*T,t[15]=(s*q-M*p+f*x)*T,t):null},adjoint:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],x=a*i-r*o,p=a*h-u*o,y=a*c-e*o,q=r*h-u*i,g=r*c-e*i,_=u*c-e*h,A=s*b-M*v,w=s*m-f*v,z=s*d-l*v,R=M*m-f*b,j=M*d-l*b,P=f*d-l*m;return t[0]=i*P-h*j+c*R,t[1]=u*j-r*P-e*R,t[2]=b*_-m*g+d*q,t[3]=f*g-M*_-l*q,t[4]=h*z-o*P-c*w,t[5]=a*P-u*z+e*w,t[6]=m*y-v*_-d*p,t[7]=s*_-f*y+l*p,t[8]=o*j-i*z+c*A,t[9]=r*z-a*j-e*A,t[10]=v*g-b*y+d*x,t[11]=M*y-s*g-l*x,t[12]=i*w-o*R-h*A,t[13]=a*R-r*w+u*A,t[14]=b*p-v*q-m*x,t[15]=s*q-M*p+f*x,t},determinant:function(t){var n=t[0],a=t[1],r=t[2],u=t[3],e=t[4],o=t[5],i=t[6],h=t[7],c=t[8],s=t[9],M=t[10],f=t[11],l=t[12],v=t[13],b=t[14],m=n*o-a*e,d=n*i-r*e,x=a*i-r*o,p=c*v-s*l,y=c*b-M*l,q=s*b-M*v;return h*(n*q-a*y+r*p)-u*(e*q-o*y+i*p)+t[15]*(c*x-s*d+M*m)-f*(l*x-v*d+b*m)},multiply:_,translate:function(t,n,a){var r,u,e,o,i,h,c,s,M,f,l,v,b=a[0],m=a[1],d=a[2];return n===t?(t[12]=n[0]*b+n[4]*m+n[8]*d+n[12],t[13]=n[1]*b+n[5]*m+n[9]*d+n[13],t[14]=n[2]*b+n[6]*m+n[10]*d+n[14],t[15]=n[3]*b+n[7]*m+n[11]*d+n[15]):(r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=i,t[5]=h,t[6]=c,t[7]=s,t[8]=M,t[9]=f,t[10]=l,t[11]=v,t[12]=r*b+i*m+M*d+n[12],t[13]=u*b+h*m+f*d+n[13],t[14]=e*b+c*m+l*d+n[14],t[15]=o*b+s*m+v*d+n[15]),t},scale:function(t,n,a){var r=a[0],u=a[1],e=a[2];return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*u,t[5]=n[5]*u,t[6]=n[6]*u,t[7]=n[7]*u,t[8]=n[8]*e,t[9]=n[9]*e,t[10]=n[10]*e,t[11]=n[11]*e,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},rotate:function(t,a,r,u){var e,o,i,h,c,s,M,f,l,v,b,m,d,x,p,y,q,g,_,A,w,z,R,j,P=u[0],T=u[1],S=u[2],E=Math.hypot(P,T,S);return E<n?null:(P*=E=1/E,T*=E,S*=E,e=Math.sin(r),i=1-(o=Math.cos(r)),h=a[0],c=a[1],s=a[2],M=a[3],f=a[4],l=a[5],v=a[6],b=a[7],m=a[8],d=a[9],x=a[10],p=a[11],y=P*P*i+o,q=T*P*i+S*e,g=S*P*i-T*e,_=P*T*i-S*e,A=T*T*i+o,w=S*T*i+P*e,z=P*S*i+T*e,R=T*S*i-P*e,j=S*S*i+o,t[0]=h*y+f*q+m*g,t[1]=c*y+l*q+d*g,t[2]=s*y+v*q+x*g,t[3]=M*y+b*q+p*g,t[4]=h*_+f*A+m*w,t[5]=c*_+l*A+d*w,t[6]=s*_+v*A+x*w,t[7]=M*_+b*A+p*w,t[8]=h*z+f*R+m*j,t[9]=c*z+l*R+d*j,t[10]=s*z+v*R+x*j,t[11]=M*z+b*R+p*j,a!==t&&(t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t)},rotateX:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[4],o=n[5],i=n[6],h=n[7],c=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=e*u+c*r,t[5]=o*u+s*r,t[6]=i*u+M*r,t[7]=h*u+f*r,t[8]=c*u-e*r,t[9]=s*u-o*r,t[10]=M*u-i*r,t[11]=f*u-h*r,t},rotateY:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[0],o=n[1],i=n[2],h=n[3],c=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=e*u-c*r,t[1]=o*u-s*r,t[2]=i*u-M*r,t[3]=h*u-f*r,t[8]=e*r+c*u,t[9]=o*r+s*u,t[10]=i*r+M*u,t[11]=h*r+f*u,t},rotateZ:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[0],o=n[1],i=n[2],h=n[3],c=n[4],s=n[5],M=n[6],f=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=e*u+c*r,t[1]=o*u+s*r,t[2]=i*u+M*r,t[3]=h*u+f*r,t[4]=c*u-e*r,t[5]=s*u-o*r,t[6]=M*u-i*r,t[7]=f*u-h*r,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotation:function(t,a,r){var u,e,o,i=r[0],h=r[1],c=r[2],s=Math.hypot(i,h,c);return s<n?null:(i*=s=1/s,h*=s,c*=s,u=Math.sin(a),o=1-(e=Math.cos(a)),t[0]=i*i*o+e,t[1]=h*i*o+c*u,t[2]=c*i*o-h*u,t[3]=0,t[4]=i*h*o-c*u,t[5]=h*h*o+e,t[6]=c*h*o+i*u,t[7]=0,t[8]=i*c*o+h*u,t[9]=h*c*o-i*u,t[10]=c*c*o+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},fromXRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=a,t[7]=0,t[8]=0,t[9]=-a,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromYRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=0,t[2]=-a,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=a,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromZRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=0,t[4]=-a,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotationTranslation:A,fromQuat2:function(t,n){var r=new a(3),u=-n[0],e=-n[1],o=-n[2],i=n[3],h=n[4],c=n[5],s=n[6],M=n[7],f=u*u+e*e+o*o+i*i;return f>0?(r[0]=2*(h*i+M*u+c*o-s*e)/f,r[1]=2*(c*i+M*e+s*u-h*o)/f,r[2]=2*(s*i+M*o+h*e-c*u)/f):(r[0]=2*(h*i+M*u+c*o-s*e),r[1]=2*(c*i+M*e+s*u-h*o),r[2]=2*(s*i+M*o+h*e-c*u)),A(t,n,r),t},getTranslation:w,getScaling:z,getRotation:R,decompose:function(t,n,a,r){n[0]=r[12],n[1]=r[13],n[2]=r[14];var u=r[0],e=r[1],o=r[2],i=r[4],h=r[5],c=r[6],s=r[8],M=r[9],f=r[10];a[0]=Math.hypot(u,e,o),a[1]=Math.hypot(i,h,c),a[2]=Math.hypot(s,M,f);var l=1/a[0],v=1/a[1],b=1/a[2],m=u*l,d=e*v,x=o*b,p=i*l,y=h*v,q=c*b,g=s*l,_=M*v,A=f*b,w=m+y+A,z=0;return w>0?(z=2*Math.sqrt(w+1),t[3]=.25*z,t[0]=(q-_)/z,t[1]=(g-x)/z,t[2]=(d-p)/z):m>y&&m>A?(z=2*Math.sqrt(1+m-y-A),t[3]=(q-_)/z,t[0]=.25*z,t[1]=(d+p)/z,t[2]=(g+x)/z):y>A?(z=2*Math.sqrt(1+y-m-A),t[3]=(g-x)/z,t[0]=(d+p)/z,t[1]=.25*z,t[2]=(q+_)/z):(z=2*Math.sqrt(1+A-m-y),t[3]=(d-p)/z,t[0]=(g+x)/z,t[1]=(q+_)/z,t[2]=.25*z),t},fromRotationTranslationScale:function(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=n[3],h=u+u,c=e+e,s=o+o,M=u*h,f=u*c,l=u*s,v=e*c,b=e*s,m=o*s,d=i*h,x=i*c,p=i*s,y=r[0],q=r[1],g=r[2];return t[0]=(1-(v+m))*y,t[1]=(f+p)*y,t[2]=(l-x)*y,t[3]=0,t[4]=(f-p)*q,t[5]=(1-(M+m))*q,t[6]=(b+d)*q,t[7]=0,t[8]=(l+x)*g,t[9]=(b-d)*g,t[10]=(1-(M+v))*g,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t},fromRotationTranslationScaleOrigin:function(t,n,a,r,u){var e=n[0],o=n[1],i=n[2],h=n[3],c=e+e,s=o+o,M=i+i,f=e*c,l=e*s,v=e*M,b=o*s,m=o*M,d=i*M,x=h*c,p=h*s,y=h*M,q=r[0],g=r[1],_=r[2],A=u[0],w=u[1],z=u[2],R=(1-(b+d))*q,j=(l+y)*q,P=(v-p)*q,T=(l-y)*g,S=(1-(f+d))*g,E=(m+x)*g,O=(v+p)*_,D=(m-x)*_,F=(1-(f+b))*_;return t[0]=R,t[1]=j,t[2]=P,t[3]=0,t[4]=T,t[5]=S,t[6]=E,t[7]=0,t[8]=O,t[9]=D,t[10]=F,t[11]=0,t[12]=a[0]+A-(R*A+T*w+O*z),t[13]=a[1]+w-(j*A+S*w+D*z),t[14]=a[2]+z-(P*A+E*w+F*z),t[15]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a+a,i=r+r,h=u+u,c=a*o,s=r*o,M=r*i,f=u*o,l=u*i,v=u*h,b=e*o,m=e*i,d=e*h;return t[0]=1-M-v,t[1]=s+d,t[2]=f-m,t[3]=0,t[4]=s-d,t[5]=1-c-v,t[6]=l+b,t[7]=0,t[8]=f+m,t[9]=l-b,t[10]=1-c-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},frustum:function(t,n,a,r,u,e,o){var i=1/(a-n),h=1/(u-r),c=1/(e-o);return t[0]=2*e*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*e*h,t[6]=0,t[7]=0,t[8]=(a+n)*i,t[9]=(u+r)*h,t[10]=(o+e)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*e*2*c,t[15]=0,t},perspective:function(t,n,a,r,u){var e,o=1/Math.tan(n/2);return t[0]=o/a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=u&&u!==1/0?(e=1/(r-u),t[10]=(u+r)*e,t[14]=2*u*r*e):(t[10]=-1,t[14]=-2*r),t},perspectiveFromFieldOfView:function(t,n,a,r){var u=Math.tan(n.upDegrees*Math.PI/180),e=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),h=2/(o+i),c=2/(u+e);return t[0]=h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=c,t[6]=0,t[7]=0,t[8]=-(o-i)*h*.5,t[9]=(u-e)*c*.5,t[10]=r/(a-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*a/(a-r),t[15]=0,t},ortho:function(t,n,a,r,u,e,o){var i=1/(n-a),h=1/(r-u),c=1/(e-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+a)*i,t[13]=(u+r)*h,t[14]=(o+e)*c,t[15]=1,t},lookAt:function(t,a,r,u){var e,o,i,h,c,s,M,f,l,v,b=a[0],m=a[1],d=a[2],x=u[0],p=u[1],y=u[2],q=r[0],_=r[1],A=r[2];return Math.abs(b-q)<n&&Math.abs(m-_)<n&&Math.abs(d-A)<n?g(t):(M=b-q,f=m-_,l=d-A,e=p*(l*=v=1/Math.hypot(M,f,l))-y*(f*=v),o=y*(M*=v)-x*l,i=x*f-p*M,(v=Math.hypot(e,o,i))?(e*=v=1/v,o*=v,i*=v):(e=0,o=0,i=0),h=f*i-l*o,c=l*e-M*i,s=M*o-f*e,(v=Math.hypot(h,c,s))?(h*=v=1/v,c*=v,s*=v):(h=0,c=0,s=0),t[0]=e,t[1]=h,t[2]=M,t[3]=0,t[4]=o,t[5]=c,t[6]=f,t[7]=0,t[8]=i,t[9]=s,t[10]=l,t[11]=0,t[12]=-(e*b+o*m+i*d),t[13]=-(h*b+c*m+s*d),t[14]=-(M*b+f*m+l*d),t[15]=1,t)},targetTo:function(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=r[0],h=r[1],c=r[2],s=u-a[0],M=e-a[1],f=o-a[2],l=s*s+M*M+f*f;l>0&&(s*=l=1/Math.sqrt(l),M*=l,f*=l);var v=h*f-c*M,b=c*s-i*f,m=i*M-h*s;return(l=v*v+b*b+m*m)>0&&(v*=l=1/Math.sqrt(l),b*=l,m*=l),t[0]=v,t[1]=b,t[2]=m,t[3]=0,t[4]=M*m-f*b,t[5]=f*v-s*m,t[6]=s*b-M*v,t[7]=0,t[8]=s,t[9]=M,t[10]=f,t[11]=0,t[12]=u,t[13]=e,t[14]=o,t[15]=1,t},str:function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t[9]=n[9]+a[9],t[10]=n[10]+a[10],t[11]=n[11]+a[11],t[12]=n[12]+a[12],t[13]=n[13]+a[13],t[14]=n[14]+a[14],t[15]=n[15]+a[15],t},subtract:j,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=n[11]*a,t[12]=n[12]*a,t[13]=n[13]*a,t[14]=n[14]*a,t[15]=n[15]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t[9]=n[9]+a[9]*r,t[10]=n[10]+a[10]*r,t[11]=n[11]+a[11]*r,t[12]=n[12]+a[12]*r,t[13]=n[13]+a[13]*r,t[14]=n[14]+a[14]*r,t[15]=n[15]+a[15]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],h=t[5],c=t[6],s=t[7],M=t[8],f=t[9],l=t[10],v=t[11],b=t[12],m=t[13],d=t[14],x=t[15],p=a[0],y=a[1],q=a[2],g=a[3],_=a[4],A=a[5],w=a[6],z=a[7],R=a[8],j=a[9],P=a[10],T=a[11],S=a[12],E=a[13],O=a[14],D=a[15];return Math.abs(r-p)<=n*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(u-y)<=n*Math.max(1,Math.abs(u),Math.abs(y))&&Math.abs(e-q)<=n*Math.max(1,Math.abs(e),Math.abs(q))&&Math.abs(o-g)<=n*Math.max(1,Math.abs(o),Math.abs(g))&&Math.abs(i-_)<=n*Math.max(1,Math.abs(i),Math.abs(_))&&Math.abs(h-A)<=n*Math.max(1,Math.abs(h),Math.abs(A))&&Math.abs(c-w)<=n*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(s-z)<=n*Math.max(1,Math.abs(s),Math.abs(z))&&Math.abs(M-R)<=n*Math.max(1,Math.abs(M),Math.abs(R))&&Math.abs(f-j)<=n*Math.max(1,Math.abs(f),Math.abs(j))&&Math.abs(l-P)<=n*Math.max(1,Math.abs(l),Math.abs(P))&&Math.abs(v-T)<=n*Math.max(1,Math.abs(v),Math.abs(T))&&Math.abs(b-S)<=n*Math.max(1,Math.abs(b),Math.abs(S))&&Math.abs(m-E)<=n*Math.max(1,Math.abs(m),Math.abs(E))&&Math.abs(d-O)<=n*Math.max(1,Math.abs(d),Math.abs(O))&&Math.abs(x-D)<=n*Math.max(1,Math.abs(x),Math.abs(D))},mul:P,sub:T});function E(){var t=new a(3);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function O(t){var n=t[0],a=t[1],r=t[2];return Math.hypot(n,a,r)}function D(t,n,r){var u=new a(3);return u[0]=t,u[1]=n,u[2]=r,u}function F(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t}function I(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t}function L(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t}function V(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2];return Math.hypot(a,r,u)}function Q(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2];return a*a+r*r+u*u}function Y(t){var n=t[0],a=t[1],r=t[2];return n*n+a*a+r*r}function k(t,n){var a=n[0],r=n[1],u=n[2],e=a*a+r*r+u*u;return e>0&&(e=1/Math.sqrt(e)),t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t}function X(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Z(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[0],i=a[1],h=a[2];return t[0]=u*h-e*i,t[1]=e*o-r*h,t[2]=r*i-u*o,t}var B,N=F,C=I,U=L,W=V,G=Q,H=O,J=Y,K=(B=E(),function(t,n,a,r,u,e){var o,i;for(n||(n=3),a||(a=0),i=r?Math.min(r*n+a,t.length):t.length,o=a;o<i;o+=n)B[0]=t[o],B[1]=t[o+1],B[2]=t[o+2],u(B,B,e),t[o]=B[0],t[o+1]=B[1],t[o+2]=B[2];return t}),$=Object.freeze({__proto__:null,create:E,clone:function(t){var n=new a(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},length:O,fromValues:D,copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},set:function(t,n,a,r){return t[0]=n,t[1]=a,t[2]=r,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t},subtract:F,multiply:I,divide:L,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t},distance:V,squaredDistance:Q,squaredLength:Y,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},normalize:k,dot:X,cross:Z,lerp:function(t,n,a,r){var u=n[0],e=n[1],o=n[2];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t[2]=o+r*(a[2]-o),t},slerp:function(t,n,a,r){var u=Math.acos(Math.min(Math.max(X(n,a),-1),1)),e=Math.sin(u),o=Math.sin((1-r)*u)/e,i=Math.sin(r*u)/e;return t[0]=o*n[0]+i*a[0],t[1]=o*n[1]+i*a[1],t[2]=o*n[2]+i*a[2],t},hermite:function(t,n,a,r,u,e){var o=e*e,i=o*(2*e-3)+1,h=o*(e-2)+e,c=o*(e-1),s=o*(3-2*e);return t[0]=n[0]*i+a[0]*h+r[0]*c+u[0]*s,t[1]=n[1]*i+a[1]*h+r[1]*c+u[1]*s,t[2]=n[2]*i+a[2]*h+r[2]*c+u[2]*s,t},bezier:function(t,n,a,r,u,e){var o=1-e,i=o*o,h=e*e,c=i*o,s=3*e*i,M=3*h*o,f=h*e;return t[0]=n[0]*c+a[0]*s+r[0]*M+u[0]*f,t[1]=n[1]*c+a[1]*s+r[1]*M+u[1]*f,t[2]=n[2]*c+a[2]*s+r[2]*M+u[2]*f,t},random:function(t,n){n=n||1;var a=2*r()*Math.PI,u=2*r()-1,e=Math.sqrt(1-u*u)*n;return t[0]=Math.cos(a)*e,t[1]=Math.sin(a)*e,t[2]=u*n,t},transformMat4:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[3]*r+a[7]*u+a[11]*e+a[15];return o=o||1,t[0]=(a[0]*r+a[4]*u+a[8]*e+a[12])/o,t[1]=(a[1]*r+a[5]*u+a[9]*e+a[13])/o,t[2]=(a[2]*r+a[6]*u+a[10]*e+a[14])/o,t},transformMat3:function(t,n,a){var r=n[0],u=n[1],e=n[2];return t[0]=r*a[0]+u*a[3]+e*a[6],t[1]=r*a[1]+u*a[4]+e*a[7],t[2]=r*a[2]+u*a[5]+e*a[8],t},transformQuat:function(t,n,a){var r=a[0],u=a[1],e=a[2],o=a[3],i=n[0],h=n[1],c=n[2],s=u*c-e*h,M=e*i-r*c,f=r*h-u*i,l=u*f-e*M,v=e*s-r*f,b=r*M-u*s,m=2*o;return s*=m,M*=m,f*=m,l*=2,v*=2,b*=2,t[0]=i+s+l,t[1]=h+M+v,t[2]=c+f+b,t},rotateX:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[0],e[1]=u[1]*Math.cos(r)-u[2]*Math.sin(r),e[2]=u[1]*Math.sin(r)+u[2]*Math.cos(r),t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},rotateY:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[2]*Math.sin(r)+u[0]*Math.cos(r),e[1]=u[1],e[2]=u[2]*Math.cos(r)-u[0]*Math.sin(r),t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},rotateZ:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[0]*Math.cos(r)-u[1]*Math.sin(r),e[1]=u[0]*Math.sin(r)+u[1]*Math.cos(r),e[2]=u[2],t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},angle:function(t,n){var a=t[0],r=t[1],u=t[2],e=n[0],o=n[1],i=n[2],h=Math.sqrt(a*a+r*r+u*u)*Math.sqrt(e*e+o*o+i*i),c=h&&X(t,n)/h;return Math.acos(Math.min(Math.max(c,-1),1))},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t},str:function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=a[0],i=a[1],h=a[2];return Math.abs(r-o)<=n*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(u-i)<=n*Math.max(1,Math.abs(u),Math.abs(i))&&Math.abs(e-h)<=n*Math.max(1,Math.abs(e),Math.abs(h))},sub:N,mul:C,div:U,dist:W,sqrDist:G,len:H,sqrLen:J,forEach:K});function tt(){var t=new a(4);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function nt(t){var n=new a(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function at(t,n,r,u){var e=new a(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=u,e}function rt(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function ut(t,n,a,r,u){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t}function et(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t}function ot(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}function it(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t[3]=n[3]*a[3],t}function ht(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t[3]=n[3]/a[3],t}function ct(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t}function st(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return Math.hypot(a,r,u,e)}function Mt(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return a*a+r*r+u*u+e*e}function ft(t){var n=t[0],a=t[1],r=t[2],u=t[3];return Math.hypot(n,a,r,u)}function lt(t){var n=t[0],a=t[1],r=t[2],u=t[3];return n*n+a*a+r*r+u*u}function vt(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*a+r*r+u*u+e*e;return o>0&&(o=1/Math.sqrt(o)),t[0]=a*o,t[1]=r*o,t[2]=u*o,t[3]=e*o,t}function bt(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function mt(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=n[3];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t[2]=o+r*(a[2]-o),t[3]=i+r*(a[3]-i),t}function dt(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function xt(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=a[0],h=a[1],c=a[2],s=a[3];return Math.abs(r-i)<=n*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(u-h)<=n*Math.max(1,Math.abs(u),Math.abs(h))&&Math.abs(e-c)<=n*Math.max(1,Math.abs(e),Math.abs(c))&&Math.abs(o-s)<=n*Math.max(1,Math.abs(o),Math.abs(s))}var pt=ot,yt=it,qt=ht,gt=st,_t=Mt,At=ft,wt=lt,zt=function(){var t=tt();return function(n,a,r,u,e,o){var i,h;for(a||(a=4),r||(r=0),h=u?Math.min(u*a+r,n.length):n.length,i=r;i<h;i+=a)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],e(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}(),Rt=Object.freeze({__proto__:null,create:tt,clone:nt,fromValues:at,copy:rt,set:ut,add:et,subtract:ot,multiply:it,divide:ht,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t[3]=Math.min(n[3],a[3]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t[3]=Math.max(n[3],a[3]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},scale:ct,scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},distance:st,squaredDistance:Mt,length:ft,squaredLength:lt,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},normalize:vt,dot:bt,cross:function(t,n,a,r){var u=a[0]*r[1]-a[1]*r[0],e=a[0]*r[2]-a[2]*r[0],o=a[0]*r[3]-a[3]*r[0],i=a[1]*r[2]-a[2]*r[1],h=a[1]*r[3]-a[3]*r[1],c=a[2]*r[3]-a[3]*r[2],s=n[0],M=n[1],f=n[2],l=n[3];return t[0]=M*c-f*h+l*i,t[1]=-s*c+f*o-l*e,t[2]=s*h-M*o+l*u,t[3]=-s*i+M*e-f*u,t},lerp:mt,random:function(t,n){var a,u,e,o,i,h;n=n||1;do{i=(a=2*r()-1)*a+(u=2*r()-1)*u}while(i>=1);do{h=(e=2*r()-1)*e+(o=2*r()-1)*o}while(h>=1);var c=Math.sqrt((1-i)/h);return t[0]=n*a,t[1]=n*u,t[2]=n*e*c,t[3]=n*o*c,t},transformMat4:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3];return t[0]=a[0]*r+a[4]*u+a[8]*e+a[12]*o,t[1]=a[1]*r+a[5]*u+a[9]*e+a[13]*o,t[2]=a[2]*r+a[6]*u+a[10]*e+a[14]*o,t[3]=a[3]*r+a[7]*u+a[11]*e+a[15]*o,t},transformQuat:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[0],i=a[1],h=a[2],c=a[3],s=c*r+i*e-h*u,M=c*u+h*r-o*e,f=c*e+o*u-i*r,l=-o*r-i*u-h*e;return t[0]=s*c+l*-o+M*-h-f*-i,t[1]=M*c+l*-i+f*-o-s*-h,t[2]=f*c+l*-h+s*-i-M*-o,t[3]=n[3],t},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:dt,equals:xt,sub:pt,mul:yt,div:qt,dist:gt,sqrDist:_t,len:At,sqrLen:wt,forEach:zt});function jt(){var t=new a(4);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function Pt(t,n,a){a*=.5;var r=Math.sin(a);return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=Math.cos(a),t}function Tt(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*s+o*i+u*c-e*h,t[1]=u*s+o*h+e*i-r*c,t[2]=e*s+o*c+r*h-u*i,t[3]=o*s-r*i-u*h-e*c,t}function St(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+o*i,t[1]=u*h+e*i,t[2]=e*h-u*i,t[3]=o*h-r*i,t}function Et(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h-e*i,t[1]=u*h+o*i,t[2]=e*h+r*i,t[3]=o*h-u*i,t}function Ot(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+u*i,t[1]=u*h-r*i,t[2]=e*h+o*i,t[3]=o*h-e*i,t}function Dt(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=Math.sqrt(a*a+r*r+u*u),i=Math.exp(e),h=o>0?i*Math.sin(o)/o:0;return t[0]=a*h,t[1]=r*h,t[2]=u*h,t[3]=i*Math.cos(o),t}function Ft(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=Math.sqrt(a*a+r*r+u*u),i=o>0?Math.atan2(o,e)/o:0;return t[0]=a*i,t[1]=r*i,t[2]=u*i,t[3]=.5*Math.log(a*a+r*r+u*u+e*e),t}function It(t,a,r,u){var e,o,i,h,c,s=a[0],M=a[1],f=a[2],l=a[3],v=r[0],b=r[1],m=r[2],d=r[3];return(o=s*v+M*b+f*m+l*d)<0&&(o=-o,v=-v,b=-b,m=-m,d=-d),1-o>n?(e=Math.acos(o),i=Math.sin(e),h=Math.sin((1-u)*e)/i,c=Math.sin(u*e)/i):(h=1-u,c=u),t[0]=h*s+c*v,t[1]=h*M+c*b,t[2]=h*f+c*m,t[3]=h*l+c*d,t}function Lt(t,n){var a,r=n[0]+n[4]+n[8];if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var u=0;n[4]>n[0]&&(u=1),n[8]>n[3*u+u]&&(u=2);var e=(u+1)%3,o=(u+2)%3;a=Math.sqrt(n[3*u+u]-n[3*e+e]-n[3*o+o]+1),t[u]=.5*a,a=.5/a,t[3]=(n[3*e+o]-n[3*o+e])*a,t[e]=(n[3*e+u]+n[3*u+e])*a,t[o]=(n[3*o+u]+n[3*u+o])*a}return t}var Vt,Qt,Yt,kt,Xt,Zt,Bt=nt,Nt=at,Ct=rt,Ut=ut,Wt=et,Gt=Tt,Ht=ct,Jt=bt,Kt=mt,$t=ft,tn=$t,nn=lt,an=nn,rn=vt,un=dt,en=xt,on=(Vt=E(),Qt=D(1,0,0),Yt=D(0,1,0),function(t,n,a){var r=X(n,a);return r<-.999999?(Z(Vt,Qt,n),H(Vt)<1e-6&&Z(Vt,Yt,n),k(Vt,Vt),Pt(t,Vt,Math.PI),t):r>.999999?(t[0]=0,t[1]=0,t[2]=0,t[3]=1,t):(Z(Vt,n,a),t[0]=Vt[0],t[1]=Vt[1],t[2]=Vt[2],t[3]=1+r,rn(t,t))}),hn=(kt=jt(),Xt=jt(),function(t,n,a,r,u,e){return It(kt,n,u,e),It(Xt,a,r,e),It(t,kt,Xt,2*e*(1-e)),t}),cn=(Zt=m(),function(t,n,a,r){return Zt[0]=a[0],Zt[3]=a[1],Zt[6]=a[2],Zt[1]=r[0],Zt[4]=r[1],Zt[7]=r[2],Zt[2]=-n[0],Zt[5]=-n[1],Zt[8]=-n[2],rn(t,Lt(t,Zt))}),sn=Object.freeze({__proto__:null,create:jt,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},setAxisAngle:Pt,getAxisAngle:function(t,a){var r=2*Math.acos(a[3]),u=Math.sin(r/2);return u>n?(t[0]=a[0]/u,t[1]=a[1]/u,t[2]=a[2]/u):(t[0]=1,t[1]=0,t[2]=0),r},getAngle:function(t,n){var a=Jt(t,n);return Math.acos(2*a*a-1)},multiply:Tt,rotateX:St,rotateY:Et,rotateZ:Ot,calculateW:function(t,n){var a=n[0],r=n[1],u=n[2];return t[0]=a,t[1]=r,t[2]=u,t[3]=Math.sqrt(Math.abs(1-a*a-r*r-u*u)),t},exp:Dt,ln:Ft,pow:function(t,n,a){return Ft(t,n),Ht(t,t,a),Dt(t,t),t},slerp:It,random:function(t){var n=r(),a=r(),u=r(),e=Math.sqrt(1-n),o=Math.sqrt(n);return t[0]=e*Math.sin(2*Math.PI*a),t[1]=e*Math.cos(2*Math.PI*a),t[2]=o*Math.sin(2*Math.PI*u),t[3]=o*Math.cos(2*Math.PI*u),t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*a+r*r+u*u+e*e,i=o?1/o:0;return t[0]=-a*i,t[1]=-r*i,t[2]=-u*i,t[3]=e*i,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},fromMat3:Lt,fromEuler:function(t,n,a,r){var u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"zyx",e=.5*Math.PI/180;n*=e,r*=e,a*=e;var o=Math.sin(n),i=Math.cos(n),h=Math.sin(a),c=Math.cos(a),s=Math.sin(r),M=Math.cos(r);switch("string"!=typeof u&&(u="zyx"),u.toLowerCase()){case"xyz":t[0]=o*c*M+i*h*s,t[1]=i*h*M-o*c*s,t[2]=i*c*s+o*h*M,t[3]=i*c*M-o*h*s;break;case"xzy":t[0]=o*c*M-i*h*s,t[1]=i*h*M-o*c*s,t[2]=i*c*s+o*h*M,t[3]=i*c*M+o*h*s;break;case"yxz":t[0]=o*c*M+i*h*s,t[1]=i*h*M-o*c*s,t[2]=i*c*s-o*h*M,t[3]=i*c*M+o*h*s;break;case"yzx":t[0]=o*c*M+i*h*s,t[1]=i*h*M+o*c*s,t[2]=i*c*s-o*h*M,t[3]=i*c*M-o*h*s;break;case"zxy":t[0]=o*c*M-i*h*s,t[1]=i*h*M+o*c*s,t[2]=i*c*s+o*h*M,t[3]=i*c*M-o*h*s;break;case"zyx":default:t[0]=o*c*M-i*h*s,t[1]=i*h*M+o*c*s,t[2]=i*c*s-o*h*M,t[3]=i*c*M+o*h*s}return t},str:function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},clone:Bt,fromValues:Nt,copy:Ct,set:Ut,add:Wt,mul:Gt,scale:Ht,dot:Jt,lerp:Kt,length:$t,len:tn,squaredLength:nn,sqrLen:an,normalize:rn,exactEquals:un,equals:en,rotationTo:on,sqlerp:hn,setAxes:cn});function Mn(t,n,a){var r=.5*a[0],u=.5*a[1],e=.5*a[2],o=n[0],i=n[1],h=n[2],c=n[3];return t[0]=o,t[1]=i,t[2]=h,t[3]=c,t[4]=r*c+u*h-e*i,t[5]=u*c+e*o-r*h,t[6]=e*c+r*i-u*o,t[7]=-r*o-u*i-e*h,t}function fn(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t}var ln=Ct;var vn=Ct;function bn(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[4],h=a[5],c=a[6],s=a[7],M=n[4],f=n[5],l=n[6],v=n[7],b=a[0],m=a[1],d=a[2],x=a[3];return t[0]=r*x+o*b+u*d-e*m,t[1]=u*x+o*m+e*b-r*d,t[2]=e*x+o*d+r*m-u*b,t[3]=o*x-r*b-u*m-e*d,t[4]=r*s+o*i+u*c-e*h+M*x+v*b+f*d-l*m,t[5]=u*s+o*h+e*i-r*c+f*x+v*m+l*b-M*d,t[6]=e*s+o*c+r*h-u*i+l*x+v*d+M*m-f*b,t[7]=o*s-r*i-u*h-e*c+v*x-M*b-f*m-l*d,t}var mn=bn;var dn=Jt;var xn=$t,pn=xn,yn=nn,qn=yn;var gn=Object.freeze({__proto__:null,create:function(){var t=new a(8);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0),t[3]=1,t},clone:function(t){var n=new a(8);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n},fromValues:function(t,n,r,u,e,o,i,h){var c=new a(8);return c[0]=t,c[1]=n,c[2]=r,c[3]=u,c[4]=e,c[5]=o,c[6]=i,c[7]=h,c},fromRotationTranslationValues:function(t,n,r,u,e,o,i){var h=new a(8);h[0]=t,h[1]=n,h[2]=r,h[3]=u;var c=.5*e,s=.5*o,M=.5*i;return h[4]=c*u+s*r-M*n,h[5]=s*u+M*t-c*r,h[6]=M*u+c*n-s*t,h[7]=-c*t-s*n-M*r,h},fromRotationTranslation:Mn,fromTranslation:function(t,n){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=.5*n[0],t[5]=.5*n[1],t[6]=.5*n[2],t[7]=0,t},fromRotation:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},fromMat4:function(t,n){var r=jt();R(r,n);var u=new a(3);return w(u,n),Mn(t,r,u),t},copy:fn,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},set:function(t,n,a,r,u,e,o,i,h){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=h,t},getReal:ln,getDual:function(t,n){return t[0]=n[4],t[1]=n[5],t[2]=n[6],t[3]=n[7],t},setReal:vn,setDual:function(t,n){return t[4]=n[0],t[5]=n[1],t[6]=n[2],t[7]=n[3],t},getTranslation:function(t,n){var a=n[4],r=n[5],u=n[6],e=n[7],o=-n[0],i=-n[1],h=-n[2],c=n[3];return t[0]=2*(a*c+e*o+r*h-u*i),t[1]=2*(r*c+e*i+u*o-a*h),t[2]=2*(u*c+e*h+a*i-r*o),t},translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=.5*a[0],h=.5*a[1],c=.5*a[2],s=n[4],M=n[5],f=n[6],l=n[7];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=o*i+u*c-e*h+s,t[5]=o*h+e*i-r*c+M,t[6]=o*c+r*h-u*i+f,t[7]=-r*i-u*h-e*c+l,t},rotateX:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*e-c*u,f=h*o+s*u+c*r-i*e,l=c*o+s*e+i*u-h*r,v=s*o-i*r-h*u-c*e;return St(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateY:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*e-c*u,f=h*o+s*u+c*r-i*e,l=c*o+s*e+i*u-h*r,v=s*o-i*r-h*u-c*e;return Et(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateZ:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*e-c*u,f=h*o+s*u+c*r-i*e,l=c*o+s*e+i*u-h*r,v=s*o-i*r-h*u-c*e;return Ot(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateByQuatAppend:function(t,n,a){var r=a[0],u=a[1],e=a[2],o=a[3],i=n[0],h=n[1],c=n[2],s=n[3];return t[0]=i*o+s*r+h*e-c*u,t[1]=h*o+s*u+c*r-i*e,t[2]=c*o+s*e+i*u-h*r,t[3]=s*o-i*r-h*u-c*e,i=n[4],h=n[5],c=n[6],s=n[7],t[4]=i*o+s*r+h*e-c*u,t[5]=h*o+s*u+c*r-i*e,t[6]=c*o+s*e+i*u-h*r,t[7]=s*o-i*r-h*u-c*e,t},rotateByQuatPrepend:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*s+o*i+u*c-e*h,t[1]=u*s+o*h+e*i-r*c,t[2]=e*s+o*c+r*h-u*i,t[3]=o*s-r*i-u*h-e*c,i=a[4],h=a[5],c=a[6],s=a[7],t[4]=r*s+o*i+u*c-e*h,t[5]=u*s+o*h+e*i-r*c,t[6]=e*s+o*c+r*h-u*i,t[7]=o*s-r*i-u*h-e*c,t},rotateAroundAxis:function(t,a,r,u){if(Math.abs(u)<n)return fn(t,a);var e=Math.hypot(r[0],r[1],r[2]);u*=.5;var o=Math.sin(u),i=o*r[0]/e,h=o*r[1]/e,c=o*r[2]/e,s=Math.cos(u),M=a[0],f=a[1],l=a[2],v=a[3];t[0]=M*s+v*i+f*c-l*h,t[1]=f*s+v*h+l*i-M*c,t[2]=l*s+v*c+M*h-f*i,t[3]=v*s-M*i-f*h-l*c;var b=a[4],m=a[5],d=a[6],x=a[7];return t[4]=b*s+x*i+m*c-d*h,t[5]=m*s+x*h+d*i-b*c,t[6]=d*s+x*c+b*h-m*i,t[7]=x*s-b*i-m*h-d*c,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t},multiply:bn,mul:mn,scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t},dot:dn,lerp:function(t,n,a,r){var u=1-r;return dn(n,a)<0&&(r=-r),t[0]=n[0]*u+a[0]*r,t[1]=n[1]*u+a[1]*r,t[2]=n[2]*u+a[2]*r,t[3]=n[3]*u+a[3]*r,t[4]=n[4]*u+a[4]*r,t[5]=n[5]*u+a[5]*r,t[6]=n[6]*u+a[6]*r,t[7]=n[7]*u+a[7]*r,t},invert:function(t,n){var a=yn(n);return t[0]=-n[0]/a,t[1]=-n[1]/a,t[2]=-n[2]/a,t[3]=n[3]/a,t[4]=-n[4]/a,t[5]=-n[5]/a,t[6]=-n[6]/a,t[7]=n[7]/a,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t[4]=-n[4],t[5]=-n[5],t[6]=-n[6],t[7]=n[7],t},length:xn,len:pn,squaredLength:yn,sqrLen:qn,normalize:function(t,n){var a=yn(n);if(a>0){a=Math.sqrt(a);var r=n[0]/a,u=n[1]/a,e=n[2]/a,o=n[3]/a,i=n[4],h=n[5],c=n[6],s=n[7],M=r*i+u*h+e*c+o*s;t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=(i-r*M)/a,t[5]=(h-u*M)/a,t[6]=(c-e*M)/a,t[7]=(s-o*M)/a}return t},str:function(t){return"quat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],h=t[5],c=t[6],s=t[7],M=a[0],f=a[1],l=a[2],v=a[3],b=a[4],m=a[5],d=a[6],x=a[7];return Math.abs(r-M)<=n*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(u-f)<=n*Math.max(1,Math.abs(u),Math.abs(f))&&Math.abs(e-l)<=n*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(o-v)<=n*Math.max(1,Math.abs(o),Math.abs(v))&&Math.abs(i-b)<=n*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(h-m)<=n*Math.max(1,Math.abs(h),Math.abs(m))&&Math.abs(c-d)<=n*Math.max(1,Math.abs(c),Math.abs(d))&&Math.abs(s-x)<=n*Math.max(1,Math.abs(s),Math.abs(x))}});function _n(){var t=new a(2);return a!=Float32Array&&(t[0]=0,t[1]=0),t}function An(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t}function wn(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t}function zn(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t}function Rn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return Math.hypot(a,r)}function jn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return a*a+r*r}function Pn(t){var n=t[0],a=t[1];return Math.hypot(n,a)}function Tn(t){var n=t[0],a=t[1];return n*n+a*a}var Sn=Pn,En=An,On=wn,Dn=zn,Fn=Rn,In=jn,Ln=Tn,Vn=function(){var t=_n();return function(n,a,r,u,e,o){var i,h;for(a||(a=2),r||(r=0),h=u?Math.min(u*a+r,n.length):n.length,i=r;i<h;i+=a)t[0]=n[i],t[1]=n[i+1],e(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}(),Qn=Object.freeze({__proto__:null,create:_n,clone:function(t){var n=new a(2);return n[0]=t[0],n[1]=t[1],n},fromValues:function(t,n){var r=new a(2);return r[0]=t,r[1]=n,r},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t},set:function(t,n,a){return t[0]=n,t[1]=a,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t},subtract:An,multiply:wn,divide:zn,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t},distance:Rn,squaredDistance:jn,length:Pn,squaredLength:Tn,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},normalize:function(t,n){var a=n[0],r=n[1],u=a*a+r*r;return u>0&&(u=1/Math.sqrt(u)),t[0]=n[0]*u,t[1]=n[1]*u,t},dot:function(t,n){return t[0]*n[0]+t[1]*n[1]},cross:function(t,n,a){var r=n[0]*a[1]-n[1]*a[0];return t[0]=t[1]=0,t[2]=r,t},lerp:function(t,n,a,r){var u=n[0],e=n[1];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t},random:function(t,n){n=n||1;var a=2*r()*Math.PI;return t[0]=Math.cos(a)*n,t[1]=Math.sin(a)*n,t},transformMat2:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[2]*u,t[1]=a[1]*r+a[3]*u,t},transformMat2d:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[2]*u+a[4],t[1]=a[1]*r+a[3]*u+a[5],t},transformMat3:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[3]*u+a[6],t[1]=a[1]*r+a[4]*u+a[7],t},transformMat4:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[4]*u+a[12],t[1]=a[1]*r+a[5]*u+a[13],t},rotate:function(t,n,a,r){var u=n[0]-a[0],e=n[1]-a[1],o=Math.sin(r),i=Math.cos(r);return t[0]=u*i-e*o+a[0],t[1]=u*o+e*i+a[1],t},angle:function(t,n){var a=t[0],r=t[1],u=n[0],e=n[1],o=Math.sqrt(a*a+r*r)*Math.sqrt(u*u+e*e),i=o&&(a*u+r*e)/o;return Math.acos(Math.min(Math.max(i,-1),1))},zero:function(t){return t[0]=0,t[1]=0,t},str:function(t){return"vec2("+t[0]+", "+t[1]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]},equals:function(t,a){var r=t[0],u=t[1],e=a[0],o=a[1];return Math.abs(r-e)<=n*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(u-o)<=n*Math.max(1,Math.abs(u),Math.abs(o))},len:Sn,sub:En,mul:On,div:Dn,dist:Fn,sqrDist:In,sqrLen:Ln,forEach:Vn});t.glMatrix=e,t.mat2=s,t.mat2d=b,t.mat3=q,t.mat4=S,t.quat=sn,t.quat2=gn,t.vec2=Qn,t.vec3=$,t.vec4=Rt,Object.defineProperty(t,"__esModule",{value:!0})}));

},{}],2:[function(require,module,exports){
// This is a centralised point for importing glMatrix
// Also provides a helper for globalizing for ease of use
let glMatrix = require('../libs/gl-matrix-min');

// Created here so that any local variables in the Maths Module
// does not stop the globalising of the variable.
let globalize = () => {
  // Lets create some globals!
  mat2 = glMatrix.mat2;
  mat3 = glMatrix.mat3;
  mat4 = glMatrix.mat4;
  quat = glMatrix.quat;
  quat2 = glMatrix.quat2;
  vec2 = glMatrix.vec2;
  vec3 = glMatrix.vec3;
  vec4 = glMatrix.vec4;
  // Would be nice if there was a way to add to the context a function
  // was called in but don't think that's possible?
};

// Use of object freeze has funnily enough frozen these objects
// if we wish to extend we'll need to update our fork of glMatrix (done)
// make the changes and then build - I *think* we just want to remove the freezes?
// then we can extend it here for clarity?

let Maths = module.exports = (function() {
  let exports = {
    glMatrix: glMatrix,
    toRadian: glMatrix.glMatrix.toRadian,
    equals: glMatrix.glMatrix.equals,
    mat2: glMatrix.mat2,
    mat3: glMatrix.mat3,
    mat4: glMatrix.mat4,
    quat: glMatrix.quat,
    quat2: glMatrix.quat2,
    vec2: glMatrix.vec2,
    vec3: glMatrix.vec3,
    vec4:  glMatrix.vec4
  };

  // TODO: Add plane 'class' - it's a vec4 with 0-2 being the normal vector and 3 being the distance to the origin from the plane along the normal vector
  // I.e. the dot product of the offset point?

  var vec3X = exports.vec3X = glMatrix.vec3.fromValues(1,0,0);
  var vec3Y = exports.vec3Y = glMatrix.vec3.fromValues(0,1,0);
  var vec3Z = exports.vec3Z = glMatrix.vec3.fromValues(0,0,1);

  let equals = glMatrix.glMatrix.equals;

  // TODO: create quat from euler

  exports.quatIdentity = function(q) {
    // Is the provided quaterion identity
    return (equals(q[0], 0) && equals(q[1], 0) && equals(q[2], 0) && equals(q[3], 1));
  }

  exports.quatRotate = (function() {
  	var i = glMatrix.quat.create();
  	return function(out, q, rad, axis) {
  		glMatrix.quat.setAxisAngle(i, axis, rad);
  		return glMatrix.quat.multiply(out, i, q);
  	};
  })();

  exports.quatLocalAxes = function(q, localX, localY, localZ) {
    glMatrix.vec3.transformQuat(localX, vec3X, q);
    glMatrix.vec3.transformQuat(localY, vec3Y, q);
    glMatrix.vec3.transformQuat(localZ, vec3Z, q);
  };

  // See https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
  // Note: They define roll as rotation around x axis, pitch around y axis, and yaw around z-axis
  // I do not agree, roll is around z-axis, pitch around x-axis, and yaw around y-axis.
  // Methods renamed accordingly

  // I attempted to swap and rearrange some of the formula so pitch could be -pi/2 to pi/2 range
  // and yaw would be -pi to pi but naively swapping the formula according to the apparent pattern did not work
  // c.f. 7dfps player class for hacky work around - TODO: Fix these
  exports.calculatePitch = function(q) {
  	// x-axis rotation
  	let w = q[3], x = q[0], y = q[1], z = q[2];
  	return Math.atan2(2 * (w*x + y*z), 1 - 2 * (x*x + y*y)); // use atan and probably would get -90:90?
  };

  exports.calculateYaw = function(q) {
  	// y-axis rotation
  	let w = q[3], x = q[0], y = q[1], z = q[2];
  	let sinp = 2 * (w*y - z*x);
    if (Math.abs(sinp) >= 1) sinp = Math.sign(sinp) * (Math.PI / 2);  // Use 90 if out of range
  	return Math.asin(sinp) // returns pi/2 -> - pi/2 range
  };

  exports.calculateRoll = function(q) {
  	// z-axis rotation
  	let w = q[3], x = q[0], y = q[1], z = q[2];
  	return Math.atan2(2 * (w*z + x*y), 1 - 2 * (y*y + z*z));
    // This seems to occasionally return PI or -PI instead of 0
    // It does seem to be related to crossing boundaries but it's not entirely predictable
  };

  exports.globalize = globalize;

  return exports;
})();

},{"../libs/gl-matrix-min":1}],3:[function(require,module,exports){
let Mesher = require('./mesher');

onmessage = function(event) {
  Mesher.mesh(event.data.chunkData, postMessage);
  postMessage({ complete: true });
};

},{"./mesher":4}],4:[function(require,module,exports){
let VorldConfig = require('../../common/vorld/config');
let Vorld = require('../../common/vorld/vorld');
let Chunk = require('../../common/vorld/chunk');
let Maths = require('../../../fury/src/maths');
let quat = Maths.quat, vec3 = Maths.vec3;

var Mesher = module.exports = (function() {
	// Voxel Mesher

	// Data is meshed by adding quads for each visible voxel face to a mesh
	// One mesh per 32 cubic 'chunk' of voxels.
	// Uses texture coordinates, a tile indices array with a texture array to
	// allow for multiple voxel types in a single texture.
	var exports = {};

	// Basic Cube Geometry JSON
	var cubeJson = {
		vertices: [ -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0 ],
		normals: [ 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
		textureCoordinates: [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,

			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,

			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,

			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,

			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,

			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0 ],
		indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23 ]
	};

	var halfCubeJson = {
		vertices: [
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			1.0, 0.0, 1.0,
			-1.0, 0.0, 1.0,

			-1.0, -1.0, -1.0,
			-1.0, 0.0, -1.0,
			1.0, 0.0, -1.0,
			1.0, -1.0, -1.0,

			-1.0, 0.0, -1.0,
			-1.0, 0.0, 1.0,
			1.0, 0.0, 1.0,
			1.0, 0.0, -1.0,

			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, -1.0, 1.0,
			-1.0, -1.0, 1.0,

			1.0, -1.0, -1.0,
			1.0, 0.0, -1.0,
			1.0, 0.0, 1.0,
			1.0, -1.0, 1.0,

			-1.0, -1.0, -1.0,
			-1.0, -1.0, 1.0,
			-1.0, 0.0, 1.0,
			-1.0, 0.0, -1.0 ],
		normals: [ 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
		textureCoordinates: [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 0.5,
			0.0, 0.5,

			1.0, 0.0,
			1.0, 0.5,
			0.0, 0.5,
			0.0, 0.0,

			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,

			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,

			1.0, 0.0,
			1.0, 0.5,
			0.0, 0.5,
			0.0, 0.0,

			0.0, 0.0,
			1.0, 0.0,
			1.0, 0.5,
			0.0, 0.5 ],
		indices: [
			0, 1, 2,
			0, 2, 3,

			4, 5, 6,
			4, 6, 7,

			8, 9, 10,
			8, 10, 11,

			12, 13, 14,
			12, 14, 15,

			16, 17, 18,
			16, 18, 19,

			20, 21, 22,
			20, 22, 23 ]
	};

	var cubeFaces = {
		front: 0,
		back: 1,
		top: 2,
		bottom: 3,
		right: 4,
		left: 5
	};

	// Atlas Info
	var atlas = VorldConfig.getAtlasInfo();
	// Reusable quat and vec3 for identity, flip and vertex
	var identityRotation, flipRotation, vertex;
	identityRotation = quat.create();
	flipRotation = quat.setAxisAngle(quat.create(), [1,0,0], Math.PI);
	vertex = vec3.create();

	var buildMesh = function(vorld, chunkI, chunkJ, chunkK) {
		var mesh = {
			vertices: [],
			normals: [],
			textureCoordinates: [],
			indices: []
		};

		var chunk = Vorld.getChunk(vorld, chunkI, chunkJ, chunkK);

		forEachBlock(chunk, function(chunk, i, j, k, x, y, z) {
			var block = Chunk.getBlock(chunk, i, j, k);
			var blockRotation = Chunk.getBlockRotation(chunk, i, j, k);

			// Exists?
			if(!block) { return; }

			// For Each Direction : Is Edge? Add quad to mesh!
			// Front
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i, j, k+1, chunkI, chunkJ, chunkK))) {
				if (!blockRotation) {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.front, x, y, z);
				} else {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.back, x, y, z);
				}
			}
			// Back
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i, j, k-1, chunkI, chunkJ, chunkK))) {
				if (!blockRotation) {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.back, x, y, z);
				} else {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.front, x, y, z);
				}
			}
			// Top
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i, j+1, k, chunkI, chunkJ, chunkK))) {
				if (!blockRotation) {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.top, x, y, z);
				} else {
					// HACK - because we're rotating the mesh data itself we need to put the opposite value if when flipping
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.bottom, x, y, z);
				}
			}
			// Bottom
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i, j-1, k, chunkI, chunkJ, chunkK))) {
				if (!blockRotation) {
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.bottom, x, y, z);
				} else {
					// HACK - because we're rotating the mesh data itself we need to put the opposite value if when flipping
					addQuadToMesh(mesh, block, blockRotation, cubeFaces.top, x, y, z);
				}
			}
			// Right
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i+1, j, k, chunkI, chunkJ, chunkK))) {
				addQuadToMesh(mesh, block, blockRotation, cubeFaces.right, x, y, z);
			}
			// Left
			if(!VorldConfig.isBlockSolid(Vorld.getBlockByIndex(vorld, i-1, j, k, chunkI, chunkJ, chunkK))) {
				addQuadToMesh(mesh, block, blockRotation, cubeFaces.left, x, y, z);
			}
		});

		return mesh;
	};

	var addQuadToMesh = function(mesh, block, blockRotation, faceIndex, x, y, z) {
		var tile, offset, n = mesh.vertices.length/3;
		var vertices, normals, textureCoordinates;
		var isHalf = VorldConfig.isHalfBlock(block);
		var jsonData = isHalf ? halfCubeJson : cubeJson;
		var rotation = blockRotation ? flipRotation : identityRotation;

		if(faceIndex == cubeFaces.top) {
			tile = (atlas.arraySize - 1) - atlas.tileIndices[block].top;
		} else if (faceIndex == cubeFaces.bottom) {
			tile = (atlas.arraySize - 1) - atlas.tileIndices[block].bottom;
		} else {
			tile = (atlas.arraySize - 1) - atlas.tileIndices[block].side;
		}

		offset = faceIndex * 12;
		vertices = jsonData.vertices.slice(offset, offset + 12);
		for(var i = 0; i < 4; i++) {
			vertex[0] = 0.5 * vertices[3*i];
			vertex[1] = 0.5 * vertices[3*i + 1];
			vertex[2] = 0.5 * vertices[3*i + 2];

			vec3.transformQuat(vertex, vertex, rotation);

			vertices[3*i] = vertex[0] + x + 0.5;
			vertices[3*i + 1] = vertex[1] + y + 0.5;
			vertices[3*i + 2] = vertex[2] + z + 0.5;
		}

		normals = jsonData.normals.slice(offset, offset + 12);

		if (blockRotation) {
			for (var i = 0; i < 4; i++) {
				vertex[0] = normals[3*i];
				vertex[1] = normals[3*i + 1];
				vertex[2] = normals[3*i + 2];

				vec3.transformQuat(vertex, vertex, rotation);

				normals[3*i] = vertex[0];
				normals[3*i + 1] = vertex[1];
				normals[3*i + 2] = vertex[2];
			}
		}


		offset = faceIndex * 8;
		textureCoordinates = jsonData.textureCoordinates.slice(offset, offset + 8);

		if (!mesh.tileIndices) {
			mesh.tileIndices = [];
		}
		tileIndices = [ tile, tile, tile, tile ];

		concat(mesh.vertices, vertices);
		concat(mesh.normals, normals);
		concat(mesh.textureCoordinates, textureCoordinates);
		concat(mesh.tileIndices, tileIndices);
		mesh.indices.push(n,n+1,n+2, n,n+2,n+3);
	};

	var concat = function(a, b) {
		// GC efficient concat
		for(var i = 0, l = b.length; i < l; i++) {
			a.push(b[i]);
		}
	};

	// delegate should be a function taking chunk, i, j, k, x, y, z
	var forEachBlock = function(chunk, delegate) {
		for(i = 0; i < chunk.size; i++) {
			// x = i - Math.floor(chunk.size/2.0);
			for(j = 0; j < chunk.size; j++) {
				// y = j - Math.floor(chunk.size/2.0);
				for(k = 0; k < chunk.size; k++) {
					// z = k - Math.floor(chunk.size/2.0);
					delegate(chunk, i, j, k, i, j, k);
				}
			}
		}
	};

	exports.mesh = function(vorld, postMessage) {
		var keys = Object.keys(vorld.chunks);
		for(var i = 0, l = keys.length; i < l; i++) {
			var indices = vorld.chunks[keys[i]].indices;
			var mesh = buildMesh(vorld, indices[0], indices[1], indices[2]);
			if (mesh.indices.length > 0) {
				postMessage({
					mesh: mesh,
					offset: [indices[0] * vorld.chunkSize, indices[1] * vorld.chunkSize, indices[2] * vorld.chunkSize],
					progress: i / l
				});
			} else {
				postMessage({ progress: i / l });
			}
		}
	};

	return exports;
})();

},{"../../../fury/src/maths":2,"../../common/vorld/chunk":5,"../../common/vorld/config":6,"../../common/vorld/vorld":7}],5:[function(require,module,exports){
var Chunk = module.exports = (function() {
  var exports = {};
  exports.addBlock = function(chunk, i, j, k, block) {
    chunk.blocks[i + chunk.size*j + chunk.size*chunk.size*k] = block;
    if (block == 0) {
      chunk.blockRotations[i + chunk.size*j + chunk.size*chunk.size*k] = null;
    }
  };
  exports.addBlockRotation = function(chunk, i, j, k, rotation) {
    chunk.blockRotations[i + chunk.size*j + chunk.size*chunk.size*k] = rotation;
  };
  exports.getBlock = function(chunk, i, j, k) {
    if(i < 0 || j < 0 || k < 0 || i >= chunk.size || j >= chunk.size || k >= chunk.size) {
      return null;
    }
    return chunk.blocks[i + chunk.size*j + chunk.size*chunk.size*k];
  };
  exports.getBlockRotation = function(chunk, i, j, k) {
    if(i < 0 || j < 0 || k < 0 || i >= chunk.size || j >= chunk.size || k >= chunk.size) {
      return null;
    }
    return chunk.blockRotations[i + chunk.size*j + chunk.size*chunk.size*k];
  };
  exports.create = function(parameters) {
    // TODO: Convert to views on array buffer for memory improvement
    var chunk = {};
    if (parameters && parameters.size) {
      chunk.size = parameters.size;
    } else {
      chunk.size = 32;
    }
    // TODO: Use UINT array?
    if (parameters && parameters.blocks) {
      chunk.blocks = parameters.blocks;
    } else {
      chunk.blocks = [];
    }
    if (parameters && parameters.blockRotations) {
      chunk.blockRotations = parameters.blockRotations;
    } else {
      chunk.blockRotations = [];
    }
    // For Rotations we should bit mask some uints to pack up and right into it... but for now just a value for vertical flip
    return chunk;
  };
  return exports;
})();

},{}],6:[function(require,module,exports){
// TODO: This should be actual config not a class ?
var VorldConfig = module.exports = (function() {
  var exports = {};
  var blockIds = exports.BlockIds = {
      AIR: 0,
      STONE: 1,
      SOIL: 2,
      GRASS: 3,
      WOOD: 4,
      LEAVES: 5,
      WATER: 6,
      BEDROCK: 7,
      STONE_BLOCKS: 8,
      PLANKS: 9,
      HALF_STONE_BLOCKS: 10,
  };

  exports.isBlockSolid = function(block) {
    if (block > 0 && block != blockIds.HALF_STONE_BLOCKS) {
      return true;
    }
    return false;
  };

  exports.isHalfBlock = function(block) {
    return block == blockIds.HALF_STONE_BLOCKS;
  };

  exports.getBlockType = function(config, value) {
    // TODO: Return id instead of string
    if(value < config.thresholds[0]) {
  		return blockIds.AIR;
    }
    if(value < config.thresholds[1]) {
      return blockIds.SOIL;
    }
    return blockIds.STONE;
  };
  exports.getTransformedBlockType = function(block, verticallyAdjacent) {
    if(block == blockIds.SOIL && !verticallyAdjacent) {
      return blockIds.GRASS;
    }
    return block;
  };
  exports.getShapingFunction = function(config) {
    // Would be cute to take a string you could just eval
    if (config.shapingFunction == "gaussian") {
        let a = config.amplitude, sdx = config.sdx, sdz = config.sdz, x0 = 0, z0 = 0;
        return function(x, y, z) {
            let fxy = a * Math.exp(-((((x - x0) * (x - x0)) / (2 * sdx * sdx)) + (((z -z0) * (z - z0)) / (2 * sdz * sdz))));
            return Math.max(0, 1 + (fxy - y) / config.yDenominator);
        };
    } else if (config.shapingFunction == "negative_y") {
        return function(x, y, z) {
            return (config.yOffset - y) / config.yDenominator;
        };
    } else if (config.shapingFunction == "inverse_y") {
        return function(x, y, z) {
            return 1 / (config.adjustmentFactor * (y + config.yOffset));
        };
    } else {
        return function(x, y, z) {
            return 1;
        };
    }
  };
  exports.getAtlasInfo = function() {
    // TODO: Build from parameters, perhaps an init from other methods
    // We have atlas builder maybe should move that there?
    var atlas = {};
    atlas.tileSize = 64;
    atlas.arraySize = 13;
    atlas.tileIndices = [];
    atlas.tileIndices[blockIds.GRASS] = { side: 1, top: 0, bottom: 2 };
    atlas.tileIndices[blockIds.SOIL] = { side: 2, top: 2, bottom: 2 };
    atlas.tileIndices[blockIds.STONE] = { side: 5, top: 5, bottom: 5 };
    atlas.tileIndices[blockIds.STONE_BLOCKS] = { side: 4, top: 4, bottom: 4 };
    atlas.tileIndices[blockIds.HALF_STONE_BLOCKS] = { side: 4, top: 4, bottom: 4 };
    atlas.tileIndices[blockIds.BEDROCK] = { side: 6, top: 6, bottom: 6 };
    atlas.tileIndices[blockIds.WOOD] = { side: 8, top: 7, bottom: 7 };
    atlas.tileIndices[blockIds.PLANKS] = { side: 10, top: 9, bottom: 9 };
    atlas.tileIndices[blockIds.LEAVES] = { side: 11, top: 11, bottom: 11 };
    atlas.tileIndices[blockIds.WATER] = { side: 12, top: 12, bottom: 12 };
    return atlas;
  };
  return exports;
})();

},{}],7:[function(require,module,exports){
let Chunk = require('./chunk');

let Vorld = module.exports = (function() {
  var exports = {};

  exports.addChunk = function(vorld, chunk, i, j, k) {
    vorld.chunks[i+"_"+j+"_"+k] = chunk;
    chunk.indices = [i, j, k];
  };
  exports.getChunk = function(vorld, i, j, k) {
    var key = i+"_"+j+"_"+k;
    if (vorld.chunks[key]) {
        return vorld.chunks[key];
    }
    return null;
  };

  exports.addBlock = function(vorld, x, y, z, block) {
    var size = vorld.chunkSize;
    var chunkI = Math.floor(x / size),
      chunkJ = Math.floor(y / size),
      chunkK = Math.floor(z / size);
    var blockI = x - (chunkI * size),
      blockJ = y - (chunkJ * size),
      blockK = z - (chunkK * size);
    var chunk = exports.getChunk(vorld, chunkI, chunkJ, chunkK);
    if (!chunk) {
      chunk = Chunk.create({ size: vorld.chunkSize });
      Vorld.addChunk(vorld, chunk, chunkI, chunkJ, chunkK);
    }
    Chunk.addBlock(chunk, blockI, blockJ, blockK, block);
  };
  exports.addBlockRotation = function(vorld, x, y, z, rotation) {
    var size = vorld.chunkSize;
    var chunkI = Math.floor(x / size),
      chunkJ = Math.floor(y / size),
      chunkK = Math.floor(z / size);
    var blockI = x - (chunkI * size),
      blockJ = y - (chunkJ * size),
      blockK = z - (chunkK * size);
    var chunk = exports.getChunk(vorld, chunkI, chunkJ, chunkK);
    if (!chunk) {
      chunk = Chunk.create({ size: vorld.chunkSize });
      Vorld.addChunk(vorld, chunk, chunkI, chunkJ, chunkK);
    }
    Chunk.addBlockRotation(chunk, blockI, blockJ, blockK, rotation);
  };

  exports.getBlock = function(vorld, x, y, z) {
    var size = vorld.chunkSize;
    var chunkI = Math.floor(x / size),
      chunkJ = Math.floor(y / size),
      chunkK = Math.floor(z / size);
    var blockI = x - (chunkI * size),
      blockJ = y - (chunkJ * size),
      blockK = z - (chunkK * size);
    return exports.getBlockByIndex(vorld, blockI, blockJ, blockK, chunkI, chunkJ, chunkK);
  };
  exports.getBlockRotation = function(vorld, x, y, z) {
    var size = vorld.chunkSize;
    var chunkI = Math.floor(x / size),
      chunkJ = Math.floor(y / size),
      chunkK = Math.floor(z / size);
    var blockI = x - (chunkI * size),
      blockJ = y - (chunkJ * size),
      blockK = z - (chunkK * size);
    return exports.getBlockRotationByIndex(vorld, blockI, blockJ, blockK, chunkI, chunkJ, chunkK);
  };

  exports.getBlockByIndex = function(vorld, blockI, blockJ, blockK, chunkI, chunkJ, chunkK) {
    // Assumes you won't go out by more than chunkSize
    if (blockI >= vorld.chunkSize) {
      blockI = blockI - vorld.chunkSize;
      chunkI += 1;
    } else if (blockI < 0) {
      blockI = vorld.chunkSize + blockI;
      chunkI -= 1;
    }
    if (blockJ >= vorld.chunkSize) {
      blockJ = blockJ - vorld.chunkSize;
      chunkJ += 1;
    } else if (blockJ < 0) {
      blockJ = vorld.chunkSize + blockJ;
      chunkJ -= 1;
    }
    if (blockK >= vorld.chunkSize) {
      blockK = blockK - vorld.chunkSize;
      chunkK += 1;
    } else if (blockK < 0) {
      blockK = vorld.chunkSize + blockK;
      chunkK -= 1;
    }

    var chunk = Vorld.getChunk(vorld, chunkI, chunkJ, chunkK);
    if (chunk) {
      return Chunk.getBlock(chunk, blockI, blockJ, blockK);
    }
    return null;
  };
  exports.getBlockRotationByIndex = function(vorld, blockI, blockJ, blockK, chunkI, chunkJ, chunkK) {
    // Assumes you won't go out by more than chunkSize
    if (blockI >= vorld.chunkSize) {
      blockI = blockI - vorld.chunkSize;
      chunkI += 1;
    } else if (blockI < 0) {
      blockI = vorld.chunkSize + blockI;
      chunkI -= 1;
    }
    if (blockJ >= vorld.chunkSize) {
      blockJ = blockJ - vorld.chunkSize;
      chunkJ += 1;
    } else if (blockJ < 0) {
      blockJ = vorld.chunkSize + blockJ;
      chunkJ -= 1;
    }
    if (blockK >= vorld.chunkSize) {
      blockK = blockK - vorld.chunkSize;
      chunkK += 1;
    } else if (blockK < 0) {
      blockK = vorld.chunkSize + blockK;
      chunkK -= 1;
    }

    var chunk = Vorld.getChunk(vorld, chunkI, chunkJ, chunkK);
    if (chunk) {
      return Chunk.getBlockRotation(chunk, blockI, blockJ, blockK);
    }
    return null;
  };

  exports.create = function(parameters) {
    var vorld = {};
    if (parameters && parameters.chunkSize) {
      vorld.chunkSize = parameters.chunkSize;
    } else {
      vorld.chunkSize = 32;
    }
    vorld.chunks = {};
    if (parameters && parameters.chunks) {
      var keys = Object.keys(parameters.chunks);
      for(var i = 0, l = keys.length; i < l; i++) {
        vorld.chunks[keys[i]] = Chunk.create(parameters.chunks[keys[i]]);
      }
    }
    return vorld;
  };

  return exports;
})();

},{"./chunk":5}]},{},[3]);