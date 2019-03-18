---
title: php端解决跨域问题
categories: 学习笔记类
tags:
  - php
  - 后端
abbrlink: 9c2031c1
---

记录了下在本地用wamp部署服务器时遇到的问题。
<!-- more -->

由于我前端页面与后端使用两个不同的域名空间，所以提示了下面的跨域问题：

> Access to XMLHttpRequest at 'http://php.cc/tools/login/login' from origin 'http://demo.cc' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

遇到这个错误时，都能够马上想到解决方式了，在后端框架入口文件添加：

```php
header('Access-Control-Allow-Origin:http://demo.cc');
```

解决完这个问题后，在测试接口的时候又出现一个新的报错信息：

> Access to XMLHttpRequest at 'http://php.cc/tools/login/login' from origin 'http://demo.cc' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.

在网上搜到,需要添加上下面的这两行：

```php
header('Access-Control-Allow-Headers:content-type,token,id');
header("Access-Control-Request-Headers: Origin, X-Requested-With, content-Type, Accept, Authorization");
```

