const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[12]) || 12;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should increase quality by 1 when there are more than 10 days left", function() {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increase quality by 2 when there are less than 10 days left", function() {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20);
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase quality by 3 when there are less than 5 days left", function() {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20);
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should put quality to 0 after the concert has finished", function() {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should not decrease quality of sulfuras", function() {
    const sulfurasHandofRagnaros = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new Shop([sulfurasHandofRagnaros]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80); 
  });

  it("should not decrease sellin of sulfuras", function() {
    const sulfurasHandofRagnaros = new Item("Sulfuras, Hand of Ragnaros", 10, 50);
    const gildedRose = new Shop([sulfurasHandofRagnaros]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10); 
  });

  it("should augment quality of Aged Brie with time", function() {
    const agedBrie = new Item("Aged Brie", 2, 1);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("should put quality to 0 of Aged Brie after concert", function() {
    const agedBrie = new Item("Aged Brie", 0, 10);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should decrease quality 2 times faster", function() {
    const randomItem = new Item("Elixir of the Mangoose", 0, 10);
    const gildedRose = new Shop([randomItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("should not have a negative quality", function() {
    const randomItem = new Item("Elixir of the Mangoose", 0, 0);
    const gildedRose = new Shop([randomItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should not have a superior quality of 50", function() {
    const agedBrie = new Item("Aged Brie", 2, 50);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should decrease quality of 1 before day 0", function() {
    const randomItem = new Item("Random Item", 10, 50);
    const gildedRose = new Shop([randomItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(49);
  });

  it("should decrease quality of 2 for conjured items", function() {
    const conjuredItem = new Item("Conjured Magic Stick", 10, 40);
    const gildedRose = new Shop([conjuredItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(38);
  });

  // it("should delete items when quality is 0", function() {
  //   const rottenItem = new Item("Random Item", 2, 1);
  //   const gildedRose = new Shop([rottenItem]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0]).toBe(null);
  // });
});