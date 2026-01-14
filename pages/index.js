import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

const schemes = {
  morandi: {
    primary: '#9b8b7d',
    text: '#5a5a5a',
    textLight: '#777',
    bgWarm: '#f7f5f3',
    bgWarmEnd: '#efe9e4',
    bgCard: '#f7f5f3',
    border: '#c4b5a5'
  },
  green: {
    primary: '#5d8a66',
    text: '#3d4a3f',
    textLight: '#666',
    bgWarm: '#f4f9f5',
    bgWarmEnd: '#e8f2ea',
    bgCard: '#f4f9f5',
    border: '#7eb085'
  },
  purple: {
    primary: '#8b7eb8',
    text: '#4a4558',
    textLight: '#666',
    bgWarm: '#f8f6fc',
    bgWarmEnd: '#f0ecf8',
    bgCard: '#f8f6fc',
    border: '#a99cd1'
  },
  milktea: {
    primary: '#a67c52',
    text: '#4d4035',
    textLight: '#6d5d4d',
    bgWarm: '#faf6f1',
    bgWarmEnd: '#f5ebe0',
    bgCard: '#faf6f1',
    border: '#c9a77c'
  },
  blackgold: {
    primary: '#c9a962',
    text: '#333',
    textLight: '#555',
    bgWarm: '#f9f8f5',
    bgWarmEnd: '#f3f0e8',
    bgCard: '#f9f8f5',
    border: '#c9a962'
  },
  coral: {
    primary: '#e07a5f',
    text: '#4a4a4a',
    textLight: '#666',
    bgWarm: '#fef7f5',
    bgWarmEnd: '#fceee9',
    bgCard: '#fef7f5',
    border: '#f2a07b'
  }
};

const blockTypeOptions = [
  { id: 'paragraph', name: '段落' },
  { id: 'emphasis', name: '强调' },
  { id: 'quote', name: '金句' },
  { id: 'heading', name: '标题' },
  { id: 'list', name: '列表' },
  { id: 'divider', name: '分割线' },
  { id: 'image', name: '图片' },
  { id: 'imagePlaceholder', name: '图片建议' }
];

const styleDescriptions = {
  catgate:
    '专业有深度但不晦涩，像一位值得信赖的朋友在分享见解。有心理学专业底蕴，善于用日常例子解释复杂概念，让读者既有收获感又觉得亲切。金句有洞察力，能让人「原来如此」。',
  lemon:
    '轻松活泼、年轻化、有趣味，像和好朋友聊天一样自然。善用比喻、类比和网络用语，让专业内容也变得平易近人。',
  healing:
    '温暖治愈、共情感强、情感向。像一杯热可可，让读者感到被理解和抚慰。善于捕捉细腻的情感，文字有疗愈力量。',
  hardcore:
    '硬核干货、专业深度、信息密集。逻辑严谨，论据扎实，适合想深入学习的读者。每一段都有实打实的知识点。',
  story:
    '故事驱动、案例丰富、叙事感强。用真实或典型的故事来传递观点，让读者在故事中自然领悟。',
  mimeng:
    '情绪张力强、观点犀利、短句为主。每一句都有冲击力，让读者忍不住点头或转发。善用对比、反转、悬念。',
  kaizhi:
    '认知科学视角、信息密度高、有学术底蕴、逻辑严密。引用研究和理论，但表达清晰易懂，适合求知欲强的读者。',
  zhihu: '逻辑清晰、论据充分、专业可信、结构化强。像一篇精心组织的回答，先抛结论再展开论证。',
  lifestyle: '精致美学、有品味、不说教、生活化。文字有质感，传递一种理想生活的向往，让人心生向往。'
};

const materialTypes = [
  { id: 'pyq_author', name: '朋友圈（作者版）', icon: '📱' },
  { id: 'pyq_assistant', name: '朋友圈（转发版）', icon: '📱' },
  { id: 'xiaohongshu', name: '小红书文案', icon: '📕' },
  { id: 'xhs_titles', name: '小红书标题', icon: '📕' },
  { id: 'community', name: '社群转发话术', icon: '👥' },
  { id: 'private', name: '私聊推荐话术', icon: '💬' },
  { id: 'titles', name: '文章标题备选', icon: '📰' },
  { id: 'audience', name: '目标人群画像', icon: '🎯' },
  { id: 'quotes', name: '金句卡片文案', icon: '💎' },
  { id: 'video', name: '短视频口播文案', icon: '🎬' },
  { id: 'secondary', name: '次条/转载版', icon: '📄' },
  { id: 'seo', name: 'SEO关键词', icon: '🔍' }
];

const modeOptions = [
  {
    id: 'A',
    title: '📝 模式A：已有文章',
    desc: '我已经写好了一篇文章，想让AI帮我优化排版、找出金句、添加配图建议'
  },
  {
    id: 'B',
    title: '💡 模式B：主题创作',
    desc: '我有一个主题或想法，想让AI帮我从零写一篇爆款文章'
  },
  {
    id: 'C',
    title: '📚 模式C：长素材提炼',
    desc: '我有逐字稿/笔记等长素材，想让AI帮我提炼成精华文章'
  },
  {
    id: 'D',
    title: '🧩 模式D：素材整合',
    desc: '我收集了多个素材片段，想让AI帮我整合成一篇原创文章'
  }
];

const styleOptions = [
  { id: 'catgate', title: '🐱 猫门风格', desc: '专业有深度但不晦涩' },
  { id: 'lemon', title: '🍋 柠檬心理', desc: '轻松活泼、年轻化' },
  { id: 'healing', title: '🌿 治愈系', desc: '温暖治愈、共情感强' },
  { id: 'hardcore', title: '💪 硬核干货', desc: '信息密集、专业深度' },
  { id: 'story', title: '📖 故事驱动', desc: '案例丰富、叙事感强' },
  { id: 'mimeng', title: '⚡ 情绪张力', desc: '观点犀利、短句为主' },
  { id: 'kaizhi', title: '🧠 认知科学', desc: '学术底蕴、逻辑严密' },
  { id: 'zhihu', title: '🔍 知乎体', desc: '论据充分、结构化强' },
  { id: 'lifestyle', title: '✨ 生活美学', desc: '精致有品味、不说教' }
];

const lengthOptions = [
  { id: 'short', label: '短文 800-1200字' },
  { id: 'medium', label: '中等 1500-2500字' },
  { id: 'long', label: '长文 3000-4000字' },
  { id: 'auto', label: '自动判断' }
];

const materialPlaceholders = {
  A: ['把你已写好的文章粘贴到下方', '在这里粘贴你已写好的完整文章...'],
  B: [
    '输入你的主题、想法或灵感',
    '在这里输入你想写的主题或想法...\n\n例如：\n- 为什么越努力越焦虑？\n- 如何在信息过载时代保持专注'
  ],
  C: ['粘贴你的长素材（逐字稿、笔记等）', '在这里粘贴你的长素材，如课程逐字稿、播客文字稿、会议记录等...'],
  D: ['粘贴你收集的多个素材片段', '在这里粘贴你收集的素材片段...\n\n用 ===素材分隔=== 分隔不同的素材']
};

const materialPromptPlaceholders = {
  A: '[把你的文章粘贴在这里]',
  B: '[在这里输入你的主题或想法]',
  C: '[把你的逐字稿/笔记粘贴在这里]',
  D: '[把你收集的各种素材粘贴在这里，用 --- 分隔不同素材]'
};

const imagePromptOutputSpec = `## 输出要求
1. 先输出完整文章
2. 在文章末尾追加配图提示词，必须严格使用以下格式（英文提示词）：

===配图提示词===
【公众号封面图】
(英文 Midjourney 提示词，2.35:1 横版，概括文章主题且吸引点击)

【小红书封面图】
(英文提示词，3:4 竖版，年轻化、有吸引力)

【朋友圈配图】
(英文提示词，1:1 方形，氛围感强)

【金句卡片背景】
(英文提示词，简洁干净的背景，适合放文字)

提示：提示词请包含场景/主体/情绪/光线/风格，不要中文，不要解释。`;

function getLengthLabels(currentLength) {
  const lenReq =
    currentLength === 'auto'
      ? '根据主题复杂度自动决定长度'
      : currentLength === 'short'
        ? '800-1200字'
        : currentLength === 'long'
          ? '3000-4000字'
          : '1500-2500字';
  const lenLimit =
    currentLength === 'auto' ? '最终字数根据主题复杂度自动决定' : `最终字数控制在${lenReq}`;
  const lenFinal = currentLength === 'auto' ? '最终字数根据主题复杂度自动决定' : `最终字数${lenReq}`;
  return { lenReq, lenLimit, lenFinal };
}

function generatePromptText({ currentMode, styleDesc, lenReq, lenLimit, lenFinal }) {
  if (currentMode === 'A') {
    return `你是一位资深公众号排版编辑，请帮我优化文章的排版格式。

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
   - 每600-800字建议一张，放在主题转换或情感高潮处
   - **描述必须包含**：场景环境 + 人物状态 + 情绪氛围 + 光线色调
   - 描述要具体生动，能让人脑海中浮现画面
   - 好的示例：
     - ![图片](建议：深夜书房，一个人蜷缩在台灯下，周围堆满书本和咖啡杯，暖黄灯光映照疲惫但专注的侧脸)
     - ![图片](建议：清晨公园长椅，阳光穿过树叶洒下斑驳光影，一个人闭眼微笑，享受片刻宁静)
     - ![图片](建议：拥挤地铁车厢，一个人戴着耳机望向窗外，车窗倒映城市霓虹，神情若有所思)
   - 坏的示例（太笼统）：![图片](建议：一个人在思考) ❌

## 格式规则（非常重要）

- 金句（>）后面不能紧跟另一个金句，中间要有正文
- 标题（##）后面不能紧跟另一个标题
- 保留原文所有核心信息
- 长段落拆成短段落（每段3-5句）

## 我的文章

[把你的文章粘贴在这里]

${imagePromptOutputSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
  }

  if (currentMode === 'B') {
    return `你是一位资深公众号爆款写手，请根据我给的主题创作一篇高质量文章。

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
- \`![图片](建议：详细描述)\` — 配图建议，每600字一张

## 配图描述要求（非常重要）
图片描述必须包含4个要素：**场景环境 + 人物状态 + 情绪氛围 + 光线色调**

好的配图描述示例：
- ![图片](建议：深夜卧室，一个人躺在床上辗转难眠，窗外城市灯光模糊，蓝色月光洒在疲惫却清醒的脸上)
- ![图片](建议：阳光明媚的咖啡馆角落，一个人专注看书，咖啡杯冒着热气，暖色调营造惬意氛围)
- ![图片](建议：雨天公交站，一个人撑伞独自等待，玻璃上雨滴滑落，灰蓝色调传递淡淡忧伤)

配图风格要与文章风格一致：
- 治愈系文章 → 温暖柔和的光线、自然场景、舒适氛围
- 情绪张力文章 → 对比强烈的光影、都市场景、戏剧性构图
- 干货类文章 → 简洁专业的环境、专注工作状态、明亮色调

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 禁止使用笼统描述如「一个人在思考」「美丽的风景」

## 我的主题

[在这里输入你的主题或想法]

${imagePromptOutputSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
  }

  if (currentMode === 'C') {
    return `你是一位资深内容编辑，请从我的长素材中提炼出一篇精华文章。

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
- \`![图片](建议：详细描述)\` — 配图建议，每600字一张

## 配图描述要求（非常重要）
图片描述必须包含4个要素：**场景环境 + 人物状态 + 情绪氛围 + 光线色调**

好的配图描述示例：
- ![图片](建议：明亮的会议室，一群人围坐讨论，白板上画满思维导图，专注而热烈的氛围)
- ![图片](建议：安静的图书馆一角，阳光斜照进来，一个人埋头做笔记，周围书籍环绕)
- ![图片](建议：傍晚的办公室，一个人对着电脑屏幕，窗外夕阳余晖，既疲惫又有成就感)

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 禁止使用笼统描述如「一个人在学习」「工作场景」

## 我的原始素材

[把你的逐字稿/笔记粘贴在这里]

${imagePromptOutputSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
  }

  return `你是一位资深内容创作者，请帮我把多个素材整合成一篇原创文章。

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
- \`![图片](建议：详细描述)\` — 配图建议，每600字一张

## 配图描述要求（非常重要）
图片描述必须包含4个要素：**场景环境 + 人物状态 + 情绪氛围 + 光线色调**

好的配图描述示例：
- ![图片](建议：清晨窗边，一个人端着咖啡望向远方，薄雾笼罩城市，柔和的晨光带来希望感)
- ![图片](建议：深夜书桌，笔记本上密密麻麻的字迹，一只手握着笔停顿，台灯投下温暖光圈)
- ![图片](建议：人来人往的街头，一个人驻足抬头看天，周围人群模糊，阳光穿透云层)

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 禁止使用笼统描述如「美好的画面」「温馨场景」

## 我的素材片段

[把你收集的各种素材粘贴在这里，用 --- 分隔不同素材]

## 我的视角/想强调的观点（可选）

[如果有你自己的观点想融入，写在这里]

${imagePromptOutputSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
}

function generateImagePromptFromDesc(desc) {
  const baseStyle = 'soft lighting, editorial photography style, high quality, 4k';
  const translations = {
    // 场景环境
    深夜: 'late night, midnight',
    清晨: 'early morning, dawn',
    傍晚: 'evening, dusk, golden hour',
    夜晚: 'night, evening',
    书房: 'study room, home office',
    卧室: 'bedroom, cozy room',
    咖啡馆: 'coffee shop, cafe',
    咖啡: 'coffee, cafe',
    办公室: 'office, workspace',
    图书馆: 'library, reading room',
    公园: 'park, outdoor',
    街头: 'street, urban scene',
    地铁: 'subway, metro',
    公交站: 'bus stop, station',
    窗边: 'by the window, window side',
    // 人物状态
    背影: 'back view, silhouette',
    侧脸: 'side profile, profile view',
    闭眼: 'eyes closed, peaceful',
    微笑: 'smiling, gentle smile',
    沉思: 'deep in thought, pensive',
    思考: 'thinking, contemplative',
    专注: 'focused, concentrated',
    疲惫: 'tired, exhausted',
    孤独: 'solitary, alone',
    等待: 'waiting, anticipating',
    // 情绪氛围
    温暖: 'warm, cozy',
    宁静: 'peaceful, serene',
    忧伤: 'melancholy, sad',
    希望: 'hope, hopeful',
    焦虑: 'anxious, worried',
    自由: 'freedom, free spirit',
    治愈: 'healing, soothing',
    犹豫: 'hesitant, uncertain',
    // 光线色调
    阳光: 'sunlight, golden hour',
    暖光: 'warm light, warm tone',
    冷调: 'cool tone, blue hour',
    柔和: 'soft, gentle',
    斑驳: 'dappled light, mottled shadows',
    霓虹: 'neon lights, city lights',
    台灯: 'desk lamp, warm lamp light',
    月光: 'moonlight, lunar glow',
    // 其他元素
    城市: 'city, urban',
    自然: 'nature, natural',
    书籍: 'books, reading',
    雨天: 'rainy day, rain',
    十字路口: 'crossroads, intersection',
    成长: 'growth, personal development'
  };
  let englishDesc = desc;
  Object.entries(translations).forEach(([cn, en]) => {
    if (desc.includes(cn)) {
      englishDesc = `${en}, ${englishDesc.replace(cn, '')}`;
    }
  });
  return `${englishDesc}, ${baseStyle} --ar 16:9`;
}

function splitImagePromptSection(text) {
  const match = text.match(/===\s*配图提示词\s*===([\s\S]*?)$/);
  if (!match) {
    return { articleText: text.trim(), imagePrompts: {} };
  }
  const imgSection = match[1];
  return {
    articleText: text.replace(/===\s*配图提示词\s*===[\s\S]*$/, '').trim(),
    imagePrompts: {
      cover: (imgSection.match(/【公众号封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
      xhsCover: (imgSection.match(/【小红书封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
      social: (imgSection.match(/【朋友圈配图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
      quoteCard: (imgSection.match(/【金句卡片背景】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || ''
    }
  };
}

function extractImagePrompts(text) {
  if (!text) return {};
  const { imagePrompts } = splitImagePromptSection(text);
  if (Object.keys(imagePrompts).some((key) => imagePrompts[key])) return imagePrompts;
  if (!/【公众号封面图】|【小红书封面图】|【朋友圈配图】|【金句卡片背景】/.test(text)) {
    return {};
  }
  return {
    cover: (text.match(/【公众号封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    xhsCover: (text.match(/【小红书封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    social: (text.match(/【朋友圈配图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    quoteCard: (text.match(/【金句卡片背景】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || ''
  };
}

function parseBlocksFromText(text) {
  const lines = text.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;

    if (line === '---' || line === '***' || line === '___') {
      result.push({ type: 'divider', content: '' });
      continue;
    }

    if (/^#{2,4}\s+/.test(line)) {
      result.push({ type: 'heading', content: line.replace(/^#{2,4}\s+/, '') });
      continue;
    }

    if (line.startsWith('> ')) {
      const rawQuote = line.slice(2).trim();
      const cleanedQuote = rawQuote.replace(/^金句\s*[-—–:：]?\s*/i, '').trim();
      result.push({ type: 'quote', content: cleanedQuote });
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const src = imgMatch[2];
      if (src.startsWith('http') || src.startsWith('data:')) {
        result.push({ type: 'image', content: src });
      } else {
        // For image placeholders, extract description from parentheses content
        // Remove "建议：" or "建议:" prefix if present
        let desc = src;
        if (desc.startsWith('建议：') || desc.startsWith('建议:')) {
          desc = desc.replace(/^建议[：:]/, '').trim();
        }
        // If no meaningful description, fall back to alt text
        if (!desc) {
          desc = imgMatch[1] || '配图';
        }
        const imgPrompt = generateImagePromptFromDesc(desc);
        result.push({ type: 'imagePlaceholder', content: desc, imgPrompt });
      }
      continue;
    }

    if (line.startsWith('![图片建议：') && line.endsWith(']')) {
      const desc = line.slice('![图片建议：'.length, -1).trim();
      result.push({ type: 'imagePlaceholder', content: desc, imgPrompt: generateImagePromptFromDesc(desc) });
      continue;
    }

    const looseImageMatch = line.match(/[！!]*[\\[【［]?配图\\d*[\\(（]([^\\)）]+)[\\)）]/);
    if (looseImageMatch) {
      const desc = looseImageMatch[1].trim();
      result.push({ type: 'imagePlaceholder', content: desc, imgPrompt: generateImagePromptFromDesc(desc) });
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = [line.slice(2)];
      while (i + 1 < lines.length && (lines[i + 1].trim().startsWith('- ') || lines[i + 1].trim().startsWith('* '))) {
        i += 1;
        listItems.push(lines[i].trim().slice(2));
      }
      result.push({ type: 'list', content: listItems.join('\n') });
      continue;
    }

    result.push({ type: 'paragraph', content: line });
  }
  return result;
}

function buildFullArticleText(blocks) {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading':
          return `## ${b.content || ''}`;
        case 'quote':
          return `> ${b.content || ''}`;
        case 'divider':
          return '---';
        case 'list':
          return (b.content || '')
            .split('\n')
            .map((item) => `- ${item}`)
            .join('\n');
        case 'imagePlaceholder':
          return `![配图](${b.content || ''})`;
        case 'image':
          return `![图片](${b.content || ''})`;
        case 'emphasis':
          return `**${b.content || ''}**`;
        default:
          return b.content || '';
      }
    })
    .join('\n\n');
}

function generateBlockHTML(block, schemeKey) {
  const s = schemes[schemeKey];
  const formatInlineText = (text) =>
    (text || '').replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${s.primary};">$1</strong>`);
  switch (block.type) {
    case 'paragraph': {
      const p = formatInlineText(block.content).replace(/\n/g, '<br>');
      return `<p style="font-size:15px;color:${s.text};line-height:2;margin-bottom:20px;">${p}</p>`;
    }
    case 'emphasis':
      return `<p style="font-size:15px;color:${s.text};line-height:2;margin-bottom:20px;"><strong style="color:${s.primary};">${block.content || ''}</strong></p>`;
    case 'heading':
      return `<p style="font-size:17px;color:${s.primary};font-weight:600;margin:28px 0 16px;">${formatInlineText(block.content)}</p>`;
    case 'divider':
      return `<p style="text-align:center;color:${s.border};margin:28px 0;letter-spacing:8px;">···</p>`;
    case 'quote': {
      const len = (block.content || '').length;
      if (len <= 40) {
        return `<p style="font-size:17px;color:${s.primary};line-height:1.8;margin:28px 0;text-align:center;font-weight:600;">${formatInlineText(block.content)}</p>`;
      }
      return `<section style="background:linear-gradient(135deg,${s.bgWarm},${s.bgWarmEnd});border-left:3px solid ${s.primary};padding:18px 20px;margin:24px 0;border-radius:0 10px 10px 0;"><p style="font-size:15px;color:${s.primary};line-height:1.9;margin:0;font-weight:500;">${formatInlineText(block.content).replace(/\n/g, '<br>')}</p></section>`;
    }
    case 'list': {
      const items = (block.content || '')
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item)
        .filter((item) => item.replace(/[*_]+/g, '').trim());
      return `<section style="background:${s.bgCard};padding:18px 20px;margin:24px 0;border-radius:10px;border:1px solid ${s.border};">${items
        .map(
          (item) =>
            `<p style="font-size:14px;color:${s.textLight};line-height:2;margin-bottom:8px;padding-left:16px;position:relative;"><span style="position:absolute;left:0;color:${s.primary};">→</span>${formatInlineText(item)}</p>`
        )
        .join('')}</section>`;
    }
    case 'image':
      return block.content
        ? `<p style="text-align:center;margin:24px 0;"><img src="${block.content}" style="max-width:100%;border-radius:10px;"></p>`
        : '';
    case 'imagePlaceholder':
      return `<p style="text-align:center;margin:24px 0;padding:28px;background:#fafafa;border-radius:10px;color:#999;font-size:13px;border:1px dashed #ddd;">📷 ${block.content || '建议插入图片'}</p>`;
    default:
      return '';
  }
}

function readClipboardImage(items, onLoad) {
  if (!items) return false;
  const imageItem = Array.from(items).find((item) => item.type && item.type.startsWith('image/'));
  if (!imageItem) return false;
  const file = imageItem.getAsFile();
  if (!file) return false;
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target?.result) onLoad(event.target.result);
  };
  reader.readAsDataURL(file);
  return true;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentMode, setCurrentMode] = useState('A');
  const [currentStyleTab, setCurrentStyleTab] = useState('preset');
  const [currentStyle, setCurrentStyle] = useState('catgate');
  const [currentScheme, setCurrentScheme] = useState('morandi');
  const [currentLength, setCurrentLength] = useState('medium');

  const [userMaterialInput, setUserMaterialInput] = useState('');
  const [savedMaterialInput, setSavedMaterialInput] = useState('');
  const [inputText, setInputText] = useState('');
  const [fullArticleText, setFullArticleText] = useState('');
  const [customStyleInput, setCustomStyleInput] = useState('');

  const [blocks, setBlocks] = useState([]);
  const [imagePrompts, setImagePrompts] = useState({});
  const [materialsPrompt, setMaterialsPrompt] = useState('点击上方按钮生成营销物料提示词...');
  const [materialsInput, setMaterialsInput] = useState('');
  const [materials, setMaterials] = useState({});
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [showToastState, setShowToastState] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [editingImageIndex, setEditingImageIndex] = useState(null);

  const toastTimerRef = useRef(null);
  const fullArticleTimerRef = useRef(null);
  const skipFullTextSyncRef = useRef(false);
  const modalPasteHandlerRef = useRef(null);

  const { lenReq, lenLimit, lenFinal } = useMemo(() => getLengthLabels(currentLength), [currentLength]);
  const styleDesc = useMemo(() => {
    if (currentStyleTab === 'custom') {
      return customStyleInput || '专业但易读';
    }
    return styleDescriptions[currentStyle] || '';
  }, [currentStyleTab, currentStyle, customStyleInput]);

  const promptText = useMemo(() => {
    const basePrompt = generatePromptText({ currentMode, styleDesc, lenReq, lenLimit, lenFinal });
    if (!savedMaterialInput) return basePrompt;
    const placeholder = materialPromptPlaceholders[currentMode];
    if (!placeholder || !basePrompt.includes(placeholder)) return basePrompt;
    return basePrompt.replace(placeholder, savedMaterialInput);
  }, [currentMode, styleDesc, lenReq, lenLimit, lenFinal, savedMaterialInput]);

  const materialInputDesc = materialPlaceholders[currentMode][0];
  const materialInputPlaceholder = materialPlaceholders[currentMode][1];

  const materialWordCount = useMemo(() => userMaterialInput.replace(/\s/g, '').length, [userMaterialInput]);
  const wordCount = useMemo(() => inputText.replace(/\s/g, '').length, [inputText]);

  const previewHtml = useMemo(() => {
    if (!blocks.length) {
      return '<div style="text-align:center;color:#999;padding:40px">预览内容</div>';
    }
    return blocks.map((b) => generateBlockHTML(b, currentScheme)).join('');
  }, [blocks, currentScheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (skipFullTextSyncRef.current) {
      skipFullTextSyncRef.current = false;
      return;
    }
    skipFullTextSyncRef.current = true;
    if (!blocks.length) {
      setFullArticleText('');
      return;
    }
    setFullArticleText(buildFullArticleText(blocks));
  }, [blocks]);

  useEffect(() => {
    if (skipFullTextSyncRef.current) {
      skipFullTextSyncRef.current = false;
      return;
    }
    if (!editorVisible) return;
    if (fullArticleTimerRef.current) {
      clearTimeout(fullArticleTimerRef.current);
    }
    fullArticleTimerRef.current = setTimeout(() => {
      syncFromFullArticle();
    }, 1000);
    return () => clearTimeout(fullArticleTimerRef.current);
  }, [fullArticleText, editorVisible]);

  useEffect(() => {
    if (!showImageModal) {
      if (modalPasteHandlerRef.current) {
        window.removeEventListener('paste', modalPasteHandlerRef.current);
        modalPasteHandlerRef.current = null;
      }
      return;
    }
    const handler = (event) => {
      const consumed = readClipboardImage(event.clipboardData?.items, (dataUrl) => {
        setImageUrlInput(dataUrl);
        showToast('✅ 已粘贴图片');
      });
      if (consumed) event.preventDefault();
    };
    modalPasteHandlerRef.current = handler;
    window.addEventListener('paste', handler);
    return () => {
      if (modalPasteHandlerRef.current) {
        window.removeEventListener('paste', modalPasteHandlerRef.current);
        modalPasteHandlerRef.current = null;
      }
    };
  }, [showImageModal]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setShowToastState(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToastState(false), 2500);
  };

  const saveMaterialInput = () => {
    const text = userMaterialInput.trim();
    if (!text) {
      showToast('⚠️ 请先填写内容再保存');
      return;
    }
    setSavedMaterialInput(text);
    showToast('✅ 已保存并同步提示词');
  };

  const clearMaterialInput = () => {
    setUserMaterialInput('');
    setSavedMaterialInput('');
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    if (step === 4 && blocks.length > 0) {
      generateMaterials();
    }
    if (step === 4) {
      const extracted = extractImagePrompts(inputText);
      if (Object.keys(extracted).some((key) => extracted[key])) {
        setImagePrompts(extracted);
      }
    }
  };

  const parseContent = () => {
    const text = inputText.trim();
    if (!text) {
      showToast('⚠️ 请先粘贴内容');
      return;
    }
    const { articleText, imagePrompts: extractedPrompts } = splitImagePromptSection(text);
    const parsedBlocks = parseBlocksFromText(articleText);
    setBlocks(parsedBlocks);
    setImagePrompts(extractedPrompts);
    setEditorVisible(true);
    setMaterialsVisible(false);
    skipFullTextSyncRef.current = false;
    showToast(`✅ 解析完成，共${parsedBlocks.length}个模块`);
  };

  const parseContentSilent = (text) => {
    const articleText = text.replace(/===配图提示词===[\s\S]*$/, '').trim();
    const parsedBlocks = parseBlocksFromText(articleText);
    setBlocks(parsedBlocks);
  };

  const syncFromFullArticle = () => {
    skipFullTextSyncRef.current = true;
    setInputText(fullArticleText);
    parseContentSilent(fullArticleText);
  };

  const updateBlockContent = (index, value) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, content: value } : b)));
  };

  const updateBlockType = (index, type) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, type } : b)));
  };

  const moveBlock = (index, delta) => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const deleteBlock = (index) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const addBlock = (type) => {
    setBlocks((prev) => [...prev, { type, content: '', imgPrompt: '' }]);
  };

  const openImageModalFor = (index, insertAfter) => {
    setEditingImageIndex(insertAfter ? index + 1 : index);
    setImageUrlInput('');
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setEditingImageIndex(null);
  };

  const confirmImage = () => {
    const url = imageUrlInput.trim();
    if (editingImageIndex === null || !url) return;
    setBlocks((prev) => {
      const next = [...prev];
      if (next[editingImageIndex]?.type === 'imagePlaceholder' || next[editingImageIndex]?.type === 'image') {
        next[editingImageIndex] = { type: 'image', content: url };
      } else {
        next.splice(editingImageIndex, 0, { type: 'image', content: url });
      }
      return next;
    });
    closeImageModal();
    showToast('✅ 图片已添加');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageUrlInput(ev.target?.result || '');
    };
    reader.readAsDataURL(file);
  };

  const handleImagePaste = (event) => {
    const consumed = readClipboardImage(event.clipboardData?.items, (dataUrl) => {
      setImageUrlInput(dataUrl);
      showToast('✅ 已粘贴图片');
    });
    if (consumed) event.preventDefault();
  };

  const handleBlockImagePaste = (event, index, convertToImage = false) => {
    const consumed = readClipboardImage(event.clipboardData?.items, (dataUrl) => {
      if (convertToImage) {
        setBlocks((prev) => prev.map((b, i) => (i === index ? { type: 'image', content: dataUrl } : b)));
      } else {
        updateBlockContent(index, dataUrl);
      }
      showToast('✅ 已粘贴图片');
    });
    if (consumed) event.preventDefault();
  };

  const copyToClipboard = (text, toastText) => {
    if (!text) {
      showToast('⚠️ 无内容');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      if (toastText) showToast(toastText);
    });
  };

  const copyPrompt = () => copyToClipboard(promptText, '✅ 提示词已复制');

  const copyAndJump = (url) => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText).then(() => {
      showToast('✅ 已复制，正在跳转...');
      setTimeout(() => window.open(url, '_blank'), 300);
    });
  };

  const generateMaterials = () => {
    const articleSummary = blocks
      .filter((b) => ['paragraph', 'quote', 'heading'].includes(b.type))
      .map((b) => b.content)
      .join('\n')
      .substring(0, 2000);
    if (!articleSummary.trim()) {
      showToast('⚠️ 请先在步骤3完成文章排版');
      return;
    }
    const prompt = `你是一位资深新媒体运营专家，请根据以下公众号文章内容，生成全套营销物料。

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
    setMaterialsPrompt(prompt);
    showToast('✅ 物料提示词已生成');
  };

  const copyMaterialsPrompt = () => copyToClipboard(materialsPrompt, '✅ 已复制');

  const copyMaterialsAndJump = (url) => {
    if (!materialsPrompt) return;
    navigator.clipboard.writeText(materialsPrompt).then(() => {
      showToast('✅ 已复制');
      setTimeout(() => window.open(url, '_blank'), 300);
    });
  };

  const parseMaterials = () => {
    const text = materialsInput.trim();
    if (!text) {
      showToast('⚠️ 请先粘贴物料内容');
      return;
    }
    const nextMaterials = {};
    materialTypes.forEach((mt) => {
      const regex = new RegExp(`【${mt.name}】\\s*([\\s\\S]*?)(?=【|$)`);
      const match = text.match(regex);
      if (match) nextMaterials[mt.id] = match[1].trim();
    });
    setMaterials(nextMaterials);
    setMaterialsVisible(true);
    showToast('✅ 物料解析完成');
  };

  const copyMaterial = (id) => {
    const content = materials[id] || '';
    copyToClipboard(content, '✅ 已复制');
  };

  const copyImgPrompt = (index) => {
    const prompt = blocks[index]?.imgPrompt || '';
    copyToClipboard(prompt, '✅ 提示词已复制');
  };

  const copyImagePrompt = (type) => {
    const prompt = imagePrompts[type] || '';
    copyToClipboard(prompt, '✅ 已复制');
  };

  const generateFullCode = () =>
    blocks
      .filter((b) => b.type !== 'imagePlaceholder')
      .map((b) => generateBlockHTML(b, currentScheme))
      .join('');

  const copyAllCode = () => {
    const code = generateFullCode();
    if (!code) {
      showToast('⚠️ 无内容');
      return;
    }
    copyToClipboard(code, '✅ 代码已复制');
  };

  const exportAll = () => {
    let content = '# 猫门智能排版器导出\n\n';
    content += `## 排版后的文章代码\n\n\`\`\`html\n${generateFullCode()}\n\`\`\`\n\n`;
    if (Object.keys(imagePrompts).length) {
      content += '## 配图提示词\n\n';
      if (imagePrompts.cover) content += `### 公众号封面图\n${imagePrompts.cover}\n\n`;
      if (imagePrompts.xhsCover) content += `### 小红书封面图\n${imagePrompts.xhsCover}\n\n`;
      if (imagePrompts.social) content += `### 朋友圈配图\n${imagePrompts.social}\n\n`;
      if (imagePrompts.quoteCard) content += `### 金句卡片背景\n${imagePrompts.quoteCard}\n\n`;
    }
    if (Object.keys(materials).length) {
      content += '## 营销物料\n\n';
      materialTypes.forEach((mt) => {
        if (materials[mt.id]) content += `### ${mt.name}\n${materials[mt.id]}\n\n`;
      });
    }
    copyToClipboard(content, '✅ 全部内容已复制到剪贴板');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>猫门智能排版器 v9-fix</title>
      </Head>

      <div className="container">
        <div className="header">
          <h1>🐱 猫门智能排版器</h1>
          <p>v9-fix · 让公众号排版优雅高效</p>
        </div>

        <div className="steps-bar">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`step-tab${currentStep === step ? ' active' : ''}${currentStep > step ? ' done' : ''}`}
              data-step={step}
              onClick={() => goToStep(step)}
            >
              {step === 1 && '① 选择模式'}
              {step === 2 && '② 生成提示词'}
              {step === 3 && '③ 编辑排版'}
              {step === 4 && '④ 营销物料'}
            </div>
          ))}
        </div>

        <div className={`step-panel${currentStep === 1 ? ' active' : ''}`} data-step="1">
          <div className="card">
            <div className="card-header">
              <div className="card-title">🎯 选择你的创作模式</div>
            </div>
            <div className="card-body">
              <div className="mode-cards">
                {modeOptions.map((mode) => (
                  <div
                    key={mode.id}
                    className={`mode-card${currentMode === mode.id ? ' active' : ''}`}
                    data-mode={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                  >
                    <h3>{mode.title}</h3>
                    <p>{mode.desc}</p>
                  </div>
                ))}
              </div>

              <div id="styleSection" className={`style-section${currentMode === 'A' ? ' hidden' : ''}`}>
                <div className="style-tabs">
                  <div
                    className={`style-tab${currentStyleTab === 'preset' ? ' active' : ''}`}
                    data-tab="preset"
                    onClick={() => setCurrentStyleTab('preset')}
                  >
                    预设风格
                  </div>
                  <div
                    className={`style-tab${currentStyleTab === 'custom' ? ' active' : ''}`}
                    data-tab="custom"
                    onClick={() => setCurrentStyleTab('custom')}
                  >
                    自定义风格
                  </div>
                </div>

                <div className={`style-panel${currentStyleTab === 'preset' ? ' active' : ' hidden'}`} data-panel="preset">
                  <div className="style-options">
                    {styleOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className={`style-option${currentStyle === opt.id ? ' active' : ''}`}
                        data-style={opt.id}
                        onClick={() => setCurrentStyle(opt.id)}
                      >
                        <h4>{opt.title}</h4>
                        <p>{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`style-panel${currentStyleTab === 'custom' ? ' active' : ' hidden'}`} data-panel="custom">
                  <textarea
                    className="textarea-box"
                    id="customStyleInput"
                    placeholder="描述你想要的写作风格，例如：像和老朋友聊天一样自然，有洞察但不说教，适当用比喻让抽象概念更易懂..."
                    style={{ minHeight: 120 }}
                    value={customStyleInput}
                    onChange={(e) => setCustomStyleInput(e.target.value)}
                  />
                </div>

                <div id="lengthSection" className="length-section">
                  <label className="length-label">📏 文章长度</label>
                  <div className="length-options">
                    {lengthOptions.map((opt) => (
                      <button
                        key={opt.id}
                        className={`length-btn${currentLength === opt.id ? ' active' : ''}`}
                        data-len={opt.id}
                        onClick={() => setCurrentLength(opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-row">
            <div />
            <button className="btn btn-primary" onClick={() => goToStep(2)}>
              下一步：生成提示词 →
            </button>
          </div>
        </div>

        <div className={`step-panel${currentStep === 2 ? ' active' : ''}`} data-step="2">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                📋 <span id="materialInputDesc">{materialInputDesc}</span>
              </div>
            </div>
            <div className="card-body">
              <textarea
                className="textarea-box"
                id="userMaterialInput"
                placeholder={materialInputPlaceholder}
                value={userMaterialInput}
                onChange={(e) => setUserMaterialInput(e.target.value)}
              />
              <div className="textarea-footer">
                <span id="materialWordCount">{materialWordCount} 字</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={saveMaterialInput}
                >
                  保存
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={clearMaterialInput}
                >
                  清空
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">✨ AI提示词</div>
              <button className="btn btn-sm btn-outline" onClick={copyPrompt}>
                📋 复制
              </button>
            </div>
            <div className="card-body">
              <div className="prompt-box">
                <pre id="promptText">{promptText || '提示词将在这里生成...'}</pre>
              </div>
              <div className="ai-buttons">
                <button className="ai-btn" onClick={() => copyAndJump('https://claude.ai')}>
                  🤖 Claude
                </button>
                <button className="ai-btn" onClick={() => copyAndJump('https://chat.openai.com')}>
                  💬 ChatGPT
                </button>
                <button className="ai-btn" onClick={() => copyAndJump('https://gemini.google.com/')}
                >
                  ✨ Gemini
                </button>
                <button className="ai-btn" onClick={() => copyAndJump('https://kimi.moonshot.cn')}>
                  🌙 Kimi
                </button>
                <button className="ai-btn" onClick={() => copyAndJump('https://www.doubao.com/chat/')}
                >
                  🔥 豆包
                </button>
              </div>
            </div>
          </div>
          <div className="nav-row">
            <button className="btn btn-secondary" onClick={() => goToStep(1)}>
              ← 返回选择
            </button>
            <button className="btn btn-primary" onClick={() => goToStep(3)}>
              下一步：编辑排版 →
            </button>
          </div>
        </div>

        <div className={`step-panel${currentStep === 3 ? ' active' : ''}`} data-step="3">
          <div className="card" id="inputCard" style={{ display: editorVisible ? 'none' : 'block' }}>
            <div className="card-header">
              <div className="card-title">📥 粘贴AI返回的内容</div>
            </div>
            <div className="card-body">
              <textarea
                className="textarea-box"
                id="inputText"
                placeholder="把AI生成的完整内容粘贴到这里（包括文章和配图提示词）..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="textarea-footer">
                <span id="wordCount">{wordCount} 字</span>
                <button className="btn btn-accent" onClick={parseContent}>
                  🚀 智能解析
                </button>
              </div>
            </div>
          </div>

          <div className="editor-layout" id="editorSection" style={{ display: editorVisible ? 'grid' : 'none' }}>
            <div>
              <div className="full-article-editor">
                <div className="full-article-header">
                  <div className="full-article-title">📝 完整文章（可直接编辑）</div>
                  <button className="btn btn-sm btn-outline" onClick={syncFromFullArticle}>
                    同步到模块
                  </button>
                </div>
                <textarea
                  className="full-article-textarea"
                  id="fullArticleText"
                  placeholder="在这里编辑完整文章..."
                  value={fullArticleText}
                  onChange={(e) => setFullArticleText(e.target.value)}
                />
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    📦 内容模块 <span id="blockCount">({blocks.length})</span>
                  </div>
                  <button className="btn btn-sm btn-outline" onClick={() => setEditorVisible(false)}>
                    重新粘贴
                  </button>
                </div>
                <div className="blocks-list" id="blocksList">
                  {!blocks.length ? (
                    <div style={{ textAlign: 'center', color: '#999', padding: 40 }}>暂无内容</div>
                  ) : (
                    blocks.map((block, index) => (
                      <div className="block-item" key={`${block.type}-${index}`}>
                        <div className="block-head">
                          <select
                            className="block-type-sel"
                            value={block.type}
                            onChange={(e) => updateBlockType(index, e.target.value)}
                          >
                            {blockTypeOptions.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.name}
                              </option>
                            ))}
                          </select>
                          <div className="block-actions">
                            <button className="block-act-btn" onClick={() => moveBlock(index, -1)}>
                              ↑
                            </button>
                            <button className="block-act-btn" onClick={() => moveBlock(index, 1)}>
                              ↓
                            </button>
                            <button
                              className="block-act-btn img"
                              title="插入图片"
                              onClick={() => openImageModalFor(index, true)}
                            >
                              🖼
                            </button>
                            <button className="block-act-btn del" onClick={() => deleteBlock(index)}>
                              ×
                            </button>
                          </div>
                        </div>
                        <div className="block-body">
                          {block.type === 'divider' && <div className="divider-preview">· · ·</div>}
                          {block.type === 'image' && (
                            <input
                              type="text"
                              className="block-input"
                              value={block.content || ''}
                              onChange={(e) => updateBlockContent(index, e.target.value)}
                              onPaste={(e) => handleBlockImagePaste(e, index)}
                            />
                          )}
                          {block.type === 'imagePlaceholder' && (
                            <div
                              className="img-placeholder"
                              tabIndex={0}
                              onClick={(e) => e.currentTarget.focus()}
                              onPaste={(e) => handleBlockImagePaste(e, index, true)}
                            >
                              <div className="img-placeholder-text">
                                📷 {block.content || '建议插入图片'}（可直接粘贴截图）
                              </div>
                              {block.imgPrompt && (
                                <div className="img-placeholder-prompt">💡 生成提示词：{block.imgPrompt}</div>
                              )}
                              <div className="img-placeholder-actions">
                                {block.imgPrompt && (
                                  <button className="btn btn-secondary btn-sm" onClick={() => copyImgPrompt(index)}>
                                    复制提示词
                                  </button>
                                )}
                                <button className="btn btn-secondary btn-sm" onClick={() => openImageModalFor(index)}>
                                  上传图片
                                </button>
                              </div>
                            </div>
                          )}
                          {block.type !== 'divider' && block.type !== 'image' && block.type !== 'imagePlaceholder' && (
                            <textarea
                              className="block-input"
                              value={block.content || ''}
                              onChange={(e) => updateBlockContent(index, e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="add-blocks">
                  <button className="add-block-btn" onClick={() => addBlock('paragraph')}>
                    + 段落
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('quote')}>
                    + 金句
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('heading')}>
                    + 标题
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('divider')}>
                    + 分割线
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('list')}>
                    + 列表
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('imagePlaceholder')}>
                    + 图片
                  </button>
                </div>

                <div className="color-bar">
                  <span className="color-label">配色：</span>
                  <div className="color-options">
                    {[
                      { id: 'morandi', bg: 'linear-gradient(135deg,#9b8b7d,#c4b5a5)', title: '莫兰迪' },
                      { id: 'green', bg: 'linear-gradient(135deg,#5d8a66,#7eb085)', title: '森绿' },
                      { id: 'purple', bg: 'linear-gradient(135deg,#8b7eb8,#a99cd1)', title: '薰衣草' },
                      { id: 'milktea', bg: 'linear-gradient(135deg,#a67c52,#c9a77c)', title: '奶茶' },
                      { id: 'blackgold', bg: 'linear-gradient(135deg,#333,#c9a962)', title: '黑金' },
                      { id: 'coral', bg: 'linear-gradient(135deg,#e07a5f,#f2a07b)', title: '珊瑚' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        className={`color-btn${currentScheme === opt.id ? ' active' : ''}`}
                        data-scheme={opt.id}
                        style={{ background: opt.bg }}
                        title={opt.title}
                        onClick={() => setCurrentScheme(opt.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-wrap">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-top">
                    <span>预览效果</span>
                    <span>猫门</span>
                  </div>
                  <div
                    className="phone-content"
                    id="previewContent"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                  <div className="phone-bottom">
                    <button className="btn btn-secondary btn-sm" onClick={copyAllCode}>
                      复制代码
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => goToStep(4)}>
                      营销物料
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-row">
            <button className="btn btn-secondary" onClick={() => goToStep(2)}>
              ← 返回提示词
            </button>
            <button className="btn btn-primary" onClick={() => goToStep(4)}>
              下一步：营销物料 →
            </button>
          </div>
        </div>

        <div className={`step-panel${currentStep === 4 ? ' active' : ''}`} data-step="4">
          <div className="card">
            <div className="card-header">
              <div className="card-title">📢 营销物料生成</div>
              <button className="btn btn-sm btn-accent" onClick={generateMaterials}>
                🚀 生成全部物料
              </button>
            </div>
            <div className="card-body">
              <div className="prompt-box">
                <pre id="materialsPrompt">{materialsPrompt}</pre>
              </div>
              <div className="ai-buttons">
                <button className="ai-btn" onClick={copyMaterialsPrompt}>
                  📋 复制提示词
                </button>
                <button className="ai-btn" onClick={() => copyMaterialsAndJump('https://claude.ai')}>
                  🤖 Claude
                </button>
                <button className="ai-btn" onClick={() => copyMaterialsAndJump('https://chat.openai.com')}>
                  💬 ChatGPT
                </button>
                <button className="ai-btn" onClick={() => copyMaterialsAndJump('https://gemini.google.com/')}
                >
                  ✨ Gemini
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">📝 物料结果（粘贴AI返回的内容）</div>
              <button className="btn btn-sm btn-outline" onClick={parseMaterials}>
                解析物料
              </button>
            </div>
            <div className="card-body">
              <textarea
                className="textarea-box"
                id="materialsInput"
                placeholder="把AI生成的营销物料粘贴到这里..."
                value={materialsInput}
                onChange={(e) => setMaterialsInput(e.target.value)}
              />
            </div>
          </div>

          <div className="materials-grid" id="materialsGrid">
            {materialsVisible &&
              materialTypes.map((mt) => (
                <div className="material-card" key={mt.id}>
                  <div className="material-header">
                    <div className="material-title">
                      {mt.icon} {mt.name}
                    </div>
                    <button className="btn btn-sm btn-outline" onClick={() => copyMaterial(mt.id)}>
                      复制
                    </button>
                  </div>
                  <div className="material-content">
                    <textarea
                      value={materials[mt.id] || ''}
                      onChange={(e) => setMaterials((prev) => ({ ...prev, [mt.id]: e.target.value }))}
                    />
                  </div>
                </div>
              ))}
          </div>

          {currentStep === 4 && blocks.length > 0 && (
            <div className="card image-prompts-card" id="imagePromptsCard">
              <div className="card-header">
                <div className="card-title">🖼️ 配图提示词</div>
              </div>
              <div className="card-body">
                <div className="image-prompt-item">
                  <div className="image-prompt-title">公众号封面图 (2.35:1横版)</div>
                  <div className="image-prompt-text" id="coverImagePrompt">
                    {imagePrompts.cover || '解析后显示'}
                  </div>
                  <button className="btn btn-sm btn-outline" style={{ marginTop: 8 }} onClick={() => copyImagePrompt('cover')}>
                    复制提示词
                  </button>
                </div>
                <div className="image-prompt-item">
                  <div className="image-prompt-title">小红书封面图 (3:4竖版)</div>
                  <div className="image-prompt-text" id="xhsCoverImagePrompt">
                    {imagePrompts.xhsCover || '解析后显示'}
                  </div>
                  <button className="btn btn-sm btn-outline" style={{ marginTop: 8 }} onClick={() => copyImagePrompt('xhsCover')}>
                    复制提示词
                  </button>
                </div>
                <div className="image-prompt-item">
                  <div className="image-prompt-title">朋友圈配图 (1:1方形)</div>
                  <div className="image-prompt-text" id="socialImagePrompt">
                    {imagePrompts.social || '解析后显示'}
                  </div>
                  <button className="btn btn-sm btn-outline" style={{ marginTop: 8 }} onClick={() => copyImagePrompt('social')}>
                    复制提示词
                  </button>
                </div>
                <div className="image-prompt-item">
                  <div className="image-prompt-title">金句卡片背景</div>
                  <div className="image-prompt-text" id="quoteCardImagePrompt">
                    {imagePrompts.quoteCard || '解析后显示'}
                  </div>
                  <button className="btn btn-sm btn-outline" style={{ marginTop: 8 }} onClick={() => copyImagePrompt('quoteCard')}>
                    复制提示词
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="nav-row">
            <button className="btn btn-secondary" onClick={() => goToStep(3)}>
              ← 返回编辑
            </button>
            <button className="btn btn-primary" onClick={exportAll}>
              📥 导出全部
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay${showImageModal ? ' show' : ''}`}
        id="imageModal"
        onClick={(e) => {
          if (e.target.id === 'imageModal') closeImageModal();
        }}
      >
        <div className="modal">
          <h3>🖼️ 添加图片</h3>
          <input
            type="text"
            id="imageUrlInput"
            placeholder="可直接粘贴截图，或粘贴图片URL / 上传图片"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            onPaste={handleImagePaste}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: 8 }} />
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={closeImageModal}>
              取消
            </button>
            <button className="btn btn-primary" onClick={confirmImage}>
              确认
            </button>
          </div>
        </div>
      </div>

      <div className={`toast${showToastState ? ' show' : ''}`} id="toast">
        {toastMessage}
      </div>
    </>
  );
}
