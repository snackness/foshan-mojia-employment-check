# GitHub 发布配置

## 仓库

- 所属账号：`snackness`
- 仓库名：`foshan-mojia-employment-check`
- 可见性：公开
- 默认分支：`main`
- 描述：`面向应届生与新员工的佛山墨家科技有限公司求职风险核查页（非官方网站）`
- 建议主题：`employment`、`labor-rights`、`job-seekers`、`due-diligence`、`github-pages`

## 公开边界

- 公开网站正文、编辑原则、修订记录、企业核验通知模板和应聘者核查 PDF；
- 不公开提交学校的详细 PDF/Word、原始合同、截图、录音、聊天记录、工资流水或任何可识别个人的材料；
- Issues、Discussions、Wiki、Projects 保持关闭，避免公开收集个人信息；
- 更正通道只使用 `assets/site-config.js` 中的专用邮箱。

## Pages

- Source：GitHub Actions；
- 工作流：`.github/workflows/pages.yml`；
- 权限仅为 `contents: read`、`pages: write`、`id-token: write`；
- 预期网址：`https://snackness.github.io/foshan-mojia-employment-check/`；
- 发布成功后开启 Enforce HTTPS。

## 发布后验收

1. 首页、关键事项、会议口径、核查清单、已经入职、说明与更正均可访问；
2. 页面显示“1万→6千”，不存在先前的错误数字；
3. 应聘者核查 PDF 可以下载，提交学校版材料不在公开仓库中；
4. 专用更正邮箱链接为 `jacksnackness@gmail.com`；
5. 六个官方法源链接、高校招聘页面和企业官网链接可打开；
6. 手机端菜单、筛选和“复制全部问题”功能正常；
7. 404 页面可显示，浏览器控制台没有错误；
8. 仓库提交作者未使用个人 QQ 邮箱。

## 发布记录

正式上线后，将实际网址、GitHub Actions 运行结果和发布日期补入 `REVISIONS.md`。
