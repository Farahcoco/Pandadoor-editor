#!/bin/bash
# 双击这个文件即可启动猫门智能排版器
cd "$(dirname "$0")"
echo "🐼 正在启动猫门智能排版器…"
echo "启动后浏览器会自动打开；用完直接关掉这个终端窗口即可。"
# 3秒后自动打开浏览器（等服务先起来）
(sleep 3 && open http://localhost:3000) &
npm run dev
