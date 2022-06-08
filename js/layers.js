addLayer("pt", {
    name: "prestige tree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#8f34eb",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
          ["raw-html",
            function() {return '<b><i>The Prestige Tree</b></i>'},
            {"font-size": "40px"}],
          ["tree", "p"]],
    layerShown(){return true}
})

addLayer("p", {
    name: "zero", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#3ab7e8",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
      11: {
        title: "The Super Generic Upgrade",
        description: "Activate point gain.",
        cost: new Decimal(1),
        unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
      },
      12: {
        title: "Another Generic Upgrade",
        description: "zero points boost points.",
        cost: new Decimal(1),
        effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
          let ret = player[this.layer].points.add(1).tetrate(0.5)
          return ret;
        },
        effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        unlocked() { return hasUpgrade("p", 11) }, // The upgrade is only visible when this is true
      },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
