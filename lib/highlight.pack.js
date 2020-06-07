/*
  Highlight.js 10.0.3 (a4b1bd2d)
  License: BSD-3-Clause
  Copyright (c) 2006-2020, Ivan Sagalaev
*/
const hljs = (function () {
  function e(n) {
    Object.freeze(n);
    const t = typeof n == "function";
    return (
      Object.getOwnPropertyNames(n).forEach((r) => {
        !n.hasOwnProperty(r) ||
          n[r] === null ||
          (typeof n[r] != "object" && typeof n[r] != "function") ||
          (t && (r === "caller" || r === "callee" || r === "arguments")) ||
          Object.isFrozen(n[r]) ||
          e(n[r]);
      }),
      n
    );
  }
  function n(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function t(e) {
    let n;
    const t = {};
    const r = Array.prototype.slice.call(arguments, 1);
    for (n in e) t[n] = e[n];
    return (
      r.forEach((e) => {
        for (n in e) t[n] = e[n];
      }),
      t
    );
  }
  function r(e) {
    return e.nodeName.toLowerCase();
  }
  const a = Object.freeze({
    __proto__: null,
    escapeHTML: n,
    inherit: t,
    nodeStream: function (e) {
      const n = [];
      return (
        (function e(t, a) {
          for (let i = t.firstChild; i; i = i.nextSibling)
            i.nodeType === 3
              ? (a += i.nodeValue.length)
              : i.nodeType === 1 &&
                (n.push({ event: "start", offset: a, node: i }),
                (a = e(i, a)),
                r(i).match(/br|hr|img|input/) ||
                  n.push({ event: "stop", offset: a, node: i }));
          return a;
        })(e, 0),
        n
      );
    },
    mergeStreams: function (e, t, a) {
      let i = 0;
      let s = "";
      const o = [];
      function l() {
        return e.length && t.length
          ? e[0].offset !== t[0].offset
            ? e[0].offset < t[0].offset
              ? e
              : t
            : t[0].event === "start"
            ? e
            : t
          : e.length
          ? e
          : t;
      }
      function c(e) {
        s += `<${r(e)}${[].map
          .call(e.attributes, (e) => {
            return ` ${e.nodeName}="${n(e.value).replace(/"/g, "&quot;")}"`;
          })
          .join("")}>`;
      }
      function u(e) {
        s += `</${r(e)}>`;
      }
      function d(e) {
        (e.event === "start" ? c : u)(e.node);
      }
      for (; e.length || t.length; ) {
        let g = l();
        if (
          ((s += n(a.substring(i, g[0].offset))), (i = g[0].offset), g === e)
        ) {
          o.reverse().forEach(u);
          do {
            d(g.splice(0, 1)[0]), (g = l());
          } while (g === e && g.length && g[0].offset === i);
          o.reverse().forEach(c);
        } else
          g[0].event === "start" ? o.push(g[0].node) : o.pop(),
            d(g.splice(0, 1)[0]);
      }
      return s + n(a.substr(i));
    },
  });
  const i = "</span>";
  const s = (e) => !!e.kind;
  class o {
    constructor(e, n) {
      (this.buffer = ""), (this.classPrefix = n.classPrefix), e.walk(this);
    }
    addText(e) {
      this.buffer += n(e);
    }
    openNode(e) {
      if (!s(e)) return;
      let n = e.kind;
      e.sublanguage || (n = `${this.classPrefix}${n}`), this.span(n);
    }
    closeNode(e) {
      s(e) && (this.buffer += i);
    }
    span(e) {
      this.buffer += `<span class="${e}">`;
    }
    value() {
      return this.buffer;
    }
  }
  class l {
    constructor() {
      (this.rootNode = { children: [] }), (this.stack = [this.rootNode]);
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(e) {
      this.top.children.push(e);
    }
    openNode(e) {
      const n = { kind: e, children: [] };
      this.add(n), this.stack.push(n);
    }
    closeNode() {
      if (this.stack.length > 1) return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); );
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(e) {
      return this.constructor._walk(e, this.rootNode);
    }
    static _walk(e, n) {
      return (
        typeof n == "string"
          ? e.addText(n)
          : n.children &&
            (e.openNode(n),
            n.children.forEach((n) => this._walk(e, n)),
            e.closeNode(n)),
        e
      );
    }
    static _collapse(e) {
      e.children &&
        (e.children.every((e) => typeof e == "string")
          ? ((e.text = e.children.join("")), delete e.children)
          : e.children.forEach((e) => {
              typeof e != "string" && l._collapse(e);
            }));
    }
  }
  class c extends l {
    constructor(e) {
      super(), (this.options = e);
    }
    addKeyword(e, n) {
      e !== "" && (this.openNode(n), this.addText(e), this.closeNode());
    }
    addText(e) {
      e !== "" && this.add(e);
    }
    addSublanguage(e, n) {
      const t = e.root;
      (t.kind = n), (t.sublanguage = !0), this.add(t);
    }
    toHTML() {
      return new o(this, this.options).value();
    }
    finalize() {}
  }
  function u(e) {
    return (e && e.source) || e;
  }
  const d =
    "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
  const g = { begin: "\\\\[\\s\\S]", relevance: 0 };
  const h = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [g],
  };
  const f = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [g],
  };
  const p = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
  };
  const m = function (e, n, r) {
    const a = t(
      { className: "comment", begin: e, end: n, contains: [] },
      r || {}
    );
    return (
      a.contains.push(p),
      a.contains.push({
        className: "doctag",
        begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
        relevance: 0,
      }),
      a
    );
  };
  const b = m("//", "$");
  const v = m("/\\*", "\\*/");
  const x = m("#", "$");
  const _ = Object.freeze({
    __proto__: null,
    IDENT_RE: "[a-zA-Z]\\w*",
    UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
    NUMBER_RE: "\\b\\d+(\\.\\d+)?",
    C_NUMBER_RE: d,
    BINARY_NUMBER_RE: "\\b(0b[01]+)",
    RE_STARTERS_RE:
      "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    BACKSLASH_ESCAPE: g,
    APOS_STRING_MODE: h,
    QUOTE_STRING_MODE: f,
    PHRASAL_WORDS_MODE: p,
    COMMENT: m,
    C_LINE_COMMENT_MODE: b,
    C_BLOCK_COMMENT_MODE: v,
    HASH_COMMENT_MODE: x,
    NUMBER_MODE: {
      className: "number",
      begin: "\\b\\d+(\\.\\d+)?",
      relevance: 0,
    },
    C_NUMBER_MODE: { className: "number", begin: d, relevance: 0 },
    BINARY_NUMBER_MODE: {
      className: "number",
      begin: "\\b(0b[01]+)",
      relevance: 0,
    },
    CSS_NUMBER_MODE: {
      className: "number",
      begin:
        "\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0,
    },
    REGEXP_MODE: {
      begin: /(?=\/[^\/\n]*\/)/,
      contains: [
        {
          className: "regexp",
          begin: /\//,
          end: /\/[gimuy]*/,
          illegal: /\n/,
          contains: [
            g,
            { begin: /\[/, end: /\]/, relevance: 0, contains: [g] },
          ],
        },
      ],
    },
    TITLE_MODE: { className: "title", begin: "[a-zA-Z]\\w*", relevance: 0 },
    UNDERSCORE_TITLE_MODE: {
      className: "title",
      begin: "[a-zA-Z_]\\w*",
      relevance: 0,
    },
    METHOD_GUARD: { begin: "\\.\\s*[a-zA-Z_]\\w*", relevance: 0 },
  });
  const E = "of and for in not or if then".split(" ");
  function R(e, n) {
    return n ? +n : ((t = e), E.includes(t.toLowerCase()) ? 0 : 1);
    let t;
  }
  const N = n;
  const w = t;
  const { nodeStream: y, mergeStreams: O } = a;
  return (function (n) {
    const r = [];
    const a = {};
    const i = {};
    const s = [];
    let o = !0;
    const l = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;
    const d =
      "Could not find the language '{}', did you forget to load/include a language module?";
    let g = {
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: void 0,
      __emitter: c,
    };
    function h(e) {
      return g.noHighlightRe.test(e);
    }
    function f(e, n, t, r) {
      const a = { code: n, language: e };
      T("before:highlight", a);
      const i = a.result ? a.result : p(a.language, a.code, t, r);
      return (i.code = a.code), T("after:highlight", i), i;
    }
    function p(e, n, r, i) {
      const s = n;
      function l(e, n) {
        const t = v.case_insensitive ? n[0].toLowerCase() : n[0];
        return e.keywords.hasOwnProperty(t) && e.keywords[t];
      }
      function c() {
        _.subLanguage != null
          ? (function () {
              if (k !== "") {
                const e = typeof _.subLanguage == "string";
                if (!e || a[_.subLanguage]) {
                  const n = e
                    ? p(_.subLanguage, k, !0, E[_.subLanguage])
                    : m(k, _.subLanguage.length ? _.subLanguage : void 0);
                  _.relevance > 0 && (T += n.relevance),
                    e && (E[_.subLanguage] = n.top),
                    w.addSublanguage(n.emitter, n.language);
                } else w.addText(k);
              }
            })()
          : (function () {
              let e, n, t, r;
              if (_.keywords) {
                for (
                  n = 0,
                    _.lexemesRe.lastIndex = 0,
                    t = _.lexemesRe.exec(k),
                    r = "";
                  t;

                ) {
                  r += k.substring(n, t.index);
                  let a = null;
                  (e = l(_, t))
                    ? (w.addText(r),
                      (r = ""),
                      (T += e[1]),
                      (a = e[0]),
                      w.addKeyword(t[0], a))
                    : (r += t[0]),
                    (n = _.lexemesRe.lastIndex),
                    (t = _.lexemesRe.exec(k));
                }
                (r += k.substr(n)), w.addText(r);
              } else w.addText(k);
            })(),
          (k = "");
      }
      function h(e) {
        e.className && w.openNode(e.className),
          (_ = Object.create(e, { parent: { value: _ } }));
      }
      let f = {};
      function b(n, t) {
        let a;
        const i = t && t[0];
        if (((k += n), i == null)) return c(), 0;
        if (
          f.type == "begin" &&
          t.type == "end" &&
          f.index == t.index &&
          i === ""
        ) {
          if (((k += s.slice(t.index, t.index + 1)), !o))
            throw (
              (((a = Error("0 width match regex")).languageName = e),
              (a.badRule = f.rule),
              a)
            );
          return 1;
        }
        if (((f = t), t.type === "begin"))
          return (function (e) {
            const n = e[0];
            const t = e.rule;
            return t.__onBegin && (t.__onBegin(e) || {}).ignoreMatch
              ? (function (e) {
                  return _.matcher.regexIndex === 0
                    ? ((k += e[0]), 1)
                    : ((B = !0), 0);
                })(n)
              : (t &&
                  t.endSameAsBegin &&
                  (t.endRe = RegExp(
                    n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
                    "m"
                  )),
                t.skip
                  ? (k += n)
                  : (t.excludeBegin && (k += n),
                    c(),
                    t.returnBegin || t.excludeBegin || (k = n)),
                h(t),
                t.returnBegin ? 0 : n.length);
          })(t);
        if (t.type === "illegal" && !r)
          throw (
            (((a = Error(
              `Illegal lexeme "${i}" for mode "${_.className || "<unnamed>"}"`
            )).mode = _),
            a)
          );
        if (t.type === "end") {
          const l = (function (e) {
            const n = e[0];
            const t = s.substr(e.index);
            const r = (function e(n, t) {
              if (
                (function (e, n) {
                  const t = e && e.exec(n);
                  return t && t.index === 0;
                })(n.endRe, t)
              ) {
                for (; n.endsParent && n.parent; ) n = n.parent;
                return n;
              }
              if (n.endsWithParent) return e(n.parent, t);
            })(_, t);
            if (r) {
              const a = _;
              a.skip
                ? (k += n)
                : (a.returnEnd || a.excludeEnd || (k += n),
                  c(),
                  a.excludeEnd && (k = n));
              do {
                _.className && w.closeNode(),
                  _.skip || _.subLanguage || (T += _.relevance),
                  (_ = _.parent);
              } while (_ !== r.parent);
              return (
                r.starts &&
                  (r.endSameAsBegin && (r.starts.endRe = r.endRe), h(r.starts)),
                a.returnEnd ? 0 : n.length
              );
            }
          })(t);
          if (l != null) return l;
        }
        if (t.type === "illegal" && i === "") return 1;
        if (A > 1e5 && A > 3 * t.index)
          throw Error(
            "potential infinite loop, way more iterations than matches"
          );
        return (k += i), i.length;
      }
      var v = M(e);
      if (!v)
        throw (
          (console.error(d.replace("{}", e)), Error(`Unknown language: "${e}"`))
        );
      !(function (e) {
        function n(n, t) {
          return RegExp(
            u(n),
            `m${e.case_insensitive ? "i" : ""}${t ? "g" : ""}`
          );
        }
        class r {
          constructor() {
            (this.matchIndexes = {}),
              (this.regexes = []),
              (this.matchAt = 1),
              (this.position = 0);
          }
          addRule(e, n) {
            (n.position = this.position++),
              (this.matchIndexes[this.matchAt] = n),
              this.regexes.push([n, e]),
              (this.matchAt +=
                (function (e) {
                  return RegExp(`${e.toString()}|`).exec("").length - 1;
                })(e) + 1);
          }
          compile() {
            this.regexes.length === 0 && (this.exec = () => null);
            const e = this.regexes.map((e) => e[1]);
            (this.matcherRe = n(
              (function (e, n) {
                for (
                  var t = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,
                    r = 0,
                    a = "",
                    i = 0;
                  i < e.length;
                  i++
                ) {
                  const s = (r += 1);
                  let o = u(e[i]);
                  for (i > 0 && (a += "|"), a += "("; o.length > 0; ) {
                    const l = t.exec(o);
                    if (l == null) {
                      a += o;
                      break;
                    }
                    (a += o.substring(0, l.index)),
                      (o = o.substring(l.index + l[0].length)),
                      l[0][0] == "\\" && l[1]
                        ? (a += `\\${+l[1] + s}`)
                        : ((a += l[0]), l[0] == "(" && r++);
                  }
                  a += ")";
                }
                return a;
              })(e),
              !0
            )),
              (this.lastIndex = 0);
          }
          exec(e) {
            this.matcherRe.lastIndex = this.lastIndex;
            const n = this.matcherRe.exec(e);
            if (!n) return null;
            const t = n.findIndex((e, n) => n > 0 && e != null);
            const r = this.matchIndexes[t];
            return Object.assign(n, r);
          }
        }
        class a {
          constructor() {
            (this.rules = []),
              (this.multiRegexes = []),
              (this.count = 0),
              (this.lastIndex = 0),
              (this.regexIndex = 0);
          }
          getMatcher(e) {
            if (this.multiRegexes[e]) return this.multiRegexes[e];
            const n = new r();
            return (
              this.rules.slice(e).forEach(([e, t]) => n.addRule(e, t)),
              n.compile(),
              (this.multiRegexes[e] = n),
              n
            );
          }
          considerAll() {
            this.regexIndex = 0;
          }
          addRule(e, n) {
            this.rules.push([e, n]), n.type === "begin" && this.count++;
          }
          exec(e) {
            const n = this.getMatcher(this.regexIndex);
            n.lastIndex = this.lastIndex;
            const t = n.exec(e);
            return (
              t &&
                ((this.regexIndex += t.position + 1),
                this.regexIndex === this.count && (this.regexIndex = 0)),
              t
            );
          }
        }
        function i(e) {
          const n = e.input[e.index - 1];
          const t = e.input[e.index + e[0].length];
          if (n === "." || t === ".") return { ignoreMatch: !0 };
        }
        if (e.contains && e.contains.includes("self"))
          throw Error(
            "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
          );
        !(function r(s, o) {
          s.compiled ||
            ((s.compiled = !0),
            (s.__onBegin = null),
            (s.keywords = s.keywords || s.beginKeywords),
            s.keywords &&
              (s.keywords = (function (e, n) {
                const t = {};
                return (
                  typeof e == "string"
                    ? r("keyword", e)
                    : Object.keys(e).forEach((n) => {
                        r(n, e[n]);
                      }),
                  t
                );
                function r(e, r) {
                  n && (r = r.toLowerCase()),
                    r.split(" ").forEach((n) => {
                      const r = n.split("|");
                      t[r[0]] = [e, R(r[0], r[1])];
                    });
                }
              })(s.keywords, e.case_insensitive)),
            (s.lexemesRe = n(s.lexemes || /\w+/, !0)),
            o &&
              (s.beginKeywords &&
                ((s.begin = `\\b(${s.beginKeywords
                  .split(" ")
                  .join("|")})(?=\\b|\\s)`),
                (s.__onBegin = i)),
              s.begin || (s.begin = /\B|\b/),
              (s.beginRe = n(s.begin)),
              s.endSameAsBegin && (s.end = s.begin),
              s.end || s.endsWithParent || (s.end = /\B|\b/),
              s.end && (s.endRe = n(s.end)),
              (s.terminator_end = u(s.end) || ""),
              s.endsWithParent &&
                o.terminator_end &&
                (s.terminator_end += (s.end ? "|" : "") + o.terminator_end)),
            s.illegal && (s.illegalRe = n(s.illegal)),
            s.relevance == null && (s.relevance = 1),
            s.contains || (s.contains = []),
            (s.contains = [].concat(
              ...s.contains.map((e) => {
                return (function (e) {
                  return (
                    e.variants &&
                      !e.cached_variants &&
                      (e.cached_variants = e.variants.map((n) => {
                        return t(e, { variants: null }, n);
                      })),
                    e.cached_variants
                      ? e.cached_variants
                      : (function e(n) {
                          return !!n && (n.endsWithParent || e(n.starts));
                        })(e)
                      ? t(e, { starts: e.starts ? t(e.starts) : null })
                      : Object.isFrozen(e)
                      ? t(e)
                      : e
                  );
                })(e === "self" ? s : e);
              })
            )),
            s.contains.forEach((e) => {
              r(e, s);
            }),
            s.starts && r(s.starts, o),
            (s.matcher = (function (e) {
              const n = new a();
              return (
                e.contains.forEach((e) =>
                  n.addRule(e.begin, { rule: e, type: "begin" })
                ),
                e.terminator_end &&
                  n.addRule(e.terminator_end, { type: "end" }),
                e.illegal && n.addRule(e.illegal, { type: "illegal" }),
                n
              );
            })(s)));
        })(e);
      })(v);
      let x;
      var _ = i || v;
      var E = {};
      var w = new g.__emitter(g);
      !(function () {
        for (var e = [], n = _; n !== v; n = n.parent)
          n.className && e.unshift(n.className);
        e.forEach((e) => w.openNode(e));
      })();
      let y, O;
      var k = "";
      var T = 0;
      let L = 0;
      var A = 0;
      var B = !1;
      try {
        for (
          _.matcher.considerAll();
          A++,
            B ? (B = !1) : ((_.matcher.lastIndex = L), _.matcher.considerAll()),
            (y = _.matcher.exec(s));

        )
          (O = b(s.substring(L, y.index), y)), (L = y.index + O);
        return (
          b(s.substr(L)),
          w.closeAllNodes(),
          w.finalize(),
          (x = w.toHTML()),
          {
            relevance: T,
            value: x,
            language: e,
            illegal: !1,
            emitter: w,
            top: _,
          }
        );
      } catch (n) {
        if (n.message && n.message.includes("Illegal"))
          return {
            illegal: !0,
            illegalBy: {
              msg: n.message,
              context: s.slice(L - 100, L + 100),
              mode: n.mode,
            },
            sofar: x,
            relevance: 0,
            value: N(s),
            emitter: w,
          };
        if (o)
          return {
            relevance: 0,
            value: N(s),
            emitter: w,
            language: e,
            top: _,
            errorRaised: n,
          };
        throw n;
      }
    }
    function m(e, n) {
      n = n || g.languages || Object.keys(a);
      let t = (function (e) {
        const n = {
          relevance: 0,
          emitter: new g.__emitter(g),
          value: N(e),
          illegal: !1,
          top: E,
        };
        return n.emitter.addText(e), n;
      })(e);
      let r = t;
      return (
        n
          .filter(M)
          .filter(k)
          .forEach((n) => {
            const a = p(n, e, !1);
            (a.language = n),
              a.relevance > r.relevance && (r = a),
              a.relevance > t.relevance && ((r = t), (t = a));
          }),
        r.language && (t.second_best = r),
        t
      );
    }
    function b(e) {
      return g.tabReplace || g.useBR
        ? e.replace(l, (e, n) => {
            return g.useBR && e === "\n"
              ? "<br>"
              : g.tabReplace
              ? n.replace(/\t/g, g.tabReplace)
              : "";
          })
        : e;
    }
    function v(e) {
      let n, t, r, a, s;
      const o = (function (e) {
        let n;
        let t = `${e.className} `;
        if (
          ((t += e.parentNode ? e.parentNode.className : ""),
          (n = g.languageDetectRe.exec(t)))
        ) {
          const r = M(n[1]);
          return (
            r ||
              (console.warn(d.replace("{}", n[1])),
              console.warn(
                "Falling back to no-highlight mode for this block.",
                e
              )),
            r ? n[1] : "no-highlight"
          );
        }
        return t.split(/\s+/).find((e) => h(e) || M(e));
      })(e);
      h(o) ||
        (T("before:highlightBlock", { block: e, language: o }),
        g.useBR
          ? ((n = document.createElement(
              "div"
            )).innerHTML = e.innerHTML
              .replace(/\n/g, "")
              .replace(/<br[ \/]*>/g, "\n"))
          : (n = e),
        (s = n.textContent),
        (r = o ? f(o, s, !0) : m(s)),
        (t = y(n)).length &&
          (((a = document.createElement("div")).innerHTML = r.value),
          (r.value = O(t, y(a), s))),
        (r.value = b(r.value)),
        T("after:highlightBlock", { block: e, result: r }),
        (e.innerHTML = r.value),
        (e.className = (function (e, n, t) {
          const r = n ? i[n] : t;
          const a = [e.trim()];
          return (
            e.match(/\bhljs\b/) || a.push("hljs"),
            e.includes(r) || a.push(r),
            a.join(" ").trim()
          );
        })(e.className, o, r.language)),
        (e.result = { language: r.language, re: r.relevance }),
        r.second_best &&
          (e.second_best = {
            language: r.second_best.language,
            re: r.second_best.relevance,
          }));
    }
    function x() {
      if (!x.called) {
        x.called = !0;
        const e = document.querySelectorAll("pre code");
        r.forEach.call(e, v);
      }
    }
    const E = { disableAutodetect: !0, name: "Plain text" };
    function M(e) {
      return (e = (e || "").toLowerCase()), a[e] || a[i[e]];
    }
    function k(e) {
      const n = M(e);
      return n && !n.disableAutodetect;
    }
    function T(e, n) {
      const t = e;
      s.forEach((e) => {
        e[t] && e[t](n);
      });
    }
    Object.assign(n, {
      highlight: f,
      highlightAuto: m,
      fixMarkup: b,
      highlightBlock: v,
      configure: function (e) {
        g = w(g, e);
      },
      initHighlighting: x,
      initHighlightingOnLoad: function () {
        window.addEventListener("DOMContentLoaded", x, !1);
      },
      registerLanguage: function (e, t) {
        let r;
        try {
          r = t(n);
        } catch (n) {
          if (
            (console.error(
              "Language definition for '{}' could not be registered.".replace(
                "{}",
                e
              )
            ),
            !o)
          )
            throw n;
          console.error(n), (r = E);
        }
        r.name || (r.name = e),
          (a[e] = r),
          (r.rawDefinition = t.bind(null, n)),
          r.aliases &&
            r.aliases.forEach((n) => {
              i[n] = e;
            });
      },
      listLanguages: function () {
        return Object.keys(a);
      },
      getLanguage: M,
      requireLanguage: function (e) {
        const n = M(e);
        if (n) return n;
        throw Error(
          "The '{}' language is required, but not loaded.".replace("{}", e)
        );
      },
      autoDetection: k,
      inherit: w,
      addPlugin: function (e, n) {
        s.push(e);
      },
    }),
      (n.debugMode = function () {
        o = !1;
      }),
      (n.safeMode = function () {
        o = !0;
      }),
      (n.versionString = "10.0.3");
    for (const n in _) typeof _[n] == "object" && e(_[n]);
    return Object.assign(n, _), n;
  })({});
})();
typeof exports == "object" &&
  typeof module != "undefined" &&
  (module.exports = hljs);
hljs.registerLanguage(
  "css",
  (function () {
    return function (e) {
      const n = {
        begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
        returnBegin: !0,
        end: ";",
        endsWithParent: !0,
        contains: [
          {
            className: "attribute",
            begin: /\S/,
            end: ":",
            excludeEnd: !0,
            starts: {
              endsWithParent: !0,
              excludeEnd: !0,
              contains: [
                {
                  begin: /[\w-]+\(/,
                  returnBegin: !0,
                  contains: [
                    { className: "built_in", begin: /[\w-]+/ },
                    {
                      begin: /\(/,
                      end: /\)/,
                      contains: [
                        e.APOS_STRING_MODE,
                        e.QUOTE_STRING_MODE,
                        e.CSS_NUMBER_MODE,
                      ],
                    },
                  ],
                },
                e.CSS_NUMBER_MODE,
                e.QUOTE_STRING_MODE,
                e.APOS_STRING_MODE,
                e.C_BLOCK_COMMENT_MODE,
                { className: "number", begin: "#[0-9A-Fa-f]+" },
                { className: "meta", begin: "!important" },
              ],
            },
          },
        ],
      };
      return {
        name: "CSS",
        case_insensitive: !0,
        illegal: /[=\/|'\$]/,
        contains: [
          e.C_BLOCK_COMMENT_MODE,
          { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
          { className: "selector-class", begin: /\.[A-Za-z0-9_-]+/ },
          {
            className: "selector-attr",
            begin: /\[/,
            end: /\]/,
            illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE],
          },
          {
            className: "selector-pseudo",
            begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/,
          },
          {
            begin: "@(page|font-face)",
            lexemes: "@[a-z-]+",
            keywords: "@page @font-face",
          },
          {
            begin: "@",
            end: "[{;]",
            illegal: /:/,
            returnBegin: !0,
            contains: [
              { className: "keyword", begin: /@\-?\w[\w]*(\-\w+)*/ },
              {
                begin: /\s/,
                endsWithParent: !0,
                excludeEnd: !0,
                relevance: 0,
                keywords: "and or not only",
                contains: [
                  { begin: /[a-z-]+:/, className: "attribute" },
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  e.CSS_NUMBER_MODE,
                ],
              },
            ],
          },
          {
            className: "selector-tag",
            begin: "[a-zA-Z-][a-zA-Z0-9_-]*",
            relevance: 0,
          },
          {
            begin: "{",
            end: "}",
            illegal: /\S/,
            contains: [e.C_BLOCK_COMMENT_MODE, n],
          },
        ],
      };
    };
  })()
);
hljs.registerLanguage(
  "xml",
  (function () {
    return function (e) {
      const n = {
        className: "symbol",
        begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;",
      };
      const a = {
        begin: "\\s",
        contains: [
          {
            className: "meta-keyword",
            begin: "#?[a-z_][a-z1-9_-]+",
            illegal: "\\n",
          },
        ],
      };
      const s = e.inherit(a, { begin: "\\(", end: "\\)" });
      const t = e.inherit(e.APOS_STRING_MODE, { className: "meta-string" });
      const i = e.inherit(e.QUOTE_STRING_MODE, { className: "meta-string" });
      const c = {
        endsWithParent: !0,
        illegal: /</,
        relevance: 0,
        contains: [
          { className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0 },
          {
            begin: /[=]\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: !0,
                variants: [
                  { begin: /"/, end: /"/, contains: [n] },
                  { begin: /'/, end: /'/, contains: [n] },
                  { begin: /[^\s"'=<>`]+/ },
                ],
              },
            ],
          },
        ],
      };
      return {
        name: "HTML, XML",
        aliases: [
          "html",
          "xhtml",
          "rss",
          "atom",
          "xjb",
          "xsd",
          "xsl",
          "plist",
          "wsf",
          "svg",
        ],
        case_insensitive: !0,
        contains: [
          {
            className: "meta",
            begin: "<![a-z]",
            end: ">",
            relevance: 10,
            contains: [
              a,
              i,
              t,
              s,
              {
                begin: "\\[",
                end: "\\]",
                contains: [
                  {
                    className: "meta",
                    begin: "<![a-z]",
                    end: ">",
                    contains: [a, s, i, t],
                  },
                ],
              },
            ],
          },
          e.COMMENT("\x3c!--", "--\x3e", { relevance: 10 }),
          { begin: "<\\!\\[CDATA\\[", end: "\\]\\]>", relevance: 10 },
          n,
          { className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10 },
          {
            className: "tag",
            begin: "<style(?=\\s|>)",
            end: ">",
            keywords: { name: "style" },
            contains: [c],
            starts: {
              end: "</style>",
              returnEnd: !0,
              subLanguage: ["css", "xml"],
            },
          },
          {
            className: "tag",
            begin: "<script(?=\\s|>)",
            end: ">",
            keywords: { name: "script" },
            contains: [c],
            starts: {
              end: "</script>",
              returnEnd: !0,
              subLanguage: ["javascript", "handlebars", "xml"],
            },
          },
          {
            className: "tag",
            begin: "</?",
            end: "/?>",
            contains: [
              { className: "name", begin: /[^\/><\s]+/, relevance: 0 },
              c,
            ],
          },
        ],
      };
    };
  })()
);
hljs.registerLanguage(
  "markdown",
  (function () {
    return function (n) {
      const e = { begin: "<", end: ">", subLanguage: "xml", relevance: 0 };
      const a = {
        begin: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
        returnBegin: !0,
        contains: [
          {
            className: "string",
            begin: "\\[",
            end: "\\]",
            excludeBegin: !0,
            returnEnd: !0,
            relevance: 0,
          },
          {
            className: "link",
            begin: "\\]\\(",
            end: "\\)",
            excludeBegin: !0,
            excludeEnd: !0,
          },
          {
            className: "symbol",
            begin: "\\]\\[",
            end: "\\]",
            excludeBegin: !0,
            excludeEnd: !0,
          },
        ],
        relevance: 10,
      };
      const i = {
        className: "strong",
        contains: [],
        variants: [
          { begin: /_{2}/, end: /_{2}/ },
          { begin: /\*{2}/, end: /\*{2}/ },
        ],
      };
      const s = {
        className: "emphasis",
        contains: [],
        variants: [
          { begin: /\*(?!\*)/, end: /\*/ },
          { begin: /_(?!_)/, end: /_/, relevance: 0 },
        ],
      };
      i.contains.push(s), s.contains.push(i);
      let c = [e, a];
      return (
        (i.contains = i.contains.concat(c)),
        (s.contains = s.contains.concat(c)),
        {
          name: "Markdown",
          aliases: ["md", "mkdown", "mkd"],
          contains: [
            {
              className: "section",
              variants: [
                { begin: "^#{1,6}", end: "$", contains: (c = c.concat(i, s)) },
                {
                  begin: "(?=^.+?\\n[=-]{2,}$)",
                  contains: [
                    { begin: "^[=-]*$" },
                    { begin: "^", end: "\\n", contains: c },
                  ],
                },
              ],
            },
            e,
            {
              className: "bullet",
              begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
              end: "\\s+",
              excludeEnd: !0,
            },
            i,
            s,
            { className: "quote", begin: "^>\\s+", contains: c, end: "$" },
            {
              className: "code",
              variants: [
                { begin: "(`{3,})(.|\\n)*?\\1`*[ ]*" },
                { begin: "(~{3,})(.|\\n)*?\\1~*[ ]*" },
                { begin: "```", end: "```+[ ]*$" },
                { begin: "~~~", end: "~~~+[ ]*$" },
                { begin: "`.+?`" },
                {
                  begin: "(?=^( {4}|\\t))",
                  contains: [{ begin: "^( {4}|\\t)", end: "(\\n)$" }],
                  relevance: 0,
                },
              ],
            },
            { begin: "^[-\\*]{3,}", end: "$" },
            a,
            {
              begin: /^\[[^\n]+\]:/,
              returnBegin: !0,
              contains: [
                {
                  className: "symbol",
                  begin: /\[/,
                  end: /\]/,
                  excludeBegin: !0,
                  excludeEnd: !0,
                },
                {
                  className: "link",
                  begin: /:\s*/,
                  end: /$/,
                  excludeBegin: !0,
                },
              ],
            },
          ],
        }
      );
    };
  })()
);
hljs.registerLanguage(
  "bash",
  (function () {
    return function (e) {
      const s = {};
      Object.assign(s, {
        className: "variable",
        variants: [
          { begin: /\$[\w\d#@][\w\d_]*/ },
          {
            begin: /\$\{/,
            end: /\}/,
            contains: [{ begin: /:-/, contains: [s] }],
          },
        ],
      });
      const n = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [e.BACKSLASH_ESCAPE],
      };
      const t = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, s, n],
      };
      n.contains.push(t);
      const a = {
        begin: /\$\(\(/,
        end: /\)\)/,
        contains: [
          { begin: /\d+#[0-9a-f]+/, className: "number" },
          e.NUMBER_MODE,
          s,
        ],
      };
      return {
        name: "Bash",
        aliases: ["sh", "zsh"],
        lexemes: /\b-?[a-z\._]+\b/,
        keywords: {
          keyword:
            "if then else elif fi for while in do done case esac function",
          literal: "true false",
          built_in:
            "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
          _: "-ne -eq -lt -gt -f -d -e -s -l -a",
        },
        contains: [
          { className: "meta", begin: /^#![^\n]+sh\s*$/, relevance: 10 },
          {
            className: "function",
            begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            returnBegin: !0,
            contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
            relevance: 0,
          },
          a,
          e.HASH_COMMENT_MODE,
          t,
          { className: "", begin: /\\"/ },
          { className: "string", begin: /'/, end: /'/ },
          s,
        ],
      };
    };
  })()
);
hljs.registerLanguage(
  "json",
  (function () {
    return function (n) {
      const e = { literal: "true false null" };
      const i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE];
      const t = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE];
      const a = {
        end: ",",
        endsWithParent: !0,
        excludeEnd: !0,
        contains: t,
        keywords: e,
      };
      const l = {
        begin: "{",
        end: "}",
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [n.BACKSLASH_ESCAPE],
            illegal: "\\n",
          },
          n.inherit(a, { begin: /:/ }),
        ].concat(i),
        illegal: "\\S",
      };
      const s = {
        begin: "\\[",
        end: "\\]",
        contains: [n.inherit(a)],
        illegal: "\\S",
      };
      return (
        t.push(l, s),
        i.forEach((n) => {
          t.push(n);
        }),
        { name: "JSON", contains: t, keywords: e, illegal: "\\S" }
      );
    };
  })()
);
hljs.registerLanguage(
  "javascript",
  (function () {
    return function (e) {
      const n = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      };
      const a = "[A-Za-z$_][0-9A-Za-z$_]*";
      const s = {
        keyword:
          "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
        literal: "true false null undefined NaN Infinity",
        built_in:
          "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise",
      };
      const r = {
        className: "number",
        variants: [
          { begin: "\\b(0[bB][01]+)n?" },
          { begin: "\\b(0[oO][0-7]+)n?" },
          { begin: `${e.C_NUMBER_RE}n?` },
        ],
        relevance: 0,
      };
      const i = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: s,
        contains: [],
      };
      const t = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, i],
          subLanguage: "xml",
        },
      };
      const c = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, i],
          subLanguage: "css",
        },
      };
      const o = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [e.BACKSLASH_ESCAPE, i],
      };
      i.contains = [
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        t,
        c,
        o,
        r,
        e.REGEXP_MODE,
      ];
      const l = i.contains.concat([
        e.C_BLOCK_COMMENT_MODE,
        e.C_LINE_COMMENT_MODE,
      ]);
      const d = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        contains: l,
      };
      return {
        name: "JavaScript",
        aliases: ["js", "jsx", "mjs", "cjs"],
        keywords: s,
        contains: [
          {
            className: "meta",
            relevance: 10,
            begin: /^\s*['"]use (strict|asm)['"]/,
          },
          { className: "meta", begin: /^#!/, end: /$/ },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          t,
          c,
          o,
          e.C_LINE_COMMENT_MODE,
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+",
                contains: [
                  { className: "type", begin: "\\{", end: "\\}", relevance: 0 },
                  {
                    className: "variable",
                    begin: `${a}(?=\\s*(-)|$)`,
                    endsParent: !0,
                    relevance: 0,
                  },
                  { begin: /(?=[^\n])\s/, relevance: 0 },
                ],
              },
            ],
          }),
          e.C_BLOCK_COMMENT_MODE,
          r,
          {
            begin: /[{,\n]\s*/,
            relevance: 0,
            contains: [
              {
                begin: `${a}\\s*:`,
                returnBegin: !0,
                relevance: 0,
                contains: [{ className: "attr", begin: a, relevance: 0 }],
              },
            ],
          },
          {
            begin: `(${e.RE_STARTERS_RE}|\\b(case|return|throw)\\b)\\s*`,
            keywords: "return throw case",
            contains: [
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE,
              e.REGEXP_MODE,
              {
                className: "function",
                begin: `(\\(.*?\\)|${a})\\s*=>`,
                returnBegin: !0,
                end: "\\s*=>",
                contains: [
                  {
                    className: "params",
                    variants: [
                      { begin: a },
                      { begin: /\(\s*\)/ },
                      {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: s,
                        contains: l,
                      },
                    ],
                  },
                ],
              },
              { begin: /,/, relevance: 0 },
              { className: "", begin: /\s/, end: /\s*/, skip: !0 },
              {
                variants: [
                  { begin: "<>", end: "</>" },
                  { begin: n.begin, end: n.end },
                ],
                subLanguage: "xml",
                contains: [
                  { begin: n.begin, end: n.end, skip: !0, contains: ["self"] },
                ],
              },
            ],
            relevance: 0,
          },
          {
            className: "function",
            beginKeywords: "function",
            end: /\{/,
            excludeEnd: !0,
            contains: [e.inherit(e.TITLE_MODE, { begin: a }), d],
            illegal: /\[|%/,
          },
          { begin: /\$[(.]/ },
          e.METHOD_GUARD,
          {
            className: "class",
            beginKeywords: "class",
            end: /[{;=]/,
            excludeEnd: !0,
            illegal: /[:"\[\]]/,
            contains: [{ beginKeywords: "extends" }, e.UNDERSCORE_TITLE_MODE],
          },
          { beginKeywords: "constructor", end: /\{/, excludeEnd: !0 },
          {
            begin: `(get|set)\\s+(?=${a}\\()`,
            end: /{/,
            keywords: "get set",
            contains: [
              e.inherit(e.TITLE_MODE, { begin: a }),
              { begin: /\(\)/ },
              d,
            ],
          },
        ],
        illegal: /#(?!!)/,
      };
    };
  })()
);
hljs.registerLanguage(
  "typescript",
  (function () {
    return function (e) {
      const n = {
        keyword:
          "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract as from extends async await",
        literal: "true false null undefined NaN Infinity",
        built_in:
          "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void Promise",
      };
      const r = { className: "meta", begin: "@[A-Za-z$_][0-9A-Za-z$_]*" };
      const a = {
        begin: "\\(",
        end: /\)/,
        keywords: n,
        contains: [
          "self",
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          e.NUMBER_MODE,
        ],
      };
      const t = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: n,
        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, a],
      };
      const s = {
        className: "number",
        variants: [
          { begin: "\\b(0[bB][01]+)n?" },
          { begin: "\\b(0[oO][0-7]+)n?" },
          { begin: `${e.C_NUMBER_RE}n?` },
        ],
        relevance: 0,
      };
      const i = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: n,
        contains: [],
      };
      const o = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, i],
          subLanguage: "xml",
        },
      };
      const c = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, i],
          subLanguage: "css",
        },
      };
      const E = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [e.BACKSLASH_ESCAPE, i],
      };
      return (
        (i.contains = [
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          o,
          c,
          E,
          s,
          e.REGEXP_MODE,
        ]),
        {
          name: "TypeScript",
          aliases: ["ts"],
          keywords: n,
          contains: [
            { className: "meta", begin: /^\s*['"]use strict['"]/ },
            e.APOS_STRING_MODE,
            e.QUOTE_STRING_MODE,
            o,
            c,
            E,
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
            s,
            {
              begin: `(${e.RE_STARTERS_RE}|\\b(case|return|throw)\\b)\\s*`,
              keywords: "return throw case",
              contains: [
                e.C_LINE_COMMENT_MODE,
                e.C_BLOCK_COMMENT_MODE,
                e.REGEXP_MODE,
                {
                  className: "function",
                  begin: `(\\(.*?\\)|${e.IDENT_RE})\\s*=>`,
                  returnBegin: !0,
                  end: "\\s*=>",
                  contains: [
                    {
                      className: "params",
                      variants: [
                        { begin: e.IDENT_RE },
                        { begin: /\(\s*\)/ },
                        {
                          begin: /\(/,
                          end: /\)/,
                          excludeBegin: !0,
                          excludeEnd: !0,
                          keywords: n,
                          contains: [
                            "self",
                            e.C_LINE_COMMENT_MODE,
                            e.C_BLOCK_COMMENT_MODE,
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              relevance: 0,
            },
            {
              className: "function",
              beginKeywords: "function",
              end: /[\{;]/,
              excludeEnd: !0,
              keywords: n,
              contains: [
                "self",
                e.inherit(e.TITLE_MODE, { begin: "[A-Za-z$_][0-9A-Za-z$_]*" }),
                t,
              ],
              illegal: /%/,
              relevance: 0,
            },
            {
              beginKeywords: "constructor",
              end: /[\{;]/,
              excludeEnd: !0,
              contains: ["self", t],
            },
            {
              begin: /module\./,
              keywords: { built_in: "module" },
              relevance: 0,
            },
            { beginKeywords: "module", end: /\{/, excludeEnd: !0 },
            {
              beginKeywords: "interface",
              end: /\{/,
              excludeEnd: !0,
              keywords: "interface extends",
            },
            { begin: /\$[(.]/ },
            { begin: `\\.${e.IDENT_RE}`, relevance: 0 },
            r,
            a,
          ],
        }
      );
    };
  })()
);
hljs.registerLanguage(
  "plaintext",
  (function () {
    return function (t) {
      return {
        name: "Plain text",
        aliases: ["text", "txt"],
        disableAutodetect: !0,
      };
    };
  })()
);
