import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const licenses=read('content-licenses.json');
const assets=read('public-asset-manifest.json');
const bySlug=new Map(licenses.map(r=>[r.slug,r]));
const errors=[];
const tracked=execFileSync('git',['-C',root,'ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
for(const p of tracked)if(/(^|\/)(node_modules|dist|\.openai|\.wrangler|\.vinext)(\/|$)/.test(p))errors.push('Tracked runtime/cache path: '+p);
if(bySlug.size!==licenses.length)errors.push('Duplicate paper license record');
for(const r of licenses){
  const full=r.decision==='include';
  if(full&&!['CC-BY-4.0','CC-BY-NC-SA-4.0'].includes(r.license_id))errors.push('Unreviewed full-text license: '+r.slug);
  for(const field of ['title','authors','source_url','license_url','license_id','note'])if(!r[field])errors.push('Missing '+field+': '+r.slug);
  const report=fs.readFileSync(path.join(root,`readings/${r.slug}/report.md`),'utf8');
  if((report.match(/^## \d+\./gm)||[]).length!==13)errors.push('Report must have13 chapters: '+r.slug);
  if(!full&&/!\[[^\]]*\]\(|<img\b/i.test(report))errors.push('Unlicensed copied report media: '+r.slug);
  if(!full&&fs.existsSync(path.join(root,`readings/${r.slug}/paper.md`)))errors.push('Unlicensed full-text companion: '+r.slug);
  const source=fs.readFileSync(path.join(root,r.content_paths[0]),'utf8');
  if(!full&&((source.match(/"english":/g)||[]).length!==1||!source.includes('Full text is not redistributed')))errors.push('Unlicensed reader text: '+r.slug);
}
const allowed=new Map(assets.map(a=>[a.path,a]));
for(const a of assets){
  if(bySlug.get(a.slug)?.decision!=='include')errors.push('Asset without permission: '+a.path);
  const file=path.join(root,a.path);
  if(!fs.existsSync(file)){errors.push('Missing asset: '+a.path);continue;}
  const bytes=fs.readFileSync(file);
  if(createHash('sha256').update(bytes).digest('hex')!==a.sha256)errors.push('Asset changed without review: '+a.path);
  if(bytes.length>=100*1024*1024)errors.push('Exceeds GitHub individual-file limit: '+a.path);
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const f of walk(path.join(root,'web/public'))){
  const rel=path.relative(root,f).split(path.sep).join('/');
  if(/\.(pdf|png|jpe?g|webp|gif|svg)$/i.test(f)&&rel!=='web/public/favicon.svg'&&!allowed.has(rel))errors.push('Unregistered public asset: '+rel);
}
if(fs.existsSync(path.join(root,'web/.openai')))errors.push('Private hosting metadata must not ship');
const sourceDirs=['web/app','readings'];
for(const dir of sourceDirs)for(const file of walk(path.join(root,dir))){
  if(!/\.(ts|tsx|json|md)$/.test(file))continue;
  const text=fs.readFileSync(file,'utf8');
  if(/\/Users\/|appgprj_[a-zA-Z0-9]+|github_pat_[a-zA-Z0-9]+|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/.test(text))errors.push('Private data pattern: '+path.relative(root,file));
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${licenses.length} reports; ${licenses.filter(r=>r.decision==='include').length} licensed full texts; ${assets.length} verified assets; no private hosting metadata.`);
