# <big>dialog-1.0</big>  

<b>
###版本说明
> * plugin   : dialog(基于jquery与bootstrap开发)
> * varsion  : 1.0
> * author   : qboooogle
> * last edit: 2016.8.25
> 
</b>  



<em>使用环境：chrome firefox ie:8.0+ ... 等主流浏览器</em>  


####tip  one: 调用方法  
> *        1: 引入jquery,bootstrap插件
> *        2: 添加dialog启动按键(ps:<button id="dialog_btn" class="but btn-default">打开对话框</button>)
> *        3: 定义对话框容器(ps:<div class="dialog"></div>)
> *        4: $(selector).dialog(options,callback(_myfunc)); (ps:$(".dialog").dialog({options},function(_myfunc){...}))  

<hr>  

####tip  two：调用参数说明  
<pre>
        参数            |       类型    |       默认值          |       含义
        content         |       string  |       空              |       对话框内容
        title           |       string  |       空              |       对话框标题
        autoOpen        |       bool    |       false           |       是否自动打开对话框
        opacity         |       number  |       0.8             |       对话框可见度
        beforeOpen      |       function|       function(){}    |       打开对话框前触发事件
        afterClose      |       function|       function(){}    |       关闭对话框后触发事件
        isModel         |       bool    |       true            |       是否为模态
        isOpen          |       bool    |       false           |       是否为打开状态
        footerbar       |       array   |       空              |       自定义按键
</pre>  

<hr>  

####tip three：事件处理函数说明  
<pre>
        事件处理函数    |  含义                        | 调用示例
        open()         |  打开对话框                  | _apiObj.open()  
        close()        |  关闭对话框                  | _apiObj.close()  
        resize()       |  对话框自动调整大小          | _apiObj.resize()  
        setContent()   |  设置或增加对话框显示内容    | _apiObj.setContent('新增文本')  
        setHtml()      |  设置对话框内html文本        | _apiObj.setHtml('<button class = "btn">按键1</button>')  
        getFooterbar() |  获取对话框按键              | _apiObj.getFooterbar()  
        isOpen()       |  判断对话框是否为打开状态    | _apiObj.isOpen()  
</pre>
