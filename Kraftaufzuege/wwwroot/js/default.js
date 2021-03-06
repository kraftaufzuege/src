var requirejs, require, define;
! function (global) {
    function isFunction(a) {
        return "[object Function]" === ostring.call(a)
    }

    function isArray(a) {
        return "[object Array]" === ostring.call(a)
    }

    function each(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1);
        }
    }

    function eachReverse(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1);
        }
    }

    function hasProp(a, b) {
        return hasOwn.call(a, b)
    }

    function getOwn(a, b) {
        return hasProp(a, b) && a[b]
    }

    function eachProp(a, b) {
        var c;
        for (c in a)
            if (hasProp(a, c) && b(a[c], c)) break
    }

    function mixin(a, b, c, d) {
        return b && eachProp(b, function (b, e) {
            !c && hasProp(a, e) || (!d || "object" != typeof b || !b || isArray(b) || isFunction(b) || b instanceof RegExp ? a[e] = b : (a[e] || (a[e] = {}), mixin(a[e], b, c, d)))
        }), a
    }

    function bind(a, b) {
        return function () {
            return b.apply(a, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(a) {
        throw a
    }

    function getGlobal(a) {
        if (!a) return a;
        var b = global;
        return each(a.split("."), function (a) {
            b = b[a]
        }), b
    }

    function makeError(a, b, c, d) {
        var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
        return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e
    }

    function newContext(a) {
        function b(a) {
            var b, c;
            for (b = 0; b < a.length; b++)
                if (c = a[b], "." === c) a.splice(b, 1), b -= 1;
                else if (".." === c) {
                    if (0 === b || 1 === b && ".." === a[2] || ".." === a[b - 1]) continue;
                    b > 0 && (a.splice(b - 1, 2), b -= 2)
                }
        }

        function c(a, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p, q = c && c.split("/"),
                r = x.map,
                s = r && r["*"];
            if (a && (a = a.split("/"), k = a.length - 1, x.nodeIdCompat && jsSuffixRegExp.test(a[k]) && (a[k] = a[k].replace(jsSuffixRegExp, "")), "." === a[0].charAt(0) && q && (p = q.slice(0, q.length - 1), a = p.concat(a)), b(a), a = a.join("/")), d && r && (q || s)) {
                g = a.split("/");
                a: for (h = g.length; h > 0; h -= 1) {
                    if (j = g.slice(0, h).join("/"), q)
                        for (i = q.length; i > 0; i -= 1)
                            if (f = getOwn(r, q.slice(0, i).join("/")), f && (f = getOwn(f, j))) {
                                l = f, m = h;
                                break a
                            } !n && s && getOwn(s, j) && (n = getOwn(s, j), o = h)
                } !l && n && (l = n, m = o), l && (g.splice(0, m, l), a = g.join("/"))
            }
            return e = getOwn(x.pkgs, a), e ? e : a
        }

        function d(a) {
            isBrowser && each(scripts(), function (b) {
                if (b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === u.contextName) return b.parentNode.removeChild(b), !0
            })
        }

        function e(a) {
            var b = getOwn(x.paths, a);
            if (b && isArray(b) && b.length > 1) return b.shift(), u.require.undef(a), u.makeRequire(null, {
                skipMap: !0
            })([a]), !0
        }

        function f(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
        }

        function g(a, b, d, e) {
            var g, h, i, j, k = null,
                l = b ? b.name : null,
                m = a,
                n = !0,
                o = "";
            return a || (n = !1, a = "_@r" + (F += 1)), j = f(a), k = j[0], a = j[1], k && (k = c(k, l, e), h = getOwn(C, k)), a && (k ? o = h && h.normalize ? h.normalize(a, function (a) {
                return c(a, l, e)
            }) : a.indexOf("!") === -1 ? c(a, l, e) : a : (o = c(a, l, e), j = f(o), k = j[0], o = j[1], d = !0, g = u.nameToUrl(o))), i = !k || h || d ? "" : "_unnormalized" + (G += 1), {
                    prefix: k,
                    name: o,
                    parentMap: b,
                    unnormalized: !!i,
                    url: g,
                    originalName: m,
                    isDefine: n,
                    id: (k ? k + "!" + o : o) + i
                }
        }

        function h(a) {
            var b = a.id,
                c = getOwn(y, b);
            return c || (c = y[b] = new u.Module(a)), c
        }

        function i(a, b, c) {
            var d = a.id,
                e = getOwn(y, d);
            !hasProp(C, d) || e && !e.defineEmitComplete ? (e = h(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(C[d])
        }

        function j(a, b) {
            var c = a.requireModules,
                d = !1;
            b ? b(a) : (each(c, function (b) {
                var c = getOwn(y, b);
                c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
            }), d || req.onError(a))
        }

        function k() {
            globalDefQueue.length && (each(globalDefQueue, function (a) {
                var b = a[0];
                "string" == typeof b && (u.defQueueMap[b] = !0), B.push(a)
            }), globalDefQueue = [])
        }

        function l(a) {
            delete y[a], delete z[a]
        }

        function m(a, b, c) {
            var d = a.map.id;
            a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function (d, e) {
                var f = d.id,
                    g = getOwn(y, f);
                !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, C[f]), a.check()) : m(g, b, c))
            }), c[d] = !0)
        }

        function n() {
            var a, b, c = 1e3 * x.waitSeconds,
                f = c && u.startTime + c < (new Date).getTime(),
                g = [],
                h = [],
                i = !1,
                k = !0;
            if (!s) {
                if (s = !0, eachProp(z, function (a) {
                    var c = a.map,
                        j = c.id;
                    if (a.enabled && (c.isDefine || h.push(a), !a.error))
                        if (!a.inited && f) e(j) ? (b = !0, i = !0) : (g.push(j), d(j));
                        else if (!a.inited && a.fetched && c.isDefine && (i = !0, !c.prefix)) return k = !1
                }), f && g.length) return a = makeError("timeout", "Load timeout for modules: " + g, null, g), a.contextName = u.contextName, j(a);
                k && each(h, function (a) {
                    m(a, {}, {})
                }), f && !b || !i || !isBrowser && !isWebWorker || w || (w = setTimeout(function () {
                    w = 0, n()
                }, 50)), s = !1
            }
        }

        function o(a) {
            hasProp(C, a[0]) || h(g(a[0], null, !0)).init(a[1], a[2])
        }

        function p(a, b, c, d) {
            a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
        }

        function q(a) {
            var b = a.currentTarget || a.srcElement;
            return p(b, u.onScriptLoad, "load", "onreadystatechange"), p(b, u.onScriptError, "error"), {
                node: b,
                id: b && b.getAttribute("data-requiremodule")
            }
        }

        function r() {
            var a;
            for (k(); B.length;) {
                if (a = B.shift(), null === a[0]) return j(makeError("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                o(a)
            }
            u.defQueueMap = {}
        }
        var s, t, u, v, w, x = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
            y = {},
            z = {},
            A = {},
            B = [],
            C = {},
            D = {},
            E = {},
            F = 1,
            G = 1;
        return v = {
            require: function (a) {
                return a.require ? a.require : a.require = u.makeRequire(a.map)
            },
            exports: function (a) {
                if (a.usingExports = !0, a.map.isDefine) return a.exports ? C[a.map.id] = a.exports : a.exports = C[a.map.id] = {}
            },
            module: function (a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function () {
                        return getOwn(x.config, a.map.id) || {}
                    },
                    exports: a.exports || (a.exports = {})
                }
            }
        }, t = function (a) {
            this.events = getOwn(A, a.id) || {}, this.map = a, this.shim = getOwn(x.shim, a.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, t.prototype = {
            init: function (a, b, c, d) {
                d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function (a) {
                    this.emit("error", a)
                })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function (a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },
            fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0, u.startTime = (new Date).getTime();
                    var a = this.map;
                    return this.shim ? void u.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function () {
                        return a.prefix ? this.callPlugin() : this.load()
                    })) : a.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function () {
                var a = this.map.url;
                D[a] || (D[a] = !0, u.load(this.map.id, a))
            },
            check: function () {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id,
                        d = this.depExports,
                        e = this.exports,
                        f = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(f)) {
                                    try {
                                        e = u.execCb(c, f, d, e)
                                    } catch (b) {
                                        a = b
                                    }
                                    if (this.map.isDefine && void 0 === e && (b = this.module, b ? e = b.exports : this.usingExports && (e = this.exports)), a) {
                                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", j(this.error = a);
                                        "undefined" != typeof console && console.error ? console.error(a) : req.onError(a)
                                    }
                                } else e = f;
                                if (this.exports = e, this.map.isDefine && !this.ignore && (C[c] = e, req.onResourceLoad)) {
                                    var g = [];
                                    each(this.depMaps, function (a) {
                                        g.push(a.normalizedMap || a)
                                    }), req.onResourceLoad(u, this.map, g)
                                }
                                l(c), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(u.defQueueMap, c) || this.fetch()
                }
            },
            callPlugin: function () {
                var a = this.map,
                    b = a.id,
                    d = g(a.prefix);
                this.depMaps.push(d), i(d, "defined", bind(this, function (d) {
                    var e, f, k, m = getOwn(E, this.map.id),
                        n = this.map.name,
                        o = this.map.parentMap ? this.map.parentMap.name : null,
                        p = u.makeRequire(a.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (d.normalize && (n = d.normalize(n, function (a) {
                        return c(a, o, !0)
                    }) || ""), f = g(a.prefix + "!" + n, this.map.parentMap), i(f, "defined", bind(this, function (a) {
                        this.map.normalizedMap = f, this.init([], function () {
                            return a
                        }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                    })), k = getOwn(y, f.id), void (k && (this.depMaps.push(f), this.events.error && k.on("error", bind(this, function (a) {
                        this.emit("error", a)
                    })), k.enable()))) : m ? (this.map.url = u.nameToUrl(m), void this.load()) : (e = bind(this, function (a) {
                        this.init([], function () {
                            return a
                        }, null, {
                                enabled: !0
                            })
                    }), e.error = bind(this, function (a) {
                        this.inited = !0, this.error = a, a.requireModules = [b], eachProp(y, function (a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && l(a.map.id)
                        }), j(a)
                    }), e.fromText = bind(this, function (c, d) {
                        var f = a.name,
                            i = g(f),
                            k = useInteractive;
                        d && (c = d), k && (useInteractive = !1), h(i), hasProp(x.config, b) && (x.config[f] = x.config[b]);
                        try {
                            req.exec(c)
                        } catch (a) {
                            return j(makeError("fromtexteval", "fromText eval for " + b + " failed: " + a, a, [b]))
                        }
                        k && (useInteractive = !0), this.depMaps.push(i), u.completeLoad(f), p([f], e)
                    }), void d.load(a.name, p, e, x))
                })), u.enable(d, this), this.pluginMaps[d.id] = d
            },
            enable: function () {
                z[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (a, b) {
                    var c, d, e;
                    if ("string" == typeof a) {
                        if (a = g(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[b] = a, e = getOwn(v, a.id)) return void (this.depExports[b] = e(this));
                        this.depCount += 1, i(a, "defined", bind(this, function (a) {
                            this.undefed || (this.defineDep(b, a), this.check())
                        })), this.errback ? i(a, "error", bind(this, this.errback)) : this.events.error && i(a, "error", bind(this, function (a) {
                            this.emit("error", a)
                        }))
                    }
                    c = a.id, d = y[c], hasProp(v, c) || !d || d.enabled || u.enable(a, this)
                })), eachProp(this.pluginMaps, bind(this, function (a) {
                    var b = getOwn(y, a.id);
                    b && !b.enabled && u.enable(a, this)
                })), this.enabling = !1, this.check()
            },
            on: function (a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b)
            },
            emit: function (a, b) {
                each(this.events[a], function (a) {
                    a(b)
                }), "error" === a && delete this.events[a]
            }
        }, u = {
            config: x,
            contextName: a,
            registry: y,
            defined: C,
            urlFetched: D,
            defQueue: B,
            defQueueMap: {},
            Module: t,
            makeModuleMap: g,
            nextTick: req.nextTick,
            onError: j,
            configure: function (a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = x.shim,
                    c = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(a, function (a, b) {
                    c[b] ? (x[b] || (x[b] = {}), mixin(x[b], a, !0, !0)) : x[b] = a
                }), a.bundles && eachProp(a.bundles, function (a, b) {
                    each(a, function (a) {
                        a !== b && (E[a] = b)
                    })
                }), a.shim && (eachProp(a.shim, function (a, c) {
                    isArray(a) && (a = {
                        deps: a
                    }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = u.makeShimExports(a)), b[c] = a
                }), x.shim = b), a.packages && each(a.packages, function (a) {
                    var b, c;
                    a = "string" == typeof a ? {
                        name: a
                    } : a, c = a.name, b = a.location, b && (x.paths[c] = a.location), x.pkgs[c] = a.name + "/" + (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(y, function (a, b) {
                    a.inited || a.map.unnormalized || (a.map = g(b, null, !0))
                }), (a.deps || a.callback) && u.require(a.deps || [], a.callback)
            },
            makeShimExports: function (a) {
                function b() {
                    var b;
                    return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports)
                }
                return b
            },
            makeRequire: function (b, e) {
                function f(c, d, i) {
                    var k, l, m;
                    return e.enableBuildCallback && d && isFunction(d) && (d.__requireJsBuild = !0), "string" == typeof c ? isFunction(d) ? j(makeError("requireargs", "Invalid require call"), i) : b && hasProp(v, c) ? v[c](y[b.id]) : req.get ? req.get(u, c, b, f) : (l = g(c, b, !1, !0), k = l.id, hasProp(C, k) ? C[k] : j(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (r(), u.nextTick(function () {
                        r(), m = h(g(null, b)), m.skipMap = e.skipMap, m.init(c, d, i, {
                            enabled: !0
                        }), n()
                    }), f)
                }
                return e = e || {}, mixin(f, {
                    isBrowser: isBrowser,
                    toUrl: function (a) {
                        var d, e = a.lastIndexOf("."),
                            f = a.split("/")[0],
                            g = "." === f || ".." === f;
                        return e !== -1 && (!g || e > 1) && (d = a.substring(e, a.length), a = a.substring(0, e)), u.nameToUrl(c(a, b && b.id, !0), d, !0)
                    },
                    defined: function (a) {
                        return hasProp(C, g(a, b, !1, !0).id)
                    },
                    specified: function (a) {
                        return a = g(a, b, !1, !0).id, hasProp(C, a) || hasProp(y, a)
                    }
                }), b || (f.undef = function (a) {
                    k();
                    var c = g(a, b, !0),
                        e = getOwn(y, a);
                    e.undefed = !0, d(a), delete C[a], delete D[c.url], delete A[a], eachReverse(B, function (b, c) {
                        b[0] === a && B.splice(c, 1)
                    }), delete u.defQueueMap[a], e && (e.events.defined && (A[a] = e.events), l(a))
                }), f
            },
            enable: function (a) {
                var b = getOwn(y, a.id);
                b && h(a).enable()
            },
            completeLoad: function (a) {
                var b, c, d, f = getOwn(x.shim, a) || {},
                    g = f.exports;
                for (k(); B.length;) {
                    if (c = B.shift(), null === c[0]) {
                        if (c[0] = a, b) break;
                        b = !0
                    } else c[0] === a && (b = !0);
                    o(c)
                }
                if (u.defQueueMap = {}, d = getOwn(y, a), !b && !hasProp(C, a) && d && !d.inited) {
                    if (!(!x.enforceDefine || g && getGlobal(g))) return e(a) ? void 0 : j(makeError("nodefine", "No define call for " + a, null, [a]));
                    o([a, f.deps || [], f.exportsFn])
                }
                n()
            },
            nameToUrl: function (a, b, c) {
                var d, e, f, g, h, i, j, k = getOwn(x.pkgs, a);
                if (k && (a = k), j = getOwn(E, a)) return u.nameToUrl(j, b, c);
                if (req.jsExtRegExp.test(a)) h = a + (b || "");
                else {
                    for (d = x.paths, e = a.split("/"), f = e.length; f > 0; f -= 1)
                        if (g = e.slice(0, f).join("/"), i = getOwn(d, g)) {
                            isArray(i) && (i = i[0]), e.splice(0, f, i);
                            break
                        }
                    h = e.join("/"), h += b || (/^data\:|\?/.test(h) || c ? "" : ".js"), h = ("/" === h.charAt(0) || h.match(/^[\w\+\.\-]+:/) ? "" : x.baseUrl) + h
                }
                return x.urlArgs ? h + ((h.indexOf("?") === -1 ? "?" : "&") + x.urlArgs) : h
            },
            load: function (a, b) {
                req.load(u, a, b)
            },
            execCb: function (a, b, c, d) {
                return b.apply(d, c)
            },
            onScriptLoad: function (a) {
                if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                    interactiveScript = null;
                    var b = q(a);
                    u.completeLoad(b.id)
                }
            },
            onScriptError: function (a) {
                var b = q(a);
                if (!e(b.id)) {
                    var c = [];
                    return eachProp(y, function (a, d) {
                        0 !== d.indexOf("_@r") && each(a.depMaps, function (a) {
                            return a.id === b.id && c.push(d), !0
                        })
                    }), j(makeError("scripterror", 'Script error for "' + b.id + (c.length ? '", needed by: ' + c.join(", ") : '"'), a, [b.id]))
                }
            }
        }, u.require = u.makeRequire(), u
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (a) {
            if ("interactive" === a.readyState) return interactiveScript = a
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.22",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (a, b, c, d) {
            var e, f, g = defContextName;
            return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
        }, req.config = function (a) {
            return req(a)
        }, req.nextTick = "undefined" != typeof setTimeout ? function (a) {
            setTimeout(a, 4)
        } : function (a) {
            a()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function (a) {
            req[a] = function () {
                var b = contexts[defContextName];
                return b.require[a].apply(b, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (a, b, c) {
            var d = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return d.type = a.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, d
        }, req.load = function (a, b, c) {
            var d, e = a && a.config || {};
            if (isBrowser) return d = req.createNode(e, b, c), e.onNodeCreated && e.onNodeCreated(d, e, b, c), d.setAttribute("data-requirecontext", a.contextName), d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && d.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (d.addEventListener("load", a.onScriptLoad, !1), d.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), d.src = c, currentlyAddingScript = d, baseElement ? head.insertBefore(d, baseElement) : head.appendChild(d), currentlyAddingScript = null, d;
            if (isWebWorker) try {
                importScripts(c), a.completeLoad(b)
            } catch (d) {
                a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, d, [b]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (a) {
            if (head || (head = a.parentNode), dataMain = a.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function (a, b, c) {
            var d, e;
            "string" != typeof a && (c = b, b = a, a = null), isArray(b) || (c = b, b = null), !b && isFunction(c) && (b = [], c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (a, c) {
                b.push(c)
            }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b))), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), e ? (e.defQueue.push([a, b, c]), e.defQueueMap[a] = !0) : globalDefQueue.push([a, b, c])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function (text) {
            return eval(text)
        }, req(cfg)
    }
}(this),
    function (a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function (a, b) {
        function c(a) {
            var b = a.length,
                c = ea.type(a);
            return "function" !== c && !ea.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
        }

        function d(a, b, c) {
            if (ea.isFunction(b)) return ea.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c
            });
            if (b.nodeType) return ea.grep(a, function (a) {
                return a === b !== c
            });
            if ("string" == typeof b) {
                if (ma.test(b)) return ea.filter(b, a, c);
                b = ea.filter(b, a)
            }
            return ea.grep(a, function (a) {
                return ea.inArray(a, b) >= 0 !== c
            })
        }

        function e(a, b) {
            do a = a[b]; while (a && 1 !== a.nodeType);
            return a
        }

        function f(a) {
            var b = ua[a] = {};
            return ea.each(a.match(ta) || [], function (a, c) {
                b[c] = !0
            }), b
        }

        function g() {
            oa.addEventListener ? (oa.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (oa.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
        }

        function h() {
            (oa.addEventListener || "load" === event.type || "complete" === oa.readyState) && (g(), ea.ready())
        }

        function i(a, b, c) {
            if (void 0 === c && 1 === a.nodeType) {
                var d = "data-" + b.replace(za, "-$1").toLowerCase();
                if (c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : ya.test(c) ? ea.parseJSON(c) : c)
                    } catch (a) { }
                    ea.data(a, b, c)
                } else c = void 0
            }
            return c
        }

        function j(a) {
            var b;
            for (b in a)
                if (("data" !== b || !ea.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
            return !0
        }

        function k(a, b, c, d) {
            if (ea.acceptData(a)) {
                var e, f, g = ea.expando,
                    h = a.nodeType,
                    i = h ? ea.cache : a,
                    j = h ? a[g] : a[g] && g;
                if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || ea.guid++ : g), i[j] || (i[j] = h ? {} : {
                    toJSON: ea.noop
                }), "object" != typeof b && "function" != typeof b || (d ? i[j] = ea.extend(i[j], b) : i[j].data = ea.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[ea.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[ea.camelCase(b)])) : e = f, e
            }
        }

        function l(a, b, c) {
            if (ea.acceptData(a)) {
                var d, e, f = a.nodeType,
                    g = f ? ea.cache : a,
                    h = f ? a[ea.expando] : ea.expando;
                if (g[h]) {
                    if (b && (d = c ? g[h] : g[h].data)) {
                        ea.isArray(b) ? b = b.concat(ea.map(b, ea.camelCase)) : b in d ? b = [b] : (b = ea.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                        for (; e--;) delete d[b[e]];
                        if (c ? !j(d) : !ea.isEmptyObject(d)) return
                    } (c || (delete g[h].data, j(g[h]))) && (f ? ea.cleanData([a], !0) : ca.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
                }
            }
        }

        function m() {
            return !0
        }

        function n() {
            return !1
        }

        function o() {
            try {
                return oa.activeElement
            } catch (a) { }
        }

        function p(a) {
            var b = Ka.split("|"),
                c = a.createDocumentFragment();
            if (c.createElement)
                for (; b.length;) c.createElement(b.pop());
            return c
        }

        function q(a, b) {
            var c, d, e = 0,
                f = typeof a.getElementsByTagName !== xa ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xa ? a.querySelectorAll(b || "*") : void 0;
            if (!f)
                for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || ea.nodeName(d, b) ? f.push(d) : ea.merge(f, q(d, b));
            return void 0 === b || b && ea.nodeName(a, b) ? ea.merge([a], f) : f
        }

        function r(a) {
            Ea.test(a.type) && (a.defaultChecked = a.checked)
        }

        function s(a, b) {
            return ea.nodeName(a, "table") && ea.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function t(a) {
            return a.type = (null !== ea.find.attr(a, "type")) + "/" + a.type, a
        }

        function u(a) {
            var b = Va.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function v(a, b) {
            for (var c, d = 0; null != (c = a[d]); d++) ea._data(c, "globalEval", !b || ea._data(b[d], "globalEval"))
        }

        function w(a, b) {
            if (1 === b.nodeType && ea.hasData(a)) {
                var c, d, e, f = ea._data(a),
                    g = ea._data(b, f),
                    h = f.events;
                if (h) {
                    delete g.handle, g.events = {};
                    for (c in h)
                        for (d = 0, e = h[c].length; d < e; d++) ea.event.add(b, c, h[c][d])
                }
                g.data && (g.data = ea.extend({}, g.data))
            }
        }

        function x(a, b) {
            var c, d, e;
            if (1 === b.nodeType) {
                if (c = b.nodeName.toLowerCase(), !ca.noCloneEvent && b[ea.expando]) {
                    e = ea._data(b);
                    for (d in e.events) ea.removeEvent(b, d, e.handle);
                    b.removeAttribute(ea.expando)
                }
                "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ca.html5Clone && a.innerHTML && !ea.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Ea.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
            }
        }

        function y(b, c) {
            var d, e = ea(c.createElement(b)).appendTo(c.body),
                f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : ea.css(e[0], "display");
            return e.detach(), f
        }

        function z(a) {
            var b = oa,
                c = _a[a];
            return c || (c = y(a, b), "none" !== c && c || ($a = ($a || ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = ($a[0].contentWindow || $a[0].contentDocument).document, b.write(), b.close(), c = y(a, b), $a.detach()), _a[a] = c), c
        }

        function A(a, b) {
            return {
                get: function () {
                    var c = a();
                    if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        function B(a, b) {
            if (b in a) return b;
            for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mb.length; e--;)
                if (b = mb[e] + c, b in a) return b;
            return d
        }

        function C(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; g < h; g++) d = a[g], d.style && (f[g] = ea._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ca(d) && (f[g] = ea._data(d, "olddisplay", z(d.nodeName)))) : (e = Ca(d), (c && "none" !== c || !e) && ea._data(d, "olddisplay", e ? c : ea.css(d, "display"))));
            for (g = 0; g < h; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
            return a
        }

        function D(a, b, c) {
            var d = ib.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function E(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) "margin" === c && (g += ea.css(a, c + Ba[f], !0, e)), d ? ("content" === c && (g -= ea.css(a, "padding" + Ba[f], !0, e)), "margin" !== c && (g -= ea.css(a, "border" + Ba[f] + "Width", !0, e))) : (g += ea.css(a, "padding" + Ba[f], !0, e), "padding" !== c && (g += ea.css(a, "border" + Ba[f] + "Width", !0, e)));
            return g
        }

        function F(a, b, c) {
            var d = !0,
                e = "width" === b ? a.offsetWidth : a.offsetHeight,
                f = ab(a),
                g = ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, f);
            if (e <= 0 || null == e) {
                if (e = bb(a, b, f), (e < 0 || null == e) && (e = a.style[b]), db.test(e)) return e;
                d = g && (ca.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }

        function G(a, b, c, d, e) {
            return new G.prototype.init(a, b, c, d, e)
        }

        function H() {
            return setTimeout(function () {
                nb = void 0
            }), nb = ea.now()
        }

        function I(a, b) {
            var c, d = {
                height: a
            },
                e = 0;
            for (b = b ? 1 : 0; e < 4; e += 2 - b) c = Ba[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }

        function J(a, b, c) {
            for (var d, e = (tb[b] || []).concat(tb["*"]), f = 0, g = e.length; f < g; f++)
                if (d = e[f].call(c, b, a)) return d
        }

        function K(a, b, c) {
            var d, e, f, g, h, i, j, k, l = this,
                m = {},
                n = a.style,
                o = a.nodeType && Ca(a),
                p = ea._data(a, "fxshow");
            c.queue || (h = ea._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
                h.unqueued || i()
            }), h.unqueued++ , l.always(function () {
                l.always(function () {
                    h.unqueued-- , ea.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = ea.css(a, "display"), k = "none" === j ? ea._data(a, "olddisplay") || z(a.nodeName) : j, "inline" === k && "none" === ea.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", ca.shrinkWrapBlocks() || l.always(function () {
                n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
            }));
            for (d in b)
                if (e = b[d], pb.exec(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                        if ("show" !== e || !p || void 0 === p[d]) continue;
                        o = !0
                    }
                    m[d] = p && p[d] || ea.style(a, d)
                } else j = void 0;
            if (ea.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j);
            else {
                p ? "hidden" in p && (o = p.hidden) : p = ea._data(a, "fxshow", {}), f && (p.hidden = !o), o ? ea(a).show() : l.done(function () {
                    ea(a).hide()
                }), l.done(function () {
                    var b;
                    ea._removeData(a, "fxshow");
                    for (b in m) ea.style(a, b, m[b])
                });
                for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
            }
        }

        function L(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = ea.camelCase(c), e = b[d], f = a[c], ea.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ea.cssHooks[d], g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
        }

        function M(a, b, c) {
            var d, e, f = 0,
                g = sb.length,
                h = ea.Deferred().always(function () {
                    delete i.elem
                }),
                i = function () {
                    if (e) return !1;
                    for (var b = nb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: ea.extend({}, b),
                    opts: ea.extend(!0, {
                        specialEasing: {}
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: nb || H(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function (b, c) {
                        var d = ea.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function (b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; c < d; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (L(k, j.opts.specialEasing); f < g; f++)
                if (d = sb[f].call(j, a, k, j.opts)) return d;
            return ea.map(k, J, j), ea.isFunction(j.opts.start) && j.opts.start.call(a, j), ea.fx.timer(ea.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function N(a) {
            return function (b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(ta) || [];
                if (ea.isFunction(c))
                    for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function O(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0, ea.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                }), i
            }
            var f = {},
                g = a === Rb;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function P(a, b) {
            var c, d, e = ea.ajaxSettings.flatOptions || {};
            for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
            return c && ea.extend(!0, a, c), a
        }

        function Q(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
            if (e)
                for (g in h)
                    if (h[g] && h[g].test(e)) {
                        i.unshift(g);
                        break
                    }
            if (i[0] in c) f = i[0];
            else {
                for (g in c) {
                    if (!i[0] || a.converters[g + " " + i[0]]) {
                        f = g;
                        break
                    }
                    d || (d = g)
                }
                f = f || d
            }
            if (f) return f !== i[0] && i.unshift(f), c[f]
        }

        function R(a, b, c, d) {
            var e, f, g, h, i, j = {},
                k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                        if (g = j[i + " " + f] || j["* " + f], !g)
                            for (e in j)
                                if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                    break
                                }
                        if (g !== !0)
                            if (g && a.throws) b = g(b);
                            else try {
                                b = g(b)
                            } catch (a) {
                                return {
                                    state: "parsererror",
                                    error: g ? a : "No conversion from " + i + " to " + f
                                }
                            }
                    }
            return {
                state: "success",
                data: b
            }
        }

        function S(a, b, c, d) {
            var e;
            if (ea.isArray(b)) ea.each(b, function (b, e) {
                c || Ub.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            });
            else if (c || "object" !== ea.type(b)) d(a, b);
            else
                for (e in b) S(a + "[" + e + "]", b[e], c, d)
        }

        function T() {
            try {
                return new a.XMLHttpRequest
            } catch (a) { }
        }

        function U() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (a) { }
        }

        function V(a) {
            return ea.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow)
        }
        var W = [],
            X = W.slice,
            Y = W.concat,
            Z = W.push,
            $ = W.indexOf,
            _ = {},
            aa = _.toString,
            ba = _.hasOwnProperty,
            ca = {},
            da = "1.11.1",
            ea = function (a, b) {
                return new ea.fn.init(a, b)
            },
            fa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ga = /^-ms-/,
            ha = /-([\da-z])/gi,
            ia = function (a, b) {
                return b.toUpperCase()
            };
        ea.fn = ea.prototype = {
            jquery: da,
            constructor: ea,
            selector: "",
            length: 0,
            toArray: function () {
                return X.call(this)
            },
            get: function (a) {
                return null != a ? a < 0 ? this[a + this.length] : this[a] : X.call(this)
            },
            pushStack: function (a) {
                var b = ea.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            },
            each: function (a, b) {
                return ea.each(this, a, b)
            },
            map: function (a) {
                return this.pushStack(ea.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function () {
                return this.pushStack(X.apply(this, arguments))
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            eq: function (a) {
                var b = this.length,
                    c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
            },
            end: function () {
                return this.prevObject || this.constructor(null)
            },
            push: Z,
            sort: W.sort,
            splice: W.splice
        }, ea.extend = ea.fn.extend = function () {
            var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ea.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
                if (null != (e = arguments[h]))
                    for (d in e) a = g[d], c = e[d], g !== c && (j && c && (ea.isPlainObject(c) || (b = ea.isArray(c))) ? (b ? (b = !1, f = a && ea.isArray(a) ? a : []) : f = a && ea.isPlainObject(a) ? a : {}, g[d] = ea.extend(j, f, c)) : void 0 !== c && (g[d] = c));
            return g
        }, ea.extend({
            expando: "jQuery" + (da + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a)
            },
            noop: function () { },
            isFunction: function (a) {
                return "function" === ea.type(a)
            },
            isArray: Array.isArray || function (a) {
                return "array" === ea.type(a)
            },
            isWindow: function (a) {
                return null != a && a == a.window
            },
            isNumeric: function (a) {
                return !ea.isArray(a) && a - parseFloat(a) >= 0
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            isPlainObject: function (a) {
                var b;
                if (!a || "object" !== ea.type(a) || a.nodeType || ea.isWindow(a)) return !1;
                try {
                    if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (a) {
                    return !1
                }
                if (ca.ownLast)
                    for (b in a) return ba.call(a, b);
                for (b in a);
                return void 0 === b || ba.call(a, b)
            },
            type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a
            },
            globalEval: function (b) {
                b && ea.trim(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            },
            camelCase: function (a) {
                return a.replace(ga, "ms-").replace(ha, ia)
            },
            nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function (a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a);
                if (d) {
                    if (h)
                        for (; f < g && (e = b.apply(a[f], d), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = b.apply(a[f], d), e === !1) break
                } else if (h)
                    for (; f < g && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.call(a[f], f, a[f]), e === !1) break;
                return a
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(fa, "")
            },
            makeArray: function (a, b) {
                var d = b || [];
                return null != a && (c(Object(a)) ? ea.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if ($) return $.call(b, a, c);
                    for (d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0; c < d; c++)
                        if (c in b && b[c] === a) return c
                }
                return -1
            },
            merge: function (a, b) {
                for (var c = +b.length, d = 0, e = a.length; d < c;) a[e++] = b[d++];
                if (c !== c)
                    for (; void 0 !== b[d];) a[e++] = b[d++];
                return a.length = e, a
            },
            grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            },
            map: function (a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a),
                    i = [];
                if (h)
                    for (; f < g; f++) e = b(a[f], f, d), null != e && i.push(e);
                else
                    for (f in a) e = b(a[f], f, d), null != e && i.push(e);
                return Y.apply([], i)
            },
            guid: 1,
            proxy: function (a, b) {
                var c, d, e;
                if ("string" == typeof b && (e = a[b], b = a, a = e), ea.isFunction(a)) return c = X.call(arguments, 2), d = function () {
                    return a.apply(b || this, c.concat(X.call(arguments)))
                }, d.guid = a.guid = a.guid || ea.guid++ , d
            },
            now: function () {
                return +new Date
            },
            support: ca
        }), ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
            _["[object " + b + "]"] = b.toLowerCase()
        });
        var ja = function (a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, j, l, n, o, p;
                if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
                if (1 !== (h = b.nodeType) && 9 !== h) return [];
                if (I && !d) {
                    if (e = sa.exec(a))
                        if (g = e[1]) {
                            if (9 === h) {
                                if (f = b.getElementById(g), !f || !f.parentNode) return c;
                                if (f.id === g) return c.push(f), c
                            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                        } else {
                            if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
                            if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
                        }
                    if (v.qsa && (!J || !J.test(a))) {
                        if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                            for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                            o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
                        }
                        if (p) try {
                            return _.apply(c, o.querySelectorAll(p)), c
                        } catch (a) { } finally {
                                l || b.removeAttribute("id")
                            }
                    }
                }
                return B(a.replace(ia, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
                }
                var b = [];
                return a
            }

            function d(a) {
                return a[N] = !0, a
            }

            function e(a) {
                var b = G.createElement("div");
                try {
                    return !!a(b)
                } catch (a) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function i(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function j(a) {
                return d(function (b) {
                    return b = +b, d(function (c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function k(a) {
                return a && typeof a.getElementsByTagName !== V && a
            }

            function l() { }

            function m(a) {
                for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                return d
            }

            function n(a, b, c) {
                var d = b.dir,
                    e = c && "parentNode" === d,
                    f = Q++;
                return b.first ? function (b, c, f) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) return a(b, c, f)
                } : function (b, c, g) {
                    var h, i, j = [P, f];
                    if (g) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || e) {
                                if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                                if (i[d] = j, j[2] = a(b, c, g)) return !0
                            }
                }
            }

            function o(a) {
                return a.length > 1 ? function (b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function p(a, c, d) {
                for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                return d
            }

            function q(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                return g
            }

            function r(a, b, c, e, f, g) {
                return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        r = d || p(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? r : q(r, m, a, h, i),
                        t = c ? f || (d ? a : o || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e)
                        for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;)(l = t[k]) && (j = f ? ba.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t)
                })
            }

            function s(a) {
                for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                    return a === b
                }, g, !0), j = n(function (a) {
                    return ba.call(b, a) > -1
                }, g, !0), k = [function (a, c, d) {
                    return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                }]; h < e; h++)
                    if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                    else {
                        if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                            for (d = ++h; d < e && !w.relative[a[d].type]; d++);
                            return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*" : ""
                            })).replace(ia, "$1"), c, h < d && s(a.slice(h, d)), d < e && s(a = a.slice(d)), d < e && m(a))
                        }
                        k.push(c)
                    }
                return o(k)
            }

            function t(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function (d, g, h, i, j) {
                        var k, l, m, n = 0,
                            o = "0",
                            p = d && [],
                            r = [],
                            s = C,
                            t = d || f && w.find.TAG("*", j),
                            u = P += null == s ? 1 : Math.random() || .1,
                            v = t.length;
                        for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0; m = a[l++];)
                                    if (m(k, g, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (P = u)
                            }
                            e && ((k = !m && k) && n-- , d && p.push(k))
                        }
                        if (n += o, e && o !== n) {
                            for (l = 0; m = c[l++];) m(p, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
                                r = q(r)
                            }
                            _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (P = u, C = s), p
                    };
                return e ? d(g) : g
            }
            var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
                O = a.document,
                P = 0,
                Q = 0,
                R = c(),
                S = c(),
                T = c(),
                U = function (a, b) {
                    return a === b && (E = !0), 0
                },
                V = "undefined",
                W = 1 << 31,
                X = {}.hasOwnProperty,
                Y = [],
                Z = Y.pop,
                $ = Y.push,
                _ = Y.push,
                aa = Y.slice,
                ba = Y.indexOf || function (a) {
                    for (var b = 0, c = this.length; b < c; b++)
                        if (this[b] === a) return b;
                    return -1
                },
                ca = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                da = "[\\x20\\t\\r\\n\\f]",
                ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                fa = ea.replace("w", "w#"),
                ga = "\\[" + da + "*(" + ea + ")(?:" + da + "*([*^$|!~]?=)" + da + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fa + "))|)" + da + "*\\]",
                ha = ":(" + ea + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ga + ")*)|.*)\\)|)",
                ia = new RegExp("^" + da + "+|((?:^|[^\\\\])(?:\\\\.)*)" + da + "+$", "g"),
                ja = new RegExp("^" + da + "*," + da + "*"),
                ka = new RegExp("^" + da + "*([>+~]|" + da + ")" + da + "*"),
                la = new RegExp("=" + da + "*([^\\]'\"]*?)" + da + "*\\]", "g"),
                ma = new RegExp(ha),
                na = new RegExp("^" + fa + "$"),
                oa = {
                    ID: new RegExp("^#(" + ea + ")"),
                    CLASS: new RegExp("^\\.(" + ea + ")"),
                    TAG: new RegExp("^(" + ea.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + ga),
                    PSEUDO: new RegExp("^" + ha),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + da + "*(even|odd|(([+-]|)(\\d*)n|)" + da + "*(?:([+-]|)" + da + "*(\\d+)|))" + da + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + ca + ")$", "i"),
                    needsContext: new RegExp("^" + da + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + da + "*((?:-\\d)?\\d*)" + da + "*\\)|)(?=[^-]|$)", "i")
                },
                pa = /^(?:input|select|textarea|button)$/i,
                qa = /^h\d$/i,
                ra = /^[^{]+\{\s*\[native \w/,
                sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ta = /[+~]/,
                ua = /'|\\/g,
                va = new RegExp("\\\\([\\da-f]{1,6}" + da + "?|(" + da + ")|.)", "ig"),
                wa = function (a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                };
            try {
                _.apply(Y = aa.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
            } catch (a) {
                _ = {
                    apply: Y.length ? function (a, b) {
                        $.apply(a, aa.call(b))
                    } : function (a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            v = b.support = {}, y = b.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return !!b && "HTML" !== b.nodeName
            }, F = b.setDocument = function (a) {
                var b, c = a ? a.ownerDocument || a : O,
                    d = c.defaultView;
                return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
                    F()
                }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
                    F()
                })), v.attributes = e(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), v.getElementsByTagName = e(function (a) {
                    return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                }), v.getElementsByClassName = ra.test(c.getElementsByClassName) && e(function (a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), v.getById = e(function (a) {
                    return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
                }), v.getById ? (w.find.ID = function (a, b) {
                    if (typeof b.getElementById !== V && I) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, w.filter.ID = function (a) {
                    var b = a.replace(va, wa);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete w.find.ID, w.filter.ID = function (a) {
                    var b = a.replace(va, wa);
                    return function (a) {
                        var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
                    if (typeof b.getElementsByTagName !== V) return b.getElementsByTagName(a)
                } : function (a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
                    if (typeof b.getElementsByClassName !== V && I) return b.getElementsByClassName(a)
                }, K = [], J = [], (v.qsa = ra.test(c.querySelectorAll)) && (e(function (a) {
                    a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + da + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + da + "*(?:value|" + ca + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
                }), e(function (a) {
                    var b = c.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + da + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
                    v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ha)
                }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, U = b ? function (a, b) {
                    if (a === b) return E = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0 : 4 & d ? -1 : 1)
                } : function (a, b) {
                    if (a === b) return E = !0, 0;
                    var d, e = 0,
                        f = a.parentNode,
                        h = b.parentNode,
                        i = [a],
                        j = [b];
                    if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0;
                    if (f === h) return g(a, b);
                    for (d = a; d = d.parentNode;) i.unshift(d);
                    for (d = b; d = d.parentNode;) j.unshift(d);
                    for (; i[e] === j[e];) e++;
                    return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                }, c) : G
            }, b.matches = function (a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function (a, c) {
                if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), v.matchesSelector && I && (!K || !K.test(c)) && (!J || !J.test(c))) try {
                    var d = L.call(a, c);
                    if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (a) { }
                return b(c, G, null, [a]).length > 0
            }, b.contains = function (a, b) {
                return (a.ownerDocument || a) !== G && F(a), M(a, b)
            }, b.attr = function (a, b) {
                (a.ownerDocument || a) !== G && F(a);
                var c = w.attrHandle[b.toLowerCase()],
                    d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function (a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return D = null, a
            }, x = b.getText = function (a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else
                    for (; b = a[d++];) c += x(b);
                return c
            }, w = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: oa,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    },
                    PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(va, wa).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function (a) {
                        var b = R[a + " "];
                        return b || (b = new RegExp("(^|" + da + ")" + a + "(" + da + "|$)")) && R(a, function (a) {
                            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (a, c, d) {
                        return function (e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                        }
                    },
                    CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (l = b; l = l[p];)
                                            if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                        if (1 === l.nodeType && ++m && l === b) {
                                            k[a] = [P, n, m];
                                            break
                                        }
                                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                else
                                    for (;
                                        (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                return m -= e, m === d || m % d === 0 && m / d >= 0
                            }
                        }
                    },
                    PSEUDO: function (a, c) {
                        var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;) d = ba.call(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function (a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function (a) {
                        var b = [],
                            c = [],
                            e = A(a.replace(ia, "$1"));
                        return e[N] ? d(function (a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, d, f) {
                            return b[0] = a, e(b, null, f, c), !c.pop()
                        }
                    }),
                    has: d(function (a) {
                        return function (c) {
                            return b(a, c).length > 0
                        }
                    }),
                    contains: d(function (a) {
                        return function (b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                    }),
                    lang: d(function (a) {
                        return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                            function (b) {
                                var c;
                                do
                                    if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function (a) {
                        return a === H
                    },
                    focus: function (a) {
                        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    },
                    enabled: function (a) {
                        return a.disabled === !1
                    },
                    disabled: function (a) {
                        return a.disabled === !0
                    },
                    checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function (a) {
                        return !w.pseudos.empty(a)
                    },
                    header: function (a) {
                        return qa.test(a.nodeName)
                    },
                    input: function (a) {
                        return pa.test(a.nodeName)
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    },
                    first: j(function () {
                        return [0]
                    }),
                    last: j(function (a, b) {
                        return [b - 1]
                    }),
                    eq: j(function (a, b, c) {
                        return [c < 0 ? c + b : c]
                    }),
                    even: j(function (a, b) {
                        for (var c = 0; c < b; c += 2) a.push(c);
                        return a
                    }),
                    odd: j(function (a, b) {
                        for (var c = 1; c < b; c += 2) a.push(c);
                        return a
                    }),
                    lt: j(function (a, b, c) {
                        for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: j(function (a, b, c) {
                        for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, w.pseudos.nth = w.pseudos.eq;
            for (u in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[u] = h(u);
            for (u in {
                submit: !0,
                reset: !0
            }) w.pseudos[u] = i(u);
            return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
                var d, e, f, g, h, i, j, k = S[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = w.preFilter; h;) {
                    d && !(e = ja.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(ia, " ")
                    }), h = h.slice(d.length));
                    for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
            }, A = b.compile = function (a, b) {
                var c, d = [],
                    e = [],
                    f = T[a + " "];
                if (!f) {
                    for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                    f = T(a, t(e, d)), f.selector = a
                }
                return f
            }, B = b.select = function (a, b, c, d) {
                var e, f, g, h, i, j = "function" == typeof a && a,
                    l = !d && z(a = j.selector || a);
                if (c = c || [], 1 === l.length) {
                    if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                        if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                        j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                        if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                            if (f.splice(e, 1), a = d.length && m(f), !a) return _.apply(c, d), c;
                            break
                        }
                }
                return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
            }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
                return 1 & a.compareDocumentPosition(G.createElement("div"))
            }), e(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function (a, b, c) {
                if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), v.attributes && e(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function (a, b, c) {
                if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
            }), e(function (a) {
                return null == a.getAttribute("disabled")
            }) || f(ca, function (a, b, c) {
                var d;
                if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(a);
        ea.find = ja, ea.expr = ja.selectors, ea.expr[":"] = ea.expr.pseudos, ea.unique = ja.uniqueSort, ea.text = ja.getText, ea.isXMLDoc = ja.isXML, ea.contains = ja.contains;
        var ka = ea.expr.match.needsContext,
            la = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ma = /^.[^:#\[\.,]*$/;
        ea.filter = function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ea.find.matchesSelector(d, a) ? [d] : [] : ea.find.matches(a, ea.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        }, ea.fn.extend({
            find: function (a) {
                var b, c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a) return this.pushStack(ea(a).filter(function () {
                    for (b = 0; b < e; b++)
                        if (ea.contains(d[b], this)) return !0
                }));
                for (b = 0; b < e; b++) ea.find(a, d[b], c);
                return c = this.pushStack(e > 1 ? ea.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
            },
            filter: function (a) {
                return this.pushStack(d(this, a || [], !1))
            },
            not: function (a) {
                return this.pushStack(d(this, a || [], !0))
            },
            is: function (a) {
                return !!d(this, "string" == typeof a && ka.test(a) ? ea(a) : a || [], !1).length
            }
        });
        var na, oa = a.document,
            pa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            qa = ea.fn.init = function (a, b) {
                var c, d;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pa.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a);
                    if (c[1]) {
                        if (b = b instanceof ea ? b[0] : b, ea.merge(this, ea.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : oa, !0)), la.test(c[1]) && ea.isPlainObject(b))
                            for (c in b) ea.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                        return this
                    }
                    if (d = oa.getElementById(c[2]), d && d.parentNode) {
                        if (d.id !== c[2]) return na.find(a);
                        this.length = 1, this[0] = d
                    }
                    return this.context = oa, this.selector = a, this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ea.isFunction(a) ? "undefined" != typeof na.ready ? na.ready(a) : a(ea) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), ea.makeArray(a, this))
            };
        qa.prototype = ea.fn, na = ea(oa);
        var ra = /^(?:parents|prev(?:Until|All))/,
            sa = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ea.extend({
            dir: function (a, b, c) {
                for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !ea(e).is(c));) 1 === e.nodeType && d.push(e), e = e[b];
                return d
            },
            sibling: function (a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            }
        }), ea.fn.extend({
            has: function (a) {
                var b, c = ea(a, this),
                    d = c.length;
                return this.filter(function () {
                    for (b = 0; b < d; b++)
                        if (ea.contains(this, c[b])) return !0
                })
            },
            closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = ka.test(a) || "string" != typeof a ? ea(a, b || this.context) : 0; d < e; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ea.find.matchesSelector(c, a))) {
                            f.push(c);
                            break
                        }
                return this.pushStack(f.length > 1 ? ea.unique(f) : f)
            },
            index: function (a) {
                return a ? "string" == typeof a ? ea.inArray(this[0], ea(a)) : ea.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function (a, b) {
                return this.pushStack(ea.unique(ea.merge(this.get(), ea(a, b))))
            },
            addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        }), ea.each({
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function (a) {
                return ea.dir(a, "parentNode")
            },
            parentsUntil: function (a, b, c) {
                return ea.dir(a, "parentNode", c)
            },
            next: function (a) {
                return e(a, "nextSibling")
            },
            prev: function (a) {
                return e(a, "previousSibling")
            },
            nextAll: function (a) {
                return ea.dir(a, "nextSibling")
            },
            prevAll: function (a) {
                return ea.dir(a, "previousSibling")
            },
            nextUntil: function (a, b, c) {
                return ea.dir(a, "nextSibling", c)
            },
            prevUntil: function (a, b, c) {
                return ea.dir(a, "previousSibling", c)
            },
            siblings: function (a) {
                return ea.sibling((a.parentNode || {}).firstChild, a)
            },
            children: function (a) {
                return ea.sibling(a.firstChild)
            },
            contents: function (a) {
                return ea.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ea.merge([], a.childNodes)
            }
        }, function (a, b) {
            ea.fn[a] = function (c, d) {
                var e = ea.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ea.filter(d, e)), this.length > 1 && (sa[a] || (e = ea.unique(e)), ra.test(a) && (e = e.reverse())), this.pushStack(e)
            }
        });
        var ta = /\S+/g,
            ua = {};
        ea.Callbacks = function (a) {
            a = "string" == typeof a ? ua[a] || f(a) : ea.extend({}, a);
            var b, c, d, e, g, h, i = [],
                j = !a.once && [],
                k = function (f) {
                    for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && g < e; g++)
                        if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                            c = !1;
                            break
                        }
                    b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
                },
                l = {
                    add: function () {
                        if (i) {
                            var d = i.length;
                            ! function b(c) {
                                ea.each(c, function (c, d) {
                                    var e = ea.type(d);
                                    "function" === e ? a.unique && l.has(d) || i.push(d) : d && d.length && "string" !== e && b(d)
                                })
                            }(arguments), b ? e = i.length : c && (h = d, k(c))
                        }
                        return this
                    },
                    remove: function () {
                        return i && ea.each(arguments, function (a, c) {
                            for (var d;
                                (d = ea.inArray(c, i, d)) > -1;) i.splice(d, 1), b && (d <= e && e-- , d <= g && g--)
                        }), this
                    },
                    has: function (a) {
                        return a ? ea.inArray(a, i) > -1 : !(!i || !i.length)
                    },
                    empty: function () {
                        return i = [], e = 0, this
                    },
                    disable: function () {
                        return i = j = c = void 0, this
                    },
                    disabled: function () {
                        return !i
                    },
                    lock: function () {
                        return j = void 0, c || l.disable(), this
                    },
                    locked: function () {
                        return !j
                    },
                    fireWith: function (a, c) {
                        return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this
                    },
                    fire: function () {
                        return l.fireWith(this, arguments), this
                    },
                    fired: function () {
                        return !!d
                    }
                };
            return l
        }, ea.extend({
            Deferred: function (a) {
                var b = [
                    ["resolve", "done", ea.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ea.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ea.Callbacks("memory")]
                ],
                    c = "pending",
                    d = {
                        state: function () {
                            return c
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this
                        },
                        then: function () {
                            var a = arguments;
                            return ea.Deferred(function (c) {
                                ea.each(b, function (b, f) {
                                    var g = ea.isFunction(a[b]) && a[b];
                                    e[f[1]](function () {
                                        var a = g && g.apply(this, arguments);
                                        a && ea.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        promise: function (a) {
                            return null != a ? ea.extend(a, d) : d
                        }
                    },
                    e = {};
                return d.pipe = d.then, ea.each(b, function (a, f) {
                    var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function () {
                        c = h
                    }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },
            when: function (a) {
                var b, c, d, e = 0,
                    f = X.call(arguments),
                    g = f.length,
                    h = 1 !== g || a && ea.isFunction(a.promise) ? g : 0,
                    i = 1 === h ? a : ea.Deferred(),
                    j = function (a, c, d) {
                        return function (e) {
                            c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                        }
                    };
                if (g > 1)
                    for (b = new Array(g), c = new Array(g), d = new Array(g); e < g; e++) f[e] && ea.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                return h || i.resolveWith(d, f), i.promise()
            }
        });
        var va;
        ea.fn.ready = function (a) {
            return ea.ready.promise().done(a), this
        }, ea.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? ea.readyWait++ : ea.ready(!0)
            },
            ready: function (a) {
                if (a === !0 ? !--ea.readyWait : !ea.isReady) {
                    if (!oa.body) return setTimeout(ea.ready);
                    ea.isReady = !0, a !== !0 && --ea.readyWait > 0 || (va.resolveWith(oa, [ea]), ea.fn.triggerHandler && (ea(oa).triggerHandler("ready"), ea(oa).off("ready")))
                }
            }
        }), ea.ready.promise = function (b) {
            if (!va)
                if (va = ea.Deferred(), "complete" === oa.readyState) setTimeout(ea.ready);
                else if (oa.addEventListener) oa.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
                else {
                    oa.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
                    var c = !1;
                    try {
                        c = null == a.frameElement && oa.documentElement
                    } catch (a) { }
                    c && c.doScroll && ! function a() {
                        if (!ea.isReady) {
                            try {
                                c.doScroll("left")
                            } catch (b) {
                                return setTimeout(a, 50)
                            }
                            g(), ea.ready()
                        }
                    }()
                }
            return va.promise(b)
        };
        var wa, xa = "undefined";
        for (wa in ea(ca)) break;
        ca.ownLast = "0" !== wa, ca.inlineBlockNeedsLayout = !1, ea(function () {
            var a, b, c, d;
            c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }),
            function () {
                var a = oa.createElement("div");
                if (null == ca.deleteExpando) {
                    ca.deleteExpando = !0;
                    try {
                        delete a.test
                    } catch (a) {
                        ca.deleteExpando = !1
                    }
                }
                a = null
            }(), ea.acceptData = function (a) {
                var b = ea.noData[(a.nodeName + " ").toLowerCase()],
                    c = +a.nodeType || 1;
                return (1 === c || 9 === c) && (!b || b !== !0 && a.getAttribute("classid") === b)
            };
        var ya = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            za = /([A-Z])/g;
        ea.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function (a) {
                return a = a.nodeType ? ea.cache[a[ea.expando]] : a[ea.expando], !!a && !j(a)
            },
            data: function (a, b, c) {
                return k(a, b, c)
            },
            removeData: function (a, b) {
                return l(a, b)
            },
            _data: function (a, b, c) {
                return k(a, b, c, !0)
            },
            _removeData: function (a, b) {
                return l(a, b, !0)
            }
        }), ea.fn.extend({
            data: function (a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = ea.data(f), 1 === f.nodeType && !ea._data(f, "parsedAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ea.camelCase(d.slice(5)), i(f, d, e[d])));
                        ea._data(f, "parsedAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function () {
                    ea.data(this, a)
                }) : arguments.length > 1 ? this.each(function () {
                    ea.data(this, a, b)
                }) : f ? i(f, a, ea.data(f, a)) : void 0
            },
            removeData: function (a) {
                return this.each(function () {
                    ea.removeData(this, a)
                })
            }
        }), ea.extend({
            queue: function (a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = ea._data(a, b), c && (!d || ea.isArray(c) ? d = ea._data(a, b, ea.makeArray(c)) : d.push(c)), d || []
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = ea.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = ea._queueHooks(a, b),
                    g = function () {
                        ea.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return ea._data(a, c) || ea._data(a, c, {
                    empty: ea.Callbacks("once memory").add(function () {
                        ea._removeData(a, b + "queue"), ea._removeData(a, c)
                    })
                })
            }
        }), ea.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ea.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                    var c = ea.queue(this, a, b);
                    ea._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ea.dequeue(this, a)
                })
            },
            dequeue: function (a) {
                return this.each(function () {
                    ea.dequeue(this, a)
                })
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", [])
            },
            promise: function (a, b) {
                var c, d = 1,
                    e = ea.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f])
                    };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ea._data(f[g], a + "queueHooks"), c && c.empty && (d++ , c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var Aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ba = ["Top", "Right", "Bottom", "Left"],
            Ca = function (a, b) {
                return a = b || a, "none" === ea.css(a, "display") || !ea.contains(a.ownerDocument, a)
            },
            Da = ea.access = function (a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === ea.type(c)) {
                    e = !0;
                    for (h in c) ea.access(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, ea.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(ea(a), c)
                })), b))
                    for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            },
            Ea = /^(?:checkbox|radio)$/i;
        ! function () {
            var a = oa.createElement("input"),
                b = oa.createElement("div"),
                c = oa.createDocumentFragment();
            if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ca.leadingWhitespace = 3 === b.firstChild.nodeType, ca.tbody = !b.getElementsByTagName("tbody").length, ca.htmlSerialize = !!b.getElementsByTagName("link").length, ca.html5Clone = "<:nav></:nav>" !== oa.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), ca.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, ca.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
                ca.noCloneEvent = !1
            }), b.cloneNode(!0).click()), null == ca.deleteExpando) {
                ca.deleteExpando = !0;
                try {
                    delete b.test
                } catch (a) {
                    ca.deleteExpando = !1
                }
            }
        }(),
            function () {
                var b, c, d = oa.createElement("div");
                for (b in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) c = "on" + b, (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), ca[b + "Bubbles"] = d.attributes[c].expando === !1);
                d = null
            }();
        var Fa = /^(?:input|select|textarea)$/i,
            Ga = /^key/,
            Ha = /^(?:mouse|pointer|contextmenu)|click/,
            Ia = /^(?:focusinfocus|focusoutblur)$/,
            Ja = /^([^.]*)(?:\.(.+)|)$/;
        ea.event = {
            global: {},
            add: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = ea._data(a);
                if (q) {
                    for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = ea.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function (a) {
                        return typeof ea === xa || a && ea.event.triggered === a.type ? void 0 : ea.event.dispatch.apply(k.elem, arguments)
                    }, k.elem = a), b = (b || "").match(ta) || [""], h = b.length; h--;) f = Ja.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = ea.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = ea.event.special[n] || {}, l = ea.extend({
                        type: n,
                        origType: p,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && ea.expr.match.needsContext.test(e),
                        namespace: o.join(".")
                    }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), ea.event.global[n] = !0);
                    a = null
                }
            },
            remove: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = ea.hasData(a) && ea._data(a);
                if (q && (k = q.events)) {
                    for (b = (b || "").match(ta) || [""], j = b.length; j--;)
                        if (h = Ja.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                            for (l = ea.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount-- , l.remove && l.remove.call(a, g));
                            i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ea.removeEvent(a, n, q.handle), delete k[n])
                        } else
                            for (n in k) ea.event.remove(a, n + b[j], c, d, !0);
                    ea.isEmptyObject(k) && (delete q.handle, ea._removeData(a, "events"))
                }
            },
            trigger: function (b, c, d, e) {
                var f, g, h, i, j, k, l, m = [d || oa],
                    n = ba.call(b, "type") ? b.type : b,
                    o = ba.call(b, "namespace") ? b.namespace.split(".") : [];
                if (h = k = d = d || oa, 3 !== d.nodeType && 8 !== d.nodeType && !Ia.test(n + ea.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[ea.expando] ? b : new ea.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ea.makeArray(c, [b]), j = ea.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                    if (!e && !j.noBubble && !ea.isWindow(d)) {
                        for (i = j.delegateType || n, Ia.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
                        k === (d.ownerDocument || oa) && m.push(k.defaultView || k.parentWindow || a)
                    }
                    for (l = 0;
                        (h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (ea._data(h, "events") || {})[b.type] && ea._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && ea.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                    if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && ea.acceptData(d) && g && d[n] && !ea.isWindow(d)) {
                        k = d[g], k && (d[g] = null), ea.event.triggered = n;
                        try {
                            d[n]()
                        } catch (a) { }
                        ea.event.triggered = void 0, k && (d[g] = k)
                    }
                    return b.result
                }
            },
            dispatch: function (a) {
                a = ea.event.fix(a);
                var b, c, d, e, f, g = [],
                    h = X.call(arguments),
                    i = (ea._data(this, "events") || {})[a.type] || [],
                    j = ea.event.special[a.type] || {};
                if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                    for (g = ea.event.handlers.call(this, a, i), b = 0;
                        (e = g[b++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = e.elem, f = 0;
                            (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();) a.namespace_re && !a.namespace_re.test(d.namespace) || (a.handleObj = d, a.data = d.data, c = ((ea.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                    return j.postDispatch && j.postDispatch.call(this, a), a.result
                }
            },
            handlers: function (a, b) {
                var c, d, e, f, g = [],
                    h = b.delegateCount,
                    i = a.target;
                if (h && i.nodeType && (!a.button || "click" !== a.type))
                    for (; i != this; i = i.parentNode || this)
                        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                            for (e = [], f = 0; f < h; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? ea(c, this).index(i) >= 0 : ea.find(c, this, null, [i]).length), e[c] && e.push(d);
                            e.length && g.push({
                                elem: i,
                                handlers: e
                            })
                        }
                return h < b.length && g.push({
                    elem: this,
                    handlers: b.slice(h)
                }), g
            },
            fix: function (a) {
                if (a[ea.expando]) return a;
                var b, c, d, e = a.type,
                    f = a,
                    g = this.fixHooks[e];
                for (g || (this.fixHooks[e] = g = Ha.test(e) ? this.mouseHooks : Ga.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ea.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
                return a.target || (a.target = f.srcElement || oa), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, b) {
                    var c, d, e, f = b.button,
                        g = b.fromElement;
                    return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || oa, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function () {
                        if (this !== o() && this.focus) try {
                            return this.focus(), !1
                        } catch (a) { }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === o() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function () {
                        if (ea.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    },
                    _default: function (a) {
                        return ea.nodeName(a.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = ea.extend(new ea.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? ea.event.trigger(e, null, b) : ea.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, ea.removeEvent = oa.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent && (typeof a[d] === xa && (a[d] = null), a.detachEvent(d, c))
        }, ea.Event = function (a, b) {
            return this instanceof ea.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, b && ea.extend(this, b), this.timeStamp = a && a.timeStamp || ea.now(), void (this[ea.expando] = !0)) : new ea.Event(a, b)
        }, ea.Event.prototype = {
            isDefaultPrevented: n,
            isPropagationStopped: n,
            isImmediatePropagationStopped: n,
            preventDefault: function () {
                var a = this.originalEvent;
                this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ea.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (a, b) {
            ea.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function (a) {
                    var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return e && (e === d || ea.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), ca.submitBubbles || (ea.event.special.submit = {
            setup: function () {
                return !ea.nodeName(this, "form") && void ea.event.add(this, "click._submit keypress._submit", function (a) {
                    var b = a.target,
                        c = ea.nodeName(b, "input") || ea.nodeName(b, "button") ? b.form : void 0;
                    c && !ea._data(c, "submitBubbles") && (ea.event.add(c, "submit._submit", function (a) {
                        a._submit_bubble = !0
                    }), ea._data(c, "submitBubbles", !0))
                })
            },
            postDispatch: function (a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ea.event.simulate("submit", this.parentNode, a, !0))
            },
            teardown: function () {
                return !ea.nodeName(this, "form") && void ea.event.remove(this, "._submit")
            }
        }), ca.changeBubbles || (ea.event.special.change = {
            setup: function () {
                return Fa.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (ea.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), ea.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1), ea.event.simulate("change", this, a, !0)
                })), !1) : void ea.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    Fa.test(b.nodeName) && !ea._data(b, "changeBubbles") && (ea.event.add(b, "change._change", function (a) {
                        !this.parentNode || a.isSimulated || a.isTrigger || ea.event.simulate("change", this.parentNode, a, !0)
                    }), ea._data(b, "changeBubbles", !0))
                })
            },
            handle: function (a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                return ea.event.remove(this, "._change"), !Fa.test(this.nodeName)
            }
        }), ca.focusinBubbles || ea.each({
            focus: "focusin",
            blur: "focusout"
        }, function (a, b) {
            var c = function (a) {
                ea.event.simulate(b, a.target, ea.event.fix(a), !0)
            };
            ea.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this,
                        e = ea._data(d, b);
                    e || d.addEventListener(a, c, !0), ea._data(d, b, (e || 0) + 1)
                },
                teardown: function () {
                    var d = this.ownerDocument || this,
                        e = ea._data(d, b) - 1;
                    e ? ea._data(d, b, e) : (d.removeEventListener(a, c, !0), ea._removeData(d, b))
                }
            }
        }), ea.fn.extend({
            on: function (a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && (c = c || b, b = void 0);
                    for (f in a) this.on(f, b, c, a[f], e);
                    return this
                }
                if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = n;
                else if (!d) return this;
                return 1 === e && (g = d, d = function (a) {
                    return ea().off(a), g.apply(this, arguments)
                }, d.guid = g.guid || (g.guid = ea.guid++)), this.each(function () {
                    ea.event.add(this, a, d, c, b)
                })
            },
            one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ea(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = n), this.each(function () {
                    ea.event.remove(this, a, c, b)
                })
            },
            trigger: function (a, b) {
                return this.each(function () {
                    ea.event.trigger(a, b, this)
                })
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                if (c) return ea.event.trigger(a, b, c, !0)
            }
        });
        var Ka = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            La = / jQuery\d+="(?:null|\d+)"/g,
            Ma = new RegExp("<(?:" + Ka + ")[\\s/>]", "i"),
            Na = /^\s+/,
            Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Pa = /<([\w:]+)/,
            Qa = /<tbody/i,
            Ra = /<|&#?\w+;/,
            Sa = /<(?:script|style|link)/i,
            Ta = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ua = /^$|\/(?:java|ecma)script/i,
            Va = /^true\/(.*)/,
            Wa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Xa = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ca.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            Ya = p(oa),
            Za = Ya.appendChild(oa.createElement("div"));
        Xa.optgroup = Xa.option, Xa.tbody = Xa.tfoot = Xa.colgroup = Xa.caption = Xa.thead, Xa.th = Xa.td, ea.extend({
            clone: function (a, b, c) {
                var d, e, f, g, h, i = ea.contains(a.ownerDocument, a);
                if (ca.html5Clone || ea.isXMLDoc(a) || !Ma.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Za.innerHTML = a.outerHTML, Za.removeChild(f = Za.firstChild)), !(ca.noCloneEvent && ca.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ea.isXMLDoc(a)))
                    for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
                if (b)
                    if (c)
                        for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
                    else w(a, f);
                return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
            },
            buildFragment: function (a, b, c, d) {
                for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; o < l; o++)
                    if (f = a[o], f || 0 === f)
                        if ("object" === ea.type(f)) ea.merge(n, f.nodeType ? [f] : f);
                        else if (Ra.test(f)) {
                            for (h = h || m.appendChild(b.createElement("div")), i = (Pa.exec(f) || ["", ""])[1].toLowerCase(), k = Xa[i] || Xa._default, h.innerHTML = k[1] + f.replace(Oa, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
                            if (!ca.leadingWhitespace && Na.test(f) && n.push(b.createTextNode(Na.exec(f)[0])), !ca.tbody)
                                for (f = "table" !== i || Qa.test(f) ? "<table>" !== k[1] || Qa.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) ea.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                            for (ea.merge(n, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                            h = m.lastChild
                        } else n.push(b.createTextNode(f));
                for (h && m.removeChild(h), ca.appendChecked || ea.grep(q(n, "input"), r), o = 0; f = n[o++];)
                    if ((!d || ea.inArray(f, d) === -1) && (g = ea.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))
                        for (e = 0; f = h[e++];) Ua.test(f.type || "") && c.push(f);
                return h = null, m
            },
            cleanData: function (a, b) {
                for (var c, d, e, f, g = 0, h = ea.expando, i = ea.cache, j = ca.deleteExpando, k = ea.event.special; null != (c = a[g]); g++)
                    if ((b || ea.acceptData(c)) && (e = c[h], f = e && i[e])) {
                        if (f.events)
                            for (d in f.events) k[d] ? ea.event.remove(c, d) : ea.removeEvent(c, d, f.handle);
                        i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xa ? c.removeAttribute(h) : c[h] = null, W.push(e))
                    }
            }
        }), ea.fn.extend({
            text: function (a) {
                return Da(this, function (a) {
                    return void 0 === a ? ea.text(this) : this.empty().append((this[0] && this[0].ownerDocument || oa).createTextNode(a))
                }, null, a, arguments.length)
            },
            append: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = s(this, a);
                        b.appendChild(a)
                    }
                })
            },
            prepend: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = s(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            remove: function (a, b) {
                for (var c, d = a ? ea.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ea.cleanData(q(c)), c.parentNode && (b && ea.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
                return this
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    for (1 === a.nodeType && ea.cleanData(q(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                    a.options && ea.nodeName(a, "select") && (a.options.length = 0)
                }
                return this
            },
            clone: function (a, b) {
                return a = null != a && a, b = null == b ? a : b, this.map(function () {
                    return ea.clone(this, a, b)
                })
            },
            html: function (a) {
                return Da(this, function (a) {
                    var b = this[0] || {},
                        c = 0,
                        d = this.length;
                    if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(La, "") : void 0;
                    if ("string" == typeof a && !Sa.test(a) && (ca.htmlSerialize || !Ma.test(a)) && (ca.leadingWhitespace || !Na.test(a)) && !Xa[(Pa.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(Oa, "<$1></$2>");
                        try {
                            for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (ea.cleanData(q(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (a) { }
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function () {
                var a = arguments[0];
                return this.domManip(arguments, function (b) {
                    a = this.parentNode, ea.cleanData(q(this)), a && a.replaceChild(b, this)
                }), a && (a.length || a.nodeType) ? this : this.remove()
            },
            detach: function (a) {
                return this.remove(a, !0)
            },
            domManip: function (a, b) {
                a = Y.apply([], a);
                var c, d, e, f, g, h, i = 0,
                    j = this.length,
                    k = this,
                    l = j - 1,
                    m = a[0],
                    n = ea.isFunction(m);
                if (n || j > 1 && "string" == typeof m && !ca.checkClone && Ta.test(m)) return this.each(function (c) {
                    var d = k.eq(c);
                    n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
                });
                if (j && (h = ea.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
                    for (f = ea.map(q(h, "script"), t), e = f.length; i < j; i++) d = h, i !== l && (d = ea.clone(d, !0, !0), e && ea.merge(f, q(d, "script"))), b.call(this[i], d, i);
                    if (e)
                        for (g = f[f.length - 1].ownerDocument, ea.map(f, u), i = 0; i < e; i++) d = f[i], Ua.test(d.type || "") && !ea._data(d, "globalEval") && ea.contains(g, d) && (d.src ? ea._evalUrl && ea._evalUrl(d.src) : ea.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wa, "")));
                    h = c = null
                }
                return this
            }
        }), ea.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (a, b) {
            ea.fn[a] = function (a) {
                for (var c, d = 0, e = [], f = ea(a), g = f.length - 1; d <= g; d++) c = d === g ? this : this.clone(!0), ea(f[d])[b](c), Z.apply(e, c.get());
                return this.pushStack(e)
            }
        });
        var $a, _a = {};
        ! function () {
            var a;
            ca.shrinkWrapBlocks = function () {
                if (null != a) return a;
                a = !1;
                var b, c, d;
                return c = oa.getElementsByTagName("body")[0], c && c.style ? (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(oa.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
            }
        }();
        var ab, bb, cb = /^margin/,
            db = new RegExp("^(" + Aa + ")(?!px)[a-z%]+$", "i"),
            eb = /^(top|right|bottom|left)$/;
        a.getComputedStyle ? (ab = function (a) {
            return a.ownerDocument.defaultView.getComputedStyle(a, null)
        }, bb = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || ab(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || ea.contains(a.ownerDocument, a) || (g = ea.style(a, b)), db.test(g) && cb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
        }) : oa.documentElement.currentStyle && (ab = function (a) {
            return a.currentStyle
        }, bb = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || ab(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), db.test(g) && !eb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
        }),
            function () {
                function b() {
                    var b, c, d, e;
                    c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, g = "4px" === (a.getComputedStyle(b, null) || {
                        width: "4px"
                    }).width, e = b.appendChild(oa.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", h = 0 === e[0].offsetHeight), c.removeChild(d))
                }
                var c, d, e, f, g, h, i;
                c = oa.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("a")[0], d = e && e.style, d && (d.cssText = "float:left;opacity:.5", ca.opacity = "0.5" === d.opacity, ca.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", ca.clearCloneStyle = "content-box" === c.style.backgroundClip, ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, ea.extend(ca, {
                    reliableHiddenOffsets: function () {
                        return null == h && b(), h
                    },
                    boxSizingReliable: function () {
                        return null == g && b(), g
                    },
                    pixelPosition: function () {
                        return null == f && b(), f
                    },
                    reliableMarginRight: function () {
                        return null == i && b(), i
                    }
                }))
            }(), ea.swap = function (a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            };
        var fb = /alpha\([^)]*\)/i,
            gb = /opacity\s*=\s*([^)]*)/,
            hb = /^(none|table(?!-c[ea]).+)/,
            ib = new RegExp("^(" + Aa + ")(.*)$", "i"),
            jb = new RegExp("^([+-])=(" + Aa + ")", "i"),
            kb = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            lb = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            mb = ["Webkit", "O", "Moz", "ms"];
        ea.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = bb(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: ca.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = ea.camelCase(b),
                        i = a.style;
                    if (b = ea.cssProps[h] || (ea.cssProps[h] = B(i, h)), g = ea.cssHooks[b] || ea.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                    if (f = typeof c, "string" === f && (e = jb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(ea.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || ea.cssNumber[h] || (c += "px"), ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                        i[b] = c
                    } catch (a) { }
                }
            },
            css: function (a, b, c, d) {
                var e, f, g, h = ea.camelCase(b);
                return b = ea.cssProps[h] || (ea.cssProps[h] = B(a.style, h)), g = ea.cssHooks[b] || ea.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bb(a, b, d)), "normal" === f && b in lb && (f = lb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || ea.isNumeric(e) ? e || 0 : f) : f
            }
        }), ea.each(["height", "width"], function (a, b) {
            ea.cssHooks[b] = {
                get: function (a, c, d) {
                    if (c) return hb.test(ea.css(a, "display")) && 0 === a.offsetWidth ? ea.swap(a, kb, function () {
                        return F(a, b, d)
                    }) : F(a, b, d)
                },
                set: function (a, c, d) {
                    var e = d && ab(a);
                    return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, e), e) : 0)
                }
            }
        }), ca.opacity || (ea.cssHooks.opacity = {
            get: function (a, b) {
                return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            },
            set: function (a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = ea.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1, (b >= 1 || "" === b) && "" === ea.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e)
            }
        }), ea.cssHooks.marginRight = A(ca.reliableMarginRight, function (a, b) {
            if (b) return ea.swap(a, {
                display: "inline-block"
            }, bb, [a, "marginRight"])
        }), ea.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (a, b) {
            ea.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Ba[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, cb.test(a) || (ea.cssHooks[a + b].set = D)
        }), ea.fn.extend({
            css: function (a, b) {
                return Da(this, function (a, b, c) {
                    var d, e, f = {},
                        g = 0;
                    if (ea.isArray(b)) {
                        for (d = ab(a), e = b.length; g < e; g++) f[b[g]] = ea.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? ea.style(a, b, c) : ea.css(a, b)
                }, a, b, arguments.length > 1)
            },
            show: function () {
                return C(this, !0)
            },
            hide: function () {
                return C(this)
            },
            toggle: function (a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    Ca(this) ? ea(this).show() : ea(this).hide()
                })
            }
        }), ea.Tween = G, G.prototype = {
            constructor: G,
            init: function (a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ea.cssNumber[c] ? "" : "px")
            },
            cur: function () {
                var a = G.propHooks[this.prop];
                return a && a.get ? a.get(this) : G.propHooks._default.get(this)
            },
            run: function (a) {
                var b, c = G.propHooks[this.prop];
                return this.options.duration ? this.pos = b = ea.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
            }
        }, G.prototype.init.prototype = G.prototype, G.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ea.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                },
                set: function (a) {
                    ea.fx.step[a.prop] ? ea.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ea.cssProps[a.prop]] || ea.cssHooks[a.prop]) ? ea.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, ea.easing = {
            linear: function (a) {
                return a
            },
            swing: function (a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, ea.fx = G.prototype.init, ea.fx.step = {};
        var nb, ob, pb = /^(?:toggle|show|hide)$/,
            qb = new RegExp("^(?:([+-])=|)(" + Aa + ")([a-z%]*)$", "i"),
            rb = /queueHooks$/,
            sb = [K],
            tb = {
                "*": [function (a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = qb.exec(b),
                        f = e && e[3] || (ea.cssNumber[a] ? "" : "px"),
                        g = (ea.cssNumber[a] || "px" !== f && +d) && qb.exec(ea.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        f = f || g[3], e = e || [], g = +d || 1;
                        do h = h || ".5", g /= h, ea.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                    }
                    return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                }]
            };
        ea.Animation = ea.extend(M, {
            tweener: function (a, b) {
                ea.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; d < e; d++) c = a[d], tb[c] = tb[c] || [], tb[c].unshift(b)
            },
            prefilter: function (a, b) {
                b ? sb.unshift(a) : sb.push(a)
            }
        }), ea.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? ea.extend({}, a) : {
                complete: c || !c && b || ea.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !ea.isFunction(b) && b
            };
            return d.duration = ea.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ea.fx.speeds ? ea.fx.speeds[d.duration] : ea.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                ea.isFunction(d.old) && d.old.call(this), d.queue && ea.dequeue(this, d.queue)
            }, d
        }, ea.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(Ca).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function (a, b, c, d) {
                var e = ea.isEmptyObject(a),
                    f = ea.speed(b, c, d),
                    g = function () {
                        var b = M(this, ea.extend({}, a), f);
                        (e || ea._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = ea.timers,
                        g = ea._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && rb.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || ea.dequeue(this, a)
                })
            },
            finish: function (a) {
                return a !== !1 && (a = a || "fx"), this.each(function () {
                    var b, c = ea._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = ea.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, ea.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), ea.each(["toggle", "show", "hide"], function (a, b) {
            var c = ea.fn[b];
            ea.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
            }
        }), ea.each({
            slideDown: I("show"),
            slideUp: I("hide"),
            slideToggle: I("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (a, b) {
            ea.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), ea.timers = [], ea.fx.tick = function () {
            var a, b = ea.timers,
                c = 0;
            for (nb = ea.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || ea.fx.stop(), nb = void 0
        }, ea.fx.timer = function (a) {
            ea.timers.push(a), a() ? ea.fx.start() : ea.timers.pop()
        }, ea.fx.interval = 13, ea.fx.start = function () {
            ob || (ob = setInterval(ea.fx.tick, ea.fx.interval))
        }, ea.fx.stop = function () {
            clearInterval(ob), ob = null
        }, ea.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ea.fn.delay = function (a, b) {
            return a = ea.fx ? ea.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
            function () {
                var a, b, c, d, e;
                b = oa.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = oa.createElement("select"), e = c.appendChild(oa.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", ca.getSetAttribute = "t" !== b.className, ca.style = /top/.test(d.getAttribute("style")), ca.hrefNormalized = "/a" === d.getAttribute("href"), ca.checkOn = !!a.value, ca.optSelected = e.selected, ca.enctype = !!oa.createElement("form").enctype, c.disabled = !0, ca.optDisabled = !e.disabled, a = oa.createElement("input"), a.setAttribute("value", ""), ca.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), ca.radioValue = "t" === a.value
            }();
        var ub = /\r/g;
        ea.fn.extend({
            val: function (a) {
                var b, c, d, e = this[0]; {
                    if (arguments.length) return d = ea.isFunction(a), this.each(function (c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, ea(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ea.isArray(e) && (e = ea.map(e, function (a) {
                            return null == a ? "" : a + ""
                        })), b = ea.valHooks[this.type] || ea.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                    if (e) return b = ea.valHooks[e.type] || ea.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)
                }
            }
        }), ea.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = ea.find.attr(a, "value");
                        return null != b ? b : ea.trim(ea.text(a))
                    }
                },
                select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || e < 0, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++)
                            if (c = d[i], (c.selected || i === e) && (ca.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !ea.nodeName(c.parentNode, "optgroup"))) {
                                if (b = ea(c).val(), f) return b;
                                g.push(b)
                            }
                        return g
                    },
                    set: function (a, b) {
                        for (var c, d, e = a.options, f = ea.makeArray(b), g = e.length; g--;)
                            if (d = e[g], ea.inArray(ea.valHooks.option.get(d), f) >= 0) try {
                                d.selected = c = !0
                            } catch (a) {
                                d.scrollHeight
                            } else d.selected = !1;
                        return c || (a.selectedIndex = -1), e
                    }
                }
            }
        }), ea.each(["radio", "checkbox"], function () {
            ea.valHooks[this] = {
                set: function (a, b) {
                    if (ea.isArray(b)) return a.checked = ea.inArray(ea(a).val(), b) >= 0
                }
            }, ca.checkOn || (ea.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var vb, wb, xb = ea.expr.attrHandle,
            yb = /^(?:checked|selected)$/i,
            zb = ca.getSetAttribute,
            Ab = ca.input;
        ea.fn.extend({
            attr: function (a, b) {
                return Da(this, ea.attr, a, b, arguments.length > 1)
            },
            removeAttr: function (a) {
                return this.each(function () {
                    ea.removeAttr(this, a)
                })
            }
        }), ea.extend({
            attr: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === xa ? ea.prop(a, b, c) : (1 === f && ea.isXMLDoc(a) || (b = b.toLowerCase(), d = ea.attrHooks[b] || (ea.expr.match.bool.test(b) ? wb : vb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = ea.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void ea.removeAttr(a, b))
            },
            removeAttr: function (a, b) {
                var c, d, e = 0,
                    f = b && b.match(ta);
                if (f && 1 === a.nodeType)
                    for (; c = f[e++];) d = ea.propFix[c] || c, ea.expr.match.bool.test(c) ? Ab && zb || !yb.test(c) ? a[d] = !1 : a[ea.camelCase("default-" + c)] = a[d] = !1 : ea.attr(a, c, ""), a.removeAttribute(zb ? c : d)
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!ca.radioValue && "radio" === b && ea.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }
        }), wb = {
            set: function (a, b, c) {
                return b === !1 ? ea.removeAttr(a, c) : Ab && zb || !yb.test(c) ? a.setAttribute(!zb && ea.propFix[c] || c, c) : a[ea.camelCase("default-" + c)] = a[c] = !0, c
            }
        }, ea.each(ea.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = xb[b] || ea.find.attr;
            xb[b] = Ab && zb || !yb.test(b) ? function (a, b, d) {
                var e, f;
                return d || (f = xb[b], xb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, xb[b] = f), e
            } : function (a, b, c) {
                if (!c) return a[ea.camelCase("default-" + b)] ? b.toLowerCase() : null
            }
        }), Ab && zb || (ea.attrHooks.value = {
            set: function (a, b, c) {
                return ea.nodeName(a, "input") ? void (a.defaultValue = b) : vb && vb.set(a, b, c)
            }
        }), zb || (vb = {
            set: function (a, b, c) {
                var d = a.getAttributeNode(c);
                if (d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c)) return b
            }
        }, xb.id = xb.name = xb.coords = function (a, b, c) {
            var d;
            if (!c) return (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
        }, ea.valHooks.button = {
            get: function (a, b) {
                var c = a.getAttributeNode(b);
                if (c && c.specified) return c.value
            },
            set: vb.set
        }, ea.attrHooks.contenteditable = {
            set: function (a, b, c) {
                vb.set(a, "" !== b && b, c)
            }
        }, ea.each(["width", "height"], function (a, b) {
            ea.attrHooks[b] = {
                set: function (a, c) {
                    if ("" === c) return a.setAttribute(b, "auto"), c
                }
            };
        })), ca.style || (ea.attrHooks.style = {
            get: function (a) {
                return a.style.cssText || void 0
            },
            set: function (a, b) {
                return a.style.cssText = b + ""
            }
        });
        var Bb = /^(?:input|select|textarea|button|object)$/i,
            Cb = /^(?:a|area)$/i;
        ea.fn.extend({
            prop: function (a, b) {
                return Da(this, ea.prop, a, b, arguments.length > 1)
            },
            removeProp: function (a) {
                return a = ea.propFix[a] || a, this.each(function () {
                    try {
                        this[a] = void 0, delete this[a]
                    } catch (a) { }
                })
            }
        }), ea.extend({
            propFix: {
                for: "htmlFor",
                class: "className"
            },
            prop: function (a, b, c) {
                var d, e, f, g = a.nodeType;
                if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !ea.isXMLDoc(a), f && (b = ea.propFix[b] || b, e = ea.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = ea.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : Bb.test(a.nodeName) || Cb.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            }
        }), ca.hrefNormalized || ea.each(["href", "src"], function (a, b) {
            ea.propHooks[b] = {
                get: function (a) {
                    return a.getAttribute(b, 4)
                }
            }
        }), ca.optSelected || (ea.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        }), ea.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            ea.propFix[this.toLowerCase()] = this
        }), ca.enctype || (ea.propFix.enctype = "encoding");
        var Db = /[\t\r\n\f]/g;
        ea.fn.extend({
            addClass: function (a) {
                var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = "string" == typeof a && a;
                if (ea.isFunction(a)) return this.each(function (b) {
                    ea(this).addClass(a.call(this, b, this.className))
                });
                if (j)
                    for (b = (a || "").match(ta) || []; h < i; h++)
                        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : " ")) {
                            for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                            g = ea.trim(d), c.className !== g && (c.className = g)
                        }
                return this
            },
            removeClass: function (a) {
                var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = 0 === arguments.length || "string" == typeof a && a;
                if (ea.isFunction(a)) return this.each(function (b) {
                    ea(this).removeClass(a.call(this, b, this.className))
                });
                if (j)
                    for (b = (a || "").match(ta) || []; h < i; h++)
                        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : "")) {
                            for (f = 0; e = b[f++];)
                                for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                            g = a ? ea.trim(d) : "", c.className !== g && (c.className = g)
                        }
                return this
            },
            toggleClass: function (a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ea.isFunction(a) ? this.each(function (c) {
                    ea(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function () {
                    if ("string" === c)
                        for (var b, d = 0, e = ea(this), f = a.match(ta) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else c !== xa && "boolean" !== c || (this.className && ea._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ea._data(this, "__className__") || "")
                })
            },
            hasClass: function (a) {
                for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++)
                    if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Db, " ").indexOf(b) >= 0) return !0;
                return !1
            }
        }), ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
            ea.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), ea.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            },
            bind: function (a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function (a, b) {
                return this.off(a, null, b)
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        });
        var Eb = ea.now(),
            Fb = /\?/,
            Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        ea.parseJSON = function (b) {
            if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
            var c, d = null,
                e = ea.trim(b + "");
            return e && !ea.trim(e.replace(Gb, function (a, b, e, f) {
                return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
            })) ? Function("return " + e)() : ea.error("Invalid JSON: " + b)
        }, ea.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
            } catch (a) {
                c = void 0
            }
            return c && c.documentElement && !c.getElementsByTagName("parsererror").length || ea.error("Invalid XML: " + b), c
        };
        var Hb, Ib, Jb = /#.*$/,
            Kb = /([?&])_=[^&]*/,
            Lb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Mb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Nb = /^(?:GET|HEAD)$/,
            Ob = /^\/\//,
            Pb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Qb = {},
            Rb = {},
            Sb = "*/".concat("*");
        try {
            Ib = location.href
        } catch (a) {
            Ib = oa.createElement("a"), Ib.href = "", Ib = Ib.href
        }
        Hb = Pb.exec(Ib.toLowerCase()) || [], ea.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Ib,
                type: "GET",
                isLocal: Mb.test(Hb[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Sb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ea.parseJSON,
                    "text xml": ea.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (a, b) {
                return b ? P(P(a, ea.ajaxSettings), b) : P(ea.ajaxSettings, a)
            },
            ajaxPrefilter: N(Qb),
            ajaxTransport: N(Rb),
            ajax: function (a, b) {
                function c(a, b, c, d) {
                    var e, k, r, s, u, w = b;
                    2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && a < 300 || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (ea.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (ea.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, !a && w || (w = "error", a < 0 && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --ea.active || ea.event.trigger("ajaxStop")))
                }
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var d, e, f, g, h, i, j, k, l = ea.ajaxSetup({}, b),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? ea(m) : ea.event,
                    o = ea.Deferred(),
                    p = ea.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    t = 0,
                    u = "canceled",
                    v = {
                        readyState: 0,
                        getResponseHeader: function (a) {
                            var b;
                            if (2 === t) {
                                if (!k)
                                    for (k = {}; b = Lb.exec(g);) k[b[1].toLowerCase()] = b[2];
                                b = k[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function () {
                            return 2 === t ? g : null
                        },
                        setRequestHeader: function (a, b) {
                            var c = a.toLowerCase();
                            return t || (a = s[c] = s[c] || a, r[a] = b), this
                        },
                        overrideMimeType: function (a) {
                            return t || (l.mimeType = a), this
                        },
                        statusCode: function (a) {
                            var b;
                            if (a)
                                if (t < 2)
                                    for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]);
                            return this
                        },
                        abort: function (a) {
                            var b = a || u;
                            return j && j.abort(b), c(0, b), this
                        }
                    };
                if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ib) + "").replace(Jb, "").replace(Ob, Hb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = ea.trim(l.dataType || "*").toLowerCase().match(ta) || [""], null == l.crossDomain && (d = Pb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hb[1] && d[2] === Hb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hb[3] || ("http:" === Hb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = ea.param(l.data, l.traditional)), O(Qb, l, b, v), 2 === t) return v;
                i = l.global, i && 0 === ea.active++ && ea.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Nb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Kb.test(f) ? f.replace(Kb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (ea.lastModified[f] && v.setRequestHeader("If-Modified-Since", ea.lastModified[f]), ea.etag[f] && v.setRequestHeader("If-None-Match", ea.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : l.accepts["*"]);
                for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
                if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
                u = "abort";
                for (e in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[e](l[e]);
                if (j = O(Rb, l, b, v)) {
                    v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
                        v.abort("timeout")
                    }, l.timeout));
                    try {
                        t = 1, j.send(r, c)
                    } catch (a) {
                        if (!(t < 2)) throw a;
                        c(-1, a)
                    }
                } else c(-1, "No Transport");
                return v
            },
            getJSON: function (a, b, c) {
                return ea.get(a, b, c, "json")
            },
            getScript: function (a, b) {
                return ea.get(a, void 0, b, "script")
            }
        }), ea.each(["get", "post"], function (a, b) {
            ea[b] = function (a, c, d, e) {
                return ea.isFunction(c) && (e = e || d, d = c, c = void 0), ea.ajax({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                })
            }
        }), ea.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            ea.fn[b] = function (a) {
                return this.on(b, a)
            }
        }), ea._evalUrl = function (a) {
            return ea.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }, ea.fn.extend({
            wrapAll: function (a) {
                if (ea.isFunction(a)) return this.each(function (b) {
                    ea(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = ea(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                        for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },
            wrapInner: function (a) {
                return ea.isFunction(a) ? this.each(function (b) {
                    ea(this).wrapInner(a.call(this, b))
                }) : this.each(function () {
                    var b = ea(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function (a) {
                var b = ea.isFunction(a);
                return this.each(function (c) {
                    ea(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    ea.nodeName(this, "body") || ea(this).replaceWith(this.childNodes)
                }).end()
            }
        }), ea.expr.filters.hidden = function (a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ca.reliableHiddenOffsets() && "none" === (a.style && a.style.display || ea.css(a, "display"))
        }, ea.expr.filters.visible = function (a) {
            return !ea.expr.filters.hidden(a)
        };
        var Tb = /%20/g,
            Ub = /\[\]$/,
            Vb = /\r?\n/g,
            Wb = /^(?:submit|button|image|reset|file)$/i,
            Xb = /^(?:input|select|textarea|keygen)/i;
        ea.param = function (a, b) {
            var c, d = [],
                e = function (a, b) {
                    b = ea.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            if (void 0 === b && (b = ea.ajaxSettings && ea.ajaxSettings.traditional), ea.isArray(a) || a.jquery && !ea.isPlainObject(a)) ea.each(a, function () {
                e(this.name, this.value)
            });
            else
                for (c in a) S(c, a[c], b, e);
            return d.join("&").replace(Tb, "+")
        }, ea.fn.extend({
            serialize: function () {
                return ea.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = ea.prop(this, "elements");
                    return a ? ea.makeArray(a) : this
                }).filter(function () {
                    var a = this.type;
                    return this.name && !ea(this).is(":disabled") && Xb.test(this.nodeName) && !Wb.test(a) && (this.checked || !Ea.test(a))
                }).map(function (a, b) {
                    var c = ea(this).val();
                    return null == c ? null : ea.isArray(c) ? ea.map(c, function (a) {
                        return {
                            name: b.name,
                            value: a.replace(Vb, "\r\n")
                        }
                    }) : {
                            name: b.name,
                            value: c.replace(Vb, "\r\n")
                        }
                }).get()
            }
        }), ea.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
        } : T;
        var Yb = 0,
            Zb = {},
            $b = ea.ajaxSettings.xhr();
        a.ActiveXObject && ea(a).on("unload", function () {
            for (var a in Zb) Zb[a](void 0, !0)
        }), ca.cors = !!$b && "withCredentials" in $b, $b = ca.ajax = !!$b, $b && ea.ajaxTransport(function (a) {
            if (!a.crossDomain || ca.cors) {
                var b;
                return {
                    send: function (c, d) {
                        var e, f = a.xhr(),
                            g = ++Yb;
                        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                            for (e in a.xhrFields) f[e] = a.xhrFields[e];
                        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                        for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                        f.send(a.hasContent && a.data || null), b = function (c, e) {
                            var h, i, j;
                            if (b && (e || 4 === f.readyState))
                                if (delete Zb[g], b = void 0, f.onreadystatechange = ea.noop, e) 4 !== f.readyState && f.abort();
                                else {
                                    j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                    try {
                                        i = f.statusText
                                    } catch (a) {
                                        i = ""
                                    }
                                    h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                                }
                            j && d(h, i, j, f.getAllResponseHeaders())
                        }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Zb[g] = b : b()
                    },
                    abort: function () {
                        b && b(void 0, !0)
                    }
                }
            }
        }), ea.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (a) {
                    return ea.globalEval(a), a
                }
            }
        }), ea.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), ea.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c = oa.head || ea("head")[0] || oa.documentElement;
                return {
                    send: function (d, e) {
                        b = oa.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                        }, c.insertBefore(b, c.firstChild)
                    },
                    abort: function () {
                        b && b.onload(void 0, !0)
                    }
                }
            }
        });
        var _b = [],
            ac = /(=)\?(?=&|$)|\?\?/;
        ea.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var a = _b.pop() || ea.expando + "_" + Eb++;
                return this[a] = !0, a
            }
        }), ea.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");
            if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = ea.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                return g || ea.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                g = arguments
            }, d.always(function () {
                a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)), g && ea.isFunction(f) && f(g[0]), g = f = void 0
            }), "script"
        }), ea.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || oa;
            var d = la.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : (d = ea.buildFragment([a], b, e), e && e.length && ea(e).remove(), ea.merge([], d.childNodes))
        };
        var bc = ea.fn.load;
        ea.fn.load = function (a, b, c) {
            if ("string" != typeof a && bc) return bc.apply(this, arguments);
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h >= 0 && (d = ea.trim(a.slice(h, a.length)), a = a.slice(0, h)), ea.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && ea.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b
            }).done(function (a) {
                e = arguments, g.html(d ? ea("<div>").append(ea.parseHTML(a)).find(d) : a)
            }).complete(c && function (a, b) {
                g.each(c, e || [a.responseText, b, a])
            }), this
        }, ea.expr.filters.animated = function (a) {
            return ea.grep(ea.timers, function (b) {
                return a === b.elem
            }).length
        };
        var cc = a.document.documentElement;
        ea.offset = {
            setOffset: function (a, b, c) {
                var d, e, f, g, h, i, j, k = ea.css(a, "position"),
                    l = ea(a),
                    m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = ea.css(a, "top"), i = ea.css(a, "left"), j = ("absolute" === k || "fixed" === k) && ea.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ea.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, ea.fn.extend({
            offset: function (a) {
                if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                    ea.offset.setOffset(this, a, b)
                });
                var b, c, d = {
                    top: 0,
                    left: 0
                },
                    e = this[0],
                    f = e && e.ownerDocument;
                if (f) return b = f.documentElement, ea.contains(b, e) ? (typeof e.getBoundingClientRect !== xa && (d = e.getBoundingClientRect()), c = V(f), {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d
            },
            position: function () {
                if (this[0]) {
                    var a, b, c = {
                        top: 0,
                        left: 0
                    },
                        d = this[0];
                    return "fixed" === ea.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ea.nodeName(a[0], "html") || (c = a.offset()), c.top += ea.css(a[0], "borderTopWidth", !0), c.left += ea.css(a[0], "borderLeftWidth", !0)), {
                        top: b.top - c.top - ea.css(d, "marginTop", !0),
                        left: b.left - c.left - ea.css(d, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var a = this.offsetParent || cc; a && !ea.nodeName(a, "html") && "static" === ea.css(a, "position");) a = a.offsetParent;
                    return a || cc
                })
            }
        }), ea.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (a, b) {
            var c = /Y/.test(b);
            ea.fn[a] = function (d) {
                return Da(this, function (a, d, e) {
                    var f = V(a);
                    return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? ea(f).scrollLeft() : e, c ? e : ea(f).scrollTop()) : a[d] = e)
                }, a, d, arguments.length, null)
            }
        }), ea.each(["top", "left"], function (a, b) {
            ea.cssHooks[b] = A(ca.pixelPosition, function (a, c) {
                if (c) return c = bb(a, b), db.test(c) ? ea(a).position()[b] + "px" : c
            })
        }), ea.each({
            Height: "height",
            Width: "width"
        }, function (a, b) {
            ea.each({
                padding: "inner" + a,
                content: b,
                "": "outer" + a
            }, function (c, d) {
                ea.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return Da(this, function (b, c, d) {
                        var e;
                        return ea.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ea.css(b, c, g) : ea.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), ea.fn.size = function () {
            return this.length
        }, ea.fn.andSelf = ea.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return ea
        });
        var dc = a.jQuery,
            ec = a.$;
        return ea.noConflict = function (b) {
            return a.$ === ea && (a.$ = ec), b && a.jQuery === ea && (a.jQuery = dc), ea
        }, typeof b === xa && (a.jQuery = a.$ = ea), ea
    }),
    function () {
        var a = this,
            b = a._,
            c = Array.prototype,
            d = Object.prototype,
            e = Function.prototype,
            f = c.push,
            g = c.slice,
            h = c.concat,
            i = d.toString,
            j = d.hasOwnProperty,
            k = Array.isArray,
            l = Object.keys,
            m = e.bind,
            n = function (a) {
                return a instanceof n ? a : this instanceof n ? void (this._wrapped = a) : new n(a)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = n), exports._ = n) : a._ = n, n.VERSION = "1.7.0";
        var o = function (a, b, c) {
            if (void 0 === b) return a;
            switch (null == c ? 3 : c) {
                case 1:
                    return function (c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function (c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function (c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function (c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return function () {
                return a.apply(b, arguments)
            }
        };
        n.iteratee = function (a, b, c) {
            return null == a ? n.identity : n.isFunction(a) ? o(a, b, c) : n.isObject(a) ? n.matches(a) : n.property(a)
        }, n.each = n.forEach = function (a, b, c) {
            if (null == a) return a;
            b = o(b, c);
            var d, e = a.length;
            if (e === +e)
                for (d = 0; d < e; d++) b(a[d], d, a);
            else {
                var f = n.keys(a);
                for (d = 0, e = f.length; d < e; d++) b(a[f[d]], f[d], a)
            }
            return a
        }, n.map = n.collect = function (a, b, c) {
            if (null == a) return [];
            b = n.iteratee(b, c);
            for (var d, e = a.length !== +a.length && n.keys(a), f = (e || a).length, g = Array(f), h = 0; h < f; h++) d = e ? e[h] : h, g[h] = b(a[d], d, a);
            return g
        };
        var p = "Reduce of empty array with no initial value";
        n.reduce = n.foldl = n.inject = function (a, b, c, d) {
            null == a && (a = []), b = o(b, d, 4);
            var e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length,
                h = 0;
            if (arguments.length < 3) {
                if (!g) throw new TypeError(p);
                c = a[f ? f[h++] : h++]
            }
            for (; h < g; h++) e = f ? f[h] : h, c = b(c, a[e], e, a);
            return c
        }, n.reduceRight = n.foldr = function (a, b, c, d) {
            null == a && (a = []), b = o(b, d, 4);
            var e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            if (arguments.length < 3) {
                if (!g) throw new TypeError(p);
                c = a[f ? f[--g] : --g]
            }
            for (; g--;) e = f ? f[g] : g, c = b(c, a[e], e, a);
            return c
        }, n.find = n.detect = function (a, b, c) {
            var d;
            return b = n.iteratee(b, c), n.some(a, function (a, c, e) {
                if (b(a, c, e)) return d = a, !0
            }), d
        }, n.filter = n.select = function (a, b, c) {
            var d = [];
            return null == a ? d : (b = n.iteratee(b, c), n.each(a, function (a, c, e) {
                b(a, c, e) && d.push(a)
            }), d)
        }, n.reject = function (a, b, c) {
            return n.filter(a, n.negate(n.iteratee(b)), c)
        }, n.every = n.all = function (a, b, c) {
            if (null == a) return !0;
            b = n.iteratee(b, c);
            var d, e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            for (d = 0; d < g; d++)
                if (e = f ? f[d] : d, !b(a[e], e, a)) return !1;
            return !0
        }, n.some = n.any = function (a, b, c) {
            if (null == a) return !1;
            b = n.iteratee(b, c);
            var d, e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            for (d = 0; d < g; d++)
                if (e = f ? f[d] : d, b(a[e], e, a)) return !0;
            return !1
        }, n.contains = n.include = function (a, b) {
            return null != a && (a.length !== +a.length && (a = n.values(a)), n.indexOf(a, b) >= 0)
        }, n.invoke = function (a, b) {
            var c = g.call(arguments, 2),
                d = n.isFunction(b);
            return n.map(a, function (a) {
                return (d ? b : a[b]).apply(a, c)
            })
        }, n.pluck = function (a, b) {
            return n.map(a, n.property(b))
        }, n.where = function (a, b) {
            return n.filter(a, n.matches(b))
        }, n.findWhere = function (a, b) {
            return n.find(a, n.matches(b))
        }, n.max = function (a, b, c) {
            var d, e, f = -(1 / 0),
                g = -(1 / 0);
            if (null == b && null != a) {
                a = a.length === +a.length ? a : n.values(a);
                for (var h = 0, i = a.length; h < i; h++) d = a[h], d > f && (f = d)
            } else b = n.iteratee(b, c), n.each(a, function (a, c, d) {
                e = b(a, c, d), (e > g || e === -(1 / 0) && f === -(1 / 0)) && (f = a, g = e)
            });
            return f
        }, n.min = function (a, b, c) {
            var d, e, f = 1 / 0,
                g = 1 / 0;
            if (null == b && null != a) {
                a = a.length === +a.length ? a : n.values(a);
                for (var h = 0, i = a.length; h < i; h++) d = a[h], d < f && (f = d)
            } else b = n.iteratee(b, c), n.each(a, function (a, c, d) {
                e = b(a, c, d), (e < g || e === 1 / 0 && f === 1 / 0) && (f = a, g = e)
            });
            return f
        }, n.shuffle = function (a) {
            for (var b, c = a && a.length === +a.length ? a : n.values(a), d = c.length, e = Array(d), f = 0; f < d; f++) b = n.random(0, f), b !== f && (e[f] = e[b]), e[b] = c[f];
            return e
        }, n.sample = function (a, b, c) {
            return null == b || c ? (a.length !== +a.length && (a = n.values(a)), a[n.random(a.length - 1)]) : n.shuffle(a).slice(0, Math.max(0, b))
        }, n.sortBy = function (a, b, c) {
            return b = n.iteratee(b, c), n.pluck(n.map(a, function (a, c, d) {
                return {
                    value: a,
                    index: c,
                    criteria: b(a, c, d)
                }
            }).sort(function (a, b) {
                var c = a.criteria,
                    d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (c < d || void 0 === d) return -1
                }
                return a.index - b.index
            }), "value")
        };
        var q = function (a) {
            return function (b, c, d) {
                var e = {};
                return c = n.iteratee(c, d), n.each(b, function (d, f) {
                    var g = c(d, f, b);
                    a(e, d, g)
                }), e
            }
        };
        n.groupBy = q(function (a, b, c) {
            n.has(a, c) ? a[c].push(b) : a[c] = [b]
        }), n.indexBy = q(function (a, b, c) {
            a[c] = b
        }), n.countBy = q(function (a, b, c) {
            n.has(a, c) ? a[c]++ : a[c] = 1
        }), n.sortedIndex = function (a, b, c, d) {
            c = n.iteratee(c, d, 1);
            for (var e = c(b), f = 0, g = a.length; f < g;) {
                var h = f + g >>> 1;
                c(a[h]) < e ? f = h + 1 : g = h
            }
            return f
        }, n.toArray = function (a) {
            return a ? n.isArray(a) ? g.call(a) : a.length === +a.length ? n.map(a, n.identity) : n.values(a) : []
        }, n.size = function (a) {
            return null == a ? 0 : a.length === +a.length ? a.length : n.keys(a).length
        }, n.partition = function (a, b, c) {
            b = n.iteratee(b, c);
            var d = [],
                e = [];
            return n.each(a, function (a, c, f) {
                (b(a, c, f) ? d : e).push(a)
            }), [d, e]
        }, n.first = n.head = n.take = function (a, b, c) {
            if (null != a) return null == b || c ? a[0] : b < 0 ? [] : g.call(a, 0, b)
        }, n.initial = function (a, b, c) {
            return g.call(a, 0, Math.max(0, a.length - (null == b || c ? 1 : b)))
        }, n.last = function (a, b, c) {
            if (null != a) return null == b || c ? a[a.length - 1] : g.call(a, Math.max(a.length - b, 0))
        }, n.rest = n.tail = n.drop = function (a, b, c) {
            return g.call(a, null == b || c ? 1 : b)
        }, n.compact = function (a) {
            return n.filter(a, n.identity)
        };
        var r = function (a, b, c, d) {
            if (b && n.every(a, n.isArray)) return h.apply(d, a);
            for (var e = 0, g = a.length; e < g; e++) {
                var i = a[e];
                n.isArray(i) || n.isArguments(i) ? b ? f.apply(d, i) : r(i, b, c, d) : c || d.push(i)
            }
            return d
        };
        n.flatten = function (a, b) {
            return r(a, b, !1, [])
        }, n.without = function (a) {
            return n.difference(a, g.call(arguments, 1))
        }, n.uniq = n.unique = function (a, b, c, d) {
            if (null == a) return [];
            n.isBoolean(b) || (d = c, c = b, b = !1), null != c && (c = n.iteratee(c, d));
            for (var e = [], f = [], g = 0, h = a.length; g < h; g++) {
                var i = a[g];
                if (b) g && f === i || e.push(i), f = i;
                else if (c) {
                    var j = c(i, g, a);
                    n.indexOf(f, j) < 0 && (f.push(j), e.push(i))
                } else n.indexOf(e, i) < 0 && e.push(i)
            }
            return e
        }, n.union = function () {
            return n.uniq(r(arguments, !0, !0, []))
        }, n.intersection = function (a) {
            if (null == a) return [];
            for (var b = [], c = arguments.length, d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                if (!n.contains(b, f)) {
                    for (var g = 1; g < c && n.contains(arguments[g], f); g++);
                    g === c && b.push(f)
                }
            }
            return b
        }, n.difference = function (a) {
            var b = r(g.call(arguments, 1), !0, !0, []);
            return n.filter(a, function (a) {
                return !n.contains(b, a)
            })
        }, n.zip = function (a) {
            if (null == a) return [];
            for (var b = n.max(arguments, "length").length, c = Array(b), d = 0; d < b; d++) c[d] = n.pluck(arguments, d);
            return c
        }, n.object = function (a, b) {
            if (null == a) return {};
            for (var c = {}, d = 0, e = a.length; d < e; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c
        }, n.indexOf = function (a, b, c) {
            if (null == a) return -1;
            var d = 0,
                e = a.length;
            if (c) {
                if ("number" != typeof c) return d = n.sortedIndex(a, b), a[d] === b ? d : -1;
                d = c < 0 ? Math.max(0, e + c) : c
            }
            for (; d < e; d++)
                if (a[d] === b) return d;
            return -1
        }, n.lastIndexOf = function (a, b, c) {
            if (null == a) return -1;
            var d = a.length;
            for ("number" == typeof c && (d = c < 0 ? d + c + 1 : Math.min(d, c + 1)); --d >= 0;)
                if (a[d] === b) return d;
            return -1
        }, n.range = function (a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = c || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = Array(d), f = 0; f < d; f++ , a += c) e[f] = a;
            return e
        };
        var s = function () { };
        n.bind = function (a, b) {
            var c, d;
            if (m && a.bind === m) return m.apply(a, g.call(arguments, 1));
            if (!n.isFunction(a)) throw new TypeError("Bind must be called on a function");
            return c = g.call(arguments, 2), d = function () {
                if (!(this instanceof d)) return a.apply(b, c.concat(g.call(arguments)));
                s.prototype = a.prototype;
                var e = new s;
                s.prototype = null;
                var f = a.apply(e, c.concat(g.call(arguments)));
                return n.isObject(f) ? f : e
            }
        }, n.partial = function (a) {
            var b = g.call(arguments, 1);
            return function () {
                for (var c = 0, d = b.slice(), e = 0, f = d.length; e < f; e++) d[e] === n && (d[e] = arguments[c++]);
                for (; c < arguments.length;) d.push(arguments[c++]);
                return a.apply(this, d)
            }
        }, n.bindAll = function (a) {
            var b, c, d = arguments.length;
            if (d <= 1) throw new Error("bindAll must be passed function names");
            for (b = 1; b < d; b++) c = arguments[b], a[c] = n.bind(a[c], a);
            return a
        }, n.memoize = function (a, b) {
            var c = function (d) {
                var e = c.cache,
                    f = b ? b.apply(this, arguments) : d;
                return n.has(e, f) || (e[f] = a.apply(this, arguments)), e[f]
            };
            return c.cache = {}, c
        }, n.delay = function (a, b) {
            var c = g.call(arguments, 2);
            return setTimeout(function () {
                return a.apply(null, c)
            }, b)
        }, n.defer = function (a) {
            return n.delay.apply(n, [a, 1].concat(g.call(arguments, 1)))
        }, n.throttle = function (a, b, c) {
            var d, e, f, g = null,
                h = 0;
            c || (c = {});
            var i = function () {
                h = c.leading === !1 ? 0 : n.now(), g = null, f = a.apply(d, e), g || (d = e = null)
            };
            return function () {
                var j = n.now();
                h || c.leading !== !1 || (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, k <= 0 || k > b ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), g || (d = e = null)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
            }
        }, n.debounce = function (a, b, c) {
            var d, e, f, g, h, i = function () {
                var j = n.now() - g;
                j < b && j > 0 ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), d || (f = e = null)))
            };
            return function () {
                f = this, e = arguments, g = n.now();
                var j = c && !d;
                return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h
            }
        }, n.wrap = function (a, b) {
            return n.partial(b, a)
        }, n.negate = function (a) {
            return function () {
                return !a.apply(this, arguments)
            }
        }, n.compose = function () {
            var a = arguments,
                b = a.length - 1;
            return function () {
                for (var c = b, d = a[b].apply(this, arguments); c--;) d = a[c].call(this, d);
                return d
            }
        }, n.after = function (a, b) {
            return function () {
                if (--a < 1) return b.apply(this, arguments)
            }
        }, n.before = function (a, b) {
            var c;
            return function () {
                return --a > 0 ? c = b.apply(this, arguments) : b = null, c
            }
        }, n.once = n.partial(n.before, 2), n.keys = function (a) {
            if (!n.isObject(a)) return [];
            if (l) return l(a);
            var b = [];
            for (var c in a) n.has(a, c) && b.push(c);
            return b
        }, n.values = function (a) {
            for (var b = n.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = a[b[e]];
            return d
        }, n.pairs = function (a) {
            for (var b = n.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = [b[e], a[b[e]]];
            return d
        }, n.invert = function (a) {
            for (var b = {}, c = n.keys(a), d = 0, e = c.length; d < e; d++) b[a[c[d]]] = c[d];
            return b
        }, n.functions = n.methods = function (a) {
            var b = [];
            for (var c in a) n.isFunction(a[c]) && b.push(c);
            return b.sort()
        }, n.extend = function (a) {
            if (!n.isObject(a)) return a;
            for (var b, c, d = 1, e = arguments.length; d < e; d++) {
                b = arguments[d];
                for (c in b) j.call(b, c) && (a[c] = b[c])
            }
            return a
        }, n.pick = function (a, b, c) {
            var d, e = {};
            if (null == a) return e;
            if (n.isFunction(b)) {
                b = o(b, c);
                for (d in a) {
                    var f = a[d];
                    b(f, d, a) && (e[d] = f)
                }
            } else {
                var i = h.apply([], g.call(arguments, 1));
                a = new Object(a);
                for (var j = 0, k = i.length; j < k; j++) d = i[j], d in a && (e[d] = a[d])
            }
            return e
        }, n.omit = function (a, b, c) {
            if (n.isFunction(b)) b = n.negate(b);
            else {
                var d = n.map(h.apply([], g.call(arguments, 1)), String);
                b = function (a, b) {
                    return !n.contains(d, b)
                }
            }
            return n.pick(a, b, c)
        }, n.defaults = function (a) {
            if (!n.isObject(a)) return a;
            for (var b = 1, c = arguments.length; b < c; b++) {
                var d = arguments[b];
                for (var e in d) void 0 === a[e] && (a[e] = d[e])
            }
            return a
        }, n.clone = function (a) {
            return n.isObject(a) ? n.isArray(a) ? a.slice() : n.extend({}, a) : a
        }, n.tap = function (a, b) {
            return b(a), a
        };
        var t = function (a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a === 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof n && (a = a._wrapped), b instanceof n && (b = b._wrapped);
            var e = i.call(a);
            if (e !== i.call(b)) return !1;
            switch (e) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a === +b
            }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var f = c.length; f--;)
                if (c[f] === a) return d[f] === b;
            var g = a.constructor,
                h = b.constructor;
            if (g !== h && "constructor" in a && "constructor" in b && !(n.isFunction(g) && g instanceof g && n.isFunction(h) && h instanceof h)) return !1;
            c.push(a), d.push(b);
            var j, k;
            if ("[object Array]" === e) {
                if (j = a.length, k = j === b.length)
                    for (; j-- && (k = t(a[j], b[j], c, d)););
            } else {
                var l, m = n.keys(a);
                if (j = m.length, k = n.keys(b).length === j)
                    for (; j-- && (l = m[j], k = n.has(b, l) && t(a[l], b[l], c, d)););
            }
            return c.pop(), d.pop(), k
        };
        n.isEqual = function (a, b) {
            return t(a, b, [], [])
        }, n.isEmpty = function (a) {
            if (null == a) return !0;
            if (n.isArray(a) || n.isString(a) || n.isArguments(a)) return 0 === a.length;
            for (var b in a)
                if (n.has(a, b)) return !1;
            return !0
        }, n.isElement = function (a) {
            return !(!a || 1 !== a.nodeType)
        }, n.isArray = k || function (a) {
            return "[object Array]" === i.call(a)
        }, n.isObject = function (a) {
            var b = typeof a;
            return "function" === b || "object" === b && !!a
        }, n.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (a) {
            n["is" + a] = function (b) {
                return i.call(b) === "[object " + a + "]"
            }
        }), n.isArguments(arguments) || (n.isArguments = function (a) {
            return n.has(a, "callee")
        }), "function" != typeof /./ && (n.isFunction = function (a) {
            return "function" == typeof a || !1
        }), n.isFinite = function (a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        }, n.isNaN = function (a) {
            return n.isNumber(a) && a !== +a
        }, n.isBoolean = function (a) {
            return a === !0 || a === !1 || "[object Boolean]" === i.call(a)
        }, n.isNull = function (a) {
            return null === a
        }, n.isUndefined = function (a) {
            return void 0 === a
        }, n.has = function (a, b) {
            return null != a && j.call(a, b)
        }, n.noConflict = function () {
            return a._ = b, this
        }, n.identity = function (a) {
            return a
        }, n.constant = function (a) {
            return function () {
                return a
            }
        }, n.noop = function () { }, n.property = function (a) {
            return function (b) {
                return b[a]
            }
        }, n.matches = function (a) {
            var b = n.pairs(a),
                c = b.length;
            return function (a) {
                if (null == a) return !c;
                a = new Object(a);
                for (var d = 0; d < c; d++) {
                    var e = b[d],
                        f = e[0];
                    if (e[1] !== a[f] || !(f in a)) return !1
                }
                return !0
            }
        }, n.times = function (a, b, c) {
            var d = Array(Math.max(0, a));
            b = o(b, c, 1);
            for (var e = 0; e < a; e++) d[e] = b(e);
            return d
        }, n.random = function (a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
        }, n.now = Date.now || function () {
            return (new Date).getTime()
        };
        var u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
            v = n.invert(u),
            w = function (a) {
                var b = function (b) {
                    return a[b]
                },
                    c = "(?:" + n.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return function (a) {
                    return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
                }
            };
        n.escape = w(u), n.unescape = w(v), n.result = function (a, b) {
            if (null != a) {
                var c = a[b];
                return n.isFunction(c) ? a[b]() : c
            }
        };
        var x = 0;
        n.uniqueId = function (a) {
            var b = ++x + "";
            return a ? a + b : b
        }, n.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var y = /(.)^/,
            z = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            A = /\\|'|\r|\n|\u2028|\u2029/g,
            B = function (a) {
                return "\\" + z[a]
            };
        n.template = function (a, b, c) {
            !b && c && (b = c), b = n.defaults({}, b, n.templateSettings);
            var d = RegExp([(b.escape || y).source, (b.interpolate || y).source, (b.evaluate || y).source].join("|") + "|$", "g"),
                e = 0,
                f = "__p+='";
            a.replace(d, function (b, c, d, g, h) {
                return f += a.slice(e, h).replace(A, B), e = h + b.length, c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='"), b
            }), f += "';\n", b.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                var g = new Function(b.variable || "obj", "_", f)
            } catch (a) {
                throw a.source = f, a
            }
            var h = function (a) {
                return g.call(this, a, n)
            },
                i = b.variable || "obj";
            return h.source = "function(" + i + "){\n" + f + "}", h
        }, n.chain = function (a) {
            var b = n(a);
            return b._chain = !0, b
        };
        var C = function (a) {
            return this._chain ? n(a).chain() : a
        };
        n.mixin = function (a) {
            n.each(n.functions(a), function (b) {
                var c = n[b] = a[b];
                n.prototype[b] = function () {
                    var a = [this._wrapped];
                    return f.apply(a, arguments), C.call(this, c.apply(n, a))
                }
            })
        }, n.mixin(n), n.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
            var b = c[a];
            n.prototype[a] = function () {
                var c = this._wrapped;
                return b.apply(c, arguments), "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0], C.call(this, c)
            }
        }), n.each(["concat", "join", "slice"], function (a) {
            var b = c[a];
            n.prototype[a] = function () {
                return C.call(this, b.apply(this._wrapped, arguments))
            }
        }), n.prototype.value = function () {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function () {
            return n
        })
    }.call(this), ! function (a, b) {
        "undefined" != typeof module && module.exports ? module.exports.browser = b() : "function" == typeof define && define.amd ? define("bowser", b) : this[a] = b()
    }("bowser", function () {
        function a(a) {
            function c(b) {
                var c = a.match(b);
                return c && c.length > 1 && c[1] || ""
            }
            var d, e = c(/(ipod|iphone|ipad)/i).toLowerCase(),
                f = /like android/i.test(a),
                g = !f && /android/i.test(a),
                h = c(/version\/(\d+(\.\d+)?)/i),
                i = /tablet/i.test(a),
                j = !i && /[^-]mobi/i.test(a);
            /opera|opr/i.test(a) ? d = {
                name: "Opera",
                opera: b,
                version: h || c(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
            } : /windows phone/i.test(a) ? d = {
                name: "Windows Phone",
                windowsphone: b,
                msie: b,
                version: c(/iemobile\/(\d+(\.\d+)?)/i)
            } : /msie|trident/i.test(a) ? d = {
                name: "Internet Explorer",
                msie: b,
                version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            } : /chrome|crios|crmo/i.test(a) ? d = {
                name: "Chrome",
                chrome: b,
                version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : e ? (d = {
                name: "iphone" == e ? "iPhone" : "ipad" == e ? "iPad" : "iPod"
            }, h && (d.version = h)) : /sailfish/i.test(a) ? d = {
                name: "Sailfish",
                sailfish: b,
                version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            } : /seamonkey\//i.test(a) ? d = {
                name: "SeaMonkey",
                seamonkey: b,
                version: c(/seamonkey\/(\d+(\.\d+)?)/i)
            } : /firefox|iceweasel/i.test(a) ? (d = {
                name: "Firefox",
                firefox: b,
                version: c(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
            }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(a) && (d.firefoxos = b)) : /silk/i.test(a) ? d = {
                name: "Amazon Silk",
                silk: b,
                version: c(/silk\/(\d+(\.\d+)?)/i)
            } : g ? d = {
                name: "Android",
                version: h
            } : /phantom/i.test(a) ? d = {
                name: "PhantomJS",
                phantom: b,
                version: c(/phantomjs\/(\d+(\.\d+)?)/i)
            } : /blackberry|\bbb\d+/i.test(a) || /rim\stablet/i.test(a) ? d = {
                name: "BlackBerry",
                blackberry: b,
                version: h || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            } : /(web|hpw)os/i.test(a) ? (d = {
                name: "WebOS",
                webos: b,
                version: h || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            }, /touchpad\//i.test(a) && (d.touchpad = b)) : d = /bada/i.test(a) ? {
                name: "Bada",
                bada: b,
                version: c(/dolfin\/(\d+(\.\d+)?)/i)
            } : /tizen/i.test(a) ? {
                name: "Tizen",
                tizen: b,
                version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || h
            } : /safari/i.test(a) ? {
                name: "Safari",
                safari: b,
                version: h
            } : {}, /(apple)?webkit/i.test(a) ? (d.name = d.name || "Webkit", d.webkit = b, !d.version && h && (d.version = h)) : !d.opera && /gecko\//i.test(a) && (d.name = d.name || "Gecko", d.gecko = b, d.version = d.version || c(/gecko\/(\d+(\.\d+)?)/i)), g || d.silk ? d.android = b : e && (d[e] = b, d.ios = b);
            var k = "";
            e ? (k = c(/os (\d+([_\s]\d+)*) like mac os x/i), k = k.replace(/[_\s]/g, ".")) : g ? k = c(/android[ \/-](\d+(\.\d+)*)/i) : d.windowsphone ? k = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : d.webos ? k = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : d.blackberry ? k = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : d.bada ? k = c(/bada\/(\d+(\.\d+)*)/i) : d.tizen && (k = c(/tizen[\/\s](\d+(\.\d+)*)/i)), k && (d.osversion = k);
            var l = k.split(".")[0];
            return i || "ipad" == e || g && (3 == l || 4 == l && !j) || d.silk ? d.tablet = b : (j || "iphone" == e || "ipod" == e || g || d.blackberry || d.webos || d.bada) && (d.mobile = b), d.msie && d.version >= 10 || d.chrome && d.version >= 20 || d.firefox && d.version >= 20 || d.safari && d.version >= 6 || d.opera && d.version >= 10 || d.ios && d.osversion && d.osversion.split(".")[0] >= 6 || d.blackberry && d.version >= 10.1 ? d.a = b : d.msie && d.version < 10 || d.chrome && d.version < 20 || d.firefox && d.version < 20 || d.safari && d.version < 6 || d.opera && d.version < 10 || d.ios && d.osversion && d.osversion.split(".")[0] < 6 ? d.c = b : d.x = b, d
        }
        var b = !0,
            c = a("undefined" != typeof navigator ? navigator.userAgent : "");
        return c._detect = a, c
    }), define("breakpointlistener", ["bowser"], function (a) {
        function b(a) {
            if (null == a || "object" != typeof a) return a;
            var b = a.constructor();
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
            return b
        }

        function c() {
            if (arguments.length) {
                for (var a = arguments[0], b = arguments.length - 1; b > 0; b--)
                    if (null != arguments[b] && "object" == typeof arguments[b])
                        for (var c in arguments[b]) arguments[b].hasOwnProperty(c) && (a[c] = arguments[b][c]);
                return a
            }
        }
        var d = function (d) {
            function e(a) {
                i.options = c(b(j), a || {}), i.breakpointHandlers = [], i.currentBreakpoint = i.getCurrentBreakpoint(), i._onResize = function () {
                    g.apply(i, arguments)
                }, f()
            }

            function f() {
                a.msie && a.version <= 8 ? window.attachEvent("onresize", i._onResize) : window.addEventListener("resize", i._onResize, !1)
            }

            function g() {
                var a = {
                    lastBreakpoint: i.currentBreakpoint,
                    currentBreakpoint: h(),
                    timestamp: new Date
                };
                if (a.lastBreakpoint != a.currentBreakpoint && i.breakpointHandlers.length)
                    for (var b = 0; b < i.breakpointHandlers.length; b++) i.breakpointHandlers[b].call(i, a)
            }

            function h() {
                var a = i.getCssViewPortWidth(),
                    b = "xs";
                for (var c in i.options.breakpoints) {
                    var d = i.options.breakpoints[c];
                    if (d > a) break;
                    b = c
                }
                return i.currentBreakpoint = b, b
            }
            var i = this,
                j = {};
            i.getCurrentBreakpoint = function () {
                return i.currentBreakpoint || h(), i.currentBreakpoint
            }, i.getCssViewPortHeight = function () {
                var b = window,
                    c = "inner";
                return a.msie && a.version <= 8 ? document.documentElement.offsetHeight : ("innerHeight" in window || (c = "client", b = document.documentElement || document.body), b[c + "Height"])
            }, i.getCssViewPortWidth = function () {
                var b = window,
                    c = "inner";
                return a.msie && a.version <= 8 ? document.documentElement.offsetWidth : ("innerWidth" in window || (c = "client", b = document.documentElement || document.body), b[c + "Width"])
            }, i.offChangeBreakpoint = function (a) {
                return i.unregisterBreakpointHandler(a)
            }, i.onChangeBreakpoint = function (a) {
                return i.registerBreakpointHandler(a)
            }, i.registerBreakpointHandler = function (a) {
                return "function" == typeof a && i.breakpointHandlers.push(a), a
            }, i.unregisterBreakpointHandler = function (a) {
                var b = i.breakpointHandlers.indexOf(a);
                return b > -1 ? (i.breakpointHandlers.splice(b, 1), a) : void 0
            }, i.updateBreakpoint = function (a) {
                return a ? h() : g(), i.currentBreakpoint
            }, e(d)
        };
        return d
    }), define("b_data-filter", ["underscore"], function (a) {
        var b = {};
        return b.Filter = function (a) {
            var b = this;
            return b.initialize(a)
        }, b.Filter.prototype = {
            initialize: function (c) {
                var d = this;
                return d.subFilters = [], c && a.isArray(c.subFilters) && a.each(c.subFilters, function (a) {
                    d.subFilters.push(new b.SubFilter(a))
                }), d
            },
            filter: function (b, c) {
                var d, e = this;
                if (!a.isArray(c)) throw "The provided dataArray must be of type array.";
                return d = c.slice(), a.each(e.subFilters, function (a) {
                    d = a.filter(b, d)
                }), d
            }
        }, b.SubFilter = function (a) {
            var b = this;
            b.initialize(a)
        }, b.SubFilter.prototype = {
            preparedFilterFunctions: {
                equal: function (a, b) {
                    return a == b
                },
                equalStrict: function (a, b) {
                    return a === b
                },
                greaterThan: function (b, c) {
                    var d, e;
                    return d = a.isString(b) ? parseFloat(b) : b, e = a.isString(b) ? parseFloat(c) : c, d > e
                },
                greaterThanOrEqual: function (b, c) {
                    var d, e;
                    return d = a.isString(b) ? parseFloat(b) : b, e = a.isString(b) ? parseFloat(c) : c, d >= e
                },
                lessThan: function (b, c) {
                    var d, e;
                    return d = a.isString(b) ? parseFloat(b) : b, e = a.isString(b) ? parseFloat(c) : c, d < e
                },
                lessThanOrEqual: function (b, c) {
                    var d, e;
                    return d = a.isString(b) ? parseFloat(b) : b, e = a.isString(b) ? parseFloat(c) : c, d <= e
                }
            },
            initialize: function (b) {
                var c = this;
                c.origConf = b, c.referenceAttributeName = b.referenceAttribute, c.dataAttributeName = b.dataAttribute || c.referenceAttributeName, c.skipEmptyReferenceAttribute = !(!b.skipEmptyReferenceAttribute && "undefined" != typeof b.skipEmptyReferenceAttribute), a.isFunction(b.filterFunction) ? c.filterFunction = b.filterFunction : a.isString(b.filterFunction) && (c.filterFunction = c.preparedFilterFunctions[b.filterFunction])
            },
            filter: function (b, c) {
                var d = this,
                    e = [],
                    f = b[d.referenceAttributeName];
                return !d.skipEmptyReferenceAttribute || "undefined" != typeof f && null !== f && "" !== f ? (a.each(c, function (a) {
                    var b = a[d.dataAttributeName];
                    d.filterFunction(f, b) && e.push(a)
                }), e) : c.slice()
            }
        }, b
    }), define("b_json-nav", ["jquery", "underscore"], function (a, b) {
        var c, d = "ontouchend" in document,
            e = function (e) {
                function g(c) {
                    if (!c || !c.$el || !c.data) throw "JSON Navigation requires an opts object that contains the following fields: $el, data.";
                    return a.extend(p, u, c), p.setData(p.data), delete p.data, b.each(p.breakpoints, function (a, b) {
                        a.minWidth = "default" == b ? 0 : parseInt(b)
                    }), p.eventHandlers && (b.isArray(p.eventHandlers.onRender) && (r.onRenderHandler = p.eventHandlers.onRender), b.isArray(p.eventHandlers.onClickItem) && (r.clickItemHandlers = p.eventHandlers.onClickItem), delete p.eventHandlers), a.each(p.breakpoints, function (b, c) {
                        p.breakpoints[b] = a.extend({}, v, c)
                    }), p.styleClass = c.styleClass || "", p.renderedTemplate = void 0, p.$navEl = a('<nav class="' + p.styleClass + ' navbar navbar-default b_jsonNav bJS_jsonNav" role="navigation"></nav>'), p.$navItemEls = void 0, p.$el.append(p.$navEl), p.setupCurrentBreakpoint(), i(), p
                }

                function h() {
                    var a = {},
                        c = {},
                        d = 1;
                    if (!b.isObject(p.originalData)) throw "Could not prepare navigation data due to invalid data object.";
                    return b.each(p.originalData, function (e, g) {
                        var h;
                        if (b.isArray(p.originalData))
                            if (e.uid) h = e.uid;
                            else
                                for (; !h || c[h];) h = ++d;
                        else h = g;
                        a[h] = new f(p, {
                            uid: h,
                            pid: e.pid || void 0,
                            originalOrder: g,
                            title: e.title || "",
                            url: e.url || "",
                            children: {},
                            originalItem: e
                        })
                    }), b.each(a, function (b, c) {
                        b.pid && (a[b.pid] ? a[b.pid].children[c] = !0 : b.pid = void 0)
                    }), a
                }

                function i() {
                    a(window).on("resize", m), p.isTouchDevice() ? a(window).on("touchstart", l) : a(window).on("click", l)
                }

                function j() {
                    a(window).off("resize", m), p.isTouchDevice() ? a(window).off("touchstart", l) : a(window).off("click", l)
                }

                function k() {
                    function c(c) {
                        var d = a(c.currentTarget);
                        f.eventHandlers && f.eventHandlers.onClickItem && (b.each(f.eventHandlers.onClickItem, function (b) {
                            var e = p.getItemByEl(d),
                                f = a.extend({}, c, {
                                    $el: d,
                                    navItem: e,
                                    menu: p
                                });
                            b.call(p, f)
                        }), c.stopPropagation())
                    }

                    function d(c) {
                        var d = a(c.currentTarget);
                        f.eventHandlers && f.eventHandlers.onMouseEnterItem && b.each(f.eventHandlers.onMouseEnterItem, function (b) {
                            var e = p.getItemByEl(d),
                                f = a.extend({}, c, {
                                    $el: d,
                                    navItem: e,
                                    menu: p
                                });
                            b.call(p, f)
                        })
                    }

                    function e(c) {
                        if (f.eventHandlers && f.eventHandlers.onMouseLeave) {
                            var d = a.extend({}, c, {
                                menu: p
                            });
                            b.each(f.eventHandlers.onMouseLeave, function (a) {
                                a.call(p, d)
                            })
                        }
                    }
                    var f = p.getCurrentBreakpointOptions();
                    p.$navItemEls.on("click", c), p.$navItemEls.on("mouseenter", d), p.$navEl.on("mouseleave", e)
                }

                function l(c) {
                    var d = (a(c.target), p.getCurrentBreakpointOptions());
                    if (!a.contains(p.$el.get(0), c.target) && d.eventHandlers.onClickOutside) {
                        var e = a.extend({}, c, {
                            menu: p
                        });
                        b.each(d.eventHandlers.onClickOutside, function (a) {
                            a.call(p, e)
                        })
                    }
                }

                function m() {
                    w = !0, p.setupCurrentBreakpoint()
                }

                function n(c) {
                    var d = a.Deferred();
                    return p.templateIsRendered = d.promise(), require(["tpl!" + c], function (a) {
                        var c;
                        try {
                            var e = a({
                                managedData: o,
                                originalData: p.originalData,
                                navigation: p
                            });
                            p.$navEl.append(e), b.each(r.onRenderHandler, function (a) {
                                a.call(p, p)
                            })
                        } catch (a) {
                            c = a
                        }
                        c ? (console.log(c), d.reject(c)) : d.resolve()
                    }), p.templateIsRendered
                }
                var o, p = this,
                    q = {
                        subtreeContainer: ".bJS_jsonNav-container-subTree"
                    },
                    r = {
                        mouseEnterHandlers: [],
                        mouseLeaveHandlers: [],
                        clickItemHandlers: [],
                        onRenderHandler: []
                    },
                    s = void 0,
                    t = "",
                    u = {
                        navItemSelector: "li",
                        styleClass: "",
                        breakpoints: {
                            default: {
                                styleClass: "b_jsonNav-mobile",
                                templatePath: "templates/mobile.tpl"
                            },
                            1024: {
                                styleClass: "b_jsonNav-desktop",
                                templatePath: "templates/desktop.tpl"
                            }
                        }
                    },
                    v = {
                        showSubtreeOnHover: !0
                    },
                    w = !0,
                    x = !0,
                    y = a(window);
                return p.DEVICE_TYPE_STANDARD = "DEVICE_TYPE_STANDARD", p.DEVICE_TYPE_TOUCH = "DEVICE_TYPE_TOUCH", p.DEVICE_TYPE_ALL = "DEVICE_TYPE_ALL", p.clear = function () {
                    p.$navEl.empty(), t && p.$navEl.removeClass(t), p.$navItemEls = void 0, b.each(o, function (a, b) {
                        a.$el = void 0, a.$backEl = void 0, a.$subTreeContainer = void 0
                    })
                }, p.destroy = function () {
                    j(), p.$navEl.remove()
                }, p.getCurrentBreakpointOptions = function (c) {
                    if (w || c) {
                        var d = y.width(),
                            e = p.breakpoints.default ? p.breakpoints.default : void 0,
                            f = void 0,
                            g = p.getDeviceType();
                        a.each(p.breakpoints, function (a, c) {
                            var h = c.deviceTypes;
                            if (!h || b.isArray(h) && (0 == h.length || b.contains(h, p.DEVICE_TYPE_ALL) || b.contains(h, g)) || h === g) {
                                var i = parseInt(a);
                                i && i <= d && (!f || f > i) && (e = c, f = i)
                            }
                        }), s !== e && (s = e, x = !0), w = !1
                    }
                    return s
                }, p.getChildItems = function (a) {
                    return b.sortBy(b.where(o, {
                        pid: p.getItem(a).uid
                    }), function (a) {
                        return a.originalOrder
                    })
                }, p.getDeviceType = function () {
                    return c || (c = d ? p.DEVICE_TYPE_TOUCH : p.DEVICE_TYPE_STANDARD), c
                }, p.getParentItem = function (a) {
                    var b = p.getItem(a);
                    return p.getItem(b.pid)
                }, p.getHierarchyLevel = function (a) {
                    var b = p.getItem(a);
                    return b._level || (b._level = p.getRootLineOfItem(a).length), b._level
                }, p.getItem = function (a) {
                    var c = void 0;
                    return a && (c = b.isString(a) || b.isNumber(a) ? o[a] : o[a.uid]), c
                }, p.getItemByUID = function (a) {
                    return o[a]
                }, p.getItemIdFromEl = function (a) {
                    return a.data("itemuid")
                }, p.getItemByEl = function (a) {
                    return p.getItem(p.getItemIdFromEl(a))
                }, p.getManagedData = function () {
                    return b.extend({}, o)
                }, p.getOpenItems = function () {
                    return b.where(o, {
                        _open: !0
                    })
                }, p.getRootItems = function () {
                    return b.sortBy(b.where(o, {
                        pid: void 0
                    }), function (a) {
                        return a.originalOrder
                    })
                }, p.getRootLineOfItem = function (a) {
                    for (var b = p.getItem(a), c = []; b;) c.unshift(b), b = p.getItem(b.pid);
                    return c
                }, p.isInRootLineOfItem = function (a, b) {
                    for (var c = p.getItem(b); c;) {
                        if (c.pid == a) return !0;
                        c = p.getItem(c.pid)
                    }
                    return !1
                }, p.isTouchDevice = function () {
                    return d
                }, p.onRender = function (a) {
                    r.onRenderHandler.push(a)
                }, p.offRender = function (a) {
                    var c;
                    c = b.indexOf(r.onRenderHandler, a), c >= 0 && r.mouseEnterHandlers.splice(c, 1)
                }, p.toggleItem = function (a) {
                    var b = p.getItem(a);
                    b.toggle()
                }, p.openItem = function (a) {
                    var c = p.getItem(a),
                        d = p.getOpenItems(),
                        e = p.getRootLineOfItem(c),
                        f = b.difference(d, e),
                        g = p.getCurrentBreakpointOptions();
                    c.open(), b.each(f, function (a) {
                        a.close()
                    }), g.eventHandlers && g.eventHandlers.onOpenItem && b.each(g.eventHandlers.onOpenItem, function (a) {
                        a.call(p, {
                            navItem: c,
                            menu: p
                        })
                    })
                }, p.closeItem = function (c) {
                    var d = p.getItem(c),
                        e = p.getOpenItems(),
                        f = p.getRootLineOfItem(d),
                        g = b.difference(e, f),
                        h = p.getCurrentBreakpointOptions(),
                        i = [];
                    h.eventHandlers && h.eventHandlers.beforeCloseItem && b.each(h.eventHandlers.beforeCloseItem, function (a) {
                        var b = a.call(p, {
                            navItem: d,
                            itemsToClose: g,
                            menu: p
                        });
                        b && b.then && i.push(b)
                    }), a.when.apply(a, i).done(function () {
                        d.close(), b.each(g, p.closeItem), h.eventHandlers && h.eventHandlers.onCloseItem && b.each(h.eventHandlers.onCloseItem, function (a) {
                            a.call(p, {
                                navItem: d,
                                itemsToClose: g,
                                menu: p
                            })
                        })
                    })
                }, p.closeAll = function () {
                    b.each(p.getOpenItems(), function (a) {
                        a.close()
                    })
                }, p.reset = function () {
                    p.setupCurrentBreakpoint(!0)
                }, p.setData = function (a, b) {
                    p.originalData = a, o = h(a), ("undefined" == typeof b && a != p.originalData || b) && p.reset()
                }, p.setupCurrentBreakpoint = function (b) {
                    var c = p.getCurrentBreakpointOptions(b);
                    (b || x) && (p.clear(), x = !1, c.styleClass && (t = c.styleClass, p.$navEl.addClass(c.styleClass)), n(c.templatePath).done(function () {
                        p.$navItemEls = p.$navEl.find(p.navItemSelector), p.$subTreeContainers = p.$navEl.find(q.subtreeContainer), p.$navItemEls.each(function () {
                            var b = a(this),
                                c = b.data("itemuid"),
                                d = p.getItem(c);
                            b.hasClass("b_jsonNav-backItem") ? d.$backEl = b : d.$el = b
                        }), p.$subTreeContainers.each(function () {
                            var b = a(this),
                                c = b.data("itemuid"),
                                d = p.getItem(c);
                            d && (d.$subTreeContainer = b)
                        }), k()
                    }))
                }, g(e)
            },
            f = function (b, c) {
                function d(b, c) {
                    return a.extend(e, c), e.menu = b, e
                }
                var e = this;
                return e.isOpen = function () {
                    return e.$el && e.$el.hasClass("b_jsonNav-open")
                }, e.open = function () {
                    e.$el.addClass("b_jsonNav-open"), e.$subTreeContainer && e.$subTreeContainer.addClass("b_jsonNav-open"), e._open = !0
                }, e.close = function () {
                    e.$el.removeClass("b_jsonNav-open"), e.$subTreeContainer && e.$subTreeContainer.removeClass("b_jsonNav-open"), e._open = !1
                }, e.getChildItems = function () {
                    return e.menu.getChildItems(e)
                }, e.getParentItem = function () {
                    return e.menu.getParentItem(e)
                }, e.getHierarchyLevel = function () {
                    return e.menu.getHierarchyLevel(e)
                }, e.hasChildren = function () {
                    return e.getChildItems().length > 0
                }, e.hasInRootLine = function (a) {
                    return e.menu.isInRootLineOfItem(a, e)
                }, e.toggle = function () {
                    e.isOpen ? e.close() : e.open()
                }, d(b, c)
            };
        return e
    }), ! function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define("slick-carousel", ["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
    }(function (a) {
        "use strict";
        var b = window.Slick || {};
        b = function () {
            function b(b, d) {
                var e, f, g = this;
                if (g.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: a(b),
                    appendDots: a(b),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (a, b) {
                        return '<button type="button" data-role="none">' + (b + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    onBeforeChange: null,
                    onAfterChange: null,
                    onInit: null,
                    onReInit: null,
                    onSetPosition: null,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rtl: !1,
                    slide: "div",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    waitForAnimate: !0
                }, g.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                }, a.extend(g, g.initials), g.activeBreakpoint = null, g.animType = null, g.animProp = null, g.breakpoints = [], g.breakpointSettings = [], g.cssTransitions = !1, g.paused = !1, g.positionProp = null, g.respondTo = null, g.shouldClick = !0, g.$slider = a(b), g.$slidesCache = null, g.transformType = null, g.transitionType = null, g.windowWidth = 0, g.windowTimer = null, g.options = a.extend({}, g.defaults, d), g.currentSlide = g.options.initialSlide, g.originalSettings = g.options, e = g.options.responsive || null, e && e.length > -1) {
                    g.respondTo = g.options.respondTo || "window";
                    for (f in e) e.hasOwnProperty(f) && (g.breakpoints.push(e[f].breakpoint), g.breakpointSettings[e[f].breakpoint] = e[f].settings);
                    g.breakpoints.sort(function (a, b) {
                        return b - a
                    })
                }
                g.autoPlay = a.proxy(g.autoPlay, g), g.autoPlayClear = a.proxy(g.autoPlayClear, g), g.changeSlide = a.proxy(g.changeSlide, g), g.clickHandler = a.proxy(g.clickHandler, g), g.selectHandler = a.proxy(g.selectHandler, g), g.setPosition = a.proxy(g.setPosition, g), g.swipeHandler = a.proxy(g.swipeHandler, g), g.dragHandler = a.proxy(g.dragHandler, g), g.keyHandler = a.proxy(g.keyHandler, g), g.autoPlayIterator = a.proxy(g.autoPlayIterator, g), g.instanceUid = c++ , g.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, g.init(), g.checkResponsive()
            }
            var c = 0;
            return b
        }(), b.prototype.addSlide = function (b, c, d) {
            var e = this;
            if ("boolean" == typeof c) d = c, c = null;
            else if (0 > c || c >= e.slideCount) return !1;
            e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
                a(c).attr("index", b)
            }), e.$slidesCache = e.$slides, e.reinit()
        }, b.prototype.animateSlide = function (b, c) {
            var d = {},
                e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var f = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: f
                }, e.options.speed)
            }
            e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
                left: b
            }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                top: b
            }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? a({
                animStart: e.currentLeft
            }).animate({
                animStart: b
            }, {
                    duration: e.options.speed,
                    easing: e.options.easing,
                    step: function (a) {
                        e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                    },
                    complete: function () {
                        c && c.call()
                    }
                }) : (e.applyTransition(), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
                    e.disableTransition(), c.call()
                }, e.options.speed))
        }, b.prototype.asNavFor = function (b) {
            var c = this,
                d = null != c.options.asNavFor ? a(c.options.asNavFor).getSlick() : null;
            null != d && d.slideHandler(b, !0)
        }, b.prototype.applyTransition = function (a) {
            var b = this,
                c = {};
            c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.autoPlay = function () {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
        }, b.prototype.autoPlayClear = function () {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer)
        }, b.prototype.autoPlayIterator = function () {
            var a = this;
            a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
        }, b.prototype.buildArrows = function () {
            var b = this;
            b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow = a(b.options.prevArrow), b.$nextArrow = a(b.options.nextArrow), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.appendTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled"))
        }, b.prototype.buildDots = function () {
            var b, c, d = this;
            if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
                for (c = '<ul class="' + d.options.dotsClass + '">', b = 0; b <= d.getDotCount(); b += 1) c += "<li>" + d.options.customPaging.call(this, d, b) + "</li>";
                c += "</ul>", d.$dots = a(c).appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active")
            }
        }, b.prototype.buildOut = function () {
            var b = this;
            b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
                a(c).attr("index", b)
            }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), b.options.centerMode === !0 && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.options.accessibility === !0 && b.$list.prop("tabIndex", 0), b.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
        }, b.prototype.checkResponsive = function () {
            var b, c, d, e = this,
                f = e.$slider.width(),
                g = window.innerWidth || a(window).width();
            if ("window" === e.respondTo ? d = g : "slider" === e.respondTo ? d = f : "min" === e.respondTo && (d = Math.min(g, f)), e.originalSettings.responsive && e.originalSettings.responsive.length > -1 && null !== e.originalSettings.responsive) {
                c = null;
                for (b in e.breakpoints) e.breakpoints.hasOwnProperty(b) && d < e.breakpoints[b] && (c = e.breakpoints[b]);
                null !== c ? null !== e.activeBreakpoint ? c !== e.activeBreakpoint && (e.activeBreakpoint = c, e.options = a.extend({}, e.originalSettings, e.breakpointSettings[c]), e.refresh()) : (e.activeBreakpoint = c, e.options = a.extend({}, e.originalSettings, e.breakpointSettings[c]), e.refresh()) : null !== e.activeBreakpoint && (e.activeBreakpoint = null, e.options = e.originalSettings, e.refresh())
            }
        }, b.prototype.changeSlide = function (b, c) {
            var d, e, f, g, h, i = this,
                j = a(b.target);
            switch (j.is("a") && b.preventDefault(), f = 0 !== i.slideCount % i.options.slidesToScroll, d = f ? 0 : (i.slideCount - i.currentSlide) % i.options.slidesToScroll, b.data.message) {
                case "previous":
                    e = 0 === d ? i.options.slidesToScroll : i.options.slidesToShow - d, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide - e, !1, c);
                    break;
                case "next":
                    e = 0 === d ? i.options.slidesToScroll : d, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide + e, !1, c);
                    break;
                case "index":
                    var k = 0 === b.data.index ? 0 : b.data.index || a(b.target).parent().index() * i.options.slidesToScroll;
                    if (g = i.getNavigableIndexes(), h = 0, g[k] && g[k] === k)
                        if (k > g[g.length - 1]) k = g[g.length - 1];
                        else
                            for (var l in g) {
                                if (k < g[l]) {
                                    k = h;
                                    break
                                }
                                h = g[l]
                            }
                    i.slideHandler(k, !1, c);
                default:
                    return
            }
        }, b.prototype.clickHandler = function (a) {
            var b = this;
            b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
        }, b.prototype.destroy = function () {
            var b = this;
            b.autoPlayClear(), b.touchObject = {}, a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.parent().hasClass("slick-track") && b.$slides.unwrap().unwrap(), b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({
                position: "",
                left: "",
                top: "",
                zIndex: "",
                opacity: "",
                width: ""
            }), b.$slider.removeClass("slick-slider"), b.$slider.removeClass("slick-initialized"), b.$list.off(".slick"), a(window).off(".slick-" + b.instanceUid), a(document).off(".slick-" + b.instanceUid)
        }, b.prototype.disableTransition = function (a) {
            var b = this,
                c = {};
            c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.fadeSlide = function (a, b, c) {
            var d = this;
            d.cssTransitions === !1 ? (d.$slides.eq(b).css({
                zIndex: 1e3
            }), d.$slides.eq(b).animate({
                opacity: 1
            }, d.options.speed, d.options.easing, c), d.$slides.eq(a).animate({
                opacity: 0
            }, d.options.speed, d.options.easing)) : (d.applyTransition(b), d.applyTransition(a), d.$slides.eq(b).css({
                opacity: 1,
                zIndex: 1e3
            }), d.$slides.eq(a).css({
                opacity: 0
            }), c && setTimeout(function () {
                d.disableTransition(b), d.disableTransition(a), c.call()
            }, d.options.speed))
        }, b.prototype.filterSlides = function (a) {
            var b = this;
            null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
        }, b.prototype.getCurrent = function () {
            var a = this;
            return a.currentSlide
        }, b.prototype.getDotCount = function () {
            var a = this,
                b = 0,
                c = 0,
                d = 0;
            if (a.options.infinite === !0) d = Math.ceil(a.slideCount / a.options.slidesToScroll);
            else
                for (; b < a.slideCount;)++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d - 1
        }, b.prototype.getLeft = function (a) {
            var b, c, d, e = this,
                f = 0;
            return e.slideOffset = 0, c = e.$slides.first().outerHeight(), e.options.infinite === !0 ? (e.slideCount > e.options.slidesToShow && (e.slideOffset = -1 * e.slideWidth * e.options.slidesToShow, f = -1 * c * e.options.slidesToShow), 0 !== e.slideCount % e.options.slidesToScroll && a + e.options.slidesToScroll > e.slideCount && e.slideCount > e.options.slidesToShow && (a > e.slideCount ? (e.slideOffset = -1 * (e.options.slidesToShow - (a - e.slideCount)) * e.slideWidth, f = -1 * (e.options.slidesToShow - (a - e.slideCount)) * c) : (e.slideOffset = -1 * e.slideCount % e.options.slidesToScroll * e.slideWidth, f = -1 * e.slideCount % e.options.slidesToScroll * c))) : a + e.options.slidesToShow > e.slideCount && (e.slideOffset = (a + e.options.slidesToShow - e.slideCount) * e.slideWidth, f = (a + e.options.slidesToShow - e.slideCount) * c), e.slideCount <= e.options.slidesToShow && (e.slideOffset = 0, f = 0), e.options.centerMode === !0 && e.options.infinite === !0 ? e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth : e.options.centerMode === !0 && (e.slideOffset = 0, e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2)), b = e.options.vertical === !1 ? -1 * a * e.slideWidth + e.slideOffset : -1 * a * c + f, e.options.variableWidth === !0 && (d = e.slideCount <= e.options.slidesToShow || e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow), b = d[0] ? -1 * d[0].offsetLeft : 0, e.options.centerMode === !0 && (d = e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow + 1), b = d[0] ? -1 * d[0].offsetLeft : 0, b += (e.$list.width() - d.outerWidth()) / 2)), b
        }, b.prototype.getNavigableIndexes = function () {
            for (var a = this, b = 0, c = 0, d = []; b < a.slideCount;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d
        }, b.prototype.getSlideCount = function () {
            var b, c = this;
            if (c.options.swipeToSlide === !0) {
                var d = null;
                return c.$slideTrack.find(".slick-slide").each(function (b, e) {
                    return e.offsetLeft + a(e).outerWidth() / 2 > -1 * c.swipeLeft ? (d = e, !1) : void 0
                }), b = Math.abs(a(d).attr("index") - c.currentSlide)
            }
            return c.options.slidesToScroll
        }, b.prototype.init = function () {
            var b = this;
            a(b.$slider).hasClass("slick-initialized") || (a(b.$slider).addClass("slick-initialized"), b.buildOut(), b.setProps(), b.startLoad(), b.loadSlider(), b.initializeEvents(), b.updateArrows(), b.updateDots()), null !== b.options.onInit && b.options.onInit.call(this, b)
        }, b.prototype.initArrowEvents = function () {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
                message: "previous"
            }, a.changeSlide), a.$nextArrow.on("click.slick", {
                message: "next"
            }, a.changeSlide))
        }, b.prototype.initDotEvents = function () {
            var b = this;
            b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                message: "index"
            }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", function () {
                b.paused = !0, b.autoPlayClear()
            }).on("mouseleave.slick", function () {
                b.paused = !1, b.autoPlay()
            })
        }, b.prototype.initializeEvents = function () {
            var b = this;
            b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), b.options.pauseOnHover === !0 && b.options.autoplay === !0 && (b.$list.on("mouseenter.slick", function () {
                b.paused = !0, b.autoPlayClear()
            }), b.$list.on("mouseleave.slick", function () {
                b.paused = !1, b.autoPlay()
            })), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.options.slide, b.$slideTrack).on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, function () {
                b.checkResponsive(), b.setPosition()
            }), a(window).on("resize.slick.slick-" + b.instanceUid, function () {
                a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
                    b.windowWidth = a(window).width(), b.checkResponsive(), b.setPosition()
                }, 50))
            }), a("*[draggable!=true]", b.$slideTrack).on("dragstart", function (a) {
                a.preventDefault()
            }), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.initUI = function () {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
        }, b.prototype.keyHandler = function (a) {
            var b = this;
            37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, b.prototype.lazyLoad = function () {
            function b(b) {
                a("img[data-lazy]", b).each(function () {
                    var b = a(this),
                        c = a(this).attr("data-lazy");
                    b.load(function () {
                        b.animate({
                            opacity: 1
                        }, 200)
                    }).css({
                        opacity: 0
                    }).attr("src", c).removeAttr("data-lazy").removeClass("slick-loading")
                })
            }
            var c, d, e, f, g = this;
            g.options.centerMode === !0 ? g.options.infinite === !0 ? (e = g.currentSlide + (g.options.slidesToShow / 2 + 1), f = e + g.options.slidesToShow + 2) : (e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1)), f = 2 + (g.options.slidesToShow / 2 + 1) + g.currentSlide) : (e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide, f = e + g.options.slidesToShow, g.options.fade === !0 && (e > 0 && e-- , f <= g.slideCount && f++)), c = g.$slider.find(".slick-slide").slice(e, f), b(c), g.slideCount <= g.options.slidesToShow ? (d = g.$slider.find(".slick-slide"), b(d)) : g.currentSlide >= g.slideCount - g.options.slidesToShow ? (d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow), b(d)) : 0 === g.currentSlide && (d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow), b(d))
        }, b.prototype.loadSlider = function () {
            var a = this;
            a.setPosition(), a.$slideTrack.css({
                opacity: 1
            }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
        }, b.prototype.postSlide = function (a) {
            var b = this;
            null !== b.options.onAfterChange && b.options.onAfterChange.call(this, b, a), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay()
        }, b.prototype.progressiveLazyLoad = function () {
            var b, c, d = this;
            b = a("img[data-lazy]", d.$slider).length, b > 0 && (c = a("img[data-lazy]", d.$slider).first(), c.attr("src", c.attr("data-lazy")).removeClass("slick-loading").load(function () {
                c.removeAttr("data-lazy"), d.progressiveLazyLoad()
            }).error(function () {
                c.removeAttr("data-lazy"), d.progressiveLazyLoad()
            }))
        }, b.prototype.refresh = function () {
            var b = this,
                c = b.currentSlide;
            b.destroy(), a.extend(b, b.initials), b.init(), b.changeSlide({
                data: {
                    message: "index",
                    index: c
                }
            }, !0)
        }, b.prototype.reinit = function () {
            var b = this;
            b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.options.focusOnSelect === !0 && a(b.options.slide, b.$slideTrack).on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), null !== b.options.onReInit && b.options.onReInit.call(this, b)
        }, b.prototype.removeSlide = function (a, b, c) {
            var d = this;
            return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, !(d.slideCount < 1 || 0 > a || a > d.slideCount - 1) && (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
        }, b.prototype.setCSS = function (a) {
            var b, c, d = this,
                e = {};
            d.options.rtl === !0 && (a = -a), b = "left" == d.positionProp ? a + "px" : "0px", c = "top" == d.positionProp ? a + "px" : "0px", e[d.positionProp] = a, d.transformsEnabled === !1 ? d.$slideTrack.css(e) : (e = {}, d.cssTransitions === !1 ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
        }, b.prototype.setDimensions = function () {
            var b = this;
            if (b.options.vertical === !1 ? b.options.centerMode === !0 && b.$list.css({
                padding: "0px " + b.options.centerPadding
            }) : (b.$list.height(b.$slides.first().outerHeight(!0) * b.options.slidesToShow), b.options.centerMode === !0 && b.$list.css({
                padding: b.options.centerPadding + " 0px"
            })), b.listWidth = b.$list.width(), b.listHeight = b.$list.height(), b.options.vertical === !1 && b.options.variableWidth === !1) b.slideWidth = Math.ceil(b.listWidth / b.options.slidesToShow), b.$slideTrack.width(Math.ceil(b.slideWidth * b.$slideTrack.children(".slick-slide").length));
            else if (b.options.variableWidth === !0) {
                var c = 0;
                b.slideWidth = Math.ceil(b.listWidth / b.options.slidesToShow), b.$slideTrack.children(".slick-slide").each(function () {
                    c += Math.ceil(a(this).outerWidth(!0))
                }), b.$slideTrack.width(Math.ceil(c) + 1)
            } else b.slideWidth = Math.ceil(b.listWidth), b.$slideTrack.height(Math.ceil(b.$slides.first().outerHeight(!0) * b.$slideTrack.children(".slick-slide").length));
            var d = b.$slides.first().outerWidth(!0) - b.$slides.first().width();
            b.options.variableWidth === !1 && b.$slideTrack.children(".slick-slide").width(b.slideWidth - d)
        }, b.prototype.setFade = function () {
            var b, c = this;
            c.$slides.each(function (d, e) {
                b = -1 * c.slideWidth * d, c.options.rtl === !0 ? a(e).css({
                    position: "relative",
                    right: b,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                }) : a(e).css({
                    position: "relative",
                    left: b,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                })
            }), c.$slides.eq(c.currentSlide).css({
                zIndex: 900,
                opacity: 1
            })
        }, b.prototype.setHeight = function () {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.css("height", b)
            }
        }, b.prototype.setPosition = function () {
            var a = this;
            a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), null !== a.options.onSetPosition && a.options.onSetPosition.call(this, a)
        }, b.prototype.setProps = function () {
            var a = this,
                b = document.body.style;
            a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1
        }, b.prototype.setSlideClasses = function (a) {
            var b, c, d, e, f = this;
            f.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), c = f.$slider.find(".slick-slide"), f.options.centerMode === !0 ? (b = Math.floor(f.options.slidesToShow / 2), f.options.infinite === !0 && (a >= b && a <= f.slideCount - 1 - b ? f.$slides.slice(a - b, a + b + 1).addClass("slick-active") : (d = f.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active")), 0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")), f.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(a, a + f.options.slidesToShow).addClass("slick-active") : c.length <= f.options.slidesToShow ? c.addClass("slick-active") : (e = f.slideCount % f.options.slidesToShow, d = f.options.infinite === !0 ? f.options.slidesToShow + a : a, f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow ? c.slice(d - (f.options.slidesToShow - e), d + e).addClass("slick-active") : c.slice(d, d + f.options.slidesToShow).addClass("slick-active")), "ondemand" === f.options.lazyLoad && f.lazyLoad()
        }, b.prototype.setupInfinite = function () {
            var b, c, d, e = this;
            if (e.options.fade === !0 && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (c = null, e.slideCount > e.options.slidesToShow)) {
                for (d = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone(!0).attr("id", "").attr("index", c - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
                for (b = 0; d > b; b += 1) c = b, a(e.$slides[c]).clone(!0).attr("id", "").attr("index", c + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
                e.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    a(this).attr("id", "")
                })
            }
        }, b.prototype.selectHandler = function (b) {
            var c = this,
                d = parseInt(a(b.target).parents(".slick-slide").attr("index"));
            return d || (d = 0), c.slideCount <= c.options.slidesToShow ? (c.$slider.find(".slick-slide").removeClass("slick-active"), c.$slides.eq(d).addClass("slick-active"), c.options.centerMode === !0 && (c.$slider.find(".slick-slide").removeClass("slick-center"), c.$slides.eq(d).addClass("slick-center")), void c.asNavFor(d)) : void c.slideHandler(d)
        }, b.prototype.slideHandler = function (a, b, c) {
            var d, e, f, g, h = null,
                i = this;
            return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
                i.postSlide(d)
            }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
                i.postSlide(d)
            }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d, i.animating = !0, null !== i.options.onBeforeChange && a !== i.currentSlide && i.options.onBeforeChange.call(this, i, i.currentSlide, e), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? void (c !== !0 ? i.fadeSlide(f, e, function () {
                i.postSlide(e)
            }) : i.postSlide(e)) : void (c !== !0 ? i.animateSlide(h, function () {
                i.postSlide(e)
            }) : i.postSlide(e))))
        }, b.prototype.startLoad = function () {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
        }, b.prototype.swipeDirection = function () {
            var a, b, c, d, e = this;
            return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : "vertical"
        }, b.prototype.swipeEnd = function () {
            var a = this;
            if (a.dragging = !1, a.shouldClick = !(a.touchObject.swipeLength > 10), void 0 === a.touchObject.curX) return !1;
            if (a.touchObject.swipeLength >= a.touchObject.minSwipe) switch (a.swipeDirection()) {
                case "left":
                    a.slideHandler(a.currentSlide + a.getSlideCount()), a.currentDirection = 0, a.touchObject = {};
                    break;
                case "right":
                    a.slideHandler(a.currentSlide - a.getSlideCount()), a.currentDirection = 1, a.touchObject = {}
            } else a.touchObject.startX !== a.touchObject.curX && (a.slideHandler(a.currentSlide), a.touchObject = {})
        }, b.prototype.swipeHandler = function (a) {
            var b = this;
            if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, a.data.action) {
                case "start":
                    b.swipeStart(a);
                    break;
                case "move":
                    b.swipeMove(a);
                    break;
                case "end":
                    b.swipeEnd(a)
            }
        }, b.prototype.swipeMove = function (a) {
            var b, c, d, e, f = this;
            return e = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !(!f.dragging || e && 1 !== e.length) && (b = f.getLeft(f.currentSlide), f.touchObject.curX = void 0 !== e ? e[0].pageX : a.clientX, f.touchObject.curY = void 0 !== e ? e[0].pageY : a.clientY, f.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(f.touchObject.curX - f.touchObject.startX, 2))), c = f.swipeDirection(), "vertical" !== c ? (void 0 !== a.originalEvent && f.touchObject.swipeLength > 4 && a.preventDefault(), d = (f.options.rtl === !1 ? 1 : -1) * (f.touchObject.curX > f.touchObject.startX ? 1 : -1), f.swipeLeft = f.options.vertical === !1 ? b + f.touchObject.swipeLength * d : b + f.touchObject.swipeLength * (f.$list.height() / f.listWidth) * d, f.options.fade !== !0 && f.options.touchMove !== !1 && (f.animating === !0 ? (f.swipeLeft = null, !1) : void f.setCSS(f.swipeLeft))) : void 0)
        }, b.prototype.swipeStart = function (a) {
            var b, c = this;
            return 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow ? (c.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, void (c.dragging = !0))
        }, b.prototype.unfilterSlides = function () {
            var a = this;
            null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
        }, b.prototype.unload = function () {
            var b = this;
            a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
        }, b.prototype.updateArrows = function () {
            var a, b = this;
            a = Math.floor(b.options.slidesToShow / 2), b.options.arrows === !0 && b.options.infinite !== !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow.removeClass("slick-disabled"), b.$nextArrow.removeClass("slick-disabled"), 0 === b.currentSlide ? (b.$prevArrow.addClass("slick-disabled"), b.$nextArrow.removeClass("slick-disabled")) : b.currentSlide >= b.slideCount - b.options.slidesToShow && b.options.centerMode === !1 ? (b.$nextArrow.addClass("slick-disabled"), b.$prevArrow.removeClass("slick-disabled")) : b.currentSlide > b.slideCount - b.options.slidesToShow + a && b.options.centerMode === !0 && (b.$nextArrow.addClass("slick-disabled"), b.$prevArrow.removeClass("slick-disabled")))
        }, b.prototype.updateDots = function () {
            var a = this;
            null !== a.$dots && (a.$dots.find("li").removeClass("slick-active"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active"))
        }, a.fn.slick = function (a) {
            var c = this;
            return c.each(function (c, d) {
                d.slick = new b(d, a)
            })
        }, a.fn.slickAdd = function (a, b, c) {
            var d = this;
            return d.each(function (d, e) {
                e.slick.addSlide(a, b, c)
            })
        }, a.fn.slickCurrentSlide = function () {
            var a = this;
            return a.get(0).slick.getCurrent()
        }, a.fn.slickFilter = function (a) {
            var b = this;
            return b.each(function (b, c) {
                c.slick.filterSlides(a)
            })
        }, a.fn.slickGoTo = function (a, b) {
            var c = this;
            return c.each(function (c, d) {
                d.slick.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(a)
                    }
                }, b)
            })
        }, a.fn.slickNext = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.changeSlide({
                    data: {
                        message: "next"
                    }
                })
            })
        }, a.fn.slickPause = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.autoPlayClear(), b.slick.paused = !0
            })
        }, a.fn.slickPlay = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.paused = !1, b.slick.autoPlay()
            })
        }, a.fn.slickPrev = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.changeSlide({
                    data: {
                        message: "previous"
                    }
                })
            })
        }, a.fn.slickRemove = function (a, b) {
            var c = this;
            return c.each(function (c, d) {
                d.slick.removeSlide(a, b)
            })
        }, a.fn.slickRemoveAll = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.removeSlide(null, null, !0)
            })
        }, a.fn.slickGetOption = function (a) {
            var b = this;
            return b.get(0).slick.options[a]
        }, a.fn.slickSetOption = function (a, b, c) {
            var d = this;
            return d.each(function (d, e) {
                e.slick.options[a] = b, c === !0 && (e.slick.unload(), e.slick.reinit())
            })
        }, a.fn.slickUnfilter = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick.unfilterSlides()
            })
        }, a.fn.unslick = function () {
            var a = this;
            return a.each(function (a, b) {
                b.slick && b.slick.destroy()
            })
        }, a.fn.getSlick = function () {
            var a = null,
                b = this;
            return b.each(function (b, c) {
                a = c.slick
            }), a
        }
    }),
    function (a) {
        var b, c, d, e, f, g, h, i = "Close",
            j = "BeforeClose",
            k = "AfterClose",
            l = "BeforeAppend",
            m = "MarkupParse",
            n = "Open",
            o = "Change",
            p = "mfp",
            q = "." + p,
            r = "mfp-ready",
            s = "mfp-removing",
            t = "mfp-prevent-close",
            u = function () { },
            v = !!window.jQuery,
            w = a(window),
            x = function (a, c) {
                b.ev.on(p + a + q, c)
            },
            y = function (b, c, d, e) {
                var f = document.createElement("div");
                return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
            },
            z = function (c, d) {
                b.ev.triggerHandler(p + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
            },
            A = function (c) {
                return c === h && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), h = c), b.currTemplate.closeBtn
            },
            B = function () {
                a.magnificPopup.instance || (b = new u, b.init(), a.magnificPopup.instance = b)
            },
            C = function () {
                var a = document.createElement("p").style,
                    b = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== a.transition) return !0;
                for (; b.length;)
                    if (b.pop() + "Transition" in a) return !0;
                return !1
            };
        u.prototype = {
            constructor: u,
            init: function () {
                var c = navigator.appVersion;
                b.isIE7 = c.indexOf("MSIE 7.") !== -1, b.isIE8 = c.indexOf("MSIE 8.") !== -1, b.isLowIE = b.isIE7 || b.isIE8, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = C(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document.body), e = a(document), b.popupsCache = {}
            },
            open: function (c) {
                var d;
                if (c.isObj === !1) {
                    b.items = c.items.toArray(), b.index = 0;
                    var f, h = c.items;
                    for (d = 0; d < h.length; d++)
                        if (f = h[d], f.parsed && (f = f.el[0]), f === c.el[0]) {
                            b.index = d;
                            break
                        }
                } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
                if (b.isOpen) return void b.updateItemHTML();
                b.types = [], g = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = e, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = y("bg").on("click" + q, function () {
                    b.close()
                }), b.wrap = y("wrap").attr("tabindex", -1).on("click" + q, function (a) {
                    b._checkIfClose(a.target) && b.close()
                }), b.container = y("container", b.wrap)), b.contentContainer = y("content"), b.st.preloader && (b.preloader = y("preloader", b.container, b.st.tLoading));
                var i = a.magnificPopup.modules;
                for (d = 0; d < i.length; d++) {
                    var j = i[d];
                    j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
                }
                z("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (x(m, function (a, b, c, d) {
                    c.close_replaceWith = A(d.type)
                }), g += " mfp-close-btn-in") : b.wrap.append(A())), b.st.alignTop && (g += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                    overflow: b.st.overflowY,
                    overflowX: "hidden",
                    overflowY: b.st.overflowY
                }) : b.wrap.css({
                    top: w.scrollTop(),
                    position: "absolute"
                }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                    height: e.height(),
                    position: "absolute"
                }), b.st.enableEscapeKey && e.on("keyup" + q, function (a) {
                    27 === a.keyCode && b.close()
                }), w.on("resize" + q, function () {
                    b.updateSize()
                }), b.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && b.wrap.addClass(g);
                var k = b.wH = w.height(),
                    l = {};
                if (b.fixedContentPos && b._hasScrollBar(k)) {
                    var o = b._getScrollbarSize();
                    o && (l.marginRight = o)
                }
                b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : l.overflow = "hidden");
                var p = b.st.mainClass;
                return b.isIE7 && (p += " mfp-ie7"), p && b._addClassToMFP(p), b.updateItemHTML(), z("BuildControls"), a("html").css(l), b.bgOverlay.add(b.wrap).prependTo(document.body), b._lastFocusedEl = document.activeElement, setTimeout(function () {
                    b.content ? (b._addClassToMFP(r), b._setFocus()) : b.bgOverlay.addClass(r), e.on("focusin" + q, b._onFocusIn)
                }, 16), b.isOpen = !0, b.updateSize(k), z(n), c
            },
            close: function () {
                b.isOpen && (z(j), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(s), setTimeout(function () {
                    b._close()
                }, b.st.removalDelay)) : b._close())
            },
            _close: function () {
                z(i);
                var c = s + " " + r + " ";
                if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                    var d = {
                        marginRight: ""
                    };
                    b.isIE7 ? a("body, html").css("overflow", "") : d.overflow = "", a("html").css(d)
                }
                e.off("keyup" + q + " focusin" + q), b.ev.off(q), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, z(k)
            },
            updateSize: function (a) {
                if (b.isIOS) {
                    var c = document.documentElement.clientWidth / window.innerWidth,
                        d = window.innerHeight * c;
                    b.wrap.css("height", d), b.wH = d
                } else b.wH = a || w.height();
                b.fixedContentPos || b.wrap.css("height", b.wH), z("Resize")
            },
            updateItemHTML: function () {
                var c = b.items[b.index];
                b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
                var d = c.type;
                if (z("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                    var e = !!b.st[d] && b.st[d].markup;
                    z("FirstMarkupParse", e), e ? b.currTemplate[d] = a(e) : b.currTemplate[d] = !0
                }
                f && f !== c.type && b.container.removeClass("mfp-" + f + "-holder");
                var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
                b.appendContent(g, d), c.preloaded = !0, z(o, c), f = c.type, b.container.prepend(b.contentContainer), z("AfterChange")
            },
            appendContent: function (a, c) {
                b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(A()) : b.content = a : b.content = "", z(l), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
            },
            parseEl: function (c) {
                var d = b.items[c],
                    e = d.type;
                if (d = d.tagName ? {
                    el: a(d)
                } : {
                        data: d,
                        src: d.src
                    }, d.el) {
                    for (var f = b.types, g = 0; g < f.length; g++)
                        if (d.el.hasClass("mfp-" + f[g])) {
                            e = f[g];
                            break
                        }
                    d.src = d.el.attr("data-mfp-src"), d.src || (d.src = d.el.attr("href"))
                }
                return d.type = e || b.st.type || "inline", d.index = c, d.parsed = !0, b.items[c] = d, z("ElementParse", d), b.items[c]
            },
            addGroup: function (a, c) {
                var d = function (d) {
                    d.mfpEl = this, b._openClick(d, a, c)
                };
                c || (c = {});
                var e = "click.magnificPopup";
                c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
            },
            _openClick: function (c, d, e) {
                var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
                if (f || 2 !== c.which && !c.ctrlKey && !c.metaKey) {
                    var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                    if (g)
                        if (a.isFunction(g)) {
                            if (!g.call(b)) return !0
                        } else if (w.width() < g) return !0;
                    c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
                }
            },
            updateStatus: function (a, d) {
                if (b.preloader) {
                    c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                    var e = {
                        status: a,
                        text: d
                    };
                    z("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
                        a.stopImmediatePropagation()
                    }), b.container.addClass("mfp-s-" + a), c = a
                }
            },
            _checkIfClose: function (c) {
                if (!a(c).hasClass(t)) {
                    var d = b.st.closeOnContentClick,
                        e = b.st.closeOnBgClick;
                    if (d && e) return !0;
                    if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                    if (c === b.content[0] || a.contains(b.content[0], c)) {
                        if (d) return !0
                    } else if (e && a.contains(document, c)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function (a) {
                b.bgOverlay.addClass(a), b.wrap.addClass(a)
            },
            _removeClassFromMFP: function (a) {
                this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
            },
            _hasScrollBar: function (a) {
                return (b.isIE7 ? e.height() : document.body.scrollHeight) > (a || w.height())
            },
            _setFocus: function () {
                (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
            },
            _onFocusIn: function (c) {
                if (c.target !== b.wrap[0] && !a.contains(b.wrap[0], c.target)) return b._setFocus(), !1
            },
            _parseMarkup: function (b, c, d) {
                var e;
                d.data && (c = a.extend(d.data, c)), z(m, [b, c, d]), a.each(c, function (a, c) {
                    if (void 0 === c || c === !1) return !0;
                    if (e = a.split("_"), e.length > 1) {
                        var d = b.find(q + "-" + e[0]);
                        if (d.length > 0) {
                            var f = e[1];
                            "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                        }
                    } else b.find(q + "-" + a).html(c)
                })
            },
            _getScrollbarSize: function () {
                if (void 0 === b.scrollbarSize) {
                    var a = document.createElement("div");
                    a.id = "mfp-sbm", a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
                }
                return b.scrollbarSize
            }
        }, a.magnificPopup = {
            instance: null,
            proto: u.prototype,
            modules: [],
            open: function (b, c) {
                return B(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
            },
            close: function () {
                return a.magnificPopup.instance && a.magnificPopup.instance.close()
            },
            registerModule: function (b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading..."
            }
        }, a.fn.magnificPopup = function (c) {
            B();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e, f = v ? d.data("magnificPopup") : d[0].magnificPopup,
                        g = parseInt(arguments[1], 10) || 0;
                    f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                        mfpEl: e
                    }, d, f)
                } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else c = a.extend(!0, {}, c), v ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
            return d
        };
        var D, E, F, G = "inline",
            H = function () {
                F && (E.after(F.addClass(D)).detach(), F = null)
            };
        a.magnificPopup.registerModule(G, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function () {
                    b.types.push(G), x(i + "." + G, function () {
                        H()
                    })
                },
                getInline: function (c, d) {
                    if (H(), c.src) {
                        var e = b.st.inline,
                            f = a(c.src);
                        if (f.length) {
                            var g = f[0].parentNode;
                            g && g.tagName && (E || (D = e.hiddenClass, E = y(D), D = "mfp-" + D), F = f.after(E).detach().removeClass(D)), b.updateStatus("ready")
                        } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                        return c.inlineElement = f, f
                    }
                    return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
                }
            }
        });
        var I, J = "ajax",
            K = function () {
                I && d.removeClass(I)
            },
            L = function () {
                K(), b.req && b.req.abort()
            };
        a.magnificPopup.registerModule(J, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function () {
                    b.types.push(J), I = b.st.ajax.cursor, x(i + "." + J, L), x("BeforeChange." + J, L)
                },
                getAjax: function (c) {
                    I && d.addClass(I), b.updateStatus("loading");
                    var e = a.extend({
                        url: c.src,
                        success: function (d, e, f) {
                            var g = {
                                data: d,
                                xhr: f
                            };
                            z("ParseAjax", g), b.appendContent(a(g.data), J), c.finished = !0, K(), b._setFocus(), setTimeout(function () {
                                b.wrap.addClass(r)
                            }, 16), b.updateStatus("ready"), z("AjaxContentAdded")
                        },
                        error: function () {
                            K(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                        }
                    }, b.st.ajax.settings);
                    return b.req = a.ajax(e), ""
                }
            }
        });
        var M, N = function (c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || ""
            }
            return ""
        };
        a.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function () {
                    var a = b.st.image,
                        c = ".image";
                    b.types.push("image"), x(n + c, function () {
                        "image" === b.currItem.type && a.cursor && d.addClass(a.cursor)
                    }), x(i + c, function () {
                        a.cursor && d.removeClass(a.cursor), w.off("resize" + q)
                    }), x("Resize" + c, b.resizeImage), b.isLowIE && x("AfterChange", b.resizeImage)
                },
                resizeImage: function () {
                    var a = b.currItem;
                    if (a && a.img && b.st.image.verticalFit) {
                        var c = 0;
                        b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                    }
                },
                _onImageHasSize: function (a) {
                    a.img && (a.hasSize = !0, M && clearInterval(M), a.isCheckingImgSize = !1, z("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
                },
                findImageSize: function (a) {
                    var c = 0,
                        d = a.img[0],
                        e = function (f) {
                            M && clearInterval(M), M = setInterval(function () {
                                return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(M), c++ , void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                            }, f)
                        };
                    e(1)
                },
                getImage: function (c, d) {
                    var e = 0,
                        f = function () {
                            c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, z("ImageLoadComplete")) : (e++ , e < 200 ? setTimeout(f, 100) : g()))
                        },
                        g = function () {
                            c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                        },
                        h = b.st.image,
                        i = d.find(".mfp-img");
                    if (i.length) {
                        var j = document.createElement("img");
                        j.className = "mfp-img", c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), c.img[0].naturalWidth > 0 && (c.hasSize = !0)
                    }
                    return b._parseMarkup(d, {
                        title: N(c),
                        img_replaceWith: c.img
                    }, c), b.resizeImage(), c.hasSize ? (M && clearInterval(M), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
                }
            }
        });
        var O, P = function () {
            return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O
        };
        a.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function (a) {
                    return a.is("img") ? a : a.find("img")
                }
            },
            proto: {
                initZoom: function () {
                    var a, c = b.st.zoom,
                        d = ".zoom";
                    if (c.enabled && b.supportsTransition) {
                        var e, f, g = c.duration,
                            h = function (a) {
                                var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    d = "all " + c.duration / 1e3 + "s " + c.easing,
                                    e = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    f = "transition";
                                return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                            },
                            k = function () {
                                b.content.css("visibility", "visible")
                            };
                        x("BuildControls" + d, function () {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                                f = h(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                                    f.css(b._getOffset(!0)), e = setTimeout(function () {
                                        k(), setTimeout(function () {
                                            f.remove(), a = f = null, z("ZoomAnimationEnded")
                                        }, 16)
                                    }, g)
                                }, 16)
                            }
                        }), x(j + d, function () {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                    if (a = b._getItemToZoom(), !a) return;
                                    f = h(a)
                                }
                                f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                                    f.css(b._getOffset())
                                }, 16)
                            }
                        }), x(i + d, function () {
                            b._allowZoom() && (k(), f && f.remove(), a = null)
                        })
                    }
                },
                _allowZoom: function () {
                    return "image" === b.currItem.type
                },
                _getItemToZoom: function () {
                    return !!b.currItem.hasSize && b.currItem.img
                },
                _getOffset: function (c) {
                    var d;
                    d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                    var e = d.offset(),
                        f = parseInt(d.css("padding-top"), 10),
                        g = parseInt(d.css("padding-bottom"), 10);
                    e.top -= a(window).scrollTop() - f;
                    var h = {
                        width: d.width(),
                        height: (v ? d.innerHeight() : d[0].offsetHeight) - g - f
                    };
                    return P() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
                }
            }
        });
        var Q = "iframe",
            R = "//about:blank",
            S = function (a) {
                if (b.currTemplate[Q]) {
                    var c = b.currTemplate[Q].find("iframe");
                    c.length && (a || (c[0].src = R), b.isIE8 && c.css("display", a ? "block" : "none"))
                }
            };
        a.magnificPopup.registerModule(Q, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function () {
                    b.types.push(Q), x("BeforeChange", function (a, b, c) {
                        b !== c && (b === Q ? S() : c === Q && S(!0))
                    }), x(i + "." + Q, function () {
                        S()
                    })
                },
                getIframe: function (c, d) {
                    var e = c.src,
                        f = b.st.iframe;
                    a.each(f.patterns, function () {
                        if (e.indexOf(this.index) > -1) return this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1
                    });
                    var g = {};
                    return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
                }
            }
        });
        var T = function (a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : a < 0 ? c + a : a
        },
            U = function (a, b, c) {
                return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
            };
        a.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function () {
                    var c = b.st.gallery,
                        d = ".mfp-gallery",
                        f = Boolean(a.fn.mfpFastClick);
                    return b.direction = !0, !(!c || !c.enabled) && (g += " mfp-gallery", x(n + d, function () {
                        c.navigateByImgClick && b.wrap.on("click" + d, ".mfp-img", function () {
                            if (b.items.length > 1) return b.next(), !1
                        }), e.on("keydown" + d, function (a) {
                            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                        })
                    }), x("UpdateStatus" + d, function (a, c) {
                        c.text && (c.text = U(c.text, b.currItem.index, b.items.length))
                    }), x(m + d, function (a, d, e, f) {
                        var g = b.items.length;
                        e.counter = g > 1 ? U(c.tCounter, f.index, g) : ""
                    }), x("BuildControls" + d, function () {
                        if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                            var d = c.arrowMarkup,
                                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(t),
                                g = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(t),
                                h = f ? "mfpFastClick" : "click";
                            e[h](function () {
                                b.prev()
                            }), g[h](function () {
                                b.next()
                            }), b.isIE7 && (y("b", e[0], !1, !0), y("a", e[0], !1, !0), y("b", g[0], !1, !0), y("a", g[0], !1, !0)), b.container.append(e.add(g))
                        }
                    }), x(o + d, function () {
                        b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
                            b.preloadNearbyImages(), b._preloadTimeout = null
                        }, 16)
                    }), void x(i + d, function () {
                        e.off(d), b.wrap.off("click" + d), b.arrowLeft && f && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), b.arrowRight = b.arrowLeft = null
                    }))
                },
                next: function () {
                    b.direction = !0, b.index = T(b.index + 1), b.updateItemHTML()
                },
                prev: function () {
                    b.direction = !1, b.index = T(b.index - 1), b.updateItemHTML()
                },
                goTo: function (a) {
                    b.direction = a >= b.index, b.index = a, b.updateItemHTML()
                },
                preloadNearbyImages: function () {
                    var a, c = b.st.gallery.preload,
                        d = Math.min(c[0], b.items.length),
                        e = Math.min(c[1], b.items.length);
                    for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                    for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
                },
                _preloadItem: function (c) {
                    if (c = T(c), !b.items[c].preloaded) {
                        var d = b.items[c];
                        d.parsed || (d = b.parseEl(c)), z("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
                            d.hasSize = !0
                        }).on("error.mfploader", function () {
                            d.hasSize = !0, d.loadError = !0, z("LazyLoadError", d)
                        }).attr("src", d.src)), d.preloaded = !0
                    }
                }
            }
        });
        var V = "retina";
        a.magnificPopup.registerModule(V, {
            options: {
                replaceSrc: function (a) {
                    return a.src.replace(/\.\w+$/, function (a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function () {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (x("ImageHasSize." + V, function (a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            })
                        }), x("ElementParse." + V, function (b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                    }
                }
            }
        }),
            function () {
                var b = 1e3,
                    c = "ontouchstart" in window,
                    d = function () {
                        w.off("touchmove" + f + " touchend" + f)
                    },
                    e = "mfpFastClick",
                    f = "." + e;
                a.fn.mfpFastClick = function (e) {
                    return a(this).each(function () {
                        var g, h = a(this);
                        if (c) {
                            var i, j, k, l, m, n;
                            h.on("touchstart" + f, function (a) {
                                l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, w.on("touchmove" + f, function (a) {
                                    m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d())
                                }).on("touchend" + f, function (a) {
                                    d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function () {
                                        g = !1
                                    }, b), e())
                                })
                            })
                        }
                        h.on("click" + f, function () {
                            g || e()
                        })
                    })
                }, a.fn.destroyMfpFastClick = function () {
                    a(this).off("touchstart" + f + " click" + f), c && w.off("touchmove" + f + " touchend" + f)
                }
            }(), B()
    }(window.jQuery || window.Zepto), define("magnific-popup", ["jquery"], function () { }),
    function (a) {
        function b(a, b) {
            var d = a.find(".dd-option-value[value= '" + b + "']").parents("li").prevAll().length;
            c(a, d)
        }

        function c(a, b) {
            var c = a.data("ddslick"),
                d = a.find(".dd-selected"),
                g = d.siblings(".dd-selected-value"),
                h = (a.find(".dd-options"), d.siblings(".dd-pointer"), a.find(".dd-option").eq(b)),
                i = h.closest("li"),
                j = c.settings,
                k = c.settings.data[b];
            a.find(".dd-option").removeClass("dd-option-selected"), h.addClass("dd-option-selected"), c.selectedIndex = b, c.selectedItem = i, c.selectedData = k, j.showSelectedHTML ? d.html((k.imageSrc ? '<img class="dd-selected-image' + ("right" == j.imagePosition ? " dd-image-right" : "") + '" src="' + k.imageSrc + '" />' : "") + (k.text ? '<label class="dd-selected-text">' + k.text + "</label>" : "") + (k.description ? '<small class="dd-selected-description dd-desc' + (j.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + k.description + "</small>" : "")) : d.html(k.text), g.val(k.value), c.original.val(k.value), a.data("ddslick", c), e(a), f(a), "function" == typeof j.onSelected && j.onSelected.call(this, c)
        }

        function d(b) {
            var c = b.find(".dd-select"),
                d = c.siblings(".dd-options"),
                e = c.find(".dd-pointer"),
                f = d.is(":visible");
            a(".dd-click-off-close").not(d).slideUp(50), a(".dd-pointer").removeClass("dd-pointer-up"), c.removeClass("dd-open"), f ? (d.slideUp("fast"), e.removeClass("dd-pointer-up"), c.removeClass("dd-open")) : (c.addClass("dd-open"), d.slideDown("fast"), e.addClass("dd-pointer-up")), g(b)
        }

        function e(a) {
            a.find(".dd-select").removeClass("dd-open"), a.find(".dd-options").slideUp(50), a.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")
        }

        function f(a) {
            var b = a.find(".dd-select").css("height"),
                c = a.find(".dd-selected-description"),
                d = a.find(".dd-selected-image");
            c.length <= 0 && d.length > 0 && a.find(".dd-selected-text").css("lineHeight", b)
        }

        function g(b) {
            b.find(".dd-option").each(function () {
                var c = a(this),
                    d = c.css("height"),
                    e = c.find(".dd-option-description"),
                    f = b.find(".dd-option-image");
                e.length <= 0 && f.length > 0 && c.find(".dd-option-text").css("lineHeight", d)
            })
        }
        a.fn.ddslick = function (b) {
            return h[b] ? h[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exists.") : h.init.apply(this, arguments)
        };
        var h = {},
            i = {
                data: [],
                keepJSONItemsOnTop: !1,
                width: 260,
                height: null,
                background: "#eee",
                selectText: "",
                defaultSelectedIndex: null,
                truncateDescription: !0,
                imagePosition: "left",
                showSelectedHTML: !0,
                clickOffToClose: !0,
                embedCSS: !0,
                onSelected: function () { }
            },
            j = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>',
            k = '<ul class="dd-options"></ul>',
            l = '<style id="css-ddslick" type="text/css">.dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}.dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }.dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f3f3f3; color:#000;}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#f6f6f6; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{ position:relative;}??? .dd-selected-text { font-weight:bold}???</style>';
        h.init = function (b) {
            var e = a.extend({}, i, b);
            return a("#css-ddslick").length <= 0 && e.embedCSS && a(l).appendTo("head"), this.each(function () {
                var e = a.extend({}, i, b),
                    f = a(this),
                    g = f.data("ddslick");
                if (!g) {
                    var h = [];
                    e.data;
                    f.find("option").each(function () {
                        var b = a(this),
                            c = b.data();
                        h.push({
                            text: a.trim(b.text()),
                            value: b.val(),
                            selected: b.is(":selected"),
                            description: c.description,
                            imageSrc: c.imagesrc
                        })
                    }), e.keepJSONItemsOnTop ? a.merge(e.data, h) : e.data = a.merge(h, e.data);
                    var l = f,
                        m = a("<div></div>").attr("id", f.attr("id") + "-dd-placeholder");
                    f.replaceWith(m), f = m, f.addClass("dd-container").append(j).append(k), f.find("input.dd-selected-value").attr("id", a(l).attr("id")).attr("name", a(l).attr("name"));
                    var h = f.find(".dd-select"),
                        n = f.find(".dd-options");
                    n.css({
                        width: e.width
                    }), h.css({
                        width: e.width,
                        background: e.background
                    }), f.css({
                        width: e.width
                    }), null != e.height && n.css({
                        height: e.height,
                        overflow: "auto"
                    }), a.each(e.data, function (a, b) {
                        b.selected && (e.defaultSelectedIndex = a), n.append('<li><a class="dd-option">' + (b.value ? ' <input class="dd-option-value" type="hidden" value="' + b.value + '" />' : "") + (b.imageSrc ? ' <img class="dd-option-image' + ("right" == e.imagePosition ? " dd-image-right" : "") + '" src="' + b.imageSrc + '" />' : "") + (b.text ? ' <label class="dd-option-text">' + b.text + "</label>" : "") + (b.description ? ' <small class="dd-option-description dd-desc">' + b.description + "</small>" : "") + "</a></li>")
                    });
                    var o = {
                        settings: e,
                        original: l,
                        selectedIndex: -1,
                        selectedItem: null,
                        selectedData: null
                    };
                    if (f.data("ddslick", o), e.selectText.length > 0 && null == e.defaultSelectedIndex) f.find(".dd-selected").html(e.selectText);
                    else {
                        var p = null != e.defaultSelectedIndex && e.defaultSelectedIndex >= 0 && e.defaultSelectedIndex < e.data.length ? e.defaultSelectedIndex : 0;
                        c(f, p)
                    }
                    f.find(".dd-select").on("click.ddslick", function () {
                        d(f)
                    }), f.find(".dd-option").on("click.ddslick", function () {
                        c(f, a(this).closest("li").index())
                    }), e.clickOffToClose && (n.addClass("dd-click-off-close"), f.on("click.ddslick", function (a) {
                        a.stopPropagation()
                    }), a("body").on("click", function () {
                        a(".dd-open").removeClass("dd-open"), a(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")
                    }))
                }
            })
        }, h.select = function (d) {
            return this.each(function () {
                void 0 !== d.index && c(a(this), d.index), d.id && b(a(this), d.id)
            })
        }, h.open = function () {
            return this.each(function () {
                var b = a(this),
                    c = b.data("ddslick");
                c && d(b)
            })
        }, h.close = function () {
            return this.each(function () {
                var b = a(this),
                    c = b.data("ddslick");
                c && e(b)
            })
        }, h.destroy = function () {
            return this.each(function () {
                var b = a(this),
                    c = b.data("ddslick");
                if (c) {
                    var d = c.original;
                    b.removeData("ddslick").unbind(".ddslick").replaceWith(d)
                }
            })
        }
    }(jQuery), define("ddslick", ["jquery"], function () { }), ! function () {
        "use strict";

        function a(a) {
            return a.split("").reverse().join("")
        }

        function b(a, b) {
            return a.substring(0, b.length) === b
        }

        function c(a, b) {
            return a.slice(-1 * b.length) === b
        }

        function d(a, b, c) {
            if ((a[b] || a[c]) && a[b] === a[c]) throw new Error(b)
        }

        function e(a) {
            return "number" == typeof a && isFinite(a)
        }

        function f(a, b) {
            var c = Math.pow(10, b);
            return (Math.round(a * c) / c).toFixed(b)
        }

        function g(b, c, d, g, h, i, j, k, l, m, n, o) {
            var p, q, r, s = o,
                t = "",
                u = "";
            return i && (o = i(o)), !!e(o) && (b !== !1 && 0 === parseFloat(o.toFixed(b)) && (o = 0), 0 > o && (p = !0, o = Math.abs(o)), b !== !1 && (o = f(o, b)), o = o.toString(), -1 !== o.indexOf(".") ? (q = o.split("."), r = q[0], d && (t = d + q[1])) : r = o, c && (r = a(r).match(/.{1,3}/g), r = a(r.join(a(c)))), p && k && (u += k), g && (u += g), p && l && (u += l), u += r, u += t, h && (u += h), m && (u = m(u, s)), u)
        }

        function h(a, d, f, g, h, i, j, k, l, m, n, o) {
            var p, q = "";
            return n && (o = n(o)), !(!o || "string" != typeof o) && (k && b(o, k) && (o = o.replace(k, ""), p = !0), g && b(o, g) && (o = o.replace(g, "")), l && b(o, l) && (o = o.replace(l, ""), p = !0), h && c(o, h) && (o = o.slice(0, -1 * h.length)), d && (o = o.split(d).join("")), f && (o = o.replace(f, ".")), p && (q += "-"), q += o, q = q.replace(/[^0-9\.\-.]/g, ""), "" !== q && (q = Number(q), j && (q = j(q)), !!e(q) && q))
        }

        function i(a) {
            var b, c, e, f = {};
            for (b = 0; b < l.length; b += 1)
                if (c = l[b], e = a[c], void 0 === e) f[c] = "negative" !== c || f.negativeBefore ? "mark" === c && "." !== f.thousand && "." : "-";
                else if ("decimals" === c) {
                    if (!(e >= 0 && 8 > e)) throw new Error(c);
                    f[c] = e
                } else if ("encoder" === c || "decoder" === c || "edit" === c || "undo" === c) {
                    if ("function" != typeof e) throw new Error(c);
                    f[c] = e
                } else {
                    if ("string" != typeof e) throw new Error(c);
                    f[c] = e
                }
            return d(f, "mark", "thousand"), d(f, "prefix", "negative"), d(f, "prefix", "negativeBefore"), f
        }

        function j(a, b, c) {
            var d, e = [];
            for (d = 0; d < l.length; d += 1) e.push(a[l[d]]);
            return e.push(c), b.apply("", e)
        }

        function k(a) {
            return this instanceof k ? void ("object" == typeof a && (a = i(a), this.to = function (b) {
                return j(a, g, b)
            }, this.from = function (b) {
                return j(a, h, b)
            })) : new k(a)
        }
        var l = ["decimals", "thousand", "mark", "prefix", "postfix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];
        window.wNumb = k
    }(),
    function (a) {
        "use strict";

        function b(b) {
            return b instanceof a || a.zepto && a.zepto.isZ(b)
        }

        function c(b, c) {
            return "string" == typeof b && 0 === b.indexOf("-inline-") ? (this.method = c || "html", this.target = this.el = a(b.replace("-inline-", "") || "<div/>"), !0) : void 0
        }

        function d(b) {
            if ("string" == typeof b && 0 !== b.indexOf("-")) {
                this.method = "val";
                var c = document.createElement("input");
                return c.name = b, c.type = "hidden", this.target = this.el = a(c), !0
            }
        }

        function e(a) {
            return "function" == typeof a ? (this.target = !1, this.method = a, !0) : void 0
        }

        function f(a, c) {
            return b(a) && !c ? (a.is("input, select, textarea") ? (this.method = "val", this.target = a.on("change.liblink", this.changeHandler)) : (this.target = a, this.method = "html"), !0) : void 0
        }

        function g(a, c) {
            return b(a) && ("function" == typeof c || "string" == typeof c && a[c]) ? (this.method = c, this.target = a, !0) : void 0
        }

        function h(b, c, d) {
            var e = this,
                f = !1;
            if (this.changeHandler = function (b) {
                var c = e.formatInstance.from(a(this).val());
                return c === !1 || isNaN(c) ? (a(this).val(e.lastSetValue), !1) : void e.changeHandlerMethod.call("", b, c)
            }, this.el = !1, this.formatInstance = d, a.each(k, function (a, d) {
                return f = d.call(e, b, c), !f
            }), !f) throw new RangeError("(Link) Invalid Link.")
        }

        function i(a) {
            this.items = [], this.elements = [], this.origin = a
        }

        function j(b, c, d, e) {
            0 === b && (b = this.LinkDefaultFlag), this.linkAPI || (this.linkAPI = {}), this.linkAPI[b] || (this.linkAPI[b] = new i(this));
            var f = new h(c, d, e || this.LinkDefaultFormatter);
            f.target || (f.target = a(this)), f.changeHandlerMethod = this.LinkConfirm(b, f.el), this.linkAPI[b].push(f, f.el), this.LinkUpdate(b)
        }
        var k = [c, d, e, f, g];
        h.prototype.set = function (a) {
            var b = Array.prototype.slice.call(arguments),
                c = b.slice(1);
            this.lastSetValue = this.formatInstance.to(a), c.unshift(this.lastSetValue), ("function" == typeof this.method ? this.method : this.target[this.method]).apply(this.target, c)
        }, i.prototype.push = function (a, b) {
            this.items.push(a), b && this.elements.push(b)
        }, i.prototype.reconfirm = function (a) {
            var b;
            for (b = 0; b < this.elements.length; b += 1) this.origin.LinkConfirm(a, this.elements[b])
        }, i.prototype.remove = function () {
            var a;
            for (a = 0; a < this.items.length; a += 1) this.items[a].target.off(".liblink");
            for (a = 0; a < this.elements.length; a += 1) this.elements[a].remove()
        }, i.prototype.change = function (a) {
            if (this.origin.LinkIsEmitting) return !1;
            this.origin.LinkIsEmitting = !0;
            var b, c = Array.prototype.slice.call(arguments, 1);
            for (c.unshift(a), b = 0; b < this.items.length; b += 1) this.items[b].set.apply(this.items[b], c);
            this.origin.LinkIsEmitting = !1
        }, a.fn.Link = function (b) {
            var c = this;
            if (b === !1) return c.each(function () {
                this.linkAPI && (a.map(this.linkAPI, function (a) {
                    a.remove()
                }), delete this.linkAPI)
            });
            if (void 0 === b) b = 0;
            else if ("string" != typeof b) throw new Error("Flag must be string.");
            return {
                to: function (a, d, e) {
                    return c.each(function () {
                        j.call(this, b, a, d, e)
                    })
                }
            }
        }
    }(window.jQuery || window.Zepto),
    function (a) {
        "use strict";

        function b(b) {
            return a.grep(b, function (c, d) {
                return d === a.inArray(c, b)
            })
        }

        function c(a, b) {
            return Math.round(a / b) * b
        }

        function d(a) {
            return "number" == typeof a && !isNaN(a) && isFinite(a)
        }

        function e(a) {
            var b = Math.pow(10, 7);
            return Number((Math.round(a * b) / b).toFixed(7))
        }

        function f(a, b, c) {
            a.addClass(b), setTimeout(function () {
                a.removeClass(b)
            }, c)
        }

        function g(a) {
            return Math.max(Math.min(a, 100), 0)
        }

        function h(b) {
            return a.isArray(b) ? b : [b]
        }

        function i(a) {
            var b = a.split(".");
            return b.length > 1 ? b[1].length : 0
        }

        function j(a, b) {
            return 100 / (b - a)
        }

        function k(a, b) {
            return 100 * b / (a[1] - a[0])
        }

        function l(a, b) {
            return k(a, a[0] < 0 ? b + Math.abs(a[0]) : b - a[0])
        }

        function m(a, b) {
            return b * (a[1] - a[0]) / 100 + a[0]
        }

        function n(a, b) {
            for (var c = 1; a >= b[c];) c += 1;
            return c
        }

        function o(a, b, c) {
            if (c >= a.slice(-1)[0]) return 100;
            var d, e, f, g, h = n(c, a);
            return d = a[h - 1], e = a[h], f = b[h - 1], g = b[h], f + l([d, e], c) / j(f, g)
        }

        function p(a, b, c) {
            if (c >= 100) return a.slice(-1)[0];
            var d, e, f, g, h = n(c, b);
            return d = a[h - 1], e = a[h], f = b[h - 1], g = b[h], m([d, e], (c - f) * j(f, g))
        }

        function q(a, b, d, e) {
            if (100 === e) return e;
            var f, g, h = n(e, a);
            return d ? (f = a[h - 1], g = a[h], e - f > (g - f) / 2 ? g : f) : b[h - 1] ? a[h - 1] + c(e - a[h - 1], b[h - 1]) : e
        }

        function r(a, b, c) {
            var e;
            if ("number" == typeof b && (b = [b]), "[object Array]" !== Object.prototype.toString.call(b)) throw new Error("noUiSlider: 'range' contains invalid value.");
            if (e = "min" === a ? 0 : "max" === a ? 100 : parseFloat(a), !d(e) || !d(b[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            c.xPct.push(e), c.xVal.push(b[0]), e ? c.xSteps.push(!isNaN(b[1]) && b[1]) : isNaN(b[1]) || (c.xSteps[0] = b[1])
        }

        function s(a, b, c) {
            return !b || void (c.xSteps[a] = k([c.xVal[a], c.xVal[a + 1]], b) / j(c.xPct[a], c.xPct[a + 1]))
        }

        function t(a, b, c, d) {
            this.xPct = [], this.xVal = [], this.xSteps = [d || !1], this.xNumSteps = [!1], this.snap = b, this.direction = c;
            var e, f = [];
            for (e in a) a.hasOwnProperty(e) && f.push([a[e], e]);
            for (f.sort(function (a, b) {
                return a[0] - b[0]
            }), e = 0; e < f.length; e++) r(f[e][1], f[e][0], this);
            for (this.xNumSteps = this.xSteps.slice(0), e = 0; e < this.xNumSteps.length; e++) s(e, this.xNumSteps[e], this)
        }

        function u(a, b) {
            if (!d(b)) throw new Error("noUiSlider: 'step' is not numeric.");
            a.singleStep = b
        }

        function v(b, c) {
            if ("object" != typeof c || a.isArray(c)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === c.min || void 0 === c.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            b.spectrum = new t(c, b.snap, b.dir, b.singleStep)
        }

        function w(b, c) {
            if (c = h(c), !a.isArray(c) || !c.length || c.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
            b.handles = c.length, b.start = c
        }

        function x(a, b) {
            if (a.snap = b, "boolean" != typeof b) throw new Error("noUiSlider: 'snap' option must be a boolean.")
        }

        function y(a, b) {
            if (a.animate = b, "boolean" != typeof b) throw new Error("noUiSlider: 'animate' option must be a boolean.")
        }

        function z(a, b) {
            if ("lower" === b && 1 === a.handles) a.connect = 1;
            else if ("upper" === b && 1 === a.handles) a.connect = 2;
            else if (b === !0 && 2 === a.handles) a.connect = 3;
            else {
                if (b !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                a.connect = 0
            }
        }

        function A(a, b) {
            switch (b) {
                case "horizontal":
                    a.ort = 0;
                    break;
                case "vertical":
                    a.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.")
            }
        }

        function B(a, b) {
            if (!d(b)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            if (a.margin = a.spectrum.getMargin(b), !a.margin) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
        }

        function C(a, b) {
            if (!d(b)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (a.limit = a.spectrum.getMargin(b), !a.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")
        }

        function D(a, b) {
            switch (b) {
                case "ltr":
                    a.dir = 0;
                    break;
                case "rtl":
                    a.dir = 1, a.connect = [0, 2, 1, 3][a.connect];
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.")
            }
        }

        function E(a, b) {
            if ("string" != typeof b) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var c = b.indexOf("tap") >= 0,
                d = b.indexOf("drag") >= 0,
                e = b.indexOf("fixed") >= 0,
                f = b.indexOf("snap") >= 0;
            a.events = {
                tap: c || f,
                drag: d,
                fixed: e,
                snap: f
            }
        }

        function F(a, b) {
            if (a.format = b, "function" == typeof b.to && "function" == typeof b.from) return !0;
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
        }

        function G(b) {
            var c, d = {
                margin: 0,
                limit: 0,
                animate: !0,
                format: Z
            };
            return c = {
                step: {
                    r: !1,
                    t: u
                },
                start: {
                    r: !0,
                    t: w
                },
                connect: {
                    r: !0,
                    t: z
                },
                direction: {
                    r: !0,
                    t: D
                },
                snap: {
                    r: !1,
                    t: x
                },
                animate: {
                    r: !1,
                    t: y
                },
                range: {
                    r: !0,
                    t: v
                },
                orientation: {
                    r: !1,
                    t: A
                },
                margin: {
                    r: !1,
                    t: B
                },
                limit: {
                    r: !1,
                    t: C
                },
                behaviour: {
                    r: !0,
                    t: E
                },
                format: {
                    r: !1,
                    t: F
                }
            }, b = a.extend({
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal"
            }, b), a.each(c, function (a, c) {
                if (void 0 === b[a]) {
                    if (c.r) throw new Error("noUiSlider: '" + a + "' is required.");
                    return !0
                }
                c.t(d, b[a])
            }), d.style = d.ort ? "top" : "left", d
        }

        function H(a, b, c) {
            var d = a + b[0],
                e = a + b[1];
            return c ? (0 > d && (e += Math.abs(d)), e > 100 && (d -= e - 100), [g(d), g(e)]) : [d, e]
        }

        function I(a) {
            a.preventDefault();
            var b, c, d = 0 === a.type.indexOf("touch"),
                e = 0 === a.type.indexOf("mouse"),
                f = 0 === a.type.indexOf("pointer"),
                g = a;
            return 0 === a.type.indexOf("MSPointer") && (f = !0), a.originalEvent && (a = a.originalEvent), d && (b = a.changedTouches[0].pageX, c = a.changedTouches[0].pageY), (e || f) && (f || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), b = a.clientX + window.pageXOffset, c = a.clientY + window.pageYOffset), g.points = [b, c], g.cursor = e, g
        }

        function J(b, c) {
            var d = a("<div><div/></div>").addClass(Y[2]),
                e = ["-lower", "-upper"];
            return b && e.reverse(), d.children().addClass(Y[3] + " " + Y[3] + e[c]), d
        }

        function K(a, b, c) {
            switch (a) {
                case 1:
                    b.addClass(Y[7]), c[0].addClass(Y[6]);
                    break;
                case 3:
                    c[1].addClass(Y[6]);
                case 2:
                    c[0].addClass(Y[7]);
                case 0:
                    b.addClass(Y[6])
            }
        }

        function L(a, b, c) {
            var d, e = [];
            for (d = 0; a > d; d += 1) e.push(J(b, d).appendTo(c));
            return e
        }

        function M(b, c, d) {
            return d.addClass([Y[0], Y[8 + b], Y[4 + c]].join(" ")), a("<div/>").appendTo(d).addClass(Y[1])
        }

        function N(b, c, d) {
            function e() {
                return C[["width", "height"][c.ort]]()
            }

            function j(a) {
                var b, c = [E.val()];
                for (b = 0; b < a.length; b += 1) E.trigger(a[b], c)
            }

            function k(a) {
                return 1 === a.length ? a[0] : c.dir ? a.reverse() : a
            }

            function l(a) {
                return function (b, c) {
                    E.val([a ? null : c, a ? c : null], !0)
                }
            }

            function m(b) {
                var c = a.inArray(b, N);
                E[0].linkAPI && E[0].linkAPI[b] && E[0].linkAPI[b].change(J[c], D[c].children(), E)
            }

            function n(b, d) {
                var e = a.inArray(b, N);
                return d && d.appendTo(D[e].children()), c.dir && c.handles > 1 && (e = 1 === e ? 0 : 1), l(e)
            }

            function o() {
                var a, b;
                for (a = 0; a < N.length; a += 1) this.linkAPI && this.linkAPI[b = N[a]] && this.linkAPI[b].reconfirm(b)
            }

            function p(a, b, d, e) {
                return a = a.replace(/\s/g, W + " ") + W, b.on(a, function (a) {
                    return !E.attr("disabled") && (!E.hasClass(Y[14]) && (a = I(a), a.calcPoint = a.points[c.ort], void d(a, e)))
                })
            }

            function q(a, b) {
                var c, d = b.handles || D,
                    f = !1,
                    g = 100 * (a.calcPoint - b.start) / e(),
                    h = d[0][0] !== D[0][0] ? 1 : 0;
                c = H(g, b.positions, d.length > 1), f = v(d[0], c[h], 1 === d.length), d.length > 1 && (f = v(d[1], c[h ? 0 : 1], !1) || f), f && j(["slide"])
            }

            function r(b) {
                a("." + Y[15]).removeClass(Y[15]), b.cursor && a("body").css("cursor", "").off(W), U.off(W), E.removeClass(Y[12]), j(["set", "change"])
            }

            function s(b, c) {
                1 === c.handles.length && c.handles[0].children().addClass(Y[15]), b.stopPropagation(), p(X.move, U, q, {
                    start: b.calcPoint,
                    handles: c.handles,
                    positions: [F[0], F[D.length - 1]]
                }), p(X.end, U, r, null), b.cursor && (a("body").css("cursor", a(b.target).css("cursor")), D.length > 1 && E.addClass(Y[12]), a("body").on("selectstart" + W, !1))
            }

            function t(b) {
                var d, g = b.calcPoint,
                    h = 0;
                b.stopPropagation(), a.each(D, function () {
                    h += this.offset()[c.style]
                }), h = h / 2 > g || 1 === D.length ? 0 : 1, g -= C.offset()[c.style], d = 100 * g / e(), c.events.snap || f(E, Y[14], 300), v(D[h], d), j(["slide", "set", "change"]), c.events.snap && s(b, {
                    handles: [D[h]]
                })
            }

            function u(a) {
                var b, c;
                if (!a.fixed)
                    for (b = 0; b < D.length; b += 1) p(X.start, D[b].children(), s, {
                        handles: [D[b]]
                    });
                a.tap && p(X.start, C, t, {
                    handles: D
                }), a.drag && (c = C.find("." + Y[7]).addClass(Y[10]), a.fixed && (c = c.add(C.children().not(c).children())), p(X.start, c, s, {
                    handles: D
                }))
            }

            function v(a, b, d) {
                var e = a[0] !== D[0][0] ? 1 : 0,
                    f = F[0] + c.margin,
                    h = F[1] - c.margin,
                    i = F[0] + c.limit,
                    j = F[1] - c.limit;
                return D.length > 1 && (b = e ? Math.max(b, f) : Math.min(b, h)), d !== !1 && c.limit && D.length > 1 && (b = e ? Math.min(b, i) : Math.max(b, j)), b = G.getStep(b), b = g(parseFloat(b.toFixed(7))), b !== F[e] && (a.css(c.style, b + "%"), a.is(":first-child") && a.toggleClass(Y[17], b > 50), F[e] = b, J[e] = G.fromStepping(b), m(N[e]), !0)
            }

            function w(a, b) {
                var d, e, f;
                for (c.limit && (a += 1), d = 0; a > d; d += 1) e = d % 2, f = b[e], null !== f && f !== !1 && ("number" == typeof f && (f = String(f)), f = c.format.from(f), (f === !1 || isNaN(f) || v(D[e], G.toStepping(f), d === 3 - c.dir) === !1) && m(N[e]))
            }

            function x(a) {
                if (E[0].LinkIsEmitting) return this;
                var b, d = h(a);
                return c.dir && c.handles > 1 && d.reverse(), c.animate && -1 !== F[0] && f(E, Y[14], 300), b = D.length > 1 ? 3 : 1, 1 === d.length && (b = 1), w(b, d), j(["set"]), this
            }

            function y() {
                var a, b = [];
                for (a = 0; a < c.handles; a += 1) b[a] = c.format.to(J[a]);
                return k(b)
            }

            function z() {
                return a(this).off(W).removeClass(Y.join(" ")).empty(), delete this.LinkUpdate, delete this.LinkConfirm, delete this.LinkDefaultFormatter, delete this.LinkDefaultFlag, delete this.reappend, delete this.vGet, delete this.vSet, delete this.getCurrentStep, delete this.getInfo, delete this.destroy, d
            }

            function A() {
                var b = a.map(F, function (a, b) {
                    var c = G.getApplicableStep(a),
                        d = i(String(c[2])),
                        e = J[b],
                        f = 100 === a ? null : c[2],
                        g = Number((e - c[2]).toFixed(d)),
                        h = 0 === a ? null : g >= c[1] ? c[2] : c[0] || !1;
                    return [
                        [h, f]
                    ]
                });
                return k(b)
            }

            function B() {
                return d
            }
            var C, D, E = a(b),
                F = [-1, -1],
                G = c.spectrum,
                J = [],
                N = ["lower", "upper"].slice(0, c.handles);
            if (c.dir && N.reverse(), b.LinkUpdate = m, b.LinkConfirm = n, b.LinkDefaultFormatter = c.format, b.LinkDefaultFlag = "lower", b.reappend = o, E.hasClass(Y[0])) throw new Error("Slider was already initialized.");
            C = M(c.dir, c.ort, E), D = L(c.handles, c.dir, C), K(c.connect, E, D), u(c.events), b.vSet = x, b.vGet = y, b.destroy = z, b.getCurrentStep = A, b.getOriginalOptions = B, b.getInfo = function () {
                return [G, c.style, c.ort]
            }, E.val(c.start)
        }

        function O(a) {
            var b = G(a, this);
            return this.each(function () {
                N(this, b, a)
            })
        }

        function P(b) {
            return this.each(function () {
                if (!this.destroy) return void a(this).noUiSlider(b);
                var c = a(this).val(),
                    d = this.destroy(),
                    e = a.extend({}, d, b);
                a(this).noUiSlider(e), this.reappend(), d.start === e.start && a(this).val(c)
            })
        }

        function Q() {
            return this[0][arguments.length ? "vSet" : "vGet"].apply(this[0], arguments)
        }

        function R(b, c, d, e) {
            if ("range" === c || "steps" === c) return b.xVal;
            if ("count" === c) {
                var f, g = 100 / (d - 1),
                    h = 0;
                for (d = [];
                    (f = h++ * g) <= 100;) d.push(f);
                c = "positions"
            }
            return "positions" === c ? a.map(d, function (a) {
                return b.fromStepping(e ? b.getStep(a) : a)
            }) : "values" === c ? e ? a.map(d, function (a) {
                return b.fromStepping(b.getStep(b.toStepping(a)))
            }) : d : void 0
        }

        function S(c, d, e, f) {
            var g = c.direction,
                h = {},
                i = c.xVal[0],
                j = c.xVal[c.xVal.length - 1],
                k = !1,
                l = !1,
                m = 0;
            return c.direction = 0, f = b(f.slice().sort(function (a, b) {
                return a - b
            })), f[0] !== i && (f.unshift(i), k = !0), f[f.length - 1] !== j && (f.push(j), l = !0), a.each(f, function (b) {
                var g, i, j, n, o, p, q, r, s, t, u = f[b],
                    v = f[b + 1];
                if ("steps" === e && (g = c.xNumSteps[b]), g || (g = v - u), u !== !1 && void 0 !== v)
                    for (i = u; v >= i; i += g) {
                        for (n = c.toStepping(i), o = n - m, r = o / d, s = Math.round(r), t = o / s, j = 1; s >= j; j += 1) p = m + j * t, h[p.toFixed(5)] = ["x", 0];
                        q = a.inArray(i, f) > -1 ? 1 : "steps" === e ? 2 : 0, !b && k && (q = 0), i === v && l || (h[n.toFixed(5)] = [i, q]), m = n
                    }
            }), c.direction = g, h
        }

        function T(b, c, d, e, f, g) {
            function h(a) {
                return ["-normal", "-large", "-sub"][a]
            }

            function i(a, c, d) {
                return 'class="' + c + " " + c + "-" + k + " " + c + h(d[1], d[0]) + '" style="' + b + ": " + a + '%"'
            }

            function j(a, b) {
                d && (a = 100 - a), b[1] = b[1] && f ? f(b[0], b[1]) : b[1], l.append("<div " + i(a, "noUi-marker", b) + "></div>"), b[1] && l.append("<div " + i(a, "noUi-value", b) + ">" + g.to(b[0]) + "</div>")
            }
            var k = ["horizontal", "vertical"][c],
                l = a("<div/>");
            return l.addClass("noUi-pips noUi-pips-" + k), a.each(e, j), l
        }
        var U = a(document),
            V = a.fn.val,
            W = ".nui",
            X = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                        start: "mousedown touchstart",
                        move: "mousemove touchmove",
                        end: "mouseup touchend"
                    },
            Y = ["noUi-target", "noUi-base", "noUi-origin", "noUi-handle", "noUi-horizontal", "noUi-vertical", "noUi-background", "noUi-connect", "noUi-ltr", "noUi-rtl", "noUi-dragable", "", "noUi-state-drag", "", "noUi-state-tap", "noUi-active", "", "noUi-stacking"];
        t.prototype.getMargin = function (a) {
            return 2 === this.xPct.length && k(this.xVal, a)
        }, t.prototype.toStepping = function (a) {
            return a = o(this.xVal, this.xPct, a), this.direction && (a = 100 - a), a
        }, t.prototype.fromStepping = function (a) {
            return this.direction && (a = 100 - a), e(p(this.xVal, this.xPct, a))
        }, t.prototype.getStep = function (a) {
            return this.direction && (a = 100 - a), a = q(this.xPct, this.xSteps, this.snap, a), this.direction && (a = 100 - a), a
        }, t.prototype.getApplicableStep = function (a) {
            var b = n(a, this.xPct),
                c = 100 === a ? 2 : 1;
            return [this.xNumSteps[b - 2], this.xVal[b - c], this.xNumSteps[b - c]]
        }, t.prototype.convert = function (a) {
            return this.getStep(this.toStepping(a))
        };
        var Z = {
            to: function (a) {
                return a.toFixed(2)
            },
            from: Number
        };
        a.fn.val = function (b) {
            function c(a) {
                return a.hasClass(Y[0]) ? Q : V
            }
            if (!arguments.length) {
                var d = a(this[0]);
                return c(d).call(d)
            }
            var e = a.isFunction(b);
            return this.each(function (d) {
                var f = b,
                    g = a(this);
                e && (f = b.call(this, d, g.val())), c(g).call(g, f)
            })
        }, a.fn.noUiSlider = function (a, b) {
            switch (a) {
                case "step":
                    return this[0].getCurrentStep();
                case "options":
                    return this[0].getOriginalOptions()
            }
            return (b ? P : O).call(this, a)
        }, a.fn.noUiSlider_pips = function (b) {
            var c = b.mode,
                d = b.density || 1,
                e = b.filter || !1,
                f = b.values || !1,
                g = b.format || {
                    to: Math.round
                },
                h = b.stepped || !1;
            return this.each(function () {
                var b = this.getInfo(),
                    i = R(b[0], c, f, h),
                    j = S(b[0], d, c, i);
                return a(this).append(T(b[1], b[2], b[0].direction, j, e, g))
            })
        }
    }(window.jQuery || window.Zepto), define("nouislider", function () { }), define("text", ["module"], function (a) {
        "use strict";

        function b(a, b) {
            return void 0 === a || "" === a ? b : a
        }

        function c(a, c, d, e) {
            if (c === e) return !0;
            if (a === d) {
                if ("http" === a) return b(c, "80") === b(e, "80");
                if ("https" === a) return b(c, "443") === b(e, "443")
            }
            return !1
        }
        var d, e, f, g, h, i = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            j = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            k = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            l = "undefined" != typeof location && location.href,
            m = l && location.protocol && location.protocol.replace(/\:/, ""),
            n = l && location.hostname,
            o = l && (location.port || void 0),
            p = {},
            q = a.config && a.config() || {};
        return d = {
            version: "2.0.15",
            strip: function (a) {
                if (a) {
                    a = a.replace(j, "");
                    var b = a.match(k);
                    b && (a = b[1])
                } else a = "";
                return a
            },
            jsEscape: function (a) {
                return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            },
            createXhr: q.createXhr || function () {
                var a, b, c;
                if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)
                    for (b = 0; b < 3; b += 1) {
                        c = i[b];
                        try {
                            a = new ActiveXObject(c)
                        } catch (a) { }
                        if (a) {
                            i = [c];
                            break
                        }
                    }
                return a
            },
            parseName: function (a) {
                var b, c, d, e = !1,
                    f = a.lastIndexOf("."),
                    g = 0 === a.indexOf("./") || 0 === a.indexOf("../");
                return f !== -1 && (!g || f > 1) ? (b = a.substring(0, f), c = a.substring(f + 1)) : b = a, d = c || b, f = d.indexOf("!"), f !== -1 && (e = "strip" === d.substring(f + 1), d = d.substring(0, f), c ? c = d : b = d), {
                    moduleName: b,
                    ext: c,
                    strip: e
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function (a, b, e, f) {
                var g, h, i, j = d.xdRegExp.exec(a);
                return !j || (g = j[2], h = j[3], h = h.split(":"), i = h[1], h = h[0], (!g || g === b) && (!h || h.toLowerCase() === e.toLowerCase()) && (!i && !h || c(g, i, b, f)))
            },
            finishLoad: function (a, b, c, e) {
                c = b ? d.strip(c) : c, q.isBuild && (p[a] = c), e(c)
            },
            load: function (a, b, c, e) {
                if (e && e.isBuild && !e.inlineText) return void c();
                q.isBuild = e && e.isBuild;
                var f = d.parseName(a),
                    g = f.moduleName + (f.ext ? "." + f.ext : ""),
                    h = b.toUrl(g),
                    i = q.useXhr || d.useXhr;
                return 0 === h.indexOf("empty:") ? void c() : void (!l || i(h, m, n, o) ? d.get(h, function (b) {
                    d.finishLoad(a, f.strip, b, c)
                }, function (a) {
                    c.error && c.error(a)
                }) : b([g], function (a) {
                    d.finishLoad(f.moduleName + "." + f.ext, f.strip, a, c)
                }))
            },
            write: function (a, b, c, e) {
                if (p.hasOwnProperty(b)) {
                    var f = d.jsEscape(p[b]);
                    c.asModule(a + "!" + b, "define(function () { return '" + f + "';});\n")
                }
            },
            writeFile: function (a, b, c, e, f) {
                var g = d.parseName(b),
                    h = g.ext ? "." + g.ext : "",
                    i = g.moduleName + h,
                    j = c.toUrl(g.moduleName + h) + ".js";
                d.load(i, c, function (b) {
                    var c = function (a) {
                        return e(j, a)
                    };
                    c.asModule = function (a, b) {
                        return e.asModule(a, j, b)
                    }, d.write(a, i, c, f)
                }, f)
            }
        }, "node" === q.env || !q.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (e = require.nodeRequire("fs"), d.get = function (a, b, c) {
            try {
                var d = e.readFileSync(a, "utf8");
                "\ufeff" === d[0] && (d = d.substring(1)), b(d)
            } catch (a) {
                c && c(a)
            }
        }) : "xhr" === q.env || !q.env && d.createXhr() ? d.get = function (a, b, c, e) {
            var f, g = d.createXhr();
            if (g.open("GET", a, !0), e)
                for (f in e) e.hasOwnProperty(f) && g.setRequestHeader(f.toLowerCase(), e[f]);
            q.onXhr && q.onXhr(g, a), g.onreadystatechange = function (d) {
                var e, f;
                4 === g.readyState && (e = g.status || 0, e > 399 && e < 600 ? (f = new Error(a + " HTTP status: " + e), f.xhr = g, c && c(f)) : b(g.responseText), q.onXhrComplete && q.onXhrComplete(g, a))
            }, g.send(null)
        } : "rhino" === q.env || !q.env && "undefined" != typeof Packages && "undefined" != typeof java ? d.get = function (a, b) {
            var c, d, e = "utf-8",
                f = new java.io.File(a),
                g = java.lang.System.getProperty("line.separator"),
                h = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), e)),
                i = "";
            try {
                for (c = new java.lang.StringBuffer, d = h.readLine(), d && d.length() && 65279 === d.charAt(0) && (d = d.substring(1)), null !== d && c.append(d); null !== (d = h.readLine());) c.append(g), c.append(d);
                i = String(c.toString())
            } finally {
                h.close()
            }
            b(i)
        } : ("xpconnect" === q.env || !q.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (f = Components.classes, g = Components.interfaces, Components.utils.import("resource://gre/modules/FileUtils.jsm"), h = "@mozilla.org/windows-registry-key;1" in f, d.get = function (a, b) {
            var c, d, e, i = {};
            h && (a = a.replace(/\//g, "\\")), e = new FileUtils.File(a);
            try {
                c = f["@mozilla.org/network/file-input-stream;1"].createInstance(g.nsIFileInputStream), c.init(e, 1, 0, !1), d = f["@mozilla.org/intl/converter-input-stream;1"].createInstance(g.nsIConverterInputStream), d.init(c, "utf-8", c.available(), g.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), d.readString(c.available(), i), d.close(), c.close(), b(i.value)
            } catch (a) {
                throw new Error((e && e.path || "") + ": " + a)
            }
        }), d
    }),
    function () {
        var a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            b = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            d = [],
            e = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g
            },
            f = function (a, b) {
                var c = e,
                    d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.interpolate, function (a, b) {
                        return "'," + b.replace(/\\'/g, "'") + ",'"
                    }).replace(c.evaluate || null, function (a, b) {
                        return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "; __p.push('"
                    }).replace(/\r/g, "").replace(/\n/g, "").replace(/\t/g, "") + "');}return __p.join('');";
                return d
            };
        define("tpl", [], function () {
            var e, g, h;
            return "undefined" != typeof window && window.navigator && window.document ? g = function (a, b) {
                var c = e.createXhr();
                c.open("GET", a, !0), c.onreadystatechange = function (a) {
                    4 === c.readyState && b(c.responseText)
                }, c.send(null)
            } : "undefined" != typeof process && process.versions && process.versions.node && (h = require.nodeRequire("fs"), g = function (a, b) {
                b(h.readFileSync(a, "utf8"))
            }), e = {
                version: "0.24.0",
                strip: function (a) {
                    if (a) {
                        a = a.replace(b, "");
                        var d = a.match(c);
                        d && (a = d[1])
                    } else a = "";
                    return a
                },
                jsEscape: function (a) {
                    return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "").replace(/[\t]/g, "").replace(/[\r]/g, "")
                },
                createXhr: function () {
                    var b, c, d;
                    if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                    for (c = 0; c < 3; c++) {
                        d = a[c];
                        try {
                            b = new ActiveXObject(d)
                        } catch (a) { }
                        if (b) {
                            a = [d];
                            break
                        }
                    }
                    if (!b) throw new Error("require.getXhr(): XMLHttpRequest not available");
                    return b
                },
                get: g,
                load: function (a, b, c, g) {
                    var h, i = !1,
                        j = a.indexOf("."),
                        k = a.substring(0, j),
                        l = a.substring(j + 1, a.length);
                    j = l.indexOf("!"), j !== -1 && (i = l.substring(j + 1, l.length), i = "strip" === i, l = l.substring(0, j)), h = "nameToUrl" in b ? b.nameToUrl(k, "." + l) : b.toUrl(k + "." + l), e.get(h, function (b) {
                        b = f(b), g.isBuild || (b = new Function("obj", b)), b = i ? e.strip(b) : b, g.isBuild && g.inlineText && (d[a] = b), c(b)
                    })
                },
                write: function (a, b, c) {
                    if (b in d) {
                        var f = e.jsEscape(d[b]);
                        c("define('" + a + "!" + b + "', function() {return function(obj) { " + f.replace(/(\\')/g, "'").replace(/(\\\\)/g, "\\") + "}});\n")
                    }
                }
            }
        })
    }(), define("tpl!templates/compareProducts.tpl", function () {
        return function (obj) {
            var __p = [],
                print = function () {
                    __p.push.apply(__p, arguments)
                };
            with (obj || {}) __p.push('<div class="b_compareLayer"><table class="table table-striped">'), _.each(infosToShow, function (a, b) {
                __p.push("<tr><td>", a, "</td>"), _.each(products, function (a) {
                    switch (__p.push("<td>"), b) {
                        case "image":
                            __p.push('<img src="', a[b], '" height="156" width="165" />');
                            break;
                        case "type":
                            break;
                        default:
                            if (_.isBoolean(a[b]) && a[b]) __p.push('<div class="b_ct_iconStack"><i class="b_icon-slideActive"></i><i class="b_icon-slideInactive"></i></div>');
                            else if (_.isBoolean(a[b]) && !a[b]) __p.push('<i class="b_icon-slideActive"></i>');
                            else {
                                var c = a[b];
                                if (allLabels[compareTemplate] && allLabels[compareTemplate][b]) {
                                    var d = allLabels[compareTemplate][b];
                                    if (_.isArray(c) && c.length > 0) {
                                        for (var e = d[c[0]], f = 1; f < c.length; f++) e += ", " + d[c[f]];
                                        c = e
                                    } else c = d[c] || c
                                }
                                print(c)
                            }
                            __p.push("")
                    }
                    __p.push("</td>")
                }), __p.push("</tr>")
            }), __p.push("</table></div>");
            return __p.join("")
        }
    }),
    function (a) {
        "function" == typeof define && define.amd ? define("jquery-ui", ["jquery"], a) : a(jQuery)
    }(function (a) {
        function b(b, d) {
            var e, f, g, h = b.nodeName.toLowerCase();
            return "area" === h ? (e = b.parentNode, f = e.name, !(!b.href || !f || "map" !== e.nodeName.toLowerCase()) && (g = a("img[usemap='#" + f + "']")[0], !!g && c(g))) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
        }

        function c(b) {
            return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
                return "hidden" === a.css(this, "visibility")
            }).length
        }

        function d(a) {
            for (var b, c; a.length && a[0] !== document;) {
                if (b = a.css("position"), ("absolute" === b || "relative" === b || "fixed" === b) && (c = parseInt(a.css("zIndex"), 10), !isNaN(c) && 0 !== c)) return c;
                a = a.parent()
            }
            return 0
        }

        function e() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, a.extend(this._defaults, this.regional[""]), this.regional.en = a.extend(!0, {}, this.regional[""]), this.regional["en-US"] = a.extend(!0, {}, this.regional.en), this.dpDiv = f(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function f(b) {
            var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return b.delegate(c, "mouseout", function () {
                a(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover")
            }).delegate(c, "mouseover", g)
        }

        function g() {
            a.datepicker._isDisabledDatepicker(r.inline ? r.dpDiv.parent()[0] : r.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover"))
        }

        function h(b, c) {
            a.extend(b, c);
            for (var d in c) null == c[d] && (b[d] = c[d]);
            return b
        }

        function i(a) {
            return function () {
                var b = this.element.val();
                a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
            }
        }
        a.ui = a.ui || {}, a.extend(a.ui, {
            version: "1.11.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), a.fn.extend({
            scrollParent: function (b) {
                var c = this.css("position"),
                    d = "absolute" === c,
                    e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    f = this.parents().filter(function () {
                        var b = a(this);
                        return (!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
            },
            uniqueId: function () {
                var a = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++a)
                    })
                }
            }(),
            removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
                })
            }
        }), a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
                return function (c) {
                    return !!a.data(c, b)
                }
            }) : function (b, c, d) {
                return !!a.data(b, d[3])
            },
            focusable: function (c) {
                return b(c, !isNaN(a.attr(c, "tabindex")))
            },
            tabbable: function (c) {
                var d = a.attr(c, "tabindex"),
                    e = isNaN(d);
                return (e || d >= 0) && b(c, !e)
            }
        }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (b, c) {
            function d(b, c, d, f) {
                return a.each(e, function () {
                    c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                }), c
            }
            var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
                f = c.toLowerCase(),
                g = {
                    innerWidth: a.fn.innerWidth,
                    innerHeight: a.fn.innerHeight,
                    outerWidth: a.fn.outerWidth,
                    outerHeight: a.fn.outerHeight
                };
            a.fn["inner" + c] = function (b) {
                return void 0 === b ? g["inner" + c].call(this) : this.each(function () {
                    a(this).css(f, d(this, b) + "px")
                })
            }, a.fn["outer" + c] = function (b, e) {
                return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function () {
                    a(this).css(f, d(this, b, !0, e) + "px")
                })
            }
        }), a.fn.addBack || (a.fn.addBack = function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
            return function (c) {
                return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
            }
        }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
            focus: function (b) {
                return function (c, d) {
                    return "number" == typeof c ? this.each(function () {
                        var b = this;
                        setTimeout(function () {
                            a(b).focus(), d && d.call(b)
                        }, c)
                    }) : b.apply(this, arguments)
                }
            }(a.fn.focus),
            disableSelection: function () {
                var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function () {
                    return this.bind(a + ".ui-disableSelection", function (a) {
                        a.preventDefault()
                    })
                }
            }(),
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function (b) {
                if (void 0 !== b) return this.css("zIndex", b);
                if (this.length)
                    for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
                        if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
                        e = e.parent()
                    }
                return 0
            }
        }), a.ui.plugin = {
            add: function (b, c, d) {
                var e, f = a.ui[b].prototype;
                for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
            },
            call: function (a, b, c, d) {
                var e, f = a.plugins[b];
                if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                    for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
            }
        };
        var j = 0,
            k = Array.prototype.slice;
        a.cleanData = function (b) {
            return function (c) {
                var d, e, f;
                for (f = 0; null != (e = c[f]); f++) try {
                    d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
                } catch (a) { }
                b(c)
            }
        }(a.cleanData), a.widget = function (b, c, d) {
            var e, f, g, h, i = {},
                j = b.split(".")[0];
            return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
                return !!a.data(b, e)
            }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
                return this._createWidget ? void (arguments.length && this._createWidget(a, b)) : new g(a, b)
            }, a.extend(g, f, {
                version: d.version,
                _proto: a.extend({}, d),
                _childConstructors: []
            }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
                return a.isFunction(d) ? void (i[b] = function () {
                    var a = function () {
                        return c.prototype[b].apply(this, arguments)
                    },
                        e = function (a) {
                            return c.prototype[b].apply(this, a)
                        };
                    return function () {
                        var b, c = this._super,
                            f = this._superApply;
                        return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
                    }
                }()) : void (i[b] = d)
            }), g.prototype = a.widget.extend(h, {
                widgetEventPrefix: f ? h.widgetEventPrefix || b : b
            }, i, {
                    constructor: g,
                    namespace: j,
                    widgetName: b,
                    widgetFullName: e
                }), f ? (a.each(f._childConstructors, function (b, c) {
                    var d = c.prototype;
                    a.widget(d.namespace + "." + d.widgetName, g, c._proto)
                }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
        }, a.widget.extend = function (b) {
            for (var c, d, e = k.call(arguments, 1), f = 0, g = e.length; f < g; f++)
                for (c in e[f]) d = e[f][c], e[f].hasOwnProperty(c) && void 0 !== d && (a.isPlainObject(d) ? b[c] = a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : b[c] = d);
            return b
        }, a.widget.bridge = function (b, c) {
            var d = c.prototype.widgetFullName || b;
            a.fn[b] = function (e) {
                var f = "string" == typeof e,
                    g = k.call(arguments, 1),
                    h = this;
                return e = !f && g.length ? a.widget.extend.apply(null, [e].concat(g)) : e, f ? this.each(function () {
                    var c, f = a.data(this, d);
                    return "instance" === e ? (h = f, !1) : f ? a.isFunction(f[e]) && "_" !== e.charAt(0) ? (c = f[e].apply(f, g), c !== f && void 0 !== c ? (h = c && c.jquery ? h.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + e + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + e + "'")
                }) : this.each(function () {
                    var b = a.data(this, d);
                    b ? (b.option(e || {}), b._init && b._init()) : a.data(this, d, new c(e, this))
                }), h
            }
        }, a.Widget = function () { }, a.Widget._childConstructors = [], a.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function (b, c) {
                c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = j++ , this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function (a) {
                        a.target === c && this.destroy()
                    }
                }), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: a.noop,
            _getCreateEventData: a.noop,
            _create: a.noop,
            _init: a.noop,
            destroy: function () {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: a.noop,
            widget: function () {
                return this.element
            },
            option: function (b, c) {
                var d, e, f, g = b;
                if (0 === arguments.length) return a.widget.extend({}, this.options);
                if ("string" == typeof b)
                    if (g = {}, d = b.split("."), b = d.shift(), d.length) {
                        for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
                        if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
                        e[b] = c
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                        g[b] = c
                    }
                return this._setOptions(g), this
            },
            _setOptions: function (a) {
                var b;
                for (b in a) this._setOption(b, a[b]);
                return this
            },
            _setOption: function (a, b) {
                return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function () {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function () {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function (b, c, d) {
                var e, f = this;
                "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
                    function h() {
                        if (b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled")) return ("string" == typeof g ? f[g] : g).apply(f, arguments)
                    }
                    "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                    var i = d.match(/^([\w:-]*)\s*(.*)$/),
                        j = i[1] + f.eventNamespace,
                        k = i[2];
                    k ? e.delegate(k, j, h) : c.bind(j, h)
                })
            },
            _off: function (b, c) {
                c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
            },
            _delay: function (a, b) {
                function c() {
                    return ("string" == typeof a ? d[a] : a).apply(d, arguments)
                }
                var d = this;
                return setTimeout(c, b || 0)
            },
            _hoverable: function (b) {
                this.hoverable = this.hoverable.add(b), this._on(b, {
                    mouseenter: function (b) {
                        a(b.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function (b) {
                        a(b.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (b) {
                this.focusable = this.focusable.add(b), this._on(b, {
                    focusin: function (b) {
                        a(b.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function (b) {
                        a(b.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (b, c, d) {
                var e, f, g = this.options[b];
                if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                    for (e in f) e in c || (c[e] = f[e]);
                return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
            }
        }, a.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function (b, c) {
            a.Widget.prototype["_" + b] = function (d, e, f) {
                "string" == typeof e && (e = {
                    effect: e
                });
                var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
                e = e || {}, "number" == typeof e && (e = {
                    duration: e
                }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                    a(this)[b](), f && f.call(d[0]), c()
                })
            }
        });
        var l = (a.widget, !1);
        a(document).mouseup(function () {
            l = !1
        });
        a.widget("ui.mouse", {
            version: "1.11.2",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function () {
                var b = this;
                this.element.bind("mousedown." + this.widgetName, function (a) {
                    return b._mouseDown(a)
                }).bind("click." + this.widgetName, function (c) {
                    if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
                }), this.started = !1
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function (b) {
                if (!l) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
                    var c = this,
                        d = 1 === b.which,
                        e = !("string" != typeof this.options.cancel || !b.target.nodeName) && a(b.target).closest(this.options.cancel).length;
                    return !(d && !e && this._mouseCapture(b)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                        c.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                        return c._mouseMove(a)
                    }, this._mouseUpDelegate = function (a) {
                        return c._mouseUp(a)
                    }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), l = !0, !0))
                }
            },
            _mouseMove: function (b) {
                if (this._mouseMoved) {
                    if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b);
                    if (!b.which) return this._mouseUp(b)
                }
                return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
            },
            _mouseUp: function (b) {
                return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), l = !1, !1
            },
            _mouseDistanceMet: function (a) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet
            },
            _mouseStart: function () { },
            _mouseDrag: function () { },
            _mouseStop: function () { },
            _mouseCapture: function () {
                return !0
            }
        });
        ! function () {
            function b(a, b, c) {
                return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
            }

            function c(b, c) {
                return parseInt(a.css(b, c), 10) || 0
            }

            function d(b) {
                var c = b[0];
                return 9 === c.nodeType ? {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : a.isWindow(c) ? {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: b.scrollTop(),
                        left: b.scrollLeft()
                    }
                } : c.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: c.pageY,
                        left: c.pageX
                    }
                } : {
                                width: b.outerWidth(),
                                height: b.outerHeight(),
                                offset: b.offset()
                            }
            }
            a.ui = a.ui || {};
            var e, f, g = Math.max,
                h = Math.abs,
                i = Math.round,
                j = /left|center|right/,
                k = /top|center|bottom/,
                l = /[\+\-]\d+(\.[\d]+)?%?/,
                m = /^\w+/,
                n = /%$/,
                o = a.fn.position;
            a.position = {
                scrollbarWidth: function () {
                    if (void 0 !== e) return e;
                    var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        f = d.children()[0];
                    return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c
                },
                getScrollInfo: function (b) {
                    var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                        d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                        e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                        f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
                    return {
                        width: f ? a.position.scrollbarWidth() : 0,
                        height: e ? a.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function (b) {
                    var c = a(b || window),
                        d = a.isWindow(c[0]),
                        e = !!c[0] && 9 === c[0].nodeType;
                    return {
                        element: c,
                        isWindow: d,
                        isDocument: e,
                        offset: c.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: c.scrollLeft(),
                        scrollTop: c.scrollTop(),
                        width: d || e ? c.width() : c.outerWidth(),
                        height: d || e ? c.height() : c.outerHeight()
                    }
                }
            }, a.fn.position = function (e) {
                if (!e || !e.of) return o.apply(this, arguments);
                e = a.extend({}, e);
                var n, p, q, r, s, t, u = a(e.of),
                    v = a.position.getWithinInfo(e.within),
                    w = a.position.getScrollInfo(v),
                    x = (e.collision || "flip").split(" "),
                    y = {};
                return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function () {
                    var a, b, c = (e[this] || "").split(" ");
                    1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]]
                }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function () {
                    var d, j, k = a(this),
                        l = k.outerWidth(),
                        m = k.outerHeight(),
                        o = c(this, "marginLeft"),
                        t = c(this, "marginTop"),
                        z = l + o + c(this, "marginRight") + w.width,
                        A = m + t + c(this, "marginBottom") + w.height,
                        B = a.extend({}, s),
                        C = b(y.my, k.outerWidth(), k.outerHeight());
                    "right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f || (B.left = i(B.left), B.top = i(B.top)), d = {
                        marginLeft: o,
                        marginTop: t
                    }, a.each(["left", "top"], function (b, c) {
                        a.ui.position[x[b]] && a.ui.position[x[b]][c](B, {
                            targetWidth: p,
                            targetHeight: q,
                            elemWidth: l,
                            elemHeight: m,
                            collisionPosition: d,
                            collisionWidth: z,
                            collisionHeight: A,
                            offset: [n[0] + C[0], n[1] + C[1]],
                            my: e.my,
                            at: e.at,
                            within: v,
                            elem: k
                        })
                    }), e.using && (j = function (a) {
                        var b = r.left - B.left,
                            c = b + p - l,
                            d = r.top - B.top,
                            f = d + q - m,
                            i = {
                                target: {
                                    element: u,
                                    left: r.left,
                                    top: r.top,
                                    width: p,
                                    height: q
                                },
                                element: {
                                    element: k,
                                    left: B.left,
                                    top: B.top,
                                    width: l,
                                    height: m
                                },
                                horizontal: c < 0 ? "left" : b > 0 ? "right" : "center",
                                vertical: f < 0 ? "top" : d > 0 ? "bottom" : "middle"
                            };
                        p < l && h(b + c) < p && (i.horizontal = "center"), q < m && h(d + f) < q && (i.vertical = "middle"), g(h(b), h(c)) > g(h(d), h(f)) ? i.important = "horizontal" : i.important = "vertical", e.using.call(this, a, i)
                    }), k.offset(a.extend(B, {
                        using: j
                    }))
                })
            }, a.ui.position = {
                fit: {
                    left: function (a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollLeft : d.offset.left,
                            f = d.width,
                            h = a.left - b.collisionPosition.marginLeft,
                            i = e - h,
                            j = h + b.collisionWidth - f - e;
                        b.collisionWidth > f ? i > 0 && j <= 0 ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : j > 0 && i <= 0 ? a.left = e : i > j ? a.left = e + f - b.collisionWidth : a.left = e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
                    },
                    top: function (a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollTop : d.offset.top,
                            f = b.within.height,
                            h = a.top - b.collisionPosition.marginTop,
                            i = e - h,
                            j = h + b.collisionHeight - f - e;
                        b.collisionHeight > f ? i > 0 && j <= 0 ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : j > 0 && i <= 0 ? a.top = e : i > j ? a.top = e + f - b.collisionHeight : a.top = e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
                    }
                },
                flip: {
                    left: function (a, b) {
                        var c, d, e = b.within,
                            f = e.offset.left + e.scrollLeft,
                            g = e.width,
                            i = e.isWindow ? e.scrollLeft : e.offset.left,
                            j = a.left - b.collisionPosition.marginLeft,
                            k = j - i,
                            l = j + b.collisionWidth - g - i,
                            m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                            n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                            o = -2 * b.offset[0];
                        k < 0 ? (c = a.left + m + n + o + b.collisionWidth - g - f, (c < 0 || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
                    },
                    top: function (a, b) {
                        var c, d, e = b.within,
                            f = e.offset.top + e.scrollTop,
                            g = e.height,
                            i = e.isWindow ? e.scrollTop : e.offset.top,
                            j = a.top - b.collisionPosition.marginTop,
                            k = j - i,
                            l = j + b.collisionHeight - g - i,
                            m = "top" === b.my[1],
                            n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                            o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                            p = -2 * b.offset[1];
                        k < 0 ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (d < 0 || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p))
                    }
                },
                flipfit: {
                    left: function () {
                        a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function () {
                        a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
                function () {
                    var b, c, d, e, g, h = document.getElementsByTagName("body")[0],
                        i = document.createElement("div");
                    b = document.createElement(h ? "div" : "body"), d = {
                        visibility: "hidden",
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: "none"
                    }, h && a.extend(d, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    });
                    for (g in d) b.style[g] = d[g];
                    b.appendChild(i), c = h || document.documentElement, c.insertBefore(b, c.firstChild), i.style.cssText = "position: absolute; left: 10.7432222px;", e = a(i).offset().left, f = e > 10 && e < 11, b.innerHTML = "", c.removeChild(b)
                }()
        }();
        a.ui.position, a.widget("ui.accordion", {
            version: "1.11.2",
            options: {
                active: 0,
                animate: {},
                collapsible: !1,
                event: "click",
                header: "> li > :first-child,> :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function () {
                var b = this.options;
                this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function () {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : a()
                }
            },
            _createIcons: function () {
                var b = this.options.icons;
                b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function () {
                this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
            },
            _destroy: function () {
                var a;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "")
            },
            _setOption: function (a, b) {
                return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), void ("disabled" === a && (this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b))))
            },
            _keydown: function (b) {
                if (!b.altKey && !b.ctrlKey) {
                    var c = a.ui.keyCode,
                        d = this.headers.length,
                        e = this.headers.index(b.target),
                        f = !1;
                    switch (b.keyCode) {
                        case c.RIGHT:
                        case c.DOWN:
                            f = this.headers[(e + 1) % d];
                            break;
                        case c.LEFT:
                        case c.UP:
                            f = this.headers[(e - 1 + d) % d];
                            break;
                        case c.SPACE:
                        case c.ENTER:
                            this._eventHandler(b);
                            break;
                        case c.HOME:
                            f = this.headers[0];
                            break;
                        case c.END:
                            f = this.headers[d - 1]
                    }
                    f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
                }
            },
            _panelKeyDown: function (b) {
                b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
            },
            refresh: function () {
                var b = this.options;
                this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function () {
                var a = this.headers,
                    b = this.panels;
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels)))
            },
            _refresh: function () {
                var b, c = this.options,
                    d = c.heightStyle,
                    e = this.element.parent();
                this.active = this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function () {
                    var b = a(this),
                        c = b.uniqueId().attr("id"),
                        d = b.next(),
                        e = d.uniqueId().attr("id");
                    b.attr("aria-controls", e), d.attr("aria-labelledby", c)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function () {
                    var c = a(this),
                        d = c.css("position");
                    "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
                }), this.headers.each(function () {
                    b -= a(this).outerHeight(!0)
                }), this.headers.next().each(function () {
                    a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function () {
                    b = Math.max(b, a(this).css("height", "").height())
                }).height(b))
            },
            _activate: function (b) {
                var c = this._findActive(b)[0];
                c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
                    target: c,
                    currentTarget: c,
                    preventDefault: a.noop
                }))
            },
            _findActive: function (b) {
                return "number" == typeof b ? this.headers.eq(b) : a()
            },
            _setupEvents: function (b) {
                var c = {
                    keydown: "_keydown"
                };
                b && a.each(b.split(" "), function (a, b) {
                    c[b] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function (b) {
                var c = this.options,
                    d = this.active,
                    e = a(b.currentTarget),
                    f = e[0] === d[0],
                    g = f && c.collapsible,
                    h = g ? a() : e.next(),
                    i = d.next(),
                    j = {
                        oldHeader: d,
                        oldPanel: i,
                        newHeader: g ? a() : e,
                        newPanel: h
                    };
                b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = !g && this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function (b) {
                var c = b.newPanel,
                    d = this.prevShow.length ? this.prevShow : b.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
                    "aria-hidden": "true"
                }), d.prev().attr("aria-selected", "false"), c.length && d.length ? d.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : c.length && this.headers.filter(function () {
                    return 0 === a(this).attr("tabIndex")
                }).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    tabIndex: 0,
                    "aria-expanded": "true"
                })
            },
            _animate: function (a, b, c) {
                var d, e, f, g = this,
                    h = 0,
                    i = a.length && (!b.length || a.index() < b.index()),
                    j = this.options.animate || {},
                    k = i && j.down || j,
                    l = function () {
                        g._toggleComplete(c)
                    };
                return "number" == typeof k && (f = k), "string" == typeof k && (e = k), e = e || k.easing || j.easing, f = f || k.duration || j.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, {
                    duration: f,
                    easing: e,
                    step: function (a, b) {
                        b.now = Math.round(a)
                    }
                }), void a.hide().animate(this.showProps, {
                    duration: f,
                    easing: e,
                    complete: l,
                    step: function (a, c) {
                        c.now = Math.round(a), "height" !== c.prop ? h += c.now : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0)
                    }
                })) : b.animate(this.hideProps, f, e, l) : a.animate(this.showProps, f, e, l)
            },
            _toggleComplete: function (a) {
                var b = a.oldPanel;
                b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
            }
        }), a.widget("ui.menu", {
            version: "1.11.2",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left-1 top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function () {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item": function (a) {
                        a.preventDefault()
                    },
                    "click .ui-menu-item": function (b) {
                        var c = a(b.target);
                        !this.mouseHandled && c.not(".ui-state-disabled").length && (this.select(b), b.isPropagationStopped() || (this.mouseHandled = !0), c.has(".ui-menu").length ? this.expand(b) : !this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function (b) {
                        if (!this.previousFilter) {
                            var c = a(b.currentTarget);
                            c.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c)
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function (a, b) {
                        var c = this.active || this.element.find(this.options.items).eq(0);
                        b || this.focus(a, c)
                    },
                    blur: function (b) {
                        this._delay(function () {
                            a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function (a) {
                        this._closeOnDocumentClick(a) && this.collapseAll(a), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function () {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                    var b = a(this);
                    b.data("ui-menu-submenu-carat") && b.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function (b) {
                var c, d, e, f, g = !0;
                switch (b.keyCode) {
                    case a.ui.keyCode.PAGE_UP:
                        this.previousPage(b);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        this.nextPage(b);
                        break;
                    case a.ui.keyCode.HOME:
                        this._move("first", "first", b);
                        break;
                    case a.ui.keyCode.END:
                        this._move("last", "last", b);
                        break;
                    case a.ui.keyCode.UP:
                        this.previous(b);
                        break;
                    case a.ui.keyCode.DOWN:
                        this.next(b);
                        break;
                    case a.ui.keyCode.LEFT:
                        this.collapse(b);
                        break;
                    case a.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                        break;
                    case a.ui.keyCode.ENTER:
                    case a.ui.keyCode.SPACE:
                        this._activate(b);
                        break;
                    case a.ui.keyCode.ESCAPE:
                        this.collapse(b);
                        break;
                    default:
                        g = !1, d = this.previousFilter || "", e = String.fromCharCode(b.keyCode), f = !1, clearTimeout(this.filterTimer), e === d ? f = !0 : e = d + e, c = this._filterMenuItems(e), c = f && c.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), c = this._filterMenuItems(e)), c.length ? (this.focus(b, c), this.previousFilter = e, this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                }
                g && b.preventDefault()
            },
            _activate: function (a) {
                this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(a) : this.select(a))
            },
            refresh: function () {
                var b, c, d = this,
                    e = this.options.icons.submenu,
                    f = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), f.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function () {
                    var b = a(this),
                        c = b.parent(),
                        d = a("<span>").addClass("ui-menu-icon ui-icon " + e).data("ui-menu-submenu-carat", !0);
                    c.attr("aria-haspopup", "true").prepend(d), b.attr("aria-labelledby", c.attr("id"))
                }), b = f.add(this.element), c = b.find(this.options.items), c.not(".ui-menu-item").each(function () {
                    var b = a(this);
                    d._isDivider(b) && b.addClass("ui-widget-content ui-menu-divider")
                }), c.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), c.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function () {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function (a, b) {
                "icons" === a && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this._super(a, b)
            },
            focus: function (a, b) {
                var c, d;
                this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), a && "keydown" === a.type ? this._close() : this.timer = this._delay(function () {
                    this._close()
                }, this.delay), c = b.children(".ui-menu"), c.length && a && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
                    item: b
                })
            },
            _scrollIntoView: function (b) {
                var c, d, e, f, g, h;
                this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.outerHeight(), e < 0 ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h))
            },
            blur: function (a, b) {
                b || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
                    item: this.active
                }))
            },
            _startOpening: function (a) {
                clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function () {
                    this._close(), this._open(a)
                }, this.delay))
            },
            _open: function (b) {
                var c = a.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
            },
            collapseAll: function (b, c) {
                clearTimeout(this.timer), this.timer = this._delay(function () {
                    var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                    d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d
                }, this.delay)
            },
            _close: function (a) {
                a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
            },
            _closeOnDocumentClick: function (b) {
                return !a(b.target).closest(".ui-menu").length
            },
            _isDivider: function (a) {
                return !/[^\-\u2014\u2013\s]/.test(a.text())
            },
            collapse: function (a) {
                var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                b && b.length && (this._close(), this.focus(a, b))
            },
            expand: function (a) {
                var b = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                b && b.length && (this._open(b.parent()), this._delay(function () {
                    this.focus(a, b)
                }))
            },
            next: function (a) {
                this._move("next", "first", a)
            },
            previous: function (a) {
                this._move("prev", "last", a)
            },
            isFirstItem: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function (a, b, c) {
                var d;
                this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.find(this.options.items)[b]()), this.focus(c, d)
            },
            nextPage: function (b) {
                var c, d, e;
                return this.active ? void (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                    return c = a(this), c.offset().top - d - e < 0
                }), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(b)
            },
            previousPage: function (b) {
                var c, d, e;
                return this.active ? void (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                    return c = a(this), c.offset().top - d + e > 0
                }), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items).first()))) : void this.next(b)
            },
            _hasScroll: function () {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function (b) {
                this.active = this.active || a(b.target).closest(".ui-menu-item");
                var c = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c)
            },
            _filterMenuItems: function (b) {
                var c = b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    d = new RegExp("^" + c, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                    return d.test(a.trim(a(this).text()))
                })
            }
        });
        a.widget("ui.autocomplete", {
            version: "1.11.2",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function () {
                var b, c, d, e = this.element[0].nodeName.toLowerCase(),
                    f = "textarea" === e,
                    g = "input" === e;
                this.isMultiLine = !!f || !g && this.element.prop("isContentEditable"), this.valueMethod = this.element[f || g ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function (e) {
                        if (this.element.prop("readOnly")) return b = !0, d = !0, void (c = !0);
                        b = !1, d = !1, c = !1;
                        var f = a.ui.keyCode;
                        switch (e.keyCode) {
                            case f.PAGE_UP:
                                b = !0, this._move("previousPage", e);
                                break;
                            case f.PAGE_DOWN:
                                b = !0, this._move("nextPage", e);
                                break;
                            case f.UP:
                                b = !0, this._keyEvent("previous", e);
                                break;
                            case f.DOWN:
                                b = !0, this._keyEvent("next", e);
                                break;
                            case f.ENTER:
                                this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e));
                                break;
                            case f.TAB:
                                this.menu.active && this.menu.select(e);
                                break;
                            case f.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(e), e.preventDefault());
                                break;
                            default:
                                c = !0, this._searchTimeout(e)
                        }
                    },
                    keypress: function (d) {
                        if (b) return b = !1, void (this.isMultiLine && !this.menu.element.is(":visible") || d.preventDefault());
                        if (!c) {
                            var e = a.ui.keyCode;
                            switch (d.keyCode) {
                                case e.PAGE_UP:
                                    this._move("previousPage", d);
                                    break;
                                case e.PAGE_DOWN:
                                    this._move("nextPage", d);
                                    break;
                                case e.UP:
                                    this._keyEvent("previous", d);
                                    break;
                                case e.DOWN:
                                    this._keyEvent("next", d)
                            }
                        }
                    },
                    input: function (a) {
                        return d ? (d = !1, void a.preventDefault()) : void this._searchTimeout(a)
                    },
                    focus: function () {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function (a) {
                        return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(a), void this._change(a))
                    }
                }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"), this._on(this.menu.element, {
                    mousedown: function (b) {
                        b.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                            delete this.cancelBlur
                        });
                        var c = this.menu.element[0];
                        a(b.target).closest(".ui-menu-item").length || this._delay(function () {
                            var b = this;
                            this.document.one("mousedown", function (d) {
                                d.target === b.element[0] || d.target === c || a.contains(c, d.target) || b.close()
                            })
                        })
                    },
                    menufocus: function (b, c) {
                        var d, e;
                        return this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function () {
                            a(b.target).trigger(b.originalEvent)
                        })) : (e = c.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", b, {
                            item: e
                        }) && b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(e.value), d = c.item.attr("aria-label") || e.value, void (d && a.trim(d).length && (this.liveRegion.children().hide(), a("<div>").text(d).appendTo(this.liveRegion))))
                    },
                    menuselect: function (a, b) {
                        var c = b.item.data("ui-autocomplete-item"),
                            d = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = d, this._delay(function () {
                            this.previous = d, this.selectedItem = c
                        })), !1 !== this._trigger("select", a, {
                            item: c
                        }) && this._value(c.value), this.term = this._value(), this.close(a), this.selectedItem = c
                    }
                }), this.liveRegion = a("<span>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function () {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function (a, b) {
                this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort()
            },
            _appendTo: function () {
                var b = this.options.appendTo;
                return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front")), b.length || (b = this.document[0].body), b
            },
            _initSource: function () {
                var b, c, d = this;
                a.isArray(this.options.source) ? (b = this.options.source, this.source = function (c, d) {
                    d(a.ui.autocomplete.filter(b, c.term))
                }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function (b, e) {
                    d.xhr && d.xhr.abort(), d.xhr = a.ajax({
                        url: c,
                        data: b,
                        dataType: "json",
                        success: function (a) {
                            e(a)
                        },
                        error: function () {
                            e([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function (a) {
                clearTimeout(this.searching), this.searching = this._delay(function () {
                    var b = this.term === this._value(),
                        c = this.menu.element.is(":visible"),
                        d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
                    b && (!b || c || d) || (this.selectedItem = null, this.search(null, a))
                }, this.options.delay)
            },
            search: function (a, b) {
                return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0
            },
            _search: function (a) {
                this.pending++ , this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: a
                }, this._response())
            },
            _response: function () {
                var b = ++this.requestIndex;
                return a.proxy(function (a) {
                    b === this.requestIndex && this.__response(a), this.pending-- , this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function (a) {
                a && (a = this._normalize(a)), this._trigger("response", null, {
                    content: a
                }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
            },
            close: function (a) {
                this.cancelSearch = !0, this._close(a)
            },
            _close: function (a) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
            },
            _change: function (a) {
                this.previous !== this._value() && this._trigger("change", a, {
                    item: this.selectedItem
                })
            },
            _normalize: function (b) {
                return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
                    return "string" == typeof b ? {
                        label: b,
                        value: b
                    } : a.extend({}, b, {
                        label: b.label || b.value,
                        value: b.value || b.label
                    })
                })
            },
            _suggest: function (b) {
                var c = this.menu.element.empty();
                this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function () {
                var a = this.menu.element;
                a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function (b, c) {
                var d = this;
                a.each(c, function (a, c) {
                    d._renderItemData(b, c)
                })
            },
            _renderItemData: function (a, b) {
                return this._renderItem(a, b).data("ui-autocomplete-item", b)
            },
            _renderItem: function (b, c) {
                return a("<li>").text(c.label).appendTo(b)
            },
            _move: function (a, b) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[a](b) : void this.search(null, b)
            },
            widget: function () {
                return this.menu.element
            },
            _value: function () {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function (a, b) {
                this.isMultiLine && !this.menu.element.is(":visible") || (this._move(a, b), b.preventDefault())
            }
        }), a.extend(a.ui.autocomplete, {
            escapeRegex: function (a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function (b, c) {
                var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
                return a.grep(b, function (a) {
                    return d.test(a.label || a.value || a)
                })
            }
        }), a.widget("ui.autocomplete", a.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function (a) {
                        return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function (b) {
                var c;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (c = b && b.length ? this.options.messages.results(b.length) : this.options.messages.noResults, this.liveRegion.children().hide(), a("<div>").text(c).appendTo(this.liveRegion))
            }
        });
        var m, n = (a.ui.autocomplete, "ui-button ui-widget ui-state-default ui-corner-all"),
            o = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            p = function () {
                var b = a(this);
                setTimeout(function () {
                    b.find(":ui-button").button("refresh")
                }, 1)
            },
            q = function (b) {
                var c = b.name,
                    d = b.form,
                    e = a([]);
                return c && (c = c.replace(/'/g, "\\'"), e = d ? a(d).find("[name='" + c + "'][type=radio]") : a("[name='" + c + "'][type=radio]", b.ownerDocument).filter(function () {
                    return !this.form
                })), e
            };
        a.widget("ui.button", {
            version: "1.11.2",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function () {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, p), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var b = this,
                    c = this.options,
                    d = "checkbox" === this.type || "radio" === this.type,
                    e = d ? "" : "ui-state-active";
                null === c.label && (c.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(n).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                    c.disabled || this === m && a(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function () {
                    c.disabled || a(this).removeClass(e)
                }).bind("click" + this.eventNamespace, function (a) {
                    c.disabled && (a.preventDefault(), a.stopImmediatePropagation())
                }), this._on({
                    focus: function () {
                        this.buttonElement.addClass("ui-state-focus")
                    },
                    blur: function () {
                        this.buttonElement.removeClass("ui-state-focus")
                    }
                }), d && this.element.bind("change" + this.eventNamespace, function () {
                    b.refresh()
                }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                    if (c.disabled) return !1
                }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                    if (c.disabled) return !1;
                    a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
                    var d = b.element[0];
                    q(d).not(d).map(function () {
                        return a(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                    return !c.disabled && (a(this).addClass("ui-state-active"), m = this, void b.document.one("mouseup", function () {
                        m = null
                    }))
                }).bind("mouseup" + this.eventNamespace, function () {
                    return !c.disabled && void a(this).removeClass("ui-state-active")
                }).bind("keydown" + this.eventNamespace, function (b) {
                    return !c.disabled && void (b.keyCode !== a.ui.keyCode.SPACE && b.keyCode !== a.ui.keyCode.ENTER || a(this).addClass("ui-state-active"))
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                    a(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function (b) {
                    b.keyCode === a.ui.keyCode.SPACE && a(this).click()
                })), this._setOption("disabled", c.disabled), this._resetButton()
            },
            _determineButtonType: function () {
                var a, b, c;
                this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), b = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible"), c = this.element.is(":checked"), c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)) : this.buttonElement = this.element
            },
            widget: function () {
                return this.buttonElement
            },
            _destroy: function () {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(n + " ui-state-active " + o).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function (a, b) {
                return this._super(a, b), "disabled" === a ? (this.widget().toggleClass("ui-state-disabled", !!b), this.element.prop("disabled", !!b), void (b && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
            },
            refresh: function () {
                var b = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                b !== this.options.disabled && this._setOption("disabled", b), "radio" === this.type ? q(this.element[0]).each(function () {
                    a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function () {
                if ("input" === this.type) return void (this.options.label && this.element.val(this.options.label));
                var b = this.buttonElement.removeClass(o),
                    c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
                    d = this.options.icons,
                    e = d.primary && d.secondary,
                    f = [];
                d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", a.trim(c)))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
            }
        }), a.widget("ui.buttonset", {
            version: "1.11.2",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
            },
            _create: function () {
                this.element.addClass("ui-buttonset")
            },
            _init: function () {
                this.refresh()
            },
            _setOption: function (a, b) {
                "disabled" === a && this.buttons.button("option", a, b), this._super(a, b)
            },
            refresh: function () {
                var b = "rtl" === this.element.css("direction"),
                    c = this.element.find(this.options.items),
                    d = c.filter(":ui-button");
                c.not(":ui-button").button(), d.button("refresh"), this.buttons = c.map(function () {
                    return a(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function () {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                    return a(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        });
        a.ui.button;
        a.extend(a.ui, {
            datepicker: {
                version: "1.11.2"
            }
        });
        var r;
        a.extend(e.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function () {
                return this.dpDiv
            },
            setDefaults: function (a) {
                return h(this._defaults, a || {}), this
            },
            _attachDatepicker: function (b, c) {
                var d, e, f;
                d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
            },
            _newInst: function (b, c) {
                var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: d,
                    input: b,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: c,
                    dpDiv: c ? f(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function (b, c) {
                var d = a(b);
                c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b))
            },
            _attachments: function (b, c) {
                var d, e, f, g = this._get(c, "appendText"),
                    h = this._get(c, "isRTL");
                c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), "focus" !== d && "both" !== d || b.focus(this._showDatepicker), "button" !== d && "both" !== d || (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: e,
                    title: e
                }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                    src: f,
                    alt: e,
                    title: e
                }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function () {
                    return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1
                }))
            },
            _autoSize: function (a) {
                if (this._get(a, "autoSize") && !a.inline) {
                    var b, c, d, e, f = new Date(2009, 11, 20),
                        g = this._get(a, "dateFormat");
                    g.match(/[DM]/) && (b = function (a) {
                        for (c = 0, d = 0, e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e);
                        return d
                    }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
                }
            },
            _inlineDatepicker: function (b, c) {
                var d = a(b);
                d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function (b, c, d, e, f) {
                var g, i, j, k, l, m = this._dialogInst;
                return m || (this.uuid += 1, g = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + g + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), m = this._dialogInst = this._newInst(this._dialogInput, !1), m.settings = {}, a.data(this._dialogInput[0], "datepicker", m)), h(m.settings, e || {}), c = c && c.constructor === Date ? this._formatDate(m, c) : c, this._dialogInput.val(c), this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null, this._pos || (i = document.documentElement.clientWidth, j = document.documentElement.clientHeight, k = document.documentElement.scrollLeft || document.body.scrollLeft, l = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [i / 2 - 100 + k, j / 2 - 150 + l]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), m.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], "datepicker", m), this
            },
            _destroyDatepicker: function (b) {
                var c, d = a(b),
                    e = a.data(b, "datepicker");
                d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, "datepicker"), "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== c && "span" !== c || d.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function (b) {
                var c, d, e = a(b),
                    f = a.data(b, "datepicker");
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, f.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function (a) {
                    return a === b ? null : a
                }))
            },
            _disableDatepicker: function (b) {
                var c, d, e = a(b),
                    f = a.data(b, "datepicker");
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, f.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function (a) {
                    return a === b ? null : a
                }), this._disabledInputs[this._disabledInputs.length] = b)
            },
            _isDisabledDatepicker: function (a) {
                if (!a) return !1;
                for (var b = 0; b < this._disabledInputs.length; b++)
                    if (this._disabledInputs[b] === a) return !0;
                return !1
            },
            _getInst: function (b) {
                try {
                    return a.data(b, "datepicker")
                } catch (a) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function (b, c, d) {
                var e, f, g, i, j = this._getInst(b);
                return 2 === arguments.length && "string" == typeof c ? "defaults" === c ? a.extend({}, a.datepicker._defaults) : j ? "all" === c ? a.extend({}, j.settings) : this._get(j, c) : null : (e = c || {}, "string" == typeof c && (e = {}, e[c] = d), void (j && (this._curInst === j && this._hideDatepicker(), f = this._getDateDatepicker(b, !0), g = this._getMinMaxDate(j, "min"), i = this._getMinMaxDate(j, "max"), h(j.settings, e), null !== g && void 0 !== e.dateFormat && void 0 === e.minDate && (j.settings.minDate = this._formatDate(j, g)), null !== i && void 0 !== e.dateFormat && void 0 === e.maxDate && (j.settings.maxDate = this._formatDate(j, i)), "disabled" in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)), this._attachments(a(b), j), this._autoSize(j), this._setDate(j, f), this._updateAlternate(j), this._updateDatepicker(j))))
            },
            _changeDatepicker: function (a, b, c) {
                this._optionDatepicker(a, b, c)
            },
            _refreshDatepicker: function (a) {
                var b = this._getInst(a);
                b && this._updateDatepicker(b)
            },
            _setDateDatepicker: function (a, b) {
                var c = this._getInst(a);
                c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
            },
            _getDateDatepicker: function (a, b) {
                var c = this._getInst(a);
                return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
            },
            _doKeyDown: function (b) {
                var c, d, e, f = a.datepicker._getInst(b.target),
                    g = !0,
                    h = f.dpDiv.is(".ui-datepicker-rtl");
                if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
                    case 9:
                        a.datepicker._hideDatepicker(), g = !1;
                        break;
                    case 13:
                        return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
                    case 27:
                        a.datepicker._hideDatepicker();
                        break;
                    case 33:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 34:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 35:
                        (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 36:
                        (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 37:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 38:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    case 39:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 40:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    default:
                        g = !1
                } else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
                g && (b.preventDefault(), b.stopPropagation())
            },
            _doKeyPress: function (b) {
                var c, d, e = a.datepicker._getInst(b.target);
                if (a.datepicker._get(e, "constrainInput")) return c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1
            },
            _doKeyUp: function (b) {
                var c, d = a.datepicker._getInst(b.target);
                if (d.input.val() !== d.lastVal) try {
                    c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
                } catch (a) { }
                return !0
            },
            _showDatepicker: function (b) {
                if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
                    var c, e, f, g, i, j, k;
                    c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), e = a.datepicker._get(c, "beforeShow"), f = e ? e.apply(b, [b, c]) : {}, f !== !1 && (h(c.settings, f), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), g = !1, a(b).parents().each(function () {
                        return g |= "fixed" === a(this).css("position"), !g
                    }), i = {
                        left: a.datepicker._pos[0],
                        top: a.datepicker._pos[1]
                    }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), a.datepicker._updateDatepicker(c), i = a.datepicker._checkOffset(c, i, g), c.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : g ? "fixed" : "absolute",
                        display: "none",
                        left: i.left + "px",
                        top: i.top + "px"
                    }), c.inline || (j = a.datepicker._get(c, "showAnim"), k = a.datepicker._get(c, "duration"), c.dpDiv.css("z-index", d(a(b)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[j] ? c.dpDiv.show(j, a.datepicker._get(c, "showOptions"), k) : c.dpDiv[j || "show"](j ? k : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c))
                }
            },
            _updateDatepicker: function (b) {
                this.maxRows = 4, r = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b);
                var c, d = this._getNumberOfMonths(b),
                    e = d[1],
                    f = 17,
                    h = b.dpDiv.find("." + this._dayOverClass + " a");
                h.length > 0 && g.apply(h.get(0)), b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", f * e + "em"), b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function () {
                    c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function (a) {
                return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
            },
            _checkOffset: function (b, c, d) {
                var e = b.dpDiv.outerWidth(),
                    f = b.dpDiv.outerHeight(),
                    g = b.input ? b.input.outerWidth() : 0,
                    h = b.input ? b.input.outerHeight() : 0,
                    i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
                    j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
                return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c
            },
            _findPos: function (b) {
                for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"];
                return c = a(b).offset(), [c.left, c.top]
            },
            _hideDatepicker: function (b) {
                var c, d, e, f, g = this._curInst;
                !g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"), d = this._get(g, "duration"), e = function () {
                    a.datepicker._tidyDialog(g)
                }, a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(g, "onClose"), f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function (a) {
                a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function (b) {
                if (a.datepicker._curInst) {
                    var c = a(b.target),
                        d = a.datepicker._getInst(c[0]);
                    (c[0].id === a.datepicker._mainDivId || 0 !== c.parents("#" + a.datepicker._mainDivId).length || c.hasClass(a.datepicker.markerClassName) || c.closest("." + a.datepicker._triggerClass).length || !a.datepicker._datepickerShowing || a.datepicker._inDialog && a.blockUI) && (!c.hasClass(a.datepicker.markerClassName) || a.datepicker._curInst === d) || a.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function (b, c, d) {
                var e = a(b),
                    f = this._getInst(e[0]);
                this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
            },
            _gotoToday: function (b) {
                var c, d = a(b),
                    e = this._getInst(d[0]);
                this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
            },
            _selectMonthYear: function (b, c, d) {
                var e = a(b),
                    f = this._getInst(e[0]);
                f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
            },
            _selectDay: function (b, c, d, e) {
                var f, g = a(b);
                a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
            },
            _clearDate: function (b) {
                var c = a(b);
                this._selectDate(c, "")
            },
            _selectDate: function (b, c) {
                var d, e = a(b),
                    f = this._getInst(e[0]);
                c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function (b) {
                var c, d, e, f = this._get(b, "altField");
                f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function () {
                    a(this).val(e)
                }))
            },
            noWeekends: function (a) {
                var b = a.getDay();
                return [b > 0 && b < 6, ""]
            },
            iso8601Week: function (a) {
                var b, c = new Date(a.getTime());
                return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1
            },
            parseDate: function (b, c, d) {
                if (null == b || null == c) throw "Invalid arguments";
                if (c = "object" == typeof c ? c.toString() : c + "", "" === c) return null;
                var e, f, g, h, i = 0,
                    j = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    k = "string" != typeof j ? j : (new Date).getFullYear() % 100 + parseInt(j, 10),
                    l = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort,
                    m = (d ? d.dayNames : null) || this._defaults.dayNames,
                    n = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort,
                    o = (d ? d.monthNames : null) || this._defaults.monthNames,
                    p = -1,
                    q = -1,
                    r = -1,
                    s = -1,
                    t = !1,
                    u = function (a) {
                        var c = e + 1 < b.length && b.charAt(e + 1) === a;
                        return c && e++ , c
                    },
                    v = function (a) {
                        var b = u(a),
                            d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
                            e = "y" === a ? d : 1,
                            f = new RegExp("^\\d{" + e + "," + d + "}"),
                            g = c.substring(i).match(f);
                        if (!g) throw "Missing number at position " + i;
                        return i += g[0].length, parseInt(g[0], 10)
                    },
                    w = function (b, d, e) {
                        var f = -1,
                            g = a.map(u(b) ? e : d, function (a, b) {
                                return [
                                    [b, a]
                                ]
                            }).sort(function (a, b) {
                                return -(a[1].length - b[1].length)
                            });
                        if (a.each(g, function (a, b) {
                            var d = b[1];
                            if (c.substr(i, d.length).toLowerCase() === d.toLowerCase()) return f = b[0], i += d.length, !1
                        }), f !== -1) return f + 1;
                        throw "Unknown name at position " + i
                    },
                    x = function () {
                        if (c.charAt(i) !== b.charAt(e)) throw "Unexpected literal at position " + i;
                        i++
                    };
                for (e = 0; e < b.length; e++)
                    if (t) "'" !== b.charAt(e) || u("'") ? x() : t = !1;
                    else switch (b.charAt(e)) {
                        case "d":
                            r = v("d");
                            break;
                        case "D":
                            w("D", l, m);
                            break;
                        case "o":
                            s = v("o");
                            break;
                        case "m":
                            q = v("m");
                            break;
                        case "M":
                            q = w("M", n, o);
                            break;
                        case "y":
                            p = v("y");
                            break;
                        case "@":
                            h = new Date(v("@")), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate();
                            break;
                        case "!":
                            h = new Date((v("!") - this._ticksTo1970) / 1e4), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate();
                            break;
                        case "'":
                            u("'") ? x() : t = !0;
                            break;
                        default:
                            x()
                    }
                if (i < c.length && (g = c.substr(i), !/^\s+/.test(g))) throw "Extra/unparsed characters found in date: " + g;
                if (p === -1 ? p = (new Date).getFullYear() : p < 100 && (p += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (p <= k ? 0 : -100)), s > -1)
                    for (q = 1, r = s; ;) {
                        if (f = this._getDaysInMonth(p, q - 1), r <= f) break;
                        q++ , r -= f
                    }
                if (h = this._daylightSavingAdjust(new Date(p, q - 1, r)), h.getFullYear() !== p || h.getMonth() + 1 !== q || h.getDate() !== r) throw "Invalid date";
                return h
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function (a, b, c) {
                if (!b) return "";
                var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                    f = (c ? c.dayNames : null) || this._defaults.dayNames,
                    g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                    h = (c ? c.monthNames : null) || this._defaults.monthNames,
                    i = function (b) {
                        var c = d + 1 < a.length && a.charAt(d + 1) === b;
                        return c && d++ , c
                    },
                    j = function (a, b, c) {
                        var d = "" + b;
                        if (i(a))
                            for (; d.length < c;) d = "0" + d;
                        return d
                    },
                    k = function (a, b, c, d) {
                        return i(a) ? d[b] : c[b]
                    },
                    l = "",
                    m = !1;
                if (b)
                    for (d = 0; d < a.length; d++)
                        if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
                        else switch (a.charAt(d)) {
                            case "d":
                                l += j("d", b.getDate(), 2);
                                break;
                            case "D":
                                l += k("D", b.getDay(), e, f);
                                break;
                            case "o":
                                l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                l += j("m", b.getMonth() + 1, 2);
                                break;
                            case "M":
                                l += k("M", b.getMonth(), g, h);
                                break;
                            case "y":
                                l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                                break;
                            case "@":
                                l += b.getTime();
                                break;
                            case "!":
                                l += 1e4 * b.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                i("'") ? l += "'" : m = !0;
                                break;
                            default:
                                l += a.charAt(d)
                        }
                return l
            },
            _possibleChars: function (a) {
                var b, c = "",
                    d = !1,
                    e = function (c) {
                        var d = b + 1 < a.length && a.charAt(b + 1) === c;
                        return d && b++ , d
                    };
                for (b = 0; b < a.length; b++)
                    if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
                    else switch (a.charAt(b)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            c += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            e("'") ? c += "'" : d = !0;
                            break;
                        default:
                            c += a.charAt(b)
                    }
                return c
            },
            _get: function (a, b) {
                return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b]
            },
            _setDateFromField: function (a, b) {
                if (a.input.val() !== a.lastVal) {
                    var c = this._get(a, "dateFormat"),
                        d = a.lastVal = a.input ? a.input.val() : null,
                        e = this._getDefaultDate(a),
                        f = e,
                        g = this._getFormatConfig(a);
                    try {
                        f = this.parseDate(c, d, g) || e
                    } catch (a) {
                        d = b ? "" : d
                    }
                    a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
                }
            },
            _getDefaultDate: function (a) {
                return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
            },
            _determineDate: function (b, c, d) {
                var e = function (a) {
                    var b = new Date;
                    return b.setDate(b.getDate() + a), b
                },
                    f = function (c) {
                        try {
                            return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
                        } catch (a) { }
                        for (var d = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(c); i;) {
                            switch (i[2] || "d") {
                                case "d":
                                case "D":
                                    g += parseInt(i[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    g += 7 * parseInt(i[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    f += parseInt(i[1], 10), g = Math.min(g, a.datepicker._getDaysInMonth(e, f));
                                    break;
                                case "y":
                                case "Y":
                                    e += parseInt(i[1], 10), g = Math.min(g, a.datepicker._getDaysInMonth(e, f))
                            }
                            i = h.exec(c)
                        }
                        return new Date(e, f, g)
                    },
                    g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
                return g = g && "Invalid Date" === g.toString() ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g)
            },
            _daylightSavingAdjust: function (a) {
                return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
            },
            _setDate: function (a, b, c) {
                var d = !b,
                    e = a.selectedMonth,
                    f = a.selectedYear,
                    g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
                a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
            },
            _getDate: function (a) {
                var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return b
            },
            _attachHandlers: function (b) {
                var c = this._get(b, "stepMonths"),
                    d = "#" + b.id.replace(/\\\\/g, "\\");
                b.dpDiv.find("[data-handler]").map(function () {
                    var b = {
                        prev: function () {
                            a.datepicker._adjustDate(d, -c, "M")
                        },
                        next: function () {
                            a.datepicker._adjustDate(d, +c, "M")
                        },
                        hide: function () {
                            a.datepicker._hideDatepicker()
                        },
                        today: function () {
                            a.datepicker._gotoToday(d)
                        },
                        selectDay: function () {
                            return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function () {
                            return a.datepicker._selectMonthYear(d, this, "M"), !1
                        },
                        selectYear: function () {
                            return a.datepicker._selectMonthYear(d, this, "Y"), !1
                        }
                    };
                    a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function (a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
                    P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
                    Q = this._get(a, "isRTL"),
                    R = this._get(a, "showButtonPanel"),
                    S = this._get(a, "hideIfNoPrevNext"),
                    T = this._get(a, "navigationAsDateFormat"),
                    U = this._getNumberOfMonths(a),
                    V = this._get(a, "showCurrentAtPos"),
                    W = this._get(a, "stepMonths"),
                    X = 1 !== U[0] || 1 !== U[1],
                    Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                    Z = this._getMinMaxDate(a, "min"),
                    $ = this._getMinMaxDate(a, "max"),
                    _ = a.drawMonth - V,
                    aa = a.drawYear;
                if (_ < 0 && (_ += 12, aa--), $)
                    for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && b < Z ? Z : b; this._daylightSavingAdjust(new Date(aa, _, 1)) > b;) _-- , _ < 0 && (_ = 11, aa--);
                for (a.drawMonth = _, a.drawYear = aa, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(aa, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, aa, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(aa, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, aa, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; w < U[0]; w++) {
                    for (x = "", this.maxRows = 4, y = 0; y < U[1]; y++) {
                        if (z = this._daylightSavingAdjust(new Date(aa, _, a.selectedDay)), A = " ui-corner-all", B = "", X) {
                            if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
                                case 0:
                                    B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                                    break;
                                case U[1] - 1:
                                    B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                                    break;
                                default:
                                    B += " ui-datepicker-group-middle", A = ""
                            }
                            B += "'>"
                        }
                        for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, aa, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; v < 7; v++) D = (v + k) % 7, C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>";
                        for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(aa, _), aa === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(aa, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X && this.maxRows > G ? this.maxRows : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(aa, _, 1 - F)), J = 0; J < H; J++) {
                            for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; v < 7; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && I < Z || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                            B += K + "</tr>"
                        }
                        _++ , _ > 11 && (_ = 0, aa++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
                    }
                    u += x
                }
                return u += j, a._keyEvent = !1, u
            },
            _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
                var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
                    r = this._get(a, "changeYear"),
                    s = this._get(a, "showMonthAfterYear"),
                    t = "<div class='ui-datepicker-title'>",
                    u = "";
                if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
                else {
                    for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; k < 12; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                    u += "</select>"
                }
                if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml)
                    if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
                    else {
                        for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function (a) {
                            var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(b) ? m : b
                        }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; o <= p; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                        a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
                    }
                return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>"
            },
            _adjustInstDate: function (a, b, c) {
                var d = a.drawYear + ("Y" === c ? b : 0),
                    e = a.drawMonth + ("M" === c ? b : 0),
                    f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
                    g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
                a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), "M" !== c && "Y" !== c || this._notifyChange(a)
            },
            _restrictMinMax: function (a, b) {
                var c = this._getMinMaxDate(a, "min"),
                    d = this._getMinMaxDate(a, "max"),
                    e = c && b < c ? c : b;
                return d && e > d ? d : e
            },
            _notifyChange: function (a) {
                var b = this._get(a, "onChangeMonthYear");
                b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
            },
            _getNumberOfMonths: function (a) {
                var b = this._get(a, "numberOfMonths");
                return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
            },
            _getMinMaxDate: function (a, b) {
                return this._determineDate(a, this._get(a, b + "Date"), null)
            },
            _getDaysInMonth: function (a, b) {
                return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
            },
            _getFirstDayOfMonth: function (a, b) {
                return new Date(a, b, 1).getDay()
            },
            _canAdjustMonth: function (a, b, c, d) {
                var e = this._getNumberOfMonths(a),
                    f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
                return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
            },
            _isInRange: function (a, b) {
                var c, d, e = this._getMinMaxDate(a, "min"),
                    f = this._getMinMaxDate(a, "max"),
                    g = null,
                    h = null,
                    i = this._get(a, "yearRange");
                return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
            },
            _getFormatConfig: function (a) {
                var b = this._get(a, "shortYearCutoff");
                return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                    shortYearCutoff: b,
                    dayNamesShort: this._get(a, "dayNamesShort"),
                    dayNames: this._get(a, "dayNames"),
                    monthNamesShort: this._get(a, "monthNamesShort"),
                    monthNames: this._get(a, "monthNames")
                }
            },
            _formatDate: function (a, b, c, d) {
                b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
                var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
            }
        }), a.fn.datepicker = function (b) {
            if (!this.length) return this;
            a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
            var c = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function () {
                "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
            }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
        }, a.datepicker = new e, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.11.2";
        a.datepicker;
        a.widget("ui.draggable", a.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function () {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
            },
            _setOption: function (a, b) {
                this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName())
            },
            _destroy: function () {
                return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
            },
            _mouseCapture: function (b) {
                var c = this.options;
                return this._blurActiveElement(b), !(this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(b), !!this.handle && (this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0))
            },
            _blockFrames: function (b) {
                this.iframeBlocks = this.document.find(b).map(function () {
                    var b = a(this);
                    return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
                })
            },
            _unblockFrames: function () {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _blurActiveElement: function (b) {
                var c = this.document[0];
                if (this.handleElement.is(b.target)) try {
                    c.activeElement && "body" !== c.activeElement.nodeName.toLowerCase() && a(c.activeElement).blur()
                } catch (a) { }
            },
            _mouseStart: function (b) {
                var c = this.options;
                return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
                    return "fixed" === a(this).css("position")
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._normalizeRightBottom(), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
            },
            _refreshOffsets: function (a) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                }
            },
            _mouseDrag: function (b, c) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
                    var d = this._uiHash();
                    if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                    this.position = d.position
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
            },
            _mouseStop: function (b) {
                var c = this,
                    d = !1;
                return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    c._trigger("stop", b) !== !1 && c._clear()
                }) : this._trigger("stop", b) !== !1 && this._clear(), !1
            },
            _mouseUp: function (b) {
                return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.focus(), a.ui.mouse.prototype._mouseUp.call(this, b)
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function (b) {
                return !this.options.handle || !!a(b.target).closest(this.element.find(this.options.handle)).length
            },
            _setHandleClassName: function () {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
            },
            _removeHandleClassName: function () {
                this.handleElement.removeClass("ui-draggable-handle")
            },
            _createHelper: function (b) {
                var c = this.options,
                    d = a.isFunction(c.helper),
                    e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
                return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e
            },
            _setPositionRelative: function () {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
            },
            _adjustOffsetFromHelper: function (b) {
                "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _isRootNode: function (a) {
                return /(html|body)/i.test(a.tagName) || a === this.document[0]
            },
            _getParentOffset: function () {
                var b = this.offsetParent.offset(),
                    c = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
                    top: 0,
                    left: 0
                }), {
                        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    }
            },
            _getRelativeOffset: function () {
                if ("relative" !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var a = this.element.position(),
                    b = this._isRootNode(this.scrollParent[0]);
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var b, c, d, e = this.options,
                    f = this.document[0];
                return this.relativeContainer = null, e.containment ? "window" === e.containment ? void (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void (this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void (this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void (d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void (this.containment = null)
            },
            _convertPositionTo: function (a, b) {
                b || (b = this.position);
                var c = "absolute" === a ? 1 : -1,
                    d = this._isRootNode(this.scrollParent[0]);
                return {
                    top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
                    left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
                }
            },
            _generatePosition: function (a, b) {
                var c, d, e, f, g = this.options,
                    h = this._isRootNode(this.scrollParent[0]),
                    i = a.pageX,
                    j = a.pageY;
                return h && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
                        top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
                        left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
                    }
            },
            _clear: function () {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
            },
            _normalizeRightBottom: function () {
                "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
            },
            _trigger: function (b, c, d) {
                return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d)
            },
            plugins: {},
            _uiHash: function () {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), a.ui.plugin.add("draggable", "connectToSortable", {
            start: function (b, c, d) {
                var e = a.extend({}, c, {
                    item: d.element
                });
                d.sortables = [], a(d.options.connectToSortable).each(function () {
                    var c = a(this).sortable("instance");
                    c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e))
                })
            },
            stop: function (b, c, d) {
                var e = a.extend({}, c, {
                    item: d.element
                });
                d.cancelHelperRemoval = !1, a.each(d.sortables, function () {
                    var a = this;
                    a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
                        position: a.placeholder.css("position"),
                        top: a.placeholder.css("top"),
                        left: a.placeholder.css("left")
                    }, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e))
                })
            },
            drag: function (b, c, d) {
                a.each(d.sortables, function () {
                    var e = !1,
                        f = this;
                    f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function () {
                        return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e
                    })), e ? (f.isOver || (f.isOver = 1, f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function () {
                        return c.helper[0]
                    }, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function () {
                        this.refreshPositions()
                    }), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function () {
                        this.refreshPositions()
                    }))
                })
            }
        }), a.ui.plugin.add("draggable", "cursor", {
            start: function (b, c, d) {
                var e = a("body"),
                    f = d.options;
                e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor)
            },
            stop: function (b, c, d) {
                var e = d.options;
                e._cursor && a("body").css("cursor", e._cursor)
            }
        }), a.ui.plugin.add("draggable", "opacity", {
            start: function (b, c, d) {
                var e = a(c.helper),
                    f = d.options;
                e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity)
            },
            stop: function (b, c, d) {
                var e = d.options;
                e._opacity && a(c.helper).css("opacity", e._opacity)
            }
        }), a.ui.plugin.add("draggable", "scroll", {
            start: function (a, b, c) {
                c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
            },
            drag: function (b, c, d) {
                var e = d.options,
                    f = !1,
                    g = d.scrollParentNotHidden[0],
                    h = d.document[0];
                g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
            }
        }), a.ui.plugin.add("draggable", "snap", {
            start: function (b, c, d) {
                var e = d.options;
                d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function () {
                    var b = a(this),
                        c = b.offset();
                    this !== d.element[0] && d.snapElements.push({
                        item: this,
                        width: b.outerWidth(),
                        height: b.outerHeight(),
                        top: c.top,
                        left: c.left
                    })
                })
            },
            drag: function (b, c, d) {
                var e, f, g, h, i, j, k, l, m, n, o = d.options,
                    p = o.snapTolerance,
                    q = c.offset.left,
                    r = q + d.helperProportions.width,
                    s = c.offset.top,
                    t = s + d.helperProportions.height;
                for (m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, r < i - p || q > j + p || t < k - p || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[m].item
                })), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", {
                    top: k - d.helperProportions.height,
                    left: 0
                }).top), f && (c.position.top = d._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top), g && (c.position.left = d._convertPositionTo("relative", {
                    top: 0,
                    left: i - d.helperProportions.width
                }).left), h && (c.position.left = d._convertPositionTo("relative", {
                    top: 0,
                    left: j
                }).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", {
                    top: k,
                    left: 0
                }).top), f && (c.position.top = d._convertPositionTo("relative", {
                    top: l - d.helperProportions.height,
                    left: 0
                }).top), g && (c.position.left = d._convertPositionTo("relative", {
                    top: 0,
                    left: i
                }).left), h && (c.position.left = d._convertPositionTo("relative", {
                    top: 0,
                    left: j - d.helperProportions.width
                }).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[m].item
                })), d.snapElements[m].snapping = e || f || g || h || n)
            }
        }), a.ui.plugin.add("draggable", "stack", {
            start: function (b, c, d) {
                var e, f = d.options,
                    g = a.makeArray(a(f.stack)).sort(function (b, c) {
                        return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                    });
                g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function (b) {
                    a(this).css("zIndex", e + b)
                }), this.css("zIndex", e + g.length))
            }
        }), a.ui.plugin.add("draggable", "zIndex", {
            start: function (b, c, d) {
                var e = a(c.helper),
                    f = d.options;
                e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex)
            },
            stop: function (b, c, d) {
                var e = d.options;
                e._zIndex && a(c.helper).css("zIndex", e._zIndex)
            }
        });
        a.ui.draggable;
        a.widget("ui.resizable", a.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function (a) {
                return parseInt(a, 10) || 0
            },
            _isNumber: function (a) {
                return !isNaN(parseInt(a, 10))
            },
            _hasScroll: function (b, c) {
                if ("hidden" === a(b).css("overflow")) return !1;
                var d = c && "left" === c ? "scrollLeft" : "scrollTop",
                    e = !1;
                return b[d] > 0 || (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
            },
            _create: function () {
                var b, c, d, e, f, g = this,
                    h = this.options;
                if (this.element.addClass("ui-resizable"), a.extend(this, {
                    _aspectRatio: !!h.aspectRatio,
                    aspectRatio: h.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++) d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({
                        zIndex: h.zIndex
                    }), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
                this._renderAxis = function (b) {
                    var c, d, e, f;
                    b = b || this.element;
                    for (c in this.handles) this.handles[c].constructor === String && (this.handles[c] = this.element.children(this.handles[c]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), a(this.handles[c]).length
                }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                    g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se")
                }), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                    h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show())
                }).mouseleave(function () {
                    h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function () {
                this._mouseDestroy();
                var b, c = function (b) {
                    a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
                    position: b.css("position"),
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: b.css("top"),
                    left: b.css("left")
                }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
            },
            _mouseCapture: function (b) {
                var c, d, e = !1;
                for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
                return !this.options.disabled && e
            },
            _mouseStart: function (b) {
                var c, d, e, f = this.options,
                    g = this.element;
                return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: c,
                    top: d
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                        width: g.width(),
                        height: g.height()
                    }, this.originalSize = this._helper ? {
                        width: g.outerWidth(),
                        height: g.outerHeight()
                    } : {
                            width: g.width(),
                            height: g.height()
                        }, this.sizeDiff = {
                            width: g.outerWidth() - g.width(),
                            height: g.outerHeight() - g.height()
                        }, this.originalPosition = {
                            left: c,
                            top: d
                        }, this.originalMousePosition = {
                            left: b.pageX,
                            top: b.pageY
                        }, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), g.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
            },
            _mouseDrag: function (b) {
                var c, d, e = this.originalMousePosition,
                    f = this.axis,
                    g = b.pageX - e.left || 0,
                    h = b.pageY - e.top || 0,
                    i = this._change[f];
                return this._updatePrevProperties(), !!i && (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1)
            },
            _mouseStop: function (b) {
                this.resizing = !1;
                var c, d, e, f, g, h, i, j = this.options,
                    k = this;
                return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
                    width: k.helper.width() - f,
                    height: k.helper.height() - e
                }, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
                    top: i,
                    left: h
                })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function () {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function () {
                var a = {};
                return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a
            },
            _updateVirtualBoundaries: function (a) {
                var b, c, d, e, f, g = this.options;
                f = {
                    minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0,
                    maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0,
                    minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0,
                    maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0
                }, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f
            },
            _updateCache: function (a) {
                this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width)
            },
            _updateRatio: function (a) {
                var b = this.position,
                    c = this.size,
                    d = this.axis;
                return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a
            },
            _respectSize: function (a) {
                var b = this._vBoundaries,
                    c = this.axis,
                    d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
                    e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
                    f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
                    g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
                    h = this.originalPosition.left + this.originalSize.width,
                    i = this.position.top + this.size.height,
                    j = /sw|nw|w/.test(c),
                    k = /nw|ne|n/.test(c);
                return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
            },
            _getPaddingPlusBorderDimensions: function (a) {
                for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; b < 4; b++) c[b] = parseInt(d[b], 10) || 0, c[b] += parseInt(e[b], 10) || 0;
                return {
                    height: c[0] + c[2],
                    width: c[1] + c[3]
                }
            },
            _proportionallyResize: function () {
                if (this._proportionallyResizeElements.length)
                    for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({
                        height: c.height() - this.outerDimensions.height || 0,
                        width: c.width() - this.outerDimensions.width || 0
                    })
            },
            _renderProxy: function () {
                var b = this.element,
                    c = this.options;
                this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++c.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function (a, b) {
                    return {
                        width: this.originalSize.width + b
                    }
                },
                w: function (a, b) {
                    var c = this.originalSize,
                        d = this.originalPosition;
                    return {
                        left: d.left + b,
                        width: c.width - b
                    }
                },
                n: function (a, b, c) {
                    var d = this.originalSize,
                        e = this.originalPosition;
                    return {
                        top: e.top + c,
                        height: d.height - c
                    }
                },
                s: function (a, b, c) {
                    return {
                        height: this.originalSize.height + c
                    }
                },
                se: function (b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                sw: function (b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                },
                ne: function (b, c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                nw: function (b, c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                }
            },
            _propagate: function (b, c) {
                a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
            },
            plugins: {},
            ui: function () {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), a.ui.plugin.add("resizable", "animate", {
            stop: function (b) {
                var c = a(this).resizable("instance"),
                    d = c.options,
                    e = c._proportionallyResizeElements,
                    f = e.length && /textarea/i.test(e[0].nodeName),
                    g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
                    h = f ? 0 : c.sizeDiff.width,
                    i = {
                        width: c.size.width - h,
                        height: c.size.height - g
                    },
                    j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
                    k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
                c.element.animate(a.extend(i, k && j ? {
                    top: k,
                    left: j
                } : {}), {
                        duration: d.animateDuration,
                        easing: d.animateEasing,
                        step: function () {
                            var d = {
                                width: parseInt(c.element.css("width"), 10),
                                height: parseInt(c.element.css("height"), 10),
                                top: parseInt(c.element.css("top"), 10),
                                left: parseInt(c.element.css("left"), 10)
                            };
                            e && e.length && a(e[0]).css({
                                width: d.width,
                                height: d.height
                            }), c._updateCache(d), c._propagate("resize", b)
                        }
                    })
            }
        }), a.ui.plugin.add("resizable", "containment", {
            start: function () {
                var b, c, d, e, f, g, h, i = a(this).resizable("instance"),
                    j = i.options,
                    k = i.element,
                    l = j.containment,
                    m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
                m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = {
                    left: 0,
                    top: 0
                }, i.containerPosition = {
                    left: 0,
                    top: 0
                }, i.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                }) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function (a, d) {
                    c[a] = i._num(b.css("padding" + d))
                }), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = {
                    height: b.innerHeight() - c[3],
                    width: b.innerWidth() - c[1]
                }, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = {
                    element: m,
                    left: d.left,
                    top: d.top,
                    width: g,
                    height: h
                }))
            },
            resize: function (b) {
                var c, d, e, f, g = a(this).resizable("instance"),
                    h = g.options,
                    i = g.containerOffset,
                    j = g.position,
                    k = g._aspectRatio || b.shiftKey,
                    l = {
                        top: 0,
                        left: 0
                    },
                    m = g.containerElement,
                    n = !0;
                m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height)
            },
            stop: function () {
                var b = a(this).resizable("instance"),
                    c = b.options,
                    d = b.containerOffset,
                    e = b.containerPosition,
                    f = b.containerElement,
                    g = a(b.helper),
                    h = g.offset(),
                    i = g.outerWidth() - b.sizeDiff.width,
                    j = g.outerHeight() - b.sizeDiff.height;
                b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
                    left: h.left - e.left - d.left,
                    width: i,
                    height: j
                }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
                    left: h.left - e.left - d.left,
                    width: i,
                    height: j
                })
            }
        }), a.ui.plugin.add("resizable", "alsoResize", {
            start: function () {
                var b = a(this).resizable("instance"),
                    c = b.options,
                    d = function (b) {
                        a(b).each(function () {
                            var b = a(this);
                            b.data("ui-resizable-alsoresize", {
                                width: parseInt(b.width(), 10),
                                height: parseInt(b.height(), 10),
                                left: parseInt(b.css("left"), 10),
                                top: parseInt(b.css("top"), 10)
                            })
                        })
                    };
                "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function (a) {
                    d(a)
                })
            },
            resize: function (b, c) {
                var d = a(this).resizable("instance"),
                    e = d.options,
                    f = d.originalSize,
                    g = d.originalPosition,
                    h = {
                        height: d.size.height - f.height || 0,
                        width: d.size.width - f.width || 0,
                        top: d.position.top - g.top || 0,
                        left: d.position.left - g.left || 0
                    },
                    i = function (b, d) {
                        a(b).each(function () {
                            var b = a(this),
                                e = a(this).data("ui-resizable-alsoresize"),
                                f = {},
                                g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            a.each(g, function (a, b) {
                                var c = (e[b] || 0) + (h[b] || 0);
                                c && c >= 0 && (f[b] = c || null)
                            }), b.css(f)
                        })
                    };
                "object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function (a, b) {
                    i(a, b)
                })
            },
            stop: function () {
                a(this).removeData("resizable-alsoresize")
            }
        }), a.ui.plugin.add("resizable", "ghost", {
            start: function () {
                var b = a(this).resizable("instance"),
                    c = b.options,
                    d = b.size;
                b.ghost = b.originalElement.clone(), b.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: d.height,
                    width: d.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
            },
            resize: function () {
                var b = a(this).resizable("instance");
                b.ghost && b.ghost.css({
                    position: "relative",
                    height: b.size.height,
                    width: b.size.width
                })
            },
            stop: function () {
                var b = a(this).resizable("instance");
                b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
            }
        }), a.ui.plugin.add("resizable", "grid", {
            resize: function () {
                var b, c = a(this).resizable("instance"),
                    d = c.options,
                    e = c.size,
                    f = c.originalSize,
                    g = c.originalPosition,
                    h = c.axis,
                    i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
                    j = i[0] || 1,
                    k = i[1] || 1,
                    l = Math.round((e.width - f.width) / j) * j,
                    m = Math.round((e.height - f.height) / k) * k,
                    n = f.width + l,
                    o = f.height + m,
                    p = d.maxWidth && d.maxWidth < n,
                    q = d.maxHeight && d.maxHeight < o,
                    r = d.minWidth && d.minWidth > n,
                    s = d.minHeight && d.minHeight > o;
                d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((o - k <= 0 || n - j <= 0) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = k - b.height, c.size.width = n, c.position.left = g.left + f.width - n))
            }
        });
        a.ui.resizable, a.widget("ui.dialog", {
            version: "1.11.2",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                closeOnEscape: !0,
                closeText: "Close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function (b) {
                        var c = a(this).css(b).offset().top;
                        c < 0 && a(this).css("top", b.top - c)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            sizeRelatedOptions: {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions: {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            _create: function () {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
            },
            _init: function () {
                this.options.autoOpen && this.open()
            },
            _appendTo: function () {
                var b = this.options.appendTo;
                return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0)
            },
            _destroy: function () {
                var a, b = this.originalPosition;
                this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element)
            },
            widget: function () {
                return this.uiDialog
            },
            disable: a.noop,
            enable: a.noop,
            close: function (b) {
                var c, d = this;
                if (this._isOpen && this._trigger("beforeClose", b) !== !1) {
                    if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
                        c = this.document[0].activeElement, c && "body" !== c.nodeName.toLowerCase() && a(c).blur()
                    } catch (a) { }
                    this._hide(this.uiDialog, this.options.hide, function () {
                        d._trigger("close", b)
                    })
                }
            },
            isOpen: function () {
                return this._isOpen
            },
            moveToTop: function () {
                this._moveToTop()
            },
            _moveToTop: function (b, c) {
                var d = !1,
                    e = this.uiDialog.siblings(".ui-front:visible").map(function () {
                        return +a(this).css("z-index")
                    }).get(),
                    f = Math.max.apply(null, e);
                return f >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", f + 1), d = !0), d && !c && this._trigger("focus", b), d
            },
            open: function () {
                var b = this;
                return this._isOpen ? void (this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = a(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
                    b._focusTabbable(), b._trigger("focus")
                }), this._makeFocusTarget(), void this._trigger("open"))
            },
            _focusTabbable: function () {
                var a = this._focusedElement;
                a || (a = this.element.find("[autofocus]")), a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), a.eq(0).focus()
            },
            _keepFocus: function (b) {
                function c() {
                    var b = this.document[0].activeElement,
                        c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
                    c || this._focusTabbable()
                }
                b.preventDefault(), c.call(this), this._delay(c)
            },
            _createWrapper: function () {
                this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                    keydown: function (b) {
                        if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), void this.close(b);
                        if (b.keyCode === a.ui.keyCode.TAB && !b.isDefaultPrevented()) {
                            var c = this.uiDialog.find(":tabbable"),
                                d = c.filter(":first"),
                                e = c.filter(":last");
                            b.target !== e[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (this._delay(function () {
                                e.focus()
                            }), b.preventDefault()) : (this._delay(function () {
                                d.focus()
                            }), b.preventDefault())
                        }
                    },
                    mousedown: function (a) {
                        this._moveToTop(a) && this._focusTabbable()
                    }
                }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function () {
                var b;
                this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                    mousedown: function (b) {
                        a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                    }
                }), this.uiDialogTitlebarClose = a("<button type='button'></button>").button({
                    label: this.options.closeText,
                    icons: {
                        primary: "ui-icon-closethick"
                    },
                    text: !1
                }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                    click: function (a) {
                        a.preventDefault(), this.close(a)
                    }
                }), b = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(b), this.uiDialog.attr({
                    "aria-labelledby": b.attr("id")
                })
            },
            _title: function (a) {
                this.options.title || a.html("&#160;"), a.text(this.options.title)
            },
            _createButtonPane: function () {
                this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
            },
            _createButtons: function () {
                var b = this,
                    c = this.options.buttons;
                return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (a.each(c, function (c, d) {
                    var e, f;
                    d = a.isFunction(d) ? {
                        click: d,
                        text: c
                    } : d, d = a.extend({
                        type: "button"
                    }, d), e = d.click, d.click = function () {
                        e.apply(b.element[0], arguments)
                    }, f = {
                        icons: d.icons,
                        text: d.showText
                    }, delete d.icons, delete d.showText, a("<button></button>", d).button(f).appendTo(b.uiButtonSet)
                }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
            },
            _makeDraggable: function () {
                function b(a) {
                    return {
                        position: a.position,
                        offset: a.offset
                    }
                }
                var c = this,
                    d = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function (d, e) {
                        a(this).addClass("ui-dialog-dragging"), c._blockFrames(), c._trigger("dragStart", d, b(e))
                    },
                    drag: function (a, d) {
                        c._trigger("drag", a, b(d))
                    },
                    stop: function (e, f) {
                        var g = f.offset.left - c.document.scrollLeft(),
                            h = f.offset.top - c.document.scrollTop();
                        d.position = {
                            my: "left top",
                            at: "left" + (g >= 0 ? "+" : "") + g + " top" + (h >= 0 ? "+" : "") + h,
                            of: c.window
                        }, a(this).removeClass("ui-dialog-dragging"), c._unblockFrames(), c._trigger("dragStop", e, b(f))
                    }
                })
            },
            _makeResizable: function () {
                function b(a) {
                    return {
                        originalPosition: a.originalPosition,
                        originalSize: a.originalSize,
                        position: a.position,
                        size: a.size
                    }
                }
                var c = this,
                    d = this.options,
                    e = d.resizable,
                    f = this.uiDialog.css("position"),
                    g = "string" == typeof e ? e : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: d.maxWidth,
                    maxHeight: d.maxHeight,
                    minWidth: d.minWidth,
                    minHeight: this._minHeight(),
                    handles: g,
                    start: function (d, e) {
                        a(this).addClass("ui-dialog-resizing"), c._blockFrames(), c._trigger("resizeStart", d, b(e))
                    },
                    resize: function (a, d) {
                        c._trigger("resize", a, b(d))
                    },
                    stop: function (e, f) {
                        var g = c.uiDialog.offset(),
                            h = g.left - c.document.scrollLeft(),
                            i = g.top - c.document.scrollTop();
                        d.height = c.uiDialog.height(), d.width = c.uiDialog.width(), d.position = {
                            my: "left top",
                            at: "left" + (h >= 0 ? "+" : "") + h + " top" + (i >= 0 ? "+" : "") + i,
                            of: c.window
                        }, a(this).removeClass("ui-dialog-resizing"), c._unblockFrames(), c._trigger("resizeStop", e, b(f))
                    }
                }).css("position", f)
            },
            _trackFocus: function () {
                this._on(this.widget(), {
                    focusin: function (b) {
                        this._makeFocusTarget(), this._focusedElement = a(b.target)
                    }
                })
            },
            _makeFocusTarget: function () {
                this._untrackInstance(), this._trackingInstances().unshift(this)
            },
            _untrackInstance: function () {
                var b = this._trackingInstances(),
                    c = a.inArray(this, b);
                c !== -1 && b.splice(c, 1)
            },
            _trackingInstances: function () {
                var a = this.document.data("ui-dialog-instances");
                return a || (a = [], this.document.data("ui-dialog-instances", a)), a
            },
            _minHeight: function () {
                var a = this.options;
                return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height)
            },
            _position: function () {
                var a = this.uiDialog.is(":visible");
                a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide()
            },
            _setOptions: function (b) {
                var c = this,
                    d = !1,
                    e = {};
                a.each(b, function (a, b) {
                    c._setOption(a, b), a in c.sizeRelatedOptions && (d = !0), a in c.resizableRelatedOptions && (e[a] = b)
                }), d && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", e)
            },
            _setOption: function (a, b) {
                var c, d, e = this.uiDialog;
                "dialogClass" === a && e.removeClass(this.options.dialogClass).addClass(b), "disabled" !== a && (this._super(a, b), "appendTo" === a && this.uiDialog.appendTo(this._appendTo()), "buttons" === a && this._createButtons(), "closeText" === a && this.uiDialogTitlebarClose.button({
                    label: "" + b
                }), "draggable" === a && (c = e.is(":data(ui-draggable)"), c && !b && e.draggable("destroy"), !c && b && this._makeDraggable()), "position" === a && this._position(), "resizable" === a && (d = e.is(":data(ui-resizable)"), d && !b && e.resizable("destroy"), d && "string" == typeof b && e.resizable("option", "handles", b), d || b === !1 || this._makeResizable()), "title" === a && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function () {
                var a, b, c, d = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({
                    height: "auto",
                    width: d.width
                }).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", "auto" === d.height ? this.element.css({
                    minHeight: b,
                    maxHeight: c,
                    height: "auto"
                }) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function () {
                this.iframeBlocks = this.document.find("iframe").map(function () {
                    var b = a(this);
                    return a("<div>").css({
                        position: "absolute",
                        width: b.outerWidth(),
                        height: b.outerHeight()
                    }).appendTo(b.parent()).offset(b.offset())[0]
                })
            },
            _unblockFrames: function () {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function (b) {
                return !!a(b.target).closest(".ui-dialog").length || !!a(b.target).closest(".ui-datepicker").length
            },
            _createOverlay: function () {
                if (this.options.modal) {
                    var b = !0;
                    this._delay(function () {
                        b = !1
                    }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                        focusin: function (a) {
                            b || this._allowInteraction(a) || (a.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                        }
                    }), this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                }
            },
            _destroyOverlay: function () {
                if (this.options.modal && this.overlay) {
                    var a = this.document.data("ui-dialog-overlays") - 1;
                    a ? this.document.data("ui-dialog-overlays", a) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
                }
            }
        });
        a.widget("ui.droppable", {
            version: "1.11.2",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function () {
                var b, c = this.options,
                    d = c.accept;
                this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function (a) {
                    return a.is(d)
                }, this.proportions = function () {
                    return arguments.length ? void (b = arguments[0]) : b ? b : b = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }, this._addToManager(c.scope), c.addClasses && this.element.addClass("ui-droppable")
            },
            _addToManager: function (b) {
                a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this)
            },
            _splice: function (a) {
                for (var b = 0; b < a.length; b++) a[b] === this && a.splice(b, 1)
            },
            _destroy: function () {
                var b = a.ui.ddmanager.droppables[this.options.scope];
                this._splice(b), this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function (b, c) {
                if ("accept" === b) this.accept = a.isFunction(c) ? c : function (a) {
                    return a.is(c)
                };
                else if ("scope" === b) {
                    var d = a.ui.ddmanager.droppables[this.options.scope];
                    this._splice(d), this._addToManager(c)
                }
                this._super(b, c)
            },
            _activate: function (b) {
                var c = a.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
            },
            _deactivate: function (b) {
                var c = a.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
            },
            _over: function (b) {
                var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
            },
            _out: function (b) {
                var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
            },
            _drop: function (b, c) {
                var d = c || a.ui.ddmanager.current,
                    e = !1;
                return !(!d || (d.currentItem || d.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                    var c = a(this).droppable("instance");
                    if (c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(c, {
                        offset: c.element.offset()
                    }), c.options.tolerance, b)) return e = !0, !1
                }), !e && (!!this.accept.call(this.element[0], d.currentItem || d.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element)))
            },
            ui: function (a) {
                return {
                    draggable: a.currentItem || a.element,
                    helper: a.helper,
                    position: a.position,
                    offset: a.positionAbs
                }
            }
        }), a.ui.intersect = function () {
            function a(a, b, c) {
                return a >= b && a < b + c
            }
            return function (b, c, d, e) {
                if (!c.offset) return !1;
                var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
                    g = (b.positionAbs || b.position.absolute).top + b.margins.top,
                    h = f + b.helperProportions.width,
                    i = g + b.helperProportions.height,
                    j = c.offset.left,
                    k = c.offset.top,
                    l = j + c.proportions().width,
                    m = k + c.proportions().height;
                switch (d) {
                    case "fit":
                        return j <= f && h <= l && k <= g && i <= m;
                    case "intersect":
                        return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;
                    case "pointer":
                        return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);
                    case "touch":
                        return (g >= k && g <= m || i >= k && i <= m || g < k && i > m) && (f >= j && f <= l || h >= j && h <= l || f < j && h > l);
                    default:
                        return !1
                }
            }
        }(), a.ui.ddmanager = {
            current: null,
            droppables: {
                default: []
            },
            prepareOffsets: function (b, c) {
                var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
                    g = c ? c.type : null,
                    h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
                a: for (d = 0; d < f.length; d++)
                    if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
                        for (e = 0; e < h.length; e++)
                            if (h[e] === f[d].element[0]) {
                                f[d].proportions().height = 0;
                                continue a
                            }
                        f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
                            width: f[d].element[0].offsetWidth,
                            height: f[d].element[0].offsetHeight
                        }))
                    }
            },
            drop: function (b, c) {
                var d = !1;
                return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function () {
                    this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
                }), d
            },
            dragStart: function (b, c) {
                b.element.parentsUntil("body").bind("scroll.droppable", function () {
                    b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
                })
            },
            drag: function (b, c) {
                b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance, c),
                            h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
                        h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
                            return a(this).droppable("instance").options.scope === e
                        }), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
                    }
                })
            },
            dragStop: function (b, c) {
                b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            }
        };
        var s = (a.ui.droppable, "ui-effects-"),
            t = a;
        a.effects = {
            effect: {}
        },
            function (a, b) {
                function c(a, b, c) {
                    var d = l[b.type] || {};
                    return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
                }

                function d(b) {
                    var c = j(),
                        d = c._rgba = [];
                    return b = b.toLowerCase(), o(i, function (a, e) {
                        var f, g = e.re.exec(b),
                            h = g && e.parse(g),
                            i = e.space || "rgba";
                        if (h) return f = c[i](h), c[k[i].cache] = f[k[i].cache], d = c._rgba = f._rgba, !1
                    }), d.length ? ("0,0,0,0" === d.join() && a.extend(d, f.transparent), c) : f[b]
                }

                function e(a, b, c) {
                    return c = (c + 1) % 1, 6 * c < 1 ? a + (b - a) * c * 6 : 2 * c < 1 ? b : 3 * c < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
                }
                var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    h = /^([\-+])=\s*(\d+\.?\d*)/,
                    i = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function (a) {
                            return [a[1], a[2], a[3], a[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function (a) {
                            return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function (a) {
                            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function (a) {
                            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function (a) {
                            return [a[1], a[2] / 100, a[3] / 100, a[4]]
                        }
                    }],
                    j = a.Color = function (b, c, d, e) {
                        return new a.Color.fn.parse(b, c, d, e)
                    },
                    k = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    l = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    m = j.support = {},
                    n = a("<p>")[0],
                    o = a.each;
                n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function (a, b) {
                    b.cache = "_" + a, b.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), j.fn = a.extend(j.prototype, {
                    parse: function (e, g, h, i) {
                        if (e === b) return this._rgba = [null, null, null, null], this;
                        (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                        var l = this,
                            m = a.type(e),
                            n = this._rgba = [];
                        return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function (a, b) {
                            n[b.idx] = c(e[b.idx], b)
                        }), this) : "object" === m ? (e instanceof j ? o(k, function (a, b) {
                            e[b.cache] && (l[b.cache] = e[b.cache].slice())
                        }) : o(k, function (b, d) {
                            var f = d.cache;
                            o(d.props, function (a, b) {
                                if (!l[f] && d.to) {
                                    if ("alpha" === a || null == e[a]) return;
                                    l[f] = d.to(l._rgba)
                                }
                                l[f][b.idx] = c(e[a], b, !0)
                            }), l[f] && a.inArray(null, l[f].slice(0, 3)) < 0 && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
                        }), this) : void 0
                    },
                    is: function (a) {
                        var b = j(a),
                            c = !0,
                            d = this;
                        return o(k, function (a, e) {
                            var f, g = b[e.cache];
                            return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], o(e.props, function (a, b) {
                                if (null != g[b.idx]) return c = g[b.idx] === f[b.idx]
                            })), c
                        }), c
                    },
                    _space: function () {
                        var a = [],
                            b = this;
                        return o(k, function (c, d) {
                            b[d.cache] && a.push(c)
                        }), a.pop()
                    },
                    transition: function (a, b) {
                        var d = j(a),
                            e = d._space(),
                            f = k[e],
                            g = 0 === this.alpha() ? j("transparent") : this,
                            h = g[f.cache] || f.to(g._rgba),
                            i = h.slice();
                        return d = d[f.cache], o(f.props, function (a, e) {
                            var f = e.idx,
                                g = h[f],
                                j = d[f],
                                k = l[e.type] || {};
                            null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
                        }), this[e](i)
                    },
                    blend: function (b) {
                        if (1 === this._rgba[3]) return this;
                        var c = this._rgba.slice(),
                            d = c.pop(),
                            e = j(b)._rgba;
                        return j(a.map(c, function (a, b) {
                            return (1 - d) * e[b] + d * a
                        }))
                    },
                    toRgbaString: function () {
                        var b = "rgba(",
                            c = a.map(this._rgba, function (a, b) {
                                return null == a ? b > 2 ? 1 : 0 : a
                            });
                        return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
                    },
                    toHslaString: function () {
                        var b = "hsla(",
                            c = a.map(this.hsla(), function (a, b) {
                                return null == a && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(100 * a) + "%"), a
                            });
                        return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
                    },
                    toHexString: function (b) {
                        var c = this._rgba.slice(),
                            d = c.pop();
                        return b && c.push(~~(255 * d)), "#" + a.map(c, function (a) {
                            return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                        }).join("")
                    },
                    toString: function () {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), j.fn.parse.prototype = j.fn, k.hsla.to = function (a) {
                    if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                    var b, c, d = a[0] / 255,
                        e = a[1] / 255,
                        f = a[2] / 255,
                        g = a[3],
                        h = Math.max(d, e, f),
                        i = Math.min(d, e, f),
                        j = h - i,
                        k = h + i,
                        l = .5 * k;
                    return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : l <= .5 ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
                }, k.hsla.from = function (a) {
                    if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                    var b = a[0] / 360,
                        c = a[1],
                        d = a[2],
                        f = a[3],
                        g = d <= .5 ? d * (1 + c) : d + c - d * c,
                        h = 2 * d - g;
                    return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
                }, o(k, function (d, e) {
                    var f = e.props,
                        g = e.cache,
                        i = e.to,
                        k = e.from;
                    j.fn[d] = function (d) {
                        if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                        var e, h = a.type(d),
                            l = "array" === h || "object" === h ? d : arguments,
                            m = this[g].slice();
                        return o(f, function (a, b) {
                            var d = l["object" === h ? a : b.idx];
                            null == d && (d = m[b.idx]), m[b.idx] = c(d, b)
                        }), k ? (e = j(k(m)), e[g] = m, e) : j(m)
                    }, o(f, function (b, c) {
                        j.fn[b] || (j.fn[b] = function (e) {
                            var f, g = a.type(e),
                                i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
                                j = this[i](),
                                k = j[c.idx];
                            return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
                        })
                    })
                }), j.hook = function (b) {
                    var c = b.split(" ");
                    o(c, function (b, c) {
                        a.cssHooks[c] = {
                            set: function (b, e) {
                                var f, g, h = "";
                                if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                                    if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                        for (g = "backgroundColor" === c ? b.parentNode : b;
                                            ("" === h || "transparent" === h) && g && g.style;) try {
                                                h = a.css(g, "backgroundColor"), g = g.parentNode
                                            } catch (a) { }
                                        e = e.blend(h && "transparent" !== h ? h : "_default")
                                    }
                                    e = e.toRgbaString()
                                }
                                try {
                                    b.style[c] = e
                                } catch (a) { }
                            }
                        }, a.fx.step[c] = function (b) {
                            b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
                        }
                    })
                }, j.hook(g), a.cssHooks.borderColor = {
                    expand: function (a) {
                        var b = {};
                        return o(["Top", "Right", "Bottom", "Left"], function (c, d) {
                            b["border" + d + "Color"] = a
                        }), b
                    }
                }, f = a.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(t),
            function () {
                function b(b) {
                    var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
                        f = {};
                    if (e && e.length && e[0] && e[e[0]])
                        for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
                    else
                        for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
                    return f
                }

                function c(b, c) {
                    var d, f, g = {};
                    for (d in c) f = c[d], b[d] !== f && (e[d] || !a.fx.step[d] && isNaN(parseFloat(f)) || (g[d] = f));
                    return g
                }
                var d = ["add", "remove", "toggle"],
                    e = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (b, c) {
                    a.fx.step[c] = function (a) {
                        ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (t.style(a.elem, c, a.end), a.setAttr = !0)
                    }
                }), a.fn.addBack || (a.fn.addBack = function (a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }), a.effects.animateClass = function (e, f, g, h) {
                    var i = a.speed(f, g, h);
                    return this.queue(function () {
                        var f, g = a(this),
                            h = g.attr("class") || "",
                            j = i.children ? g.find("*").addBack() : g;
                        j = j.map(function () {
                            var c = a(this);
                            return {
                                el: c,
                                start: b(this)
                            }
                        }), f = function () {
                            a.each(d, function (a, b) {
                                e[b] && g[b + "Class"](e[b])
                            })
                        }, f(), j = j.map(function () {
                            return this.end = b(this.el[0]), this.diff = c(this.start, this.end), this
                        }), g.attr("class", h), j = j.map(function () {
                            var b = this,
                                c = a.Deferred(),
                                d = a.extend({}, i, {
                                    queue: !1,
                                    complete: function () {
                                        c.resolve(b)
                                    }
                                });
                            return this.el.animate(this.diff, d), c.promise()
                        }), a.when.apply(a, j.get()).done(function () {
                            f(), a.each(arguments, function () {
                                var b = this.el;
                                a.each(this.diff, function (a) {
                                    b.css(a, "")
                                })
                            }), i.complete.call(g[0])
                        })
                    })
                }, a.fn.extend({
                    addClass: function (b) {
                        return function (c, d, e, f) {
                            return d ? a.effects.animateClass.call(this, {
                                add: c
                            }, d, e, f) : b.apply(this, arguments)
                        }
                    }(a.fn.addClass),
                    removeClass: function (b) {
                        return function (c, d, e, f) {
                            return arguments.length > 1 ? a.effects.animateClass.call(this, {
                                remove: c
                            }, d, e, f) : b.apply(this, arguments)
                        }
                    }(a.fn.removeClass),
                    toggleClass: function (b) {
                        return function (c, d, e, f, g) {
                            return "boolean" == typeof d || void 0 === d ? e ? a.effects.animateClass.call(this, d ? {
                                add: c
                            } : {
                                    remove: c
                                }, e, f, g) : b.apply(this, arguments) : a.effects.animateClass.call(this, {
                                    toggle: c
                                }, d, e, f)
                        }
                    }(a.fn.toggleClass),
                    switchClass: function (b, c, d, e, f) {
                        return a.effects.animateClass.call(this, {
                            add: c,
                            remove: b
                        }, d, e, f)
                    }
                })
            }(),
            function () {
                function b(b, c, d, e) {
                    return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                        effect: b
                    }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
                }

                function c(b) {
                    return !(b && "number" != typeof b && !a.fx.speeds[b]) || ("string" == typeof b && !a.effects.effect[b] || (!!a.isFunction(b) || "object" == typeof b && !b.effect))
                }
                a.extend(a.effects, {
                    version: "1.11.2",
                    save: function (a, b) {
                        for (var c = 0; c < b.length; c++) null !== b[c] && a.data(s + b[c], a[0].style[b[c]])
                    },
                    restore: function (a, b) {
                        var c, d;
                        for (d = 0; d < b.length; d++) null !== b[d] && (c = a.data(s + b[d]), void 0 === c && (c = ""), a.css(b[d], c))
                    },
                    setMode: function (a, b) {
                        return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
                    },
                    getBaseline: function (a, b) {
                        var c, d;
                        switch (a[0]) {
                            case "top":
                                c = 0;
                                break;
                            case "middle":
                                c = .5;
                                break;
                            case "bottom":
                                c = 1;
                                break;
                            default:
                                c = a[0] / b.height
                        }
                        switch (a[1]) {
                            case "left":
                                d = 0;
                                break;
                            case "center":
                                d = .5;
                                break;
                            case "right":
                                d = 1;
                                break;
                            default:
                                d = a[1] / b.width
                        }
                        return {
                            x: d,
                            y: c
                        }
                    },
                    createWrapper: function (b) {
                        if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                        var c = {
                            width: b.outerWidth(!0),
                            height: b.outerHeight(!0),
                            float: b.css("float")
                        },
                            d = a("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            e = {
                                width: b.width(),
                                height: b.height()
                            },
                            f = document.activeElement;
                        try {
                            f.id
                        } catch (a) {
                            f = document.body
                        }
                        return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
                            position: "relative"
                        }), b.css({
                            position: "relative"
                        })) : (a.extend(c, {
                            position: b.css("position"),
                            zIndex: b.css("z-index")
                        }), a.each(["top", "left", "bottom", "right"], function (a, d) {
                            c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
                        }), b.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), b.css(e), d.css(c).show()
                    },
                    removeWrapper: function (b) {
                        var c = document.activeElement;
                        return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
                    },
                    setTransition: function (b, c, d, e) {
                        return e = e || {}, a.each(c, function (a, c) {
                            var f = b.cssUnit(c);
                            f[0] > 0 && (e[c] = f[0] * d + f[1])
                        }), e
                    }
                }), a.fn.extend({
                    effect: function () {
                        function c(b) {
                            function c() {
                                a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b()
                            }
                            var e = a(this),
                                f = d.complete,
                                h = d.mode;
                            (e.is(":hidden") ? "hide" === h : "show" === h) ? (e[h](), c()) : g.call(e[0], d, c)
                        }
                        var d = b.apply(this, arguments),
                            e = d.mode,
                            f = d.queue,
                            g = a.effects.effect[d.effect];
                        return a.fx.off || !g ? e ? this[e](d.duration, d.complete) : this.each(function () {
                            d.complete && d.complete.call(this)
                        }) : f === !1 ? this.each(c) : this.queue(f || "fx", c)
                    },
                    show: function (a) {
                        return function (d) {
                            if (c(d)) return a.apply(this, arguments);
                            var e = b.apply(this, arguments);
                            return e.mode = "show", this.effect.call(this, e)
                        }
                    }(a.fn.show),
                    hide: function (a) {
                        return function (d) {
                            if (c(d)) return a.apply(this, arguments);
                            var e = b.apply(this, arguments);
                            return e.mode = "hide", this.effect.call(this, e)
                        }
                    }(a.fn.hide),
                    toggle: function (a) {
                        return function (d) {
                            if (c(d) || "boolean" == typeof d) return a.apply(this, arguments);
                            var e = b.apply(this, arguments);
                            return e.mode = "toggle", this.effect.call(this, e)
                        }
                    }(a.fn.toggle),
                    cssUnit: function (b) {
                        var c = this.css(b),
                            d = [];
                        return a.each(["em", "px", "%", "pt"], function (a, b) {
                            c.indexOf(b) > 0 && (d = [parseFloat(c), b])
                        }), d
                    }
                })
            }(),
            function () {
                var b = {};
                a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (a, c) {
                    b[c] = function (b) {
                        return Math.pow(b, a + 2)
                    }
                }), a.extend(b, {
                    Sine: function (a) {
                        return 1 - Math.cos(a * Math.PI / 2)
                    },
                    Circ: function (a) {
                        return 1 - Math.sqrt(1 - a * a)
                    },
                    Elastic: function (a) {
                        return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function (a) {
                        return a * a * (3 * a - 2)
                    },
                    Bounce: function (a) {
                        for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
                    }
                }), a.each(b, function (b, c) {
                    a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function (a) {
                        return 1 - c(1 - a)
                    }, a.easing["easeInOut" + b] = function (a) {
                        return a < .5 ? c(2 * a) / 2 : 1 - c(a * -2 + 2) / 2
                    }
                })
            }();
        a.effects, a.effects.effect.blind = function (b, c) {
            var d, e, f, g = a(this),
                h = /up|down|vertical/,
                i = /up|left|vertical|horizontal/,
                j = ["position", "top", "bottom", "left", "right", "height", "width"],
                k = a.effects.setMode(g, b.mode || "hide"),
                l = b.direction || "up",
                m = h.test(l),
                n = m ? "height" : "width",
                o = m ? "top" : "left",
                p = i.test(l),
                q = {},
                r = "show" === k;
            g.parent().is(".ui-effects-wrapper") ? a.effects.save(g.parent(), j) : a.effects.save(g, j), g.show(), d = a.effects.createWrapper(g).css({
                overflow: "hidden"
            }), e = d[n](), f = parseFloat(d.css(o)) || 0, q[n] = r ? e : 0, p || (g.css(m ? "bottom" : "right", 0).css(m ? "top" : "left", "auto").css({
                position: "absolute"
            }), q[o] = r ? f : e + f), r && (d.css(n, 0), p || d.css(o, f + e)), d.animate(q, {
                duration: b.duration,
                easing: b.easing,
                queue: !1,
                complete: function () {
                    "hide" === k && g.hide(), a.effects.restore(g, j), a.effects.removeWrapper(g), c()
                }
            })
        }, a.effects.effect.bounce = function (b, c) {
            var d, e, f, g = a(this),
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                i = a.effects.setMode(g, b.mode || "effect"),
                j = "hide" === i,
                k = "show" === i,
                l = b.direction || "up",
                m = b.distance,
                n = b.times || 5,
                o = 2 * n + (k || j ? 1 : 0),
                p = b.duration / o,
                q = b.easing,
                r = "up" === l || "down" === l ? "top" : "left",
                s = "up" === l || "left" === l,
                t = g.queue(),
                u = t.length;
            for ((k || j) && h.push("opacity"), a.effects.save(g, h), g.show(), a.effects.createWrapper(g), m || (m = g["top" === r ? "outerHeight" : "outerWidth"]() / 3), k && (f = {
                opacity: 1
            }, f[r] = 0, g.css("opacity", 0).css(r, s ? 2 * -m : 2 * m).animate(f, p, q)), j && (m /= Math.pow(2, n - 1)), f = {}, f[r] = 0, d = 0; d < n; d++) e = {}, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q).animate(f, p, q), m = j ? 2 * m : m / 2;
            j && (e = {
                opacity: 0
            }, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q)), g.queue(function () {
                j && g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
            }), u > 1 && t.splice.apply(t, [1, 0].concat(t.splice(u, o + 1))), g.dequeue()
        }, a.effects.effect.clip = function (b, c) {
            var d, e, f, g = a(this),
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                i = a.effects.setMode(g, b.mode || "hide"),
                j = "show" === i,
                k = b.direction || "vertical",
                l = "vertical" === k,
                m = l ? "height" : "width",
                n = l ? "top" : "left",
                o = {};
            a.effects.save(g, h), g.show(), d = a.effects.createWrapper(g).css({
                overflow: "hidden"
            }), e = "IMG" === g[0].tagName ? d : g, f = e[m](), j && (e.css(m, 0), e.css(n, f / 2)), o[m] = j ? f : 0, o[n] = j ? 0 : f / 2, e.animate(o, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function () {
                    j || g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
                }
            })
        }, a.effects.effect.drop = function (b, c) {
            var d, e = a(this),
                f = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                g = a.effects.setMode(e, b.mode || "hide"),
                h = "show" === g,
                i = b.direction || "left",
                j = "up" === i || "down" === i ? "top" : "left",
                k = "up" === i || "left" === i ? "pos" : "neg",
                l = {
                    opacity: h ? 1 : 0
                };
            a.effects.save(e, f), e.show(), a.effects.createWrapper(e), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0) / 2, h && e.css("opacity", 0).css(j, "pos" === k ? -d : d), l[j] = (h ? "pos" === k ? "+=" : "-=" : "pos" === k ? "-=" : "+=") + d, e.animate(l, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function () {
                    "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
                }
            })
        }, a.effects.effect.explode = function (b, c) {
            function d() {
                t.push(this), t.length === l * m && e()
            }

            function e() {
                n.css({
                    visibility: "visible"
                }), a(t).remove(), p || n.hide(), c()
            }
            var f, g, h, i, j, k, l = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
                m = l,
                n = a(this),
                o = a.effects.setMode(n, b.mode || "hide"),
                p = "show" === o,
                q = n.show().css("visibility", "hidden").offset(),
                r = Math.ceil(n.outerWidth() / m),
                s = Math.ceil(n.outerHeight() / l),
                t = [];
            for (f = 0; f < l; f++)
                for (i = q.top + f * s, k = f - (l - 1) / 2, g = 0; g < m; g++) h = q.left + g * r, j = g - (m - 1) / 2, n.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -g * r,
                    top: -f * s
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: r,
                    height: s,
                    left: h + (p ? j * r : 0),
                    top: i + (p ? k * s : 0),
                    opacity: p ? 0 : 1
                }).animate({
                    left: h + (p ? 0 : j * r),
                    top: i + (p ? 0 : k * s),
                    opacity: p ? 1 : 0
                }, b.duration || 500, b.easing, d)
        }, a.effects.effect.fade = function (b, c) {
            var d = a(this),
                e = a.effects.setMode(d, b.mode || "toggle");
            d.animate({
                opacity: e
            }, {
                    queue: !1,
                    duration: b.duration,
                    easing: b.easing,
                    complete: c
                })
        }, a.effects.effect.fold = function (b, c) {
            var d, e, f = a(this),
                g = ["position", "top", "bottom", "left", "right", "height", "width"],
                h = a.effects.setMode(f, b.mode || "hide"),
                i = "show" === h,
                j = "hide" === h,
                k = b.size || 15,
                l = /([0-9]+)%/.exec(k),
                m = !!b.horizFirst,
                n = i !== m,
                o = n ? ["width", "height"] : ["height", "width"],
                p = b.duration / 2,
                q = {},
                r = {};
            a.effects.save(f, g), f.show(), d = a.effects.createWrapper(f).css({
                overflow: "hidden"
            }), e = n ? [d.width(), d.height()] : [d.height(), d.width()], l && (k = parseInt(l[1], 10) / 100 * e[j ? 0 : 1]), i && d.css(m ? {
                height: 0,
                width: k
            } : {
                    height: k,
                    width: 0
                }), q[o[0]] = i ? e[0] : k, r[o[1]] = i ? e[1] : 0, d.animate(q, p, b.easing).animate(r, p, b.easing, function () {
                    j && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
                })
        }, a.effects.effect.highlight = function (b, c) {
            var d = a(this),
                e = ["backgroundImage", "backgroundColor", "opacity"],
                f = a.effects.setMode(d, b.mode || "show"),
                g = {
                    backgroundColor: d.css("backgroundColor")
                };
            "hide" === f && (g.opacity = 0), a.effects.save(d, e), d.show().css({
                backgroundImage: "none",
                backgroundColor: b.color || "#ffff99"
            }).animate(g, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function () {
                    "hide" === f && d.hide(), a.effects.restore(d, e), c()
                }
            })
        }, a.effects.effect.size = function (b, c) {
            var d, e, f, g = a(this),
                h = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                j = ["width", "height", "overflow"],
                k = ["fontSize"],
                l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                m = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                n = a.effects.setMode(g, b.mode || "effect"),
                o = b.restore || "effect" !== n,
                p = b.scale || "both",
                q = b.origin || ["middle", "center"],
                r = g.css("position"),
                s = o ? h : i,
                t = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === n && g.show(), d = {
                height: g.height(),
                width: g.width(),
                outerHeight: g.outerHeight(),
                outerWidth: g.outerWidth()
            }, "toggle" === b.mode && "show" === n ? (g.from = b.to || t, g.to = b.from || d) : (g.from = b.from || ("show" === n ? t : d), g.to = b.to || ("hide" === n ? t : d)), f = {
                from: {
                    y: g.from.height / d.height,
                    x: g.from.width / d.width
                },
                to: {
                    y: g.to.height / d.height,
                    x: g.to.width / d.width
                }
            }, "box" !== p && "both" !== p || (f.from.y !== f.to.y && (s = s.concat(l), g.from = a.effects.setTransition(g, l, f.from.y, g.from), g.to = a.effects.setTransition(g, l, f.to.y, g.to)), f.from.x !== f.to.x && (s = s.concat(m), g.from = a.effects.setTransition(g, m, f.from.x, g.from), g.to = a.effects.setTransition(g, m, f.to.x, g.to))), "content" !== p && "both" !== p || f.from.y !== f.to.y && (s = s.concat(k).concat(j), g.from = a.effects.setTransition(g, k, f.from.y, g.from), g.to = a.effects.setTransition(g, k, f.to.y, g.to)), a.effects.save(g, s), g.show(), a.effects.createWrapper(g), g.css("overflow", "hidden").css(g.from), q && (e = a.effects.getBaseline(q, d), g.from.top = (d.outerHeight - g.outerHeight()) * e.y, g.from.left = (d.outerWidth - g.outerWidth()) * e.x, g.to.top = (d.outerHeight - g.to.outerHeight) * e.y, g.to.left = (d.outerWidth - g.to.outerWidth) * e.x), g.css(g.from), "content" !== p && "both" !== p || (l = l.concat(["marginTop", "marginBottom"]).concat(k), m = m.concat(["marginLeft", "marginRight"]), j = h.concat(l).concat(m), g.find("*[width]").each(function () {
                var c = a(this),
                    d = {
                        height: c.height(),
                        width: c.width(),
                        outerHeight: c.outerHeight(),
                        outerWidth: c.outerWidth()
                    };
                o && a.effects.save(c, j), c.from = {
                    height: d.height * f.from.y,
                    width: d.width * f.from.x,
                    outerHeight: d.outerHeight * f.from.y,
                    outerWidth: d.outerWidth * f.from.x
                }, c.to = {
                    height: d.height * f.to.y,
                    width: d.width * f.to.x,
                    outerHeight: d.height * f.to.y,
                    outerWidth: d.width * f.to.x
                }, f.from.y !== f.to.y && (c.from = a.effects.setTransition(c, l, f.from.y, c.from), c.to = a.effects.setTransition(c, l, f.to.y, c.to)), f.from.x !== f.to.x && (c.from = a.effects.setTransition(c, m, f.from.x, c.from), c.to = a.effects.setTransition(c, m, f.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function () {
                    o && a.effects.restore(c, j)
                })
            })), g.animate(g.to, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function () {
                    0 === g.to.opacity && g.css("opacity", g.from.opacity), "hide" === n && g.hide(), a.effects.restore(g, s), o || ("static" === r ? g.css({
                        position: "relative",
                        top: g.to.top,
                        left: g.to.left
                    }) : a.each(["top", "left"], function (a, b) {
                        g.css(b, function (b, c) {
                            var d = parseInt(c, 10),
                                e = a ? g.to.left : g.to.top;
                            return "auto" === c ? e + "px" : d + e + "px"
                        })
                    })), a.effects.removeWrapper(g), c()
                }
            })
        }, a.effects.effect.scale = function (b, c) {
            var d = a(this),
                e = a.extend(!0, {}, b),
                f = a.effects.setMode(d, b.mode || "effect"),
                g = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === f ? 0 : 100),
                h = b.direction || "both",
                i = b.origin,
                j = {
                    height: d.height(),
                    width: d.width(),
                    outerHeight: d.outerHeight(),
                    outerWidth: d.outerWidth()
                },
                k = {
                    y: "horizontal" !== h ? g / 100 : 1,
                    x: "vertical" !== h ? g / 100 : 1
                };
            e.effect = "size", e.queue = !1, e.complete = c, "effect" !== f && (e.origin = i || ["middle", "center"], e.restore = !0), e.from = b.from || ("show" === f ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : j), e.to = {
                height: j.height * k.y,
                width: j.width * k.x,
                outerHeight: j.outerHeight * k.y,
                outerWidth: j.outerWidth * k.x
            }, e.fade && ("show" === f && (e.from.opacity = 0, e.to.opacity = 1), "hide" === f && (e.from.opacity = 1, e.to.opacity = 0)), d.effect(e)
        }, a.effects.effect.puff = function (b, c) {
            var d = a(this),
                e = a.effects.setMode(d, b.mode || "hide"),
                f = "hide" === e,
                g = parseInt(b.percent, 10) || 150,
                h = g / 100,
                i = {
                    height: d.height(),
                    width: d.width(),
                    outerHeight: d.outerHeight(),
                    outerWidth: d.outerWidth()
                };
            a.extend(b, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: e,
                complete: c,
                percent: f ? g : 100,
                from: f ? i : {
                    height: i.height * h,
                    width: i.width * h,
                    outerHeight: i.outerHeight * h,
                    outerWidth: i.outerWidth * h
                }
            }), d.effect(b)
        }, a.effects.effect.pulsate = function (b, c) {
            var d, e = a(this),
                f = a.effects.setMode(e, b.mode || "show"),
                g = "show" === f,
                h = "hide" === f,
                i = g || "hide" === f,
                j = 2 * (b.times || 5) + (i ? 1 : 0),
                k = b.duration / j,
                l = 0,
                m = e.queue(),
                n = m.length;
            for (!g && e.is(":visible") || (e.css("opacity", 0).show(), l = 1), d = 1; d < j; d++) e.animate({
                opacity: l
            }, k, b.easing), l = 1 - l;
            e.animate({
                opacity: l
            }, k, b.easing), e.queue(function () {
                h && e.hide(), c()
            }), n > 1 && m.splice.apply(m, [1, 0].concat(m.splice(n, j + 1))), e.dequeue()
        }, a.effects.effect.shake = function (b, c) {
            var d, e = a(this),
                f = ["position", "top", "bottom", "left", "right", "height", "width"],
                g = a.effects.setMode(e, b.mode || "effect"),
                h = b.direction || "left",
                i = b.distance || 20,
                j = b.times || 3,
                k = 2 * j + 1,
                l = Math.round(b.duration / k),
                m = "up" === h || "down" === h ? "top" : "left",
                n = "up" === h || "left" === h,
                o = {},
                p = {},
                q = {},
                r = e.queue(),
                s = r.length;
            for (a.effects.save(e, f), e.show(), a.effects.createWrapper(e), o[m] = (n ? "-=" : "+=") + i, p[m] = (n ? "+=" : "-=") + 2 * i, q[m] = (n ? "-=" : "+=") + 2 * i, e.animate(o, l, b.easing), d = 1; d < j; d++) e.animate(p, l, b.easing).animate(q, l, b.easing);
            e.animate(p, l, b.easing).animate(o, l / 2, b.easing).queue(function () {
                "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
            }), s > 1 && r.splice.apply(r, [1, 0].concat(r.splice(s, k + 1))), e.dequeue()
        }, a.effects.effect.slide = function (b, c) {
            var d, e = a(this),
                f = ["position", "top", "bottom", "left", "right", "width", "height"],
                g = a.effects.setMode(e, b.mode || "show"),
                h = "show" === g,
                i = b.direction || "left",
                j = "up" === i || "down" === i ? "top" : "left",
                k = "up" === i || "left" === i,
                l = {};
            a.effects.save(e, f), e.show(), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(e).css({
                overflow: "hidden"
            }), h && e.css(j, k ? isNaN(d) ? "-" + d : -d : d), l[j] = (h ? k ? "+=" : "-=" : k ? "-=" : "+=") + d, e.animate(l, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function () {
                    "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
                }
            })
        }, a.effects.effect.transfer = function (b, c) {
            var d = a(this),
                e = a(b.to),
                f = "fixed" === e.css("position"),
                g = a("body"),
                h = f ? g.scrollTop() : 0,
                i = f ? g.scrollLeft() : 0,
                j = e.offset(),
                k = {
                    top: j.top - h,
                    left: j.left - i,
                    height: e.innerHeight(),
                    width: e.innerWidth()
                },
                l = d.offset(),
                m = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(b.className).css({
                    top: l.top - h,
                    left: l.left - i,
                    height: d.innerHeight(),
                    width: d.innerWidth(),
                    position: f ? "fixed" : "absolute"
                }).animate(k, b.duration, b.easing, function () {
                    m.remove(), c()
                })
        }, a.widget("ui.progressbar", {
            version: "1.11.2",
            options: {
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function () {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
            },
            _destroy: function () {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
            },
            value: function (a) {
                return void 0 === a ? this.options.value : (this.options.value = this._constrainedValue(a), void this._refreshValue())
            },
            _constrainedValue: function (a) {
                return void 0 === a && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, a))
            },
            _setOptions: function (a) {
                var b = a.value;
                delete a.value, this._super(a), this.options.value = this._constrainedValue(b), this._refreshValue()
            },
            _setOption: function (a, b) {
                "max" === a && (b = Math.max(this.min, b)), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this._super(a, b)
            },
            _percentage: function () {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function () {
                var b = this.options.value,
                    c = this._percentage();
                this.valueDiv.toggle(this.indeterminate || b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(c.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": b
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, this._trigger("change")), b === this.options.max && this._trigger("complete")
            }
        }), a.widget("ui.selectable", a.ui.mouse, {
            version: "1.11.2",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function () {
                var b, c = this;
                this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                    b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function () {
                        var b = a(this),
                            c = b.offset();
                        a.data(this, "selectable-item", {
                            element: this,
                            $element: b,
                            left: c.left,
                            top: c.top,
                            right: c.left + b.outerWidth(),
                            bottom: c.top + b.outerHeight(),
                            startselected: !1,
                            selected: b.hasClass("ui-selected"),
                            selecting: b.hasClass("ui-selecting"),
                            unselecting: b.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
            },
            _destroy: function () {
                this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
            },
            _mouseStart: function (b) {
                var c = this,
                    d = this.options;
                this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
                    left: b.pageX,
                    top: b.pageY,
                    width: 0,
                    height: 0
                }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                    var d = a.data(this, "selectable-item");
                    d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
                        unselecting: d.element
                    }))
                }), a(b.target).parents().addBack().each(function () {
                    var d, e = a.data(this, "selectable-item");
                    if (e) return d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
                        selecting: e.element
                    }) : c._trigger("unselecting", b, {
                        unselecting: e.element
                    }), !1
                }))
            },
            _mouseDrag: function (b) {
                if (this.dragged = !0, !this.options.disabled) {
                    var c, d = this,
                        e = this.options,
                        f = this.opos[0],
                        g = this.opos[1],
                        h = b.pageX,
                        i = b.pageY;
                    return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
                        left: f,
                        top: g,
                        width: h - f,
                        height: i - g
                    }), this.selectees.each(function () {
                        var c = a.data(this, "selectable-item"),
                            j = !1;
                        c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || c.right < f || c.top > i || c.bottom < g) : "fit" === e.tolerance && (j = c.left > f && c.right < h && c.top > g && c.bottom < i), j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
                            selecting: c.element
                        }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
                            unselecting: c.element
                        }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
                            unselecting: c.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function (b) {
                var c = this;
                return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function () {
                    var d = a.data(this, "selectable-item");
                    d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
                        unselected: d.element
                    })
                }), a(".ui-selecting", this.element[0]).each(function () {
                    var d = a.data(this, "selectable-item");
                    d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
                        selected: d.element
                    })
                }), this._trigger("stop", b), this.helper.remove(), !1
            }
        }), a.widget("ui.selectmenu", {
            version: "1.11.2",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                disabled: null,
                icons: {
                    button: "ui-icon-triangle-1-s"
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                width: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null
            },
            _create: function () {
                var a = this.element.uniqueId().attr("id");
                this.ids = {
                    element: a,
                    button: a + "-button",
                    menu: a + "-menu"
                }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
            },
            _drawButton: function () {
                var b = this,
                    c = this.element.attr("tabindex");
                this.label = a("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                    click: function (a) {
                        this.button.focus(), a.preventDefault()
                    }
                }), this.element.hide(), this.button = a("<span>", {
                    class: "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                    tabindex: c || this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true"
                }).insertAfter(this.element), a("<span>", {
                    class: "ui-icon " + this.options.icons.button
                }).prependTo(this.button), this.buttonText = a("<span>", {
                    class: "ui-selectmenu-text"
                }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
                    b.menuItems || b._refreshMenu()
                }), this._hoverable(this.button), this._focusable(this.button)
            },
            _drawMenu: function () {
                var b = this;
                this.menu = a("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu
                }), this.menuWrap = a("<div>", {
                    class: "ui-selectmenu-menu ui-front"
                }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                    role: "listbox",
                    select: function (a, c) {
                        a.preventDefault(), b._setSelection(), b._select(c.item.data("ui-selectmenu-item"), a)
                    },
                    focus: function (a, c) {
                        var d = c.item.data("ui-selectmenu-item");
                        null != b.focusIndex && d.index !== b.focusIndex && (b._trigger("focus", a, {
                            item: d
                        }), b.isOpen || b._select(d, a)), b.focusIndex = d.index, b.button.attr("aria-activedescendant", b.menuItems.eq(d.index).attr("id"))
                    }
                }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
                    return !1
                }, this.menuInstance._isDivider = function () {
                    return !1
                }
            },
            refresh: function () {
                this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
            },
            _refreshMenu: function () {
                this.menu.empty();
                var a, b = this.element.find("option");
                b.length && (this._parseOptions(b), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), a = this._getSelectedItem(), this.menuInstance.focus(null, a), this._setAria(a.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
            },
            open: function (a) {
                this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", a))
            },
            _position: function () {
                this.menuWrap.position(a.extend({
                    of: this.button
                }, this.options.position))
            },
            close: function (a) {
                this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", a))
            },
            widget: function () {
                return this.button
            },
            menuWidget: function () {
                return this.menu
            },
            _renderMenu: function (b, c) {
                var d = this,
                    e = "";
                a.each(c, function (c, f) {
                    f.optgroup !== e && (a("<li>", {
                        class: "ui-selectmenu-optgroup ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                        text: f.optgroup
                    }).appendTo(b), e = f.optgroup), d._renderItemData(b, f)
                })
            },
            _renderItemData: function (a, b) {
                return this._renderItem(a, b).data("ui-selectmenu-item", b)
            },
            _renderItem: function (b, c) {
                var d = a("<li>");
                return c.disabled && d.addClass("ui-state-disabled"), this._setText(d, c.label), d.appendTo(b)
            },
            _setText: function (a, b) {
                b ? a.text(b) : a.html("&#160;")
            },
            _move: function (a, b) {
                var c, d, e = ".ui-menu-item";
                this.isOpen ? c = this.menuItems.eq(this.focusIndex) : (c = this.menuItems.eq(this.element[0].selectedIndex), e += ":not(.ui-state-disabled)"), d = "first" === a || "last" === a ? c["first" === a ? "prevAll" : "nextAll"](e).eq(-1) : c[a + "All"](e).eq(0), d.length && this.menuInstance.focus(b, d)
            },
            _getSelectedItem: function () {
                return this.menuItems.eq(this.element[0].selectedIndex)
            },
            _toggle: function (a) {
                this[this.isOpen ? "close" : "open"](a)
            },
            _setSelection: function () {
                var a;
                this.range && (window.getSelection ? (a = window.getSelection(), a.removeAllRanges(), a.addRange(this.range)) : this.range.select(), this.button.focus())
            },
            _documentClick: {
                mousedown: function (b) {
                    this.isOpen && (a(b.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(b))
                }
            },
            _buttonEvents: {
                mousedown: function () {
                    var a;
                    window.getSelection ? (a = window.getSelection(), a.rangeCount && (this.range = a.getRangeAt(0))) : this.range = document.selection.createRange()
                },
                click: function (a) {
                    this._setSelection(), this._toggle(a)
                },
                keydown: function (b) {
                    var c = !0;
                    switch (b.keyCode) {
                        case a.ui.keyCode.TAB:
                        case a.ui.keyCode.ESCAPE:
                            this.close(b), c = !1;
                            break;
                        case a.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(b);
                            break;
                        case a.ui.keyCode.UP:
                            b.altKey ? this._toggle(b) : this._move("prev", b);
                            break;
                        case a.ui.keyCode.DOWN:
                            b.altKey ? this._toggle(b) : this._move("next", b);
                            break;
                        case a.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(b) : this._toggle(b);
                            break;
                        case a.ui.keyCode.LEFT:
                            this._move("prev", b);
                            break;
                        case a.ui.keyCode.RIGHT:
                            this._move("next", b);
                            break;
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.PAGE_UP:
                            this._move("first", b);
                            break;
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_DOWN:
                            this._move("last", b);
                            break;
                        default:
                            this.menu.trigger(b), c = !1
                    }
                    c && b.preventDefault()
                }
            },
            _selectFocusedItem: function (a) {
                var b = this.menuItems.eq(this.focusIndex);
                b.hasClass("ui-state-disabled") || this._select(b.data("ui-selectmenu-item"), a)
            },
            _select: function (a, b) {
                var c = this.element[0].selectedIndex;
                this.element[0].selectedIndex = a.index, this._setText(this.buttonText, a.label), this._setAria(a), this._trigger("select", b, {
                    item: a
                }), a.index !== c && this._trigger("change", b, {
                    item: a
                }), this.close(b)
            },
            _setAria: function (a) {
                var b = this.menuItems.eq(a.index).attr("id");
                this.button.attr({
                    "aria-labelledby": b,
                    "aria-activedescendant": b
                }), this.menu.attr("aria-activedescendant", b)
            },
            _setOption: function (a, b) {
                "icons" === a && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(b.button), this._super(a, b), "appendTo" === a && this.menuWrap.appendTo(this._appendTo()), "disabled" === a && (this.menuInstance.option("disabled", b), this.button.toggleClass("ui-state-disabled", b).attr("aria-disabled", b), this.element.prop("disabled", b), b ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === a && this._resizeButton()
            },
            _appendTo: function () {
                var b = this.options.appendTo;
                return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front")), b.length || (b = this.document[0].body), b
            },
            _toggleAttr: function () {
                this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
            },
            _resizeButton: function () {
                var a = this.options.width;
                a || (a = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(a)
            },
            _resizeMenu: function () {
                this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
            },
            _getCreateOptions: function () {
                return {
                    disabled: this.element.prop("disabled")
                }
            },
            _parseOptions: function (b) {
                var c = [];
                b.each(function (b, d) {
                    var e = a(d),
                        f = e.parent("optgroup");
                    c.push({
                        element: e,
                        index: b,
                        value: e.attr("value"),
                        label: e.text(),
                        optgroup: f.attr("label") || "",
                        disabled: f.prop("disabled") || e.prop("disabled")
                    })
                }), this.items = c
            },
            _destroy: function () {
                this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
            }
        }), a.widget("ui.slider", a.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            numPages: 5,
            _create: function () {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
            },
            _refresh: function () {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function () {
                var b, c, d = this.options,
                    e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    f = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                    g = [];
                for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; b < c; b++) g.push(f);
                this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (b) {
                    a(this).data("ui-slider-handle-index", b)
                })
            },
            _createRange: function () {
                var b = this.options,
                    c = "";
                b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                    left: "",
                    bottom: ""
                }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : (this.range && this.range.remove(), this.range = null)
            },
            _setupEvents: function () {
                this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
            },
            _destroy: function () {
                this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
            },
            _mouseCapture: function (b) {
                var c, d, e, f, g, h, i, j, k = this,
                    l = this.options;
                return !l.disabled && (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), c = {
                    x: b.pageX,
                    y: b.pageY
                }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function (b) {
                    var c = Math.abs(d - k.values(b));
                    (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)
                }), h = this._start(b, g), h !== !1 && (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
                    left: 0,
                    top: 0
                } : {
                        left: b.pageX - i.left - f.width() / 2,
                        top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
                    }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
            },
            _mouseStart: function () {
                return !0
            },
            _mouseDrag: function (a) {
                var b = {
                    x: a.pageX,
                    y: a.pageY
                },
                    c = this._normValueFromMouse(b);
                return this._slide(a, this._handleIndex, c), !1
            },
            _mouseStop: function (a) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function () {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function (a) {
                var b, c, d, e, f;
                return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
            },
            _start: function (a, b) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
            },
            _slide: function (a, b, c) {
                var d, e, f;
                this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                    handle: this.handles[b],
                    value: c,
                    values: e
                }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c))) : c !== this.value() && (f = this._trigger("slide", a, {
                    handle: this.handles[b],
                    value: c
                }), f !== !1 && this.value(c))
            },
            _stop: function (a, b) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
            },
            _change: function (a, b) {
                if (!this._keySliding && !this._mouseSliding) {
                    var c = {
                        handle: this.handles[b],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)
                }
            },
            value: function (a) {
                return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()
            },
            values: function (b, c) {
                var d, e, f;
                if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
                if (!arguments.length) return this._values();
                if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
                for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
                this._refreshValue()
            },
            _setOption: function (b, c) {
                var d, e = 0;
                switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), "disabled" === b && this.element.toggleClass("ui-state-disabled", !!c), this._super(b, c), b) {
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === c ? "bottom" : "left", "");
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), d = 0; d < e; d += 1) this._change(null, d);
                        this._animateOff = !1;
                        break;
                    case "step":
                    case "min":
                    case "max":
                        this._animateOff = !0,
                            this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _value: function () {
                var a = this.options.value;
                return a = this._trimAlignValue(a)
            },
            _values: function (a) {
                var b, c, d;
                if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
                if (this.options.values && this.options.values.length) {
                    for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
                    return c
                }
                return []
            },
            _trimAlignValue: function (a) {
                if (a <= this._valueMin()) return this._valueMin();
                if (a >= this._valueMax()) return this._valueMax();
                var b = this.options.step > 0 ? this.options.step : 1,
                    c = (a - this._valueMin()) % b,
                    d = a - c;
                return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
            },
            _calculateNewMax: function () {
                var a = (this.options.max - this._valueMin()) % this.options.step;
                this.max = this.options.max - a
            },
            _valueMin: function () {
                return this.options.min
            },
            _valueMax: function () {
                return this.max
            },
            _refreshValue: function () {
                var b, c, d, e, f, g = this.options.range,
                    h = this.options,
                    i = this,
                    j = !this._animateOff && h.animate,
                    k = {};
                this.options.values && this.options.values.length ? this.handles.each(function (d) {
                    c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                        left: c + "%"
                    }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                        width: c - b + "%"
                    }, {
                            queue: !1,
                            duration: h.animate
                        })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                            bottom: c + "%"
                        }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                            height: c - b + "%"
                        }, {
                                queue: !1,
                                duration: h.animate
                            }))), b = c
                }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                    width: c + "%"
                }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
                    width: 100 - c + "%"
                }, {
                        queue: !1,
                        duration: h.animate
                    }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                        height: c + "%"
                    }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
                        height: 100 - c + "%"
                    }, {
                            queue: !1,
                            duration: h.animate
                        }))
            },
            _handleEvents: {
                keydown: function (b) {
                    var c, d, e, f, g = a(b.target).data("ui-slider-handle-index");
                    switch (b.keyCode) {
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_UP:
                        case a.ui.keyCode.PAGE_DOWN:
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, g), c === !1)) return
                    }
                    switch (f = this.options.step, d = e = this.options.values && this.options.values.length ? this.values(g) : this.value(), b.keyCode) {
                        case a.ui.keyCode.HOME:
                            e = this._valueMin();
                            break;
                        case a.ui.keyCode.END:
                            e = this._valueMax();
                            break;
                        case a.ui.keyCode.PAGE_UP:
                            e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                            if (d === this._valueMax()) return;
                            e = this._trimAlignValue(d + f);
                            break;
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (d === this._valueMin()) return;
                            e = this._trimAlignValue(d - f)
                    }
                    this._slide(b, g, e)
                },
                keyup: function (b) {
                    var c = a(b.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
                }
            }
        }), a.widget("ui.sortable", a.ui.mouse, {
            version: "1.11.2",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function (a, b, c) {
                return a >= b && a < b + c
            },
            _isFloating: function (a) {
                return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
            },
            _create: function () {
                var a = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === a.axis || this._isFloating(this.items[0].item)), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
            },
            _setOption: function (a, b) {
                this._super(a, b), "handle" === a && this._setHandleClassName()
            },
            _setHandleClassName: function () {
                this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), a.each(this.items, function () {
                    (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                })
            },
            _destroy: function () {
                this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
                for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
                return this
            },
            _mouseCapture: function (b, c) {
                var d = null,
                    e = !1,
                    f = this;
                return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(b), a(b.target).parents().each(function () {
                    if (a.data(this, f.widgetName + "-item") === f) return d = a(this), !1
                }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), !!d && (!(this.options.handle && !c && (a(this.options.handle, d).find("*").addBack().each(function () {
                    this === b.target && (e = !0)
                }), !e)) && (this.currentItem = d, this._removeCurrentsFromItems(), !0))))
            },
            _mouseStart: function (b, c, d) {
                var e, f, g = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, a.extend(this.offset, {
                    click: {
                        left: b.pageX - this.offset.left,
                        top: b.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
                    for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this));
                return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
            },
            _mouseDrag: function (b) {
                var c, d, e, f, g = this.options,
                    h = !1;
                for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)
                    if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && !(e === this.currentItem[0] || this.placeholder[1 === f ? "next" : "prev"]()[0] === e || a.contains(this.placeholder[0], e) || "semi-dynamic" === this.options.type && a.contains(this.element[0], e))) {
                        if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
                        this._rearrange(b, d), this._trigger("change", b, this._uiHash());
                        break
                    }
                return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function (b, c) {
                if (b) {
                    if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
                        var d = this,
                            e = this.placeholder.offset(),
                            f = this.options.axis,
                            g = {};
                        f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
                            d._clear(b)
                        })
                    } else this._clear(b, c);
                    return !1
                }
            },
            cancel: function () {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function (b) {
                var c = this._getItemsAsjQuery(b && b.connected),
                    d = [];
                return b = b || {}, a(c).each(function () {
                    var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                    c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
                }), !d.length && b.key && d.push(b.key + "="), d.join("&")
            },
            toArray: function (b) {
                var c = this._getItemsAsjQuery(b && b.connected),
                    d = [];
                return b = b || {}, c.each(function () {
                    d.push(a(b.item || this).attr(b.attribute || "id") || "")
                }), d
            },
            _intersectsWith: function (a) {
                var b = this.positionAbs.left,
                    c = b + this.helperProportions.width,
                    d = this.positionAbs.top,
                    e = d + this.helperProportions.height,
                    f = a.left,
                    g = f + a.width,
                    h = a.top,
                    i = h + a.height,
                    j = this.offset.click.top,
                    k = this.offset.click.left,
                    l = "x" === this.options.axis || d + j > h && d + j < i,
                    m = "y" === this.options.axis || b + k > f && b + k < g,
                    n = l && m;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
            },
            _intersectsWithPointer: function (a) {
                var b = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
                    c = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
                    d = b && c,
                    e = this._getDragVerticalDirection(),
                    f = this._getDragHorizontalDirection();
                return !!d && (this.floating ? f && "right" === f || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
            },
            _intersectsWithSides: function (a) {
                var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
                    c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
                    d = this._getDragVerticalDirection(),
                    e = this._getDragHorizontalDirection();
                return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b)
            },
            _getDragVerticalDirection: function () {
                var a = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== a && (a > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function () {
                var a = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== a && (a > 0 ? "right" : "left")
            },
            refresh: function (a) {
                return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this
            },
            _connectWith: function () {
                var a = this.options;
                return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
            },
            _getItemsAsjQuery: function (b) {
                function c() {
                    h.push(this)
                }
                var d, e, f, g, h = [],
                    i = [],
                    j = this._connectWith();
                if (j && b)
                    for (d = j.length - 1; d >= 0; d--)
                        for (f = a(j[d]), e = f.length - 1; e >= 0; e--) g = a.data(f[e], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
                for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), d = i.length - 1; d >= 0; d--) i[d][0].each(c);
                return a(h)
            },
            _removeCurrentsFromItems: function () {
                var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = a.grep(this.items, function (a) {
                    for (var c = 0; c < b.length; c++)
                        if (b[c] === a.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function (b) {
                this.items = [], this.containers = [this];
                var c, d, e, f, g, h, i, j, k = this.items,
                    l = [
                        [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                            item: this.currentItem
                        }) : a(this.options.items, this.element), this]
                    ],
                    m = this._connectWith();
                if (m && this.ready)
                    for (c = m.length - 1; c >= 0; c--)
                        for (e = a(m[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
                            item: this.currentItem
                        }) : a(f.options.items, f.element), f]), this.containers.push(f));
                for (c = l.length - 1; c >= 0; c--)
                    for (g = l[c][1], h = l[c][0], d = 0, j = h.length; d < j; d++) i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
                        item: i,
                        instance: g,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function (b) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var c, d, e, f;
                for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
                return this
            },
            _createPlaceholder: function (b) {
                b = b || this;
                var c, d = b.options;
                d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
                    element: function () {
                        var d = b.currentItem[0].nodeName.toLowerCase(),
                            e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === d ? b.currentItem.children().each(function () {
                            a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(e)
                        }) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e
                    },
                    update: function (a, e) {
                        c && !d.forcePlaceholderSize || (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
            },
            _contactContainers: function (b) {
                var c, d, e, f, g, h, i, j, k, l, m = null,
                    n = null;
                for (c = this.containers.length - 1; c >= 0; c--)
                    if (!a.contains(this.currentItem[0], this.containers[c].element[0]))
                        if (this._intersectsWith(this.containers[c].containerCache)) {
                            if (m && a.contains(this.containers[c].element[0], m.element[0])) continue;
                            m = this.containers[c], n = c
                        } else this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)), this.containers[c].containerCache.over = 0);
                if (m)
                    if (1 === this.containers.length) this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1);
                    else {
                        for (e = 1e4, f = null, k = m.floating || this._isFloating(this.currentItem), g = k ? "left" : "top", h = k ? "width" : "height", l = k ? "clientX" : "clientY", d = this.items.length - 1; d >= 0; d--) a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g], j = !1, b[l] - i > this.items[d][h] / 2 && (j = !0), Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i), f = this.items[d], this.direction = j ? "up" : "down"));
                        if (!f && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[n]) return void (this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0), this._trigger("change", b, this._uiHash()), this.containers[n]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[n], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1
                    }
            },
            _createHelper: function (b) {
                var c = this.options,
                    d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
                return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), d[0].style.width && !c.forceHelperSize || d.width(this.currentItem.width()), d[0].style.height && !c.forceHelperSize || d.height(this.currentItem.height()), d
            },
            _adjustOffsetFromHelper: function (b) {
                "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var b = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                    top: 0,
                    left: 0
                }), {
                        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    }
            },
            _getRelativeOffset: function () {
                if ("relative" === this.cssPosition) {
                    var a = this.currentItem.position();
                    return {
                        top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var b, c, d, e = this.options;
                "parent" === e.containment && (e.containment = this.helper[0].parentNode), "document" !== e.containment && "window" !== e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function (b, c) {
                c || (c = this.position);
                var d = "absolute" === b ? 1 : -1,
                    e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    f = /(html|body)/i.test(e[0].tagName);
                return {
                    top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
                    left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
                }
            },
            _generatePosition: function (b) {
                var c, d, e = this.options,
                    f = b.pageX,
                    g = b.pageY,
                    h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(h[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
                    top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
                    left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
                }
            },
            _rearrange: function (a, b, c, d) {
                c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var e = this.counter;
                this._delay(function () {
                    e === this.counter && this.refreshPositions(!d)
                })
            },
            _clear: function (a, b) {
                function c(a, b, c) {
                    return function (d) {
                        c._trigger(a, d, b._uiHash(b))
                    }
                }
                this.reverting = !1;
                var d, e = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (d in this._storedCSS) "auto" !== this._storedCSS[d] && "static" !== this._storedCSS[d] || (this._storedCSS[d] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !b && e.push(function (a) {
                    this._trigger("receive", a, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function (a) {
                    this._trigger("update", a, this._uiHash())
                }), this !== this.currentContainer && (b || (e.push(function (a) {
                    this._trigger("remove", a, this._uiHash())
                }), e.push(function (a) {
                    return function (b) {
                        a._trigger("receive", b, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), e.push(function (a) {
                    return function (b) {
                        a._trigger("update", b, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), d = this.containers.length - 1; d >= 0; d--) b || e.push(c("deactivate", this, this.containers[d])), this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])), this.containers[d].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !b) {
                    for (d = 0; d < e.length; d++) e[d].call(this, a);
                    this._trigger("stop", a, this._uiHash())
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function () {
                a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function (b) {
                var c = b || this;
                return {
                    helper: c.helper,
                    placeholder: c.placeholder || a([]),
                    position: c.position,
                    originalPosition: c.originalPosition,
                    offset: c.positionAbs,
                    item: c.currentItem,
                    sender: b ? b.element : null
                }
            }
        }), a.widget("ui.spinner", {
            version: "1.11.2",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function () {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function () {
                var b = {},
                    c = this.element;
                return a.each(["min", "max", "step"], function (a, d) {
                    var e = c.attr(d);
                    void 0 !== e && e.length && (b[d] = e)
                }), b
            },
            _events: {
                keydown: function (a) {
                    this._start(a) && this._keydown(a) && a.preventDefault()
                },
                keyup: "_stop",
                focus: function () {
                    this.previous = this.element.val()
                },
                blur: function (a) {
                    return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void (this.previous !== this.element.val() && this._trigger("change", a)))
                },
                mousewheel: function (a, b) {
                    if (b) {
                        if (!this.spinning && !this._start(a)) return !1;
                        this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                            this.spinning && this._stop(a)
                        }, 100), a.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function (b) {
                    function c() {
                        var a = this.element[0] === this.document[0].activeElement;
                        a || (this.element.focus(), this.previous = d, this._delay(function () {
                            this.previous = d
                        }))
                    }
                    var d;
                    d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), b.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur, c.call(this)
                    }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function (b) {
                    if (a(b.currentTarget).hasClass("ui-state-active")) return this._start(b) !== !1 && void this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _draw: function () {
                var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * a.height()) && a.height() > 0 && a.height(a.height()), this.options.disabled && this.disable()
            },
            _keydown: function (b) {
                var c = this.options,
                    d = a.ui.keyCode;
                switch (b.keyCode) {
                    case d.UP:
                        return this._repeat(null, 1, b), !0;
                    case d.DOWN:
                        return this._repeat(null, -1, b), !0;
                    case d.PAGE_UP:
                        return this._repeat(null, c.page, b), !0;
                    case d.PAGE_DOWN:
                        return this._repeat(null, -c.page, b), !0
                }
                return !1
            },
            _uiSpinnerHtml: function () {
                return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
            },
            _buttonHtml: function () {
                return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
            },
            _start: function (a) {
                return !(!this.spinning && this._trigger("start", a) === !1) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
            },
            _repeat: function (a, b, c) {
                a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                    this._repeat(40, b, c)
                }, a), this._spin(b * this.options.step, c)
            },
            _spin: function (a, b) {
                var c = this.value() || 0;
                this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, {
                    value: c
                }) === !1 || (this._value(c), this.counter++)
            },
            _increment: function (b) {
                var c = this.options.incremental;
                return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1
            },
            _precision: function () {
                var a = this._precisionOf(this.options.step);
                return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
            },
            _precisionOf: function (a) {
                var b = a.toString(),
                    c = b.indexOf(".");
                return c === -1 ? 0 : b.length - c - 1
            },
            _adjustValue: function (a) {
                var b, c, d = this.options;
                return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step,
                    a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && a < d.min ? d.min : a
            },
            _stop: function (a) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
            },
            _setOption: function (a, b) {
                if ("culture" === a || "numberFormat" === a) {
                    var c = this._parse(this.element.val());
                    return this.options[a] = b, void this.element.val(this._format(c))
                }
                "max" !== a && "min" !== a && "step" !== a || "string" == typeof b && (b = this._parse(b)), "icons" === a && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)), this._super(a, b), "disabled" === a && (this.widget().toggleClass("ui-state-disabled", !!b), this.element.prop("disabled", !!b), this.buttons.button(b ? "disable" : "enable"))
            },
            _setOptions: i(function (a) {
                this._super(a)
            }),
            _parse: function (a) {
                return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a
            },
            _format: function (a) {
                return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
            },
            _refresh: function () {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            isValid: function () {
                var a = this.value();
                return null !== a && a === this._adjustValue(a)
            },
            _value: function (a, b) {
                var c;
                "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
            },
            _destroy: function () {
                this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
            },
            stepUp: i(function (a) {
                this._stepUp(a)
            }),
            _stepUp: function (a) {
                this._start() && (this._spin((a || 1) * this.options.step), this._stop())
            },
            stepDown: i(function (a) {
                this._stepDown(a)
            }),
            _stepDown: function (a) {
                this._start() && (this._spin((a || 1) * -this.options.step), this._stop())
            },
            pageUp: i(function (a) {
                this._stepUp((a || 1) * this.options.page)
            }),
            pageDown: i(function (a) {
                this._stepDown((a || 1) * this.options.page)
            }),
            value: function (a) {
                return arguments.length ? void i(this._value).call(this, a) : this._parse(this.element.val())
            },
            widget: function () {
                return this.uiSpinner
            }
        }), a.widget("ui.tabs", {
            version: "1.11.2",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function () {
                var a = /#.*$/;
                return function (b) {
                    var c, d;
                    b = b.cloneNode(!1), c = b.href.replace(a, ""), d = location.href.replace(a, "");
                    try {
                        c = decodeURIComponent(c)
                    } catch (a) { }
                    try {
                        d = decodeURIComponent(d)
                    } catch (a) { }
                    return b.hash.length > 1 && c === d
                }
            }(),
            _create: function () {
                var b = this,
                    c = this.options;
                this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function (a) {
                    return b.tabs.index(a)
                }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(c.active) : this.active = a(), this._refresh(), this.active.length && this.load(c.active)
            },
            _initialActive: function () {
                var b = this.options.active,
                    c = this.options.collapsible,
                    d = location.hash.substring(1);
                return null === b && (d && this.tabs.each(function (c, e) {
                    if (a(e).attr("aria-controls") === d) return b = c, !1
                }), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== b && b !== -1 || (b = !!this.tabs.length && 0)), b !== !1 && (b = this.tabs.index(this.tabs.eq(b)), b === -1 && (b = !c && 0)), !c && b === !1 && this.anchors.length && (b = 0), b
            },
            _getCreateEventData: function () {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : a()
                }
            },
            _tabKeydown: function (b) {
                var c = a(this.document[0].activeElement).closest("li"),
                    d = this.tabs.index(c),
                    e = !0;
                if (!this._handlePageNav(b)) {
                    switch (b.keyCode) {
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                            d++;
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.LEFT:
                            e = !1, d--;
                            break;
                        case a.ui.keyCode.END:
                            d = this.anchors.length - 1;
                            break;
                        case a.ui.keyCode.HOME:
                            d = 0;
                            break;
                        case a.ui.keyCode.SPACE:
                            return b.preventDefault(), clearTimeout(this.activating), void this._activate(d);
                        case a.ui.keyCode.ENTER:
                            return b.preventDefault(), clearTimeout(this.activating), void this._activate(d !== this.options.active && d);
                        default:
                            return
                    }
                    b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function () {
                        this.option("active", d)
                    }, this.delay))
                }
            },
            _panelKeydown: function (b) {
                this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.focus())
            },
            _handlePageNav: function (b) {
                return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function (b, c) {
                function d() {
                    return b > e && (b = 0), b < 0 && (b = e), b
                }
                for (var e = this.tabs.length - 1; a.inArray(d(), this.options.disabled) !== -1;) b = c ? b + 1 : b - 1;
                return b
            },
            _focusNextTab: function (a, b) {
                return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a
            },
            _setOption: function (a, b) {
                return "active" === a ? void this._activate(b) : "disabled" === a ? void this._setupDisabled(b) : (this._super(a, b), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), void ("heightStyle" === a && this._setupHeightStyle(b)))
            },
            _sanitizeSelector: function (a) {
                return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function () {
                var b = this.options,
                    c = this.tablist.children(":has(a[href])");
                b.disabled = a.map(c.filter(".ui-state-disabled"), function (a) {
                    return c.index(a)
                }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
            },
            _refresh: function () {
                this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function () {
                var b = this,
                    c = this.tabs,
                    d = this.anchors,
                    e = this.panels;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (b) {
                    a(this).is(".ui-state-disabled") && b.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                    a(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                }), this.anchors = this.tabs.map(function () {
                    return a("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                }), this.panels = a(), this.anchors.each(function (c, d) {
                    var e, f, g, h = a(d).uniqueId().attr("id"),
                        i = a(d).closest("li"),
                        j = i.attr("aria-controls");
                    b._isLocal(d) ? (e = d.hash, g = e.substring(1), f = b.element.find(b._sanitizeSelector(e))) : (g = i.attr("aria-controls") || a({}).uniqueId()[0].id, e = "#" + g, f = b.element.find(e), f.length || (f = b._createPanel(g), f.insertAfter(b.panels[c - 1] || b.tablist)), f.attr("aria-live", "polite")), f.length && (b.panels = b.panels.add(f)), j && i.data("ui-tabs-aria-controls", j), i.attr({
                        "aria-controls": g,
                        "aria-labelledby": h
                    }), f.attr("aria-labelledby", h)
                }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), c && (this._off(c.not(this.tabs)), this._off(d.not(this.anchors)), this._off(e.not(this.panels)))
            },
            _getList: function () {
                return this.tablist || this.element.find("ol,ul").eq(0)
            },
            _createPanel: function (b) {
                return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function (b) {
                a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
                for (var c, d = 0; c = this.tabs[d]; d++) b === !0 || a.inArray(d, b) !== -1 ? a(c).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                this.options.disabled = b
            },
            _setupEvents: function (b) {
                var c = {};
                b && a.each(b.split(" "), function (a, b) {
                    c[b] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function (a) {
                        a.preventDefault()
                    }
                }), this._on(this.anchors, c), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function (b) {
                var c, d = this.element.parent();
                "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
                    var b = a(this),
                        d = b.css("position");
                    "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function () {
                    c -= a(this).outerHeight(!0)
                }), this.panels.each(function () {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function () {
                    c = Math.max(c, a(this).height("").height())
                }).height(c))
            },
            _eventHandler: function (b) {
                var c = this.options,
                    d = this.active,
                    e = a(b.currentTarget),
                    f = e.closest("li"),
                    g = f[0] === d[0],
                    h = g && c.collapsible,
                    i = h ? a() : this._getPanelForTab(f),
                    j = d.length ? this._getPanelForTab(d) : a(),
                    k = {
                        oldTab: d,
                        oldPanel: j,
                        newTab: h ? a() : f,
                        newPanel: i
                    };
                b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = !h && this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
            },
            _toggle: function (b, c) {
                function d() {
                    f.running = !1, f._trigger("activate", b, c)
                }

                function e() {
                    c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), d())
                }
                var f = this,
                    g = c.newPanel,
                    h = c.oldPanel;
                this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function () {
                    c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e()
                }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h.hide(), e()), h.attr("aria-hidden", "true"), c.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function () {
                    return 0 === a(this).attr("tabIndex")
                }).attr("tabIndex", -1), g.attr("aria-hidden", "false"), c.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function (b) {
                var c, d = this._findActive(b);
                d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: c,
                    currentTarget: c,
                    preventDefault: a.noop
                }))
            },
            _findActive: function (b) {
                return b === !1 ? a() : this.tabs.eq(b)
            },
            _getIndex: function (a) {
                return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
            },
            _destroy: function () {
                this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function () {
                    a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }), this.tabs.each(function () {
                    var b = a(this),
                        c = b.data("ui-tabs-aria-controls");
                    c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function (b) {
                var c = this.options.disabled;
                c !== !1 && (void 0 === b ? c = !1 : (b = this._getIndex(b), c = a.isArray(c) ? a.map(c, function (a) {
                    return a !== b ? a : null
                }) : a.map(this.tabs, function (a, c) {
                    return c !== b ? c : null
                })), this._setupDisabled(c))
            },
            disable: function (b) {
                var c = this.options.disabled;
                if (c !== !0) {
                    if (void 0 === b) c = !0;
                    else {
                        if (b = this._getIndex(b), a.inArray(b, c) !== -1) return;
                        c = a.isArray(c) ? a.merge([b], c).sort() : [b]
                    }
                    this._setupDisabled(c)
                }
            },
            load: function (b, c) {
                b = this._getIndex(b);
                var d = this,
                    e = this.tabs.eq(b),
                    f = e.find(".ui-tabs-anchor"),
                    g = this._getPanelForTab(e),
                    h = {
                        tab: e,
                        panel: g
                    };
                this._isLocal(f[0]) || (this.xhr = a.ajax(this._ajaxSettings(f, c, h)), this.xhr && "canceled" !== this.xhr.statusText && (e.addClass("ui-tabs-loading"), g.attr("aria-busy", "true"), this.xhr.success(function (a) {
                    setTimeout(function () {
                        g.html(a), d._trigger("load", c, h)
                    }, 1)
                }).complete(function (a, b) {
                    setTimeout(function () {
                        "abort" === b && d.panels.stop(!1, !0), e.removeClass("ui-tabs-loading"), g.removeAttr("aria-busy"), a === d.xhr && delete d.xhr
                    }, 1)
                })))
            },
            _ajaxSettings: function (b, c, d) {
                var e = this;
                return {
                    url: b.attr("href"),
                    beforeSend: function (b, f) {
                        return e._trigger("beforeLoad", c, a.extend({
                            jqXHR: b,
                            ajaxSettings: f
                        }, d))
                    }
                }
            },
            _getPanelForTab: function (b) {
                var c = a(b).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + c))
            }
        }), a.widget("ui.tooltip", {
            version: "1.11.2",
            options: {
                content: function () {
                    var b = a(this).attr("title") || "";
                    return a("<a>").text(b).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                tooltipClass: null,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function (b, c) {
                var d = (b.attr("aria-describedby") || "").split(/\s+/);
                d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")))
            },
            _removeDescribedBy: function (b) {
                var c = b.data("ui-tooltip-id"),
                    d = (b.attr("aria-describedby") || "").split(/\s+/),
                    e = a.inArray(c, d);
                e !== -1 && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby")
            },
            _create: function () {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = a("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
            },
            _setOption: function (b, c) {
                var d = this;
                return "disabled" === b ? (this[c ? "_disable" : "_enable"](), void (this.options[b] = c)) : (this._super(b, c), void ("content" === b && a.each(this.tooltips, function (a, b) {
                    d._updateContent(b.element)
                })))
            },
            _disable: function () {
                var b = this;
                a.each(this.tooltips, function (c, d) {
                    var e = a.Event("blur");
                    e.target = e.currentTarget = d.element[0], b.close(e, !0)
                }), this.element.find(this.options.items).addBack().each(function () {
                    var b = a(this);
                    b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).removeAttr("title")
                })
            },
            _enable: function () {
                this.element.find(this.options.items).addBack().each(function () {
                    var b = a(this);
                    b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
                })
            },
            open: function (b) {
                var c = this,
                    d = a(b ? b.target : this.element).closest(this.options.items);
                d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function () {
                    var b, d = a(this);
                    d.data("ui-tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, c.close(b, !0)), d.attr("title") && (d.uniqueId(), c.parents[this.id] = {
                        element: this,
                        title: d.attr("title")
                    }, d.attr("title", ""))
                }), this._updateContent(d, b))
            },
            _updateContent: function (a, b) {
                var c, d = this.options.content,
                    e = this,
                    f = b ? b.type : null;
                return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function (c) {
                    a.data("ui-tooltip-open") && e._delay(function () {
                        b && (b.type = f), this._open(b, a, c)
                    })
                }), void (c && this._open(b, a, c)))
            },
            _open: function (b, c, d) {
                function e(a) {
                    k.of = a, g.is(":hidden") || g.position(k)
                }
                var f, g, h, i, j, k = a.extend({}, this.options.position);
                if (d) {
                    if (f = this._find(c)) return void f.tooltip.find(".ui-tooltip-content").html(d);
                    c.is("[title]") && (b && "mouseover" === b.type ? c.attr("title", "") : c.removeAttr("title")), f = this._tooltip(c), g = f.tooltip, this._addDescribedBy(c, g.attr("id")), g.find(".ui-tooltip-content").html(d), this.liveRegion.children().hide(), d.clone ? (j = d.clone(), j.removeAttr("id").find("[id]").removeAttr("id")) : j = d, a("<div>").html(j).appendTo(this.liveRegion), this.options.track && b && /^mouse/.test(b.type) ? (this._on(this.document, {
                        mousemove: e
                    }), e(b)) : g.position(a.extend({
                        of: c
                    }, this.options.position)), g.hide(), this._show(g, this.options.show), this.options.show && this.options.show.delay && (i = this.delayedShow = setInterval(function () {
                        g.is(":visible") && (e(k.of), clearInterval(i))
                    }, a.fx.interval)), this._trigger("open", b, {
                        tooltip: g
                    }), h = {
                        keyup: function (b) {
                            if (b.keyCode === a.ui.keyCode.ESCAPE) {
                                var d = a.Event(b);
                                d.currentTarget = c[0], this.close(d, !0)
                            }
                        }
                    }, c[0] !== this.element[0] && (h.remove = function () {
                        this._removeTooltip(g)
                    }), b && "mouseover" !== b.type || (h.mouseleave = "close"), b && "focusin" !== b.type || (h.focusout = "close"), this._on(!0, c, h)
                }
            },
            close: function (b) {
                var c, d = this,
                    e = a(b ? b.currentTarget : this.element),
                    f = this._find(e);
                f && (c = f.tooltip, f.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && !e.attr("title") && e.attr("title", e.data("ui-tooltip-title")), this._removeDescribedBy(e), f.hiding = !0, c.stop(!0), this._hide(c, this.options.hide, function () {
                    d._removeTooltip(a(this))
                }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function (b, c) {
                    a(c.element).attr("title", c.title), delete d.parents[b]
                }), f.closing = !0, this._trigger("close", b, {
                    tooltip: c
                }), f.hiding || (f.closing = !1)))
            },
            _tooltip: function (b) {
                var c = a("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                    d = c.uniqueId().attr("id");
                return a("<div>").addClass("ui-tooltip-content").appendTo(c), c.appendTo(this.document[0].body), this.tooltips[d] = {
                    element: b,
                    tooltip: c
                }
            },
            _find: function (a) {
                var b = a.data("ui-tooltip-id");
                return b ? this.tooltips[b] : null
            },
            _removeTooltip: function (a) {
                a.remove(), delete this.tooltips[a.attr("id")]
            },
            _destroy: function () {
                var b = this;
                a.each(this.tooltips, function (c, d) {
                    var e = a.Event("blur"),
                        f = d.element;
                    e.target = e.currentTarget = f[0], b.close(e, !0), a("#" + c).remove(), f.data("ui-tooltip-title") && (f.attr("title") || f.attr("title", f.data("ui-tooltip-title")), f.removeData("ui-tooltip-title"))
                }), this.liveRegion.remove()
            }
        })
    }), ! function () {
        function a(b, c, d) {
            var e = a.resolve(b);
            if (null == e) {
                d = d || b, c = c || "root";
                var f = new Error('Failed to require "' + d + '" from "' + c + '"');
                throw f.path = d, f.parent = c, f.require = !0, f
            }
            var g = a.modules[e];
            if (!g._resolving && !g.exports) {
                var h = {};
                h.exports = {}, h.client = h.component = !0, g._resolving = !0, g.call(this, h.exports, a.relative(e), h), delete g._resolving, g.exports = h.exports
            }
            return g.exports
        }
        a.modules = {}, a.aliases = {}, a.resolve = function (b) {
            "/" === b.charAt(0) && (b = b.slice(1));
            for (var c = [b, b + ".js", b + ".json", b + "/index.js", b + "/index.json"], d = 0; d < c.length; d++) {
                var b = c[d];
                if (a.modules.hasOwnProperty(b)) return b;
                if (a.aliases.hasOwnProperty(b)) return a.aliases[b]
            }
        }, a.normalize = function (a, b) {
            var c = [];
            if ("." != b.charAt(0)) return b;
            a = a.split("/"), b = b.split("/");
            for (var d = 0; d < b.length; ++d) ".." == b[d] ? a.pop() : "." != b[d] && "" != b[d] && c.push(b[d]);
            return a.concat(c).join("/")
        }, a.register = function (b, c) {
            a.modules[b] = c
        }, a.alias = function (b, c) {
            if (!a.modules.hasOwnProperty(b)) throw new Error('Failed to alias "' + b + '", it does not exist');
            a.aliases[c] = b
        }, a.relative = function (b) {
            function c(a, b) {
                for (var c = a.length; c--;)
                    if (a[c] === b) return c;
                return -1
            }

            function d(c) {
                var e = d.resolve(c);
                return a(e, b, c)
            }
            var e = a.normalize(b, "..");
            return d.resolve = function (d) {
                var f = d.charAt(0);
                if ("/" == f) return d.slice(1);
                if ("." == f) return a.normalize(e, d);
                var g = b.split("/"),
                    h = c(g, "deps") + 1;
                return h || (h = 0), d = g.slice(0, h + 1).join("/") + "/deps/" + d
            }, d.exists = function (b) {
                return a.modules.hasOwnProperty(d.resolve(b))
            }, d
        }, a.register("component-classes/index.js", function (a, b, c) {
            function d(a) {
                if (!a) throw new Error("A DOM element reference is required");
                this.el = a, this.list = a.classList
            }
            var e = b("indexof"),
                f = /\s+/,
                g = Object.prototype.toString;
            c.exports = function (a) {
                return new d(a)
            }, d.prototype.add = function (a) {
                if (this.list) return this.list.add(a), this;
                var b = this.array(),
                    c = e(b, a);
                return ~c || b.push(a), this.el.className = b.join(" "), this
            }, d.prototype.remove = function (a) {
                if ("[object RegExp]" == g.call(a)) return this.removeMatching(a);
                if (this.list) return this.list.remove(a), this;
                var b = this.array(),
                    c = e(b, a);
                return ~c && b.splice(c, 1), this.el.className = b.join(" "), this
            }, d.prototype.removeMatching = function (a) {
                for (var b = this.array(), c = 0; c < b.length; c++) a.test(b[c]) && this.remove(b[c]);
                return this
            }, d.prototype.toggle = function (a, b) {
                return this.list ? ("undefined" != typeof b ? b !== this.list.toggle(a, b) && this.list.toggle(a) : this.list.toggle(a), this) : ("undefined" != typeof b ? b ? this.add(a) : this.remove(a) : this.has(a) ? this.remove(a) : this.add(a), this)
            }, d.prototype.array = function () {
                var a = this.el.className.replace(/^\s+|\s+$/g, ""),
                    b = a.split(f);
                return "" === b[0] && b.shift(), b
            }, d.prototype.has = d.prototype.contains = function (a) {
                return this.list ? this.list.contains(a) : !!~e(this.array(), a)
            }
        }), a.register("segmentio-extend/index.js", function (a, b, c) {
            c.exports = function (a) {
                for (var b, c = Array.prototype.slice.call(arguments, 1), d = 0; b = c[d]; d++)
                    if (b)
                        for (var e in b) a[e] = b[e];
                return a
            }
        }), a.register("component-indexof/index.js", function (a, b, c) {
            c.exports = function (a, b) {
                if (a.indexOf) return a.indexOf(b);
                for (var c = 0; c < a.length; ++c)
                    if (a[c] === b) return c;
                return -1
            }
        }), a.register("component-event/index.js", function (a) {
            var b = window.addEventListener ? "addEventListener" : "attachEvent",
                c = window.removeEventListener ? "removeEventListener" : "detachEvent",
                d = "addEventListener" !== b ? "on" : "";
            a.bind = function (a, c, e, f) {
                return a[b](d + c, e, f || !1), e
            }, a.unbind = function (a, b, e, f) {
                return a[c](d + b, e, f || !1), e
            }
        }), a.register("timoxley-to-array/index.js", function (a, b, c) {
            function d(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }
            c.exports = function (a) {
                if ("undefined" == typeof a) return [];
                if (null === a) return [null];
                if (a === window) return [window];
                if ("string" == typeof a) return [a];
                if (d(a)) return a;
                if ("number" != typeof a.length) return [a];
                if ("function" == typeof a && a instanceof Function) return [a];
                for (var b = [], c = 0; c < a.length; c++)(Object.prototype.hasOwnProperty.call(a, c) || c in a) && b.push(a[c]);
                return b.length ? b : []
            }
        }), a.register("javve-events/index.js", function (a, b) {
            var c = b("event"),
                d = b("to-array");
            a.bind = function (a, b, e, f) {
                a = d(a);
                for (var g = 0; g < a.length; g++) c.bind(a[g], b, e, f)
            }, a.unbind = function (a, b, e, f) {
                a = d(a);
                for (var g = 0; g < a.length; g++) c.unbind(a[g], b, e, f)
            }
        }), a.register("javve-get-by-class/index.js", function (a, b, c) {
            c.exports = function () {
                return document.getElementsByClassName ? function (a, b, c) {
                    return c ? a.getElementsByClassName(b)[0] : a.getElementsByClassName(b)
                } : document.querySelector ? function (a, b, c) {
                    return b = "." + b, c ? a.querySelector(b) : a.querySelectorAll(b)
                } : function (a, b, c) {
                    var d = [],
                        e = "*";
                    null == a && (a = document);
                    for (var f = a.getElementsByTagName(e), g = f.length, h = new RegExp("(^|\\s)" + b + "(\\s|$)"), i = 0, j = 0; g > i; i++)
                        if (h.test(f[i].className)) {
                            if (c) return f[i];
                            d[j] = f[i], j++
                        }
                    return d
                }
            }()
        }), a.register("javve-get-attribute/index.js", function (a, b, c) {
            c.exports = function (a, b) {
                var c = a.getAttribute && a.getAttribute(b) || null;
                if (!c)
                    for (var d = a.attributes, e = d.length, f = 0; e > f; f++) void 0 !== b[f] && b[f].nodeName === b && (c = b[f].nodeValue);
                return c
            }
        }), a.register("javve-natural-sort/index.js", function (a, b, c) {
            c.exports = function (a, b, c) {
                var d, e, f = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
                    g = /(^[ ]*|[ ]*$)/g,
                    h = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                    i = /^0x[0-9a-f]+$/i,
                    j = /^0/,
                    c = c || {},
                    k = function (a) {
                        return c.insensitive && ("" + a).toLowerCase() || "" + a
                    },
                    l = k(a).replace(g, "") || "",
                    m = k(b).replace(g, "") || "",
                    n = l.replace(f, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                    o = m.replace(f, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                    p = parseInt(l.match(i)) || 1 != n.length && l.match(h) && Date.parse(l),
                    q = parseInt(m.match(i)) || p && m.match(h) && Date.parse(m) || null,
                    r = c.desc ? -1 : 1;
                if (q) {
                    if (q > p) return -1 * r;
                    if (p > q) return 1 * r
                }
                for (var s = 0, t = Math.max(n.length, o.length); t > s; s++) {
                    if (d = !(n[s] || "").match(j) && parseFloat(n[s]) || n[s] || 0, e = !(o[s] || "").match(j) && parseFloat(o[s]) || o[s] || 0, isNaN(d) !== isNaN(e)) return isNaN(d) ? 1 : -1;
                    if (typeof d != typeof e && (d += "", e += ""), e > d) return -1 * r;
                    if (d > e) return 1 * r
                }
                return 0
            }
        }), a.register("javve-to-string/index.js", function (a, b, c) {
            c.exports = function (a) {
                return a = void 0 === a ? "" : a, a = null === a ? "" : a, a = a.toString()
            }
        }), a.register("component-type/index.js", function (a, b, c) {
            var d = Object.prototype.toString;
            c.exports = function (a) {
                switch (d.call(a)) {
                    case "[object Date]":
                        return "date";
                    case "[object RegExp]":
                        return "regexp";
                    case "[object Arguments]":
                        return "arguments";
                    case "[object Array]":
                        return "array";
                    case "[object Error]":
                        return "error"
                }
                return null === a ? "null" : void 0 === a ? "undefined" : a !== a ? "nan" : a && 1 === a.nodeType ? "element" : typeof a.valueOf()
            }
        }), a.register("list.js/index.js", function (a, b, c) {
            ! function (a, d) {
                "use strict";
                var e = a.document,
                    f = b("get-by-class"),
                    g = b("extend"),
                    h = b("indexof"),
                    i = function (a, c, i) {
                        var j, k = this,
                            l = b("./src/item")(k),
                            m = b("./src/add-async")(k),
                            n = b("./src/parse")(k);
                        j = {
                            start: function () {
                                k.listClass = "list", k.searchClass = "search", k.sortClass = "sort", k.page = 200, k.i = 1, k.items = [], k.visibleItems = [], k.matchingItems = [], k.searched = !1, k.filtered = !1, k.handlers = {
                                    updated: []
                                }, k.plugins = {}, k.helpers = {
                                    getByClass: f,
                                    extend: g,
                                    indexOf: h
                                }, g(k, c), k.listContainer = "string" == typeof a ? e.getElementById(a) : a, k.listContainer && (k.list = f(k.listContainer, k.listClass, !0), k.templater = b("./src/templater")(k), k.search = b("./src/search")(k), k.filter = b("./src/filter")(k), k.sort = b("./src/sort")(k), this.items(), k.update(), this.plugins())
                            },
                            items: function () {
                                n(k.list), i !== d && k.add(i)
                            },
                            plugins: function () {
                                for (var a = 0; a < k.plugins.length; a++) {
                                    var b = k.plugins[a];
                                    k[b.name] = b, b.init(k)
                                }
                            }
                        }, this.add = function (a, b) {
                            if (b) return void m(a, b);
                            var c = [],
                                e = !1;
                            a[0] === d && (a = [a]);
                            for (var f = 0, g = a.length; g > f; f++) {
                                var h = null;
                                a[f] instanceof l ? (h = a[f], h.reload()) : (e = k.items.length > k.page, h = new l(a[f], d, e)), k.items.push(h), c.push(h)
                            }
                            return k.update(), c
                        }, this.show = function (a, b) {
                            return this.i = a, this.page = b, k.update(), k
                        }, this.remove = function (a, b, c) {
                            for (var d = 0, e = 0, f = k.items.length; f > e; e++) k.items[e].values()[a] == b && (k.templater.remove(k.items[e], c), k.items.splice(e, 1), f-- , e-- , d++);
                            return k.update(), d
                        }, this.get = function (a, b) {
                            for (var c = [], d = 0, e = k.items.length; e > d; d++) {
                                var f = k.items[d];
                                f.values()[a] == b && c.push(f)
                            }
                            return c
                        }, this.size = function () {
                            return k.items.length
                        }, this.clear = function () {
                            return k.templater.clear(), k.items = [], k
                        }, this.on = function (a, b) {
                            return k.handlers[a].push(b), k
                        }, this.off = function (a, b) {
                            var c = k.handlers[a],
                                d = h(c, b);
                            return d > -1 && c.splice(d, 1), k
                        }, this.trigger = function (a) {
                            for (var b = k.handlers[a].length; b--;) k.handlers[a][b](k);
                            return k
                        }, this.reset = {
                            filter: function () {
                                for (var a = k.items, b = a.length; b--;) a[b].filtered = !1;
                                return k
                            },
                            search: function () {
                                for (var a = k.items, b = a.length; b--;) a[b].found = !1;
                                return k
                            }
                        }, this.update = function () {
                            var a = k.items,
                                b = a.length;
                            k.visibleItems = [], k.matchingItems = [], k.templater.clear();
                            for (var c = 0; b > c; c++) a[c].matching() && k.matchingItems.length + 1 >= k.i && k.visibleItems.length < k.page ? (a[c].show(), k.visibleItems.push(a[c]), k.matchingItems.push(a[c])) : a[c].matching() ? (k.matchingItems.push(a[c]), a[c].hide()) : a[c].hide();
                            return k.trigger("updated"), k
                        }, j.start()
                    };
                c.exports = i
            }(window)
        }), a.register("list.js/src/search.js", function (a, b, c) {
            var d = b("events"),
                e = b("get-by-class"),
                f = b("to-string");
            c.exports = function (a) {
                var b, c, g, h, i = {
                    resetList: function () {
                        a.i = 1, a.templater.clear(), h = void 0
                    },
                    setOptions: function (a) {
                        2 == a.length && a[1] instanceof Array ? c = a[1] : 2 == a.length && "function" == typeof a[1] ? h = a[1] : 3 == a.length && (c = a[1], h = a[2])
                    },
                    setColumns: function () {
                        c = void 0 === c ? i.toArray(a.items[0].values()) : c
                    },
                    setSearchString: function (a) {
                        a = f(a).toLowerCase(), a = a.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"), g = a
                    },
                    toArray: function (a) {
                        var b = [];
                        for (var c in a) b.push(c);
                        return b
                    }
                },
                    j = {
                        list: function () {
                            for (var b = 0, c = a.items.length; c > b; b++) j.item(a.items[b])
                        },
                        item: function (a) {
                            a.found = !1;
                            for (var b = 0, d = c.length; d > b; b++)
                                if (j.values(a.values(), c[b])) return void (a.found = !0)
                        },
                        values: function (a, c) {
                            return !!(a.hasOwnProperty(c) && (b = f(a[c]).toLowerCase(), "" !== g && b.search(g) > -1))
                        },
                        reset: function () {
                            a.reset.search(), a.searched = !1
                        }
                    },
                    k = function (b) {
                        return a.trigger("searchStart"), i.resetList(), i.setSearchString(b), i.setOptions(arguments), i.setColumns(), "" === g ? j.reset() : (a.searched = !0, h ? h(g, c) : j.list()), a.update(), a.trigger("searchComplete"), a.visibleItems
                    };
                return a.handlers.searchStart = a.handlers.searchStart || [], a.handlers.searchComplete = a.handlers.searchComplete || [], d.bind(e(a.listContainer, a.searchClass), "keyup", function (b) {
                    var c = b.target || b.srcElement,
                        d = "" === c.value && !a.searched;
                    d || k(c.value)
                }), d.bind(e(a.listContainer, a.searchClass), "input", function (a) {
                    var b = a.target || a.srcElement;
                    "" === b.value && k("")
                }), a.helpers.toString = f, k
            }
        }), a.register("list.js/src/sort.js", function (a, b, c) {
            var d = b("natural-sort"),
                e = b("classes"),
                f = b("events"),
                g = b("get-by-class"),
                h = b("get-attribute");
            c.exports = function (a) {
                a.sortFunction = a.sortFunction || function (a, b, c) {
                    return c.desc = "desc" == c.order, d(a.values()[c.valueName], b.values()[c.valueName], c)
                };
                var b = {
                    els: void 0,
                    clear: function () {
                        for (var a = 0, c = b.els.length; c > a; a++) e(b.els[a]).remove("asc"), e(b.els[a]).remove("desc")
                    },
                    getOrder: function (a) {
                        var b = h(a, "data-order");
                        return "asc" == b || "desc" == b ? b : e(a).has("desc") ? "asc" : e(a).has("asc") ? "desc" : "asc"
                    },
                    getInSensitive: function (a, b) {
                        var c = h(a, "data-insensitive");
                        b.insensitive = "true" === c
                    },
                    setOrder: function (a) {
                        for (var c = 0, d = b.els.length; d > c; c++) {
                            var f = b.els[c];
                            if (h(f, "data-sort") === a.valueName) {
                                var g = h(f, "data-order");
                                "asc" == g || "desc" == g ? g == a.order && e(f).add(a.order) : e(f).add(a.order)
                            }
                        }
                    }
                },
                    c = function () {
                        a.trigger("sortStart"), options = {};
                        var c = arguments[0].currentTarget || arguments[0].srcElement || void 0;
                        c ? (options.valueName = h(c, "data-sort"), b.getInSensitive(c, options), options.order = b.getOrder(c)) : (options = arguments[1] || options, options.valueName = arguments[0], options.order = options.order || "asc", options.insensitive = "undefined" == typeof options.insensitive || options.insensitive), b.clear(), b.setOrder(options), options.sortFunction = options.sortFunction || a.sortFunction, a.items.sort(function (a, b) {
                            return options.sortFunction(a, b, options)
                        }), a.update(), a.trigger("sortComplete")
                    };
                return a.handlers.sortStart = a.handlers.sortStart || [], a.handlers.sortComplete = a.handlers.sortComplete || [], b.els = g(a.listContainer, a.sortClass), f.bind(b.els, "click", c), a.on("searchStart", b.clear), a.on("filterStart", b.clear), a.helpers.classes = e, a.helpers.naturalSort = d, a.helpers.events = f, a.helpers.getAttribute = h, c
            }
        }), a.register("list.js/src/item.js", function (a, b, c) {
            c.exports = function (a) {
                return function (b, c, d) {
                    var e = this;
                    this._values = {}, this.found = !1, this.filtered = !1;
                    var f = function (b, c, d) {
                        if (void 0 === c) d ? e.values(b, d) : e.values(b);
                        else {
                            e.elm = c;
                            var f = a.templater.get(e, b);
                            e.values(f)
                        }
                    };
                    this.values = function (b, c) {
                        if (void 0 === b) return e._values;
                        for (var d in b) e._values[d] = b[d];
                        c !== !0 && a.templater.set(e, e.values())
                    }, this.show = function () {
                        a.templater.show(e)
                    }, this.hide = function () {
                        a.templater.hide(e)
                    }, this.matching = function () {
                        return a.filtered && a.searched && e.found && e.filtered || a.filtered && !a.searched && e.filtered || !a.filtered && a.searched && e.found || !a.filtered && !a.searched
                    }, this.visible = function () {
                        return e.elm.parentNode == a.list
                    }, f(b, c, d)
                }
            }
        }), a.register("list.js/src/templater.js", function (a, b, c) {
            var d = b("get-by-class"),
                e = function (a) {
                    function b(b) {
                        if (void 0 === b) {
                            for (var c = a.list.childNodes, d = 0, e = c.length; e > d; d++)
                                if (void 0 === c[d].data) return c[d];
                            return null
                        }
                        if (-1 !== b.indexOf("<")) {
                            var f = document.createElement("div");
                            return f.innerHTML = b, f.firstChild
                        }
                        return document.getElementById(a.item)
                    }
                    var c = b(a.item),
                        e = this;
                    this.get = function (a, b) {
                        e.create(a);
                        for (var c = {}, f = 0, g = b.length; g > f; f++) {
                            var h = d(a.elm, b[f], !0);
                            c[b[f]] = h ? h.innerHTML : ""
                        }
                        return c
                    }, this.set = function (a, b) {
                        if (!e.create(a))
                            for (var c in b)
                                if (b.hasOwnProperty(c)) {
                                    var f = d(a.elm, c, !0);
                                    f && ("IMG" === f.tagName && "" !== b[c] ? f.src = b[c] : f.innerHTML = b[c])
                                }
                    }, this.create = function (a) {
                        if (void 0 !== a.elm) return !1;
                        var b = c.cloneNode(!0);
                        return b.removeAttribute("id"), a.elm = b, e.set(a, a.values()), !0
                    }, this.remove = function (b) {
                        a.list.removeChild(b.elm)
                    }, this.show = function (b) {
                        e.create(b), a.list.appendChild(b.elm)
                    }, this.hide = function (b) {
                        void 0 !== b.elm && b.elm.parentNode === a.list && a.list.removeChild(b.elm)
                    }, this.clear = function () {
                        if (a.list.hasChildNodes())
                            for (; a.list.childNodes.length >= 1;) a.list.removeChild(a.list.firstChild)
                    }
                };
            c.exports = function (a) {
                return new e(a)
            }
        }), a.register("list.js/src/filter.js", function (a, b, c) {
            c.exports = function (a) {
                return a.handlers.filterStart = a.handlers.filterStart || [], a.handlers.filterComplete = a.handlers.filterComplete || [],
                    function (b) {
                        if (a.trigger("filterStart"), a.i = 1, a.reset.filter(), void 0 === b) a.filtered = !1;
                        else {
                            a.filtered = !0;
                            for (var c = a.items, d = 0, e = c.length; e > d; d++) {
                                var f = c[d];
                                f.filtered = !!b(f)
                            }
                        }
                        return a.update(), a.trigger("filterComplete"), a.visibleItems
                    }
            }
        }), a.register("list.js/src/add-async.js", function (a, b, c) {
            c.exports = function (a) {
                return function (b, c, d) {
                    var e = b.splice(0, 100);
                    d = d || [], d = d.concat(a.add(e)), b.length > 0 ? setTimeout(function () {
                        addAsync(b, c, d)
                    }, 10) : (a.update(), c(d))
                }
            }
        }), a.register("list.js/src/parse.js", function (a, b, c) {
            c.exports = function (a) {
                var c = b("./item")(a),
                    d = function (a) {
                        for (var b = a.childNodes, c = [], d = 0, e = b.length; e > d; d++) void 0 === b[d].data && c.push(b[d]);
                        return c
                    },
                    e = function (b, d) {
                        for (var e = 0, f = b.length; f > e; e++) a.items.push(new c(d, b[e]))
                    },
                    f = function (b, c) {
                        var d = b.splice(0, 100);
                        e(d, c), b.length > 0 ? setTimeout(function () {
                            init.items.indexAsync(b, c)
                        }, 10) : a.update()
                    };
                return function () {
                    var b = d(a.list),
                        c = a.valueNames;
                    a.indexAsync ? f(b, c) : e(b, c)
                }
            }
        }), a.alias("component-classes/index.js", "list.js/deps/classes/index.js"), a.alias("component-classes/index.js", "classes/index.js"), a.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js"), a.alias("segmentio-extend/index.js", "list.js/deps/extend/index.js"), a.alias("segmentio-extend/index.js", "extend/index.js"), a.alias("component-indexof/index.js", "list.js/deps/indexof/index.js"), a.alias("component-indexof/index.js", "indexof/index.js"), a.alias("javve-events/index.js", "list.js/deps/events/index.js"), a.alias("javve-events/index.js", "events/index.js"), a.alias("component-event/index.js", "javve-events/deps/event/index.js"), a.alias("timoxley-to-array/index.js", "javve-events/deps/to-array/index.js"), a.alias("javve-get-by-class/index.js", "list.js/deps/get-by-class/index.js"), a.alias("javve-get-by-class/index.js", "get-by-class/index.js"), a.alias("javve-get-attribute/index.js", "list.js/deps/get-attribute/index.js"), a.alias("javve-get-attribute/index.js", "get-attribute/index.js"), a.alias("javve-natural-sort/index.js", "list.js/deps/natural-sort/index.js"), a.alias("javve-natural-sort/index.js", "natural-sort/index.js"), a.alias("javve-to-string/index.js", "list.js/deps/to-string/index.js"), a.alias("javve-to-string/index.js", "list.js/deps/to-string/index.js"), a.alias("javve-to-string/index.js", "to-string/index.js"), a.alias("javve-to-string/index.js", "javve-to-string/index.js"), a.alias("component-type/index.js", "list.js/deps/type/index.js"), a.alias("component-type/index.js", "type/index.js"), "object" == typeof exports ? module.exports = a("list.js") : "function" == typeof define && define.amd ? define("list", [], function () {
            return a("list.js")
        }) : this.List = a("list.js")
    }();
var B = B || {};
B.settings = {
    breakpoints: {
        xs: 0,
        sm: 700,
        md: 992
    }
}, define("main", ["jquery", "underscore", "breakpointlistener", "b_data-filter", "bowser", "b_json-nav", "slick-carousel", "magnific-popup", "ddslick", "nouislider"], function (a, b, c, d, e, f) {
    function g() {
        "ontouchend" in document && (B.isTouchDevice = !0, a("body").addClass("b_body-touchDevice")), a(".bJS_startpage-imageGallery").length > 0 && a(window).on("orientationchange", function () {
            location.reload(!0)
        }), B.BreakpointListener = new c({
            breakpoints: B.settings.breakpoints
        }), h(), i(), j(), k(), m(), o(), p(), q(), r(), s(), t(), n(), l()
    }

    function h() {
        var c = a(".bJS_container-mainNav"),
            d = {
                mobile: {
                    toggleStartBtn: function () {
                        var a = c.find(".bJS_jsonNav-container-inner"),
                            b = c.find(".bJS_jsonNav-container-subTree:first-child");
                        a.hasClass("b_open") ? a.animate({
                            height: 0
                        }, 500, "swing", function () {
                            a.removeClass("b_open"), B.mainMenu.closeAll(), B.mainMenu.$subTreeContainers.css({
                                left: "",
                                display: ""
                            })
                        }) : (a.addClass("b_open"), a.animate({
                            height: b.height()
                        }, 500))
                    },
                    onOpenItem: function (a) {
                        if (a.navItem.$subTreeContainer) {
                            var d = a.navItem,
                                e = a.menu,
                                f = b.without(a.menu.getOpenItems(), d),
                                g = e.$navEl.width() + 50,
                                h = c.find(".bJS_jsonNav-container-inner");
                            d.movedOut = !1, d.$subTreeContainer.css("left", g), d.$subTreeContainer.animate({
                                left: 0
                            }, 500), h.animate({
                                height: d.$subTreeContainer.height()
                            }, 500);
                            var i = e.$navEl.find('.bJS_jsonNav-container-subTree[data-itemuid="0"]');
                            i.animate({
                                left: "-" + g
                            }, 500, "swing", function () {
                                i.hide()
                            }), b.each(f, function (a) {
                                a.$subTreeContainer && !a.movedOut && (a.movedOut = !0, a.$subTreeContainer.animate({
                                    left: "-" + g
                                }, 500, "swing", function () {
                                    a.$subTreeContainer.hide()
                                }))
                            })
                        }
                    },
                    beforeCloseItem: function (b) {
                        function d() {
                            i-- , i <= 0 && h.resolve()
                        }
                        var e = b.navItem,
                            f = b.menu,
                            g = f.getParentItem(e),
                            h = a.Deferred(),
                            i = 0,
                            j = c.find(".bJS_jsonNav-container-inner");
                        if (e.$subTreeContainer) {
                            var k = f.$navEl.width() + 50;
                            if (e.$subTreeContainer.animate({
                                left: k
                            }, 500), g) g.$subTreeContainer && (i++ , g.movedOut = !1, g.$subTreeContainer.show(), g.$subTreeContainer.animate({
                                left: 0
                            }, 500, "swing", d), j.animate({
                                height: g.$subTreeContainer.height()
                            }, 500));
                            else {
                                i++;
                                var l = f.$navEl.find('.bJS_jsonNav-container-subTree[data-itemuid="0"]');
                                l.show(), l.animate({
                                    left: 0
                                }, 500, "swing", d), j.animate({
                                    height: l.height()
                                }, 500)
                            }
                        }
                        return i <= 0 && h.resolve(), h.promise()
                    },
                    onCloseItem: function (a) {
                        var c = a.navItem,
                            d = a.itemsToClose.push(c);
                        b.each(d, function (a) {
                            a.$subTreeContainer && c.movedOut && a.$subTreeContainer.css("left", "")
                        })
                    },
                    onClickItem: function (a) {
                        var b = a.menu,
                            c = a.navItem,
                            d = a.$el;
                        d.hasClass("bJS_jsonNav-itemBack") ? b.closeItem(c) : d.hasClass("bJS_jsonNav-itemForward") && b.openItem(c)
                    }
                },
                desktop: {
                    onOpenItem: function (a) {
                        if (B.util.isTouchDevice() && 2 == a.navItem.originalOrder) {
                            var b = a.navItem.getChildItems();
                            b.length > 0 && b[0].open()
                        }
                    },
                    onClickItem: function (a) {
                        if (B.util.isTouchDevice() && !a.navItem.isOpen()) {
                            var b = a.navItem.getHierarchyLevel();
                            (1 == b || 2 == b && 2 == a.navItem.getParentItem().originalOrder) && a.navItem.hasChildren() && (a.menu.openItem(a.navItem), a.preventDefault())
                        }
                        a.stopPropagation()
                    },
                    onClickOutside: function (a) {
                        a.menu.closeAll()
                    },
                    onMouseEnterItem: function (a) {
                        B.util.isTouchDevice() || a.menu.openItem(a.navItem)
                    },
                    onMouseLeave: function (a) {
                        B.util.isTouchDevice() || a.menu.closeAll()
                    }
                }
            };
        if (mainMenuData && c.length > 0) {
            var e = {
                $el: c,
                styleClass: "b_mainNav",
                data: mainMenuData,
                breakpoints: {
                    default: {
                        styleClass: "b_jsonNav-mobile",
                        templatePath: "templates/mainNavMobile.tpl",
                        eventHandlers: {
                            onClickItem: [d.mobile.onClickItem],
                            onOpenItem: [d.mobile.onOpenItem],
                            onCloseItem: [d.mobile.onCloseItem],
                            beforeCloseItem: [d.mobile.beforeCloseItem]
                        }
                    },
                    700: {
                        styleClass: "b_jsonNav-desktop",
                        templatePath: "templates/mainNavDesktop.tpl",
                        eventHandlers: {
                            onOpenItem: [d.desktop.onOpenItem],
                            onClickItem: [d.desktop.onClickItem],
                            onClickOutside: [d.desktop.onClickOutside],
                            onMouseLeave: [d.desktop.onMouseLeave],
                            onMouseEnterItem: [d.desktop.onMouseEnterItem]
                        }
                    }
                }
            };
            B.mainMenu = new f(e), B.util.isTouchDevice() && B.mainMenu.$navEl.append('<div class="b_mainNav-btn-start bJS_mainNav-btn-start hidden-xs"></div>'), a(".bJS_mainNav-btn-start").on("click", d.mobile.toggleStartBtn)
        }
    }

    function i() {
        var b = a(".bJS_collapsible");
        b.each(function () {
            B.Accordions.push(new B.Accordion(a(this), {}))
        })
    }

    function j() {
        var b = a(".bJS_clearForm");
        b.each(function () {
            B.ClearForms.push(new B.ClearForm(a(this)))
        })
    }

    function k() {
        function c() {
            var c, d = a(document).scrollTop();
            return b.each(j, function (a) {
                d >= a.top && (!c || c.top < a.top) && (c = a)
            }), c ? c.$el.attr("id") : void 0
        }
        var d = a(".bJS_row-contentMenu"),
            e = a(".bJS_contentMenu");
        if (d.length > 0) {
            var f = e.find("a"),
                g = a("[id^=bJS_section-]"),
                h = !1,
                i = d.offset().top,
                j = [];
            d.length > 0 && (g.each(function () {
                var b = a(this);
                j.push({
                    $el: b,
                    top: b.offset().top
                })
            }), f.on("click", function (b) {
                var c = a(this);
                b.preventDefault(), c.addClass("active"), f.not(c).removeClass("active")
            }).first().click(), a(window).on("scroll", function () {
                if (a(document).scrollTop() >= i ? h !== !0 && (d.addClass("b_sticky"), h = !0) : h !== !1 && (d.removeClass("b_sticky"), h = !1), h === !0) {
                    var b = c();
                    if (b) {
                        var e = d.find("a[href=#" + b + "]");
                        e.hasClass("active") || (e.addClass("active"), f.not(e).removeClass("active"))
                    }
                }
            }))
        }
    }

    function l() {
        var b = a(".bJS_dropdown");
        b.ddslick({
            width: "100%"
        })
    }

    function m() {
        var b = a(".bJS_switch");
        b.each(function () {
            new B.LanguageSwitch(a(this))
        })
    }

    function n() {
        var b = a(".bJS_tabletNav-trigger"),
            c = a(".bJS_tabletNav-detail");
        b.on("click", function () {
            c.toggleClass("hidden")
        })
    }

    function o() {
        a(".bJS_productFinder-elevator").each(function () {
            new B.ProductFinder(this, {
                filters: [{
                    referenceAttribute: "elevatortype",
                    filterFunction: "equal"
                }, {
                    referenceAttribute: "machineroom",
                    filterFunction: function (a, b) {
                        return !a || !!b
                    }
                }, {
                    referenceAttribute: "glasscabin",
                    filterFunction: function (a, b) {
                        return !a || !!b
                    }
                }, {
                    referenceAttribute: "segment",
                    dataAttribute: "segments",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "floors",
                    dataAttribute: "floorsmin",
                    filterFunction: "greaterThanOrEqual"
                }, {
                    referenceAttribute: "floors",
                    dataAttribute: "floorsmax",
                    filterFunction: "lessThanOrEqual"
                }, {
                    referenceAttribute: "speed",
                    dataAttribute: "speedmin",
                    filterFunction: "greaterThanOrEqual"
                }, {
                    referenceAttribute: "speed",
                    dataAttribute: "speedmax",
                    filterFunction: "lessThanOrEqual"
                }, {
                    referenceAttribute: "capacity",
                    dataAttribute: "capacity",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }],
                compareTemplate: "elevator"
            })
        }), a(".bJS_productFinder-escalator").each(function () {
            new B.ProductFinder(this, {
                filters: [{
                    referenceAttribute: "balustradetype",
                    dataAttribute: "balustrades",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "segment",
                    dataAttribute: "segments",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "inclination",
                    dataAttribute: "escalatorangleofinclination",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "height",
                    dataAttribute: "heightmin",
                    filterFunction: "greaterThanOrEqual"
                }, {
                    referenceAttribute: "height",
                    dataAttribute: "heightmax",
                    filterFunction: "lessThanOrEqual"
                }, {
                    referenceAttribute: "stepwidth",
                    dataAttribute: "escalatorstepwidth",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "speed",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }],
                compareTemplate: "escalator"
            })
        }), a(".bJS_productFinder-walkway").each(function () {
            new B.ProductFinder(this, {
                filters: [{
                    referenceAttribute: "pit_1",
                    dataAttribute: "pit",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "pit_2",
                    dataAttribute: "pit",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "pit_3",
                    dataAttribute: "pit",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "balustradetype",
                    dataAttribute: "balustrades",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "segment",
                    dataAttribute: "segments",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "inclination",
                    dataAttribute: "walkwayangleofinclination",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "height",
                    dataAttribute: "heightmin",
                    filterFunction: "greaterThanOrEqual"
                }, {
                    referenceAttribute: "height",
                    dataAttribute: "heightmax",
                    filterFunction: "lessThanOrEqual"
                }, {
                    referenceAttribute: "length",
                    dataAttribute: "lengthmin",
                    filterFunction: "greaterThanOrEqual"
                }, {
                    referenceAttribute: "length",
                    dataAttribute: "lengthmax",
                    filterFunction: "lessThanOrEqual"
                }, {
                    referenceAttribute: "stepwidth",
                    dataAttribute: "walkwaystepwidth",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }, {
                    referenceAttribute: "speed",
                    filterFunction: function (a, c) {
                        return b.contains(c, a)
                    }
                }],
                compareTemplate: "walkway",
                callbacks: {
                    onChangeValue: function (a) {
                        if ("inclination" == a.name) switch (a.value) {
                            case "":
                                a.productFinder.enableInput("height"), a.productFinder.enableInput("length");
                                break;
                            case "1":
                                a.productFinder.disableInput("height"), a.productFinder.enableInput("length");
                                break;
                            default:
                                a.productFinder.enableInput("height"), a.productFinder.disableInput("length")
                        }
                    }
                }
            })
        }), a(".noUi-handle").on("mousedown", function () {
            a(this).addClass("active")
        }), a(".noUi-handle").on("mouseup", function () {
            a(this).removeClass("active")
        })
    }

    function p() {
        var c = function (a) {
            if ("undefined" != typeof a && null !== a) return b.isArray(a) ? b.map(a, function (a) {
                return "string" != typeof a && (a = a.toString()), a
            }) : a.toString()
        },
            d = function (a, d) {
                return a = c(a), d = c(d), b.isArray(a) ? b.intersection(a, d).length > 0 : b.contains(d, a)
            },
            e = function (a, b) {
                return 0 == a || a == b
            };
        a(".bJS_references").each(function () {
            new B.References(this, {
                filters: [{
                    referenceAttribute: "elevatortype",
                    dataAttribute: "types",
                    filterFunction: d
                }, {
                    referenceAttribute: "referencetype",
                    filterFunction: e
                }, {
                    referenceAttribute: "products",
                    filterFunction: d
                }, {
                    referenceAttribute: "segment",
                    dataAttribute: "segments",
                    filterFunction: d
                }]
            })
        })
    }

    function q() {
        //console.log("sliderss");
        var b = a(".bJS_startpage-imageGallery"),
            c = ".bJS_paginationWrap",
            d = a(".bJS_imageGalleryLayout1"),
            e = a(".bJS_gallery"),
            f = "#bJS_imageGalleryLayout2",
            g = "#bJS_imageGalleryPaginationslider",
            h = a(".bJS_news-slider");
        a(window).load(function () {
            b.slick({
                dots: !0,
                arrows: !1,
                autoplay: !0,
                autoplaySpeed: 5e3,
                customPaging: function () {
                    return '<button type="button"></button>'
                },
                vertical: !1,
                onInit: function (b) {
                    var d = a("<i class='b_icon b_icon-arrowDown b_pagination-prev'></i>"),
                        e = a("<i class='b_icon b_icon-arrowUp b_pagination-next'></i>");
                    b.$slider.find(".slick-dots").wrap("<div class='b_paginationWrap " + c.slice(1) + "'><div class='b_paginationWrap-inner'></div></div>"), b.$slider.find(".b_paginationWrap-inner").append(d), b.$slider.find(".b_paginationWrap-inner").prepend(e);
                    var f = b.$slider.find(c);
                    a(f).css({
                        "margin-top": "-" + parseInt(f.height() / 2, 10) + "px"
                    }), d.on("click.slick", {
                        message: "next"
                    }, b.changeSlide), e.on("click.slick", {
                        message: "previous"
                    }, b.changeSlide)
                }
            })
        }), d.slick({
            dots: !0,
            arrows: !1,
            autoplay: !0,
            autoplaySpeed: 5e3,
            customPaging: function (a, b) {
                return '<button type="button"></button>'
            },
            onInit: function (b) {
                b.$slider.find(".slick-dots").wrap("<div class='b_paginationWrap'></div>").before(a('<i class="b_icon b_icon-arrowTeaser-small-back b_pagination-prev">').on("click.slick", {
                    message: "previous"
                }, b.changeSlide)).after(a('<i class="b_icon b_icon-arrowTeaser b_pagination-next">').on("click.slick", {
                    message: "next"
                }, b.changeSlide))
            }
        }), e.each(function () {
            var b = a(this).find("[id^=" + f.slice(1) + "]"),
                c = a(this).find("[id^=" + g.slice(1) + "]");
            b.slick({
                dots: !1,
                arrows: !1,
                autoplay: !0,
                autoplaySpeed: 5e3,
                asNavFor: "#" + b.data("naviimageid"),
                onInit: function (a) {
                    B.PopUps.push(new B.PopUp(a.$slider.parent()))
                }
            }), c.slick({
                arrows: !0,
                slidesToScroll: 1,
                asNavFor: "#" + c.data("bigimageid"),
                autoplay: !0,
                autoplaySpeed: 5e3,
                dots: !1,
                centerMode: !0,
                focusOnSelect: !0,
                prevArrow: '<i class="b_pagination-pager-prev b_icon b_icon-arrowTeaser-small-back"></i>',
                nextArrow: '<i class="b_pagination-pager-next b_icon b_icon-arrowTeaser-small"></i>',
                slidesToShow: 3,
                variableWidth: !0
            })
        }), h.slick({
            dots: !1,
            touchMove: !1,
            infinite: !0,
            arrows: !1,
            autoplay: !0,
            autoplaySpeed: 5e3,
            speed: 1e3,
            slidesToShow: 5,
            slidesToScroll: 1,
            variableWidth: !0,
            pauseOnHover: !0,
            swipe: !1,
            accessibility: !1,
            onInit: function (b) {
                a(".bJS_news-slider-next").click(function () {
                    b.$slider.slickNext()
                })
            }
        })
    }

    function r() {
        var b = a(".bJS_video");
        b.each(function () {
            B.Videos.push(new B.Video(a(this)))
        })
    }

    function s() {
        a(".b_headerSearch").find(".close").on("click", function () {
            a(".search-toggle").trigger("click")
        });
        var b = {
            $searchSelector: a("#ke_search_sword"),
            searchPosition: ".b_headerSearch",
            sword_amount: 10,
            wordMinLenght: 3
        };
        require(["jquery-ui"], function () {
            b.$searchSelector.autocomplete({
                appendTo: b.searchPosition,
                position: {
                    my: "left-34 top",
                    collision: "none"
                },
                source: function (a, c) {
                    jQuery.ajax({
                        url: "/index.php?eID=keSearchPremiumAutoComplete",
                        dataType: "json",
                        cache: !1,
                        data: {
                            wordStartsWith: a.term,
                            amount: b.sword_amount
                        },
                        success: function (a) {
                            c(a ? jQuery.map(a, function (a) {
                                return {
                                    label: a,
                                    value: a
                                }
                            }) : {})
                        }
                    })
                },
                select: function (c, d) {
                    a(b.searchPosition).val(d.item.value), a(this).closest("form").find('[type="submit"]').click()
                },
                minLength: b.wordMinLenght
            })
        })
    }

    function t() {
        function b() {
            require(["list"], function (b) {
                d = new b(e, l), a(f).ddslick({
                    width: "100%",
                    onSelected: function (a) {
                        var b = a.selectedIndex;
                        0 == b ? d.filter() : c(a.selectedData.text)
                    }
                }), a(".dd-container").on("click", function () {
                    a(this).parent().siblings().find(".dd-select").removeClass("dd-open")
                })
            }), j.on("click", function () {
                i.each(function () {
                    a(this).removeClass("b_languageDisabled").removeClass("b_fileDisabled")
                }), d.sort("name", {
                    order: "asc"
                }), d.search(), k.val(""), a(h).closest(".dd-container").ddslick("select", {
                    index: 0
                }), a(g).closest(".dd-container").ddslick("select", {
                    index: 0
                }), a(f).closest(".dd-container").ddslick("select", {
                    index: 0
                })
            }), a(h).ddslick({
                data: {},
                selectText: "",
                width: "100%",
                onSelected: function (b) {
                    var c = b.selectedIndex;
                    0 == c ? i.each(function () {
                        a(this).removeClass("b_languageDisabled")
                    }) : i.each(function () {
                        var c = !1;
                        a.each(a(this).data("json").language, function (a, d) {
                            d == b.selectedData.value && (c = !0)
                        }), c ? a(this).removeClass("b_languageDisabled") : a(this).addClass("b_languageDisabled")
                    })
                }
            }), a(g).ddslick({
                width: "100%",
                onSelected: function (b) {
                    var c = b.selectedIndex;
                    0 == c ? a(this).removeClass("b_fileDisabled") : i.each(function () {
                        a(this).data("json").filetype == b.selectedData.value ? a(this).removeClass("b_fileDisabled") : a(this).addClass("b_fileDisabled")
                    })
                }
            })
        }

        function c(a) {
            d.filter(function (b) {
                return b.values().category.trim() == a
            })
        }
        var d = {},
            e = "bJS_sortableTable",
            f = "#bJS_download-filter-category",
            g = "#bJS_download-filter-file",
            h = "#bJS_download-filter-language",
            i = a(".bJS_downloadItem"),
            j = a(".bJS_downloads-reset"),
            k = a(".bJS_downloads-search"),
            l = {
                valueNames: ["category", "name", "date"]
            };
        return b()
    }
    return a.fn.goTo = function (b, c) {
        var d = a.Deferred();
        return this.length > 0 ? a("html, body").finish().animate({
            scrollTop: a(this).offset().top - (b || 0) + "px"
        }, "duration", "linear", function () {
            d.resolve()
        }) : d.reject(), d.promise()
    }, B.Accordions = [], B.PopUps = [], B.Videos = [], B.ClearForms = [], B.browser = {
        isIE8: function () {
            return e.msie && "8.0" == e.version
        }
    }, B.Accordion = function (b) {
        function c(a) {
            f.$el = a, f.$collapseTriggers = f.$el.find(g.collapsibleItems), d()
        }

        function d() {
            f.$collapseTriggers.on("click", h.onClickCollapseTrigger)
        }

        function e(a) {
            return f.$el.find(a.attr("href"))
        }
        var f = this,
            g = {
                collapsibleItems: ".bJS_collapsible-item"
            },
            h = {
                onClickCollapseTrigger: function (b) {
                    b.preventDefault(), f.toggleTrigger(a(b.currentTarget))
                }
            };
        return f.openTrigger = function (b) {
            var c = f.$collapseTriggers.not("collapsed").not(b),
                d = e(b);
            c.each(function () {
                f.collapseTrigger(a(this))
            }), b.removeClass("collapsed"), d.addClass("in")
        }, f.collapseTrigger = function (a) {
            var b = e(a);
            a.addClass("collapsed"), b.removeClass("in")
        }, f.toggleTrigger = function (a) {
            a.hasClass("collapsed") ? f.openTrigger(a) : f.collapseTrigger(a)
        }, c(b)
    }, B.ClearForm = function (a) {
        function b(a) {
            return d.$el = a, d.$inputFields = d.$el.closest("form").find("input[type=text], textarea"), c(), d
        }

        function c() {
            d.$el.on("click", e.onClickClear)
        }
        var d = this,
            e = {
                onClickClear: function () {
                    d.$inputFields.val("")
                }
            };
        return b(a)
    }, B.LanguageSwitch = function (b) {
        function c(a) {
            e.$el = a, e.$menu = a.find(f.menu), e.$languageLinks = e.$el.find(f.langLinks), d()
        }

        function d() {
            B.util.isTouchDevice() && (b.on("click", function (a) {
                a.preventDefault()
            }), b.on("touchstart", g.onTouchSwitch), e.$languageLinks.on("touchstart", g.onTouchLink))
        }
        var e = this,
            f = {
                langLinks: "a",
                menu: ".bJS_languageMenu"
            },
            g = {
                onTouchSwitch: function () {
                    e.openMenu()
                },
                onTouchLink: function (b) {
                    var c = a(b.currentTarget).attr("href");
                    c && (window.location.href = c)
                }
            };
        return e.openMenu = function () { }, c(b)
    }, B.PopUp = function (a) {
        function b(a) {
            d.$el = a, d.$openPopUp = d.$el.find(e.openPopUp), d.$el.find(e.popUpImage).magnificPopup({
                type: "image"
            }), c()
        }

        function c() {
            d.$openPopUp.on("click", function () {
                d.$el.find(".slick-active a").trigger("click")
            })
        }
        var d = this,
            e = {
                openPopUp: ".bJS_openPopup",
                popUpImage: ".bJS_popupImage"
            };
        b(a)
    }, B.ProductFinder = function (a, b) {
        var c = this;
        c.initialize(a, b)
    }, B.ProductFinder.prototype = {
        initialize: function (c, e) {
            var f = this,
                g = arguments.callee;
            f._setUpdateLock(g), f.$el = a(c), f.opts = e || {}, f.allLabels = f.$el.data("alllabels"), f.sliders = [], f.ddIds = [], f.$filter = f.$el.find(".bJS_filter"), f.$filterForm = f.$filter.find(".bJS_filterForm"), f.$heading = f.$el.siblings("h2"), f.$btnBack = f.$el.find(".bJS_filter-back"), f.$btnCompare = f.$el.find(".bJS_compare"), f.$btnProductDetailLink = f.$el.find(".bJS_compare-product-detail"), f.$btnReset = f.$filter.find(".bJS_filter-reset"), f.$btnShowResults = f.$el.find(".bJS_filter-showResults"), f.$btnResetMobile = f.$el.find(".bJS_filter-reset-mobile"), f.$filterSliders = f.$el.find(".bJS_productfinder-filter-slider"), f.$inputFields = f.$filterForm.find("input"), f.$productsContainer = f.$el.find(".bJS_filtered-products"), f.$products = f.$el.find(".bJS_productfinder-product"), f.$explanationTexts = f.$el.find(".bJS_productfinder-filter-explanationTexts"), f.$noResultMessage = f.$el.find(".bJS_noResultMessage"), f.$filterSliders.each(function () {
                var a = new B.Slider(this);
                f.sliders.push(a), a.explanationTexts && b.each(a.explanationTexts, function (a) {
                    f.$explanationTexts.append("<span>" + a + "</span>")
                })
            }), f.opts.infosToShow = f.getInfosForCompareLayer(), f.products = f._processProducts(f.$products), f._filter = new d.Filter({
                subFilters: f.opts.filters
            }), b.bindAll(f, "hideResults", "onChangeValue", "resetFilter", "showResults", "compareProducts", "openDetailLayer"), a(".bJS_productfinder-filter-dropdown").each(function () {
                var b = a(this),
                    c = b.attr("id"),
                    d = {
                        width: "100%"
                    };
                c ? d.onSelected = function (b) {
                    a('.bJS_productfinder-filter-slider[data-selectid="' + c + '"] .bJS_productfinder-filter-slider-bar').val(b.selectedIndex), f.onChangeValue(b.selectedData.value, b.original.attr("name"), a("#" + c))
                } : d.onSelected = function (b) {
                    f.onChangeValue(b.selectedData.value, b.original.name, a('input[name="' + b.original.name + '"]'))
                }, b.ddslick(d)
            }), f.bindEvents(), f.updateView(), f._removeUpdateLock(g), f.$btnCompare.css({
                visibility: "hidden"
            })
        },
        _processProducts: function (b) {
            var c = [];
            return b.each(function () {
                var b, d = a(this),
                    e = d.data("info");
                e.$el = d, b = d.find(".b_productfinder-product-image img"), b.length > 0 ? e.image = b.attr("src") : e.image = void 0, c.push(e)
            }), c
        },
        _removeUpdateLock: function (a, b) {
            var c = this;
            return !(!c._updateLock || !b && a !== c._updateLock) && (delete c._updateLock, !0)
        },
        _setUpdateLock: function (a, b) {
            var c = this;
            return !(!b && c._updateLock) && (c._updateLock = a, !0)
        },
        bindEvents: function () {
            var b = this,
                c = B.util.isTouchDevice();
            b.$inputFields.on("change", function () {
                var c = a(this);
                b.onChangeValue(c.val(), c.attr("name"), c)
            }), b.$btnShowResults.on("click", b.showResults), b.$btnReset.on("click", function (a) {
                b.resetFilter(), a.preventDefault()
            }), b.$btnResetMobile.on("click", function (a) {
                b.resetFilter(), a.preventDefault()
            }), b.$btnBack.on("click", function (a) {
                b.hideResults(), a.preventDefault()
            }), b.$btnCompare.on("click", b.compareProducts), b.$btnProductDetailLink.on(c ? "touchstart" : "click", function (d) {
                var e = a(d.currentTarget),
                    f = e.closest(".bJS_productfinder-product");
                d.preventDefault(), c && !f.hasClass("b_active") || b.openDetailLayer(a(this))
            }), b.$productsContainer.on("change", 'input[type="checkbox"]', function () {
                b.$productsContainer.find('input[type="checkbox"]:checked').length > 1 ? b.$btnCompare.css({
                    visibility: "visible"
                }) : b.$btnCompare.css({
                    visibility: "hidden"
                })
            }), c ? (b.$products.on("touchend", function (b) {
                var c = a(b.currentTarget);
                c.hasClass("b_active") || (b.preventDefault(), c.addClass("b_active"))
            }), a(window).on("touchstart", function (c) {
                var d = a.extend({}, b.$products).filter(".b_active");
                d.each(function () {
                    a.contains(this, c.target) || a(this).removeClass("b_active")
                })
            })) : (b.$products.on("mouseenter", function (b) {
                a(b.currentTarget).addClass("b_active")
            }), b.$products.on("mouseleave", function (b) {
                a(b.currentTarget).removeClass("b_active")
            }))
        },
        disableInput: function (a) {
            var b = this,
                c = b.$el.find('input[name="' + a + '"]'),
                d = b.$el.find('.bJS_productfinder-filter-slider[data-name="' + a + '"]'),
                e = d.find(".bJS_productfinder-filter-slider-bar");
            if (c.attr("disabled", "disabled"), d.addClass("disabled"), e.attr("disabled", "disabled"), c.hasClass("dd-selected-value")) {
                var f = c.closest(".dd-container");
                f.addClass("disabled"), 0 == f.children(".b_clickShield").length && f.append('<div class="b_clickShield"></div>')
            }
        },
        enableInput: function (a) {
            var b = this,
                c = b.$el.find('input[name="' + a + '"]'),
                d = b.$el.find('.bJS_productfinder-filter-slider[data-name="' + a + '"]'),
                e = d.find(".bJS_productfinder-filter-slider-bar");
            if (c.removeAttr("disabled"), d.removeClass("disabled"), e.removeAttr("disabled"), c.hasClass("dd-selected-value")) {
                var f = c.closest(".dd-container");
                f.removeClass("disabled"), f.children(".b_clickShield").remove()
            }
        },
        onChangeValue: function (a, c, d) {
            var e = this;
            e.opts.callbacks && b.isFunction(e.opts.callbacks.onChangeValue) && e.opts.callbacks.onChangeValue.call(e, {
                name: c,
                value: a,
                formData: e.getFilterValues(),
                $inputEl: d,
                productFinder: e
            }), e.updateView()
        },
        filterProducts: function () {
            var a = this,
                b = a.getFilterValues(),
                c = a.getProducts();
            return a._filter ? a._filter.filter(b, c) : c
        },
        getFilterValues: function () {
            var a = this,
                c = a.$filterForm.serializeArray(),
                d = {};
            return b.each(c, function (a) {
                d[a.name] = a.value
            }), d
        },
        getProducts: function () {
            var a = this;
            return a.products.slice()
        },
        resetFilter: function () {
            var b = this;
            b._setUpdateLock(arguments.callee), b.$filterForm.get(0).reset(), b.$filterForm.find(".dd-container").each(function () {
                a(this).ddslick("select", {
                    index: 0
                })
            }), b.updateView(), b._removeUpdateLock(arguments.callee)
        },
        hideResults: function () {
            var a = this;
            a.$productsContainer.addClass("hidden-xs"), a.$noResultMessage.hide(), a.$btnShowResults.show(), a.$filter.removeClass("hidden-xs"), a.$heading.removeClass("hidden-xs")
        },
        showResults: function () {
            var a = this;
            a.$visibleProductEls.length > 0 ? (a.$productsContainer.removeClass("hidden-xs"), a.$noResultMessage.hide(), a.$btnShowResults.hide(), a.$filter.addClass("hidden-xs"), a.$heading.addClass("hidden-xs")) : (a.$productsContainer.addClass("hidden-xs"), a.$noResultMessage.show(), a.$btnShowResults.hide(), a.$filter.addClass("hidden-xs"), a.$heading.addClass("hidden-xs"))
        },
        updateView: function () {
            var c = this;
            if (!c._updateLock || arguments.callee.caller == c._updateLock) {
                var d = c.filterProducts(),
                    e = a(b.map(d, function (a) {
                        return a.$el.get(0)
                    }));
                c.$products.not(e).hide(), e.show(), c.$visibleProductEls = e, e.length >= 1 ? (c.$btnShowResults.show(), c.$noResultMessage.hide()) : (c.$btnShowResults.hide(), c.$noResultMessage.show()), e.length >= 2 ? (c.$btnCompare.show(), c.$visibleProductEls.find(".checkbox").css({
                    visibility: "visible"
                })) : (c.$btnCompare.hide(), c.$visibleProductEls.find(".checkbox").css({
                    visibility: "hidden"
                })), c.$el.find(".noUi-handle").removeClass("active")
            }
        },
        getAllSelectedProduction: function () {
            var a = this,
                c = [],
                d = a.getProducts();
            return b.each(d, function (a) {
                a.$el.find('input[type="checkbox"]').is(":checked") && c.push(a)
            }), c
        },
        getInfosForCompareLayer: function () {
            return this.$products.first().data("infolabels")
        },
        compareProducts: function () {
            var b = this,
                c = b.getAllSelectedProduction();
            require(["tpl!templates/compareProducts.tpl"], function (d) {
                a.magnificPopup.open({
                    items: {
                        src: d({
                            allLabels: b.allLabels,
                            products: c,
                            infosToShow: b.opts.infosToShow,
                            compareTemplate: b.opts.compareTemplate
                        }),
                        type: "inline"
                    },
                    closeBtnInside: !0
                })
            })
        },
        openDetailLayer: function (c) {
            var d = this,
                e = d.getProducts(),
                f = c.closest(".bJS_productfinder-product").attr("id"),
                g = [];
            b.each(e, function (a) {
                a.$el[0].id == f && g.push(a)
            }), require(["tpl!templates/compareProducts.tpl"], function (b) {
                a.magnificPopup.open({
                    items: {
                        src: b({
                            allLabels: d.allLabels,
                            products: g,
                            infosToShow: d.opts.infosToShow,
                            compareTemplate: d.opts.compareTemplate
                        }),
                        type: "inline"
                    },
                    closeBtnInside: !0
                })
            })
        }
    }, B.References = function (a, b) {
        var c = this;
        c.initialize(a, b)
    }, B.References.prototype = {
        initialize: function (c, e) {
            var f = this,
                g = arguments.callee;
            f._setUpdateLock(g), f.$el = a(c), f.opts = a.extend({
                displayedTeasers: {
                    xs: 6,
                    sm: 12
                },
                displayedPages: {
                    xs: 10
                }
            }, e || {}), f.productTypes = [], f.$filter = f.$el.find(".bJS_filter"), f.$filterForm = f.$filter.find(".bJS_filterForm"), f.$filterSelects = f.$filterForm.find(".bJS_references-filter-dropdown"), f.$btnBack = f.$el.find(".bJS_filter-back"), f.$btnReset = f.$filter.find(".bJS_filter-reset"), f.$btnShowResults = f.$el.find(".bJS_filter-showResults"), f.$inputFields = f.$filterForm.find("input"), f.$productsByTypeContainers = f.$filterForm.find(".bJS_references-productsByType"), f.$referencesContainer = f.$el.find(".bJS_filtered-references"), f.$referencesPagination = f.$referencesContainer.find(".bJS_references-pagination"), f.$referencesPaginationPrev = f.$referencesPagination.find(".bJS_references-pagination-prev"), f.$referencesPaginationNext = f.$referencesPagination.find(".bJS_references-pagination-next"), f.$referencesPaginationPages = f.$referencesPagination.find(".bJS_references-pagination-pages"), f.$references = f.$el.find(".bJS_references-reference"), f.references = f._processReferences(f.$references), f._filter = new d.Filter({
                subFilters: f.opts.filters
            }), f.$productsByTypeContainers.each(function () {
                f.productTypes.push(a(this).data("producttype"))
            }), f.currentProductType = null, f.currentReferenceType = null, f.currentPageNumber = 1, b.bindAll(f, "onChangeValue", "showResults", "hideResults", "toNextPage", "toPrevPage", "updateReferences"), f.$filterSelects.each(function () {
                var b = a(this),
                    c = {
                        width: "100%"
                    };
                c.onSelected = function (b) {
                    f.onChangeValue(b.selectedData.value, b.original.name, a('input[name="' + b.original.name + '"]'))
                }, b.ddslick(c)
            }), f.bindEvents(), f.updateReferences(), f._removeUpdateLock(g)
        },
        _processReferences: function (b) {
            var c = [];
            return b.each(function () {
                var b, d = a(this),
                    e = d.data("info");
                e.$el = d, b = d.find(".b_references-reference-image img"), b.length > 0 ? e.image = b.attr("src") : e.image = void 0, c.push(e)
            }), c
        },
        _removeUpdateLock: function (a, b) {
            var c = this;
            return !(!c._updateLock || !b && a !== c._updateLock) && (delete c._updateLock, !0)
        },
        _setUpdateLock: function (a, b) {
            var c = this;
            return !(!b && c._updateLock) && (c._updateLock = a, !0)
        },
        bindEvents: function () {
            var b = this;
            b.$inputFields.on("change", function () {
                var c = a(this);
                b.onChangeValue(c.val(), c.attr("name"), c)
            }), b.$btnShowResults.on("click", function (a) {
                a.preventDefault(), b.showResults()
            }), b.$btnReset.on("click", function (a) {
                b.resetFilter(), a.preventDefault()
            }), b.$btnBack.on("click", function (a) {
                b.hideResults(), a.preventDefault()
            }), b.$referencesPaginationNext.on("click", b.toNextPage), b.$referencesPaginationPrev.on("click", b.toPrevPage), B.BreakpointListener.onChangeBreakpoint(b.updateReferences)
        },
        onChangeValue: function (a, b, c) {
            var d = this;
            "elevatortype" == c.attr("name") && d.showProductsForType(c.val()), d.updateReferences()
        },
        filterReferences: function () {
            var a = this,
                b = a.getFilterValues(),
                c = a.getReferences();
            return a._filter ? a._filter.filter(b, c) : c
        },
        getFilterValues: function () {
            var a, c = this,
                d = c.$filterForm.serializeArray(),
                e = {};
            return a = b.groupBy(d, function (a) {
                return a.name
            }), b.each(a, function (a, c) {
                1 == a.length ? e[c] = a[0].value : e[c] = b.map(a, function (a) {
                    return a.value
                })
            }), e
        },
        getNumberOfDisplayedTeasers: function () {
            var a = this,
                b = B.BreakpointListener.getCurrentBreakpoint(),
                c = a.opts.displayedTeasers;
            switch (b) {
                case "md":
                    if (c.lg) return c.lg;
                case "sm":
                    if (c.sm) return c.sm;
                case "xs":
                    if (c.xs) return c.xs;
                default:
                    return 6
            }
        },
        getNumberOfDisplayedPages: function () {
            var a = this,
                b = B.BreakpointListener.getCurrentBreakpoint(),
                c = a.opts.displayedPages;
            switch (b) {
                case "md":
                    if (c.lg) return c.lg;
                case "sm":
                    if (c.sm) return c.sm;
                case "xs":
                    if (c.xs) return c.xs;
                default:
                    return 10
            }
        },
        getReferences: function () {
            var a = this;
            return a.references.slice()
        },
        resetFilter: function () {
            var b = this;
            b._setUpdateLock(arguments.callee), b.$filterForm.get(0).reset(), b.$filterForm.find(".dd-container").each(function () {
                a(this).ddslick("select", {
                    index: 0
                })
            }), b.$productsByTypeContainers.removeClass("b_active"), b.updateReferences(), b._removeUpdateLock(arguments.callee)
        },
        hideResults: function () {
            var a = this;
            a.$referencesContainer.addClass("hidden-xs"), a.$btnShowResults.show(), a.$filter.removeClass("hidden-xs")
        },
        setCurrentPage: function (a) {
            var b = this;
            b.currentPageNumber = a, b.updateReferences()
        },
        showResults: function () {
            var a = this;
            a.$visibleReferenceEls.length > 0 ? (a.$referencesContainer.removeClass("hidden-xs"), a.$btnShowResults.hide(), a.$filter.addClass("hidden-xs")) : (a.$referencesContainer.addClass("hidden-xs"), a.$btnShowResults.hide(), a.$filter.addClass("hidden-xs"))
        },
        showProductsForType: function (a) {
            var b = this;
            if (b.currentProductType != a) {
                var c = b.$productsByTypeContainers.filter('[data-producttype="' + a + '"]'),
                    d = c.find("input, select"),
                    e = b.$productsByTypeContainers.not(c),
                    f = e.find("input, select");
                c.addClass("b_active"), d.prop("disabled", !1), e.removeClass("b_active"), f.prop("disabled", !0)
            }
        },
        toNextPage: function () {
            var a = this;
            a.setCurrentPage(a.currentPageNumber + 1)
        },
        toPrevPage: function () {
            var a = this;
            a.setCurrentPage(a.currentPageNumber - 1)
        },
        updatePagination: function () {
            var b = this,
                c = b.getNumberOfDisplayedTeasers(),
                d = b.$visibleReferenceEls.length,
                e = Math.ceil(d / c),
                f = Math.max(Math.min(e, b.currentPageNumber), 1),
                g = b.getNumberOfDisplayedPages(),
                h = Math.max(Math.min(f - Math.floor((g - 1) / 2), e - g + 1), 1),
                i = Math.min(h + g - 1, e);
            if (b.currentPageNumber = f, b.$referencesPaginationPages.empty(), e <= 1) b.$referencesPagination.hide();
            else {
                b.$referencesPagination.show();
                for (var j = h; j <= i; j++) b.$referencesPaginationPages.append('<div class="b_references-pagination-pages-page bJS_references-pagination-pages-page' + (j == f ? " b_active" : "") + '" data-page="' + j + '">' + j + "</div>");
                b.$referencesPagination.find(".bJS_references-pagination-pages-page").on("click", function (c) {
                    b.setCurrentPage(a(c.currentTarget).data("page"))
                })
            }
        },
        updateReferences: function () {
            var c = this,
                d = c.getNumberOfDisplayedTeasers();
            if (!c._updateLock || arguments.callee.caller == c._updateLock) {
                var e = c.filterReferences(),
                    f = a(b.map(e, function (a) {
                        return a.$el.get(0)
                    }));
                c.$references.hide(), c.$visibleReferenceEls = f, f.length >= 1 ? c.$btnShowResults.show() : c.$btnShowResults.hide(), f.length >= 2 ? c.$visibleReferenceEls.find(".checkbox").css({
                    visibility: "visible"
                }) : c.$visibleReferenceEls.find(".checkbox").css({
                    visibility: "hidden"
                }), c.updatePagination();
                for (var g = (c.currentPageNumber - 1) * d; g < c.currentPageNumber * d; g++) f[g] && f.eq(g).show()
            }
        }
    }, B.Slider = function (a) {
        var b = this;
        b.initialize(a)
    }, B.Slider.prototype = {
        initialize: function (c) {
            var d = this;
            d.$el = a(c), d.selectId = d.$el.data("selectid"), d.emptyValue = d.$el.data("emptyval"), d.values = d.$el.data("values"), d.emptyValue && d.values.unshift({
                label: d.emptyValue
            }), d.valueIndex = [], d.explanationTexts = [], d.$sliderBar = d.$el.find(".bJS_productfinder-filter-slider-bar"), d.$sliderBar = d.$sliderBar.noUiSlider({
                start: [0],
                step: 1,
                range: {
                    min: 0,
                    max: d.values.length - 1
                }
            }), d.$noUiBase = d.$sliderBar.find(".noUi-base"), b.each(d.values, function (a) {
                var b = '<span class="bJS_productfinder-filter-slider-scale-value b_productfinder-filter-slider-scale-value">' + a.label;
                a.explanationTextTag && (b += "<sup>" + a.explanationTextTag + "</sup>"), b += "</span>", d.$noUiBase.append(b), a.explanationText && d.explanationTexts.push("<sup>" + a.explanationTextTag + "</sup> " + a.explanationText), d.valueIndex.push(a)
            }), d.$scaleValues = d.$noUiBase.find(".bJS_productfinder-filter-slider-scale-value"), b.bindAll(d, "onChangeValue", "onSetValue", "onSlide", "updateSize"), B.browser.isIE8 ? setTimeout(function () {
                d.updateSize(), d.setActiveByIndex(0)
            }, 750) : (d.updateSize(), d.setActiveByIndex(0)), d.bindEvents()
        },
        bindEvents: function () {
            var a = this;
            B.BreakpointListener.onChangeBreakpoint(a.updateSize), a.$sliderBar.on({
                change: a.onChangeValue
            }), a.$sliderBar.on({
                set: a.onSetValue
            }), a.$sliderBar.on({
                slide: a.onSlide
            })
        },
        onChangeValue: function (b, c) {
            var d = this,
                e = Math.floor(c),
                f = d.getValueByIndex(e);
            d.setActiveByIndex(e), a("#" + d.selectId).val(f), d.selectId && a("#" + d.selectId + "-dd-placeholder").ddslick("select", {
                index: e
            })
        },
        onSetValue: function (a, b) {
            var c = this,
                d = Math.floor(b);
            setTimeout(function () {
                c.setActiveByIndex(d)
            }, 1)
        },
        onSlide: function (a, b) {
            var c = this,
                d = Math.floor(b);
            setTimeout(function () {
                c.setActiveByIndex(d)
            }, 1)
        },
        getValueByIndex: function (a) {
            var b = this;
            return b.valueIndex[a].value
        },
        setActiveByIndex: function (a) {
            var b = this;
            b.$scaleValues.removeClass("active"), b.$scaleValues.eq(a).addClass("active")
        },
        updateSize: function () {
            var b = this,
                c = b.$sliderBar.width(),
                d = c / (b.$scaleValues.length - 1);
            b.$scaleValues.each(function (b, c) {
                var e = a(c);
                e.css({
                    left: d * b + "px"
                })
            })
        },
        val: function () {
            var a = this;
            return a.$sliderBar.val.apply(a.$sliderBar, arguments)
        }
    }, B.TextProvider = {
        texts: {
            def: {
                mainNav_overview: "??bersicht"
            },
            en: {
                mainNav_overview: "Overview"
            },
            fr: {
                mainNav_overview: "Aper??u"
            },
            nl: {
                mainNav_overview: "Overzicht"
            }
        },
        getLanguage: function () {
            return a("html").attr("lang")
        },
        getValueForKey: function (a) {
            var b = this,
                c = b.getLanguage();
            if (c) {
                if (b.texts[c] && b.texts[c][a]) return b.texts[c][a];
                if (b.texts.def[a]) return b.texts.def[a]
            }
            return ""
        }
    }, B.Video = function (a) {
        function b(a) {
            return d.$el = a, d.$videoCaption = d.$el.find(e.videoCaption), d.$videoPoster = d.$el.find(e.videoPoster), d.$videoStart = d.$el.find(e.videoStart), d.$videoIFrame = d.$el.find(e.videoSource), c(), d
        }

        function c() {
            d.$videoStart.on("click", f.onClickStart)
        }
        var d = this,
            e = {
                videoCaption: ".bJS_caption",
                videoPoster: ".bJS_video-poster",
                videoStart: ".bJS_video-start",
                videoSource: "iframe"
            },
            f = {
                onClickStart: function () {
                    d.playVideo()
                }
            };
        return d.playVideo = function () {
            d.$videoCaption.hide(), d.$videoPoster.hide(), d.$videoIFrame[0].src += "?autoplay=1"
        }, b(a)
    }, B.util = {
        isTouchDevice: function () {
            return "ontouchend" in document
        }
    }, a(function () {
        g()
    }), B
}), require.config({
    paths: {
        "b_json-nav": "../../../../bower_components/b_json-nav/b_json-nav",
        bootstrap: "../../../../bower_components/bootstrap/dist/js/bootstrap",
        ddslick: "../../../../bower_components/ddslick/jquery.ddslick",
        gmaps: "../../../../bower_components/gmaps/gmaps",
        jquery: "../../../../bower_components/jquery/dist/jquery",
        "jquery.animate-enhanced": "../../../../bower_components/jquery.animate-enhanced/jquery.animate-enhanced.min",
        "magnific-popup": "../../../../bower_components/magnific-popup/dist/jquery.magnific-popup",
        requirejs: "../../../../bower_components/requirejs/require",
        "slick-carousel": "../../../../bower_components/slick-carousel/slick/slick.min",
        text: "../../../../bower_components/text/text",
        tpl: "../../../../bower_components/tpl/tpl",
        underscore: "../../../../bower_components/underscore/underscore",
        nouislider: "../../../../bower_components/nouislider/distribute/jquery.nouislider.all.min",
        breakpointlistener: "../../../../bower_components/breakpointlistener/dist/breakpointlistener.min",
        "jquery-ui": "../../../../bower_components/jquery-ui/jquery-ui",
        "b_data-filter": "../../../../bower_components/b_data-filter/b_data-filter",
        bowser: "../../../../bower_components/bowser/bowser",
        list: "list.min"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        ddslick: {
            deps: ["jquery"]
        },
        "jquery.animate-enhanced": {
            deps: ["jquery"]
        },
        "magnific-popup": {
            deps: ["jquery"]
        },
        "slick-carousel": {
            deps: ["jquery"]
        },
        tpl: {
            deps: ["text"]
        },
        "jquery-ui": {
            deps: ["jquery"]
        }
    },
    packages: []
}), require(["main"]), define("config", function () { }), define("tpl!templates/mainNavMobile.tpl", function () {
    return function (obj) {
        function renderSubTree(a, b, c, d) {
            var e = {};
            if (print('<ul class="b_jsonNav-container-subTree bJS_jsonNav-container-subTree b_jsonNav-level-' + d + '" data-itemuid="' + c + '">'), c && 0 != c) {
                var f = a.getItem(c);
                print('<li class="b_jsonNav-item b_jsonNav-itemBack bJS_jsonNav-itemBack" data-itemuid="' + f.uid + '"><span class="b_jsonNav-item-title">' + f.title + "</span></li>"), print('<li class="b_jsonNav-item b_jsonNav-item" data-itemuid="' + f.uid + '"><a href="' + f.url + '" class="b_jsonNav-item-title">' + B.TextProvider.getValueForKey("mainNav_overview") + "</a></li>")
            }
            for (var g in b) {
                var h = b[g],
                    i = "b_jsonNav-item";
                print('<li data-itemuid="' + h.uid + '" class="' + i);
                var j = a.getChildItems(h);
                j.length > 0 ? (print(' b_jsonNav-itemForward bJS_jsonNav-itemForward"><span class="b_jsonNav-item-title">' + h.title + "</span>"), e[h.uid] = j) : print('"><a href="' + h.url + '" class="b_jsonNav-item-title">' + h.title + "</a>"), print("</li>")
            }
            print("</ul>");
            for (var c in e) renderSubTree(a, e[c], c, d + 1)
        }
        var __p = [],
            print = function () {
                __p.push.apply(__p, arguments)
            };
        with (obj || {}) {
            __p.push("");
            var startLevel = 1,
                rootItems = navigation.getRootItems();
            __p.push('<div class="b_jsonNav-container-inner bJS_jsonNav-container-inner">'), renderSubTree(navigation, rootItems, 0, startLevel), __p.push("</div>")
        }
        return __p.join("")
    }
}), define("tpl!templates/mainNavDesktop.tpl", function () {
    return function (obj) {
        function renderSubTree(a, b, c, d) {
            var e = "b_jsonNav-container-subTree bJS_jsonNav-container-subTree b_jsonNav-level-" + d,
                f = "b_jsonNav-item bJS_jsonNav-item";
            switch (d) {
                case 3:
                    e += "", f += ""
            }
            print('<ul class="' + e + '" data-itemuid="' + c + '">');
            for (var g in b) {
                var h = b[g];
                print(0 == c && 0 == g ? '<li class="' + f + '" data-itemuid="' + h.uid + '"><a href="' + h.url + '"><i class="b_icon b_icon-home"></i></a>' : '<li class="' + f + '" data-itemuid="' + h.uid + '"><a href="' + h.url + '">' + h.title + "</a>");
                var i = a.getChildItems(h);
                if (i.length > 0) {
                    var j;
                    j = 1 == d && 1 != g ? d + 2 : d + 1, renderSubTree(a, i, h.uid, j)
                }
                print("</li>")
            }
            print("</ul>")
        }
        var __p = [],
            print = function () {
                __p.push.apply(__p, arguments)
            };
        with (obj || {}) {
            __p.push("");
            var startLevel = 1,
                rootItems = navigation.getRootItems();
            __p.push(""), renderSubTree(navigation, rootItems, 0, startLevel), __p.push("")
        }
        return __p.join("")
    }
});