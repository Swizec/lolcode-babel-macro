export default{NOT:function(n){return!n},"ANY OF":function(n){for(var r=lol.utils.argsArray(arguments),t=0;t<r.length;t++)if(r[t])return!0;return!1},"BIGGR OF":function(n,r){return Math.max(n,r)},"SMALLR OF":function(n,r){return Math.min(n,r)},"SUM OF":function(n,r){return n+r},"DIFF OF":function(n,r){return n-r},"PRODUKT OF":function(n,r){return n*r},"QUOSHUNT OF":function(n,r){return n/r},"BOTH OF":function(n,r){return n&&r},"EITHER OF":function(n,r){return n||r},"BOTH SAEM":function(n,r){return n===r},SMOOSH:function(n){var r=lol.utils.argsArray(arguments);return lol.utils.toYarn(r.reduce(function(n,r){return lol.utils.toYarn(n)+lol.utils.toYarn(r)}))},"BIGGR THAN":function(n,r){return n>r},"SMALLR THAN":function(n,r){return n<r},"MOD OF":function(n,r){return n%r},"LEN OF":function(n){return n&&void 0!==n.length?n.length:null},"ORD OF":function(n){return n&&n.charCodeAt?n.charCodeAt(0):-1},"CHR OF":function(n){return String.fromCharCode(n)}};
//# sourceMappingURL=lolstdlib.mjs.map
