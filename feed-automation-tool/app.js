const $ = id => document.getElementById(id);
const state = { queue: JSON.parse(localStorage.getItem('feedflow.queue') || '[]'), image: null, current: null };
const canvas = $('feedCanvas');
const ctx = canvas.getContext('2d');
function save(){ localStorage.setItem('feedflow.queue', JSON.stringify(state.queue)); renderQueue(); }
function stripHtml(s){return (s||'').replace(/<[^>]*>/g,'').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'").trim();}
function splitLines(text, max){ const words=(text||'').split(/\s+/); const lines=[]; let line=''; words.forEach(w=>{ if((line+w).length>max){lines.push(line.trim()); line=w+' ';} else line+=w+' ';}); if(line.trim()) lines.push(line.trim()); return lines; }
function hashtags(tags, body){ const base=(tags||body).split(/[#,，,\s]+/).filter(Boolean).slice(0,12); const common=['오늘의기록','콘텐츠마케팅','인사이트','브랜드성장','피드자동화']; return [...new Set([...base,...common])].map(t=>'#'+t.replace(/[^가-힣a-zA-Z0-9_]/g,'')).join(' '); }
function makeCaption(post){ return `${post.title}\n\n${post.body}\n\n${hashtags(post.tags, post.body)}`; }
function draw(post){
  ctx.clearRect(0,0,1080,1080);
  const g=ctx.createLinearGradient(0,0,1080,1080); g.addColorStop(0,'#101827'); g.addColorStop(1,'#263b73'); ctx.fillStyle=g; ctx.fillRect(0,0,1080,1080);
  if(state.image){ ctx.globalAlpha=.28; ctx.drawImage(state.image,0,0,1080,1080); ctx.globalAlpha=1; }
  ctx.fillStyle='rgba(255,255,255,.10)'; ctx.fillRect(80,80,920,920); ctx.strokeStyle='rgba(255,255,255,.22)'; ctx.lineWidth=2; ctx.strokeRect(80,80,920,920);
  ctx.fillStyle='#6ee7f9'; ctx.font='700 30px system-ui'; ctx.fillText((post.tags||'DAILY FEED').split(',')[0].toUpperCase(),120,155);
  ctx.fillStyle='#fff'; ctx.font='800 76px system-ui'; splitLines(post.title,13).slice(0,3).forEach((l,i)=>ctx.fillText(l,120,280+i*88));
  ctx.fillStyle='rgba(255,255,255,.82)'; ctx.font='400 34px system-ui'; splitLines(post.body,24).slice(0,8).forEach((l,i)=>ctx.fillText(l,120,560+i*52));
  ctx.fillStyle='#fff'; ctx.font='700 26px system-ui'; ctx.fillText(new Date(post.schedule||Date.now()).toLocaleDateString('ko-KR'),120,940); ctx.fillText('FeedFlow Auto',780,940);
}
function getPost(){ return { id: crypto.randomUUID(), status:'Ready', title:stripHtml($('title').value), body:stripHtml($('body').value), tags:$('tags').value.trim(), schedule:$('schedule').value || new Date().toISOString().slice(0,16) }; }
$('imageInput').onchange=e=>{ const f=e.target.files[0]; if(!f)return; const img=new Image(); img.onload=()=>{state.image=img; if(state.current) draw(state.current)}; img.src=URL.createObjectURL(f); };
$('makePost').onclick=()=>{ const post=getPost(); if(!post.title||!post.body){alert('제목과 본문을 입력하세요.');return;} state.current=post; draw(post); $('caption').value=makeCaption(post); state.queue.unshift(post); save(); };
$('sampleBtn').onclick=()=>{ $('title').value='매일 피드를 올리지 못하는 이유'; $('body').value='콘텐츠가 부족해서가 아니라, 수집·기획·디자인·캡션 작성·예약 발행이 한 번에 연결되지 않기 때문입니다. 반복 작업은 자동화하고 사람은 메시지와 전략에 집중해야 합니다.'; $('tags').value='자동화,인스타그램,마케팅'; $('schedule').value=new Date(Date.now()+86400000).toISOString().slice(0,16); };
$('downloadImage').onclick=()=>{ const a=document.createElement('a'); a.download='feedflow-post.png'; a.href=canvas.toDataURL('image/png'); a.click(); };
$('copyCaption').onclick=async()=>{ await navigator.clipboard.writeText($('caption').value); alert('캡션을 복사했습니다.'); };
$('exportAll').onclick=()=>{ const blob=new Blob([JSON.stringify(state.queue,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.download='feedflow-backup.json'; a.href=URL.createObjectURL(blob); a.click(); };
$('importCsv').onclick=()=>{ const csv='title,body,tags,schedule\n샘플 제목,샘플 본문,자동화;마케팅,2026-06-23T20:00'; const a=document.createElement('a'); a.download='feedflow-template.csv'; a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.click(); };
$('clearQueue').onclick=()=>{ if(confirm('큐를 초기화할까요?')){state.queue=[];save();} };
function renderQueue(){ $('queue').innerHTML=state.queue.map(p=>`<tr><td>${p.status}</td><td>${p.schedule||''}</td><td>${p.title}</td><td>${p.tags||''}</td><td><button onclick="loadPost('${p.id}')">불러오기</button> <button onclick="markPub('${p.id}')">Published</button></td></tr>`).join(''); }
window.loadPost=id=>{ const p=state.queue.find(x=>x.id===id); if(!p)return; state.current=p; $('title').value=p.title; $('body').value=p.body; $('tags').value=p.tags; $('schedule').value=p.schedule; $('caption').value=makeCaption(p); draw(p); };
window.markPub=id=>{ const p=state.queue.find(x=>x.id===id); if(p){p.status='Published';save();} };
renderQueue(); $('sampleBtn').click(); state.current=getPost(); draw(state.current); $('caption').value=makeCaption(state.current);
