import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';

const schemes = {
  morandi: {
    primary: '#8c7b6c', // Warmer brown
    text: '#4a4a4a',
    textLight: '#888',
    bgWarm: '#fdfcfb', // Lighter, cleaner
    bgWarmEnd: '#f4f0ec',
    bgCard: '#ffffff',
    border: '#dcd3cc',
    shadow: 'rgba(140, 123, 108, 0.1)'
  },
  green: {
    primary: '#567c64', // Sage green
    text: '#2c3e32',
    textLight: '#6e7c74',
    bgWarm: '#f6f9f7',
    bgWarmEnd: '#e9f0ec',
    bgCard: '#ffffff',
    border: '#c5d6cc',
    shadow: 'rgba(86, 124, 100, 0.1)'
  },
  purple: {
    primary: '#8076a3', // Lavender/Iris
    text: '#433e56',
    textLight: '#7a7687',
    bgWarm: '#f9f8fc',
    bgWarmEnd: '#f0eff6',
    bgCard: '#ffffff',
    border: '#d3d0e0',
    shadow: 'rgba(128, 118, 163, 0.1)'
  },
  ocean: {
    primary: '#3a6ea5', // Ocean Blue
    text: '#2c3e50',
    textLight: '#6f8ba4',
    bgWarm: '#f5f9fc',
    bgWarmEnd: '#e6f0f7',
    bgCard: '#ffffff',
    border: '#cce0f0',
    shadow: 'rgba(58, 110, 165, 0.1)'
  },
  sunset: {
    primary: '#e08e79', // Warm Coral/Clay
    text: '#593e36',
    textLight: '#997b73',
    bgWarm: '#fdf8f6',
    bgWarmEnd: '#f7ebe8',
    bgCard: '#ffffff',
    border: '#f0dcd6',
    shadow: 'rgba(224, 142, 121, 0.1)'
  },
  minimalist: {
    primary: '#222222', // Classic Black
    text: '#333333',
    textLight: '#888888',
    bgWarm: '#ffffff',
    bgWarmEnd: '#f8f8f8',
    bgCard: '#ffffff',
    border: '#eeeeee',
    shadow: 'rgba(0, 0, 0, 0.05)'
  },
  cherry: {
    primary: '#c04851', // Cherry Red
    text: '#4a181b',
    textLight: '#946669',
    bgWarm: '#fdf6f7',
    bgWarmEnd: '#fae6e8',
    bgCard: '#ffffff',
    shadow: 'rgba(192, 72, 81, 0.1)'
  },
  cyberpunk: {
    primary: '#00f2ea', // Cyan
    text: '#e0e0e0',
    textLight: '#a0a0a0',
    bgWarm: '#2b213a', // Dark Purple
    bgWarmEnd: '#241b35',
    bgCard: '#1a1a2e',
    border: '#ff0055', // Neon Pink
    shadow: 'rgba(0, 242, 234, 0.2)'
  },
  candy: {
    primary: '#ffb7b2', // Pastel Pink
    text: '#6d6875',
    textLight: '#b5b2c2',
    bgWarm: '#fff0f5', // Lavender Blush
    bgWarmEnd: '#e0f7fa', // Mint Cream
    bgCard: '#ffffff',
    border: '#ffdac1', // Peach
    shadow: 'rgba(255, 183, 178, 0.2)'
  },
  vintage: {
    primary: '#d9534f', // Retro Red
    text: '#2c3e50',
    textLight: '#95a5a6',
    bgWarm: '#f4e1d2', // Antique White
    bgWarmEnd: '#e8d5c4',
    bgCard: '#fffcf5',
    border: '#f39c12', // Mustard
    shadow: 'rgba(217, 83, 79, 0.1)'
  },
  forest: {
    primary: '#2d6a4f', // Deep Green
    text: '#1b4332',
    textLight: '#74c69d',
    bgWarm: '#f0f7f4', // Minty White
    bgWarmEnd: '#d8f3dc',
    bgCard: '#ffffff',
    border: '#95d5b2',
    shadow: 'rgba(45, 106, 79, 0.1)'
  },
  coffee: {
    primary: '#8d7a66', // Warm Brown
    text: '#4a3b32',
    textLight: '#998a7b',
    bgWarm: '#fdfcf8', // Creamy White
    bgWarmEnd: '#f2ebe5',
    bgCard: '#ffffff',
    border: '#d6c8bd',
    shadow: 'rgba(141, 122, 102, 0.1)'
  },
  haze: {
    primary: '#6e7c85', // Blue Grey
    text: '#2c3e50',
    textLight: '#8a97a0',
    bgWarm: '#f6f8fa', // Cool White
    bgWarmEnd: '#e8edf2',
    bgCard: '#ffffff',
    border: '#cbd4db',
    shadow: 'rgba(110, 124, 133, 0.1)'
  },
  olive: {
    primary: '#7c856e', // Muted Green
    text: '#3b4232',
    textLight: '#949e85',
    bgWarm: '#f8f9f6',
    bgWarmEnd: '#ebefe6',
    bgCard: '#ffffff',
    border: '#ced6c2',
    shadow: 'rgba(124, 133, 110, 0.1)'
  },
  rose: {
    primary: '#9d6e73', // Dusty Pink
    text: '#4a3234',
    textLight: '#bf9599',
    bgWarm: '#fdf8f9',
    bgWarmEnd: '#f7ebec',
    bgCard: '#ffffff',
    border: '#e6cbd0',
    shadow: 'rgba(157, 110, 115, 0.1)'
  },
  aurora: {
    primary: '#845ec2', // Purple
    text: '#4b4453',
    textLight: '#b0a8b9',
    bgWarm: '#fdfbfd',
    bgWarmEnd: '#f3e5f5',
    bgCard: '#ffffff',
    border: '#d65db1', // Pink
    shadow: 'rgba(132, 94, 194, 0.1)'
  },
  cream: {
    primary: '#ff9671', // Peach
    text: '#594039',
    textLight: '#ffc75f',
    bgWarm: '#fffbf0',
    bgWarmEnd: '#fff5e6',
    bgCard: '#ffffff',
    border: '#ff6f91',
    shadow: 'rgba(255, 150, 113, 0.1)'
  },
  midnight: {
    primary: '#2c3e50', // Deep Blue
    text: '#1a252f',
    textLight: '#bdc3c7',
    bgWarm: '#f4f6f7',
    bgWarmEnd: '#ecf0f1',
    bgCard: '#ffffff',
    border: '#34495e',
    shadow: 'rgba(44, 62, 80, 0.1)'
  }
};

const blockTypeOptions = [
  { id: 'title', name: '大标题' },
  { id: 'paragraph', name: '段落' },
  { id: 'emphasis', name: '强调' },
  { id: 'quote', name: '金句' },
  { id: 'heading', name: '小标题' },
  { id: 'note', name: '猫门笔记卡' },
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

const imageStylePresets = [
  { id: 'photo', label: '📷 电影摄影', keywords: 'cinematic editorial photo, 35mm film look, shallow depth of field, soft natural light, high detail' },
  { id: 'lineart', label: '✒️ 极简线描', keywords: 'minimalist line art with details, fine ink illustration, hand-drawn texture, organic lines, vintage paper background, elegant composition, subtle hatching, artistic sketch, zen aesthetic, distinct character outlines, high quality, expressive strokes' },
  { id: 'handdrawn_note', label: '📝 手绘笔记图', keywords: 'hand-drawn note style, notebook paper background, ink pen sketch, bullet journal aesthetic, colorful highlights, visual note-taking, doodle icons, warm cozy feeling' },
  { id: 'handdrawn_mindmap', label: '🧠 手绘思维导图', keywords: 'hand-drawn mind map, central concept with branches, colorful markers, whiteboard style, creative brainstorming, visual hierarchy, connecting lines, educational illustration' },
  { id: 'illustration', label: '🎨 扁平插画', keywords: 'flat vector illustration, soft pastel colors, minimalist design, clean geometric shapes, modern graphic style' },
  { id: 'watercolor', label: '🎐 水彩风', keywords: 'delicate watercolor painting, soft edges, dreamy atmosphere, gentle color wash, artistic brushstrokes' },
  { id: '3d', label: '🧸 3D卡通', keywords: '3D render, Pixar style, soft lighting, cute character, rounded shapes, vibrant colors' },
  { id: 'anime', label: '✨ 动漫风', keywords: 'anime style illustration, soft lighting, detailed background, studio ghibli aesthetic, warm colors' },
  { id: 'minimalist', label: '◻️ 极简风', keywords: 'minimalist design, clean white background, simple shapes, negative space, elegant typography area' }
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

const imagePromptOutputSpec = `## 输出要求（必须全部完成）
1. 先输出完整文章
2. **【必须】在文章末尾追加配图提示词**，使用以下格式（英文提示词）：

===配图提示词===
【公众号封面图】
(英文 Midjourney 提示词，2.35:1 横版，吸引点击)

【小红书封面图】
(英文提示词，3:4 竖版，年轻化)

【朋友圈配图】
(英文提示词，1:1 方形，氛围感)

【金句卡片背景】
(英文提示词，简洁背景，适合放文字)

配图类型选择：根据文章内容选用最合适的类型——概念关系图/思维导图/对比图/流程图/隐喻象征图/场景氛围图。不要全用场景图。
提示词包含：主体/构图/色彩/风格。全英文，不解释。`;

const noteCardOutputSpec = `## 猫门笔记卡（仅当文章包含心理学概念时输出）
- **输出 1-3 个关键概念**（如果有多个重要概念）
- 概念格式：中文（English）
- 解释优先引用正文已有解释；若正文未解释，请补充一句直白易懂的学术解释
- **位置要求（非常重要）：请将笔记卡【紧跟】在提及该概念的段落之后，严格插入在正文中！**
- **禁止**：绝对不要把所有笔记卡堆在文章末尾！
- 使用以下固定格式输出：

===猫门笔记卡===
【概念】概念中文（English）
【解释】一句话解释
【水印】- 荣玥老师`;

// 轻度降 AI 味：只删最明显的套话，绝不限制正常写作/排版/加粗（这点和被废弃的 V10"写作禁区"相反）
const lightStyleSpec = `## 自然度（请注意，但别因此拘谨）
- 避免「不是…而是…」「不仅…而且…」「与其…不如…」这类对偶/转折套路句
- 少用空洞营销词与 AI 腔：爆款 / 赋能 / 底层逻辑 / 认知 / 在这个…的时代 / 真正的X是… / 你有没有发现
- 不要写「本文 / 这篇文章 / 综上 / 读完你会发现」
- 其余正常写、正常排版：该加粗的关键词照常用 \`**词**\` 加粗，金句、小标题、列表都照常`;

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
  const diagramSection = `
7. **增加可视化图解建议**（新增模块）
   - 针对复杂的概念对比、实验流程、核心观点总结，单独生成【图表/笔记类】配图建议
   - **格式**：\`![图解](建议：...)\`
   - **适用场景**：
     - 当文中出现对比（如拼图实验的拿钱组vs没拿钱组）→ 建议生成 **对比图 (Comparison Chart)**
     - 当文中有关键概念模型（如三个圈的交集）→ 建议生成 **韦恩图 (Venn Diagram)**
     - 当文中有核心观点总结 → 建议生成 **手绘笔记图 (Sketchnote)** 或 **思维导图 (Mind Map)**
   - **图解描述示例**：
     - ![图解](建议：Venn diagram with 3 overlapping circles labeled Autonomy, Competence, Relatedness, warm hand-drawn style)
     - ![图解](建议：Split screen comparison: Group A playing puzzle happily vs Group B stopping immediately after payment, simple flat illustration)
     - ![图解](建议：Visual note summary of the Internalization Process, arrow flow from external to internal, doodle style)`;

  if (currentMode === 'A') {
    return `你是一位资深公众号排版编辑，请帮我优化文章的排版格式。

## 你需要做的事

1. **提炼金句**（每篇3-5句）
   - 用 \`> 内容\` 标记
   - **注意**：不要在金句前加「金句：」等标签，直接写内容
   - 好金句的标准：有洞察、反常识、能引发共鸣、让人想截图分享
   - 金句可长可短，关键是要有力量，不要为了短而丢失意义
   - 示例：> 真正拖垮你的，往往是那件你一直没敢开始的小事。

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
     - **![图片](建议：Diagram: Venn diagram showing intersection of Passion, Skill, and Market, flat vector style)** (当涉及概念对比时)
     - **![图片](建议：Chart: Comparison bar chart between Group A and Group B, clean minimalist design)** (当涉及数据/分组对比时)
   - 坏的示例（太笼统）：![图片](建议：一个人在思考) ❌${diagramSection}

## 格式规则（非常重要）

- 金句（>）后面不能紧跟另一个金句，中间要有正文
- 标题（##）后面不能紧跟另一个标题
- **不要**输出「爽点：」、「共鸣点：」等标签，这些是写作指导，不要作为正文输出
- 保留原文所有核心信息
- 长段落拆成短段落（每段3-5句）

## 我的文章

[把你的文章粘贴在这里]

${imagePromptOutputSpec}

${noteCardOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
  }

  // Fix for other modes if they have same issue
  if (currentMode === 'B') {
    return `你是一位资深公众号爆款写手，请根据我给的主题创作一篇高质量文章。

## 文章风格
${styleDesc}

## 文章要求
    1. 字数：${lenReq}
    2. 开头3秒抓住读者（用故事、问题、反常识观点等）
    3. 写作技巧：每300-400字设置一个「爽点」或「共鸣点」（**注意：这是写作指导，不要在文中标记出来**）
    4. 金句要有洞察力，让人想截图分享（不要加标签）
    5. 结尾要有行动号召或情感升华

## 输出格式（必须严格遵守）

    用以下Markdown格式输出：

    - \`> 内容\` — 有洞察、有力量的句子，每篇4-6句（不要加「金句」标签）
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
- ![图片](建议：Diagram: Flowchart showing the habit formation loop, simple lines, white background)

配图风格要与文章风格一致：
- 治愈系文章 → 温暖柔和的光线、自然场景、舒适氛围
- 情绪张力文章 → 对比强烈的光影、都市场景、戏剧性构图
- 干货类文章/对比分析 → **使用图表/图示 (Diagram/Chart)**，简洁专业的扁平风格${diagramSection}

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- **不要**出现「爽点」、「共鸣点」等标签
- 禁止使用笼统描述如「一个人在思考」「美丽的风景」

## 我的主题

[在这里输入你的主题或想法]

${imagePromptOutputSpec}

${noteCardOutputSpec}

${lightStyleSpec}

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

- \`> 内容\` — 从原文提炼或改写，要有洞察力（不要加「金句」标签）
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
- ![图片](建议：Chart: Pie chart showing time distribution, soft colors, minimal design)${diagramSection}

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- **不要**出现「爽点」等标签
- 禁止使用笼统描述如「一个人在学习」「工作场景」

## 我的原始素材

[把你的逐字稿/笔记粘贴在这里]

${imagePromptOutputSpec}

${noteCardOutputSpec}

${lightStyleSpec}

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

- \`> 内容\` — 必须是原创表达，有洞察力（不要加「金句」标签）
- \`**强调**\` — 关键词强调
- \`## 小标题\` — 划分结构
- \`---\` — 分割线
- \`- 列表项\` — 并列内容
- \`![图片](建议：详细描述)\` — 配图建议，每600字一张

## 配图描述要求（非常重要）
图片描述必须包含4个要素：**场景环境 + 人物状态 + 情绪氛围 + 光线色调**

好的配图描述示例：
- ![图片](建议：清晨窗边，一个人端着咖啡望向远方，薄雾笼罩城市，柔和的晨光带来希望感)
- ![图片](建议：深夜书桌，笔记本上密密麻麻的字迹，一只手握着笔停顿，台灯投下温暖光圈)
- ![图片](建议：人来人往的街头，一个人驻足抬头看天，周围人群模糊，阳光穿透云层)${diagramSection}

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- **不要**出现「爽点」等标签
- 禁止使用笼统描述如「美好的画面」「温馨场景」

## 我的素材片段

[把你收集的各种素材粘贴在这里，用 --- 分隔不同素材]

## 我的视角/想强调的观点（可选）

[如果有你自己的观点想融入，写在这里]

${imagePromptOutputSpec}

${noteCardOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 配图提示词），不要解释。`;
}

function generateImagePromptFromDesc(desc) {
  const baseStyle = 'soft lighting, editorial photography style, high quality, 4k';
  const translations = {
    // 图表类
    diagram: 'flat vector illustration, clean lines, white background, high quality infographic',
    chart: 'data visualization, bar chart, pie chart, clean design, business style',
    venn: 'venn diagram, overlapping circles, flat design, educational illustration',
    comparison: 'comparison chart, before and after, split screen, infographic style',
    mindmap: 'mind map, branching structure, central idea, colorful markers, whiteboard style',
    flowchart: 'flowchart, process diagram, arrows and boxes, logical structure, minimal design',
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

  // Check for diagram keywords first to override base style
  const diagramKeywords = ['diagram', 'chart', 'venn', 'comparison', 'mindmap', 'flowchart', '图表', '对比', '思维导图'];
  const isDiagram = diagramKeywords.some(k => desc.toLowerCase().includes(k));

  if (isDiagram) {
    return `${desc}, flat vector style, white background, high quality, minimalist design --ar 16:9`;
  }

  let englishDesc = desc;
  Object.entries(translations).forEach(([cn, en]) => {
    if (desc.toLowerCase().includes(cn.toLowerCase())) {
      englishDesc = `${en}, ${englishDesc.replace(new RegExp(cn, 'gi'), '')}`;
    }
  });
  return `${englishDesc}, ${baseStyle} --ar 16:9`;
}

function normalizeText(text) {
  if (!text) return '';
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function extractSection(text, marker) {
  const normalized = normalizeText(text);
  const regex = new RegExp(
    `===\\s*${marker}\\s*===([\\s\\S]*?)(?=\\n\\s*===\\s*\\S+\\s*===|\\s*$)`
  );
  const match = normalized.match(regex);
  if (!match) return { text: normalized.trim(), section: '' };
  const section = match[1].trim();
  const cleaned = normalized.replace(regex, '').trim();
  return { text: cleaned, section };
}

function parseImagePrompts(section) {
  if (!section) return {};
  return {
    cover: (section.match(/【公众号封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    xhsCover: (section.match(/【小红书封面图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    social: (section.match(/【朋友圈配图】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '',
    quoteCard: (section.match(/【金句卡片背景】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || ''
  };
}

function parseNoteCard(section) {
  if (!section) return null;
  const concept = (section.match(/【概念】\s*([^\n]+)/) || [])[1]?.trim() || '';
  const explanation = (section.match(/【解释】\s*([\s\S]*?)(?=【|$)/) || [])[1]?.trim() || '';
  const watermark = (section.match(/【水印】\s*([^\n]+)/) || [])[1]?.trim() || '- 荣玥老师';
  if (!concept && !explanation) return null;
  return {
    type: 'note',
    title: '🐼 猫门笔记卡',
    concept,
    content: explanation,
    watermark,
    hidden: false
  };
}

function splitImagePromptSection(text) {
  const { text: cleaned, section } = extractSection(text, '配图提示词');
  return { articleText: cleaned, imagePrompts: parseImagePrompts(section) };
}

function stripImagePromptText(text) {
  if (!text) return text;
  if (/===\s*配图提示词\s*===/.test(text)) {
    return text.replace(/===\s*配图提示词\s*===[\s\S]*$/m, '').trim();
  }
  if (/【公众号封面图】|【小红书封面图】|【朋友圈配图】|【金句卡片背景】/.test(text)) {
    return text.replace(/【公众号封面图】[\s\S]*$/m, '').trim();
  }
  return text;
}

function insertNoteBlock(parsedBlocks, noteBlock) {
  if (!noteBlock) return parsedBlocks;
  const conceptKey = (noteBlock.concept || '').split('（')[0].trim();
  const insertIndex = conceptKey
    ? parsedBlocks.findIndex((b) => b.content && b.content.includes(conceptKey))
    : -1;
  if (insertIndex >= 0) {
    return [...parsedBlocks.slice(0, insertIndex + 1), noteBlock, ...parsedBlocks.slice(insertIndex + 1)];
  }
  return [...parsedBlocks, noteBlock];
}

function mergeNoteBlocks(parsedBlocks, noteBlocks) {
  return noteBlocks.reduce((acc, note) => insertNoteBlock(acc, note), parsedBlocks);
}

function extractImagePrompts(text) {
  if (!text) return {};
  const { imagePrompts } = splitImagePromptSection(text);
  if (Object.keys(imagePrompts).some((key) => imagePrompts[key])) return imagePrompts;
  if (!/【公众号封面图】|【小红书封面图】|【朋友圈配图】|【金句卡片背景】/.test(text)) {
    return {};
  }
  return parseImagePrompts(text);
}

function parseBlocksFromText(text) {
  const lines = text.split('\n');
  const result = [];
  const noteKeywords = ['猫门笔记卡', '猫哥笔记卡', '心理学笔记', '认知笔记', '概念卡', '概念笔记', '心理学概念', '关键概念'];
  const parseNoteLine = (line) => {
    const bracketMatch = line.match(/^【([^】]+)】\s*(.*)$/);
    if (bracketMatch) {
      const title = bracketMatch[1].trim();
      if (noteKeywords.some((key) => title.includes(key))) {
        return { title, content: bracketMatch[2].trim() };
      }
    }
    const inlineMatch = line.match(/^(?:[🐱🧠]\s*)?(猫门笔记卡|猫哥笔记卡|心理学笔记|认知笔记|概念卡|概念笔记)(?:\s*[-—:：])?\s*(.*)$/);
    if (inlineMatch) {
      return { title: inlineMatch[1], content: inlineMatch[2].trim() };
    }
    return null;
  };
  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;

    if (line === '---' || line === '***' || line === '___') {
      result.push({ type: 'divider', content: '' });
      continue;
    }

    // 单个 # = 文章大标题（题目）；## 起才是小标题（不影响一月版原有逻辑）
    if (/^#\s+/.test(line)) {
      result.push({ type: 'title', content: line.replace(/^#\s+/, '') });
      continue;
    }

    if (/^#{2,4}\s+/.test(line)) {
      result.push({ type: 'heading', content: line.replace(/^#{2,4}\s+/, '') });
      continue;
    }

    if (line.startsWith('> ')) {
      const rawQuote = line.slice(2).trim();
      // Enhanced regex to strip various forms of "Golden Sentence" labels
      // Fixed regex: escaped hyphen to avoid "Range out of order" error
      const cleanedQuote = rawQuote.replace(/^(\*\*|【)?(金句|Golden Sentence)(\*\*|】)?\s*[:：\-—]?\s*/i, '').trim();
      result.push({ type: 'quote', content: cleanedQuote });
      continue;
    }

    // Relaxed Check: Matches anything containing "猫门笔记卡" that looks like a header or delimiter
    // e.g. "===猫门笔记卡===", "**【猫门笔记卡】**", "### 猫门笔记卡"
    const noteCardHeaderRegex = /(?:={3,}|【|#+\s*|\*\*)\s*猫门笔记卡\s*(?:={3,}|】|\*\*|$)/;
    if (noteCardHeaderRegex.test(line)) {
      let concept = '';
      let explanation = '';
      let watermark = '- 荣玥老师';

      // Consume lines until we find the end or next block
      while (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (!nextLine) {
          i++;
          continue;
        }

        // Clean the line for matching keys (remove bold, whitespace)
        const cleanLine = nextLine.replace(/^[\*\s]+|[\*\s]+$/g, '');

        if (cleanLine.startsWith('【概念】') || cleanLine.startsWith('【概念:')) {
          concept = nextLine.replace(/[\*]*【概念】[:：]?[\*]*/, '').trim();
          i++;
        } else if (cleanLine.startsWith('【解释】') || cleanLine.startsWith('【解释:')) {
          explanation = nextLine.replace(/[\*]*【解释】[:：]?[\*]*/, '').trim();
          i++;
        } else if (cleanLine.startsWith('【水印】') || cleanLine.startsWith('【水印:')) {
          watermark = nextLine.replace(/[\*]*【水印】[:：]?[\*]*/, '').trim();
          i++;
        } else if (nextLine.includes('===')) {
          // End of block if it's another delimiter, or just consume it if it's the closing ===
          i++;
          break;
          break;
        } else if (nextLine.startsWith('![')) {
          // Image started, break
          break;
        } else if (nextLine.startsWith('#')) {
          break;
        } else {
          // Append to explanation if we are in the middle of one
          if (explanation && !watermark) {
            explanation += '\n' + nextLine;
            i++;
          } else {
            break;
          }
        }
      }

      result.push({
        type: 'note',
        title: '🐼 猫门笔记卡',
        concept,
        content: explanation,
        watermark,
        hidden: false
      });
      continue;
    }

    // Handle explicit diagram/visual note suggestions
    const diagramMatch = line.match(/^!\[图解\]\(建议[：:]?([^)]+)\)/);
    if (diagramMatch) {
      const desc = diagramMatch[1].trim();
      // Force a diagrammatic style for these
      const imgPrompt = generateImagePromptFromDesc(desc + ', diagram, visual note');
      result.push({
        type: 'imagePlaceholder',
        content: `📊 图解建议：${desc}`,
        imgPrompt,
        imgStyle: 'handdrawn_mindmap', // Default to a diagram style
        isDiagram: true
      });
      continue;
    }

    const noteLine = parseNoteLine(line);
    if (noteLine) {
      result.push({
        type: 'note',
        title: noteLine.title,
        concept: '',
        content: noteLine.content,
        watermark: '- 荣玥老师',
        hidden: false
      });
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
    .filter((b) => b.type !== 'note')
    .map((b) => {
      switch (b.type) {
        case 'title':
          return `# ${b.content || ''}`;
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
  if (block.hidden) return '';

  const s = schemes[schemeKey] || schemes.morandi;
  const formatInlineText = (text) =>
    (text || '').replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${s.primary};">$1</strong>`);

  // Common Typography
  const baseText = `font-size:15px;color:${s.text};line-height:1.8;letter-spacing:0.5px;text-align:justify;margin-bottom:24px;`;

  switch (block.type) {
    case 'title':
      return `<p style="font-size:23px;color:${s.text};font-weight:800;line-height:1.45;margin:8px 0 28px;padding:0 0 16px;text-align:left;letter-spacing:0.5px;border-bottom:2px solid ${s.bgWarmEnd};">${formatInlineText(block.content)}</p>`;

    case 'paragraph': {
      const p = formatInlineText(block.content).replace(/\n/g, '<br>');
      return `<p style="${baseText}">${p}</p>`;
    }

    case 'emphasis':
      return `<p style="${baseText}"><strong style="color:${s.primary};background:linear-gradient(to bottom, transparent 60%, ${s.shadow} 0);border-radius:4px;padding:0 4px;">${block.content || ''}</strong></p>`;

    case 'heading':
      return `<section style="margin:40px 0 20px;padding-left:12px;border-left:4px solid ${s.primary};"><p style="font-size:18px;color:${s.primary};font-weight:700;line-height:1.4;margin:0;">${formatInlineText(block.content)}</p></section>`;

    case 'divider': {
      const style = block.styleOption || 'paws'; // Default to paws
      const icon = style === 'star' ? '✦' : '🐾';
      return `<div style="text-align:center;margin:40px 0;"><span style="display:inline-block;width:60px;height:1px;background:linear-gradient(to right, transparent, ${s.border}, transparent);"></span><span style="font-size:14px;color:${s.border};margin:0 10px;vertical-align:middle;">${icon}</span><span style="display:inline-block;width:60px;height:1px;background:linear-gradient(to right, transparent, ${s.border}, transparent);"></span></div>`;
    }

    case 'quote': {
      const style = block.styleOption || 'panda'; // Default to panda

      let badge = '';
      if (style === 'panda') {
        badge = `<span style="position:absolute;bottom:-8px;right:-8px;font-size:24px;transform:rotate(-15deg);z-index:2;filter:drop-shadow(2px 2px 0 #fff);">🐼</span>`;
      } else if (style === 'paws') {
        badge = `<span style="position:absolute;bottom:-5px;right:-5px;font-size:18px;transform:rotate(-15deg);z-index:2;color:${s.primary};opacity:0.8;display:flex;gap:4px;"><span>🐾</span><span style="font-size:14px;margin-top:8px;">🐾</span></span>`;
      }

      return `<section style="margin:32px 0;padding:24px;background:${s.bgWarm};border-left:4px solid ${s.primary};position:relative;border-radius:0 12px 12px 0;">${badge}<span style="position:absolute;top:-16px;left:16px;font-size:48px;color:${s.primary};opacity:0.2;font-family:serif;line-height:1;">“</span><p style="font-size:16px;color:${s.primary};line-height:1.8;font-weight:600;margin:0;position:relative;z-index:1;">${formatInlineText(block.content).replace(/\n/g, '<br>')}</p></section>`;
    }

    case 'note': {
      if (block.hidden) return '';
      const title = block.title || '🐼 猫门笔记卡';
      const conceptLine = block.concept ? formatInlineText(block.concept) : '';
      const body = formatInlineText(block.content).replace(/\n/g, '<br>');
      const watermark = block.watermark ? formatInlineText(block.watermark) : '';

      // Glassmorphism / Card Style
      return `<section style="margin:32px 0;padding:24px;background:#fff;border-radius:16px;box-shadow:0 8px 24px ${s.shadow};position:relative;overflow:hidden;border:1px solid ${s.bgWarmEnd};"><div style="display:inline-block;background:${s.bgWarmEnd};color:${s.primary};font-size:13px;font-weight:600;padding:4px 12px;border-radius:20px;margin-bottom:12px;">${title}</div>${conceptLine ? `<h4 style="font-size:16px;color:${s.text};margin:0 0 12px;font-weight:700;">${conceptLine}</h4>` : ''}<div style="font-size:14px;color:${s.textLight};line-height:1.8;">${body}</div>${watermark ? `<div style="text-align:right;margin-top:16px;font-size:12px;color:${s.primary};opacity:0.6;">${watermark}</div>` : ''}<div style="position:absolute;bottom:-10px;right:-10px;font-size:80px;opacity:0.05;transform:rotate(-15deg);pointer-events:none;">🐾</div></section>`;
    }

    case 'list': {
      const items = (block.content || '')
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item)
        .map(item => item.replace(/^[-\*·]\s*/, '')); // Clean bullet chars

      return `<ul style="list-style:none;padding:0;margin:24px 0;">${items
        .map(
          (item) =>
            `<li style="margin-bottom:12px;padding-left:24px;position:relative;font-size:15px;color:${s.text};line-height:1.8;"><span style="position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%;background:${s.primary};"></span>${formatInlineText(item)}</li>`
        )
        .join('')}</ul>`;
    }

    case 'image':
      if (block.hidden) return '';
      return block.content
        ? `<figure style="margin:32px -10px;text-align:center;"><img src="${block.content}" style="width:100%;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.05);"></figure>`
        : '';

    case 'imagePlaceholder':
      if (block.hidden) return '';
      return `<div style="margin:24px 0;padding:32px;background:${s.bgWarm};border-radius:12px;text-align:center;border:1px dashed ${s.border};"><span style="font-size:24px;display:block;margin-bottom:8px;opacity:0.5;">📷</span><span style="font-size:13px;color:${s.textLight};">${block.content || '建议插入图片'}</span></div>`;

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
  const [generateChineseText, setGenerateChineseText] = useState(false);
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

  // Image prompt style and watermark state
  const [imageStyles, setImageStyles] = useState({ cover: 'photo', xhsCover: 'photo', social: 'photo', quoteCard: 'photo' });
  const [imageWatermarks, setImageWatermarks] = useState({ cover: '荣玥老师', xhsCover: '荣玥老师', social: '荣玥老师', quoteCard: '荣玥老师' });
  const [showWatermarks, setShowWatermarks] = useState({ cover: true, xhsCover: true, social: true, quoteCard: true });
  const [generatedImages, setGeneratedImages] = useState({});

  const toastTimerRef = useRef(null);
  const fullArticleTimerRef = useRef(null);
  const skipFullTextSyncRef = useRef(false);
  const previewRef = useRef(null);
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

  // The previewHtml useMemo is removed as per instruction, and rendering is done inline.

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
    const text = normalizeText(inputText).trim();
    if (!text) {
      showToast('⚠️ 请先粘贴内容');
      return;
    }
    // Remove manual extraction of note cards to allow natural inline parsing
    // The parseBlocksFromText function already handles ===猫门笔记卡=== blocks inline
    const { articleText, imagePrompts: extractedPrompts } = splitImagePromptSection(text);
    const cleanedArticle = stripImagePromptText(articleText);
    const parsedBlocks = parseBlocksFromText(cleanedArticle);

    setBlocks(parsedBlocks);
    setImagePrompts(extractedPrompts);
    setEditorVisible(true);
    setMaterialsVisible(false);
    skipFullTextSyncRef.current = false;
    showToast(`✅ 解析完成，共${parsedBlocks.length}个模块`);
  };

  const parseContentSilent = (text) => {
    const normalized = normalizeText(text);
    // Remove manual note extraction here too
    const articleText = stripImagePromptText(splitImagePromptSection(normalized).articleText);
    const parsedBlocks = parseBlocksFromText(articleText);
    setBlocks(parsedBlocks);
  };

  const handlePreviewClick = (e) => {
    const blockEl = e.target.closest('[data-block-index]');
    if (blockEl) {
      const index = parseInt(blockEl.getAttribute('data-block-index'), 10);
      if (!isNaN(index)) {
        const editorBlock = document.getElementById(`editor-block-${index}`);
        if (editorBlock) {
          editorBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Optional: Add highlight effect
          editorBlock.style.transition = 'background 0.3s';
          editorBlock.style.background = '#f0f9ff';
          setTimeout(() => {
            editorBlock.style.background = '';
          }, 1000);
        }
      }
    }
  };

  const syncFromFullArticle = () => {
    skipFullTextSyncRef.current = true;
    const rawText = normalizeText(fullArticleText);
    // Remove manual note extraction here too
    const cleanedArticle = stripImagePromptText(splitImagePromptSection(rawText).articleText);
    setInputText(rawText);
    parseContentSilent(rawText);
    setFullArticleText(cleanedArticle);
  };

  const updateBlockContent = (index, value) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, content: value } : b)));
  };

  const updateBlockField = (index, field, value) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, [field]: value } : b)));
  };

  const updateBlockType = (index, type) => {
    setBlocks((prev) =>
      prev.map((b, i) => {
        if (i !== index) return b;
        if (type === 'note') {
          return {
            ...b,
            type,
            title: b.title || '🐼 猫门笔记卡',
            concept: b.concept || '',
            content: b.content || '',
            watermark: b.watermark || '- 荣玥老师',
            hidden: b.hidden || false
          };
        }
        const { title, concept, watermark, hidden, ...rest } = b;
        return { ...rest, type };
      })
    );
  };

  const scrollToPreviewBlock = (index) => {
    const container = previewRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-block-index="${index}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  // 把卡片渲染成图片（与预览同一套渲染），插到它下方。解决"公众号粘 HTML 水印必掉"的问题。
  const convertBlockToImage = async (index) => {
    const block = blocks[index];
    if (!block) return;
    showToast('🖼 正在生成图片…');
    let wrap;
    try {
      const html2canvas = (await import('html2canvas')).default;
      wrap = document.createElement('div');
      wrap.style.cssText =
        "position:fixed;left:-99999px;top:0;width:375px;padding:16px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB',sans-serif;";
      wrap.innerHTML = generateBlockHTML(block, currentScheme);
      document.body.appendChild(wrap);
      const canvas = await html2canvas(wrap, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });
      const dataUrl = canvas.toDataURL('image/png');
      setBlocks((prev) => {
        const next = [...prev];
        next.splice(index + 1, 0, { type: 'image', content: dataUrl, hidden: false });
        return next;
      });
      showToast('✅ 已生成图片版并插入到下方（可隐藏上方文字卡片，或自己截图）');
    } catch (e) {
      showToast('⚠️ 图片生成失败，请重试');
    } finally {
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }
  };

  const addBlock = (type) => {
    if (type === 'note') {
      setBlocks((prev) => [
        ...prev,
        { type, title: '🐼 猫门笔记卡', concept: '', content: '', watermark: '- 荣玥老师', hidden: false }
      ]);
      return;
    }
    setBlocks((prev) => [...prev, { type, content: '', imgPrompt: '' }]);
  };

  const toggleBlockHidden = (index) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, hidden: !b.hidden } : b)));
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

  const updateBlockImageStyle = (index, styleId) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, imgStyle: styleId } : b)));
  };

  const getStyledBlockPrompt = (block) => {
    const basePrompt = block.imgPrompt || '';
    if (!basePrompt) return '';
    const styleId = block.imgStyle || 'photo';
    const stylePreset = imageStylePresets.find((s) => s.id === styleId);
    if (!stylePreset || styleId === 'photo') return basePrompt;
    // Replace photo keywords with selected style
    const photoKeywords = /cinematic|editorial photo|35mm film|film look|shallow depth of field|photography|soft natural light/gi;
    return basePrompt.replace(photoKeywords, '').replace(/,\s*,/g, ',').trim() + ', ' + stylePreset.keywords;
  };

  const copyStyledBlockPrompt = (index) => {
    const block = blocks[index];
    if (!block) return;
    const prompt = getStyledBlockPrompt(block);
    copyToClipboard(prompt, '✅ 提示词已复制');
  };

  const copyBlockPromptAndJump = (index, url) => {
    const block = blocks[index];
    if (!block) return;
    const prompt = getStyledBlockPrompt(block);
    if (!prompt) return;
    navigator.clipboard.writeText(prompt).then(() => {
      showToast('✅ 已复制，正在跳转...');
      setTimeout(() => window.open(url, '_blank'), 300);
    });
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
    const styleLabel = styleOptions.find((opt) => opt.id === currentStyle)?.title || '默认风格';
    const prompt = `你是一位资深新媒体内容操盘手，请根据以下公众号文章内容，生成可直接发布的全套营销物料（目标：更像真人表达、有触动、能点开）。

## 风格对齐
- 文章风格：${styleLabel}
- 风格说明：${styleDesc}

## 降AI味硬规则（所有内容必须遵守）
1. 每条内容至少引用文章中的1-2个具体元素（概念、场景、金句、词组、例子）
2. 句子要短、自然、有呼吸感；避免模板腔
3. 禁用营销套话与空洞形容（如“爆款/引爆/震撼/干货/一文讲透/让你…”）
4. 不要写“本文/这篇文章/我们/以上/读完你就…”
5. 情绪可以有，但要克制、真实，不夸张

## 文章内容
${articleSummary}

## 请生成以下12种物料

【朋友圈（作者版）】
要求：第一人称，像真实朋友圈；结构=真实瞬间/情绪 + 一个观点或金句 + 轻微邀请；80-140字；emoji≤2

【朋友圈（转发版）】
要求：第三人称或朋友推荐口吻；说明“为什么值得看+适合谁”；60-110字；不营销

【小红书文案】
要求：口语化、3-5段；200-320字；开头一行就抓人；中段2-3个要点；结尾1个开放式问题；话题标签1-3个

【小红书标题】
要求：5个备选；12-16字；每个都带文章关键词；至少包含以下风格各1条：反常识/数字+痛点/情绪+关键词/人群标签/场景转折；不标题党

【社群转发话术】
要求：60-100字；一句概括 + 一句亮点 + 一句适合谁

【私聊推荐话术】
要求：60-90字；像朋友私聊；带一点“为什么想到你”

【文章标题备选】
要求：8个不同风格（悬念/数字/痛点/好奇/共鸣等）；都要克制但有钩子

【目标人群画像】
要求：3-5类；每类1-2句，明确“处境 + 需求/痛点”

【金句卡片文案】
要求：5条；每条15-28字；有洞察/画面感；避免鸡汤口号

【短视频口播文案】
要求：口语化；开头3秒有钩子；220-320字；1分钟长度；结尾给一个具体行动/提问

【次条/转载版】
要求：100-140字；一句简介 + 一句核心看点

【SEO关键词】
要求：10-15个搜索关键词，含长尾词；用“、”分隔

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
    // Re-use logic to ensure toggle is respected
    // Since getStyledImagePrompt handles the toggle, using it even for 'pure' copy is safer if we want styles.
    // However, if user wants RAW prompt, we should just check the toggle.
    // Let's stick to the user request: "click agent also copy instructions". Agent jumps use getStyledImagePrompt logic via manual copy?
    // Wait, copyImagePrompt currently copies raw `imagePrompts[type]`.
    // The user said: "Clicking the smart agent... will also copy this".
    // Smart agent jumps calls `copyImagePromptAndJump`, which calls `getStyledImagePrompt`.
    // So `copyImagePromptAndJump` is covered.
    // What about just "Copy"?
    // The user said "In the image and image suggestion, I hope to have such function".
    // So "Copy" button should also include it.

    let prompt = imagePrompts[type] || '';
    if (generateChineseText) {
      prompt += ', text in Simplified Chinese, hanzi, chinese typography, billboard style';
    }
    copyToClipboard(prompt, '✅ 提示词已复制');
  };

  const getStyledImagePrompt = (type) => {
    const basePrompt = imagePrompts[type] || '';
    if (!basePrompt) return '';
    const styleId = imageStyles[type] || 'photo';
    const stylePreset = imageStylePresets.find((s) => s.id === styleId);
    if (!stylePreset || styleId === 'photo') return basePrompt;
    // Replace photo keywords with selected style
    const photoKeywords = /cinematic|editorial photo|35mm film|film look|shallow depth of field|photography/gi;
    let final = basePrompt.replace(photoKeywords, '').replace(/,\s*,/g, ',').trim() + ', ' + stylePreset.keywords;

    // Global Chinese Text Toggle
    if (generateChineseText) {
      final += ', text in Simplified Chinese, hanzi, chinese typography, billboard style, clear text';
    }
    return final;
  };

  const copyImagePromptAndJump = (type, url) => {
    const prompt = getStyledImagePrompt(type);
    const watermark = showWatermarks[type] ? imageWatermarks[type] : '';
    const finalPrompt = watermark ? `${prompt}\n\n[水印文字：${watermark}]` : prompt;
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt).then(() => {
      showToast('✅ 已复制，正在跳转...');
      setTimeout(() => window.open(url, '_blank'), 300);
    });
  };

  const handleImageStyleChange = (type, styleId) => {
    setImageStyles((prev) => ({ ...prev, [type]: styleId }));
  };

  const handleImageWatermarkChange = (type, value) => {
    setImageWatermarks((prev) => ({ ...prev, [type]: value }));
  };

  const toggleWatermark = (type) => {
    setShowWatermarks((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleGeneratedImagePaste = (type, e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (!file) continue;
        const reader = new FileReader();
        reader.onload = (ev) => {
          setGeneratedImages((prev) => ({ ...prev, [type]: ev.target.result }));
          showToast('✅ 图片已粘贴');
        };
        reader.readAsDataURL(file);
        e.preventDefault();
        return;
      }
    }
  };

  const handleGeneratedImageUpload = (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setGeneratedImages((prev) => ({ ...prev, [type]: ev.target.result }));
      showToast('✅ 图片已上传');
    };
    reader.readAsDataURL(file);
  };

  const removeGeneratedImage = (type) => {
    setGeneratedImages((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
    showToast('已删除图片');
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
    if (Object.keys(imagePrompts).length || Object.keys(generatedImages).length) {
      content += '## 配图提示词\n\n';
      if (imagePrompts.cover) content += `### 公众号封面图\n${imagePrompts.cover}\n\n`;
      if (generatedImages.cover) content += `![公众号封面图](${generatedImages.cover})\n\n`;
      if (imagePrompts.xhsCover) content += `### 小红书封面图\n${imagePrompts.xhsCover}\n\n`;
      if (generatedImages.xhsCover) content += `![小红书封面图](${generatedImages.xhsCover})\n\n`;
      if (imagePrompts.social) content += `### 朋友圈配图\n${imagePrompts.social}\n\n`;
      if (generatedImages.social) content += `![朋友圈配图](${generatedImages.social})\n\n`;
      if (imagePrompts.quoteCard) content += `### 金句卡片背景\n${imagePrompts.quoteCard}\n\n`;
      if (generatedImages.quoteCard) content += `![金句卡片背景](${generatedImages.quoteCard})\n\n`;
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button className="btn btn-sm btn-outline" onClick={syncFromFullArticle}>
                      同步到模块
                    </button>
                  </div>
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
                      <div
                        className="block-item"
                        key={`${block.type}-${index}`}
                        id={`editor-block-${index}`}
                        onFocusCapture={() => scrollToPreviewBlock(index)}
                        onClick={() => scrollToPreviewBlock(index)}
                      >
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
                          {block.type === 'quote' && (
                            <select
                              className="block-style-sel"
                              value={block.styleOption || 'panda'}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                newBlocks[index].styleOption = e.target.value;
                                setBlocks(newBlocks);
                              }}
                              style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                            >
                              <option value="panda">🐼 熊猫</option>
                              <option value="paws">🐾 爪印</option>
                              <option value="clean">🚫 极简</option>
                            </select>
                          )}
                          {block.type === 'divider' && (
                            <select
                              className="block-style-sel"
                              value={block.styleOption || 'paws'}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                newBlocks[index].styleOption = e.target.value;
                                setBlocks(newBlocks);
                              }}
                              style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                            >
                              <option value="paws">🐾 爪印</option>
                              <option value="star">✦ 星星</option>
                            </select>
                          )}
                          <div className="block-actions">
                            <button className="block-act-btn" onClick={() => toggleBlockHidden(index)} title={block.hidden ? '显示' : '隐藏'}>
                              {block.hidden ? '🙈' : '👁'}
                            </button>
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
                            {['note', 'quote', 'summary'].includes(block.type) && (
                              <button
                                className="block-act-btn to-img"
                                title="转成图片（在下方生成图片版，公众号像素级还原，可自己截图）"
                                onClick={() => convertBlockToImage(index)}
                              >
                                📸
                              </button>
                            )}
                            <button className="block-act-btn del" onClick={() => deleteBlock(index)}>
                              ×
                            </button>
                          </div>
                        </div>
                        <div className="block-body">
                          {block.type === 'divider' && <div className="divider-preview">· · ·</div>}
                          {block.type === 'note' && (
                            <div className="note-edit">
                              <input
                                type="text"
                                className="block-input"
                                value={block.title || '🐼 猫门笔记卡'}
                                onChange={(e) => updateBlockField(index, 'title', e.target.value)}
                              />
                              <input
                                type="text"
                                className="block-input"
                                value={block.concept || ''}
                                onChange={(e) => updateBlockField(index, 'concept', e.target.value)}
                                placeholder="概念：自我效能感（Self-efficacy）"
                              />
                              <textarea
                                className="block-input"
                                value={block.content || ''}
                                onChange={(e) => updateBlockContent(index, e.target.value)}
                                placeholder="写下你的笔记内容..."
                              />
                              <input
                                type="text"
                                className="block-input"
                                value={block.watermark || ''}
                                onChange={(e) => updateBlockField(index, 'watermark', e.target.value)}
                                placeholder="- 荣玥老师"
                              />
                            </div>
                          )}
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
                                <>
                                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 12, color: '#888' }}>风格:</span>
                                    <select
                                      value={block.imgStyle || 'photo'}
                                      onChange={(e) => updateBlockImageStyle(index, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{ padding: '3px 6px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}
                                    >
                                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                                    </select>
                                  </div>
                                  <div className="img-placeholder-prompt">💡 生成提示词：{getStyledBlockPrompt(block)}</div>
                                </>
                              )}
                              <div className="img-placeholder-actions" style={{ flexWrap: 'wrap', gap: 6 }}>
                                {block.imgPrompt && (
                                  <>
                                    <button className="btn btn-secondary btn-sm" onClick={() => copyStyledBlockPrompt(index)}>
                                      复制提示词
                                    </button>
                                    <button className="ai-btn" onClick={() => copyBlockPromptAndJump(index, 'https://claude.ai')}>Claude</button>
                                    <button className="ai-btn" onClick={() => copyBlockPromptAndJump(index, 'https://chat.openai.com')}>ChatGPT</button>
                                    <button className="ai-btn" onClick={() => copyBlockPromptAndJump(index, 'https://gemini.google.com/')}>Gemini</button>
                                    <button className="ai-btn" onClick={() => copyBlockPromptAndJump(index, 'https://kimi.moonshot.cn')}>Kimi</button>
                                    <button className="ai-btn" onClick={() => copyBlockPromptAndJump(index, 'https://www.doubao.com/chat/')}>豆包</button>
                                  </>
                                )}
                                <button className="btn btn-secondary btn-sm" onClick={() => openImageModalFor(index)}>
                                  上传图片
                                </button>
                              </div>
                            </div>
                          )}
                          {block.type !== 'divider' && block.type !== 'image' && block.type !== 'imagePlaceholder' && block.type !== 'note' && (
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
                  <button className="add-block-btn" onClick={() => addBlock('title')}>
                    + 大标题
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('paragraph')}>
                    + 段落
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('quote')}>
                    + 金句
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('heading')}>
                    + 小标题
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('note')}>
                    + 笔记卡
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
                      { id: 'morandi', bg: 'linear-gradient(135deg,#8c7b6c,#dcd3cc)', title: '莫兰迪 (经典)' },
                      { id: 'green', bg: 'linear-gradient(135deg,#567c64,#c5d6cc)', title: '森绿 (治愈)' },
                      { id: 'purple', bg: 'linear-gradient(135deg,#8076a3,#d3d0e0)', title: '薰衣草 (优雅)' },
                      { id: 'ocean', bg: 'linear-gradient(135deg,#3a6ea5,#cce0f0)', title: '深海 (商务)' },
                      { id: 'sunset', bg: 'linear-gradient(135deg,#e08e79,#f0dcd6)', title: '日落 (活力)' },
                      { id: 'minimalist', bg: 'linear-gradient(135deg,#333,#eee)', title: '极简 (黑白)' },
                      { id: 'cherry', bg: 'linear-gradient(135deg,#c04851,#f0ced1)', title: '车厘子 (热烈)' },
                      // Premium Solid
                      { id: 'coffee', bg: '#8d7a66', title: '拿铁 (质感)' },
                      { id: 'haze', bg: '#6e7c85', title: '雾霾 (高级)' },
                      { id: 'olive', bg: '#7c856e', title: '橄榄 (自然)' },
                      { id: 'rose', bg: '#9d6e73', title: '玫瑰 (温柔)' },
                      // Premium Gradient
                      { id: 'aurora', bg: 'linear-gradient(135deg,#845ec2,#d65db1)', title: '极光 (梦幻)' },
                      { id: 'cream', bg: 'linear-gradient(135deg,#ff9671,#ffc75f)', title: '奶油 (甜美)' },
                      { id: 'midnight', bg: 'linear-gradient(135deg,#2c3e50,#4ca1af)', title: '午夜 (深邃)' }
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
                    ref={previewRef}
                    onClick={handlePreviewClick}
                    dangerouslySetInnerHTML={{
                      __html: blocks
                        .map((b, i) => {
                          const html = generateBlockHTML(b, currentScheme);
                          return `<div data-block-index="${i}" style="margin:0;padding:0;">${html}</div>`;
                        })
                        .join('')
                    }}
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
                <label style={{ display: 'flex', alignItems: 'center', fontSize: 13, cursor: 'pointer', marginLeft: 'auto', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={generateChineseText}
                    onChange={(e) => setGenerateChineseText(e.target.checked)}
                    style={{ marginRight: 6 }}
                  />
                  生成中文文字 (实验性)
                </label>
              </div>
              <div className="card-body">
                {/* Cover Image */}
                <div className="image-prompt-item">
                  <div className="image-prompt-title">公众号封面图 (2.35:1横版)</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <select value={imageStyles.cover} onChange={(e) => handleImageStyleChange('cover', e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer', userSelect: 'none' }}>
                      <input type="checkbox" checked={showWatermarks.cover} onChange={() => toggleWatermark('cover')} />
                      水印{showWatermarks.cover ? ':' : ''}
                    </label>
                    {showWatermarks.cover && (
                      <input type="text" value={imageWatermarks.cover} onChange={(e) => handleImageWatermarkChange('cover', e.target.value)} placeholder="荣玥老师" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', width: 100, fontSize: 13 }} />
                    )}
                  </div>
                  <div className="image-prompt-text" id="coverImagePrompt">{getStyledImagePrompt('cover') || '解析后显示'}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => copyImagePrompt('cover')}>复制提示词</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('cover', 'https://claude.ai')}>Claude</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('cover', 'https://chat.openai.com')}>ChatGPT</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('cover', 'https://gemini.google.com/')}>Gemini</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('cover', 'https://kimi.moonshot.cn')}>Kimi</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('cover', 'https://www.doubao.com/chat/')}>豆包</button>
                  </div>
                  <div style={{ marginTop: 12, padding: 12, border: '2px dashed #ddd', borderRadius: 8, background: '#fafafa', textAlign: 'center' }} onPaste={(e) => handleGeneratedImagePaste('cover', e)}>
                    {generatedImages.cover ? (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={generatedImages.cover} alt="cover" style={{ maxWidth: 200, borderRadius: 6 }} />
                        {showWatermarks.cover && imageWatermarks.cover && (
                          <div style={{
                            position: 'absolute', bottom: 8, right: 8, color: 'rgba(255,255,255,0.9)',
                            fontSize: 12, fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.6)', pointerEvents: 'none'
                          }}>@{imageWatermarks.cover}</div>
                        )}
                        <button onClick={() => removeGeneratedImage('cover')} style={{ position: 'absolute', top: -8, right: -8, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ color: '#999', fontSize: 13, marginBottom: 6 }}>点击此区域后 Ctrl+V 粘贴图片，或</div>
                        <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer' }}>
                          选择文件
                          <input type="file" accept="image/*" onChange={(e) => handleGeneratedImageUpload('cover', e)} style={{ display: 'none' }} />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* XHS Cover */}
                <div className="image-prompt-item">
                  <div className="image-prompt-title">小红书封面图 (3:4竖版)</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <select value={imageStyles.xhsCover} onChange={(e) => handleImageStyleChange('xhsCover', e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer', userSelect: 'none' }}>
                      <input type="checkbox" checked={showWatermarks.xhsCover} onChange={() => toggleWatermark('xhsCover')} />
                      水印{showWatermarks.xhsCover ? ':' : ''}
                    </label>
                    {showWatermarks.xhsCover && (
                      <input type="text" value={imageWatermarks.xhsCover} onChange={(e) => handleImageWatermarkChange('xhsCover', e.target.value)} placeholder="荣玥老师" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', width: 100, fontSize: 13 }} />
                    )}
                  </div>
                  <div className="image-prompt-text" id="xhsCoverImagePrompt">{getStyledImagePrompt('xhsCover') || '解析后显示'}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => copyImagePrompt('xhsCover')}>复制提示词</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('xhsCover', 'https://claude.ai')}>Claude</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('xhsCover', 'https://chat.openai.com')}>ChatGPT</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('xhsCover', 'https://gemini.google.com/')}>Gemini</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('xhsCover', 'https://kimi.moonshot.cn')}>Kimi</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('xhsCover', 'https://www.doubao.com/chat/')}>豆包</button>
                  </div>
                  <div style={{ marginTop: 12, padding: 12, border: '2px dashed #ddd', borderRadius: 8, background: '#fafafa', textAlign: 'center' }} onPaste={(e) => handleGeneratedImagePaste('xhsCover', e)}>
                    {generatedImages.xhsCover ? (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={generatedImages.xhsCover} alt="xhsCover" style={{ maxWidth: 200, borderRadius: 6 }} />
                        {showWatermarks.xhsCover && imageWatermarks.xhsCover && (
                          <div style={{
                            position: 'absolute', bottom: 8, right: 8, color: 'rgba(255,255,255,0.9)',
                            fontSize: 12, fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.6)', pointerEvents: 'none'
                          }}>@{imageWatermarks.xhsCover}</div>
                        )}
                        <button onClick={() => removeGeneratedImage('xhsCover')} style={{ position: 'absolute', top: -8, right: -8, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ color: '#999', fontSize: 13, marginBottom: 6 }}>点击此区域后 Ctrl+V 粘贴图片，或</div>
                        <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer' }}>
                          选择文件
                          <input type="file" accept="image/*" onChange={(e) => handleGeneratedImageUpload('xhsCover', e)} style={{ display: 'none' }} />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Social Image with Watermark */}
                <div className="image-prompt-item">
                  <div className="image-prompt-title">朋友圈配图 (1:1方形)</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <select value={imageStyles.social} onChange={(e) => handleImageStyleChange('social', e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer', userSelect: 'none' }}>
                      <input type="checkbox" checked={showWatermarks.social} onChange={() => toggleWatermark('social')} />
                      水印{showWatermarks.social ? ':' : ''}
                    </label>
                    {showWatermarks.social && (
                      <input type="text" value={imageWatermarks.social} onChange={(e) => handleImageWatermarkChange('social', e.target.value)} placeholder="荣玥老师" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', width: 100, fontSize: 13 }} />
                    )}
                  </div>
                  <div className="image-prompt-text" id="socialImagePrompt">{getStyledImagePrompt('social') || '解析后显示'}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => copyImagePrompt('social')}>复制提示词</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('social', 'https://claude.ai')}>Claude</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('social', 'https://chat.openai.com')}>ChatGPT</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('social', 'https://gemini.google.com/')}>Gemini</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('social', 'https://kimi.moonshot.cn')}>Kimi</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('social', 'https://www.doubao.com/chat/')}>豆包</button>
                  </div>
                  <div style={{ marginTop: 12, padding: 12, border: '2px dashed #ddd', borderRadius: 8, background: '#fafafa', textAlign: 'center' }} onPaste={(e) => handleGeneratedImagePaste('social', e)}>
                    {generatedImages.social ? (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={generatedImages.social} alt="social" style={{ maxWidth: 200, borderRadius: 6 }} />
                        {showWatermarks.social && imageWatermarks.social && (
                          <div style={{
                            position: 'absolute', bottom: 8, right: 8, color: 'rgba(255,255,255,0.9)',
                            fontSize: 12, fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.6)', pointerEvents: 'none'
                          }}>@{imageWatermarks.social}</div>
                        )}
                        <button onClick={() => removeGeneratedImage('social')} style={{ position: 'absolute', top: -8, right: -8, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ color: '#999', fontSize: 13, marginBottom: 6 }}>点击此区域后 Ctrl+V 粘贴图片，或</div>
                        <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer' }}>
                          选择文件
                          <input type="file" accept="image/*" onChange={(e) => handleGeneratedImageUpload('social', e)} style={{ display: 'none' }} />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Quote Card with Watermark */}
                <div className="image-prompt-item">
                  <div className="image-prompt-title">金句卡片背景</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <select value={imageStyles.quoteCard} onChange={(e) => handleImageStyleChange('quoteCard', e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer', userSelect: 'none' }}>
                      <input type="checkbox" checked={showWatermarks.quoteCard} onChange={() => toggleWatermark('quoteCard')} />
                      水印{showWatermarks.quoteCard ? ':' : ''}
                    </label>
                    {showWatermarks.quoteCard && (
                      <input type="text" value={imageWatermarks.quoteCard} onChange={(e) => handleImageWatermarkChange('quoteCard', e.target.value)} placeholder="荣玥老师" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', width: 100, fontSize: 13 }} />
                    )}
                  </div>
                  <div className="image-prompt-text" id="quoteCardImagePrompt">{getStyledImagePrompt('quoteCard') || '解析后显示'}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => copyImagePrompt('quoteCard')}>复制提示词</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('quoteCard', 'https://claude.ai')}>Claude</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('quoteCard', 'https://chat.openai.com')}>ChatGPT</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('quoteCard', 'https://gemini.google.com/')}>Gemini</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('quoteCard', 'https://kimi.moonshot.cn')}>Kimi</button>
                    <button className="ai-btn" onClick={() => copyImagePromptAndJump('quoteCard', 'https://www.doubao.com/chat/')}>豆包</button>
                  </div>
                  <div style={{ marginTop: 12, padding: 12, border: '2px dashed #ddd', borderRadius: 8, background: '#fafafa', textAlign: 'center' }} onPaste={(e) => handleGeneratedImagePaste('quoteCard', e)}>
                    {generatedImages.quoteCard ? (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={generatedImages.quoteCard} alt="quoteCard" style={{ maxWidth: 200, borderRadius: 6 }} />
                        {showWatermarks.quoteCard && imageWatermarks.quoteCard && (
                          <div style={{
                            position: 'absolute', bottom: 8, right: 8, color: 'rgba(255,255,255,0.9)',
                            fontSize: 12, fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.6)', pointerEvents: 'none'
                          }}>@{imageWatermarks.quoteCard}</div>
                        )}
                        <button onClick={() => removeGeneratedImage('quoteCard')} style={{ position: 'absolute', top: -8, right: -8, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ color: '#999', fontSize: 13, marginBottom: 6 }}>点击此区域后 Ctrl+V 粘贴图片，或</div>
                        <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer' }}>
                          选择文件
                          <input type="file" accept="image/*" onChange={(e) => handleGeneratedImageUpload('quoteCard', e)} style={{ display: 'none' }} />
                        </label>
                      </>
                    )}
                  </div>
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
      </div >

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
