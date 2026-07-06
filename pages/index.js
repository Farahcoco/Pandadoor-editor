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
    border: '#eecdd1', // 修复：原来漏了 border，卡片边框会渲染成 undefined
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
    textLight: '#a89fb3',
    bgWarm: '#fdfbfd',
    bgWarmEnd: '#f3ecf8',
    bgCard: '#ffffff',
    border: '#ddd0ec', // 柔化：原来的荧光粉边框太扎眼
    shadow: 'rgba(132, 94, 194, 0.1)'
  },
  cream: {
    primary: '#e8967a', // 柔化的蜜桃色
    text: '#594039',
    textLight: '#b59a8d', // 修复：原来是亮黄色，正文浅色几乎不可读
    bgWarm: '#fffbf5',
    bgWarmEnd: '#fdf0e4',
    bgCard: '#ffffff',
    border: '#f2ddcc',
    shadow: 'rgba(232, 150, 122, 0.12)'
  },
  midnight: {
    primary: '#2c3e50', // Deep Blue
    text: '#1a252f',
    textLight: '#8d9aa5',
    bgWarm: '#f4f6f7',
    bgWarmEnd: '#e8edf0',
    bgCard: '#ffffff',
    border: '#ccd6dd', // 柔化：深色边框在浅底卡片上太重
    shadow: 'rgba(44, 62, 80, 0.1)'
  },
  teal: {
    primary: '#3a8b8b', // 湖水青
    text: '#2f3e3e',
    textLight: '#7ba3a3',
    bgWarm: '#f4fafa',
    bgWarmEnd: '#e2f1f1',
    bgCard: '#ffffff',
    border: '#c2e0e0',
    shadow: 'rgba(58, 139, 139, 0.1)'
  },
  ink: {
    primary: '#5b6d92', // 黛蓝（水墨感）
    text: '#3a4254',
    textLight: '#8e97ab',
    bgWarm: '#f7f8fb',
    bgWarmEnd: '#eaedf4',
    bgCard: '#ffffff',
    border: '#d3d9e6',
    shadow: 'rgba(91, 109, 146, 0.1)'
  },
  lotus: {
    primary: '#b07285', // 藕粉（温柔粉紫）
    text: '#4d3a41',
    textLight: '#b598a1',
    bgWarm: '#fdf9fa',
    bgWarmEnd: '#f7ecf0',
    bgCard: '#ffffff',
    border: '#e9d2da',
    shadow: 'rgba(176, 114, 133, 0.1)'
  },
  ginkgo: {
    primary: '#b5892e', // 鹅黄（银杏暖阳）
    text: '#4f4634',
    textLight: '#b3a687',
    bgWarm: '#fdfaf2',
    bgWarmEnd: '#f7f0dd',
    bgCard: '#ffffff',
    border: '#e8dcbb',
    shadow: 'rgba(181, 137, 46, 0.1)'
  },
  deepteal: {
    primary: '#2f5d50', // 墨绿（沉稳高级）
    text: '#243d36',
    textLight: '#7fa398',
    bgWarm: '#f3f8f6',
    bgWarmEnd: '#e3efeb',
    bgCard: '#ffffff',
    border: '#c5ddd5',
    shadow: 'rgba(47, 93, 80, 0.1)'
  }
};

const blockTypeOptions = [
  { id: 'title', name: '大标题' },
  { id: 'paragraph', name: '段落' },
  { id: 'emphasis', name: '强调' },
  { id: 'quote', name: '金句' },
  { id: 'heading', name: '小标题' },
  { id: 'note', name: '猫门笔记卡' },
  { id: 'summary', name: '猫哥小纸条' },
  { id: 'list', name: '列表' },
  { id: 'divider', name: '分割线' },
  { id: 'image', name: '图片' },
  { id: 'imagePlaceholder', name: '图片建议' },
  { id: 'followTop', name: '关注引导(顶)' },
  { id: 'followBottom', name: '关注引导(尾)' }
];

// 关注引导文案预设：公众号常见套路调研版——头部（蓝字关注/星标/人设问候/陪伴计数），
// 尾部（真诚三连/品牌slogan/评论互动/人设+下期）。都可再编辑。
const followTopPresets = [
  { id: 'blue', label: '🔵 蓝字关注+星标', text: '点击上方「蓝字」关注熊猫谈心\n⭐ 顺手设个星标，好文不走丢' },
  { id: 'hello', label: '👋 人设问候', text: '你好呀，我是猫哥 🐼\n一个陪你用心理学好好生活的人' },
  { id: 'slogan', label: '✨ 品牌slogan', text: '熊猫谈心 · 用心理学好好生活\n⭐ 星标我们，每周不见不散' },
  { id: 'count', label: '📅 陪伴计数', text: '这是熊猫谈心陪你的第 100 篇文章\n（数字自己改哦）' }
];

const followBottomPresets = [
  { id: 'sanlian', label: '❤️ 真诚三连', text: '看到这里，谢谢你 🐾\n如果有一点点被戳到\n点个「赞」和「在看」\n它会带这篇文章去到更多需要的人那里' },
  { id: 'slogan', label: '✨ 品牌slogan', text: '关注熊猫谈心\n和猫哥一起，用心理学好好生活 🐼' },
  { id: 'talk', label: '💬 评论互动', text: '今天聊的这些，你有想说的吗？\n评论区等你，猫哥每条都会看 👇' },
  { id: 'intro', label: '🐼 人设+陪伴', text: '我是猫哥，一个把心理学讲成人话的人\n关注熊猫谈心\n下一篇继续陪你' }
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
  { id: 'pyq_author', name: '朋友圈（猫哥版）', icon: '📱' },
  { id: 'pyq_assistant', name: '朋友圈（小助手版）', icon: '📱' },
  { id: 'weibo', name: '微博文案', icon: '📣' },
  { id: 'xiaohongshu', name: '小红书文案', icon: '📕' },
  { id: 'xhs_titles', name: '小红书标题', icon: '📕' },
  { id: 'community', name: '社群转发话术', icon: '👥' },
  { id: 'private', name: '私聊推荐话术', icon: '💬' },
  { id: 'titles', name: '文章标题备选', icon: '📰' },
  { id: 'audience', name: '目标人群画像', icon: '🎯' },
  { id: 'quotes', name: '金句卡片文案', icon: '💎' },
  { id: 'maoge_quotes', name: '猫哥语录', icon: '🐼' },
  { id: 'video', name: '短视频口播文案', icon: '🎬' },
  { id: 'share_intro', name: '转发介绍语', icon: '🔁' },
  { id: 'secondary', name: '次条/转载版', icon: '📄' },
  { id: 'channel_imgs', name: '渠道配图提示词', icon: '🖼' },
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
  },
  {
    id: 'E',
    title: '🎓 模式E：课程招生',
    desc: '我要上一门课，告诉AI课程信息（不全也行），生成招生推文+全套营销物料'
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

// 每个风格都补齐了"艺术指导"：配色倾向、构图、质感、情绪，出图质感明显更稳
const imageStylePresets = [
  { id: 'illustration', label: '🎨 扁平插画（默认）', keywords: 'flat vector illustration, warm pastel palette of cream peach and sage, soft rounded shapes, subtle paper grain texture, generous negative space, balanced editorial composition, cozy calm mood, trending on behance, high quality' },
  { id: 'handdrawn_note', label: '📝 手绘笔记图', keywords: 'hand-drawn study notes illustration, warm cream paper texture, black fineliner with peach and butter-yellow highlighter accents, cute small doodle icons, clean organized layout with breathing room, bullet journal aesthetic, cozy encouraging mood, high detail' },
  { id: 'handdrawn_mindmap', label: '🧠 手绘思维导图', keywords: 'hand-drawn mind map on warm off-white background, one clear central concept with 3-5 elegant branches, two accent colors only (terracotta and sage), rounded handwritten-style labels, small doodle icons at nodes, clean uncluttered composition, educational and friendly' },
  { id: 'lineart', label: '✒️ 极简线描', keywords: 'minimalist continuous line art, fine ink illustration with one terracotta accent color, warm beige paper background, elegant composition with large negative space, subtle hatching, zen aesthetic, gallery print quality' },
  { id: 'watercolor', label: '🎐 水彩风', keywords: 'soft watercolor illustration, muted warm palette with gentle color washes, delicate ink linework, plenty of white space, dreamy tender mood, botanical accents, fine art print quality' },
  { id: 'photo', label: '📷 电影摄影', keywords: 'cinematic photography, 35mm film aesthetic, soft window light with gentle shadows, shallow depth of field, warm muted color grading, quiet intimate mood, editorial magazine quality, high resolution' },
  { id: '3d', label: '🧸 3D卡通', keywords: 'soft 3D render in cute clay style, pastel color palette, rounded miniature scene, soft studio lighting with gentle ambient occlusion, blender cycles, warm friendly mood, high quality' },
  { id: 'anime', label: '✨ 动漫风', keywords: 'ghibli-inspired anime illustration, warm afternoon sunlight, painterly detailed background, soft color palette, gentle nostalgic mood, no text, high quality key visual' },
  { id: 'minimalist', label: '◻️ 极简风', keywords: 'minimalist flat design, single accent color on warm off-white background, one simple bold shape or symbol, huge negative space, refined editorial composition, premium brand aesthetic' }
];

// 猫哥小纸条 → 手绘笔记图的风格预设（默认：手绘笔记+熊猫元素）
const summaryNoteStyles = [
  {
    id: 'handnote_panda',
    label: '📝 手绘笔记·熊猫（默认）',
    keywords:
      'hand-drawn study notes poster, cream notebook paper texture background, fineliner pen handwriting layout, cute chubby GIANT PANDA (black and white bear) mascot doodles scattered around, soft warm highlighter strokes in peach and butter yellow, washi tape corners, hand-drawn small icons before each list item, one highlighted quote box near the bottom, cozy encouraging mood, flat 2D illustration, high resolution'
  },
  {
    id: 'flat_panda',
    label: '🎨 扁平插画·熊猫',
    keywords:
      'flat vector illustration note card, soft pastel palette, cute minimal GIANT PANDA (black and white bear) character, clean layout with title area and list area, rounded shapes, modern warm graphic style'
  },
  {
    id: 'watercolor_panda',
    label: '🎐 水彩·熊猫',
    keywords:
      'gentle watercolor note poster, soft color washes, cute small GIANT PANDA (black and white bear) vignettes, handwritten style layout, dreamy warm tones, paper texture'
  },
  {
    id: 'whiteboard_panda',
    label: '◻️ 极简白板·熊猫',
    keywords:
      'minimal whiteboard sketchnote, thin black marker lines, generous white space, one small GIANT PANDA (black and white bear) doodle accent, clean hand lettering areas'
  }
];

function buildSummaryNotePrompt(block, styleId, layout = 'column') {
  const style = summaryNoteStyles.find((st) => st.id === styleId) || summaryNoteStyles[0];
  const content = (block.content || '').trim();
  const watermark = (block.watermark || '— 荣玥老师').trim();
  // column：带栏目名版（默认）——顶部是栏目名"猫哥小纸条"，下面才是"猫哥想对你说"
  const structure =
    layout === 'column'
      ? `1. 顶部栏目名：猫哥小纸条（做成手绘风格的栏目标签/牌匾感，旁边配一只软萌的大熊猫）
2. 副标题：猫哥想对你说
3. 中部要点区：把下面的内容组织成 3-5 条要点，每条前配一个手绘小图标
4. 底部金句区：从内容中挑出最戳人的一句，放进一个高亮的手绘框里
5. 右下角落款：${watermark}`
      : `1. 顶部大标题：猫哥想对你说
2. 中部要点区：把下面的内容组织成 3-5 条要点，每条前配一个手绘小图标
3. 底部金句区：从内容中挑出最戳人的一句，放进一个高亮的手绘框里
4. 右下角落款：${watermark}`;
  return `请生成一张竖版 3:4 的手绘笔记风格图片（用于公众号文章结尾的"猫哥小纸条"栏目）。

【画面结构（从上到下）】
${structure}

【小纸条内容（画面中的中文文字必须来自这里，准确无误，不要自行增减）】
${content}

【视觉风格】
${style.keywords}

【硬性要求】
- 画面里所有中文文字清晰可读、无错字
- 大熊猫元素贯穿画面但不喧宾夺主（必须是黑白配色的大熊猫 giant panda，不是棕色的小浣熊/red panda）
- 整体温暖、治愈、让人想截图保存`;
}

// ===== 简易 ZIP 打包（STORE 不压缩，PNG本身已压缩）：让"一键下载"变成一个文件夹压缩包 =====
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// files: [{ name: 'folder/a.png', data: Uint8Array }] → Blob(zip)
function makeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  const u16 = (v) => new Uint8Array([v & 255, (v >> 8) & 255]);
  const u32 = (v) => new Uint8Array([v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255]);

  files.forEach((f) => {
    const nameBytes = encoder.encode(f.name);
    const crc = crc32(f.data);
    const localOffset = offset;
    // Local file header (0x04034b50), flag bit11=UTF-8 names
    const header = [u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(f.data.length), u32(f.data.length), u16(nameBytes.length), u16(0)];
    header.forEach((p) => {
      chunks.push(p);
      offset += p.length;
    });
    chunks.push(nameBytes);
    offset += nameBytes.length;
    chunks.push(f.data);
    offset += f.data.length;
    // Central directory entry (0x02014b50)
    central.push({ nameBytes, crc, size: f.data.length, localOffset });
  });

  const centralStart = offset;
  central.forEach((e) => {
    const entry = [u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(e.crc), u32(e.size), u32(e.size), u16(e.nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(e.localOffset)];
    entry.forEach((p) => {
      chunks.push(p);
      offset += p.length;
    });
    chunks.push(e.nameBytes);
    offset += e.nameBytes.length;
  });
  const centralSize = offset - centralStart;
  // End of central directory (0x06054b50)
  [u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length), u32(centralSize), u32(centralStart), u16(0)].forEach((p) => chunks.push(p));
  return new Blob(chunks, { type: 'application/zip' });
}

function dataUrlToBytes(dataUrl) {
  const base64 = dataUrl.split(',')[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// ===== 小红书图集：把文章拆成 3:4 竖版卡片图 =====
// 暗引流原则：卡片上只出现品牌署名（如"猫门｜荣玥老师"），绝不出现"公众号/微信/链接/二维码"字样
function buildXhsCardHtml(kind, payload, s, brandSign, bgOverride) {
  const font =
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB',sans-serif;";
  // 卡片头部品牌名从署名自动派生（"熊猫谈心｜荣玥老师" → "熊猫谈心"），改署名即全套同步
  const brandName = (brandSign || '').split(/[｜|·]/)[0].trim() || '熊猫谈心';
  const header = `<div style="font-size:14px;color:${s.primary};letter-spacing:3px;font-weight:600;">🐼 ${brandName} · 心理学笔记</div>`;
  const footer = `<div style="font-size:14px;color:${s.textLight};letter-spacing:2px;text-align:center;">${brandSign}</div>`;
  const paw = `<div style="position:absolute;bottom:24px;right:20px;font-size:110px;line-height:1;opacity:0.06;transform:rotate(-12deg);">🐾</div>`;
  const shell = (inner, bg = bgOverride || s.bgWarm) =>
    `<div style="width:600px;height:800px;background:${bg};${font}box-sizing:border-box;padding:56px 52px;position:relative;display:flex;flex-direction:column;">${header}<div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${inner}</div>${footer}${paw}</div>`;

  const esc = (t) => (t || '').replace(/</g, '&lt;').replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${s.primary};">$1</strong>`);
  const br = (t) => esc(t).replace(/\n/g, '<br>');

  switch (kind) {
    case 'cover':
      return shell(
        `<div style="font-size:42px;font-weight:800;color:${s.text};line-height:1.5;letter-spacing:1px;">${esc(payload.title)}</div>
         <div style="margin-top:28px;width:48px;border-top:4px solid ${s.primary};"></div>
         ${payload.sub ? `<div style="margin-top:24px;font-size:17px;color:${s.textLight};line-height:1.8;">${esc(payload.sub)}</div>` : ''}`
      );
    case 'quote':
      return shell(
        `<div style="font-size:64px;color:${s.primary};opacity:0.25;font-family:serif;line-height:1;">“</div>
         <div style="font-size:30px;font-weight:700;color:${s.text};line-height:1.9;letter-spacing:1px;margin-top:8px;">${br(payload.text)}</div>`
      );
    case 'note':
      return shell(
        `<div style="display:inline-block;align-self:flex-start;background:${s.bgWarmEnd};color:${s.primary};font-size:16px;font-weight:600;padding:8px 20px;border-radius:24px;">🐼 猫门笔记卡</div>
         ${payload.concept ? `<div style="margin-top:28px;font-size:26px;font-weight:800;color:${s.text};line-height:1.5;">${esc(payload.concept)}</div>` : ''}
         <div style="margin-top:20px;font-size:19px;color:${s.textLight};line-height:2;">${br(payload.text)}</div>`,
        bgOverride || '#ffffff'
      );
    case 'page':
      // 全文分页模式：把预览里的模块原样装进 3:4 页面
      return `<div style="width:600px;height:800px;background:${bgOverride || s.bgWarm};${font}box-sizing:border-box;padding:44px 44px 40px;position:relative;display:flex;flex-direction:column;">${header}<div style="flex:1;overflow:hidden;margin-top:14px;">${payload.html}</div>${footer}${paw}</div>`;
    case 'summary':
      return shell(
        `<div style="display:inline-block;align-self:flex-start;background:${s.primary};color:#fff;font-size:16px;font-weight:700;padding:8px 20px;border-radius:24px;">🐼 猫哥小纸条</div>
         <div style="margin-top:26px;font-size:19px;color:${s.text};line-height:2.1;">${br(payload.text)}</div>
         <div style="margin-top:24px;text-align:right;font-size:15px;color:${s.primary};opacity:0.75;">${esc(payload.watermark || '— 荣玥老师')}</div>`
      );
    case 'end':
      return shell(
        `<div style="font-size:26px;font-weight:700;color:${s.text};line-height:2;text-align:center;">${br(payload.text)}</div>
         <div style="margin-top:32px;text-align:center;font-size:44px;">🐾</div>`
      );
    case 'blank':
      // 空白母版：带品牌头尾和淡爪印。中间留白区可空着（后期用小红书/美图App叠字），
      // 也可以直接在卡片下方的编辑框里输入文字后点"应用修改"
      return shell(
        `<div style="height:560px;border:2px dashed ${s.border};border-radius:24px;background:rgba(255,255,255,0.45);display:flex;flex-direction:column;justify-content:center;position:relative;padding:40px;">${
          payload.text ? `<div style="font-size:26px;font-weight:700;color:${s.text};line-height:2.1;text-align:center;">${br(payload.text)}</div>` : ''
        }<span style="position:absolute;bottom:14px;right:20px;font-size:15px;color:${s.textLight};opacity:0.7;">🐾</span></div>`
      );
    default:
      return shell(`<div style="font-size:20px;color:${s.text};line-height:2;">${br(payload.text)}</div>`);
  }
}

const materialPlaceholders = {
  A: ['把你已写好的文章粘贴到下方', '在这里粘贴你已写好的完整文章...'],
  B: [
    '输入你的主题、想法或灵感',
    '在这里输入你想写的主题或想法...\n\n例如：\n- 为什么越努力越焦虑？\n- 如何在信息过载时代保持专注'
  ],
  C: ['粘贴你的长素材（逐字稿、笔记等）', '在这里粘贴你的长素材，如课程逐字稿、播客文字稿、会议记录等...'],
  D: ['粘贴你收集的多个素材片段', '在这里粘贴你收集的素材片段...\n\n用 ===素材分隔=== 分隔不同的素材'],
  E: [
    '填写课程信息（知道多少填多少，空着的AI会帮你补）',
    '课程名称：\n开课时间/形式（直播/录播/线下）：\n价格与优惠：\n适合谁（人群/痛点）：\n课程内容/大纲：\n学员反馈或案例（有就贴）：\n报名方式：\n\n——不确定的项直接留空，AI会给出补位建议并标注【待确认】'
  ]
};

const materialPromptPlaceholders = {
  A: '[把你的文章粘贴在这里]',
  B: '[在这里输入你的主题或想法]',
  C: '[把你的逐字稿/笔记粘贴在这里]',
  D: '[把你收集的各种素材粘贴在这里，用 --- 分隔不同素材]',
  E: '[把你的课程信息粘贴在这里，知道多少写多少]'
};

const imagePromptOutputSpec = `## 输出要求（必须全部完成）
1. 先输出完整文章
2. **【必须】在文章末尾追加配图提示词**，使用以下格式（英文提示词）：

===配图提示词===
【公众号封面图】
(英文提示词，2.35:1 横版。这是读者在信息流里决定点不点的那张图——必须是**一幅完整、饱满的画面**：有明确主体、有故事感或情绪张力，构图铺满全图)

【小红书封面图】
(英文提示词，3:4 竖版，年轻化、有点击欲。同样是**完整构图**，主体突出、色彩讨喜)

【朋友圈配图】
(英文提示词，1:1 方形，氛围感、生活感，完整画面)

【金句卡片背景】
(英文提示词，1:1。画面完整但构图安静：主体放在边缘或角落，中央色调柔和均匀便于后期叠字——注意是"柔和的画面区域"，不是空白框)

## 配图硬规则（每条提示词都要遵守）
- **禁止出现这些词**：blank space, empty area, copy space, text placeholder, empty frame, board, template——它们会让AI画出大片空白，图就废了
- 每张图都是能独立欣赏的完整插画/画面，铺满整个画幅
- **每条提示词末尾必须原样追加这段统一风格基底**（与正文配图同款质感，保证全套视觉统一）：
  warm flat illustration, soft pastel palette of cream peach and sage, rounded shapes, subtle paper grain texture, balanced editorial composition, cozy healing mood, high quality, no text, no watermark, no empty frame
- 可以自然融入一只软萌的大熊猫作为品牌元素（不强制）。**必须写 giant panda（黑白大熊猫），绝不能只写 panda 或写 red panda**——很多模型会画成小浣熊
- 配图类型按内容选：概念关系图/思维导图/对比图/流程图/隐喻象征图/场景氛围图，不要全用场景图
- 提示词包含：主体/构图/色彩/风格/情绪。全英文，不解释`;

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

// 真人味 + 爆款风格：写作质量的核心规范（所有模式共用）。只管"怎么说话"，不限制排版/加粗。
const lightStyleSpec = `## 写作风格（最高优先级，违反任何一条都要重写该段）

### 一、像真人说话，不像 AI
- **句式黑名单（一律禁止）**：「不是…而是…」「不仅…而且…」「与其…不如…」「你有没有发现」「说白了」「换句话说」「值得注意的是」「更重要的是」「从某种意义上说」「让我们…」「首先…其次…最后」三段式
- **词汇黑名单**：赋能 / 底层逻辑 / 认知升级 / 抓手 / 闭环 / 破局 / 深度解析 / 干货满满 / 情绪价值 / 在这个…的时代 / 真正的X是… / 本文 / 综上 / 读完你会发现
- 禁止三连排比（「它是…，它是…，它更是…」），禁止每段结尾都来一句总结升华
- 长短句交替，短句可以只有三五个字。允许偶尔的口头语和不完整句，就像跟朋友聊天时那样
- 有立场：敢说"我觉得""我试过""我劝你别"。不要四平八稳、两边都对
- 写具体的人、具体的事、具体的数字。"凌晨一点半改完第七版方案"永远好过"深夜加班到很晚"

### 二、爆款三要素（公众号/小红书通用）
1. **钩子**：开头 1-2 句必须制造"不读会亏"的感觉——反常识结论、具体冲突、或直接戳中读者正在经历的痛。禁止用背景铺垫开头
2. **共鸣**：每 300-400 字要有一处让读者"这说的就是我"的具体场景，用画面和细节戳，不用抽象道理讲
3. **可带走的价值**：读者合上文章能记住并马上用的东西——一个方法、一份清单、一句能转给朋友的话。没有这个，文章不算完成

### 三、自查（输出前默默过一遍）
把写好的文章通读一遍：任何一句如果"一眼就像 AI 写的"，删掉重写。标准是——这句话你愿不愿意原样发在自己朋友圈`;

const summaryOutputSpec = `## 猫哥小纸条（文章结尾输出）
- 在文章**最后**，用「猫哥」的口吻给读者写一张走心的小纸条，像朋友在耳边叮嘱
- **以「猫哥想对你说，」开头**，第一人称、温暖、有力量；3-5 句或 2-4 个要点
- 目标：让读者愿意截图保存
- 使用以下固定格式输出：

===猫哥小纸条===
猫哥想对你说，（这里写走心的内容，可用要点）
【水印】— 荣玥老师`;

const titleOutputSpec = `## 爆款标题备选（必须输出）
- 文章开头用单个 # 输出你最推荐的标题
- 文章末尾追加 8 个备选标题，使用以下格式：

===标题备选===
1. （悬念）标题内容
2. （数字清单）标题内容
3. （反常识）标题内容
4. （戳痛点）标题内容
5. （人群点名）标题内容
6. （场景共鸣）标题内容
7. （对比反转）标题内容
8. （直给价值）标题内容

## 好标题的判断标准（写完自查）
- 有具体元素：数字、身份、场景、时间、结果，至少占一样。「考研背了3个月，脑子里还是没路」好；「如何高效学习」差
- 有信息缺口：读者能猜到痛点但猜不到答案。「越努力越焦虑，问题出在这个字上」好；「努力与焦虑的关系」差
- 像人说的话：可以是半句口语、一个反问。「我到底在学心理学，还是在搬运心理学？」好
- 每个 12-22 字；标点最多1个；禁止夸大造假、禁止"必看/干货/深度好文"
- 标题同样遵守写作风格里的句式黑名单`;

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

${summaryOutputSpec}

${titleOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 猫哥小纸条 + 配图提示词），不要解释。`;
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

${summaryOutputSpec}

${titleOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 猫哥小纸条 + 配图提示词），不要解释。`;
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

${summaryOutputSpec}

${titleOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 猫哥小纸条 + 配图提示词），不要解释。`;
  }

  if (currentMode === 'E') {
    return `你是猫门（心理学教育品牌）的招生文案操盘手，请根据我提供的课程信息，以「猫哥」的身份写一篇公众号招生推文。

## 猫哥人设
猫门主理人，心理学老师。真诚、接地气、有专业底子但从不端着。介绍课程像介绍自己认真准备了很久的东西，不催不逼，让对的人自己心动。

## 文章风格
${styleDesc}

## 我的课程信息（可能不完整）
[把你的课程信息粘贴在这里，知道多少写多少]

## 信息补位规则（非常重要）
- 我留空或没写的项：给出合理的建议方案，并在该处标注【待确认：你的建议】，方便我快速确认修改
- **绝对禁止**编造学员反馈、成交数据、资质头衔——没有就不写，或标注【待确认：需要你提供】

## 推文结构（按这个顺序写，但小标题要自己起，别用结构名）
1. **痛点场景开头**：目标学员此刻正在经历的具体场景，让TA第一段就觉得"这说的是我"
2. **为什么是现在**：这个问题拖着不解决的代价，或此刻正好适合开始的理由
3. **课程是什么**：讲人话，一段话说清楚这门课帮你从哪里到哪里
4. **能带走什么**：3-5条具体收获，每条都可感知可验证（禁止"提升认知""收获成长"这类空话）
5. **适合谁、不适合谁**：诚实筛选，"不适合谁"至少写2条——这是信任感的来源
6. **学员见证**：仅使用我提供的真实反馈；没有就跳过此节
7. **课程信息**：时间/形式/价格/优惠，清晰列出
8. **结尾召唤**：猫哥式的真诚邀请+报名方式，可以有真实的紧迫感（名额/时间），不制造虚假焦虑

## 输出格式（必须严格遵守）

用以下Markdown格式输出：

- \`# 大标题\` — 招生推文标题（开头输出1个）
- \`> 内容\` — 打动人的句子，3-5句
- \`**强调**\` — 关键信息强调
- \`## 小标题\` — 划分结构
- \`---\` — 分割线
- \`- 列表项\` — 收获清单、课程信息等
- \`![图片](建议：详细描述)\` — 配图建议，每500字左右一张

## 格式规则（非常重要）
- 金句（>）之间不能连续，中间必须有正文段落
- 标题（##）之间不能连续
- 段落要短：每段2-4句，超过就拆
- 课程信息、收获清单必须用列表（- ），不要写成大段文字
- 价格、时间、名额等关键信息用 \`**加粗**\`

${imagePromptOutputSpec}

${summaryOutputSpec}

${titleOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（推文 + 猫哥小纸条 + 标题备选 + 配图提示词），不要解释。`;
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

${summaryOutputSpec}

${titleOutputSpec}

${lightStyleSpec}

---
请直接输出完整内容（文章 + 猫哥小纸条 + 配图提示词），不要解释。`;
}

function generateImagePromptFromDesc(desc) {
  const baseStyle = 'clean balanced composition, warm tones, high quality'; // 中性质感词，具体风格由风格预设决定
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

// 猫哥小纸条：作为"区块"整段抽出来（在 parseBlocksFromText 之前），避免和笔记卡的 === 消费逻辑打架
function parseSummary(section) {
  if (!section) return null;
  let watermark = '— 荣玥老师';
  let content = section.trim();
  const wm = content.match(/【(?:水印|署名|落款)】\s*([^\n]+)/);
  if (wm) {
    watermark = wm[1].trim();
    content = content.replace(/【(?:水印|署名|落款)】[^\n]*/g, '').trim();
  }
  // 清掉 AI 输出里混进来的分隔线(---)和残留的 === 标记行
  content = content
    .replace(/^\s*-{3,}\s*$/gm, '')
    .replace(/^\s*={3,}.*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!content) return null;
  return { type: 'summary', title: '🐼 猫哥小纸条', content, watermark, imgPrompt: '', hidden: false };
}

// 标题备选：解析 ===标题备选=== 段，返回干净正文 + 标题数组
function splitTitleOptionsSection(text) {
  const { text: cleaned, section } = extractSection(text, '标题备选');
  const titleOptions = section
    ? section
        .split('\n')
        .map((l) => l.replace(/^\s*\d+\s*[.、．）)]\s*/, '').replace(/^[-*•]\s+/, '').trim())
        .filter((l) => l && !/^={3,}/.test(l))
    : [];
  return { articleText: cleaned, titleOptions };
}

function splitSummarySection(text) {
  const { text: cleaned, section } = extractSection(text, '(?:猫哥小纸条|猫哥小结|猫门小结)');
  return { articleText: cleaned, summary: parseSummary(section) };
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
      // 相邻金句合并成一张卡（AI 有时连输出多条 >，分开渲染会出现金句卡叠罗汉，很难看）
      const prevBlock = result[result.length - 1];
      if (prevBlock && prevBlock.type === 'quote') {
        prevBlock.content = `${prevBlock.content}\n${cleanedQuote}`.trim();
      } else {
        result.push({ type: 'quote', content: cleanedQuote });
      }
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
    .map((b) => {
      switch (b.type) {
        case 'title':
          return `# ${b.content || ''}`;
        case 'note':
          return `\n===猫门笔记卡===\n【概念】${b.concept || ''}\n【解释】${b.content || ''}\n【水印】${b.watermark || '- 荣玥老师'}\n===\n`;
        case 'summary':
          return `\n===猫哥小纸条===\n${b.content || ''}\n【水印】${b.watermark || '— 荣玥老师'}\n===\n`;
        case 'heading':
          return `## ${b.content || ''}`;
        case 'quote':
          // 多行金句每行都要带 > 前缀，否则全文同步后会被拆成段落
          return (b.content || '')
            .split('\n')
            .map((l) => `> ${l}`)
            .join('\n');
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

// 间距密度：compact 紧凑 / normal 适中(默认，比旧版收紧) / loose 宽松(≈旧版)
const densityPresets = {
  compact: { p: 12, card: 20, h: 28 },
  normal: { p: 16, card: 26, h: 34 },
  loose: { p: 22, card: 32, h: 42 }
};

function generateBlockHTML(block, schemeKey, density = 'normal') {
  if (block.hidden) return '';

  const s = schemes[schemeKey] || schemes.morandi;
  const d = densityPresets[density] || densityPresets.normal;
  const formatInlineText = (text) =>
    (text || '').replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${s.primary};">$1</strong>`);

  // Common Typography
  const baseText = `font-size:15px;color:${s.text};line-height:1.8;letter-spacing:0.5px;text-align:justify;margin-bottom:${d.p}px;`;

  switch (block.type) {
    case 'title':
      return `<p style="font-size:23px;color:${s.text};font-weight:800;line-height:1.45;margin:8px 0 28px;padding:0 0 16px;text-align:left;letter-spacing:0.5px;border-bottom:2px solid ${s.bgWarmEnd};">${formatInlineText(block.content)}</p>`;

    case 'paragraph': {
      const p = formatInlineText(block.content).replace(/\n/g, '<br>');
      return `<p style="${baseText}">${p}</p>`;
    }

    case 'emphasis':
      return `<p style="${baseText}"><strong style="color:${s.primary};background:linear-gradient(to bottom, transparent 60%, ${s.shadow} 0);border-radius:4px;padding:0 4px;">${block.content || ''}</strong></p>`;

    case 'heading': {
      const hstyle = block.styleOption || 'bar';
      const htext = formatInlineText(block.content);
      // 多种小标题风格（全部公众号白名单写法），默认竖线；金句卡撞款时可换胶囊/下划线等
      if (hstyle === 'pill') {
        return `<section style="margin:${d.h}px 0 16px;font-size:0;"><span style="display:inline-block;background:${s.primary};color:#fff;font-size:16px;font-weight:700;padding:6px 18px;border-radius:24px;line-height:1.5;">${htext}</span></section>`;
      }
      if (hstyle === 'underline') {
        return `<section style="margin:${d.h}px 0 16px;font-size:0;"><span style="display:inline-block;font-size:18px;color:${s.text};font-weight:700;line-height:1.5;padding-bottom:8px;border-bottom:3px solid ${s.primary};">${htext}</span></section>`;
      }
      if (hstyle === 'center') {
        const cline = `<span style="display:inline-block;width:28px;height:0;border-top:1px solid ${s.border};vertical-align:middle;font-size:0;line-height:0;">&nbsp;</span>`;
        return `<section style="margin:${d.h}px 0 16px;text-align:center;font-size:0;">${cline}<span style="display:inline-block;font-size:18px;color:${s.text};font-weight:700;line-height:1.5;margin:0 14px;vertical-align:middle;">${htext}</span>${cline}</section>`;
      }
      if (hstyle === 'tag') {
        return `<section style="margin:${d.h}px 0 16px;background:${s.bgWarmEnd};border-radius:8px;padding:10px 14px;font-size:0;"><span style="display:inline-block;width:8px;height:8px;background:${s.primary};border-radius:2px;margin-right:10px;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</span><span style="display:inline-block;font-size:17px;color:${s.text};font-weight:700;line-height:1.5;vertical-align:middle;">${htext}</span></section>`;
      }
      if (hstyle === 'paw') {
        return `<section style="margin:${d.h}px 0 16px;font-size:0;"><span style="display:inline-block;font-size:16px;margin-right:8px;vertical-align:middle;">🐾</span><span style="display:inline-block;font-size:18px;color:${s.primary};font-weight:700;line-height:1.5;vertical-align:middle;">${htext}</span></section>`;
      }
      return `<section style="margin:${d.h}px 0 16px;padding-left:12px;border-left:4px solid ${s.primary};"><p style="font-size:18px;color:${s.primary};font-weight:700;line-height:1.4;margin:0;">${htext}</p></section>`;
    }

    case 'divider': {
      const style = block.styleOption || 'paws'; // Default to paws
      // 公众号安全写法：不用空标签、不用渐变背景，线条用 border-top + &nbsp; 占位
      const line = (w) => `<span style="display:inline-block;width:${w}px;height:0;border-top:1px solid ${s.border};vertical-align:middle;font-size:0;line-height:0;">&nbsp;</span>`;
      const icons = { paws: '🐾', star: '✦', panda: '🐼', leaf: '🍃', dots: '· · ·' };
      if (style === 'line') {
        return `<section style="text-align:center;margin:${d.h}px 0;font-size:0;line-height:1;">${line(160)}</section>`;
      }
      const icon = icons[style] || '🐾';
      const iconColor = style === 'dots' || style === 'star' ? s.border : 'inherit';
      return `<section style="text-align:center;margin:${d.h}px 0;font-size:0;line-height:1;">${line(60)}<span style="display:inline-block;font-size:14px;color:${iconColor};margin:0 10px;vertical-align:middle;line-height:1;letter-spacing:2px;">${icon}</span>${line(60)}</section>`;
    }

    case 'quote': {
      const style = block.styleOption || 'panda'; // Default to panda
      const quoteText = formatInlineText(block.content).replace(/\n/g, '<br>');

      // 居中简约：上下细线 + 居中大字，无卡片底色，适合克制的风格
      if (style === 'center') {
        const hairline = `<section style="text-align:center;font-size:0;line-height:0;margin:0;"><span style="display:inline-block;width:36px;height:0;border-top:2px solid ${s.primary};font-size:0;line-height:0;">&nbsp;</span></section>`;
        return `<section style="margin:${d.card + 6}px 0;padding:4px 12px;">${hairline}<p style="font-size:17px;color:${s.text};line-height:1.9;font-weight:700;margin:16px 0;text-align:center;letter-spacing:1px;">${quoteText}</p>${hairline}</section>`;
      }

      // 装饰全部用"零高度流内元素"实现（公众号会丢 position:absolute，div 也会被拆）
      const quoteMark = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:left;font-size:0;"><span style="display:inline-block;font-size:48px;line-height:48px;color:${s.primary};opacity:0.2;font-family:serif;margin-top:-14px;margin-left:-10px;">“</span></section>`;
      let badge = '';
      if (style === 'panda') {
        // 大号淡熊猫水印（与爪印水印同一逻辑）
        badge = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:64px;line-height:64px;opacity:0.10;transform:rotate(-12deg);margin-top:-58px;">🐼</span></section>`;
      } else if (style === 'paws') {
        // 单个大号淡爪印水印（与笔记卡一致）
        badge = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:72px;line-height:72px;opacity:0.07;transform:rotate(-12deg);margin-top:-64px;">🐾</span></section>`;
      } else if (style === 'seal') {
        // 印章式：右下一枚"猫门"小方印，像盖章收尾
        badge = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:12px;line-height:1.3;color:#fff;background:${s.primary};padding:4px 5px;border-radius:3px;letter-spacing:2px;transform:rotate(-6deg);margin-top:-10px;opacity:0.85;">猫门</span></section>`;
      }

      return `<section style="margin:${d.card}px 0;padding:24px;background:${s.bgWarm};border-left:4px solid ${s.primary};border-radius:0 12px 12px 0;">${quoteMark}<p style="font-size:16px;color:${s.primary};line-height:1.8;font-weight:600;margin:0;">${quoteText}</p>${badge}</section>`;
    }

    case 'note': {
      if (block.hidden) return '';
      const title = block.title || '🐼 猫门笔记卡';
      const conceptLine = block.concept ? formatInlineText(block.concept) : '';
      const body = formatInlineText(block.content).replace(/\n/g, '<br>');
      const watermark = block.watermark ? formatInlineText(block.watermark) : '';

      const footer = watermark
        ? `<p style="text-align:right;margin:12px 0 0;font-size:12px;color:${s.primary};opacity:0.65;line-height:1.4;">${watermark}</p>`
        : '';
      // 大号淡爪印：零高度流内写法，公众号不会丢，预览和粘贴一致
      const pawWatermark = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:88px;line-height:88px;opacity:0.07;transform:rotate(-12deg);margin-top:-88px;margin-right:-4px;">🐾</span></section>`;

      return `<section style="margin:${d.card}px 0;padding:24px 24px 20px;background:#fff;border-radius:16px;box-shadow:0 8px 24px ${s.shadow};border:1px solid ${s.bgWarmEnd};"><section style="margin:0 0 12px;font-size:0;"><span style="display:inline-block;background:${s.bgWarmEnd};color:${s.primary};font-size:13px;font-weight:600;padding:4px 12px;border-radius:20px;line-height:1.5;">${title}</span></section>${conceptLine ? `<p style="font-size:16px;color:${s.text};margin:0 0 12px;font-weight:700;line-height:1.5;">${conceptLine}</p>` : ''}<p style="font-size:14px;color:${s.textLight};line-height:1.8;margin:0;">${body}</p>${footer}${pawWatermark}</section>`;
    }

    case 'summary': {
      if (block.hidden) return '';
      const title = block.title || '🐼 猫哥小纸条';
      // 行首 * / - / • 转成 • 项目符号（避免显示原始星号）
      const body = formatInlineText((block.content || '').replace(/^\s*[*\-•]\s+/gm, '• ')).replace(/\n/g, '<br>');
      const watermark = block.watermark ? formatInlineText(block.watermark) : '— 荣玥老师';
      // 结尾走心卡片：暖色底 + 实色徽标，区别于白色笔记卡；爪印用零高度流内写法
      const summaryPaw = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:80px;line-height:80px;opacity:0.05;transform:rotate(-15deg);margin-top:-80px;">🐾</span></section>`;
      return `<section style="margin:${d.h}px 0 ${d.card}px;padding:24px;background:${s.bgWarm};border:1px solid ${s.bgWarmEnd};border-radius:16px;"><section style="margin:0 0 14px;font-size:0;"><span style="display:inline-block;background:${s.primary};color:#fff;font-size:13px;font-weight:700;padding:5px 14px;border-radius:20px;line-height:1.5;">${title}</span></section><p style="font-size:15px;color:${s.text};line-height:1.9;margin:0;">${body}</p><p style="text-align:right;margin:18px 0 0;font-size:12px;color:${s.primary};opacity:0.7;">${watermark}</p>${summaryPaw}</section>`;
    }

    case 'list': {
      const items = (block.content || '')
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item)
        .map((item) => item.replace(/^[-*·•]\s+/, '')); // 只清"符号+空格"的真项目符号，避免误吃 **加粗** 的星号

      // 公众号会重排 ul/li 且丢绝对定位圆点，改用 section + 行内圆点
      return `<section style="margin:${d.p + 8}px 0;">${items
        .map(
          (item) =>
            `<section style="margin-bottom:${Math.max(8, d.p - 6)}px;font-size:15px;color:${s.text};line-height:1.8;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${s.primary};margin-right:10px;vertical-align:middle;font-size:0;line-height:0;">&nbsp;</span><span>${formatInlineText(item)}</span></section>`
        )
        .join('')}</section>`;
    }

    case 'image':
      if (block.hidden) return '';
      return block.content
        ? `<section style="margin:${d.card}px 0;text-align:center;"><img src="${block.content}" style="width:100%;display:block;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.05);"></section>`
        : '';

    case 'imagePlaceholder':
      if (block.hidden) return '';
      return `<section style="margin:24px 0;padding:32px;background:${s.bgWarm};border-radius:12px;text-align:center;border:1px dashed ${s.border};"><span style="font-size:24px;display:inline-block;margin-bottom:8px;opacity:0.5;">📷</span><br><span style="font-size:13px;color:${s.textLight};">${block.content || '建议插入图片'}</span></section>`;

    case 'followTop': {
      // 标题下方的"点击蓝字关注+星标"引导条（公众号惯例位）
      const topLines = (block.content || '点击上方蓝字，关注「猫门」\n⭐ 设为星标，不错过猫哥的每一篇')
        .split('\n')
        .filter((l) => l.trim())
        .map(
          (l, idx) =>
            `<p style="font-size:12px;color:${idx === 0 ? s.primary : s.textLight};margin:${idx === 0 ? '0' : '4px 0 0'};line-height:1.6;">${formatInlineText(l)}</p>`
        )
        .join('');
      return `<section style="text-align:center;margin:0 0 ${d.card}px;padding:10px 0 ${d.p}px;">${topLines}<section style="text-align:center;font-size:0;line-height:0;margin-top:10px;"><span style="display:inline-block;width:200px;height:0;border-top:1px solid ${s.bgWarmEnd};font-size:0;line-height:0;">&nbsp;</span></section></section>`;
    }

    case 'followBottom': {
      // 文末关注/点赞/在看引导卡；需要二维码时在下方加一个图片块粘贴即可
      // 行距节奏：首行加粗稍大，其余行统一大小统一间距，居中且限制行宽避免奇怪的折行
      const botLines = (block.content || '')
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l)
        .map(
          (l, idx) =>
            `<p style="font-size:${idx === 0 ? 15 : 13}px;color:${idx === 0 ? s.text : s.textLight};font-weight:${idx === 0 ? 700 : 400};margin:${idx === 0 ? '0 auto' : '9px auto 0'};line-height:1.8;text-align:center;max-width:16em;letter-spacing:0.5px;">${formatInlineText(l)}</p>`
        )
        .join('');
      const topDots = `<p style="text-align:center;font-size:12px;color:${s.border};letter-spacing:6px;margin:0 0 14px;">· · ·</p>`;
      const bottomPaw = `<section style="height:0;line-height:0;margin:0;padding:0;text-align:right;font-size:0;"><span style="display:inline-block;font-size:56px;line-height:56px;opacity:0.06;transform:rotate(-12deg);margin-top:-50px;">🐾</span></section>`;
      return `<section style="margin:${d.h}px 0 ${d.card}px;padding:26px 24px;background:${s.bgWarm};border:1px solid ${s.bgWarmEnd};border-radius:16px;text-align:center;">${topDots}${botLines}${bottomPaw}</section>`;
    }

    default:
      return '';
  }
}

// 图片压缩：过宽的缩到 1280px 并重编码为 JPEG。公众号正文宽约 578px，1280 已是 2 倍清晰度。
// 大截图从几 MB 降到一两百 KB，预览渲染、复制、导出都会明显变快。
function compressImageDataUrl(dataUrl, onDone, maxWidth = 1280, quality = 0.85) {
  try {
    // GIF 保留动图，非图片或已经很小的直接放行
    if (!dataUrl || !dataUrl.startsWith('data:image/') || dataUrl.startsWith('data:image/gif')) {
      onDone(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxWidth / (img.width || maxWidth));
        if (scale === 1 && dataUrl.length < 300 * 1024) {
          onDone(dataUrl);
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; // JPEG 无透明通道，先铺白底
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const out = canvas.toDataURL('image/jpeg', quality);
        onDone(out.length < dataUrl.length ? out : dataUrl);
      } catch (e) {
        onDone(dataUrl);
      }
    };
    img.onerror = () => onDone(dataUrl);
    img.src = dataUrl;
  } catch (e) {
    onDone(dataUrl);
  }
}

function readFileAsCompressedDataUrl(file, onLoad) {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target?.result) compressImageDataUrl(event.target.result, onLoad);
  };
  reader.readAsDataURL(file);
}

function readClipboardImage(items, onLoad) {
  if (!items) return false;
  const imageItem = Array.from(items).find((item) => item.type && item.type.startsWith('image/'));
  if (!imageItem) return false;
  const file = imageItem.getAsFile();
  if (!file) return false;
  readFileAsCompressedDataUrl(file, onLoad);
  return true;
}

export default function Home() {
  const [generateChineseText, setGenerateChineseText] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentMode, setCurrentMode] = useState('A');
  const [currentStyleTab, setCurrentStyleTab] = useState('preset');
  const [currentStyle, setCurrentStyle] = useState('catgate');
  const [currentScheme, setCurrentScheme] = useState('morandi');
  const [density, setDensity] = useState('normal'); // 间距密度：compact/normal/loose
  const [pageMargin, setPageMargin] = useState(8); // 页边距(px)：0标准/8舒适/16宽松/24超宽，作用于预览和复制
  const [titleOptions, setTitleOptions] = useState([]); // 爆款标题备选
  // 小红书图集
  const [xhsCards, setXhsCards] = useState([]); // {label, dataUrl}
  const [xhsBusy, setXhsBusy] = useState(false);
  const [brandSign, setBrandSign] = useState('熊猫谈心 ｜ 荣玥老师');
  const [xhsEndText, setXhsEndText] = useState('今天先聊到这里\n更多完整的长文版\n都在「熊猫谈心」等你 🐾');
  const [xhsMode, setXhsMode] = useState('cards'); // cards 卡片精选 / pages 全文分页
  const [xhsBg, setXhsBg] = useState('scheme'); // 背景：scheme 跟随配色 / cream / blush / sand / night / custom
  const [xhsCustomBg, setXhsCustomBg] = useState('#fdf6ec');
  const xhsStampRef = useRef(''); // 记录生成时的设置，检测是否需要重新生成
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
  const [imageStyles, setImageStyles] = useState({ cover: 'illustration', xhsCover: 'illustration', social: 'illustration', quoteCard: 'illustration' });
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
    const { articleText: noTitles, titleOptions: parsedTitles } = splitTitleOptionsSection(text);
    const { articleText, imagePrompts: extractedPrompts } = splitImagePromptSection(noTitles);
    const { articleText: noSummary, summary } = splitSummarySection(articleText);
    const cleanedArticle = stripImagePromptText(noSummary);
    let parsedBlocks = parseBlocksFromText(cleanedArticle);
    if (summary) parsedBlocks = [...parsedBlocks, summary];

    setBlocks(parsedBlocks);
    setTitleOptions(parsedTitles);
    setImagePrompts(extractedPrompts);
    setEditorVisible(true);
    setMaterialsVisible(false);
    skipFullTextSyncRef.current = false;
    showToast(`✅ 解析完成，共${parsedBlocks.length}个模块`);
  };

  const parseContentSilent = (text) => {
    const normalized = splitTitleOptionsSection(normalizeText(text)).articleText;
    // Remove manual note extraction here too
    const { articleText: noSummary, summary } = splitSummarySection(splitImagePromptSection(normalized).articleText);
    const articleText = stripImagePromptText(noSummary);
    let parsedBlocks = parseBlocksFromText(articleText);
    if (summary) parsedBlocks = [...parsedBlocks, summary];
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
      wrap.innerHTML = generateBlockHTML(block, currentScheme, density);
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

  // 图集背景：跟随配色 / 预设 / 自定义颜色（深色背景自动换浅色文字）
  const getXhsPalette = () => {
    const s = schemes[currentScheme] || schemes.morandi;
    if (xhsBg === 'night') {
      return { s: { ...s, text: '#e5e9f0', textLight: '#9aa5b8', primary: '#d8b98a', bgWarmEnd: '#3b4252' }, bg: '#2e3440' };
    }
    const map = { cream: '#fdfaf3', blush: '#fbf1f2', sand: '#f6efe6' };
    if (xhsBg === 'custom') return { s, bg: xhsCustomBg };
    if (map[xhsBg]) return { s, bg: map[xhsBg] };
    return { s, bg: null }; // scheme
  };

  const xhsSettingsKey = () =>
    [brandSign, xhsEndText, currentScheme, xhsMode, xhsBg, xhsCustomBg, density].join('|');

  const XHS_FONT =
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB',sans-serif;";

  // 一键把文章拆成小红书图集
  // cards 模式：封面卡 + 金句卡 + 笔记卡 + 小纸条卡 + 引导尾卡
  // pages 模式：手机预览按模块完整分页，切成 3:4 图（模块不会被拦腰截断）
  const generateXhsCards = async () => {
    if (!blocks.length) {
      showToast('⚠️ 请先在步骤3完成文章排版');
      return;
    }
    setXhsBusy(true);
    showToast('🖼 正在生成图集…');
    let wrap;
    let measurer;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const palette = getXhsPalette();

      const jobs = [];
      if (xhsMode === 'pages') {
        // 逐块测高，贪心装页：装不下就开新页，保证每个模块完整
        measurer = document.createElement('div');
        measurer.style.cssText = `position:fixed;left:-99999px;top:0;width:512px;${XHS_FONT}`;
        document.body.appendChild(measurer);
        const rendered = blocks
          .filter((b) => !b.hidden && !['imagePlaceholder', 'followTop', 'followBottom'].includes(b.type))
          .map((b) => generateBlockHTML(b, currentScheme, density))
          .filter(Boolean);
        const maxH = 600;
        let cur = [];
        let curH = 0;
        let pageNo = 1;
        const flush = () => {
          if (cur.length) {
            jobs.push({ label: `第 ${pageNo} 页`, kind: 'page', payload: { html: cur.join('') } });
            pageNo += 1;
            cur = [];
            curH = 0;
          }
        };
        for (const html of rendered) {
          measurer.innerHTML = html;
          const h = measurer.firstChild ? measurer.offsetHeight : 0;
          if (curH + h > maxH && cur.length) flush();
          cur.push(html);
          curH += h;
        }
        flush();
        jobs.push({ label: '空白母版', kind: 'blank', payload: {} });
        jobs.push({ label: '引导尾卡', kind: 'end', payload: { text: xhsEndText } });
      } else {
        const titleBlock = blocks.find((b) => b.type === 'title' && b.content);
        const firstHeading = blocks.find((b) => b.type === 'heading' && b.content);
        const firstQuote = blocks.find((b) => b.type === 'quote' && b.content);
        const coverTitle = titleBlock?.content || firstHeading?.content || firstQuote?.content;
        if (coverTitle) jobs.push({ label: '封面', kind: 'cover', payload: { title: coverTitle, sub: '' } });

        blocks
          .filter((b) => b.type === 'quote' && b.content && !b.hidden)
          .slice(0, 4)
          .forEach((b, i) => jobs.push({ label: `金句卡 ${i + 1}`, kind: 'quote', payload: { text: b.content } }));

        blocks
          .filter((b) => b.type === 'note' && (b.content || b.concept) && !b.hidden)
          .slice(0, 3)
          .forEach((b, i) => jobs.push({ label: `笔记卡 ${i + 1}`, kind: 'note', payload: { concept: b.concept, text: b.content } }));

        const summaryBlock = blocks.find((b) => b.type === 'summary' && b.content && !b.hidden);
        if (summaryBlock) jobs.push({ label: '猫哥小纸条', kind: 'summary', payload: { text: summaryBlock.content, watermark: summaryBlock.watermark } });

        jobs.push({ label: '空白母版', kind: 'blank', payload: {} });
        jobs.push({ label: '引导尾卡', kind: 'end', payload: { text: xhsEndText } });
      }

      wrap = document.createElement('div');
      wrap.style.cssText = 'position:fixed;left:-99999px;top:0;';
      document.body.appendChild(wrap);

      const cards = [];
      for (const job of jobs) {
        wrap.innerHTML = buildXhsCardHtml(job.kind, job.payload, palette.s, brandSign, palette.bg);
        // eslint-disable-next-line no-await-in-loop
        const canvas = await html2canvas(wrap.firstChild, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
        cards.push({ ...job, dataUrl: canvas.toDataURL('image/png') });
      }
      setXhsCards(cards);
      xhsStampRef.current = xhsSettingsKey();
      showToast(`✅ 已生成 ${cards.length} 张卡片`);
    } catch (e) {
      showToast('⚠️ 图集生成失败，请重试');
    } finally {
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
      if (measurer && measurer.parentNode) measurer.parentNode.removeChild(measurer);
      setXhsBusy(false);
    }
  };

  // 修改单张卡片文字（不重生成，仅更新文字，点🔄应用）
  const updateXhsCardText = (i, text) => {
    setXhsCards((prev) =>
      prev.map((c, idx) => {
        if (idx !== i) return c;
        const payload = { ...c.payload };
        if (c.kind === 'cover') payload.title = text;
        else payload.text = text;
        return { ...c, payload };
      })
    );
  };

  // 单张重新生成（应用文字修改和当前背景/署名设置）
  const regenXhsCard = async (i) => {
    const card = xhsCards[i];
    if (!card) return;
    setXhsBusy(true);
    let wrap;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const palette = getXhsPalette();
      wrap = document.createElement('div');
      wrap.style.cssText = 'position:fixed;left:-99999px;top:0;';
      document.body.appendChild(wrap);
      wrap.innerHTML = buildXhsCardHtml(card.kind, card.payload, palette.s, brandSign, palette.bg);
      const canvas = await html2canvas(wrap.firstChild, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
      const dataUrl = canvas.toDataURL('image/png');
      setXhsCards((prev) => prev.map((c, idx) => (idx === i ? { ...c, dataUrl } : c)));
      showToast('✅ 已更新这张卡片');
    } catch (e) {
      showToast('⚠️ 生成失败，请重试');
    } finally {
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
      setXhsBusy(false);
    }
  };

  // 一键下载全套：打包成 zip，解压后就是一个文件夹装着所有图片
  const downloadAllXhsCards = () => {
    if (!xhsCards.length) return;
    try {
      const stamp = new Date();
      const folder = `小红书图集-${stamp.getMonth() + 1}月${stamp.getDate()}日`;
      const files = xhsCards.map((c, i) => ({
        name: `${folder}/${String(i + 1).padStart(2, '0')}-${c.label}.png`,
        data: dataUrlToBytes(c.dataUrl)
      }));
      const blob = makeZip(files);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${folder}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
      showToast(`⬇ 已打包 ${xhsCards.length} 张卡片，解压即是文件夹`);
    } catch (e) {
      showToast('⚠️ 打包失败，请用单张下载');
    }
  };

  // ===== 图片水印：把署名烘进图片（右下角，半透明） =====
  const bakeImageWatermark = (src, text) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const fs = Math.max(16, Math.round(canvas.width / 28));
          ctx.font = `${fs}px -apple-system, 'PingFang SC', 'Hiragino Sans GB', sans-serif`;
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          const pad = Math.round(fs * 0.8);
          const label = `🐾 ${text}`;
          ctx.fillStyle = 'rgba(0,0,0,0.30)';
          ctx.fillText(label, canvas.width - pad + 1, canvas.height - pad + 1);
          ctx.fillStyle = 'rgba(255,255,255,0.78)';
          ctx.fillText(label, canvas.width - pad, canvas.height - pad);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = reject;
      img.src = src;
    });

  // enabled/preset/customText 由调用方直接传入，避免异步状态竞争
  const applyImageWm = async (index, enabled, preset, customText) => {
    const block = blocks[index];
    if (!block || block.type !== 'image') return;
    const src = block.rawContent || block.content;
    if (!enabled) {
      setBlocks((prev) =>
        prev.map((b, i) => (i === index ? { ...b, wmEnabled: false, wmPreset: preset, content: b.rawContent || b.content } : b))
      );
      return;
    }
    if (!src) {
      showToast('⚠️ 请先添加图片');
      return;
    }
    const text = (preset === 'custom' ? customText : preset || '荣玥老师').trim();
    if (!text) {
      showToast('⚠️ 请输入水印文字');
      return;
    }
    try {
      const baked = await bakeImageWatermark(src, text);
      setBlocks((prev) =>
        prev.map((b, i) =>
          i === index ? { ...b, wmEnabled: true, wmPreset: preset, wmText: preset === 'custom' ? customText : b.wmText, rawContent: src, content: baked } : b
        )
      );
      showToast('✅ 水印已应用');
    } catch (e) {
      showToast('⚠️ 外链图片无法加水印，请下载后重新上传再试');
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
    if (type === 'summary') {
      setBlocks((prev) => [
        ...prev,
        { type, title: '🐼 猫哥小纸条', content: '猫哥想对你说，', watermark: '— 荣玥老师', imgPrompt: '', hidden: false }
      ]);
      return;
    }
    if (type === 'followTop') {
      // 插到大标题后面（没有大标题就插最前）
      setBlocks((prev) => {
        const idx = prev.findIndex((b) => b.type === 'title');
        const blk = { type, content: followTopPresets[0].text };
        if (idx >= 0) return [...prev.slice(0, idx + 1), blk, ...prev.slice(idx + 1)];
        return [blk, ...prev];
      });
      return;
    }
    if (type === 'followBottom') {
      setBlocks((prev) => [...prev, { type, content: followBottomPresets[0].text }]);
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
    readFileAsCompressedDataUrl(file, (dataUrl) => setImageUrlInput(dataUrl || ''));
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
    const styleId = block.imgStyle || 'illustration';
    const stylePreset = imageStylePresets.find((s) => s.id === styleId);
    let final = basePrompt;
    if (stylePreset && styleId !== 'photo') {
      // Replace photo keywords with selected style
      const photoKeywords = /cinematic|editorial photo|35mm film|film look|shallow depth of field|photography|soft natural light/gi;
      final = basePrompt.replace(photoKeywords, '').replace(/,\s*,/g, ',').trim() + ', ' + stylePreset.keywords;
    }
    // 图片级"生成中文文字"开关（默认关），全局开关也兼容
    if (block.zhText || generateChineseText) {
      final += ', text in Simplified Chinese, hanzi, chinese typography, clear readable text';
    }
    return final;
  };

  // 把备选标题设为文章大标题（已有 title 块则替换，否则插入到最前）
  // 被换下来的旧标题会自动存回备选列表，随时可以换回去
  const applyTitleOption = (raw) => {
    const title = raw.replace(/^（[^）]{1,10}）\s*/, '').trim();
    if (!title) return;
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.type === 'title');
      if (idx >= 0) {
        const old = (prev[idx].content || '').trim();
        if (old && old !== title) {
          setTitleOptions((opts) => {
            const stripped = opts.map((o) => o.replace(/^（[^）]{1,10}）\s*/, '').trim());
            return stripped.includes(old) ? opts : [`（原标题）${old}`, ...opts];
          });
        }
        return prev.map((b, i) => (i === idx ? { ...b, content: title } : b));
      }
      return [{ type: 'title', content: title }, ...prev];
    });
    showToast('✅ 已设为大标题');
  };

  const copySummaryNotePrompt = (index) => {
    const block = blocks[index];
    if (!block) return;
    const prompt =
      block.notePrompt || buildSummaryNotePrompt(block, block.noteImgStyle || 'handnote_panda', block.noteLayout || 'column');
    // 复制的同时把提示词显示出来，方便手动修改后再复制
    setBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, notePrompt: prompt, notePromptVisible: true } : b))
    );
    copyToClipboard(prompt, '✅ 手绘笔记提示词已复制（下方可修改）');
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
    const prompt = `你是猫门（心理学内容品牌）的内容操盘手，请根据下面这篇公众号文章，生成全套可直接发布的营销物料。每一条都要能直接复制去发，不需要再改。

## 两个人设（写对应渠道时必须代入）
- **猫哥**：猫门主理人，心理学老师。说话真诚、接地气，有专业底子但从不端着。会讲自己的真实经历和写作时的心情，偶尔自嘲。关心读者像关心朋友，从不推销。
- **猫哥小助手**：猫门的运营小伙伴。年轻、热心，像帮朋友安利一个真心觉得好的东西。语气轻快但不浮夸。

## 写作硬规则（每条物料都必须遵守）
1. 每条至少引用文章中的1-2个具体元素（概念、场景、金句、例子），不许写放之四海皆准的空话
2. 句子短、自然、有呼吸感；像人打字发出来的，不像文案模板
3. 禁用词：爆款/引爆/震撼/干货满满/一文讲透/赋能/情绪价值/让你…
4. 句式黑名单：「不是…而是…」「不仅…而且…」「与其…不如…」「你有没有发现」「说白了」「更重要的是」，禁止三连排比
5. 不写“本文/这篇文章/以上/读完你就…”
6. 自查标准：这条内容原样发在对应平台，会不会被认出是 AI 写的？会就重写
7. **物料之间和物料内部都不要输出 --- 分隔线**

## 平台安全规则（避免限流/违规，必须遵守）
- 禁止绝对化用语：最/第一/顶级/唯一/100%/彻底解决/根治
- 心理学内容不做疗效承诺：不说"治好焦虑抑郁""摆脱内耗"，改说"缓解""改善""换个角度看"
- 小红书：不出现"点击链接/加微信/公众号"等站外导流词；需要引导时只说"想看完整版的可以来主页找我"
- 微博：不用"转发抽奖"式诱导；话题选真实存在的大话题
- 不编造数据、案例、身份背书

## 文章风格参考
- 风格：${styleLabel}（${styleDesc}）

## 文章内容
${articleSummary}

## 输出排版规则
- 你输出的换行会被原样使用，朋友圈/社群这类"一句一行"的内容必须真的换行
- 每类物料直接输出成品，不要写"要求""说明"之类的话

## 请生成以下16种物料（每类用【类别名】标注，类别名必须一字不差；内容里不要再出现【】符号）

【朋友圈（猫哥版）】
猫哥本人发的。这条是全套物料里最难的，先记住朋友圈专属禁令：
- 禁止"金句引用体"（引用一句自己文章的话再抒情——这是最典型的营销号朋友圈）
- 禁止对仗工整的句子、禁止书名号、禁止"分享给你们""希望对你有帮助"
- 禁止把文章内容复述一遍；朋友圈只写文章**之外**的东西：写作时的狼狈、犹豫、某个具体的人
- 允许口语、允许不完整句、允许"没写完感"——真人朋友圈不是成品文案
格式：一句一行，行尾不加句号，emoji 0-2个。3-6行，60-120字。
三种真实感路径（每次随机选一种，别每次都一样）：
① 狼狈路径：写这篇时的具体困难（"这篇写废了两版 / 越写越心虚 因为我自己也刚做到一半"）
② 具体的人路径：想起某个学生/读者的真事（"上周有个姑娘跟我说 她背完书站在楼道里哭 / 这篇是给她的 也给一样的你"）
③ 自嘲路径：拆自己台（"写了篇教人别内耗的 写的过程内耗了三天 / 行吧 至少方法是真的有用"）

【朋友圈（小助手版）】
小助手发的，一个真的被内容打到的年轻人，不是客服。同样一句一行、少标点、emoji 0-2个。
禁令同上，另加：不要"猫哥今天这篇"开头的固定句式，每次换开头。
路径参考：自己的代入（"看到第三段的时候 想起我大四那年"）/ 半吐槽（"老师这篇写得也太狠了 句句戳我"）/ 转给specific人（"发给了我那个考研二战的朋友 她回我一个哭脸"）。3-5行，50-90字。

【微博文案】
微博的规则是：前13个字决定会不会被展开。第一句必须是观点或悬念本身，不要铺垫。100-140字，短句多断行，带1-2个真实存在的大话题（如#心理学# #成长#），结尾抛一个让人想在评论区站队/接话的问题（"你是哪种？""你也这样吗？"）。

【小红书文案】
小红书的规则是：像闺蜜分享，不像作者发文。首行=钩子（戳处境或反常识，可带1个emoji），正文每段1-2句就换行，段首用emoji小图标（📌✅💡🌱这类）做视觉锚点，中段2-3个要点，结尾开放式提问引导评论收藏（"你们还有什么办法，评论区交换一下"）。250-350字，话题标签4-6个（大标签+精准长尾标签混搭）。

【小红书标题】
5个备选，每个≤20字（超了会被截断）。必须含具体元素：数字/身份/场景/结果，如"考研背了3个月，脑子里还是没路"。风格覆盖：反常识/数字+痛点/情绪共鸣/人群点名/场景细节。禁止"干货""必看""码住"这类被用烂的词。

【社群转发话术】
群里的规则是：视觉上要一眼能扫完，emoji 是让人停下滑动的钩子。短行+符号排版，格式参考：
🔥 一句真实反应（今天这篇我看完愣了几秒）
▍这篇讲什么（一句话）
▍谁该看（一句话）
👉 最后一句轻推（链接我放下面了）
总共60-100字，emoji/符号 3-4个（🔥💡▍👉📎 这类），别花哨。

【私聊推荐话术】
像发给某个具体朋友。60-90字，必须有"为什么想到你"的具体理由（对应TA最近说过的事/TA的处境），结尾给对方台阶（"不急，有空翻翻"）。

【文章标题备选】
8个不同风格（悬念/数字/痛点/好奇/共鸣/反差等），克制但有钩子。

【目标人群画像】
3-5类，每类1-2句：处境+此刻的痛点+这篇文章给TA的东西。

【金句卡片文案】
5条，每条15-28字，从文章提炼或升华，有画面感，避免鸡汤口号。

【猫哥语录】
5-8条。用猫哥的口吻把文章核心观点重说一遍：像老师下课后跟你单独说的那句话，具体、温和、有力量。每条一句话，15-40字，可直接做成语录卡片。

【短视频口播文案】
口播的规则是：前3秒说的话决定完播率。第一句直接说结论或反常识（"背了三个月，脑子里还是没路——问题不在记性"），不要"大家好今天聊聊"。中段每15-20秒一个信息点，句子短到一口气能说完，多用"你"。220-320字（约1分钟），倒数第二句给一个今天就能做的小动作，最后一句引导评论（"你卡在哪一步，评论区告诉我"）。

【转发介绍语】
微信里把文章转发给朋友或群时附带的那句话。**不超过120字，一两句够了就别凑**。像顺手推荐（"这篇讲透了为什么背了很多还是不会做题，我看完把笔记方式改了"），说清楚它解决什么+一个让人想点开的具体点。禁止"分享一篇好文"这种废话。

【次条/转载版】
100-140字：一句简介+一句核心看点。

【渠道配图提示词】
必须输出**4条独立的**中文AI生图提示词，按以下编号一条一行，一条都不能少、不能合并：
1. 朋友圈猫哥版配图：（与猫哥朋友圈文案的场景呼应——他写作/生活的第一视角实拍感，如深夜书桌、改稿的屏幕、窗边的茶）
2. 朋友圈小助手版配图：（与小助手文案呼应——年轻人的视角，如通勤路上的手机截图感、书页特写、便利贴笔记）
3. 微博配图：（1:1，与文章主题呼应的完整画面，情绪或隐喻表达，能独立看懂）
4. 小红书封面：（3:4竖版，完整饱满的画面，主体突出、色彩讨喜、有点击欲）
硬规则：每张都是**铺满画幅的完整画面**，禁止写"留白/空白区域/放文字的位置/白板/卡片框"这类描述——那会生成大片空白的废图。1和2必须是两张完全不同的图。每条包含画面主体/构图/色调/风格，具体到能直接出图。
除了1和2保持实拍感，3和4每条末尾都要追加统一风格基底：暖色扁平插画风、奶油色蜜桃色鼠尾草绿的柔和配色、圆润造型、纸纹质感、构图饱满讲究、治愈氛围、高质量、画面中不出现文字和水印——和正文配图一个质感。若画面含熊猫，必须写明"黑白配色的大熊猫"，防止AI画成棕色小浣熊。

【SEO关键词】
10-15个搜索关键词，含长尾词，用、分隔。

---
请直接输出全部物料，不要解释。`;
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
      if (match) {
        // 去掉 AI 在类别之间输出的 --- 分隔线和多余空行
        nextMaterials[mt.id] = match[1]
          .replace(/^\s*-{3,}\s*$/gm, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      }
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
    const styleId = imageStyles[type] || 'illustration';
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
        readFileAsCompressedDataUrl(file, (dataUrl) => {
          setGeneratedImages((prev) => ({ ...prev, [type]: dataUrl }));
          showToast('✅ 图片已粘贴');
        });
        e.preventDefault();
        return;
      }
    }
  };

  const handleGeneratedImageUpload = (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileAsCompressedDataUrl(file, (dataUrl) => {
      setGeneratedImages((prev) => ({ ...prev, [type]: dataUrl }));
      showToast('✅ 图片已上传');
    });
  };

  const removeGeneratedImage = (type) => {
    setGeneratedImages((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
    showToast('已删除图片');
  };

  // 预览 HTML 只在 blocks / 配色变化时重建，避免每次输入都全量重渲染（提速关键）
  const previewHtml = useMemo(
    () =>
      blocks
        .map((b, i) => {
          const html = generateBlockHTML(b, currentScheme, density);
          return `<div data-block-index="${i}" style="margin:0;padding:0;">${html}</div>`;
        })
        .join(''),
    [blocks, currentScheme, density]
  );

  const generateFullCode = () =>
    blocks
      .filter((b) => b.type !== 'imagePlaceholder')
      .map((b) => generateBlockHTML(b, currentScheme, density))
      .join('');

  const copyAllCode = () => {
    const code = generateFullCode();
    if (!code) {
      showToast('⚠️ 无内容');
      return;
    }
    copyToClipboard(code, '✅ HTML源码已复制');
  };

  // ===== 一键复制到公众号 =====
  // 原理与壹伴/135编辑器相同：样式内联(本项目生成的HTML本来就是内联的) + 标签/属性清洗 +
  // 把公众号会丢弃的 position:absolute 装饰转成流内写法 + 以 text/html 写入剪贴板。
  const buildWechatHtml = () => {
    const code = generateFullCode();
    if (!code) return '';
    const doc = new DOMParser().parseFromString(`<div id="__mm_root">${code}</div>`, 'text/html');
    const root = doc.getElementById('__mm_root');

    // 1) 移除公众号不支持的标签
    root.querySelectorAll('script,iframe,link,meta,form,input,button,video,audio,style').forEach((el) => el.remove());

    // 2) div 不在公众号粘贴白名单里，样式会被剥掉——统一转成 section
    Array.from(root.querySelectorAll('div')).forEach((div) => {
      const sec = doc.createElement('section');
      Array.from(div.attributes).forEach((attr) => sec.setAttribute(attr.name, attr.value));
      while (div.firstChild) sec.appendChild(div.firstChild);
      div.parentNode.replaceChild(sec, div);
    });

    // 3) 其余绝对定位装饰（爪印水印/熊猫/引号）：转成零高度流内元素，公众号不会丢
    root.querySelectorAll('*').forEach((el) => {
      const st = el.getAttribute('style') || '';
      if (!/position\s*:\s*absolute/.test(st)) return;
      const parent = el.parentElement;
      if (!parent) return;
      const isBottom = /bottom\s*:/.test(st);
      const alignRight = /right\s*:/.test(st);
      const fontSize = parseFloat((st.match(/font-size\s*:\s*([\d.]+)px/) || [])[1] || '16');
      const opacity = (st.match(/opacity\s*:\s*([\d.]+)/) || [])[1];
      const rotate = (st.match(/rotate\(\s*(-?[\d.]+)deg\s*\)/) || [])[1];
      const color = (st.match(/(?:^|;)\s*color\s*:\s*([^;]+)/) || [])[1];
      const wrap = doc.createElement('section');
      wrap.setAttribute('style', `height:0;line-height:0;margin:0;padding:0;text-align:${alignRight ? 'right' : 'left'};overflow:visible;`);
      const span = doc.createElement('span');
      const pull = isBottom ? Math.round(fontSize * 0.8) : Math.max(0, Math.round(fontSize * 0.3));
      span.setAttribute(
        'style',
        [
          'display:inline-block',
          `font-size:${fontSize}px`,
          'line-height:1',
          opacity ? `opacity:${opacity}` : '',
          color ? `color:${color}` : '',
          `margin-top:-${pull}px`,
          rotate ? `transform:rotate(${rotate}deg)` : ''
        ]
          .filter(Boolean)
          .join(';')
      );
      span.innerHTML = el.innerHTML;
      wrap.appendChild(span);
      if (isBottom) parent.appendChild(wrap);
      else parent.insertBefore(wrap, parent.firstChild);
      el.remove();
    });

    // 4) 属性清洗：只保留公众号认可的属性
    const KEEP = ['style', 'src', 'alt', 'width', 'height'];
    root.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        if (!KEEP.includes(attr.name.toLowerCase())) el.removeAttribute(attr.name);
      });
      // position:fixed / z-index 清掉，避免编辑器整段丢弃
      const st = el.getAttribute('style');
      if (st) {
        el.setAttribute(
          'style',
          st
            .replace(/position\s*:\s*fixed;?/g, '')
            .replace(/z-index\s*:\s*[^;]+;?/g, '')
            .replace(/pointer-events\s*:\s*[^;]+;?/g, '')
        );
      }
    });

    // 5) 外层统一包一个 section（公众号编辑器的标准容器），页边距在这里生效
    return `<section style="font-size:15px;line-height:1.8;letter-spacing:0.5px;${pageMargin ? `padding:0 ${pageMargin}px;` : ''}">${root.innerHTML}</section>`;
  };

  const fallbackCopyRichText = (html) => {
    const holder = document.createElement('div');
    holder.setAttribute('contenteditable', 'true');
    holder.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    holder.innerHTML = html;
    document.body.appendChild(holder);
    const range = document.createRange();
    range.selectNodeContents(holder);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    const ok = document.execCommand('copy');
    sel.removeAllRanges();
    document.body.removeChild(holder);
    return ok;
  };

  const copyForWechat = async () => {
    const html = buildWechatHtml();
    if (!html) {
      showToast('⚠️ 无内容');
      return;
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const plain = tmp.textContent || '';
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plain], { type: 'text/plain' })
          })
        ]);
      } else if (!fallbackCopyRichText(html)) {
        throw new Error('fallback failed');
      }
      showToast('✅ 已复制，去公众号编辑器直接 Ctrl/Cmd+V 粘贴');
    } catch (e) {
      if (fallbackCopyRichText(html)) {
        showToast('✅ 已复制，去公众号编辑器直接 Ctrl/Cmd+V 粘贴');
      } else {
        showToast('⚠️ 复制失败，请重试或用「复制HTML」');
      }
    }
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
        <title>猫门智能排版器 v19</title>
      </Head>

      <div className="container">
        <div className="header">
          <h1>🐱 猫门智能排版器</h1>
          <p>v19 · 公众号一键复制 + 小红书图集</p>
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
                              <option value="panda">🐼 熊猫水印</option>
                              <option value="paws">🐾 爪印水印</option>
                              <option value="seal">🀄 猫门印章</option>
                              <option value="center">➖ 居中大字</option>
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
                              <option value="panda">🐼 熊猫</option>
                              <option value="star">✦ 星星</option>
                              <option value="leaf">🍃 叶子</option>
                              <option value="dots">··· 圆点</option>
                              <option value="line">— 细线</option>
                            </select>
                          )}
                          {(block.type === 'followTop' || block.type === 'followBottom') && (
                            <select
                              className="block-style-sel"
                              value=""
                              onChange={(e) => {
                                const presets = block.type === 'followTop' ? followTopPresets : followBottomPresets;
                                const preset = presets.find((p) => p.id === e.target.value);
                                if (preset) updateBlockContent(index, preset.text);
                              }}
                              style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                              title="选一版文案模板填入，填入后可继续编辑"
                            >
                              <option value="" disabled>
                                📋 换一版文案…
                              </option>
                              {(block.type === 'followTop' ? followTopPresets : followBottomPresets).map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          )}
                          {block.type === 'heading' && (
                            <select
                              className="block-style-sel"
                              value={block.styleOption || 'bar'}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                newBlocks[index].styleOption = e.target.value;
                                setBlocks(newBlocks);
                              }}
                              style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                            >
                              <option value="bar">▎竖线（默认）</option>
                              <option value="pill">💊 胶囊底色</option>
                              <option value="underline">＿ 粗下划线</option>
                              <option value="center">➖ 居中短线</option>
                              <option value="tag">🔖 浅底色块</option>
                              <option value="paw">🐾 爪印开头</option>
                            </select>
                          )}
                          {block.type === 'summary' && (
                            <select
                              className="block-style-sel"
                              value={block.noteImgStyle || 'handnote_panda'}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                newBlocks[index].noteImgStyle = e.target.value;
                                newBlocks[index].notePrompt = ''; // 换风格后重新生成提示词
                                setBlocks(newBlocks);
                              }}
                              style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                              title="手绘笔记图的风格（配合🎨按钮使用）"
                            >
                              {summaryNoteStyles.map((st) => (
                                <option key={st.id} value={st.id}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                          )}
                          {block.type === 'summary' && (
                            <select
                              className="block-style-sel"
                              value={block.noteLayout || 'column'}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                newBlocks[index].noteLayout = e.target.value;
                                newBlocks[index].notePrompt = ''; // 换版式后重新生成提示词
                                setBlocks(newBlocks);
                              }}
                              style={{ marginLeft: 6, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13 }}
                              title="手绘笔记图的版式"
                            >
                              <option value="column">🏷 带栏目名（默认）</option>
                              <option value="plain">✏️ 不带栏目名</option>
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
                            {block.type === 'summary' && (
                              <button
                                className="block-act-btn"
                                title="复制手绘笔记提示词：拿去AI生图（支持中文文字的工具，如即梦），生成后把图粘贴回来即可"
                                onClick={() => copySummaryNotePrompt(index)}
                              >
                                🎨
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
                            <>
                              <input
                                type="text"
                                className="block-input"
                                value={block.content || ''}
                                onChange={(e) => updateBlockContent(index, e.target.value)}
                                onPaste={(e) => handleBlockImagePaste(e, index)}
                              />
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                                <label style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={!!block.wmEnabled}
                                    onChange={(e) => applyImageWm(index, e.target.checked, block.wmPreset || '荣玥老师', block.wmText || '')}
                                  />
                                  水印
                                </label>
                                <select
                                  value={block.wmPreset || '荣玥老师'}
                                  onChange={(e) => {
                                    const preset = e.target.value;
                                    if (preset === 'custom') {
                                      setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, wmPreset: preset } : b)));
                                    } else {
                                      applyImageWm(index, !!block.wmEnabled, preset, block.wmText || '');
                                    }
                                  }}
                                  style={{ padding: '3px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}
                                >
                                  <option value="荣玥老师">荣玥老师</option>
                                  <option value="熊猫谈心">熊猫谈心</option>
                                  <option value="custom">自定义…</option>
                                </select>
                                {block.wmPreset === 'custom' && (
                                  <>
                                    <input
                                      type="text"
                                      value={block.wmText || ''}
                                      placeholder="自定义水印文字"
                                      onChange={(e) => updateBlockField(index, 'wmText', e.target.value)}
                                      style={{ padding: '3px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12, width: 130 }}
                                    />
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      style={{ fontSize: 12, padding: '2px 10px' }}
                                      onClick={() => applyImageWm(index, true, 'custom', block.wmText || '')}
                                    >
                                      应用
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
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
                                      value={block.imgStyle || 'illustration'}
                                      onChange={(e) => updateBlockImageStyle(index, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{ padding: '3px 6px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}
                                    >
                                      {imageStylePresets.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                                    </select>
                                    <label
                                      style={{ fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer' }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={!!block.zhText}
                                        onChange={(e) => updateBlockField(index, 'zhText', e.target.checked)}
                                      />
                                      生成中文文字
                                    </label>
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
                          {block.type === 'title' && titleOptions.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>🔥 标题备选（点击替换，被换下的会自动存回这里）：</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {titleOptions.map((t, i) => (
                                  <button
                                    key={i}
                                    className="btn btn-secondary btn-sm"
                                    style={{ margin: '0 6px 6px 0', fontSize: 12, padding: '3px 10px', whiteSpace: 'normal', textAlign: 'left' }}
                                    onClick={() => applyTitleOption(t)}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {block.type === 'summary' && block.notePromptVisible && (
                            <div style={{ marginTop: 8 }}>
                              <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>🎨 手绘笔记提示词（可直接修改，改完点复制）：</div>
                              <textarea
                                className="block-input"
                                style={{ minHeight: 140, fontSize: 12 }}
                                value={block.notePrompt || ''}
                                onChange={(e) => updateBlockField(index, 'notePrompt', e.target.value)}
                              />
                              <button
                                className="btn btn-secondary btn-sm"
                                style={{ marginTop: 4, fontSize: 12 }}
                                onClick={() => copyToClipboard(block.notePrompt || '', '✅ 提示词已复制')}
                              >
                                复制提示词
                              </button>
                            </div>
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
                  <button className="add-block-btn" onClick={() => addBlock('summary')}>
                    + 猫哥小纸条
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
                  <button className="add-block-btn" onClick={() => addBlock('followTop')} title="标题下方的『点击蓝字关注+设为星标』引导条">
                    + 关注引导(顶)
                  </button>
                  <button className="add-block-btn" onClick={() => addBlock('followBottom')} title="文末的点赞/在看/关注引导卡，需要二维码就在它下面加一个图片块">
                    + 关注引导(尾)
                  </button>
                </div>

                {titleOptions.length > 0 && !blocks.some((b) => b.type === 'title') && (
                  <div className="color-bar" style={{ flexWrap: 'wrap', marginBottom: 8 }}>
                    <span className="color-label">🔥 标题备选（点击设为大标题）：</span>
                    {titleOptions.map((t, i) => (
                      <button
                        key={i}
                        className="btn btn-secondary btn-sm"
                        style={{ margin: '0 6px 6px 0', fontSize: 12, padding: '3px 10px', whiteSpace: 'normal', textAlign: 'left' }}
                        onClick={() => applyTitleOption(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
                <div className="color-bar" style={{ marginBottom: 8, flexWrap: 'wrap' }}>
                  <span className="color-label">间距：</span>
                  {[
                    { id: 'compact', label: '紧凑' },
                    { id: 'normal', label: '适中' },
                    { id: 'loose', label: '宽松' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      className={`btn btn-sm ${density === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ marginRight: 6, padding: '3px 12px', fontSize: 12 }}
                      onClick={() => setDensity(opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                  <span className="color-label" style={{ marginLeft: 10 }}>页边距：</span>
                  {[
                    { v: 0, label: '标准' },
                    { v: 8, label: '舒适' },
                    { v: 16, label: '宽松' },
                    { v: 24, label: '超宽' }
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      className={`btn btn-sm ${pageMargin === opt.v ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ marginRight: 6, padding: '3px 12px', fontSize: 12 }}
                      onClick={() => setPageMargin(opt.v)}
                      title="正文两侧留白（公众号自带边距之外再加）"
                    >
                      {opt.label}
                    </button>
                  ))}
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
                      { id: 'teal', bg: '#3a8b8b', title: '湖水 (清爽)' },
                      { id: 'ink', bg: '#5b6d92', title: '黛蓝 (水墨)' },
                      { id: 'lotus', bg: '#b07285', title: '藕粉 (温柔)' },
                      { id: 'ginkgo', bg: '#b5892e', title: '鹅黄 (暖阳)' },
                      { id: 'deepteal', bg: '#2f5d50', title: '墨绿 (沉稳)' },
                      // Premium Gradient
                      { id: 'aurora', bg: 'linear-gradient(135deg,#845ec2,#c9b6e4)', title: '极光 (梦幻)' },
                      { id: 'cream', bg: 'linear-gradient(135deg,#e8967a,#f2ddcc)', title: '奶油 (甜美)' },
                      { id: 'midnight', bg: 'linear-gradient(135deg,#2c3e50,#8d9aa5)', title: '午夜 (深邃)' }
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
                    style={{ paddingLeft: 20 + pageMargin, paddingRight: 20 + pageMargin }}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                  <div className="phone-bottom">
                    <button className="btn btn-primary btn-sm" onClick={copyForWechat} title="带格式复制，直接粘贴进公众号编辑器">
                      📋 一键复制公众号
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={copyAllCode} title="复制HTML源码（配合135/壹伴等第三方编辑器使用）">
                      复制HTML
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => goToStep(4)}>
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

          <div className="card">
            <div className="card-header">
              <div className="card-title">📕 小红书图集</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {xhsCards.length > 0 && (
                  <button className="btn btn-sm btn-outline" onClick={downloadAllXhsCards} disabled={xhsBusy}>
                    ⬇ 一键下载全套
                  </button>
                )}
                <button className="btn btn-sm btn-accent" onClick={generateXhsCards} disabled={xhsBusy}>
                  {xhsBusy ? '⏳ 生成中…' : '🖼 生成图集'}
                </button>
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 10, alignItems: 'center' }}>
                <label style={{ fontSize: 13, color: '#666' }}>
                  模式：
                  <select value={xhsMode} onChange={(e) => setXhsMode(e.target.value)} style={{ marginLeft: 6, padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                    <option value="cards">卡片精选（封面+金句+笔记+小纸条）</option>
                    <option value="pages">全文分页（预览按模块完整切页）</option>
                  </select>
                </label>
                <label style={{ fontSize: 13, color: '#666' }}>
                  背景：
                  <select value={xhsBg} onChange={(e) => setXhsBg(e.target.value)} style={{ marginLeft: 6, padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13 }}>
                    <option value="scheme">跟随配色</option>
                    <option value="cream">奶白</option>
                    <option value="blush">浅粉</option>
                    <option value="sand">暖沙</option>
                    <option value="night">夜幕（深色）</option>
                    <option value="custom">自定义颜色</option>
                  </select>
                </label>
                {xhsBg === 'custom' && (
                  <input type="color" value={xhsCustomBg} onChange={(e) => setXhsCustomBg(e.target.value)} style={{ width: 36, height: 28, border: 'none', cursor: 'pointer' }} title="自定义背景色" />
                )}
                <label style={{ fontSize: 13, color: '#666' }}>
                  品牌署名：
                  <input
                    type="text"
                    value={brandSign}
                    onChange={(e) => setBrandSign(e.target.value)}
                    style={{ marginLeft: 6, padding: '4px 10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13, width: 190 }}
                  />
                </label>
              </div>
              <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 10 }}>
                尾卡引导语（安全写法：只出现品牌名，不出现"公众号/微信/链接/搜索"）：
                <textarea
                  value={xhsEndText}
                  onChange={(e) => setXhsEndText(e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 13, minHeight: 56 }}
                />
              </label>
              {xhsCards.length > 0 && xhsStampRef.current !== xhsSettingsKey() && (
                <div style={{ fontSize: 12, color: '#c0392b', marginBottom: 10 }}>⚠️ 设置已修改，点「生成图集」应用到全部卡片</div>
              )}
              <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>
                卡片头部品牌名自动取署名的第一段（改署名即同步）。配文用下方物料里的「小红书文案」。
              </div>
              {xhsCards.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                  {xhsCards.map((c, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <img src={c.dataUrl} alt={c.label} style={{ width: '100%', borderRadius: 8, border: '1px solid #eee' }} />
                      <div style={{ fontSize: 12, color: '#666', margin: '6px 0 4px' }}>{c.label}</div>
                      {c.kind !== 'page' && (
                        <textarea
                          value={c.kind === 'cover' ? c.payload.title || '' : c.payload.text || ''}
                          onChange={(e) => updateXhsCardText(i, e.target.value)}
                          style={{ width: '100%', fontSize: 12, padding: 6, borderRadius: 6, border: '1px solid #e5e5e5', minHeight: 52, marginBottom: 4 }}
                        />
                      )}
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                        {c.kind !== 'page' && (
                          <button className="btn btn-secondary btn-sm" style={{ fontSize: 12 }} onClick={() => regenXhsCard(i)} disabled={xhsBusy}>
                            🔄 应用修改
                          </button>
                        )}
                        <a
                          href={c.dataUrl}
                          download={`xhs-${i + 1}-${c.label}.png`}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: 12, textDecoration: 'none', display: 'inline-block' }}
                        >
                          ⬇ 下载
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
