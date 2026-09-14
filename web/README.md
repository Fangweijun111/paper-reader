# Paper Atlas 阅读器

完整前端源码，可独立运行；不需要原维护者的 Sites、Cloudflare 或 ChatGPT 登录配置。

```bash
npm ci
npm run dev
```

打开终端打印的地址。生产构建使用 `npm run build`，构建后用 `npm start` 启动 Node 服务。本项目未启用 GitHub Pages，也不改变维护者已有的私人网站。

## 内容结构

- `app/data/library.ts`：论文卡片、主题、经核对的发表信息与官方代码链接。
- `app/data/papers/<slug>/paper.ts`：双语内容；许可未明确允许转载的论文为来源说明。
- `app/data/papers/<slug>/report.ts`：导师报告与证据定位。
- `app/papers/<slug>/page.tsx`：阅读器页面。
- `public/papers/`：允许分发的PDF、图表和部分阅读附件。
- `app/data/content-rights.ts`：与根目录 `content-licenses.json` 对应的许可状态。
- 最早两篇沿用 `app/data/paper.ts`、`report.ts`、`wem-paper.ts`、`wem-report.ts`，不要因命名不同漏改。

“精读已完成”表示内容制作完成，不表示用户已经看过。用户的已读卡片、阅读位置、分栏和语言偏好存在该浏览器的 localStorage，不会通过 GitHub 自动跨设备同步。

## 验证

```bash
node ../scripts/check-public-release.mjs
npm test
npm run typecheck
npm run build
```

依赖和构建输出不属于源码，不提交 `node_modules`、`dist` 或解析缓存。开发完成且不再需要本地服务时可移除，下一次通过锁文件重新安装/构建。

## 权利边界

程序代码采用根目录MIT许可；论文原文、图表和译文采用逐篇记录的许可，不能统称MIT。World-Ego与RoboMemory内容是CC BY-NC-SA4.0，含非商业及相同方式共享条件。参见根目录 `THIRD_PARTY_NOTICES.md`。
