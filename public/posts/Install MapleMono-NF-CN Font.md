---
title: 使用Scoop安装MapleMono-NF-CN字体并配置Vscode
date: 2026-07-03
tags: [学习, 配置]
---

# 使用Scoop安装MapleMono-NF-CN字体

1. 打开cmd后输入以下命令（请确保你已经安装了Scoop）：
2. scoop bucket add nerd-fonts
3. scoop install Maple-Mono-NF-CN
4. Win+R输入fonts打开系统字体文件夹
5. 将安装的MapleMono-NF-CN字体添加到系统字体文件夹中

# 配置Vscode使用该字体

1. 打开Vscode的设置（Ctrl + ,） 搜索**Font Family**，在**Editor: Font Family**中填入

```text
'Maple Mono NF CN', monospace
```

在**Terminal>Integrated: Font Family**中填入

```text
Maple Mono NF CN
```

2. 之后在settings.json文件里面编辑Editor: Font Ligatures属性

3. 或直接编辑settings.json文件，添加以下内容：

```json
"editor.fontFamily": "'Maple Mono NF CN', monospace",
"terminal.integrated.fontFamily": "Maple Mono NF CN",
"editor.fontLigatures": "'calt', 'cv96', 'cv97', 'cv98'",
```

关键特性：

- cv96：启用全宽引号显示
- cv97：修复省略号宽度问题
- cv98：确保破折号正确显示
