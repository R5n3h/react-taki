Array.prototype.first = function () {
    return this[0];
};

Array.prototype.render = function () {
	return this.map(function(card) {
		return card.render();
	});
}