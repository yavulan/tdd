String.prototype.reduceRight = function () {
    return this.replace(/\s+$/, "");
}

describe("String trimRight test", function () {
    it("test trimRight should remove trailing spaces", function () {
        expect("string").toEqual("string   ".trimRight());
    });

    it("test trimRight should left start spaces", function () {
        expect("  string").toEqual("  string   ".trimRight());
    });
});