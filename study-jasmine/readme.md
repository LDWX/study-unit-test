这是一个纯 `jasmine` 测试用例学习，不包含 `babel` 及 `webpack`。

[官网测试用例及解析](./myTestUnit/jasmine_examples/firstSuiteSpecs.js)

# 使用 node 启动 jasmine
> 参考 nodeExecute.js。

# 使用命令行启动 jasmine

```bash
jasmine --config=./jasmine.json
```
## 若不指定 --config ,则默认地址为：
```bash
jasmine --config=./jasmine.json
```

## 执行单个/多个测试文件：
```bash
jasmine spec/appSpec.js
jasmine "**/model/**/critical/**/*Spec.js"
```
应用举例：使用配置文件
```bash
jasmine myTestUnit/jasmine_examples/PlayerSpec.js --config=./jasmine.json
```

具体执行命令请参考[官方执行配置教程](https://jasmine.github.io/setup/nodejs.html)

# jasmine 配置文件含义
```json
{
  // Spec directory path relative to the current working dir when jasmine is executed.
  "spec_dir": "spec",

  // Array of filepaths (and globs) relative to spec_dir to include and exclude
  // ! 代表不包含
  "spec_files": [
    "**/*[sS]pec.js",
    "!**/*nospec.js"
  ],

  // Array of filepaths (and globs) relative to spec_dir to include before jasmine specs
  // 在执行 specs 之前执行，一般用于自定义一些 matchers
  "helpers": [
    "helpers/**/*.js"
  ],

  // Stop execution of a spec after the first expectation failure in it
  "stopSpecOnExpectationFailure": false,

  // Run specs in semi-random order
  "random": false
}
```

# 注意事项
- 在 `spec` 中不要使用箭头函数，有时候会有问题。
- 判断普通类型时使用 toBe 和 toEqual 是相同的，判断引用类型时， toBe 会去判断内存地址是否相同， toEqual 只判断值是否相同




### 安装及基本配置
https://jasmine.github.io/setup/nodejs.html


### 测试用例举例
https://jasmine.github.io/tutorials/your_first_suite.html


### 所有API
https://jasmine.github.io/api/3.5/jasmine.html
