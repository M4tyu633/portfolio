import fs from 'node:fs/promises';
import path from 'node:path';
const base=process.argv[2]||'http://localhost:3100';
const pages=['/','/work','/about','/achievements','/achievements/gear-up-ncr','/achievements/egov-hackathon','/work/tumbang-preso','/work/egovmed','/work/glycoswarm-ai','/work/chip-8-emulator','/work/knee-mri-reader','/work/heart-disease-prediction'];
const urls=new Set(['/demos/egovmed/index.html','/chip8/index.html','/chip8/index.js','/chip8/index.wasm','/chip8/index.data','/chip8/arcade.css','/chip8/arcade.js','/sound/horizons.mp3','/opengraph-image','/favicon.ico','/Matthew_Labrador_Resume.pdf']);
const failures=[];
for(const page of pages){const response=await fetch(base+page);if(!response.ok){failures.push(page+' '+response.status);continue;}const html=await response.text();for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){const url=match[1].replaceAll('&amp;','&');if(url.startsWith('/')&&!url.startsWith('//'))urls.add(url.split('#')[0]);if(url.includes('github.com'))failures.push(page+' exposes repository link '+url);}}
const targets=[...urls];
for(let i=0;i<targets.length;i+=5){await Promise.all(targets.slice(i,i+5).map(async url=>{try{const response=await fetch(base+url,{method:'HEAD'});if(!response.ok)failures.push(url+' '+response.status);}catch(error){failures.push(url+' '+error.message);}}));}
const report={base,pages:pages.length,assetsAndLinks:targets.length,failures};
await fs.mkdir('artifacts',{recursive:true});await fs.writeFile(path.join('artifacts','link-check.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
