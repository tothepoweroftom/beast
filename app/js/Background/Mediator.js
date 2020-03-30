export default function Mediator(e) {
    var t = {};
    var e = e || {};
    e.on = function (e, n) {
        if (!(e in t)) {
            t[e] = []
        }
        t[e].push(n)
    };
    e.publish = function (e) {
        if (!(e in t)) return;
        var n = [].slice.call(arguments, 1);
        t[e].forEach(function (e) {
            e.apply(this, n)
        })
    };
    return e
}