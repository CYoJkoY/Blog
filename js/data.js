// 由 build.js 自动生成，请勿手动编辑
export const notes = [
  {
    "id": "Install MapleMono-NF-CN Font",
    "title": "使用Scoop安装MapleMono-NF-CN字体并配置Vscode及网页",
    "date": "2026-07-03",
    "tags": [
      "学习",
      "配置"
    ],
    "content": "<h1>使用Scoop安装MapleMono-NF-CN字体</h1>\n<ol>\n<li>打开cmd后输入以下命令（请确保你已经安装了Scoop）：</li>\n<li>scoop bucket add nerd-fonts</li>\n<li>scoop install Maple-Mono-NF-CN</li>\n<li>Win+R输入fonts打开系统字体文件夹</li>\n<li>将安装的MapleMono-NF-CN字体添加到系统字体文件夹中</li>\n</ol>\n<h1>配置Vscode使用该字体</h1>\n<p>打开Vscode的设置（Ctrl + ,） 搜索<strong>Font Family</strong>，在<strong>Editor: Font Family</strong>中填入</p>\n<pre><code class=\"hljs language-text\">&#x27;Maple Mono NF CN&#x27;, monospace</code><span class=\"code-lang\">text</span></pre><p>在<strong>Terminal&gt;Integrated: Font Family</strong>中填入</p>\n<pre><code class=\"hljs language-text\">Maple Mono NF CN</code><span class=\"code-lang\">text</span></pre><p>之后在settings.json文件里面编辑Editor: Font Ligatures属性</p>\n<p>或直接编辑settings.json文件，添加以下内容：</p>\n<pre><code class=\"hljs language-json\"><span class=\"hljs-attr\">&quot;editor.fontFamily&quot;</span><span class=\"hljs-punctuation\">:</span> <span class=\"hljs-string\">&quot;&#x27;Maple Mono NF CN&#x27;, monospace&quot;</span><span class=\"hljs-punctuation\">,</span>\n<span class=\"hljs-attr\">&quot;terminal.integrated.fontFamily&quot;</span><span class=\"hljs-punctuation\">:</span> <span class=\"hljs-string\">&quot;Maple Mono NF CN&quot;</span><span class=\"hljs-punctuation\">,</span>\n<span class=\"hljs-attr\">&quot;editor.fontLigatures&quot;</span><span class=\"hljs-punctuation\">:</span> <span class=\"hljs-string\">&quot;&#x27;calt&#x27;, &#x27;cv96&#x27;, &#x27;cv97&#x27;, &#x27;cv98&#x27;&quot;</span><span class=\"hljs-punctuation\">,</span></code><span class=\"code-lang\">json</span></pre><p>关键特性：</p>\n<ul>\n<li>cv96：启用全宽引号显示</li>\n<li>cv97：修复省略号宽度问题</li>\n<li>cv98：确保破折号正确显示</li>\n</ul>\n"
  },
  {
    "id": "Urology",
    "title": "泌尿外科常见临床问题",
    "date": "2026-07-03",
    "tags": [
      "学习",
      "医学",
      "外科"
    ],
    "content": "<h1>泌尿外科围术期护理常规</h1>\n<h2>术前</h2>\n<ol>\n<li>心理疏导及戒烟戒酒。</li>\n<li>完善泌尿系B超、CTU（CT尿路造影）及尿常规。</li>\n<li>肠道准备（涉及肠代膀胱术者需口服抗生素及泻药）。</li>\n<li>预防性抗生素（术前0.5 ~ 1H）。</li>\n</ol>\n<h2>术后</h2>\n<ol>\n<li>管道护理：标识明确、妥善固定，记录引流液量及性状，保持尿管及造瘘管通畅（防打折、防脱出）。</li>\n<li>严格记录出入量，观察有无尿瘘、出血。</li>\n<li>鼓励早期床上活动，预防DVT（深静脉血栓形成），待肛门排气后逐步恢复饮食。</li>\n</ol>\n<h1>泌尿系结石：肾结石/输尿管结石/膀胱结石</h1>\n<h2>临床表现</h2>\n<ol>\n<li>突发患侧腰腹部剧烈绞痛，向下腹部或会阴发射。</li>\n<li>肉眼或镜下血尿。</li>\n<li>伴恶心呕吐。</li>\n<li>伴尿频尿急（膀胱结石典型为排尿中断）。</li>\n</ol>\n<h2>处理原则：</h2>\n<ol>\n<li>镇痛解痉：NSAIDs（非甾体抗炎药）或阿片类。</li>\n<li>保守排石：结石 &lt; 0.6cm，表面光滑，梗阻轻者，药物+多饮水。</li>\n<li>体外冲击波碎石（ESWL）。</li>\n<li>手术：输尿管镜碎石（URSL）、经皮肾镜碎石（PCNL）。</li>\n</ol>\n<h1>良性前列腺增生（BPH）</h1>\n<h2>临床表现</h2>\n<ol>\n<li>尿频：早期夜尿增多。</li>\n<li>排尿困难：典型进行性排尿困难，尿线变细，射程短。</li>\n<li>尿潴留：排尿中断，尿量减少。</li>\n</ol>\n<h2>处理原则</h2>\n<ol>\n<li>等待观察：症状轻微，无明显并发症。</li>\n<li>药物治疗：α受体阻滞剂（坦索罗辛）、5α-还原酶抑制剂（非那雄胺）。</li>\n<li>手术治疗：经尿道前列腺电切术（TURP）、经尿道前列腺激光切除术（TURP-LAS）、经尿道前列腺冷冻治疗术（TURP-FR）。</li>\n</ol>\n<h1>泌尿系肿瘤：肾癌/膀胱癌/前列腺癌</h1>\n<h2>临床表现</h2>\n<ol>\n<li>肾癌：无痛性肉眼血尿、腰痛、腹部肿块（三联征，晚期）。</li>\n<li>膀胱癌：间歇性无痛性肉眼血尿（最常见）。</li>\n<li>前列腺癌：早期多无症状，进展期类似良性前列腺增生（BPH）症状，晚期骨痛。</li>\n</ol>\n<h2>处理原则</h2>\n<ol>\n<li>手术根治：肾切除、膀胱全切+尿流改道、前列腺根治术。</li>\n<li>膀胱癌术后需定期膀胱灌注（卡介苗或化疗药）。</li>\n<li>根据病理行靶向治疗或内分泌治疗（前列腺癌）。</li>\n</ol>\n<h1>带状疱疹及后遗神经痛（PHN）</h1>\n<h2>临床表现</h2>\n<ol>\n<li>前驱期低热、乏力。</li>\n<li>典型皮损：沿单侧周围神经呈带状分布的红斑、簇集性水疱，不过正中线。</li>\n<li>神经痛（老年患者剧烈），皮损愈合后疼痛持续 &gt; 1月即为PHN。</li>\n</ol>\n<h2>处理原则</h2>\n<ol>\n<li>抗病毒：72H内黄金期，阿昔洛韦、伐昔洛韦。</li>\n<li>止痛：加巴喷丁、普瑞巴林。</li>\n<li>营养神经：甲钴胺。</li>\n<li>PHN可联合神经阻滞、物理治疗及抗抑郁焦虑药物。</li>\n</ol>\n<h1>上颌骨骨折</h1>\n<h2>临床表现</h2>\n<ol>\n<li>面部肿胀、畸形：镜面脸或长面畸形。</li>\n<li>咬合错乱：典型症状，开颌（咬合时，上下牙存在缝隙）或反颌（下牙包住上牙）。</li>\n<li>复视及眼球运动受限（眶壁受累）。</li>\n<li>鼻腔及口腔出血，伴脑脊液鼻漏（筛板损伤）。</li>\n</ol>\n<h2>处理原则</h2>\n<ol>\n<li>紧急处理：保持呼吸道通畅，止血抗休克。</li>\n<li>复位与固定：上颌骨骨折需尽早（2周内）手术切开复位，坚固内固定（RIF），恢复咬合关系。</li>\n<li>应用抗生素防感染，禁擤鼻涕。</li>\n</ol>\n<h1>常见静脉输液反应及处理</h1>\n<h3>发热反应（最常见）：寒战高热</h3>\n<p>立即减慢滴速或停药，保暖，给与抗过敏或解热药。</p>\n<h3>过敏反应：皮疹、胸闷，严重致过敏性休克</h3>\n<p>立即停药并更换输液器，平卧吸氧，注射肾上腺素及地塞米松。</p>\n<h3>静脉炎：沿静脉走行红肿热痛</h3>\n<p>抬高患肢，局部硫酸镁湿敷或水胶体敷料。</p>\n<h3>循环负荷过重（急性肺水肿）：呼吸困难，咳粉红色泡沫痰</h3>\n<p>立即停止输液，端坐位双腿下垂，高流量酒精湿化吸氧，给予利尿剂（呋塞米）。</p>\n<h3>空气栓塞</h3>\n<p>立即左侧卧位头低足高位，吸氧。</p>\n"
  },
  {
    "id": "Hello",
    "title": "欢迎来到我的赛博笔记",
    "date": "2026-07-02",
    "tags": [
      "测试"
    ],
    "content": "<h1>你好，数据流</h1>\n<p>这里是第一篇笔记，用 <strong>Markdown</strong> 编写，并自动构建为 HTML。</p>\n<blockquote>\n<p>“信息就是一切，一切皆为信息。”</p>\n</blockquote>\n<h2>为什么选择纯原生？</h2>\n<ul>\n<li><strong>零依赖</strong>：前端只有 HTML + CSS + JS</li>\n<li><strong>完全掌控</strong>：每一行代码都是自己的</li>\n<li><strong>赛博美学</strong>：暗色基调 + 霓虹点缀，不刺眼</li>\n</ul>\n<h2>代码块示例（支持语法高亮样式）</h2>\n<pre><code class=\"hljs language-javascript\"><span class=\"hljs-variable language_\">console</span>.<span class=\"hljs-title function_\">log</span>(<span class=\"hljs-string\">&quot;Hello, Cyber World!&quot;</span>);\n<span class=\"hljs-keyword\">const</span> answer = <span class=\"hljs-number\">42</span>;</code><span class=\"code-lang\">javascript</span></pre><h2>更多元素</h2>\n<p><strong>加粗文字</strong>，<em>斜体文字</em>，<code>行内代码</code>。</p>\n<h3>有序列表</h3>\n<ol>\n<li>第一项</li>\n<li>第二项</li>\n<li>第三项</li>\n</ol>\n<h3>无序列表</h3>\n<ul>\n<li>第一点</li>\n<li>第二点</li>\n<li>第三点</li>\n</ul>\n<h3>引用文本</h3>\n<blockquote>\n<p>这是引用文本。你可以在这里添加任何内容。</p>\n</blockquote>\n<h3>引用链接</h3>\n<p>你可以访问 <a href=\"https://github.com\">GitHub</a> 或 <a href=\"https://example.com\">示例网址</a>。</p>\n<h3>图片</h3>\n<img src=\"posts/imgs/Blog.png\" alt=\"测试\" width=\"100\" height=\"100\" style=\"width:100px;height:100px;\"><h2>结语</h2>\n<p>欢迎访问我的赛博笔记，希望你在这里找到灵感和乐趣。如果你有任何问题或建议，请随时告诉我。</p>\n"
  }
];
