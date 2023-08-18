import { lazy } from 'react';
const CKE = lazy(()=>import('./ckeditor'))
const Main = lazy(()=>import('./main'))
const About = lazy(()=>import('./about'))

export {CKE, Main, About}