/**
     * 支持的模板语法
     * [Directives description]
     * @type {Object} 
     */
    var Directives = {
        text: function (el, value) {
            el.textContent = value || ''
        },
        show: function (el, value) {
            el.style.display = value ? '' : 'none'
        },
        on: {
            update: function(el, handler, event, directive){
                if (!directive.handlers) {
                    directive.handlers = {}
                }
                var handlers = directive.handlers
                if (handlers[event]) {
                    el.removeEventListener(event, handlers[event])
                }
                if (handler) {
                    handler = handler.bind(el);
                    el.addEventListener(event, handler);
                    handlers[event] = handler;
                }
            }
        },
        model: {
            bind: function (el, key, directive, seed) {
                el.addEventListener('keyup', function(e){
                    seed.$data[key] = el.value;
                });
            },
            update: function(el,value){
                el.value = value;
            }
        }
    }

    /**
     * 工具方法
     * [Utils description]
     * @type {Object}
     */
    var Utils = {
        cloneAttributes: function(attributes){
            return [].map.call(attributes, function (attr) {
                return {
                    name: attr.name,
                    value: attr.value
                }
            })
        },
        parseDirective: function(attr){
            if (attr.name.indexOf(prefix) === -1) return;

            var noprefix = attr.name.slice(prefix.length + 1),
                argIndex = noprefix.indexOf(':'),
                dirname  = argIndex === -1 ? noprefix : noprefix.slice(0, argIndex),
                def = Directives[dirname],
                arg = argIndex === -1 ? null : noprefix.slice(argIndex + 1);

            var exp = attr.value,
                key = exp.trim();

            return def
                ? {
                    attr: attr,
                    key: key,
                    definition: def,
                    argument: arg,
                    update: typeof def === 'function' ? def : def.update,
                    bind: typeof def === 'function' ? null : def.bind ? def.bind : null
                }
                : null;
        }
    };

    var prefix = 'v',
    selector = Object.keys(Directives).map(function (d) {
        return '[' + prefix + '-' + d + ']'
    }).join();
    
    /**
     * Vue构造函数
     * [Vue description]
     * @param {[type]} el   [description]
     * @param {[type]} opts [description]
     */
    function Vue (el, opts) {
        var self = this,
        root = self.$el = document.getElementById(el),
        els  = root.querySelectorAll(selector),
        _bindings = {};

        self.$opts = opts || {};

        self.$data = {};

        self.processNode(els, _bindings);

        self.initData(_bindings);
    }

    /**
     * 处理node节点
     * 
     * [processNode description]
     * @param  {[type]} els       [description]
     * @param  {[type]} _bindings [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.processNode = function(els, _bindings){
        var self = this;
        [].forEach.call(els, function(el){
            Utils.cloneAttributes(el.attributes).forEach(function (attr) {
                var directive = Utils.parseDirective(attr);
                if (directive) {
                    self.bindDirective(el, _bindings, directive)
                }
            });
        });
    }

    /**
     * 属性移除 指令绑定
     * [bindDirective description]
     * @param  {[type]} el        [description]
     * @param  {[type]} _bindings [description]
     * @param  {[type]} directive [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.bindDirective = function(el, _bindings, directive){
        var self = this;

        el.removeAttribute(directive.attr.name);
        var key = directive.key,
            binding = _bindings[key];
        if (!binding) {
            _bindings[key] = binding = {
                value: undefined,
                directives: []
            }
        }
        directive.el = el;
        binding.directives.push(directive);
        
        if (directive.bind) {
            directive.bind(el, key, directive, self);
        }
        if (!self.$data.hasOwnProperty(key)) {
            self.bind(key, binding);
        }
    }


    /**
     * 绑定 赋值拦截 set 方法
     * [bind description]
     * @param  {[type]} key     [description]
     * @param  {[type]} binding [description]
     * @return {[type]}         [description]
     */
    Vue.prototype.bind = function(key, binding) {
        var that = this;
        Object.defineProperty(that.$data, key, {
            set: function (value) {
                binding.value = value;

                binding.directives.forEach(function (directive) {
                    directive.update(
                        directive.el,
                        value,
                        directive.argument,
                        directive,
                        self
                    )
                })
            },
            get: function () {
                return binding.value;
            }
        })
    };

    /**
     * 实例初始化 赋值
     * [initData description]
     * @param  {[type]} _bindings [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.initData = function(_bindings) {
        var self = this;
        for (var variable in _bindings) {
            this.$data[variable] = self.$opts[variable];
        }
    };

    /**
     * 创建vm实例
     */
    var vm = new Vue('test', {
        msg: 'aaa',
        isShow: true,
        btn: '点击我',
        changeShow: function(){
            vm.$data.isShow = !vm.$data.isShow;
        }
    });