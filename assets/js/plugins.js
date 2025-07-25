/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.6", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.6", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide())
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.6", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);



/* Progress Bar */

! function(e) {
    e.fn.skillBars = function(t) {
        var a = e.extend({
            from: 0,
            to: !1,
            speed: 1e3,
            interval: 100,
            decimals: 0,
            onUpdate: null,
            onComplete: null,
            classes: {
                skillBarBar: ".skillbar-bar",
                skillBarPercent: ".skill-bar-percent"
            }
        }, t);
        return this.each(function() {
            var t = e(this),
                n = 0 != a.to ? a.to : parseInt(t.attr("data-percent"));
            n > 100 && (n = 100);
            var l = a.from,
                r = Math.ceil(a.speed / a.interval),
                s = (n - l) / r,
                i = 0,
                o = setInterval(function() {
                    l += s, i++, e(t).find(a.classes.skillBarPercent).text(l.toFixed(a.decimals) + "%"), "function" == typeof a.onUpdate && a.onUpdate.call(t, l);
                    i >= r && (clearInterval(o), l = n, "function" == typeof a.onComplete && a.onComplete.call(t, l))
                }, a.interval);
            t.find(a.classes.skillBarBar).animate({
                width: parseInt(t.attr("data-percent")) + "%"
            }, a.speed)
        })
    }
}(jQuery);

/*! Parallax Background */
(function(i) {
    'use strict';

    function j() {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
    }(function() {
        for (var k = 0, l = ['ms', 'moz', 'webkit', 'o'], m = 0; m < l.length && !window.requestAnimationFrame; ++m) window.requestAnimationFrame = window[l[m] + 'RequestAnimationFrame'], window.cancelAnimationFrame = window[l[m] + 'CancelAnimationFrame'] || window[l[m] + 'CancelRequestAnimationFrame'];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(n) {
            var o = new Date().getTime(),
                q = Math.max(0, 16 - (o - k)),
                r = window.setTimeout(function() {
                    n(o + q)
                }, q);
            return k = o + q, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
            clearTimeout(n)
        })
    })(), i.fn.isOnScreen = function() {
        var k = i(window),
            l = {
                top: k.scrollTop(),
                left: k.scrollLeft()
            };
        l.right = l.left + k.width(), l.bottom = l.top + k.height();
        var m = this.offset();
        return m.right = m.left + this.outerWidth(), m.bottom = m.top + this.outerHeight(), !(l.right < m.left || l.left > m.right || l.bottom < m.top || l.top > m.bottom)
    }, i.fn.parallaxBackground = function(k) {
        return this.each(function() {
            function l(Y) {
                return F = Y.outerWidth(), B = Y.outerHeight(), M = r.height(), N = r.width(), j() && (U = 2), ('left' === X.parallaxDirection || 'right' === X.parallaxDirection) && (F += U * Math.ceil(N * parseFloat(X.parallaxSpeed))), ('up' === X.parallaxDirection || 'down' === X.parallaxDirection) && (B += U * Math.ceil(M * parseFloat(X.parallaxSpeed))), [F, B]
            }

            function m(Y, Z) {
                switch (I = parseInt(Y.css('padding-left').replace('px', '')), J = parseInt(Y.css('padding-right').replace('px', '')), G = parseInt(Y.css('padding-top').replace('px', '')), H = parseInt(Y.css('padding-bottom').replace('px', '')), K = (Z[1] - Y.outerHeight()) / 2, L = (Z[0] - Y.outerWidth()) / 2, X.parallaxDirection) {
                    case 'up':
                        Q = -I, R = -(K + G), S = 0;
                        break;
                    case 'down':
                        Q = -I, R = -(K + G), S = 0;
                        break;
                    case 'left':
                        Q = -(L + I), R = -G, S = 0;
                        break;
                    case 'right':
                        Q = -(L + I), R = -G, S = 0;
                }
                return [Q, R, S]
            }

            function n(Y) {
                switch (O = Y.offset(), X.parallaxDirection) {
                    case 'up':
                        O = O.top;
                        break;
                    case 'down':
                        O = O.top + Y.outerHeight();
                        break;
                    case 'left':
                        O = O.left + Y.outerWidth();
                        break;
                    case 'right':
                        O = O.left;
                }
                return parseFloat(O)
            }

            function o(Y) {
                return r.scrollTop() - Y
            }
            var q = i(this),
                r = i(window),
                u, v, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q = 0,
                R = 0,
                S = 0,
                T = 0,
                U = 1,
                W = q.data(),
                X = i.extend({}, {
                    parallaxBgImage: '',
                    parallaxBgPosition: 'center center',
                    parallaxBgRepeat: 'no-repeat',
                    parallaxBgSize: 'cover',
                    parallaxSpeed: 0.5,
                    parallaxDirection: 'up'
                }, k, W);
            1 < X.parallaxSpeed ? X.parallaxSpeed = 1 : 0 > X.parallaxSpeed && (X.parallaxSpeed = 0), 1 > q.find('.parallax-inner').length && q.prepend('<div class="parallax-inner"></div>'), u = q.find('.parallax-inner'), v = l(q), A = m(q, v), q.css({
                position: 'relative',
                background: 'transparent',
                overflow: 'hidden',
                'z-index': '1'
            }), u.css({
                position: 'absolute',
                'background-image': 'url(' + X.parallaxBgImage + ')',
                'background-position': X.parallaxBgPosition,
                'background-repeat': X.parallaxBgRepeat,
                'background-size': X.parallaxBgSize,
                width: v[0],
                height: v[1],
                transform: 'translate3d(' + A[0] + 'px, ' + A[1] + 'px, ' + A[2] + 'px)',
                transition: 'transform 100ms',
                'z-index': '-1'
            }), r.on('resize', function() {
                v = l(q), A = m(q, v), u.css({
                    width: v[0],
                    height: v[1],
                    transform: 'translate3d(' + A[0] + 'px, ' + A[1] + 'px, ' + A[2] + 'px)'
                })
            }), ('left' === X.parallaxDirection || 'right' === X.parallaxDirection) && (C = 0, D = A[0]), ('up' === X.parallaxDirection || 'down' === X.parallaxDirection) && (C = 0, D = A[1]), P = r.scrollTop(), r.on('scroll', function() {
                0 < P && (T = o(P)), P = r.scrollTop(), q.isOnScreen() ? (C = T * (parseFloat(X.parallaxSpeed) / 4), 'up' === X.parallaxDirection && n(q) > n(u) + 50 && (D += -C, E = 'translate3d(' + A[0] + 'px, ' + D + 'px, ' + A[2] + 'px)'), 'down' === X.parallaxDirection && n(q) + 50 < n(u) && (D += C, E = 'translate3d(' + A[0] + 'px, ' + D + 'px, ' + A[2] + 'px)'), 'left' === X.parallaxDirection && n(q) + 50 < n(u) && (D += C, E = 'translate3d(' + D + 'px, ' + A[1] + 'px, ' + A[2] + 'px)'), 'right' === X.parallaxDirection && n(q) > n(u) + 50 && (D += -C, E = 'translate3d(' + D + 'px, ' + A[1] + 'px, ' + A[2] + 'px)'), u.css({
                    width: v[0],
                    height: v[1],
                    transform: E
                })) : (('up' === X.parallaxDirection || 'down' === X.parallaxDirection) && (D = A[1]), ('left' === X.parallaxDirection || 'right' === X.parallaxDirection) && (D = A[0]), u.css({
                    width: v[0],
                    height: v[1],
                    transform: 'translate3d(' + A[0] + 'px, ' + A[1] + 'px, ' + A[2] + 'px)'
                }))
            })
        })
    }
})(jQuery);


/*!
 * Masonry PACKAGED v3.3.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(a) {
    function b() {}

    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
            })
        }

        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h],
                            k = a.data(j, b);
                        if (k)
                            if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                                var l = k[e].apply(k, g);
                                if (void 0 !== l) return l
                            } else f("no such method '" + e + "' for " + b + " instance");
                        else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
                })
            }
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a)
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b)
            }, a.bridget
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window),
function(a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c
    }
    var c = document.documentElement,
        d = function() {};
    c.addEventListener ? d = function(a, b, c) {
        a.addEventListener(b, c, !1)
    } : c.attachEvent && (d = function(a, c, d) {
        a[c + d] = d.handleEvent ? function() {
            var c = b(a);
            d.handleEvent.call(d, c)
        } : function() {
            var c = b(a);
            d.call(a, c)
        }, a.attachEvent("on" + c, a[c + d])
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
        a.removeEventListener(b, c, !1)
    } : c.detachEvent && (e = function(a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c]
        } catch (d) {
            a[b + c] = void 0
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(window),
function() {
    function a() {}

    function b(a, b) {
        for (var c = a.length; c--;)
            if (a[c].listener === b) return c;
        return -1
    }

    function c(a) {
        return function() {
            return this[a].apply(this, arguments)
        }
    }
    var d = a.prototype,
        e = this,
        f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
        } else b = d[a] || (d[a] = []);
        return b
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a),
            f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        })
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b)
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b)
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener,
            g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
            for (d = c.length; d--;) f.call(this, b, c[d]);
        else
            for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this
    }, d.removeEvent = function(a) {
        var b, c = typeof a,
            d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
            for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g)
            if (g.hasOwnProperty(e))
                for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b)
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, d._getEvents = function() {
        return this._events || (this._events = {})
    }, a.noConflict = function() {
        return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this),
    function(a) {
        function b(a) {
            if (a) {
                if ("string" == typeof d[a]) return a;
                a = a.charAt(0).toUpperCase() + a.slice(1);
                for (var b, e = 0, f = c.length; f > e; e++)
                    if (b = c[e] + a, "string" == typeof d[b]) return b
            }
        }
        var c = "Webkit Moz ms Ms O".split(" "),
            d = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return b
        }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
    }(window),
    function(a) {
        function b(a) {
            var b = parseFloat(a),
                c = -1 === a.indexOf("%") && !isNaN(b);
            return c && b
        }

        function c() {}

        function d() {
            for (var a = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, b = 0, c = g.length; c > b; b++) {
                var d = g[b];
                a[d] = 0
            }
            return a
        }

        function e(c) {
            function e() {
                if (!m) {
                    m = !0;
                    var d = a.getComputedStyle;
                    if (j = function() {
                            var a = d ? function(a) {
                                return d(a, null)
                            } : function(a) {
                                return a.currentStyle
                            };
                            return function(b) {
                                var c = a(b);
                                return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
                            }
                        }(), k = c("boxSizing")) {
                        var e = document.createElement("div");
                        e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                        var g = document.body || document.documentElement;
                        g.appendChild(e);
                        var h = j(e);
                        l = 200 === b(h.width), g.removeChild(e)
                    }
                }
            }

            function h(a) {
                if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                    var c = j(a);
                    if ("none" === c.display) return d();
                    var f = {};
                    f.width = a.offsetWidth, f.height = a.offsetHeight;
                    for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) {
                        var o = g[m],
                            p = c[o];
                        p = i(a, p);
                        var q = parseFloat(p);
                        f[o] = isNaN(q) ? 0 : q
                    }
                    var r = f.paddingLeft + f.paddingRight,
                        s = f.paddingTop + f.paddingBottom,
                        t = f.marginLeft + f.marginRight,
                        u = f.marginTop + f.marginBottom,
                        v = f.borderLeftWidth + f.borderRightWidth,
                        w = f.borderTopWidth + f.borderBottomWidth,
                        x = h && l,
                        y = b(c.width);
                    y !== !1 && (f.width = y + (x ? 0 : r + v));
                    var z = b(c.height);
                    return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
                }
            }

            function i(b, c) {
                if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
                var d = b.style,
                    e = d.left,
                    f = b.runtimeStyle,
                    g = f && f.left;
                return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
            }
            var j, k, l, m = !1;
            return h
        }
        var f = "undefined" == typeof console ? c : function(a) {
                console.error(a)
            },
            g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty)
    }(window),
    function(a) {
        function b(a) {
            "function" == typeof a && (b.isReady ? a() : g.push(a))
        }

        function c(a) {
            var c = "readystatechange" === a.type && "complete" !== f.readyState;
            b.isReady || c || d()
        }

        function d() {
            b.isReady = !0;
            for (var a = 0, c = g.length; c > a; a++) {
                var d = g[a];
                d()
            }
        }

        function e(e) {
            return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
        }
        var f = a.document,
            g = [];
        b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
    }(window),
    function(a) {
        function b(a, b) {
            return a[g](b)
        }

        function c(a) {
            if (!a.parentNode) {
                var b = document.createDocumentFragment();
                b.appendChild(a)
            }
        }

        function d(a, b) {
            c(a);
            for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
                if (d[e] === a) return !0;
            return !1
        }

        function e(a, d) {
            return c(a), b(a, d)
        }
        var f, g = function() {
            if (a.matches) return "matches";
            if (a.matchesSelector) return "matchesSelector";
            for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
                var e = b[c],
                    f = e + "MatchesSelector";
                if (a[f]) return f
            }
        }();
        if (g) {
            var h = document.createElement("div"),
                i = b(h, "div");
            f = i ? b : e
        } else f = d;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return f
        }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
    }(Element.prototype),
    function(a, b) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(c, d) {
            return b(a, c, d)
        }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
    }(window, function(a, b, c) {
        var d = {};
        d.extend = function(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }, d.modulo = function(a, b) {
            return (a % b + b) % b
        };
        var e = Object.prototype.toString;
        d.isArray = function(a) {
            return "[object Array]" == e.call(a)
        }, d.makeArray = function(a) {
            var b = [];
            if (d.isArray(a)) b = a;
            else if (a && "number" == typeof a.length)
                for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
            else b.push(a);
            return b
        }, d.indexOf = Array.prototype.indexOf ? function(a, b) {
            return a.indexOf(b)
        } : function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b) return c;
            return -1
        }, d.removeFrom = function(a, b) {
            var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
        }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
            return a instanceof HTMLElement
        } : function(a) {
            return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
        }, d.setText = function() {
            function a(a, c) {
                b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
            }
            var b;
            return a
        }(), d.getParent = function(a, b) {
            for (; a != document.body;)
                if (a = a.parentNode, c(a, b)) return a
        }, d.getQueryElement = function(a) {
            return "string" == typeof a ? document.querySelector(a) : a
        }, d.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, d.filterFindElements = function(a, b) {
            a = d.makeArray(a);
            for (var e = [], f = 0, g = a.length; g > f; f++) {
                var h = a[f];
                if (d.isElement(h))
                    if (b) {
                        c(h, b) && e.push(h);
                        for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
                    } else e.push(h)
            }
            return e
        }, d.debounceMethod = function(a, b, c) {
            var d = a.prototype[b],
                e = b + "Timeout";
            a.prototype[b] = function() {
                var a = this[e];
                a && clearTimeout(a);
                var b = arguments,
                    f = this;
                this[e] = setTimeout(function() {
                    d.apply(f, b), delete f[e]
                }, c || 100)
            }
        }, d.toDashed = function(a) {
            return a.replace(/(.)([A-Z])/g, function(a, b, c) {
                return b + "-" + c
            }).toLowerCase()
        };
        var f = a.console;
        return d.htmlInit = function(c, e) {
            b(function() {
                for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
                    var k, l = g[i],
                        m = l.getAttribute(h);
                    try {
                        k = m && JSON.parse(m)
                    } catch (n) {
                        f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
                        continue
                    }
                    var o = new c(l, k),
                        p = a.jQuery;
                    p && p.data(l, e, o)
                }
            })
        }, d
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(c, d, e, f) {
            return b(a, c, d, e, f)
        }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
    }(window, function(a, b, c, d, e) {
        function f(a) {
            for (var b in a) return !1;
            return b = null, !0
        }

        function g(a, b) {
            a && (this.element = a, this.layout = b, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function h(a) {
            return a.replace(/([A-Z])/g, function(a) {
                return "-" + a.toLowerCase()
            })
        }
        var i = a.getComputedStyle,
            j = i ? function(a) {
                return i(a, null)
            } : function(a) {
                return a.currentStyle
            },
            k = d("transition"),
            l = d("transform"),
            m = k && l,
            n = !!d("perspective"),
            o = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[k],
            p = ["transform", "transition", "transitionDuration", "transitionProperty"],
            q = function() {
                for (var a = {}, b = 0, c = p.length; c > b; b++) {
                    var e = p[b],
                        f = d(e);
                    f && f !== e && (a[e] = f)
                }
                return a
            }();
        e.extend(g.prototype, b.prototype), g.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, g.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, g.prototype.getSize = function() {
            this.size = c(this.element)
        }, g.prototype.css = function(a) {
            var b = this.element.style;
            for (var c in a) {
                var d = q[c] || c;
                b[d] = a[c]
            }
        }, g.prototype.getPosition = function() {
            var a = j(this.element),
                b = this.layout.options,
                c = b.isOriginLeft,
                d = b.isOriginTop,
                e = a[c ? "left" : "right"],
                f = a[d ? "top" : "bottom"],
                g = parseInt(e, 10),
                h = parseInt(f, 10),
                i = this.layout.size;
            g = -1 != e.indexOf("%") ? g / 100 * i.width : g, h = -1 != f.indexOf("%") ? h / 100 * i.height : h, g = isNaN(g) ? 0 : g, h = isNaN(h) ? 0 : h, g -= c ? i.paddingLeft : i.paddingRight, h -= d ? i.paddingTop : i.paddingBottom, this.position.x = g, this.position.y = h
        }, g.prototype.layoutPosition = function() {
            var a = this.layout.size,
                b = this.layout.options,
                c = {},
                d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
                e = b.isOriginLeft ? "left" : "right",
                f = b.isOriginLeft ? "right" : "left",
                g = this.position.x + a[d];
            c[e] = this.getXValue(g), c[f] = "";
            var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
                i = b.isOriginTop ? "top" : "bottom",
                j = b.isOriginTop ? "bottom" : "top",
                k = this.position.y + a[h];
            c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this])
        }, g.prototype.getXValue = function(a) {
            var b = this.layout.options;
            return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px"
        }, g.prototype.getYValue = function(a) {
            var b = this.layout.options;
            return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px"
        }, g.prototype._transitionTo = function(a, b) {
            this.getPosition();
            var c = this.position.x,
                d = this.position.y,
                e = parseInt(a, 10),
                f = parseInt(b, 10),
                g = e === this.position.x && f === this.position.y;
            if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
            var h = a - c,
                i = b - d,
                j = {};
            j.transform = this.getTranslate(h, i), this.transition({
                to: j,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, g.prototype.getTranslate = function(a, b) {
            var c = this.layout.options;
            return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, a = this.getXValue(a), b = this.getYValue(b), n ? "translate3d(" + a + ", " + b + ", 0)" : "translate(" + a + ", " + b + ")"
        }, g.prototype.goTo = function(a, b) {
            this.setPosition(a, b), this.layoutPosition()
        }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
            this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
        }, g.prototype._nonTransition = function(a) {
            this.css(a.to), a.isCleaning && this._removeStyles(a.to);
            for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
        }, g.prototype._transition = function(a) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
            var b = this._transn;
            for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
            for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
            if (a.from) {
                this.css(a.from);
                var d = this.element.offsetHeight;
                d = null
            }
            this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
        };
        var r = "opacity," + h(q.transform || "transform");
        g.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: r,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(o, this, !1))
        }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
            this.ontransitionend(a)
        }, g.prototype.onotransitionend = function(a) {
            this.ontransitionend(a)
        };
        var s = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        g.prototype.ontransitionend = function(a) {
            if (a.target === this.element) {
                var b = this._transn,
                    c = s[a.propertyName] || a.propertyName;
                if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
                    var d = b.onEnd[c];
                    d.call(this), delete b.onEnd[c]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, g.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
        }, g.prototype._removeStyles = function(a) {
            var b = {};
            for (var c in a) b[c] = "";
            this.css(b)
        };
        var t = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return g.prototype.removeTransitionStyles = function() {
            this.css(t)
        }, g.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, g.prototype.remove = function() {
            if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var a = this;
            this.once("transitionEnd", function() {
                a.removeElem()
            }), this.hide()
        }, g.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var a = this.layout.options,
                b = {},
                c = this.getHideRevealTransitionEndProperty("visibleStyle");
            b[c] = this.onRevealTransitionEnd, this.transition({
                from: a.hiddenStyle,
                to: a.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: b
            })
        }, g.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, g.prototype.getHideRevealTransitionEndProperty = function(a) {
            var b = this.layout.options[a];
            if (b.opacity) return "opacity";
            for (var c in b) return c
        }, g.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var a = this.layout.options,
                b = {},
                c = this.getHideRevealTransitionEndProperty("hiddenStyle");
            b[c] = this.onHideTransitionEnd, this.transition({
                from: a.visibleStyle,
                to: a.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: b
            })
        }, g.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, g.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, g
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, e, f, g) {
            return b(a, c, d, e, f, g)
        }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
    }(window, function(a, b, c, d, e, f) {
        function g(a, b) {
            var c = e.getQueryElement(a);
            if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
            this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
            var d = ++k;
            this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var h = a.console,
            i = a.jQuery,
            j = function() {},
            k = 0,
            l = {};
        return g.namespace = "outlayer", g.Item = f, g.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
            e.extend(this.options, a)
        }, g.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, g.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, g.prototype._itemize = function(a) {
            for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                var g = b[e],
                    h = new c(g, this);
                d.push(h)
            }
            return d
        }, g.prototype._filterFindItemElements = function(a) {
            return e.filterFindElements(a, this.options.itemSelector)
        }, g.prototype.getItemElements = function() {
            for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
            return a
        }, g.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, a), this._isLayoutInited = !0
        }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
            this.getSize()
        }, g.prototype.getSize = function() {
            this.size = d(this.element)
        }, g.prototype._getMeasurement = function(a, b) {
            var c, f = this.options[a];
            f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
        }, g.prototype.layoutItems = function(a, b) {
            a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
        }, g.prototype._getItemsForLayout = function(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                e.isIgnored || b.push(e)
            }
            return b
        }, g.prototype._layoutItems = function(a, b) {
            if (this._emitCompleteOnItems("layout", a), a && a.length) {
                for (var c = [], d = 0, e = a.length; e > d; d++) {
                    var f = a[d],
                        g = this._getItemLayoutPosition(f);
                    g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
                }
                this._processLayoutQueue(c)
            }
        }, g.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, g.prototype._processLayoutQueue = function(a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this._positionItem(d.item, d.x, d.y, d.isInstant)
            }
        }, g.prototype._positionItem = function(a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c)
        }, g.prototype._postLayout = function() {
            this.resizeContainer()
        }, g.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var a = this._getContainerSize();
                a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
            }
        }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
            }
        }, g.prototype._emitCompleteOnItems = function(a, b) {
            function c() {
                e.dispatchEvent(a + "Complete", null, [b])
            }

            function d() {
                g++, g === f && c()
            }
            var e = this,
                f = b.length;
            if (!b || !f) return void c();
            for (var g = 0, h = 0, i = b.length; i > h; h++) {
                var j = b[h];
                j.once(a, d)
            }
        }, g.prototype.dispatchEvent = function(a, b, c) {
            var d = b ? [b].concat(c) : c;
            if (this.emitEvent(a, d), i)
                if (this.$element = this.$element || i(this.element), b) {
                    var e = i.Event(b);
                    e.type = a, this.$element.trigger(e, c)
                } else this.$element.trigger(a, c)
        }, g.prototype.ignore = function(a) {
            var b = this.getItem(a);
            b && (b.isIgnored = !0)
        }, g.prototype.unignore = function(a) {
            var b = this.getItem(a);
            b && delete b.isIgnored
        }, g.prototype.stamp = function(a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this.ignore(d)
                }
            }
        }, g.prototype.unstamp = function(a) {
            if (a = this._find(a))
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    e.removeFrom(this.stamps, d), this.unignore(d)
                }
        }, g.prototype._find = function(a) {
            return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
        }, g.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; b > a; a++) {
                    var c = this.stamps[a];
                    this._manageStamp(c)
                }
            }
        }, g.prototype._getBoundingRect = function() {
            var a = this.element.getBoundingClientRect(),
                b = this.size;
            this._boundingRect = {
                left: a.left + b.paddingLeft + b.borderLeftWidth,
                top: a.top + b.paddingTop + b.borderTopWidth,
                right: a.right - (b.paddingRight + b.borderRightWidth),
                bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
            }
        }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
            var b = a.getBoundingClientRect(),
                c = this._boundingRect,
                e = d(a),
                f = {
                    left: b.left - c.left - e.marginLeft,
                    top: b.top - c.top - e.marginTop,
                    right: c.right - b.right - e.marginRight,
                    bottom: c.bottom - b.bottom - e.marginBottom
                };
            return f
        }, g.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, g.prototype.bindResize = function() {
            this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
        }, g.prototype.unbindResize = function() {
            this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
        }, g.prototype.onresize = function() {
            function a() {
                b.resize(), delete b.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var b = this;
            this.resizeTimeout = setTimeout(a, 100)
        }, g.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, g.prototype.needsResizeLayout = function() {
            var a = d(this.element),
                b = this.size && a;
            return b && a.innerWidth !== this.size.innerWidth
        }, g.prototype.addItems = function(a) {
            var b = this._itemize(a);
            return b.length && (this.items = this.items.concat(b)), b
        }, g.prototype.appended = function(a) {
            var b = this.addItems(a);
            b.length && (this.layoutItems(b, !0), this.reveal(b))
        }, g.prototype.prepended = function(a) {
            var b = this._itemize(a);
            if (b.length) {
                var c = this.items.slice(0);
                this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
            }
        }, g.prototype.reveal = function(a) {
            this._emitCompleteOnItems("reveal", a);
            for (var b = a && a.length, c = 0; b && b > c; c++) {
                var d = a[c];
                d.reveal()
            }
        }, g.prototype.hide = function(a) {
            this._emitCompleteOnItems("hide", a);
            for (var b = a && a.length, c = 0; b && b > c; c++) {
                var d = a[c];
                d.hide()
            }
        }, g.prototype.revealItemElements = function(a) {
            var b = this.getItems(a);
            this.reveal(b)
        }, g.prototype.hideItemElements = function(a) {
            var b = this.getItems(a);
            this.hide(b)
        }, g.prototype.getItem = function(a) {
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                if (d.element === a) return d
            }
        }, g.prototype.getItems = function(a) {
            a = e.makeArray(a);
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var f = a[c],
                    g = this.getItem(f);
                g && b.push(g)
            }
            return b
        }, g.prototype.remove = function(a) {
            var b = this.getItems(a);
            if (this._emitCompleteOnItems("remove", b), b && b.length)
                for (var c = 0, d = b.length; d > c; c++) {
                    var f = b[c];
                    f.remove(), e.removeFrom(this.items, f)
                }
        }, g.prototype.destroy = function() {
            var a = this.element.style;
            a.height = "", a.position = "", a.width = "";
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                d.destroy()
            }
            this.unbindResize();
            var e = this.element.outlayerGUID;
            delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
        }, g.data = function(a) {
            a = e.getQueryElement(a);
            var b = a && a.outlayerGUID;
            return b && l[b]
        }, g.create = function(a, b) {
            function c() {
                g.apply(this, arguments)
            }
            return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
                f.apply(this, arguments)
            }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
        }, g.Item = f, g
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
    }(window, function(a, b, c) {
        var d = a.create("masonry");
        return d.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var a = this.cols;
            for (this.colYs = []; a--;) this.colYs.push(0);
            this.maxY = 0
        }, d.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var a = this.items[0],
                    c = a && a.element;
                this.columnWidth = c && b(c).outerWidth || this.containerWidth
            }
            var d = this.columnWidth += this.gutter,
                e = this.containerWidth + this.gutter,
                f = e / d,
                g = d - e % d,
                h = g && 1 > g ? "round" : "floor";
            f = Math[h](f), this.cols = Math.max(f, 1)
        }, d.prototype.getContainerWidth = function() {
            var a = this.options.isFitWidth ? this.element.parentNode : this.element,
                c = b(a);
            this.containerWidth = c && c.innerWidth
        }, d.prototype._getItemLayoutPosition = function(a) {
            a.getSize();
            var b = a.size.outerWidth % this.columnWidth,
                d = b && 1 > b ? "round" : "ceil",
                e = Math[d](a.size.outerWidth / this.columnWidth);
            e = Math.min(e, this.cols);
            for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
                    x: this.columnWidth * h,
                    y: g
                }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
            return i
        }, d.prototype._getColGroup = function(a) {
            if (2 > a) return this.colYs;
            for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
                var e = this.colYs.slice(d, d + a);
                b[d] = Math.max.apply(Math, e)
            }
            return b
        }, d.prototype._manageStamp = function(a) {
            var c = b(a),
                d = this._getElementOffset(a),
                e = this.options.isOriginLeft ? d.left : d.right,
                f = e + c.outerWidth,
                g = Math.floor(e / this.columnWidth);
            g = Math.max(0, g);
            var h = Math.floor(f / this.columnWidth);
            h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
            for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
        }, d.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var a = {
                height: this.maxY
            };
            return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        }, d.prototype._getContainerFitWidth = function() {
            for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
            return (this.cols - a) * this.columnWidth - this.gutter
        }, d.prototype.needsResizeLayout = function() {
            var a = this.containerWidth;
            return this.getContainerWidth(), a !== this.containerWidth
        }, d
    });


/*! Magnific Popup - v1.0.0 - 2015-09-17
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2015 Dmitry Semenov; */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7."), b.isIE8 = -1 !== c.indexOf("MSIE 8."), b.isLowIE = b.isIE7 || b.isIE8, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
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
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(a, c) {
                if (void 0 === c || c === !1) return !0;
                if (e = a.split("_"), e.length > 1) {
                    var d = b.find(p + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(p + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
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
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
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
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
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
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
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
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
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
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery",
                    g = Boolean(a.fn.mfpFastClick);
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s),
                            h = g ? "mfpFastClick" : "click";
                        e[h](function() {
                            b.prev()
                        }), f[h](function() {
                            b.next()
                        }), b.isIE7 && (x("b", e[0], !1, !0), x("a", e[0], !1, !0), x("b", f[0], !1, !0), x("a", f[0], !1, !0)), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowLeft && g && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            })
                        }), w("ElementParse." + U, function(b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                    }
                }
            }
        }),
        function() {
            var b = 1e3,
                c = "ontouchstart" in window,
                d = function() {
                    v.off("touchmove" + f + " touchend" + f)
                },
                e = "mfpFastClick",
                f = "." + e;
            a.fn.mfpFastClick = function(e) {
                return a(this).each(function() {
                    var g, h = a(this);
                    if (c) {
                        var i, j, k, l, m, n;
                        h.on("touchstart" + f, function(a) {
                            l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, v.on("touchmove" + f, function(a) {
                                m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d())
                            }).on("touchend" + f, function(a) {
                                d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                    g = !1
                                }, b), e())
                            })
                        })
                    }
                    h.on("click" + f, function() {
                        g || e()
                    })
                })
            }, a.fn.destroyMfpFastClick = function() {
                a(this).off("touchstart" + f + " click" + f), c && v.off("touchmove" + f + " touchend" + f)
            }
        }(), A()
});



/**!
 * @author odahcam
 * @see The boilerplate used here was https://github.com/odahcam/jQueryPlugin-Boilerplate
 * @external https://github.com/odahcam/jquery.parallax/
 */

/**
 * @param {object} $
 * @param {object} window
 * @param {object} document
 * @param {undefined} undefined
 * @return
 */
(function(d, f, g, b) {
    if (!d) {
        console.error("jQuery nÃ£o encontrado, seu plugin jQuery nÃ£o irÃ¡ funcionar.");
        return false
    }(function() {
        var k = 0,
            l = ["ms", "moz", "webkit", "o"];
        for (var j = 0; j < l.length && !f.requestAnimationFrame; ++j) {
            f.requestAnimationFrame = f[l[j] + "RequestAnimationFrame"];
            f.cancelAnimationFrame = f[l[j] + "CancelAnimationFrame"] || f[l[j] + "CancelRequestAnimationFrame"]
        }
        if (!f.requestAnimationFrame) {
            f.requestAnimationFrame = function(q, n) {
                var m = new Date().getTime();
                var o = Math.max(0, 16 - (m - k));
                var p = f.setTimeout(function() {
                    q(m + o)
                }, o);
                k = m + o;
                return p
            }
        }
        if (!f.cancelAnimationFrame) {
            f.cancelAnimationFrame = function(m) {
                clearTimeout(m)
            }
        }
    })();
    var e = "parallax",
        c = {
            on: "scroll",
            listenTo: f,
            sceneMode: false
        },
        a = d(f),
        i = 0;

    function h(k, j) {
        this._name = e;
        this._instance_id = ++i;
        this.el = k;
        this.$el = d(k);
        this.settings = d.extend(false, {}, c, j, this.$el.data());
        this.$triggerOrigin = d(this.settings.listenTo);
        this.init()
    }
    d.extend(h.prototype, {
        init: function() {
            var j = this;
            this.$triggerOrigin.on(j.settings.on + "." + j._name, function() {
                j.parallaxTranslate()
            });
            j.parallaxTranslate()
        },
        parallaxTranslate: function() {
            var j = this;
            if (j.inScreen()) {
                f.requestAnimationFrame(function() {
                    var k = a.scrollTop() - j.$el.offset().top;
                    j.$el.css("transform", "translateY(" + k / 2 + "px)")
                })
            }
            console.groupEnd()
        },
        destroy: function() {
            this.$el.removeData();
            d(this.settings.listenTo).off("." + e)
        },
        somePublicMethod: function(k, j) {
            privateMethod.call(this)
        },
        inScreen: function(l) {
            var o;
            if (typeof l !== "boolean" && l !== b) {
                o = d(l);
                l = arguments[1] || false
            } else {
                o = this.$el;
                l = l || false
            }
            var k = a.scrollTop(),
                n = k + a.height(),
                j = o.offset().top,
                m = j + o.height();
            if (l === true) {
                return k <= j && n >= m
            }
            return !(k > m || n < j)
        }
    });
    d.fn[e] = function(k) {
        var j = arguments;
        if (k === b || typeof k === "object") {
            return this.each(function() {
                if (!d.data(this, "plugin_" + e)) {
                    d.data(this, "plugin_" + e, new h(this, k))
                }
            })
        } else {
            if (typeof k === "string" && k !== "init") {
                return this.each(function() {
                    var l = d.data(this, "plugin_" + e);
                    if (l instanceof h && typeof l[k] === "function") {
                        l[k].apply(l, Array.prototype.slice.call(j, 1))
                    }
                })
            }
        }
    }
})(window.jQuery || false, window, document);



/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {
    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {
                threshold: 0
            });
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {
                threshold: 0
            });
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {
                threshold: 0
            });
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {
                threshold: 0
            });
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {
                threshold: 0
            });
        }
    });
})(jQuery);







/* Coundown Timer JS */

! function(a) {
    a.fn.countdown = function(b, c) {
        function e() {
            eventDate = Date.parse(d.date) / 1e3, currentDate = Math.floor(a.now() / 1e3), eventDate <= currentDate && (c.call(this), clearInterval(interval)), seconds = eventDate - currentDate, days = Math.floor(seconds / 86400), seconds -= 60 * days * 60 * 24, hours = Math.floor(seconds / 3600), seconds -= 60 * hours * 60, minutes = Math.floor(seconds / 60), seconds -= 60 * minutes, 1 == days ? thisEl.find(".timeRefDays").text("day") : thisEl.find(".timeRefDays").text("days"), 1 == hours ? thisEl.find(".timeRefHours").text("hour") : thisEl.find(".timeRefHours").text("hours"), 1 == minutes ? thisEl.find(".timeRefMinutes").text("minute") : thisEl.find(".timeRefMinutes").text("minutes"), 1 == seconds ? thisEl.find(".timeRefSeconds").text("second") : thisEl.find(".timeRefSeconds").text("seconds"), "on" == d.format && (days = String(days).length >= 2 ? days : "0" + days, hours = String(hours).length >= 2 ? hours : "0" + hours, minutes = String(minutes).length >= 2 ? minutes : "0" + minutes, seconds = String(seconds).length >= 2 ? seconds : "0" + seconds), isNaN(eventDate) ? (alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00"), clearInterval(interval)) : (thisEl.find(".days").text(days), thisEl.find(".hours").text(hours), thisEl.find(".minutes").text(minutes), thisEl.find(".seconds").text(seconds))
        }
        thisEl = a(this);
        var d = {
            date: null,
            format: null
        };
        b && a.extend(d, b), e(), interval = setInterval(e, 1e3)
    }
}(jQuery);







/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this),
                r = n,
                i = function() {
                    var e = [],
                        n = r.time / r.delay,
                        i = t.text(),
                        s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i),
                        u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt(i / n * f);
                        u && (l = parseFloat(i / n * f).toFixed(a));
                        if (s)
                            while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l)
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function() {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay);
                        else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null)
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay)
                };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
})(jQuery);







// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);



/*! WOW - v1.1.2 - 2015-08-19
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function(a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function(a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function() {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function() {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a)
            } : function(a) {
                return a()
            }
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);




/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, e.initials = {
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
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
        }
        var b = 0;
        return c
    }(), b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this,
            h = !1,
            i = d.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this,
            e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case "previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case "next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function() {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function() {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function(a) {
        var c, d, f, b = this,
            e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function() {
        var e, a = this,
            b = 0,
            c = 0,
            d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function() {
        return this
    }, b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this),
                    d = a(this).attr("data-lazy"),
                    e = document.createElement("img");
                e.onload = function() {
                    c.animate({
                        opacity: 0
                    }, 100, function() {
                        c.attr("src", d).animate({
                            opacity: 1
                        }, 200, function() {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }), b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }, e.onerror = function() {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
                }, e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this,
            d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
        }, g.onerror = function() {
            3 > b ? setTimeout(function() {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
        }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
            currentSlide: d
        }), c.init(), b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this,
            f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                    for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                    b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function(a) {
        var d, e, b = this,
            c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            })
        }), b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }, b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this,
            g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
        else if ("multiple" === h) a.each(e, function(a, c) {
            b.options[a] = c
        });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
        var a = this,
            b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null,
            i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
                case "left":
                case "down":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function(a) {
        var c, b = this;
        return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
        var f, g, a = this,
            c = arguments[0],
            d = Array.prototype.slice.call(arguments, 1),
            e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});


/*
 * jQuery Easing v1.3
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});


/*!
 * side-menu
 */

! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = void 0 !== document.ontouchstart,
        s = {
            init: function(t) {
                return t = e.extend({
                    iscroll: {
                        mouseWheel: !0,
                        preventDefault: !1
                    },
                    showOverlay: !0
                }, t), s.settings = {
                    state: !1,
                    events: {
                        opened: "side-menu.opened",
                        closed: "side-menu.closed"
                    },
                    dropdownEvents: {
                        opened: "shown.bs.dropdown",
                        closed: "hidden.bs.dropdown"
                    }
                }, s.settings.class = e.extend({
                    nav: "side-menu-nav",
                    toggle: "side-menu-toggle",
                    overlay: "side-menu-overlay",
                    open: "side-menu-open",
                    close: "side-menu-close",
                    dropdown: "side-menu-dropdown"
                }, t.class), this.each(function() {
                    var n = this,
                        r = e(this);
                    r.data("side-menu") || (t = e.extend({}, t), r.data("side-menu", {
                        options: t
                    }), s.refresh.call(n), t.showOverlay && s.addOverlay.call(n), e("." + s.settings.class.toggle).on("click.side-menu", function() {
                        return s.toggle.call(n), n.iScroll.refresh()
                    }), e(window).on("resize.side-menu", function() {
                        return s.close.call(n), n.iScroll.refresh()
                    }), e("." + s.settings.class.dropdown).on(s.settings.dropdownEvents.opened + " " + s.settings.dropdownEvents.closed, function() {
                        return n.iScroll.refresh()
                    }))
                })
            },
            refresh: function() {
                this.iScroll = new IScroll("." + s.settings.class.nav, e(this).data("side-menu").options.iscroll)
            },
            addOverlay: function() {
                var t = e(this),
                    n = e("<div>").addClass(s.settings.class.overlay + " " + s.settings.class.toggle);
                return t.append(n)
            },
            toggle: function() {
                var e = this;
                return s.settings.state ? s.close.call(e) : s.open.call(e)
            },
            open: function() {
                var n = e(this);
                return t && n.on("touchmove.side-menu", function(e) {
                    e.preventDefault()
                }), n.removeClass(s.settings.class.close).addClass(s.settings.class.open).sidemenuCallback(function() {
                    s.settings.state = !0, n.trigger(s.settings.events.opened)
                })
            },
            close: function() {
                var n = e(this);
                return t && n.off("touchmove.side-menu"), n.removeClass(s.settings.class.open).addClass(s.settings.class.close).sidemenuCallback(function() {
                    s.settings.state = !1, n.trigger(s.settings.events.closed)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var t = this,
                        n = e(this);
                    e("." + s.settings.class.toggle).off("click.side-menu"), e(window).off("resize.side-menu"), e("." + s.settings.class.dropdown).off(s.settings.dropdownEvents.opened + " " + s.settings.dropdownEvents.closed), t.iScroll.destroy(), n.removeData("side-menu").find("." + s.settings.class.overlay).remove()
                })
            }
        };
    e.fn.sidemenuCallback = function(t) {
        var s = "transitionend webkitTransitionEnd";
        return this.each(function() {
            var n = e(this);
            n.on(s, function() {
                return n.off(s), t.call(this)
            })
        })
    }, e.fn.sidemenu = function(t) {
        return s[t] ? s[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.side-menu") : s.init.apply(this, arguments)
    }
});


/* Type It */

! function(t, e) {
    "use strict";
    var i = t(document);
    t.fn.typeIt = function(i) {
        return this.each(function() {
            var s = t(this),
                h = s.data("typeit");
            h !== e && (clearTimeout(h.tTO), clearTimeout(h.dTO), s.removeData("typeit")), s.data("typeit", new t.typeIt(s, i))
        })
    }, t.typeIt = function(i, s) {
        this.d = {
            strings: [],
            speed: 100,
            deleteSpeed: e,
            lifeLike: !0,
            cursor: !0,
            cursorSpeed: 1e3,
            breakLines: !0,
            breakDelay: 750,
            deleteDelay: 750,
            startDelay: 250,
            startDelete: !1,
            loop: !1,
            loopDelay: 750,
            html: !0,
            autoStart: !0,
            callback: function() {}
        }, this.queue = [], this.queueIndex = 0, this.hasStarted = !1, this.inTag = !1, this.stringsToDelete = "", this.style = 'style="display:inline;position:relative;font:inherit;color:inherit;"', this.s = t.extend({}, this.d, s), this.el = i, this._init()
    }, t.typeIt.prototype = {
        _init: function() {
            this.el.find(".ti-container, .ti-cursor, .ti-placeholder").remove(), this._elCheck(), this.s.strings = this._toArray(this.s.strings), this.el.html('<i class="ti-placeholder" style="display:inline-block;line-height:0;visibility:hidden;overflow:hidden;">.</i><span ' + this.style + ' class="ti-container"></span>'), this.tel = this.el.find("span"), this.insert = function(t) {
                this.tel.append(t)
            }, this.s.startDelete && (this.tel.html(this.stringsToDelete), this.queue.push([this["delete"]])), this._generateQueue(), this._kickoff()
        },
        _kickoff: function() {
            this._cursor(), this.s.autoStart ? this._startQueue() : this._isVisible() ? (this.hasStarted = !0, this._startQueue()) : i.on("scroll", function() {
                this._isVisible() && !this.hasStarted && (this.hasStarted = !0, this._startQueue())
            }.bind(this))
        },
        _generateQueue: function() {
            for (var t = 0; t < this.s.strings.length; t++)
                if (this.queue.push([this.type, this.s.strings[t]]), t < this.s.strings.length - 1) {
                    var e = this.queue.length,
                        i = this.s.breakLines ? this.s.breakDelay : this.s.deleteDelay;
                    this.queue.push([this.s.breakLines ? this["break"] : this["delete"]]), this.queue.splice(e, 0, [this.pause, i / 2]), this.queue.splice(e + 2, 0, [this.pause, i / 2])
                }
        },
        _startQueue: function() {
            this._to(function() {
                this._executeQueue()
            }.bind(this), this.s.startDelay)
        },
        type: function(t, e) {
            e = "undefined" == typeof e || e, t = this._toArray(t), e && (t = this._rake(t), t = t[0]), this.tTO = setTimeout(function() {
                if (this._setPace(this), this.s.html && t[0].indexOf("<") !== -1 && t[0].indexOf("</") === -1 && !this.inTag) {
                    for (var e = t.length - 1; e >= 0; e--) t[e].indexOf("</") !== -1 && (this.tagCount = 1, this.tagDuration = e);
                    this._makeNode(t[0])
                } else this._print(t[0]);
                t.splice(0, 1), t.length ? this.type(t, !1) : this._executeQueue()
            }.bind(this), this.typePace)
        },
        pause: function(t) {
            t = t === e ? this.s.breakDelay : t, this._to(function() {
                this._executeQueue()
            }.bind(this), t)
        },
        "break": function() {
            this.insert("<br>"), this._executeQueue()
        },
        mergeSet: function(e) {
            this.s = t.extend({}, this.s, e), this._executeQueue()
        },
        _print: function(e) {
            this.inTag ? (t(this.tag, this.el).last().append(e), this.tagCount < this.tagDuration ? this.tagCount++ : this.inTag = !1) : this.insert(e)
        },
        empty: function() {
            this.tel.html(""), this._executeQueue()
        },
        "delete": function(t) {
            this.deleteTimeout = setTimeout(function() {
                this._setPace();
                for (var i = this.tel.html().split(""), s = t === e || null === t ? i.length - 1 : t + 1, h = i.length - 1; h > -1; h--) {
                    if (">" !== i[h] && ";" !== i[h] || !this.s.html) {
                        i.pop();
                        break
                    }
                    for (var n = h; n > -1; n--) {
                        if ("<br>" === i.slice(n - 3, n + 1).join("")) {
                            i.splice(n - 3, 4);
                            break
                        }
                        if ("&" === i[n]) {
                            i.splice(n, h - n + 1);
                            break
                        }
                        if ("<" === i[n] && ">" !== i[n - 1]) {
                            if (";" === i[n - 1])
                                for (var r = n - 1; r > -1; r--)
                                    if ("&" === i[r]) {
                                        i.splice(r, n - r);
                                        break
                                    }
                            i.splice(n - 1, 1);
                            break
                        }
                    }
                    break
                }
                if (this.tel.html().indexOf("></") > -1)
                    for (var u = this.tel.html().indexOf("></") - 2; u >= 0; u--)
                        if ("<" === i[u]) {
                            i.splice(u, i.length - u);
                            break
                        }
                this.tel.html(i.join("")), s > (t === e ? 0 : 2) ? this["delete"](t === e ? e : t - 1) : this._executeQueue()
            }.bind(this), this.deletePace)
        },
        _isVisible: function() {
            var e = t(window),
                i = {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                };
            i.right = i.left + e.width(), i.bottom = i.top + e.height();
            var s = this.el.outerHeight(),
                h = this.el.outerWidth();
            if (!h || !s) return !1;
            var n = this.el.offset();
            n.right = n.left + h, n.bottom = n.top + s;
            var r = !(i.right < n.left || i.left > n.right || i.bottom < n.top || i.top > n.bottom);
            if (!r) return !1;
            var u = {
                top: Math.min(1, (n.bottom - i.top) / s),
                bottom: Math.min(1, (i.bottom - n.top) / s),
                left: Math.min(1, (n.right - i.left) / h),
                right: Math.min(1, (i.right - n.left) / h)
            };
            return u.left * u.right >= 1 && u.top * u.bottom >= 1
        },
        _executeQueue: function() {
            if (this.queueIndex < this.queue.length) {
                var t = this.queue[this.queueIndex];
                this.queueIndex++, this.isLooping && 1 === this.queueIndex ? this._to(function() {
                    t[0].bind(this)(t[1])
                }.bind(this), this.s.loopDelay / 2) : t[0].bind(this)(t[1])
            } else this.s.loop ? (this.queueIndex = 0, this.isLooping = !0, this._to(function() {
                this["delete"]()
            }.bind(this), this.s.loopDelay / 2)) : this.s.callback()
        },
        _to: function(t, e) {
            setTimeout(function() {
                t()
            }.bind(this), e)
        },
        _elCheck: function() {
            !this.s.startDelete && this.el.html().replace(/(\r\n|\n|\r)/gm, "").length > 0 ? this.s.strings = this.el.html().trim() : this.s.startDelete && (this.stringsToDelete = this.el.html())
        },
        _toArray: function(t) {
            return t.constructor === Array ? t.slice(0) : t.split("<br>")
        },
        _cursor: function() {
            if (this.s.cursor) {
                this.el.append("<span " + this.style + 'class="ti-cursor">|</span>');
                var t = this.s.cursorSpeed,
                    e = this;
                ! function i() {
                    e.el.find(".ti-cursor").fadeTo(t / 2, 0).fadeTo(t / 2, 1), e._to(i, t)
                }()
            }
        },
        _setPace: function() {
            var t = this.s.speed,
                i = this.s.deleteSpeed !== e ? this.s.deleteSpeed : this.s.speed / 3,
                s = t / 2,
                h = i / 2;
            this.typePace = this.s.lifeLike ? this._randomInRange(t, s) : t, this.deletePace = this.s.lifeLike ? this._randomInRange(i, h) : i
        },
        _randomInRange: function(t, e) {
            return Math.abs(Math.random() * (t + e - (t - e)) + (t - e))
        },
        _rake: function(t) {
            for (var e = 0; e < t.length; e++)
                if (t[e] = t[e].split(""), this.s.html) {
                    this.tPos = [];
                    for (var i, s = this.tPos, h = !1, n = 0; n < t[e].length; n++) "<" !== t[e][n] && "&" !== t[e][n] || (s[0] = n, h = "&" === t[e][n]), (">" === t[e][n] || ";" === t[e][n] && h) && (s[1] = n, n = 0, i = t[e].slice(s[0], s[1] + 1).join(""), t[e].splice(s[0], s[1] - s[0] + 1, i), h = !1)
                }
            return t
        },
        _makeNode: function(e) {
            this.tag = t(t.parseHTML(e)), this._print(this.tag), this.inTag = !0
        }
    }, t.fn.tiType = function(s) {
        var h = t(this).data("typeit");
        return h === e ? i : (h.queue.push([h.type, s]), this)
    }, t.fn.tiEmpty = function() {
        var s = t(this).data("typeit");
        return s === e ? i : (s.queue.push([s.empty]), this)
    }, t.fn.tiDelete = function(s) {
        var h = t(this).data("typeit");
        return h === e ? i : (h.queue.push([h["delete"], s]), this)
    }, t.fn.tiPause = function(s) {
        var h = t(this).data("typeit");
        return h === e ? i : (h.queue.push([h.pause, s]), this)
    }, t.fn.tiBreak = function() {
        var s = t(this).data("typeit");
        return s === e ? i : (s.queue.push([s["break"]]), this)
    }, t.fn.tiSettings = function(s) {
        var h = t(this).data("typeit");
        return h === e ? i : (h.queue.push([h.mergeSet, s]), this)
    }
}(jQuery);


/*!
 * fullPage 2.9.4 - Extensions 0.0.8
 * https://github.com/alvarotrigo/fullPage.js
 * @license http://alvarotrigo.com/fullPage/extensions/#license
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return n(t, e, e.document, e.Math)
    }) : "object" == typeof exports && exports ? module.exports = n(require("jquery"), e, e.document, e.Math) : n(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function(e, n, t, o, i) {
    "use strict";
    var r = "fullpage-wrapper",
        a = "." + r,
        l = "fp-scrollable",
        s = "." + l,
        c = "fp-responsive",
        d = "fp-notransition",
        f = "fp-destroyed",
        u = "fp-enabled",
        h = "fp-viewing",
        p = "active",
        v = "." + p,
        g = "fp-completely",
        m = "." + g,
        S = ".section",
        w = "fp-section",
        y = "." + w,
        b = y + v,
        x = y + ":first",
        C = y + ":last",
        A = "fp-tableCell",
        T = "." + A,
        I = "fp-auto-height",
        k = "fp-normal-scroll",
        L = "fp-nav",
        M = "#" + L,
        O = "fp-tooltip",
        E = "." + O,
        R = "fp-show-active",
        H = ".slide",
        z = "fp-slide",
        B = "." + z,
        D = B + v,
        P = "fp-slides",
        F = "." + P,
        V = "fp-slidesContainer",
        W = "." + V,
        j = "fp-table",
        Z = "fp-slidesNav",
        Y = "." + Z,
        N = Y + " a",
        q = "fp-controlArrow",
        U = "." + q,
        G = "fp-prev",
        X = "." + G,
        Q = q + " " + G,
        _ = U + X,
        K = "fp-next",
        J = "." + K,
        $ = q + " " + K,
        ee = U + J,
        ne = e(n),
        te = e(t),
        oe = {
            scrollbars: !0,
            mouseWheel: !0,
            hideScrollbars: !1,
            fadeScrollbars: !1,
            disableMouse: !0,
            interactiveScrollbars: !0
        };
    e.fn.fullpage = function(l) {
        function s(n, t) {
            n || ct(0), wt("autoScrolling", n, t);
            var o = e(b);
            l.autoScrolling && !l.scrollBar ? (xt.css({
                overflow: "hidden",
                height: "100%"
            }), q(Gt.recordHistory, "internal"), Rt.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), o.length && ct(o.position().top)) : (xt.css({
                overflow: "visible",
                height: "initial"
            }), q(!1, "internal"), Rt.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), pt(Rt), o.length && xt.scrollTop(o.position().top)), Rt.trigger("setAutoScrolling", [n])
        }

        function q(e, n) {
            wt("recordHistory", e, n)
        }

        function X(e, n) {
            "internal" !== n && l.fadingEffect && At.fadingEffect && At.fadingEffect.update(e), wt("scrollingSpeed", e, n)
        }

        function K(e, n) {
            wt("fitToSection", e, n)
        }

        function J(e) {
            l.lockAnchors = e
        }

        function re(e) {
            e ? (nt(), tt()) : (et(), ot())
        }

        function ae(n, t) {
            "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function(e, t) {
                ft(n, t, "m")
            })) : n ? (re(!0), it()) : (re(!1), rt())
        }

        function le(n, t) {
            "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function(e, t) {
                ft(n, t, "k")
            })) : l.keyboardScrolling = n
        }

        function se() {
            var n = e(b).prev(y);
            n.length || !l.loopTop && !l.continuousVertical || (n = e(y).last()), n.length && _e(n, null, !0)
        }

        function ce() {
            var n = e(b).next(y);
            n.length || !l.loopBottom && !l.continuousVertical || (n = e(y).first()), n.length && _e(n, null, !1)
        }

        function de(e, n) {
            X(0, "internal"), fe(e, n), X(Gt.scrollingSpeed, "internal")
        }

        function fe(e, n) {
            var t = Nn(e);
            "undefined" != typeof n ? Un(e, n) : t.length > 0 && _e(t)
        }

        function ue(e) {
            Ge("right", e)
        }

        function he(e) {
            Ge("left", e)
        }

        function pe(n) {
            if (!Rt.hasClass(f)) {
                zt = !0, Ht = ne.height(), e(y).each(function() {
                    var n = e(this).find(F),
                        t = e(this).find(B);
                    l.verticalCentered && e(this).find(T).css("height", Zn(e(this)) + "px"), e(this).css("height", Ce(e(this)) + "px"), l.scrollOverflow && (t.length ? t.each(function() {
                        Wn(e(this))
                    }) : Wn(e(this))), t.length > 1 && In(n, n.find(D))
                });
                var t = e(b),
                    o = t.index(y);
                o && de(o + 1), zt = !1, e.isFunction(l.afterResize) && n && l.afterResize.call(Rt), e.isFunction(l.afterReBuild) && !n && l.afterReBuild.call(Rt)
            }
        }

        function ve(n) {
            var t = Ct.hasClass(c);
            n ? t || (s(!1, "internal"), K(!1, "internal"), e(M).hide(), Ct.addClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(Rt, n), l.responsiveSlides && At.responsiveSlides && At.responsiveSlides.toSections(), Rt.trigger("afterResponsive", [n])) : t && (s(Gt.autoScrolling, "internal"), K(Gt.autoScrolling, "internal"), e(M).show(), Ct.removeClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(Rt, n), l.responsiveSlides && At.responsiveSlides && At.responsiveSlides.toSlides(), Rt.trigger("afterResponsive", [n]))
        }

        function ge() {
            return {
                options: l,
                internals: {
                    canScroll: Dt,
                    isScrollAllowed: Ft,
                    getDestinationPosition: Qe,
                    isTouch: Et,
                    c: un,
                    getXmovement: Vn,
                    removeAnimation: zn,
                    getTransforms: dt,
                    lazyLoad: on,
                    addAnimation: Hn,
                    performHorizontalMove: Mn,
                    landscapeScroll: In,
                    silentLandscapeScroll: st,
                    keepSlidesPosition: Xe,
                    silentScroll: ct,
                    styleSlides: xe,
                    scrollHandler: Be,
                    getEventsPage: lt,
                    getMSPointer: at,
                    isReallyTouch: Ye,
                    checkParentForNormalScrollElement: Ze,
                    usingExtension: vt,
                    toggleControlArrows: kn
                }
            }
        }

        function me() {
            l.css3 && (l.css3 = $n()), l.scrollBar = l.scrollBar || l.hybrid, ye(), be(), ae(!0), s(l.autoScrolling, "internal"), Rn(), Jn(), "complete" === t.readyState && hn(), ne.on("load", hn)
        }

        function Se() {
            ne.on("scroll", Be).on("hashchange", pn).blur(bn).resize(En), te.keydown(vn).keyup(mn).on("click touchstart", M + " a", xn).on("click touchstart", N, Cn).on("click", E, gn), e(y).on("click touchstart", U, yn), l.normalScrollElements && (te.on("mouseenter", l.normalScrollElements, function() {
                re(!1)
            }), te.on("mouseleave", l.normalScrollElements, function() {
                re(!0)
            }))
        }

        function we(e) {
            var t = "fp_" + e + "Extension";
            Xt[e] = l[e + "Key"], At[e] = "undefined" != typeof n[t] ? new n[t] : null, At[e] && At[e].c(e)
        }

        function ye() {
            var n = Rt.find(l.sectionSelector);
            l.anchors.length || (l.anchors = n.filter("[data-anchor]").map(function() {
                return e(this).data("anchor").toString()
            }).get()), l.navigationTooltips.length || (l.navigationTooltips = n.filter("[data-tooltip]").map(function() {
                return e(this).data("tooltip").toString()
            }).get())
        }

        function be() {
            Rt.css({
                height: "100%",
                position: "relative"
            }), Rt.addClass(r), e("html").addClass(u), Ht = ne.height(), Rt.removeClass(f), Ie(), gt("parallax", "init"), e(y).each(function(n) {
                var t = e(this),
                    o = t.find(B),
                    i = o.length;
                Ae(t, n), Te(t, n), i > 0 ? xe(t, o, i) : l.verticalCentered && jn(t)
            }), l.fixedElements && l.css3 && e(l.fixedElements).appendTo(Ct), l.navigation && Le(), Oe(), l.fadingEffect && At.fadingEffect && At.fadingEffect.apply(), l.scrollOverflow ? ("complete" === t.readyState && Me(), ne.on("load", Me)) : He()
        }

        function xe(n, t, o) {
            var i = 100 * o,
                r = 100 / o;
            t.wrapAll('<div class="' + V + '" />'), t.parent().wrap('<div class="' + P + '" />'), n.find(W).css("width", i + "%"), o > 1 && (l.controlArrows && ke(n), l.slidesNavigation && Xn(n, o)), t.each(function(n) {
                e(this).css("width", r + "%"), l.verticalCentered && jn(e(this))
            });
            var a = n.find(D);
            a.length && (0 !== e(b).index(y) || 0 === e(b).index(y) && 0 !== a.index()) ? st(a, "internal") : t.eq(0).addClass(p)
        }

        function Ce(e) {
            return l.offsetSections && At.offsetSections ? At.offsetSections.getWindowHeight(e) : Ht
        }

        function Ae(n, t) {
            t || 0 !== e(b).length || n.addClass(p), Lt = e(b), n.css("height", Ce(n) + "px"), l.paddingTop && n.css("padding-top", l.paddingTop), l.paddingBottom && n.css("padding-bottom", l.paddingBottom), "undefined" != typeof l.sectionsColor[t] && n.css("background-color", l.sectionsColor[t]), "undefined" != typeof l.anchors[t] && n.attr("data-anchor", l.anchors[t])
        }

        function Te(n, t) {
            "undefined" != typeof l.anchors[t] && n.hasClass(p) && Pn(l.anchors[t], t), l.menu && l.css3 && e(l.menu).closest(a).length && e(l.menu).appendTo(Ct)
        }

        function Ie() {
            Rt.find(l.sectionSelector).addClass(w), Rt.find(l.slideSelector).addClass(z)
        }

        function ke(e) {
            e.find(F).after('<div class="' + Q + '"></div><div class="' + $ + '"></div>'), "#fff" != l.controlArrowColor && (e.find(ee).css("border-color", "transparent transparent transparent " + l.controlArrowColor), e.find(_).css("border-color", "transparent " + l.controlArrowColor + " transparent transparent")), l.loopHorizontal || e.find(_).hide()
        }

        function Le() {
            Ct.append('<div id="' + L + '"><ul></ul></div>');
            var n = e(M);
            n.addClass(function() {
                return l.showActiveTooltip ? R + " " + l.navigationPosition : l.navigationPosition
            });
            for (var t = 0; t < e(y).length; t++) {
                var o = "";
                l.anchors.length && (o = l.anchors[t]);
                var i = '<li><a href="#' + o + '"><span></span></a>',
                    r = l.navigationTooltips[t];
                "undefined" != typeof r && "" !== r && (i += '<div class="' + O + " " + l.navigationPosition + '">' + r + "</div>"), i += "</li>", n.find("ul").append(i)
            }
            e(M).css("margin-top", "-" + e(M).height() / 2 + "px"), e(M).find("li").eq(e(b).index(y)).find("a").addClass(p)
        }

        function Me() {
            e(y).each(function() {
                var n = e(this).find(B);
                n.length ? n.each(function() {
                    Wn(e(this))
                }) : Wn(e(this))
            }), He()
        }

        function Oe() {
            Rt.find('iframe[src*="youtube.com/embed/"]').each(function() {
                Ee(e(this), "enablejsapi=1")
            })
        }

        function Ee(e, n) {
            var t = e.attr("src");
            e.attr("src", t + Re(t) + n)
        }

        function Re(e) {
            return /\?/.test(e) ? "&" : "?"
        }

        function He() {
            var n = e(b);
            n.addClass(g), l.scrollOverflowHandler.afterRender && l.scrollOverflowHandler.afterRender(n), on(n), rn(n), l.scrollOverflowHandler.afterLoad(), ze() && e.isFunction(l.afterLoad) && l.afterLoad.call(n, n.data("anchor"), n.index(y) + 1), e.isFunction(l.afterRender) && l.afterRender.call(Rt)
        }

        function ze() {
            var e = n.location.hash.replace("#", "").split("/"),
                t = Nn(decodeURIComponent(e[0]));
            return !t.length || t.length && t.index() === Lt.index()
        }

        function Be() {
            to || (requestAnimationFrame(De), to = !0)
        }

        function De() {
            Rt.trigger("onScroll");
            var n;
            if ((!l.autoScrolling || l.scrollBar || vt("dragAndMove")) && !St()) {
                var i = vt("dragAndMove") ? o.abs(At.dragAndMove.getCurrentScroll()) : ne.scrollTop(),
                    r = (Fe(i), 0),
                    a = i + ne.height() / 2,
                    s = vt("dragAndMove") ? At.dragAndMove.getDocumentHeight() : Ct.height() - ne.height(),
                    c = s === i,
                    d = t.querySelectorAll(y);
                if (c) r = d.length - 1;
                else if (i)
                    for (var f = 0; f < d.length; ++f) {
                        var u = d[f];
                        u.offsetTop <= a && (r = f)
                    } else r = 0;
                if (n = e(d).eq(r), !n.hasClass(p)) {
                    Qt = !0;
                    var h, v, g = e(b),
                        m = g.index(y) + 1,
                        S = Fn(n),
                        w = n.data("anchor"),
                        x = n.index(y) + 1,
                        C = n.find(D);
                    C.length && (v = C.data("anchor"), h = C.index()), Dt && (n.addClass(p).siblings().removeClass(p), gt("parallax", "afterLoad"), e.isFunction(l.onLeave) && l.onLeave.call(g, m, x, S), e.isFunction(l.afterLoad) && l.afterLoad.call(n, w, x), l.resetSliders && At.resetSliders && At.resetSliders.apply({
                        localIsResizing: zt,
                        leavingSection: m
                    }), ln(g), on(n), rn(n), Pn(w, x - 1), l.anchors.length && (Tt = w), Qn(h, v, w, x)), clearTimeout(Zt), Zt = setTimeout(function() {
                        Qt = !1
                    }, 100)
                }
                l.fitToSection && (clearTimeout(Yt), Yt = setTimeout(function() {
                    l.fitToSection && Pe()
                }, l.fitToSectionDelay))
            }
            to = !1
        }

        function Pe() {
            Dt && (zt = !0, _e(e(b)), zt = !1)
        }

        function Fe(e) {
            var n = e > _t ? "down" : "up";
            return _t = e, oo = e, n
        }

        function Ve(e, n) {
            if (Ft.m[e]) {
                var t = "down" === e ? "bottom" : "top",
                    o = "down" === e ? ce : se;
                if (At.scrollHorizontally && (o = At.scrollHorizontally.getScrollSection(e, o)), n.length > 0) {
                    if (!l.scrollOverflowHandler.isScrolled(t, n)) return !0;
                    o()
                } else o()
            }
        }

        function We(e) {
            var n = e.originalEvent;
            !Ze(e.target) && l.autoScrolling && Ye(n) && e.preventDefault()
        }

        function je(n) {
            var t = n.originalEvent,
                i = e(t.target).closest(y);
            if (!Ze(n.target) && Ye(t)) {
                l.autoScrolling && n.preventDefault();
                var r = l.scrollOverflowHandler.scrollable(i),
                    a = lt(t);
                $t = a.y, eo = a.x, i.find(F).length && o.abs(Jt - eo) > o.abs(Kt - $t) ? !Mt && o.abs(Jt - eo) > ne.outerWidth() / 100 * l.touchSensitivity && (Jt > eo ? Ft.m.right && ue(i) : Ft.m.left && he(i)) : l.autoScrolling && Dt && o.abs(Kt - $t) > ne.height() / 100 * l.touchSensitivity && (Kt > $t ? Ve("down", r) : $t > Kt && Ve("up", r))
            }
        }

        function Ze(n, t) {
            t = t || 0;
            var o = e(n).parent();
            return !!(t < l.normalScrollElementTouchThreshold && o.is(l.normalScrollElements)) || t != l.normalScrollElementTouchThreshold && Ze(o, ++t)
        }

        function Ye(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
        }

        function Ne(e) {
            var n = e.originalEvent;
            if (l.fitToSection && xt.stop(), Ye(n)) {
                var t = lt(n);
                Kt = t.y, Jt = t.x
            }
        }

        function qe(e, n) {
            for (var t = 0, i = e.slice(o.max(e.length - n, 1)), r = 0; r < i.length; r++) t += i[r];
            return o.ceil(t / n)
        }

        function Ue(t) {
            var i = (new Date).getTime(),
                r = e(m).hasClass(k);
            if (l.autoScrolling && !kt && !r) {
                t = t || n.event;
                var a = t.wheelDelta || -t.deltaY || -t.detail,
                    s = o.max(-1, o.min(1, a)),
                    c = "undefined" != typeof t.wheelDeltaX || "undefined" != typeof t.deltaX,
                    d = o.abs(t.wheelDeltaX) < o.abs(t.wheelDelta) || o.abs(t.deltaX) < o.abs(t.deltaY) || !c;
                Pt.length > 149 && Pt.shift(), Pt.push(o.abs(a)), l.scrollBar && (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
                var f = e(b),
                    u = l.scrollOverflowHandler.scrollable(f),
                    h = i - no;
                if (no = i, h > 200 && (Pt = []), Dt && !mt()) {
                    var p = qe(Pt, 10),
                        v = qe(Pt, 70),
                        g = p >= v;
                    g && d && (s < 0 ? Ve("down", u) : Ve("up", u))
                }
                return !1
            }
            l.fitToSection && xt.stop()
        }

        function Ge(n, t) {
            var o = "undefined" == typeof t ? e(b) : t,
                i = o.find(F);
            if (!(!i.length || mt() || Mt || i.find(B).length < 2)) {
                var r = i.find(D),
                    a = null;
                if (a = "left" === n ? r.prev(B) : r.next(B), !a.length) {
                    if (!l.loopHorizontal) return;
                    a = "left" === n ? r.siblings(":last") : r.siblings(":first")
                }
                Mt = !0, In(i, a, n)
            }
        }

        function Xe() {
            e(D).each(function() {
                st(e(this), "internal")
            })
        }

        function Qe(e) {
            var n = e.position(),
                t = n.top,
                o = vt("dragAndMove") && At.dragAndMove.isGrabbing ? At.dragAndMove.isScrollingDown() : n.top > oo,
                i = t - Ht + e.outerHeight(),
                r = l.bigSectionsDestination;
            return e.outerHeight() > Ht ? (o || r) && "bottom" !== r || (t = i) : (o || zt && e.is(":last-child")) && (t = i), l.offsetSections && At.offsetSections && (t = At.offsetSections.getSectionPosition(o, t, e)), oo = t, t
        }

        function _e(n, t, o) {
            if ("undefined" != typeof n && n.length) {
                var i, r, a = Qe(n),
                    s = {
                        element: n,
                        callback: t,
                        isMovementUp: o,
                        dtop: a,
                        yMovement: Fn(n),
                        anchorLink: n.data("anchor"),
                        sectionIndex: n.index(y),
                        activeSlide: n.find(D),
                        activeSection: e(b),
                        leavingSection: e(b).index(y) + 1,
                        localIsResizing: zt
                    };
                s.activeSection.is(n) && !zt || l.scrollBar && ne.scrollTop() === s.dtop && !n.hasClass(I) || (s.activeSlide.length && (i = s.activeSlide.data("anchor"), r = s.activeSlide.index()), gt("parallax", "apply", s), l.autoScrolling && l.continuousVertical && "undefined" != typeof s.isMovementUp && (!s.isMovementUp && "up" == s.yMovement || s.isMovementUp && "down" == s.yMovement) && (s = $e(s)), e.isFunction(l.onLeave) && !s.localIsResizing && l.onLeave.call(s.activeSection, s.leavingSection, s.sectionIndex + 1, s.yMovement) === !1 || (vt("scrollOverflowReset") && At.scrollOverflowReset.setPrevious(s.activeSection), s.localIsResizing || ln(s.activeSection), l.scrollOverflowHandler.beforeLeave(), n.addClass(p).siblings().removeClass(p), on(n), l.scrollOverflowHandler.onLeave(), Dt = !1, Qn(r, i, s.anchorLink, s.sectionIndex), Ke(s), Tt = s.anchorLink, Pn(s.anchorLink, s.sectionIndex)))
            }
        }

        function Ke(n) {
            if (l.css3 && l.autoScrolling && !l.scrollBar) {
                var t = "translate3d(0px, -" + o.round(n.dtop) + "px, 0px)";
                Yn(t, !0), l.scrollingSpeed ? (clearTimeout(Wt), Wt = setTimeout(function() {
                    nn(n)
                }, l.scrollingSpeed)) : nn(n)
            } else {
                var i = Je(n);
                e(i.element).animate(i.options, l.scrollingSpeed, l.easing).promise().done(function() {
                    l.scrollBar ? setTimeout(function() {
                        nn(n)
                    }, 30) : nn(n)
                })
            }
        }

        function Je(e) {
            var n = {};
            return l.autoScrolling && !l.scrollBar ? (n.options = {
                top: -e.dtop
            }, n.element = a) : (n.options = {
                scrollTop: e.dtop
            }, n.element = "html, body"), n
        }

        function $e(n) {
            return n.isMovementUp ? n.activeSection.before(n.activeSection.nextAll(y)) : n.activeSection.after(n.activeSection.prevAll(y).get().reverse()), ct(e(b).position().top), Xe(), n.wrapAroundElements = n.activeSection, n.dtop = n.element.position().top, n.yMovement = Fn(n.element), n.leavingSection = n.activeSection.index(y) + 1, n.sectionIndex = n.element.index(y), e(a).trigger("onContinuousVertical", [n]), n
        }

        function en(n) {
            n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(x).before(n.wrapAroundElements) : e(C).after(n.wrapAroundElements), ct(e(b).position().top), Xe(), n.sectionIndex = n.element.index(y), n.leavingSection = n.activeSection.index(y) + 1)
        }

        function nn(n) {
            en(n), e.isFunction(l.afterLoad) && !n.localIsResizing && l.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1), l.scrollOverflowHandler.afterLoad(), gt("parallax", "afterLoad"), vt("scrollOverflowReset") && At.scrollOverflowReset.reset(), l.resetSliders && At.resetSliders && At.resetSliders.apply(n), n.localIsResizing || rn(n.element), n.element.addClass(g).siblings().removeClass(g), Dt = !0, e.isFunction(n.callback) && n.callback.call(this)
        }

        function tn(e, n) {
            e.attr(n, e.data(n)).removeAttr("data-" + n)
        }

        function on(n) {
            if (l.lazyLoading) {
                var t, o = sn(n);
                o.find("img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                    t = e(this), e.each(["src", "srcset"], function(e, n) {
                        var o = t.attr("data-" + n);
                        "undefined" != typeof o && o && tn(t, n)
                    }), t.is("source") && t.closest("video").get(0).load()
                })
            }
        }

        function rn(n) {
            var t = sn(n);
            t.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("data-autoplay") && "function" == typeof n.play && n.play()
            }), t.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var n = e(this).get(0);
                n.hasAttribute("data-autoplay") && an(n), n.onload = function() {
                    n.hasAttribute("data-autoplay") && an(n)
                }
            })
        }

        function an(e) {
            e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }

        function ln(n) {
            var t = sn(n);
            t.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("data-keepplaying") || "function" != typeof n.pause || n.pause()
            }), t.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var n = e(this).get(0);
                /youtube\.com\/embed\//.test(e(this).attr("src")) && !n.hasAttribute("data-keepplaying") && e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
            })
        }

        function sn(n) {
            var t = n.find(D);
            return t.length && (n = e(t)), n
        }

        function cn(e) {
            function n(e) {
                var n, o, i, r, l, s, c, d = "",
                    f = 0;
                for (e = e.replace(/[^A-Za-z0-9+\/=]/g, ""); f < e.length;) r = a.indexOf(e.charAt(f++)), l = a.indexOf(e.charAt(f++)), s = a.indexOf(e.charAt(f++)), c = a.indexOf(e.charAt(f++)), n = r << 2 | l >> 4, o = (15 & l) << 4 | s >> 2, i = (3 & s) << 6 | c, d += String.fromCharCode(n), 64 != s && (d += String.fromCharCode(o)), 64 != c && (d += String.fromCharCode(i));
                return d = t(d)
            }

            function t(e) {
                for (var n, t = "", o = 0, i = 0, r = 0; o < e.length;) i = e.charCodeAt(o), i < 128 ? (t += String.fromCharCode(i), o++) : i > 191 && i < 224 ? (r = e.charCodeAt(o + 1), t += String.fromCharCode((31 & i) << 6 | 63 & r), o += 2) : (r = e.charCodeAt(o + 1), n = e.charCodeAt(o + 2), t += String.fromCharCode((15 & i) << 12 | (63 & r) << 6 | 63 & n), o += 3);
                return t
            }

            function o(e) {
                return e
            }

            function i(e) {
                return e.slice(3).slice(0, -3)
            }

            function r(e) {
                var t = e.split("_");
                if (t.length > 1) {
                    var o = t[1],
                        r = e.replace(i(t[1]), "").split("_")[0],
                        a = r;
                    return a + "_" + n(o.slice(3).slice(0, -3))
                }
                return i(e)
            }
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            return o(r(n(e)))
        }

        function dn() {
            if (t.domain.length) {
                for (var e = t.domain.replace(/^(www\.)/, "").split("."); e.length > 2;) {
                    e.shift()
                }
                var n = e.join(".");
                return n.replace(/(^\.*)|(\.*$)/g, "")
            }
            return ""
        }

        function fn(e) {
            var n = dn(),
                t = ["localhost", "127.0.0.1", "jshell.net", "UDdDQU5ZNlNN"],
                o = t[0],
                i = t[1],
                r = t[2],
                a = cn(t[3]),
                l = [o, i, r].indexOf(n) < 0 && 0 !== n.length,
                s = "undefined" != typeof Xt[e] && Xt[e].length;
            if (!s && l) return !1;
            var c = s ? cn(Xt[e]) : "";
            c = c.split("_");
            var d = c.length > 1 && c[1].indexOf(e, c[1].length - e.length) > -1,
                f = c[0].indexOf(n, c[0].length - n.length) < 0;
            return !(f && l && a != c[0]) && d || !l
        }

        function un(e) {
            if (vt(e) && At[e]) {
                var n = cn("MTIzPGRpdiBzdHlsZT0iei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkOyB0b3A6IDIwcHg7IGxlZnQ6MjBweDsgYmFja2dyb3VuZDpyZWQ7IHBhZGRpbmc6IDdweCAxNXB4OyBmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICNmZmY7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiPjxhIGhyZWY9Imh0dHA6Ly9hbHZhcm90cmlnby5jb20vZnVsbFBhZ2UvZXh0ZW5zaW9ucy8iIHN0eWxlPSJjb2xvcjogI2ZmZjsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7Ij5VbmxpY2Vuc2VkIGZ1bGxQYWdlLmpzIEV4dGVuc2lvbjwvYT48L2Rpdj4xMjM="),
                    t = o.random() < .5;
                if (!fn(e)) {
                    var i, r = "9999999",
                        a = "z-index",
                        l = function() {
                            i = t ? Ct.find("div").first() : Ct.find("div").last(), i.css(a) !== r && (t ? Ct.prepend(n) : Ct.append(n))
                        };
                    l(), setInterval(l, 2e3)
                }
            }
        }

        function hn() {
            var e = n.location.hash.replace("#", "").split("/"),
                t = decodeURIComponent(e[0]),
                o = decodeURIComponent(e[1]);
            t && (l.animateAnchor ? Un(t, o) : de(t, o))
        }

        function pn() {
            if (!Qt && !l.lockAnchors) {
                var e = n.location.hash.replace("#", "").split("/"),
                    t = decodeURIComponent(e[0]),
                    o = decodeURIComponent(e[1]),
                    i = "undefined" == typeof Tt,
                    r = "undefined" == typeof Tt && "undefined" == typeof o && !Mt;
                t.length && (t && t !== Tt && !i || r || !Mt && It != o) && Un(t, o)
            }
        }

        function vn(n) {
            clearTimeout(Nt);
            var t = e(":focus");
            if (!t.is("textarea") && !t.is("input") && !t.is("select") && "true" !== t.attr("contentEditable") && "" !== t.attr("contentEditable") && l.keyboardScrolling && l.autoScrolling) {
                var o = n.which,
                    i = [40, 38, 32, 33, 34];
                e.inArray(o, i) > -1 && n.preventDefault(), kt = n.ctrlKey, Nt = setTimeout(function() {
                    An(n)
                }, 150)
            }
        }

        function gn() {
            e(this).prev().trigger("click")
        }

        function mn(e) {
            Bt && (kt = e.ctrlKey)
        }

        function Sn(e) {
            2 == e.which && (io = e.pageY, Rt.on("mousemove", Tn))
        }

        function wn(e) {
            2 == e.which && Rt.off("mousemove")
        }

        function yn() {
            var n = e(this).closest(y);
            e(this).hasClass(G) ? Ft.m.left && he(n) : Ft.m.right && ue(n)
        }

        function bn() {
            Bt = !1, kt = !1
        }

        function xn(n) {
            n.preventDefault();
            var t = e(this).parent().index();
            _e(e(y).eq(t))
        }

        function Cn(n) {
            n.preventDefault();
            var t = e(this).closest(y).find(F),
                o = t.find(B).eq(e(this).closest("li").index());
            In(t, o)
        }

        function An(n) {
            var t = n.shiftKey;
            if (Dt || !([37, 39].indexOf(n.which) < 0)) switch (n.which) {
                case 38:
                case 33:
                    Ft.k.up && se();
                    break;
                case 32:
                    if (t && Ft.k.up) {
                        se();
                        break
                    }
                case 40:
                case 34:
                    Ft.k.down && ce();
                    break;
                case 36:
                    Ft.k.up && fe(1);
                    break;
                case 35:
                    Ft.k.down && fe(e(y).length);
                    break;
                case 37:
                    Ft.k.left && he();
                    break;
                case 39:
                    Ft.k.right && ue();
                    break;
                default:
                    return
            }
        }

        function Tn(e) {
            Dt && (e.pageY < io && Ft.m.up ? se() : e.pageY > io && Ft.m.down && ce()), io = e.pageY
        }

        function In(n, t, o) {
            var i = n.closest(y),
                r = {
                    slides: n,
                    destiny: t,
                    direction: o,
                    destinyPos: t.position(),
                    slideIndex: t.index(),
                    section: i,
                    sectionIndex: i.index(y),
                    anchorLink: i.data("anchor"),
                    slidesNav: i.find(Y),
                    slideAnchor: Kn(t),
                    prevSlide: i.find(D),
                    prevSlideIndex: i.find(D).index(),
                    localIsResizing: zt
                };
            return r.xMovement = Vn(r.prevSlideIndex, r.slideIndex), r.localIsResizing || (Dt = !1), gt("parallax", "applyHorizontal", r), l.onSlideLeave && !r.localIsResizing && "none" !== r.xMovement && e.isFunction(l.onSlideLeave) && l.onSlideLeave.call(r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.xMovement, r.slideIndex) === !1 ? void(Mt = !1) : (t.addClass(p).siblings().removeClass(p), r.localIsResizing || (ln(r.prevSlide), on(t)), kn(r), i.hasClass(p) && !r.localIsResizing && Qn(r.slideIndex, r.slideAnchor, r.anchorLink, r.sectionIndex), At.continuousHorizontal && At.continuousHorizontal.apply(r), St() ? Ln(r) : Mn(n, r, !0), void(l.interlockedSlides && At.interlockedSlides && At.interlockedSlides.apply(r)))
        }

        function kn(e) {
            !l.loopHorizontal && l.controlArrows && (e.section.find(_).toggle(0 !== e.slideIndex), e.section.find(ee).toggle(!e.destiny.is(":last-child")))
        }

        function Ln(n) {
            At.continuousHorizontal && At.continuousHorizontal.afterSlideLoads(n), On(n.slidesNav, n.slideIndex), n.localIsResizing || (gt("parallax", "afterSlideLoads"), e.isFunction(l.afterSlideLoad) && l.afterSlideLoad.call(n.destiny, n.anchorLink, n.sectionIndex + 1, n.slideAnchor, n.slideIndex), Dt = !0, rn(n.destiny)), Mt = !1, At.interlockedSlides && At.interlockedSlides.apply(n)
        }

        function Mn(e, n, t) {
            var i = n.destinyPos;
            if (l.css3) {
                var r = "translate3d(-" + o.round(i.left) + "px, 0px, 0px)";
                Hn(e.find(W)).css(dt(r)), jt = setTimeout(function() {
                    t && Ln(n)
                }, l.scrollingSpeed, l.easing)
            } else e.animate({
                scrollLeft: o.round(i.left)
            }, l.scrollingSpeed, l.easing, function() {
                t && Ln(n)
            })
        }

        function On(e, n) {
            e.find(v).removeClass(p), e.find("li").eq(n).find("a").addClass(p)
        }

        function En() {
            if (Rt.trigger("onResize"), Rn(), Ot) {
                var n = e(t.activeElement);
                if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
                    var i = ne.height();
                    o.abs(i - ro) > 20 * o.max(ro, i) / 100 && (pe(!0), ro = i)
                }
            } else clearTimeout(Vt), Vt = setTimeout(function() {
                pe(!0)
            }, 350)
        }

        function Rn() {
            var e = l.responsive || l.responsiveWidth,
                n = l.responsiveHeight,
                t = e && ne.outerWidth() < e,
                o = n && ne.height() < n;
            e && n ? ve(t || o) : e ? ve(t) : n && ve(o)
        }

        function Hn(e) {
            var n = "all " + l.scrollingSpeed + "ms " + l.easingcss3;
            return e.removeClass(d), e.css({
                "-webkit-transition": n,
                transition: n
            })
        }

        function zn(e) {
            return e.addClass(d)
        }

        function Bn(n, t) {
            l.navigation && (e(M).find(v).removeClass(p), n ? e(M).find('a[href="#' + n + '"]').addClass(p) : e(M).find("li").eq(t).find("a").addClass(p))
        }

        function Dn(n) {
            l.menu && (e(l.menu).find(v).removeClass(p), e(l.menu).find('[data-menuanchor="' + n + '"]').addClass(p))
        }

        function Pn(e, n) {
            Dn(e), Bn(e, n)
        }

        function Fn(n) {
            var t = e(b).index(y),
                o = n.index(y);
            return t == o ? "none" : t > o ? "up" : "down"
        }

        function Vn(e, n) {
            return e == n ? "none" : e > n ? "left" : "right"
        }

        function Wn(e) {
            if (!e.hasClass("fp-noscroll")) {
                e.css("overflow", "hidden");
                var n, t = l.scrollOverflowHandler,
                    o = t.wrapContent(),
                    i = e.closest(y),
                    r = t.scrollable(e);
                r.length ? n = t.scrollHeight(e) : (n = e.get(0).scrollHeight, l.verticalCentered && (n = e.find(T).get(0).scrollHeight));
                var a = Zn(i);
                n > a ? r.length ? t.update(e, a) : (l.verticalCentered ? e.find(T).wrapInner(o) : e.wrapInner(o), t.create(e, a, l.scrollOverflowOptions)) : t.remove(e), e.css("overflow", "")
            }
        }

        function jn(e) {
            e.hasClass(j) || e.addClass(j).wrapInner('<div class="' + A + '" style="height:' + Zn(e) + 'px;" />')
        }

        function Zn(e) {
            var n = Ce(e);
            if (l.paddingTop || l.paddingBottom) {
                var t = e;
                t.hasClass(w) || (t = e.closest(y));
                var o = parseInt(t.css("padding-top")) + parseInt(t.css("padding-bottom"));
                n = Ht - o
            }
            return n
        }

        function Yn(e, n) {
            n ? Hn(Rt) : zn(Rt), Rt.css(dt(e)), setTimeout(function() {
                Rt.removeClass(d)
            }, 10)
        }

        function Nn(n) {
            if (!n) return [];
            var t = Rt.find(y + '[data-anchor="' + n + '"]');
            return t.length || (t = e(y).eq(n - 1)), t
        }

        function qn(e, n) {
            var t = n.find(F),
                o = t.find(B + '[data-anchor="' + e + '"]');
            return o.length || (o = t.find(B).eq(e)), o
        }

        function Un(e, n) {
            var t = Nn(e);
            t.length && ("undefined" == typeof n && (n = 0), e === Tt || t.hasClass(p) ? Gn(t, n) : _e(t, function() {
                Gn(t, n)
            }))
        }

        function Gn(e, n) {
            if ("undefined" != typeof n) {
                var t = e.find(F),
                    o = qn(n, e);
                o.length && In(t, o)
            }
        }

        function Xn(e, n) {
            e.append('<div class="' + Z + '"><ul></ul></div>');
            var t = e.find(Y);
            t.addClass(l.slidesNavPosition);
            for (var o = 0; o < n; o++) t.find("ul").append('<li><a href="#"><span></span></a></li>');
            t.css("margin-left", "-" + t.width() / 2 + "px"), t.find("li").first().find("a").addClass(p)
        }

        function Qn(e, n, t, o) {
            var i = "";
            l.anchors.length && !l.lockAnchors && (e ? ("undefined" != typeof t && (i = t), "undefined" == typeof n && (n = e), It = n, _n(i + "/" + n)) : "undefined" != typeof e ? (It = n, _n(t)) : _n(t)), Jn()
        }

        function _n(e) {
            if (l.recordHistory) location.hash = e;
            else if (Ot || Et) n.history.replaceState(i, i, "#" + e);
            else {
                var t = n.location.href.split("#")[0];
                n.location.replace(t + "#" + e)
            }
        }

        function Kn(e) {
            var n = e.data("anchor"),
                t = e.index();
            return "undefined" == typeof n && (n = t), n
        }

        function Jn() {
            var n = e(b),
                t = n.find(D),
                o = Kn(n),
                i = Kn(t),
                r = String(o);
            t.length && (r = r + "-" + i), r = r.replace("/", "-").replace("#", "");
            var a = new RegExp("\\b\\s?" + h + "-[^\\s]+\\b", "g");
            Ct[0].className = Ct[0].className.replace(a, ""), Ct.addClass(h + "-" + r)
        }

        function $n() {
            var e, o = t.createElement("p"),
                r = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            t.body.insertBefore(o, null);
            for (var a in r) o.style[a] !== i && (o.style[a] = "translate3d(1px,1px,1px)", e = n.getComputedStyle(o).getPropertyValue(r[a]));
            return t.body.removeChild(o), e !== i && e.length > 0 && "none" !== e
        }

        function et() {
            t.addEventListener ? (t.removeEventListener("mousewheel", Ue, !1), t.removeEventListener("wheel", Ue, !1), t.removeEventListener("MozMousePixelScroll", Ue, !1)) : t.detachEvent("onmousewheel", Ue)
        }

        function nt() {
            var e, o = "";
            n.addEventListener ? e = "addEventListener" : (e = "attachEvent", o = "on");
            var r = "onwheel" in t.createElement("div") ? "wheel" : t.onmousewheel !== i ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == r ? t[e](o + "MozMousePixelScroll", Ue, !1) : t[e](o + r, Ue, !1)
        }

        function tt() {
            Rt.on("mousedown", Sn).on("mouseup", wn)
        }

        function ot() {
            Rt.off("mousedown", Sn).off("mouseup", wn)
        }

        function it() {
            (Ot || Et) && (l.autoScrolling && Ct.off(Ut.touchmove).on(Ut.touchmove, We), e(a).off(Ut.touchstart).on(Ut.touchstart, Ne).off(Ut.touchmove).on(Ut.touchmove, je))
        }

        function rt() {
            (Ot || Et) && e(a).off(Ut.touchstart).off(Ut.touchmove)
        }

        function at() {
            var e;
            return e = n.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }

        function lt(e) {
            var n = [];
            return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, Et && Ye(e) && l.scrollBar && (n.y = e.touches[0].pageY, n.x = e.touches[0].pageX), n
        }

        function st(e, n) {
            X(0, "internal"), "undefined" != typeof n && (zt = !0), In(e.closest(F), e), "undefined" != typeof n && (zt = !1), X(Gt.scrollingSpeed, "internal")
        }

        function ct(e) {
            var n = o.round(e);
            if (l.css3 && l.autoScrolling && !l.scrollBar) {
                var t = "translate3d(0px, -" + n + "px, 0px)";
                Yn(t, !1)
            } else l.autoScrolling && !l.scrollBar ? Rt.css("top", -n) : xt.scrollTop(n)
        }

        function dt(e) {
            return {
                "-webkit-transform": e,
                "-moz-transform": e,
                "-ms-transform": e,
                transform: e
            }
        }

        function ft(e, n, t) {
            switch (n) {
                case "up":
                    Ft[t].up = e;
                    break;
                case "down":
                    Ft[t].down = e;
                    break;
                case "left":
                    Ft[t].left = e;
                    break;
                case "right":
                    Ft[t].right = e;
                    break;
                case "all":
                    "m" == t ? ae(e) : le(e)
            }
        }

        function ut(n) {
            Rt.trigger("destroy", [n]), s(!1, "internal"), ae(!1), le(!1), Rt.addClass(f), clearTimeout(jt), clearTimeout(Wt), clearTimeout(Vt), clearTimeout(Zt), clearTimeout(Yt), ne.off("scroll", Be).off("hashchange", pn).off("resize", En), te.off("click touchstart", M + " a").off("mouseenter", M + " li").off("mouseleave", M + " li").off("click touchstart", N).off("mouseover", l.normalScrollElements).off("mouseout", l.normalScrollElements), e(y).off("click touchstart", U), vt("dragAndMove") && At.dragAndMove.destroy(), clearTimeout(jt), clearTimeout(Wt), n && ht()
        }

        function ht() {
            ct(0), Rt.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                tn(e(this), "src")
            }), Rt.find("img[data-srcset]").each(function() {
                tn(e(this), "srcset")
            }), e(M + ", " + Y + ", " + U).remove(), e(y).css({
                height: "",
                "background-color": "",
                padding: ""
            }), e(B).css({
                width: ""
            }), Rt.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), xt.css({
                overflow: "",
                height: ""
            }), e("html").removeClass(u), Ct.removeClass(c), e.each(Ct.get(0).className.split(/\s+/), function(e, n) {
                0 === n.indexOf(h) && Ct.removeClass(n)
            }), e(y + ", " + B).each(function() {
                l.scrollOverflowHandler.remove(e(this)), e(this).removeClass(j + " " + p)
            }), pt(Rt), Rt.find(T + ", " + W + ", " + F).each(function() {
                e(this).replaceWith(this.childNodes)
            }), xt.scrollTop(0);
            var n = [w, z, V];
            e.each(n, function(n, t) {
                e("." + t).removeClass(t)
            })
        }

        function pt(e) {
            return e.css({
                "-webkit-transition": "none",
                transition: "none"
            })
        }

        function vt(e) {
            return null !== l[e] && "object" == typeof l[e] ? l[e].enabled && At[e] : l[e] && At[e]
        }

        function gt(e, n, t) {
            var o = Array.isArray(t) ? t.join(", ") : t;
            vt(e) && At[e][n](o)
        }

        function mt() {
            return vt("dragAndMove") && At.dragAndMove.isAnimating
        }

        function St() {
            return vt("dragAndMove") && At.dragAndMove.isGrabbing
        }

        function wt(e, n, t) {
            l[e] = n, "internal" !== t && (Gt[e] = n)
        }

        function yt() {
            return e("html").hasClass(u) ? void bt("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (l.continuousVertical && (l.loopTop || l.loopBottom) && (l.continuousVertical = !1, bt("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), l.scrollBar && l.scrollOverflow && bt("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !l.continuousVertical || !l.scrollBar && l.autoScrolling || (l.continuousVertical = !1, bt("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), void e.each(l.anchors, function(n, t) {
                var o = te.find("[name]").filter(function() {
                        return e(this).attr("name") && e(this).attr("name").toLowerCase() == t.toLowerCase()
                    }),
                    i = te.find("[id]").filter(function() {
                        return e(this).attr("id") && e(this).attr("id").toLowerCase() == t.toLowerCase()
                    });
                (i.length || o.length) && (bt("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), i.length && bt("error", '"' + t + '" is is being used by another element `id` property'), o.length && bt("error", '"' + t + '" is is being used by another element `name` property'))
            }))
        }

        function bt(e, n) {
            console && console[e] && console[e]("fullPage: " + n)
        }
        if (e("html").hasClass(u)) return void yt();
        var xt = e("html, body"),
            Ct = e("body"),
            At = e.fn.fullpage;
        l = e.extend(!0, {
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            hybrid: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1e3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            continuousHorizontal: !1,
            scrollHorizontally: !1,
            interlockedSlides: !1,
            dragAndMove: !1,
            offsetSections: !1,
            resetSliders: !1,
            fadingEffect: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            scrollOverflowReset: !1,
            scrollOverflowHandler: ie,
            scrollOverflowOptions: null,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: !1,
            parallax: !1,
            parallaxOptions: {
                type: "reveal",
                percentage: 62,
                property: "translate"
            },
            sectionSelector: S,
            slideSelector: H,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null,
            afterResponsive: null,
            lazyLoading: !0
        }, l);
        var Tt, It, kt, Lt, Mt = !1,
            Ot = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Et = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            Rt = e(this),
            Ht = ne.height(),
            zt = !1,
            Bt = !0,
            Dt = !0,
            Pt = [],
            Ft = {};
        Ft.m = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, Ft.k = e.extend(!0, {}, Ft.m);
        var Vt, Wt, jt, Zt, Yt, Nt, qt = at(),
            Ut = {
                touchmove: "ontouchmove" in n ? "touchmove" : qt.move,
                touchstart: "ontouchstart" in n ? "touchstart" : qt.down
            },
            Gt = e.extend(!0, {}, l),
            Xt = {};
        yt(), oe.click = Et, l.scrollOverflowOptions = e.extend(oe, l.scrollOverflowOptions), e.extend(e.easing, {
            easeInOutCubic: function(e, n, t, o, i) {
                return (n /= i / 2) < 1 ? o / 2 * n * n * n + t : o / 2 * ((n -= 2) * n * n + 2) + t
            }
        }), e(this).length && (At.setAutoScrolling = s, At.setRecordHistory = q, At.setScrollingSpeed = X, At.setFitToSection = K, At.setLockAnchors = J, At.setMouseWheelScrolling = re, At.setAllowScrolling = ae, At.setKeyboardScrolling = le, At.moveSectionUp = se, At.moveSectionDown = ce, At.silentMoveTo = de, At.moveTo = fe, At.moveSlideRight = ue, At.moveSlideLeft = he, At.fitToSection = Pe, At.reBuild = pe, At.setResponsive = ve, At.getFullpageData = ge, At.destroy = ut, At.landscapeScroll = In, we("continuousHorizontal"), we("scrollHorizontally"), we("resetSliders"), we("interlockedSlides"), we("responsiveSlides"), we("fadingEffect"), we("dragAndMove"), we("offsetSections"), we("scrollOverflowReset"), we("parallax"), vt("dragAndMove") && At.dragAndMove.init(), me(), Se(), vt("dragAndMove") && At.dragAndMove.turnOffTouch());
        var Qt = !1,
            _t = 0,
            Kt = 0,
            Jt = 0,
            $t = 0,
            eo = 0;
        ! function() {
            var e = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame;
            n.requestAnimationFrame = e
        }();
        var no = (new Date).getTime(),
            to = !1,
            oo = 0,
            io = 0,
            ro = Ht
    }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
        this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
    }, IScroll.prototype.wheelOff = function() {
        this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
    });
    var ie = {
        refreshId: null,
        iScrollInstances: [],
        toggleWheel: function(n) {
            var t = e(b).find(s);
            t.each(function() {
                var t = e(this).data("iscrollInstance");
                "undefined" != typeof t && t && (n ? t.wheelOn() : t.wheelOff())
            })
        },
        onLeave: function() {
            ie.toggleWheel(!1)
        },
        beforeLeave: function() {
            ie.onLeave()
        },
        afterLoad: function() {
            ie.toggleWheel(!0)
        },
        create: function(n, t, o) {
            var i = n.find(s);
            i.height(t), i.each(function() {
                var n = e(this),
                    t = n.data("iscrollInstance");
                t && e.each(ie.iScrollInstances, function() {
                    e(this).destroy()
                }), t = new IScroll(n.get(0), o), t.on("scrollEnd", function() {
                    this.fp_isAtTop = this.y > -30, this.fp_isAtEnd = this.y - this.maxScrollY < 30
                }), ie.iScrollInstances.push(t), t.wheelOff(), n.data("iscrollInstance", t)
            })
        },
        isScrolled: function(e, n) {
            var t = n.data("iscrollInstance");
            return !t || ("top" === e ? t.y >= 0 && !n.scrollTop() : "bottom" === e ? 0 - t.y + n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0)
        },
        scrollable: function(e) {
            return e.find(F).length ? e.find(D).find(s) : e.find(s)
        },
        scrollHeight: function(e) {
            return e.find(s).children().first().get(0).scrollHeight
        },
        remove: function(e) {
            var n = e.find(s);
            if (n.length) {
                var t = n.data("iscrollInstance");
                t && t.destroy(), n.data("iscrollInstance", null)
            }
            e.find(s).children().first().children().first().unwrap().unwrap()
        },
        update: function(n, t) {
            clearTimeout(ie.refreshId), ie.refreshId = setTimeout(function() {
                e.each(ie.iScrollInstances, function() {
                    e(this).get(0).refresh()
                })
            }, 150), n.find(s).css("height", t + "px").parent().css("height", t + "px")
        },
        wrapContent: function() {
            return '<div class="' + l + '"><div class="fp-scroller"></div></div>'
        }
    }
});

/* Validator */

+
function(t) {
    "use strict";

    function e(e) {
        return e.is('[type="checkbox"]') ? e.prop("checked") : e.is('[type="radio"]') ? !!t('[name="' + e.attr("name") + '"]:checked').length : t.trim(e.val())
    }

    function r(e) {
        return this.each(function() {
            var r = t(this),
                o = t.extend({}, a.DEFAULTS, r.data(), "object" == typeof e && e),
                i = r.data("bs.validator");
            (i || "destroy" != e) && (i || r.data("bs.validator", i = new a(this, o)), "string" == typeof e && i[e]())
        })
    }
    var a = function(r, o) {
        this.options = o, this.$element = t(r), this.$inputs = this.$element.find(a.INPUT_SELECTOR), this.$btn = t('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), o.errors = t.extend({}, a.DEFAULTS.errors, o.errors);
        for (var i in o.custom)
            if (!o.errors[i]) throw new Error("Missing default error message for custom validator: " + i);
        t.extend(a.VALIDATORS, o.custom), this.$element.attr("novalidate", !0), this.toggleSubmit(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", a.INPUT_SELECTOR, t.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", t.proxy(this.onSubmit, this)), this.$element.find("[data-match]").each(function() {
            var r = t(this),
                a = r.data("match");
            t(a).on("input.bs.validator", function(t) {
                e(r) && r.trigger("input.bs.validator")
            })
        })
    };
    a.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible', a.FOCUS_OFFSET = 20, a.DEFAULTS = {
        delay: 500,
        html: !1,
        disable: !0,
        focus: !0,
        custom: {},
        errors: {
            match: "Does not match",
            minlength: "Not long enough"
        },
        feedback: {
            success: "glyphicon-ok",
            error: "glyphicon-remove"
        }
    }, a.VALIDATORS = {
        "native": function(t) {
            var e = t[0];
            return e.checkValidity ? e.checkValidity() : !0
        },
        match: function(e) {
            var r = e.data("match");
            return !e.val() || e.val() === t(r).val()
        },
        minlength: function(t) {
            var e = t.data("minlength");
            return !t.val() || t.val().length >= e
        }
    }, a.prototype.onInput = function(e) {
        var r = this,
            a = t(e.target),
            o = "focusout" !== e.type;
        this.validateInput(a, o).done(function() {
            r.toggleSubmit()
        })
    }, a.prototype.validateInput = function(r, a) {
        var o = e(r),
            i = r.data("bs.validator.previous"),
            s = r.data("bs.validator.errors");
        if (i === o) return t.Deferred().resolve();
        r.data("bs.validator.previous", o), r.is('[type="radio"]') && (r = this.$element.find('input[name="' + r.attr("name") + '"]'));
        var n = t.Event("validate.bs.validator", {
            relatedTarget: r[0]
        });
        if (this.$element.trigger(n), !n.isDefaultPrevented()) {
            var d = this;
            return this.runValidators(r).done(function(e) {
                r.data("bs.validator.errors", e), e.length ? a ? d.defer(r, d.showErrors) : d.showErrors(r) : d.clearErrors(r), s && e.toString() === s.toString() || (n = e.length ? t.Event("invalid.bs.validator", {
                    relatedTarget: r[0],
                    detail: e
                }) : t.Event("valid.bs.validator", {
                    relatedTarget: r[0],
                    detail: s
                }), d.$element.trigger(n)), d.toggleSubmit(), d.$element.trigger(t.Event("validated.bs.validator", {
                    relatedTarget: r[0]
                }))
            })
        }
    }, a.prototype.runValidators = function(r) {
        function o(t) {
            return r.data(t + "-error") || r.data("error") || "native" == t && r[0].validationMessage || n.errors[t]
        }
        var i = [],
            s = t.Deferred(),
            n = this.options;
        return r.data("bs.validator.deferred") && r.data("bs.validator.deferred").reject(), r.data("bs.validator.deferred", s), t.each(a.VALIDATORS, t.proxy(function(t, a) {
            if ((e(r) || r.attr("required")) && (r.data(t) || "native" == t) && !a.call(this, r)) {
                var s = o(t);
                !~i.indexOf(s) && i.push(s)
            }
        }, this)), !i.length && e(r) && r.data("remote") ? this.defer(r, function() {
            var a = {};
            a[r.attr("name")] = e(r), t.get(r.data("remote"), a).fail(function(t, e, r) {
                i.push(o("remote") || r)
            }).always(function() {
                s.resolve(i)
            })
        }) : s.resolve(i), s.promise()
    }, a.prototype.validate = function() {
        var e = this;
        return t.when(this.$inputs.map(function(r) {
            return e.validateInput(t(this), !1)
        })).then(function() {
            e.toggleSubmit(), e.focusError()
        }), this
    }, a.prototype.focusError = function() {
        if (this.options.focus) {
            var e = t(".has-error:first :input");
            0 !== e.length && (t(document.body).animate({
                scrollTop: e.offset().top - a.FOCUS_OFFSET
            }, 250), e.focus())
        }
    }, a.prototype.showErrors = function(e) {
        var r = this.options.html ? "html" : "text",
            a = e.data("bs.validator.errors"),
            o = e.closest(".form-group"),
            i = o.find(".help-block.with-errors"),
            s = o.find(".form-control-feedback");
        a.length && (a = t("<ul/>").addClass("list-unstyled").append(t.map(a, function(e) {
            return t("<li/>")[r](e)
        })), void 0 === i.data("bs.validator.originalContent") && i.data("bs.validator.originalContent", i.html()), i.empty().append(a), o.addClass("has-error has-danger"), o.hasClass("has-feedback") && s.removeClass(this.options.feedback.success) && s.addClass(this.options.feedback.error) && o.removeClass("has-success"))
    }, a.prototype.clearErrors = function(t) {
        var r = t.closest(".form-group"),
            a = r.find(".help-block.with-errors"),
            o = r.find(".form-control-feedback");
        a.html(a.data("bs.validator.originalContent")), r.removeClass("has-error has-danger"), r.hasClass("has-feedback") && o.removeClass(this.options.feedback.error) && e(t) && o.addClass(this.options.feedback.success) && r.addClass("has-success")
    }, a.prototype.hasErrors = function() {
        function e() {
            return !!(t(this).data("bs.validator.errors") || []).length
        }
        return !!this.$inputs.filter(e).length
    }, a.prototype.isIncomplete = function() {
        function r() {
            return !e(t(this))
        }
        return !!this.$inputs.filter("[required]").filter(r).length
    }, a.prototype.onSubmit = function(t) {
        this.validate(), (this.isIncomplete() || this.hasErrors()) && t.preventDefault()
    }, a.prototype.toggleSubmit = function() {
        this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors())
    }, a.prototype.defer = function(e, r) {
        return r = t.proxy(r, this, e), this.options.delay ? (window.clearTimeout(e.data("bs.validator.timeout")), void e.data("bs.validator.timeout", window.setTimeout(r, this.options.delay))) : r()
    }, a.prototype.destroy = function() {
        return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator").find(".form-control-feedback").removeClass([this.options.feedback.error, this.options.feedback.success].join(" ")), this.$inputs.off(".bs.validator").removeData(["bs.validator.errors", "bs.validator.deferred", "bs.validator.previous"]).each(function() {
            var e = t(this),
                r = e.data("bs.validator.timeout");
            window.clearTimeout(r) && e.removeData("bs.validator.timeout")
        }), this.$element.find(".help-block.with-errors").each(function() {
            var e = t(this),
                r = e.data("bs.validator.originalContent");
            e.removeData("bs.validator.originalContent").html(r)
        }), this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"), this.$element.find(".has-error, .has-danger").removeClass("has-error has-danger"), this
    };
    var o = t.fn.validator;
    t.fn.validator = r, t.fn.validator.Constructor = a, t.fn.validator.noConflict = function() {
        return t.fn.validator = o, this
    }, t(window).on("load", function() {
        t('form[data-toggle="validator"]').each(function() {
            var e = t(this);
            r.call(e, e.data())
        })
    })
}(jQuery);

/* Text Rotate JS */

! function(e) {
    var t = {
        animation: "dissolve",
        separator: ",",
        speed: 2e3
    };
    e.fx.step.textShadowBlur = function(t) {
        e(t.elem).prop("textShadowBlur", t.now).css({
            textShadow: "0 0 " + Math.floor(t.now) + "px black"
        })
    };
    e.fn.textrotator = function(n) {
        var r = e.extend({}, t, n);
        return this.each(function() {
            var t = e(this);
            var n = [];
            e.each(t.text().split(r.separator), function(e, t) {
                n.push(t)
            });
            t.text(n[0]);
            var i = function() {
                switch (r.animation) {
                    case "dissolve":
                        t.animate({
                            textShadowBlur: 20,
                            opacity: 0
                        }, 500, function() {
                            s = e.inArray(t.text(), n);
                            if (s + 1 == n.length) s = -1;
                            t.text(n[s + 1]).animate({
                                textShadowBlur: 0,
                                opacity: 1
                            }, 500)
                        });
                        break;
                    case "flip":
                        if (t.find(".back").length > 0) {
                            t.html(t.find(".back").html())
                        }
                        var i = t.text();
                        var s = e.inArray(i, n);
                        if (s + 1 == n.length) s = -1;
                        t.html("");
                        e("<span class='front'>" + i + "</span>").appendTo(t);
                        e("<span class='back'>" + n[s + 1] + "</span>").appendTo(t);
                        t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
                            "-webkit-transform": " rotateY(-180deg)",
                            "-moz-transform": " rotateY(-180deg)",
                            "-o-transform": " rotateY(-180deg)",
                            transform: " rotateY(-180deg)"
                        });
                        break;
                    case "flipUp":
                        if (t.find(".back").length > 0) {
                            t.html(t.find(".back").html())
                        }
                        var i = t.text();
                        var s = e.inArray(i, n);
                        if (s + 1 == n.length) s = -1;
                        t.html("");
                        e("<span class='front'>" + i + "</span>").appendTo(t);
                        e("<span class='back'>" + n[s + 1] + "</span>").appendTo(t);
                        t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
                            "-webkit-transform": " rotateX(-180deg)",
                            "-moz-transform": " rotateX(-180deg)",
                            "-o-transform": " rotateX(-180deg)",
                            transform: " rotateX(-180deg)"
                        });
                        break;
                    case "flipCube":
                        if (t.find(".back").length > 0) {
                            t.html(t.find(".back").html())
                        }
                        var i = t.text();
                        var s = e.inArray(i, n);
                        if (s + 1 == n.length) s = -1;
                        t.html("");
                        e("<span class='front'>" + i + "</span>").appendTo(t);
                        e("<span class='back'>" + n[s + 1] + "</span>").appendTo(t);
                        t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
                            "-webkit-transform": " rotateY(180deg)",
                            "-moz-transform": " rotateY(180deg)",
                            "-o-transform": " rotateY(180deg)",
                            transform: " rotateY(180deg)"
                        });
                        break;
                    case "flipCubeUp":
                        if (t.find(".back").length > 0) {
                            t.html(t.find(".back").html())
                        }
                        var i = t.text();
                        var s = e.inArray(i, n);
                        if (s + 1 == n.length) s = -1;
                        t.html("");
                        e("<span class='front'>" + i + "</span>").appendTo(t);
                        e("<span class='back'>" + n[s + 1] + "</span>").appendTo(t);
                        t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
                            "-webkit-transform": " rotateX(180deg)",
                            "-moz-transform": " rotateX(180deg)",
                            "-o-transform": " rotateX(180deg)",
                            transform: " rotateX(180deg)"
                        });
                        break;
                    case "spin":
                        if (t.find(".rotating").length > 0) {
                            t.html(t.find(".rotating").html())
                        }
                        s = e.inArray(t.text(), n);
                        if (s + 1 == n.length) s = -1;
                        t.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s + 1]).show().css({
                            "-webkit-transform": " rotate(0) scale(1)",
                            "-moz-transform": "rotate(0) scale(1)",
                            "-o-transform": "rotate(0) scale(1)",
                            transform: "rotate(0) scale(1)"
                        });
                        break;
                    case "fade":
                        t.fadeOut(r.speed, function() {
                            s = e.inArray(t.text(), n);
                            if (s + 1 == n.length) s = -1;
                            t.text(n[s + 1]).fadeIn(r.speed)
                        });
                        break
                }
            };
            setInterval(i, r.speed)
        })
    }
}(window.jQuery);


/* Bootsnav */

! function(n) {
    "use strict";
    var a = {
        initialize: function() {
            this.event(), this.hoverDropdown(), this.navbarSticky(), this.navbarScrollspy()
        },
        event: function() {
            var a = n("nav.navbar.bootsnav"),
                o = a.hasClass("navbar-sticky");
            if (o && a.wrap("<div class='wrap-sticky'></div>"), a.hasClass("brand-center")) {
                var s = new Array,
                    e = n("nav.brand-center"),
                    t = e.find("ul.navbar-nav");
                e.prepend("<span class='storage-name' style='display:none;'></span>"), e.find("ul.navbar-nav > li").each(function() {
                    if (n(this).hasClass("active")) {
                        var a = n("a", this).eq(0).text();
                        n(".storage-name").html(a)
                    }
                    s.push(n(this).html())
                });
                var i = s.splice(0, Math.round(s.length / 2)),
                    l = s,
                    d = "",
                    r = function(n) {
                        d = "";
                        for (var a = 0; a < n.length; a++) d += "<li>" + n[a] + "</li>"
                    };
                r(i), t.html(d), e.find("ul.nav").first().addClass("navbar-left"), r(l), t.after('<ul class="nav navbar-nav"></ul>').next().html(d), e.find("ul.nav").last().addClass("navbar-right"), e.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>"), e.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>"), e.find("ul.navbar-nav > li").each(function() {
                    var a = n("ul.dropdown-menu", this),
                        o = n("ul.megamenu-content", this);
                    a.closest("li").addClass("dropdown"), o.closest("li").addClass("megamenu-fw")
                });
                var c = n(".storage-name").html();
                "" == !c && n("ul.navbar-nav > li:contains('" + c + "')").addClass("active")
            }
            a.hasClass("navbar-sidebar") ? (n("body").addClass("wrap-nav-sidebar"), a.wrapInner("<div class='scroller'></div>")) : n(".bootsnav").addClass("on"), a.find("ul.nav").hasClass("navbar-center") && a.addClass("menu-center"), a.hasClass("navbar-full") ? (n("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>"), n(".wrap-full-menu").wrap("<div class='nav-full'></div>"), n("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa ion-android-close'></i></a></li>")) : a.hasClass("navbar-mobile") ? a.removeClass("no-full") : a.addClass("no-full"), a.hasClass("navbar-mobile") && (n(".navbar-collapse").on("shown.bs.collapse", function() {
                n("body").addClass("side-right")
            }), n(".navbar-collapse").on("hide.bs.collapse", function() {
                n("body").removeClass("side-right")
            }), n(window).on("resize", function() {
                n("body").removeClass("side-right")
            })), a.hasClass("no-background") && n(window).on("scroll", function() {
                var a = n(window).scrollTop();
                a > 34 ? n(".navbar-fixed").removeClass("no-background") : n(".navbar-fixed").addClass("no-background")
            }), a.hasClass("navbar-transparent") && n(window).on("scroll", function() {
                var a = n(window).scrollTop();
                a > 34 ? n(".navbar-fixed").removeClass("navbar-transparent") : n(".navbar-fixed").addClass("navbar-transparent")
            }), n(".btn-cart").on("click", function(n) {
                n.stopPropagation()
            }), n("nav.navbar.bootsnav .attr-nav").each(function() {
                n("li.search > a", this).on("click", function(a) {
                    a.preventDefault(), n(".top-search").slideToggle()
                })
            }), n(".input-group-addon.close-search").on("click", function() {
                n(".top-search").slideUp()
            }), n("nav.navbar.bootsnav .attr-nav").each(function() {
                n("li.side-menu > a", this).on("click", function(a) {
                    a.preventDefault(), n("nav.navbar.bootsnav > .side").toggleClass("on"), n("body").toggleClass("on-side")
                })
            }), n(".side .close-side").on("click", function(a) {
                a.preventDefault(), n("nav.navbar.bootsnav > .side").removeClass("on"), n("body").removeClass("on-side")
            })
        },
        hoverDropdown: function() {
            var a = n("nav.navbar.bootsnav"),
                o = n(window).width(),
                s = n(window).height(),
                e = a.find("ul.nav").data("in"),
                t = a.find("ul.nav").data("out");
            if (991 > o) {
                n(".scroller").css("height", "auto"), n("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter"), n("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave"), n("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter"), n("nav.navbar.bootsnav ul.nav").off("mouseleave"), n(".navbar-collapse").removeClass("animated"), n("nav.navbar.bootsnav ul.nav").each(function() {
                    n(".dropdown-menu", this).addClass("animated"), n(".dropdown-menu", this).removeClass(t), n("a.dropdown-toggle", this).off("click"), n("a.dropdown-toggle", this).on("click", function(a) {
                        return a.stopPropagation(), n(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(e), n(this).closest("li.dropdown").first().toggleClass("on"), !1
                    }), n("li.dropdown", this).each(function() {
                        return n(this).find(".dropdown-menu").stop().fadeOut(), n(this).on("hidden.bs.dropdown", function() {
                            n(this).find(".dropdown-menu").stop().fadeOut()
                        }), !1
                    }), n(".megamenu-fw", this).each(function() {
                        n(".col-menu", this).each(function() {
                            n(".content", this).addClass("animated"), n(".content", this).stop().fadeOut(), n(".title", this).off("click"), n(".title", this).on("click", function() {
                                return n(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(e), n(this).closest(".col-menu").toggleClass("on"), !1
                            }), n(".content", this).on("click", function(n) {
                                n.stopPropagation()
                            })
                        })
                    })
                });
                var i = function() {
                    n("li.dropdown", this).removeClass("on"), n(".dropdown-menu", this).stop().fadeOut(), n(".dropdown-menu", this).removeClass(e), n(".col-menu", this).removeClass("on"), n(".col-menu .content", this).stop().fadeOut(), n(".col-menu .content", this).removeClass(e)
                };
                n("nav.navbar.bootsnav").on("mouseleave", function() {
                    i()
                }), n("nav.navbar.bootsnav .attr-nav").each(function() {
                    n(".dropdown-menu", this).removeClass("animated"), n("li.dropdown", this).off("mouseenter"), n("li.dropdown", this).off("mouseleave"), n("a.dropdown-toggle", this).off("click"), n("a.dropdown-toggle", this).on("click", function(a) {
                        a.stopPropagation(), n(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle(), n(".navbar-toggle").each(function() {
                            n(".tr-icon", this).removeClass("ion-android-close"), n(".tr-icon", this).addClass("ion-android-menu"), n(".navbar-collapse").removeClass("in"), n(".navbar-collapse").removeClass("on")
                        })
                    }), n(this).on("mouseleave", function() {
                        return n(".dropdown-menu", this).stop().fadeOut(), n("li.dropdown", this).removeClass("on"), !1
                    })
                }), n(".navbar-toggle").each(function() {
                    n(this).off("click"), n(this).on("click", function() {
                        n(".tr-icon", this).toggleClass("ion-android-menu"), n(".tr-icon", this).toggleClass("ion-android-close"), i()
                    })
                })
            } else o > 991 && (n(".scroller").css("height", s + "px"), a.hasClass("navbar-sidebar") ? n("nav.navbar.bootsnav ul.nav").each(function() {
                n("a.dropdown-toggle", this).off("click"), n("a.dropdown-toggle", this).on("click", function(n) {
                    n.stopPropagation()
                }), n(".dropdown-menu", this).addClass("animated"), n("li.dropdown", this).on("mouseenter", function() {
                    return n(".dropdown-menu", this).eq(0).removeClass(t), n(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(e), n(this).addClass("on"), !1
                }), n(".col-menu").each(function() {
                    n(".content", this).addClass("animated"), n(".title", this).on("mouseenter", function() {
                        return n(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(e), n(this).closest(".col-menu").addClass("on"), !1
                    })
                }), n(this).on("mouseleave", function() {
                    return n(".dropdown-menu", this).stop().removeClass(e), n(".dropdown-menu", this).stop().addClass(t).fadeOut(), n(".col-menu", this).find(".content").stop().fadeOut().removeClass(e), n(".col-menu", this).removeClass("on"), n("li.dropdown", this).removeClass("on"), !1
                })
            }) : n("nav.navbar.bootsnav ul.nav").each(function() {
                n("a.dropdown-toggle", this).off("click"), n("a.dropdown-toggle", this).on("click", function(n) {
                    n.stopPropagation()
                }), n(".megamenu-fw", this).each(function() {
                    n(".title", this).off("click"), n("a.dropdown-toggle", this).off("click"), n(".content").removeClass("animated")
                }), n(".dropdown-menu", this).addClass("animated"), n("li.dropdown", this).on("mouseenter", function() {
                    return n(".dropdown-menu", this).eq(0).removeClass(t), n(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(e), n(this).addClass("on"), !1
                }), n("li.dropdown", this).on("mouseleave", function() {
                    n(".dropdown-menu", this).eq(0).removeClass(e), n(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(t), n(this).removeClass("on")
                }), n(this).on("mouseleave", function() {
                    return n(".dropdown-menu", this).removeClass(e), n(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(t), n("li.dropdown", this).removeClass("on"), !1
                })
            }), n("nav.navbar.bootsnav .attr-nav").each(function() {
                n("a.dropdown-toggle", this).off("click"), n("a.dropdown-toggle", this).on("click", function(n) {
                    n.stopPropagation()
                }), n(".dropdown-menu", this).addClass("animated"), n("li.dropdown", this).on("mouseenter", function() {
                    return n(".dropdown-menu", this).eq(0).removeClass(t), n(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(e), n(this).addClass("on"), !1
                }), n("li.dropdown", this).on("mouseleave", function() {
                    n(".dropdown-menu", this).eq(0).removeClass(e), n(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(t), n(this).removeClass("on")
                }), n(this).on("mouseleave", function() {
                    return n(".dropdown-menu", this).removeClass(e), n(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(t), n("li.dropdown", this).removeClass("on"), !1
                })
            }));
            if (a.hasClass("navbar-full")) {
                var l = n(window).height(),
                    d = n(window).width();
                n(".nav-full").css("height", l + "px"), n(".wrap-full-menu").css("height", l + "px"), n(".wrap-full-menu").css("width", d + "px"), n(".navbar-collapse").addClass("animated"), n(".navbar-toggle").each(function() {
                    var a = n(this).data("target");
                    n(this).off("click"), n(this).on("click", function(o) {
                        return o.preventDefault(), n(a).removeClass(t), n(a).addClass("in"), n(a).addClass(e), !1
                    }), n("li.close-full-menu").on("click", function(o) {
                        return o.preventDefault(), n(a).addClass(t), setTimeout(function() {
                            n(a).removeClass("in"), n(a).removeClass(e)
                        }, 500), !1
                    })
                })
            }
        },
        navbarSticky: function() {
            var a = n("nav.navbar.bootsnav"),
                o = a.hasClass("navbar-sticky");
            if (o) {
                var s = a.height();
                n(".wrap-sticky").height(s);
                var e = n(".wrap-sticky").offset().top;
                n(window).on("scroll", function() {
                    var o = n(window).scrollTop();
                    o > e ? a.addClass("sticked") : a.removeClass("sticked")
                })
            }
        },
        navbarScrollspy: function() {
            var a = n(".navbar-scrollspy"),
                o = n("body"),
                s = n("nav.navbar.bootsnav"),
                e = s.outerHeight();
            if (a.length) {
                o.scrollspy({
                    target: ".navbar",
                    offset: e
                }), n(".scroll").on("click", function(a) {
                    a.preventDefault(), n(".scroll").removeClass("active"), n(this).addClass("active"), n(".navbar-collapse").removeClass("in"), n(".navbar-toggle").each(function() {
                        n(".tr-icon", this).removeClass("ion-android-close"), n(".tr-icon", this).addClass("ion-android-menu")
                    });
                    var o = (n(window).scrollTop(), n(this).find("a")),
                        e = n(o.attr("href")).offset().top,
                        t = n(window).width(),
                        i = s.data("minus-value-desktop"),
                        l = s.data("minus-value-mobile"),
                        d = s.data("speed");
                    if (t > 992) var r = e - i;
                    else var r = e - l;
                    n("html, body").stop().animate({
                        scrollTop: r
                    }, d)
                });
                var t = function() {
                    var n = o.data("bs.scrollspy");
                    n && (e = s.outerHeight(), n.options.offset = e, o.data("bs.scrollspy", n), o.scrollspy("refresh"))
                };
                n(window).on("resize", function() {
                    clearTimeout(n);
                    var n = setTimeout(t, 200)
                })
            }
        }
    };
    n(document).ready(function() {
        a.initialize()
    }), n(window).on("resize", function() {
        a.hoverDropdown(), setTimeout(function() {
            a.navbarSticky()
        }, 500), n(".navbar-toggle").each(function() {
            n(".tr-icon", this).removeClass("ion-android-close"), n(".tr-icon", this).addClass("ion-android-menu"), n(this).removeClass("fixed")
        }), n(".navbar-collapse").removeClass("in"), n(".navbar-collapse").removeClass("on"), n(".navbar-collapse").removeClass("bounceIn")
    })
}(jQuery);


/*!
 * Cube Portfolio - Responsive jQuery Grid Plugin
 *
 * version: 3.2.1 (14 October, 2015)
 * require: jQuery v1.7+
 *
 * Copyright 2013-2015, Mihai Buricea (http://scriptpie.com/cubeportfolio/live-preview/)
 * Licensed under CodeCanyon License (http://codecanyon.net/licenses)
 *
 */
! function(a, b, c, d) {
    "use strict";

    function e(b, c, d) {
        var f, g = this,
            h = "cbp";
        if (a.data(b, "cubeportfolio")) throw new Error("cubeportfolio is already initialized. Destroy it before initialize again!");
        a.data(b, "cubeportfolio", g), g.options = a.extend({}, a.fn.cubeportfolio.options, c), g.isAnimating = !0, g.defaultFilter = g.options.defaultFilter, g.registeredEvents = [], g.queue = [], g.addedWrapp = !1, a.isFunction(d) && g.registerEvent("initFinish", d, !0), g.obj = b, g.$obj = a(b), f = g.$obj.children(), g.options.caption && ("expand" === g.options.caption || e.Private.modernBrowser || (g.options.caption = "minimal"), h += " cbp-caption-active cbp-caption-" + g.options.caption), g.$obj.addClass(h), (0 === f.length || f.first().hasClass("cbp-item")) && (g.wrapInner(g.obj, "cbp-wrapper"), g.addedWrapp = !0), g.$ul = g.$obj.children().addClass("cbp-wrapper"), g.wrapInner(g.obj, "cbp-wrapper-outer"), g.wrapper = g.$obj.children(".cbp-wrapper-outer"), g.blocks = g.$ul.children(".cbp-item"), g.blocksOn = g.blocks, g.wrapInner(g.blocks, "cbp-item-wrapper"), g.plugins = a.map(e.Plugins, function(a) {
            return a(g)
        }), g.loadImages(g.$obj, g.display)
    }
    a.extend(e.prototype, {
        storeData: function(b, c) {
            var d = this;
            c = c || 0, b.each(function(b, e) {
                var f = a(e),
                    g = f.width(),
                    h = f.height();
                f.data("cbp", {
                    index: c + b,
                    wrapper: f.children(".cbp-item-wrapper"),
                    widthInitial: g,
                    heightInitial: h,
                    width: g,
                    height: h,
                    widthAndGap: g + d.options.gapVertical,
                    heightAndGap: h + d.options.gapHorizontal,
                    left: null,
                    leftNew: null,
                    top: null,
                    topNew: null,
                    pack: !1
                })
            })
        },
        wrapInner: function(a, b) {
            var e, f, g;
            if (b = b || "", !(a.length && a.length < 1))
                for (a.length === d && (a = [a]), f = a.length - 1; f >= 0; f--) {
                    for (e = a[f], g = c.createElement("div"), g.setAttribute("class", b); e.childNodes.length;) g.appendChild(e.childNodes[0]);
                    e.appendChild(g)
                }
        },
        loadImages: function(b, c) {
            var d = this;
            requestAnimationFrame(function() {
                var e = b.find("img").map(function(a, b) {
                        return d.checkSrc(b.src)
                    }),
                    f = e.length;
                return 0 === f ? void c.call(d) : void a.each(e, function(b, e) {
                    a("<img>").on("load.cbp error.cbp", function() {
                        f--, 0 === f && c.call(d)
                    }).attr("src", e)
                })
            })
        },
        checkSrc: function(a) {
            if ("" === a) return null;
            var b = new Image;
            return b.src = a, b.complete && b.naturalWidth !== d && 0 !== b.naturalWidth ? null : a
        },
        display: function() {
            var a = this;
            a.width = a.$obj.outerWidth(), a.storeData(a.blocks), a.triggerEvent("initStartRead"), a.triggerEvent("initStartWrite"), "slider" === a.options.layoutMode && a.registerEvent("gridAdjust", function() {
                a.sliderMarkup()
            }, !0), a.layoutAndAdjustment(), a.triggerEvent("initEndRead"), a.triggerEvent("initEndWrite"), a.$obj.addClass("cbp-ready"), a.runQueue("delayFrame", a.delayFrame)
        },
        delayFrame: function() {
            var a = this;
            requestAnimationFrame(function() {
                a.resizeEvent(), a.triggerEvent("initFinish"), a.isAnimating = !1, a.$obj.trigger("initComplete.cbp")
            })
        },
        resizeEvent: function() {
            var a, b = this;
            e.Private.initResizeEvent({
                instance: b,
                fn: function() {
                    var b = this;
                    b.triggerEvent("beforeResizeGrid"), a = b.$obj.outerWidth(), b.width !== a && ("alignCenter" === b.options.gridAdjustment && (b.wrapper[0].style.maxWidth = ""), b.width = a, b.layoutAndAdjustment(), "slider" === b.options.layoutMode && b.updateSlider(), b.triggerEvent("resizeGrid")), b.triggerEvent("resizeWindow")
                }
            })
        },
        gridAdjust: function() {
            var b = this;
            "responsive" === b.options.gridAdjustment ? b.responsiveLayout() : (b.blocks.removeAttr("style"), b.blocks.each(function(c, d) {
                var e = a(d).data("cbp"),
                    f = d.getBoundingClientRect(),
                    g = b.columnWidthTruncate(f.right - f.left),
                    h = Math.round(f.bottom - f.top);
                e.height = h, e.heightAndGap = h + b.options.gapHorizontal, e.width = g, e.widthAndGap = g + b.options.gapVertical
            }), b.widthAvailable = b.width + b.options.gapVertical), b.triggerEvent("gridAdjust")
        },
        layoutAndAdjustment: function() {
            var a = this;
            a.gridAdjust(), a.layout()
        },
        layout: function() {
            var a = this;
            a.computeBlocks(a.filterConcat(a.defaultFilter)), "slider" === a.options.layoutMode ? (a.sliderLayoutReset(), a.sliderLayout()) : (a.mosaicLayoutReset(), a.mosaicLayout()), a.positionateItems(), a.resizeMainContainer()
        },
        computeFilter: function(a) {
            var b = this;
            b.computeBlocks(a), b.mosaicLayoutReset(), b.mosaicLayout(), b.filterLayout()
        },
        filterLayout: function() {
            var b = this;
            b.blocksOff.addClass("cbp-item-off"), b.blocksOn.removeClass("cbp-item-off").each(function(b, c) {
                var d = a(c).data("cbp");
                d.left = d.leftNew, d.top = d.topNew, c.style.left = d.left + "px", c.style.top = d.top + "px"
            }), b.resizeMainContainer(), b.filterFinish()
        },
        filterFinish: function() {
            var a = this;
            a.blocksAreSorted && a.sortBlocks(a.blocks, "index"), a.isAnimating = !1, a.$obj.trigger("filterComplete.cbp"), a.triggerEvent("filterFinish")
        },
        computeBlocks: function(a) {
            var b = this;
            b.blocksOnInitial = b.blocksOn, b.blocksOn = b.blocks.filter(a), b.blocksOff = b.blocks.not(a), b.triggerEvent("computeBlocksFinish", a)
        },
        responsiveLayout: function() {
            var b = this;
            b.cols = b[a.isArray(b.options.mediaQueries) ? "getColumnsBreakpoints" : "getColumnsAuto"](), b.columnWidth = b.columnWidthTruncate((b.width + b.options.gapVertical) / b.cols), b.widthAvailable = b.columnWidth * b.cols, "mosaic" === b.options.layoutMode && b.getMosaicWidthReference(), b.blocks.each(function(c, d) {
                var e, f = a(d).data("cbp"),
                    g = 1;
                "mosaic" === b.options.layoutMode && (g = b.getColsMosaic(f.widthInitial)), e = b.columnWidth * g - b.options.gapVertical, d.style.width = e + "px", f.width = e, f.widthAndGap = e + b.options.gapVertical, d.style.height = ""
            }), b.blocks.each(function(c, d) {
                var e = a(d).data("cbp"),
                    f = d.getBoundingClientRect(),
                    g = Math.round(f.bottom - f.top);
                e.height = g, e.heightAndGap = g + b.options.gapHorizontal
            })
        },
        getMosaicWidthReference: function() {
            var b = this,
                c = [];
            b.blocks.each(function(b, d) {
                var e = a(d).data("cbp");
                c.push(e.widthInitial)
            }), c.sort(function(a, b) {
                return a - b
            }), b.mosaicWidthReference = c[0] ? c[0] : b.columnWidth
        },
        getColsMosaic: function(a) {
            var b = this;
            if (a === b.width) return b.cols;
            var c = a / b.mosaicWidthReference;
            return c = c % 1 >= .79 ? Math.ceil(c) : Math.floor(c), Math.min(Math.max(c, 1), b.cols)
        },
        getColumnsAuto: function() {
            var a = this;
            if (0 === a.blocks.length) return 1;
            var b = a.blocks.first().data("cbp").widthInitial + a.options.gapVertical;
            return Math.max(Math.round(a.width / b), 1)
        },
        getColumnsBreakpoints: function() {
            var b, c = this,
                e = c.width;
            return a.each(c.options.mediaQueries, function(a, c) {
                return e >= c.width ? (b = c.cols, !1) : void 0
            }), b === d && (b = c.options.mediaQueries[c.options.mediaQueries.length - 1].cols), b
        },
        columnWidthTruncate: function(a) {
            return Math.floor(a)
        },
        positionateItems: function() {
            var b, c = this;
            c.blocksOn.removeClass("cbp-item-off").each(function(c, d) {
                b = a(d).data("cbp"), b.left = b.leftNew, b.top = b.topNew, d.style.left = b.left + "px", d.style.top = b.top + "px"
            }), c.blocksOff.addClass("cbp-item-off"), c.blocksAreSorted && c.sortBlocks(c.blocks, "index")
        },
        resizeMainContainer: function() {
            var b, c = this,
                f = Math.max(c.freeSpaces.slice(-1)[0].topStart - c.options.gapHorizontal, 0);
            "alignCenter" === c.options.gridAdjustment && (b = 0, c.blocksOn.each(function(c, d) {
                var e = a(d).data("cbp"),
                    f = e.left + e.width;
                f > b && (b = f)
            }), c.wrapper[0].style.maxWidth = b + "px"), f !== c.height && (c.obj.style.height = f + "px", c.height !== d && (e.Private.modernBrowser ? c.$obj.one(e.Private.transitionend, function() {
                c.$obj.trigger("pluginResize.cbp")
            }) : c.$obj.trigger("pluginResize.cbp")), c.height = f, c.triggerEvent("resizeMainContainer"))
        },
        filterConcat: function(a) {
            return a.replace(/\|/gi, "")
        },
        pushQueue: function(a, b) {
            var c = this;
            c.queue[a] = c.queue[a] || [], c.queue[a].push(b)
        },
        runQueue: function(b, c) {
            var d = this,
                e = d.queue[b] || [];
            a.when.apply(a, e).then(a.proxy(c, d))
        },
        clearQueue: function(a) {
            var b = this;
            b.queue[a] = []
        },
        registerEvent: function(a, b, c) {
            var d = this;
            d.registeredEvents[a] || (d.registeredEvents[a] = []), d.registeredEvents[a].push({
                func: b,
                oneTime: c || !1
            })
        },
        triggerEvent: function(a, b) {
            var c, d, e = this;
            if (e.registeredEvents[a])
                for (c = 0, d = e.registeredEvents[a].length; d > c; c++) e.registeredEvents[a][c].func.call(e, b), e.registeredEvents[a][c].oneTime && (e.registeredEvents[a].splice(c, 1), c--, d--)
        },
        addItems: function(b, c) {
            var d = this;
            d.wrapInner(b, "cbp-item-wrapper"), b.addClass("cbp-item-loading").css({
                top: "100%",
                left: 0
            }).appendTo(d.$ul), e.Private.modernBrowser ? b.last().one(e.Private.animationend, function() {
                d.addItemsFinish(b, c)
            }) : d.addItemsFinish(b, c), d.loadImages(b, function() {
                d.$obj.addClass("cbp-addItems"), d.storeData(b, d.blocks.length), a.merge(d.blocks, b), d.triggerEvent("addItemsToDOM", b), d.layoutAndAdjustment(), "slider" === d.options.layoutMode && d.updateSlider(), d.elems && e.Public.showCounter.call(d.obj, d.elems)
            })
        },
        addItemsFinish: function(b, c) {
            var d = this;
            d.isAnimating = !1, d.$obj.removeClass("cbp-addItems"), b.removeClass("cbp-item-loading"), a.isFunction(c) && c.call(d)
        }
    }), a.fn.cubeportfolio = function(a, b, c) {
        return this.each(function() {
            if ("object" == typeof a || !a) return e.Public.init.call(this, a, b);
            if (e.Public[a]) return e.Public[a].call(this, b, c);
            throw new Error("Method " + a + " does not exist on jquery.cubeportfolio.js")
        })
    }, e.Plugins = {}, a.fn.cubeportfolio.Constructor = e
}(jQuery, window, document),
function(a) {
    "use strict";

    function b(b) {
        var c = this;
        c.parent = b, c.filters = a(b.options.filters), c.filterData = [], c.filterFromUrl(), c.registerFilter()
    }
    var c = a.fn.cubeportfolio.Constructor;
    b.prototype.registerFilter = function() {
        var b = this,
            c = b.parent,
            d = c.defaultFilter.split("|");
        b.wrap = b.filters.find(".cbp-l-filters-dropdownWrap").on({
            "mouseover.cbp": function() {
                a(this).addClass("cbp-l-filters-dropdownWrap-open")
            },
            "mouseleave.cbp": function() {
                a(this).removeClass("cbp-l-filters-dropdownWrap-open")
            }
        }), b.filters.each(function(e, f) {
            var g = a(f),
                h = "*",
                i = g.find(".cbp-filter-item"),
                j = {};
            g.hasClass("cbp-l-filters-dropdown") && (j.wrap = g.find(".cbp-l-filters-dropdownWrap"), j.header = g.find(".cbp-l-filters-dropdownHeader"), j.headerText = j.header.text()), c.$obj.cubeportfolio("showCounter", i), a.each(d, function(a, b) {
                return i.filter('[data-filter="' + b + '"]').length ? (h = b, d.splice(a, 1), !1) : void 0
            }), a.data(f, "filterName", h), b.filterData.push(f), b.filtersCallback(j, i.filter('[data-filter="' + h + '"]')), i.on("click.cbp", function() {
                var d = a(this);
                if (!d.hasClass("cbp-filter-item-active") && !c.isAnimating) {
                    b.filtersCallback(j, d), a.data(f, "filterName", d.data("filter"));
                    var e = a.map(b.filterData, function(b) {
                        var c = a.data(b, "filterName");
                        return "" !== c && "*" !== c ? c : null
                    });
                    e.length < 1 && (e = ["*"]);
                    var g = e.join("|");
                    c.defaultFilter !== g && c.$obj.cubeportfolio("filter", g)
                }
            })
        })
    }, b.prototype.filtersCallback = function(b, c) {
        a.isEmptyObject(b) || (b.wrap.trigger("mouseleave.cbp"), b.headerText ? b.headerText = "" : b.header.text(c.text())), c.addClass("cbp-filter-item-active").siblings().removeClass("cbp-filter-item-active")
    }, b.prototype.filterFromUrl = function() {
        var a = /#cbpf=(.*?)([#\?&]|$)/gi.exec(location.href);
        null !== a && (this.parent.defaultFilter = decodeURIComponent(a[1]))
    }, b.prototype.destroy = function() {
        var a = this;
        a.filters.find(".cbp-filter-item").off(".cbp"), a.wrap.off(".cbp")
    }, c.Plugins.Filters = function(a) {
        return "" === a.options.filters ? null : new b(a)
    }
}(jQuery, window, document),
function(a, b) {
    "use strict";

    function c(b) {
        var c = this;
        c.parent = b, c.loadMore = a(b.options.loadMore).find(".cbp-l-loadMore-link"), b.options.loadMoreAction.length && c[b.options.loadMoreAction]()
    }
    var d = a.fn.cubeportfolio.Constructor;
    c.prototype.click = function() {
        var b = this,
            c = 0;
        b.loadMore.on("click.cbp", function(d) {
            var e = a(this);
            d.preventDefault(), b.parent.isAnimating || e.hasClass("cbp-l-loadMore-stop") || (e.addClass("cbp-l-loadMore-loading"), c++, a.ajax({
                url: b.loadMore.attr("href"),
                type: "GET",
                dataType: "HTML"
            }).done(function(d) {
                var f, g;
                f = a(d).filter(function() {
                    return a(this).is("div.cbp-loadMore-block" + c)
                }), b.parent.$obj.cubeportfolio("appendItems", f.children(), function() {
                    e.removeClass("cbp-l-loadMore-loading"), g = a(d).filter(function() {
                        return a(this).is("div.cbp-loadMore-block" + (c + 1))
                    }), 0 === g.length && e.addClass("cbp-l-loadMore-stop")
                })
            }).fail(function() {}))
        })
    }, c.prototype.auto = function() {
        var c = this;
        c.parent.$obj.on("initComplete.cbp", function() {
            Object.create({
                init: function() {
                    var d = this;
                    d.isActive = !1, d.numberOfClicks = 0, c.loadMore.addClass("cbp-l-loadMore-loading"), d.window = a(b), d.addEvents(), d.getNewItems()
                },
                addEvents: function() {
                    var a, b = this;
                    c.loadMore.on("click.cbp", function(a) {
                        a.preventDefault()
                    }), b.window.on("scroll.loadMoreObject", function() {
                        clearTimeout(a), a = setTimeout(function() {
                            c.parent.isAnimating || b.getNewItems()
                        }, 80)
                    }), c.parent.$obj.on("filterComplete.cbp", function() {
                        b.getNewItems()
                    })
                },
                getNewItems: function() {
                    var b, d, e = this;
                    e.isActive || c.loadMore.hasClass("cbp-l-loadMore-stop") || (b = c.loadMore.offset().top, d = e.window.scrollTop() + e.window.height(), b > d || (e.isActive = !0, e.numberOfClicks++, a.ajax({
                        url: c.loadMore.attr("href"),
                        type: "GET",
                        dataType: "HTML",
                        cache: !0
                    }).done(function(b) {
                        var d, f;
                        d = a(b).filter(function() {
                            return a(this).is("div.cbp-loadMore-block" + e.numberOfClicks)
                        }), c.parent.$obj.cubeportfolio("appendItems", d.html(), function() {
                            f = a(b).filter(function() {
                                return a(this).is("div.cbp-loadMore-block" + (e.numberOfClicks + 1))
                            }), 0 === f.length ? (c.loadMore.addClass("cbp-l-loadMore-stop"), e.window.off("scroll.loadMoreObject"), c.parent.$obj.off("filterComplete.cbp")) : (e.isActive = !1, e.window.trigger("scroll.loadMoreObject"))
                        })
                    }).fail(function() {
                        e.isActive = !1
                    })))
                }
            }).init()
        })
    }, c.prototype.destroy = function() {
        var c = this;
        c.loadMore.off(".cbp"), a(b).off("scroll.loadMoreObject")
    }, d.Plugins.LoadMore = function(a) {
        return "" === a.options.loadMore ? null : new c(a)
    }
}(jQuery, window, document), jQuery.fn.cubeportfolio.options = {
        filters: "",
        loadMore: "",
        loadMoreAction: "click",
        search: "",
        layoutMode: "grid",
        sortToPreventGaps: !1,
        drag: !0,
        auto: !1,
        autoTimeout: 5e3,
        autoPauseOnHover: !0,
        showNavigation: !0,
        showPagination: !0,
        rewindNav: !0,
        scrollByPage: !1,
        defaultFilter: "*",
        filterDeeplinking: !1,
        animationType: "fadeOut",
        gridAdjustment: "responsive",
        mediaQueries: !1,
        gapHorizontal: 10,
        gapVertical: 10,
        caption: "pushTop",
        displayType: "lazyLoading",
        displayTypeSpeed: 400,
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: !0,
        lightboxTitleSrc: "data-title",
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        singlePageDelegate: ".cbp-singlePage",
        singlePageDeeplinking: !0,
        singlePageStickyNavigation: !0,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageAnimation: "left",
        singlePageCallback: function() {},
        singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlinePosition: "top",
        singlePageInlineInFocus: !0,
        singlePageInlineCallback: function() {}
    },
    function(a, b, c) {
        "use strict";

        function d(a) {
            var b = this;
            b.parent = a, a.options.lightboxShowCounter === !1 && (a.options.lightboxCounter = ""), a.options.singlePageShowCounter === !1 && (a.options.singlePageCounter = ""), a.registerEvent("initStartRead", function() {
                b.run()
            }, !0)
        }
        var e = a.fn.cubeportfolio.Constructor,
            f = {
                init: function(b, d) {
                    var e, f = this;
                    if (f.cubeportfolio = b, f.type = d, f.isOpen = !1, f.options = f.cubeportfolio.options, "lightbox" === d && f.cubeportfolio.registerEvent("resizeWindow", function() {
                            f.resizeImage()
                        }), "singlePageInline" === d) return f.startInline = -1, f.height = 0, f.createMarkupSinglePageInline(), void f.cubeportfolio.registerEvent("resizeGrid", function() {
                        f.isOpen && f.close()
                    });
                    if (f.createMarkup(), "singlePage" === d && (f.cubeportfolio.registerEvent("resizeWindow", function() {
                            if (f.options.singlePageStickyNavigation) {
                                var a = f.wrap[0].clientWidth;
                                a > 0 && (f.navigationWrap.width(a), f.navigation.width(a))
                            }
                        }), f.options.singlePageDeeplinking)) {
                        f.url = location.href, "#" === f.url.slice(-1) && (f.url = f.url.slice(0, -1));
                        var g = f.url.split("#cbp="),
                            h = g.shift();
                        if (a.each(g, function(b, c) {
                                return f.cubeportfolio.blocksOn.each(function(b, d) {
                                    var g = a(d).find(f.options.singlePageDelegate + '[href="' + c + '"]');
                                    return g.length ? (e = g, !1) : void 0
                                }), e ? !1 : void 0
                            }), e) {
                            f.url = h;
                            var i = e,
                                j = i.attr("data-cbp-singlePage"),
                                k = [];
                            j ? k = i.closest(a(".cbp-item")).find('[data-cbp-singlePage="' + j + '"]') : f.cubeportfolio.blocksOn.each(function(b, c) {
                                var d = a(c);
                                d.not(".cbp-item-off") && d.find(f.options.singlePageDelegate).each(function(b, c) {
                                    a(c).attr("data-cbp-singlePage") || k.push(c)
                                })
                            }), f.openSinglePage(k, e[0])
                        } else if (g.length) {
                            var l = c.createElement("a");
                            l.setAttribute("href", g[0]), f.openSinglePage([l], l)
                        }
                    }
                },
                createMarkup: function() {
                    var b = this,
                        d = "";
                    "singlePage" === b.type && "left" !== b.options.singlePageAnimation && (d = " cbp-popup-singlePage-" + b.options.singlePageAnimation), b.wrap = a("<div/>", {
                        "class": "cbp-popup-wrap cbp-popup-" + b.type + d,
                        "data-action": "lightbox" === b.type ? "close" : ""
                    }).on("click.cbp", function(c) {
                        if (!b.stopEvents) {
                            var d = a(c.target).attr("data-action");
                            b[d] && (b[d](), c.preventDefault())
                        }
                    }), b.content = a("<div/>", {
                        "class": "cbp-popup-content"
                    }).appendTo(b.wrap), a("<div/>", {
                        "class": "cbp-popup-loadingBox"
                    }).appendTo(b.wrap), "ie8" === e.Private.browser && (b.bg = a("<div/>", {
                        "class": "cbp-popup-ie8bg",
                        "data-action": "lightbox" === b.type ? "close" : ""
                    }).appendTo(b.wrap)), b.navigationWrap = a("<div/>", {
                        "class": "cbp-popup-navigation-wrap"
                    }).appendTo(b.wrap), b.navigation = a("<div/>", {
                        "class": "cbp-popup-navigation"
                    }).appendTo(b.navigationWrap), b.closeButton = a("<div/>", {
                        "class": "cbp-popup-close",
                        title: "Close (Esc arrow key)",
                        "data-action": "close"
                    }).appendTo(b.navigation), b.nextButton = a("<div/>", {
                        "class": "cbp-popup-next",
                        title: "Next (Right arrow key)",
                        "data-action": "next"
                    }).appendTo(b.navigation), b.prevButton = a("<div/>", {
                        "class": "cbp-popup-prev",
                        title: "Previous (Left arrow key)",
                        "data-action": "prev"
                    }).appendTo(b.navigation), "singlePage" === b.type && (b.options.singlePageCounter && (b.counter = a(b.options.singlePageCounter).appendTo(b.navigation), b.counter.text("")), b.content.on("click.cbp", b.options.singlePageDelegate, function(a) {
                        a.preventDefault();
                        var c, d = b.dataArray.length,
                            e = this.getAttribute("href");
                        for (c = 0; d > c && b.dataArray[c].url !== e; c++);
                        b.singlePageJumpTo(c - b.current)
                    }), b.wrap.on("mousewheel.cbp DOMMouseScroll.cbp", function(a) {
                        a.stopImmediatePropagation()
                    })), a(c).on("keydown.cbp", function(a) {
                        b.isOpen && (b.stopEvents || (37 === a.keyCode ? b.prev() : 39 === a.keyCode ? b.next() : 27 === a.keyCode && b.close()))
                    })
                },
                createMarkupSinglePageInline: function() {
                    var b = this;
                    b.wrap = a("<div/>", {
                        "class": "cbp-popup-singlePageInline"
                    }).on("click.cbp", function(c) {
                        if (!b.stopEvents) {
                            var d = a(c.target).attr("data-action");
                            d && b[d] && (b[d](), c.preventDefault())
                        }
                    }), b.content = a("<div/>", {
                        "class": "cbp-popup-content"
                    }).appendTo(b.wrap), b.navigation = a("<div/>", {
                        "class": "cbp-popup-navigation"
                    }).appendTo(b.wrap), b.closeButton = a("<div/>", {
                        "class": "cbp-popup-close",
                        title: "Close (Esc arrow key)",
                        "data-action": "close"
                    }).appendTo(b.navigation)
                },
                destroy: function() {
                    var b = this,
                        d = a("body");
                    a(c).off("keydown.cbp"), d.off("click.cbp", b.options.lightboxDelegate), d.off("click.cbp", b.options.singlePageDelegate), b.content.off("click.cbp", b.options.singlePageDelegate), b.cubeportfolio.$obj.off("click.cbp", b.options.singlePageInlineDelegate), b.cubeportfolio.$obj.off("click.cbp", b.options.lightboxDelegate), b.cubeportfolio.$obj.off("click.cbp", b.options.singlePageDelegate), b.cubeportfolio.$obj.removeClass("cbp-popup-isOpening"), b.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), b.wrap.remove()
                },
                openLightbox: function(d, e) {
                    var f, g, h = this,
                        i = 0,
                        j = [];
                    if (!h.isOpen) {
                        if (h.isOpen = !0, h.stopEvents = !1, h.dataArray = [], h.current = null, f = e.getAttribute("href"), null === f) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        a.each(d, function(b, c) {
                            var d, e = c.getAttribute("href"),
                                g = e,
                                k = "isImage";
                            if (-1 === a.inArray(e, j)) {
                                if (f === e) h.current = i;
                                else if (!h.options.lightboxGallery) return;
                                /youtube/i.test(e) ? (d = e.substring(e.lastIndexOf("v=") + 2), /autoplay=/i.test(d) || (d += "&autoplay=1"), d = d.replace(/\?|&/, "?"), g = "//www.youtube.com/embed/" + d, k = "isYoutube") : /vimeo\.com/i.test(e) ? (d = e.substring(e.lastIndexOf("/") + 1), /autoplay=/i.test(d) || (d += "&autoplay=1"), d = d.replace(/\?|&/, "?"), g = "//player.vimeo.com/video/" + d, k = "isVimeo") : /www\.ted\.com/i.test(e) ? (g = "http://embed.ted.com/talks/" + e.substring(e.lastIndexOf("/") + 1) + ".html", k = "isTed") : /soundcloud\.com/i.test(e) ? (g = e, k = "isSoundCloud") : /(\.mp4)|(\.ogg)|(\.ogv)|(\.webm)/i.test(e) ? (g = e.split(-1 !== e.indexOf("|") ? "|" : "%7C"), k = "isSelfHostedVideo") : /\.mp3$/i.test(e) && (g = e, k = "isSelfHostedAudio"), h.dataArray.push({
                                    src: g,
                                    title: c.getAttribute(h.options.lightboxTitleSrc),
                                    type: k
                                }), i++
                            }
                            j.push(e)
                        }), h.counterTotal = h.dataArray.length, 1 === h.counterTotal ? (h.nextButton.hide(), h.prevButton.hide(), h.dataActionImg = "") : (h.nextButton.show(), h.prevButton.show(), h.dataActionImg = 'data-action="next"'), h.wrap.appendTo(c.body), h.scrollTop = a(b).scrollTop(), h.originalStyle = a("html").attr("style"), a("html").css({
                            overflow: "hidden",
                            paddingRight: b.innerWidth - a(c).width()
                        }), h.wrap.show(), g = h.dataArray[h.current], h[g.type](g)
                    }
                },
                openSinglePage: function(d, f) {
                    var g, h = this,
                        i = 0,
                        j = [];
                    if (!h.isOpen) {
                        if (h.cubeportfolio.singlePageInline && h.cubeportfolio.singlePageInline.isOpen && h.cubeportfolio.singlePageInline.close(), h.isOpen = !0, h.stopEvents = !1, h.dataArray = [], h.current = null, g = f.getAttribute("href"), null === g) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        if (a.each(d, function(b, c) {
                                var d = c.getAttribute("href"); - 1 === a.inArray(d, j) && (g === d && (h.current = i), h.dataArray.push({
                                    url: d,
                                    element: c
                                }), i++), j.push(d)
                            }), h.counterTotal = h.dataArray.length, 1 === h.counterTotal ? (h.nextButton.hide(), h.prevButton.hide()) : (h.nextButton.show(), h.prevButton.show()), h.wrap.appendTo(c.body), h.scrollTop = a(b).scrollTop(), a("html").css({
                                overflow: "hidden",
                                paddingRight: b.innerWidth - a(c).width()
                            }), h.wrap.scrollTop(0), h.wrap.show(), h.finishOpen = 2, h.navigationMobile = a(), h.wrap.one(e.Private.transitionend, function() {
                                var b;
                                h.options.singlePageStickyNavigation && (h.wrap.addClass("cbp-popup-singlePage-sticky"), b = h.wrap[0].clientWidth, h.navigationWrap.width(b), ("android" === e.Private.browser || "ios" === e.Private.browser) && (h.navigationMobile = a("<div/>", {
                                    "class": "cbp-popup-singlePage cbp-popup-singlePage-sticky",
                                    id: h.wrap.attr("id")
                                }).on("click.cbp", function(b) {
                                    if (!h.stopEvents) {
                                        var c = a(b.target).attr("data-action");
                                        h[c] && (h[c](), b.preventDefault())
                                    }
                                }), h.navigationMobile.appendTo(c.body).append(h.navigationWrap))), h.finishOpen--, h.finishOpen <= 0 && h.updateSinglePageIsOpen.call(h)
                            }), "ie8" === e.Private.browser || "ie9" === e.Private.browser) {
                            if (h.options.singlePageStickyNavigation) {
                                var k = h.wrap[0].clientWidth;
                                h.navigationWrap.width(k), setTimeout(function() {
                                    h.wrap.addClass("cbp-popup-singlePage-sticky")
                                }, 1e3)
                            }
                            h.finishOpen--
                        }
                        h.wrap.addClass("cbp-popup-loading"), h.wrap.offset(), h.wrap.addClass("cbp-popup-singlePage-open"), h.options.singlePageDeeplinking && (h.url = h.url.split("#cbp=")[0], location.href = h.url + "#cbp=" + h.dataArray[h.current].url), a.isFunction(h.options.singlePageCallback) && h.options.singlePageCallback.call(h, h.dataArray[h.current].url, h.dataArray[h.current].element)
                    }
                },
                openSinglePageInline: function(c, d, e) {
                    var f, g, h, i, j = this;
                    if (e = e || !1, j.fromOpen = e, j.storeBlocks = c, j.storeCurrentBlock = d, j.isOpen) return g = a(d).closest(".cbp-item").index(), void(j.dataArray[j.current].url !== d.getAttribute("href") || j.current !== g ? j.cubeportfolio.singlePageInline.close("open", {
                        blocks: c,
                        currentBlock: d,
                        fromOpen: !0
                    }) : j.close());
                    if (j.isOpen = !0, j.stopEvents = !1, j.dataArray = [], j.current = null, f = d.getAttribute("href"), null === f) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                    if (h = a(d).closest(".cbp-item")[0], c.each(function(a, b) {
                            h === b && (j.current = a)
                        }), j.dataArray[j.current] = {
                            url: f,
                            element: d
                        }, i = a(j.dataArray[j.current].element).parents(".cbp-item").addClass("cbp-singlePageInline-active"), j.counterTotal = c.length, j.wrap.insertBefore(j.cubeportfolio.wrapper), "top" === j.options.singlePageInlinePosition ? (j.startInline = 0, j.top = 0, j.firstRow = !0, j.lastRow = !1) : "bottom" === j.options.singlePageInlinePosition ? (j.startInline = j.counterTotal, j.top = j.cubeportfolio.height, j.firstRow = !1, j.lastRow = !0) : "above" === j.options.singlePageInlinePosition ? (j.startInline = j.cubeportfolio.cols * Math.floor(j.current / j.cubeportfolio.cols), j.top = a(c[j.current]).data("cbp").top, 0 === j.startInline ? j.firstRow = !0 : (j.top -= j.options.gapHorizontal, j.firstRow = !1), j.lastRow = !1) : (j.top = a(c[j.current]).data("cbp").top + a(c[j.current]).data("cbp").height, j.startInline = Math.min(j.cubeportfolio.cols * (Math.floor(j.current / j.cubeportfolio.cols) + 1), j.counterTotal), j.firstRow = !1, j.lastRow = j.startInline === j.counterTotal ? !0 : !1), j.wrap[0].style.height = j.wrap.outerHeight(!0) + "px", j.deferredInline = a.Deferred(), j.options.singlePageInlineInFocus) {
                        j.scrollTop = a(b).scrollTop();
                        var k = j.cubeportfolio.$obj.offset().top + j.top - 100;
                        j.scrollTop !== k ? a("html,body").animate({
                            scrollTop: k
                        }, 350).promise().then(function() {
                            j.resizeSinglePageInline(), j.deferredInline.resolve()
                        }) : (j.resizeSinglePageInline(), j.deferredInline.resolve())
                    } else j.resizeSinglePageInline(), j.deferredInline.resolve();
                    j.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-open"), j.wrap.css({
                        top: j.top
                    }), a.isFunction(j.options.singlePageInlineCallback) && j.options.singlePageInlineCallback.call(j, j.dataArray[j.current].url, j.dataArray[j.current].element)
                },
                resizeSinglePageInline: function() {
                    var a = this;
                    a.height = a.firstRow || a.lastRow ? a.wrap.outerHeight(!0) : a.wrap.outerHeight(!0) - a.options.gapHorizontal, a.storeBlocks.each(function(b, c) {
                        b < a.startInline ? e.Private.modernBrowser ? c.style[e.Private.transform] = "" : c.style.marginTop = "" : e.Private.modernBrowser ? c.style[e.Private.transform] = "translate3d(0px, " + a.height + "px, 0)" : c.style.marginTop = a.height + "px"
                    }), a.cubeportfolio.obj.style.height = a.cubeportfolio.height + a.height + "px"
                },
                revertResizeSinglePageInline: function() {
                    var b = this;
                    b.deferredInline = a.Deferred(), b.storeBlocks.each(function(a, b) {
                        e.Private.modernBrowser ? b.style[e.Private.transform] = "" : b.style.marginTop = ""
                    }), b.cubeportfolio.obj.style.height = b.cubeportfolio.height + "px"
                },
                appendScriptsToWrap: function(a) {
                    var b = this,
                        d = 0,
                        e = function(f) {
                            var g = c.createElement("script"),
                                h = f.src;
                            g.type = "text/javascript", g.readyState ? g.onreadystatechange = function() {
                                ("loaded" == g.readyState || "complete" == g.readyState) && (g.onreadystatechange = null, d++, a[d] && e(a[d]))
                            } : g.onload = function() {
                                d++, a[d] && e(a[d])
                            }, h ? g.src = h : g.text = f.text, b.content[0].appendChild(g)
                        };
                    e(a[0])
                },
                updateSinglePage: function(b, c, d) {
                    var e, f = this;
                    f.content.addClass("cbp-popup-content").removeClass("cbp-popup-content-basic"), d === !1 && f.content.removeClass("cbp-popup-content").addClass("cbp-popup-content-basic"), f.counter && (e = a(f.getCounterMarkup(f.options.singlePageCounter, f.current + 1, f.counterTotal)), f.counter.text(e.text())), f.content.html(b), c && f.appendScriptsToWrap(c), f.cubeportfolio.$obj.trigger("updateSinglePageStart.cbp"), f.finishOpen--, f.finishOpen <= 0 && f.updateSinglePageIsOpen.call(f)
                },
                updateSinglePageIsOpen: function() {
                    var b, c = this;
                    c.wrap.addClass("cbp-popup-ready"), c.wrap.removeClass("cbp-popup-loading"), b = c.content.find(".cbp-slider"), b ? (b.find(".cbp-slider-item").addClass("cbp-item"), c.slider = b.cubeportfolio({
                        layoutMode: "slider",
                        mediaQueries: [{
                            width: 1,
                            cols: 1
                        }],
                        gapHorizontal: 0,
                        gapVertical: 0,
                        caption: "",
                        coverRatio: ""
                    })) : c.slider = null, ("android" === e.Private.browser || "ios" === e.Private.browser) && a("html").css({
                        position: "fixed"
                    }), c.cubeportfolio.$obj.trigger("updateSinglePageComplete.cbp")
                },
                updateSinglePageInline: function(a, b) {
                    var c = this;
                    c.content.html(a), b && c.appendScriptsToWrap(b), c.cubeportfolio.$obj.trigger("updateSinglePageInlineStart.cbp"), c.singlePageInlineIsOpen.call(c)
                },
                singlePageInlineIsOpen: function() {
                    function a() {
                        b.wrap.addClass("cbp-popup-singlePageInline-ready"), b.wrap[0].style.height = "", b.resizeSinglePageInline(), b.cubeportfolio.$obj.trigger("updateSinglePageInlineComplete.cbp")
                    }
                    var b = this;
                    b.cubeportfolio.loadImages(b.wrap, function() {
                        var c = b.content.find(".cbp-slider");
                        c.length ? (c.find(".cbp-slider-item").addClass("cbp-item"), c.one("initComplete.cbp", function() {
                            b.deferredInline.done(a)
                        }), c.on("pluginResize.cbp", function() {
                            b.deferredInline.done(a)
                        }), b.slider = c.cubeportfolio({
                            layoutMode: "slider",
                            displayType: "default",
                            mediaQueries: [{
                                width: 1,
                                cols: 1
                            }],
                            gapHorizontal: 0,
                            gapVertical: 0,
                            caption: "",
                            coverRatio: ""
                        })) : (b.slider = null, b.deferredInline.done(a))
                    })
                },
                isImage: function(b) {
                    {
                        var c = this;
                        new Image
                    }
                    c.tooggleLoading(!0), c.cubeportfolio.loadImages(a('<div><img src="' + b.src + '"></div>'), function() {
                        c.updateImagesMarkup(b.src, b.title, c.getCounterMarkup(c.options.lightboxCounter, c.current + 1, c.counterTotal)), c.tooggleLoading(!1)
                    })
                },
                isVimeo: function(a) {
                    var b = this;
                    b.updateVideoMarkup(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                isYoutube: function(a) {
                    var b = this;
                    b.updateVideoMarkup(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                isTed: function(a) {
                    var b = this;
                    b.updateVideoMarkup(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                isSoundCloud: function(a) {
                    var b = this;
                    b.updateVideoMarkup(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                isSelfHostedVideo: function(a) {
                    var b = this;
                    b.updateSelfHostedVideo(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                isSelfHostedAudio: function(a) {
                    var b = this;
                    b.updateSelfHostedAudio(a.src, a.title, b.getCounterMarkup(b.options.lightboxCounter, b.current + 1, b.counterTotal))
                },
                getCounterMarkup: function(a, b, c) {
                    if (!a.length) return "";
                    var d = {
                        current: b,
                        total: c
                    };
                    return a.replace(/\{\{current}}|\{\{total}}/gi, function(a) {
                        return d[a.slice(2, -2)]
                    })
                },
                updateSelfHostedVideo: function(a, b, c) {
                    var d, e = this;
                    e.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var f = '<div class="cbp-popup-lightbox-iframe"><video controls="controls" height="auto" style="width: 100%">';
                    for (d = 0; d < a.length; d++) /(\.mp4)/i.test(a[d]) ? f += '<source src="' + a[d] + '" type="video/mp4">' : /(\.ogg)|(\.ogv)/i.test(a[d]) ? f += '<source src="' + a[d] + '" type="video/ogg">' : /(\.webm)/i.test(a[d]) && (f += '<source src="' + a[d] + '" type="video/webm">');
                    f += 'Your browser does not support the video tag.</video><div class="cbp-popup-lightbox-bottom">' + (b ? '<div class="cbp-popup-lightbox-title">' + b + "</div>" : "") + c + "</div></div>", e.content.html(f), e.wrap.addClass("cbp-popup-ready"), e.preloadNearbyImages()
                },
                updateSelfHostedAudio: function(a, b, c) {
                    var d = this;
                    d.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var e = '<div class="cbp-popup-lightbox-iframe"><audio controls="controls" height="auto" style="width: 100%"><source src="' + a + '" type="audio/mpeg">Your browser does not support the audio tag.</audio><div class="cbp-popup-lightbox-bottom">' + (b ? '<div class="cbp-popup-lightbox-title">' + b + "</div>" : "") + c + "</div></div>";
                    d.content.html(e), d.wrap.addClass("cbp-popup-ready"), d.preloadNearbyImages()
                },
                updateVideoMarkup: function(a, b, c) {
                    var d = this;
                    d.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var e = '<div class="cbp-popup-lightbox-iframe"><iframe src="' + a + '" frameborder="0" allowfullscreen scrolling="no"></iframe><div class="cbp-popup-lightbox-bottom">' + (b ? '<div class="cbp-popup-lightbox-title">' + b + "</div>" : "") + c + "</div></div>";
                    d.content.html(e), d.wrap.addClass("cbp-popup-ready"), d.preloadNearbyImages()
                },
                updateImagesMarkup: function(a, b, c) {
                    var d = this;
                    d.wrap.removeClass("cbp-popup-lightbox-isIframe");
                    var e = '<div class="cbp-popup-lightbox-figure"><img src="' + a + '" class="cbp-popup-lightbox-img" ' + d.dataActionImg + ' /><div class="cbp-popup-lightbox-bottom">' + (b ? '<div class="cbp-popup-lightbox-title">' + b + "</div>" : "") + c + "</div></div>";
                    d.content.html(e), d.wrap.addClass("cbp-popup-ready"), d.resizeImage(), d.preloadNearbyImages()
                },
                next: function() {
                    var a = this;
                    a[a.type + "JumpTo"](1)
                },
                prev: function() {
                    var a = this;
                    a[a.type + "JumpTo"](-1)
                },
                lightboxJumpTo: function(a) {
                    var b, c = this;
                    c.current = c.getIndex(c.current + a), b = c.dataArray[c.current], c[b.type](b)
                },
                singlePageJumpTo: function(b) {
                    var c = this;
                    c.current = c.getIndex(c.current + b), a.isFunction(c.options.singlePageCallback) && (c.resetWrap(), c.wrap.scrollTop(0), c.wrap.addClass("cbp-popup-loading"), c.options.singlePageCallback.call(c, c.dataArray[c.current].url, c.dataArray[c.current].element), c.options.singlePageDeeplinking && (location.href = c.url + "#cbp=" + c.dataArray[c.current].url))
                },
                resetWrap: function() {
                    var a = this;
                    "singlePage" === a.type && a.options.singlePageDeeplinking && (location.href = a.url + "#")
                },
                getIndex: function(a) {
                    var b = this;
                    return a %= b.counterTotal, 0 > a && (a = b.counterTotal + a), a
                },
                close: function(c, d) {
                    function f() {
                        h.content.html(""), h.wrap.detach(), h.cubeportfolio.$obj.removeClass("cbp-popup-singlePageInline-open cbp-popup-singlePageInline-close"), "promise" === c && a.isFunction(d.callback) && d.callback.call(h.cubeportfolio)
                    }

                    function g() {
                        h.options.singlePageInlineInFocus && "promise" !== c ? a("html,body").animate({
                            scrollTop: h.scrollTop
                        }, 350).promise().then(function() {
                            f()
                        }) : f()
                    }
                    var h = this;
                    h.isOpen = !1, "singlePageInline" === h.type ? "open" === c ? (h.wrap.removeClass("cbp-popup-singlePageInline-ready"), a(h.dataArray[h.current].element).closest(".cbp-item").removeClass("cbp-singlePageInline-active"), h.openSinglePageInline(d.blocks, d.currentBlock, d.fromOpen)) : (h.height = 0,
                        h.revertResizeSinglePageInline(), h.wrap.removeClass("cbp-popup-singlePageInline-ready"), h.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-close"), h.startInline = -1, h.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), e.Private.modernBrowser ? h.wrap.one(e.Private.transitionend, function() {
                            g()
                        }) : g()) : "singlePage" === h.type ? (h.resetWrap(), h.wrap.removeClass("cbp-popup-ready"), ("android" === e.Private.browser || "ios" === e.Private.browser) && (a("html").css({
                        position: ""
                    }), h.navigationWrap.appendTo(h.wrap), h.navigationMobile.remove()), a(b).scrollTop(h.scrollTop), setTimeout(function() {
                        h.stopScroll = !0, h.navigationWrap.css({
                            top: h.wrap.scrollTop()
                        }), h.wrap.removeClass("cbp-popup-singlePage-open cbp-popup-singlePage-sticky"), ("ie8" === e.Private.browser || "ie9" === e.Private.browser) && (h.content.html(""), h.wrap.detach(), a("html").css({
                            overflow: "",
                            paddingRight: "",
                            position: ""
                        }), h.navigationWrap.removeAttr("style"))
                    }, 0), h.wrap.one(e.Private.transitionend, function() {
                        h.content.html(""), h.wrap.detach(), a("html").css({
                            overflow: "",
                            paddingRight: "",
                            position: ""
                        }), h.navigationWrap.removeAttr("style")
                    })) : (h.originalStyle ? a("html").attr("style", h.originalStyle) : a("html").css({
                        overflow: "",
                        paddingRight: ""
                    }), a(b).scrollTop(h.scrollTop), h.content.html(""), h.wrap.detach())
                },
                tooggleLoading: function(a) {
                    var b = this;
                    b.stopEvents = a, b.wrap[a ? "addClass" : "removeClass"]("cbp-popup-loading")
                },
                resizeImage: function() {
                    if (this.isOpen) {
                        var c = a(b).height(),
                            d = this.content.find("img"),
                            e = parseInt(d.css("margin-top"), 10) + parseInt(d.css("margin-bottom"), 10);
                        d.css("max-height", c - e + "px")
                    }
                },
                preloadNearbyImages: function() {
                    var a = [],
                        b = this;
                    a.push(b.getIndex(b.current + 1)), a.push(b.getIndex(b.current + 2)), a.push(b.getIndex(b.current + 3)), a.push(b.getIndex(b.current - 1)), a.push(b.getIndex(b.current - 2)), a.push(b.getIndex(b.current - 3));
                    for (var c = a.length - 1; c >= 0; c--) "isImage" === b.dataArray[a[c]].type && b.cubeportfolio.checkSrc(b.dataArray[a[c]].src)
                }
            },
            g = !1,
            h = !1;
        d.prototype.run = function() {
            var b = this,
                d = b.parent,
                e = a(c.body);
            d.lightbox = null, d.options.lightboxDelegate && !g && (g = !0, d.lightbox = Object.create(f), d.lightbox.init(d, "lightbox"), e.on("click.cbp", d.options.lightboxDelegate, function(c) {
                c.preventDefault();
                var e = a(this),
                    f = e.attr("data-cbp-lightbox"),
                    g = b.detectScope(e),
                    h = g.data("cubeportfolio"),
                    i = [];
                h ? h.blocksOn.each(function(b, c) {
                    var e = a(c);
                    e.not(".cbp-item-off") && e.find(d.options.lightboxDelegate).each(function(b, c) {
                        f ? a(c).attr("data-cbp-lightbox") === f && i.push(c) : i.push(c)
                    })
                }) : i = g.find(f ? d.options.lightboxDelegate + "[data-cbp-lightbox=" + f + "]" : d.options.lightboxDelegate), d.lightbox.openLightbox(i, e[0])
            })), d.singlePage = null, d.options.singlePageDelegate && !h && (h = !0, d.singlePage = Object.create(f), d.singlePage.init(d, "singlePage"), e.on("click.cbp", d.options.singlePageDelegate, function(c) {
                c.preventDefault();
                var e = a(this),
                    f = e.attr("data-cbp-singlePage"),
                    g = b.detectScope(e),
                    h = g.data("cubeportfolio"),
                    i = [];
                h ? h.blocksOn.each(function(b, c) {
                    var e = a(c);
                    e.not(".cbp-item-off") && e.find(d.options.singlePageDelegate).each(function(b, c) {
                        f ? a(c).attr("data-cbp-singlePage") === f && i.push(c) : i.push(c)
                    })
                }) : i = g.find(f ? d.options.singlePageDelegate + "[data-cbp-singlePage=" + f + "]" : d.options.singlePageDelegate), d.singlePage.openSinglePage(i, e[0])
            })), d.singlePageInline = null, d.options.singlePageDelegate && (d.singlePageInline = Object.create(f), d.singlePageInline.init(d, "singlePageInline"), d.$obj.on("click.cbp", d.options.singlePageInlineDelegate, function(a) {
                a.preventDefault(), d.singlePageInline.openSinglePageInline(d.blocksOn, this)
            }))
        }, d.prototype.detectScope = function(b) {
            var d, e, f;
            return d = b.closest(".cbp-popup-singlePageInline"), d.length ? (f = b.closest(".cbp", d[0]), f.length ? f : d) : (e = b.closest(".cbp-popup-singlePage"), e.length ? (f = b.closest(".cbp", e[0]), f.length ? f : e) : (f = b.closest(".cbp"), f.length ? f : a(c.body)))
        }, d.prototype.destroy = function() {
            var b = this.parent;
            a(c.body).off("click.cbp"), g = !1, h = !1, b.lightbox && b.lightbox.destroy(), b.singlePage && b.singlePage.destroy(), b.singlePageInline && b.singlePageInline.destroy()
        }, e.Plugins.PopUp = function(a) {
            return new d(a)
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = a.fn.cubeportfolio.Constructor;
        e.Private = {
            resizeEventArray: [],
            initResizeEvent: function(a) {
                var b = e.Private;
                0 === b.resizeEventArray.length && b.resizeEvent(), b.resizeEventArray.push(a)
            },
            destroyResizeEvent: function(c) {
                var d = e.Private,
                    f = a.map(d.resizeEventArray, function(a) {
                        return a.instance !== c ? a : void 0
                    });
                d.resizeEventArray = f, 0 === d.resizeEventArray.length && a(b).off("resize.cbp")
            },
            resizeEvent: function() {
                var c, d = e.Private;
                a(b).on("resize.cbp", function() {
                    clearTimeout(c), c = setTimeout(function() {
                        b.innerHeight != screen.height && a.each(d.resizeEventArray, function(a, b) {
                            b.fn.call(b.instance)
                        })
                    }, 50)
                })
            },
            checkInstance: function(b) {
                var c = a.data(this, "cubeportfolio");
                if (!c) throw new Error("cubeportfolio is not initialized. Initialize it before calling " + b + " method!");
                return c.triggerEvent("publicMethod"), c
            },
            browserInfo: function() {
                var a, c, f, g = e.Private,
                    h = navigator.appVersion;
                g.browser = -1 !== h.indexOf("MSIE 8.") ? "ie8" : -1 !== h.indexOf("MSIE 9.") ? "ie9" : -1 !== h.indexOf("MSIE 10.") ? "ie10" : b.ActiveXObject || "ActiveXObject" in b ? "ie11" : /android/gi.test(h) ? "android" : /iphone|ipad|ipod/gi.test(h) ? "ios" : /chrome/gi.test(h) ? "chrome" : "", f = g.styleSupport("perspective"), typeof f !== d && (a = g.styleSupport("transition"), g.transitionend = {
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionend"
                }[a], c = g.styleSupport("animation"), g.animationend = {
                    WebkitAnimation: "webkitAnimationEnd",
                    animation: "animationend"
                }[c], g.animationDuration = {
                    WebkitAnimation: "webkitAnimationDuration",
                    animation: "animationDuration"
                }[c], g.animationDelay = {
                    WebkitAnimation: "webkitAnimationDelay",
                    animation: "animationDelay"
                }[c], g.transform = g.styleSupport("transform"), a && c && g.transform && (g.modernBrowser = !0))
            },
            styleSupport: function(a) {
                var b, d = "Webkit" + a.charAt(0).toUpperCase() + a.slice(1),
                    e = c.createElement("div");
                return a in e.style ? b = a : d in e.style && (b = d), e = null, b
            }
        }, e.Private.browserInfo()
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = a.fn.cubeportfolio.Constructor;
        e.Public = {
            init: function(a, b) {
                new e(this, a, b)
            },
            destroy: function(b) {
                var c = e.Private.checkInstance.call(this, "destroy");
                c.triggerEvent("beforeDestroy"), a.removeData(this, "cubeportfolio"), c.blocks.removeData("cbp"), c.$obj.removeClass("cbp-ready").removeAttr("style"), c.$ul.removeClass("cbp-wrapper"), e.Private.destroyResizeEvent(c), c.$obj.off(".cbp"), c.blocks.removeClass("cbp-item-off").removeAttr("style"), c.blocks.find(".cbp-item-wrapper").children().unwrap(), c.options.caption && c.$obj.removeClass("cbp-caption-active cbp-caption-" + c.options.caption), c.destroySlider(), c.$ul.unwrap(), c.addedWrapp && c.blocks.unwrap(), a.each(c.plugins, function(a, b) {
                    "function" == typeof b.destroy && b.destroy()
                }), a.isFunction(b) && b.call(c), c.triggerEvent("afterDestroy")
            },
            filter: function(b, c) {
                var f, g = e.Private.checkInstance.call(this, "filter");
                if (!g.isAnimating) {
                    if (g.isAnimating = !0, a.isFunction(c) && g.registerEvent("filterFinish", c, !0), a.isFunction(b)) {
                        if (f = b.call(g, g.blocks), f === d) throw new Error("When you call cubeportfolio API `filter` method with a param of type function you must return the blocks that will be visible.")
                    } else {
                        if (g.options.filterDeeplinking) {
                            var h = location.href.replace(/#cbpf=(.*?)([#\?&]|$)/gi, "");
                            location.href = h + "#cbpf=" + encodeURIComponent(b), g.singlePage && g.singlePage.url && (g.singlePage.url = location.href)
                        }
                        g.defaultFilter = b, f = g.filterConcat(g.defaultFilter)
                    }
                    g.singlePageInline && g.singlePageInline.isOpen ? g.singlePageInline.close("promise", {
                        callback: function() {
                            g.computeFilter(f)
                        }
                    }) : g.computeFilter(f)
                }
            },
            showCounter: function(b, c) {
                var d = e.Private.checkInstance.call(this, "showCounter");
                d.elems = b, a.each(b, function() {
                    var b, c = a(this),
                        e = c.data("filter");
                    b = d.blocks.filter(e).length, c.find(".cbp-filter-counter").text(b)
                }), a.isFunction(c) && c.call(d)
            },
            appendItems: function(b, c) {
                var d = e.Private.checkInstance.call(this, "appendItems"),
                    f = a(b).filter(".cbp-item");
                return d.isAnimating || f.length < 1 ? void(a.isFunction(c) && c.call(d)) : (d.isAnimating = !0, void(d.singlePageInline && d.singlePageInline.isOpen ? d.singlePageInline.close("promise", {
                    callback: function() {
                        d.addItems(f, c)
                    }
                }) : d.addItems(f, c)))
            }
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var c = this;
            c.parent = b, c.searchInput = a(b.options.search), c.searchInput.each(function(b, c) {
                var d = c.getAttribute("data-search");
                d || (d = "*"), a.data(c, "searchData", {
                    value: c.value,
                    el: d
                })
            });
            var d = null;
            c.searchInput.on("keyup.cbp paste.cbp", function(b) {
                b.preventDefault();
                var e = a(this);
                clearTimeout(d), d = setTimeout(function() {
                    c.runEvent.call(c, e)
                }, 300)
            }), c.searchNothing = c.searchInput.siblings(".cbp-search-nothing").detach(), c.searchNothingHeight = null, c.searchNothingHTML = c.searchNothing.html(), c.searchInput.siblings(".cbp-search-icon").on("click.cbp", function(b) {
                b.preventDefault(), c.runEvent.call(c, a(this).prev().val(""))
            })
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.runEvent = function(b) {
            var c = this,
                d = b.val(),
                e = b.data("searchData"),
                f = new RegExp(d, "i");
            e.value === d || c.parent.isAnimating || (e.value = d, d.length > 0 ? b.attr("value", d) : b.removeAttr("value"), c.parent.$obj.cubeportfolio("filter", function(b) {
                var g = b.filter(function(b, c) {
                    var d = a(c).find(e.el).text();
                    return d.search(f) > -1 ? !0 : void 0
                });
                if (0 === g.length && c.searchNothing.length) {
                    var h = c.searchNothingHTML.replace("{{query}}", d);
                    c.searchNothing.html(h), c.searchNothing.appendTo(c.parent.$obj), null === c.searchNothingHeight && (c.searchNothingHeight = c.searchNothing.outerHeight(!0)), c.parent.registerEvent("resizeMainContainer", function() {
                        c.parent.height = c.parent.height + c.searchNothingHeight, c.parent.obj.style.height = c.parent.height + "px"
                    }, !0)
                } else c.searchNothing.detach();
                return g
            }, function() {
                b.trigger("keyup.cbp")
            }))
        }, b.prototype.destroy = function() {
            var b = this;
            b.searchInput.off(".cbp"), b.searchInput.next(".cbp-search-icon").off(".cbp"), b.searchInput.each(function(b, c) {
                a.removeData(c)
            })
        }, c.Plugins.Search = function(a) {
            return "" === a.options.search ? null : new b(a)
        }
    }(jQuery, window, document), "function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a, new b
    }),
    function() {
        for (var a = 0, b = ["moz", "webkit"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = (new Date).getTime(),
                d = Math.max(0, 16 - (c - a)),
                e = window.setTimeout(function() {
                    b(c + d)
                }, d);
            return a = c + d, e
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    }(),
    function(a) {
        "use strict";

        function b(a) {
            var b = this;
            b.parent = a, a.filterLayout = b.filterLayout, a.registerEvent("computeBlocksFinish", function(b) {
                a.blocksOn2On = a.blocksOnInitial.filter(b), a.blocksOn2Off = a.blocksOnInitial.not(b)
            })
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.filterLayout = function() {
            function b() {
                d.blocks.removeClass("cbp-item-on2off cbp-item-off2on cbp-item-on2on").each(function(b, d) {
                    var e = a(d).data("cbp");
                    e.left = e.leftNew, e.top = e.topNew, d.style.left = e.left + "px", d.style.top = e.top + "px", d.style[c.Private.transform] = ""
                }), d.blocksOff.addClass("cbp-item-off"), d.$obj.removeClass("cbp-animation-" + d.options.animationType), d.filterFinish()
            }
            var d = this;
            d.$obj.addClass("cbp-animation-" + d.options.animationType), d.blocksOn2On.addClass("cbp-item-on2on").each(function(b, d) {
                var e = a(d).data("cbp");
                d.style[c.Private.transform] = "translate3d(" + (e.leftNew - e.left) + "px, " + (e.topNew - e.top) + "px, 0)"
            }), d.blocksOn2Off.addClass("cbp-item-on2off"), d.blocksOff2On = d.blocksOn.filter(".cbp-item-off").removeClass("cbp-item-off").addClass("cbp-item-off2on").each(function(b, c) {
                var d = a(c).data("cbp");
                c.style.left = d.leftNew + "px", c.style.top = d.topNew + "px"
            }), d.blocksOn2Off.length ? d.blocksOn2Off.last().data("cbp").wrapper.one(c.Private.animationend, b) : d.blocksOff2On.length ? d.blocksOff2On.last().data("cbp").wrapper.one(c.Private.animationend, b) : b(), d.resizeMainContainer()
        }, b.prototype.destroy = function() {
            var a = this.parent;
            a.$obj.removeClass("cbp-animation-" + a.options.animationType)
        }, c.Plugins.AnimationClassic = function(d) {
            return !c.Private.modernBrowser || a.inArray(d.options.animationType, ["boxShadow", "fadeOut", "flipBottom", "flipOut", "quicksand", "scaleSides", "skew"]) < 0 ? null : new b(d)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(a) {
            var b = this;
            b.parent = a, a.filterLayout = b.filterLayout
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.filterLayout = function() {
            function b() {
                d.wrapper[0].removeChild(e), "sequentially" === d.options.animationType && d.blocksOn.each(function(b, d) {
                    a(d).data("cbp").wrapper[0].style[c.Private.animationDelay] = ""
                }), d.$obj.removeClass("cbp-animation-" + d.options.animationType), d.filterFinish()
            }
            var d = this,
                e = d.$ul[0].cloneNode(!0);
            e.setAttribute("class", "cbp-wrapper-helper"), d.wrapper[0].insertBefore(e, d.$ul[0]), requestAnimationFrame(function() {
                d.$obj.addClass("cbp-animation-" + d.options.animationType), d.blocksOff.addClass("cbp-item-off"), d.blocksOn.removeClass("cbp-item-off").each(function(b, e) {
                    var f = a(e).data("cbp");
                    f.left = f.leftNew, f.top = f.topNew, e.style.left = f.left + "px", e.style.top = f.top + "px", "sequentially" === d.options.animationType && (f.wrapper[0].style[c.Private.animationDelay] = 60 * b + "ms")
                }), d.blocksOn.length ? d.blocksOn.last().data("cbp").wrapper.one(c.Private.animationend, b) : d.blocksOnInitial.length ? d.blocksOnInitial.last().data("cbp").wrapper.one(c.Private.animationend, b) : b(), d.resizeMainContainer()
            })
        }, b.prototype.destroy = function() {
            var a = this.parent;
            a.$obj.removeClass("cbp-animation-" + a.options.animationType)
        }, c.Plugins.AnimationClone = function(d) {
            return !c.Private.modernBrowser || a.inArray(d.options.animationType, ["fadeOutTop", "slideLeft", "sequentially"]) < 0 ? null : new b(d)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(a) {
            var b = this;
            b.parent = a, a.filterLayout = b.filterLayout
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.filterLayout = function() {
            function b() {
                d.wrapper[0].removeChild(e[0]), d.$obj.removeClass("cbp-animation-" + d.options.animationType), d.blocks.each(function(b, d) {
                    a(d).data("cbp").wrapper[0].style[c.Private.animationDelay] = ""
                }), d.filterFinish()
            }
            var d = this,
                e = d.$ul.clone(!0, !0);
            e[0].setAttribute("class", "cbp-wrapper-helper"), d.wrapper[0].insertBefore(e[0], d.$ul[0]);
            var f = e.find(".cbp-item").not(".cbp-item-off");
            d.sortBlocks(f, "top"), f.children(".cbp-item-wrapper").each(function(a, b) {
                b.style[c.Private.animationDelay] = 50 * a + "ms"
            }), requestAnimationFrame(function() {
                d.$obj.addClass("cbp-animation-" + d.options.animationType), d.blocksOff.addClass("cbp-item-off"), d.blocksOn.removeClass("cbp-item-off").each(function(b, d) {
                    var e = a(d).data("cbp");
                    e.left = e.leftNew, e.top = e.topNew, d.style.left = e.left + "px", d.style.top = e.top + "px", e.wrapper[0].style[c.Private.animationDelay] = 50 * b + "ms"
                });
                var e = d.blocksOn.length,
                    g = f.length;
                0 === e && 0 === g ? b() : g > e ? f.last().children(".cbp-item-wrapper").one(c.Private.animationend, b) : d.blocksOn.last().data("cbp").wrapper.one(c.Private.animationend, b), d.resizeMainContainer()
            })
        }, b.prototype.destroy = function() {
            var a = this.parent;
            a.$obj.removeClass("cbp-animation-" + a.options.animationType)
        }, c.Plugins.AnimationCloneDelay = function(d) {
            return !c.Private.modernBrowser || a.inArray(d.options.animationType, ["3dflip", "flipOutDelay", "foldLeft", "frontRow", "rotateRoom", "rotateSides", "scaleDown", "slideDelay", "unfold"]) < 0 ? null : new b(d)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(a) {
            var b = this;
            b.parent = a, a.filterLayout = b.filterLayout
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.filterLayout = function() {
            function b() {
                d.wrapper[0].removeChild(e), d.$obj.removeClass("cbp-animation-" + d.options.animationType), d.filterFinish()
            }
            var d = this,
                e = d.$ul[0].cloneNode(!0);
            e.setAttribute("class", "cbp-wrapper-helper"), d.wrapper[0].insertBefore(e, d.$ul[0]), requestAnimationFrame(function() {
                d.$obj.addClass("cbp-animation-" + d.options.animationType), d.blocksOff.addClass("cbp-item-off"), d.blocksOn.removeClass("cbp-item-off").each(function(b, c) {
                    var d = a(c).data("cbp");
                    d.left = d.leftNew, d.top = d.topNew, c.style.left = d.left + "px", c.style.top = d.top + "px"
                }), d.blocksOn.length ? d.$ul.one(c.Private.animationend, b) : d.blocksOnInitial.length ? a(e).one(c.Private.animationend, b) : b(), d.resizeMainContainer()
            })
        }, b.prototype.destroy = function() {
            var a = this.parent;
            a.$obj.removeClass("cbp-animation-" + a.options.animationType)
        }, c.Plugins.AnimationWrapper = function(d) {
            return !c.Private.modernBrowser || a.inArray(d.options.animationType, ["bounceBottom", "bounceLeft", "bounceTop", "moveLeft"]) < 0 ? null : new b(d)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var c = this;
            c.parent = b, b.registerEvent("initFinish", function() {
                b.$obj.on("click.cbp", ".cbp-caption-defaultWrap", function(c) {
                    if (c.preventDefault(), !b.isAnimating) {
                        b.isAnimating = !0;
                        var d = a(this),
                            e = d.next(),
                            f = d.parent(),
                            g = {
                                position: "relative",
                                height: e.outerHeight(!0)
                            },
                            h = {
                                position: "relative",
                                height: 0
                            };
                        if (b.$obj.addClass("cbp-caption-expand-active"), f.hasClass("cbp-caption-expand-open")) {
                            var i = h;
                            h = g, g = i, f.removeClass("cbp-caption-expand-open")
                        }
                        e.css(g), b.$obj.one("pluginResize.cbp", function() {
                            b.isAnimating = !1, b.$obj.removeClass("cbp-caption-expand-active"), 0 === g.height && (f.removeClass("cbp-caption-expand-open"), e.attr("style", ""))
                        }), b.layoutAndAdjustment(), e.css(h), requestAnimationFrame(function() {
                            f.addClass("cbp-caption-expand-open"), e.css(g), "slider" === b.options.layoutMode && b.updateSlider(), b.triggerEvent("resizeGrid")
                        })
                    }
                })
            }, !0)
        }
        var c = a.fn.cubeportfolio.Constructor;
        b.prototype.destroy = function() {
            this.parent.$obj.find(".cbp-caption-defaultWrap").off("click.cbp").parent().removeClass("cbp-caption-expand-active")
        }, c.Plugins.CaptionExpand = function(a) {
            return "expand" !== a.options.caption ? null : new b(a)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var d = a.Deferred();
            b.pushQueue("delayFrame", d), b.registerEvent("initEndWrite", function() {
                b.blocksOn.each(function(a, d) {
                    d.style[c.Private.animationDelay] = a * b.options.displayTypeSpeed + "ms"
                }), b.$obj.addClass("cbp-displayType-bottomToTop"), b.blocksOn.last().one(c.Private.animationend, function() {
                    b.$obj.removeClass("cbp-displayType-bottomToTop"), b.blocksOn.each(function(a, b) {
                        b.style[c.Private.animationDelay] = ""
                    }), d.resolve()
                })
            }, !0)
        }
        var c = a.fn.cubeportfolio.Constructor;
        c.Plugins.BottomToTop = function(a) {
            return c.Private.modernBrowser && "bottomToTop" === a.options.displayType && 0 !== a.blocksOn.length ? new b(a) : null
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var d = a.Deferred();
            b.pushQueue("delayFrame", d), b.registerEvent("initEndWrite", function() {
                b.obj.style[c.Private.animationDuration] = b.options.displayTypeSpeed + "ms", b.$obj.addClass("cbp-displayType-fadeInToTop"), b.$obj.one(c.Private.animationend, function() {
                    b.$obj.removeClass("cbp-displayType-fadeInToTop"), b.obj.style[c.Private.animationDuration] = "", d.resolve()
                })
            }, !0)
        }
        var c = a.fn.cubeportfolio.Constructor;
        c.Plugins.FadeInToTop = function(a) {
            return c.Private.modernBrowser && "fadeInToTop" === a.options.displayType && 0 !== a.blocksOn.length ? new b(a) : null
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var d = a.Deferred();
            b.pushQueue("delayFrame", d), b.registerEvent("initEndWrite", function() {
                b.obj.style[c.Private.animationDuration] = b.options.displayTypeSpeed + "ms", b.$obj.addClass("cbp-displayType-lazyLoading"), b.$obj.one(c.Private.animationend, function() {
                    b.$obj.removeClass("cbp-displayType-lazyLoading"), b.obj.style[c.Private.animationDuration] = "", d.resolve()
                })
            }, !0)
        }
        var c = a.fn.cubeportfolio.Constructor;
        c.Plugins.LazyLoading = function(a) {
            return !c.Private.modernBrowser || "lazyLoading" !== a.options.displayType && "fadeIn" !== a.options.displayType || 0 === a.blocksOn.length ? null : new b(a)
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";

        function b(b) {
            var d = a.Deferred();
            b.pushQueue("delayFrame", d), b.registerEvent("initEndWrite", function() {
                b.blocksOn.each(function(a, d) {
                    d.style[c.Private.animationDelay] = a * b.options.displayTypeSpeed + "ms"
                }), b.$obj.addClass("cbp-displayType-sequentially"), b.blocksOn.last().one(c.Private.animationend, function() {
                    b.$obj.removeClass("cbp-displayType-sequentially"), b.blocksOn.each(function(a, b) {
                        b.style[c.Private.animationDelay] = ""
                    }), d.resolve()
                })
            }, !0)
        }
        var c = a.fn.cubeportfolio.Constructor;
        c.Plugins.DisplaySequentially = function(a) {
            return c.Private.modernBrowser && "sequentially" === a.options.displayType && 0 !== a.blocksOn.length ? new b(a) : null
        }
    }(jQuery, window, document),
    function(a) {
        "use strict";
        var b = a.fn.cubeportfolio.Constructor;
        a.extend(b.prototype, {
            mosaicLayoutReset: function() {
                var b = this;
                b.blocksAreSorted = !1, b.blocksOn.each(function(b, c) {
                    a(c).data("cbp").pack = !1
                })
            },
            mosaicLayout: function() {
                var a, b = this,
                    c = b.blocksOn.length,
                    d = {};
                for (b.freeSpaces = [{
                        leftStart: 0,
                        leftEnd: b.widthAvailable,
                        topStart: 0,
                        topEnd: Math.pow(2, 18)
                    }], a = 0; c > a; a++) {
                    if (d = b.getSpaceIndexAndBlock(), null === d) return b.sortBlocksToPreventGaps(), void b.mosaicLayout();
                    b.generateF1F2(d.spaceIndex, d.dataBlock), b.generateG1G2G3G4(d.dataBlock), b.cleanFreeSpaces(), b.addHeightToBlocks()
                }
                b.blocksAreSorted && b.sortBlocks(b.blocksOn, "topNew")
            },
            getSpaceIndexAndBlock: function() {
                var b = this,
                    c = null;
                return a.each(b.freeSpaces, function(d, e) {
                    var f = e.leftEnd - e.leftStart,
                        g = e.topEnd - e.topStart;
                    return b.blocksOn.each(function(b, h) {
                        var i = a(h).data("cbp");
                        if (i.pack !== !0) return i.widthAndGap <= f && i.heightAndGap <= g ? (i.pack = !0, c = {
                            spaceIndex: d,
                            dataBlock: i
                        }, i.leftNew = e.leftStart, i.topNew = e.topStart, !1) : void 0
                    }), !b.blocksAreSorted && b.options.sortToPreventGaps && d > 0 ? (c = null, !1) : null !== c ? !1 : void 0
                }), c
            },
            generateF1F2: function(a, b) {
                var c = this,
                    d = c.freeSpaces[a],
                    e = {
                        leftStart: d.leftStart + b.widthAndGap,
                        leftEnd: d.leftEnd,
                        topStart: d.topStart,
                        topEnd: d.topEnd
                    },
                    f = {
                        leftStart: d.leftStart,
                        leftEnd: d.leftEnd,
                        topStart: d.topStart + b.heightAndGap,
                        topEnd: d.topEnd
                    };
                c.freeSpaces.splice(a, 1), e.leftEnd > e.leftStart && e.topEnd > e.topStart && (c.freeSpaces.splice(a, 0, e), a++), f.leftEnd > f.leftStart && f.topEnd > f.topStart && c.freeSpaces.splice(a, 0, f)
            },
            generateG1G2G3G4: function(b) {
                var c = this,
                    d = [];
                a.each(c.freeSpaces, function(a, e) {
                    var f = c.intersectSpaces(e, b);
                    return null === f ? void d.push(e) : (c.generateG1(e, f, d), c.generateG2(e, f, d), c.generateG3(e, f, d), void c.generateG4(e, f, d))
                }), c.freeSpaces = d
            },
            intersectSpaces: function(a, b) {
                var c = {
                    leftStart: b.leftNew,
                    leftEnd: b.leftNew + b.widthAndGap,
                    topStart: b.topNew,
                    topEnd: b.topNew + b.heightAndGap
                };
                if (a.leftStart === c.leftStart && a.leftEnd === c.leftEnd && a.topStart === c.topStart && a.topEnd === c.topEnd) return null;
                var d = Math.max(a.leftStart, c.leftStart),
                    e = Math.min(a.leftEnd, c.leftEnd),
                    f = Math.max(a.topStart, c.topStart),
                    g = Math.min(a.topEnd, c.topEnd);
                return d >= e || f >= g ? null : {
                    leftStart: d,
                    leftEnd: e,
                    topStart: f,
                    topEnd: g
                }
            },
            generateG1: function(a, b, c) {
                a.topStart !== b.topStart && c.push({
                    leftStart: a.leftStart,
                    leftEnd: a.leftEnd,
                    topStart: a.topStart,
                    topEnd: b.topStart
                })
            },
            generateG2: function(a, b, c) {
                a.leftEnd !== b.leftEnd && c.push({
                    leftStart: b.leftEnd,
                    leftEnd: a.leftEnd,
                    topStart: a.topStart,
                    topEnd: a.topEnd
                })
            },
            generateG3: function(a, b, c) {
                a.topEnd !== b.topEnd && c.push({
                    leftStart: a.leftStart,
                    leftEnd: a.leftEnd,
                    topStart: b.topEnd,
                    topEnd: a.topEnd
                })
            },
            generateG4: function(a, b, c) {
                a.leftStart !== b.leftStart && c.push({
                    leftStart: a.leftStart,
                    leftEnd: b.leftStart,
                    topStart: a.topStart,
                    topEnd: a.topEnd
                })
            },
            cleanFreeSpaces: function() {
                var a = this;
                a.freeSpaces.sort(function(a, b) {
                    return a.topStart > b.topStart ? 1 : a.topStart < b.topStart ? -1 : a.leftStart > b.leftStart ? 1 : a.leftStart < b.leftStart ? -1 : 0
                }), a.correctSubPixelValues(), a.removeNonMaximalFreeSpaces()
            },
            correctSubPixelValues: function() {
                var a, b, c, d, e = this;
                for (a = 0, b = e.freeSpaces.length - 1; b > a; a++) c = e.freeSpaces[a], d = e.freeSpaces[a + 1], d.topStart - c.topStart <= 1 && (d.topStart = c.topStart)
            },
            removeNonMaximalFreeSpaces: function() {
                var b = this;
                b.uniqueFreeSpaces(), b.freeSpaces = a.map(b.freeSpaces, function(c, d) {
                    return a.each(b.freeSpaces, function(a, b) {
                        return d !== a && b.leftStart <= c.leftStart && b.leftEnd >= c.leftEnd && b.topStart <= c.topStart && b.topEnd >= c.topEnd ? (c = null, !1) : void 0
                    }), c
                })
            },
            uniqueFreeSpaces: function() {
                var b = this,
                    c = [];
                a.each(b.freeSpaces, function(b, d) {
                    a.each(c, function(a, b) {
                        return b.leftStart === d.leftStart && b.leftEnd === d.leftEnd && b.topStart === d.topStart && b.topEnd === d.topEnd ? (d = null, !1) : void 0
                    }), null !== d && c.push(d)
                }), b.freeSpaces = c
            },
            addHeightToBlocks: function() {
                var b = this;
                if (!(b.freeSpaces.length > 1)) {
                    var c = b.freeSpaces[0].topStart;
                    b.blocksOn.each(function(b, d) {
                        var e = a(d).data("cbp");
                        if (e.pack === !0) {
                            var f = c - e.topNew - e.heightAndGap;
                            0 > f && (d.style.height = e.height + f + "px")
                        }
                    })
                }
            },
            sortBlocksToPreventGaps: function() {
                var b = this;
                b.blocksAreSorted = !0, b.blocksOn.sort(function(b, c) {
                    var d = a(b).data("cbp"),
                        e = a(c).data("cbp");
                    return d.widthAndGap < e.widthAndGap ? 1 : d.widthAndGap > e.widthAndGap ? -1 : d.heightAndGap < e.heightAndGap ? 1 : d.heightAndGap > e.heightAndGap ? -1 : d.index > e.index ? 1 : d.index < e.index ? -1 : void 0
                }), b.blocksOn.each(function(b, c) {
                    a(c).data("cbp").pack = !1, c.style.height = ""
                })
            },
            sortBlocks: function(b, c) {
                b.sort(function(b, d) {
                    var e = a(b).data("cbp"),
                        f = a(d).data("cbp");
                    return e[c] > f[c] ? 1 : e[c] < f[c] ? -1 : e.leftNew > f.leftNew ? 1 : e.leftNew < f.leftNew ? -1 : 0
                })
            }
        })
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = a.fn.cubeportfolio.Constructor;
        a.extend(e.prototype, {
            sliderMarkup: function() {
                var b = this;
                b.sliderStopEvents = !1, b.sliderActive = 0, b.$obj.one("initComplete.cbp", function() {
                    b.$obj.addClass("cbp-mode-slider")
                }), b.nav = a("<div/>", {
                    "class": "cbp-nav"
                }), b.nav.on("click.cbp", "[data-slider-action]", function(c) {
                    if (c.preventDefault(), c.stopImmediatePropagation(), c.stopPropagation(), !b.sliderStopEvents) {
                        var d = a(this),
                            e = d.attr("data-slider-action");
                        b[e + "Slider"] && b[e + "Slider"](d)
                    }
                }), b.options.showNavigation && (b.controls = a("<div/>", {
                    "class": "cbp-nav-controls"
                }), b.navPrev = a("<div/>", {
                    "class": "cbp-nav-prev",
                    "data-slider-action": "prev"
                }).appendTo(b.controls), b.navNext = a("<div/>", {
                    "class": "cbp-nav-next",
                    "data-slider-action": "next"
                }).appendTo(b.controls), b.controls.appendTo(b.nav)), b.options.showPagination && (b.navPagination = a("<div/>", {
                    "class": "cbp-nav-pagination"
                }).appendTo(b.nav)), (b.controls || b.navPagination) && b.nav.appendTo(b.$obj), b.updateSliderPagination(), b.options.auto && (b.options.autoPauseOnHover && (b.mouseIsEntered = !1, b.$obj.on("mouseenter.cbp", function() {
                    b.mouseIsEntered = !0, b.stopSliderAuto()
                }).on("mouseleave.cbp", function() {
                    b.mouseIsEntered = !1, b.startSliderAuto()
                })), b.startSliderAuto()), b.options.drag && e.Private.modernBrowser && b.dragSlider()
            },
            updateSlider: function() {
                var a = this;
                a.updateSliderPosition(), a.updateSliderPagination()
            },
            updateSliderPagination: function() {
                var b, c, d = this;
                if (d.options.showPagination) {
                    for (b = Math.ceil(d.blocksOn.length / d.cols), d.navPagination.empty(), c = b - 1; c >= 0; c--) a("<div/>", {
                        "class": "cbp-nav-pagination-item",
                        "data-slider-action": "jumpTo"
                    }).appendTo(d.navPagination);
                    d.navPaginationItems = d.navPagination.children()
                }
                d.enableDisableNavSlider()
            },
            destroySlider: function() {
                var b = this;
                "slider" === b.options.layoutMode && (b.$obj.off(".cbp"), b.$obj.removeClass("cbp-mode-slider"), b.options.showNavigation && (b.nav.off(".cbp"), b.nav.remove()), b.navPagination && b.navPagination.remove(), b.$ul.removeAttr("style"), b.$ul.off(".cbp"), a(c).off(".cbp"), b.options.auto && b.stopSliderAuto())
            },
            nextSlider: function() {
                var a = this;
                if (a.isEndSlider()) {
                    if (!a.isRewindNav()) return;
                    a.sliderActive = 0
                } else a.options.scrollByPage ? a.sliderActive = Math.min(a.sliderActive + a.cols, a.blocksOn.length - a.cols) : a.sliderActive += 1;
                a.goToSlider()
            },
            prevSlider: function() {
                var a = this;
                if (a.isStartSlider()) {
                    if (!a.isRewindNav()) return;
                    a.sliderActive = a.blocksOn.length - a.cols
                } else a.options.scrollByPage ? a.sliderActive = Math.max(0, a.sliderActive - a.cols) : a.sliderActive -= 1;
                a.goToSlider()
            },
            jumpToSlider: function(a) {
                var b = this,
                    c = Math.min(a.index() * b.cols, b.blocksOn.length - b.cols);
                c !== b.sliderActive && (b.sliderActive = c, b.goToSlider())
            },
            jumpDragToSlider: function(a) {
                var b, c, d, e = this,
                    f = a > 0 ? !0 : !1;
                e.options.scrollByPage ? (b = e.cols * e.columnWidth, c = e.cols) : (b = e.columnWidth, c = 1), a = Math.abs(a), d = Math.floor(a / b) * c, a % b > 20 && (d += c), e.sliderActive = f ? Math.min(e.sliderActive + d, e.blocksOn.length - e.cols) : Math.max(0, e.sliderActive - d), e.goToSlider()
            },
            isStartSlider: function() {
                return 0 === this.sliderActive
            },
            isEndSlider: function() {
                var a = this;
                return a.sliderActive + a.cols > a.blocksOn.length - 1
            },
            goToSlider: function() {
                var a = this;
                a.enableDisableNavSlider(), a.updateSliderPosition()
            },
            startSliderAuto: function() {
                var a = this;
                return a.isDrag ? void a.stopSliderAuto() : void(a.timeout = setTimeout(function() {
                    a.nextSlider(), a.startSliderAuto()
                }, a.options.autoTimeout))
            },
            stopSliderAuto: function() {
                clearTimeout(this.timeout)
            },
            enableDisableNavSlider: function() {
                var a, b, c = this;
                c.isRewindNav() || (b = c.isStartSlider() ? "addClass" : "removeClass", c.navPrev[b]("cbp-nav-stop"), b = c.isEndSlider() ? "addClass" : "removeClass", c.navNext[b]("cbp-nav-stop")), c.options.showPagination && (a = c.options.scrollByPage ? Math.ceil(c.sliderActive / c.cols) : c.isEndSlider() ? c.navPaginationItems.length - 1 : Math.floor(c.sliderActive / c.cols), c.navPaginationItems.removeClass("cbp-nav-pagination-active").eq(a).addClass("cbp-nav-pagination-active"))
            },
            isRewindNav: function() {
                var a = this;
                return a.options.showNavigation ? a.blocksOn.length <= a.cols ? !1 : a.options.rewindNav ? !0 : !1 : !0
            },
            sliderItemsLength: function() {
                return this.blocksOn.length <= this.cols
            },
            sliderLayout: function() {
                var b = this;
                b.blocksOn.each(function(c, d) {
                    var e = a(d).data("cbp");
                    e.leftNew = b.columnWidth * c, e.topNew = 0, b.sliderFreeSpaces.push({
                        topStart: e.heightAndGap
                    })
                }), b.getFreeSpacesForSlider(), b.$ul.width(b.columnWidth * b.blocksOn.length - b.options.gapVertical)
            },
            getFreeSpacesForSlider: function() {
                var a = this;
                a.freeSpaces = a.sliderFreeSpaces.slice(a.sliderActive, a.sliderActive + a.cols), a.freeSpaces.sort(function(a, b) {
                    return a.topStart > b.topStart ? 1 : a.topStart < b.topStart ? -1 : void 0
                })
            },
            updateSliderPosition: function() {
                var a = this,
                    b = -a.sliderActive * a.columnWidth;
                e.Private.modernBrowser ? a.$ul[0].style[e.Private.transform] = "translate3d(" + b + "px, 0px, 0)" : a.$ul[0].style.left = b + "px", a.getFreeSpacesForSlider(), a.resizeMainContainer()
            },
            dragSlider: function() {
                function f(b) {
                    if (!q.sliderItemsLength()) {
                        if (u ? p = b : b.preventDefault(), q.options.auto && q.stopSliderAuto(), s) return void a(m).one("click.cbp", function() {
                            return !1
                        });
                        m = a(b.target), k = j(b).x, l = 0, n = -q.sliderActive * q.columnWidth, o = q.columnWidth * (q.blocksOn.length - q.cols), r.on(t.move, h), r.on(t.end, g), q.$obj.addClass("cbp-mode-slider-dragStart")
                    }
                }

                function g() {
                    q.$obj.removeClass("cbp-mode-slider-dragStart"), s = !0, 0 !== l ? (m.one("click.cbp", function() {
                        return !1
                    }), q.jumpDragToSlider(l), q.$ul.one(e.Private.transitionend, i)) : i.call(q), r.off(t.move), r.off(t.end)
                }

                function h(a) {
                    l = k - j(a).x, (l > 8 || -8 > l) && a.preventDefault(), q.isDrag = !0;
                    var b = n - l;
                    0 > l && n > l ? b = (n - l) / 5 : l > 0 && -o > n - l && (b = -o + (o + n - l) / 5), e.Private.modernBrowser ? q.$ul[0].style[e.Private.transform] = "translate3d(" + b + "px, 0px, 0)" : q.$ul[0].style.left = b + "px"
                }

                function i() {
                    if (s = !1, q.isDrag = !1, q.options.auto) {
                        if (q.mouseIsEntered) return;
                        q.startSliderAuto()
                    }
                }

                function j(a) {
                    return a.originalEvent !== d && a.originalEvent.touches !== d && (a = a.originalEvent.touches[0]), {
                        x: a.pageX,
                        y: a.pageY
                    }
                }
                var k, l, m, n, o, p, q = this,
                    r = a(c),
                    s = !1,
                    t = {},
                    u = !1;
                q.isDrag = !1, "ontouchstart" in b || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? (t = {
                    start: "touchstart.cbp",
                    move: "touchmove.cbp",
                    end: "touchend.cbp"
                }, u = !0) : t = {
                    start: "mousedown.cbp",
                    move: "mousemove.cbp",
                    end: "mouseup.cbp"
                }, q.$ul.on(t.start, f)
            },
            sliderLayoutReset: function() {
                var a = this;
                a.freeSpaces = [], a.sliderFreeSpaces = []
            }
        })
    }(jQuery, window, document);


/**!
 * easy-pie-chart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.7
 **/
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            a.appendChild(d), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size;
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                }(),
                k = function() {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1)
                };
            this.getCanvas = function() {
                return d
            }, this.getCtx = function() {
                return e
            }, this.clear = function() {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate.duration),
                        g = b.easing(this, f, a, c - a, b.animate.duration);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function(a, b) {},
                onStep: function(a, b, c) {},
                onStop: function(a, b) {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
                        duration: e.animate,
                        enabled: !0
                    }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                        duration: 1e3,
                        enabled: e.animate
                    }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) {
                return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), this.disableAnimation = function() {
                return e.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return e.animate.enabled = !0, this
            }, g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});


/****
 * jQuery Scrollie Plugin v1.0.1
 * https://github.com/Funsella/jquery-scrollie
 *
 * Copyright 2013 JP Nothard
 * Released under the MIT license
 */
(function($, window, document, undefined) {
    "use strict";
    // Create the defaults once
    var scrollie = "scrollie",
        defaults = {
            parentElement: window, // the scrolling element to watch for scrolling action. default: window (custom example: .my-wrapper)
            direction: "both", // 'up', 'down'
            scrollOffset: 0, //
            scrollRatio: 2,
            scrollingInView: null, // activates when the whole element is moving inside the window
            scrollingToTheTop: null, // activates when it enters the window and stops when it reaches the top
            scrollingOutOfView: null, // actives when the element reaches the top of the window and stops when it is out of the window
            scrolledOutOfView: null
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = scrollie;
        this.init()
    }
    Plugin.prototype = {
        init: function() {
            this._defineElements();
            this._scrollEvent()
        },
        _defineElements: function() {
            var self = this;
            self.$scrollElement = $(self.element);
            self.$elemHeight = self.$scrollElement.outerHeight();
            self.$elemPosTop = self.$scrollElement.offset().top;
            // if the element has a data-scrollie-offset value, use that or use the default
            self.$scrollOffset = self.$scrollElement.data("scrollie-offset") || self.$scrollElement.data("scrollie-offset") == "0" ? self.$scrollElement.data("scrollie-offset") : self.settings.scrollOffset;
            // if the element has a data-scrollie-scrollRatio value, use that or use the default
            self.$scrollRatio = self.$scrollElement.data("scrollie-scrollRatio") || self.$scrollElement.data("scrollie-scrollRatio") == "0" ? self.$scrollElement.data("scrollie-scrollRatio") : self.settings.scrollRatio
        },
        _inMotion: function(winPos, winHeight, thisTop, direction) {
            var self = this,
                coords = ((winPos - thisTop) * -1 - winHeight) * -1,
                scrollRatio = coords / 2,
                movedOut = coords < winHeight + self.$elemHeight,
                movingIn = coords > 0 - self.$scrollOffset,
                movingToTheTop = movingIn && coords < winHeight,
                movingThrough = movingIn && movedOut,
                atTheTop = coords > winHeight - self.$scrollOffset && movedOut;
            /**
             *  When the element moves into view until element reaches the very top of the page
             *---------------------------------------------------------------------------------*/
            if (movingToTheTop) { //revised and offset complete
                jQuery.isFunction(self.settings.scrollingToTheTop) && self.settings.scrollingToTheTop.call(this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos)
            }
            /**
             * if the element is inside the window
             * runs when the element moves into view till the element has completly moved out
             *-------------------------------------------------------------------------------*/
            if (movingThrough) { //revised and offset complete
                jQuery.isFunction(self.settings.scrollingInView) && self.settings.scrollingInView.call(this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos)
            }
            /**
             * if the element has reached the very top of the window
             * runs from when the element touches the top till the element has completly moved out
             *------------------------------------------------------------------------------------*/
            if (atTheTop) { //revised and offset complete
                jQuery.isFunction(self.settings.scrollingOutOfView) && self.settings.scrollingOutOfView.call(this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos)
            }
            /**
             * if the element has moved out the top of the window
             *---------------------------------------------------*/
            if (!movedOut) {
                jQuery.isFunction(self.settings.scrolledOutOfView) && self.settings.scrolledOutOfView.call(this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos)
            }
        },
        _scrollEvent: function() {
            var self = this,
                direction = self.settings.direction,
                lastScrolPos = 0,
                scroll_ok = true;
            setInterval(function() {
                scroll_ok = true
            }, 66); //33ms is 30fps, you can try changing this to something larger for better performance
            $(self.settings.parentElement).on("scroll", function() {
                var windowPos = $(this).scrollTop(),
                    winHeight = $(this).height(),
                    currentDirection = windowPos > lastScrolPos ? "up" : "down";
                // scrolling up
                if (currentDirection === direction && scroll_ok === true) {
                    scroll_ok = false;
                    // element moving from bottom to top
                    self._inMotion(windowPos, winHeight, self.$elemPosTop, currentDirection)
                } else if (direction === "both" && scroll_ok === true) {
                    scroll_ok = false;
                    self._inMotion(windowPos, winHeight, self.$elemPosTop, currentDirection)
                }
                lastScrolPos = windowPos
            })
        }
    };
    // A really lightweight plugin wrapper around the constructor,
    $.fn[scrollie] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + scrollie)) {
                $.data(this, "plugin_" + scrollie, new Plugin(this, options))
            }
        })
    }
})(jQuery, window, document);

/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

;
(function($) {

    'use strict';

    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };

        if (!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function() {
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var ignoreList = '.fitvidsignore';

            if (settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

            $allVideos.each(function() {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return; // Disable FitVids on this video.
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('name')) {
                    var videoName = 'fitvid' + $.fn.fitVids._count;
                    $this.attr('name', videoName);
                    $.fn.fitVids._count++;
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + '%');
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };

    // Internal counter for unique video names.
    $.fn.fitVids._count = 0;

    // Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);


/*jshint multistr:true, curly: false */
/*global jQuery:false, define: false */
/**
 * jRange - Awesome range control
 *
 * Written by
 * ----------
 * Nitin Hayaran (nitinhayaran@gmail.com)
 *
 * Licensed under the MIT (MIT-LICENSE.txt).
 *
 * @author Nitin Hayaran
 * @version 0.1-RELEASE
 *
 * Dependencies
 * ------------
 * jQuery (http://jquery.com)
 *
 **/
;
(function($, window, document, undefined) {
    'use strict';

    var jRange = function() {
        return this.init.apply(this, arguments);
    };
    jRange.prototype = {
        defaults: {
            onstatechange: function() {},
            ondragend: function() {},
            onbarclicked: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: '%s',
            theme: 'range-red',
            width: 262,
            disable: false,
            snap: false
        },
        template: '<div class="slider-container">\
			<div class="back-bar">\
                <div class="selected-bar"></div>\
                <div class="pointer low"></div><div class="pointer-label low">123456</div>\
                <div class="pointer high"></div><div class="pointer-label high">456789</div>\
                <div class="clickable-dummy"></div>\
            </div>\
            <div class="scale"></div>\
		</div>',
        init: function(node, options) {
            this.options = $.extend({}, this.defaults, options);
            this.inputNode = $(node);
            this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : '' + this.options.from);
            this.domNode = $(this.template);
            this.domNode.addClass(this.options.theme);
            this.inputNode.after(this.domNode);
            this.domNode.on('change', this.onChange);
            this.pointers = $('.pointer', this.domNode);
            this.lowPointer = this.pointers.first();
            this.highPointer = this.pointers.last();
            this.labels = $('.pointer-label', this.domNode);
            this.lowLabel = this.labels.first();
            this.highLabel = this.labels.last();
            this.scale = $('.scale', this.domNode);
            this.bar = $('.selected-bar', this.domNode);
            this.clickableBar = this.domNode.find('.clickable-dummy');
            this.interval = this.options.to - this.options.from;
            this.render();
        },
        render: function() {
            // Check if inputNode is visible, and have some width, so that we can set slider width accordingly.
            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log('jRange : no width found, returning');
                return;
            } else {
                this.options.width = this.options.width || this.inputNode.width();
                this.domNode.width(this.options.width);
                this.inputNode.hide();
            }

            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide();
            }
            if (!this.options.showLabels) {
                this.labels.hide();
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale();
            }
            this.setValue(this.options.value);
        },
        isSingle: function() {
            if (typeof(this.options.value) === 'number') {
                return true;
            }
            return (this.options.value.indexOf(',') !== -1 || this.options.isRange) ?
                false : true;
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
            this.pointers.bind('dragstart', function(event) {
                event.preventDefault();
            });
        },
        onDragStart: function(e) {
            if (this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass('last-active');
            pointer.addClass('focused last-active');
            this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
            $(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
            $(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();

            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0];
            } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                e = e.originalEvent.changedTouches[0];
            }

            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger('change', [this, pointer, position]);
        },
        onDragEnd: function(e) {
            this.pointers.removeClass('focused')
                .trigger('rangeslideend');
            this.labels.removeClass('focused');
            $(document).off('.slider');
            this.options.ondragend.call(this, this.options.value);
        },
        barClicked: function(e) {
            if (this.options.disable) return;
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle())
                this.setPosition(this.pointers.last(), x, true, true);
            else {
                var firstLeft = Math.abs(parseFloat(this.pointers.first().css('left'), 10)),
                    firstHalfWidth = this.pointers.first().width() / 2,
                    lastLeft = Math.abs(parseFloat(this.pointers.last().css('left'), 10)),
                    lastHalfWidth = this.pointers.first().width() / 2,
                    leftSide = Math.abs(firstLeft - x + firstHalfWidth),
                    rightSide = Math.abs(lastLeft - x + lastHalfWidth),
                    pointer;

                if (leftSide == rightSide) {
                    pointer = x < firstLeft ? this.pointers.first() : this.pointers.last();
                } else {
                    pointer = leftSide < rightSide ? this.pointers.first() : this.pointers.last();
                }
                this.setPosition(pointer, x, true, true);
            }
            this.options.onbarclicked.call(this, this.options.value);
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            min = 0;
            max = self.domNode.width();

            if (!self.isSingle()) {
                min = pointer.hasClass('high') ? parseFloat(self.lowPointer.css("left")) + (self.lowPointer.width() / 2) : 0;
                max = pointer.hasClass('low') ? parseFloat(self.highPointer.css("left")) + (self.highPointer.width() / 2) : self.domNode.width();
            }

            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true);
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos, rightPos,
                lowPos = parseFloat(this.lowPointer.css("left")),
                highPos = parseFloat(this.highPointer.css("left")) || 0,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position);
            }
            if (this.options.snap) {
                var expPos = this.correctPositionForSnap(position);
                if (expPos === -1) {
                    return;
                } else {
                    position = expPos;
                }
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth);
            } else {
                lowPos = Math.round(position - circleWidth);
            }
            pointer[animate ? 'animate' : 'css']({
                'left': Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0;
            } else {
                leftPos = lowPos + circleWidth;
                rightPos = highPos + circleWidth;
            }
            var w = Math.round(highPos + circleWidth - leftPos);
            this.bar[animate ? 'animate' : 'css']({
                'width': Math.abs(w),
                'left': (w > 0) ? leftPos : leftPos + w
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly();
        },
        correctPositionForSnap: function(position) {
            var currentValue = this.positionToValue(position) - this.options.from;
            var diff = this.options.width / (this.interval / this.options.step),
                expectedPosition = (currentValue / this.options.step) * diff;
            if (position <= expectedPosition + diff / 2 && position >= expectedPosition - diff / 2) {
                return expectedPosition;
            } else {
                return -1;
            }
        },
        // will be called from outside
        setValue: function(value) {
            var values = value.toString().split(',');
            values[0] = Math.min(Math.max(values[0], this.options.from), this.options.to) + '';
            if (values.length > 1) {
                values[1] = Math.min(Math.max(values[1], this.options.from), this.options.to) + '';
            }
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1]);
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1]);
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = '';
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
            }
            this.scale.html(str);

            $('ins', this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                });
            });
        },
        getBarWidth: function() {
            var values = this.options.value.split(',');
            if (values.length > 1) {
                return parseFloat(values[1]) - parseFloat(values[0]);
            } else {
                return parseFloat(values[0]);
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
            var text;
            var value = this.positionToValue(position);
            // Is it higer or lower than it should be?

            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
                text = this.options.format(value, type);
            } else {
                text = this.options.format.replace('%s', value);
            }

            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.options.width - width);
            label[animate ? 'animate' : 'css']({
                left: left
            });
            this.setInputValue(pointer, value);
        },
        valuesToPrc: function(values) {
            var lowPrc = ((parseFloat(values[0]) - parseFloat(this.options.from)) * 100 / this.interval),
                highPrc = ((parseFloat(values[1]) - parseFloat(this.options.from)) * 100 / this.interval);
            return [lowPrc, highPrc];
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100;
        },
        isDecimal: function() {
            return ((this.options.value + this.options.from + this.options.to).indexOf(".") === -1) ? false : true;
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = parseFloat(value, 10) + parseFloat(this.options.from, 10);
            if (this.isDecimal()) {
                var final = Math.round(Math.round(value / this.options.step) * this.options.step * 100) / 100;
                if (final !== 0.0) {
                    final = '' + final;
                    if (final.indexOf(".") === -1) {
                        final = final + ".";
                    }
                    while (final.length - final.indexOf('.') < 3) {
                        final = final + "0";
                    }
                } else {
                    final = "0.00";
                }
                return final;
            } else {
                return Math.round(value / this.options.step) * this.options.step;
            }
        },
        setInputValue: function(pointer, v) {
            // if(!isChanged) return;
            if (this.isSingle()) {
                this.options.value = v.toString();
            } else {
                var values = this.options.value.split(',');
                if (pointer.hasClass('low')) {
                    this.options.value = v + ',' + values[1];
                } else {
                    this.options.value = values[0] + ',' + v;
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value)
                    .trigger('change');
                this.options.onstatechange.call(this, this.options.value);
            }
        },
        getValue: function() {
            return this.options.value;
        },
        getOptions: function() {
            return this.options;
        },
        getRange: function() {
            return this.options.from + "," + this.options.to;
        },
        isReadonly: function() {
            this.domNode.toggleClass('slider-readonly', this.options.disable);
        },
        disable: function() {
            this.options.disable = true;
            this.isReadonly();
        },
        enable: function() {
            this.options.disable = false;
            this.isReadonly();
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable;
            this.isReadonly();
        },
        updateRange: function(range, value) {
            var values = range.toString().split(',');
            this.interval = parseInt(values[1]) - parseInt(values[0]);
            if (value) {
                this.setValue(value);
            } else {
                this.setValue(this.getValue());
            }
        }
    };

    var pluginName = 'jRange';
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this),
                data = $.data(this, 'plugin_' + pluginName),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('plugin_' + pluginName, (data = new jRange(this, options)));
                $(window).resize(function() {
                    data.setValue(data.getValue());
                }); // Update slider position when window is resized to keep it in sync with scale
            }
            // if first argument is a string, call silimarly named function
            // this gives flexibility to call functions of the plugin e.g.
            //   - $('.dial').plugin('destroy');
            //   - $('.dial').plugin('render', $('.new-child'));
            if (typeof option === 'string') {
                result = data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });

        // To enable plugin returns values
        return result || this;
    };

})(jQuery, window, document);