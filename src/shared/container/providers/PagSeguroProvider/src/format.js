const clone = require("clone");
const validate = require("./validate");
const ip = require("ip");

/**
 * billing
 * @param {Object} billing
 * @return {Object}
 */
function billing(billing) {
  if (!billing) {
    return { addressRequired: false };
  }

  billing = clone(billing);

  if (!validate.isObject(billing)) {
  }

  if (
    billing.hasOwnProperty("addressRequired") &&
    billing.addressRequired === false
  ) {
    return { addressRequired: false };
  }

  if (Object.keys(billing).length == 0) {
    return { addressRequired: false };
  }

  return { address: billing };
}

/**
 * sender
 * @param {Object} sender
 * @return {Object}
 */
function sender(sender) {
  if (!validate.isObject(sender)) {
    return {};
  }

  sender = clone(sender);

  if (sender.document) {
    sender.documents = {
      document: sender.document || {}
    };
    delete sender.document;
  }

  sender.ip = ip.address();

  return sender;
}

/**
 * creditCard
 * @param {Object} creditCard
 * @param {Object} params
 * @return {Object}
 */
function creditCard(creditCard, params = {}) {
  if (!validate.isObject(creditCard)) {
    return {};
  }

  // let noInterestInstallmentQuantityLocal = 0;
  // if (creditCard.installment && creditCard.installment.noInterestInstallmentQuantity) {
  //   noInterestInstallmentQuantityLocal = creditCard.installment.noInterestInstallmentQuantity;
  // }

  creditCard = clone(creditCard);

  if (creditCard.holder && validate.isObject(creditCard.holder)) {
    creditCard.holder.documents = {
      document: creditCard.holder.document || {}
    };

    if (creditCard.holder.document) delete creditCard.holder.document;
  }

  if (creditCard.installment) {
    const { installmentAmount } = creditCard.installment;

    // creditCard.installment = {
    //   quantity: creditCard.installment.quantity
    // };

    if (installmentAmount) {
      creditCard.installment.value = Number(installmentAmount).toFixed(2);
    }

    if (
      creditCard.installment.maxInstallmentNoInterest &&
      creditCard.installment.maxInstallmentNoInterest > 1
    ) {
      creditCard.installment.noInterestInstallmentQuantity =
        creditCard.installment.maxInstallmentNoInterest;
    }
  }

  if (params.billing) {
    creditCard.billingAddress = params.billing || {};
  } else {
	creditCard.billingAddress = {};
  }

  // console.log(creditCard.installment);
  return creditCard;
}

/**
 * shipping
 * @param {Object} shipping
 * @return {Object}
 */
function shipping(shipping) {
  if (!validate.isObject(shipping)) {
    return { addressRequired: false };
  }

  shipping = clone(shipping);

  if (
    shipping.hasOwnProperty("addressRequired") &&
    shipping.addressRequired == false
  ) {
    return { addressRequired: false };
  }

  if (Object.keys(shipping).length == 0) {
    return { addressRequired: false };
  }

  const newShipping = { address: shipping };

  if (shipping.type) {
    newShipping.type = shipping.type;
  }

  if (shipping.cost) {
    newShipping.cost = Number(shipping.cost).toFixed(2);
  }

  return newShipping;
}

/**
 * extraAmount
 * @param {Number} extraAmount
 * @return {Object}
 */
function extraAmount(extraAmount) {
  if (extraAmount) {
    extraAmount = Number(extraAmount).toFixed(2);
  }

  return extraAmount;
}

/**
 * items
 * @param {Array} item
 * @return {Object}
 */
function items(items) {
  if (!validate.isArray(items)) {
    return { item: [] };
  }

  items = clone(items);

  return {
    item: items.map(item => {
      if (item.amount) {
        item.amount = Number(item.amount).toFixed(2);
      }
      return item;
    })
  };
}

/**
 * receivers
 * @param {Array} receivers
 * @return {Object}
 */
function receivers(receivers) {
  if (!validate.isArray(receivers)) {
    return { receiver: [] };
  }

  receivers = clone(receivers);

  return {
    receiver: receivers.map(receiver => {
      if (receiver.split.amount) {
        receiver.split.amount = Number(receiver.split.amount).toFixed(2);
      }

      if (receiver.split.ratePercent) {
        receiver.split.ratePercent = Number(receiver.split.ratePercent).toFixed(
          2
        );
      }

      if (receiver.split.feePercent) {
        receiver.split.feePercent = Number(receiver.split.feePercent).toFixed(
          2
        );
      }

      return receiver;
    })
  };
}

/**
 * permissions
 * @param {Array} permissions
 * @return {Object}
 */
function permissions(permissions) {
  if (!validate.isArray(permissions)) {
    return { code: permissions };
  }

  return {
    code: permissions
  };
}

/**
 * person
 * @param {Object} person
 * @return {Object}
 */
function person(person) {
  if (!validate.isObject(person)) {
    return {};
  }

  person = clone(person);

  return person;
}

/**
 * company
 * @param {Object} company
 * @return {Object}
 */
function company(company) {
  if (!validate.isObject(company)) {
    return {};
  }

  company = clone(company);

  return company;
}

/**
 * account
 * @param {Object} account
 * @return {Object}
 */
function account(a) {
  if (!validate.isObject(account)) {
    return {};
  }

  switch (account.type) {
    case "PERSON":
      return person(account);
      break;
    case "COMPANY":
      return company(account);
      break;
    default:
      return {};
  }
}

/**
 * exports
 */
module.exports = {
  sender,
  creditCard,
  shipping,
  billing,
  items,
  extraAmount,
  permissions,
  account,
  receivers
};
