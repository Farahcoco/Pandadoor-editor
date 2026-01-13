let currentStep=1,currentMode='A',currentStyleTab='preset',currentStyle='catgate',currentScheme='morandi',currentLength='medium',blocks=[],editingImageIndex=null,materials={},imagePrompts={},fullArticleSyncTimeout=null;

const schemes={morandi:{primary:'#9b8b7d',text:'#5a5a5a',textLight:'#777',bgWarm:'#f7f5f3',bgWarmEnd:'#efe9e4',bgCard:'#f7f5f3',border:'#c4b5a5'},green:{primary:'#5d8a66',text:'#3d4a3f',textLight:'#666',bgWarm:'#f4f9f5',bgWarmEnd:'#e8f2ea',bgCard:'#f4f9f5',border:'#7eb085'},purple:{primary:'#8b7eb8',text:'#4a4558',textLight:'#666',bgWarm:'#f8f6fc',bgWarmEnd:'#f0ecf8',bgCard:'#f8f6fc',border:'#a99cd1'},milktea:{primary:'#a67c52',text:'#4d4035',textLight:'#6d5d4d',bgWarm:'#faf6f1',bgWarmEnd:'#f5ebe0',bgCard:'#faf6f1',border:'#c9a77c'},blackgold:{primary:'#c9a962',text:'#333',textLight:'#555',bgWarm:'#f9f8f5',bgWarmEnd:'#f3f0e8',bgCard:'#f9f8f5',border:'#c9a962'},coral:{primary:'#e07a5f',text:'#4a4a4a',textLight:'#666',bgWarm:'#fef7f5',bgWarmEnd:'#fceee9',bgCard:'#fef7f5',border:'#f2a07b'}};

const blockTypeNames={paragraph:'段落',emphasis:'强调',quote:'金句',heading:'标题',list:'列表',divider:'分割线',image:'图片',imagePlaceholder:'图片建议'};

const styleDescriptions={catgate:'专业有深度但不晦涩，像一位值得信赖的朋友在分享见解。有心理学专业底蕴，善于用日常例子解释复杂概念，让读者既有收获感又觉得亲切。金句有洞察力，能让人「原来如此」。',lemon:'轻松活泼、年轻化、有趣味，像和好朋友聊天一样自然。善用比喻、类比和网络用语，让专业内容也变得平易近人。',healing:'温暖治愈、共情感强、情感向。像一杯热可可，让读者感到被理解和抚慰。善于捕捉细腻的情感，文字有疗愈力量。',hardcore:'硬核干货、专业深度、信息密集。逻辑严谨，论据扎实，适合想深入学习的读者。每一段都有实打实的知识点。',story:'故事驱动、案例丰富、叙事感强。用真实或典型的故事来传递观点，让读者在故事中自然领悟。',mimeng:'情绪张力强、观点犀利、短句为主。每一句都有冲击力，让读者忍不住点头或转发。善用对比、反转、悬念。',kaizhi:'认知科学视角、信息密度高、有学术底蕴、逻辑严密。引用研究和理论，但表达清晰易懂，适合求知欲强的读者。',zhihu:'逻辑清晰、论据充分、专业可信、结构化强。像一篇精心组织的回答，先抛结论再展开论证。',lifestyle:'精致美学、有品味、不说教、生活化。文字有质感，传递一种理想生活的向往，让人心生向往。'};

const materialTypes=[{id:'pyq_author',name:'朋友圈（作者版）',icon:'📱'},{id:'pyq_assistant',name:'朋友圈（转发版）',icon:'📱'},{id:'xiaohongshu',name:'小红书文案',icon:'📕'},{id:'xhs_titles',name:'小红书标题',icon:'📕'},{id:'community',name:'社群转发话术',icon:'👥'},{id:'private',name:'私聊推荐话术',icon:'💬'},{id:'titles',name:'文章标题备选',icon:'📰'},{id:'audience',name:'目标人群画像',icon:'🎯'},{id:'quotes',name:'金句卡片文案',icon:'💎'},{id:'video',name:'短视频口播文案',icon:'🎬'},{id:'secondary',name:'次条/转载版',icon:'📄'},{id:'seo',name:'SEO关键词',icon:'🔍'}];

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}

function goToStep(step){
  if(step===2){generatePrompt();updateMaterialInputDesc()}
  if(step===4&&blocks.length>0){document.getElementById('imagePromptsCard').style.display='block'}
  currentStep=step;
  document.querySelectorAll('.step-panel').forEach(p=>p.classList.remove('active'));
  document.querySelector('.step-panel[data-step="'+step+'"]').classList.add('active');
  document.querySelectorAll('.step-tab').forEach(t=>{
    t.classList.remove('active','done');
    const s=parseInt(t.dataset.step);
    if(s<step)t.classList.add('done');
    if(s===step)t.classList.add('active');
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

function selectMode(mode){
  currentMode=mode;
  document.querySelectorAll('.mode-card').forEach(c=>c.classList.toggle('active',c.dataset.mode===mode));
  document.getElementById('styleSection').classList.toggle('hidden',mode==='A');
}

function switchStyleTab(tab){
  currentStyleTab=tab;
  document.querySelectorAll('.style-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.style-panel').forEach(p=>p.classList.toggle('hidden',p.dataset.panel!==tab));
}

function selectStyle(style){
  currentStyle=style;
  document.querySelectorAll('.style-option').forEach(o=>o.classList.toggle('active',o.dataset.style===style));
}

function selectLength(len){
  currentLength=len;
  document.querySelectorAll('.length-btn').forEach(b=>b.classList.toggle('active',b.dataset.len===len));
}

function updateMaterialInputDesc(){
  const desc=document.getElementById('materialInputDesc'),input=document.getElementById('userMaterialInput');
  const placeholders={
    A:['把你已写好的文章粘贴到下方','在这里粘贴你已写好的完整文章...'],
    B:['输入你的主题、想法或灵感','在这里输入你想写的主题或想法...\n\n例如：\n- 为什么越努力越焦虑？\n- 如何在信息过载时代保持专注'],
    C:['粘贴你的长素材（逐字稿、笔记等）','在这里粘贴你的长素材，如课程逐字稿、播客文字稿、会议记录等...'],
    D:['粘贴你收集的多个素材片段','在这里粘贴你收集的素材片段...\n\n用 ===素材分隔=== 分隔不同的素材']
  };
  desc.textContent=placeholders[currentMode][0];
  input.placeholder=placeholders[currentMode][1];
}

function updateMaterialWordCount(){
  const text=document.getElementById('userMaterialInput').value;
  document.getElementById('materialWordCount').textContent=text.replace(/\s/g,'').length+' 字';
  generatePrompt();
}

function clearMaterialInput(){document.getElementById('userMaterialInput').value='';updateMaterialWordCount()}

function generatePrompt(){
  const userMaterial=document.getElementById('userMaterialInput')?.value?.trim()||'';
  let prompt='';
  const styleDesc=currentStyleTab==='custom'?document.getElementById('customStyleInput')?.value||'专业但易读':styleDescriptions[currentStyle]||'';
  const lenReq=currentLength==='auto'?'根据主题复杂度自动决定长度':currentLength==='short'?'800-1200字':currentLength==='long'?'3000-4000字':'1500-2500字';
  const lenLimit=currentLength==='auto'?'最终字数根据主题复杂度自动决定':`最终字数控制在${lenReq}`;
  const lenFinal=currentLength==='auto'?'最终字数根据主题复杂度自动决定':`最终字数${lenReq}`;

  if(currentMode==='A'){
    prompt=`你是一位资深公众号排版编辑，请帮我优化文章的排版格式。

## 你需要做的事

1. **提炼金句**（每篇3-5句）
   - 用 \`>\` 标记
   - 好金句的标准：有洞察、反常识、能引发共鸣、让人想截图分享
   - 金句可长可短，关键是要有力量，不要为了短而丢失意义
   - 示例：> 我们焦虑的不是未来，而是对未来的想象。

2. **标记强调**
   - 用 \`**文字**\` 标记关键概念、重要术语
   - 每段最多1-2处，不要过度强调

3. **添加小标题**
   - 用 \`## 标题\` 标记
   - 划分文章的大结构，通常3-5个

4. **插入分割线**
   - 用 \`---\` 标记
   - 放在主题转换处，每篇2-4处

5. **处理列表**
   - 用 \`- 列表项\` 标记
   - 3个以上并列项时使用

6. **建议配图位置**
   - 用 \`![图片](建议：描述)\` 标记
   - 每600-800字建议一张
   - 放在主题转换或情感高潮处
   - 描述要具体，便于配图
   - 示例：![图片](建议：一个人在窗边看雨，安静思考的画面)

## 格式规则（非常重要）

- 金句（>）后面不能紧跟另一个金句，中间要有正文
- 标题（##）后面不能紧跟另一个标题
- 保留原文所有核心信息
- 长段落拆成短段落（每段3-5句）

## 我的文章

[把你的文章粘贴在这里]

---
请直接输出处理后的文章，不要解释。`;
  }
  else if(currentMode==='B'){
    prompt=`你是一位资深公众号爆款写手，请根据我给的主题创作一篇高质量文章。

## 文章风格
${styleDesc}

## 文章要求
1. 字数：${lenReq}
2. 开头3秒抓住读者（用故事、问题、反常识观点等）
3. 每300-400字要有一个「爽点」或「共鸣点」
4. 金句要有洞察力，让人想截图分享
5. 结尾要有行动号召或情感升华

## 输出格式（必须严格遵守）

用以下Markdown格式输出：

- \`> 金句\` — 有洞察、有力量的句子，每篇4-6句
- \`**强调**\` — 关键词强调
- \`## 小标题\` — 划分结构，3-5个
- \`---\` — 分割线，放在主题转换处
- \`- 列表项\` — 并列内容
- \`![图片](建议：具体描述)\` — 配图建议，每600字一张

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 图片建议要有具体描述，比如「建议：一个年轻人在咖啡馆专注工作」

## 我的主题

[在这里输入你的主题或想法]

---
请直接输出完整文章，不要解释。`;
  }
  else if(currentMode==='C'){
    prompt=`你是一位资深内容编辑，请从我的长素材中提炼出一篇精华文章。

## 文章风格
${styleDesc}

## 提炼原则
1. 找出素材中最有价值的3-5个核心观点
2. 删除重复、跑题、口语化的部分
3. 重新组织结构，让逻辑更清晰
4. 保留精彩的案例和金句
5. ${lenLimit}

## 输出格式（必须严格遵守）

用以下Markdown格式输出：

- \`> 金句\` — 从原文提炼或改写，要有洞察力
- \`**强调**\` — 关键概念
- \`## 小标题\` — 划分结构
- \`---\` — 分割线
- \`- 列表项\` — 并列内容
- \`![图片](建议：具体描述)\` — 配图建议，每600字一张

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 图片建议要写清楚具体场景

## 我的原始素材

[把你的逐字稿/笔记粘贴在这里]

---
请直接输出提炼后的文章，不要解释。`;
  }
  else{
    prompt=`你是一位资深内容创作者，请帮我把多个素材整合成一篇原创文章。

## 文章风格
${styleDesc}

## 整合原则（避免抄袭）
1. 理解每个素材的【核心观点】，而非照搬表达
2. 用【全新的语言】重新阐述
3. 融入我自己的视角进行评论和延伸
4. 重新设计文章结构
5. ${lenFinal}

## 输出格式（必须严格遵守）

用以下Markdown格式输出：

- \`> 金句\` — 必须是原创表达，有洞察力
- \`**强调**\` — 关键概念
- \`## 小标题\` — 划分结构
- \`---\` — 分割线
- \`- 列表项\` — 并列内容
- \`![图片](建议：具体描述)\` — 配图建议，每600字一张

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续

## 我的素材片段

[把你收集的各种素材粘贴在这里，用 --- 分隔不同素材]

## 我的视角/想强调的观点（可选）

[如果有你自己的观点想融入，写在这里]

---
请直接输出原创文章，不要解释。`;
  }

  document.getElementById('promptText').textContent=prompt;
}

function copyPrompt(){navigator.clipboard.writeText(document.getElementById('promptText').textContent).then(()=>showToast('✅ 提示词已复制'))}
function copyAndJump(url){navigator.clipboard.writeText(document.getElementById('promptText').textContent).then(()=>{showToast('✅ 已复制，正在跳转...');setTimeout(()=>window.open(url,'_blank'),300)})}

function updateWordCount(){const text=document.getElementById('inputText').value;document.getElementById('wordCount').textContent=text.replace(/\s/g,'').length+' 字'}

function parseContent(){
  const text=document.getElementById('inputText').value.trim();
  if(!text){showToast('⚠️ 请先粘贴内容');return}

  // 提取配图提示词
  const imgPromptMatch=text.match(/===配图提示词===([\s\S]*?)$/);
  if(imgPromptMatch){
    const imgSection=imgPromptMatch[1];
    imagePrompts={
      cover:(imgSection.match(/【公众号封面图】\s*([\s\S]*?)(?=【|$)/)||[])[1]?.trim()||'',
      xhsCover:(imgSection.match(/【小红书封面图】\s*([\s\S]*?)(?=【|$)/)||[])[1]?.trim()||'',
      social:(imgSection.match(/【朋友圈配图】\s*([\s\S]*?)(?=【|$)/)||[])[1]?.trim()||'',
      quoteCard:(imgSection.match(/【金句卡片背景】\s*([\s\S]*?)(?=【|$)/)||[])[1]?.trim()||''
    };
    document.getElementById('coverImagePrompt').textContent=imagePrompts.cover||'未找到';
    document.getElementById('xhsCoverImagePrompt').textContent=imagePrompts.xhsCover||'未找到';
    document.getElementById('socialImagePrompt').textContent=imagePrompts.social||'未找到';
    document.getElementById('quoteCardImagePrompt').textContent=imagePrompts.quoteCard||'未找到';
  }

  // 提取正文部分
  let articleText=text.replace(/===配图提示词===[\s\S]*$/,'').trim();

  blocks=[];
  const lines=articleText.split('\n');
  let i=0;
  while(i<lines.length){
    const line=lines[i].trim();
    if(!line){i++;continue}
    
    if(line==='---'||line==='***'||line==='___'){blocks.push({type:'divider',content:''});i++;continue}
    if(line.startsWith('## ')){blocks.push({type:'heading',content:line.slice(3)});i++;continue}
    if(line.startsWith('> ')){blocks.push({type:'quote',content:line.slice(2)});i++;continue}
    
    const imgMatch=line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if(imgMatch){
      const desc=imgMatch[1]||imgMatch[2];
      const src=imgMatch[2];
      if(src.startsWith('http')||src.startsWith('data:')){
        blocks.push({type:'image',content:src});
      }else{
        // 为配图建议生成英文提示词
        const imgPrompt=generateImagePromptFromDesc(desc);
        blocks.push({type:'imagePlaceholder',content:desc,imgPrompt:imgPrompt});
      }
      i++;continue;
    }
    
    if(line.startsWith('- ')||line.startsWith('* ')){
      let listItems=[line.slice(2)];
      while(i+1<lines.length&&(lines[i+1].trim().startsWith('- ')||lines[i+1].trim().startsWith('* '))){i++;listItems.push(lines[i].trim().slice(2))}
      blocks.push({type:'list',content:listItems.join('\n')});i++;continue
    }
    
    blocks.push({type:'paragraph',content:line});i++;
  }

  document.getElementById('inputCard').style.display='none';
  document.getElementById('editorSection').style.display='grid';
  renderBlocks();
  updateFullArticleText();
  updatePreview();
  showToast('✅ 解析完成，共'+blocks.length+'个模块');
}

// 根据中文描述生成英文图片提示词
function generateImagePromptFromDesc(desc){
  // 基础风格
  const baseStyle='soft lighting, editorial photography style, high quality, 4k';
  // 简单翻译常见词汇
  const translations={
    '背影':'back view, silhouette',
    '十字路口':'crossroads, intersection',
    '犹豫':'hesitant, contemplative',
    '阳光':'sunlight, golden hour',
    '温暖':'warm, cozy',
    '孤独':'solitary, alone',
    '自由':'freedom, free spirit',
    '思考':'thinking, contemplative',
    '成长':'growth, personal development',
    '希望':'hope, hopeful',
    '夜晚':'night, evening',
    '城市':'city, urban',
    '自然':'nature, natural',
    '书籍':'books, reading',
    '咖啡':'coffee, cafe'
  };
  
  let englishDesc=desc;
  for(const[cn,en] of Object.entries(translations)){
    if(desc.includes(cn)){
      englishDesc=en+', '+englishDesc.replace(cn,'');
    }
  }
  
  return `${englishDesc}, ${baseStyle} --ar 16:9`;
}

function showInputCard(){document.getElementById('inputCard').style.display='block';document.getElementById('editorSection').style.display='none'}

function updateFullArticleText(){
  const fullText=blocks.map(b=>{
    switch(b.type){
      case'heading':return '## '+b.content;
      case'quote':return '> '+b.content;
      case'divider':return '---';
      case'list':return b.content.split('\n').map(item=>'- '+item).join('\n');
      case'imagePlaceholder':return '![配图]('+b.content+')';
      case'image':return '![图片]('+b.content+')';
      case'emphasis':return '**'+b.content+'**';
      default:return b.content;
    }
  }).join('\n\n');
  document.getElementById('fullArticleText').value=fullText;
}

function onFullArticleInput(){clearTimeout(fullArticleSyncTimeout);fullArticleSyncTimeout=setTimeout(syncFromFullArticle,1000)}

function syncFromFullArticle(){
  const text=document.getElementById('fullArticleText').value;
  document.getElementById('inputText').value=text;
  parseContentSilent(text);
}

function parseContentSilent(text){
  let articleText=text.replace(/===配图提示词===[\s\S]*$/,'').trim();
  blocks=[];
  const lines=articleText.split('\n');
  let i=0;
  while(i<lines.length){
    const line=lines[i].trim();
    if(!line){i++;continue}
    if(line==='---'||line==='***'||line==='___'){blocks.push({type:'divider',content:''});i++;continue}
    if(line.startsWith('## ')){blocks.push({type:'heading',content:line.slice(3)});i++;continue}
    if(line.startsWith('> ')){blocks.push({type:'quote',content:line.slice(2)});i++;continue}
    const imgMatch=line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if(imgMatch){
      const desc=imgMatch[1]||imgMatch[2];
      const src=imgMatch[2];
      if(src.startsWith('http')||src.startsWith('data:')){
        blocks.push({type:'image',content:src});
      }else{
        const imgPrompt=generateImagePromptFromDesc(desc);
        blocks.push({type:'imagePlaceholder',content:desc,imgPrompt:imgPrompt});
      }
      i++;continue;
    }
    if(line.startsWith('- ')||line.startsWith('* ')){
      let listItems=[line.slice(2)];
      while(i+1<lines.length&&(lines[i+1].trim().startsWith('- ')||lines[i+1].trim().startsWith('* '))){i++;listItems.push(lines[i].trim().slice(2))}
      blocks.push({type:'list',content:listItems.join('\n')});i++;continue
    }
    blocks.push({type:'paragraph',content:line});i++;
  }
  renderBlocks();
  updatePreview();
}

function renderBlocks(){
  const container=document.getElementById('blocksList');
  if(!blocks.length){container.innerHTML='<div style="text-align:center;color:#999;padding:40px">暂无内容</div>';document.getElementById('blockCount').textContent='(0)';return}
  
  container.innerHTML=blocks.map((b,i)=>{
    const typeOpts=Object.entries(blockTypeNames).map(([v,l])=>'<option value="'+v+'"'+(b.type===v?' selected':'')+'>'+l+'</option>').join('');
    let content='';
    
    if(b.type==='divider'){
      content='<div class="divider-preview">· · ·</div>';
    }else if(b.type==='image'){
      content='<input type="text" class="block-input" value="'+(b.content||'')+'" onchange="updateBlock('+i+', this.value)" onblur="updateAll()">';
    }else if(b.type==='imagePlaceholder'){
      // 显示配图建议和生成提示词
      content=`<div class="img-placeholder">
        <div class="img-placeholder-text">📷 ${b.content}</div>
        ${b.imgPrompt?'<div class="img-placeholder-prompt">💡 生成提示词：'+b.imgPrompt+'</div>':''}
        <div class="img-placeholder-actions">
          ${b.imgPrompt?'<button class="btn btn-secondary btn-sm" onclick="copyImgPrompt('+i+')">复制提示词</button>':''}
          <button class="btn btn-secondary btn-sm" onclick="openImageModalFor('+i+')">上传图片</button>
        </div>
      </div>`;
    }else{
      content='<textarea class="block-input" onchange="updateBlock('+i+', this.value)" onblur="updateAll()">'+(b.content||'')+'</textarea>';
    }
    
    return `<div class="block-item">
      <div class="block-head">
        <select class="block-type-sel" onchange="changeBlockType(${i}, this.value)">${typeOpts}</select>
        <div class="block-actions">
          <button class="block-act-btn" onclick="moveBlock(${i}, -1)">↑</button>
          <button class="block-act-btn" onclick="moveBlock(${i}, 1)">↓</button>
          <button class="block-act-btn img" onclick="insertImageAfter(${i})" title="插入图片">🖼</button>
          <button class="block-act-btn del" onclick="deleteBlock(${i})">×</button>
        </div>
      </div>
      <div class="block-body">${content}</div>
    </div>`;
  }).join('');
  
  document.getElementById('blockCount').textContent='('+blocks.length+')';
}

function copyImgPrompt(i){
  const prompt=blocks[i]?.imgPrompt||'';
  if(prompt){
    navigator.clipboard.writeText(prompt).then(()=>showToast('✅ 提示词已复制'));
  }
}

function insertImageAfter(i){
  editingImageIndex=i+1;
  document.getElementById('imageUrlInput').value='';
  document.getElementById('imageModal').classList.add('show');
}

function updateBlock(i,v){blocks[i].content=v}
function updateAll(){updatePreview();updateFullArticleText()}
function changeBlockType(i,t){blocks[i].type=t;renderBlocks();updateAll()}
function moveBlock(i,dir){const j=i+dir;if(j<0||j>=blocks.length)return;[blocks[i],blocks[j]]=[blocks[j],blocks[i]];renderBlocks();updateAll()}
function deleteBlock(i){blocks.splice(i,1);renderBlocks();updateAll()}
function addBlock(type){blocks.push({type,content:'',imgPrompt:''});renderBlocks();updateAll()}
function openImageModalFor(i){editingImageIndex=i;document.getElementById('imageUrlInput').value='';document.getElementById('imageModal').classList.add('show')}
function closeImageModal(){document.getElementById('imageModal').classList.remove('show');editingImageIndex=null}

function confirmImage(){
  const url=document.getElementById('imageUrlInput').value.trim();
  if(editingImageIndex!==null&&url){
    if(blocks[editingImageIndex]?.type==='imagePlaceholder'||blocks[editingImageIndex]?.type==='image'){
      blocks[editingImageIndex]={type:'image',content:url};
    }else{
      blocks.splice(editingImageIndex,0,{type:'image',content:url});
    }
    renderBlocks();updateAll();closeImageModal();showToast('✅ 图片已添加');
  }
}

function handleImageUpload(e){const file=e.target.files[0];if(file){const reader=new FileReader();reader.onload=ev=>{document.getElementById('imageUrlInput').value=ev.target.result};reader.readAsDataURL(file)}}

function updatePreview(){
  const container=document.getElementById('previewContent');
  if(!blocks.length){container.innerHTML='<div style="text-align:center;color:#999;padding:40px">预览内容</div>';return}
  container.innerHTML=blocks.map(b=>generateBlockHTML(b)).join('');
}

function generateBlockHTML(block){
  const s=schemes[currentScheme];
  switch(block.type){
    case'paragraph':
      let p=(block.content||'').replace(/\*\*([^*]+)\*\*/g,'<strong style="color:'+s.primary+';">$1</strong>').replace(/\n/g,'<br>');
      return '<p style="font-size:15px;color:'+s.text+';line-height:2;margin-bottom:20px;">'+p+'</p>';
    case'emphasis':
      return '<p style="font-size:15px;color:'+s.text+';line-height:2;margin-bottom:20px;"><strong style="color:'+s.primary+';">'+(block.content||'')+'</strong></p>';
    case'heading':
      return '<p style="font-size:17px;color:'+s.primary+';font-weight:600;margin:28px 0 16px;">'+(block.content||'')+'</p>';
    case'divider':
      return '<p style="text-align:center;color:'+s.border+';margin:28px 0;letter-spacing:8px;">···</p>';
    case'quote':
      const len=(block.content||'').length;
      if(len<=40)return '<p style="font-size:17px;color:'+s.primary+';line-height:1.8;margin:28px 0;text-align:center;font-weight:600;">'+block.content+'</p>';
      return '<section style="background:linear-gradient(135deg,'+s.bgWarm+','+s.bgWarmEnd+');border-left:3px solid '+s.primary+';padding:18px 20px;margin:24px 0;border-radius:0 10px 10px 0;"><p style="font-size:15px;color:'+s.primary+';line-height:1.9;margin:0;font-weight:500;">'+(block.content||'').replace(/\n/g,'<br>')+'</p></section>';
    case'list':
      const items=(block.content||'').split('\n').filter(x=>x.trim());
      return '<section style="background:'+s.bgCard+';padding:18px 20px;margin:24px 0;border-radius:10px;border:1px solid '+s.border+';">'+items.map(item=>'<p style="font-size:14px;color:'+s.textLight+';line-height:2;margin-bottom:8px;padding-left:16px;position:relative;"><span style="position:absolute;left:0;color:'+s.primary+';">→</span>'+item+'</p>').join('')+'</section>';
    case'image':
      return block.content?'<p style="text-align:center;margin:24px 0;"><img src="'+block.content+'" style="max-width:100%;border-radius:10px;"></p>':'';
    case'imagePlaceholder':
      return '<p style="text-align:center;margin:24px 0;padding:28px;background:#fafafa;border-radius:10px;color:#999;font-size:13px;border:1px dashed #ddd;">📷 '+(block.content||'建议插入图片')+'</p>';
    default:
      return '';
  }
}

function generateFullCode(){return blocks.filter(b=>b.type!=='imagePlaceholder').map(b=>generateBlockHTML(b)).join('')}
function copyAllCode(){const code=generateFullCode();if(!code){showToast('⚠️ 无内容');return}navigator.clipboard.writeText(code).then(()=>showToast('✅ 代码已复制'))}

function generateMaterials(){
  const articleSummary=blocks.filter(b=>['paragraph','quote','heading'].includes(b.type)).map(b=>b.content).join('\n').substring(0,2000);
  if(!articleSummary.trim()){showToast('⚠️ 请先在步骤3完成文章排版');return}

  const prompt=`你是一位资深新媒体运营专家，请根据以下公众号文章内容，生成全套营销物料。

## 文章内容
${articleSummary}

## 请生成以下12种物料

【朋友圈（作者版）】
要求：第一人称，有个人感悟，引发好奇，150字以内，带emoji

【朋友圈（转发版）】
要求：第三人称推荐，突出文章价值，引导点击，150字以内

【小红书文案】
要求：口语化、有网感、带话题标签、分段清晰、300字左右

【小红书标题】
要求：5个备选，有数字、有情绪词、有痛点、控制在20字内

【社群转发话术】
要求：适合微信群分享，简洁有力，100字以内

【私聊推荐话术】
要求：像朋友推荐，自然不营销，80字以内

【文章标题备选】
要求：8个不同风格——悬念型、数字型、痛点型、好奇型、共鸣型等

【目标人群画像】
要求：3-5类最适合阅读的人群，包括特征和痛点

【金句卡片文案】
要求：5条，每条15-30字，适合做成图片

【短视频口播文案】
要求：开头有钩子，300字左右，适合1分钟短视频

【次条/转载版】
要求：100字简介+核心看点

【SEO关键词】
要求：10-15个搜索关键词，包括长尾词

---
请按以上格式输出，每个类别用【类别名】标注，内容紧跟其后。`;

  document.getElementById('materialsPrompt').textContent=prompt;
  showToast('✅ 物料提示词已生成');
}

function copyMaterialsPrompt(){navigator.clipboard.writeText(document.getElementById('materialsPrompt').textContent).then(()=>showToast('✅ 已复制'))}
function copyMaterialsAndJump(url){navigator.clipboard.writeText(document.getElementById('materialsPrompt').textContent).then(()=>{showToast('✅ 已复制');setTimeout(()=>window.open(url,'_blank'),300)})}

function parseMaterials(){
  const text=document.getElementById('materialsInput').value.trim();
  if(!text){showToast('⚠️ 请先粘贴物料内容');return}
  
  materials={};
  materialTypes.forEach(mt=>{
    const regex=new RegExp('【'+mt.name+'】\\s*([\\s\\S]*?)(?=【|$)');
    const match=text.match(regex);
    if(match)materials[mt.id]=match[1].trim();
  });
  
  renderMaterials();
  showToast('✅ 物料解析完成');
}

function renderMaterials(){
  const grid=document.getElementById('materialsGrid');
  grid.innerHTML=materialTypes.map(mt=>{
    const content=materials[mt.id]||'';
    return `<div class="material-card">
      <div class="material-header">
        <div class="material-title">${mt.icon} ${mt.name}</div>
        <button class="btn btn-sm btn-outline" onclick="copyMaterial('${mt.id}')">复制</button>
      </div>
      <div class="material-content">
        <textarea onchange="materials['${mt.id}']=this.value">${content}</textarea>
      </div>
    </div>`;
  }).join('');
}

function copyMaterial(id){
  const content=materials[id]||'';
  if(content){navigator.clipboard.writeText(content).then(()=>showToast('✅ 已复制'))}else{showToast('⚠️ 无内容')}
}

function copyImagePrompt(type){
  const prompt=imagePrompts[type]||'';
  if(prompt){navigator.clipboard.writeText(prompt).then(()=>showToast('✅ 已复制'))}else{showToast('⚠️ 无内容')}
}

function exportAll(){
  let content='# 猫门智能排版器导出\n\n';
  content+='## 排版后的文章代码\n\n```html\n'+generateFullCode()+'\n```\n\n';
  if(Object.keys(imagePrompts).length){
    content+='## 配图提示词\n\n';
    if(imagePrompts.cover)content+='### 公众号封面图\n'+imagePrompts.cover+'\n\n';
    if(imagePrompts.xhsCover)content+='### 小红书封面图\n'+imagePrompts.xhsCover+'\n\n';
    if(imagePrompts.social)content+='### 朋友圈配图\n'+imagePrompts.social+'\n\n';
    if(imagePrompts.quoteCard)content+='### 金句卡片背景\n'+imagePrompts.quoteCard+'\n\n';
  }
  if(Object.keys(materials).length){
    content+='## 营销物料\n\n';
    materialTypes.forEach(mt=>{if(materials[mt.id])content+='### '+mt.name+'\n'+materials[mt.id]+'\n\n'});
  }
  navigator.clipboard.writeText(content).then(()=>showToast('✅ 全部内容已复制到剪贴板'));
}

// 初始化配色选择
document.querySelectorAll('.color-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.color-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentScheme=btn.dataset.scheme;
    updatePreview();
  });
});

// 点击遮罩关闭模态框
document.querySelectorAll('.modal-overlay').forEach(o=>{o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('show')})});

generatePrompt();
