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
var vec3 = require('./maths').vec3;

var Bounds = module.exports = (function() {
	let exports = {};
	let prototype = {
		calculateMinMax: function(center, extents) {
			vec3.subtract(this.min, center, extents);
			vec3.add(this.max, center, extents);
		},
		calculateExtents: function(min, max) {
			vec3.subtract(this.size, max, min);
			// If we had a vec3.zero vector could use scale and add
			this.extents[0] = 0.5 * this.size[0];
			this.extents[1] = 0.5 * this.size[1];
			this.extents[2] = 0.5 * this.size[2];
			vec3.add(this.center, min, this.extents);
		}
	};

	exports.contains = function(point, box) {
		return point[0] >= box.min[0] && point[0] <= box.max[0]
			&& point[1] >= box.min[1] && point[1] <= box.max[1]
			&& point[2] >= box.min[2] && point[2] <= box.max[2];
	};

	// TODO: Adds Touches methods which use <= and >=
	// Note - ray casts should probably return true for touches

	exports.intersect = function(a, b) {
		return (a.min[0] < b.max[0] && a.max[0] > b.min[0])
			&& (a.min[1] < b.max[1] && a.max[1] > b.min[1])
			&& (a.min[2] < b.max[2] && a.max[2] > b.min[2]);
	};

	// Enters functions return true if box b did not intersect box a on specified axis
	// before displacement but would afterwards. Calculating the point of entry could be useful.
	// If it's always needed we could return the distance and use > 0 check for does enter
	exports.entersX = function(a, b, displacement) {
		return !(a.min[0] < b.max[0] && a.max[0] > b.min[0])
			&& (a.min[0] < b.max[0] + displacement && a.max[0] > b.min[0] + displacement);
	};
	exports.entersY = function(a, b, displacement) {
		return !(a.min[1] < b.max[1] && a.max[1] > b.min[1])
			&& (a.min[1] < b.max[1] + displacement && a.max[1] > b.min[1] + displacement);
	};
	exports.entersZ = function(a, b, displacement) {
		return !(a.min[2] < b.max[2] && a.max[2] > b.min[2])
			&& (a.min[2] < b.max[2] + displacement && a.max[2] > b.min[2] + displacement);
	};

	// Entered is the same as enters but it assumes you've already moved the box
	exports.enteredX = function(a, b, displacement) {
		return !(a.min[0] < b.max[0] - displacement && a.max[0] > b.min[0] - displacement)
			&& (a.min[0] < b.max[0] && a.max[0] > b.min[0]);
	}
	exports.enteredY = function(a, b, displacement) {
		return !(a.min[1] < b.max[1] - displacement && a.max[1] > b.min[1] - displacement)
			&& (a.min[1] < b.max[1] && a.max[0] > b.min[1]);
	}
	exports.enteredZ = function(a, b, displacement) {
		return !(a.min[2] < b.max[2] - displacement && a.max[2] > b.min[2] - displacement)
			&& (a.min[2] < b.max[2] && a.max[2] > b.min[2]);
	}

	exports.intersectSphere = function(sphere, box) {
		// closest point on box to sphere center
		let x = Math.max(box.min[0], Math.min(sphere.center[0], box.max[0]));
		let y = Math.max(box.min[1], Math.min(sphere.center[1], box.max[1]));
		let z = Math.max(box.min[2], Math.min(sphere.center[2], box.max[2]));

		let sqrDistance = (x - sphere.center[0]) * (x - sphere.center[0]) +
		 	(y - sphere.center[1]) * (y - sphere.center[1]) +
			(z - sphere.center[2]) * (z - sphere.center[2]);

		return sqrDistance < sphere.radius * sphere.radius;
	};

	exports.create = function(parameters) {
			// Note - you are expected to recalculate min/max when position or extents change
			// or alternatively if you change min/max you can recalculate extents/size/center
			let aabb = Object.create(prototype);

			if (parameters.center || parameters.size || parameters.extents) {
				if (parameters.center) {
          aabb.center = parameters.center;
				} else {
          aabb.center = vec3.create();
				}

				if (parameters.size) {
					aabb.size = parameters.size;
					aabb.extents = vec3.fromValues(0.5 * aabb.size[0], 0.5 * aabb.size[1], 0.5 * aabb.size[2])
				} else if (parameters.extents) {
					aabb.extents = parameters.extents;
					aabb.size = vec3.fromValues(2 * aabb.extents[0], 2 * aabb.extents[1], 2 * aabb.extents[2]);
				}
				aabb.min = vec3.create();
				aabb.max = vec3.create();

				aabb.calculateMinMax(aabb.center, aabb.extents);
			} else {
				// Could check min < max on all axes to make this easier to use
				aabb.min = parameters.min;
				aabb.max = parameters.max;
				aabb.center = vec3.create();
				aabb.size = vec3.create();
				aabb.extents = vec3.create();
				aabb.calculateExtents(aabb.min, aabb.max);
			}

			return aabb;
	};

	return exports;
})();

},{"./maths":8}],3:[function(require,module,exports){
var Maths = require('./maths');
let vec3 = Maths.vec3, vec4 = Maths.vec4, mat4 = Maths.mat4, quat = Maths.quat;

var Camera = module.exports = function() {
	// NOTE: Camera points in -z direction
	var exports = {};

	// vec3 cache for calculations
	var localX = vec3.create();
	var localY = vec3.create();
	var localZ = vec3.create();
	var vec3Cache = vec3.create();
	var vec4Cache = vec4.create();
	var q = quat.create();

	var prototype = {
		// Set Rotation from Euler
		// Set Position x, y, z
		// Note do not have enforced copy setters, the user is responsible for this
		calculateFrustrum: function() {
			Maths.quatLocalAxes(this.rotation, localX, localY, localZ);

			// Calculate Planes
			// NOTE: Relies on the fact camera looks in -ve z direction
			// Note Right Handed but facing in negative z, so -x is left, and +x is right.

			// Planes should point inwards

			// Near
			vec3.negate(this.planes[0], localZ); // Set Normal
			vec3.scaleAndAdd(vec3Cache, this.position, localZ, -this.near);	// Calculate mid-point of plane
			this.planes[0][3] = -vec3.dot(this.planes[0], vec3Cache);	// Set [3] to distance from plane to origin along normal (normal is pointing torwards origin)
			// Far
			vec3.copy(this.planes[1], localZ);
			vec3.scaleAndAdd(vec3Cache, this.position, localZ, -this.far);
			this.planes[1][3] = -vec3.dot(this.planes[1], vec3Cache);
			// Left
			quat.identity(q);
			Maths.quatRotate(q, q, 0.5 * this.ratio * this.fov, localY);	// Rotation is anti-clockwise apparently
			vec3.transformQuat(this.planes[2], localX, q);
			this.planes[2][3] = -vec3.dot(this.planes[2], this.position);
			// Right
			quat.identity(q);
			Maths.quatRotate(q, q, -0.5 * this.ratio * this.fov, localY);
			vec3.negate(vec3Cache, localX);
			vec3.transformQuat(this.planes[3], vec3Cache, q);
			this.planes[3][3] = -vec3.dot(this.planes[3], this.position);
			// Top
			quat.identity(q);
			Maths.quatRotate(q, q, 0.5 * this.fov, localX);
			vec3.negate(vec3Cache, localY);
			vec3.transformQuat(this.planes[4], vec3Cache, q);
			this.planes[4][3] = -vec3.dot(this.planes[4], this.position);
			// Bottom
			quat.identity(q);
			Maths.quatRotate(q, q, -0.5 * this.fov, localX);
			vec3.transformQuat(this.planes[5], localY, q);
			this.planes[5][3] = -vec3.dot(this.planes[5], this.position);

			// TODO: The points too please so we can improve culling
		},
		isSphereInFrustum: function(center, radius) {
			vec4Cache[3] = 1;
			for (let i = 0; i < 6; i++) {
				// We want the point center + normal of the plane * radius
				vec3.scaleAndAdd(vec4Cache, center, this.planes[i], radius);
				if (vec4.dot(this.planes[i], vec4Cache) < 0) {
					return false;
				}
			}
			return true;
		},
		isInFrustum: function(bounds) {
			// https://iquilezles.org/www/articles/frustumcorrect/frustumcorrect.htm
			// Note : https://stackoverflow.com/questions/31788925/correct-frustum-aabb-intersection
			// TODO: Profile and try different techniques (using continue in the loop, unrolling the lot, etc)
			vec4Cache[3] = 1;
			// Consider wrapping this cache in an anon function execution to keep scope minimal, see of it improves performance
			// i.e. isInFrustum = (function() { let cache = vec4.create(); return function(bounds) { /* implementation */ }; })();
			for (let i = 0; i < 6; i++) {
				let out = 0;
				vec4Cache[0] = bounds.min[0], vec4Cache[1] = bounds.max[1], vec4Cache[2] = bounds.min[2];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// min max min
				vec4Cache[1] = bounds.min[1];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// min min min
				vec4Cache[0] = bounds.max[0];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// max min min
				vec4Cache[1] = bounds.max[1];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// max max min
				vec4Cache[2] = bounds.max[2];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// max max max
				vec4Cache[1] = bounds.min[1];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// max min max
				vec4Cache[0] = bounds.min[0];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// min min max
				vec4Cache[1] = bounds.max[1];
				out += (vec4.dot(this.planes[i], vec4Cache) < 0) ? 1 : 0;	// min max max
				if (out == 8) {
					return false;
				}
			}
			// TODO: Add check of points too
			return true;
		},
		getDepth: function(object) {
			var p0 = this.position[0], p1 = this.position[1], p2 = this.position[2],
				q0 = this.rotation[0], q1 = this.rotation[1], q2 = this.rotation[2], q3 = this.rotation[3],
				l0 = object.transform.position[0], l1 = object.transform.position[1], l2 = object.transform.position[2];
			return 2*(q1*q3 + q0*q2)*(l0 - p0) + 2*(q2*q3 - q0*q1)*(l1 - p1) + (1 - 2*q1*q1 - 2*q2*q2)*(l2 - p2);
		},
		getProjectionMatrix: function(out) {
			if(this.type == Camera.Type.Perspective) {
				mat4.perspective(out, this.fov, this.ratio, this.near, this.far);
			} else {
				var left = - (this.height * this.ratio) / 2.0;
				var right = - left;
				var top = this.height / 2.0;
				var bottom = -top;
				mat4.ortho(out, left, right, bottom, top, this.near, this.far);
			}
			return out;
		},
		viewportToWorld: function(out, viewPort, z) {
			if(this.type == Camerea.Type.Orthonormal) {
				// TODO: Actually test this...
				out[0] = (this.height * this.ratio) * (viewPort[0] - 0.5) / 2.0;
				out[1] = this.height * (viewPort[1] - 0.5) / 2.0;
				out[2] = (z || 0);
				vec3.transformQuat(out, out, this.rotation);
				vec3.add(out, out, this.position);
			} else {
				throw new Error("viewportToWorld not implemented for perspective camera");
			}
		}
	};
	var Type = exports.Type = {
		Perspective: "Perspective",
		Orthonormal: "Orthonormal"
	};
	var create = exports.create = function(parameters) {
		var camera = Object.create(prototype);
		// TODO: Arguement Checking
		camera.type = parameters.type ? parameters.type : Type.Perspective;
		camera.near = parameters.near;
		camera.far = parameters.far;

		if(camera.type == Type.Perspective) {
			// vertical field of view, ratio (aspect) determines horizontal fov
			camera.fov = parameters.fov;
		} else if (camera.type == Type.Orthonormal) {
			camera.height = parameters.height;
		} else {
			throw new Error("Unrecognised Camera Type '"+camera.type+"'");
		}
		camera.ratio = parameters.ratio ? parameters.ratio : 1.0;
		camera.position = parameters.position ? parameters.position : vec3.create();
		camera.rotation = parameters.rotation ? parameters.rotation : quat.create();

		camera.planes = [];
		// Stored as plane normal, distance from plane to origin in direction of normal
		for (let i = 0; i < 6; i++) {
			camera.planes[i] = vec4.create();
		}
		camera.points = [];
		for (let i = 0; i < 8; i++) {
			camera.points[i] = vec3.create();
		}
		camera.calculateFrustrum(); // TEST - REMOVE

		// TODO: Add Clear Color

		// TODO: Arguably post-processing effects and target could/should be on the camera, the other option is on the scene

		return camera;
	};
	return exports;
}();

},{"./maths":8}],4:[function(require,module,exports){
// Fury Module can be used with 'require'
var Fury = module.exports = (function() {
  let Fury = {};
  let canvas;

  // Modules
  Fury.Bounds = require('./bounds');
  Fury.Camera = require('./camera');
  Fury.Input = require('./input');
  Fury.Material = require('./material');
  Fury.Maths = require('./maths');
  Fury.Mesh = require('./mesh');
  Fury.Model = require('./model');
  Fury.Physics = require('./physics');
  Fury.Renderer = require('./renderer');
  Fury.Scene = require('./scene');
  Fury.Shader = require('./shader');
  Fury.Transform = require('./transform');

  Fury.prefabs = { keys: "Can't touch this, doo doo doo, do do, do do" };

  Fury.createPrefab = function(parameters) {
  	var prefabs = Fury.prefabs;
  	if(!parameters || !parameters.name || prefabs[parameters.name]) {
  		throw new Error("Please provide a valid and unique name parameter for your prefab");
  	} else {
  		prefabs[parameters.name] = parameters;
  		// TODO: If we move to using a component system will need to transfer from parameter flat structure to a gameobject like structure, for now these are the same.
  		// Note that each component class should deal with setting up that component instance from supplied parameters itself
  	}
  };

  // Public functions
  Fury.init = function(canvasId, contextAttributes) {
  	canvas = document.getElementById(canvasId);
  	try {
  		Fury.Renderer.init(canvas, contextAttributes);
  	} catch (error) {
  		// TODO: debug.error(error.message)
  		console.log(error.message);
  		return false;
  	}
  	Fury.Input.init(canvas);
  	return true;
  };

  return Fury;
})();

},{"./bounds":2,"./camera":3,"./input":6,"./material":7,"./maths":8,"./mesh":9,"./model":10,"./physics":11,"./renderer":12,"./scene":13,"./shader":14,"./transform":15}],5:[function(require,module,exports){
var IndexedMap = module.exports = function(){
	// This creates a dictionary that provides its own keys
	// It also contains an array of keys for quick enumeration
	// This does of course slow removal, so this structure should
	// be used for arrays where you want to enumerate a lot and 
	// also want references that do not go out of date when 
	// you remove an item (which is hopefully rarely).

	// Please note, again for purposes of speed and ease of use 
	// this structure adds the key of the item to the id property on items added
	// this eases checking for duplicates and if you have the only reference
	// you can still remove it from the list or check if it is in the list. 
	var exports = {};
	var nextKey = 1;

	var prototype = {
		add: function(item) {
			if(!item.id) {
				var key = (nextKey++).toString();
				item.id = key;
				this[key] = item;
				this.keys.push(key);
			}
			return item.id;
		},
		remove: function(key) {
			if(key != "keys" && this.hasOwnProperty(key)) {
				if(delete this[key]) {
					for(var i = 0, l = this.keys.length; i < l; i++) {
						if(this.keys[i] == key) {
							this.keys.splice(i,1);
						}
					}
					return true;
				}
			}
			return false;
		}
	};

	var create = exports.create = function() {
		var map = Object.create(prototype);
		map.keys = [];
		return map;
	};

	return exports;
}();
},{}],6:[function(require,module,exports){
var Input = module.exports = function() {
	var exports = {};

	var pointerLocked = false;
	var mouseState = [], currentlyPressedKeys = [];	// probably shouldn't use arrays lots of empty space
	var downKeys = [], upKeys = []; // Keys pressed or released this frame
	var canvas;
	var init = exports.init = function(targetCanvas) {
			canvas = targetCanvas;
			canvas.addEventListener("mousemove", handleMouseMove);
			canvas.addEventListener("mousedown", handleMouseDown, true);
			canvas.addEventListener("mouseup", handleMouseUp);
			canvas.addEventListener('mousemove', (event) => {
				MouseDelta[0] += event.movementX;
				MouseDelta[1] += event.movementY;
			});
			document.addEventListener('pointerlockchange', (event) => {
				pointerLocked = !!(document.pointerLockElement || document.mozPointerLockElement); // polyfill
			});
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock; // polyfill

			window.addEventListener("keyup", handleKeyUp);
			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("blur", handleBlur);
	};

	exports.isPointerLocked = function() {
		return pointerLocked;
	};

	exports.requestPointerLock = function() {
		canvas.requestPointerLock();
	};

	exports.releasePointerLock = function() {
		document.exitPointerLock();
	};

	var MouseDelta = exports.MouseDelta = [0, 0];
	var MousePosition = exports.MousePosition = [0, 0];

	// TODO: Add signalEndFrame and store keyDown [] and keyUp[] array for
	// querying as well, although the option of just subscribing to the events
	// in game code is also there but need to use DescriptionToKeyCode

	var keyPressed = function(key) {
		if (!isNaN(key) && !key.length) {
			return currentlyPressedKeys[key];
		}
		else if (key) {
			var map = DescriptionToKeyCode[key];
			return (map) ? !!currentlyPressedKeys[map] : false;
		}
		else {
			return false;
		}
	};

	var keyUp = exports.keyUp = function(key) {
		if (!isNaN(key) && !key.length) {
			return upKeys[key];
		}
		else if (key) {
			var map = DescriptionToKeyCode[key];
			return (map) ? !!upKeys[map] : false;
		}
		else {
			return false;
		}
	};

	var keyDown = exports.keyDown = function(key, thisFrame) {
		if (!thisFrame) {
			return keyPressed(key);
		} else {
			if (!isNaN(key) && !key.length) {
				return downKeys[key];
			}
			else if (key) {
				var map = DescriptionToKeyCode[key];
				return (map) ? !!downKeys[map] : false;
			}
			else {
				return false;
			}
		}
	};

	var mouseDown = exports.mouseDown = function(button) {
		if (!isNaN(button) && !button.length) {
			return mouseState[button];
		}
		else if (button) {
			var map = DescriptionToMouseButton[button];
			return (!isNaN(map)) ? mouseState[map] : false;
		}
		else {
			return false;
		}
	};

	exports.handleFrameFinished = function() {
		MouseDelta[0] = 0;
		MouseDelta[1] = 0;
		downKeys.length = 0;
		upKeys.length = 0;
	};

	var handleKeyDown = function(event) {
		// keyDown event can get called multiple times after a short delay
		if (!currentlyPressedKeys[event.keyCode]) {
			downKeys[event.keyCode] = true;
		}
		currentlyPressedKeys[event.keyCode] = true;
	};

	var handleKeyUp = function(event) {
		currentlyPressedKeys[event.keyCode] = false;
		upKeys[event.keyCode] = true;
	};

	var handleBlur = function(event) {
		downKeys.length = 0;
		currentlyPressedKeys.length = 0;
		upKeys.length = 0;	// Q: Should we be copying currently pressed Keys as they've kinda been released?
	};

	var handleMouseMove = function(event) {
		MousePosition[0] = event.pageX;
		MousePosition[1] = event.pageY;
	};

	var handleMouseDown = function(event) {
		mouseState[event.button] = true;
		return false;
	};

	var handleMouseUp = function(event) {
		mouseState[event.button] = false;
	};

	// TODO: Add Numpad Keys
	// TODO: Deal with shift in map (probably going to need to move to a function from JSON object for this)
	var DescriptionToKeyCode = exports.DescriptionToKeyCode = {
		"a": 65,
		"b": 66,
		"c": 67,
		"d": 68,
		"e": 69,
		"f": 70,
		"g": 71,
		"h": 72,
		"i": 73,
		"j": 74,
		"k": 75,
		"l": 76,
		"m": 77,
		"n": 78,
		"o": 79,
		"p": 80,
		"q": 81,
		"r": 82,
		"s": 83,
		"t": 84,
		"u": 85,
		"v": 86,
		"w": 87,
		"x": 88,
		"y": 89,
		"z": 90,
		"Backspace": 8,
		"Tab": 9,
		"Enter": 13,
		"Shift": 16,
		"Ctrl": 17,
		"Alt": 18,
		"PauseBreak": 19,
		"Caps": 20,
		"Esc": 27,
		"Space": 32,
		"PageUp": 33,
		"PageDown": 34,
		"End": 35,
		"Home": 36,
		"Left": 37,
		"Up": 38,
		"Right": 39,
		"Down": 40,
		"Insert": 45,
		"Delete": 46,
		"0": 48,
		"1": 49,
		"2": 50,
		"3": 51,
		"4": 52,
		"5": 53,
		"6": 54,
		"7": 55,
		"8": 56,
		"9": 57,
		";": 59,
		"=": 61,
		"-": 189,
		",": 188,
		".": 190,
		"/": 191,
		"|": 220,
		"[": 219,
		"]": 221,
		"`": 223,
		"'": 192,
		"#": 222
	};

	var KeyCodeToDescription = exports.KeyCodeToDescription = {
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		8: "Backspace",
		9: "Tab",
		13: "Enter",
		16: "Shift",
		17: "Ctrl",
		18: "Alt",
		19: "PauseBreak",
		20: "Caps",
		27: "Esc",
		32: "Space",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "Left",
		38: "Up",
		39: "Right",
		40: "Down",
		45: "Insert",
		46: "Delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		59: ";",
		61: "=",
		189: "-",
		188: ",",
		190: ".",
		191: "/",
		220: "|",
		219: "[",
		221: "]",
		223: "`",
		192: "'",
		222: "#"
	};

	var MouseButtonToDescription = exports.MouseButtonToDescription = {
		0: "LeftMouseButton",
		1: "MiddleMouseButton",
		2: "RightMouseButton"
	};

	var DescriptionToMouseButton = exports.DescriptionToMouseButton = {
		"LeftMouseButton": 0,
		"MiddleMouseButton": 1,
		"RightMouseButton": 2
	};

	return exports;
}();

},{}],7:[function(require,module,exports){
var Material = module.exports = function(){
	var exports = {};
	var prototype = {
		blendEquation: "FUNC_ADD",
		sourceBlendType: "SRC_ALPHA",
		destinationBlendType: "ONE_MINUS_SRC_ALPHA"
	};

	var create = exports.create = function(parameters) {
		var material = Object.create(prototype);

		if(!parameters.shader) {
			throw new Error("Shader must be provided");
		}
		material.shader = parameters.shader;

		material.textures = {};
		if(parameters.textures) {
			var textures = parameters.textures;
			for(var i = 0, l = textures.length; i < l; i++) {
				if(textures[i].uniformName && textures[i].texture) {
					material.textures[textures[i].uniformName] = textures[i].texture;
				} else {
					throw new Error("Texture Array must contain objects with properties 'uniformName' and 'texture'");
				}
			}
		}

		return material;
	};

	var copy = exports.copy = function(material) {
		var copy = Object.create(prototype);
		copy.shader = material.shader;
		copy.textures = {};
		if(material.textures) {
			var textures = material.textures;
			for(var key in textures) {
				if(textures.hasOwnProperty(key)) {
					copy.textures[key] = textures[key];
				}
			}
		}
		// TODO: Need to copy other properties for this to be useful could use Object.assign?
		return copy;
	};

	return exports;
}();

},{}],8:[function(require,module,exports){
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

  exports.quatEuler = function(x, y, z) {
    let q = glMatrix.quat.create();
    glMatrix.quat.fromEuler(q, x, y, z);
    return q;
  };

  exports.quatIsIdentity = function(q) {
    // Is the provided quaterion identity
    return (equals(q[0], 0) && equals(q[1], 0) && equals(q[2], 0) && equals(q[3], 1));
  };

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

},{"../libs/gl-matrix-min":1}],9:[function(require,module,exports){
var r = require('./renderer');
var Bounds = require('./bounds');
var vec3 = require('./maths').vec3;

var Mesh = module.exports = function(){
	exports = {};

	let calculateMinVertex = function(out, vertices) {
		var i, l, v1 = Number.MAX_VALUE, v2 = Number.MAX_VALUE, v3 = Number.MAX_VALUE;
		for(i = 0, l = vertices.length; i < l; i += 3) {
			v1 = Math.min(v1, vertices[i]);
			v2 = Math.min(v2, vertices[i+1]);
			v3 = Math.min(v3, vertices[i+2]);
		}
		out[0] = v1, out[1] = v2, out[2] = v3;
	};

	let calculateMaxVertex = function(out, vertices) {
		var i, l, v1 = Number.MIN_VALUE, v2 = Number.MIN_VALUE, v3 = Number.MIN_VALUE;
		for(i = 0, l = vertices.length; i < l; i += 3) {
			v1 = Math.max(v1, vertices[i]);
			v2 = Math.max(v2, vertices[i+1]);
			v3 = Math.max(v3, vertices[i+2]);
		}
		out[0] = v1, out[1] = v2, out[2] = v3;
	};

	// Returns the furthest vertex from the local origin
	// Note this is not the same as the furthest from the mid-point of the vertices
	// This is necessray for the boundingRadius to remain accurate under rotation
	let calculateBoundingRadius = function(vertices) {
		var sqrResult = 0;
		for (let i = 0, l = vertices.length; i< l; i += 3) {
			let sqrDistance = vertices[i] * vertices[i]
				+ vertices[i + 1] * vertices[i + 1]
				+ vertices[i + 2] * vertices[i + 2];
			if (sqrDistance > sqrResult) {
				sqrResult = sqrDistance;
			}
		}
		return Math.sqrt(sqrResult);
	};

	var prototype = {
		calculateBounds: function() {
			// NOTE: all bounds in local space
			this.boundingRadius = calculateBoundingRadius(this.vertices);
			calculateMinVertex(this.bounds.min, this.vertices);
			calculateMaxVertex(this.bounds.max, this.vertices);
			this.bounds.calculateExtents(this.bounds.min, this.bounds.max);
		},
		calculateNormals: function() {
			// TODO: Calculate Normals from Vertex information
		},
		updateVertices: function() {
			this.vertexBuffer = r.createBuffer(this.vertices, 3);
			// TODO: If vertexBuffers exists we should delete the existing buffer?
			// or we should use the existing buffer and bind different data
		},
		updateTextureCoordinates: function() {
			// TODO: If uvBuffer exists we should delete the existing buffer?
			// or we should use the existing buffer and bind different data
			this.textureBuffer = r.createBuffer(this.textureCoordinates, 2);
		},
		updateNormals: function() {
			// TODO: If normalBuffer exists we should delete the existing buffer?
			// or we should use the existing buffer and bind different data
			this.normalBuffer = r.createBuffer(this.normals, 3);
		},
		updateIndexBuffer: function() {
			// TODO: If indexBuffer exists we should delete the existing buffer?
			// or we should use the existing buffer and bind different data
			this.indexBuffer = r.createBuffer(this.indices, 1, true);
			this.indexed = true;
		}
	};

	var create = exports.create = function(parameters) {
		var mesh = Object.create(prototype);

		mesh.bounds = Bounds.create({ min: vec3.create(), max: vec3.create() });

		if (parameters) {
			if (parameters.renderMode) {
				mesh.renderMode = parameters.renderMode;
			} else {
				mesh.renderMode = r.RenderMode.Triangles;
			}

			mesh.boundingRadius = parameters.boundingRadius | 0;

			if (parameters.buffers) {
					// NOTE: update<X> methods will not work when providing buffers directly
					// if the mesh needs to be manipulated at run time, it's best to convert the buffers
					// to JS arrays create the mesh data with that.
					if (parameters.vertices && parameters.vertexCount) {
						mesh.vertices = parameters.vertices;
						mesh.calculateBounds();
						mesh.vertexBuffer = r.createArrayBuffer(parameters.vertices, 3, parameters.vertexCount);
					}
					if (parameters.textureCoordinates && parameters.textureCoordinatesCount) {
						mesh.textureBuffer = r.createArrayBuffer(parameters.textureCoordinates, 2, parameters.textureCoordinatesCount);
					}
					if (parameters.normals && parameters.normalsCount) {
						mesh.normalBuffer = r.createArrayBuffer(parameters.normals, 3, parameters.normalsCount);
					}

					if (parameters.customBuffers && parameters.customBuffers.length) {
						mesh.customBuffers = [];
						for (let i = 0, l = parameters.customBuffers.length; i < l; i++) {
							let customBuffer = parameters.customBuffers[i];
							switch (customBuffer.componentType) {
								case 5126: // Float32
									mesh.customBuffers[customBuffer.name] = r.createArrayBuffer(customBuffer.buffer, customBuffer.size, customBuffer.count);
									break;
								case 5123: // Int16
									mesh.customBuffers[customBuffer.name] = r.createElementArrayBuffer(customBuffer.buffer, customBuffer.size, customBuffer.count);
									// UNTESTED
									break;
							}
						}
					}

					if (parameters.indices && parameters.indexCount) {
						mesh.indexBuffer = r.createElementArrayBuffer(parameters.indices, 1, parameters.indexCount);
						mesh.indexed = true;
					} else {
						mesh.indexed = false;
					}
			} else {
					if (parameters.vertices) {
						mesh.vertices = parameters.vertices;
						mesh.calculateBounds();
						mesh.updateVertices();
					}
					if (parameters.textureCoordinates) {
						mesh.textureCoordinates = parameters.textureCoordinates;
						mesh.updateTextureCoordinates();
					}
					if (parameters.normals) {
						mesh.normals = parameters.normals;
						mesh.updateNormals();
					}
					if (parameters.indices) {
						mesh.indices = parameters.indices;
						mesh.updateIndexBuffer();
					} else {
						mesh.indexed = false;
					}
			}
		}
		return mesh;
	};

	var copy = exports.copy = function(mesh) {
		var copy = Object.create(prototype);

		copy.indexed = mesh.indexed;
		copy.renderMode = mesh.renderMode;
		copy.boundingRadius = mesh.boundingRadius;
		copy.bounds = Bounds.create({ min: mesh.bounds.min, max: mesh.bounds.max }) ;
		if (mesh.vertices) {
			copy.vertices = mesh.vertices.slice(0);
			copy.updateVertices();
		}
		if (mesh.textureCoordinates) {
			copy.textureCoordinates = mesh.textureCoordinates.slice(0);
			copy.updateTextureCoordinates();
		}
		if (mesh.normals) {
			copy.normals = mesh.normals.slice(0);
			copy.updateNormals();
		}
		if (mesh.indices) {
			copy.indices = mesh.indices.slice(0);
			copy.updateIndexBuffer();
		}

		return copy;
	};

	return exports;
}();

},{"./bounds":2,"./maths":8,"./renderer":12}],10:[function(require,module,exports){
var Model = module.exports = (function() {
    var exports = {};

    // Takes a URI of a glTF file to load
    // Returns an object containing an array meshdata ready for use with Fury.Mesh
    // In future can be extended to include material information
    exports.load = function(uri, callback) {
        // TODO: Check file extension, only gltf currently supported
        // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0

        fetch(uri).then(function(response) {
            return response.json();
        }).then(function(json) {
            // Find first mesh and load it
            // TODO: Load all meshes
            // TODO: Load all sets of texture coordinates

            // TODO: Option to provide data as JS arrays (i.e. buffers: false)
            // This is so we can have the data available to JS for runtime manipulation
            var meshData = {
                buffers: true
            };

            var attributes = json.meshes[0].primitives[0].attributes;
            var positionIndex = attributes.POSITION;    // index into accessors
            var normalsIndex = attributes.NORMAL;       // index into accessors
            var uvIndex = attributes.TEXCOORD_0;        // index into accessors
            var colorIndices = [];

            var propertyName = "COLOR_";
            var propertyNameIndex = 0;
            while (attributes.hasOwnProperty(propertyName + propertyNameIndex)) {
              colorIndices.push(attributes[propertyName + propertyNameIndex]);
              propertyNameIndex++;
            }

            var indicesIndex = json.meshes[0].primitives[0].indices;
            // ^^ I think this is the index and not the index count, should check with a more complex / varied model

            // Calculate bounding radius
            var max = json.accessors[positionIndex].max;
            var min = json.accessors[positionIndex].min;
            var maxPointSqrDistance = max[0]*max[0] + max[1]*max[1] + max[2]*max[2];
            var minPointSqrDistance = min[0]*min[0] + min[1]*min[1] + min[2]*min[2];
            meshData.boundingRadius = Math.sqrt(Math.max(maxPointSqrDistance, minPointSqrDistance));

            var vertexCount = json.accessors[positionIndex].count;
            var positionBufferView = json.bufferViews[json.accessors[positionIndex].bufferView];

            var indexCount = json.accessors[indicesIndex].count;
            var indicesBufferView = json.bufferViews[json.accessors[indicesIndex].bufferView];

            if (positionBufferView.buffer != indicesBufferView.buffer) {
                console.error("Triangle Indices Buffer Index does not match Position Buffer Index");
            }

            var normalsCount, uvCount;
            var normalsBufferView, uvBufferView;

            if (normalsIndex !== undefined) {
                normalsCount = json.accessors[normalsIndex].count;
                normalsBufferView = json.bufferViews[json.accessors[normalsIndex].bufferView];
                if (positionBufferView.buffer != normalsBufferView.buffer) {
                    console.error("Normals Buffer Index does not match Position Buffer Index");
                }
            }

            if (uvIndex !== undefined) {
                uvCount = json.accessors[uvIndex].count;
                uvBufferView = json.bufferViews[json.accessors[uvIndex].bufferView];
                if (positionBufferView.buffer != uvBufferView.buffer) {
                    console.error("Texture Coordinates Buffer Index does not match Position Buffer Index");
                }
            }

            var colorsCounts = [];
            var colorsBufferViews = [];

            for (let i = 0, l = colorIndices.length; i < l; i++) {
              let colorIndex = colorIndices[i];
              let accessor = json.accessors[colorIndex];
              colorsCounts[i] = accessor.count;
              colorsBufferViews[i] = json.bufferViews[accessor.bufferView];
              if (positionBufferView.buffer != colorsBufferViews[i].buffer) {
                console.error("The COLOR_" + i +" Buffer Index does not match Position Buffer Index");
              }
            }

            fetch(json.buffers[positionBufferView.buffer].uri).then(function(response) {
                return response.arrayBuffer();
            }).then(function(arrayBuffer) {
                // TODO: pick typedarray type from accessors[index].componentType (5126 => Float32, 5123 => Int16)
                // TODO: Get size from data from accessors[index].type rather than hardcoding
                meshData.vertices = new Float32Array(arrayBuffer, positionBufferView.byteOffset, vertexCount * 3);
                meshData.vertexCount = vertexCount;

                if (normalsIndex !== undefined) {
                    meshData.normals = new Float32Array(arrayBuffer, normalsBufferView.byteOffset, normalsCount * 3);
                    meshData.normalsCount = normalsCount;
                }

                if (uvIndex !== undefined) {
                    meshData.textureCoordinates = new Float32Array(arrayBuffer, uvBufferView.byteOffset, uvCount * 2);
                    meshData.textureCoordinatesCount = uvCount;
                }

                meshData.indices = new Int16Array(arrayBuffer, indicesBufferView.byteOffset, indexCount);
                meshData.indexCount = indexCount;

                if(colorIndices.length > 0) {
                  meshData.customBuffers = [];
                  // Assumed componentType = 5126 => Float32, type = "VEC4" => count * 4
                  for (let i = 0, l = colorIndices.length; i < l; i++) {
                    meshData.customBuffers.push({
                      name: "COLOR_" + i,
                      buffer: new Float32Array(arrayBuffer, colorsBufferViews[i].byteOffset, colorsCounts[i] * 4),
                      count: colorsCounts[i],
                      componentType: 5126,
                      size: 4
                    });
                  }
                }

                callback({ meshData: [ meshData ]});

            }).catch(function(error) {
                console.error("Unable to fetch data buffer from model");
            });

        }).catch(function(error) {
            console.error("Unable to load model at " + uri);
        });
    };

    return exports;
})();

},{}],11:[function(require,module,exports){
var Physics = module.exports = (function(){
  // https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection

  var exports = {};

  // For now a box is an AABB - in future we'll need to allow rotation
  var Box = exports.Box = require('./bounds');

  var Sphere = exports.Sphere = (function() {
  	let exports = {};
  	let prototype = {};

  	exports.contains = function(point, sphere) {
  		let dx = point[0] - sphere.center[0], dy = point[1] - sphere.center[1], dz = point[2] - sphere.center[2];
  		let sqrDistance = dx * dx + dy * dy + dz * dz;
  		return sqrDistance < sphere.radius * sphere.radius;
  	};

  	exports.intersect = function(a, b) {
  		let dx = a.center[0] - b.center[0], dy = a.center[1] - b.center[1], dz = a.center[2] - b.center[2];
  		let sqrDistance = dx * dx + dy * dy + dz * dz;
  		return sqrDistance < (a.radius + b.radius) * (a.radius + b.radius);
  	};

  	exports.intersectBox = function(box, sphere) {
  		return Box.intersectSphere(sphere, box);
  	};

  	exports.create = function(parameters) {
  		let sphere = Object.create(prototype);

  		if (parameters.center) {
  			sphere.center = parameters.center;
  		} else {
  			sphere.center = vec3.create();
  		}
      if (parameters.radius) {
        sphere.radius = parameters.radius;
      } else {
        sphere.radius = 0;
      }

  		return sphere;
  	};

  	return exports;
  })();

  return exports;
})();

},{"./bounds":2}],12:[function(require,module,exports){
// This module is essentially a GL Context Facade
// There are - of necessity - a few hidden logical dependencies in this class
// mostly with the render functions, binding buffers before calling a function draw

var Maths = require('./maths');
var mat2 = Maths.mat2,
	mat3 = Maths.mat3,
	mat4 = Maths.mat4,
	quat = Maths.quat,
	quat2 = Maths.quat2,
	vec2 = Maths.vec2,
	vec3 = Maths.vec3,
	vec4 = Maths.vec4;

var gl, currentShaderProgram, anisotropyExt, maxAnisotropy;

exports.init = function(canvas, contextAttributes) {
	gl = canvas.getContext('webgl2', contextAttributes);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);	// TODO: Make configurable
	gl.enable(gl.DEPTH_TEST);	// TODO: expose as method
	gl.enable(gl.CULL_FACE);  // TODO: expose as method

	anisotropyExt = gl.getExtension("EXT_texture_filter_anisotropic");
	if (anisotropyExt) {
		maxAnisotropy = gl.getParameter(anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
	}

	// WebGL is supposed to have 32 texture locations but this seems to vary
	// Now TextureLocations.length will tell you how many there are and provide
	// a link from the integer to the actual value
	TextureLocations.length = 0;
	var i = 0;
	while(gl["TEXTURE"+i.toString()]) {
		TextureLocations.push(gl["TEXTURE"+i.toString()]);
		i++;
	}
};

exports.clearColor = function(r,g,b,a) {
	gl.clearColor(r, g, b, a);
};

exports.clear = function() {
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); // TODO: this isn't necessary every frame
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

// Shader / Shader Programs

var ShaderType = exports.ShaderType = {
	Vertex: "vertex",
	Fragment: "fragment"
};

exports.createShader = function(type, glsl) {
	var shader;
	if (type == ShaderType.Vertex) {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else if (type == ShaderType.Fragment) {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else {
		throw new Error("Unrecognised shader type '"+type+"'");
	}
	gl.shaderSource(shader, glsl);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw new Error("Could not create shader " + gl.getShaderInfoLog(shader));
	}
	return shader;
};

exports.deleteShader = function(shader)
{
	gl.deleteShader(shader);
};

exports.createShaderProgram = function(vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error("Could not create shader program");
	}
	return program;
};

exports.useShaderProgram = function(shaderProgram) {
	currentShaderProgram = shaderProgram;
	gl.useProgram(shaderProgram);
};

// Buffers

exports.createBuffer = function(data, itemSize, indexed) {
	var buffer = gl.createBuffer();
	if (!indexed) {
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	} else {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
	}
	buffer.itemSize = itemSize;
	buffer.numItems = data.length / itemSize;
	return buffer;
};

exports.createArrayBuffer = function(data, itemSize, numItems) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = numItems;
    return buffer;
};

exports.createElementArrayBuffer = function(data, itemSize, numItems) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = numItems;
    return buffer;
};

// Textures

var TextureLocations = exports.TextureLocations = [];

var TextureQuality = exports.TextureQuality = {
	Pixel: "pixel",		// Uses Mips and nearest pixel
	Highest: "highest",	// Uses Mips & Interp (trilinear)
	High: "high",			// Uses Mips & Interp (bilinear)
	Medium: "medium",		// Linear Interp
	Low: "low"				// Uses nearest pixel
};

exports.createTexture = function(source, quality, clamp) {
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

	setTextureQuality(gl.TEXTURE_2D, quality);

	if (clamp) {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}
	gl.bindTexture(gl.TEXTURE_2D, null);
	texture.glTextureType = gl.TEXTURE_2D;
	return texture;
};

/// width and height are of an individual texture
exports.createTextureArray = function(source, width, height, imageCount, quality, clamp) {
	var texture = gl.createTexture();
	// gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, width, height, imageCount, 0, gl.RGBA, gl.UNSIGNED_BYTE, source);

	setTextureQuality(gl.TEXTURE_2D_ARRAY, quality);

	if (clamp) {
		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}

	gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);
	texture.glTextureType = gl.TEXTURE_2D_ARRAY;
	return texture;
};

var setTextureQuality = function(glTextureType, quality) {
	if (quality === TextureQuality.Pixel) {
		// Unfortunately it doesn't seem to allow MAG_FILTER nearest with MIN_FILTER MIPMAP
		// Might be able to use dFdx / dFdy to determine MIPMAP level and use two textures
		// and blend the samples based of if it'd be mipmap level 0 or not
		// Or use multiple samplers in an version 300 ES shader
		gl.texParameteri(glTextureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(glTextureType, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		if (anisotropyExt) {
			gl.texParameterf(glTextureType, anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, maxAnisotropy);
		}
		gl.generateMipmap(glTextureType);
	}
	else if (quality === TextureQuality.Highest) {
		gl.texParameteri(glTextureType, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(glTextureType, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		if (anisotropyExt) {
			gl.texParameterf(glTextureType, anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, maxAnisotropy);
		}
		gl.generateMipmap(glTextureType);
	}
	else if (quality === TextureQuality.High) {
		gl.texParameteri(glTextureType, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(glTextureType, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		if (anisotropyExt) {
			gl.texParameterf(glTextureType, anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, Math.round(maxAnisotropy/2));
		}
		gl.generateMipmap(glTextureType);
	}
	else if (quality === TextureQuality.Medium) {
		gl.texParameteri(glTextureType, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(glTextureType, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
	else {
		gl.texParameteri(glTextureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(glTextureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	}
};

exports.setTexture = function(location, texture) {
	gl.activeTexture(TextureLocations[location]);
	gl.bindTexture(texture.glTextureType, texture);
};

// Blending
var BlendEquation = exports.BlendEquation = {
	Add: "FUNC_ADD",
	Subtract: "FUNC_SUBTRACT",
	ReverseSubtract: "FUNC_REVERSE_SUBTRACT"
};

var BlendType = exports.BlendType = {
	Zero: "ZERO",
	One: "ONE",
	ConstantAlpha: "CONSTANT_ALPHA",
	ConstantColour: "CONSTANT_COLOR",
	DestinationAlpha: "DST_ALPHA",
	DestinationColour: "DST_COLOR",
	SourceAlpha: "SRC_ALPHA",
	SourceColour: "SRC_COLOR",
	OneMinusConstantAlpha: "ONE_MINUS_CONSTANT_ALPHA",
	OneMinusConstantColour: "ONE_MINUS_CONSTANT_COLOR",
	OneMinusDestinationAlpha: "ONE_MINUS_DST_ALPHA",
	OneMinusDestinationColour: "ONE_MINUS_DST_COLOR",
	OneMinusSourceAlpha: "ONE_MINUS_SRC_ALPHA",
	OneMinusSourceColour: "ONE_MINUS_SRC_COLOR",
	SourceAlphaSaturate: "SRC_ALPHA_SATURATE"
};

exports.enableBlending = function(sourceBlend, destinationBlend, equation) {
	if(equation) {
		gl.blendEquation(gl[equation]);
	}
	if(sourceBlend && destinationBlend) {
		gl.blendFunc(gl[sourceBlend], gl[destinationBlend]);
	}
	gl.enable(gl.BLEND);
	gl.depthMask(false);

};

exports.disableBlending = function() {
	gl.disable(gl.BLEND);
	gl.depthMask(true);
};

// Attributes and Uniforms

exports.initAttribute = function(shaderProgram, name) {
	if(!shaderProgram.attributeLocations) {
		shaderProgram.attributeLocations = {};
	}
	shaderProgram.attributeLocations[name] = gl.getAttribLocation(shaderProgram, name);
};
exports.initUniform = function(shaderProgram, name) {
	if(!shaderProgram.uniformLocations) {
		shaderProgram.uniformLocations = {};
	}
	shaderProgram.uniformLocations[name] = gl.getUniformLocation(shaderProgram, name);
};

exports.enableAttribute = function(name) {
	gl.enableVertexAttribArray(currentShaderProgram.attributeLocations[name]);
};
exports.disableAttribute = function(name) {
	gl.disableVertexAttribArray(currentShaderProgram.attributeLocations[name]);
};
exports.setAttribute = function(name, buffer) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(currentShaderProgram.attributeLocations[name], buffer.itemSize, gl.FLOAT, false, 0, 0);
};

exports.setIndexedAttribute = function(buffer) {	// Should arguably be renamed - there's isn't an index attribute
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};

exports.setUniformBoolean = function(name, value) {
	gl.uniform1i(currentShaderProgram.uniformLocations[name], value);
};
exports.setUniformFloat = function(name, value) {
	gl.uniform1f(currentShaderProgram.uniformLocations[name], value);
};
exports.setUniformFloat2 = function(name, value1, value2) {
	gl.uniform2f(currentShaderProgram.uniformLocations[name], value1, value2);
};
exports.setUniformFloat3 = function(name, value1, value2, value3) {
	gl.uniform3f(currentShaderProgram.uniformLocations[name], value1, value2, value3);
};
exports.setUniformInteger = function(name, value) {
	gl.uniform1i(currentShaderProgram.uniformLocations[name], value);
};
exports.setUniformVector2 = function(name, value) {
	gl.uniform2fv(currentShaderProgram.uniformLocations[name], value);
}
exports.setUniformVector3 = function(name, value) {
	gl.uniform3fv(currentShaderProgram.uniformLocations[name], value);
};
exports.setUniformVector4 = function(name, value) {
	gl.uniform4fv(currentShaderProgram.uniformLocations[name], value);
};
exports.setUniformMatrix3 = function(name, value) {
	gl.uniformMatrix3fv(currentShaderProgram.uniformLocations[name], false, value);
};
exports.setUniformMatrix4 = function(name, value) {
	gl.uniformMatrix4fv(currentShaderProgram.uniformLocations[name], false, value);
};

// Draw Functions
var RenderMode = exports.RenderMode = {
	Triangles: "triangles",
	TriangleStrip: "triangleStrip",
	Lines: "lines",
	Points: "points"
};

var drawTriangles = exports.drawTriangles = function(count) {
	gl.drawArrays(gl.TRIANGLES, 0, count);
};
var drawTriangleStrip = exports.drawTriangleStrip = function(count) {
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
};
var drawLines = exports.drawLines = function(count) {
	gl.drawArrays(gl.LINES, 0, count);
};
var drawPoints = exports.drawPoints = function(count) {
	gl.drawArrays(gl.POINTS, 0, count);
};
var drawIndexedTriangles = exports.drawIndexedTriangles = function(count, offset) {
	gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset);
};
var drawIndexedTriangleStrip = exports.drawIndexedTriangleStrip = function(count, offset) {
	gl.drawElements(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, offset);
}
var drawIndexedLines = exports.drawIndexedLines = function(count, offset) {
	gl.drawElements(gl.LINES, count, gl.UNSIGNED_SHORT, offset);
};
var drawIndexedPoints = exports.drawIndexedPoints = function(count, offset) {
	gl.drawElements(gl.POINTS, count, gl.UNSIGNED_SHORT, offset);
};

exports.draw = function(renderMode, count, indexed, offset) {
	switch(renderMode) {
		case RenderMode.Triangles:
			if(!indexed) {
				drawTriangles(count);
			} else {
				drawIndexedTriangles(count, offset);
			}
			break;
		case RenderMode.TriangleStrip:
			if(!indexed) {
				drawTriangleStrip(count);
			} else {
				drawIndexedTriangleStrip(count);
			}
			break;
		case RenderMode.Lines:
			if(!indexed) {
				drawLines(count);
			} else {
				drawIndexedLines(count, offset);
			}
			break;
		case RenderMode.Points:
			if(!indexed) {
				drawPoints(count);
			} else {
				drawIndexedPoints(count, offset);
			}
			break;
		default:
			throw new Error("Unrecognised renderMode '"+renderMode+"'");
	}
};

},{"./maths":8}],13:[function(require,module,exports){
var r = require('./renderer');
var indexedMap = require('./indexedMap');
var Material = require('./material');
var Mesh = require('./mesh');
var Transform = require('./transform');
var Maths = require('./maths');
var Bounds = require('./bounds');
var mat2 = Maths.mat2,
	mat3 = Maths.mat3,
	mat4 = Maths.mat4,
	quat = Maths.quat,
	quat2 = Maths.quat2,
	vec2 = Maths.vec2,
	vec3 = Maths.vec3,
	vec4 = Maths.vec4;

var Scene = module.exports = function() {
	var nextSceneId = 0;
	var exports = {};
	var prototype = {};

	// Note Meshes and Materials shared across scenes
	// Going to use dictionaries but with an array of keys for enumeration (hence private with accessor methods)
	var meshes = indexedMap.create();
	var materials = indexedMap.create();
	var shaders = indexedMap.create();
	var textures = indexedMap.create();

	var create = exports.create = function(parameters) {
		var sceneId = (nextSceneId++).toString();
		var cameras = {};
		var cameraNames = [];
		var mainCameraName = "main";
		// mvMatrix may need to be a stack in future (although a stack which avoids unnecessary mat4.creates)
		var pMatrix = mat4.create(), mvMatrix = mat4.create(), nMatrix = mat3.create(), cameraMatrix = mat4.create(), cameraOffset = vec3.create(), inverseCameraRotation = quat.create();
		var currentShaderId, currentMaterialId, currentMeshId, pMatrixRebound = false;
		var nextTextureLocation = 0, currentTextureBindings = {}, currentTextureLocations = [];	// keyed on texture.id to binding location, keyed on binding location to texture.id

		var scene = Object.create(prototype);

		scene.enableFrustumCulling = !!parameters.enableFrustumCulling;
		var forceSphereCulling = !!parameters.forceSphereCulling;

		// these renderObjects / instances on prefabs need to contain at minimum materialId, meshId, and transform (currently object just has material and mesh as well as transform)
		var renderObjects = indexedMap.create(); // TODO: use materialId / meshId to bind
		var prefabs = { keys: [] };	// Arguably instances could be added to renderer objects and memory would still be saved, however keeping a separate list allows easier batching for now
		// TODO: Should have an equivilent to indexedMap but where you supply the keys, keyedMap?.
		var alphaRenderObjects = [];
		var depths = {};

		var addTexturesToScene = function(material) {
			for(var i = 0, l = material.shader.textureUniformNames.length; i < l; i++) {
				var uniformName = material.shader.textureUniformNames[i];
				var texture = material.textures[uniformName];
				if(texture) {
					textures.add(texture);
					bindTextureToLocation(texture);
				}

			}
		};

		var bindTextureToLocation = function(texture) {
			if(currentTextureLocations.length < r.TextureLocations.length) {
				r.setTexture(currentTextureLocations.length, texture);
				currentTextureBindings[texture.id] = currentTextureLocations.length;
				currentTextureLocations.push(texture.id);
			} else {
				// replace an existing texture
				delete currentTextureBindings[currentTextureLocations[nextTextureLocation]];
				r.setTexture(nextTextureLocation, texture);
				currentTextureBindings[texture.id] = nextTextureLocation;
				currentTextureLocations[nextTextureLocation] = texture.id;
				nextTextureLocation = (nextTextureLocation+1)%r.TextureLocations.length;
			}
		};

		var addToAlphaList = function(object, depth) {
			depths[object.sceneId] = depth;
			// Binary search
			// Could technically do better by batching up items with the same depth according to material / mesh like sence graph
			var less, more, itteration = 1, inserted = false, index = Math.floor(alphaRenderObjects.length/2);
			while(!inserted) {
				less = (index === 0 || depths[alphaRenderObjects[index-1].sceneId] <= depth);
				more = (index >= alphaRenderObjects.length || depths[alphaRenderObjects[index].sceneId] >= depth);
				if(less && more) {
					alphaRenderObjects.splice(index, 0, object);
					inserted = true;
				} else {
					itteration++;
					var step = Math.ceil(alphaRenderObjects.length/(2*itteration));
					if(!less) {
						index -= step;
					} else {
						index += step;
					}
				}
			}
		};

		var createObjectBounds = function(object, mesh, rotation) {
			// If object is static and not rotated, create object AABB from mesh bounds
			if (!forceSphereCulling && object.static && (!rotation || Maths.quatIsIdentity(rotation))) {
				// TODO: Allow for calculation of AABB of rotated meshes
				let center = vec3.clone(mesh.bounds.center);
				vec3.add(center, center, object.transform.position);
				let size = vec3.clone(mesh.bounds.size);
				object.bounds = Bounds.create({ center: center, size: size });
			}
		};

		var recalculateObjectBounds = function(object) {
			if (object.bounds) {
				// This method recalculates AABB for a translated static objects
				// NOTE: Does not account for rotation of object :scream:
				// Need to recalculate extents as well as center if rotation is not identity
				// => need to transform all mesh vertices in order to recalculate accurate AABB
				vec3.add(object.bounds.center, object.mesh.bounds.center, object.transform.position);
				object.bounds.calculateMinMax(object.bounds.center, object.bounds.extents)
			}
		};

		var isCulledByFrustrum = function(camera, object) {
			if (!object.static || !object.bounds) {
				return !camera.isSphereInFrustum(object.transform.position, object.mesh.boundingRadius);
			} else {
				return !camera.isInFrustum(object.bounds);
			}
		};

		// Add Object
		// TODO: RenderObject / Component should have its own class
		scene.add = function(parameters) {
			var object = {};
			if(!parameters || !parameters.mesh || !parameters.material) {
				throw new Error("Mesh and Material must be present on the object.");
			}

			object.material = parameters.material;
			object.mesh = parameters.mesh;

			object.meshId = meshes.add(object.mesh);
			object.materialId = materials.add(object.material);
			object.shaderId = shaders.add(object.material.shader);
			object.material.shaderId = object.shaderId;
			addTexturesToScene(object.material);

			// Probably want to move to a stronger ECS concept
			// Adding a transform component is probably fine
			// as the renderer requires it.
			object.transform = Transform.create(parameters);

			object.sceneId = renderObjects.add(object);
			object.static = !!parameters.static;
			object.active = parameters.active === undefined || !!parameters.active;

			createObjectBounds(object, object.mesh, parameters.rotation);

			return object;
		};

		scene.remove = function(object) {
			// Note: This does not free up the resources (e.g. mesh and material references remain) in the scene, may need to reference count these and delete
			if (object.sceneId !== undefined) {
				renderObjects.remove(object.sceneId);
			} else if (object.id) {
				// Is prefab, look on prototype for instances and remove this
				object.instances.remove(object.id);
				// Note not deleting the locally stored prefab, even if !instances.length as we would get duplicate mesh / materials if we were to readd
				// Keeping the prefab details around is preferable and should be low overhead
			}
		};

		scene.instantiate = function(parameters) {
			var prefab;
			if(!parameters || !parameters.name || !Fury.prefabs[parameters.name]) {
				throw new Error("You must provide a valid prefab name");
			}
			if(!prefabs[parameters.name]) {
				var defn = Fury.prefabs[parameters.name];
				if(!defn.material || !defn.mesh) {
					throw new Error("Requested prefab must have a material and a mesh present");
				}
				prefab = {
					name: parameters.name,
					instances: indexedMap.create(),
					mesh: Mesh.copy(defn.mesh),
					material: Material.copy(defn.material)
				};
				prefab.meshId = meshes.add(prefab.mesh);
				prefab.materialId = materials.add(prefab.material);
				prefab.shaderId = shaders.add(prefab.material.shader);
				prefab.material.shaderId = prefab.shaderId;
				addTexturesToScene(prefab.material);
				prefabs[parameters.name] = prefab;
				prefabs.keys.push(parameters.name);
			} else {
				prefab = prefabs[parameters.name];
			}
			var instance = Object.create(prefab);
			instance.transform = Transform.create(parameters);

			instance.id = prefab.instances.add(instance);
			instance.static = !!parameters.static;
			instance.active = parameters.active === undefined || !!parameters.active;

			createObjectBounds(instance, prefab.mesh, parameters.rotation);

			return instance;
		};

		// Add Camera
		scene.addCamera = function(camera, name) {
			var key = name ? name : "main";
			if(cameraNames.length === 0) {
				mainCameraName = key;
			}
			if(!cameras.hasOwnProperty(key)) {
				cameraNames.push(key);
			}
			cameras[key] = camera;
		};

		// Render
		scene.render = function(cameraName) {
			var camera = cameras[cameraName ? cameraName : mainCameraName];
			if (scene.enableFrustumCulling) {
				camera.calculateFrustrum();
			}
			camera.getProjectionMatrix(pMatrix);
			// Camera Matrix should transform world space -> camera space
			quat.invert(inverseCameraRotation, camera.rotation);						// TODO: Not quite sure about this, camera's looking in -z but THREE.js does it so it's probably okay
			mat4.fromQuat(cameraMatrix, inverseCameraRotation);
			mat4.translate(cameraMatrix, cameraMatrix, vec3.set(cameraOffset, -camera.position[0], -camera.position[1], -camera.position[2]));

			pMatrixRebound = false;
			alphaRenderObjects.length = 0;
			// Simple checks for now - no ordering

			// TODO: Scene Graph
			// Batched first by Shader
			// Then by Material
			// Then by Mesh
			// Then render each Mesh Instance
			// An extension would be to batch materials such that shaders that textures used overlap

			// This batching by shader / material / mesh may need to be combined with scene management techniques

			r.clear();

			// TODO: Scene graph should provide these as a single thing to loop over, will then only split and loop for instances at mvMatrix binding / drawing
			// Scene Graph should be class with enumerate() method, that way it can batch as described above and sort watch its batching / visibility whilst providing a way to simple loop over all elements
			var culled = false;
			for(var i = 0, l = renderObjects.keys.length; i < l; i++) {
				var renderObject = renderObjects[renderObjects.keys[i]];
				if (scene.enableFrustumCulling) {
					culled = isCulledByFrustrum(camera, renderObject);
				}
				if (!culled && renderObject.active) {
					if(renderObject.material.alpha) {
						addToAlphaList(renderObject, camera.getDepth(renderObject));
					} else {
						bindAndDraw(renderObject);
					}
				}
			}
			for(i = 0, l = prefabs.keys.length; i < l; i++) {
				var instances = prefabs[prefabs.keys[i]].instances;
				for(var j = 0, n = instances.keys.length; j < n; j++) {
					var instance = instances[instances.keys[j]];
					if (scene.enableFrustumCulling) {
						culled = isCulledByFrustrum(camera, instance);
					}
					if (!culled && instance.active) {
						if(instance.material.alpha) {
							addToAlphaList(instance, camera.getDepth(instance));
						} else {
							bindAndDraw(instance);
						}
					}
				}
			}
			for(i = 0, l = alphaRenderObjects.length; i < l; i++) {
				var renderObject = alphaRenderObjects[i];
				// Could probably do this in bind and draw method
				r.enableBlending(renderObject.material.sourceBlendType, renderObject.material.destinationBlendType, renderObject.material.blendEquation);
				bindAndDraw(renderObject);
			}
			r.disableBlending();
		};

		var bindAndDraw = function(object) {	// TODO: Separate binding and drawing
			var shader = object.material.shader;
			var material = object.material;
			var mesh = object.mesh;
			// BUG:
			// If there's only one material or one mesh in the scene real time changes to the material or mesh will not present themselves as the id will still match the currently bound
			// mesh / material, seems like we're going need a flag on mesh / material for forceRebind for this case. (should probably be called forceRebind as it 'might' be rebound anyway)
			// Having now determined that actually we don't need to rebind uniforms when switching shader programs, we'll need this flag whenever there's only one mesh or material using a given shader.

			// TODO: When scene graph implemented - check material.shaderId & object.shaderId against shader.id, and object.materialId against material.id and object.meshId against mesh.id
			// as this indicates that this object needs reordering in the graph (as it's been changed).

			var shaderChanged = false;
			var materialChanged = false;
			if(!shader.id || shader.id != currentShaderId) {
				shaderChanged = true;
				if(!shader.id) {	// Shader was changed on the material since originally added to scene
					material.shaderId = shaders.add(shader);
					object.shaderId = material.shaderId;
				}
				currentShaderId = shader.id;
				r.useShaderProgram(shader.shaderProgram);
				pMatrixRebound = false;
			}

			if(!pMatrixRebound) {
				// New Shader or New Frame, rebind projection Matrix
				r.setUniformMatrix4(shader.pMatrixUniformName, pMatrix);
				pMatrixRebound = true;
			}

			if(!material.id || material.id != currentMaterialId || material.dirty) {
				if(!material.dirty) {
					materialChanged = true;
				} else {
					material.dirty = false;
				}
				if(!material.id) {	// material was changed on object since originally added to scene
					object.materialId = materials.add(material);
				}
				currentMaterialId = material.id;
				shader.bindMaterial.call(r, material);
			}

			if(shaderChanged || materialChanged) {
				// Texture Rebinding dependencies
				// If the shader has changed you DON'T need to rebind, you only need to rebind if the on the uniforms have changed since the shaderProgram was last used...
					// NOTE Large Changes needed because of this
					// I think we're just going to have to add a flag to materials and meshes to say "rebind" (because I've changed something)
					// This also means we should move the "currentMeshId / currentMaterial id to the shader instead or keep a keyed list on shader the id
					// Lets do this after we've done the texture binding though eh? so for now just rebind everything if shader or material changes (overkill but it'll work)
				// If the material has changed textures may need rebinding

				// Check for gl location rebinds needed, if any needed and rebind all to make sure we don't replace a texture we're using
				var locationRebindsNeeded = false;
				for(var i = 0, l = shader.textureUniformNames.length; i < l; i++) {
					var uniformName = shader.textureUniformNames[i];
					if(material.textures[uniformName]) {
						var texture = material.textures[uniformName];
						if(!texture.id) {
							textures.add(texture);
							locationRebindsNeeded = true;
							break;
						}
						if(isNaN(currentTextureBindings[texture.id])) {
							locationRebindsNeeded = true;
							break;
						}
					}
				}
				// Rebind if necessary and set uniforms
				for(i = 0, l = shader.textureUniformNames.length; i < l; i++) {
					var uniformName = shader.textureUniformNames[i];
					if(material.textures[uniformName]) {
						var texture = material.textures[uniformName];
						if(locationRebindsNeeded) {
							bindTextureToLocation(texture);
						}
						r.setUniformInteger(uniformName, currentTextureBindings[texture.id]);
					}
				}
			}

			if(!mesh.id || mesh.id != currentMeshId || mesh.dirty) {
				if(!mesh.id) {	// mesh was changed on object since originally added to scene
					object.meshId = mesh.add(mesh);
				}
				currentMeshId = mesh.id;
				shader.bindBuffers.call(r, mesh);
				mesh.dirty = false;
			}

			// TODO: If going to use child coordinate systems then will need a stack of mvMatrices and a multiply here
			mat4.fromRotationTranslation(mvMatrix, object.transform.rotation, object.transform.position);
			mat4.scale(mvMatrix, mvMatrix, object.transform.scale);
			if (shader.mMatrixUniformName) {
				// TODO: Arguably should send either MV Matrix or M and V Matrices
				r.setUniformMatrix4(shader.mMatrixUniformName, mvMatrix);
			}
			mat4.multiply(mvMatrix, cameraMatrix, mvMatrix);
			r.setUniformMatrix4(shader.mvMatrixUniformName, mvMatrix);

			if (shader.nMatrixUniformName) {
				mat3.normalFromMat4(mvMatrix, nMatrix);
				r.setUniformMatrix3(shader.nMatrixUniformName, nMatrix);
			}

			r.draw(mesh.renderMode, mesh.indexed ? mesh.indexBuffer.numItems : mesh.vertexBuffer.numItems, mesh.indexed, 0);
		};

		if(parameters && parameters.camera) {
			scene.addCamera(parameters.camera);
		}

		return scene;
	};

	return exports;
}();

},{"./bounds":2,"./indexedMap":5,"./material":7,"./maths":8,"./mesh":9,"./renderer":12,"./transform":15}],14:[function(require,module,exports){
// Shader Class for use with Fury Scene
var r = require('./renderer');

var Shader = module.exports = function() {
	var exports = {};
	var prototype = {};

	var create = exports.create = function(parameters) {
		var i, l;
		var shader = Object.create(prototype);

		// Argument Validation
		if(!parameters) {
			throw new Error("No paramter object supplied, shader source must be provided");
		}
		if(!parameters.vsSource) {
			throw new Error("No Vertex Shader Source 'vsSource'");
		}
		if(!parameters.fsSource) {
			throw new Error("No Fragment Shader Source 'fsSource'");
		}

		shader.vs = r.createShader("vertex", parameters.vsSource);
		shader.fs = r.createShader("fragment", parameters.fsSource);
		shader.shaderProgram = r.createShaderProgram(shader.vs, shader.fs);
		if(parameters.attributeNames) {	// Could parse these from the shader
			for(i = 0, l = parameters.attributeNames.length; i < l; i++) {
				r.initAttribute(shader.shaderProgram, parameters.attributeNames[i]);
			}
		}
		if(parameters.uniformNames) {	// Could parse these from the shader
			for(i = 0, l = parameters.uniformNames.length; i < l; i++) {
				r.initUniform(shader.shaderProgram, parameters.uniformNames[i]);
			}
		}
		if(parameters.textureUniformNames) {
			if(parameters.textureUniformNames.length > r.TextureLocations.length) {
				throw new Error("Shader can not use more texture than total texture locations (" + r.TextureLocations.length + ")");
			}
			shader.textureUniformNames = parameters.textureUniformNames;	// Again could parse from the shader, and could also not require duplicate between uniformNames and textureUniformNames
		} else {
			shader.textureUniformNames = [];
		}

		if(!parameters.bindMaterial || typeof(parameters.bindMaterial) !== 'function') {
			throw new Error("You must provide a material binding function 'bindMaterial'");
		}
		shader.bindMaterial = parameters.bindMaterial;

		if(!parameters.bindBuffers || typeof(parameters.bindBuffers) !== 'function') {
			throw new Error("You must provide a mesh binding function 'bindBuffers'");
		}
		shader.bindBuffers = parameters.bindBuffers;

		shader.pMatrixUniformName = parameters.pMatrixUniformName || "pMatrix";
		shader.mvMatrixUniformName = parameters.mvMatrixUniformName || "mvMatrix";
		shader.nMatrixUniformName = parameters.nMatrixUniformName;
		shader.mMatrixUniformName = parameters.mMatrixUniformName;

		// TODO: decide how to deal with non-standard uniforms

		return shader;
	};

	return exports;
}();

},{"./renderer":12}],15:[function(require,module,exports){
var Maths = require('./maths');
var quat = Maths.quat, vec3 = Maths.vec3;

var Transform = module.exports = function() {
	var exports = {};
	var prototype = {};
	exports.create = function(parameters) {
		var transform = Object.create(prototype);
		if(!parameters.position) {
			transform.position = vec3.create();
		}  else {
			transform.position = parameters.position;
		}
		if(!parameters.rotation) {
			transform.rotation = quat.create();
		} else {
			transform.rotation = parameters.rotation;
		}
		if(!parameters.scale) {
			transform.scale = vec3.fromValues(1.0, 1.0, 1.0);
		} else {
			transform.scale = parameters.scale;
		}
		return transform;
	};
	return exports;
}();

},{"./maths":8}],16:[function(require,module,exports){
let CloseCode = require('./common/websocket-close-codes');

let isLocalHost = true; // Is running on localhost / development machine, not is hosting local server, or in fact hosting a server for other local clients
let acknowledged = false; // Acknowledged by websocket server

let Connection = require('./client/connection');
let GameClient = require('./client/game-client');
let GameServer = require('./common/game-server');

let setupLocalServer = () => {
  GameServer.init(
    (id, message) => { GameClient.onmessage(message); },
    (id, message) => { if (id == -1) GameClient.onmessage(message); });

  // Might need to wait for local server to be ready
  // before faking a connection a connection like this
  GameServer.onclientconnect(0);
};

let sendMessage = (message) => {
  // Send either to web socket or to local server
  // depending on if acknowledged
  if (acknowledged) {
    Connection.send(message);
  } else {
    GameServer.onmessage(0, message);
  }
};

window.onload = (event) => {
  let wsOpened = false;

  let nick = "";
  // nick = prompt("Enter you nick name", "Player");
  GameClient.init(nick, sendMessage);
  // Client should start loading whatever assets are needed
  // Arguably we should wait before trying to connect to the ws server

  // Try to connect to web socket server
  // No server present results in an error *then* a close (code 1006) (onopen is never called)
  // Full server results in an open event *then* a close (code 4006) (no error event)
  Connection.connect({
    isDebug: isLocalHost,
    uri: isLocalHost ? "ws://localhost:9001" : "wss://delphic.me.uk:9001",
    onopen: () => {
      wsOpened = true;
    },
    onmessage: (message) => {
      // Received at least one message => acknoledged by server
      // Set connected bool which makes sure messages sent by client
      // are sent through the web socket connection rather than the relay
      acknowledged = true;
      GameClient.onmessage(message);
    },
    onerror: () => { /* Maybe do something IDK */ },
    onclose: (code) => {
      if (!wsOpened || code == CloseCode.SERVER_FULL) {
        setupLocalServer();
      } else if (acknowledged) {
        // Handle Disconnect
        GameClient.ondisconnect();
        // TODO: Could conceivable spin up a local server at this point
        // passing in GameClient.world instead of generating a new one
        // and passing in local player curent state
      }
    }
  });
};

},{"./client/connection":18,"./client/game-client":19,"./common/game-server":27,"./common/websocket-close-codes":35}],17:[function(require,module,exports){
// Character Controller handles physics and movement for characters (players)
let Fury = require('../../Fury/src/fury.js');
let Vorld = require('../common/vorld/vorld.js');
let Physics = Fury.Physics;
let Maths = Fury.Maths;
let vec2 = Maths.vec2, vec3 = Maths.vec3, quat = Maths.quat;

var CharacterController = module.exports = (function() {
  var exports = {};
  var prototype = {};

  exports.create = (params) => {
    let controller = Object.create(prototype);

    let player = params.player;

    let collisions = [];

    let lastPosition = vec3.clone(player.position);
    let targetPosition = vec3.clone(player.position);

    let playerBox = Physics.Box.create({
      center: player.position,
      size: vec3.clone(player.size)
    });

    let voxelCollisionResult = {
      foundX: false,
      foundZ: false,
      timeX: 0,
      timeZ: 0
    };

    controller.stepHeight = params.stepHeight;

    let enteredVoxelOnAxis = function(box, i, position, displacement) {
      return !(box.min[i] - displacement < position+1 && box.max[i] - displacement > position)
        && (box.min[i] < position + 1 && box.max[i] > position);
    }

    let checkVoxelCollisionXZ = function(result, delta, foundX, foundZ) {
      // Assumes player box has already moved to targetPosition by delta
      result.foundX = foundX;
      result.foundZ = foundZ;
      result.timeX = 0;
      result.timeZ = 0;
      /* result.boxXMin = playerBox.min[0];
      result.boxXMax = playerBox.max[0];
      result.boxZMin = playerBox.min[2];
      result.boxZMax = playerBox.max[2];*/

      for (let x = Math.floor(playerBox.min[0]), xMax = Math.ceil(playerBox.max[0]); x < xMax; x++) {
        for (let y = Math.floor(playerBox.min[1]), yMax = Math.ceil(playerBox.max[1]); y < yMax; y++) {
          for (let z = Math.floor(playerBox.min[2]), zMax = Math.ceil(playerBox.max[2]); z < zMax; z++) {
            if (Vorld.getBlock(player.world.vorld, x, y, z)) {
              if (enteredVoxelOnAxis(playerBox, 0, x, delta[0]) && !result.foundX) {  // We're moving maximum of 1 unit, and voxels have the same positions so if we've found one we dont' need to check any more
                result.foundX = true;
                let distance = 0;
                if (delta[0] > 0) { // => max crossed x
                  distance = delta[0] - (playerBox.max[0] - x);
                } else { // => min crossed x+1
                  distance = -delta[0] - (x+1 - playerBox.min[0]);
                }
                let time = distance / Math.abs(delta[0]); // distance / speed (where unit time == elapsed)
                result.timeX = time;  // would check against existing time if we had to keep checking other boxes
                result.deltaX = delta[0];
              }
              if (enteredVoxelOnAxis(playerBox, 2, z, delta[2]) && !result.foundZ) {
                result.foundZ = true;
                let distance = 0;
                if (delta[2] > 0) { // => max crossed z
                  distance = delta[2] - (playerBox.max[2] - z);
                } else { // => min crossed z+1
                  distance = -delta[2] - (z+1 - playerBox.min[2]);
                }
                let time = distance / Math.abs(delta[2]); // distance / speed (where unit time == elapsed)
                result.timeZ = time;  // would check against existing time if we had to keep checking other boxes
                result.deltaZ = delta[2];
              }

              if (result.foundX && result.foundZ) {
                // Again, moving max of 1 unit, and voxels have same positions
                // so if we've found a collision in each axis can just exit
                break;
              }
            }
          }
        }
      }
    }

    let checkVoxelIntersection = function(vorld, bounds) {
      for (let x = Math.floor(bounds.min[0]), xMax = Math.ceil(bounds.max[0]); x < xMax; x++) {
        for (let y = Math.floor(bounds.min[1]), yMax = Math.ceil(bounds.max[1]); y < yMax; y++) {
          for (let z = Math.floor(bounds.min[2]), zMax = Math.ceil(bounds.max[2]); z < zMax; z++) {
            if (Vorld.getBlock(vorld, x, y, z)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    // Simple AABB collision detection, slow speed only, X,Z movement only
    controller.xzMove = function(delta) {
      // Simple voxel check
      // first assert that movement is less than 1 in each direction
      // would need to use more complex collider types to support higher speeds
      if (Math.abs(delta[0]) > 1) {
        delta[0] = Math.sign(delta[0]);
      }
      delta[1] = 0;
      if (Math.abs(delta[2]) > 1) {
        delta[2] = Math.sign(delta[2]);
      }

      vec3.copy(lastPosition, player.position);
    	vec3.add(targetPosition, lastPosition, delta);

      // Move player to new position for physics checks
    	vec3.copy(player.position, targetPosition);
      // playerBox.center has changed because it's set to the playerPosition ref
      playerBox.calculateMinMax(playerBox.center, playerBox.extents);

      // Voxel version - check vorld for intersections a new position
      // and get 'time' of collision in that axis
      checkVoxelCollisionXZ(voxelCollisionResult, delta, false, false);
      let foundX = voxelCollisionResult.foundX;
      let foundZ = voxelCollisionResult.foundZ;

      if (foundX && foundZ) {
        // Can we move in one but not the other?
        let dx = delta[0], dz = delta[2];
        let canMoveXOnly = false, canMoveZOnly = false;

        // Check can move z only
        delta[0] = 0;
        // Recalculate target position
        vec3.add(targetPosition, lastPosition, delta);
        vec3.copy(player.position, targetPosition);
        playerBox.calculateMinMax(playerBox.center, playerBox.extents);

        checkVoxelCollisionXZ(voxelCollisionResult, delta, true, false);
        canMoveZOnly = !voxelCollisionResult.foundZ;

        // Check can move x only
        delta[0] = dx;
        delta[2] = 0;
        // Recalculate target position
        vec3.add(targetPosition, lastPosition, delta);
        vec3.copy(player.position, targetPosition);
        playerBox.calculateMinMax(playerBox.center, playerBox.extents);

        checkVoxelCollisionXZ(voxelCollisionResult, delta, false, true);
        canMoveXOnly = !voxelCollisionResult.foundX;

        if (canMoveXOnly && !canMoveZOnly) {
          delta[0] = dx;
          delta[2] = 0; // Tehnically already set but setting again for clarity
          foundX = false;
        } else if (canMoveZOnly && !canMoveXOnly) {
          delta[0] = 0;
          delta[2] = dz;
          foundZ = false;
        } else if (canMoveXOnly && canMoveZOnly) {
          // Tie Break!
          let timeX = voxelCollisionResult.timeX;
          let timeZ = voxelCollisionResult.timeZ;
          if (timeX < timeZ) {
            delta[0] = 0;
            delta[2] = dz;
            foundZ = false;
          } else {  // TODO: do we need to tie break the tie break when times are equal?
            delta[0] = dx;
            delta[2] = 0;
            foundX = false;
          }
        } else {
          // Can't move at all just stop
          delta[0] = 0;
          delta[2] = 0;
        }
      } else if (foundX) {
        delta[0] = 0;
      } else if (foundZ) {
        delta[2] = 0;
      }
      // TODO: ^^ Support steps / half-voxels - would require checking if step was possible
      // and if it is, stop other axis first (if step is not also available)
      // *Then* test new delta against y if it fails... just abort all movement
      // (technically we could get more accurate but eh, seems like a *lot* of effort)

      // TODO: Decouple setting player.position from these calculations
      // evaluate delta first and only apply at the end.

      if (foundX || foundZ) { // => delta changed
        // Update target position, and player position, and playerBox for world checks
        vec3.add(targetPosition, lastPosition, delta);
      	vec3.copy(player.position, targetPosition);
        playerBox.calculateMinMax(playerBox.center, playerBox.extents);
        if (foundX && foundZ) {
          // Not moving so skip further checks
          return;
        }
      }

      // TODO: Improved Collision Algorithm (implemented for voxels above)
      // (Account for corner cases and flush colliders when moving)
      // Use swept bounds (will catch things you would pass through)
      // Get All Intersections
      // Evaluate each axis against all intersections (check for enter)
      // Get intersection time by looking at min / max (accounting for movement direction)
      // Break ties based on previous frame velocity
      // Check if you can continue on one axis and not the other, and if so do that
      // else if you can continue on both
      // whichever entry for that axis happens first - cancel movement on that axis (or step)

      // If step recaculate bounds and check again against x-z
      // After these are resolved if stepped check against world finally and cancel all movement if entering
      // this is specifically to stop you entering the ceiling but it's a nice catch all too

      // We used to have the collision handling outside the loop, but has we need to continue
    	// the loops I moved it inside, a world collision method which returned a list of boxes
    	// that overlapped would be acceptable.
      let stepCount = 0, stepX = false, stepZ = false;
    	for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        let worldBox = player.world.boxes[i];
        if (Physics.Box.intersect(playerBox, worldBox)) {
            // Check each axis individually and only stop movement on those which changed from
          // not overlapping to overlapping. In theory we should calculate distance and move
          // up to it for high speeds, however we'd probably want a skin depth, for the speeds
          // we're travelling, just stop is probably fine
          // BUG: You can get stuck on corners of flush surfaces when sliding along them
          // Should be resolvable if we find all colliding boxes first then respond with full information
          if (Physics.Box.enteredX(worldBox, playerBox, player.position[0] - lastPosition[0])) {
            let separation = worldBox.max[1] - playerBox.min[1];
            if (stepCount == 0 && !stepX && separation <= controller.stepHeight) {
              // Step!
              stepCount = 1;
              stepX = true;
              player.position[1] += separation;
            } else {
              player.position[0] = lastPosition[0];
              if (stepX) {
                // If have stepping in this direction already cancel
                player.position[1] = lastPosition[1];
              }
            }
          }
          if (Physics.Box.enteredZ(worldBox, playerBox, player.position[2] - lastPosition[2])) {
            let separation = worldBox.max[1] - playerBox.min[1];
            if (stepCount == 0 && !stepZ && separation <= controller.stepHeight) {
              // Step!
              stepCount = 1;
              stepZ = true;
              player.position[1] += separation;
            } else {
              player.position[2] = lastPosition[2];
              if (stepZ) {
                // If have stepped in this direction already cancel
                player.position[1] = lastPosition[1];
              }
            }
          }
          // Whilst we're only moving on x-z atm but if we change to fly camera we'll need this
          // Haven't tested this much as you might imagine
          if (Physics.Box.enteredY(worldBox, playerBox, player.position[1] - lastPosition[1])) {
            player.position[1] = lastPosition[1];
            // TODO: If stepped should reset those too?
          }
            // Note this only works AABB, for OOBB and other colliders we'd probably need to get
          // impact normal and then convert the movement to be perpendicular, and if there's multiple
          // collider collisions... ?
            // Update target position and box bounds for future checks
          vec3.copy(targetPosition, player.position);
          playerBox.calculateMinMax(playerBox.center, playerBox.extents);
          // TODO: if we've changed target y position because of steps we should technically re-evaluate all boxes on y axis
          // If collider and they are above us we should remove the step and cancel the x/z movement as appropriate
          // Have to check other boxes cause still moving, so no break - technically we could track which
          // axes we'd collided on and not check those in future if we wanted to try to optimize.
          // Also could break if all axes we moved in had returned true
          // Could also only check axes we were actually moving in
        }
    	}
    };

    // Simplified move just for jumping / gravity
    controller.yMove = function(dy) {
      vec3.copy(lastPosition, player.position);

      // TODO: yVelocity can get big, should really be doing a cast check
      // rather than intersect check - however this requires decoupling
      // player.position and playerBox.center

      vec3.scaleAndAdd(player.position, player.position, Maths.vec3Y, dy);
      // playerBox.center has changed because it's set to the playerPosition ref
      playerBox.calculateMinMax(playerBox.center, playerBox.extents);

      if (checkVoxelIntersection(player.world.vorld, playerBox)) {
        // TODO: Should move up to the object instead - y Velocity can get big when falling
        vec3.copy(player.position, lastPosition);
        if (player.yVelocity < 0) {
          player.jumping = false;
        }
        player.yVelocity = 0;
        return;
      }

      let collision = false;
      for (let i = 0, l = player.world.boxes.length; i < l; i++) {
        if (Physics.Box.intersect(playerBox, player.world.boxes[i])) {
          collision = true;
          // Only moving on one axis don't need to do the slide checks
          break;
        }
      }
      if (collision) {
        // TODO: Should move up to the object instead - y Velocity can get big when falling
        vec3.copy(player.position, lastPosition);
        if (player.yVelocity < 0) {
          player.jumping = false;
          // ^^ TODO: Need to convert this into isGrounded check, and will need to
          // change dx / dz to be against slopes if/when we introduce them
        }
        player.yVelocity = 0;
      }
    };

    return controller;
  };

  return exports;
})();

},{"../../Fury/src/fury.js":4,"../common/vorld/vorld.js":34}],18:[function(require,module,exports){
// Handles connecting to web socket server
// and provides messaging methods - but these should rarely be called directly
// as we may want to be using a local message relay instead

// Very thin wrapper around a web socket, makes it purely send and receive JSON
// Currently single static connection - no create method.

var Connection = module.exports = (function() {
  var exports = {};

  let isDebug;
  let webSocket;
  let connectionId;
  let onopen, onerror, onclose, onmessage;

  const pingInterval = 60 * 1000; // 60s
  let schedulePing = () => {
    window.setTimeout(ping, pingInterval);
  };
  let ping =  () => {
    if (webSocket.readyState == 1) {
      webSocket.send(JSON.stringify({ type: "ping" }));
      schedulePing();
    }
  };

  exports.send = (obj) => {
    if (webSocket.readyState == 1) {
      let data = JSON.stringify(obj);
      if (isDebug && obj.type != "position") console.log(data);
      webSocket.send(data);
    }
  };

	exports.connect = (params) => {
    isDebug = params.isDebug;
    webSocket = new WebSocket(params.uri);

    if (params.onopen) {
      onopen = params.onopen;
    } else {
      onopen = () => {};
    }
    if (params.onerror) {
      onerror = params.onerror;
    } else {
      onerror = () => {};
    }
    if (params.onclose) {
      onclose = params.onclose;
    } else {
      onclose = () => {};
    }
    if (params.onmessage) {
      onmessage = params.onmessage;
    } else {
      onmessage = () => {};
    }

    webSocket.onopen = (event) => {
			if (isDebug) console.log("Web Socket Open");
			schedulePing();
      onopen();
		};
		webSocket.onerror = (event) => {
			if (isDebug) console.log("WebSocket Error Observed: ", event);
      onerror();
		};
		webSocket.onclose = (event) => {
      if (isDebug) console.log("Web Socket Closed: " + event.code + " - " + event.reason);
      onclose(event.code);
		};
		webSocket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      if (isDebug && message.type != "position") console.log(event.data);
      onmessage(message);
		};
	};

  return exports;
})();

},{}],19:[function(require,module,exports){
let MessageType = require('../common/message-types');
let Fury = require('../../Fury/src/fury.js');
let Player = require('./player');
let PlayerVisuals = require('./player-visuals');
let WorldVisuals = require('./world-visuals');

// glMatrix
let vec3 = Fury.Maths.vec3, quat = Fury.Maths.quat;

// Game Client
// Handles the visuals, local player movement, and interp of remote clients
let GameClient = module.exports = (function(){
	let exports = {};

	let glCanvas;
	let resolutionFactor = 1, cameraRatio = 16 / 9;
	let camera = Fury.Camera.create({
		near: 0.1,
		far: 10000,
		fov: 1.0472,
		ratio: cameraRatio,
		position: vec3.fromValues(0, 2, 3)
	});
	camera.targetPosition = vec3.clone(camera.position);
	camera.playerOffset = vec3.fromValues(0, 1, 0);
	let scene = Fury.Scene.create({ camera: camera, enableFrustumCulling: true });
	let world = require('../common/world').create();

	let localId = -1;
	let localNick = "";
	let sendMessage; // fn expects simple obj to send, does not expect you to send id - server will append

	let localPlayer;
	let players = []; // Note currently index != id

	let messageQueue = [];
	let assetLoadComplete = false;

	let serverState = {
		players: [] // Contains id, position, nick
	};

	let updateCanvasSize = (event) => {
		glCanvas.width = resolutionFactor * glCanvas.clientWidth;
		glCanvas.height = resolutionFactor * glCanvas.clientHeight;
		cameraRatio = glCanvas.clientWidth / glCanvas.clientHeight;
		if (camera && camera.ratio) camera.ratio = cameraRatio;
	};

	// TODO: Separate nick setting (i.e. greet response)
	exports.init = (nick, sendDelegate) => {
		sendMessage = sendDelegate;
		localNick = nick;

		glCanvas = document.getElementById("fury");
		window.addEventListener('resize', updateCanvasSize);
		updateCanvasSize();

		Fury.init("fury"); // Consider { antialias: false }

		// Start loading required assets
		PlayerVisuals.init();
		WorldVisuals.init(() => {
			assetLoadComplete = true;
			if (messageQueue.length > 0) {
				for(let i = 0, l = messageQueue.length; i < l; i++) {
					exports.onmessage(messageQueue[i]);
				}
				messageQueue.length = 0;
			}
			lastTime = Date.now();
			window.requestAnimationFrame(loop);
		});
	};

	let lastTime = 0;
	let lastNetSendTime = 0, sendInterval = 1/ 20;

	let loop = () => {
		let time = Date.now();
		let elapsed = time - lastTime;
		lastTime += elapsed;
		if (elapsed > 66) elapsed = 66;
		// ^^ Minimm 15 FPS - this is primarily to compenstate for alt-tab / focus loss
		elapsed /= 1000;  // Convert to seconds

		let sendNetUpdate = false;
		if (time - lastNetSendTime >= sendInterval) {
			sendNetUpdate = true;
			lastNetSendTime = time;
		}

		if (localPlayer && !Fury.Input.isPointerLocked() && Fury.Input.mouseDown(0)) {
			Fury.Input.requestPointerLock();
		}

		// Update Players
		for (let i = 0, l = players.length; i < l; i++) {
			if (players[i]) {
				players[i].update(elapsed);
			}
		}

		if (localPlayer) {
			// Check for request pickup and send pickup message or interact message as appropriate
			if (localPlayer.requestPickup) {	// NOTE: This is used for pickup, drop and interact!
				// TODO: Arguably should set something to prevent rerequests until have response
				localPlayer.requestPickup = false;

				let interactableNearby = false;
				for (let i = 0, l = world.interactables.length; i < l; i++) {
					let interactable = world.interactables[i];
					if (interactable.canInteract(localPlayer.position)) {
						interactableNearby = true;
						break;
					}
				}

				if (!localPlayer.heldItem) {
					let pickupNearby = false;
					for (let i = 0, l = world.pickups.length; i < l; i++) {
						let pickup = world.pickups[i];
						if (!pickup.autoPickup && pickup.canPickup(localPlayer.position)) {
							pickupNearby = true;
							break;
						}
					}

					if (pickupNearby) {
						// Try pickup!
						sendMessage(localPlayer.pickupMessage);
					} else if (interactableNearby) {
						// Try interact
						sendMessage(localPlayer.interactMessage);
					}
				} else {
					if (interactableNearby) {
						sendMessage(localPlayer.interactMessage);
					} else {
						// Drop what you're carrying
						sendMessage(localPlayer.dropMessage);
					}
				}

			}
			if (localPlayer.requestDrop) {
				localPlayer.requestDrop = false;
				// TODO: Arguably should set something to prevent rerequests until have reponse
				sendMessage(localPlayer.dropMessage);
			}

			// Update Camera
			vec3.add(camera.targetPosition, camera.playerOffset, localPlayer.position);
			if (localPlayer.snapCamera) {
				vec3.copy(camera.position, camera.targetPosition);
				localPlayer.snapCamera = false;
			} else {
				vec3.lerp(camera.position, camera.targetPosition, localPlayer.position, 0.25);
			}
			quat.copy(camera.rotation, localPlayer.lookRotation);

			if ((sendNetUpdate && localPlayer.stateDirty) || localPlayer.inputDirty) {
				localPlayer.stateDirty = localPlayer.inputDirty = false;
				sendMessage(localPlayer.updateMessage);
			}
		}

		scene.render();

		Fury.Input.handleFrameFinished();

		window.requestAnimationFrame(loop);
	};

	exports.onmessage = (message) => {
		// Wait for initial asset load
		if (!assetLoadComplete) {
			messageQueue.push(message);
			return;
		}

		switch(message.type) {
			case MessageType.ACKNOWLEDGE:
				// NOTE: Will happen post init but not necessarily post asset load
				localId = message.id;
				handleInitialServerState(message.data);

				// TODO: Delay this greet until we're sure we have got nick name.
				sendMessage({ type: MessageType.GREET, nick: localNick });
				break;
			case MessageType.CONNECTED:
				serverState.players[message.id] = message.player;
				spawnPlayer(message.id, message.player);
				break;
			case MessageType.DISCONNECTED:
				serverState.players[message.id] = null;
				dropPickups(message.id);
				despawnPlayer(message.id);
				break;
			case MessageType.POSITION:
				serverState.players[message.id].position = message.position;
				updatePlayer(message.id, message);
				if (message.win && message.id == localPlayer.id) {
					// You Win!
					let win = () => {
						Fury.Input.releasePointerLock();
						window.location = "./complete.html";  // Go to complete page
					};
					window.setTimeout(win, 1000);
				}
				break;
			case MessageType.PICKUP:
				assignPickup(message.pickupId, message.id);
				break;
			case MessageType.DROP:
				dropPickups(message.id, message.position);
				break;
			case MessageType.INTERACT:
				let interactable = world.getInteractable(message.interactableId);
				let heldItem = world.getPickup(message.pickupId);
				let result = interactable.interact(heldItem);
				if (result && result.length) {
					let resultPos = result;
					if (resultPos) {
						if (heldItem) {
							heldItem.enabled = false;
							vec3.copy(heldItem.position, resultPos);
							quat.identity(heldItem.rotation);
						} else {
							console.error("Unable to find held item with id " + message.pickupId);
						}
						let player = getPlayer(message.id);
						if (player) {
							player.heldItem = null;
						} else {
							console.error("Unable to find player with id " + message.id);
						}
					}
				} else if (result) {
					// Pickedup an object - relies on synchronised state but should be fine
					assignPickup(result.id, message.id);
				}
				break;
		}
	};

	exports.ondisconnect = () => {
		if (Fury.Input.isPointerLocked()) {
			Fury.Input.releasePointerLock();
		}
		alert("Disconnected from Server!");
		window.location = window.location;
	};

	let handleInitialServerState = (state) => {
		// NOTE: Will happen post init but not necessarily post asset load
		serverState = state;

		// Load world level and instanitate scene visuals
		world.createLevel(serverState.level);

		// TODO: Wait for asset load - test with players already connected OR update visual creation to wait for asset load
		// Add world objects to render scene
		WorldVisuals.generateVisuals(world, scene, () => {
			// World visuals instanitated - could defer player spawn until this point
		});

		// Spawn replicas for all existing players
		for (let i = 0, l = state.players.length; i < l; i++) {
			if (state.players[i]) {
				if (state.players[i].id != localId) {
					spawnPlayer(state.players[i].id, state.players[i]);
				} else {
					console.error("Received player data in initial state with local id");
				}
			}
		}

		// Handle Pickups
		for (let i = 0, l = state.pickups.length; i < l; i++) {
			if (state.pickups[i].owner != null) {
				assignPickup(state.pickups[i].id, state.pickups[i].owner);
			} else {
				let pickup = world.getPickup(state.pickups[i].id);
				if (pickup) {
					vec3.copy(pickup.position, state.pickups[i].position);
				}
			}
		}

		for (let i = 0, l = state.interactables.length; i < l; i++) {
			let interactableState = state.interactables[i];
			if (interactableState) {
				let id = interactableState.id;
				let interactable = world.getInteractable(id);
				if (interactable) {
					// Copy power values
					for (let j = 0, n = interactableState.power.length; j < n; j++) {
						interactable.power[j] = interactableState.power[j];
					}
					if (interactable.onmessage) {
						interactable.onmessage("init");	// TODO: Should not use event messaging for initialisation, that should be reserved for game events
					}
				}
			}
		}
	};

	// We should probably move these get methods to world
	let assignPickup = (pickupId, playerId) => {
		let pickup = world.getPickup(pickupId);
		if (pickup) {
			pickup.enabled = false;
			let player = getPlayer(playerId);
			if (player) {
				player.heldItem = pickup;
			} else {
				pickup.visual.active = false;
			}
		}
	};

	let dropPickups = (playerId, position) => {
		let player = getPlayer(playerId);
		if (player && player.heldItem) {
			player.heldItem.enabled = true;
			if (position) {
				vec3.copy(player.heldItem.position, position);
			} else {
				vec3.copy(player.heldItem.position, player.position);
			}
			player.heldItem = null;
		}
	};

	let spawnPlayer = (id, player) => {
		if (id == localId) {
			localNick = player.nick;
			localPlayer = Player.create({
				id: id,
				position: vec3.clone(player.position),
				rotation: quat.clone(player.rotation),
				world: world });
			players.push(localPlayer);
		} else {
			let replica = Player.create({
				id: id,
				isReplica: true,
				position: vec3.clone(player.position),
				rotation: quat.clone(player.rotation),
				world: world });
			replica.visuals = PlayerVisuals.create(replica, scene);
			players.push(replica);
		}
	};

	let getPlayer = (id) => {
		for (let i = 0, l = players.length; i < l; i++) {
			if (players[i] && players[i].id == id) {
				return players[i];
			}
		}
		return null;
	};

	let updatePlayer = (id, message) => {
		if (id == localId) {
			// Received correction from server
			localPlayer.setLocalState(message);
		} else {
			// Update Replica
			for (let i = 0, l = players.length; i < l; i++) {
				if (players[i] && players[i].id == id) {
					players[i].setReplicaState(message);
					break;
				}
			}
		}
	};

	let despawnPlayer = (id) => {
		for(let i = 0, l = players.length; i < l; i++) {
			if (players[i] && players[i].id == id) {
				if (players[i].visuals) {
					scene.remove(players[i].visuals);
				}
				players[i] = null;
				// Would be nice to shorten the list but eh
				break;
			}
		}
	};

	return exports;
})();

},{"../../Fury/src/fury.js":4,"../common/message-types":29,"../common/world":36,"./player":21,"./player-visuals":20,"./world-visuals":26}],20:[function(require,module,exports){
let Fury = require('../../Fury/src/fury.js');
let Primitives = require('./primitives');
let Shaders = require('./shaders');
let Player = require('./player');
let vec3 = Fury.Maths.vec3;

let PlayerVisuals = module.exports = (function() {
  let exports = {};
  let prototype = {};

  let playerMesh, playerMaterial;

  exports.init = () => {
    playerMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.ColorFog) });
    playerMaterial.color = vec3.fromValues(1.0, 0.0, 0.3);
    playerMaterial.fogColor = vec3.create();
    playerMaterial.fogDensity = 0.1; // TODO: coordinate with worldvisuals
    // Should we save creating the mesh until we know the player proportions?
    playerMesh = Fury.Mesh.create(Primitives.createCuboidMesh(0.75 * Player.size[0], Player.size[1], 0.75 * Player.size[2]));
  };

  exports.create = (player, scene) => {
    let visuals = scene.add({
      mesh: playerMesh,
      material: playerMaterial,
      position: player.position,
      rotation: player.rotation
    });
    return visuals;
  };

  return exports;
})();

},{"../../Fury/src/fury.js":4,"./player":21,"./primitives":22,"./shaders":23}],21:[function(require,module,exports){
// Client side player
// Handles both local player and replicas
// Handles input and movement

// We're going to mostly trust the clients on their position (haha)
// rather than run physics on server

// Currently just contains movement / physics code no visuals
// However deals with input, so would probably need to be split into
// player controller + player in order to move to common

let Fury = require('../../Fury/src/fury.js');
let MessageType = require('../common/message-types');

let Maths = Fury.Maths;
let vec2 = Maths.vec2, vec3 = Maths.vec3, quat = Maths.quat;

let Player = module.exports = (function() {
  let exports = {};
  let prototype = {};

  let size = exports.size = vec3.fromValues(1, 2, 1);

  // static methods
  let getPitch = function(q) {
		// Used to avoid gimbal lock
    let sinr_cosp = 2 * (q[3] * q[0] + q[1] * q[2]);
    let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
    return Math.atan(sinr_cosp / cosr_cosp);
    // If you want to know sector you need atan2(sinr_cosp, cosr_cosp)
    // but we don't in this case.
  };

  // Movement Settings
  let clampAngle = 10 * Math.PI / 180;
  let movementSpeed = 4, lookSpeed = 1;
  let mouseLookSpeed = 0.1, jumpDeltaV = 5;
  // Q: Do we need to scale mouseLookSpeed by canvas size?

  exports.create = (params) => {  // expected params: id, position, rotation, world, optional: isReplica
    var player = Object.create(prototype);

    let movementDelta = vec3.create();
    let targetRotation = quat.clone(params.rotation);

    let detectInput = function() {
      // Clear existing input
      player.lookInput[0] = 0;
      player.lookInput[1] = 0;
      player.input[0] = 0;
      player.input[1] = 0;

      // Look Input
      if (Fury.Input.isPointerLocked()) {
        player.lookInput[0] = - mouseLookSpeed * Fury.Input.MouseDelta[0];
        player.lookInput[1] = - mouseLookSpeed * Fury.Input.MouseDelta[1];
      }

      if (Fury.Input.keyDown("Left")) {
    		player.lookInput[0] += lookSpeed;
    	}
    	if (Fury.Input.keyDown("Right")) {
    		player.lookInput[0] -= lookSpeed;
    	}
    	if (Fury.Input.keyDown("Up")) {
    		player.lookInput[1] += lookSpeed;
    	}
    	if (Fury.Input.keyDown("Down")) {
    		player.lookInput[1] -= lookSpeed;
    	}

      // Movement Input
      if (Fury.Input.keyDown("w")) {
    		player.input[1] -= 1;
    	}
    	if (Fury.Input.keyDown("s")) {
    		player.input[1] += 1;
    	}
    	if (Fury.Input.keyDown("a")) {
    		player.input[0] -= 1;
    	}
    	if (Fury.Input.keyDown("d")) {
    		player.input[0] += 1;
    	}

      // Pickup / Use Input
      if (Fury.Input.keyDown("e", true)) {	// TODO: or mouse down this frame
        player.requestPickup = true;
      }
      if (Fury.Input.keyDown("g", true)) {
        player.requestDrop = true;
      }

      player.jumpInput = Fury.Input.keyDown("Space", true);

      if (player.updateMessage.input[0] != player.input[0]
        || player.updateMessage.input[1] != player.input[1]
        || player.updateMessage.jump != player.jumpInput) {
          player.inputDirty = true;
      }
    };

    // Reusable update message, also used as last input data
    // Note JS arrays for position, rotation for easy of JSON.stringify
    player.updateMessage = {
      type: MessageType.POSITION,
      position: [0,0,0],
      rotation: [0,0,0,1],
      input: [0,0],
      jump: false,
      yVelocity: 0
    };

    player.id = params.id;
    player.snapCamera = true;
    player.isReplica = !!params.isReplica;
    player.world = params.world;
    player.position = params.position;
    player.rotation = params.rotation;
    player.lookRotation = quat.clone(params.rotation);
    player.localX = vec3.create();
    player.localZ = vec3.create();
    player.jumping = false;
    player.yVelocity = 0;
    player.size = vec3.clone(size);

    player.controller = require('./character-controller').create({
      player: player,
      stepHeight: 0.3,
    });

    // Input tracking / public setters (for replicas)
    player.input = [0,0];
    player.lookInput = [0, 0];  // Not networked, simply slerp rotation to target
    player.jumpInput = false;
    player.inputDirty = false;  // set to true if position changes (not rotation)
    player.stateDirty = false;  // set to true if position, rotation changes

    // Pickup and drop
    if (!player.isReplica) {
      player.pickupMessage = {
        type: MessageType.PICKUP,
        position: [0,0,0]
      };
      player.interactMessage = {
        type: MessageType.INTERACT
      };
      player.dropMessage = {
        type: MessageType.DROP,
        position: [0,0,0]
      };
      player.requestPickup = false;
      player.requestDrop = false;
    }

    // The fact movement is dependent on rotation and we're not networking it
    // as often means we're going to get plenty of misprediction with extrapolation
    // we might want to switch to smoothed interp of previous positions instead

    player.setLocalState = (updateMessage) => {
      vec3.copy(player.position, updateMessage.position);
      quat.copy(player.rotation, updateMessage.rotation);
      if (updateMessage.snapLook) {
        quat.copy(player.lookRotation, updateMessage.rotation);
      }
      player.yVelocity = updateMessage.yVelocity;
      player.snapCamera = true;
    };

    player.setReplicaState = (updateMessage) => {
      // Copy across current position and inputs (for extrapolation)
      quat.copy(targetRotation, updateMessage.rotation);
      vec3.copy(player.position, updateMessage.position);
      vec2.copy(player.input, updateMessage.input);
      player.jumpInput = updateMessage.jumpInput;
      player.yVelocity = updateMessage.yVelocity;
    };

    player.update = function(elapsed) {
      // Note: Camera looks in -z, and thus almost all this code also
      // Uses forward = -z, we should change it to be sane and invert for the camera
      if (!player.isReplica) {
        detectInput(); // Note handles setting player.inputDirty
      } // else was set by server

      if (player.requestPickup) {
        vec3.copy(player.pickupMessage.position, player.position);  // Q: is it worth us rounding to 2dp to reduce weight?
      }

      // Rotation
      if (player.isReplica) {
        quat.slerp(player.rotation, targetRotation, player.rotation, 0.25);
      } else {
        // This is *full* of hacks need to give this a proper review post jam
        // and / or when it gives us problems again
        let halfPI = Math.PI/2;

        Maths.quatRotate(player.lookRotation, player.lookRotation, elapsed * player.lookInput[0], Maths.vec3Y);
        // ^^ The returned roll / pitch / yaw from these flick around a lot, don't know if this is that functions 'fault'
        // and using another method might work better, e.g. storing pitch / yaw as inputs and then creating quat from it
        // That would then remove all these hacks around calculating a useful pitch / yaw value
        let pitch = getPitch(player.lookRotation);  // atan rather than atan2 as we don't want more than -90:90 range
        let pitchRotation = elapsed * player.lookInput[1];
        if (Math.sign(pitch) == -Math.sign(pitchRotation) || Math.abs(pitch - pitchRotation) < halfPI - clampAngle) {
          quat.rotateX(player.lookRotation, player.lookRotation, pitchRotation);
        }
        quat.copy(targetRotation, player.lookRotation);

        vec3.transformQuat(player.localZ, Maths.vec3Z, player.lookRotation);
        let yaw = Maths.calculateYaw(player.lookRotation);
        if (isNaN(yaw)) { // Shouldn't be happening but again fuck it
          yaw = Math.sign(player.localZ[0]) * halfPI;
        }
        // HACK: Fuck it's a jam I'm bored of rotations just make it work
        if (player.localZ[2] < 0) {
          if (yaw < 0) {
            yaw = -halfPI - (halfPI + yaw);
          } else {
            yaw = halfPI + (halfPI - yaw);
          }
        }
        quat.setAxisAngle(player.rotation, Maths.vec3Y, yaw);

        /*
        let radToDeg = 180 / Math.PI;
        console.log("forward: " + player.localZ[0].toFixed(2) + ", " + player.localZ[1].toFixed(2) + ", " + player.localZ[2].toFixed(2)
          + " roll: " + (radToDeg * Maths.calculateRoll(player.lookRotation)).toFixed(2)
          + " pitch: " + (radToDeg * pitch).toFixed(2)
          + " yaw: " + (radToDeg * yaw).toFixed(2));
        */
      }

      // Calculate Local Axes from updated rotation
      vec3.transformQuat(player.localX, Maths.vec3X, player.rotation);
    	vec3.transformQuat(player.localZ, Maths.vec3Z, player.rotation);

      // Calculate Target Position - from local x / local z
      let norm = (player.input[0] !== 0 && player.input[1] !== 0) ? (1 / Math.SQRT2) : 1;
      let ldx = norm * movementSpeed * elapsed * player.input[0];
      let ldz = norm * movementSpeed * elapsed * player.input[1];
      vec3.zero(movementDelta);
      vec3.scaleAndAdd(movementDelta, movementDelta, player.localZ, ldz);
      vec3.scaleAndAdd(movementDelta, movementDelta, player.localX, ldx);

      // Movement
      player.controller.xzMove(movementDelta);

      // Gravity
      if (!player.jumping && player.jumpInput) {
        player.jumping = true;
        player.yVelocity = jumpDeltaV;
      } else {  // Note - no !isGrounded check, relies on elapsed staying sane
        player.yVelocity -= 9.8 * elapsed;
      }
      player.controller.yMove(player.yVelocity * elapsed);

      if (player.heldItem) {
        // TODO: Define offset point?
        vec3.scaleAndAdd(player.heldItem.position, player.position, player.localZ, -0.5);
        if (player.dropMessage) {
          // TODO: Have server calculate drop position (as player position - 50% local Z)
          vec3.copy(player.dropMessage.position, player.heldItem.position);
        }
        vec3.scaleAndAdd(player.heldItem.position, player.heldItem.position, Maths.vec3Y, 0.35);
        quat.copy(player.heldItem.rotation, player.rotation);

        //vec3.scaleAndAdd(player.heldItem.position, player.heldItem.position, Maths.vec3Y, 1);
      }

      if (!player.isReplica) {
        // Update Update Message and set dirty flag
        if (!vec3.equals(player.updateMessage.position, player.position) || !quat.equals(player.updateMessage.rotation, player.rotation)) {
          player.stateDirty = true;
          // Something outside will handle setting false
        }

        vec3.copy(player.updateMessage.position, player.position);
        quat.copy(player.updateMessage.rotation, player.rotation);
        vec2.copy(player.updateMessage.input, player.input);
        player.updateMessage.jump = player.jumpInput;
        player.updateMessage.yVelocity = player.yVelocity;
      }
    };

    return player;
  };

  return exports;
})();

},{"../../Fury/src/fury.js":4,"../common/message-types":29,"./character-controller":17}],22:[function(require,module,exports){
// Helper for creating mesh primitives
let Fury = require('../../Fury/src/fury.js'); // Needed for TriangleStrip renderMode

var Primitives = module.exports = (function() {
  var exports = {};

  var createCuboidMesh = exports.createCuboidMesh = (width, height, depth) => {
    let sx = width / 2, sy = height / 2, sz = depth / 2;
    return {
      vertices: [
    		// Front face
    		-sx, -sy,  sz,
    		 sx, -sy,  sz,
    		 sx,  sy,  sz,
    		-sx,  sy,  sz,

    		// Back face
    		-sx, -sy, -sz,
    		-sx,  sy, -sz,
    		 sx,  sy, -sz,
    		 sx, -sy, -sz,

    		// Top face
    		-sx,  sy, -sz,
    		-sx,  sy,  sz,
    		 sx,  sy,  sz,
    		 sx,  sy, -sz,

    		// Bottom face
    		-sx, -sy, -sz,
    		 sx, -sy, -sz,
    		 sx, -sy,  sz,
    		-sx, -sy,  sz,

    		// Right face
    		 sx, -sy, -sz,
    		 sx,  sy, -sz,
    		 sx,  sy,  sz,
    		 sx, -sy,  sz,

    		// Left face
    		-sx, -sy, -sz,
    		-sx, -sy,  sz,
    		-sx,  sy,  sz,
    		-sx,  sy, -sz],
    	textureCoordinates: [
    		// Front face
    		0.0, 0.0,
    		width, 0.0,
    		width, height,
    		0.0, height,

    		// Back face
    		width, 0.0,
    		width, height,
    		0.0, height,
    		0.0, 0.0,

    		// Top face
    		0.0, depth,
    		0.0, 0.0,
    		width, 0.0,
    		width, depth,

    		// Bottom face
    		width, depth,
    		0.0, depth,
    		0.0, 0.0,
    		width, 0.0,

    		// Right face
    		depth, 0.0,
    		depth, height,
    		0.0, height,
    		0.0, 0.0,

    		// Left face
    		0.0, 0.0,
    		depth, 0.0,
    		depth, height,
    		0.0, height ],
    	indices: [
    		0, 1, 2,      0, 2, 3,    // Front face
    		4, 5, 6,      4, 6, 7,    // Back face
    		8, 9, 10,     8, 10, 11,  // Top face
    		12, 13, 14,   12, 14, 15, // Bottom face
    		16, 17, 18,   16, 18, 19, // Right face
    		20, 21, 22,   20, 22, 23  // Left face
    	] };
  };

  exports.createQuad = (size) => {
    return {
		  vertices: [ size * 0.5, size * 0.5, 0.0, size * -0.5,  size * 0.5, 0.0, size * 0.5, size * -0.5, 0.0, size * -0.5, size * -0.5, 0.0 ],
		  textureCoordinates: [ 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0 ],
		  renderMode: Fury.Renderer.RenderMode.TriangleStrip
	 };
  };

  exports.createCubeMesh = (size) => {
    return createCuboidMesh(size, size, size);
  };

  return exports;
})();

},{"../../Fury/src/fury.js":4}],23:[function(require,module,exports){
let Fury = require('../../Fury/src/fury.js');

var Shaders = module.exports = (function() {
	var exports = {};

	exports.UnlitTextured = {
	 vsSource: [
		"attribute vec3 aVertexPosition;",
		"attribute vec2 aTextureCoord;",

		"uniform mat4 uMVMatrix;",
		"uniform mat4 uPMatrix;",

		"varying vec2 vTextureCoord;",
		"void main(void) {",
				"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
				"vTextureCoord = aTextureCoord;",
		"}"].join('\n'),
	 fsSource: [
		 "precision mediump float;",

		 "varying vec2 vTextureCoord;",

		 "uniform sampler2D uSampler;",

		 "void main(void) {",
				"gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
		 "}"].join('\n'),
	 attributeNames: [ "aVertexPosition", "aTextureCoord" ],
	 uniformNames: [ "uMVMatrix", "uPMatrix", "uSampler" ],
	 textureUniformNames: [ "uSampler" ],
	 pMatrixUniformName: "uPMatrix",
	 mvMatrixUniformName: "uMVMatrix",
	 bindMaterial: function(material) {
		 this.enableAttribute("aVertexPosition");
		 this.enableAttribute("aTextureCoord");
	 },
	 bindBuffers: function(mesh) {
		 this.setAttribute("aVertexPosition", mesh.vertexBuffer);
		 this.setAttribute("aTextureCoord", mesh.textureBuffer);
		 this.setIndexedAttribute(mesh.indexBuffer);
	 }
 };

	exports.UnlitColor = {
	 vsSource: [
		"attribute vec3 aVertexPosition;",

		"uniform mat4 uMVMatrix;",
		"uniform mat4 uPMatrix;",

		"void main(void) {",
			 "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
		"}"
		].join('\n'),
		fsSource: [
			"precision mediump float;",

			"uniform vec3 uColor;",

			"void main(void) {",
				 "gl_FragColor = vec4(uColor, 1.0);",
			"}"].join('\n'),
		 attributeNames: [ "aVertexPosition", ],
		 uniformNames: [ "uMVMatrix", "uPMatrix", "uColor" ],
		 pMatrixUniformName: "uPMatrix",
		 mvMatrixUniformName: "uMVMatrix",
		 bindMaterial: function(material) {
			this.enableAttribute("aVertexPosition");
			this.setUniformFloat3("uColor", material.color[0], material.color[1], material.color[2]);
			// TOOD: ^^ A method to call when creating materials from the shader definition
			// to ensure they have any additional properties might be nice
		 },
		 bindBuffers: function(mesh) {
			 this.setAttribute("aVertexPosition", mesh.vertexBuffer);
			 this.setIndexedAttribute(mesh.indexBuffer);
		 }
	 };

	exports.ColorFog = {  // UnlitColor but with fog!
			vsSource: [
				"#version 300 es",
				"in vec3 aVertexPosition;",

				"uniform mat4 uMVMatrix;",
				"uniform mat4 uPMatrix;",

				"out vec3 vViewSpacePosition;",

				"void main(void) {",
					"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",

					"vViewSpacePosition = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;",
				"}"].join('\n'),
			fsSource: [
				"#version 300 es",
				"precision highp float;",

				"in vec3 vViewSpacePosition;",

				"uniform vec3 uFogColor;",
				"uniform float uFogDensity;",
				"uniform vec3 uColor;",

				"out vec4 fragColor;",

				"void main(void) {",

						"vec4 color = vec4(uColor, 1);",

						"#define LOG2 1.442695",

						"float fogDistance = length(vViewSpacePosition);",
						"float fogAmount = 1.0 - exp2(- uFogDensity * uFogDensity * fogDistance * fogDistance * LOG2);",
						"fogAmount = clamp(fogAmount, 0.0, 1.0);",

						"fragColor = mix(color, vec4(uFogColor, 1.0), fogAmount);",
				"}"].join('\n'),
			attributeNames: [ "aVertexPosition" ],
			uniformNames: [ "uMVMatrix", "uPMatrix", "uColor", "uFogColor", "uFogDensity" ],
			textureUniformNames: [ ],
			pMatrixUniformName: "uPMatrix",
			mvMatrixUniformName: "uMVMatrix",
			bindMaterial: function(material) {
				// HACK: Should have a cleaner way to do this
				// Arguably some of these are scene based variables not material,
				// should we pass scene details in?
				// Or just add sceneLighting property to material
				this.setUniformVector3("uFogColor", material.fogColor);
				this.setUniformFloat("uFogDensity", material.fogDensity);
				this.setUniformVector3("uColor", material.color);

				this.enableAttribute("aVertexPosition");
			},
			bindBuffers: function(mesh) {
				this.setAttribute("aVertexPosition", mesh.vertexBuffer);
				this.setIndexedAttribute(mesh.indexBuffer);
			}
		};

	exports.LitVertexColor = {
		// This shader has two color buffers, first is the color to use, second is how much lighting and fog should effect
		// 0 => lighting as per Voxel shader, 1 => ignores lighting and uses reduced fog
		// Required Material Properties as per Voxel Shader but with the addition of reducedFogDensity value
		vsSource: [
			"#version 300 es",
			"in vec3 aVertexPosition;",
			"in vec3 aVertexNormal;",
			"in vec4 aColor0;",
			"in vec4 aColor1;",

			"uniform vec3 uLightingDirection;",
			"uniform mat4 uMVMatrix;",
			"uniform mat4 uPMatrix;",

			"out vec3 vNormal;",
			"out vec3 vViewSpacePosition;",
			"out float vLightWeight;",

			"out vec4 vColor0;",
			"out vec4 vColor1;",

			"void main(void) {",
				"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
				"vNormal = aVertexNormal;",
				"vColor0 = aColor0;",
				"vColor1 = aColor1;",

				"vLightWeight = 0.5 * max(dot(aVertexNormal, normalize(uLightingDirection)), 0.0);",

				"vViewSpacePosition = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;",
			"}"].join('\n'),
		fsSource: [
			"#version 300 es",
			"precision highp float;",

			"in vec3 vNormal;",
			"in vec3 vViewSpacePosition;",
			"in float vLightWeight;",

			"in vec4 vColor0;",
			"in vec4 vColor1;",

			"uniform vec3 uLightColor;",
			"uniform vec3 uAmbientColor;",

			"uniform vec3 uFogColor;",
			"uniform float uFogDensity;",
			"uniform float uReducedFogDensity;",

			"out vec4 fragColor;",

			"void main(void) {",
					"vec4 vertexColor = vColor0;",
					"vec4 litColor = vec4(((0.5 * uAmbientColor) + (vLightWeight * uLightColor)) * vertexColor.rgb, vertexColor.a);",
					"vec4 color = mix(litColor, vertexColor, vColor1.r);",

					"#define LOG2 1.442695",

					"float fogDistance = length(vViewSpacePosition);",
					"float fogDensity = mix(uFogDensity, uReducedFogDensity, vColor1.r);",
					"float fogAmount = 1.0 - exp2(- fogDensity * fogDensity * fogDistance * fogDistance * LOG2);",
					"fogAmount = clamp(fogAmount, 0.0, 1.0);",

					"fragColor = mix(color, vec4(uFogColor, 1.0), fogAmount);",
			"}"].join('\n'),
		attributeNames: [ "aVertexPosition", "aVertexNormal", "aColor0", "aColor1" ],
		uniformNames: ["uLightingDirection", "uMVMatrix", "uPMatrix", "uLightColor", "uAmbientColor", "uFogColor", "uFogDensity", "uReducedFogDensity" ],
		textureUniformNames: [ ],
		pMatrixUniformName: "uPMatrix",
		mvMatrixUniformName: "uMVMatrix",
		bindMaterial: function(material) {
			// HACK: Should have a cleaner way to do this
			// Arguably some of these are scene based variables not material,
			// should we pass scene details in?
			// Or just add sceneLighting property to material
			this.setUniformVector3("uLightingDirection", material.lightDir);
			this.setUniformVector3("uLightColor", material.lightColor);
			this.setUniformVector3("uAmbientColor", material.ambientColor);
			this.setUniformVector3("uFogColor", material.fogColor);
			this.setUniformFloat("uFogDensity", material.fogDensity);
			this.setUniformFloat("uReducedFogDensity", material.reducedFogDensity);

			this.enableAttribute("aLightingDirection");
			this.enableAttribute("aVertexPosition");
			this.enableAttribute("aVertexNormal");
			this.enableAttribute("aColor0");
			this.enableAttribute("aColor1");
		},
		bindBuffers: function(mesh) {
			this.setAttribute("aVertexPosition", mesh.vertexBuffer);
			this.setAttribute("aVertexNormal", mesh.normalBuffer);
			this.setAttribute("aColor0", mesh.customBuffers["COLOR_0"]);
			this.setAttribute("aColor1", mesh.customBuffers["COLOR_1"]);
			this.setIndexedAttribute(mesh.indexBuffer);
		}
	};

	exports.Voxel = {
			vsSource: [
				"#version 300 es",
				"in vec3 aVertexPosition;",
				"in vec2 aTextureCoord;",
				"in vec3 aVertexNormal;",
				"in float aTileIndex;",

				"uniform vec3 uLightingDirection;",
				"uniform mat4 uMVMatrix;",
				"uniform mat4 uPMatrix;",

				// "out vec4 vWorldPosition;",
				"out vec2 vTextureCoord;",
				"out vec3 vNormal;",
				"out vec3 vViewSpacePosition;",
				"out float vLightWeight;",
				"out float vTileIndex;",

				"void main(void) {",
					"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
					"vTextureCoord = aTextureCoord;",
					"vNormal = aVertexNormal;",
					"vTileIndex = aTileIndex;",

					// Greedy Meshing - UV generation - artifacts at seams
					// Normally would mulitply this by the world / model matrix but as models
					// are all axis aligned and we're going to be using frac value anyway, it's unnecessary
					// "vWorldPosition = vec4(aVertexPosition + vec3(0.5, 0.5, 0.5), 1.0);",

					// Lighting Direction: vec3(-1.0,2.0,1.0)

					"vLightWeight = 0.5 * max(dot(aVertexNormal, normalize(uLightingDirection)), 0.0);",

					"vViewSpacePosition = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;",
				"}"].join('\n'),
			fsSource: [
				"#version 300 es",
				"precision highp float;",
				"precision highp sampler2DArray;",

				"in vec2 vTextureCoord;",
				//"in vec4 vWorldPosition;",
				"in vec3 vNormal;",
				"in vec3 vViewSpacePosition;",
				"in float vLightWeight;",
				"in float vTileIndex;",

				"uniform sampler2DArray uSampler;",
				"uniform vec3 uLightColor;",
				"uniform vec3 uAmbientColor;",

				"uniform vec3 uFogColor;",
				"uniform float uFogDensity;",

				"out vec4 fragColor;",

				"void main(void) {",
						//"vec3 pos = fract(vWorldPosition.xyz);",

						//"vec2 uv = abs(vNormal.x) * pos.zy + abs(vNormal.y) * pos.xz + abs(vNormal.z) * pos.xy;",
						//"float tileIndex = 8.0 - floor(vTextureCoord.s);",

						"vec4 color = texture(uSampler, vec3(vTextureCoord, vTileIndex));",
						"vec4 litColor = vec4(((0.5 * uAmbientColor) + (vLightWeight * uLightColor)) * color.rgb, color.a);",

						"#define LOG2 1.442695",

						"float fogDistance = length(vViewSpacePosition);",
						"float fogAmount = 1.0 - exp2(- uFogDensity * uFogDensity * fogDistance * fogDistance * LOG2);",
						"fogAmount = clamp(fogAmount, 0.0, 1.0);",

						"fragColor = mix(litColor, vec4(uFogColor, 1.0), fogAmount);",
				"}"].join('\n'),
			attributeNames: [ "aVertexPosition", "aVertexNormal", "aTextureCoord", "aTileIndex" ],
			uniformNames: ["uLightingDirection", "uMVMatrix", "uPMatrix", "uSampler", "uLightColor", "uAmbientColor", "uFogColor", "uFogDensity" ],
			textureUniformNames: [ "uSampler" ],
			pMatrixUniformName: "uPMatrix",
			mvMatrixUniformName: "uMVMatrix",
			bindMaterial: function(material) {
				// HACK: Should have a cleaner way to do this
				// Arguably some of these are scene based variables not material,
				// should we pass scene details in?
				// Or just add sceneLighting property to material
				this.setUniformVector3("uLightingDirection", material.lightDir);
				this.setUniformVector3("uLightColor", material.lightColor);
				this.setUniformVector3("uAmbientColor", material.ambientColor);
				this.setUniformVector3("uFogColor", material.fogColor);
				this.setUniformFloat("uFogDensity", material.fogDensity);

				this.enableAttribute("aLightingDirection");
				this.enableAttribute("aVertexPosition");
				this.enableAttribute("aTextureCoord");
				this.enableAttribute("aVertexNormal");
				this.enableAttribute("aTileIndex");
			},
			bindBuffers: function(mesh) {
				this.setAttribute("aVertexPosition", mesh.vertexBuffer);
				this.setAttribute("aTextureCoord", mesh.textureBuffer);
				this.setAttribute("aVertexNormal", mesh.normalBuffer);
				this.setAttribute("aTileIndex", mesh.tileBuffer);
				this.setIndexedAttribute(mesh.indexBuffer);
			}
		};

	return exports;
})();

},{"../../Fury/src/fury.js":4}],24:[function(require,module,exports){
let Maths = require('../../../Fury/src/maths');
let vec3 = Maths.vec3;

let TeleporterControlVisuals = module.exports = (function() {
  let exports = {};
  let prototype =  {};

  exports.create = (params) => {
		let WorldVisuals = params.worldVisuals; // I dont' know what's up with require but it wasn't working so passing it manually :shrug:
			// expected: interactable (of type teleporter control), scene
			let visuals = Object.create(prototype);

		let interactable = params.interactable;
		visuals.interactable = interactable;

		// Create indicators of required power type
		if (interactable.powerRequirements && interactable.powerRequirements.length) {
			// TODO: Support multiple requirements
			let colorIndex = 0;
			for (; colorIndex < interactable.powerRequirements.length; colorIndex++) {
				if (interactable.powerRequirements[colorIndex] > 0) {
					break;
				}
			}

			let material = null;
			switch(colorIndex) {
				case 0:
					material = WorldVisuals.redMaterial;
					break;
				case 1:
					material = WorldVisuals.blueMaterial;
					break;
				case 2:
					material = WorldVisuals.yellowMaterial;
					break;
				case 3:
					material = WorldVisuals.greenMaterial;
					break;
			}

			visuals.indicators = [];
			let position = vec3.clone(interactable.bounds.min);
			vec3.add(position, position, Maths.vec3Y);
			vec3.scaleAndAdd(position, position, Maths.vec3Z, -0.9);
			vec3.scaleAndAdd(position, position, Maths.vec3X, 0.1);

			visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

			let position2 = vec3.clone(position);
			vec3.scaleAndAdd(position2, position2, Maths.vec3X, 0.8);
			visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position2 }));
		}

    visuals.onmessage = (message) => {
        switch(message) {
          case "init":  // Valid for all interactable visuals
            // State was non-standard on connect, update for teleporter state
            console.log("Init called on control visuals");
            // TODO: notify interactable.teleporter as to powered state
            break;
          case "powered":
            // Was not powered has become powered
            console.log("Control is now powered");
            break;
          case "took_core":
            // Took core but still needs more
            console.log("Thank you for your donation");
            break;
          case "invalid_core":
            // Tried to give the control a core it didn't need
            console.log("I don't want that one");
            break;
          case "unpowered":
            // Tried to interact with control with no core
            console.log("I need more power cores");
            break;
          case "already_powered":
            // Tried to interacted with control when already powered
            console.log("I'm all good thanks!");
            break;
        }
    }

    return visuals;
  };

  return exports;
})();

},{"../../../Fury/src/maths":8}],25:[function(require,module,exports){
let Maths = require('../../../Fury/src/maths');
let vec3 = Maths.vec3;

let TeleporterVisuals = module.exports = (function() {
	let exports = {};
	let prototype = {};

	let size = exports.size = 3;

	exports.create = (params) => {
		let WorldVisuals = params.worldVisuals;	// Something funny happening with require can't be bothered to investigate
		let visuals = Object.create(prototype);

		visuals.teleporter = params.teleporter;

		visuals.indicators = [];

		let center = vec3.clone(params.teleporter.bounds.center);
		center[1] = params.teleporter.bounds.min[1];

		let offset = (size / 2) - 0.05;
		let position = null;
		let material = params.teleporter.controls.length ? WorldVisuals.blackMaterial : WorldVisuals.whiteMaterial;
		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, -offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, -offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, -offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, +offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, +offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, -offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		position = vec3.create();
		vec3.scaleAndAdd(position, center, Maths.vec3X, +offset);
		vec3.scaleAndAdd(position, position, Maths.vec3Z, +offset);
		visuals.indicators.push(params.scene.add({ mesh: WorldVisuals.indicatorMesh, material: material, position: position }));

		visuals.onmessage = (message) => {
			switch (message) {
				case "powered":
					// Trigger powered visuals
					for (let i = 0, l = visuals.indicators.length; i < l; i++) {
						visuals.indicators[i].material = WorldVisuals.whiteMaterial;
					}
					break;
				case "unpowered":
					// Trigger unpowered visuals
					for (let i = 0, l = visuals.indicators.length; i < l; i++) {
						visuals.indicators[i].material = WorldVisuals.blackMaterial;
					}
					break;
			}
		};

		return visuals;
	};

	return exports;
})();

},{"../../../Fury/src/maths":8}],26:[function(require,module,exports){
let Fury = require('../../Fury/src/fury.js');
let Shaders = require('./shaders');
let Primitives = require('./primitives');
let Pickup = require('../common/pickup');
let Interactable = require('../common/interactable');

// TODO: Maybe move these under a single visuals module
let TeleporterVisuals = require('./visuals/teleporter-visuals');
let TeleporterControlVisuals = require('./visuals/teleporter-control-visuals');

let vec3 = Fury.Maths.vec3;

// Implicitly contains pickup / core visuals
// arguably should split those out into separate modules

let WorldVisuals = module.exports = (function() {
	let exports = {};

	let atlasMaterial, debugMaterial;
	let useCoreModels = false;
	// Making assets is taking a looong time, which we dont' have back to colored
	// cubes but this toggle is here in the unlikely event we get time to come back
	let redMaterial, blueMaterial, yellowMaterial, greenMaterial;
	let redCoreMesh, blueCoreMesh, yellowCoreMesh, greenCoreMesh;

	let chunkObjects = [];

	exports.init = (callback) => {
		// Shader.create requires Fury to be initialised (i.e. it needs a gl context)
		// So this init needs to be called after Fury.init

		// TODO: have an asset loader with a combined callback once done
		// Use Hestia as inspiration, it had a much better system
		let itemsToLoad = 0;
		let loadCallback = () => {
			itemsToLoad -= 1;
			if (itemsToLoad == 0) {
				callback();
			}
		};

		let fogColor = vec3.fromValues(0,0,0.01);
		let glowShaderFogDensity = 0.1;  // Also set in player-visuals.js

		let applyLightingInfo = function(material) {
			material.lightDir = vec3.fromValues(-1.0, 2.0, 1.0); // Was -1, 2, 1
			material.lightColor = vec3.fromValues(1.0, 1.0, 1.0);
			material.ambientColor = vec3.fromValues(0.5, 0.5, 0.5);
			material.fogColor = fogColor;
			material.fogDensity = 0.125;
		}

		let createGlowShader = function(shader, color) {
			let material = Fury.Material.create({ shader: shader });
			material.color = color;
			material.fogColor = fogColor;
			material.fogDensity = glowShaderFogDensity;
			return material;
		}

		// Quick mesh used for visual indicators
		exports.indicatorMesh = Fury.Mesh.create(Primitives.createCubeMesh(0.1));;

		let glowShader = Fury.Shader.create(Shaders.ColorFog);
		// TODO: ^^ A cache of created shaders might be a good idea or we're going to be swapping shader programs unnecessarily

		// Placeholder core visuals
		if (useCoreModels) {
			let coreShader = Fury.Shader.create(Shaders.LitVertexColor);
			redMaterial = Fury.Material.create({ shader: coreShader });
			redMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(redMaterial);
			blueMaterial = Fury.Material.create({ shader: coreShader });
			blueMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(blueMaterial);
			yellowMaterial = Fury.Material.create({ shader: coreShader });
			yellowMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(yellowMaterial);
			greenMaterial = Fury.Material.create({ shader: coreShader });
			greenMaterial.reducedFogDensity = glowShaderFogDensity;
			applyLightingInfo(greenMaterial);
		} else {
			let cubeCoreMesh = Fury.Mesh.create(Primitives.createCubeMesh(0.25));
			redCoreMesh = blueCoreMesh = yellowCoreMesh = greenCoreMesh = cubeCoreMesh;

			redMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0, 0.1));
			exports.redMaterial = redMaterial;

			blueMaterial = createGlowShader(glowShader, vec3.fromValues(0, 0.9, 0.9));
			exports.blueMaterial = blueMaterial;

			yellowMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0.9, 0));
			exports.yellowMaterial = yellowMaterial;

			greenMaterial = createGlowShader(glowShader, vec3.fromValues(0, 0.9, 0.1));
			exports.greenMaterial = greenMaterial;
		}

		exports.whiteMaterial = createGlowShader(glowShader, vec3.fromValues(0.9, 0.9, 0.9));
		exports.blackMaterial = createGlowShader(glowShader, vec3.fromValues(0.1, 0.1, 0.1));

		atlasMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.Voxel) });
		atlasMaterial.loadTexture = (src, cb) => {
			let image = new Image();
			image.onload = () => {
				let texture = Fury.Renderer.createTextureArray(image, 64, 64, 13, "pixel", true); // "low"/"pixel" quality depending on if going purposefully low res
				// TODO: 13 is based on vorld config, so should actually base it off that
				atlasMaterial.textures["uSampler"] = texture;
				applyLightingInfo(atlasMaterial);
				cb();
			};
			image.src = src;
		};

		debugMaterial = Fury.Material.create({ shader: Fury.Shader.create(Shaders.UnlitTextured) });
		debugMaterial.loadTexture = (src, cb) => {
			let image = new Image();
			image.onload = () => {
				debugMaterial.textures["uSampler"] = Fury.Renderer.createTexture(image, "high");
				cb();
			};
			image.src = src;
		};

		if (useCoreModels) {
			itemsToLoad += 1;
			Fury.Model.load("./models/red_core.gltf", (model) => {
				redCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/blue_core.gltf", (model) => {
				blueCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/yellow_core.gltf", (model) => {
				yellowCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
			itemsToLoad += 1;
			Fury.Model.load("./models/green_core.gltf", (model) => {
				greenCoreMesh = Fury.Mesh.create(model.meshData[0]);
				loadCallback();
			});
		}

		itemsToLoad += 1;
		atlasMaterial.loadTexture("./images/atlas_array.png", loadCallback);
		itemsToLoad += 1;
		debugMaterial.loadTexture("./images/checkerboard.png", loadCallback);
	};

	exports.generateVisuals = (world, scene, callback) => {
		// Debug meshes
		let boxes = world.boxes;
		for (let i = 0, l = boxes.length; i < l; i++) {
			let box = boxes[i];
			let meshData = Primitives.createCuboidMesh(box.size[0], box.size[1], box.size[2]);
			let mesh = Fury.Mesh.create(meshData);
			// TODO: World should in charge of including some id for visuals which lets client know what materials etc to use
			box.visuals = scene.add({
				mesh: mesh,
				position: box.center,
				static: true,
				material: debugMaterial
			});
		}

		let createCore = function(mesh, material, pickup) {
			// TODO: Add a rotator and a bob component
			return scene.add({
				mesh: mesh,
				material: material,
				position: pickup.position,
				rotation: pickup.rotation
			});
		};

		// Create teleporter Visuals
		let teleporters = world.teleporters;
		for (let i = 0, l = teleporters.length; i < l; i++) {
			let teleporter = teleporters[i];
			teleporter.visual = TeleporterVisuals.create({ worldVisuals: exports, scene: scene, teleporter: teleporter });
		}

		// Create Pickup Visuals
		let pickups = world.pickups;
		for (let i = 0, l = pickups.length; i < l; i++) {
			let pickup = pickups[i];
			switch(pickup.visualId) {
				case Pickup.visualIds.REDCORE:
					pickup.visual = createCore(redCoreMesh, redMaterial, pickup);
					break;
				case Pickup.visualIds.BLUECORE:
					pickup.visual = createCore(blueCoreMesh, blueMaterial, pickup);
					break;
				case Pickup.visualIds.YELLOWCORE:
					pickup.visual = createCore(yellowCoreMesh, yellowMaterial, pickup);
					break;
				case Pickup.visualIds.GREENCORE:
					pickup.visual = createCore(greenCoreMesh, greenMaterial, pickup);
					break;
			}

			// Create Interactable Visuals
			let interactables = world.interactables;
			for (let i = 0, l = interactables.length; i < l; i++) {
				let interactable = interactables[i];
				switch(interactable.type) {
					case Interactable.Type.TELEPORTER_CONTROL:
						interactable.visual = TeleporterControlVisuals.create({
							worldVisuals: exports,
							scene: scene,
							interactable: interactable
						});
						break;
				}
			}
		}

		let vorld = world.vorld;
		if (!vorld) {
			return;
		}

		// "Generating Meshes"
		// $("#progressBarInner").width("0%");

		var worker = new Worker('./scripts/mesher-worker.js');
		worker.onmessage = function(e) {
			if (e.data.mesh) {
				var mesh = Fury.Mesh.create(e.data.mesh);
				mesh.tileBuffer = Fury.Renderer.createBuffer(e.data.mesh.tileIndices, 1);
				// ^^ TODO: have some way of attaching additional generic buffer info into
				// mesh data, so we don't have to do this step manually
				var chunkObject = scene.add({
					static: true,
					mesh: mesh,
					material: atlasMaterial,
					position: vec3.clone(e.data.offset)
				});
				chunkObjects.push(chunkObject);
			}
			if (e.data.progress !== undefined) {
				// $("#progressBarInner").width((e.data.progress * 100) + "%");
			}
			if (e.data.complete) {
				// $("#progressDisplay").hide();
				if (callback) {
						callback();
				}
			}
		};
		worker.postMessage({
			chunkData: vorld
		});
	};

	return exports;
})();

},{"../../Fury/src/fury.js":4,"../common/interactable":28,"../common/pickup":30,"./primitives":22,"./shaders":23,"./visuals/teleporter-control-visuals":24,"./visuals/teleporter-visuals":25}],27:[function(require,module,exports){
// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');
let World = require('./world');
let Bounds = require('../../Fury/src/bounds');
let Maths = require('../../Fury/src/maths');
let PuzzleGenerator = require("./puzzle-generator");

let GameServer = module.exports = (function() {
	let exports = {};

	// Format is (idToSendTo, objectToSend) for message
	// Format is (idToExclude, objectToSend) for distribute (-1 sends to all)
	let sendMessage, distributeMessage;

	// This is information which needs to be sent on client connection
	// Holds DTOs, rather than actual world objects, might be good to call
	// them as such and have classes for them
	let globalState = {
		players: [],
		pickups: [],
		interactables: []  // network interactables power state
	};
	let world = World.create();

	exports.init = (sendDelegate, distributeDelegate) => {
		sendMessage = sendDelegate;
		distributeMessage = distributeDelegate;
		/* globalState.level = "debug"; */
		let level = PuzzleGenerator.create();
		globalState.level = level;
		world.createLevel(level);
	};

	exports.onclientconnect = (id) => {
		sendMessage(id, { type: MessageType.ACKNOWLEDGE, id: id, data: globalState });
	};

	let positionCache = [0,0,0];

	// Helpers for copying into DTOs
	// TODO: Move to common so we can reuse for client side DTOs
	// note + converts back from string to number, arguably should use round
	// https://stackoverflow.com/a/41716722
	let round = (num) => {
		return Math.round(num * 100 + Number.EPSILON) / 100;
	};

	let cloneArray3 = (array) => {
		return [ round(array[0]), round(array[1]), round(array[2]) ];
	};
	let copyArray3 = (out, array) => {
		out[0] = round(array[0]);
		out[1] = round(array[1]);
		out[2] = round(array[2]);
	};
	let cloneArray4 = (array) => {
		return [ round(array[0]), round(array[1]), round(array[2]), round(array[3]) ];
	};
	let copyArray4 = (out, array) => {
		out[0] = round(array[0]);
		out[1] = round(array[1]);
		out[2] = round(array[2]);
		out[3] = round(array[3]);
	};

	exports.onmessage = (id, message) => {
		switch(message.type) {
			case MessageType.GREET:
				let nick = message.nick;
				if (!nick) nick = "Player " + (id + 1);
				globalState.players[id] = { id: id, nick: nick, position: cloneArray3(world.initialSpawnPosition), rotation: [0,0,0,1] };
				distributeMessage(-1, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
				break;
			case MessageType.PICKUP:
				// Expect position, run through pickups and try to pickup
				// Could in theory use last known position it's probably fine
				if (!isHoldingPickup(id)) {
					let closestPickup = null;
					let minSqrDistance = Number.MAX_VALUE;
					for (let i = 0, l = world.pickups.length; i < l; i++) {
						let pickup = world.pickups[i];
						if (pickup.canPickup(message.position)) {
							let sqrDistance = Maths.vec3.squaredDistance(message.position, pickup.position);
							if (sqrDistance < minSqrDistance) {
								closestPickup = pickup;
								minSqrDistance = sqrDistance;
							}
						}
					}

					if (closestPickup) {
						closestPickup.enabled = false;
						setPickupGlobalState(closestPickup.id, id);
						distributeMessage(-1, { id: id, type: MessageType.PICKUP, pickupId: closestPickup.id });
					}
				}
				break;
			case MessageType.DROP:
				// If we wanted to be super accurate we could expect position
				if (isHoldingPickup(id)) {
					dropPickups(id, message.position); // Currently just drops all pickups
					message.id = id;
					distributeMessage(-1, message);
				}
				break;
			case MessageType.INTERACT:
				// Call interact then update global state
				// and distribute
				let position = globalState.players[id].position;
				// Look for interactable at player position
				for (let i = 0, l = world.interactables.length; i < l; i++) {
					let interactable = world.interactables[i];
					if (interactable.canInteract(position)) {
						// Interact!
						let heldPickupState = getHeldPickup(id);
						let heldPickup = null;
						if (heldPickupState) {
							heldPickup = world.getPickup(heldPickupState.id);
						}
						let result = interactable.interact(heldPickup);
						if (result && result.length) {
							// Update world object (will want to do this on client too)
							heldPickup.enabled = false;
							Maths.vec3.copy(heldPickup.position, result);
							// Don't have server side player objects so don't need to explicitly
							// set player.heldItem to null, updating the heldPickupState does that

							// Update global state
							heldPickupState.owner = null;
							heldPickupState.position = cloneArray3(result);
							setInteractableGlobalState(interactable.id, interactable.power);

							// Set message pickup id
							message.pickupId = heldPickup.id
						} else if (result) {
							result.enabled = false;
							setPickupGlobalState(result.id, id);
							setInteractableGlobalState(interactable.id, interactable.power);
						}

						// If we expand what interactables can do, e.g. just switches
						// need to respond to state change here and put it in global state

						message.id = id;
						message.interactableId = interactable.id;
						distributeMessage(-1, message);
						break;
					}
				}
				break;
			case MessageType.POSITION:  // This is more a player transform / input sync
				message.id = id;

				copyArray3(positionCache, message.position);
				let hasPositionChanged = !Maths.vec3.equals(positionCache, globalState.players[id].position);
				if (hasPositionChanged)
				copyArray3(globalState.players[id].position, message.position);
				copyArray4(globalState.players[id].rotation, message.rotation);

				// Check for teleporter collision
				let shouldTeleport = false;
				if (hasPositionChanged) {
					for (let i = 0, l = world.teleporters.length; i < l; i++) {
						let teleporter = world.teleporters[i];
						// Ideally would have player concept on server now and could use it's AABB
						if (teleporter.enabled && Bounds.contains(message.position, teleporter.bounds)) {
							shouldTeleport = true;
							// TODO: Not instant teleport please - requires game loop server side or some way to defer
							Maths.vec3.copy(message.position, teleporter.targetPosition);
							Maths.quat.copy(message.rotation, teleporter.targetRotation);
							message.snapLook = true;
							message.win = teleporter.win;
							break;
						}
					}
				}

				// Message all others if no teleport, return message to sender as well as other players if teleporting
				if (shouldTeleport) {
					// Distribute to everyone
					distributeMessage(-1, message); // TODO: Relevancy / Spacial Parititioning plz (players in target section + players in correct section + self)
				} else {
					// Distribute to other players
					distributeMessage(id, message); // TODO: Relevancy / Spacial Partitioning plz (players in same section only)
				}

				// Check for auto-pickups
				if (hasPositionChanged && !isHoldingPickup(id)) { // Q: Auto pickups probably shouldn't be held?
					for (let i = 0, l = world.pickups.length; i < l; i++) {
						let pickup = world.pickups[i];
						if (pickup.autoPickup && pickup.canPickup(message.position)) {
							// This player should pickup the object!
							pickup.enabled = false;
							setPickupGlobalState(pickup.id, id);
							distributeMessage(-1, { id: id, type: MessageType.PICKUP, pickupId: pickup.id });
						}
					}
				}
				break;
			default:
				message.id = id;
				distributeMessage(id, message);
				break;
		}
	};

	let setPickupGlobalState = (id, owner, position) => {
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].id == id) {
				globalState.pickups[i].owner = owner;
				if (position) {
					if (globalState.pickups[i].position) {
						copyArray3(globalState.pickups[i].position, position);
					} else {
						globalState.pickups[i].position = cloneArray3(position);
					}
				} else {
					globalState.pickups[i].position = null;
				}
				return;
			}
		}
		globalState.pickups.push({
			id: id,
			owner: owner,
			position: position ? cloneArray3(position) : null
		});
	};

	let setInteractableGlobalState = (id, power) => {
		for (let i = 0, l = globalState.interactables.length; i < l; i++) {
			if (globalState.interactables[i].id == id) {
				globalState.interactables[i].power = power.slice();
				return;
			}
		}
		globalState.interactables.push({ id: id, power: power.slice() });
	};

	let isHoldingPickup = (playerId) => {
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == playerId) {
				return true;
			}
		}
		return false;
	};

	let getHeldPickup = (playerId) => {
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == playerId) {
				return globalState.pickups[i];
			}
		}
		return null;
	};

	let dropPickups = (id, dropPosition) => {
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == id) {
				if (!dropPosition) {
					// TODO: Calculate from player position and rotation and drop slightly in front
					dropPosition = globalState.players[id].position;
				}
				// re-enable world pickup
				let pickup = world.getPickup(globalState.pickups[i].id);
				if (pickup) {
					pickup.enabled = true;
					Maths.vec3.copy(pickup.position, dropPosition);
				}

				// update global state pickup
				globalState.pickups[i].owner = null;
				globalState.pickups[i].position = cloneArray3(dropPosition);  // Clone they might continue to move, lol
			}
		}
	};

	exports.onclientdisconnect = (id) => {
		// Only report disconnection of players which have sent greet
		if (globalState.players[id]) {
			dropPickups(id);  // Drop any owned pickups
			globalState.players[id] = null; // Remove from state
			distributeMessage(id, { type: MessageType.DISCONNECTED, id: id });
		}
	};

	return exports;

})();

},{"../../Fury/src/bounds":2,"../../Fury/src/maths":8,"./message-types":29,"./puzzle-generator":31,"./world":36}],28:[function(require,module,exports){
// A static world object which can be interacted with in some way
// This might be better described as a static trigger (with pickup being a dynamic trigger)
let Maths = require('../../Fury/src/maths');
let Bounds = require('../../Fury/src/bounds');
let quat = Maths.quat, vec3 = Maths.vec3;

let Interactable = module.exports = (function() {
	let exports = {};
	let prototype = {
		interact: function(heldItem) {
			/* by default do nothing but have an interact method */
			/* Should return a position to move item to if heldItem was taken */
		},
		canInteract: function(position) {
			return Bounds.contains(position, this.bounds);
		},
		onmessage: function(message) { /* each type will handle messages differently */ }
	};

	// Arguably rather than this enum/switch based pattern on type we could have other modules
	// which Object.create(Interactable.create(params)); and then add additional logic / setup
	var Type = exports.Type = {
		// Sound maker
		// Core Charger / Dispenser (?)
		TELEPORTER_CONTROL: "teleporter_control"
	};

	let createTeleporterControl = function(interactable, params) {
		// TODO: Push this control to teleporter (probably easier to have multiple)
		// power block points requiring cores each than one requiring multiple
		interactable.teleporter = params.teleporter;
		interactable.cores = [];

		if (params.powerRequirements != null) {
			interactable.powerRequirements = params.powerRequirements;  // Array of core numbers needed
		} else {
			interactable.powerRequirements = [];
		}
		if (params.startingPower != null) {
			interactable.power = params.startingPower;
		} else {
			interactable.power = [];
		}
		// Fill power array with numbers
		for (let i = interactable.power.length; i < interactable.powerRequirements.length; i++) {
			interactable.power[i] = 0;
		}

		interactable.isPowered = function() {
			if (interactable.powerRequirements) {
				for (let i = 0, l = interactable.power.length; i < l; i++) {
					if (interactable.power[i] < interactable.powerRequirements[i]) {
						return false;
					}
				}
			}
			return true;
		};

		let messageTeleporter = (message) => {
			if (interactable.teleporter && interactable.teleporter.onmessage) {
				interactable.teleporter.onmessage(message);
			}
		};

		let message = (message) => {
			if (message == "init") {	// HACK: Shouldn't use game event messaging for initalisation
				if (interactable.isPowered()) {
					messageTeleporter("control_powered");
				}
			}
			if (interactable.visual && interactable.visual.onmessage) {
					interactable.visual.onmessage(message);
			}
		};

		interactable.onmessage = message;

		let attachPosition = vec3.create();

		interactable.interact = function(heldItem) {
			if (!interactable.isPowered()) {
				if (heldItem) {
					let coreIndex = heldItem.getCoreIndex();
					if (coreIndex >= 0 && coreIndex < interactable.power.length
						&& interactable.power[coreIndex] < interactable.powerRequirements[coreIndex]) {
						// Interaction successful - took power core
						interactable.power[coreIndex] += 1;
						interactable.cores.push(heldItem);
						if (interactable.isPowered()) {
							messageTeleporter("control_powered");
							message("powered");
						} else {
							message("took_core");
						}
						// HACK: place at bounds center - z
						vec3.scaleAndAdd(attachPosition, interactable.bounds.center, Maths.vec3Z, -1);
						return attachPosition;
					} else {
						// Interaction Unsuccessful - invalid core and unpowered
						message("invalid_core");
					}
				} else {
					// Interaction Unsuccessful - unpowered
					message("unpowered");
				}
			} else {
				if (interactable.cores.length) {
					// Select Core
					let index = interactable.cores.length - 1;
					let core = interactable.cores[index];
					interactable.cores.length = index;

					// Reduce Power
					let coreIndex = core.getCoreIndex();
					interactable.power[coreIndex] -= 1;

					if (!interactable.isPowered()) {
						messageTeleporter("control_unpowered");
						message("unpowered");
					} else {
						message("loss_core");
					}
					return core; // NOTE this multi-cast result is bad for the JS compiler
				} else {
					// Interaction (un)successful - already powered - no cores to take
					message("already_powered");
				}
			}

			return null;
			// Q: Maybe control panel should toggle teleporter even if power requirements met?
		};

		// Disable teleporter if unpowered
		if (!interactable.isPowered()) {
			interactable.teleporter.enabled = false;
		}
	};

	exports.create = (params) => {
		// Required: id, type, min, size (+ more based on type)
		let interactable = Object.create(prototype);

		// Currently don't expect interactables to move
		// if they need to move in future will need to make sure bounds
		// are recalculated when queried and/or when moved

		interactable.id = params.id;  // Consider just using guids c.f. https://github.com/uuidjs/uuid
		interactable.type = params.type;
		// NOTE: no enabled option as we should respond even if 'disabled' based on state

		// Interaction bounds
		let size;
		if (params.size) {
			size = params.size;
		} else {
			size = vec3.fromValues(1,2,1);
		}
		let min = vec3.clone(params.min);
		let max = vec3.create();
		vec3.add(max, min, size);
		interactable.bounds = Bounds.create({ min: min, max: max });

		// Append interact method
		switch(params.type) {
			case Type.TELEPORTER_CONTROL: // requires params.teleporter, optional: powerRequirements, startingPower
				createTeleporterControl(interactable, params);
				break;
		}

		return interactable;
	};

	return exports;
})();

},{"../../Fury/src/bounds":2,"../../Fury/src/maths":8}],29:[function(require,module,exports){
// message type enum
var MessageType = module.exports = {
  CONNECTED: "connected",
  DISCONNECTED: "diconnected",
  GREET: "greet",
  ACKNOWLEDGE: "acknowledge",
  POSITION: "position",
  PICKUP: "pickup",
  DROP: "drop",
  INTERACT: "interact"
};

},{}],30:[function(require,module,exports){
// This might be more generic than pickup but I can't think of a better name
// These are objects that exist in the world, and if a player root is in bounds
// they either pick it up automatically or they can press a key to pick it up.
// They also need to be droppable / spawnable

// I've conflated the pickup trigger with the pickup object, might want
// separate these at some point :shrug:

let Maths = require('../../Fury/src/maths');
let Physics = require('../../Fury/src/physics');
let vec3 = Maths.vec3, quat = Maths.quat;

let Pickup = module.exports = (function() {
  let exports = {};
  let prototype = {
    canPickup: function(playerPosition) { // bounds check might be nice
      return this.enabled && Physics.Sphere.contains(playerPosition, this.sphere);
    },
    getCoreIndex: function() {
      switch (this.visualId) {
        case visualIds.REDCORE:
          return 0;
        case visualIds.BLUECORE:
          return 1;
        case visualIds.YELLOWCORE:
          return 2;
        case visualIds.GREENCORE:
          return 3;
        default:
          return -1;
      }
    }
  };

  let visualIds = exports.visualIds = { // These really should have underscores between words
    REDCORE: "redcore",
    BLUECORE: "bluecore",
    YELLOWCORE: "yellowcore",
    GREENCORE: "greencore"
  };

  exports.create = function(params) { // expects: id, position, visualId - optional: rotation, autoPickup, radius, enabled
    let pickup = Object.create(prototype);

    pickup.id = params.id;
    pickup.visualId = params.visualId // Used by pickup visuals to know what to make this look like! also is type info
    pickup.autoPickup = params.autoPickup;
    pickup.position = params.position;

    if (params.enabled) {
      pickup.enabled = params.enabled;
    } else {
      pickup.enabled = true;
    }

    if (params.rotation) {
      pickup.rotation = params.rotation;
    } else {
      pickup.rotation = quat.create();
    }

    let radius = 1;
    if (params.radius) {
      radius = params.radius;
    }

    pickup.sphere = Physics.Sphere.create({
      center: pickup.position,  // Reference link position
      radius: radius
    });

    return pickup;
  };

  return exports;
})();

},{"../../Fury/src/maths":8,"../../Fury/src/physics":11}],31:[function(require,module,exports){
// Right terms!
// A 'teleporters' transports you from one room to another in one direction, may require a colored 'core' to power
// A 'core' is an item you can pick up in world (or is powering a teleporter) and take through powered teleporters
// A 'room' is an area has at least one teleporter, and enough cores to power at least one teleporter
//  A room is a subset of 'unit' of loop length 0
// A 'unit' is a loop of 1 or more sub-units and it has an exit teleporter (which may or may not trigger progression)
// (NOTE: There needn't be enough cores to power all teleporters, just enough to either power the exit _or_ the 'loop' this follows from room definition)
// - Units don't need to use the same core type for a given 'level' of nesting, but it'll be easier to reason about if they do.
// Units overlap when they share rooms in their loops.
// - Overlapping units implicitly have 'shared' cores when the exit teleporter from one unit needs the same color as is needed to leave one overlapping unit into the other.
// -- If shared core is used this breaks one of the loops traversal to exit the other, this is desirable.
// When progression is triggered, the spawn position of new players should be set to the target room
// A certain number of progressions should cause the player(s) to win and reset the server.

let PuzzleGenerator = module.exports = (function() {
	let exports = {};

	// This outputs a unit with an exit teleporter
	exports.create = function() {
		// Note: color indices: [ red, blue, yellow, green ]
		// Input # 1:
		// { units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] units: [] } ],
		// start: 0 }
		// is a single room with a red teleporter and red power core (no keyLocation or exitColor => no power requirements)
		// exiting this room increases progression

		// Input #2
		// { units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] },
		// 	{ exitPower: [0, 1, 1], exitLocations: [1], keyLocations: [2], keyLocationOffsets[1,0], units: [0,0,0] } ],
		// start: 1}
		// is 3 rooms in a loop using red to tranverse, second room contains a blue/yellow teleporter, third room contains a blue core and first a yellow
		// exiting the second room via the blue/yellow teleporter increases progression

		// In order to nest units further, need to improve key and exitLocation specification (have to pick a room location ultimately not a unit location)
			// Can we just use an array? and it uses the nesting depth % units.length
		// In order to support multiple power cores need we to improve exitPower - can use an array
			// Also effects keyLocations - we could just do (nesting depth + keyLocationOffsets[colorIndex]) % units.length
		// In order to share room instances need something more than definition indices, as each implies a new room atm.
			// Would adding "overlap: unitIndex, unitOverlaps: [0]"	- Work?
				// Well for this depth yes, but for more nesting no, and it doesn't help us put the keyLocation into the other unit
					// If we index into room instead of unit, and then build rooms of the overlap... maybe we could place the key in the overlap?

		// NOTE: Logic for when unlock key matches core already in the room from a lower layer, don't need to add it elsewere
		// E.g. if exitPower for units[1] in Input #2, was [1,1]  we won't need to add the first core (0) anywhere because units[1].units[units[1].exitlocations[0]].exitPower[0] >= units[1].exitPower[0]
		// where units[1].exitLocations[0] is the room with the exit teleporter, if it was nested we'd need to drill down till we knew the room index
		// where we're checking [...]exitPower[0] >= units[1].exitPower[0] could swap those 0s as colorIndex and perform the check for all

		// Output #1
		// rooms: [ { telporters: [{ powerRequirements: [1], isProgression: true }], cores: [ 1 ]  }]
		// Output #2
		// rooms: [ { teleporters: [{ powerRequirements: [1], target: 1 }], cores: [ 1, 0, 1 ] },
	 	//	{ teleporters: [{ powerRequirements: [1], target: 2 }, { powerRequirements: [0, 1, 1], isProgression: true }], cores: [ 1 ] },
		// { teleporters: [{ powerRequirements: [1], target: 0 }], cores: [ 1, 1 ] }]

		// Enough theory crafting, lets ignore more than one level of nesting code for now
		// First Test - nesting level 0, length 1
		// let input = { start: 0, units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0], units: [] } ] };
		let input = { start: 1, units: [
			{ exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] },
		 	{ exitPower: [0, 1, 1], exitLocations: [1], keyLocations: [2], keyLocationOffsets: [1,0], units: [0,0,0] } ],
		};

		let startUnit = input.units[input.start];

		let createRoom = function(roomUnit, isProgression, target) {
			let room = { teleporters: [], cores: [0,0,0,0] };

			// Create Exit Teleporter
			room.teleporters.push(createTeleporter(roomUnit.exitPower, isProgression, target));

			// It's room level exit so just give it the power needed to get out
			// technically should be using exitLocation / keyLocation
			for (let i = 0; i < 4; i++) {
				room.cores[i] = roomUnit.exitPower[i] | 0;
			}
			return room;
		};

		let createTeleporter = function(exitPower, isProgression, target) {
			let teleporter = { powerRequirements: exitPower.slice() };
			if (isProgression) {
				teleporter.isProgression = isProgression;
			} else {
				teleporter.target = target;
			}
			return teleporter
		};

		// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		let shuffleArray = function(array) {
			let currentIndex = array.length, temp, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temp = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temp;
			}
			return array;
		};

		let output = { start: 0, rooms: [] };
		if (!startUnit.units || !startUnit.units.length) {
			// Single length just create a room
			output.rooms.push(createRoom(startUnit, true));
		} else {
			// Recurve into units
			let unitRooms = output.rooms;
			let nestingLevel = 1;	// TODO: Support more than one please!

			// NOTE: using output.rooms to mean rooms for this unit, which would not be true with further nesting
			// Also some of the maths likely wouldn't work
			for (let i = 0, l = startUnit.units.length; i < l; i++) {
				// NOTE: Assuming these units are rooms, which is not valid but one step at a time kay
				unitRooms.push(createRoom(input.units[startUnit.units[i]], false, (i + 1) % l));
			}
			let exitRoomIndex = startUnit.exitLocations[0] % unitRooms.length;	// Additional array entries would be used for further nesting

			// Add exit teleporter
			unitRooms[exitRoomIndex].teleporters.push(createTeleporter(startUnit.exitPower, true));

			// Distribute cores to solve across rooms
			for (let colorIndex = 0; colorIndex < startUnit.exitPower.length; colorIndex++) {
				let requiredPower = startUnit.exitPower[colorIndex] | 0;

				// Account for shared power needs - don't spawn cores which have to be available for the room because of the lower loop teleporters
				let minPowerRequirement = 0;
				for (let i = 0; i < nestingLevel; i++) {
					let teleporter = unitRooms[exitRoomIndex].teleporters[i];
					if (colorIndex < teleporter.powerRequirements.length) {
						minPowerRequirement += teleporter.powerRequirements[colorIndex] | 0;
					}
				}
				requiredPower -= minPowerRequirement;

				if (requiredPower > 0) {
					let offsetIndex = colorIndex % startUnit.keyLocationOffsets.length;
					// key location offsets is used for multiple color keys - this does mean the pattern would be cyclically the same for additional nesting but :shrug:
					let coreRoomIndex = (startUnit.keyLocations[0] + startUnit.keyLocationOffsets[offsetIndex]) % unitRooms.length; // Additional array entries would be used for further nesting
					unitRooms[coreRoomIndex].cores[colorIndex] += requiredPower;
				}
			}

			// Now shuffle swap teleporter positions extra random!
			shuffleArray(unitRooms[exitRoomIndex].teleporters);
		}

		return output;
	};

	return exports;
})();

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
let Chunk = require('./chunk');

let Vorld = module.exports = (function() {
  var exports = {};

  // TODO: Try keying on something we can build without garbage allocation?

  exports.addChunk = function(vorld, chunk, i, j, k) {
    vorld.chunks[i+"_"+j+"_"+k] = chunk;  // Also garbage allocation but not as bad as in get
    chunk.indices = [i, j, k];
  };
  exports.getChunk = function(vorld, i, j, k) {
    var key = i+"_"+j+"_"+k;  // You monster - garbage allocation everywhere
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

},{"./chunk":32}],35:[function(require,module,exports){
module.exports = (function() {
  // These codes are used in the close event
  // Permissable values are between 4000 -> 4999
  // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
  var codes = {};

  codes.SERVER_FULL = 4001;

  return codes;
})();

},{}],36:[function(require,module,exports){
let Fury = require('../../Fury/src/fury.js');
let Physics = Fury.Physics; // Could *just* import physics and maths
let Maths = Fury.Maths;
let vec3 = Maths.vec3, quat = Maths.quat;
let Vorld = require('./vorld/vorld');
let VorldConfig = require('./vorld/config');
let Pickup = require('./pickup');
let Interactable = require('./interactable');

let World = module.exports = (function() {
	// Contains AABBs of the world environment
	// and more importantly the 'vorld' which is the voxel data
	// In charge of adding relevant objects to world based on level name

	var exports = {};
	var prototype = {
		addBox: function(xMin, xMax, yMin, yMax, zMin, zMax) {
			let min = vec3.fromValues(xMin, yMin, zMin);
			let max = vec3.fromValues(xMax, yMax, zMax);
			let box = Physics.Box.create({ min: min, max: max });
			this.boxes.push(box);
			return box;
		},
		getIntersections: function(results, box) {
			results.length = 0;
			for (let i = 0, l = this.boxes.length; i < l; i++) {
				if (Physics.Box.intersect(box, this.boxes[i])) {
					results.push(box);
				}
			}
		},
		getPickup: function(id) {
			if (id) {
				let pickups = this.pickups;
				for (let i = 0, l = pickups.length; i < l; i++) {
					if (pickups[i] && pickups[i].id == id) {
						return pickups[i];
					}
				}
			}
			return null;
		},
		getInteractable: function(id) {
			if (id) {
				let interactables = this.interactables;
				for (let i = 0, l = interactables.length; i < l; i++) {
					if (interactables[i] && interactables[i].id === id) {
						return interactables[i];
					}
				}
			}
			return null;
		}
	};

	exports.create = function(params) {
		let world = Object.create(prototype);
		// We may want one of these *per* section
		let vorld = Vorld.create({ chunkSize: 32 });

		world.vorld = vorld;
		world.boxes = [];
		world.teleporters = [];
		world.pickups = [];     // Dynamic so are networked in game server
		world.initialSpawnPosition = [0, 1, 0];
		world.interactables = [];

		let fill = function(xMin, xMax, yMin, yMax, zMin, zMax, block) {
			for (let x = xMin; x <= xMax; x++) {
				for (let z = zMin; z <= zMax; z++) {
					for (let y = yMin; y <= yMax; y++) {
						Vorld.addBlock(vorld, x, y, z, block);
					}
				}
			}
		};

		let createRoom = function(x,y,z, w,h,d) {
			let wall = VorldConfig.BlockIds.STONE_BLOCKS;
			let floor = VorldConfig.BlockIds.STONE;
			let ceiling = VorldConfig.BlockIds.STONE;

			// existing w = 9 x = -4
			// d = 9 z = -4
			// h = 4 y = 0
			fill(x,x+w-1, y,y+h-1, z+d,z+d, wall);
			fill(x,x+w-1, y,y+h-1, z-1,z-1, wall);
			fill(x+w,x+w, y,y+h-1, z,z+d-1, wall);
			fill(x-1,x-1, y,y+h-1, z,z+d-1, wall);

			fill(x,x+w-1, y+h,y+h, z,z+d-1, ceiling);
			fill(x,x+w-1, y-1,y-1, z,z+d-1, floor);
		}

		// Teleporters are 3x3 with collision bounds of 1x2x1 (whilst we have instant teleport)
		let createTeleporter = function(x, y, z, targetPoint, targetRotation) {
			let teleporterBlock = VorldConfig.BlockIds.GRASS;
			fill(x-1,x+1, y-1,y-1, z-1,z+1, teleporterBlock); // half step at y would be nice

			let teleporterBounds = Physics.Box.create({
				min: vec3.fromValues(x, y, z),
				max: vec3.fromValues(x+1, y+2, z+1)
			});
			// TODO: Would be cool to add an outer bounds which starts some kinda visual change
			// when you enter it (client side only), and potentially would act as the enabler for
			// the inner bounds on server side.
			let teleporter = {
				enabled: true,
				targetPosition: targetPoint,
				targetRotation: targetRotation,
				bounds: teleporterBounds,
				controls: [],
				onmessage: function(message) {
					if (message == "control_powered") {
						let wasPowered = this.enabled;
						let powered = true;
						for (let i = 0, l = this.controls.length; i < l; i++) {
							if (!this.controls[i].isPowered()) {
								powered = false;
								break;
							}
						}
						this.enabled = powered;
						if (!wasPowered && powered && this.visual && this.visual.onmessage) {
								this.visual.onmessage("powered")
						}
					} else if (message == "control_unpowered") {
						let wasPowered = this.enabled;
						let powered = true;
						for (let i = 0, l = this.controls.length; i < l; i++) {
							if (!this.controls[i].isPowered()) {
								powered = false;
								break;
							}
						}
						this.enabled = powered;
						if (wasPowered && !powered && this.visual && this.visual.onmessage) {
							this.visual.onmessage("unpowered");
						}
					}
				}
			};
			world.teleporters.push(teleporter);
			return teleporter;
		};

		let createTeleporterControl = function(id, x, y, z, teleporter, powerRequirements) {
			let teleporterControlBlock = VorldConfig.BlockIds.PLANKS;
			fill(x,x,y,y,z,z, teleporterControlBlock);
			let control = Interactable.create({
				id: id,
				type: Interactable.Type.TELEPORTER_CONTROL,
				min: vec3.fromValues(x,y,z+1), // default size 1,2,1
				teleporter: teleporter,
				powerRequirements: powerRequirements
			});
			teleporter.controls.push(control);
			world.interactables.push(control);
		};

		let createPickup = function(id, visualId, x, y, z, radius, autoPickup) {
			world.pickups.push(Pickup.create({
				id: id,
				visualId: visualId,
				position: vec3.fromValues(x,y,z),
				radius: radius,
				autoPickup: !!autoPickup
			}));
		};

		let createTestSteps = function(level) {
			// test steps!
			level.push(world.addBox(-0.25, 0.25, 0, 0.25, -3.5, -3));
			level.push(world.addBox(-0.25, 0.25, 0, 0.5, -4, -3.5));
		};

		let createNamedLevel = function(levelName) {
			switch(levelName) {
				case "debug":
					// Placeholder level creation
					// Note ids aren't important so long as they're unique
					let room1TargetPosition = vec3.fromValues(0.5,3,0.5);
					let room1TargetRotation = Maths.quatEuler(0, 0, 0);
					let room2TargetPosition = vec3.fromValues(-99.5,1,0.5);
					let room2TargetRotation = Maths.quatEuler(0, 180, 0);
					let room3TargetPosition = vec3.fromValues(101,1,0.5);
					let room3TargetRotation = Maths.quatEuler(0, 180+45, 0);

					createRoom(-5,0,-10, 11,5,11);
					// Note target position should add player y extents as player position
					// isn't at the bottom of it's box cause we're insane
					createTeleporterControl(
						"teleporter_control_1",
						-2, 0, -10,
						createTeleporter(-4, 0,-9, room2TargetPosition, room2TargetRotation),
						[1] // requires one red core
					);
					createPickup("red_core_1", Pickup.visualIds.REDCORE, 0.5, 0.5, -9, 1.5, false);

					// TODO: Win on teleport through this one!
					let winTeleporter = createTeleporter(4, 0, -9, vec3.fromValues(0,-100, 100), room1TargetRotation);
					winTeleporter.win = true;
					createTeleporterControl(
						"teleporter_control_exit",
						2, 0, -10,
						winTeleporter,
						[0, 1]  // requires one blue core
					);

					// Ability to set multiple bounds positions, NESW

					/* TODO: Add debug visuals on corner of teleporters (for off and on) */
					/* Add debug visuals on corners of control panels (to denote required cores) */

					/* Advanced Mechanics TODO:
						Have second teleporter in room 1 require multiple cores (blue and red)
						Add another red core to room 3
						Need to be able to remove cores from controls if you put it in and place it in the other
						Need to be able to drop cores into teleporter without using it (another interactable which teleports cores it's given)
					*/

					let d = 30;
					createRoom(-101, 0, -1, 3, 3, d);
					createTeleporter(-100, 0, d-3, room3TargetPosition, room3TargetRotation);
					createPickup("blue_core_1", Pickup.visualIds.BLUECORE, -99.5, 0.5, 10, 1.5, false);

					createRoom(100, -4, -1, 30, 8, 20);
					createPickup("yellow_core_1", Pickup.visualIds.YELLOWCORE, 105, -3, 4, 1.5, false);
					createPickup("green_core_1", Pickup.visualIds.GREENCORE, 115, -3, 10, 1.5, false);
					let room3Teleporter =  createTeleporter(128, -4, 0, room1TargetPosition, room1TargetRotation);
					createTeleporterControl(
						"teleporter_control_3_yellow",
						128, -4, 2,
						room3Teleporter,
						[0,0,1] // requires one yellow core
					);
					createTeleporterControl(
						"teleporter_control_3_green",
						129, -4, 2,
						room3Teleporter,
						[0,0,0,1] // requires one green core
					);
					break;
			}
		};

		let buildLevel = function(level) {
			// Takes input from puzzle-generator and turns it into geometry and objects
			// Expected Input is a array of rooms with a number of teleporters and cores
			// Expected Input Test:
			// rooms: [ { telporters: [{ powerRequirements: [1], isProgression: true }], cores: [ 1 ]  }], start: 0

			let roomOffset = vec3.fromValues(0, 0, 0);
			let roomHeight = 3;
			let zPadding = 6;
			let teleporterControlIndex = 0;
			let pickupIndex = 0;
			let pickupIds = [ Pickup.visualIds.REDCORE, Pickup.visualIds.BLUECORE, Pickup.visualIds.YELLOWCORE, Pickup.visualIds.GREENCORE ];

			let exitPosition = vec3.fromValues(-100, 0, 0);
			let targetRotation = Maths.quatEuler(0, 0, 0);
			let interRoomSpacing = 100;

			for (let i = 0, l = level.rooms.length; i < l; i++) {
				// Create room sized by number of teleporters it needs for now
				let teleporters = level.rooms[i].teleporters;
				let roomWidth = 7 * teleporters.length - 2;
				let roomDepth = 4 + zPadding;
				createRoom(roomOffset[0], roomOffset[1], roomOffset[2] - roomDepth, roomWidth, roomHeight, roomDepth);

				// Create Teleporters
				for (let j = 0, n = teleporters.length; j < n; j++) {
					let teleportPosition = vec3.fromValues(0,1,-1);
					if (teleporters[j].isProgression) {
						vec3.copy(teleportPosition, exitPosition);
					} else {
						let targetRoom = teleporters[j].target;
						teleportPosition[0] = targetRoom * interRoomSpacing + (7 * level.rooms[targetRoom].teleporters.length - 2) / 2;
					}
					let teleporter = createTeleporter(roomOffset[0] + j * 7 + 2, roomOffset[1], roomOffset[2] - roomDepth + 2, teleportPosition, targetRotation);

					// TEMP: HACK only one puzzle
					if (teleporters[j].isProgression) {
						teleporter.win = true;
						teleporter.isProgression = true;
					}

					let panelsNeeded = 0;
					for (let k = 0, m = teleporters[j].powerRequirements.length; k < m; k++) {
						if (teleporters[j].powerRequirements[k] > 0) {
							panelsNeeded += 1;
						}
					}

					let panelsSpawned = 0;
					for (let k = 0, m = teleporters[j].powerRequirements.length; k < m; k++) {
						// Create a control panel for each power core type needed
						if (teleporters[j].powerRequirements[k] > 0) {
							let controlPower = [0, 0, 0, 0];
							controlPower[k] = teleporters[j].powerRequirements[k];

							// Lay these out nicer than just starting at teleporter left and going right
							// Behind centered if 1, and either side if 2, behind all if 3, behind with gap in the middle if four
							let x = roomOffset[0] + j * 7;
							if (panelsNeeded == 1) {
								x += 2;
							} else if (panelsNeeded == 2) {
								x += 1 + 2*panelsSpawned;
							} else if (panelsNeeded == 3) {
								x += 1 + panelsSpawned;
							} else if (panelsSpawned < 2){
								x += panelsSpawned;
							} else {
								x += panelsSpawned + 1;
							}

							createTeleporterControl(
								"teleporter_control_" + (teleporterControlIndex++),
								x, roomOffset[1], roomOffset[2] - roomDepth,
								teleporter,
								controlPower);
							panelsSpawned++;
						}
					}
				}

				// Spawn cores for room
				let cores = level.rooms[i].cores;
				let coresCount = 0;
				for (let j = 0, n = cores.length; j < n; j++) {
					coresCount += cores[j];
				}

				let xSpacing = roomWidth / (coresCount + 1);
				let spawnCount = 0;
				for (let j = 0, n = cores.length; j < n; j++) {
					for (let k = 0, m = cores[j]; k < m; k++) {
						createPickup(
							"core_" + (pickupIndex++),
							pickupIds[j],
							roomOffset[0] + xSpacing * (spawnCount + 1),
							roomOffset[1] + 0.5,
							roomOffset[2] - (zPadding/2),
							1.5,
							false);
						spawnCount++;
					}
				}

				if (level.start == i) {
					vec3.add(world.initialSpawnPosition, roomOffset, Maths.vec3Y);
					vec3.scaleAndAdd(world.initialSpawnPosition, world.initialSpawnPosition, Maths.vec3X, roomWidth / 2);
					vec3.scaleAndAdd(world.initialSpawnPosition, world.initialSpawnPosition, Maths.vec3Z, -1);
				}

				vec3.scaleAndAdd(roomOffset, roomOffset, Maths.vec3X, interRoomSpacing);
			}
		};

		world.createLevel = (level) => {
			if (typeof level == "string") {
				createNamedLevel(level);
			} else {
				buildLevel(level);
			}
		};

		// TODO: Create spawn methods with listeners

		return world;
	};

	return exports;
})();

},{"../../Fury/src/fury.js":4,"./interactable":28,"./pickup":30,"./vorld/config":33,"./vorld/vorld":34}]},{},[16]);
