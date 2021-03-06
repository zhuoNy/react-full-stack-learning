# React 项目调试技巧
# 前端开发的调试方式
1. 借助以下插件进行调试。
    * Redux DevTools
    * React Developer Tools
    * React Perf
1. F12 之后，在源代码处打断点。
1. [堪比 Java 代码调试的方案：用 WebStorm + JetBrains IDE Support 插件，在 WebStorm 内调试代码](./JetBrainsIDESupport.md)，直接在 WebStorm 源代码上打断点，调试起来有点象在 IDEA 下调试 Java 程序，很爽！

## Redux DevTools
1. 安装插件
    * 以 qq 浏览器为例，搜索：Redux DevTools
    ![](images/ReduxDevToolsInstall.png)
1. 添加相应代码以支持在浏览器上使用 Redux DevTools 插件。
    * [参考](https://github.com/zalmoxisus/redux-devtools-extension#usage)
    * 对于分支 react-redux，要加上 redux-devtools-extension，只需要作如下调整:
    ```
    // 将 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 作为 createStore 方法的第三个参数，如下：
    const store = createStore(reducer, initValues, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    ```
1. 使用插件
    * npm start 之后，在 chrome 或者 qq 浏览器，按 F12，点击【Redux】，可跟踪 Action 以及 state 的变化。  
    ![](./images/ReduxDevToolsUse.png)

## React Developer Tools
1. 安装插件
    * 以 qq 浏览器为例，搜索：React Developer Tools
    ![](./images/ReactDeveloperToolsInstall.png)
1. 使用插件  
    ![](./images/ReactDeveloperToolsUse.png)

## React Perf
性能插件，具体使用可参考《深入浅出React和Redux》，P101-102，【4.6.3 工具应用】章节。  

### 扩展阅读  
* [介绍 React 性能分析器](http://react.css88.com/blog/2018/09/10/introducing-the-react-profiler.html)
* [React 的慢与快：优化 React 应用实战](https://www.jianshu.com/p/04583fca939b)

## F12 之后，在源代码处打断点
可 F12 之后，点击【Sources】，在想要监控变量的地方打断点，这种方式还是非常方便的。
![](./images/f12Debug.png)

