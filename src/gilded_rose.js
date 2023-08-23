class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  decreaseQuality(item, amount = 1) {
    if (item.quality > 0) {
      item.quality -= amount;
    }
  }

  increaseQuality(item, amount = 1) {
    if (item.quality < 50) {
      item.quality += amount;
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const itemName = item.name;

      if (itemName.startsWith('Conjured')) {
        this.decreaseQuality(item, 2);
      } else if (itemName === 'Aged Brie') {
        this.increaseQuality(item);
      } else if (itemName === 'Backstage passes to a TAFKAL80ETC concert') {
        this.increaseQuality(item);

        if (item.sellIn < 11) {
          this.increaseQuality(item);
        }
        if (item.sellIn < 6) {
          this.increaseQuality(item);
        }
      } else if (itemName !== 'Sulfuras, Hand of Ragnaros') {
        this.decreaseQuality(item);
      }

      if (itemName !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        if (itemName !== 'Aged Brie') {
          if (itemName !== 'Backstage passes to a TAFKAL80ETC concert') {
            this.decreaseQuality(item);
          } else {
            item.quality = 0;
          }
        } else {
          item.quality = Math.max(0, item.quality - item.quality);
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
