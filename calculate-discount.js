var ContainerTypes;
(function (ContainerTypes) {
    ContainerTypes["FEET_20"] = "feet20";
    ContainerTypes["FEET_40"] = "feet40";
})(ContainerTypes || (ContainerTypes = {}));
var discounts = [
    {
        name: "Save the Environment Discount",
        order: 1,
        rule: function (totalPayment, hasBioFuel) {
            return hasBioFuel ? totalPayment * 0.99 : totalPayment;
        },
    },
    {
        name: "Buy 2, Get 1 Free Discount",
        order: 2,
        rule: function (totalPayment, shipmentOrder, priceList) {
            var _a, _b, _c, _d;
            var total40FeetContainers = ((_a = shipmentOrder.feet40) === null || _a === void 0 ? void 0 : _a.numberWithBioFuel) +
                ((_b = shipmentOrder.feet40) === null || _b === void 0 ? void 0 : _b.numberWithoutBioFuel);
            if ((!((_c = shipmentOrder.feet40) === null || _c === void 0 ? void 0 : _c.numberWithBioFuel) &&
                !((_d = shipmentOrder.feet40) === null || _d === void 0 ? void 0 : _d.numberWithoutBioFuel)) ||
                total40FeetContainers < 2) {
                return "".concat(totalPayment, "$");
            }
            var discountPrice = Math.floor(total40FeetContainers / 2) * priceList.feet20;
            return totalPayment - discountPrice;
        },
    }
];
function findSavingMoreMoneyDiscount(priceList, shipmentOrder) {
    var totalPayment = 0;
    var hasBioFuel = false;
    var containers = Object.keys(shipmentOrder);
    for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
        var container = containers_1[_i];
        if (container === ContainerTypes.FEET_20) {
            if (shipmentOrder[container].numberWithBioFuel)
                hasBioFuel = true;
            totalPayment +=
                shipmentOrder[container].numberWithBioFuel * priceList[container] +
                    shipmentOrder[container].numberWithoutBioFuel * priceList[container];
        }
        else if (container == ContainerTypes.FEET_40) {
            if (shipmentOrder[container].numberWithBioFuel)
                hasBioFuel = true;
            totalPayment +=
                shipmentOrder[container].numberWithBioFuel * priceList[container] +
                    shipmentOrder[container].numberWithoutBioFuel * priceList[container];
        }
    }
    var result = {
        totalPayment: 10000000000,
        name: ''
    };
    discounts.forEach(function (discountCampaign) {
        if (discountCampaign.order = 1) {
            var totalPaymentAfterDiscount = discountCampaign.rule(totalPayment, hasBioFuel);
            if (totalPaymentAfterDiscount < result.totalPayment) {
                result.totalPayment = totalPaymentAfterDiscount;
                result.name = discountCampaign.name;
            }
        }
        if (discountCampaign.order = 2) {
            var totalPaymentAfterDiscount = discountCampaign.rule(totalPayment, shipmentOrder, priceList);
            if (totalPaymentAfterDiscount < result.totalPayment) {
                result.totalPayment = totalPaymentAfterDiscount;
                result.name = discountCampaign.name;
            }
        }
    });
    return result.name;
}
var happyShipperPriceList = {
    feet20: 5000,
    feet40: 9000,
};
var happyShipperOrder = {
    feet20: {
        numberWithBioFuel: 3,
        numberWithoutBioFuel: 2,
    },
    feet40: {
        numberWithBioFuel: 0,
        numberWithoutBioFuel: 7,
    },
};
console.log(findSavingMoreMoneyDiscount(happyShipperPriceList, happyShipperOrder));
