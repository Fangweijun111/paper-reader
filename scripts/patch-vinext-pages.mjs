// Compatibility workaround for the pinned vinext0.0.50 static exporter.
// Its App Router prerender proxy requests unprefixed paths from a server that
// enforces next.config.basePath, silently skipping every real page as a404.
// Prefix internal render requests, but keep output files at the artifact root.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(path.join(root,'web/package.json'));
const dist=path.dirname(require.resolve('vinext'));
const version=JSON.parse(fs.readFileSync(path.join(dist,'../package.json'),'utf8')).version;
if(version!=='0.0.50')throw Error('Review or remove the static-export workaround before changing vinext version.');
const file=path.join(dist,'build/prerender.js');
const source=fs.readFileSync(file,'utf8');
const old='const url = `${baseUrl}${parsed.pathname}${parsed.search}`;';
const replacement='const atlasBasePath = config.basePath || "";\n\t\t\tconst atlasRequestPath = atlasBasePath && parsed.pathname !== atlasBasePath && !parsed.pathname.startsWith(atlasBasePath + "/") ? atlasBasePath + parsed.pathname : parsed.pathname;\n\t\t\tconst url = `${baseUrl}${atlasRequestPath}${parsed.search}`;';
if(source.includes(replacement))console.log('vinext Pages workaround already applied.');
else {
  if(source.split(old).length!==2)throw Error('Unexpected upstream prerender implementation; refusing an unverified patch.');
  fs.writeFileSync(file,source.replace(old,replacement));
  console.log('Applied pinned vinext basePath prerender workaround.');
}
