/**
 * plugin   : dialog(基于jquery与bootstrap开发)
 * varsion  : 1.0
 * author   : qboooogle
 * last edit: 2016.8.25
 */

/*
*使用环境：chrome firefox ie:8.0+ ... 等主流浏览器
*
*tip  one: 调用方法
*        1: 引入jquery,bootstrap插件
*        2: 添加dialog启动按键(ps:<button id="dialog_btn" class="but btn-default">打开对话框</button>)
*        3: 定义对话框容器(ps:<div class="dialog"></div>)
*        4: $(selector).dialog(options,callback(_myfunc)); (ps:$(".dialog").dialog({options},function(_myfunc){...}))
*
*tip  two：调用参数说明
*        参数       |  类型      |  默认值       |  含义
*
*        content    |  string    |  空           |  对话框内容
*        title      |  string    |  空           |  对话框标题
*        autoOpen   |  bool      |  false        |  是否自动打开对话框
*        opacity    |  number    |  0.8          |  对话框可见度
*        beforeOpen |  function  |  function(){} |  打开对话框前触发事件
*        afterClose |  function  |  function(){} |  关闭对话框后触发事件
*        isModel    |  bool      |  true         |  是否为模态
*        isOpen     |  bool      |  false        |  是否为打开状态
*        footerbar  |  array     |  空           |  自定义按键
*
*tip three：事件处理函数说明
*        事件处理函数   |  含义                        | 调用示例
*
*        open()         |  打开对话框                  | _apiObj.open()
*        close()        |  关闭对话框                  | _apiObj.close()
*        resize()       |  对话框自动调整大小          | _apiObj.resize()
*        setContent()   |  设置或增加对话框显示内容    | _apiObj.setContent('新增文本')
*        setHtml()      |  设置对话框内html文本        | _apiObj.setHtml('<button class = "btn">按键1</button>')
*        getFooterbar() |  获取对话框按键              | _apiObj.getFooterbar()
*        isOpen()       |  判断对话框是否为打开状态    | _apiObj.isOpen()
*
 */
;(function($, _window){
	$.fn.dialog = function(parameter,callback) {
		defaults = {
			title           :   '',
			content         :   '',
			autoOpen        :   false,
			opacity         :   0.8,
			beforeOpen      :   function(){},
                  afterClose      :   function(){},
			isModel         :   true,
                  isOpen          :   false,
			footerbar       :   {},
			backgroundColor :   '#fff',
			prefix          :   'qboooogle'
		}
		var $window = $(_window);
		var $body = $('body');
		var options = $.extend(defaults, parameter);
		return this.each(function() {
                  var $this = $(this);
                  var _apiObj = {};
                  var $children = $('<p class = "panel-body">' + options.content + '</p>');
                  var $content = $('<div class = "panel-body"></div>').append($children);
                  var $disabled = $('<div class = "' + options.prefix + '-disabled"></div>');
                  var $container = $('<div class = "' + options.prefix + '-container panel panel-success"></div>');
                  var $heading = $('<div class = "panel-heading"></div>');
                  var $title = $('<h3 class = "panel-title">' + options.title + '</h3>');
                  var $close = $('<div class = "' + options.prefix + '-close ">' + options.close + '</div>');
                  var $footerbar = $('<div class = "' + options.prefix + '-footerbar panel-heading"></div>');
                  $this.appendTo($body);
                  $heading.append($title);
                  $disabled.appendTo($this);

                  $container.css({
                            'opacity'    : options.opacity,
                  	    'background' : options.backgroundColor
                        })
                        .appendTo($this)
                        .append($heading)
                        .append($content)
                        .append($close)
                        .append($footerbar);
                  $this.hide();
                  for (name in options.footerbar) {
                        (function(_name){
                              $('<button class = "' + options.prefix + '-button btn btn-success">' + _name + '</button>')
                              .appendTo($footerbar)
                              .click(function(){
                                     options.footerbar[_name](_apiObj);
                              });
                        })(name);
                  }
                  _apiObj.open = function(){
                        if (options.beforeOpen) {
                              options.beforeOpen();
                        }
                  	$this.show();
                        if (options.isModel == true) {
                              $disabled.css({
                                    'opacity'  :  '0',
                              }).fadeTo(300,0.6);
                        } else {
                              $disabled.css({
                                    'opacity'  :  '0',
                              }).fadeTo(300,0);
                        }
                        $container.css({
                                    'opacity'  :  '0'
                              }).fadeTo(300,options.opacity);
                              $footerbar.css({
                                    'border'   : 'none'
                              });
                        isOpen = true;
                        _apiObj.resize();
                  }
                  _apiObj.close = function() {
                        $container.stop().fadeTo(300,1);
                        if (options.isModel == true) {
                              $disabled.stop().fadeOut(300,function() {
                                    $this.hide();
                              });
                        } else {
                              $this.hide();
                        }
                        isOpen = false;
                        if (options.afterClose) {
                              options.afterClose();
                        }
                  }
                  _apiObj.resize = function() {
                        $container.css({
                              'position' : 'absolute',
                              "left"     : ($window.width()-$container.outerWidth())/2 + "px",
                              "top"      : ($window.height()-$container.outerHeight())/2 + "px"
                        });
                  }
                  _apiObj.setContent = function(add_content) {
                        $content.append(add_content);
                  }
                  _apiObj.setHtml = function(add_html) {
                        $content.html(add_html);
                  }
                  _apiObj.getFooterbar = function(item) {
                        return $footerbar;
                  }
                  _apiObj.isOpen = function() {
                        return options.isOpen;
                  }
                  if (options.autoOpen == true) {
                        _apiObj.open();
                  }
                  $window.resize(_apiObj.resize);
                  $window.scroll(_apiObj.resize);
                  $disabled.click(_apiObj.close);
                  $close.click(_apiObj.close);

                  callback(_apiObj);
		});
	}
})(jQuery, window);