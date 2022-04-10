function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

$.fn.appendText = function(text) {
    return this.each(function() {
        var textNode = document.createTextNode(text);
        $(this).append(textNode);
    });
};

$.fn.prependText = function(text) {
    return this.each(function() {
        var textNode = document.createTextNode(text);
        $(this).prepend(textNode);
    });
};