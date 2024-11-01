interface ShipmentOrderData {
  numberWithBioFuel: number;
  numberWithoutBioFuel: number;
}

interface ShipmentOrder {
  feet20: ShipmentOrderData;
  feet40: ShipmentOrderData;
}

interface CustomerPriceList {
  feet20: number;
  feet40: number;
}

interface DiscountCampaign {
    name: string,
    rule: any,
    order: number,
}

enum ContainerTypes {
  FEET_20 = "feet20",
  FEET_40 = "feet40",
}



const discounts = [
    {
        name: "Save the Environment Discount",
        order: 1,
        rule: (totalPayment: number, hasBioFuel: boolean) => {
            return hasBioFuel ? totalPayment * 0.99 : totalPayment;
        },
    },
    {
        name: "Buy 2, Get 1 Free Discount",
        order: 2,
        rule: (
            totalPayment: number,
            shipmentOrder: ShipmentOrder,
            priceList: CustomerPriceList
          ) => {
            const total40FeetContainers =
              shipmentOrder.feet40?.numberWithBioFuel +
              shipmentOrder.feet40?.numberWithoutBioFuel;
            if (
              (!shipmentOrder.feet40?.numberWithBioFuel &&
                !shipmentOrder.feet40?.numberWithoutBioFuel) ||
              total40FeetContainers < 2
            ) {
              return `${totalPayment}$`;
            }
      
            const discountPrice =
              Math.floor(total40FeetContainers / 2) * priceList.feet20;
      
            return totalPayment - discountPrice;
        },
    }
];

function findSavingMoreMoneyDiscount(
  priceList: CustomerPriceList,
  shipmentOrder: ShipmentOrder,
) {
  let totalPayment = 0;
  let hasBioFuel = false;

  const containers = Object.keys(shipmentOrder);

  for (const container of containers) {
    if (container === ContainerTypes.FEET_20) {
      if (shipmentOrder[container].numberWithBioFuel) hasBioFuel = true;
      totalPayment +=
        shipmentOrder[container].numberWithBioFuel * priceList[container] +
        shipmentOrder[container].numberWithoutBioFuel * priceList[container];
    } else if (container == ContainerTypes.FEET_40) {
      if (shipmentOrder[container].numberWithBioFuel) hasBioFuel = true;
      totalPayment +=
        shipmentOrder[container].numberWithBioFuel * priceList[container] +
        shipmentOrder[container].numberWithoutBioFuel * priceList[container];
    }
  }

  const result = {
    totalPayment: 10000000000,
    name: ''
  }

  discounts.forEach((discountCampaign: any) => {
    if(discountCampaign.order = 1) {
        const totalPaymentAfterDiscount = discountCampaign.rule(totalPayment, hasBioFuel);
        if (totalPaymentAfterDiscount < result.totalPayment) {
            result.totalPayment = totalPaymentAfterDiscount
            result.name = discountCampaign.name
        }
    }

    if (discountCampaign.order = 2) {
        const totalPaymentAfterDiscount = discountCampaign.rule(totalPayment, shipmentOrder, priceList);
        if (totalPaymentAfterDiscount < result.totalPayment) {
            result.totalPayment = totalPaymentAfterDiscount
            result.name = discountCampaign.name
        }
    }
  });

  return result.name;
}

const happyShipperPriceList = {
    feet20: 5000,
    feet40: 9000,
  };
  
  const happyShipperOrder = {
    feet20: {
      numberWithBioFuel: 3,
      numberWithoutBioFuel: 2,
    },
    feet40: {
      numberWithBioFuel: 0,
      numberWithoutBioFuel: 7,
    },
  };

  // ad new comment

console.log(findSavingMoreMoneyDiscount(happyShipperPriceList, happyShipperOrder))